// API Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class APIBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing API Blocker')
    
    if (config.enableAPIBlocking) {
      this.blockAPIs()
    }
    
    this.isInitialized = true
    SecurityLogger.log('API Blocker initialized')
  }
  
  private static blockAPIs(): void {
    // Block fetch
    if (config.enableFetchBlocking) {
      window.fetch = () => {
        SecurityLogger.log('Fetch API blocked', 'warn')
        this.redirectToBlank()
        return Promise.reject(new Error('API access blocked'))
      }
    }
    
    // Block XMLHttpRequest
    if (config.enableXHRBlocking) {
      window.XMLHttpRequest = function() {
        SecurityLogger.log('XMLHttpRequest API blocked', 'warn')
        APIBlocker.redirectToBlank()
        return {} as any
      }
    }
    
    // Block other APIs
    this.blockOtherAPIs()
  }
  
  private static blockOtherAPIs(): void {
    // Block WebSocket
    window.WebSocket = function() {
      SecurityLogger.log('WebSocket API blocked', 'warn')
      APIBlocker.redirectToBlank()
      return {} as any
    }
    
    // Block EventSource
    window.EventSource = function() {
      SecurityLogger.log('EventSource API blocked', 'warn')
      APIBlocker.redirectToBlank()
      return {} as any
    }
    
    // Block sendBeacon
    if (window.navigator && window.navigator.sendBeacon) {
      window.navigator.sendBeacon = () => {
        SecurityLogger.log('sendBeacon API blocked', 'warn')
        APIBlocker.redirectToBlank()
        return false
      }
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
    SecurityLogger.log('API Blocker destroyed')
  }
}
