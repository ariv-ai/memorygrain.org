import { Info, AlertTriangle, CheckCircle, Shield } from 'lucide-react'
import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'security'

const styles: Record<CalloutType, { bg: string; border: string; icon: ReactNode; label: string }> = {
  info: {
    bg: 'var(--accent-light)',
    border: 'var(--accent)',
    icon: <Info size={15} />,
    label: 'Note',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.08)',
    border: '#f59e0b',
    icon: <AlertTriangle size={15} />,
    label: 'Warning',
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.08)',
    border: '#10b981',
    icon: <CheckCircle size={15} />,
    label: 'Important',
  },
  security: {
    bg: 'rgba(139, 92, 246, 0.08)',
    border: '#8b5cf6',
    icon: <Shield size={15} />,
    label: 'Security',
  },
}

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = styles[type]
  return (
    <aside
      role="note"
      aria-label={title || s.label}
      style={{
        background: s.bg,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        fontSize: '0.9rem',
        color: 'var(--fg-secondary)',
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontWeight: 600,
          color: 'var(--fg)',
          marginBottom: title || true ? '0.375rem' : 0,
          fontSize: '0.875rem',
        }}
      >
        <span style={{ color: s.border, display: 'flex' }} aria-hidden="true">{s.icon}</span>
        {title || s.label}
      </div>
      {children}
    </aside>
  )
}
