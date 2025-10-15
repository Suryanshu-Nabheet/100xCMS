import { Scale, Shield, FileCheck, Gavel } from 'lucide-react'

export const Legal = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Legal</h4>
      <div className="space-y-2">
        <a 
          href="#terms" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Scale className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Terms & Conditions</span>
        </a>
        <a 
          href="#privacy" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Shield className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Privacy Policy</span>
        </a>
        <a 
          href="#refund" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <FileCheck className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Refund Policy</span>
        </a>
        <a 
          href="#license" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Gavel className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>License</span>
        </a>
      </div>
    </div>
  )
}
