'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { videoMemories as videoData } from '@/lib/photos-data'

export function VideoMemories() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [videoMemories, setVideoMemories] = useState(videoData)

  return (
    <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Motion & Magic</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Videos in Motion
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Some memories are better captured in movement. Here are the moments that made us laugh and smile together.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {videoMemories.map((video, idx) => (
            <div
              key={video.id}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-3xl h-80 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Video background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-30`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent"></div>

                {/* Large emoji background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <span className="text-9xl animate-float">{video.emoji}</span>
                </div>

                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 transition-all duration-500 ${
                    hoveredId === video.id ? 'opacity-100' : 'opacity-60'
                  }`}
                ></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div
                    className={`w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-all duration-500 shadow-2xl ${
                      hoveredId === video.id ? 'scale-125 ring-4 ring-primary/50' : 'scale-100'
                    }`}
                  >
                    <Play className="w-10 h-10 text-primary-foreground fill-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Caption */}
                <div
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 z-10 transition-transform duration-500 ${
                    hoveredId === video.id ? 'translate-y-0' : 'translate-y-2'
                  }`}
                >
                  <h3 className="text-white font-serif text-2xl font-bold flex items-center gap-3">
                    <span className="text-2xl">{video.emoji}</span>
                    {video.caption}
                  </h3>
                </div>

                {/* Shimmer effect on hover */}
                {hoveredId === video.id && (
                  <div className="absolute inset-0 animate-shimmer z-10 pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-20 animate-bounce-in">
          <p className="text-muted-foreground text-lg mb-6">
            Each video is a chapter in our beautiful story together
          </p>
          <div className="flex justify-center gap-6 text-4xl">
            <span className="animate-float">🎬</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>💫</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🎞️</span>
          </div>
        </div>
      </div>
    </section>
  )
}
