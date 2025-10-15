import { Shield, Eye, Lock, Database } from 'lucide-react'

export const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Privacy Policy</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Secure Authentication</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Eye className="w-4 h-4 text-blue-400" />
          <span>Transparent Data Usage</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>Encrypted Storage</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Database className="w-4 h-4 text-blue-400" />
          <span>Minimal Data Collection</span>
        </div>
      </div>
    </div>
  )
}
