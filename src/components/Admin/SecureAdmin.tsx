'use client'
import { useEffect } from 'react'
import { SecurityGuard } from './SecurityGuard'
import { AdminGuard } from './AdminGuard'
import { AdminDashboard } from './dashboard'
import { CourseManager } from './course-manager'

interface SecureAdminProps {
  defaultTab?: 'dashboard' | 'courses'
}

export function SecureAdmin({ defaultTab = 'dashboard' }: SecureAdminProps) {
  useEffect(() => {
    // Additional security measures
    const addSecurityMeasures = () => {
      // Disable print screen
      document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard.writeText('')
          alert('Screenshots are not allowed')
        }
      })

      // Disable print
      window.addEventListener('beforeprint', (e) => {
        e.preventDefault()
        alert('Printing is not allowed')
        return false
      })

      // Disable save page
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault()
          alert('Saving is not allowed')
          return false
        }
      })

      // Disable view source
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault()
          alert('View source is not allowed')
          return false
        }
      })

      // Disable back button
      window.history.pushState(null, '', window.location.href)
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href)
      }

      // Clear clipboard on focus loss
      window.addEventListener('blur', () => {
        navigator.clipboard.writeText('')
      })

      // Disable image saving
      document.addEventListener('dragstart', (e) => {
        if (e.target instanceof HTMLImageElement) {
          e.preventDefault()
          return false
        }
      })

      // Disable text selection
      document.addEventListener('selectstart', (e) => {
        e.preventDefault()
        return false
      })

      // Disable copy
      document.addEventListener('copy', (e) => {
        e.preventDefault()
        return false
      })

      // Disable cut
      document.addEventListener('cut', (e) => {
        e.preventDefault()
        return false
      })

      // Disable paste
      document.addEventListener('paste', (e) => {
        e.preventDefault()
        return false
      })
    }

    addSecurityMeasures()
  }, [])

  return (
    <SecurityGuard>
      <AdminGuard>
        <div className="min-h-screen bg-black">
          {/* Security Header */}
          <div className="bg-red-900/20 border-b border-red-500/30 p-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-200 text-sm font-medium">SECURE ADMIN SESSION</span>
              </div>
              <div className="text-red-200 text-xs">
                All activities are monitored and logged
              </div>
            </div>
          </div>

          {/* Admin Content */}
          <div className="max-w-7xl mx-auto">
            {defaultTab === 'dashboard' && <AdminDashboard />}
            {defaultTab === 'courses' && <CourseManager />}
          </div>
        </div>
      </AdminGuard>
    </SecurityGuard>
  )
}
