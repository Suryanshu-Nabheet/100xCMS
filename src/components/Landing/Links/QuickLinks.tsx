import { BookOpen, Users, Settings, HelpCircle } from 'lucide-react'

export const QuickLinks = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Quick Links</h4>
      <div className="space-y-2">
        <a 
          href="#courses" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <BookOpen className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Browse Courses</span>
        </a>
        <a 
          href="#about" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Users className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>About Us</span>
        </a>
        <a 
          href="#features" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Settings className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Features</span>
        </a>
        <a 
          href="#support" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <HelpCircle className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Support</span>
        </a>
      </div>
    </div>
  )
}
