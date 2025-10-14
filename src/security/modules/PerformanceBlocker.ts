// Performance Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class PerformanceBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Performance Blocker')
    
    if (config.enablePerformanceBlocking) {
      this.blockPerformance()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Performance Blocker initialized')
  }
  
  private static blockPerformance(): void {
    // Block performance object
    Object.defineProperty(window, 'performance', {
      get: () => {
        SecurityLogger.log('performance access blocked', 'warn')
        PerformanceBlocker.redirectToBlank()
        return {} as any
      },
      set: () => {
        SecurityLogger.log('performance access blocked', 'warn')
        PerformanceBlocker.redirectToBlank()
      },
      configurable: false,
      enumerable: false
    })
    
    // Block timing methods
    if (config.enableTimingBlocking) {
      window.setTimeout = () => {
        SecurityLogger.log('setTimeout blocked', 'warn')
        PerformanceBlocker.redirectToBlank()
        return 0
      } as any
      
      window.setInterval = () => {
        SecurityLogger.log('setInterval blocked', 'warn')
        PerformanceBlocker.redirectToBlank()
        return 0
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
    SecurityLogger.log('Performance Blocker destroyed')
  }
}
