import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { iosDevelopmentData } from './data'
import { VideoPlayer } from '../../Video/VideoPlayer'

interface IOSDevelopmentUIProps {
  onBack: () => void
}

export function IOSDevelopmentUI({ onBack }: IOSDevelopmentUIProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string; timestamps: any[] } | null>(null)

  const handleVideoClick = (lesson: any) => {
    setSelectedVideo({
      src: lesson.videoUrl,
      title: lesson.title,
      timestamps: lesson.timestamps || []
    })
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">{iosDevelopmentData.title}</h1>
              <p className="text-gray-300 text-lg">By Suryanshu Nabheet</p>
            </div>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Course Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {iosDevelopmentData.lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => handleVideoClick(lesson)}
                className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white text-center group-hover:text-blue-400 transition-colors duration-300 drop-shadow-2xl">
                    {lesson.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          src={selectedVideo.src}
          title={selectedVideo.title}
          timestamps={selectedVideo.timestamps}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  )
}
