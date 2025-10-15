import { Code, Database, Globe, Smartphone } from 'lucide-react'

export const Projects = () => {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-white font-semibold text-sm mb-2">Projects</h4>
      <div className="space-y-2">
        <a 
          href="#web-dev" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Code className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Web Development</span>
        </a>
        <a 
          href="#dsa" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Database className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>DSA Classes</span>
        </a>
        <a 
          href="#devops" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Globe className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>DevOps Cohort</span>
        </a>
        <a 
          href="#mobile" 
          className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors text-sm group"
        >
          <Smartphone className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span>Mobile Development</span>
        </a>
      </div>
    </div>
  )
}
