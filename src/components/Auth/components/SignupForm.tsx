import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SignupFormProps {
  onToggleMode: () => void
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signUp(email, password, fullName)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="liquid-glass rounded-professional p-8 hover-lift gpu-accelerated">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-professional flex items-center justify-center mx-auto mb-4 glow-blue hover-lift">
            <span className="text-white font-bold text-xl">CX</span>
          </div>
          <p className="text-white/70 mt-2">Start your learning journey today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
            <div className="p-4 rounded-professional glass border border-blue-400/30 text-white text-sm">
            {error}
          </div>
        )}

        <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
            Full Name
          </label>
          <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email Address
          </label>
          <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Password
          </label>
          <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 glass border border-blue-500/10 rounded-professional text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
            className="w-full btn-primary text-white py-3 px-4 rounded-professional focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed font-medium hover-lift"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
          <p className="text-white/70">
          Already have an account?{' '}
          <button
            onClick={onToggleMode}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline"
          >
            Sign In
          </button>
        </p>
      </div>
      </div>
    </div>
  )
}