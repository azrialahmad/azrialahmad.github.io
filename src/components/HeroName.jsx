import { useEffect, useRef } from 'react'

const LINES = ['Azrial', 'Ahmad', 'Haidar']
const ACCENT_LINE = 1
const MIN_WEIGHT = 300
const MAX_WEIGHT = 700
const RADIUS = 260 // px of cursor influence

// The name is set letter by letter so each glyph can rise in on load (pure
// CSS, runs before hydration) and swell in weight as the cursor passes —
// Cormorant Garamond is a variable font, so weight is a continuous axis.
export default function HeroName() {
  const ref = useRef(null)

  useEffect(() => {
    const heading = ref.current
    const section = heading?.closest('section')
    if (!heading || !section) return
    if (!window.matchMedia?.('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = [...heading.querySelectorAll('.hero-name__ch')]
    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      // Read every rect first, then write, so layout is computed once per frame.
      const rects = chars.map(ch => ch.getBoundingClientRect())
      rects.forEach((r, i) => {
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
        const t = Math.max(0, 1 - d / RADIUS)
        const weight = MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * t * t
        chars[i].style.setProperty('--w', weight.toFixed(0))
      })
    }
    const onMove = e => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      chars.forEach(ch => ch.style.removeProperty('--w'))
    }

    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  let index = 0
  return (
    <h1 className="hero-name" ref={ref}>
      <span className="sr-only">{LINES.join(' ')}</span>
      {LINES.map((line, l) => (
        <span
          key={line}
          className={`hero-name__line${l === ACCENT_LINE ? ' is-accent' : ''}`}
          aria-hidden="true"
        >
          {[...line].map(ch => (
            <span key={index} className="hero-name__ch" style={{ '--i': index++ }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
