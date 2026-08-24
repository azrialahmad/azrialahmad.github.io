import { useState, useCallback } from 'react'

export function useLightbox() {
  const [src, setSrc] = useState(null)

  const open = useCallback((url) => setSrc(url), [])
  const close = useCallback(() => setSrc(null), [])

  return { src, open, close }
}
