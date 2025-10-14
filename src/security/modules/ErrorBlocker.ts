// Error Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class ErrorBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Error Blocker')
    
    if (config.enableErrorBlocking) {
      this.blockErrors()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Error Blocker initialized')
  }
  
  private static blockErrors(): void {
    // Block error events
    window.addEventListener('error', (e) => {
      SecurityLogger.log('Error event blocked', 'warn')
      ErrorBlocker.redirectToBlank()
      e.preventDefault()
      e.stopPropagation()
      return false
    }, true)
    
    // Block unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      SecurityLogger.log('Unhandled rejection blocked', 'warn')
      ErrorBlocker.redirectToBlank()
      e.preventDefault()
      e.stopPropagation()
      return false
    }, true)
    
    // Block exception handling
    if (config.enableExceptionBlocking) {
      // Override Error constructor
      const originalError = window.Error
      window.Error = function(message?: string) {
        SecurityLogger.log('Error constructor blocked', 'warn')
        ErrorBlocker.redirectToBlank()
        return {} as any
      } as any
      
      // Override throw
      const originalThrow = Error
      Error = function(message?: string) {
        SecurityLogger.log('Error throw blocked', 'warn')
        ErrorBlocker.redirectToBlank()
        return {} as any
      } as any
    }
  }
  
  private static redirectToBlank(): void {
    try {
      window.location.href = 'about:blank'
    } catch (e) {
      SecurityLogger.log('Failed to redirect to blank page', 'error')
    }
  }
  
  static destroy(): void {
    this.isInitialized = false
    SecurityLogger.log('Error Blocker destroyed')
  }
}
