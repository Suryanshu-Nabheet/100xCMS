import { getCourseDetail } from './coursesData'
import { WebDevCohortUI } from './WebDevCohort/WebDevCohortUI'
import { DsaClassesUI } from './DsaClasses/DsaClassesUI'
import { DevopsCohortUI } from './DevopsCohort/DevopsCohortUI'
import { Web3CohortUI } from './Web3Cohort/Web3CohortUI'
import { SolanaFellowshipUI } from './SolanaFellowship/SolanaFellowshipUI'
import { AdhocClassesUI } from './AdhocClasses/AdhocClassesUI'

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
    case 'web-dev-cohort':
      return <WebDevCohortUI onBack={onBack} />
    case 'dsa-classes':
      return <DsaClassesUI onBack={onBack} />
    case 'devops-cohort':
      return <DevopsCohortUI onBack={onBack} />
    case 'web3-cohort':
      return <Web3CohortUI onBack={onBack} />
    case 'solana-fellowship':
      return <SolanaFellowshipUI onBack={onBack} />
    case 'adhoc-classes':
      return <AdhocClassesUI onBack={onBack} />
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
