import { getAllPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
import { GitAnalogy } from '@/components/home/GitAnalogy'
import { UseCases } from '@/components/home/UseCases'
import { MemoryTypes } from '@/components/home/MemoryTypes'
import { GrainShowcase } from '@/components/home/GrainShowcase'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PortabilitySection } from '@/components/home/PortabilitySection'
import { ConformanceLevels } from '@/components/home/ConformanceLevels'
import { BlogPreview } from '@/components/home/BlogPreview'
import { HomeCTA } from '@/components/home/HomeCTA'

export const metadata = buildMetadata()

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)
  return (
    <>
      <Hero />
      <GitAnalogy />
      <UseCases />
      <HowItWorks />
      <MemoryTypes />
      <GrainShowcase />
      <PortabilitySection />
      <ConformanceLevels />
      <BlogPreview posts={posts} />
      <HomeCTA />
    </>
  )
}
