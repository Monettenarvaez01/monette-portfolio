import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import Copy from '@/components/Copy'
import { SERVICES, PROCESS, type Service } from '@/data/services'

/**
 * Services. Brand & Media Strategy leads as the primary direction, on its own
 * panel; the three hands-on services follow as the support behind it; then
 * how an engagement runs. Every service block has the same anatomy: who it
 * is for, what Monette does, what she is still developing (tagged), and
 * typical deliverables.
 */

function List({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`svc__list ${className}`} role="list">
      {items.map((t, i) => (
        <Copy as="li" key={i} text={t} />
      ))}
    </ul>
  )
}

/** `level` keeps the outline unbroken: h3 under the lead's h2, h4 under a card's h3. */
function ServiceBody({ s, level }: { s: Service; level: 'h3' | 'h4' }) {
  const H = level
  return (
    <>
      <Copy as="p" text={s.summary} className="svc__summary" />
      <div className="svc__cols">
        <div>
          <H className="ed-eyebrow">Who it&rsquo;s for</H>
          <Copy as="p" text={s.audience} className="svc__text" />
        </div>
        <div>
          <H className="ed-eyebrow">What I do</H>
          <List items={s.includes} />
          {s.developing.length > 0 && (
            <>
              <H className="ed-eyebrow svc__dev-head">
                Currently developing <span className="ed-label ed-label--developing">Developing</span>
              </H>
              <List items={s.developing} className="svc__list--dev" />
            </>
          )}
        </div>
        <div>
          <H className="ed-eyebrow">Typical deliverables</H>
          <List items={s.deliverables} />
        </div>
      </div>
    </>
  )
}

export default function ServicesPage() {
  const [lead, ...support] = SERVICES

  return (
    <article className="page" aria-labelledby="services-title">
      <header className="page__head">
        <p className="page__eyebrow">Services</p>
        <h1 className="page__title" id="services-title">
          <Copy text="PLACEHOLDER - the Services headline, in one short line." />
        </h1>
        <Copy as="p" text="PLACEHOLDER - one or two lines on how strategy and hands-on support fit together for a founder." className="page__lede" />
      </header>

      <section className="page__section svc svc--lead ed-panel" aria-labelledby="svc-lead-title">
        <header className="page__section-head">
          <span className="ed-index">01</span>
          <h2 className="page__section-title" id="svc-lead-title">
            {lead.title}
          </h2>
        </header>
        <ServiceBody s={lead} level="h3" />
      </section>

      <section className="page__section" aria-labelledby="svc-support-title">
        <header className="page__section-head">
          <span className="ed-index">02</span>
          <h2 className="page__section-title" id="svc-support-title">
            Hands-on support
          </h2>
          <Copy as="p" text="PLACEHOLDER - one line on the experience behind these three services." className="page__section-lede" />
        </header>
        <hr className="ed-rule" />
        <div className="svc__grid">
          {support.map((s) => (
            <section key={s.id} className="svc svc--card" aria-labelledby={`svc-${s.id}`}>
              <h3 className="svc__title" id={`svc-${s.id}`}>
                {s.title}
              </h3>
              <ServiceBody s={s} level="h4" />
            </section>
          ))}
        </div>
      </section>

      <section className="page__section" aria-labelledby="process-title">
        <header className="page__section-head">
          <span className="ed-index">03</span>
          <h2 className="page__section-title" id="process-title">
            How we&rsquo;ll work together
          </h2>
        </header>
        <hr className="ed-rule" />
        <ol className="steps" role="list">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="steps__item">
              <span className="ed-index">0{i + 1}</span>
              <h3 className="steps__title">{p.title}</h3>
              <Copy as="p" text={p.body} className="steps__body" />
            </li>
          ))}
        </ol>
      </section>

      <section className="page__cta" aria-label="Get in touch">
        <Copy as="p" text="PLACEHOLDER - a one-line invitation to start a conversation." className="page__cta-text" />
        <Link className="home__cta" to="/contact">
          Get in touch
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </article>
  )
}
