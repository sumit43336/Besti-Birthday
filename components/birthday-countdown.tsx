'use client'

import { useState, useEffect } from 'react'

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isBirthdayToday, setIsBirthdayToday] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // Birthday: March 18
      const today = new Date()
      let birthdayThisYear = new Date(today.getFullYear(), 2, 18) // Month is 0-indexed
      
      // If birthday has already passed this year, count to next year
      if (today > birthdayThisYear) {
        birthdayThisYear = new Date(today.getFullYear() + 1, 2, 18)
      }

      // Check if today is her birthday
      if (today.getDate() === 18 && today.getMonth() === 2) {
        setIsBirthdayToday(true)
        return
      }

      const difference = birthdayThisYear.getTime() - today.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/40 flex items-center justify-center backdrop-blur-sm">
          <span className="font-serif text-4xl md:text-5xl font-bold text-primary animate-number-pop">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
    </div>
  )

  if (!mounted) {
    return (
      <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 h-40"></div>
        </div>
      </section>
    )
  }

  if (isBirthdayToday) {
    return (
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
        {/* Falling emojis rain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 40 }).map((_, i) => {
            const emojis = ['🎂', '🎈', '🎁', '🎉', '🎊', '💕', '✨', '🌟', '💫', '🥳', '🎀', '💝', '🧁', '🍰']
            return (
              <div
                key={`fall-${i}`}
                className="absolute"
                style={{
                  left: `${(i * 2.5) % 100}%`,
                  top: '-40px',
                  fontSize: `${18 + (i % 4) * 6}px`,
                  animation: `confetti-fall ${3 + (i % 4) * 1.5}s linear infinite`,
                  animationDelay: `${(i * 0.2) % 3}s`,
                  opacity: 0.8,
                }}
              >
                {emojis[i % emojis.length]}
              </div>
            )
          })}
        </div>

        {/* Glowing background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-400/10 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          {/* Top emoji row */}
          <div className="flex justify-center gap-3 text-4xl mb-6">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎈</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎊</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🥳</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎊</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎈</span>
          </div>

          {/* Main celebration text */}
          <div className="animate-bounce-in">
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-3">
              <span className="bg-gradient-to-r from-primary via-pink-400 to-accent bg-clip-text text-transparent">
                It&apos;s Her Day!
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground font-medium mb-2">
              Happy Birthday, Shivangi 🎂
            </p>
            <p className="text-muted-foreground text-base md:text-lg">
              The wait is over — today we celebrate YOU!
            </p>
          </div>

          {/* Bottom emoji row */}
          <div className="flex justify-center gap-4 text-3xl mt-6">
            <span className="animate-float">🎁</span>
            <span className="animate-float" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>🎂</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>💕</span>
            <span className="animate-float" style={{ animationDelay: '0.8s' }}>🎁</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Countdown</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Days Until the Big Day
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get ready to celebrate another year of amazing moments together
          </p>
        </div>

        {/* Countdown boxes */}
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-16 animate-bounce-in">
          <CountdownBox label="Days" value={timeLeft.days} />
          <CountdownBox label="Hours" value={timeLeft.hours} />
          <CountdownBox label="Minutes" value={timeLeft.minutes} />
          <CountdownBox label="Seconds" value={timeLeft.seconds} />
        </div>

        {/* Bottom message */}
        <div className="text-center animate-fade-in-up">
          <p className="text-muted-foreground text-lg mb-6">
            Every second brings us closer to celebrating YOU!
          </p>
          <div className="flex justify-center gap-4 text-4xl">
            <span className="animate-float">🎂</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>💕</span>
            <span className="animate-float" style={{ animationDelay: '0.8s' }}>✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
