import React, { useState } from 'react'
import { BookOpen, Clock, CheckCircle, PlayCircle, BarChart3 } from 'lucide-react'
import { CourseCard } from './CourseCard'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'

interface MyCoursesProps {
  onNavigate: (view: string, courseId?: string) => void
}

export function MyCourses({ onNavigate }: MyCoursesProps) {
  const { user } = useAuth()
  const { getUserEnrolledCourses, getCourseProgress, enrollments } = useApp()
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all')

  const enrolledCourses = getUserEnrolledCourses()
  
  const coursesWithProgress = enrolledCourses.map(course => ({
    ...course,
    progress: getCourseProgress(course.id),
    enrollment: enrollments.find(e => e.userId === user?.id && e.courseId === course.id)
  }))

  const filteredCourses = coursesWithProgress.filter(course => {
    switch (filter) {
      case 'in-progress':
        return course.progress > 0 && course.progress < 100
      case 'completed':
        return course.progress === 100
      default:
        return true
    }
  })

  const stats = {
    total: coursesWithProgress.length,
    inProgress: coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100).length,
    completed: coursesWithProgress.filter(c => c.progress === 100).length
  }

  const handleViewCourse = (courseId: string) => {
    onNavigate('course-detail', courseId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <p className="text-gray-400 mt-1">Continue your learning journey</p>
        </div>
        
        <button
          onClick={() => onNavigate('browse')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Browse More Courses
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Courses</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.completed}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All Courses', count: stats.total },
          { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
          { key: 'completed', label: 'Completed', count: stats.completed }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={handleViewCourse}
              enrolled={true}
              progress={course.progress}
              showProgress={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {filter === 'completed' ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : filter === 'in-progress' ? (
              <PlayCircle className="w-8 h-8 text-white" />
            ) : (
              <BookOpen className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            {filter === 'completed' 
              ? 'No completed courses yet'
              : filter === 'in-progress'
              ? 'No courses in progress'
              : 'No enrolled courses'
            }
          </h3>
          <p className="text-gray-500 mb-6">
            {filter === 'completed'
              ? 'Complete some courses to see them here.'
              : filter === 'in-progress'
              ? 'Start learning to see your progress here.'
              : 'Enroll in courses to start your learning journey.'
            }
          </p>
          <button
            onClick={() => onNavigate('browse')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  )
}