interface PlaceholderImageProps {
  label: string
  aspectRatio?: string
  height?: number | string
}

export function PlaceholderImage({ label, aspectRatio = '16/9', height }: PlaceholderImageProps) {
  return (
    <figure
      role="img"
      aria-label={`Diagram placeholder: ${label}`}
      style={{
        aspectRatio: height ? undefined : aspectRatio,
        height: height,
        background: 'var(--surface)',
        border: '2px dashed var(--border)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '1.5rem',
        textAlign: 'center',
        margin: '1.5rem 0',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--elevated)',
          fontSize: '1.125rem',
        }}
        aria-hidden="true"
      >
        🎨
      </span>
      <figcaption
        style={{
          fontSize: '0.8125rem',
          color: 'var(--fg-muted)',
          fontFamily: 'var(--font-mono)',
          maxWidth: 400,
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontStyle: 'normal' }}>
          TODO: Designer
        </strong>
        <br />
        {label}
      </figcaption>
    </figure>
  )
}
