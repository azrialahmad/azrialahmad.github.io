import ProjectFigure from './ProjectFigure'
import SectionHead from './SectionHead'
import { ARCHIVE, PERSON, PROJECTS } from '../data/content'

const pad = n => String(n).padStart(2, '0')

export default function Projects() {
  return (
    <section className="section section--alt" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="split-head">
          <SectionHead number="02" label="Projects" title="Selected work" id="projects-title" />
          <a
            href={PERSON.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--line"
            data-reveal=""
            style={{ '--d': 2 }}
          >
            All on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>

        <ol className="projects">
          {PROJECTS.map((project, i) => (
            <li className="project" key={project.id} data-reveal="">
              <ProjectFigure type={project.figure} number={i + 1} caption={project.caption} />

              <div className="project__body">
                <p className="project__index" aria-hidden="true">
                  {pad(i + 1)}
                </p>
                <h3 className="project__name">{project.name}</h3>
                <p className="project__desc">{project.description}</p>
                <ul className="tags" aria-label="Built with">
                  {project.tags.map(tag => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="project__links">
                  {project.links.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-link"
                      aria-label={`${link.label}: ${project.name}`}
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="archive" data-reveal="">
          <h3 className="series__title">
            <span className="series__letter">Index</span>
            Also on the bench
            <span className="series__count">{pad(ARCHIVE.length)} repos</span>
          </h3>
          <ul className="archive__list">
            {ARCHIVE.map(item => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive__row"
                  aria-label={`${item.name}${item.live ? ' (live)' : ''}: ${item.description}`}
                >
                  <span className="archive__name">{item.name}</span>
                  <span className="archive__desc">{item.description}</span>
                  <span className="archive__lang">{item.language}</span>
                  <span className="archive__go" aria-hidden="true">
                    {item.live ? 'Live ↗' : '↗'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
