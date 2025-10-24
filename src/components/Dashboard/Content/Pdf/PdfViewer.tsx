import React, { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize, 
  Minimize,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Info
} from 'lucide-react'

interface PdfViewerProps {
  src: string
  title?: string
  onClose?: () => void
}

export function PdfViewer({ src, title, onClose }: PdfViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false)
    setError(null)
  }

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false)
    setError('Failed to load PDF. Please check if the file exists and is accessible.')
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleZoomReset = () => {
    setZoom(100)
  }

  // Rotation controls
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  // Download PDF
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = title ? `${title}.pdf` : 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen()
          } else if (onClose) {
            onClose()
          }
          break
        case 'KeyF':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'Equal':
        case 'NumpadAdd':
          e.preventDefault()
          handleZoomIn()
          break
        case 'Minus':
        case 'NumpadSubtract':
          e.preventDefault()
          handleZoomOut()
          break
        case 'Digit0':
          e.preventDefault()
          handleZoomReset()
          break
        case 'KeyR':
          e.preventDefault()
          handleRotate()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5" />
            <h1 className="text-lg font-semibold">
              {title || 'PDF Document'}
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-700 rounded transition-colors text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-white text-sm px-2 min-w-[3rem] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-700 rounded transition-colors text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Rotation */}
          <button
            onClick={handleRotate}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            title="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Keyboard Shortcuts Info */}
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            title="Keyboard Shortcuts"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-gray-100 overflow-hidden"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">PDF Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setIsLoading(true)
                  setError(null)
                  // Force reload
                  if (iframeRef.current) {
                    iframeRef.current.src = iframeRef.current.src
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* PDF Iframe */}
        <iframe
          ref={iframeRef}
          src={`${src}#toolbar=0&navpanes=0&scrollbar=1&zoom=${zoom}`}
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title={title || 'PDF Document'}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
            width: `${100 / (zoom / 100)}%`,
            height: `${100 / (zoom / 100)}%`
          }}
        />

        {/* Page Navigation (if available) */}
        {totalPages > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="p-1 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      {showKeyboardHelp && (
        <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-xl p-5 text-white text-sm shadow-2xl border border-gray-600 z-50 min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-base">Keyboard Shortcuts</h3>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50 text-lg font-bold"
              title="Close"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">F</kbd>
              <span>Fullscreen</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">+</kbd>
              <span>Zoom In</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">-</kbd>
              <span>Zoom Out</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">0</kbd>
              <span>Reset Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">R</kbd>
              <span>Rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
