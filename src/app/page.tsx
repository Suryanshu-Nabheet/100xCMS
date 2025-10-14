'use client'
import { useState } from 'react'
import { UltraSecureAdmin } from '../components/Admin/UltraSecureAdmin'
import { AdminLoginForm } from '../components/Admin/auth'

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Global Security Header */}
      <div className="bg-red-900/20 border-b border-red-500/30 p-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-200 text-sm font-medium">ULTRA SECURE WEBSITE</span>
          </div>
          <div className="text-red-200 text-xs">
            Maximum security protection against all inspection methods
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {!isAdmin ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Ultra Secure CMS</h1>
                <p className="text-blue-200 text-lg">
                  Maximum security protection against all inspection methods
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
                <AdminLoginForm onLoginSuccess={() => setIsAdmin(true)} />
              </div>

              <div className="mt-8 text-center">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Security Features</h3>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• All inspection methods blocked</li>
                    <li>• Console access disabled</li>
                    <li>• Developer tools detection</li>
                    <li>• Keyboard shortcuts blocked</li>
                    <li>• Mouse events blocked</li>
                    <li>• Text selection disabled</li>
                    <li>• Copy/paste blocked</li>
                    <li>• Print/screenshot blocked</li>
                    <li>• DOM access blocked</li>
                    <li>• Network access blocked</li>
                    <li>• Storage access blocked</li>
                    <li>• Global objects blocked</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <UltraSecureAdmin defaultTab="dashboard" />
        )}
      </div>
    </div>
  )
}
