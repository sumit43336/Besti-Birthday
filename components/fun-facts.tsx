'use client'

import { useState } from 'react'

const facts = [
  {
    id: 1,
    emoji: '🧠',
    title: 'She Remembers Everything',
    description: 'I forget what I said 5 minutes ago. She remembers what I said 5 years ago. Scary? Yes. Impressive? Also yes.',
    color: 'from-blue-300 to-purple-300',
  },
  {
    id: 2,
    emoji: '🎭',
    title: 'The Silent Treatment Pro',
    description: 'When she\'s mad, the silence is LOUD. But it never lasts long — we both crack eventually.',
    color: 'from-yellow-300 to-orange-300',
  },
  {
    id: 3,
    emoji: '🫣',
    title: 'She Knows My Secrets',
    description: 'She has enough information to ruin me. The fact that she hasn\'t is proof she\'s a real one.',
    color: 'from-green-300 to-emerald-300',
  },
  {
    id: 4,
    emoji: '🔮',
    title: 'She Just Gets It',
    description: 'I don\'t even have to explain sometimes. She reads the vibe and just knows. It\'s lowkey telepathy.',
    color: 'from-pink-300 to-rose-300',
  },
]

export function FunFacts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Little Things Matter</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Fun Facts About Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The small moments that make our friendship extraordinary and completely one of a kind
          </p>
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {facts.map((fact, idx) => (
            <div
              key={fact.id}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div
                onMouseEnter={() => setHoveredId(fact.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(selectedId === fact.id ? null : fact.id)}
                className="relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-500 group h-full hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Card background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fact.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary/50 backdrop-blur-lg border border-border/50 group-hover:border-primary/50 transition-all duration-500"></div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-white/10 group-hover:to-transparent transition-all duration-500 pointer-events-none`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Emoji */}
                  <div className={`text-5xl md:text-6xl mb-6 transform transition-transform duration-500 ${
                    hoveredId === fact.id ? 'scale-125 rotate-12 animate-bounce' : 'scale-100'
                  }`}>
                    {fact.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                    {fact.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-muted-foreground leading-relaxed flex-grow transition-all duration-500 ${
                    selectedId === fact.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}>
                    {fact.description}
                  </p>

                  {/* Hover indicator */}
                  {hoveredId === fact.id && (
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold animate-fade-in-scale">
                      <span>Expand</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Selection indicator */}
                {selectedId === fact.id && (
                  <div className="absolute inset-0 border-2 border-primary rounded-3xl animate-pulse pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom celebration */}
        <div className="text-center mt-20 animate-bounce-in">
          <p className="text-muted-foreground text-lg mb-6">
            These little things are what make our friendship absolutely priceless
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span className="animate-float">💎</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>🌟</span>
            <span className="animate-float" style={{ animationDelay: '0.8s' }}>💕</span>
          </div>
        </div>
      </div>
    </section>
  )
}
