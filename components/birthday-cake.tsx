'use client'

import { useState, useRef, useEffect } from 'react'

const dropRainPhotos = Array.from({ length: 57 }, (_, i) => `/drop-rain/photo-${i + 1}.jpg`)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = 'idle' | 'burst' | 'rain' | 'spiral' | 'done'

export function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []
  }

  const addTimer = (fn: () => void, ms: number) => {
    timerRef.current.push(setTimeout(fn, ms))
  }

  useEffect(() => () => clearTimers(), [])

  const handleBlowCandles = () => {
    clearTimers()
    setCandlesBlown(true)
    setAnimKey((k) => k + 1)

    setPhase('burst')
    addTimer(() => setPhase('rain'), 2200)
    addTimer(() => setPhase('spiral'), 8000)
    addTimer(() => setPhase('done'), 17000)
    addTimer(() => {
      setPhase('idle')
      setCandlesBlown(false)
    }, 20000)
  }

  const showOverlay = phase !== 'idle'

  return (
    <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">

      {showOverlay && (
        <div key={animKey} className="fixed inset-0 z-50 overflow-hidden" style={{ pointerEvents: 'none' }}>
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'overlay-fade-in 0.4s ease-out forwards' }} />

          {/* Sparkles */}
          <Sparkles />
          <FloatingEmojis />

          {phase === 'burst' && <BurstPhase />}
          {phase === 'rain' && <RainPhase />}
          {phase === 'spiral' && <SpiralPhase />}
          {phase === 'done' && <DonePhase />}
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Make a Wish</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">Birthday Cake</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Blow out the candles and see something special</p>
        </div>

        <div className="flex flex-col items-center animate-bounce-in">
          <div className="relative mb-12">
            <div className="relative w-64 h-48 md:w-80 md:h-56">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 md:w-64 md:h-32 bg-gradient-to-br from-orange-300 via-pink-300 to-orange-400 rounded-t-3xl shadow-2xl border-4 border-orange-200/50" />
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-56 h-24 md:w-72 md:h-32 bg-gradient-to-br from-orange-400 via-pink-400 to-orange-500 rounded-2xl shadow-xl border-4 border-orange-300/50" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 md:w-80 md:h-32 bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 rounded-b-3xl shadow-lg border-4 border-orange-400/50" />
              {!candlesBlown && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="relative">
                      <div className="w-2 md:w-3 h-8 md:h-12 bg-yellow-100 rounded-full border border-yellow-200" />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-6 md:w-4 md:h-8 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-full animate-candle-flicker" style={{ boxShadow: '0 0 10px rgba(255, 200, 0, 0.8)' }} />
                    </div>
                  ))}
                </div>
              )}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-12 h-12 bg-white/10 rounded-full blur-xl" />
                <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl">🎂</span>
            </div>
          </div>

          <button
            onClick={phase === 'idle' ? handleBlowCandles : undefined}
            disabled={phase !== 'idle'}
            className="px-12 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 mb-8 animate-bounce disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {candlesBlown ? '✨ Magic in progress...' : '🌬️ Blow Out Candles'}
          </button>

          {candlesBlown && (
            <div className="text-center animate-slide-up">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <p className="font-serif text-2xl text-primary font-bold mb-4">Wish Granted!</p>
              <p className="text-muted-foreground text-lg">Here&apos;s to another year of happiness and adventures together</p>
            </div>
          )}

          <div className="mt-16 flex justify-center gap-8 text-5xl">
            <span className="animate-float">🎈</span>
            <span className="animate-float" style={{ animationDelay: '0.3s' }}>🎊</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎈</span>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ========== SUB-COMPONENTS ========== */

