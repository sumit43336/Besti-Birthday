'use client'

import { useEffect, useState, useRef } from 'react'

export function HeroSection() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([])
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
    }))
    setHearts(newHearts)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight) {
          setScrollY(window.scrollY * 0.5)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Birthday photo background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Blurred fill layer to cover edges */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(30px)', transform: 'scale(1.1)' }}
        />
        {/* Main image */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center calc(50% + 300px)', transform: 'scale(0.9)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-background/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-10"></div>
      </div>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden z-20">
        <div 
          className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-primary/8 blur-3xl animate-pulse-glow"
          style={{ transform: `translateY(${scrollY}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-pulse-glow"
          style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
        ></div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden z-20">
        {hearts.map((heart, idx) => (
          <div
            key={heart.id}
            className="absolute text-pink-300 opacity-20"
            style={{
              left: `${heart.left}%`,
              top: '-50px',
              animation: `float ${6 + idx % 3}s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${24 + (idx % 3) * 8}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-30 text-center px-4 md:px-8 animate-slide-up">
        {/* Profile circle */}
        <div className="mb-4 inline-flex items-center justify-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-16 h-16 md:w-24 md:h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-lg border-2 border-white/40 animate-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl md:text-5xl">🎂</span>
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 rounded-full" style={{ animation: 'spin 20s linear infinite' }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-x-1/2"></div>
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-accent/60 rounded-full -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Main text */}
        <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            Happy <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Birthday</span>
          </h1>
        </div>
        
        {/* Age celebration */}
        <div className="text-3xl md:text-4xl mb-6 animate-number-pop">
          🎂 <span className="font-serif font-bold text-4xl md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Shivangi</span> 🎉
        </div>
        
        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-4 leading-relaxed animate-bounce-in" style={{ animationDelay: '0.4s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          A special day dedicated to celebrating YOU and all the incredible moments we share together
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => {
              const element = document.getElementById('memories')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-primary/20"
          >
            Explore Memories
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('message')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
          >
            Read the Message
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Scroll to discover</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-float-slow z-20"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-3xl animate-float-slow z-20" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}
