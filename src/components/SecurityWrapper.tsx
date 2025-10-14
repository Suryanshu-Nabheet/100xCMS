'use client'
import { GlobalSecurity } from './GlobalSecurity'

interface SecurityWrapperProps {
  children: React.ReactNode
  securityLevel?: 'basic' | 'advanced' | 'ultra'
}

export function SecurityWrapper({ children, securityLevel = 'ultra' }: SecurityWrapperProps) {
  const getSecurityHeader = () => {
    switch (securityLevel) {
      case 'basic':
        return {
          title: 'BASIC SECURITY ENABLED',
          description: 'Basic protection against common inspection methods'
        }
      case 'advanced':
        return {
          title: 'ADVANCED SECURITY ENABLED',
          description: 'Advanced protection against most inspection methods'
        }
      case 'ultra':
        return {
          title: 'ULTRA SECURITY ENABLED',
          description: 'Maximum protection against all inspection methods'
        }
      default:
        return {
          title: 'ULTRA SECURITY ENABLED',
          description: 'Maximum protection against all inspection methods'
        }
    }
  }

  const { title, description } = getSecurityHeader()

  return (
    <GlobalSecurity>
      <div className="min-h-screen bg-black">
        {/* Security Header */}
        <div className="bg-red-900/20 border-b border-red-500/30 p-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-200 text-sm font-medium">{title}</span>
            </div>
            <div className="text-red-200 text-xs">
              {description}
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
