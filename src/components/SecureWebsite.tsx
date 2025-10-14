'use client'
import { GlobalSecurity } from './GlobalSecurity'

interface SecureWebsiteProps {
  children: React.ReactNode
}

export function SecureWebsite({ children }: SecureWebsiteProps) {
  return (
    <GlobalSecurity>
      <div className="min-h-screen bg-black">
        {/* Global Security Header */}
        <div className="bg-red-900/20 border-b border-red-500/30 p-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-200 text-sm font-medium">GLOBAL SECURITY ENABLED</span>
            </div>
            <div className="text-red-200 text-xs">
              All inspection methods are blocked across the entire website
            </div>
          </div>
        </div>

        {/* Website Content */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </GlobalSecurity>
  )
}
