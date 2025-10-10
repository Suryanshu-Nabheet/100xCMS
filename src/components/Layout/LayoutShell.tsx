"use client"
import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../Auth/contexts/AuthContext'


// Icons
const IconHome = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="9,22 9,12 15,12 15,22" />
  </svg>
)
const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
)
const IconBookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)
const IconUser = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="7" r="4" />
  </svg>
)
const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle strokeLinecap="round" strokeLinejoin="round" cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m22 21-3-3m0 0-3-3m3 3 3-3m-3 3-3 3" />
  </svg>
)
const IconSettings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="3" />
  </svg>
)
const IconX = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m18 6-12 12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12" />
  </svg>
)
const IconMenu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
const IconSearch = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <circle strokeLinecap="round" strokeLinejoin="round" cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
  </svg>
)
const IconLogOut = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="16,17 21,12 16,7" />
    <line strokeLinecap="round" strokeLinejoin="round" x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

// Utils
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

// Types
interface MenuItem {
  id: string
  label: string
  icon: ReactNode
  roles?: Array<'student' | 'instructor' | 'admin'>
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Home Page', icon: <IconHome className="h-5 w-5" />, roles: ['student','instructor','admin'] },
  { id: 'my-courses', label: 'My Courses', icon: <IconBookOpen className="h-5 w-5" />, roles: ['student','instructor','admin'] },
  { id: 'browse', label: 'Browse Courses', icon: <IconBook className="h-5 w-5" />, roles: ['student','instructor','admin'] },
  { id: 'profile', label: 'Profile', icon: <IconUser className="h-5 w-5" />, roles: ['student','instructor','admin'] },
  { id: 'users', label: 'Users', icon: <IconUsers className="h-5 w-5" />, roles: ['admin'] },
  { id: 'settings', label: 'Settings', icon: <IconSettings className="h-5 w-5" />, roles: ['instructor','admin'] }
]

interface LayoutShellProps {
  activeItem: string
  onItemClick: (view: string) => void
  children: ReactNode
}

export default function LayoutShell({ activeItem, onItemClick, children }: LayoutShellProps) {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const role = (user?.role ?? 'student') as 'student' | 'instructor' | 'admin'
  const visibleMenu = menuItems.filter(m => !m.roles || m.roles.includes(role) || role === 'admin')

  const headerHeight = 64 // 16 * 4
  const sidebarWidth = isOpen ? 280 : 80
  const lShapeStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.92)',
    clipPath: `polygon(0 0, 100% 0, 100% ${headerHeight}px, ${sidebarWidth}px ${headerHeight}px, ${sidebarWidth}px 100%, 0 100%)`
  }

  const handleProfileClick = () => {
    onItemClick('profile')
    setDropdownOpen(false)
  }

  const handleSettingsClick = () => {
    onItemClick('settings')
    setDropdownOpen(false)
  }

  const handleSignOut = () => {
    signOut()
    setDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Unified chrome background (single L-shaped bar) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none backdrop-blur-xl" 
        style={lShapeStyle} 
      />
      
      {/* Inner blue shines */}
      <div
        className="fixed z-10 pointer-events-none"
        style={{ 
          left: sidebarWidth - 2, 
          top: 0, 
          width: 2, 
          height: '100vh', 
          background: 'linear-gradient(to bottom, rgba(59,130,246,0.7), rgba(59,130,246,0.25), rgba(59,130,246,0))' 
        }}
      />
      <div
        className="fixed z-10 pointer-events-none"
        style={{ 
          left: 0, 
          top: headerHeight - 1, 
          width: '100vw', 
          height: 2, 
          background: 'linear-gradient(to right, rgba(59,130,246,0.7), rgba(59,130,246,0.25), rgba(59,130,246,0))' 
        }}
      />
      
      {/* ClassX Logo positioned after the blue vertical line */}
      <div className="fixed top-0 z-50 pointer-events-none" style={{ left: `${sidebarWidth + 20}px` }}>
        <div className="h-16 flex items-center">
          <div className="font-bold text-lg select-none">
            <span className="text-white">Class</span>
            <span style={{ color: '#3b82f6' }} className="text-xl font-bold">X</span>
          </div>
        </div>
      </div>
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar (merged look + blue glow on the right edge) */}
        <motion.aside
          initial={{ width: 280 }}
          animate={{ width: isOpen ? 280 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="hidden md:flex flex-col relative h-full z-40"
        >
          {/* Header section with fixed position hamburger menu */}
          <div className="h-16 flex items-center justify-start pl-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-lg text-white/80 hover:text-white hover:bg-blue-500/10 transition-all duration-300 flex-shrink-0"
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
              >
                {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {visibleMenu.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onItemClick(item.id)}
                    className={cn(
                      'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                      'hover:bg-white/10 hover:backdrop-blur-sm',
                      activeItem === item.id ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' : 'text-white/80 hover:text-white'
                    )}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <motion.span
                      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Main area with merged header */}
        <div className="flex-1 flex flex-col overflow-hidden h-screen w-full min-w-0">
          {/* Header (transparent; unified chrome behind) */}
          <header className="sticky top-0 z-40 h-16 flex-shrink-0 relative bg-transparent">
            <div className="flex items-center justify-between h-16 px-6">
              {/* Left: Mobile hamburger menu */}
              <div className="flex items-center space-x-4 md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
                  aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                >
                  <IconMenu className="w-5 h-5" />
                </button>
              </div>

              {/* Center: search */}
              <div className="flex flex-1 justify-center">
                <div className="hidden md:flex max-w-md w-full">
                  <div className="relative w-full">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search courses, lessons..." 
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-sm backdrop-blur-sm" 
                    />
                  </div>
                </div>
              </div>

              {/* Right: user */}
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                      <IconUser className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white">{user?.fullName || 'User'}</p>
                      <p className="text-xs text-white/60 capitalize">{user?.role || 'student'}</p>
                    </div>
                  </button>
                  
                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <>
                        {/* Backdrop for mobile */}
                        <div 
                          className="fixed inset-0 z-40 md:hidden" 
                          onClick={() => setDropdownOpen(false)}
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-black/80 backdrop-blur-xl rounded-lg shadow-xl z-50 border border-blue-500/20"
                        >
                          <div className="p-2">
                            <button 
                              onClick={handleProfileClick}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                              <IconUser className="w-4 h-4" />
                              <span>Profile</span>
                            </button>
                            <button 
                              onClick={handleSettingsClick}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                              <IconSettings className="w-4 h-4" />
                              <span>Settings</span>
                            </button>
                            <hr className="my-2 border-blue-500/10" />
                            <button 
                              onClick={handleSignOut}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <IconLogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 h-full">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl z-50 border-r border-blue-500/20"
            >
              <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
                <div className="font-bold text-white text-lg">
                  <span className="text-white">Class</span>
                  <span style={{ color: '#3b82f6' }}>X</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close sidebar"
                >
                  <IconX className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {visibleMenu.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => { 
                          onItemClick(item.id); 
                          setIsOpen(false); 
                        }}
                        className={cn(
                          'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200', 
                          'hover:bg-white/10 hover:backdrop-blur-sm', 
                          activeItem === item.id ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20' : 'text-white/80 hover:text-white'
                        )}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}