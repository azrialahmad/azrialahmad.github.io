import SectionHead from './SectionHead'
import { PERSON, PUBLICATIONS, toBibTeX } from '../data/content'
import { useCopy } from '../hooks/useCopy'

const pad = n => String(n).padStart(2, '0')

function Publication({ pub, index }) {
  const [copied, copy] = useCopy()

  return (
    <article className="pub" data-reveal="">
      <span className="pub__index" aria-hidden="true">
        {pad(index + 1)}
      </span>

      <div className="pub__body">
        <p className="pub__venue">
          <span className="tag">{pub.library}</span>
          <span>
            {pub.venue} · {pub.year}
          </span>
        </p>
        <h3 className="pub__title">{pub.title}</h3>
        <p className="pub__authors">
          {pub.authors.map((author, i) => (
            <span key={author}>
              {author === PERSON.name ? <strong>{author}</strong> : author}
              {i < pub.authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>

      <div className="pub__actions">
        <a
          href={pub.href}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link"
          aria-label={`Read paper on ${pub.library}`}
        >
          Read paper <span aria-hidden="true">↗</span>
        </a>
        <button type="button" className="text-btn" onClick={() => copy(toBibTeX(pub))}>
          {copied ? 'Copied ✓' : 'Copy BibTeX'}
        </button>
        <span className="sr-only" role="status">
          {copied ? 'BibTeX citation copied to clipboard' : ''}
        </span>
      </div>
    </article>
  )
}

export default function Publications() {
  return (
    <section className="section" id="publications" aria-labelledby="publications-title">
      <div className="container">
        <SectionHead number="03" label="Publications" title="Research & writing" id="publications-title" />
        <div className="pubs">
          {PUBLICATIONS.map((pub, i) => (
            <Publication key={pub.id} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
