'use client'

import { useState, useRef, useEffect } from 'react'

export function BirthdayMusic() {
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/birthday-music.mp3')
    audio.loop = true
    audio.volume = 0.5
    audio.addEventListener('canplaythrough', () => setLoaded(true))
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  return (
    <button
      onClick={toggle}
      title={playing ? 'Pause music' : 'Play birthday music'}
      aria-label={playing ? 'Pause birthday music' : 'Play birthday music'}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform duration-200"
    >
      {playing ? '🔇' : '🎵'}
      {playing && (
        <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-50" />
      )}
    </button>
  )
}
