'use client'
import { useEffect } from 'react'
import { UltraSecurity } from './UltraSecurity'
import { AdminGuard } from './AdminGuard'
import { AdminDashboard } from './dashboard'
import { CourseManager } from './course-manager'

interface UltraSecureAdminProps {
  defaultTab?: 'dashboard' | 'courses'
}

export function UltraSecureAdmin({ defaultTab = 'dashboard' }: UltraSecureAdminProps) {
  useEffect(() => {
    // Additional ultra-security measures
    const addUltraSecurityMeasures = () => {
      // Disable all possible inspection methods
      const disableAllInspection = () => {
        // Override all possible inspection methods
        const originalConsole = window.console
        Object.keys(originalConsole).forEach(key => {
          try {
            originalConsole[key] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 CONSOLE ACCESS DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all window methods that could be used for inspection
        const dangerousMethods = [
          'alert', 'confirm', 'prompt', 'open', 'close', 'focus', 'blur',
          'moveBy', 'moveTo', 'resizeBy', 'resizeTo', 'scroll', 'scrollBy',
          'scrollTo', 'stop', 'print', 'postMessage', 'addEventListener',
          'removeEventListener', 'dispatchEvent'
        ]

        dangerousMethods.forEach(method => {
          try {
            const original = window[method]
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 WINDOW METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all document methods
        const documentMethods = [
          'querySelector', 'querySelectorAll', 'getElementById', 'getElementsByClassName',
          'getElementsByTagName', 'getElementsByName', 'createElement', 'createTextNode',
          'createDocumentFragment', 'createAttribute', 'createComment', 'createCDATASection',
          'createEntityReference', 'createProcessingInstruction', 'importNode', 'adoptNode',
          'addEventListener', 'removeEventListener', 'dispatchEvent'
        ]

        documentMethods.forEach(method => {
          try {
            const original = document[method]
            document[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DOCUMENT METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all element methods
        const elementMethods = [
          'querySelector', 'querySelectorAll', 'getElementsByClassName', 'getElementsByTagName',
          'closest', 'matches', 'contains', 'compareDocumentPosition', 'isEqualNode',
          'isSameNode', 'lookupPrefix', 'lookupNamespaceURI', 'isDefaultNamespace',
          'insertBefore', 'replaceChild', 'removeChild', 'appendChild', 'hasChildNodes',
          'cloneNode', 'normalize', 'isSupported', 'hasAttribute', 'getAttribute',
          'setAttribute', 'removeAttribute', 'getAttributeNode', 'setAttributeNode',
          'removeAttributeNode', 'getElementsByTagName', 'getAttributeNS', 'setAttributeNS',
          'removeAttributeNS', 'getAttributeNodeNS', 'setAttributeNodeNS', 'hasAttributeNS'
        ]

        elementMethods.forEach(method => {
          try {
            Element.prototype[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 ELEMENT METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all Node methods
        const nodeMethods = [
          'appendChild', 'cloneNode', 'compareDocumentPosition', 'contains', 'hasChildNodes',
          'insertBefore', 'isDefaultNamespace', 'isEqualNode', 'isSameNode', 'lookupNamespaceURI',
          'lookupPrefix', 'normalize', 'removeChild', 'replaceChild'
        ]

        nodeMethods.forEach(method => {
          try {
            Node.prototype[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 NODE METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all EventTarget methods
        const eventTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent']
        eventTargetMethods.forEach(method => {
          try {
            EventTarget.prototype[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 EVENT TARGET METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all storage methods
        const storageMethods = ['getItem', 'setItem', 'removeItem', 'clear', 'key', 'length']
        storageMethods.forEach(method => {
          try {
            Storage.prototype[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 STORAGE METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all network methods
        const networkMethods = ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource']
        networkMethods.forEach(method => {
          try {
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 NETWORK METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all timing methods
        const timingMethods = ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame']
        timingMethods.forEach(method => {
          try {
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 TIMING METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all crypto methods
        const cryptoMethods = ['crypto', 'subtle']
        cryptoMethods.forEach(method => {
          try {
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 CRYPTO METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all performance methods
        const performanceMethods = ['performance', 'performance.now', 'performance.mark', 'performance.measure']
        performanceMethods.forEach(method => {
          try {
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 PERFORMANCE METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all navigation methods
        const navigationMethods = ['history', 'location', 'navigator']
        navigationMethods.forEach(method => {
          try {
            window[method] = new Proxy(window[method], {
              get: () => {
                document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 NAVIGATION METHOD DETECTED - ACCESS DENIED</div>'
                window.location.href = 'about:blank'
                return {}
              }
            })
          } catch (e) {}
        })

        // Override all error handling methods
        const errorMethods = ['onerror', 'onunhandledrejection', 'onrejectionhandled']
        errorMethods.forEach(method => {
          try {
            window[method] = () => {
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 ERROR METHOD DETECTED - ACCESS DENIED</div>'
              window.location.href = 'about:blank'
            }
          } catch (e) {}
        })

        // Override all global objects
        const globalObjects = ['Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error', 'Function', 'Math', 'JSON']
        globalObjects.forEach(obj => {
          try {
            window[obj] = new Proxy(window[obj], {
              get: () => {
                document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 GLOBAL OBJECT DETECTED - ACCESS DENIED</div>'
                window.location.href = 'about:blank'
                return {}
              }
            })
          } catch (e) {}
        })
      }

      // Disable all possible keyboard shortcuts
      const disableAllKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
          // Block ALL keyboard shortcuts
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 KEYBOARD SHORTCUT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        document.addEventListener('keyup', (e) => {
          // Block ALL keyboard shortcuts
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 KEYBOARD SHORTCUT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)

        document.addEventListener('keypress', (e) => {
          // Block ALL keyboard shortcuts
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          
          document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 KEYBOARD SHORTCUT DETECTED - ACCESS DENIED</div>'
          window.location.href = 'about:blank'
          return false
        }, true)
      }

      // Disable all possible mouse events
      const disableAllMouseEvents = () => {
        const mouseEvents = ['mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'click', 'dblclick', 'contextmenu', 'auxclick', 'wheel', 'scroll']
        
        mouseEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 MOUSE EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible touch events
      const disableAllTouchEvents = () => {
        const touchEvents = ['touchstart', 'touchend', 'touchmove', 'touchcancel']
        
        touchEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 TOUCH EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible drag events
      const disableAllDragEvents = () => {
        const dragEvents = ['dragstart', 'dragend', 'dragenter', 'dragleave', 'dragover', 'drop']
        
        dragEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 DRAG EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible selection events
      const disableAllSelectionEvents = () => {
        const selectionEvents = ['selectstart', 'selectionchange', 'select']
        
        selectionEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 SELECTION EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible clipboard events
      const disableAllClipboardEvents = () => {
        const clipboardEvents = ['copy', 'cut', 'paste']
        
        clipboardEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 CLIPBOARD EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible focus events
      const disableAllFocusEvents = () => {
        const focusEvents = ['focus', 'blur', 'focusin', 'focusout']
        
        focusEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 FOCUS EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible form events
      const disableAllFormEvents = () => {
        const formEvents = ['submit', 'reset', 'change', 'input']
        
        formEvents.forEach(event => {
          document.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 FORM EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Disable all possible window events
      const disableAllWindowEvents = () => {
        const windowEvents = ['beforeunload', 'unload', 'load', 'resize', 'scroll', 'beforeprint', 'afterprint']
        
        windowEvents.forEach(event => {
          window.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#ff0000;font-family:Arial;font-size:32px;text-align:center">🚫 WINDOW EVENT DETECTED - ACCESS DENIED</div>'
            window.location.href = 'about:blank'
            return false
          }, true)
        })
      }

      // Initialize all ultra-security measures
      disableAllInspection()
      disableAllKeyboardShortcuts()
      disableAllMouseEvents()
      disableAllTouchEvents()
      disableAllDragEvents()
      disableAllSelectionEvents()
      disableAllClipboardEvents()
      disableAllFocusEvents()
      disableAllFormEvents()
      disableAllWindowEvents()
    }

    addUltraSecurityMeasures()
  }, [])

  return (
    <UltraSecurity>
      <AdminGuard>
        <div className="min-h-screen bg-black">
          {/* Ultra Security Header */}
          <div className="bg-red-900/20 border-b border-red-500/30 p-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-200 text-sm font-medium">ULTRA SECURE ADMIN SESSION</span>
              </div>
              <div className="text-red-200 text-xs">
                All inspection methods are blocked and monitored
              </div>
            </div>
          </div>

          {/* Admin Content */}
          <div className="max-w-7xl mx-auto">
            {defaultTab === 'dashboard' && <AdminDashboard />}
            {defaultTab === 'courses' && <CourseManager />}
          </div>
        </div>
      </AdminGuard>
    </UltraSecurity>
  )
}
