import React from 'react'

export default function Navbar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 50,
      height: '5.5rem',
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(1.5rem, 3.7vw, 4rem)',
    }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <GeneFlowLogo />
        </a>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2.5vw, 2.5rem)', color: '#1DB954' }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{
            color: '#1DB954', textDecoration: 'none',
            fontSize: 'clamp(0.875rem, 1.05vw, 1rem)',
            fontWeight: 400, opacity: 0.85,
            fontFamily: "'Rubik', sans-serif",
          }}>
            News
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} style={{
            color: '#1DB954', textDecoration: 'none',
            fontSize: 'clamp(0.875rem, 1.05vw, 1rem)',
            fontWeight: 400, opacity: 0.85,
            fontFamily: "'Rubik', sans-serif",
          }}>
            Contact
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-label="LinkedIn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34,
              border: '1px solid #1DB954',
              color: '#1DB954',
              textDecoration: 'none',
            }}
          >
            <LinkedInIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  )
}

function GeneFlowLogo() {
  return (
    <span
      style={{
        fontFamily: "'Rubik', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: '1.6rem',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: '#1461B6' }}>G</span>
      <span style={{ color: '#1DB954' }}>eneFlow</span>
    </span>
  )
}
