import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from '@/components/slab'
import Copy from '@/components/Copy'
import WorkLabelChip from '@/components/work/WorkLabelChip'
import { COLLECTIONS, workBySlug } from '@/data/work'

/**
 * One project, text only: label, title, summary, the engagement facts and
 * the responsibilities, grouped. No client assets are shown - images are
 * added only when the client has given permission.
 *
 * While a project still has open conditions (`pending`), they show as a
 * marked placeholder note, so the page cannot go live looking finished.
 */
export default function ProjectPage() {
  const { slug } = useParams()
  const item = workBySlug(slug)

  if (!item) {
    return (
      <article className="page" aria-labelledby="project-missing">
        <header className="page__head">
          <p className="page__eyebrow">Work</p>
          <h1 className="page__title" id="project-missing">
            Project not found.
          </h1>
          <p className="page__lede">
            <Link to="/work">See all work</Link>
          </p>
        </header>
      </article>
    )
  }

  const collection = COLLECTIONS.find((c) => c.id === item.collection)

  return (
    <article className="page project" aria-labelledby="project-title">
      <nav aria-label="Breadcrumb" className="project__crumbs">
        <Link to={`/work#${collection?.anchor ?? ''}`} className="project__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          {collection?.title ?? 'Work'}
        </Link>
      </nav>

      <header className="page__head">
        <WorkLabelChip item={item} />
        <h1 className="page__title" id="project-title">
          {item.title}
        </h1>
        <p className="page__lede">{item.summary}</p>
      </header>

      {item.pending && item.pending.length > 0 && (
        <Copy
          as="p"
          className="ed-placeholder-note project__pending"
          text={`PLACEHOLDER - not for publication until confirmed: ${item.pending.join(' and ')}.`}
        />
      )}

      <section className="page__section" aria-labelledby="overview-title">
        <h2 className="ed-eyebrow" id="overview-title">
          Project Overview
        </h2>
        <dl className="details project__facts">
          <div className="details__row">
            <dt>Client</dt>
            <dd>{item.client}</dd>
          </div>
          <div className="details__row">
            <dt>My role</dt>
            <dd>{item.role}</dd>
          </div>
          <div className="details__row">
            <dt>Dates</dt>
            <Copy as="dd" text={item.dates} />
          </div>
        </dl>
      </section>

      <section className="page__section" aria-labelledby="resp-title">
        <header className="page__section-head">
          <h2 className="page__section-title" id="resp-title">
            What I do
          </h2>
        </header>
        <hr className="ed-rule" />
        <div className="project__groups">
          {item.responsibilities.map((g, i) => (
            <section key={g.title} className="project__group" aria-labelledby={`resp-${i}`}>
              <span className="ed-index">0{i + 1}</span>
              <h3 className="project__group-title" id={`resp-${i}`}>
                {g.title}
              </h3>
              <ul className="svc__list" role="list">
                {g.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="page__cta" aria-label="More work">
        <Link className="project__all" to="/work">
          See all work <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </Link>
        <Link className="home__cta" to="/contact">
          Get in touch
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </article>
  )
}
