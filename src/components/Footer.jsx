import LocalTime from './LocalTime'
import { PERSON } from '../data/content'
import { useCopy } from '../hooks/useCopy'

export default function Footer() {
  const [copied, copy] = useCopy()
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow" data-reveal="">
          <span className="eyebrow__num">06</span>
          <span className="eyebrow__rule" aria-hidden="true" />
          Contact
        </p>
        <h2 className="footer__title" id="contact-title" data-reveal="" style={{ '--d': 1 }}>
          Have a problem worth <em>untangling?</em>
          <br />
          Let’s talk.
        </h2>

        <div className="footer__email" data-reveal="" style={{ '--d': 2 }}>
          <a href={`mailto:${PERSON.email}`} aria-label="Send an email">
            {PERSON.email}
          </a>
          <button type="button" className="text-btn" onClick={() => copy(PERSON.email)}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
          <span className="sr-only" role="status">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </div>

        <div className="footer__grid">
          <p className="footer__name">
            Azrial Ahmad
            <br />
            Haidar Daffi Zuhri
          </p>

          <nav aria-label="Footer navigation">
            <ul className="footer__links">
              <li>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSON.email}`}>Email</a>
              </li>
              <li>
                <a href="#top">Back to top ↑</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            <span suppressHydrationWarning>© {year}</span> — built with React &amp; Vite. Set in
            Cormorant Garamond &amp; DM Sans.
          </p>
          <LocalTime />
          <div className="dot-arc" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
