'use client'

import { useState, useEffect, useRef } from 'react'

export function MessageSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [typingComplete, setTypingComplete] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const fullMessage = "I know we fight all the time. I know I annoy you more than anyone probably should. But somehow, through all of that, you're still the person I want to talk to at the end of every day. You came back into my life through a random Instagram message, and honestly? That might be the best thing that ever happened to me."

  // Start typing only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startTyping) {
          setStartTyping(true)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [startTyping])

  useEffect(() => {
    if (!startTyping || typingComplete) return

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < fullMessage.length) {
          return fullMessage.slice(0, prev.length + 1)
        } else {
          setTypingComplete(true)
          return prev
        }
      })
    }, 30)

    return () => clearInterval(interval)
  }, [startTyping, typingComplete])

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden"
      id="message"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">From the Heart</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Words from My Heart
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            A message just for you, my best friend
          </p>
        </div>

        {/* Message card */}
        <div
          className="relative animate-bounce-in"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative corner elements */}
          <div className="absolute -top-10 -left-10 text-6xl opacity-20 animate-float">✨</div>
          <div className="absolute -bottom-10 -right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>✨</div>

          {/* Main card */}
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-secondary/30 to-primary/10 backdrop-blur-lg border-2 border-primary/30 shadow-2xl transition-all duration-500 ${
            isHovered ? 'shadow-2xl' : 'shadow-xl'
          } p-12 md:p-16 lg:p-20`}>
            
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Shimmer effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
            )}

            {/* Content */}
            <div className="relative z-10">
              {/* Opening element */}
              <div className="text-center mb-8">
                <span className={`text-6xl inline-block transition-transform duration-500 ${
                  isHovered ? 'scale-125 rotate-12' : 'scale-100'
                }`}>
                  💕
                </span>
              </div>

              {/* Message text with typing animation */}
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground mb-8 text-pretty min-h-32">
                {displayedText}
                {!typingComplete && <span className="typing-cursor"></span>}
              </p>

              {typingComplete && (
                <>
                  <p className="font-serif text-xl md:text-2xl leading-relaxed text-primary mb-8 fade-in-up">
                    This website is a small reminder that no matter how much I annoy you, no matter how many fights we have — you mean the world to me. And I'm not going anywhere.
                  </p>
                </>
              )}

              {/* Closing with emojis */}
              <div className="flex justify-center gap-4 mb-8 text-2xl">
                <span className="animate-float">💫</span>
                <span className="animate-float" style={{ animationDelay: '0.3s' }}>❤️</span>
                <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
              </div>

              {/* Signature */}
              <div className="text-center">
                <p className="font-serif text-lg text-muted-foreground italic">
                  — Your annoying best friend (Sumit)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-center gap-4 text-3xl">
            <span className="animate-float">💕</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
