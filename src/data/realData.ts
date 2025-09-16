import { Course, User, Enrollment, LessonProgress, Achievement } from '../types'
import { generateId } from '../lib/utils'

// Real user management system
export class UserManager {
  private static instance: UserManager
  private users: Map<string, User> = new Map()
  private currentUserId: string | null = null

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager()
    }
    return UserManager.instance
  }

  createUser(email: string, password: string, fullName: string, role: 'student' | 'instructor' | 'admin' = 'student'): User {
    const existingUser = Array.from(this.users.values()).find(u => u.email === email)
    if (existingUser) {
      throw new Error('User already exists with this email')
    }

    const user: User = {
      id: generateId(),
      email,
      fullName,
      role,
      createdAt: new Date().toISOString(),
      passwordHash: this.hashPassword(password) // In real app, use proper hashing
    }

    this.users.set(user.id, user)
    return user
  }

  authenticateUser(email: string, password: string): User | null {
    const user = Array.from(this.users.values()).find(u => u.email === email)
    if (user && this.verifyPassword(password, user.passwordHash!)) {
      this.currentUserId = user.id
      return user
    }
    return null
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null
    return this.users.get(this.currentUserId) || null
  }

  logout(): void {
    this.currentUserId = null
  }

  private hashPassword(password: string): string {
    // Simple hash for demo - use bcrypt in production
    return btoa(password)
  }

  private verifyPassword(password: string, hash: string): boolean {
    return btoa(password) === hash
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }
}

// Real course management system
export class CourseManager {
  private static instance: CourseManager
  private courses: Map<string, Course> = new Map()

  static getInstance(): CourseManager {
    if (!CourseManager.instance) {
      CourseManager.instance = new CourseManager()
      CourseManager.instance.initializeCourses()
    }
    return CourseManager.instance
  }

