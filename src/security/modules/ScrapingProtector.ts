// Scraping Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'
import { SecurityUtils } from '../utils/SecurityUtils'

export class ScrapingProtector {
  private static isInitialized = false
  private static rateLimiter = SecurityUtils.createRateLimiter(10, 60000) // 10 requests per minute
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Scraping Protector')
    
    if (config.enableScrapingProtection) {
      this.enableScrapingProtection()
    }
    
    if (config.enableBotDetection) {
      this.enableBotDetection()
    }
    
    if (config.enableRateLimiting) {
      this.enableRateLimiting()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Scraping Protector initialized')
  }
  
  private static enableScrapingProtection(): void {
    // Block common scraping tools
    const userAgent = SecurityUtils.getUserAgent()
    const suspiciousAgents = [
      'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl',
      'python', 'requests', 'urllib', 'scrapy', 'beautifulsoup',
      'selenium', 'phantomjs', 'headless', 'automation'
    ]
    
    if (suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
      SecurityLogger.log('Suspicious user agent detected', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Block headless browsers
    if (this.detectHeadlessBrowser()) {
      SecurityLogger.log('Headless browser detected', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Block automation tools
    if (this.detectAutomation()) {
      SecurityLogger.log('Automation tool detected', 'warn')
      this.redirectToBlank()
      return
    }
  }
  
  private static detectHeadlessBrowser(): boolean {
    // Check for headless browser indicators
    if (typeof window === 'undefined') return false
    
    // Check for missing properties
    if (!window.chrome || !window.chrome.runtime) return true
    if (!window.navigator || !window.navigator.webdriver) return true
    
    // Check for headless browser properties
    if ((window as any).phantom || (window as any).callPhantom) return true
    if ((window as any).__nightmare) return true
    if ((window as any).__selenium_unwrapped || (window as any).__webdriver_unwrapped) return true
    
    // Check for automation indicators
    if (window.navigator.webdriver === true) return true
    if ((window as any).webdriver) return true
    if ((window as any).selenium) return true
    if ((window as any).phantomjs) return true
    
    return false
  }
  
  private static detectAutomation(): boolean {
    // Check for automation indicators
    if (typeof window === 'undefined') return false
    
    // Check for automation properties
    if ((window as any).automation) return true
    if ((window as any).selenium) return true
    if ((window as any).webdriver) return true
    if ((window as any).phantom) return true
    if ((window as any).nightmare) return true
    
    // Check for automation methods
    if (typeof (window as any).automation !== 'undefined') return true
    if (typeof (window as any).selenium !== 'undefined') return true
    if (typeof (window as any).webdriver !== 'undefined') return true
    if (typeof (window as any).phantom !== 'undefined') return true
    if (typeof (window as any).nightmare !== 'undefined') return true
    
    return false
  }
  
  private static enableBotDetection(): void {
    // Monitor mouse movements for human-like behavior
    let mouseMovements = 0
    let lastMouseTime = 0
    
    document.addEventListener('mousemove', (e) => {
      const now = Date.now()
      if (now - lastMouseTime > 100) {
        mouseMovements++
        lastMouseTime = now
      }
    })
    
    // Monitor keyboard activity
    let keyboardActivity = 0
    let lastKeyboardTime = 0
    
    document.addEventListener('keydown', (e) => {
      const now = Date.now()
      if (now - lastKeyboardTime > 100) {
        keyboardActivity++
        lastKeyboardTime = now
      }
    })
    
    // Check for bot-like behavior
    setTimeout(() => {
      if (mouseMovements < 5 && keyboardActivity < 3) {
        SecurityLogger.log('Bot-like behavior detected', 'warn')
        this.redirectToBlank()
      }
    }, 10000) // Check after 10 seconds
  }
  
  private static enableRateLimiting(): void {
    // Monitor page requests
    const clientId = SecurityUtils.generateSecureToken(16)
    
    // Check rate limit on page load
    if (!this.rateLimiter(clientId)) {
      SecurityLogger.log('Rate limit exceeded', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Monitor AJAX requests
    const originalFetch = window.fetch
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      if (!ScrapingProtector.rateLimiter(clientId)) {
        SecurityLogger.log('Rate limit exceeded for fetch', 'warn')
        ScrapingProtector.redirectToBlank()
        return Promise.reject(new Error('Rate limit exceeded'))
      }
      return originalFetch.call(this, input, init)
    }
    
    // Monitor XMLHttpRequest
    const originalXHR = window.XMLHttpRequest
    window.XMLHttpRequest = function() {
      if (!ScrapingProtector.rateLimiter(clientId)) {
        SecurityLogger.log('Rate limit exceeded for XHR', 'warn')
        ScrapingProtector.redirectToBlank()
        return {} as any
      }
      return new originalXHR()
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
    SecurityLogger.log('Scraping Protector destroyed')
  }
}
