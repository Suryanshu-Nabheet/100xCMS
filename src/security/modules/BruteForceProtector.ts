// Brute Force Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'
import { SecurityUtils } from '../utils/SecurityUtils'

export class BruteForceProtector {
  private static isInitialized = false
  private static loginAttempts = new Map<string, number[]>()
  private static lockedAccounts = new Map<string, number>()
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Brute Force Protector')
    
    if (config.enableBruteForceProtection) {
      this.enableBruteForceProtection(config.maxLoginAttempts, config.lockoutDuration)
    }
    
    this.isInitialized = true
    SecurityLogger.log('Brute Force Protector initialized')
  }
  
  private static enableBruteForceProtection(maxAttempts: number, lockoutDuration: number): void {
    // Monitor login attempts
    const originalSubmit = HTMLFormElement.prototype.submit
    HTMLFormElement.prototype.submit = function() {
      const form = this as HTMLFormElement
      const emailField = form.querySelector('input[type="email"], input[name="email"], input[id="email"]') as HTMLInputElement
      
      if (emailField) {
        const email = emailField.value
        if (BruteForceProtector.isAccountLocked(email)) {
          SecurityLogger.log(`Account locked: ${email}`, 'warn')
          BruteForceProtector.redirectToBlank()
          return
        }
        
        if (BruteForceProtector.hasExceededMaxAttempts(email, maxAttempts)) {
          SecurityLogger.log(`Max attempts exceeded: ${email}`, 'warn')
          BruteForceProtector.lockAccount(email, lockoutDuration)
          BruteForceProtector.redirectToBlank()
          return
        }
        
        BruteForceProtector.recordLoginAttempt(email)
      }
      
      return originalSubmit.call(this)
    }
    
    // Monitor form submission events
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement
      const emailField = form.querySelector('input[type="email"], input[name="email"], input[id="email"]') as HTMLInputElement
      
      if (emailField) {
        const email = emailField.value
        if (BruteForceProtector.isAccountLocked(email)) {
          SecurityLogger.log(`Account locked: ${email}`, 'warn')
          e.preventDefault()
          BruteForceProtector.redirectToBlank()
          return
        }
        
        if (BruteForceProtector.hasExceededMaxAttempts(email, maxAttempts)) {
          SecurityLogger.log(`Max attempts exceeded: ${email}`, 'warn')
          BruteForceProtector.lockAccount(email, lockoutDuration)
          e.preventDefault()
          BruteForceProtector.redirectToBlank()
          return
        }
        
        BruteForceProtector.recordLoginAttempt(email)
      }
    }, true)
    
    // Monitor login button clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' && (
        target.textContent?.includes('Login') ||
        target.textContent?.includes('Sign In') ||
        target.textContent?.includes('Submit')
      )) {
        const form = target.closest('form')
        if (form) {
          const emailField = form.querySelector('input[type="email"], input[name="email"], input[id="email"]') as HTMLInputElement
          
          if (emailField) {
            const email = emailField.value
            if (BruteForceProtector.isAccountLocked(email)) {
              SecurityLogger.log(`Account locked: ${email}`, 'warn')
              e.preventDefault()
              BruteForceProtector.redirectToBlank()
              return
            }
            
            if (BruteForceProtector.hasExceededMaxAttempts(email, maxAttempts)) {
              SecurityLogger.log(`Max attempts exceeded: ${email}`, 'warn')
              BruteForceProtector.lockAccount(email, lockoutDuration)
              e.preventDefault()
              BruteForceProtector.redirectToBlank()
              return
            }
            
            BruteForceProtector.recordLoginAttempt(email)
          }
        }
      }
    }, true)
  }
  
  private static recordLoginAttempt(email: string): void {
    const now = Date.now()
    const attempts = this.loginAttempts.get(email) || []
    attempts.push(now)
    this.loginAttempts.set(email, attempts)
    
    SecurityLogger.log(`Login attempt recorded for: ${email}`, 'info')
  }
  
  private static hasExceededMaxAttempts(email: string, maxAttempts: number): boolean {
    const attempts = this.loginAttempts.get(email) || []
    const now = Date.now()
    const recentAttempts = attempts.filter(time => now - time < 300000) // 5 minutes
    
    return recentAttempts.length >= maxAttempts
  }
  
  private static isAccountLocked(email: string): boolean {
    const lockoutTime = this.lockedAccounts.get(email)
    if (!lockoutTime) return false
    
    const now = Date.now()
    if (now - lockoutTime > 300000) { // 5 minutes
      this.lockedAccounts.delete(email)
      return false
    }
    
    return true
  }
  
  private static lockAccount(email: string, duration: number): void {
    this.lockedAccounts.set(email, Date.now())
    SecurityLogger.log(`Account locked: ${email}`, 'warn')
  }
  
  private static redirectToBlank(): void {
    try {
      window.location.href = 'about:blank'
    } catch (e) {
      SecurityLogger.log('Failed to redirect to blank page', 'error')
    }
  }
  
  static getLoginAttempts(email: string): number[] {
    return this.loginAttempts.get(email) || []
  }
  
  static clearLoginAttempts(email: string): void {
    this.loginAttempts.delete(email)
  }
  
  static unlockAccount(email: string): void {
    this.lockedAccounts.delete(email)
  }
  
  static destroy(): void {
    this.loginAttempts.clear()
    this.lockedAccounts.clear()
    this.isInitialized = false
    SecurityLogger.log('Brute Force Protector destroyed')
  }
}
