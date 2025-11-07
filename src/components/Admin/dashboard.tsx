'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle, Plus, Shield } from 'lucide-react'
import { useAdminAuth } from './auth'
import { allCourses } from '../Dashboard/Courses/coursesData'
import { useUser } from '@clerk/clerk-react'
// Course interface is imported from coursesData
// AdminUser interface is imported from auth.tsx

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'admins'>('students')
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '' })
  const [courses] = useState(allCourses)
  
  const { adminUser, adminUsers, addAdmin } = useAdminAuth()
  const { user } = useUser()

  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.length, // All real courses are published
    draftCourses: 0, // No draft courses in real data
    totalAdmins: adminUsers.length
  }

  const handleAddAdmin = () => {
    if (!newAdminData.name?.trim()) {
      alert('Admin name is required')
      return
    }
    if (!newAdminData.email?.trim()) {
      alert('Admin email is required')
      return
    }
    if (!newAdminData.password?.trim()) {
      alert('Admin password is required')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newAdminData.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    try {
      const success = addAdmin(newAdminData.name.trim(), newAdminData.email.trim(), newAdminData.password.trim())
      if (success) {
        setNewAdminData({ name: '', email: '', password: '' })
        setShowAddAdmin(false)
        alert('Admin added successfully!')
      } else {
        alert('Failed to add admin. Email might already exist.')
      }
    } catch (error) {
      console.error('Error adding admin:', error)
      alert('Failed to add admin. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-blue-200">Manage students and admin accounts</p>
          </div>
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
                <p className="text-blue-200 text-sm">Student Management</p>
                <p className="text-lg font-bold text-white">Clerk Dashboard</p>
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
              <Plus className="w-8 h-8 text-green-400" />
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
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm">Admins</p>
                <p className="text-2xl font-bold text-white">{stats.totalAdmins}</p>
              </div>
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-blue-500/20">
            {[
              { id: 'students', label: 'Students' },
              { id: 'courses', label: 'Courses' },
              { id: 'admins', label: 'Admins' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'students' | 'courses' | 'admins')}
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

          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Student Management</h2>
              </div>

              {/* Clerk Dashboard Redirect */}
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Manage Students</h3>
                <p className="text-gray-400 mb-6">
                  Access the full Clerk Dashboard to manage all student accounts, view detailed analytics, and perform user management tasks.
                </p>
                <button
                  onClick={() => window.open('https://dashboard.clerk.com/apps/app_33uHfr8zqvYDBACBdjJucRm4iSE/instances/ins_33uHfoLxg3FkfYola4aWgVOHkkg/users', '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-400/30 hover:border-blue-300/50 hover:scale-105"
                >
                  Open Clerk Dashboard
                </button>
              </div>
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

              {/* Auto-sync Info */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-green-400 mt-0.5">✓</div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Auto-Sync Enabled</h3>
                    <p className="text-green-200 text-sm">
                      Courses are automatically synchronized from the Courses page. Any new courses added will appear here immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Management Info */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Real Course Data from Browse Courses</h3>
                    <p className="text-blue-200 text-sm mb-2">
                      These courses are loaded from your hardcoded course files and are the same courses shown in the Browse Courses section.
                    </p>
                    <div className="text-blue-300 text-xs space-y-1">
                      <p>• All courses are 100% free</p>
                      <p>• Real course data with thumbnails and videos</p>
                      <p>• Connected to Browse Courses section</p>
                      <p>• To add/modify courses, update the course files</p>
                    </div>
                  </div>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                  <p className="text-gray-400 mb-6">
                    No courses have been added to the system yet.
                  </p>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-blue-200 text-sm">
                      To add courses, create course files in your codebase. All courses are 100% free.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
                      {course.banner && (
                        <img
                          src={course.banner}
                          alt={course.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}

                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-blue-200 text-sm mb-4 line-clamp-2">
                        Real course content available - click to view details
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-300 text-xs">Course ID</span>
                          <span className="text-white text-xs">{course.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-300 text-xs">Status</span>
                          <span className="text-white text-xs">Published</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-300 text-xs">Type</span>
                          <span className="text-white text-xs">Live Course</span>
                        </div>
                        {course.discordLink && (
                          <div className="flex items-center justify-between">
                            <span className="text-blue-300 text-xs">Discord</span>
                            <span className="text-white text-xs">Available</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-200">
                          Published
                        </span>
                        <span className="text-green-400 font-semibold">Free</span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Admin Management</h2>
                <div className="flex items-center gap-4">
                <div className="text-blue-200 text-sm">
                    {adminUsers.length} total admins
                  </div>
                  {adminUser?.role === 'super-admin' && (
                    <button
                      onClick={() => setShowAddAdmin(true)}
                      className="bg-blue-500/20 text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Admin
                    </button>
                  )}
                </div>
              </div>

              {/* Add Admin Modal */}
              {showAddAdmin && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 max-w-md w-full">
                    <h3 className="text-xl font-semibold text-white mb-4">Add New Admin</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Name</label>
                        <input
                          type="text"
                          value={newAdminData.name}
                          onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          placeholder="Admin Name"
                        />
                  </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Email</label>
                        <input
                          type="email"
                          value={newAdminData.email}
                          onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          placeholder="suryanshunab@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Password</label>
                        <input
                          type="password"
                          value={newAdminData.password}
                          onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          placeholder="Password"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddAdmin}
                          className="flex-1 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          Add Admin
                        </button>
                        <button
                          onClick={() => {
                            setShowAddAdmin(false)
                            setNewAdminData({ name: '', email: '', password: '' })
                          }}
                          className="flex-1 bg-gray-500/20 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/20">
                      <th className="text-left text-white/70 py-3 px-4">Profile</th>
                      <th className="text-left text-white/70 py-3 px-4">Name</th>
                      <th className="text-left text-white/70 py-3 px-4">Email</th>
                      <th className="text-left text-white/70 py-3 px-4">Role</th>
                      <th className="text-left text-white/70 py-3 px-4">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((admin) => (
                      <tr key={admin.id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          {admin.email === user?.primaryEmailAddress?.emailAddress ? (
                            // Current user - use Clerk profile picture
                            <img
                              src={user?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${admin.email}&backgroundColor=3b82f6&textColor=ffffff`}
                              alt={admin.name}
                              className="w-10 h-10 rounded-full border-2 border-blue-500/30"
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-blue-500/30">${admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>`;
                                }
                              }}
                            />
                          ) : (
                            // Other admins - use generated avatar
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${admin.email}&backgroundColor=3b82f6&textColor=ffffff`}
                              alt={admin.name}
                              className="w-10 h-10 rounded-full border-2 border-blue-500/30"
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-blue-500/30">${admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>`;
                                }
                              }}
                            />
                          )}
                        </td>
                        <td className="py-3 px-4 text-white font-medium">
                          {admin.name}
                        </td>
                        <td className="py-3 px-4 text-blue-200">
                          {admin.email}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            admin.role === 'super-admin' 
                              ? 'bg-red-500/20 text-red-200' 
                              : 'bg-blue-500/20 text-blue-200'
                          }`}>
                            {admin.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-blue-200">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
