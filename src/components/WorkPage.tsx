import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import Copy from '@/components/Copy'
import WorkGallery from '@/components/WorkGallery'
import WorkCard from '@/components/work/WorkCard'
import { VISIBLE_COLLECTIONS as COLLECTIONS, VISIBLE_LABEL_KEY as LABEL_KEY, WORK, CREATIVE_GALLERY, FEATURED_WORK } from '@/data/work'

/**
 * Work: the portfolio in three collections - Client Work, Independent
 * Projects, Strategy & Writing. Every piece says where it came from (the
 * label key at the top), so commissioned, self-initiated and concept work
 * are never confused.
 *
 * Only approved projects appear (data/work.ts). Featured projects lead the
 * page; a collection with no approved work shows a marked placeholder
 * instead of an invented sample. Each card opens its project page.
 */
export default function WorkPage() {
  return (
    <article className="page" aria-labelledby="work-title">
      <header className="page__head">
        <p className="page__eyebrow">Work</p>
        <h1 className="page__title" id="work-title">
          <Copy text="PLACEHOLDER - the Work headline, in one short line." />
        </h1>
        <Copy as="p" text="PLACEHOLDER - one or two lines on what you share here and how to read it." className="page__lede" />
      </header>

      <nav className="page__toc" aria-label="Collections">
        <ol role="list">
          {COLLECTIONS.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.anchor}`}>
                <span className="ed-index">0{i + 1}</span>
                {c.navLabel}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* A separate Featured strip only once there are two or more approved
          featured projects; until then each project sits in its collection. */}
      {FEATURED_WORK.length >= 2 && (
        <section className="page__section" aria-labelledby="featured-title">
          <h2 className="ed-eyebrow" id="featured-title">
            Featured
          </h2>
          <ul className="workcards workcards--featured" role="list">
            {FEATURED_WORK.map((w) => (
              <li key={w.slug}>
                <WorkCard item={w} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="page__key" aria-labelledby="key-title">
        <h2 className="ed-eyebrow" id="key-title">
          How to read the labels
        </h2>
        <dl className="labelkey">
          {LABEL_KEY.map((k) => (
            <div key={k.label} className="labelkey__row">
              <dt>
                <span className={`ed-label ed-label--${k.label}`}>{k.name}</span>
              </dt>
              <dd>{k.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      {COLLECTIONS.map((c, i) => {
        const items = WORK.filter((w) => w.collection === c.id)
        return (
          <section key={c.id} id={c.anchor} className="page__section" aria-labelledby={`${c.anchor}-title`}>
            <header className="page__section-head">
              <span className="ed-index">0{i + 1}</span>
              <h2 className="page__section-title" id={`${c.anchor}-title`}>
                {c.title}
              </h2>
              <Copy as="p" text={c.intro} className="page__section-lede" />
            </header>
            <hr className="ed-rule" />
            {items.length === 0 ? (
              <div className="empty">
                <p className="ed-placeholder-note">Placeholder</p>
                <p className="empty__body">
                  No projects added yet. Projects appear here only from real work you supply, each with its
                  label, your role and permission to share.
                </p>
              </div>
            ) : (
              <ul className="workcards" role="list">
                {items.map((w) => (
                  <li key={w.slug}>
                    <WorkCard item={w} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {CREATIVE_GALLERY.length > 0 && (
        <section className="page__section" aria-labelledby="gallery-title">
          <header className="page__section-head">
            <h2 className="page__section-title" id="gallery-title">
              Creative gallery
            </h2>
          </header>
          <WorkGallery items={CREATIVE_GALLERY} title="Creative gallery" />
        </section>
      )}

      <section className="page__cta" aria-label="Get in touch">
        <Copy as="p" text="PLACEHOLDER - a one-line invitation to get in touch." className="page__cta-text" />
        <Link className="home__cta" to="/contact">
          Get in touch
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </article>
  )
}
