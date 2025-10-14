// Debugging Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class DebuggingBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Debugging Blocker')
    
    if (config.enableDebuggerBlocking) {
      this.blockDebugger()
    }
    
    if (config.enableEvalBlocking) {
      this.blockEval()
    }
    
    if (config.enableFunctionBlocking) {
      this.blockFunction()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Debugging Blocker initialized')
  }
  
  private static blockDebugger(): void {
    // Block debugger statement
    const originalDebugger = debugger
    try {
      // Override debugger
      Object.defineProperty(window, 'debugger', {
        get: () => {
          this.redirectToBlank()
          return originalDebugger
        },
        set: () => {
          this.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    } catch (e) {
      // Ignore errors
    }
    
    // Block debugger via eval
    try {
      eval('debugger')
    } catch (e) {
      this.redirectToBlank()
    }
    
    // Block debugger via Function constructor
    try {
      new Function('debugger')()
    } catch (e) {
      this.redirectToBlank()
    }
  }
  
  private static blockEval(): void {
    // Block eval
    const originalEval = window.eval
    try {
      Object.defineProperty(window, 'eval', {
        get: () => {
          this.redirectToBlank()
          return originalEval
        },
        set: () => {
          this.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    } catch (e) {
      // Ignore errors
    }
    
    // Block eval via other methods
    try {
      window.eval = () => {
        this.redirectToBlank()
        return undefined
      }
    } catch (e) {
      // Ignore errors
    }
    
    // Block eval via global scope
    try {
      (window as any).eval = () => {
        this.redirectToBlank()
        return undefined
      }
    } catch (e) {
      // Ignore errors
    }
  }
  
  private static blockFunction(): void {
    // Block Function constructor
    const originalFunction = window.Function
    try {
      Object.defineProperty(window, 'Function', {
        get: () => {
          this.redirectToBlank()
          return originalFunction
        },
        set: () => {
          this.redirectToBlank()
        },
        configurable: false,
        enumerable: false
      })
    } catch (e) {
      // Ignore errors
    }
    
    // Block Function constructor via other methods
    try {
      window.Function = function() {
        this.redirectToBlank()
        return function() {}
      } as any
    } catch (e) {
      // Ignore errors
    }
    
    // Block Function constructor via global scope
    try {
      (window as any).Function = function() {
        this.redirectToBlank()
        return function() {}
      }
    } catch (e) {
      // Ignore errors
    }
    
    // Block setTimeout and setInterval
    const originalSetTimeout = window.setTimeout
    const originalSetInterval = window.setInterval
    
    try {
      window.setTimeout = function() {
        this.redirectToBlank()
        return 0
      } as any
    } catch (e) {
      // Ignore errors
    }
    
    try {
      window.setInterval = function() {
        this.redirectToBlank()
        return 0
      } as any
    } catch (e) {
      // Ignore errors
    }
    
    // Block clearTimeout and clearInterval
    const originalClearTimeout = window.clearTimeout
    const originalClearInterval = window.clearInterval
    
    try {
      window.clearTimeout = function() {
        this.redirectToBlank()
      } as any
    } catch (e) {
      // Ignore errors
    }
    
    try {
      window.clearInterval = function() {
        this.redirectToBlank()
      } as any
    } catch (e) {
      // Ignore errors
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
    SecurityLogger.log('Debugging Blocker destroyed')
  }
}
