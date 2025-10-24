import { webDevCohortData } from './WebDevCohort/data'
import { dsaClassesData } from './DsaClasses/data'
import { devopsCohortData } from './DevopsCohort/data'
import { web3CohortData } from './Web3Cohort/data'
import { solanaFellowshipData } from './SolanaFellowship/data'
import { adhocClassesData } from './AdhocClasses/data'
import { ethicalHackingData } from './EthicalHacking/data'
import { iosDevelopmentData } from './IOSDevelopment/data'
import { androidDevelopmentData } from './AndroidDevelopment/data'

export interface Course {
  id: string
  title: string
  banner: string
  discordLink?: string
}

export interface CourseContent {
  id: string
  title: string
  thumbnail: string
  duration: string
  completed: boolean
  contentType: 'video' | 'pdf'
  videoUrl?: string
  pdfUrl?: string
  timestamps?: Array<{
    time: number
    title: string
  }>
  description?: string
  author?: string
  content?: {
    notes?: string
    links?: Array<{
      title: string
      url: string
    }>
  }
}

export interface CourseDetail {
  id: string
  title: string
  banner: string
  discordLink?: string
  modules: Array<{
    id: string
    title: string
    lessons: CourseContent[]
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
  adhocClassesData,
  ethicalHackingData,
  iosDevelopmentData,
  androidDevelopmentData
]

// Export detailed course data
export const courseDetails: Record<string, CourseDetail> = {
  'web-dev-cohort': webDevCohortData,
  'dsa-classes': dsaClassesData,
  'devops-cohort': devopsCohortData,
  'web3-cohort': web3CohortData,
  'solana-fellowship': solanaFellowshipData,
  'adhoc-classes': adhocClassesData,
  'ethical-hacking': ethicalHackingData,
  'ios-development': iosDevelopmentData,
  'android-development': androidDevelopmentData
}

// Helper function to get course detail
export const getCourseDetail = (courseId: string): CourseDetail | null => {
  return courseDetails[courseId] || null
}
