'use client'

import { useState } from 'react'

interface Wish {
  id: number
  message: string
  author: string
  emoji: string
}

export function BirthdayWishes() {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      message: 'You handle my nonsense like a champ. That alone deserves a birthday.',
      author: 'Your Annoying Best Friend (Sumit)',
      emoji: '😈',
    },
    {
      id: 2,
      message: 'Here\'s to another year of fighting and then pretending nothing happened five minutes later.',
      author: 'Your Annoying Best Friend (Sumit)',
      emoji: '⚡',
    },
    {
      id: 3,
      message: 'I never say this enough, but having you back in my life is everything. Happy birthday.',
      author: 'Your Annoying Best Friend (Sumit)',
      emoji: '💕',
    },
    {
      id: 4,
      message: 'You make the world better just by being in it. Don\'t let that go to your head though.',
      author: 'Your Annoying Best Friend (Sumit)',
      emoji: '🌟',
    },
  ])

  const [newWish, setNewWish] = useState('')
  const [author, setAuthor] = useState('')

  const addWish = () => {
    if (newWish.trim() && author.trim()) {
      setWishes([
        ...wishes,
        {
          id: wishes.length + 1,
          message: newWish,
          author,
          emoji: '💝',
        },
      ])
      setNewWish('')
      setAuthor('')
    }
  }

  return (
    <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Birthday Love</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Birthday Wishes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Messages and wishes filled with love for your special day
          </p>
        </div>

        {/* Wishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {wishes.map((wish, idx) => (
            <div
              key={wish.id}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-card via-secondary/50 to-primary/10 backdrop-blur-lg border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Emoji */}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {wish.emoji}
                  </div>

                  {/* Message */}
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground mb-6 flex-grow italic">
                    "{wish.message}"
                  </p>

                  {/* Author */}
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                    {wish.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add wish form */}
        <div className="max-w-2xl mx-auto animate-bounce-in">
          <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-lg border-2 border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                Add Your Wish
              </h3>

              <div className="space-y-4">
                {/* Message input */}
                <textarea
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  placeholder="Write your birthday wish here..."
                  className="w-full p-4 rounded-2xl bg-card border-2 border-border/50 focus:border-primary/50 outline-none text-foreground placeholder-muted-foreground resize-none transition-all duration-300 focus:shadow-lg"
                  rows={3}
                />

                {/* Author input */}
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-4 rounded-2xl bg-card border-2 border-border/50 focus:border-primary/50 outline-none text-foreground placeholder-muted-foreground transition-all duration-300 focus:shadow-lg"
                />

                {/* Submit button */}
                <button
                  onClick={addWish}
                  disabled={!newWish.trim() || !author.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  Send Your Wish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Celebratory footer */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-muted-foreground text-lg mb-6">
            Your birthday is a celebration of how special you truly are
          </p>
          <div className="flex justify-center gap-6 text-4xl">
            <span className="animate-float">💌</span>
            <span className="animate-float" style={{ animationDelay: '0.3s' }}>💕</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎁</span>
          </div>
        </div>
      </div>
    </section>
  )
}
