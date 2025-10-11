'use client'
import { useState, useEffect } from 'react'

interface AdminUser {
  name: string
  email: string
  role: 'admin'
}

const ADMIN_EMAIL = 'suryanshunab@gmail.com'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('admin_session')
    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession)
        if (sessionData.email === ADMIN_EMAIL) {
          setIsAdmin(true)
          setAdminUser(sessionData)
        }
      } catch {
        localStorage.removeItem('admin_session')
      }
    }
    setIsLoading(false)
  }, [])

  const loginAdmin = (email: string): boolean => {
    if (email === ADMIN_EMAIL) {
      const sessionData = {
        name: 'Suryanshu Nabheet',
        email: ADMIN_EMAIL,
        role: 'admin' as const,
        loginTime: Date.now()
      }
      localStorage.setItem('admin_session', JSON.stringify(sessionData))
      setIsAdmin(true)
      setAdminUser(sessionData)
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    localStorage.removeItem('admin_session')
    setIsAdmin(false)
    setAdminUser(null)
  }

  const isAdminEmail = (email: string): boolean => {
    return email === ADMIN_EMAIL
  }

  return {
    isAdmin,
    isLoading,
    adminUser,
    loginAdmin,
    logoutAdmin,
    isAdminEmail,
    ADMIN_EMAIL
  }
}

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { loginAdmin } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const success = loginAdmin(email)
    if (!success) {
      setError('Invalid admin email')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-blue-200">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Admin Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
              placeholder="suryanshunab@gmail.com"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}
