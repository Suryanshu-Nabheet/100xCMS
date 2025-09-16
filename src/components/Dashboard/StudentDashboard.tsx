import React from 'react'
import { BookOpen, Clock, TrendingUp, PlayCircle, CheckCircle, Target, Zap } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { BackgroundGradient } from '../ui/background-gradient'
import { Spotlight } from '../ui/spotlight'
import { TextGenerateEffect } from '../ui/text-generate-effect'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'

interface StudentDashboardProps {
  onNavigate: (view: string) => void
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const { user } = useAuth()
  const { userStats, getUserEnrolledCourses, getCourseProgress } = useApp()
  const enrolledCourses = getUserEnrolledCourses()

  const recentCourses = enrolledCourses.slice(0, 3).map(course => ({
    ...course,
    progress: getCourseProgress(course.id)
  }))

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Welcome Section */}
      <div className="liquid-glass rounded-professional p-4 sm:p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Welcome back, {user?.fullName?.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm sm:text-base text-white/70 animate-fade-in">
                Ready to continue your learning journey? You're doing great!
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center glow-blue">
                <Target className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatsCard
          title="Enrolled Courses"
          value={userStats.totalCourses}
          icon={BookOpen}
          gradient="from-blue-600 to-blue-700"
          change={{ value: "2", trend: "up" }}
          onClick={() => onNavigate('my-courses')}
        />
        <StatsCard
          title="Completed"
          value={userStats.completedCourses}
          icon={CheckCircle}
          gradient="from-green-600 to-green-700"
          change={{ value: "1", trend: "up" }}
          onClick={() => onNavigate('progress')}
        />
        <StatsCard
          title="Learning Hours"
          value={userStats.totalHours}
          subtitle="Total time"
          icon={Clock}
          gradient="from-purple-600 to-purple-700"
          change={{ value: "12%", trend: "up" }}
        />
        <StatsCard
          title="Current Rank"
          value={userStats.rank}
          icon={Target}
          gradient="from-orange-600 to-orange-700"
          change={{ value: "Level Up", trend: "up" }}
          onClick={() => onNavigate('profile')}
        />
      </div>

      {/* Learning Streak */}
      <div className="liquid-glass rounded-professional p-4 sm:p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-professional">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Learning Streak</h3>
                <p className="text-white/60 text-xs sm:text-sm">Keep up the momentum!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{userStats.streak}</div>
              <div className="text-xs sm:text-sm text-white/60">days</div>
            </div>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                  i < userStats.streak 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-black/30'
                }`}
              />
            ))}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Continue Learning */}
        <div className="liquid-glass rounded-professional p-4 sm:p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Continue Learning</h2>
              <button 
                onClick={() => onNavigate('my-courses')}
                className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                View All
              </button>
            </div>

            {recentCourses.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="glass rounded-professional p-3 sm:p-4 hover:bg-blue-500/10 transition-all duration-200 hover:shadow-lg group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-professional group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-professional flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <PlayCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-white mb-1 truncate">{course.title}</h3>
                        <p className="text-xs sm:text-sm text-white/60 mb-2">{course.instructor}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">{course.progress}% complete</span>
                          <div className="w-16 sm:w-24 bg-black/30 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">No courses yet</h3>
                <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6">Start your learning journey by browsing our course catalog.</p>
                <button 
                  onClick={() => onNavigate('browse')}
                  className="btn-primary text-white px-4 sm:px-6 py-2 rounded-professional transition-all duration-200"
                >
                  Browse Courses
                </button>
              </div>
            )}
        </div>

        {/* Learning Goals */}
        <div className="liquid-glass rounded-professional p-4 sm:p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Learning Goals</h2>
              <button 
                onClick={() => onNavigate('profile')}
                className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                View Profile
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 glass rounded-professional">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-white">Monthly Goal</h3>
                    <p className="text-xs sm:text-sm text-white/60">Complete 2 courses this month</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-blue-400">50%</div>
                  <div className="text-xs text-white/60">1 of 2</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 glass rounded-professional">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-white">Weekly Hours</h3>
                    <p className="text-xs sm:text-sm text-white/60">Study 20 hours per week</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-green-400">80%</div>
                  <div className="text-xs text-white/60">16 of 20h</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 glass rounded-professional">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-white">Learning Streak</h3>
                    <p className="text-xs sm:text-sm text-white/60">Current streak: {userStats.streak} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-orange-400">{userStats.streak}</div>
                  <div className="text-xs text-white/60">days</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}