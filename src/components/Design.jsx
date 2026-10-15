import Lightbox from './Lightbox'
import PhotoGrid from './PhotoGrid'
import SectionHead from './SectionHead'
import { useGallery } from '../hooks/useGallery'
import { designImages } from '../lib/images'

const SERIES = [{ id: 'design', name: 'Design work', images: designImages }]

export default function Design() {
  const gallery = useGallery(SERIES)

  return (
    <section className="section section--alt" id="design" aria-labelledby="design-title">
      <div className="container">
        <SectionHead number="05" label="Design" title="Visual thinking" id="design-title">
          <p className="lede" data-reveal="" style={{ '--d': 2 }}>
            Design is how I make sense of things before writing a single line of code. Layouts,
            editorial compositions, and interface concepts — a quieter side of the same curiosity.
          </p>
        </SectionHead>

        {designImages.length > 0 && (
          <div className="series" data-reveal="" style={{ '--d': 1 }}>
            <PhotoGrid images={designImages} prefix="No." onOpen={index => gallery.open(0, index)} />
          </div>
        )}
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
