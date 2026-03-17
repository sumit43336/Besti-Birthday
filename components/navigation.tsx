'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'
  const isHerPhotos = pathname === '/her-photos'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo / Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-2xl font-bold text-primary hover:text-accent transition-colors"
        >
          <span className="text-3xl">💕</span>
          <span className="hidden sm:inline">Our Story</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium transition-all duration-300 px-4 py-2 rounded-full ${
              isHome
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Our Memories
          </Link>

          <Link
            href="/her-photos"
            className={`font-medium transition-all duration-300 px-4 py-2 rounded-full ${
              isHerPhotos
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Her Gallery
          </Link>
        </div>

        {/* Decorative element */}
        <div className="hidden lg:flex items-center gap-2 text-lg">
          <span className="animate-float">💫</span>
        </div>
      </div>
    </nav>
  )
}
