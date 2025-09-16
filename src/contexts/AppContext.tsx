import React, { createContext, useContext, useState, useEffect } from 'react'
import { Course, Enrollment, LessonProgress, UserStats } from '../types'
import { CourseManager, EnrollmentManager, ProgressManager } from '../data/realData'
import { useAuth } from './AuthContext'
import { calculateProgress } from '../lib/utils'

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
  const { user } = useAuth()
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

  const courseManager = CourseManager.getInstance()
  const enrollmentManager = EnrollmentManager.getInstance()
  const progressManager = ProgressManager.getInstance()

  const refreshData = () => {
    setCourses(courseManager.getAllCourses())
    if (user) {
      setEnrollments(enrollmentManager.getUserEnrollments(user.id))
      setLessonProgress(progressManager.getUserProgress(user.id))
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
    
    const userEnrollments = enrollments.filter(e => e.userId === user?.id)
    const completedCourses = userEnrollments.filter(e => e.completedAt).length
    
    // Calculate total hours from completed lessons
    const userLessonProgress = lessonProgress.filter(lp => lp.userId === user?.id && lp.completed)
    const totalSeconds = userLessonProgress.reduce((acc, lp) => {
      const lesson = courses.flatMap(c => c.lessons).find(l => l.id === lp.lessonId)
      return acc + (lesson?.duration || 0)
    }, 0)
    const totalHours = Math.round(totalSeconds / 3600)

    // Determine rank based on completed courses
    let rank = 'Beginner'
    if (completedCourses >= 5) rank = 'Expert'
    else if (completedCourses >= 3) rank = 'Advanced'
    else if (completedCourses >= 1) rank = 'Intermediate'

    setUserStats({
      totalCourses: userEnrollments.length,
      completedCourses,
      totalHours,
      streak: 7, // Mock streak
      rank
    })
  }

  const enrollInCourse = (courseId: string) => {
    if (!user) return

    try {
      const enrollment = enrollmentManager.enrollUser(user.id, courseId)
      setEnrollments(prev => [...prev, enrollment])
      
      // Refresh courses to update student count
      setCourses(courseManager.getAllCourses())
    } catch (error) {
      console.error('Enrollment failed:', error)
    }
  }

  const updateLessonProgress = (lessonId: string, progress: Partial<LessonProgress>) => {
    if (!user) return

    const updatedProgress = progressManager.updateLessonProgress(user.id, lessonId, progress)
    setLessonProgress(prev => {
      const filtered = prev.filter(lp => !(lp.userId === user.id && lp.lessonId === lessonId))
      return [...filtered, updatedProgress]
    })

    // Update course progress
    const lesson = courses.flatMap(c => c.lessons).find(l => l.id === lessonId)
    if (lesson) {
      updateCourseProgress(lesson.courseId)
    }
  }

  const updateCourseProgress = (courseId: string) => {
    if (!user) return

    const course = courses.find(c => c.id === courseId)
    if (!course) return

    const courseLessons = course.lessons
    const completedLessons = courseLessons.filter(lesson => {
      const progress = lessonProgress.find(lp => lp.userId === user.id && lp.lessonId === lesson.id)
      return progress?.completed
    })

    const progressPercentage = calculateProgress(completedLessons.length, courseLessons.length)

    enrollmentManager.updateProgress(user.id, courseId, progressPercentage)
    setEnrollments(enrollmentManager.getUserEnrollments(user.id))
  }

  const searchCourses = (query: string): Course[] => {
    if (!query.trim()) return courses

    return courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getCoursesByCategory = (category: string): Course[] => {
    if (category === 'all') return courses
    return courses.filter(course => course.category === category)
  }

  const getUserEnrolledCourses = (): Course[] => {
    if (!user) return []
    
    const userEnrollments = enrollments.filter(e => e.userId === user.id)
    return courses.filter(course => 
      userEnrollments.some(enrollment => enrollment.courseId === course.id)
    )
  }

  const getCourseProgress = (courseId: string): number => {
    if (!user) return 0
    
    const enrollment = enrollments.find(e => e.userId === user.id && e.courseId === courseId)
    return enrollment?.progress || 0
  }

  const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
    if (!user) return undefined
    
    return progressManager.getLessonProgress(user.id, lessonId)
  }

  const addNote = (lessonId: string, note: string) => {
    if (!user) return

    progressManager.updateLessonProgress(user.id, lessonId, { notes: note })
    setLessonProgress(progressManager.getUserProgress(user.id))
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