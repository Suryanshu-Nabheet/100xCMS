'use client'
import { useState } from 'react'
import { AdminGuard } from './AdminGuard'
import { AdminDashboard } from './dashboard'
import { CourseManager } from './course-manager'

export function AdminTest() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'courses'>('dashboard')

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-blue-500/20 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin System Test</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('courses')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'courses'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Course Manager
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && <AdminDashboard />}
          {currentView === 'courses' && <CourseManager />}
        </div>
      </div>
    </AdminGuard>
  )
}
