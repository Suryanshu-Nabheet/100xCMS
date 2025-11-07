import { getCourseDetail } from './coursesData'
import { CompleteWebDevDevOpsBlockchainUI } from './CompleteWebDevDevOpsBlockchain/CompleteWebDevDevOpsBlockchainUI'
import { CompleteWebDevDevOpsUI } from './CompleteWebDevDevOps/CompleteWebDevDevOpsUI'
import { CompleteWeb3BlockchainUI } from './CompleteWeb3Blockchain/CompleteWeb3BlockchainUI'
import { CompleteWebDevUI } from './CompleteWebDev/CompleteWebDevUI'
import { CompleteDevOpsUI } from './CompleteDevOps/CompleteDevOpsUI'
import { Live0to100CompleteUI } from './Live0to100Complete/Live0to100CompleteUI'
import { Live0to1UI } from './Live0to1/Live0to1UI'
import { Live1to100UI } from './Live1to100/Live1to100UI'
import { FullStackOpenSourceCohort1UI } from './FullStackOpenSourceCohort1/FullStackOpenSourceCohort1UI'

interface CourseDetailProps {
  courseId: string
  onBack: () => void
}

export function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const courseDetail = getCourseDetail(courseId)

  if (!courseDetail) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
          <p className="text-gray-400 mb-6">The requested course could not be found.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  // Render the appropriate UI component based on course ID
  switch (courseId) {
    case 'complete-web-dev-devops-blockchain':
      return <CompleteWebDevDevOpsBlockchainUI onBack={onBack} />
    case 'complete-web-dev-devops':
      return <CompleteWebDevDevOpsUI onBack={onBack} />
    case 'complete-web3-blockchain':
      return <CompleteWeb3BlockchainUI onBack={onBack} />
    case 'complete-web-dev':
      return <CompleteWebDevUI onBack={onBack} />
    case 'complete-devops':
      return <CompleteDevOpsUI onBack={onBack} />
    case 'live-0-100-complete':
      return <Live0to100CompleteUI onBack={onBack} />
    case 'live-0-1':
      return <Live0to1UI onBack={onBack} />
    case 'live-1-100':
      return <Live1to100UI onBack={onBack} />
    case 'full-stack-open-source-cohort-1':
      return <FullStackOpenSourceCohort1UI onBack={onBack} />
    default:
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
            <p className="text-gray-400 mb-6">The requested course could not be found.</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      )
  }
}
