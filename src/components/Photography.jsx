import { useState } from 'react'
import Lightbox from './Lightbox'
import PhotoGrid from './PhotoGrid'
import SectionHead from './SectionHead'
import { useGallery } from '../hooks/useGallery'
import { cosplayImages, streetImages } from '../lib/images'

const pad = n => String(n).padStart(2, '0')

const SERIES = [
  { id: 'street', letter: 'A', name: 'Street & Candid', images: streetImages },
  { id: 'cosplay', letter: 'B', name: 'Cosplay Portraits', images: cosplayImages },
].filter(series => series.images.length > 0)

function ToneSwitch({ tone, onChange }) {
  return (
    <div className="tone-switch" role="group" aria-label="Photo treatment" data-tone={tone}>
      <button type="button" aria-pressed={tone === 'duotone'} onClick={() => onChange('duotone')}>
        Duotone
      </button>
      <button type="button" aria-pressed={tone === 'color'} onClick={() => onChange('color')}>
        Color
      </button>
    </div>
  )
}

export default function Photography() {
  const [tone, setTone] = useState('duotone')
  const gallery = useGallery(SERIES)

  return (
    <section
      className="section"
      id="photography"
      data-tone={tone}
      aria-labelledby="photography-title"
    >
      <div className="container">
        <div className="split-head">
          <SectionHead number="04" label="Photography" title="Through the lens" id="photography-title">
            <p className="lede" data-reveal="" style={{ '--d': 2 }}>
              I shoot street and candid — moments as they are, unposed and honest. From time to time,
              the subject is a cosplay portrait: a different kind of realness.
            </p>
          </SectionHead>
          <div data-reveal="" style={{ '--d': 3 }}>
            <ToneSwitch tone={tone} onChange={setTone} />
          </div>
        </div>

        {SERIES.map((series, s) => (
          <div className="series" key={series.id}>
            <h3 className="series__title" data-reveal="">
              <span className="series__letter">Series {series.letter}</span>
              {series.name}
              <span className="series__count">{pad(series.images.length)} frames</span>
            </h3>
            <div data-reveal="" style={{ '--d': 1 }}>
              <PhotoGrid
                images={series.images}
                prefix="Pl."
                duotone
                onOpen={index => gallery.open(s, index)}
              />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={gallery.images}
        index={gallery.index}
        title={gallery.title}
        onClose={gallery.close}
        onNavigate={gallery.navigate}
      />
    </section>
  )
}
