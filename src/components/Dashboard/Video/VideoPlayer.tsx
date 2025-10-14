import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, Minimize, ArrowLeft } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  onClose?: () => void
  title?: string
}

export function VideoPlayer({ src, onProgress, onComplete, onClose, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

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
      console.log('Video metadata loaded:', {
        duration: video.duration,
        src: video.src,
        readyState: video.readyState
      })
    }

    const handleCanPlay = () => {
      console.log('Video can play:', video.src)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', e, video.error)
    }

    const handleEnded = () => {
      setPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('ended', handleEnded)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('ended', handleEnded)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [onProgress, onComplete, duration])

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = parseFloat(e.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
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

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
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

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      {/* Header with Back Button and Title */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900/90 backdrop-blur-sm rounded-xl hover:bg-blue-800/90 transition-all duration-300 border border-blue-500/40 text-white font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
          
          {/* Centered Title */}
          {title && (
            <div className="flex-1 flex justify-center">
              <h2 className="text-white text-2xl font-bold bg-blue-900/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-500/40 shadow-lg">
                {title}
              </h2>
            </div>
          )}
          
          {/* Spacer for balance */}
          <div className="w-24"></div>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="relative bg-black rounded-2xl overflow-hidden group shadow-2xl max-w-6xl w-full mt-20"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full aspect-video cursor-pointer transition-all duration-300"
          onClick={togglePlayPause}
          preload="metadata"
          controls={false}
          playsInline
        />

        {/* Loading Spinner */}
        {duration === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600/20 border-t-blue-600"></div>
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
                onClick={togglePlayPause}
                className="w-24 h-24 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500/90 transition-all duration-300 hover:scale-110 border border-blue-400/30"
              >
                <Play className="w-12 h-12 text-white ml-2" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-blue-900/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-blue-400 transition-all duration-200 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => skip(-10)}
                  className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                  title="Rewind 10s"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                >
                  {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                <button
                  onClick={() => skip(10)}
                  className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                  title="Forward 10s"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                  >
                    {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-blue-900/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-blue-300"
                  />
                </div>

                <div className="text-white text-sm font-mono bg-blue-900/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-blue-500/30">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Playback Speed */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  {showSettings && (
                    <div className="absolute bottom-8 right-0 bg-blue-900/90 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3 min-w-[140px] shadow-xl">
                      <div className="text-white text-sm font-medium mb-2">Playback Speed</div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            playbackRate === rate
                              ? 'bg-blue-600 text-white border border-blue-400/50'
                              : 'text-white/80 hover:bg-blue-500/20'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 border border-transparent hover:border-blue-500/30"
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}