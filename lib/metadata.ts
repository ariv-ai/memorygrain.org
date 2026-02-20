import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://memorygrain.org'

export const siteMetadata = {
  name: 'Memory Grain',
  title: 'Memory Grain — Open Memory Specification for Autonomous Systems',
  description:
    'The Open Memory Specification (OMS) — an open standard for immutable, content-addressed agent memory. The Memory Grain (.mg) container is defined by OMS. ',
  url: SITE_URL,
  ogImage: `${SITE_URL}/og/default-og.png`,
}

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteMetadata.title,
      template: `%s | Memory Grain`,
    },
    description: siteMetadata.description,
    keywords: [
      'Open Memory Specification',
      'OMS',
      '.mg format',
      'memory grain',
      'agent memory',
      'autonomous systems',
      'content addressing',
      'cryptographic signing',
      'COSE Sign1',
      'MessagePack',
      'IoT memory',
      'robotics memory',
      'AI agent memory',
      'GDPR compliance',
      'HIPAA compliance',
      'open standard',
      'OMS reference implementation',
    ],
    authors: [{ name: 'Memory Grain community' }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: 'Memory Grain',
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: 'Memory Grain — Open Memory Specification' }],
    },
    alternates: {
      canonical: SITE_URL,
      types: {
        'application/rss+xml': `${SITE_URL}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...overrides,
  }
}
