import React from 'react'
import { Clock, Users, Star, PlayCircle, BookOpen, Award } from 'lucide-react'
import { Course } from '../../types'

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
  onView?: (courseId: string) => void
  enrolled?: boolean
  progress?: number
  showProgress?: boolean
}

export function CourseCard({ course, onEnroll, onView, enrolled, progress = 0, showProgress }: CourseCardProps) {
  const handleClick = () => {
    if (enrolled && onView) {
      onView(course.id)
    } else if (onEnroll) {
      onEnroll(course.id)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="liquid-glass rounded-professional overflow-hidden border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group hover-lift w-full">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/50 transition-colors duration-300" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 glow-blue">
            <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 sm:gap-2">
          {course.price === 0 && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full text-[10px] sm:text-xs">
              FREE
            </span>
          )}
          <span className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full border ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>

        {/* Progress Bar for Enrolled Courses */}
        {showProgress && enrolled && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 sm:p-3">
            <div className="flex items-center justify-between text-xs text-white mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-1.5 sm:h-2 rounded-full transition-all duration-500 glow-blue"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 text-xs sm:text-sm font-medium truncate">{course.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-xs sm:text-sm">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{course.students.toLocaleString()}</span>
              <span className="sm:hidden">{course.students > 1000 ? `${Math.floor(course.students/1000)}k` : course.students}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 glow-blue">
            {course.category}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold text-white">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </div>
          <button
            onClick={handleClick}
            disabled={enrolled && !onView}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-professional font-medium transition-all duration-300 hover-lift text-sm ${
              enrolled
                ? onView
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 glow-blue'
                  : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 glow-blue'
            }`}
          >
            {enrolled ? (onView ? 'Continue' : 'Enrolled') : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  )
}