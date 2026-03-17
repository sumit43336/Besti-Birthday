'use client'

import { useEffect, useState } from 'react'

export function ClosingSection() {
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([])
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; delay: number; duration: number }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 2,
    }))
    setFloatingHearts(hearts)

    // Generate particles
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 50,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
    setParticles(particleArray)
  }, [])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-secondary/10 px-4">
        <div></div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-secondary/10 px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="absolute rounded-full bg-primary/20 backdrop-blur-sm"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animation: `particle-float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              '--tx': `${(Math.random() - 0.5) * 100}px`,
              '--ty': `${(Math.random() - 0.5) * 100}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-300 text-3xl md:text-5xl opacity-30 animate-float-slow"
            style={{
              left: `${heart.left}%`,
              bottom: '-100px',
              animation: `float ${heart.duration}s linear infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl animate-slide-up">
        {/* Decorative element */}
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">The End, But Not Really</span>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <div className="mb-12">
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance leading-tight animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            Thank You
          </h2>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary font-light mb-8 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            For being the best friend anyone could ever dream of
          </p>
        </div>

        {/* Heartfelt message */}
        <div className="mb-16 space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-bounce-in" style={{ animationDelay: '0.3s' }}>
          <p>
            In a world full of people, I'm endlessly grateful you chose to walk this journey with me.
          </p>
          <p>
            Every laugh, every adventure, every quiet moment we've shared has meant more to me than words could ever express.
          </p>
          <p className="text-primary font-medium text-2xl">
            Here's to forever, my best friend. 💕
          </p>
        </div>

        {/* Celebratory emojis */}
        <div className="flex justify-center gap-6 text-4xl mb-16 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
          <span className="animate-float">💕</span>
          <span className="animate-float" style={{ animationDelay: '0.3s' }}>✨</span>
          <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎉</span>
          <span className="animate-float" style={{ animationDelay: '0.9s' }}>💫</span>
          <span className="animate-float" style={{ animationDelay: '1.2s' }}>💎</span>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-primary/20"
          >
            Explore from the Beginning
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('memories')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Revisit Our Memories
          </button>
        </div>

        {/* Bottom message */}
        <div className="mt-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground italic">
            Created with love by Sumit, for someone incredibly special
          </p>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-float-slow"></div>
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}
