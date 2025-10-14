// DOM Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class DOMBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing DOM Blocker')
    
    if (config.enableDOMBlocking) {
      this.blockDOMAccess()
    }
    
    this.isInitialized = true
    SecurityLogger.log('DOM Blocker initialized')
  }
  
  private static blockDOMAccess(): void {
    // Block querySelector
    if (config.enableQuerySelectorBlocking) {
      document.querySelector = () => {
        SecurityLogger.log('querySelector blocked', 'warn')
        DOMBlocker.redirectToBlank()
        return null
      }
      
      document.querySelectorAll = () => {
        SecurityLogger.log('querySelectorAll blocked', 'warn')
        DOMBlocker.redirectToBlank()
        return [] as any
      }
    }
    
    // Block innerHTML
    if (config.enableInnerHTMLBlocking) {
      const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')
      Object.defineProperty(Element.prototype, 'innerHTML', {
        get: function() {
          return originalInnerHTML?.get?.call(this) || ''
        },
        set: function(value: string) {
          SecurityLogger.log('innerHTML access blocked', 'warn')
          DOMBlocker.redirectToBlank()
        }
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
    SecurityLogger.log('DOM Blocker destroyed')
  }
}
