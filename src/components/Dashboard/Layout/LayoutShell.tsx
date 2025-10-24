"use client"
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClerkAccountHandler } from './Account'
import { useAdminAuth } from '../../Admin'
import { useUser } from '@clerk/clerk-react'
import { courseDetails } from '../Courses/coursesData'
import { Search, X, Play, FileText, Clock } from 'lucide-react'


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
const IconBell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10a3 3 0 1 1 6 0M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
  </svg>
)
const IconShield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

// Utils
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

// Search Types
interface SearchResult {
  id: string
  type: 'course' | 'module' | 'lesson'
  title: string
  description?: string
  courseId: string
  courseTitle: string
  moduleId?: string
  moduleTitle?: string
  contentType?: 'video' | 'pdf'
  duration?: string
  author?: string
  thumbnail?: string
  url?: string
  timestamps?: Array<{ time: number; title: string }>
}

// Types
interface MenuItem {
  id: string
  label: string
  icon: ReactNode
  roles?: Array<'student' | 'instructor' | 'admin'>
}

// Search Functions
const searchContent = (query: string): SearchResult[] => {
  if (!query.trim()) return []
  
  const results: SearchResult[] = []
  const searchTerm = query.toLowerCase().trim()
  
  // Search through all courses
  Object.entries(courseDetails).forEach(([, course]) => {
    // Search course title
    if (course.title.toLowerCase().includes(searchTerm)) {
      results.push({
        id: course.id,
        type: 'course',
        title: course.title,
        courseId: course.id,
        courseTitle: course.title,
        thumbnail: course.banner
      })
    }
    
    // Search through modules
    course.modules?.forEach(module => {
      // Search module title
      if (module.title.toLowerCase().includes(searchTerm)) {
        results.push({
          id: module.id,
          type: 'module',
          title: module.title,
          courseId: course.id,
          courseTitle: course.title,
          moduleId: module.id,
          moduleTitle: module.title,
          thumbnail: '/public/Content-Cover.png'
        })
      }
      
      // Search through lessons
      module.lessons?.forEach(lesson => {
        const lessonMatches = 
          lesson.title.toLowerCase().includes(searchTerm) ||
          lesson.description?.toLowerCase().includes(searchTerm) ||
          lesson.author?.toLowerCase().includes(searchTerm) ||
          lesson.content?.notes?.toLowerCase().includes(searchTerm) ||
          lesson.content?.links?.some(link => 
            link.title.toLowerCase().includes(searchTerm) || 
            link.url.toLowerCase().includes(searchTerm)
          ) ||
          lesson.timestamps?.some(timestamp => 
            timestamp.title.toLowerCase().includes(searchTerm)
          )
        
        if (lessonMatches) {
          results.push({
            id: lesson.id,
            type: 'lesson',
            title: lesson.title,
            description: lesson.description,
            courseId: course.id,
            courseTitle: course.title,
            moduleId: module.id,
            moduleTitle: module.title,
            contentType: lesson.contentType,
            duration: lesson.duration,
            author: lesson.author,
            thumbnail: lesson.thumbnail,
            url: lesson.contentType === 'video' ? lesson.videoUrl : lesson.pdfUrl,
            timestamps: lesson.timestamps
          })
        }
      })
    })
  })
  
  // Sort results by relevance (exact matches first, then partial matches)
  return results.sort((a, b) => {
    const aExact = a.title.toLowerCase() === searchTerm
    const bExact = b.title.toLowerCase() === searchTerm
    
    if (aExact && !bExact) return -1
    if (!aExact && bExact) return 1
    
    // Then by type priority: course > module > lesson
    const typePriority = { course: 0, module: 1, lesson: 2 }
    return typePriority[a.type] - typePriority[b.type]
  })
}

const getMenuItems = (isAdmin: boolean): MenuItem[] => {
  const baseItems: MenuItem[] = [
    { id: 'dashboard', label: 'Home Page', icon: <IconHome className="h-5 w-5" />, roles: ['student','instructor','admin'] },
    { id: 'courses', label: 'Courses', icon: <IconBook className="h-5 w-5" />, roles: ['student','instructor','admin'] },
    { id: 'updates', label: 'Updates', icon: <IconBell className="h-5 w-5" />, roles: ['student','instructor','admin'] },
    { id: 'profile', label: 'Profile', icon: <IconUser className="h-5 w-5" />, roles: ['student','instructor','admin'] }
  ]

  if (isAdmin) {
    return [
      ...baseItems,
      { id: 'admin-dashboard', label: 'Admin Dashboard', icon: <IconShield className="h-5 w-5" />, roles: ['admin'] }
    ]
  }

  return baseItems
}

interface LayoutShellProps {
  activeItem: string
  onItemClick: (view: string, courseId?: string) => void
  children: ReactNode
  onNavigateToCourse?: (courseId: string, moduleId?: string, lessonId?: string) => void
}