  private initializeCourses(): void {
    const sampleCourses: Course[] = [
      {
        id: generateId(),
        title: 'Complete React.js Masterclass',
        description: 'Master React.js from fundamentals to advanced concepts. Build real-world applications with hooks, context, and modern patterns.',
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 99.99,
        instructor: 'ClassX Instructor',
        instructorId: 'instructor-1',
        duration: '12 hours',
        students: 0,
        rating: 4.8,
        category: 'Web Development',
        level: 'intermediate',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lessons: [
          {
            id: generateId(),
            courseId: '',
            title: 'Introduction to React',
            description: 'Get started with React.js fundamentals',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: 1200,
            orderIndex: 1,
            isFree: true,
            createdAt: new Date().toISOString()
          },
          {
            id: generateId(),
            courseId: '',
            title: 'Components and Props',
            description: 'Learn about React components and props',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: 1800,
            orderIndex: 2,
            isFree: false,
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: generateId(),
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn API development and deployment.',
        thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 79.99,
        instructor: 'ClassX Instructor',
        instructorId: 'instructor-1',
        duration: '10 hours',
        students: 0,
        rating: 4.7,
        category: 'Backend Development',
        level: 'intermediate',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lessons: [
          {
            id: generateId(),
            courseId: '',
            title: 'Node.js Fundamentals',
            description: 'Introduction to Node.js and npm',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: 1400,
            orderIndex: 1,
            isFree: true,
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: generateId(),
        title: 'Python Data Science Bootcamp',
        description: 'Learn data science with Python, pandas, matplotlib, and machine learning. Analyze real datasets.',
        thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 0,
        instructor: 'ClassX Instructor',
        instructorId: 'instructor-1',
        duration: '18 hours',
        students: 0,
        rating: 4.9,
        category: 'Data Science',
        level: 'beginner',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lessons: [
          {
            id: generateId(),
            courseId: '',
            title: 'Python Basics',
            description: 'Python fundamentals for data science',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            duration: 1300,
            orderIndex: 1,
            isFree: true,
            createdAt: new Date().toISOString()
          }
        ]
      }
    ]

    sampleCourses.forEach(course => {
      course.lessons.forEach(lesson => {
        lesson.courseId = course.id
      })
      this.courses.set(course.id, course)
    })
  }

  getAllCourses(): Course[] {
    return Array.from(this.courses.values())
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.get(id)
  }

  createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'students'>): Course {
    const course: Course = {
      ...courseData,
      id: generateId(),
      students: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.courses.set(course.id, course)
    return course
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const course = this.courses.get(id)
    if (!course) return null

    const updatedCourse = {
      ...course,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.courses.set(id, updatedCourse)
    return updatedCourse
  }

  incrementStudentCount(courseId: string): void {
    const course = this.courses.get(courseId)
    if (course) {
      course.students += 1
      this.courses.set(courseId, course)
    }
  }
}

// Real enrollment management system
export class EnrollmentManager {
  private static instance: EnrollmentManager
  private enrollments: Map<string, Enrollment> = new Map()

  static getInstance(): EnrollmentManager {
    if (!EnrollmentManager.instance) {
      EnrollmentManager.instance = new EnrollmentManager()
    }
    return EnrollmentManager.instance
  }

  enrollUser(userId: string, courseId: string): Enrollment {
    const existingEnrollment = Array.from(this.enrollments.values())
      .find(e => e.userId === userId && e.courseId === courseId)
    
    if (existingEnrollment) {
      throw new Error('User already enrolled in this course')
    }

    const enrollment: Enrollment = {
      id: generateId(),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0
    }

    this.enrollments.set(enrollment.id, enrollment)
    
    // Increment course student count
    const courseManager = CourseManager.getInstance()
    courseManager.incrementStudentCount(courseId)
    
    return enrollment
  }

  getUserEnrollments(userId: string): Enrollment[] {
    return Array.from(this.enrollments.values())
      .filter(e => e.userId === userId)
  }

  updateProgress(userId: string, courseId: string, progress: number): void {
    const enrollment = Array.from(this.enrollments.values())
      .find(e => e.userId === userId && e.courseId === courseId)
    
    if (enrollment) {
      enrollment.progress = progress
      if (progress === 100 && !enrollment.completedAt) {
        enrollment.completedAt = new Date().toISOString()
      }
      this.enrollments.set(enrollment.id, enrollment)
    }
  }
}

// Real progress tracking system
export class ProgressManager {
  private static instance: ProgressManager
  private lessonProgress: Map<string, LessonProgress> = new Map()

  static getInstance(): ProgressManager {
    if (!ProgressManager.instance) {
      ProgressManager.instance = new ProgressManager()
    }
    return ProgressManager.instance
  }

  updateLessonProgress(userId: string, lessonId: string, progress: Partial<LessonProgress>): LessonProgress {
    const key = `${userId}-${lessonId}`
    const existing = this.lessonProgress.get(key)

    const lessonProgress: LessonProgress = {
      id: existing?.id || generateId(),
      userId,
      lessonId,
      completed: false,
      watchTime: 0,
      ...existing,
      ...progress
    }

    this.lessonProgress.set(key, lessonProgress)
    return lessonProgress
  }

  getLessonProgress(userId: string, lessonId: string): LessonProgress | undefined {
    const key = `${userId}-${lessonId}`
    return this.lessonProgress.get(key)
  }

  getUserProgress(userId: string): LessonProgress[] {
    return Array.from(this.lessonProgress.values())
      .filter(p => p.userId === userId)
  }
}

// Real achievement system
export class AchievementManager {
  private static instance: AchievementManager
  private achievements: Achievement[] = [
    {
      id: generateId(),
      title: 'First Steps',
      description: 'Enrolled in your first course',
      icon: '🎯',
      condition: 'enroll_first_course'
    },
    {
      id: generateId(),
      title: 'Quick Learner',
      description: 'Completed 3 lessons in one day',
      icon: '⚡',
      condition: 'complete_3_lessons_day'
    },
    {
      id: generateId(),
      title: 'Course Master',
      description: 'Completed your first course',
      icon: '🏆',
      condition: 'complete_first_course'
    },
    {
      id: generateId(),
      title: 'Streak Champion',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      condition: 'maintain_7_day_streak'
    },
    {
      id: generateId(),
      title: 'Knowledge Seeker',
      description: 'Enrolled in 5 different courses',
      icon: '📚',
      condition: 'enroll_5_courses'
    }
  ]
  private userAchievements: Map<string, Set<string>> = new Map()

  static getInstance(): AchievementManager {
    if (!AchievementManager.instance) {
      AchievementManager.instance = new AchievementManager()
    }
    return AchievementManager.instance
  }

  checkAndUnlockAchievements(userId: string, action: string, data?: any): Achievement[] {
    const userAchievements = this.userAchievements.get(userId) || new Set()
    const newlyUnlocked: Achievement[] = []

    this.achievements.forEach(achievement => {
      if (userAchievements.has(achievement.id)) return

      let shouldUnlock = false

      switch (achievement.condition) {
        case 'enroll_first_course':
          shouldUnlock = action === 'enroll' && data?.enrollmentCount === 1
          break
        case 'complete_first_course':
          shouldUnlock = action === 'complete_course' && data?.completedCount === 1
          break
        case 'enroll_5_courses':
          shouldUnlock = action === 'enroll' && data?.enrollmentCount >= 5
          break
        // Add more conditions as needed
      }

      if (shouldUnlock) {
        userAchievements.add(achievement.id)
        achievement.unlockedAt = new Date().toISOString()
        newlyUnlocked.push(achievement)
      }
    })

    this.userAchievements.set(userId, userAchievements)
    return newlyUnlocked
  }

  getUserAchievements(userId: string): Achievement[] {
    const userAchievementIds = this.userAchievements.get(userId) || new Set()
    return this.achievements.map(achievement => ({
      ...achievement,
      unlockedAt: userAchievementIds.has(achievement.id) ? achievement.unlockedAt : undefined
    }))
  }

  getAllAchievements(): Achievement[] {
    return this.achievements
  }
}

// Initialize default admin user
const userManager = UserManager.getInstance()
try {
  userManager.createUser('admin@classx.app', 'admin123', 'ClassX Admin', 'admin')
  userManager.createUser('student@classx.app', 'student123', 'John Student', 'student')
  userManager.createUser('instructor@classx.app', 'instructor123', 'Jane Instructor', 'instructor')
} catch (error) {
  // Users already exist
}