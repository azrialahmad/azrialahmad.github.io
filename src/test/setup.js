import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// The real module runs every photo through vite-imagetools (sharp); tests only
// need the shape it produces, so swap in a few lightweight fakes.
vi.mock('../lib/images', () => {
  const image = (id, width = 800, height = 600) => ({
    id,
    alt: `Alt text for ${id}`,
    src: `/assets/${id}.webp`,
    width,
    height,
    sources: { avif: `/assets/${id}.avif 480w`, webp: `/assets/${id}.webp 480w` },
  })
  return {
    streetImages: [image('street-1'), image('street-2', 600, 900), image('street-3')],
    cosplayImages: [image('cosplay-1', 600, 900), image('cosplay-2')],
    designImages: [image('design-1', 800, 800)],
    heroImage: image('street-4', 600, 800),
  }
})

// jsdom does not implement IntersectionObserver (scroll reveal, active nav)
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver ??= MockIntersectionObserver

// jsdom does not implement matchMedia (theme, reduced motion, pointer type)
globalThis.matchMedia ??= query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false
  },
})

// jsdom has <dialog> but not its modal API (used by the lightbox)
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function close() {
    if (!this.open) return
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}

// jsdom does not implement scrollIntoView / scrollTo
Element.prototype.scrollIntoView ??= () => {}
window.scrollTo = () => {}
