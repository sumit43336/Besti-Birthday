import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { BirthdayCountdown } from '@/components/birthday-countdown'
import { MemoriesGallery } from '@/components/memories-gallery'
import { BirthdayCake } from '@/components/birthday-cake'
import { Timeline } from '@/components/timeline'
import { MessageSection } from '@/components/message-section'
import { BirthdayWishes } from '@/components/birthday-wishes'
import { FunFacts } from '@/components/fun-facts'
import { ClosingSection } from '@/components/closing-section'
import { PageTransition } from '@/components/page-transition'
import { Confetti } from '@/components/confetti'
import { BirthdaySound } from '@/components/birthday-sound'
import { SectionDivider } from '@/components/section-divider'
import { BackToTop } from '@/components/back-to-top'

export const metadata = {
  title: 'Happy Birthday!',
  description: 'A beautiful birthday celebration for my best friend - filled with memories, wishes, and love',
}

export default function Home() {
  return (
    <PageTransition>
      <Confetti />
      <BirthdaySound />
      <main className="bg-background text-foreground pt-20">
        <HeroSection />
        <SectionDivider emoji="🎂" />
        <BirthdayCountdown />
        <SectionDivider emoji="💫" />
        <Timeline />
        <SectionDivider emoji="🌬️" />
        <BirthdayCake />
        <SectionDivider emoji="💌" />
        <MessageSection />
        <SectionDivider emoji="💎" />
        <MemoriesGallery />
        <SectionDivider emoji="🧠" />
        <FunFacts />
        <SectionDivider emoji="💕" />
        <BirthdayWishes />
        <BackToTop />
        
        {/* Navigation to Her Gallery */}
        <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center animate-slide-up">
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Next Section</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Ready for More?
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                Explore a dedicated gallery filled with beautiful moments of her. Swipe, scroll, and celebrate every precious photo.
              </p>

              <Link
                href="/her-photos"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-primary/20 group"
              >
                <span>View Her Gallery</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <div className="mt-16 flex justify-center gap-6 text-4xl">
                <span className="animate-float">📸</span>
                <span className="animate-float" style={{ animationDelay: '0.3s' }}>💫</span>
                <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>

        <ClosingSection />
      </main>
    </PageTransition>
  )
}
