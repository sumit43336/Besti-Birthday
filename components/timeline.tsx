'use client'

import { useState, useEffect, useRef } from 'react'

const journeySteps = [
  {
    id: 1,
    emoji: '🏫',
    title: 'School Days',
    subtitle: 'Where it all began',
    description: 'Two kids in the same school, no idea that this random connection would end up meaning everything.',
    connector: '→',
    connectorEmoji: '💫',
  },
  {
    id: 2,
    emoji: '💔',
    title: 'After 10th — Lost You',
    subtitle: 'She left. No number. Nothing.',
    description: 'She switched schools and just like that, the connection broke. No phone number, no way to reach out. I thought that was it.',
    connector: '...',
    connectorEmoji: '😶',
  },
  {
    id: 3,
    emoji: '📲',
    title: '2021 — A Random DM',
    subtitle: 'The message that changed everything',
    description: 'Years later, right before college, a random Instagram message popped up. I was literally in tears, smiling, blushing — all at once. She came back.',
    connector: '!!',
    connectorEmoji: '🥹',
  },
  {
    id: 4,
    emoji: '⚡',
    title: 'The Ups & Downs',
    subtitle: 'Fights, drama, all of it',
    description: 'I know I get angry sometimes. I know I can be harsh. But that\'s never who I am by heart — I care more than I\'ll ever be able to say.',
    connector: '→',
    connectorEmoji: '🤝',
  },
  {
    id: 5,
    emoji: '♾️',
    title: 'Together. For Eternity.',
    subtitle: 'No matter what',
    description: 'Through every fight, every silence, every comeback — we\'re still here. And we always will be.',
    connector: '',
    connectorEmoji: '',
  },
]

export function Timeline() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const [scrollProgress, setScrollProgress] = useState(0)
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const flowchartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const id = parseInt(entry.target.getAttribute('data-step-id') || '0')
            if (entry.isIntersecting) next.add(id)
          })
          return next
        })
      },
      { threshold: 0.2 }
    )

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!flowchartRef.current) return
      const rect = flowchartRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalHeight = rect.height

      // Calculate how far we've scrolled through the flowchart
      const scrolled = windowHeight - rect.top
      const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Full section background image */}
      <div className="absolute inset-0">
        <img
          src="/how-we-got-here.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-pink-300 uppercase tracking-widest">Our Story</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            How We Got Here
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            It wasn&apos;t a straight line. It never is with the best ones.
          </p>
        </div>

        {/* Flowchart */}
        <div className="relative" ref={flowchartRef}>
          {/* Background line (track) */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-0.5 bg-white/10"></div>
          {/* Animated progress line */}
          <div
            className="absolute left-8 md:left-10 top-0 w-0.5 bg-gradient-to-b from-primary via-pink-400 to-accent shadow-[0_0_8px_rgba(219,112,147,0.6)] transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          >
            {/* Glowing dot at the tip */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(219,112,147,0.8)]"
            ></div>
          </div>

          <div className="space-y-2">
            {journeySteps.map((step, index) => (
              <div key={step.id}>
                {/* Step card */}
                <div
                  ref={(el) => { if (el) itemRefs.current[step.id] = el }}
                  data-step-id={step.id}
                  className={`relative pl-20 md:pl-24 transition-all duration-700 ${
                    visibleIds.has(step.id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Node circle */}
                  <div className="absolute left-4 md:left-5 top-6 z-20">
                    <div
                      className={`w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transition-all duration-500 shadow-lg ${
                        activeId === step.id
                          ? 'bg-primary scale-125 ring-4 ring-primary/30'
                          : 'bg-gradient-to-br from-primary/80 to-accent/80'
                      }`}
                    >
                      {step.emoji}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-card/95 backdrop-blur-md border border-border p-6 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/40"
                    onClick={() => setActiveId(activeId === step.id ? null : step.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-primary font-semibold mb-3">
                        {step.subtitle}
                      </p>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeId === step.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
                          {step.description}
                        </p>
                      </div>

                      {/* Tap hint */}
                      <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mt-2">
                        <span>{activeId === step.id ? 'Tap to close' : 'Tap to read'}</span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${activeId === step.id ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector between steps */}
                {step.connector && (
                  <div
                    className={`relative pl-20 md:pl-24 py-3 transition-all duration-700 ${
                      visibleIds.has(step.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-lg">{step.connectorEmoji}</span>
                      <span className="text-xs uppercase tracking-widest font-bold text-white/70">
                        {step.connector === '→' ? 'then' : step.connector === '...' ? 'years pass' : 'and then'}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-16 animate-bounce-in">
          <p className="text-white/80 text-lg mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            The story&apos;s still being written...
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span className="animate-float">💕</span>
            <span className="animate-float" style={{ animationDelay: '0.3s' }}>♾️</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
