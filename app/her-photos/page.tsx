'use client'

import Link from 'next/link'
import { HerGallery } from '@/components/her-gallery'
import { PageTransition } from '@/components/page-transition'
import { Confetti } from '@/components/confetti'

export default function HerPhotosPage() {
  return (
    <PageTransition>
      <Confetti />
      <main className="bg-background text-foreground pt-20">

        {/* Cinematic Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
          
          {/* Floating blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-400/10 blur-3xl animate-pulse-glow" />
          </div>

          {/* Floating mini photo previews */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { src: '/her-gallery/beautiful-smile.jpg', top: '10%', left: '5%', size: 80, delay: 0, rot: -12 },
              { src: '/her-gallery/golden-hour.jpg', top: '15%', right: '8%', size: 90, delay: 0.5, rot: 8 },
              { src: '/her-gallery/radiant.jpg', bottom: '20%', left: '8%', size: 70, delay: 1, rot: 15 },
              { src: '/her-gallery/sunshine.jpg', bottom: '15%', right: '5%', size: 85, delay: 1.5, rot: -8 },
              { src: '/her-gallery/pure-joy.jpg', top: '40%', left: '2%', size: 65, delay: 2, rot: 20 },
              { src: '/her-gallery/gorgeous.jpg', top: '35%', right: '3%', size: 75, delay: 0.8, rot: -15 },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl opacity-40 animate-float"
                style={{
                  top: p.top, left: p.left, right: (p as any).right, bottom: (p as any).bottom,
                  width: `${p.size}px`, height: `${p.size}px`,
                  transform: `rotate(${p.rot}deg)`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                <img src={p.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Hero content */}
          <div className="relative z-10 text-center px-4 md:px-8">
            <div className="animate-bounce-in">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative w-20 h-20 md:w-28 md:h-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-lg border-2 border-white/40 animate-glow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl">📸</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">A Gallery Dedicated to</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <span className="bg-gradient-to-r from-primary via-pink-400 to-accent bg-clip-text text-transparent">Her</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              Every frame here holds a piece of my heart. Scroll through and see why she means the world to me.
            </p>

            <div className="flex justify-center gap-4 text-3xl animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <span className="animate-float">💕</span>
              <span className="animate-float" style={{ animationDelay: '0.3s' }}>📸</span>
              <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-muted-foreground">Scroll to explore</span>
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <HerGallery />

        {/* Back to story section */}
        <section className="relative py-32 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
          </div>

          <div className="max-w-3xl mx-auto relative z-10 text-center">
            <div className="animate-slide-up">
              <div className="inline-block mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30 animate-pulse" />
                  <div className="relative px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest">There&apos;s More</span>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Back to Our Story?
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                The gallery is just one chapter. Go back and relive the memories, the timeline, and everything that makes us — us.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-primary/20 group"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                <span>Back to Our Story</span>
              </Link>

              <div className="mt-16 flex justify-center gap-6 text-4xl">
                <span className="animate-float">💕</span>
                <span className="animate-float" style={{ animationDelay: '0.3s' }}>🌟</span>
                <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
                <span className="animate-float" style={{ animationDelay: '0.9s' }}>💫</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
