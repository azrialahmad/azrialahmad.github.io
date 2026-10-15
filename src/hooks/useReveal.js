import { useEffect } from 'react'

// Elements marked `data-reveal` fade up the first time they scroll into view.
// They are only hidden once this hook has run (html.reveal-ready), so the page
// stays fully readable without JavaScript, and anything already on screen at
// that moment is marked shown first to avoid a flash.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const elements = [...document.querySelectorAll('[data-reveal]')]
    const show = el => el.setAttribute('data-shown', '')

    if (!('IntersectionObserver' in window)) {
      elements.forEach(show)
      return
    }

    elements
      .filter(el => el.getBoundingClientRect().top < window.innerHeight)
      .forEach(show)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            show(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    elements.filter(el => !el.hasAttribute('data-shown')).forEach(el => observer.observe(el))
    root.classList.add('reveal-ready')

    return () => observer.disconnect()
  }, [])
}
