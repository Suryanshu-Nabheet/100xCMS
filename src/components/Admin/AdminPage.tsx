'use client'
import { useState } from 'react'
import { AdminGuard } from './AdminGuard'
import { AdminDashboard } from './dashboard'
import { CourseManager } from './course-manager'

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses'>('dashboard')

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-blue-500/20 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                <p className="text-blue-200">Complete CMS Management System</p>
              </div>
              <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-blue-500/20">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'courses'
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Course Manager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'courses' && <CourseManager />}
        </div>
      </div>
    </AdminGuard>
  )
}
