'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function BirthdaySound() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isBirthdayToday, setIsBirthdayToday] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if today is birthday (March 18)
    const today = new Date()
    const isBirthday = today.getDate() === 18 && today.getMonth() === 2
    setIsBirthdayToday(isBirthday)
    
    // Auto-play on birthday after a delay
    if (isBirthday && audioRef.current) {
      const timer = setTimeout(() => {
        playSound()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        console.log('Birthday sound autoplay was blocked by browser')
      })
      setIsPlaying(true)
    }
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
      
      {/* Birthday sound control button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={isPlaying ? stopSound : playSound}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          aria-label={isPlaying ? 'Stop birthday music' : 'Play birthday music'}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-5 h-5" />
              <span className="text-sm font-semibold">Stop Music</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Play Music</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
