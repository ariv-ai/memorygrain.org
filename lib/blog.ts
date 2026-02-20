import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export interface Post extends PostFrontmatter {
  content: string
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getAllPosts(): PostFrontmatter[] {
  return getAllSlugs()
    .map((slug) => getPostFrontmatter(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostFrontmatter(slug: string): PostFrontmatter {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data } = matter(raw)
  return { ...(data as Omit<PostFrontmatter, 'slug'>), slug }
}

export function getPost(slug: string): Post {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return { ...(data as Omit<PostFrontmatter, 'slug'>), slug, content }
}
