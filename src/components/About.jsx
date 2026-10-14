import SectionHead from './SectionHead'
import { PERSON, ROLES, TOOLKIT } from '../data/content'

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__text">
          <SectionHead
            number="01"
            label="About"
            id="about-title"
            title={
              <>
                Curious by nature,
                <br />
                <em>precise</em> by practice.
              </>
            }
          />
          <div className="prose" data-reveal="" style={{ '--d': 2 }}>
            <p>
              I’m a fresh Informatics graduate from Indonesia who finds himself equally at home
              writing a data pipeline, training a detection model, or building a web interface. I
              don’t pick one lane — I follow the problem wherever it leads.
            </p>
            <p>
              When I’m not in front of a terminal, I’m out with a camera looking for candid moments
              in the street, or setting up portraits for cosplay photography. I believe the same
              attention to detail that makes a good photograph makes good software.
            </p>
          </div>
        </div>

        <aside className="about__side" data-reveal="" style={{ '--d': 3 }}>
          <div className="status">
            <p className="status__head">
              <span className="status__dot" aria-hidden="true" />
              Open to work
            </p>
            <ul className="status__roles">
              {ROLES.map(role => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <p className="status__where">
              Based in {PERSON.city}, {PERSON.country} · UTC+7
            </p>
          </div>

          <div className="toolkit">
            <p className="toolkit__title">Toolkit</p>
            <dl>
              {TOOLKIT.map(({ category, items }) => (
                <div className="toolkit__row" key={category}>
                  <dt>{category}</dt>
                  <dd>
                    {items.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  )
}
