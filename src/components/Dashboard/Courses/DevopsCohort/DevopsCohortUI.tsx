import { useState } from 'react'
import { ArrowLeft, Play, FileText, ChevronRight, BookOpen } from 'lucide-react'
import { devopsCohortData } from './data'
import { VideoPlayer } from '../../Content/Video/VideoPlayer'
import { PdfViewer } from '../../Content/Pdf/PdfViewer'

interface DevopsCohortUIProps {
  onBack: () => void
}

export function DevopsCohortUI({ onBack }: DevopsCohortUIProps) {
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [selectedContent, setSelectedContent] = useState<{ 
    type: 'video' | 'pdf'
    src: string
    title: string
    description?: string
    author?: string
    timestamps?: any[]
    content?: any
  } | null>(null)

  const handleModuleClick = (module: any) => {
    setSelectedModule(module)
  }

  const handleContentClick = (lesson: any) => {
    if (lesson.contentType === 'video') {
      setSelectedContent({
        type: 'video',
        src: lesson.videoUrl,
        title: lesson.title,
        description: lesson.description,
        author: lesson.author,
        timestamps: lesson.timestamps || [],
        content: lesson.content
      })
    } else if (lesson.contentType === 'pdf') {
      setSelectedContent({
        type: 'pdf',
        src: lesson.pdfUrl,
        title: lesson.title,
        description: lesson.description,
        author: lesson.author
      })
    }
  }

  const handleCloseContent = () => {
    setSelectedContent(null)
  }

  const handleBackToModules = () => {
    setSelectedModule(null)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={selectedModule ? handleBackToModules : onBack}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                {selectedModule ? selectedModule.title : devopsCohortData.title}
              </h1>
              <p className="text-gray-300 text-lg">
                {selectedModule ? selectedModule.description : 'By Suryanshu Nabheet'}
              </p>
            </div>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedModule ? (
          /* Modules View */
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Course Modules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devopsCohortData.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                  onClick={() => handleModuleClick(module)}
                >
                  {/* Module Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="/public/Content-Cover.png"
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Module Type Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Module
                      </div>
                    </div>
                    
                    {/* Lesson Count Info */}
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {module.lessons.length} lessons
                      </div>
                    </div>
                    
                    {/* Centered Title Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h4 className="text-white font-bold text-lg text-center px-4 line-clamp-3 drop-shadow-2xl">
                        {module.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Lessons View */
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Module Lessons</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedModule.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                  onClick={() => handleContentClick(lesson)}
                >
                  {/* Lesson Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Content Type Indicator */}
                    <div className="absolute top-3 right-3">
                      {lesson.contentType === 'video' ? (
                        <div className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Video
                        </div>
                      ) : (
                        <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          PDF
                        </div>
                      )}
                    </div>
                    
                    {/* Duration/Type Info */}
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {lesson.duration}
                      </div>
                    </div>
                    
                    {/* Centered Title Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h4 className="text-white font-bold text-lg text-center px-4 line-clamp-3 drop-shadow-2xl">
                        {lesson.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Content Viewer Modal */}
      {selectedContent && (
        <>
          {selectedContent.type === 'video' && (
            <VideoPlayer
              src={selectedContent.src}
              title={selectedContent.title}
              description={selectedContent.description}
              author={selectedContent.author}
              timestamps={selectedContent.timestamps}
              content={selectedContent.content}
              onClose={handleCloseContent}
            />
          )}
          {selectedContent.type === 'pdf' && (
            <PdfViewer
              src={selectedContent.src}
              title={selectedContent.title}
              onClose={handleCloseContent}
            />
          )}
        </>
      )}
    </div>
  )
}