function Sparkles() {
  const items = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      dur: 1.5 + Math.random() * 2,
      size: 14 + Math.random() * 18,
      emoji: ['✨', '💫', '⭐', '🌟'][i % 4],
    }))
  ).current

  return (
    <>
      {items.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animation: `sparkle-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          {s.emoji}
        </div>
      ))}
    </>
  )
}

function BurstPhase() {
  const photos = useRef(
    shuffle(dropRainPhotos).slice(0, 24).map((src, i) => {
      const angle = (i / 24) * 360
      const rad = (angle * Math.PI) / 180
      const dist = 35 + Math.random() * 30
      return {
        id: i,
        src,
        tx: Math.cos(rad) * dist,
        ty: Math.sin(rad) * dist,
        size: 85 + Math.random() * 50,
        delay: i * 0.05,
        rot: -20 + Math.random() * 40,
      }
    })
  ).current

  return (
    <>
      {photos.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '16px',
            overflow: 'hidden',
            border: '3px solid rgba(255,255,255,0.9)',
            boxShadow: '0 0 20px rgba(219,112,147,0.6), 0 8px 32px rgba(0,0,0,0.3)',
            animation: `photo-burst 2s cubic-bezier(0.25,0.46,0.45,0.94) ${p.delay}s forwards`,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)',
            ['--tx' as string]: `${p.tx}vw`,
            ['--ty' as string]: `${p.ty}vh`,
          }}
        >
          <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </>
  )
}

function RainPhase() {
  const photos = useRef(
    shuffle(dropRainPhotos).map((src, i) => {
      const colors = [
        { border: 'rgba(219,112,147,0.8)', shadow: '0 0 18px rgba(219,112,147,0.6)' },
        { border: 'rgba(255,215,0,0.8)', shadow: '0 0 18px rgba(255,215,0,0.5)' },
        { border: 'rgba(255,255,255,0.9)', shadow: '0 0 18px rgba(255,255,255,0.5)' },
        { border: 'rgba(147,112,219,0.8)', shadow: '0 0 18px rgba(147,112,219,0.5)' },
      ]
      const c = colors[i % colors.length]
      return {
        id: i,
        src,
        left: 2 + Math.random() * 90,
        size: 65 + Math.random() * 55,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2.5,
        rotation: -25 + Math.random() * 50,
        sway: -60 + Math.random() * 120,
        ...c,
      }
    })
  ).current

  return (
    <>
      {photos.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-140px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '14px',
            overflow: 'hidden',
            border: `3px solid ${p.border}`,
            boxShadow: `${p.shadow}, 0 8px 32px rgba(0,0,0,0.3)`,
            animation: `photo-rain-sway ${p.duration}s ease-in-out ${p.delay}s forwards`,
            opacity: 0,
            ['--sway' as string]: `${p.sway}px`,
            ['--rot' as string]: `${p.rotation}deg`,
          }}
        >
          <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </>
  )
}

function SpiralPhase() {
  const photos = useRef(
    shuffle(dropRainPhotos).slice(0, 18).map((src, i) => {
      const t = (i / 18) * 2 * Math.PI
      const hx = 16 * Math.pow(Math.sin(t), 3)
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      return { id: i, src, hx: hx * 1.2, hy: hy * 1.2, delay: i * 0.25 }
    })
  ).current

  const [showHeart, setShowHeart] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowHeart(true), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {photos.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: '78px',
            height: '78px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255,182,193,0.9)',
            boxShadow: '0 0 15px rgba(219,112,147,0.6), 0 4px 20px rgba(0,0,0,0.3)',
            animation: `photo-spiral-in 4s cubic-bezier(0.34,1.56,0.64,1) ${p.delay}s forwards`,
            opacity: 0,
            ['--end-x' as string]: `${p.hx}vmin`,
            ['--end-y' as string]: `${p.hy}vmin`,
          }}
        >
          <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
      {showHeart && (
        <div style={{ fontSize: '80px', animation: 'heart-pop 0.8s cubic-bezier(0.68,-0.55,0.265,1.55) forwards' }}>
          💕
        </div>
      )}
    </div>
  )
}

function DonePhase() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', animation: 'final-text-reveal 1.5s ease-out forwards' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h3
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '12px',
            textShadow: '0 2px 20px rgba(219,112,147,0.8)',
          }}
        >
          Happy Birthday Shivangi!
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          You are loved more than you know 💕
        </p>
      </div>
    </div>
  )
}


function FloatingEmojis() {
  const emojis = useRef(
    (() => {
      const pool = ['🎂', '🎈', '🎁', '🎉', '🎊', '💕', '✨', '🌟', '💫', '🥳', '🎀', '💝', '🧁', '🍰', '❤️', '💖', '🎶', '🦋']
      return Array.from({ length: 35 }, (_, i) => ({
        id: i,
        emoji: pool[i % pool.length],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 4,
        size: 20 + Math.random() * 24,
        sway: -30 + Math.random() * 60,
      }))
    })()
  ).current

  return (
    <>
      {emojis.map((e) => (
        <div
          key={e.id}
          style={{
            position: 'absolute',
            left: `${e.left}%`,
            top: '0px',
            fontSize: `${e.size}px`,
            animation: `emoji-drop ${e.duration}s ease-in ${e.delay}s both`,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 60,
            ['--emoji-sway' as string]: `${e.sway}px`,
          }}
        >
          {e.emoji}
        </div>
      ))}
    </>
  )
}
