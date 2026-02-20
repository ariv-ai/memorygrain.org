const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const SITE_URL = 'https://memorygrain.org'
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog')
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'feed.xml')

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getAllPosts() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8')
      const { data } = matter(raw)
      return { ...data, slug }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateRss() {
  const posts = getAllPosts()
  const lastBuildDate = new Date().toUTCString()

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${(post.tags || []).map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Memory Grain Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Deep dives into the Open Memory Specification (.mg format) — COSE signing, header bytes, GDPR compliance, autonomous vehicles, IoT device profiles, and portability.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  fs.writeFileSync(OUTPUT_PATH, rss, 'utf-8')
  console.log(`RSS feed generated: ${OUTPUT_PATH} (${posts.length} posts)`)
}

generateRss()
