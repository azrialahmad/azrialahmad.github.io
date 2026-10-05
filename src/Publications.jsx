export default function Publications() {
  const publication = {
    title: 'A Comparative Analysis of YOLOv12 Model Sizes for Road Damage Detection on an Indonesian Dataset',
    authors: 'Azrial Ahmad Haidar Daffi Zuhri, Dhomas Hatta Fudholi, Rahadian Kurniawan, and Tisara Sita',
    venue: '10th International Conference on Information Technology and Digital Application (ICITDA)',
    publisher: 'IEEE Xplore',
    year: '2025',
    href: 'https://ieeexplore.ieee.org/document/11332249',
  }

  return (
    <section className="section" id="publications">
      <div className="container">
        <p className="section-label reveal">Publications</p>
        <h2 className="section-heading reveal reveal-delay-1">
          Research &amp; writing
        </h2>

        <div
          className="reveal reveal-delay-2"
          style={{ marginTop: 'var(--space-12)', borderTop: '1px solid var(--border)' }}
        >
          <article className="publication-card">
            <span className="publication-index" aria-hidden="true">01</span>

            <div className="publication-body">
              <p className="publication-venue">
                <span className="tag">{publication.publisher}</span>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginLeft: 'var(--space-3)',
                  }}
                >
                  {publication.venue} · {publication.year}
                </span>
              </p>

              <h3 className="publication-title">{publication.title}</h3>
              <p className="publication-authors">{publication.authors}</p>
            </div>

            <a
              href={publication.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link publication-link"
              aria-label="Read paper on IEEE Xplore"
            >
              IEEE Xplore ↗
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
