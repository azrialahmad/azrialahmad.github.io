import HeroName from './HeroName'
import LocalTime from './LocalTime'
import Picture from './Picture'
import { PERSON } from '../data/content'
import { heroImage } from '../lib/images'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__meta">
          <span>Portfolio — Vol. 01</span>
          <span className="hero__meta-mid">Informatics graduate</span>
          <LocalTime />
        </div>

        <HeroName />

        {heroImage && (
          <figure className="hero__plate">
            <div className="duotone">
              <Picture
                image={heroImage}
                sizes="(min-width: 900px) 28vw, 92vw"
                priority
              />
            </div>
            <figcaption>
              <span>Pl. I</span> From the street series
            </figcaption>
          </figure>
        )}

        <div className="hero__foot">
          <p className="hero__role">
            Exploring the intersection of <strong>data</strong>, <strong>AI</strong>, and{' '}
            <strong>web</strong> — building things that make sense of complexity. Also happens to
            make photos.
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--solid">
              View work <span aria-hidden="true">→</span>
            </a>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="btn btn--line">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
