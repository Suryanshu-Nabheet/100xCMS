// Course data structure
export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  banner: string
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  duration: string
  students: number
  rating: number
  lessons: number
  progress?: number
  createdAt?: string
  enrollmentCount?: number
  features: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  discordLink?: string
}

// Import individual course data
import { adhocClassesData } from './AdhocClasses'
import { dsaClassesData } from './DsaClasses'
import { webDevCohortData } from './WebDevCohort'
import { devopsCohortData } from './DevopsCohort'
import { web3CohortData } from './Web3Cohort'
import { solanaFellowshipData } from './SolanaFellowship'

// Export all courses
export const allCourses: Course[] = [
  adhocClassesData.course,
  dsaClassesData.course,
  webDevCohortData.course,
  devopsCohortData.course,
  web3CohortData.course,
  solanaFellowshipData.course
]

// Export individual course details
export const courseDetails: Record<string, any> = {
  'adhoc-classes': adhocClassesData,
  'dsa-classes': dsaClassesData,
  'web-dev-cohort': webDevCohortData,
  'devops-cohort': devopsCohortData,
  'web3-cohort': web3CohortData,
  'solana-fellowship': solanaFellowshipData
}

// Helper function
export const getCourseDetail = (id: string) => {
  return courseDetails[id]
}
