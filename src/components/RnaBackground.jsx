import React, { useEffect, useRef } from 'react'

const NTS = ['A', 'U', 'G', 'C']

function rand4() {
  return NTS[Math.floor(Math.random() * 4)]
}

function seededRand(seed) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

export default function RnaBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Measure viewport to decide grid dimensions ─────────────
    // Cells are ~28px wide × ~34px tall at base size
    const CELL_W = 28
    const CELL_H = 34
    const COLS = Math.ceil(window.innerWidth / CELL_W) + 2
    const ROWS = Math.ceil(window.innerHeight / CELL_H) + 2
    // We render 2× the visible rows so we can scroll seamlessly
    const TOTAL_ROWS = ROWS * 2

    // ── Build DOM grid ─────────────────────────────────────────
    // Grid scrolls vertically: columns are the stable axis,
    // rows move top→bottom.
    const r = seededRand(77)
    const cells = [] // cells[row][col]

    // Wrapper that holds the scrolling content
    const grid = document.createElement('div')
    grid.style.cssText =
      'display:grid;' +
      `grid-template-columns: repeat(${COLS}, 1fr);` +
      'width:100%; will-change:transform;'
    container.appendChild(grid)

    for (let row = 0; row < TOTAL_ROWS; row++) {
      const rowCells = []
      for (let col = 0; col < COLS; col++) {
        const cell = document.createElement('div')
        cell.style.cssText =
          'display:flex; align-items:center; justify-content:center;' +
          `width:${CELL_W}px; height:${CELL_H}px;` +
          'font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;' +
          'font-size:16px; font-weight:500; line-height:1;' +
          'color:#1a1a1a; transition:color 300ms;' +
          'user-select:none;'
        cell.textContent = NTS[Math.floor(r() * 4)]
        grid.appendChild(cell)
        rowCells.push(cell)
      }
      cells.push(rowCells)
    }

    // ── Continuous top→bottom scroll via translateY ────────────
    let scrollY = 0
    const SCROLL_SPEED = 0.6 // px per frame — slow drift downward
    let rafId

    function tick() {
      scrollY += SCROLL_SPEED
      // When we've scrolled one "page" worth, reset and reshuffle top rows
      if (scrollY >= ROWS * CELL_H) {
        scrollY -= ROWS * CELL_H
        // Rotate cell content: move bottom half content to top half
        // so the seam is invisible
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            cells[row][col].textContent = cells[row + ROWS][col].textContent
            cells[row][col].style.color = cells[row + ROWS][col].style.color
            cells[row + ROWS][col].textContent = rand4()
            cells[row + ROWS][col].style.color = '#1a1a1a'
          }
        }
      }
      grid.style.transform = `translateY(${scrollY}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    let alive = true

    function sleep(ms) {
      return new Promise(res => setTimeout(res, ms))
    }

    function flipCell(cell, finalChar, finalColor) {
      let cycles = 0
      const maxCycles = 3 + Math.floor(Math.random() * 4)
      return new Promise(res => {
        const id = setInterval(() => {
          if (!alive) { clearInterval(id); res(); return }
          cell.textContent = rand4()
          cycles++
          if (cycles >= maxCycles) {
            clearInterval(id)
            cell.textContent = finalChar
            if (finalColor) cell.style.color = finalColor
            res()
          }
        }, 50)
      })
    }

    // Scatter drift — random cells across visible rows
    function driftBurst() {
      const burst = 18 + Math.floor(Math.random() * 14)
      for (let i = 0; i < burst; i++) {
        const row = Math.floor(Math.random() * TOTAL_ROWS)
        const col = Math.floor(Math.random() * COLS)
        flipCell(cells[row][col], rand4(), null)
      }
    }

    // Highlight a column (vertical axis = "strand" in this orientation)
    function highlightCol(colIdx) {
      for (let row = 0; row < TOTAL_ROWS; row++) {
        flipCell(cells[row][colIdx], rand4(), '#22c55e')
      }
    }

    function convergeToCol(hitColIdx) {
      const target = cells.map(row => row[hitColIdx].textContent)
      for (let col = 0; col < COLS; col++) {
        if (col === hitColIdx) continue
        const prob = 0.45 + Math.random() * 0.35
        for (let row = 0; row < TOTAL_ROWS; row++) {
          if (Math.random() < prob) {
            const delay = Math.random() * 1600
            setTimeout(() => {
              if (alive) flipCell(cells[row][col], target[row], null)
            }, delay)
          }
        }
      }
    }

    function resetColors(exceptCol = -1) {
      for (let row = 0; row < TOTAL_ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (col === exceptCol) continue
          cells[row][col].style.color = '#1a1a1a'
        }
      }
    }

    async function selexLoop() {
      while (alive) {
        // Phase 1: drift
        const driftInterval = setInterval(() => {
          if (alive) driftBurst()
        }, 90)
        await sleep(4000)
        clearInterval(driftInterval)
        if (!alive) break

        // Phase 2: hit — highlight a random column
        const hitCol = Math.floor(Math.random() * COLS)
        highlightCol(hitCol)
        await sleep(800)
        if (!alive) break

        // Phase 3: converge other columns toward hit
        convergeToCol(hitCol)
        await sleep(2200)
        if (!alive) break

        // Phase 4: reset
        resetColors(hitCol)
        await sleep(400)
        for (let row = 0; row < TOTAL_ROWS; row++) {
          cells[row][hitCol].style.color = '#1a1a1a'
        }
        await sleep(300)
      }
    }

    selexLoop()

    return () => {
      alive = false
      cancelAnimationFrame(rafId)
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-2vh',
        left: '-2vw',
        right: '-2vw',
        bottom: '-2vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,1) 100%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,1) 100%)',
      }}
    />
  )
}
