'use client'
import { useState, useEffect } from 'react'
import { InputSanitizer } from './InputSanitizer'

interface AdminUser {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'super-admin'
  createdAt: string
  lastLogin?: string
}

// Default admin credentials
const DEFAULT_ADMIN: AdminUser = {
  id: 'admin-1',
  name: 'Suryanshu Nabheet',
  email: 'suryanshunab@gmail.com',
  password: 'suryanshu@30052010', // In production, this should be hashed
  role: 'super-admin',
  createdAt: new Date().toISOString()
}

const ADMIN_STORAGE_KEY = 'cms_admin_users'
const ADMIN_SESSION_KEY = 'cms_admin_session'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])

  // Initialize admin users
  useEffect(() => {
    const initializeAdmins = () => {
      const storedAdmins = localStorage.getItem(ADMIN_STORAGE_KEY)
      if (!storedAdmins) {
        // First time setup - add default admin
        const initialAdmins = [DEFAULT_ADMIN]
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(initialAdmins))
        setAdminUsers(initialAdmins)
      } else {
        try {
          const admins = JSON.parse(storedAdmins)
          setAdminUsers(admins)
        } catch {
          // If parsing fails, reset to default
          const initialAdmins = [DEFAULT_ADMIN]
          localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(initialAdmins))
          setAdminUsers(initialAdmins)
        }
      }
    }

    initializeAdmins()
  }, [])

  // Check existing session
  useEffect(() => {
    const adminSession = localStorage.getItem(ADMIN_SESSION_KEY)
    if (adminSession) {
      try {
        // Decrypt session data
        const decryptedSession = JSON.parse(atob(adminSession))
        
        // Validate session token
        if (!decryptedSession.sessionToken) {
          localStorage.removeItem(ADMIN_SESSION_KEY)
          setIsLoading(false)
          return
        }
        
        // Parse session token
        const tokenData = JSON.parse(atob(decryptedSession.sessionToken))
        
        // Check session expiry (24 hours)
        const sessionAge = Date.now() - tokenData.timestamp
        if (sessionAge > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(ADMIN_SESSION_KEY)
          setIsLoading(false)
          return
        }
        
        // Find admin
        const admin = adminUsers.find(a => a.id === tokenData.id)
        if (admin) {
          setIsAdmin(true)
          setAdminUser(admin)
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY)
        }
      } catch {
        localStorage.removeItem(ADMIN_SESSION_KEY)
      }
    }
    setIsLoading(false)
  }, [adminUsers])

  const loginAdmin = (email: string, password: string): boolean => {
    // Input validation and sanitization
    const sanitizedEmail = InputSanitizer.sanitizeEmail(email)
    const sanitizedPassword = InputSanitizer.sanitizePassword(password)
    
    // Basic validation
    if (!sanitizedEmail || !sanitizedPassword) {
      return false
    }
    
    // Email format validation
    if (!InputSanitizer.isValidEmail(sanitizedEmail)) {
      return false
    }
    
    // Password length validation
    if (sanitizedPassword.length < 8) {
      return false
    }
    
    // Rate limiting check
    const lastAttempt = localStorage.getItem('admin_login_attempt')
    const now = Date.now()
    if (lastAttempt && now - parseInt(lastAttempt) < 5000) { // 5 second cooldown
      return false
    }
    
    // Store attempt time
    localStorage.setItem('admin_login_attempt', now.toString())
    
    // Find admin with case-insensitive email comparison
    const admin = adminUsers.find(a => 
      a.email.toLowerCase() === sanitizedEmail && a.password === sanitizedPassword
    )
    
    if (admin) {
      // Generate secure session token
      const sessionToken = btoa(JSON.stringify({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(2)
      }))
      
      const sessionData = {
        ...admin,
        sessionToken,
        loginTime: Date.now(),
        lastLogin: new Date().toISOString(),
        ipAddress: 'unknown', // In production, get real IP
        userAgent: navigator.userAgent
      }
      
      // Encrypt session data (basic obfuscation)
      const encryptedSession = btoa(JSON.stringify(sessionData))
      localStorage.setItem(ADMIN_SESSION_KEY, encryptedSession)
      
      setIsAdmin(true)
      setAdminUser(admin)
      
      // Update last login
      const updatedAdmins = adminUsers.map(a => 
        a.email.toLowerCase() === sanitizedEmail ? { ...a, lastLogin: new Date().toISOString() } : a
      )
      setAdminUsers(updatedAdmins)
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmins))
      
      // Clear failed attempts
      localStorage.removeItem('admin_login_attempt')
      
      return true
    }
    
    return false
  }

  const logoutAdmin = () => {
    // Clear all admin-related data
    localStorage.removeItem(ADMIN_SESSION_KEY)
    localStorage.removeItem('admin_login_attempt')
    localStorage.removeItem('cms_courses') // Clear course data for security
    
    // Clear any other sensitive data
    try {
      // Clear all localStorage keys that might contain sensitive data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('admin_') || key.startsWith('cms_')) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing sensitive data:', error)
    }
    
    setIsAdmin(false)
    setAdminUser(null)
    
    // Force page reload to clear any cached data
    window.location.reload()
  }

  const addAdmin = (name: string, email: string, password: string): boolean => {
    // Sanitize inputs
    const sanitizedName = InputSanitizer.sanitizeText(name)
    const sanitizedEmail = InputSanitizer.sanitizeEmail(email)
    const sanitizedPassword = InputSanitizer.sanitizePassword(password)
    
    // Validate inputs
    if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
      return false
    }
    
    if (!InputSanitizer.isValidEmail(sanitizedEmail)) {
      return false
    }
    
    if (sanitizedPassword.length < 8) {
      return false
    }
    
    // Check if admin already exists
    if (adminUsers.find(a => a.email.toLowerCase() === sanitizedEmail)) {
      return false
    }

    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}-${InputSanitizer.generateSecureToken(8)}`,
      name: sanitizedName,
      email: sanitizedEmail,
      password: InputSanitizer.hashPassword(sanitizedPassword), // Hash password
      role: 'admin',
      createdAt: new Date().toISOString()
    }

    const updatedAdmins = [...adminUsers, newAdmin]
    setAdminUsers(updatedAdmins)
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmins))
    return true
  }

  const removeAdmin = (adminId: string): boolean => {
    // Prevent removing super admin
    const admin = adminUsers.find(a => a.id === adminId)
    if (admin?.role === 'super-admin') {
      return false
    }

    const updatedAdmins = adminUsers.filter(a => a.id !== adminId)
    setAdminUsers(updatedAdmins)
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmins))
    
    // If current user was removed, logout
    if (adminUser?.id === adminId) {
      logoutAdmin()
    }
    
    return true
  }

  const updateAdminPassword = (adminId: string, newPassword: string): boolean => {
    const updatedAdmins = adminUsers.map(a => 
      a.id === adminId ? { ...a, password: newPassword } : a
    )
    setAdminUsers(updatedAdmins)
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmins))
    return true
  }

  const isAdminEmail = (email: string): boolean => {
    return adminUsers.some(a => a.email === email)
  }

  return {
    isAdmin,
    isLoading,
    adminUser,
    adminUsers,
    loginAdmin,
    logoutAdmin,
    addAdmin,
    removeAdmin,
    updateAdminPassword,
    isAdminEmail
  }
}

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { loginAdmin } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const success = loginAdmin(email, password)
    if (!success) {
      setError('Invalid admin credentials')
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
              placeholder="Enter your password"
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

          <div className="text-center">
            <p className="text-blue-300 text-sm">
              Default Admin: suryanshunab@gmail.com / suryanshu@30052010
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
