import { Package, Brain } from 'lucide-react'

export function GitAnalogy() {
  return (
    <section
      aria-label="The git analogy"
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--surface)',
      }}
    >
      <div className="container-content">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              The Core Idea
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: 'var(--fg)',
                marginBottom: '1rem',
              }}
            >
              The .git of agent memory.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Git revolutionized code versioning by using <strong style={{ color: 'var(--fg)' }}>content addressing</strong>: the SHA-1 hash of an object <em>is</em> its unique identifier. Any change produces a different hash — making tampering impossible to hide.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.75 }}>
              The <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--code-bg)', padding: '0.1em 0.35em', borderRadius: 4, fontSize: '0.875em', color: 'var(--accent)' }}>.mg</code> format applies this same principle to agent memory — every fact, observation, and decision record is an immutable, content-addressed grain with a 64-character SHA-256 identifier.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {[
              { label: '.git objects', sub: 'Code versioning', icon: <Package size={24} aria-hidden="true" />, items: ['Content-addressed', 'Immutable blobs', 'SHA-256 identity', 'Portable'] },
              { label: '.mg grains', sub: 'Agent memory', icon: <Brain size={24} aria-hidden="true" />, items: ['Content-addressed', 'Immutable records', 'SHA-256 identity', 'Portable'] },
            ].map(({ label, sub, icon, items }) => (
              <div
                key={label}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '1.25rem',
                }}
              >
                <div style={{ marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--fg)', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: 12 }}>{sub}</div>
                {items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--episode)', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--fg-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
