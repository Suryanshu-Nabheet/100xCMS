import { Play } from 'lucide-react'

export interface Course {
  id: string
  title: string
  banner: string
  discordLink?: string
}

interface CourseCardProps {
  course: Course
  onView?: (courseId: string) => void
}

export function CourseCard({ course, onView }: CourseCardProps) {
  const handleViewCourse = () => {
    if (onView) {
      onView(course.id)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Course Banner - Fixed aspect ratio */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 bg-gray-900">
        {/* Title */}
        <div className="flex-1 mb-5">
          <h3 className="text-xl font-semibold text-white line-clamp-2 leading-tight">
            {course.title}
          </h3>
        </div>

        {/* Button - Always at bottom */}
        <button
          onClick={handleViewCourse}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-base"
        >
          <Play className="w-4 h-4" />
          View Course
        </button>
      </div>
    </div>
  )
}
