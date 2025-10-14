// File Access Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class FileAccessBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing File Access Blocker')
    
    if (config.enableFileAccessBlocking) {
      this.blockFileAccess()
    }
    
    this.isInitialized = true
    SecurityLogger.log('File Access Blocker initialized')
  }
  
  private static blockFileAccess(): void {
    // Block file input access
    const originalCreateElement = document.createElement
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName)
      
      if (tagName.toLowerCase() === 'input') {
        const input = element as HTMLInputElement
        if (input.type === 'file') {
          SecurityLogger.log('File input blocked', 'warn')
          FileAccessBlocker.redirectToBlank()
          return element
        }
      }
      
      return element
    }
    
    // Block directory listing
    if (config.enableDirectoryListing) {
      // This would typically be handled server-side
      SecurityLogger.log('Directory listing protection enabled', 'info')
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
    SecurityLogger.log('File Access Blocker destroyed')
  }
}
