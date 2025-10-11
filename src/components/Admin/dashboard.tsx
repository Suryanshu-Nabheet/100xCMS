'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, Eye, Edit, UserCheck, AlertCircle } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

interface ClerkUser {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: Array<{ emailAddress: string }>
  createdAt: Date
  lastSignInAt: Date | null
  imageUrl: string
  publicMetadata: Record<string, unknown>
}

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: Array<{
    id: string
    title: string
    description: string
    videoUrl: string
    duration: string
    order: number
  }>
  status: 'published' | 'draft'
  createdAt: string
  enrolledStudents: number
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses'>('overview')
  const [clerkUsers, setClerkUsers] = useState<ClerkUser[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { user } = useUser()

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // For now, we'll use the current user as the only user
        // In a real production environment, you would need to:
        // 1. Set up a backend API endpoint that uses Clerk's secret key
        // 2. Fetch all users from that endpoint
        // 3. Or use Clerk's webhooks to sync user data to your database
        
        if (user) {
          const currentUser: ClerkUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddresses: user.emailAddresses,
            createdAt: user.createdAt || new Date(),
            lastSignInAt: user.lastSignInAt || null,
            imageUrl: user.imageUrl,
            publicMetadata: user.publicMetadata
          }
          setClerkUsers([currentUser])
        } else {
          setClerkUsers([])
        }
        
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading users:', err)
        setError('Failed to load users')
        setIsLoading(false)
        setClerkUsers([])
      }
    }

    loadUsers()
  }, [user])

  // Load hardcoded courses (these will be managed through code)
  useEffect(() => {
    const loadCourses = async () => {
      try {
        // Import courses from the hardcoded data
        const { courses: hardcodedCourses } = await import('../../data/courses')
        setCourses(hardcodedCourses)
      } catch (error) {
        console.error('Error loading courses:', error)
        setCourses([])
      }
    }

    loadCourses()
  }, [])

  const stats = {
    totalUsers: clerkUsers.length,
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.status === 'published').length,
    totalEnrollments: courses.reduce((sum, course) => sum + course.enrolledStudents, 0)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-blue-200">Manage users, courses, and system settings</p>
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Total Courses</p>
                <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Published</p>
                <p className="text-2xl font-bold text-white">{stats.publishedCourses}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-900/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Enrollments</p>
                <p className="text-2xl font-bold text-white">{stats.totalEnrollments}</p>
              </div>
              <UserCheck className="w-8 h-8 text-orange-400" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-blue-500/20">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users' },
              { id: 'courses', label: 'Courses' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'users' | 'courses')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">System Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Recent Users</h3>
                  <div className="space-y-3">
                    {isLoading ? (
                      <div className="text-center py-4">
                        <div className="w-8 h-8 mx-auto mb-2 bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-400 animate-pulse" />
                        </div>
                        <p className="text-blue-200">Loading users...</p>
                      </div>
                    ) : clerkUsers.length === 0 ? (
                      <div className="text-center py-4">
                        <div className="w-8 h-8 mx-auto mb-2 bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-blue-200">No users registered yet</p>
                      </div>
                    ) : (
                      clerkUsers.slice(0, 3).map((clerkUser) => (
                        <div key={clerkUser.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={clerkUser.imageUrl}
                              alt={clerkUser.firstName || 'User'}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="text-white font-medium">
                                {clerkUser.firstName} {clerkUser.lastName}
                              </p>
                              <p className="text-blue-200 text-sm">
                                {clerkUser.emailAddresses[0]?.emailAddress}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            clerkUser.emailAddresses[0]?.emailAddress === 'suryanshunab@gmail.com' 
                              ? 'bg-red-500/20 text-red-200' 
                              : 'bg-blue-500/20 text-blue-200'
                          }`}>
                            {clerkUser.emailAddresses[0]?.emailAddress === 'suryanshunab@gmail.com' ? 'Admin' : 'Student'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Courses */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Recent Courses</h3>
                  <div className="space-y-3">
                    {courses.length === 0 ? (
                      <div className="text-center py-4">
                        <div className="w-8 h-8 mx-auto mb-2 bg-blue-900/20 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-blue-200">No courses created yet</p>
                        <p className="text-blue-300 text-xs mt-1">Courses are managed through hardcoded files</p>
                      </div>
                    ) : (
                      courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{course.title}</p>
                            <p className="text-blue-200 text-sm">{course.enrolledStudents} students</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            course.status === 'published' 
                              ? 'bg-green-500/20 text-green-200' 
                              : 'bg-yellow-500/20 text-yellow-200'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">All Users</h2>
                <div className="text-blue-200 text-sm">
                  {clerkUsers.length} total users
                </div>
              </div>

              {/* Info about user data */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">User Data Limitation</h3>
                    <p className="text-blue-200 text-sm mb-2">
                      Currently showing only the current admin user. To display all users:
                    </p>
                    <div className="text-blue-300 text-xs space-y-1">
                      <p>• Set up a backend API endpoint with Clerk's secret key</p>
                      <p>• Use Clerk's webhooks to sync user data to your database</p>
                      <p>• Or implement a server-side user management system</p>
                    </div>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-blue-200">Loading users...</p>
                </div>
              ) : clerkUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
                  <p className="text-gray-400">No users have registered yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20">
                        <th className="text-left text-white/70 py-3 px-4">Avatar</th>
                        <th className="text-left text-white/70 py-3 px-4">Name</th>
                        <th className="text-left text-white/70 py-3 px-4">Email</th>
                        <th className="text-left text-white/70 py-3 px-4">Role</th>
                        <th className="text-left text-white/70 py-3 px-4">Join Date</th>
                        <th className="text-left text-white/70 py-3 px-4">Last Sign In</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clerkUsers.map((clerkUser) => (
                        <tr key={clerkUser.id} className="border-b border-white/5">
                          <td className="py-3 px-4">
                            <img
                              src={clerkUser.imageUrl}
                              alt={clerkUser.firstName || 'User'}
                              className="w-8 h-8 rounded-full"
                            />
                          </td>
                          <td className="py-3 px-4 text-white">
                            {clerkUser.firstName} {clerkUser.lastName}
                          </td>
                          <td className="py-3 px-4 text-blue-200">
                            {clerkUser.emailAddresses[0]?.emailAddress}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              clerkUser.emailAddresses[0]?.emailAddress === 'suryanshunab@gmail.com' 
                                ? 'bg-red-500/20 text-red-200' 
                                : 'bg-blue-500/20 text-blue-200'
                            }`}>
                              {clerkUser.emailAddresses[0]?.emailAddress === 'suryanshunab@gmail.com' ? 'Admin' : 'Student'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-blue-200">
                            {new Date(clerkUser.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-blue-200">
                            {clerkUser.lastSignInAt 
                              ? new Date(clerkUser.lastSignInAt).toLocaleDateString()
                              : 'Never'
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Course Management</h2>
                <div className="text-blue-200 text-sm">
                  {courses.length} total courses
                </div>
              </div>

              {/* Course Management Info */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Hardcoded Course Management</h3>
                    <p className="text-blue-200 text-sm mb-2">
                      Courses are managed through hardcoded files in your codebase. This dashboard shows real-time data from your course files.
                    </p>
                    <div className="text-blue-300 text-xs space-y-1">
                      <p>• View course details, thumbnails, and videos</p>
                      <p>• Test course functionality and content</p>
                      <p>• Monitor enrollment and engagement</p>
                      <p>• All courses are 100% free</p>
                      <p>• To add/modify courses, update the hardcoded course files</p>
                    </div>
                  </div>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                  <p className="text-gray-400 mb-6">
                    No hardcoded courses have been added to the system yet.
                  </p>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-blue-200 text-sm">
                      To add courses, create course files in your codebase and import them into the course management system. All courses are 100% free.
                    </p>
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
                          <span className="text-blue-300 text-xs">Duration</span>
                          <span className="text-white text-xs">{course.duration}</span>
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
                        <button className="flex-1 bg-blue-500/20 text-blue-200 px-3 py-2 rounded text-sm hover:bg-blue-500/30 transition-colors">
                          <Eye className="w-4 h-4 inline mr-1" />
                          Test
                        </button>
                        <button className="flex-1 bg-green-500/20 text-green-200 px-3 py-2 rounded text-sm hover:bg-green-500/30 transition-colors">
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
