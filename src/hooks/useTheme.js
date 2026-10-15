import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'portfolio-theme'

// The theme lives on <html data-theme> (set before first paint by the inline
// script in index.html), so the DOM attribute is the source of truth and React
// just subscribes to it. The server snapshot is always "light"; React swaps in
// the real value right after hydration without a mismatch.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getSnapshot = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
const getServerSnapshot = () => 'light'

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Pass the toggle button so the new theme can grow out of it as a circle.
  const toggle = useCallback(origin => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduceMotion || !origin) {
      applyTheme(next)
      return
    }

    const rect = origin.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => applyTheme(next))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 700,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})
  }, [])

  return [theme, toggle]
}
