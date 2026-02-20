'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Maximize2 } from 'lucide-react'

interface ExpandableImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export function ExpandableImage({ src, alt, width, height }: ExpandableImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="View full diagram"
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'zoom-in',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        >
          <Maximize2 size={11} />
          expand
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: 12,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close diagram"
              style={{
                position: 'sticky',
                top: 8,
                float: 'right',
                marginRight: 8,
                zIndex: 1,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--fg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12 }}
            />
          </div>
        </div>
      )}
    </>
  )
}
