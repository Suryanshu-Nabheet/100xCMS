// Source Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class SourceProtector {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Source Protector')
    
    if (config.enableSourceBlocking) {
      this.blockSourceAccess()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Source Protector initialized')
  }
  
  private static blockSourceAccess(): void {
    // Block view-source protocol
    const originalOpen = window.open
    window.open = function(url?: string | URL, target?: string, features?: string) {
      if (url && url.toString().startsWith('view-source:')) {
        SecurityLogger.log('View-source access blocked', 'warn')
        SourceProtector.redirectToBlank()
        return null
      }
      return originalOpen.call(this, url, target, features)
    }
    
    // Block source code access via URL
    if (window.location.href.includes('view-source:')) {
      SecurityLogger.log('View-source URL blocked', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Block source code access via history
    const originalPushState = history.pushState
    history.pushState = function(state: any, title: string, url?: string | URL | null) {
      if (url && url.toString().includes('view-source:')) {
        SecurityLogger.log('View-source history push blocked', 'warn')
        SourceProtector.redirectToBlank()
        return
      }
      return originalPushState.call(this, state, title, url)
    }
    
    // Block source code access via replaceState
    const originalReplaceState = history.replaceState
    history.replaceState = function(state: any, title: string, url?: string | URL | null) {
      if (url && url.toString().includes('view-source:')) {
        SecurityLogger.log('View-source history replace blocked', 'warn')
        SourceProtector.redirectToBlank()
        return
      }
      return originalReplaceState.call(this, state, title, url)
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
    SecurityLogger.log('Source Protector destroyed')
  }
}
