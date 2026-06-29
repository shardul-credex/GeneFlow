import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      padding: 0,
      overflow: 'hidden',
      background: '#f7f7f7',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Wave canvas background */}
      <WaveCanvas />

      {/* Bottom fade into white section */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: '18vh', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,1) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1920px', margin: '0 auto',
        width: '100%',
        padding: '0 clamp(1.5rem, 3.7vw, 4rem)',
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', alignItems: 'center',
        textAlign: 'center',
        paddingTop: 'calc(5.5rem + 6vh)',
        paddingBottom: '6rem',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            color: '#1DB954',
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(2.5rem, 3.72vw, 4rem)',
            lineHeight: 1.125,
            letterSpacing: '-0.02em',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            margin: 0,
          }}
        >
          <span>Engineering the logic layer of biology</span>
        </motion.h1>

        {/* Bouncing chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ marginTop: '2rem', color: '#888' }}
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 14, height: 14,
              borderRight: '1.5px solid #888',
              borderBottom: '1.5px solid #888',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// Letters that ride the wave — same RNA-base set as the three.js source.
const LETTERS = ['C', 'G', 'U', 'A']

function WaveCanvas() {
  const canvasRef = React.useRef(null)
  const rafRef = React.useRef(null)
  // Persisted per-point data so the letter assigned to each grid cell
  // never changes between frames.
  const gridRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const COLS = 90
    const ROWS = 30

    function buildGrid() {
      const letters = new Uint8Array(COLS * ROWS)
      for (let i = 0; i < letters.length; i++) {
        letters[i] = Math.floor(Math.random() * LETTERS.length)
      }
      gridRef.current = { letters }
    }
    buildGrid()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Depth range used purely as a phase coordinate for the wave
    // formula and for the row's vertical placement/size — it never
    // touches horizontal position, so every row keeps the full canvas
    // width instead of narrowing into a pyramid toward the horizon.
    const ZNEAR = 40
    const ZFAR = 560

    // Vertical-only perspective: near rows sit low/large, far rows sit
    // high/small, but x is never scaled by depth.
    const SCALE_NEAR = 0.85
    const SCALE_FAR = 0.12

    function draw(t, canvasW, canvasH) {
      ctx.clearRect(0, 0, canvasW, canvasH)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // horizonY = 0 so the farthest row sits right at the top of the
      // component instead of a fifth of the way down.
      const horizonY = 0
      const groundDrop = (canvasH - horizonY) / SCALE_NEAR
      const halfX = canvasW * 0.5
      const { letters } = gridRef.current
      const baseFontPx = Math.max(14, canvasW * 0.012)

      for (let r = 0; r < ROWS; r++) {
        const rowT = r / (ROWS - 1)
        const z = ZNEAR + rowT * (ZFAR - ZNEAR)
        const scale = SCALE_NEAR + rowT * (SCALE_FAR - SCALE_NEAR)
        const rowBaseY = horizonY + groundDrop * scale

        const fontPx = baseFontPx * scale
        if (fontPx < 0.75) continue
        ctx.font = `500 ${fontPx.toFixed(2)}px 'Rubik', system-ui, sans-serif`

        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1) - 0.5) * halfX * 2

          // One dominant swell that travels along depth (z) over time —
          // this is the visible "wave hit": a crest forms near the
          // horizon and rolls forward, growing as it nears the camera
          // (because near rows have a bigger `scale`), then washes out
          // at the bottom. A light secondary ripple adds texture, and a
          // static x-only term shapes the crest across the width
          // without sliding it sideways. Speed is set by the t
          // multipliers (1.6 / 3.2) — raise both to speed the roll up,
          // lower both to slow it down.
          const shapeX = Math.sin(x * 0.015) * 8
          const swell = Math.sin(z * 0.010 + t * 1.6) * 22
          const ripple = Math.sin(z * 0.03 + t * 3.2) * 6
          const wave = shapeX + swell + ripple

          // x is positioned directly in screen space — no depth scaling,
          // so the grid never converges into a point.
          const screenX = canvasW / 2 + x
          const screenY = rowBaseY - wave * scale

          const shimmer = Math.abs(swell) / 30
          const opacity = Math.min(0.65, 0.08 + scale * 0.55 + shimmer * 0.15)

          const letter = LETTERS[letters[r * COLS + c]]
          ctx.fillStyle = `rgba(40,40,40,${opacity.toFixed(3)})`
          ctx.fillText(letter, screenX, screenY)
        }
      }
    }

    let last = performance.now()
    let t = 0
    const animate = (now) => {
      const dt = Math.min(now - last, 50)
      last = now
      t += dt * 0.001
      draw(t, canvas.width, canvas.height)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}
