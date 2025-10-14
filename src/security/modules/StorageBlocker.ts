// Storage Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class StorageBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Storage Blocker')
    
    if (config.enableStorageBlocking) {
      this.blockStorage()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Storage Blocker initialized')
  }
  
  private static blockStorage(): void {
    // Block localStorage
    if (config.enableLocalStorageBlocking) {
      Object.defineProperty(window, 'localStorage', {
        get: () => {
          SecurityLogger.log('localStorage access blocked', 'warn')
          StorageBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('localStorage access blocked', 'warn')
          StorageBlocker.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    }
    
    // Block sessionStorage
    if (config.enableSessionStorageBlocking) {
      Object.defineProperty(window, 'sessionStorage', {
        get: () => {
          SecurityLogger.log('sessionStorage access blocked', 'warn')
          StorageBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('sessionStorage access blocked', 'warn')
          StorageBlocker.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    }
    
    // Block IndexedDB
    Object.defineProperty(window, 'indexedDB', {
      get: () => {
        SecurityLogger.log('IndexedDB access blocked', 'warn')
        StorageBlocker.redirectToBlank()
        return {} as any
      },
      set: () => {
        SecurityLogger.log('IndexedDB access blocked', 'warn')
        StorageBlocker.redirectToBlank()
      },
      configurable: false,
      enumerable: false
    })
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
    SecurityLogger.log('Storage Blocker destroyed')
  }
}
