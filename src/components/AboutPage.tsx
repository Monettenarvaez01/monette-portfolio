import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import Copy from '@/components/Copy'
import { profile } from '@/data/profile'

/**
 * About. Monette's story is the centre of the page, then the three things the
 * site exists to say:
 *
 *   01 Who I am      story, values, the journey so far
 *   02 How I think   research, judgment, observation, creative approach
 *   03 What I do     the four roles, lead role first
 *
 * then what she is developing now and the practical details. Every line of
 * personal content is a marked placeholder until she writes or approves it.
 * No milestones or achievements are filled in on her behalf.
 */

const STORY = [
  'PLACEHOLDER - your story, paragraph one: where you started and what drew you to this work.',
  'PLACEHOLDER - paragraph two: what you learned working behind a founder’s business.',
  'PLACEHOLDER - paragraph three: why a founder’s online presence matters to you, and where you are heading.',
]

const VALUES = ['PLACEHOLDER - a value you work by', 'PLACEHOLDER - a value you work by', 'PLACEHOLDER - a value you work by']

/** Step names are the draft approved in the plan; the descriptions are hers to write. */
const METHOD = [
  { title: 'Listen', body: 'PLACEHOLDER - how you learn what a founder needs.' },
  { title: 'Research', body: 'PLACEHOLDER - what you look at: audience, competitors, the founder’s voice.' },
  { title: 'Shape', body: 'PLACEHOLDER - how you turn observations into a direction.' },
  { title: 'Create', body: 'PLACEHOLDER - how the work gets made.' },
  { title: 'Refine', body: 'PLACEHOLDER - how you review, adjust and learn.' },
]

const JOURNEY = [
  { when: 'PLACEHOLDER - dates', role: 'PLACEHOLDER - role', where: 'PLACEHOLDER - organisation or client type', what: 'PLACEHOLDER - the responsibilities you held.' },
  { when: 'PLACEHOLDER - dates', role: 'PLACEHOLDER - role', where: 'PLACEHOLDER - organisation or client type', what: 'PLACEHOLDER - the responsibilities you held.' },
]

const DEVELOPING = ['PLACEHOLDER - a strategic skill you are building, and how', 'PLACEHOLDER - another skill you are building']

const DETAILS = [
  { label: 'Based in', value: profile.location },
  { label: 'Timezone', value: 'PLACEHOLDER' },
  { label: 'Working hours', value: 'PLACEHOLDER' },
  { label: 'Languages', value: 'PLACEHOLDER' },
]

export default function AboutPage() {
  return (
    <article className="page about" aria-labelledby="about-title">
      <header className="page__head about__head">
        <div className="about__intro">
          <p className="page__eyebrow">About</p>
          <h1 className="page__title" id="about-title">
            {`Hi, I’m ${profile.firstName}.`}
          </h1>
          <Copy as="p" text="PLACEHOLDER - one line that introduces you in your own words." className="page__lede" />
        </div>
        <figure className="about__portrait">
          <img src={profile.avatarSrc} alt={profile.avatarAlt} width={400} height={400} decoding="async" />
        </figure>
      </header>

      <section id="who-i-am" className="page__section" aria-labelledby="who-title">
        <header className="page__section-head">
          <span className="ed-index">01</span>
          <h2 className="page__section-title" id="who-title">
            Who I am
          </h2>
        </header>
        <hr className="ed-rule" />
        <div className="about__story">
          {STORY.map((p, i) => (
            <Copy as="p" key={i} text={p} />
          ))}
        </div>
        <h3 className="ed-eyebrow about__sub">What I value</h3>
        <ul className="svc__list" role="list">
          {VALUES.map((v, i) => (
            <Copy as="li" key={i} text={v} />
          ))}
        </ul>
        <h3 className="ed-eyebrow about__sub">The journey so far</h3>
        <ol className="journey" role="list">
          {JOURNEY.map((j, i) => (
            <li key={i} className="journey__item">
              <Copy text={j.when} className="journey__when" />
              <span className="journey__body">
                <Copy text={j.role} className="journey__role" />
                <Copy text={j.where} className="journey__where" />
                <Copy as="p" text={j.what} className="journey__what" />
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section id="how-i-think" className="page__section" aria-labelledby="think-title">
        <header className="page__section-head">
          <span className="ed-index">02</span>
          <h2 className="page__section-title" id="think-title">
            How I think
          </h2>
          <Copy as="p" text="PLACEHOLDER - one or two lines on your research, judgment and creative approach." className="page__section-lede" />
        </header>
        <hr className="ed-rule" />
        <Copy as="blockquote" text="PLACEHOLDER - an observation or principle in your own words." className="ed-quote about__quote" />
        <ol className="steps steps--five" role="list">
          {METHOD.map((m, i) => (
            <li key={m.title} className="steps__item">
              <span className="ed-index">0{i + 1}</span>
              <h3 className="steps__title">{m.title}</h3>
              <Copy as="p" text={m.body} className="steps__body" />
            </li>
          ))}
        </ol>
      </section>

      <section id="what-i-do" className="page__section" aria-labelledby="do-title">
        <header className="page__section-head">
          <span className="ed-index">03</span>
          <h2 className="page__section-title" id="do-title">
            What I do
          </h2>
        </header>
        <hr className="ed-rule" />
        <ul className="roles" role="list">
          {profile.roles.map((r, i) => (
            <li key={r} className={`roles__item${i === 0 ? ' roles__item--lead' : ''}`}>
              {i === 0 && <span className="ed-eyebrow">Lead direction</span>}
              <span className="roles__name">{r}</span>
            </li>
          ))}
        </ul>
        <p className="about__more">
          <Link to="/services">
            See the services <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </Link>
        </p>
      </section>

      <section className="page__section" aria-labelledby="dev-title">
        <header className="page__section-head">
          <span className="ed-index">04</span>
          <h2 className="page__section-title" id="dev-title">
            What I&rsquo;m developing now
          </h2>
        </header>
        <hr className="ed-rule" />
        <ul className="svc__list svc__list--dev" role="list">
          {DEVELOPING.map((d, i) => (
            <li key={i}>
              <span className="ed-label ed-label--developing">Developing</span> <Copy text={d} />
            </li>
          ))}
        </ul>
      </section>

      <section className="page__section" aria-labelledby="details-title">
        <header className="page__section-head">
          <span className="ed-index">05</span>
          <h2 className="page__section-title" id="details-title">
            Practical details
          </h2>
        </header>
        <hr className="ed-rule" />
        <dl className="details">
          {DETAILS.map((d) => (
            <div key={d.label} className="details__row">
              <dt>{d.label}</dt>
              <Copy as="dd" text={d.value} />
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
