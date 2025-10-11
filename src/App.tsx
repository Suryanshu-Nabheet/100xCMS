import { useState } from 'react'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { AppProvider } from './components/Dashboard/App/contexts/AppContext'
import LayoutShell from './components/Dashboard/Layout/LayoutShell'
import { HomePage } from './components/Dashboard/Home/HomePage'
import { CourseCatalog } from './components/Dashboard/Courses/BrowseCourses/components/CourseCatalog'
import { MyCourses } from './components/Dashboard/Courses/MyCourses/components/MyCourses'
import { CourseDetail } from './components/Dashboard/Courses/BrowseCourses/CourseDetail'
import { ProfileView } from './components/Dashboard/Profile/ProfileView'
import Main from './components/Home/main'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const handleNavigation = (view: string, courseId?: string) => {
    setActiveView(view)
    if (courseId) {
      setSelectedCourseId(courseId)
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <HomePage onNavigate={handleNavigation} />
      case 'my-courses':
        return <MyCourses onNavigate={handleNavigation} />
      case 'browse':
        return <CourseCatalog />
      case 'course-detail':
        return selectedCourseId ? (
          <CourseDetail
            courseId={selectedCourseId}
            onBack={() => setActiveView('my-courses')}
          />
        ) : (
          <div className="liquid-glass rounded-professional p-8 text-center hover-lift">
            <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
            <p className="text-white">The requested course could not be found.</p>
          </div>
        )
      case 'profile':
        return <ProfileView />
      case 'users':
        return (
          <div className="liquid-glass rounded-professional p-8 text-center hover-lift">
            <h2 className="text-2xl font-bold text-white mb-4">Users Management</h2>
            <p className="text-white">Coming soon...</p>
          </div>
        )
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

  return (
    <>
      <SignedOut>
        <Main />
      </SignedOut>
      
      <SignedIn>
        <LayoutShell activeItem={activeView} onItemClick={handleNavigation}>
          {renderContent()}
        </LayoutShell>
      </SignedIn>
    </>
  )
}

function App() {
  if (!clerkPubKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Missing Clerk Configuration</h1>
          <p className="text-white/80">Please check your environment variables.</p>
        </div>
      </div>
    )
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ClerkProvider>
  )
}

export default App