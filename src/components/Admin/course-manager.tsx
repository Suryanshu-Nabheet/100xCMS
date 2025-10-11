'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Trash2, BookOpen, Edit, AlertCircle } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: Lesson[]
  status: 'draft' | 'published'
  createdAt: string
}

interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  order: number
}

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([])

  // Load hardcoded courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { courses: hardcodedCourses } = await import('../../data/courses')
        setCourses(hardcodedCourses)
      } catch (error) {
        console.error('Error loading courses:', error)
        setCourses([])
      }
    }

    loadCourses()
  }, [])

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Course Manager</h1>
          <p className="text-blue-200">Create and manage courses for your platform</p>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">Hardcoded Course Management</h3>
                <p className="text-blue-200 text-sm mb-2">
                  Courses are managed through hardcoded files in your codebase. All courses are 100% free.
                </p>
                <div className="text-blue-300 text-xs space-y-1">
                  <p>• View course details, thumbnails, and videos</p>
                  <p>• Test course functionality and content</p>
                  <p>• Monitor enrollment and engagement</p>
                  <p>• To add/modify courses, update the hardcoded course files</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Manage Courses</h2>

            {courses.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                  <p className="text-gray-400 mb-6">
                    No hardcoded courses have been added to the system yet.
                  </p>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-200 text-sm">
                      To add courses, create course files in your codebase and import them into the course management system. All courses are 100% free.
                    </p>
                  </div>
                </div>
              </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-blue-200 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.status === 'published' 
                            ? 'bg-green-500/20 text-green-200' 
                            : 'bg-yellow-500/20 text-yellow-200'
                        }`}>
                          {course.status}
                        </span>
                        <span className="text-green-400 font-semibold">Free</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-500/20 text-blue-200 px-3 py-2 rounded text-sm hover:bg-blue-500/30 transition-colors">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View
                        </button>
                        <button className="flex-1 bg-green-500/20 text-green-200 px-3 py-2 rounded text-sm hover:bg-green-500/30 transition-colors">
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            // Course deletion would be handled by removing from hardcoded files
                            console.log('Delete course:', course.id)
                          }}
                          className="bg-red-500/20 text-red-200 px-3 py-2 rounded text-sm hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
