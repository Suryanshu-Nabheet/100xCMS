// Network Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class NetworkProtector {
  private static isInitialized = false
  private static originalFetch: typeof fetch
  private static originalXHR: typeof XMLHttpRequest
  private static originalWebSocket: typeof WebSocket
  private static originalEventSource: typeof EventSource
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Network Protector')
    
    if (config.enableNetworkBlocking) {
      this.blockNetworkRequests()
    }
    
    if (config.enableRequestMonitoring) {
      this.monitorRequests()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Network Protector initialized')
  }
  
  private static blockNetworkRequests(): void {
    // Block fetch
    this.originalFetch = window.fetch
    window.fetch = () => {
      SecurityLogger.log('Fetch request blocked', 'warn')
      this.redirectToBlank()
      return Promise.reject(new Error('Network access blocked'))
    }
    
    // Block XMLHttpRequest
    this.originalXHR = window.XMLHttpRequest
    window.XMLHttpRequest = function() {
      SecurityLogger.log('XMLHttpRequest blocked', 'warn')
      this.redirectToBlank()
      return {} as any
    }
    
    // Block WebSocket
    this.originalWebSocket = window.WebSocket
    window.WebSocket = function() {
      SecurityLogger.log('WebSocket blocked', 'warn')
      this.redirectToBlank()
      return {} as any
    }
    
    // Block EventSource
    this.originalEventSource = window.EventSource
    window.EventSource = function() {
      SecurityLogger.log('EventSource blocked', 'warn')
      this.redirectToBlank()
      return {} as any
    }
    
    // Block other network methods
    if (window.navigator && window.navigator.sendBeacon) {
      window.navigator.sendBeacon = () => {
        SecurityLogger.log('sendBeacon blocked', 'warn')
        this.redirectToBlank()
        return false
      }
    }
    
    // Block fetch with different signatures
    const originalFetch = window.fetch
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      SecurityLogger.log('Fetch request blocked', 'warn')
      this.redirectToBlank()
      return Promise.reject(new Error('Network access blocked'))
    }
    
    // Block fetch with URL
    window.fetch = function(url: string, options?: RequestInit): Promise<Response> {
      SecurityLogger.log('Fetch request blocked', 'warn')
      this.redirectToBlank()
      return Promise.reject(new Error('Network access blocked'))
    }
    
    // Block fetch with Request object
    window.fetch = function(request: Request): Promise<Response> {
      SecurityLogger.log('Fetch request blocked', 'warn')
      this.redirectToBlank()
      return Promise.reject(new Error('Network access blocked'))
    }
  }
  
  private static monitorRequests(): void {
    // Monitor fetch requests
    const originalFetch = window.fetch
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      SecurityLogger.log(`Fetch request to: ${input}`, 'info')
      return originalFetch.call(this, input, init)
    }
    
    // Monitor XMLHttpRequest
    const originalXHR = window.XMLHttpRequest
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR()
      const originalOpen = xhr.open
      xhr.open = function(method: string, url: string | URL, async?: boolean, user?: string | null, password?: string | null) {
        SecurityLogger.log(`XHR request: ${method} ${url}`, 'info')
        return originalOpen.call(this, method, url, async, user, password)
      }
      return xhr
    }
    
    // Monitor WebSocket
    const originalWebSocket = window.WebSocket
    window.WebSocket = function(url: string | URL, protocols?: string | string[]) {
      SecurityLogger.log(`WebSocket connection to: ${url}`, 'info')
      return new originalWebSocket(url, protocols)
    }
    
    // Monitor EventSource
    const originalEventSource = window.EventSource
    window.EventSource = function(url: string | URL, eventSourceInitDict?: EventSourceInit) {
      SecurityLogger.log(`EventSource connection to: ${url}`, 'info')
      return new originalEventSource(url, eventSourceInitDict)
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
    if (this.originalFetch) {
      window.fetch = this.originalFetch
    }
    
    if (this.originalXHR) {
      window.XMLHttpRequest = this.originalXHR
    }
    
    if (this.originalWebSocket) {
      window.WebSocket = this.originalWebSocket
    }
    
    if (this.originalEventSource) {
      window.EventSource = this.originalEventSource
    }
    
    this.isInitialized = false
    SecurityLogger.log('Network Protector destroyed')
  }
}
