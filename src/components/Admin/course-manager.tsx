'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Trash2, BookOpen, Edit, Plus, Save, X } from 'lucide-react'
import { InputSanitizer } from './InputSanitizer'
// Admin authentication is handled by AdminGuard component

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
  enrolledStudents: number
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
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    category: '',
    level: 'beginner',
    duration: '',
    lessons: [],
    status: 'draft'
  })
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    order: 1
  })

  // Admin authentication is handled by AdminGuard component

  // Load courses from localStorage
  useEffect(() => {
    const loadCourses = () => {
      try {
        const storedCourses = localStorage.getItem('cms_courses')
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses))
        } else {
          // Initialize with empty array
          setCourses([])
        }
      } catch (error) {
        console.error('Error loading courses:', error)
        setCourses([])
      }
    }

    loadCourses()
  }, [])

  // Save courses to localStorage
  const saveCourses = (updatedCourses: Course[]) => {
    localStorage.setItem('cms_courses', JSON.stringify(updatedCourses))
    setCourses(updatedCourses)
  }

  const handleCreateCourse = () => {
    // Sanitize inputs
    const sanitizedTitle = InputSanitizer.sanitizeText(newCourse.title || '')
    const sanitizedDescription = InputSanitizer.sanitizeText(newCourse.description || '')
    const sanitizedCategory = InputSanitizer.sanitizeText(newCourse.category || '')
    const sanitizedDuration = InputSanitizer.sanitizeText(newCourse.duration || '')
    const sanitizedThumbnail = InputSanitizer.sanitizeUrl(newCourse.thumbnail || '')
    
    if (!sanitizedTitle) {
      alert('Course title is required')
      return
    }
    if (!sanitizedDescription) {
      alert('Course description is required')
      return
    }
    
    try {
      const course: Course = {
        id: `course-${Date.now()}-${InputSanitizer.generateSecureToken(8)}`,
        title: sanitizedTitle,
        description: sanitizedDescription,
        thumbnail: sanitizedThumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        price: newCourse.price || 0,
        category: sanitizedCategory || 'General',
        level: newCourse.level || 'beginner',
        duration: sanitizedDuration || '1 hour',
        lessons: newCourse.lessons || [],
        status: newCourse.status || 'draft',
        createdAt: new Date().toISOString(),
        enrolledStudents: 0
      }
      
      const updatedCourses = [...courses, course]
      saveCourses(updatedCourses)
      setNewCourse({
        title: '',
        description: '',
        thumbnail: '',
        price: 0,
        category: '',
        level: 'beginner',
        duration: '',
        lessons: [],
        status: 'draft'
      })
      setShowCreateCourse(false)
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course. Please try again.')
    }
  }

  const handleUpdateCourse = (updatedCourse: Course) => {
    try {
      if (!updatedCourse.title?.trim()) {
        alert('Course title is required')
        return
      }
      if (!updatedCourse.description?.trim()) {
        alert('Course description is required')
        return
      }
      
      const updatedCourses = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
      saveCourses(updatedCourses)
      setEditingCourse(null)
    } catch (error) {
      console.error('Error updating course:', error)
      alert('Failed to update course. Please try again.')
    }
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const updatedCourses = courses.filter(c => c.id !== courseId)
        saveCourses(updatedCourses)
      } catch (error) {
        console.error('Error deleting course:', error)
        alert('Failed to delete course. Please try again.')
      }
    }
  }

  const handleAddLesson = (courseId: string) => {
    // Sanitize lesson inputs
    const sanitizedTitle = InputSanitizer.sanitizeText(newLesson.title || '')
    const sanitizedDescription = InputSanitizer.sanitizeText(newLesson.description || '')
    const sanitizedVideoUrl = InputSanitizer.sanitizeUrl(newLesson.videoUrl || '')
    const sanitizedDuration = InputSanitizer.sanitizeText(newLesson.duration || '')
    
    if (!sanitizedTitle) {
      alert('Lesson title is required')
      return
    }
    if (!sanitizedVideoUrl) {
      alert('Video URL is required')
      return
    }
    
    try {
      const course = courses.find(c => c.id === courseId)
      if (course) {
        const lesson = {
          id: `lesson-${Date.now()}-${InputSanitizer.generateSecureToken(8)}`,
          title: sanitizedTitle,
          description: sanitizedDescription,
          videoUrl: sanitizedVideoUrl,
          duration: sanitizedDuration || 'Unknown',
          order: course.lessons.length + 1
        }
        const updatedCourse = {
          ...course,
          lessons: [...course.lessons, lesson]
        }
        handleUpdateCourse(updatedCourse)
        setNewLesson({
          title: '',
          description: '',
          videoUrl: '',
          duration: '',
          order: 1
        })
      }
    } catch (error) {
      console.error('Error adding lesson:', error)
      alert('Failed to add lesson. Please try again.')
    }
  }

  const handleDeleteLesson = (courseId: string, lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      try {
        const course = courses.find(c => c.id === courseId)
        if (course) {
          const updatedCourse = {
            ...course,
            lessons: course.lessons.filter(l => l.id !== lessonId)
          }
          handleUpdateCourse(updatedCourse)
        }
      } catch (error) {
        console.error('Error deleting lesson:', error)
        alert('Failed to delete lesson. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
          <h1 className="text-3xl font-bold text-white mb-2">Course Manager</h1>
          <p className="text-blue-200">Create and manage courses for your platform</p>
            </div>
            <button
              onClick={() => setShowCreateCourse(true)}
              className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Course
            </button>
          </div>
        </div>

        {/* Create Course Modal */}
        {showCreateCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Create New Course</h3>
                <button
                  onClick={() => setShowCreateCourse(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Course Title</label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Category</label>
                    <input
                      type="text"
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="e.g., Programming, Design"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 h-24"
                    placeholder="Enter course description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Level</label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Status</label>
                    <select
                      value={newCourse.status}
                      onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value as 'draft' | 'published' })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                
              <div>
                  <label className="block text-sm font-medium text-white mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={newCourse.thumbnail}
                    onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateCourse}
                    className="flex-1 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Create Course
                  </button>
                  <button
                    onClick={() => setShowCreateCourse(false)}
                    className="flex-1 bg-gray-500/20 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Manage Courses</h2>
              <div className="text-blue-200 text-sm">
                {courses.length} total courses
              </div>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                  <p className="text-gray-400 mb-6">
                    Create your first course to get started.
                  </p>
                  <button
                    onClick={() => setShowCreateCourse(true)}
                    className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Create Course
                  </button>
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
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300 text-xs">Category</span>
                        <span className="text-white text-xs">{course.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300 text-xs">Level</span>
                        <span className="text-white text-xs capitalize">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300 text-xs">Lessons</span>
                        <span className="text-white text-xs">{course.lessons.length}</span>
                      </div>
                    </div>
                      
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
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="flex-1 bg-blue-500/20 text-blue-200 px-3 py-2 rounded text-sm hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                          View
                        </button>
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="flex-1 bg-green-500/20 text-green-200 px-3 py-2 rounded text-sm hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button 
                        onClick={() => handleDeleteCourse(course.id)}
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

        {/* Edit Course Modal */}
        {editingCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Edit Course: {editingCourse.title}</h3>
                <button
                  onClick={() => setEditingCourse(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Course Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Category</label>
                    <input
                      type="text"
                      value={editingCourse.category}
                      onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 h-24"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Level</label>
                    <select
                      value={editingCourse.level}
                      onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Duration</label>
                    <input
                      type="text"
                      value={editingCourse.duration}
                      onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Status</label>
                    <select
                      value={editingCourse.status}
                      onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value as 'draft' | 'published' })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Thumbnail URL</label>
                    <input
                      type="url"
                      value={editingCourse.thumbnail}
                      onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                </div>

                {/* Lessons Management */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Lessons ({editingCourse.lessons.length})</h4>
                    <button
                      onClick={() => handleAddLesson(editingCourse.id)}
                      className="bg-blue-500/20 text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lesson
                    </button>
                  </div>
                  
                  {/* Add New Lesson Form */}
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-medium mb-3">Add New Lesson</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Lesson Title</label>
                        <input
                          type="text"
                          value={newLesson.title}
                          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          placeholder="Enter lesson title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Duration</label>
                        <input
                          type="text"
                          value={newLesson.duration}
                          onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          placeholder="e.g., 15 minutes"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-white mb-2">Description</label>
                      <textarea
                        value={newLesson.description}
                        onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 h-20"
                        placeholder="Enter lesson description"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-white mb-2">Video URL</label>
                      <input
                        type="url"
                        value={newLesson.videoUrl}
                        onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>
                  </div>
                  
                  {/* Existing Lessons */}
                  <div className="space-y-3">
                    {editingCourse.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs">
                              {index + 1}
                            </span>
                            <div>
                              <h6 className="text-white font-medium">{lesson.title}</h6>
                              <p className="text-blue-200 text-sm">{lesson.duration}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteLesson(editingCourse.id, lesson.id)}
                            className="bg-red-500/20 text-red-200 px-2 py-1 rounded text-sm hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {lesson.description && (
                          <p className="text-blue-200 text-sm mt-2">{lesson.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateCourse(editingCourse)}
                    className="flex-1 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingCourse(null)}
                    className="flex-1 bg-gray-500/20 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
