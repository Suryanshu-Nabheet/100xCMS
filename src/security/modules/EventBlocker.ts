// Event Blocker Module
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

export class EventBlocker {
  private static isInitialized = false
  
  static initialize(config: SecurityConfig = SecurityConfig.DEFAULT_SECURITY_CONFIG): void {
    if (this.isInitialized) return
    
    SecurityLogger.log('Initializing Event Blocker')
    
    if (config.enableRightClickBlocking) {
      this.blockRightClick()
    }
    
    if (config.enableKeyboardBlocking) {
      this.blockKeyboard()
    }
    
    if (config.enableMouseBlocking) {
      this.blockMouse()
    }
    
    if (config.enableTouchBlocking) {
      this.blockTouch()
    }
    
    this.isInitialized = true
    SecurityLogger.log('Event Blocker initialized')
  }
  
  private static blockRightClick(): void {
    // Block context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      this.redirectToBlank()
      return false
    }, true)
    
    // Block right mouse button
    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) { // Right mouse button
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }
    }, true)
    
    // Block right mouse button up
    document.addEventListener('mouseup', (e) => {
      if (e.button === 2) { // Right mouse button
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }
    }, true)
  }
  
  private static blockKeyboard(): void {
    // Block keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, etc.
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.shiftKey && e.key === 'K') ||
          (e.ctrlKey && e.shiftKey && e.key === 'L') ||
          (e.ctrlKey && e.shiftKey && e.key === 'M') ||
          (e.ctrlKey && e.shiftKey && e.key === 'N') ||
          (e.ctrlKey && e.shiftKey && e.key === 'O') ||
          (e.ctrlKey && e.shiftKey && e.key === 'P') ||
          (e.ctrlKey && e.shiftKey && e.key === 'Q') ||
          (e.ctrlKey && e.shiftKey && e.key === 'R') ||
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          (e.ctrlKey && e.shiftKey && e.key === 'T') ||
          (e.ctrlKey && e.shiftKey && e.key === 'U') ||
          (e.ctrlKey && e.shiftKey && e.key === 'V') ||
          (e.ctrlKey && e.shiftKey && e.key === 'W') ||
          (e.ctrlKey && e.shiftKey && e.key === 'X') ||
          (e.ctrlKey && e.shiftKey && e.key === 'Y') ||
          (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }
    }, true)
    
    // Block keyup events
    document.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }
    }, true)
    
    // Block keypress events
    document.addEventListener('keypress', (e) => {
      // Block any suspicious key combinations
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }
    }, true)
  }
  
  private static blockMouse(): void {
    // Block mouse events
    const mouseEvents = ['mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave']
    
    mouseEvents.forEach(event => {
      document.addEventListener(event, (e) => {
        // Allow essential admin functions
        const target = e.target as HTMLElement
        if (target) {
          // Allow logout button
          if (target.closest('[data-admin-logout]') || 
              target.closest('button[onClick*="logoutAdmin"]') ||
              target.textContent?.includes('Logout') ||
              target.textContent?.includes('Log Out')) {
            return // Allow this click
          }
          
          // Allow form inputs
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
            return // Allow form interactions
          }
          
          // Allow buttons with admin functions
          if (target.tagName === 'BUTTON' && (
            target.textContent?.includes('Create') ||
            target.textContent?.includes('Save') ||
            target.textContent?.includes('Edit') ||
            target.textContent?.includes('Delete') ||
            target.textContent?.includes('Add') ||
            target.textContent?.includes('Remove') ||
            target.textContent?.includes('Login') ||
            target.textContent?.includes('Submit')
          )) {
            return // Allow admin action buttons
          }
        }
        
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }, true)
    })
  }
  
  private static blockTouch(): void {
    // Block touch events
    const touchEvents = ['touchstart', 'touchend', 'touchmove', 'touchcancel']
    
    touchEvents.forEach(event => {
      document.addEventListener(event, (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        this.redirectToBlank()
        return false
      }, true)
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
    SecurityLogger.log('Event Blocker destroyed')
  }
}
