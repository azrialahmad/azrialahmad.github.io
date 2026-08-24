import { useEffect } from 'react'

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [src, onClose])

  if (!src) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">×</button>
      <img
        src={src}
        alt="Full-size preview"
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
