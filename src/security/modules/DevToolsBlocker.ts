// DevTools Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'
import { SecurityUtils } from '../utils/SecurityUtils'

export class DevToolsBlocker {
  private static isInitialized = false
  private static detectionInterval: NodeJS.Timeout | null = null
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing DevTools Blocker')
    
    if (config.enableDevToolsDetection) {
      this.startDetection(config.devToolsDetectionInterval)
    }
    
    if (config.enableDevToolsBlocking) {
      this.blockDevTools()
    }
    
    this.isInitialized = true
    SecurityLogger.log('DevTools Blocker initialized')
  }
  
  private static startDetection(interval: number): void {
    this.detectionInterval = setInterval(() => {
      if (SecurityUtils.detectDevTools()) {
        SecurityLogger.log('DevTools detected - redirecting to blank page', 'warn')
        this.redirectToBlank()
      }
    }, interval)
  }
  
  private static blockDevTools(): void {
    // Method 1: Detect by window dimensions
    const detectByDimensions = () => {
      if (SecurityUtils.detectDevTools()) {
        this.redirectToBlank()
      }
    }
    
    // Method 2: Detect by console access
    const detectByConsole = () => {
      let devtools = false
      const element = new Image()
      Object.defineProperty(element, 'id', {
        get: function() {
          devtools = true
          return ''
        }
      })
      
      try {
        console.log(element)
        if (devtools) {
          this.redirectToBlank()
        }
      } catch (e) {
        this.redirectToBlank()
      }
    }
    
    // Method 3: Detect by debugger
    const detectByDebugger = () => {
      const start = performance.now()
      debugger
      const end = performance.now()
      
      if (end - start > 100) {
        this.redirectToBlank()
      }
    }
    
    // Method 4: Detect by eval
    const detectByEval = () => {
      try {
        eval('console.log("test")')
      } catch (e) {
        this.redirectToBlank()
      }
    }
    
    // Method 5: Detect by Function constructor
    const detectByFunction = () => {
      try {
        new Function('console.log("test")')()
      } catch (e) {
        this.redirectToBlank()
      }
    }
    
    // Method 6: Detect by setTimeout
    const detectByTimeout = () => {
      const start = performance.now()
      setTimeout(() => {
        const end = performance.now()
        if (end - start > 1000) {
          this.redirectToBlank()
        }
      }, 0)
    }
    
    // Method 7: Detect by setInterval
    const detectByInterval = () => {
      let count = 0
      const interval = setInterval(() => {
        count++
        if (count > 10) {
          this.redirectToBlank()
          clearInterval(interval)
        }
      }, 100)
    }
    
    // Method 8: Detect by requestAnimationFrame
    const detectByRAF = () => {
      let count = 0
      const raf = () => {
        count++
        if (count > 10) {
          this.redirectToBlank()
          return
        }
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    
    // Method 9: Detect by focus events
    const detectByFocus = () => {
      let focusCount = 0
      window.addEventListener('focus', () => {
        focusCount++
        if (focusCount > 5) {
          this.redirectToBlank()
        }
      })
    }
    
    // Method 10: Detect by resize events
    const detectByResize = () => {
      let resizeCount = 0
      window.addEventListener('resize', () => {
        resizeCount++
        if (resizeCount > 5) {
          this.redirectToBlank()
        }
      })
    }
    
    // Initialize all detection methods
    detectByDimensions()
    detectByConsole()
    detectByDebugger()
    detectByEval()
    detectByFunction()
    detectByTimeout()
    detectByInterval()
    detectByRAF()
    detectByFocus()
    detectByResize()
    
    // Continuous monitoring
    setInterval(() => {
      detectByDimensions()
      detectByConsole()
      detectByDebugger()
      detectByEval()
      detectByFunction()
      detectByTimeout()
      detectByInterval()
      detectByRAF()
    }, 100)
  }
  
  private static redirectToBlank(): void {
    try {
      window.location.href = 'about:blank'
    } catch (e) {
      SecurityLogger.log('Failed to redirect to blank page', 'error')
    }
  }
  
  static destroy(): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval)
      this.detectionInterval = null
    }
    
    this.isInitialized = false
    SecurityLogger.log('DevTools Blocker destroyed')
  }
}
