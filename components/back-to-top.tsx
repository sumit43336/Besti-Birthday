'use client'

import { useState, useEffect } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-primary/20"
      style={{ animation: 'scale-in 0.3s ease-out' }}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
