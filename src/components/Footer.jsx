import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      background: '#1DB954',
      color: '#fff',
      padding: '2rem 0 1rem',
      position: 'relative',
      zIndex: 20,
    }}>
      <div style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 clamp(1.5rem, 3.7vw, 4rem)' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          paddingBottom: '1.25rem',
          alignItems: 'center',
        }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <GeneFlowLogoWhite />
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', textAlign: 'right' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{
              color: '#fff', textDecoration: 'none', opacity: 0.9,
              fontFamily: "'Rubik', sans-serif", fontSize: '0.95rem',
            }}>
              Get in touch
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Rubik', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.95)' }}>
              © 2026 GeneFlow. All rights reserved.
            </span>
            <a href="#" onClick={(e) => e.preventDefault()} style={{
              fontSize: '0.7rem', opacity: 0.7, color: '#fff',
              textDecoration: 'none', letterSpacing: '0.04em',
              fontFamily: "'Rubik', sans-serif",
            }}>Legal</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{
              fontSize: '0.7rem', opacity: 0.7, color: '#fff',
              textDecoration: 'none', letterSpacing: '0.04em',
              fontFamily: "'Rubik', sans-serif",
            }}>Gender Equality Plan</a>
          </div>

          <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, color: '#fff', textDecoration: 'none',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

function GeneFlowLogoWhite() {
  return (
    <span
      style={{
        fontFamily: "'Rubik', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: '1.6rem',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        color: '#fff',
      }}
    >
      GeneFlow
    </span>
  )
}
