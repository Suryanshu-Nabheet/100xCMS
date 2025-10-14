// Console Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class ConsoleBlocker {
  private static isInitialized = false
  private static originalConsole: Console
  private static clearInterval: NodeJS.Timeout | null = null
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Console Blocker')
    
    if (config.enableConsoleBlocking) {
      this.blockConsole()
    }
    
    if (config.enableConsoleClearing) {
      this.startConsoleClearing(config.consoleClearInterval)
    }
    
    this.isInitialized = true
    SecurityLogger.log('Console Blocker initialized')
  }
  
  private static blockConsole(): void {
    // Store original console
    this.originalConsole = { ...window.console }
    
    // Override all console methods
    const consoleMethods = [
      'log', 'info', 'warn', 'error', 'debug', 'trace',
      'table', 'group', 'groupCollapsed', 'groupEnd',
      'time', 'timeEnd', 'timeLog', 'count', 'countReset',
      'assert', 'clear', 'dir', 'dirxml', 'profile', 'profileEnd'
    ]
    
    consoleMethods.forEach(method => {
      try {
        (window.console as any)[method] = () => {
          this.redirectToBlank()
        }
      } catch (e) {
        // Ignore errors
      }
    })
    
    // Override console object itself
    try {
      Object.defineProperty(window, 'console', {
        get: () => {
          this.redirectToBlank()
          return {}
        },
        set: () => {
          this.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    } catch (e) {
      // Ignore errors
    }
    
    // Block console access via other methods
    try {
      Object.defineProperty(window, 'console', {
        value: new Proxy({}, {
          get: () => {
            this.redirectToBlank()
            return () => {}
          },
          set: () => {
            this.redirectToBlank()
          },
          has: () => {
            this.redirectToBlank()
            return false
          },
          ownKeys: () => {
            this.redirectToBlank()
            return []
          },
          getOwnPropertyDescriptor: () => {
            this.redirectToBlank()
            return undefined
          }
        }),
        writable: false,
        configurable: false,
        enumerable: false
      })
    } catch (e) {
      // Ignore errors
    }
  }
  
  private static startConsoleClearing(interval: number): void {
    this.clearInterval = setInterval(() => {
      try {
        // Clear console using original method
        if (this.originalConsole && this.originalConsole.clear) {
          this.originalConsole.clear()
        }
      } catch (e) {
        // Ignore errors
      }
    }, interval)
  }
  
  private static redirectToBlank(): void {
    try {
      window.location.href = 'about:blank'
    } catch (e) {
      SecurityLogger.log('Failed to redirect to blank page', 'error')
    }
  }
  
  static destroy(): void {
    if (this.clearInterval) {
      clearInterval(this.clearInterval)
      this.clearInterval = null
    }
    
    // Restore original console
    if (this.originalConsole) {
      try {
        Object.assign(window.console, this.originalConsole)
      } catch (e) {
        // Ignore errors
      }
    }
    
    this.isInitialized = false
    SecurityLogger.log('Console Blocker destroyed')
  }
}
