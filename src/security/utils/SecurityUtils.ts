// Security Utilities
export class SecurityUtils {
  // Generate secure random string
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    
    return result
  }
  
  // Hash password using Web Crypto API
  static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }
  
  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Sanitize text input
  static sanitizeText(text: string): string {
    return text
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  }
  
  // Sanitize URL
  static sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url)
      // Only allow http and https protocols
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        return urlObj.toString()
      }
      return ''
    } catch {
      return ''
    }
  }
  
  // Check if running in secure context
  static isSecureContext(): boolean {
    return typeof window !== 'undefined' && window.isSecureContext
  }
  
  // Get user agent
  static getUserAgent(): string {
    return typeof navigator !== 'undefined' ? navigator.userAgent : ''
  }
  
  // Check if DevTools might be open
  static detectDevTools(): boolean {
    if (typeof window === 'undefined') return false
    
    const threshold = 160
    const heightDiff = window.outerHeight - window.innerHeight
    const widthDiff = window.outerWidth - window.innerWidth
    
    return heightDiff > threshold || widthDiff > threshold
  }
  
  // Rate limiting helper
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>()
    
    return (key: string): boolean => {
      const now = Date.now()
      const windowStart = now - windowMs
      
      if (!requests.has(key)) {
        requests.set(key, [])
      }
      
      const keyRequests = requests.get(key)!
      const recentRequests = keyRequests.filter(time => time > windowStart)
      
      if (recentRequests.length >= maxRequests) {
        return false // Rate limit exceeded
      }
      
      recentRequests.push(now)
      requests.set(key, recentRequests)
      
      return true // Request allowed
    }
  }
  
  // Generate CSRF token
  static generateCSRFToken(): string {
    return this.generateSecureToken(32)
  }
  
  // Validate CSRF token
  static validateCSRFToken(token: string, expectedToken: string): boolean {
    return token === expectedToken
  }
}
