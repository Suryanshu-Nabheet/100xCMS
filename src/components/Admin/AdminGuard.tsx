'use client'
import { useEffect } from 'react'
import { useAdminAuth } from './auth'
import { AdminLoginForm } from './auth'

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin, isLoading } = useAdminAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-blue-200">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return <AdminLoginForm />
  }

  return <>{children}</>
}
