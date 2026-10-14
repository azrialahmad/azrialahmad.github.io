import { useEffect, useRef } from 'react'
import Picture from './Picture'

const pad = n => String(n).padStart(2, '0')

// A native <dialog>: focus is trapped and restored, Escape closes it, and the
// rest of the page is inert while it is open. Arrow keys / swipes step
// through the current series, and neighbours are preloaded.
export default function Lightbox({ images, index, title, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const swipeStart = useRef(null)
  const image = index === null ? null : images[index]
  const count = images.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (image && !dialog.open) dialog.showModal()
    else if (!image && dialog.open) dialog.close()
  }, [image])

  useEffect(() => {
    if (!image) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [image])

  useEffect(() => {
    if (!image || count < 2) return
    const onKey = e => {
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [image, count, onNavigate])

  useEffect(() => {
    if (index === null || count < 2) return
    ;[index - 1, index + 1].forEach(i => {
      const next = images[(i + count) % count]
      const srcset = next.sources.avif ?? next.sources.webp
      if (!srcset) return
      const preload = new Image()
      preload.sizes = '90vw'
      preload.srcset = srcset
    })
  }, [images, index, count])

  const onPointerDown = e => {
    swipeStart.current = e.clientX
  }
  const onPointerUp = e => {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > 50 && count > 1) onNavigate(dx < 0 ? 1 : -1)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={title}
      onClose={onClose}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {image && (
        <>
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>

          <figure
            className="lightbox__figure"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <Picture
              key={image.id}
              image={image}
              className="lightbox__picture"
              sizes="(min-width: 1000px) 85vw, 100vw"
              priority
            />
            <figcaption className="lightbox__caption">
              <span className="lightbox__count">
                {pad(index + 1)} / {pad(count)}
              </span>
              <span>{image.alt}</span>
            </figcaption>
          </figure>

          {count > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => onNavigate(-1)}
                aria-label="Previous image"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => onNavigate(1)}
                aria-label="Next image"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  )
}
