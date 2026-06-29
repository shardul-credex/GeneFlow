import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const NUCLEOTIDES = ['A', 'U', 'G', 'C']
const ROWS = 8
const COLS = 44

function seededRand(seed) {
  let s = seed >>> 0
  return function () {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

function generateGrid(cols, rows) {
  const rand = seededRand(77)
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => NUCLEOTIDES[Math.floor(rand() * 4)])
  )
}

const GRID = generateGrid(COLS, ROWS)

export default function ContentSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .ada-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(0.5rem, 3vw, 1.5rem) !important;
          }
          .ada-heading {
            font-size: clamp(4rem, 20vw, 6rem) !important;
            padding: 4px 8px 0px !important;
          }
          .ada-para {
            font-size: clamp(1rem, 4.5vw, 1.25rem) !important;
            padding: 12px 16px !important;
          }
          .ada-col-left {
            padding: 1rem clamp(0.5rem, 3vw, 1.5rem) 0 !important;
          }
          .ada-col-right {
            padding: 0 clamp(0.5rem, 3vw, 1.5rem) 2rem !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          background: '#fff',
          overflow: 'hidden',
          paddingTop: '2rem',
          paddingBottom: '0',
          minHeight: '60vh',
        }}
      >
        {/* Gradient fade top */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0, right: 0, top: 0,
            height: '10vh',
            zIndex: 3,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* RNA Selex Grid — full section background */}
        <SelexGrid />

        {/* Foreground content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1920px', margin: '0 auto', padding: '0 clamp(1rem, 3.7vw, 4rem)' }}>
          <div style={{ maxWidth: '83.3%', margin: '0 auto' }}>

            {/* Two col (desktop) / stacked (mobile): ADA + paragraph */}
            <div
              className="ada-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(2rem, 4vw, 5rem)',
                alignItems: 'center',
              }}
            >
              {/* ADA */}
              <div
                className="ada-col-left"
                style={{ padding: '1rem clamp(1rem, 3.5vw, 3.5rem) 3rem' }}
              >
                <motion.h2
                  className="ada-heading"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  style={{
                    color: '#1DB954',
                    background: '#fff',
                    display: 'inline-block',
                    padding: '8px 12px 0px',
                    whiteSpace: 'nowrap',
                    fontFamily: "'Rubik', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(5rem, 9vw, 9rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  ADA
                </motion.h2>
              </div>

              {/* Paragraph */}
              <div
                className="ada-col-right"
                style={{ display: 'flex', alignItems: 'center', padding: '1rem 16px 3rem' }}
              >
                <motion.p
                  className="ada-para"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    whiteSpace: 'pre-line',
                    color: '#1DB954',
                    background: '#fff',
                    padding: '16px 24px',
                    display: 'block',
                    maxWidth: '72ch',
                    width: '100%',
                    fontFamily: "'Rubik', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(1.125rem, 1.4vw, 1.5rem)',
                    lineHeight: 1.55,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  We're building a technology stack that programs RNA molecules, unlocking a new layer of biology where RNA is a controllable interface for cell behavior.
                </motion.p>
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: '64px' }} />

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{ display: 'flex', justifyContent: 'center', paddingBottom: 'clamp(1rem, 3vw, 2.5rem)' }}
            >
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.4rem',
                  border: 'none',
                  borderRadius: '999px',
                  background: '#fff',
                  color: '#1DB954',
                  fontFamily: "'Rubik', system-ui, sans-serif",
                  fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 0 0 1.5px #1DB954',
                }}
              >
                Interested? Contact us <ArrowIcon />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

function ArrowIcon() {
  return (
    <span style={{ display: 'inline-block', width: 14, height: 10, position: 'relative' }}>
      <span style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: '1.5px', background: 'currentColor',
        transform: 'translateY(-50%)',
      }} />
      <span style={{
        position: 'absolute', right: 0, top: '50%',
        width: 6, height: 6,
        borderTop: '1.5px solid currentColor',
        borderRight: '1.5px solid currentColor',
        transform: 'translateY(-50%) rotate(45deg)',
      }} />
    </span>
  )
}

function SelexGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '-4vw',
        padding: '48px clamp(16px, 3vw, 48px)',
        fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'stretch',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%', height: '100%' }}>
        {GRID.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '2px', flex: '1 1 0', minHeight: 0 }}>
            {row.map((char, ci) => (
              <div
                key={ci}
                style={{
                  flex: '1 1 0',
                  minWidth: 0,
                  aspectRatio: '18/22',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'inherit',
                  fontSize: 'clamp(9px, 0.9vw, 12px)',
                  fontWeight: 400,
                  color: '#000',
                  background: 'transparent',
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
