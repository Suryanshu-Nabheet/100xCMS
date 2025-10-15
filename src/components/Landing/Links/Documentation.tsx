import { FileText, Book, Code2, Settings } from 'lucide-react'

export const Documentation = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Documentation</h4>
      <div className="space-y-2">
        <a 
          href="#api-docs" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <FileText className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>API Documentation</span>
        </a>
        <a 
          href="#guides" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Book className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>User Guides</span>
        </a>
        <a 
          href="#tutorials" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Code2 className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Tutorials</span>
        </a>
        <a 
          href="#admin-guide" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Settings className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Admin Guide</span>
        </a>
      </div>
    </div>
  )
}
