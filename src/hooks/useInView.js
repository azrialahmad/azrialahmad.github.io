import { useEffect, useState } from 'react'

// True while the element is (roughly) on screen. Used to pause looping
// animations that nobody can see.
export function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
