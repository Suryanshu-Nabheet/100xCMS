import { useState } from 'react'
import { ArrowLeft, Play, FileText, BookOpen } from 'lucide-react'
import { live0to1Data } from './data'
import { VideoPlayer } from '../../Content/Video/VideoPlayer'
import { PdfViewer } from '../../Content/Pdf/PdfViewer'

interface Live0to1UIProps {
  onBack: () => void
}

interface Module {
  id: string
  title: string
  description?: string
  lessons: Array<{
    id: string
    title: string
    thumbnail: string
    duration: string
    completed: boolean
    contentType: 'video' | 'pdf'
    videoUrl?: string
    pdfUrl?: string
    description?: string
    author?: string
    timestamps?: Array<{ time: number; title: string }>
    content?: {
      notes?: string
      links?: Array<{ title: string; url: string }>
    }
  }>
}

export function Live0to1UI({ onBack }: CompleteWebDevDevOpsUIProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedContent, setSelectedContent] = useState<{ 
    type: 'video' | 'pdf'
    src: string
    title: string
    description?: string
    author?: string
    timestamps?: Array<{ time: number; title: string }>
    content?: {
      notes?: string
      links?: Array<{ title: string; url: string }>
    }
  } | null>(null)

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module)
  }

  const handleContentClick = (lesson: Module['lessons'][0]) => {
    if (lesson.contentType === 'video' && lesson.videoUrl) {
      setSelectedContent({
        type: 'video',
        src: lesson.videoUrl,
        title: lesson.title,
        description: lesson.description,
        author: lesson.author,
        timestamps: lesson.timestamps || [],
        content: lesson.content
      })
    } else if (lesson.contentType === 'pdf' && lesson.pdfUrl) {
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
    <div className="min-h-screen bg-black" data-course-id="live-0-1">
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
                {live0to1Data.title}
              </h1>
              <p className="text-gray-300 text-lg">
                {selectedModule ? selectedModule.description : 'By Suryanshu Nabheet'}
              </p>
            </div>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedModule ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Course Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {live0to1Data.modules.map((module) => (
                <div
                  key={module.id}
                  data-module-id={module.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="/public/Content-Cover.png"
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Module
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {module.lessons.length} lessons
                      </div>
                    </div>
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Module Lessons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedModule.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  data-lesson-id={lesson.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                  onClick={() => handleContentClick(lesson)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
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
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {lesson.duration}
                      </div>
                    </div>
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

