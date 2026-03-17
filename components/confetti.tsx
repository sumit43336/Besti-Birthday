'use client'

import { useEffect, useState } from 'react'

export function Confetti() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string; duration: number }>>([])
  const [balloons, setBalloons] = useState<Array<{ id: number; left: number; delay: number; duration: number; emoji: string }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Generate confetti
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['bg-primary', 'bg-accent', 'bg-pink-400', 'bg-yellow-300', 'bg-blue-400'][Math.floor(Math.random() * 5)],
      duration: 2 + Math.random() * 1,
    }))
    setConfetti(confettiPieces)

    // Generate balloons
    const balloonPieces = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      duration: 5 + Math.random() * 3,
      emoji: ['🎈', '🎉', '🎊'][Math.floor(Math.random() * 3)],
    }))
    setBalloons(balloonPieces)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {confetti.map((piece) => (
          <div
            key={`confetti-${piece.id}`}
            className={`confetti ${piece.color} absolute`}
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              animationName: `confetti-fall`,
              animationDuration: `${piece.duration}s`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationDelay: `${piece.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Balloons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        {balloons.map((balloon) => (
          <div
            key={`balloon-${balloon.id}`}
            className="balloon text-4xl"
            style={{
              left: `${balloon.left}%`,
              bottom: '-50px',
              animationName: 'balloon-rise',
              animationDuration: `${balloon.duration}s`,
              animationTimingFunction: 'ease-in',
              animationFillMode: 'forwards',
              animationDelay: `${balloon.delay}s`,
            } as React.CSSProperties}
          >
            {balloon.emoji}
          </div>
        ))}
      </div>
    </>
  )
}
