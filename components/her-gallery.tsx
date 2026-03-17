'use client'

import { useState, useCallback } from 'react'
import { herPhotos as herPhotosData } from '@/lib/photos-data'

const aspectPatterns = [
  'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]',
  'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]',
  'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]',
  'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]',
]

export function HerGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const herPhotos = herPhotosData

  const openLightbox = (idx: number) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)

  const goNext = useCallback(() => {
    if (lightboxIdx === null) return
    setLightboxIdx((lightboxIdx + 1) % herPhotos.length)
  }, [lightboxIdx, herPhotos.length])

  const goPrev = useCallback(() => {
    if (lightboxIdx === null) return
    setLightboxIdx((lightboxIdx - 1 + herPhotos.length) % herPhotos.length)
  }, [lightboxIdx, herPhotos.length])

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="her-gallery">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 lg:gap-6">
          {herPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-5 lg:mb-6 animate-slide-up"
              style={{ animationDelay: `${(idx % 3) * 0.12}s` }}
            >
              <div
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(219,112,147,0.3)]"
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openLightbox(idx)}
              >
                {/* Photo */}
                <div className={`relative w-full ${aspectPatterns[idx % aspectPatterns.length]} overflow-hidden`}>
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                      <span className="text-8xl opacity-30">📸</span>
                    </div>
                  )}

                  {/* Gradient overlay — always subtle, stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glowing border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/40 transition-all duration-500 pointer-events-none" />

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                  </div>

                  {/* Content on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-500 ${
                    hoveredId === photo.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <h3 className="text-white font-serif text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-primary rounded-full" />
                      <p className="text-white/80 text-sm font-medium">Tap to view</p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-50">
                    <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-24 animate-bounce-in">
          <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-sm border border-primary/20 shadow-xl">
            <p className="text-foreground font-serif text-2xl md:text-3xl mb-2">
              Every photo, a reason to smile
            </p>
            <p className="text-muted-foreground text-base mb-6">
              You make every frame beautiful just by being in it
            </p>
            <div className="flex justify-center gap-6 text-3xl">
              <span className="animate-float">💕</span>
              <span className="animate-float" style={{ animationDelay: '0.3s' }}>📸</span>
              <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
              <span className="animate-float" style={{ animationDelay: '0.9s' }}>🌟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', animation: 'overlay-fade-in 0.3s ease-out' }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ animation: 'scale-in 0.3s ease-out' }}>
              {herPhotos[lightboxIdx].imageUrl ? (
                <img
                  src={herPhotos[lightboxIdx].imageUrl}
                  alt={herPhotos[lightboxIdx].title}
                  className="w-full max-h-[80vh] object-contain bg-black/50"
                />
              ) : (
                <div className="w-full h-[60vh] bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <span className="text-9xl">📸</span>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-2xl md:text-3xl font-bold">
                  {herPhotos[lightboxIdx].title}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {lightboxIdx + 1} of {herPhotos.length}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 hidden md:flex"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 hidden md:flex"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-14 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Mobile swipe hint */}
            <div className="text-center text-white/50 mt-4 text-sm md:hidden">
              Tap outside to close
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
