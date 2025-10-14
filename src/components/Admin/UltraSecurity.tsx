'use client'
import { useEffect, useState } from 'react'
import { useAdminAuth } from './auth'

interface UltraSecurityProps {
  children: React.ReactNode
}

export function UltraSecurity({ children }: UltraSecurityProps) {
  const { isAdmin, isLoading } = useAdminAuth()
  const [isSecure, setIsSecure] = useState(false)

  useEffect(() => {
    // Ultra-aggressive security measures
    const initUltraSecurity = () => {
      // Disable all possible inspection methods
      const disableInspection = () => {
        // Override console methods
        const originalConsole = { ...console }
        Object.keys(console).forEach(key => {
          console[key] = () => {}
        })

        // Override debugger
        const originalDebugger = window.debugger
        window.debugger = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DEBUGGING DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }

        // Override eval
        const originalEval = window.eval
        window.eval = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 EVAL DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }

        // Override Function constructor
        const originalFunction = window.Function
        window.Function = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 FUNCTION CONSTRUCTOR DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }

        // Override setTimeout and setInterval
        const originalSetTimeout = window.setTimeout
        const originalSetInterval = window.setInterval
        window.setTimeout = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 TIMEOUT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }
        window.setInterval = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 INTERVAL DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }

        // Override document methods
        const originalQuerySelector = document.querySelector
        const originalQuerySelectorAll = document.querySelectorAll
        const originalGetElementById = document.getElementById
        const originalGetElementsByClassName = document.getElementsByClassName
        const originalGetElementsByTagName = document.getElementsByTagName

        document.querySelector = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOM QUERY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return null
        }

        document.querySelectorAll = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOM QUERY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return []
        }

        document.getElementById = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOM QUERY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return null
        }

        document.getElementsByClassName = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOM QUERY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return []
        }

        document.getElementsByTagName = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOM QUERY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return []
        }

        // Override window methods
        const originalOpen = window.open
        window.open = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 WINDOW OPEN DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return null
        }

        // Override localStorage and sessionStorage
        const originalLocalStorage = window.localStorage
        const originalSessionStorage = window.sessionStorage
        window.localStorage = new Proxy(originalLocalStorage, {
          get: () => {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 STORAGE ACCESS DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return {}
          }
        })

        window.sessionStorage = new Proxy(originalSessionStorage, {
          get: () => {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 STORAGE ACCESS DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return {}
          }
        })

        // Override fetch
        const originalFetch = window.fetch
        window.fetch = () => {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 FETCH DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return Promise.reject()
        }

        // Override XMLHttpRequest
        const originalXHR = window.XMLHttpRequest
        window.XMLHttpRequest = function() {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 XHR DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return {}
        } as any

        // Override WebSocket
        const originalWebSocket = window.WebSocket
        window.WebSocket = function() {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 WEBSOCKET DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return {}
        } as any

        // Override EventSource
        const originalEventSource = window.EventSource
        window.EventSource = function() {
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 EVENT SOURCE DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return {}
        } as any
      }

      // Disable keyboard shortcuts
      const disableKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
          // Block all common inspection shortcuts
          if (
            e.key === 'F12' ||
            e.key === 'F11' ||
            e.key === 'F10' ||
            e.key === 'F9' ||
            e.key === 'F8' ||
            e.key === 'F7' ||
            e.key === 'F6' ||
            e.key === 'F5' ||
            e.key === 'F4' ||
            e.key === 'F3' ||
            e.key === 'F2' ||
            e.key === 'F1' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
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
            (e.ctrlKey && e.shiftKey && e.key === 'Z') ||
            (e.ctrlKey && e.key === 'U') ||
            (e.ctrlKey && e.key === 'S') ||
            (e.ctrlKey && e.key === 'P') ||
            (e.ctrlKey && e.key === 'R') ||
            (e.ctrlKey && e.key === 'F') ||
            (e.ctrlKey && e.key === 'G') ||
            (e.ctrlKey && e.key === 'H') ||
            (e.ctrlKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'K') ||
            (e.ctrlKey && e.key === 'L') ||
            (e.ctrlKey && e.key === 'M') ||
            (e.ctrlKey && e.key === 'N') ||
            (e.ctrlKey && e.key === 'O') ||
            (e.ctrlKey && e.key === 'Q') ||
            (e.ctrlKey && e.key === 'T') ||
            (e.ctrlKey && e.key === 'V') ||
            (e.ctrlKey && e.key === 'W') ||
            (e.ctrlKey && e.key === 'X') ||
            (e.ctrlKey && e.key === 'Y') ||
            (e.ctrlKey && e.key === 'Z') ||
            (e.altKey && e.key === 'Tab') ||
            (e.altKey && e.key === 'F4') ||
            (e.altKey && e.key === 'F5') ||
            (e.altKey && e.key === 'F6') ||
            (e.altKey && e.key === 'F7') ||
            (e.altKey && e.key === 'F8') ||
            (e.altKey && e.key === 'F9') ||
            (e.altKey && e.key === 'F10') ||
            (e.altKey && e.key === 'F11') ||
            (e.altKey && e.key === 'F12')
          ) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            // Clear screen and redirect
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 INSPECTION ATTEMPT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }
        }, true)
      }

      // Disable mouse events
      const disableMouseEvents = () => {
        // Disable right-click
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 RIGHT-CLICK DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        // Disable middle-click
        document.addEventListener('auxclick', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 MIDDLE-CLICK DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        // Disable drag
        document.addEventListener('dragstart', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }, true)

        // Disable drop
        document.addEventListener('drop', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }, true)

        // Disable drag over
        document.addEventListener('dragover', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }, true)
      }

      // Disable text selection
      const disableTextSelection = () => {
        document.addEventListener('selectstart', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }, true)

        document.addEventListener('selectionchange', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }, true)
      }

      // Disable copy/paste
      const disableCopyPaste = () => {
        document.addEventListener('copy', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 COPY DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        document.addEventListener('cut', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 CUT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        document.addEventListener('paste', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 PASTE DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)
      }

      // Disable print
      const disablePrint = () => {
        window.addEventListener('beforeprint', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 PRINT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        window.addEventListener('afterprint', (e) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 PRINT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)
      }

      // Disable screenshots
      const disableScreenshots = () => {
        document.addEventListener('keyup', (e) => {
          if (e.key === 'PrintScreen') {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 SCREENSHOT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }
        }, true)
      }

      // Disable dev tools detection
      const detectDevTools = () => {
        const checkDevTools = () => {
          const threshold = 160
          const heightDiff = window.outerHeight - window.innerHeight
          const widthDiff = window.outerWidth - window.innerWidth
          
          if (heightDiff > threshold || widthDiff > threshold) {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DEV TOOLS DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return true
          }
          return false
        }

        // Check every 100ms
        setInterval(checkDevTools, 100)
      }

      // Disable console
      const disableConsole = () => {
        // Clear console every 50ms
        setInterval(() => {
          console.clear()
          console.log = () => {}
          console.warn = () => {}
          console.error = () => {}
          console.info = () => {}
          console.debug = () => {}
          console.trace = () => {}
          console.table = () => {}
          console.group = () => {}
          console.groupEnd = () => {}
          console.time = () => {}
          console.timeEnd = () => {}
          console.count = () => {}
          console.assert = () => {}
        }, 50)
      }

      // Disable back button
      const disableBackButton = () => {
        window.history.pushState(null, '', window.location.href)
        window.onpopstate = () => {
          window.history.pushState(null, '', window.location.href)
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 BACK BUTTON DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
        }
      }

      // Initialize all security measures
      disableInspection()
      disableKeyboardShortcuts()
      disableMouseEvents()
      disableTextSelection()
      disableCopyPaste()
      disablePrint()
      disableScreenshots()
      detectDevTools()
      disableConsole()
      disableBackButton()

      setIsSecure(true)
    }

    initUltraSecurity()
  }, [])

  // Show loading while security checks are performed
  if (!isSecure || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-900/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 text-red-400">🔒</div>
          </div>
          <p className="text-red-200">Initializing ultra-secure session...</p>
        </div>
      </div>
    )
  }

  // Only show content if admin is authenticated
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-900/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 text-red-400">🔒</div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-red-200">You are not authorized to access this area.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
