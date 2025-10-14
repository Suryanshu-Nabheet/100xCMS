// Clipboard Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class ClipboardBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Clipboard Blocker')
    
    if (config.enableClipboardBlocking) {
      this.blockClipboard()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Clipboard Blocker initialized')
  }
  
  private static blockClipboard(): void {
    // Block copy events
    if (config.enableCopyBlocking) {
      document.addEventListener('copy', (e) => {
        SecurityLogger.log('Copy event blocked', 'warn')
        ClipboardBlocker.redirectToBlank()
        e.preventDefault()
        e.stopPropagation()
        return false
      }, true)
    }
    
    // Block paste events
    if (config.enablePasteBlocking) {
      document.addEventListener('paste', (e) => {
        SecurityLogger.log('Paste event blocked', 'warn')
        ClipboardBlocker.redirectToBlank()
        e.preventDefault()
        e.stopPropagation()
        return false
      }, true)
    }
    
    // Block clipboard API
    if (navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        get: () => {
          SecurityLogger.log('Clipboard API blocked', 'warn')
          ClipboardBlocker.redirectToBlank()
          return {} as any
        },
        set: () => {
          SecurityLogger.log('Clipboard API blocked', 'warn')
          ClipboardBlocker.redirectToBlank()
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
    SecurityLogger.log('Clipboard Blocker destroyed')
  }
}
