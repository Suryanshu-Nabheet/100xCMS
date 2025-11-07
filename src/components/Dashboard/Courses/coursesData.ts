import { fullStackOpenSourceCohort1Data } from './FullStackOpenSourceCohort1/data'
import { completeWebDevDevOpsBlockchainData } from './CompleteWebDevDevOpsBlockchain/data'
import { completeWebDevDevOpsData } from './CompleteWebDevDevOps/data'
import { completeWeb3BlockchainData } from './CompleteWeb3Blockchain/data'
import { completeWebDevData } from './CompleteWebDev/data'
import { completeDevOpsData } from './CompleteDevOps/data'
import { live0to100CompleteData } from './Live0to100Complete/data'
import { live0to1Data } from './Live0to1/data'
import { live1to100Data } from './Live1to100/data'

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
    description?: string
    lessons: CourseContent[]
  }>
  whatYouWillLearn?: string[]
  requirements?: string[]
}

// Export all courses for the main page
export const allCourses: Course[] = [
  completeWebDevDevOpsBlockchainData,
  completeWebDevDevOpsData,
  completeWeb3BlockchainData,
  completeWebDevData,
  completeDevOpsData,
  live0to100CompleteData,
  live0to1Data,
  live1to100Data,
  fullStackOpenSourceCohort1Data
]

// Export detailed course data
export const courseDetails: Record<string, CourseDetail> = {
  'complete-web-dev-devops-blockchain': completeWebDevDevOpsBlockchainData,
  'complete-web-dev-devops': completeWebDevDevOpsData,
  'complete-web3-blockchain': completeWeb3BlockchainData,
  'complete-web-dev': completeWebDevData,
  'complete-devops': completeDevOpsData,
  'live-0-100-complete': live0to100CompleteData,
  'live-0-1': live0to1Data,
  'live-1-100': live1to100Data,
  'full-stack-open-source-cohort-1': fullStackOpenSourceCohort1Data
}

// Helper function to get course detail
export const getCourseDetail = (courseId: string): CourseDetail | null => {
  return courseDetails[courseId] || null
}
