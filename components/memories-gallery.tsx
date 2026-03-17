'use client'

import { useState, useEffect, useRef } from 'react'

const stats = [
  { id: 1, end: 1, suffix: '', label: 'Instagram DM that brought you back', emoji: '📲', color: 'from-blue-400 to-purple-500' },
  { id: 2, end: 0, suffix: '∞', label: 'Fights survived — and we\'re still here', emoji: '⚡', color: 'from-yellow-400 to-orange-500' },
  { id: 3, end: 1, suffix: '', label: 'School where it all started', emoji: '🏫', color: 'from-green-400 to-emerald-500' },
  { id: 4, end: 0, suffix: '?', label: 'Years apart with no number, no contact', emoji: '💔', color: 'from-red-400 to-rose-500' },
  { id: 5, end: 2021, suffix: '', label: 'The year everything changed — you came back', emoji: '🥹', color: 'from-pink-400 to-rose-500' },
  { id: 6, end: 8, suffix: '+', label: 'Years of knowing each other', emoji: '📅', color: 'from-amber-400 to-yellow-500' },
  { id: 7, end: 1, suffix: '', label: 'Best friend I\'m never letting go of', emoji: '💕', color: 'from-pink-500 to-primary' },
  { id: 8, end: 24, suffix: '/7', label: 'How often I annoy you (sorry not sorry)', emoji: '😈', color: 'from-purple-400 to-pink-500' },
]

function AnimatedCounter({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    if (suffix === '∞') {
      hasAnimated.current = true
      return
    }
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [isVisible, end, suffix])

  if (suffix === '∞') {
    return (
      <span className={`font-serif text-5xl md:text-7xl font-bold transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        ∞
      </span>
    )
  }

  if (suffix === '?') {
    return (
      <span className={`font-serif text-5xl md:text-7xl font-bold transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        ?
      </span>
    )
  }

  return (
    <span className="font-serif text-5xl md:text-7xl font-bold tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function MemoriesGallery() {
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const id = parseInt(entry.target.getAttribute('data-stat-id') || '0')
            if (entry.isIntersecting) next.add(id)
          })
          return next
        })
      },
      { threshold: 0.3 }
    )

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden" id="memories">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">By the Numbers</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            What You Mean to Me
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Some things can&apos;t be measured. But here&apos;s my best attempt anyway.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              ref={(el) => { if (el) itemRefs.current[stat.id] = el }}
              data-stat-id={stat.id}
              className={`transition-all duration-700 ${
                visibleIds.has(stat.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="group relative overflow-hidden rounded-3xl p-8 h-full cursor-default transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                {/* Card bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary/50 backdrop-blur-lg border border-border/50 group-hover:border-primary/40 transition-all duration-500 rounded-3xl" />

                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-3xl`} />
                </div>

                <div className="relative z-10 text-center">
                  {/* Emoji */}
                  <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                    {stat.emoji}
                  </div>

                  {/* Number */}
                  <div className="text-gradient mb-3">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} isVisible={visibleIds.has(stat.id)} />
                  </div>

                  {/* Label */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="text-center mt-20 animate-bounce-in">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
            <p className="text-foreground font-serif text-xl md:text-2xl mb-2">
              The real number? Uncountable.
            </p>
            <p className="text-muted-foreground text-base">
              Because what we have can&apos;t fit in any stat.
            </p>
            <div className="flex justify-center gap-4 text-3xl mt-4">
              <span className="animate-float">💕</span>
              <span className="animate-float" style={{ animationDelay: '0.3s' }}>♾️</span>
              <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
