import { Database, ScrollText, Bookmark, GitBranch, Wrench, Activity, Target, type LucideIcon } from 'lucide-react'

const types: { key: string; label: string; color: string; icon: LucideIcon; description: string; example: string; byte: string }[] = [
  { key: 'fact', label: 'Fact', color: 'var(--fact)', icon: Database, description: 'Structured knowledge claims modeled as semantic triples: subject–relation–object. The core of any knowledge graph.', example: '{ "subject": "customer-4821", "relation": "has_plan", "object": "enterprise-tier" }', byte: '0x01' },
  { key: 'episode', label: 'Episode', color: 'var(--episode)', icon: ScrollText, description: 'Raw, unstructured interaction records — the raw material that consolidation engines process into structured Facts.', example: '{ "content": "Customer asked about upgrading their plan and adding 5 seats..." }', byte: '0x02' },
  { key: 'checkpoint', label: 'Checkpoint', color: 'var(--checkpoint)', icon: Bookmark, description: 'Agent state snapshots for save/restore. Enables forensic debugging — load a checkpoint to replay any decision exactly.', example: '{ "context": { "case": "claim-7291", "step": 4, "status": "review" } }', byte: '0x03' },
  { key: 'workflow', label: 'Workflow', color: 'var(--workflow)', icon: GitBranch, description: 'Procedural memory — learned sequences of actions. Triggered by a condition, a workflow encodes repeatable procedures.', example: '{ "trigger": "claim_amount > $10k", "steps": ["flag", "escalate", "notify_manager"] }', byte: '0x04' },
  { key: 'toolcall', label: 'ToolCall', color: 'var(--toolcall)', icon: Wrench, description: 'Complete record of a tool or function invocation: arguments, result, duration, success status. Full tool audit trail.', example: '{ "tool_name": "lookup_policy", "args": { "id": "POL-4821" }, "ok": true }', byte: '0x05' },
  { key: 'observation', label: 'Observation', color: 'var(--observation)', icon: Activity, description: 'Runtime signals from AI agents, monitoring systems, or human reviewers. Captures sentiment shifts, anomalies, and real-time assessments.', example: '{ "observer_id": "support-agent", "observer_type": "agent", "signal": "negative_sentiment" }', byte: '0x06' },
  { key: 'goal', label: 'Goal', color: 'var(--goal)', icon: Target, description: 'Explicit objectives set by humans or inferred by agents. Lifecycle-aware — active → satisfied | failed | suspended. State transitions are immutable; each update supersedes via provenance chain.', example: '{ "description": "Resolve claim within SLA (48h)", "goal_state": "active", "priority": 1 }', byte: '0x07' },
]

export function MemoryTypes() {
  return (
    <section aria-label="Seven memory types" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Memory Types
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)', marginBottom: '0.875rem' }}>
            Seven grains for every kind of knowledge
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            Each type has a required schema, a single-byte type identifier, and optional fields for compliance, provenance, and multi-modal content references.
          </p>
        </div>

        <div className="memory-types-grid" style={{ display: 'grid', gap: 16 }}>
          {types.map(({ key, label, icon: Icon, description, example, byte }) => (
            <article
              key={key}
              aria-label={`${label} memory type`}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div style={{ height: 4, background: 'var(--accent)' }} aria-hidden="true" />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon size={16} aria-hidden="true" style={{ color: 'var(--fg)', flexShrink: 0 }} strokeWidth={2.5} />
                    <h3 style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '1rem' }}>{label}</h3>
                  </div>
                  <code style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', background: 'var(--elevated)', padding: '0.15em 0.45em', borderRadius: 4 }}>{byte}</code>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '0.875rem' }}>{description}</p>
                <pre
                  aria-label={`${label} grain example`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.625rem 0.75rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--fg-secondary)',
                    overflow: 'auto',
                    margin: 0,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >{example}</pre>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
