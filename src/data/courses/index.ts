import { Course } from '../../components/Admin/dashboard'

// Import course data files
// import course1 from './course-1.json'
// import course2 from './course-2.json'
// Add more course imports as you create them

// Export all courses
export const courses: Course[] = [
  // course1 as Course,
  // course2,
  // Add more courses here
]

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id)
}

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category)
}

export const getPublishedCourses = (): Course[] => {
  return courses.filter(course => course.status === 'published')
}

export const getDraftCourses = (): Course[] => {
  return courses.filter(course => course.status === 'draft')
}

export const getCoursesByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Course[] => {
  return courses.filter(course => course.level === level)
}

export const searchCourses = (query: string): Course[] => {
  const lowercaseQuery = query.toLowerCase()
  return courses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.category.toLowerCase().includes(lowercaseQuery)
  )
}
