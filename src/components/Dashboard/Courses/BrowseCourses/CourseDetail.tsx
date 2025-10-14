import { useState } from 'react'
import { ArrowLeft, Bookmark, Play, Clock, CheckCircle } from 'lucide-react'
import { getCourseDetail } from './Courses/coursesData'

interface CourseDetailProps {
  courseId: string
  onBack: () => void
}

export function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const [activeModule, setActiveModule] = useState(0)
  const courseDetail = getCourseDetail(courseId)

  if (!courseDetail) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
          <p className="text-gray-400 mb-6">The requested course could not be found.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  const { course, modules } = courseDetail

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <p className="text-gray-300">{course.instructor}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Course Content</h2>
              
              {/* Modules */}
              {modules.map((module: any, moduleIndex: number) => (
                <div key={module.id} className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{module.title}</h3>
                    <button
                      onClick={() => setActiveModule(moduleIndex)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeModule === moduleIndex
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {activeModule === moduleIndex ? 'Hide' : 'Show'} Lessons
                    </button>
                  </div>
                  
                  {activeModule === moduleIndex && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {module.lessons.map((lesson: any) => (
                        <div
                          key={lesson.id}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                        >
                          {/* Lesson Thumbnail */}
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={lesson.thumbnail}
                              alt={lesson.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute top-2 right-2">
                              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </div>
                            </div>
                          </div>

                          {/* Lesson Content */}
                          <div className="p-4">
                            <h4 className="text-white font-medium mb-2 line-clamp-2">
                              {lesson.title}
                            </h4>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {lesson.description}
                            </p>
                            
                            {/* Lesson Footer */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                  <Bookmark className="w-4 h-4 text-gray-400" />
                                </button>
                                {lesson.completed && (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500 capitalize">
                                {lesson.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-6">
              {/* Course Info */}
              <div className="mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                
                {/* Course Stats */}
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons:</span>
                    <span>{course.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
              </div>

              {/* Course Features */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">What you'll learn:</h4>
                <ul className="space-y-2">
                  {course.whatYouWillLearn.slice(0, 5).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {course.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="text-sm text-gray-300">
                      • {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Start Learning
                </button>
                {course.discordLink && (
                  <button
                    onClick={() => window.open(course.discordLink, '_blank')}
                    className="w-full border border-white/20 text-white py-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Join Discord Community
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
