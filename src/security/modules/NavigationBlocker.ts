// Navigation Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class NavigationBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Navigation Blocker')
    
    if (config.enableNavigationBlocking) {
      this.blockNavigation()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Navigation Blocker initialized')
  }
  
  private static blockNavigation(): void {
    // Block history access
    if (config.enableHistoryBlocking) {
      Object.defineProperty(window, 'history', {
        get: () => {
          SecurityLogger.log('history access blocked', 'warn')
          NavigationBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('history access blocked', 'warn')
          NavigationBlocker.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    }
    
    // Block location access
    if (config.enableLocationBlocking) {
      Object.defineProperty(window, 'location', {
        get: () => {
          SecurityLogger.log('location access blocked', 'warn')
          NavigationBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('location access blocked', 'warn')
          NavigationBlocker.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
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
    SecurityLogger.log('Navigation Blocker destroyed')
  }
}
