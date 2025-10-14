import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, SkipBack, SkipForward, ArrowLeft, Clock,
  ChevronUp, ChevronDown
} from 'lucide-react'

interface Timestamp {
  time: number
  title: string
}

interface VideoPlayerProps {
  src: string
  title?: string
  timestamps?: Timestamp[]
  onClose?: () => void
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function VideoPlayer({ src, title, timestamps = [], onClose, onProgress, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Video state
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // UI state
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showTimestamps, setShowTimestamps] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // Animation state
  const [skipAnimation, setSkipAnimation] = useState<{ show: boolean; direction: 'left' | 'right' }>({ show: false, direction: 'right' })
  
  // Error handling
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoSources, setVideoSources] = useState<string[]>([])
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0)

  // Set up fallback video sources
  useEffect(() => {
    const sources = [
      src,
      '/CodeDemo.mp4',
      '/test-video.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    ]
    setVideoSources(sources)
  }, [src])

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }
    setShowControls(true)
    const timeout = setTimeout(() => {
      if (playing) {
        setShowControls(false)
      }
    }, 3000)
    setControlsTimeout(timeout)
  }, [controlsTimeout, playing])

  // Skip animation
  const showSkipAnimation = (direction: 'left' | 'right') => {
    setSkipAnimation({ show: true, direction })
    setTimeout(() => {
      setSkipAnimation({ show: false, direction })
    }, 1000)
  }

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const video = videoRef.current
    if (!video) return

    switch (e.code) {
      case 'Space':
        e.preventDefault()
        togglePlayPause()
        break
      case 'ArrowLeft':
        e.preventDefault()
        skip(-10)
        showSkipAnimation('left')
        break
      case 'ArrowRight':
        e.preventDefault()
        skip(10)
        showSkipAnimation('right')
        break
      case 'ArrowUp':
        e.preventDefault()
        changeVolume(Math.min(1, volume + 0.1))
        break
      case 'ArrowDown':
        e.preventDefault()
        changeVolume(Math.max(0, volume - 0.1))
        break
      case 'KeyM':
        e.preventDefault()
        toggleMute()
        break
      case 'KeyF':
        e.preventDefault()
        toggleFullscreen()
        break
      case 'Digit0':
        e.preventDefault()
        seekTo(0)
        break
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
        e.preventDefault()
        const percentage = parseInt(e.code.slice(-1)) * 10
        seekTo((duration * percentage) / 100)
        break
    }
  }, [playing, volume, duration])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (onProgress && duration > 0) {
        const progress = (video.currentTime / duration) * 100
        onProgress(progress)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', e, video.error)
      const error = video.error
      if (error) {
        let errorMessage = 'Unknown video error'
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Video loading was aborted'
            break
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error occurred'
            break
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Video decoding error'
            break
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Video format not supported'
            break
        }
        setVideoError(errorMessage)
        
        if (currentSourceIndex < videoSources.length - 1) {
          const nextIndex = currentSourceIndex + 1
          setCurrentSourceIndex(nextIndex)
          video.src = videoSources[nextIndex]
          video.load()
          setVideoError(null)
        }
      }
    }

    const handleEnded = () => {
      setPlaying(false)
      if (onComplete) onComplete()
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('error', handleError)
    video.addEventListener('ended', handleEnded)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('error', handleError)
      video.removeEventListener('ended', handleEnded)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [onProgress, onComplete, duration, videoSources, currentSourceIndex])

  // Video controls
  const togglePlayPause = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (playing) {
        video.pause()
        setPlaying(false)
      } else {
        await video.play()
        setPlaying(true)
      }
    } catch (error) {
      console.error('Video play error:', error)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !muted
    setMuted(!muted)
  }

  const changeVolume = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
    resetControlsTimeout()
  }

  const seekTo = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, time))
    resetControlsTimeout()
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  const handleTimestampClick = (timestamp: Timestamp) => {
    seekTo(timestamp.time)
  }

  const handleVideoClick = () => {
    togglePlayPause()
    resetControlsTimeout()
  }

  const handleMouseMove = () => {
    resetControlsTimeout()
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getCurrentTimestamp = () => {
    return timestamps.find((ts, index) => {
      const nextTs = timestamps[index + 1]
      return currentTime >= ts.time && (!nextTs || currentTime < nextTs.time)
    })
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg hover:bg-gray-900/90 transition-all duration-200 text-white font-medium shadow-lg border border-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          {title && (
            <div className="flex-1 flex justify-center">
              <h1 className="text-white text-lg font-semibold bg-black/80 backdrop-blur-sm px-6 py-2 rounded-lg shadow-lg border border-gray-800">
                {title}
              </h1>
            </div>
          )}
          
          <div className="w-24"></div>
        </div>
      </div>

      {/* Main Content - 80/20 Split */}
      <div className="flex w-full h-full pt-16 px-4 pb-4">
        {/* Video Area - 80% */}
        <div className="w-4/5 relative bg-black rounded-l-2xl overflow-hidden shadow-2xl border border-gray-800 border-r-0">
          <div
            ref={containerRef}
            className="relative w-full h-full group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={videoSources[currentSourceIndex] || src}
              className="w-full h-full object-contain cursor-pointer"
              onClick={handleVideoClick}
              preload="metadata"
              controls={false}
              playsInline
            />

            {/* Skip Animation */}
            {skipAnimation.show && (
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-30 ${
                skipAnimation.direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
              }`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-2xl border border-gray-200 flex items-center gap-2">
                  {/* Rewind Icon */}
                  {skipAnimation.direction === 'left' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                        </svg>
                      </div>
                      <span className="text-black font-bold text-base">10</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-black font-bold text-base">10</span>
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display */}
            {videoError && (
              <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-6">⚠️</div>
                  <h3 className="text-2xl font-bold mb-4">Video Error</h3>
                  <p className="text-red-200 mb-6">{videoError}</p>
                  <div className="flex justify-center space-x-3">
                    {videoSources.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentSourceIndex ? 'bg-blue-500' : 
                          index < currentSourceIndex ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Loading Spinner */}
            {duration === 0 && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-600/20 border-t-white"></div>
              </div>
            )}

            {/* Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Center Play Button */}
              {!playing && duration > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleVideoClick}
                    className="w-24 h-24 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-all duration-200 hover:scale-110 shadow-2xl border-2 border-white/30"
                  >
                    <Play className="w-12 h-12 text-white ml-1 drop-shadow-lg" />
                  </button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-600/50 rounded-full appearance-none cursor-pointer progress-slider"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Play/Pause */}
                    <button
                      onClick={handleVideoClick}
                      className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                    >
                      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Skip Buttons */}
                    <button
                      onClick={() => {
                        skip(-10)
                        showSkipAnimation('left')
                      }}
                      className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                      title="Rewind 10s"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        skip(10)
                        showSkipAnimation('right')
                      }}
                      className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                      title="Forward 10s"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                      >
                        {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={muted ? 0 : volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-gray-600/50 rounded-full appearance-none cursor-pointer volume-slider"
                      />
                    </div>

                    {/* Time Display */}
                    <div className="text-white text-xs font-mono bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-gray-800">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Playback Speed */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                        title="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>

                      {showSettings && (
                        <div className="absolute bottom-8 right-0 bg-black/95 backdrop-blur-sm rounded-lg border border-gray-700 p-2 min-w-[120px] shadow-2xl">
                          <div className="text-white text-xs font-medium mb-2">Speed</div>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`block w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                                playbackRate === rate
                                  ? 'bg-blue-600 text-white'
                                  : 'text-white/80 hover:bg-gray-700'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timestamps Sidebar - 20% */}
        <div className="w-1/5 bg-black/95 backdrop-blur-sm border border-gray-800 border-l-0 rounded-r-2xl shadow-2xl">
          <div className="h-full flex flex-col">
            {/* Timestamps Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center gap-3 text-lg">
                  <Clock className="w-5 h-5" />
                  Chapters
                </h3>
                <button
                  onClick={() => setShowTimestamps(!showTimestamps)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  {showTimestamps ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Timestamps List */}
            {showTimestamps && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {timestamps.map((timestamp, index) => {
                    const isActive = getCurrentTimestamp()?.time === timestamp.time
                    const isPassed = currentTime > timestamp.time
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleTimestampClick(timestamp)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                          isActive
                            ? 'bg-blue-600/80 text-white shadow-lg border border-blue-500/50'
                            : isPassed
                            ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-700/50'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white border border-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium truncate">
                              {timestamp.title}
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                              {formatTime(timestamp.time)}
                            </div>
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .progress-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        .progress-slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
        }
        
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid #ffffff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .volume-slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100px) scale(0.8); 
            opacity: 0; 
          }
          20% { 
            transform: translateX(0) scale(1.1); 
            opacity: 1; 
          }
          80% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100px) scale(0.8); 
            opacity: 0; 
          }
        }
        
        @keyframes slideInRight {
          0% { 
            transform: translateX(100px) scale(0.8); 
            opacity: 0; 
          }
          20% { 
            transform: translateX(0) scale(1.1); 
            opacity: 1; 
          }
          80% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translateX(-100px) scale(0.8); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}