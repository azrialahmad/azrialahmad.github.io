import { DISCIPLINES } from '../data/content'

// A slow ticker of everything Azrial works across. The list is rendered twice
// so the track can loop seamlessly; the copy is hidden from assistive tech.
export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[0, 1].map(copy => (
          <ul key={copy} className="marquee__list" aria-hidden={copy === 1 || undefined}>
            {DISCIPLINES.map(item => (
              <li key={item} className="marquee__item">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
