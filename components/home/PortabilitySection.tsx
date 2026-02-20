import { ExpandableImage } from '@/components/ui/ExpandableImage'
import { Cloud, Zap, HardDrive, Archive } from 'lucide-react'

export function PortabilitySection() {
  return (
    <section
      aria-label="Portability"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
      }}
    >
      <div className="container-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Portability
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)', marginBottom: '1rem' }}>
              Your agent's memory belongs to you.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              A <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--code-bg)', padding: '0.1em 0.35em', borderRadius: 4, fontSize: '0.875em', color: 'var(--accent)' }}>.mg</code> container file is the portable unit of memory. One file holds thousands of grains, indexed for random access, with an integrity checksum.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Trident exports Raven's fleet memory as a single <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--code-bg)', padding: '0.1em 0.35em', borderRadius: 4, fontSize: '0.875em', color: 'var(--accent)' }}>raven-001-2026-02.mg</code> file. The team pushes it to Git, diffs two versions, and rolls back after a bad model update — in seconds.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: <Cloud size={20} aria-hidden="true" />, title: 'Cloud & On-Prem', detail: 'AWS S3, GCP, Azure Blob — same format everywhere' },
                { icon: <Zap size={20} aria-hidden="true" />, title: 'Streams & Caches', detail: 'Kafka topics, Redis streams, Pulsar — ingest at any throughput' },
                { icon: <HardDrive size={20} aria-hidden="true" />, title: 'Portable Drive', detail: 'USB or external drive — copy memory between air-gapped systems' },
                { icon: <Archive size={20} aria-hidden="true" />, title: 'Git Repository', detail: 'Version control · diff · rollback' },
              ].map(({ icon, title, detail }) => (
                <div
                  key={title}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '0.875rem',
                  }}
                >
                  <div style={{ marginBottom: 4, color: 'var(--fg-muted)' }}>{icon}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg)', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', lineHeight: 1.5 }}>{detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '1rem' }}>
              <ExpandableImage
                src="/mg-file-distribution.svg"
                alt="Diagram showing a .mg file being copied to a USB drive, pushed to Git, uploaded to cloud storage, and streamed into Kafka or Redis"
                width={800}
                height={600}
              />
            </div>
            <div
              aria-label="Git workflow example"
              style={{
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '0.875rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--fg-secondary)',
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: 'var(--fg-muted)', marginBottom: 4 }}># Version-control agent memory</div>
              <div><span style={{ color: 'var(--episode)' }}>$</span> mg export raven-001 {'>'} raven-001.mg</div>
              <div><span style={{ color: 'var(--episode)' }}>$</span> git add raven-001.mg && git commit -m &quot;v2.1 memory&quot;</div>
              <div><span style={{ color: 'var(--episode)' }}>$</span> git diff HEAD~1 HEAD raven-001.mg</div>
              <div style={{ color: 'var(--fg-muted)', marginTop: 4 }}># Roll back after bad model update</div>
              <div><span style={{ color: 'var(--episode)' }}>$</span> git checkout HEAD~1 raven-001.mg</div>
              <div><span style={{ color: 'var(--episode)' }}>$</span> mg import raven-001.mg</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
