import React, { useState } from 'react'
import { ArrowLeft, Play, Clock, CheckCircle, Lock, BookOpen, Users, Star, Award } from 'lucide-react'
import { VideoPlayer } from '../Video/VideoPlayer'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'

interface CourseDetailProps {
  courseId: string
  onBack: () => void
}

export function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const { user } = useAuth()
  const { courses, getCourseProgress, getLessonProgress, updateLessonProgress } = useApp()
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [notes, setNotes] = useState('')

  const course = courses.find(c => c.id === courseId)
  const courseProgress = getCourseProgress(courseId)

  if (!course) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-white mb-2">Course not found</h2>
        <button
          onClick={onBack}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Go back
        </button>
      </div>
    )
  }

  const selectedLesson = selectedLessonId 
    ? course.lessons.find(l => l.id === selectedLessonId)
    : course.lessons[0]

  const lessonProgress = selectedLesson ? getLessonProgress(selectedLesson.id) : undefined

  const handleLessonComplete = () => {
    if (!selectedLesson) return
    
    updateLessonProgress(selectedLesson.id, {
      completed: true,
      watchTime: selectedLesson.duration,
      completedAt: new Date().toISOString()
    })
  }

  const handleVideoProgress = (progress: number) => {
    if (!selectedLesson) return
    
    const watchTime = Math.floor((progress / 100) * selectedLesson.duration)
    updateLessonProgress(selectedLesson.id, {
      watchTime
    })
  }

  const completedLessons = course.lessons.filter(lesson => {
    const progress = getLessonProgress(lesson.id)
    return progress?.completed
  }).length

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <p className="text-gray-400 mt-1">by {course.instructor}</p>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Course Progress</h3>
          <span className="text-2xl font-bold text-blue-400">{courseProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${courseProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{completedLessons} of {course.lessons.length} lessons completed</span>
          <span>{course.duration} total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player and Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLesson && (
            <>
              {/* Video Player */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <VideoPlayer
                  src={selectedLesson.videoUrl}
                  onProgress={handleVideoProgress}
                  onComplete={handleLessonComplete}
                />
              </div>

              {/* Lesson Info */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">{selectedLesson.title}</h2>
                    <p className="text-gray-400 mb-4">{selectedLesson.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(selectedLesson.duration)}</span>
                      </div>
                      {lessonProgress?.completed && (
                        <div className="flex items-center space-x-1 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!lessonProgress?.completed && (
                    <button
                      onClick={handleLessonComplete}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>

                {/* Resources */}
                {selectedLesson.resources && selectedLesson.resources.length > 0 && (
                  <div className="border-t border-gray-700/50 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
                    <div className="space-y-2">
                      {selectedLesson.resources.map(resource => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes about this lesson..."
                  className="w-full h-32 bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
                <button className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Save Notes
                </button>
              </div>
            </>
          )}
        </div>

        {/* Lesson List */}
        <div className="space-y-6">
          {/* Course Stats */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Course Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Students</span>
                </div>
                <span className="text-white font-medium">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Rating</span>
                </div>
                <span className="text-white font-medium">{course.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Lessons</span>
                </div>
                <span className="text-white font-medium">{course.lessons.length}</span>
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Lessons</h3>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => {
                const progress = getLessonProgress(lesson.id)
                const isSelected = selectedLesson?.id === lesson.id
                const isCompleted = progress?.completed
                const canAccess = lesson.isFree || index === 0 || 
                  (index > 0 && getLessonProgress(course.lessons[index - 1].id)?.completed)

                return (
                  <button
                    key={lesson.id}
                    onClick={() => canAccess && setSelectedLessonId(lesson.id)}
                    disabled={!canAccess}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                        : canAccess
                        ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50'
                        : 'bg-gray-800/30 border border-gray-700/30 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {!canAccess ? (
                          <Lock className="w-5 h-5 text-gray-500" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium truncate ${
                          canAccess ? 'text-white' : 'text-gray-500'
                        }`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${
                            canAccess ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {formatDuration(lesson.duration)}
                          </span>
                          {lesson.isFree && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}