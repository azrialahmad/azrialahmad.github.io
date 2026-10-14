import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../data/content'

const pad = n => String(n).padStart(2, '0')

export default function Navbar({ theme, onToggleTheme }) {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  // Solid background once the page has scrolled — written straight to the DOM
  // so scrolling never re-renders React.
  useEffect(() => {
    const nav = navRef.current
    let ticking = false
    const update = () => {
      ticking = false
      nav.toggleAttribute('data-scrolled', window.scrollY > 24)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...SECTIONS.map(s => s.id), 'contact'].forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => e.key === 'Escape' && setMenuOpen(false)
    document.documentElement.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <nav ref={navRef} className="nav" aria-label="Main navigation">
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label="Back to top" onClick={close}>
          azrial<span>.</span>
        </a>

        <ul className={`nav__links${menuOpen ? ' is-open' : ''}`} id="main-menu">
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id} style={{ '--i': i }}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={close}
              >
                <span className="nav__num" aria-hidden="true">{pad(i + 1)}</span>
                {label}
              </a>
            </li>
          ))}
          <li className="nav__menu-contact" style={{ '--i': SECTIONS.length }}>
            <a href="#contact" onClick={close}>
              <span className="nav__num" aria-hidden="true">{pad(SECTIONS.length + 1)}</span>
              Contact
            </a>
          </li>
        </ul>

        <div className="nav__actions">
          <a href="#contact" className="nav__contact" aria-current={active === 'contact' ? 'true' : undefined}>
            Say hello
          </a>
          <button
            type="button"
            className="icon-btn"
            onClick={e => onToggleTheme(e.currentTarget)}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="theme-icon">
              <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            className={`burger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <span className="nav__progress" aria-hidden="true" />
    </nav>
  )
}