export default function LayoutShell({ activeItem, onItemClick, children, onNavigateToCourse }: LayoutShellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  
  const { user } = useUser()
  const { isAdminEmail } = useAdminAuth()
  
  // Check if the current user's email is the admin email
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdminByEmail = userEmail ? isAdminEmail(userEmail) : false
  
  const role = isAdminByEmail ? 'admin' : 'student'
  const menuItems = getMenuItems(isAdminByEmail)
  const visibleMenu = menuItems.filter(m => !m.roles || m.roles.includes(role as 'student' | 'instructor' | 'admin') || role === 'admin')

  // Search functionality with debouncing for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = searchContent(searchQuery)
        setSearchResults(results)
        setShowSearchResults(true)
        setSelectedResultIndex(-1)
      } else {
        setSearchResults([])
        setShowSearchResults(false)
        setSelectedResultIndex(-1)
      }
    }, 150) // Debounce search for better performance

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle search result click
  const handleSearchResultClick = (result: SearchResult) => {
    // Clear search first
    setSearchQuery('')
    setShowSearchResults(false)
    setSelectedResultIndex(-1)
    
    // Use the new navigation system if available
    if (onNavigateToCourse) {
      // Always navigate to ensure clean state
      if (result.type === 'course') {
        onNavigateToCourse(result.courseId)
      } else if (result.type === 'module') {
        onNavigateToCourse(result.courseId, result.moduleId)
      } else if (result.type === 'lesson') {
        onNavigateToCourse(result.courseId, result.moduleId, result.id)
      }
      return
    }
    
    // Fallback to DOM-based navigation - navigate to course detail first
    onItemClick('course-detail', result.courseId)
    
    // Immediate navigation without delays
    requestAnimationFrame(() => {
      if (result.type === 'course') {
        // Just navigate to the course detail page
        const courseElement = document.querySelector(`[data-course-id="${result.courseId}"]`)
        if (courseElement) {
          courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else if (result.type === 'module') {
        // Navigate to specific course and module
        const courseElement = document.querySelector(`[data-course-id="${result.courseId}"]`)
        if (courseElement) {
          courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Immediate module click
          requestAnimationFrame(() => {
            const moduleElement = courseElement.querySelector(`[data-module-id="${result.moduleId}"]`)
            if (moduleElement) {
              (moduleElement as HTMLElement).click()
            }
          })
        }
      } else if (result.type === 'lesson') {
        // Navigate to specific course, module, and lesson
        const courseElement = document.querySelector(`[data-course-id="${result.courseId}"]`)
        if (courseElement) {
          courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Immediate module click
          requestAnimationFrame(() => {
            const moduleElement = courseElement.querySelector(`[data-module-id="${result.moduleId}"]`)
            if (moduleElement) {
              (moduleElement as HTMLElement).click()
              // Immediate lesson click
              requestAnimationFrame(() => {
                const lessonElement = document.querySelector(`[data-lesson-id="${result.id}"]`)
                if (lessonElement) {
                  (lessonElement as HTMLElement).click()
                }
              })
            }
          })
        }
      }
    })
  }

  // Keyboard navigation for search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedResultIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedResultIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedResultIndex >= 0 && selectedResultIndex < searchResults.length) {
          handleSearchResultClick(searchResults[selectedResultIndex])
        }
        break
      case 'Escape':
        setShowSearchResults(false)
        setSelectedResultIndex(-1)
        searchInputRef.current?.blur()
        break
    }
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
        setSelectedResultIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  const headerHeight = 64 // 16 * 4
  const sidebarWidth = isOpen ? 280 : 80
  const lShapeStyle: React.CSSProperties = {
    background: '#000000',
    clipPath: `polygon(0 0, 100% 0, 100% ${headerHeight}px, ${sidebarWidth}px ${headerHeight}px, ${sidebarWidth}px 100%, 0 100%)`
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
          <header className="sticky top-0 z-40 h-16 flex-shrink-0 bg-transparent">
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
                  <div className="relative w-full" ref={searchResultsRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="Search courses, modules, lessons..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                      className="w-full pl-10 pr-10 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-sm backdrop-blur-sm" 
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setShowSearchResults(false)
                          setSelectedResultIndex(-1)
                          searchInputRef.current?.focus()
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                      {showSearchResults && searchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-blue-500/20 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
                        >
                          <div className="p-2">
                            <div className="text-xs text-white/60 mb-2 px-2">
                              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                            </div>
                            {searchResults.map((result, index) => (
                              <button
                                key={`${result.type}-${result.id}`}
                                onClick={() => handleSearchResultClick(result)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                  index === selectedResultIndex
                                    ? 'bg-blue-600/30 text-white border border-blue-500/50'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {result.type === 'course' && <IconBook className="w-4 h-4 text-blue-400" />}
                                    {result.type === 'module' && <IconBookOpen className="w-4 h-4 text-green-400" />}
                                    {result.type === 'lesson' && (
                                      result.contentType === 'video' ? 
                                        <Play className="w-4 h-4 text-red-400" /> : 
                                        <FileText className="w-4 h-4 text-blue-400" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">
                                      {result.title}
                                    </div>
                                    <div className="text-xs text-white/60 mt-1">
                                      {result.type === 'course' && 'Course'}
                                      {result.type === 'module' && `${result.courseTitle} • Module`}
                                      {result.type === 'lesson' && `${result.courseTitle} • ${result.moduleTitle}`}
                                    </div>
                                    {result.description && (
                                      <div className="text-xs text-white/50 mt-1 line-clamp-2">
                                        {result.description}
                                      </div>
                                    )}
                                    {result.duration && (
                                      <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3 text-white/40" />
                                        <span className="text-xs text-white/40">{result.duration}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right: user */}
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <ClerkAccountHandler />
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