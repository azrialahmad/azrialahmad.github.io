// Drop your images into these folders — no code changes needed:
//   src/assets/photography/street/   ← street & candid shots
//   src/assets/photography/cosplay/  ← cosplay portraits
//
// Supported formats: jpg, jpeg, png, webp, avif

import Lightbox, { useLightbox } from './Lightbox'

const streetImagesMap = import.meta.glob('./assets/photography/street/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })
const streetThumbsMap = import.meta.glob('./assets/photography/street/thumbs/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })

const streetImages = Object.entries(streetImagesMap).map(([path, url]) => {
  const filename = path.split('/').pop()
  const thumbKey = `./assets/photography/street/thumbs/${filename}`
  return {
    full: url,
    thumb: streetThumbsMap[thumbKey] || url
  }
})

const cosplayImagesMap = import.meta.glob('./assets/photography/cosplay/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })
const cosplayThumbsMap = import.meta.glob('./assets/photography/cosplay/thumbs/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })

const cosplayImages = Object.entries(cosplayImagesMap).map(([path, url]) => {
  const filename = path.split('/').pop()
  const thumbKey = `./assets/photography/cosplay/thumbs/${filename}`
  return {
    full: url,
    thumb: cosplayThumbsMap[thumbKey] || url
  }
})

// Layout slots: define how many cells the grid expects for each subsection
const STREET_SLOTS = [{ span: true }, {}, {}, {}, {}, {}]  // 1 large + 5 regular
const COSPLAY_SLOTS = [{ span: true }, {}, {}, {}, {}, {}]

function PhotoCell({ image, alt, span, onOpen }) {
  const url = image?.thumb
  const fullUrl = image?.full
  return (
    <div
      className={`photo-placeholder${span ? ' gallery-span-2' : ''}${url ? ' photo-clickable' : ''}`}
      role="img"
      aria-label={url ? alt : 'Photo placeholder'}
      onClick={url ? () => onOpen(fullUrl) : undefined}
      style={url ? { cursor: 'pointer' } : undefined}
    >
      {url && <img src={url} alt={alt} loading="lazy" />}
    </div>
  )
}

function GalleryGrid({ slots, images, altPrefix, onOpen }) {
  // Fill slots with real images where available, show placeholder for the rest
  const mainSlots = slots.slice(0, 3)   // large-grid (2-col)
  const extraSlots = slots.slice(3)      // secondary row

  return (
    <>
      <div className="gallery-grid-main">
        {mainSlots.map((slot, i) => (
          <PhotoCell key={i} image={images[i]} alt={`${altPrefix} ${i + 1}`} span={slot.span} onOpen={onOpen} />
        ))}
      </div>
      <div className="gallery-grid-secondary">
        {extraSlots.map((slot, i) => (
          <PhotoCell key={i} image={images[i + mainSlots.length]} alt={`${altPrefix} ${i + mainSlots.length + 1}`} onOpen={onOpen} />
        ))}
      </div>
    </>
  )
}

export default function Photography() {
  const lightbox = useLightbox()

  return (
    <section className="section" id="photography">
      <div className="container">
        <div className="photography-intro">
          <p className="section-label reveal">Photography</p>
          <h2 className="section-heading reveal reveal-delay-1">
            Through the lens
          </h2>
          <p className="about-body reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            I shoot street and candid — moments as they are, unposed and honest.
            From time to time, the subject is a cosplay portrait: a different kind
            of realness.
          </p>
        </div>

        <p className="gallery-label reveal">Street &amp; Candid</p>
        <div className="reveal">
          <GalleryGrid slots={STREET_SLOTS} images={streetImages} altPrefix="Street photo" onOpen={lightbox.open} />
        </div>

        <p className="gallery-label reveal">Cosplay Portraits</p>
        <div className="reveal">
          <GalleryGrid slots={COSPLAY_SLOTS} images={cosplayImages} altPrefix="Cosplay portrait" onOpen={lightbox.open} />
        </div>
      </div>

      <Lightbox src={lightbox.src} onClose={lightbox.close} />
    </section>
  )
}
