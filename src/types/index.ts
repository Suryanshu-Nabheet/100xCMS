export interface User {
  id: string
  email: string
  fullName: string
  avatar?: string
  role: 'student' | 'instructor' | 'admin'
  createdAt: string
  passwordHash?: string
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  instructor: string
  instructorId: string
  duration: string
  students: number
  rating: number
  lessons: Lesson[]
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl: string
  duration: number
  orderIndex: number
  isFree: boolean
  resources?: Resource[]
  createdAt: string
}

export interface Resource {
  id: string
  title: string
  type: 'pdf' | 'link' | 'code'
  url: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  completedAt?: string
  progress: number
}

export interface LessonProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  watchTime: number
  completedAt?: string
  notes?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition?: string
  unlockedAt?: string
}

export interface UserStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  streak: number
  rank: string
}