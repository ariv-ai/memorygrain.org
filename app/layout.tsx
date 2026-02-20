import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/metadata'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = buildMetadata()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const gaId = process.env.NEXT_PUBLIC_GA_ID || ''

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Memory Grain Blog" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Memory Grain',
                url: 'https://memorygrain.org',
                description:
                  'The Open Memory Specification (OMS) — an open standard for immutable, content-addressed agent memory. The Memory Grain (.mg) container is defined by OMS.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Open Memory Specification',
                alternateName: 'OMS',
                url: 'https://memorygrain.org',
                logo: 'https://memorygrain.org/logo-icon-512.png',
                sameAs: [
                  'https://github.com/openmemoryspec',
                ],
              },
            ]),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Providers>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
