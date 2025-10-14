// Hacking Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class HackingProtector {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Hacking Protector')
    
    if (config.enableXSSProtection) {
      this.enableXSSProtection()
    }
    
    if (config.enableCSRFProtection) {
      this.enableCSRFProtection()
    }
    
    if (config.enableSQLInjectionProtection) {
      this.enableSQLInjectionProtection()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Hacking Protector initialized')
  }
  
  private static enableXSSProtection(): void {
    // Block script injection
    const originalCreateElement = document.createElement
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName)
      
      if (tagName.toLowerCase() === 'script') {
        SecurityLogger.log('Script element creation blocked', 'warn')
        HackingProtector.redirectToBlank()
        return element
      }
      
      return element
    }
    
    // Block innerHTML manipulation
    const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get: function() {
        return originalInnerHTML?.get?.call(this) || ''
      },
      set: function(value: string) {
        if (value.includes('<script') || value.includes('javascript:')) {
          SecurityLogger.log('XSS attempt blocked', 'warn')
          HackingProtector.redirectToBlank()
          return
        }
        originalInnerHTML?.set?.call(this, value)
      }
    })
    
    // Block outerHTML manipulation
    const originalOuterHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML')
    Object.defineProperty(Element.prototype, 'outerHTML', {
      get: function() {
        return originalOuterHTML?.get?.call(this) || ''
      },
      set: function(value: string) {
        if (value.includes('<script') || value.includes('javascript:')) {
          SecurityLogger.log('XSS attempt blocked', 'warn')
          HackingProtector.redirectToBlank()
          return
        }
        originalOuterHTML?.set?.call(this, value)
      }
    })
  }
  
  private static enableCSRFProtection(): void {
    // Generate CSRF token
    const csrfToken = SecurityUtils.generateCSRFToken()
    
    // Add CSRF token to all forms
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
      const tokenInput = document.createElement('input')
      tokenInput.type = 'hidden'
      tokenInput.name = 'csrf_token'
      tokenInput.value = csrfToken
      form.appendChild(tokenInput)
    })
    
    // Validate CSRF token on form submission
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement
      const tokenInput = form.querySelector('input[name="csrf_token"]') as HTMLInputElement
      
      if (tokenInput && !SecurityUtils.validateCSRFToken(tokenInput.value, csrfToken)) {
        SecurityLogger.log('CSRF attack blocked', 'warn')
        e.preventDefault()
        HackingProtector.redirectToBlank()
        return
      }
    }, true)
  }
  
  private static enableSQLInjectionProtection(): void {
    // Monitor form inputs for SQL injection patterns
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+'.*'\s*=\s*'.*')/i,
      /(\b(OR|AND)\s+".*"\s*=\s*".*")/i,
      /(\b(OR|AND)\s+\w+\s*=\s*\w+)/i,
      /(\b(OR|AND)\s+\w+\s*LIKE\s*'.*')/i,
      /(\b(OR|AND)\s+\w+\s*LIKE\s*".*")/i,
      /(\b(OR|AND)\s+\w+\s*IN\s*\(.*\))/i,
      /(\b(OR|AND)\s+\w+\s*BETWEEN\s+.*\s+AND\s+.*)/i,
      /(\b(OR|AND)\s+\w+\s*IS\s+NULL)/i,
      /(\b(OR|AND)\s+\w+\s*IS\s+NOT\s+NULL)/i,
      /(\b(OR|AND)\s+\w+\s*EXISTS\s*\(.*\))/i,
      /(\b(OR|AND)\s+\w+\s*NOT\s+EXISTS\s*\(.*\))/i,
      /(\b(OR|AND)\s+\w+\s*IN\s*\(.*\))/i,
      /(\b(OR|AND)\s+\w+\s*NOT\s+IN\s*\(.*\))/i
    ]
    
    // Monitor all input fields
    const inputs = document.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        
        if (sqlPatterns.some(pattern => pattern.test(value))) {
          SecurityLogger.log('SQL injection attempt blocked', 'warn')
          HackingProtector.redirectToBlank()
          return
        }
      })
      
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        
        if (sqlPatterns.some(pattern => pattern.test(value))) {
          SecurityLogger.log('SQL injection attempt blocked', 'warn')
          HackingProtector.redirectToBlank()
          return
        }
      })
    })
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
    SecurityLogger.log('Hacking Protector destroyed')
  }
}
