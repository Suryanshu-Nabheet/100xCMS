import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { devopsCohortData } from './data'
import { VideoPlayer } from '../../../Video/VideoPlayer'

interface DevopsCohortUIProps {
  onBack: () => void
}

export function DevopsCohortUI({ onBack }: DevopsCohortUIProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null)

  const handleVideoClick = (lesson: any) => {
    setSelectedVideo({
      src: lesson.videoUrl,
      title: lesson.title
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
              <h1 className="text-4xl font-bold text-white mb-2">{devopsCohortData.title}</h1>
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
          
          {/* All Lessons in One Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devopsCohortData.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                onClick={() => handleVideoClick(lesson)}
              >
                {/* Lesson Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
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
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          src={selectedVideo.src}
          title={selectedVideo.title}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  )
}
