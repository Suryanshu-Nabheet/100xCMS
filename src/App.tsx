import { useState } from 'react'
import { useAuth, AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import LayoutShell from './components/Layout/LayoutShell'
import { LoginForm } from './components/Auth/LoginForm'
import { SignupForm } from './components/Auth/SignupForm'
import { StudentDashboard } from './components/Dashboard/StudentDashboard'
import { CourseCatalog } from './components/Courses/CourseCatalog'
import { MyCourses } from './components/Courses/MyCourses'
import { CourseDetail } from './components/Courses/CourseDetail'
import { ProfileView } from './components/Profile/ProfileView'

function AppContent() {
  const { user, loading } = useAuth()
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  const handleNavigation = (view: string, courseId?: string) => {
    setActiveView(view)
    if (courseId) {
      setSelectedCourseId(courseId)
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <StudentDashboard onNavigate={handleNavigation} />
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
        return <StudentDashboard onNavigate={handleNavigation} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gpu-accelerated bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/10 border-t-blue-500 mx-auto mb-6 glow-blue"></div>
          <div className="mb-2">
            <div className="font-bold text-3xl select-none">
              <span className="text-white">Class</span>
              <span className="text-blue-400 text-4xl font-bold">X</span>
            </div>
          </div>
          <p className="text-white/80">Loading your learning platform...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 gpu-accelerated bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden">
        <div className="w-full max-w-md">
          {authMode === 'login' ? (
            <LoginForm onToggleMode={() => setAuthMode('signup')} />
          ) : (
            <SignupForm onToggleMode={() => setAuthMode('login')} />
          )}
        </div>
      </div>
    )
  }

  return (
    <LayoutShell activeItem={activeView} onItemClick={handleNavigation}>
      {renderContent()}
    </LayoutShell>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  )
}

export default App