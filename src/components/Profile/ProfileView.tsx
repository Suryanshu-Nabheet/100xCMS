import React, { useState } from 'react'
import { User, Mail, Calendar, Award, BookOpen, Clock, Edit2, Save, X, Camera, Shield } from 'lucide-react'
import { FileUpload } from '../ui/file-upload'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'
import { motion } from 'framer-motion'

export function ProfileView() {
  const { user } = useAuth()
  const { userStats } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    bio: 'Passionate learner exploring new technologies and building amazing projects.',
    location: 'San Francisco, CA',
    website: 'https://portfolio.example.com'
  })
  const [profileImage, setProfileImage] = useState<File[]>([])

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    setIsEditing(false)
  }

  const handleFileUpload = (files: File[]) => {
    setProfileImage(files)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />
      case 'instructor':
        return <BookOpen className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'from-red-600 to-red-700'
      case 'instructor':
        return 'from-green-600 to-green-700'
      default:
        return 'from-blue-600 to-blue-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-white/70 mt-1">Manage your account settings and preferences</p>
        </div>
        <motion.button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 btn-primary text-white px-6 py-3 rounded-professional transition-all duration-200 hover-lift"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="liquid-glass rounded-professional p-6 hover-lift">
            <div className="text-center">
              {/* Profile Picture Upload */}
              {isEditing ? (
                <div className="mb-6">
                  <FileUpload onChange={handleFileUpload} />
                </div>
              ) : (
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-r from-blue-500/80 to-blue-600/80 rounded-full flex items-center justify-center mx-auto mb-6 glow-blue hover-lift relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {profileImage.length > 0 ? (
                    <img
                      src={URL.createObjectURL(profileImage[0])}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              )}

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-center text-xl font-bold transition-all duration-300"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-center transition-all duration-300"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">{profileData.fullName}</h2>
                  <p className="text-white/80 mb-4">{profileData.email}</p>
                </>
              )}

              <motion.div 
                className={`inline-flex items-center px-4 py-2 rounded-professional text-sm font-medium glass text-white mb-6 bg-gradient-to-r ${getRoleColor(user?.role || 'student')}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {getRoleIcon(user?.role || 'student')}
                <span className="ml-2 capitalize">{user?.role}</span>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <motion.div 
                  className="glass rounded-professional p-4 hover-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold text-blue-400">{userStats.totalCourses}</div>
                  <div className="text-sm text-white/60">Courses</div>
                </motion.div>
                <motion.div 
                  className="glass rounded-professional p-4 hover-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold text-green-400">{userStats.completedCourses}</div>
                  <div className="text-sm text-white/60">Completed</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div 
            className="liquid-glass rounded-professional p-6 hover-lift"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors rounded-professional hover:bg-blue-500/10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-white p-3 glass rounded-professional">
                    <User className="w-4 h-4 text-white/60" />
                    <span>{profileData.fullName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-white p-3 glass rounded-professional">
                    <Mail className="w-4 h-4 text-white/60" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-white p-3 glass rounded-professional">
                    <span>{profileData.location}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-white p-3 glass rounded-professional">
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      {profileData.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none transition-all duration-300"
                />
              ) : (
                <p className="text-white p-3 glass rounded-professional">{profileData.bio}</p>
              )}
            </div>
          </motion.div>

          {/* Learning Stats */}
          <motion.div 
            className="liquid-glass rounded-professional p-6 hover-lift"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Learning Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{userStats.totalCourses}</div>
                <div className="text-sm text-white/60">Total Courses</div>
              </motion.div>

              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{userStats.completedCourses}</div>
                <div className="text-sm text-white/60">Completed</div>
              </motion.div>

              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{userStats.totalHours}</div>
                <div className="text-sm text-white/60">Hours Learned</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div 
            className="liquid-glass rounded-professional p-6 hover-lift"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "Email Notifications",
                  description: "Receive updates about your courses",
                  defaultChecked: true
                },
                {
                  title: "Course Reminders",
                  description: "Get reminded to continue learning",
                  defaultChecked: true
                },
                {
                  title: "Marketing Emails",
                  description: "Receive news about new courses",
                  defaultChecked: false
                }
              ].map((setting, index) => (
                <motion.div 
                  key={setting.title}
                  className="flex items-center justify-between p-4 glass rounded-professional hover-lift"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div>
                    <h4 className="text-white font-medium">{setting.title}</h4>
                    <p className="text-white/60 text-sm">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={setting.defaultChecked} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}