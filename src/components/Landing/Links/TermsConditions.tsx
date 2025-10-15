import { Scale, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export const TermsConditions = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Terms & Conditions</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>Free Access to All Courses</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>No Enrollment Required</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <AlertCircle className="w-4 h-4 text-yellow-400" />
          <span>Educational Use Only</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <XCircle className="w-4 h-4 text-red-400" />
          <span>No Commercial Use</span>
        </div>
      </div>
    </div>
  )
}
