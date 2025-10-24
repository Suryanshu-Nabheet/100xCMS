import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, SkipBack, SkipForward, ArrowLeft, Clock,
  ChevronUp, ChevronDown, Captions, PictureInPicture,
  ExternalLink, BookOpen, ChevronRight, Info
} from 'lucide-react'

interface Timestamp {
  time: number
  title: string
}

interface CourseContent {
  notes?: string
  links?: Array<{
    title: string
    url: string
  }>
}

interface VideoPlayerProps {
  src: string
  title?: string
  timestamps?: Timestamp[]
  description?: string
  author?: string
  content?: CourseContent
  onClose?: () => void
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function VideoPlayer({ src, title, timestamps = [], description, author, content, onClose, onProgress, onComplete }: VideoPlayerProps) {
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
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isHoveringProgress, setIsHoveringProgress] = useState(false)
  const [hoverPosition, setHoverPosition] = useState(0)
  
  // Animation state
  const [skipAnimation, setSkipAnimation] = useState<{ show: boolean; direction: 'left' | 'right' }>({ show: false, direction: 'right' })
  
  // Error handling
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoSources, setVideoSources] = useState<string[]>([])
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0)
  
  // Content viewer state
  const [showDescription, setShowDescription] = useState(false)

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
        if (playing) {
          video.pause()
          setPlaying(false)
        } else {
          video.play().then(() => setPlaying(true)).catch(console.error)
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        video.currentTime = Math.max(0, video.currentTime - 10)
        showSkipAnimation('left')
        break
      case 'ArrowRight':
        e.preventDefault()
        video.currentTime = Math.min(video.duration, video.currentTime + 10)
        showSkipAnimation('right')
        break
      case 'ArrowUp': {
        e.preventDefault()
        const newVolumeUp = Math.min(1, volume + 0.1)
        video.volume = newVolumeUp
        setVolume(newVolumeUp)
        setMuted(newVolumeUp === 0)
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        const newVolumeDown = Math.max(0, volume - 0.1)
        video.volume = newVolumeDown
        setVolume(newVolumeDown)
        setMuted(newVolumeDown === 0)
        break
      }
      case 'KeyM':
        e.preventDefault()
        video.muted = !muted
        setMuted(!muted)
        break
      case 'KeyF':
        e.preventDefault()
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          containerRef.current?.requestFullscreen()
        }
        break
      case 'KeyP':
        e.preventDefault()
        togglePictureInPicture()
        break
      case 'KeyC':
        e.preventDefault()
        setShowTimestamps(!showTimestamps)
        break
      case 'KeyS':
        e.preventDefault()
        setShowSettings(!showSettings)
        break
      case 'Escape':
        if (showSettings) {
          setShowSettings(false)
        } else if (document.fullscreenElement) {
          document.exitFullscreen()
        } else if (onClose) {
          onClose()
        }
        break
      case 'Equal':
      case 'NumpadAdd':
        e.preventDefault()
        const newRateUp = Math.min(2, playbackRate + 0.25)
        video.playbackRate = newRateUp
        setPlaybackRate(newRateUp)
        break
      case 'Minus':
      case 'NumpadSubtract':
        e.preventDefault()
        const newRateDown = Math.max(0.5, playbackRate - 0.25)
        video.playbackRate = newRateDown
        setPlaybackRate(newRateDown)
        break
      case 'Digit0':
        e.preventDefault()
        video.currentTime = 0
        resetControlsTimeout()
        break
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9': {
        e.preventDefault()
        const percentage = parseInt(e.code.slice(-1)) * 10
        video.currentTime = (duration * percentage) / 100
        resetControlsTimeout()
        break
      }
    }
  }, [playing, volume, duration, muted, playbackRate, showTimestamps, showSettings, onClose])

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

    const handlePictureInPictureChange = () => {
      // Picture-in-picture state change handler
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('error', handleError)
    video.addEventListener('ended', handleEnded)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('enterpictureinpicture', handlePictureInPictureChange)
    document.addEventListener('leavepictureinpicture', handlePictureInPictureChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('error', handleError)
      video.removeEventListener('ended', handleEnded)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('enterpictureinpicture', handlePictureInPictureChange)
      document.removeEventListener('leavepictureinpicture', handlePictureInPictureChange)
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

  const togglePictureInPicture = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      console.error('Picture-in-picture error:', error)
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

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    setHoverPosition(percentage * 100)
    setIsHoveringProgress(true)
  }

  const handleProgressLeave = () => {
    setIsHoveringProgress(false)
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
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header - 8% */}
      <div className="h-[8%] flex items-center justify-between px-8 bg-black/98 backdrop-blur-md border-b border-gray-700/50">
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 bg-gray-900/80 backdrop-blur-sm rounded-xl hover:bg-gray-800/90 transition-all duration-200 text-white font-medium shadow-xl border border-gray-600/50 hover:border-gray-500/70"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
        )}
        
        {title && (
          <div className="flex-1 flex justify-center">
            <h1 className="text-white text-xl font-bold bg-gray-900/80 backdrop-blur-sm px-8 py-3 rounded-xl shadow-xl border border-gray-600/50 max-w-md truncate">
              {title}
            </h1>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 backdrop-blur-sm rounded-xl hover:bg-gray-800/90 transition-all duration-200 text-white font-medium shadow-xl border border-gray-600/50 hover:border-gray-500/70"
            title="Keyboard Shortcuts"
          >
            <Info className="w-5 h-5" />
            <span className="text-sm">Help</span>
          </button>
        </div>
      </div>

      {/* Main Content - 92% */}
      <div className="h-[92%] flex">
        {/* Left Sidebar - Description (22%) */}
        <div className="w-[22%] bg-gray-900/95 backdrop-blur-md border-r border-gray-700/50 flex flex-col">
          <div className="p-8 border-b border-gray-700/50">
            <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Description
            </h3>
            {author && (
              <p className="text-gray-300 text-sm mb-4 font-medium">By {author}</p>
            )}
          </div>

          {/* Scrollable Description Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="p-8">
              <div className="text-gray-300 text-sm leading-relaxed space-y-8">
                {description && (
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      About this lesson
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-base">{description}</p>
                  </div>
                )}
                
                {content?.notes && (
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Notes
                    </h4>
                    <div className="bg-gray-800/60 p-6 rounded-xl text-gray-300 leading-relaxed border border-gray-600/40 shadow-lg">
                      {content.notes}
                    </div>
                  </div>
                )}
                
                {content?.links && content.links.length > 0 && (
                  <div>
                    <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Useful Links
                    </h4>
                    <div className="space-y-4">
                      {content.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 text-blue-400 hover:text-blue-300 transition-all duration-200 text-sm p-4 rounded-xl hover:bg-gray-800/40 border border-gray-600/40 hover:border-blue-500/60 shadow-md hover:shadow-lg"
                        >
                          <ExternalLink className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Video Player (56%) */}
        <div className="w-[56%] relative bg-black">
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

            {/* YouTube-style Controls Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Center Play Button */}
              {!playing && duration > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleVideoClick}
                    className="w-28 h-28 bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/95 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-white/40 hover:border-white/60"
                  >
                    <Play className="w-14 h-14 text-white ml-1 drop-shadow-lg" />
                  </button>
                </div>
              )}

              {/* YouTube-style Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0">
                {/* Progress Bar Container */}
                <div 
                  className="relative h-2 bg-gray-600/40 cursor-pointer group hover:h-3 transition-all duration-200"
                  onMouseMove={handleProgressHover}
                  onMouseLeave={handleProgressLeave}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const percentage = x / rect.width
                    seekTo(percentage * duration)
                  }}
                >
                  {/* Progress Bar */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-100 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  
                  {/* Progress Handle */}
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border-2 border-blue-500"
                    style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: '-10px' }}
                  />
                  
                  {/* Hover Preview */}
                  {isHoveringProgress && (
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-xl border-2 border-white"
                      style={{ left: `${hoverPosition}%`, marginLeft: '-10px' }}
                    />
                  )}
                </div>

                {/* Control Bar */}
                <div className="bg-gradient-to-t from-black/95 to-transparent px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      {/* Play/Pause */}
                      <button
                        onClick={handleVideoClick}
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                      >
                        {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </button>

                      {/* Skip Buttons */}
                      <button
                        onClick={() => {
                          skip(-10)
                          showSkipAnimation('left')
                        }}
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        title="Rewind 10s"
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => {
                          skip(10)
                          showSkipAnimation('right')
                        }}
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        title="Forward 10s"
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>

                      {/* Volume */}
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        >
                          {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                        </button>
                        <div className="w-32 h-2 bg-gray-600/50 rounded-full relative group hover:h-3 transition-all duration-200">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-200 rounded-full"
                            style={{ width: `${muted ? 0 : volume * 100}%` }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={muted ? 0 : volume}
                            onChange={(e) => changeVolume(parseFloat(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Time Display */}
                      <div className="text-white text-sm font-mono bg-black/70 backdrop-blur-sm px-5 py-3 rounded-xl border border-gray-600/50 shadow-lg">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Captions */}
                      <button
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        title="Captions"
                      >
                        <Captions className="w-6 h-6" />
                      </button>

                      {/* Settings */}
                      <div className="relative">
                        <button
                          onClick={() => setShowSettings(!showSettings)}
                          className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                          title="Settings"
                        >
                          <Settings className="w-6 h-6" />
                        </button>

                        {showSettings && (
                          <div className="absolute bottom-16 right-0 bg-black/98 backdrop-blur-md rounded-xl border border-gray-600/50 p-4 min-w-[160px] shadow-2xl">
                            <div className="text-white text-sm font-bold mb-4">Playback Speed</div>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                              <button
                                key={rate}
                                onClick={() => changePlaybackRate(rate)}
                                className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                  playbackRate === rate
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-white/80 hover:bg-gray-700/50 hover:text-white'
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Picture-in-Picture */}
                      <button
                        onClick={togglePictureInPicture}
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        title="Picture-in-picture"
                      >
                        <PictureInPicture className="w-6 h-6" />
                      </button>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-gray-300 transition-all duration-200 p-3 rounded-full hover:bg-white/15 hover:scale-110"
                        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Timestamps (22%) */}
        <div className="w-[22%] bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 flex flex-col">
          <div className="p-8 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-3 text-xl">
                <Clock className="w-6 h-6 text-green-400" />
                Chapters
              </h3>
              <button
                onClick={() => setShowTimestamps(!showTimestamps)}
                className="text-gray-400 hover:text-white transition-all duration-200 p-3 rounded-xl hover:bg-white/10 hover:scale-110"
              >
                {showTimestamps ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Scrollable Timestamps List */}
          {showTimestamps && (
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <div className="p-8 space-y-4">
                {timestamps.map((timestamp, index) => {
                  const isActive = getCurrentTimestamp()?.time === timestamp.time
                  const isPassed = currentTime > timestamp.time
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleTimestampClick(timestamp)}
                      className={`w-full text-left p-5 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-xl border border-blue-400/70'
                          : isPassed
                          ? 'bg-white/8 text-gray-300 hover:bg-white/15 border border-gray-600/50 hover:border-gray-500/70'
                          : 'text-gray-400 hover:bg-white/8 hover:text-white border border-gray-700/50 hover:border-gray-600/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-bold truncate mb-2">
                            {timestamp.title}
                          </div>
                          <div className="text-xs opacity-80 font-mono">
                            {formatTime(timestamp.time)}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg"></div>
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

      {/* Keyboard Shortcuts Help Panel */}
      {showKeyboardHelp && (
        <div className="absolute top-20 right-8 bg-black/98 backdrop-blur-md rounded-2xl p-6 text-white text-sm shadow-2xl border border-gray-600/50 z-50 min-w-[320px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-400" />
              Keyboard Shortcuts
            </h3>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="text-gray-300 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-700/50 text-xl font-bold"
              title="Close"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">Space</kbd>
                <span>Play/Pause</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">←</kbd>
                <span>Rewind 10s</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">→</kbd>
                <span>Forward 10s</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">↑</kbd>
                <span>Volume Up</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">↓</kbd>
                <span>Volume Down</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">M</kbd>
                <span>Mute/Unmute</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">F</kbd>
                <span>Fullscreen</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">P</kbd>
                <span>Picture-in-Picture</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">C</kbd>
                <span>Toggle Chapters</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">S</kbd>
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">+/-</kbd>
                <span>Speed Up/Down</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">0-9</kbd>
                <span>Jump to %</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-600/50">
            <div className="flex items-center gap-3">
              <kbd className="bg-gray-700 px-3 py-1 rounded text-xs font-mono">Esc</kbd>
              <span>Close/Exit Fullscreen</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
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

        /* Custom Scrollbar Styles */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.6);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </div>
  )
}