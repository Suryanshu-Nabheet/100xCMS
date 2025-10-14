'use client'
import { GlobalSecurity } from './GlobalSecurity'

interface UltraSecureWebsiteProps {
  children: React.ReactNode
}

export function UltraSecureWebsite({ children }: UltraSecureWebsiteProps) {
  return (
    <GlobalSecurity>
      <div className="min-h-screen bg-black">
        {/* Ultra Security Header */}
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

        {/* Website Content */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </GlobalSecurity>
  )
}
