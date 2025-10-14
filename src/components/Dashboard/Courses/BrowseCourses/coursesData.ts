import { webDevCohortData } from './WebDevCohort/data'
import { dsaClassesData } from './DsaClasses/data'
import { devopsCohortData } from './DevopsCohort/data'
import { web3CohortData } from './Web3Cohort/data'
import { solanaFellowshipData } from './SolanaFellowship/data'
import { adhocClassesData } from './AdhocClasses/data'

export interface Course {
  id: string
  title: string
  banner: string
  discordLink?: string
}

export interface CourseDetail {
  id: string
  title: string
  banner: string
  discordLink?: string
  modules: Array<{
    id: string
    title: string
    lessons: Array<{
      id: string
      title: string
      thumbnail: string
      duration: string
      completed: boolean
    }>
  }>
  whatYouWillLearn: string[]
  requirements: string[]
}

// Export all courses for the main page
export const allCourses: Course[] = [
  webDevCohortData,
  dsaClassesData,
  devopsCohortData,
  web3CohortData,
  solanaFellowshipData,
  adhocClassesData
]

// Export detailed course data
export const courseDetails: Record<string, CourseDetail> = {
  'web-dev-cohort': webDevCohortData,
  'dsa-classes': dsaClassesData,
  'devops-cohort': devopsCohortData,
  'web3-cohort': web3CohortData,
  'solana-fellowship': solanaFellowshipData,
  'adhoc-classes': adhocClassesData
}

// Helper function to get course detail
export const getCourseDetail = (courseId: string): CourseDetail | null => {
  return courseDetails[courseId] || null
}
