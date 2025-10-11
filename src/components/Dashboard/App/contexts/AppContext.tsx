import React, { createContext, useContext, useState, useEffect } from 'react'
import { Course, Enrollment, LessonProgress, UserStats } from '../../../../types'
import { useUser } from '@clerk/clerk-react'
import { calculateProgress } from '../../../../lib/utils'

interface AppContextType {
  courses: Course[]
  enrollments: Enrollment[]
  lessonProgress: LessonProgress[]
  userStats: UserStats
  enrollInCourse: (courseId: string) => void
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void
  searchCourses: (query: string) => Course[]
  getCoursesByCategory: (category: string) => Course[]
  getUserEnrolledCourses: () => Course[]
  getCourseProgress: (courseId: string) => number
  getLessonProgress: (lessonId: string) => LessonProgress | undefined
  addNote: (lessonId: string, note: string) => void
  refreshData: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([])
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    streak: 7,
    rank: 'Beginner'
  })

  const refreshData = () => {
    // Placeholder for future data loading
    setCourses([])
    if (user) {
      setEnrollments([])
      setLessonProgress([])
    }
  }

  useEffect(() => {
    refreshData()
  }, [user])

  useEffect(() => {
    if (user) {
      calculateUserStats()
    }
  }, [user, enrollments, lessonProgress])

  const calculateUserStats = () => {
    if (!user) return
    
    // Placeholder stats calculation
    setUserStats({
      totalCourses: 0,
      completedCourses: 0,
      totalHours: 0,
      streak: 0,
      rank: 'Beginner'
    })
  }

  const enrollInCourse = (courseId: string) => {
    if (!user) return

    // Placeholder for future enrollment logic
    console.log('Enrolling in course:', courseId)
  }

  const updateLessonProgress = (lessonId: string, progress: Partial<LessonProgress>) => {
    if (!user) return

    // Placeholder for future progress tracking
    console.log('Updating lesson progress:', lessonId, progress)
  }

  const searchCourses = (query: string): Course[] => {
    // Placeholder for future search functionality
    return courses
  }

  const getCoursesByCategory = (category: string): Course[] => {
    // Placeholder for future category filtering
    return courses
  }

  const getUserEnrolledCourses = (): Course[] => {
    if (!user) return []
    
    // Placeholder for future enrolled courses
    return []
  }

  const getCourseProgress = (courseId: string): number => {
    if (!user) return 0
    
    // Placeholder for future progress calculation
    return 0
  }

  const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
    if (!user) return undefined
    
    // Placeholder for future lesson progress
    return undefined
  }

  const addNote = (lessonId: string, note: string) => {
    if (!user) return

    // Placeholder for future note functionality
    console.log('Adding note:', lessonId, note)
  }

  const value = {
    courses,
    enrollments,
    lessonProgress,
    userStats,
    enrollInCourse,
    updateLessonProgress,
    searchCourses,
    getCoursesByCategory,
    getUserEnrolledCourses,
    getCourseProgress,
    getLessonProgress,
    addNote,
    refreshData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}