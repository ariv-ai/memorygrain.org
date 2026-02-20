import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all bots including AI crawlers
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'GoogleBot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Googlebot-News', allow: '/' },
    ],
    sitemap: 'https://memorygrain.org/sitemap.xml',
    host: 'https://memorygrain.org',
  }
}
