'use client'

export function SectionDivider({ emoji = '✨' }: { emoji?: string }) {
  return (
    <div className="relative py-8 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
      <div className="relative flex items-center gap-3 px-6 bg-background">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="text-2xl animate-float">{emoji}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      </div>
    </div>
  )
}
