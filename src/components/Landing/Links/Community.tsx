import { MessageCircle, Users, Calendar, Award } from 'lucide-react'

export const Community = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Community</h4>
      <div className="space-y-2">
        <a 
          href="#discord" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <MessageCircle className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Discord Server</span>
        </a>
        <a 
          href="#forums" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Users className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Discussion Forums</span>
        </a>
        <a 
          href="#events" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Calendar className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Community Events</span>
        </a>
        <a 
          href="#contribute" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Award className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Contribute</span>
        </a>
      </div>
    </div>
  )
}
