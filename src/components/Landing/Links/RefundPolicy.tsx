import { DollarSign, RefreshCw, Clock, CheckCircle } from 'lucide-react'

export const RefundPolicy = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Refund Policy</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span>100% Free Platform</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <RefreshCw className="w-4 h-4 text-blue-400" />
          <span>No Payment Required</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Instant Access</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>No Refunds Needed</span>
        </div>
      </div>
    </div>
  )
}
