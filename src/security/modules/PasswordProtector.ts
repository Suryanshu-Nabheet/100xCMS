// Password Protector Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'
import { SecurityUtils } from '../utils/SecurityUtils'

export class PasswordProtector {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Password Protector')
    
    if (config.enablePasswordValidation) {
      this.enablePasswordValidation()
    }
    
    if (config.enablePasswordHashing) {
      this.enablePasswordHashing()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Password Protector initialized')
  }
  
  private static enablePasswordValidation(): void {
    // Override password input fields
    const originalCreateElement = document.createElement
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName)
      
      if (tagName.toLowerCase() === 'input') {
        const input = element as HTMLInputElement
        
        // Monitor password fields
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement
          if (target.type === 'password') {
            this.validatePassword(target.value)
          }
        })
        
        // Monitor password field changes
        input.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement
          if (target.type === 'password') {
            this.validatePassword(target.value)
          }
        })
      }
      
      return element
    }
    
    // Monitor existing password fields
    const passwordFields = document.querySelectorAll('input[type="password"]')
    passwordFields.forEach(field => {
      field.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        this.validatePassword(target.value)
      })
      
      field.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement
        this.validatePassword(target.value)
      })
    })
  }
  
  private static validatePassword(password: string): void {
    // Check password strength
    if (password.length < 8) {
      SecurityLogger.log('Weak password detected', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Check for common passwords
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey',
      '1234567890', 'password1', '123123', 'dragon', 'master',
      'hello', 'freedom', 'whatever', 'qazwsx', 'trustno1'
    ]
    
    if (commonPasswords.includes(password.toLowerCase())) {
      SecurityLogger.log('Common password detected', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Check for patterns
    if (this.hasRepeatingPattern(password)) {
      SecurityLogger.log('Repeating pattern detected', 'warn')
      this.redirectToBlank()
      return
    }
    
    // Check for keyboard patterns
    if (this.hasKeyboardPattern(password)) {
      SecurityLogger.log('Keyboard pattern detected', 'warn')
      this.redirectToBlank()
      return
    }
  }
  
  private static hasRepeatingPattern(password: string): boolean {
    // Check for repeating characters
    for (let i = 0; i < password.length - 2; i++) {
      if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
        return true
      }
    }
    
    // Check for repeating sequences
    for (let i = 0; i < password.length - 3; i++) {
      const sequence = password.substring(i, i + 2)
      if (password.includes(sequence + sequence)) {
        return true
      }
    }
    
    return false
  }
  
  private static hasKeyboardPattern(password: string): boolean {
    const keyboardRows = [
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm',
      '1234567890'
    ]
    
    for (const row of keyboardRows) {
      for (let i = 0; i < row.length - 2; i++) {
        const sequence = row.substring(i, i + 3)
        if (password.toLowerCase().includes(sequence)) {
          return true
        }
      }
    }
    
    return false
  }
  
  private static enablePasswordHashing(): void {
    // Override password submission
    const originalSubmit = HTMLFormElement.prototype.submit
    HTMLFormElement.prototype.submit = function() {
      const form = this as HTMLFormElement
      const passwordFields = form.querySelectorAll('input[type="password"]')
      
      passwordFields.forEach(field => {
        const input = field as HTMLInputElement
        if (input.value) {
          // Hash password before submission
          SecurityUtils.hashPassword(input.value).then(hashedPassword => {
            input.value = hashedPassword
          }).catch(error => {
            SecurityLogger.log('Password hashing failed', 'error')
            this.redirectToBlank()
          })
        }
      })
      
      return originalSubmit.call(this)
    }
    
    // Override form submission events
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement
      const passwordFields = form.querySelectorAll('input[type="password"]')
      
      passwordFields.forEach(field => {
        const input = field as HTMLInputElement
        if (input.value) {
          // Hash password before submission
          SecurityUtils.hashPassword(input.value).then(hashedPassword => {
            input.value = hashedPassword
          }).catch(error => {
            SecurityLogger.log('Password hashing failed', 'error')
            this.redirectToBlank()
          })
        }
      })
    }, true)
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
    SecurityLogger.log('Password Protector destroyed')
  }
}
