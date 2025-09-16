import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'
import { UserManager } from '../data/realData'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, role?: 'student' | 'instructor') => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const userManager = UserManager.getInstance()
  const STORAGE_KEY = 'classx_user'
  const OLD_STORAGE_KEY = 'suryanshu_academy_user'

  useEffect(() => {
    // Migrate old storage key if present
    const legacy = localStorage.getItem(OLD_STORAGE_KEY)
    if (legacy && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, legacy)
      localStorage.removeItem(OLD_STORAGE_KEY)
    }

    // Check for stored user session
    const storedUser = localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        // Verify user still exists in system
        const currentUser = userManager.getCurrentUser()
        if (currentUser && currentUser.id === userData.id) {
          setUser(currentUser)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const authenticatedUser = userManager.authenticateUser(email, password)
    if (!authenticatedUser) {
      throw new Error('Invalid email or password')
    }

    setUser(authenticatedUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser))
  }

  const signUp = async (email: string, password: string, fullName: string, role: 'student' | 'instructor' = 'student') => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    try {
      const newUser = userManager.createUser(email, password, fullName, role)
      setUser(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const signOut = async () => {
    userManager.logout()
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}