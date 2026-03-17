'use client'

import { useEffect, useRef, useState } from 'react'

export function BirthdaySound() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Check if today is birthday (March 18)
    const today = new Date()
    const isBirthdayToday = today.getDate() === 18 && today.getMonth() === 2

    if (isBirthdayToday && !hasPlayed && audioRef.current) {
      // Play sound after a short delay for better UX
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(() => {
          // Silently fail if autoplay is blocked
          console.log('Birthday sound autoplay was blocked')
        })
        setHasPlayed(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [mounted, hasPlayed])

  if (!mounted) {
    return null
  }

  return (
    <audio
      ref={audioRef}
      src="/birthday-sound.mp3"
      preload="auto"
    />
  )
}
