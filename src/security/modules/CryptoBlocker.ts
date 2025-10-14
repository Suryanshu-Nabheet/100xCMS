// Crypto Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class CryptoBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Crypto Blocker')
    
    if (config.enableCryptoBlocking) {
      this.blockCrypto()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Crypto Blocker initialized')
  }
  
  private static blockCrypto(): void {
    // Block crypto object
    Object.defineProperty(window, 'crypto', {
      get: () => {
        SecurityLogger.log('crypto access blocked', 'warn')
        CryptoBlocker.redirectToBlank()
        return {} as any
      },
      set: () => {
        SecurityLogger.log('crypto access blocked', 'warn')
        CryptoBlocker.redirectToBlank()
      },
      configurable: false,
      enumerable: false
    })
    
    // Block subtle crypto
    if (config.enableSubtleCryptoBlocking) {
      Object.defineProperty(window, 'subtle', {
        get: () => {
          SecurityLogger.log('subtle crypto access blocked', 'warn')
          CryptoBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('subtle crypto access blocked', 'warn')
          CryptoBlocker.redirectToBlank()
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
    SecurityLogger.log('Crypto Blocker destroyed')
  }
}
