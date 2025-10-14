import { Play, MessageCircle } from 'lucide-react'

export interface Course {
  id: string
  title: string
  banner: string
  discordLink?: string
}

interface CourseCardProps {
  course: Course
  onView?: (courseId: string) => void
  onJoinDiscord?: (discordLink: string) => void
}

export function CourseCard({ course, onView, onJoinDiscord }: CourseCardProps) {
  const handleViewCourse = () => {
    if (onView) {
      onView(course.id)
    }
  }

  const handleJoinDiscord = () => {
    if (onJoinDiscord && course.discordLink) {
      onJoinDiscord(course.discordLink)
    }
  }

  return (
    <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden">
      {/* Course Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover"
        />


        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-4">
          {course.title}
        </h3>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleViewCourse}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Play className="w-4 h-4" />
            View Course
          </button>

          {course.discordLink && (
            <button
              onClick={handleJoinDiscord}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Join Discord
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
