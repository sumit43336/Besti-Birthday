'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const photoPool = Array.from({ length: 57 }, (_, i) => `/drop-rain/photo-${i + 1}.jpg`)

interface FloatingPhoto {
  id: number
  src: string
  startX: number
  startY: number
  size: number
  // Random waypoints for butterfly-like path
  waypoints: Array<{ x: number; y: number; rot: number }>
  duration: number
}

function generateWaypoints() {
  // 6 random waypoints across the screen for a wandering path
  const points = []
  for (let i = 0; i < 6; i++) {
    points.push({
      x: 10 + Math.random() * 80, // % of viewport width
      y: 10 + Math.random() * 70, // % of viewport height
      rot: -25 + Math.random() * 50,
    })
  }
  return points
}

export function FloatingPhotos() {
  const [photos, setPhotos] = useState<FloatingPhoto[]>([])
  const idCounter = useRef(0)
  const lastScroll = useRef(0)
  const cooldown = useRef(false)
  const activeCount = useRef(0)

  const spawnPhoto = useCallback(() => {
    if (activeCount.current >= 2 || cooldown.current) return

    cooldown.current = true
    setTimeout(() => { cooldown.current = false }, 2500)

    const id = idCounter.current++
    const src = photoPool[Math.floor(Math.random() * photoPool.length)]
    const duration = 7 + Math.random() * 4

    const newPhoto: FloatingPhoto = {
      id,
      src,
      startX: 10 + Math.random() * 80,
      startY: 10 + Math.random() * 70,
      size: 50 + Math.random() * 35,
      waypoints: generateWaypoints(),
      duration,
    }

    activeCount.current++
    setPhotos((prev) => [...prev, newPhoto])

    setTimeout(() => {
      activeCount.current = Math.max(0, activeCount.current - 1)
      setPhotos((prev) => prev.filter((p) => p.id !== id))
    }, duration * 1000)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll.current)
      if (delta < 100) return
      lastScroll.current = window.scrollY
      spawnPhoto()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [spawnPhoto])

  if (photos.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {photos.map((p) => (
        <ButterflyPhoto key={p.id} photo={p} />
      ))}
    </div>
  )
}

function ButterflyPhoto({ photo }: { photo: FloatingPhoto }) {
  const { waypoints, duration, startX, startY, size, src } = photo

  // Build a CSS animation using inline keyframes unique to this photo
  const keyframes = `
    @keyframes bf-${photo.id} {
      0% {
        left: ${startX}%;
        top: ${startY}%;
        opacity: 0;
        transform: scale(0.3) rotate(0deg);
      }
      8% {
        opacity: 0.5;
        transform: scale(0.95) rotate(${waypoints[0].rot}deg);
      }
      20% {
        left: ${waypoints[0].x}%;
        top: ${waypoints[0].y}%;
        transform: scale(1) rotate(${waypoints[0].rot}deg);
        opacity: 0.45;
      }
      35% {
        left: ${waypoints[1].x}%;
        top: ${waypoints[1].y}%;
        transform: scale(0.95) rotate(${waypoints[1].rot}deg);
        opacity: 0.45;
      }
      50% {
        left: ${waypoints[2].x}%;
        top: ${waypoints[2].y}%;
        transform: scale(1.05) rotate(${waypoints[2].rot}deg);
        opacity: 0.4;
      }
      65% {
        left: ${waypoints[3].x}%;
        top: ${waypoints[3].y}%;
        transform: scale(0.95) rotate(${waypoints[3].rot}deg);
        opacity: 0.4;
      }
      80% {
        left: ${waypoints[4].x}%;
        top: ${waypoints[4].y}%;
        transform: scale(1) rotate(${waypoints[4].rot}deg);
        opacity: 0.3;
      }
      92% {
        left: ${waypoints[5].x}%;
        top: ${waypoints[5].y}%;
        transform: scale(0.8) rotate(${waypoints[5].rot}deg);
        opacity: 0.15;
      }
      100% {
        left: ${waypoints[5].x + 5}%;
        top: ${waypoints[5].y - 5}%;
        opacity: 0;
        transform: scale(0.4) rotate(${waypoints[5].rot + 20}deg);
      }
    }
  `

  return (
    <>
      <style>{keyframes}</style>
      <div
        className="absolute rounded-xl overflow-hidden border-2 border-white/40 shadow-lg"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animation: `bf-${photo.id} ${duration}s ease-in-out forwards`,
          opacity: 0,
        }}
      >
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
    </>
  )
}
