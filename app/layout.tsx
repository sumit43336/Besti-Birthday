import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { FloatingPhotos } from '@/components/floating-photos'
import { BirthdayMusic } from '@/components/birthday-music'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'For My Best Friend ❤️',
  description: 'A beautiful place on the internet to celebrate our memories together',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ '--font-playfair': playfair.variable, '--font-inter': inter.variable } as React.CSSProperties}>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        <Navigation />
        <FloatingPhotos />
        <BirthdayMusic />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
