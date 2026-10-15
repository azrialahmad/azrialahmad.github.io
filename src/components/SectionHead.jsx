// "01 — About" eyebrow + display heading, shared by every section.
export default function SectionHead({ number, label, title, id, children }) {
  return (
    <header className="section-head">
      <p className="eyebrow" data-reveal="">
        <span className="eyebrow__num">{number}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {label}
      </p>
      {title && (
        <h2 className="section-title" id={id} data-reveal="" style={{ '--d': 1 }}>
          {title}
        </h2>
      )}
      {children}
    </header>
  )
}
