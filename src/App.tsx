import { useState, useEffect } from 'react'
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import LayoutShell from './components/Dashboard/Layout/LayoutShell'
import { HomePage } from './components/Dashboard/Home/HomePage'
import { Courses } from './components/Dashboard/Courses/Courses'
import { CourseDetail } from './components/Dashboard/Courses/CourseDetail'
import { ProfileView } from './components/Dashboard/Profile/ProfileView'
import { UpdatesMain } from './components/Dashboard/Updates'
import { AdminDashboard, useAdminAuth } from './components/Admin'
import Main from './components/Landing/main'

// Get Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Cleanup function to prevent localStorage conflicts
const clearConflictingStorage = () => {
  // Only clear admin storage if we're not on admin routes
  if (!window.location.pathname.includes('/admin')) {
    localStorage.removeItem('classx_cms_admin_users');
    localStorage.removeItem('classx_cms_admin_session');
    // Also clear old keys for backward compatibility
    localStorage.removeItem('cms_admin_users');
    localStorage.removeItem('cms_admin_session');
  }
};

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({})
  const { user } = useUser()
  
  // Clear conflicting storage on component mount
  useEffect(() => {
    try {
      clearConflictingStorage();
    } catch (err) {
      console.error('Error clearing storage:', err);
    }
  }, []);

  // Scroll position tracking with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY
        setScrollPositions(prev => ({
          ...prev,
          [activeView]: scrollY
        }))
      }, 100) // Debounce scroll events
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [activeView])

  // Restore scroll position when view changes (with delay to ensure DOM is ready)
  useEffect(() => {
    const savedPosition = scrollPositions[activeView]
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (savedPosition !== undefined && savedPosition > 0) {
        window.scrollTo({ top: savedPosition, behavior: 'instant' })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    })
  }, [activeView, scrollPositions])
  
  // Check if the current user's email is the admin email
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdminByEmail = userEmail === 'suryanshunab@gmail.com' // Direct check instead of using hook

  // Error boundary effect
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setError('An unexpected error occurred. Please refresh the page.');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleNavigation = (view: string, courseId?: string) => {
    setActiveView(view)
    if (courseId) {
      setSelectedCourseId(courseId)
    }
  }

  const handleNavigateToCourse = (courseId: string, moduleId?: string, lessonId?: string) => {
    // Navigate immediately without delays
    setActiveView('course-detail')
    setSelectedCourseId(courseId)
    
    // Handle module/lesson navigation immediately after state update
    if (moduleId || lessonId) {
      // Use requestAnimationFrame for immediate execution after DOM update
      requestAnimationFrame(() => {
        const courseElement = document.querySelector(`[data-course-id="${courseId}"]`)
        if (courseElement) {
          courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          
          if (moduleId) {
            // Immediate module click
            requestAnimationFrame(() => {
              const moduleElement = courseElement.querySelector(`[data-module-id="${moduleId}"]`)
              if (moduleElement) {
                (moduleElement as HTMLElement).click()
                
                if (lessonId) {
                  // Immediate lesson click
                  requestAnimationFrame(() => {
                    const lessonElement = document.querySelector(`[data-lesson-id="${lessonId}"]`)
                    if (lessonElement) {
                      (lessonElement as HTMLElement).click()
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <HomePage onNavigate={handleNavigation} />
      case 'courses':
        return <Courses onNavigate={handleNavigation} />
      case 'updates':
        return <UpdatesMain />
      case 'course-detail':
        return selectedCourseId ? (
          <CourseDetail
            courseId={selectedCourseId}
            onBack={() => setActiveView('courses')}
          />
        ) : (
          <div className="liquid-glass rounded-professional p-8 text-center hover-lift">
            <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
            <p className="text-white">The requested course could not be found.</p>
          </div>
        )
      case 'profile':
        return <ProfileView />
      case 'admin-dashboard':
        return <AdminDashboard />
      case 'settings':
        return (
          <div className="liquid-glass rounded-professional p-8 text-center hover-lift">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-white">Coming soon...</p>
          </div>
        )
      default:
        return <HomePage onNavigate={handleNavigation} />
    }
  }

  // Show error if any
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Application Error</h1>
          <p className="text-white/80 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SignedOut>
        <Main />
      </SignedOut>
      
      <SignedIn>
        {isAdminByEmail ? (
          <LayoutShell 
            activeItem={activeView} 
            onItemClick={handleNavigation}
            onNavigateToCourse={handleNavigateToCourse}
          >
            {renderContent()}
          </LayoutShell>
        ) : (
          <LayoutShell 
            activeItem={activeView} 
            onItemClick={handleNavigation}
            onNavigateToCourse={handleNavigateToCourse}
          >
            {renderContent()}
          </LayoutShell>
        )}
      </SignedIn>
    </>
  )
}

function App() {
  // Debug logging
  console.log('Clerk publishable key:', clerkPubKey ? 'Present' : 'Missing');
  console.log('Environment:', import.meta.env.MODE);
  console.log('Full key:', clerkPubKey);

  // Production-ready error handling for missing Clerk configuration
  if (!clerkPubKey) {
    console.error('Clerk publishable key is missing!');
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Missing Clerk Configuration</h1>
          <p className="text-white/80 mb-6">
            The Clerk publishable key is not configured. Please check your environment variables.
          </p>
          <div className="bg-black/60 border border-white/10 rounded-lg p-4 text-left">
            <p className="text-sm text-white/70 mb-2">Make sure you have:</p>
            <ul className="text-sm text-white/60 space-y-1">
              <li>• Created a <code className="bg-white/10 px-1 rounded">.env</code> file</li>
              <li>• Added <code className="bg-white/10 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code></li>
              <li>• Restarted your development server</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  console.log('Initializing ClerkProvider with key:', clerkPubKey);

  try {
    return (
      <ClerkProvider publishableKey={clerkPubKey}>
        <AppContent />
      </ClerkProvider>
    )
  } catch (error) {
    console.error('Error initializing ClerkProvider:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Application Error</h1>
          <p className="text-white/80 mb-6">
            There was an error initializing the application. Please check the console for details.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }
}

export default App