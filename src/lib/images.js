// Drop images into these folders — no code changes needed:
//   src/assets/photography/street/   ← street & candid shots
//   src/assets/photography/cosplay/  ← cosplay portraits
//   src/assets/design/               ← design work
//
// At build time vite-imagetools turns each source into AVIF + WebP at three
// widths and reports its intrinsic size, so the layout never shifts and every
// device downloads only the size it needs. Files are ordered by name
// (numeric-aware), so prefix them to control order.

import { ALT_TEXT } from '../data/content'

// `as=picture` → { sources: { avif: srcset, webp: srcset }, img: { src, w, h } }
const street = import.meta.glob('../assets/photography/street/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?w=480;960;1600&format=avif;webp&as=picture',
  import: 'default',
})
const cosplay = import.meta.glob('../assets/photography/cosplay/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?w=480;960;1600&format=avif;webp&as=picture',
  import: 'default',
})
const design = import.meta.glob('../assets/design/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?w=480;960;1600&format=avif;webp&as=picture',
  import: 'default',
})

const fileId = path => path.split('/').pop().replace(/\.[^.]+$/, '')

function collect(modules, fallbackAlt) {
  return Object.entries(modules)
    .map(([path, picture]) => [fileId(path), picture])
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([id, picture], i) => {
      return {
        id,
        alt: ALT_TEXT[id] ?? `${fallbackAlt} ${i + 1}`,
        src: picture.img.src,
        width: picture.img.w,
        height: picture.img.h,
        sources: picture.sources,
      }
    })
}

export const streetImages = collect(street, 'Street photograph')
export const cosplayImages = collect(cosplay, 'Cosplay portrait')
export const designImages = collect(design, 'Design work')

export const heroImage =
  streetImages.find(image => image.id === 'street-4') ?? streetImages[0] ?? null
