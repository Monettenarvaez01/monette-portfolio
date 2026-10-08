import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Lightbulb,
  Stack,
  NotePencil,
  EnvelopeSimple,
} from '@/components/slab'
import Copy from '@/components/Copy'
import { profile } from '@/data/profile'
import { SERVICES } from '@/data/services'
import { COLLECTIONS } from '@/data/work'

/**
 * Home's bento: one card per thing a founder needs to know, each a link to
 * where it is told in full.
 *
 *   Work          the three collections - client, independent, strategy & writing
 *   Who I am      the portrait, into About
 *   How I think   a line in Monette's own words, into About's method
 *   What I do     the four services, into Services
 *   Strategy & Writing  the notebook, into Work
 *   Let's talk    practical details, into Contact
 *
 * Nothing here invents a fact: every line is either confirmed (the names of
 * the roles and collections) or a marked placeholder. The cards are static -
 * the only motion is the shared hover lift (bento.css / apple.css).
 */

function CardHead({ Icon, title, desc }: { Icon: typeof FolderOpen; title: string; desc: string }) {
  return (
    <span className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h2 className="bento__title">{title}</h2>
      </span>
      <Copy text={desc} className="bento__desc" />
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </span>
  )
}

export default function HomeBento() {
  return (
    <nav className="bento bento--home" aria-label="Explore the portfolio">
      <Link to="/work" className="bento__card bento__card--work">
        <CardHead Icon={FolderOpen} title="Selected work" desc="PLACEHOLDER - one line on the work you share here." />
        <ul className="bento__media bento__shelf" role="list" aria-label="Work collections">
          {COLLECTIONS.map((c) => (
            <li key={c.id} className="bento__sheet">
              <span className={`ed-label ed-label--${c.label}`}>{c.short}</span>
              <span className="bento__sheet-title">{c.title}</span>
            </li>
          ))}
        </ul>
      </Link>

      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="Who I am" desc="PLACEHOLDER - one line on your story." />
        <span className="bento__media bento__portrait" aria-hidden="true">
          <img src={profile.avatarSrc} alt="" loading="lazy" decoding="async" />
        </span>
      </Link>

      <Link to="/about#how-i-think" className="bento__card bento__card--think">
        <CardHead Icon={Lightbulb} title="How I think" desc="PLACEHOLDER - draft: research, judgment and creative approach." />
        <span className="bento__media bento__quote">
          <Copy text="PLACEHOLDER - one principle you work by, in your own words." className="ed-quote" />
        </span>
      </Link>

      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="What I do" desc="PLACEHOLDER - draft: strategy first, with hands-on support behind it." />
        <ul className="bento__media bento__offers" role="list">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{s.title}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      <Link to="/work#strategy-writing" className="bento__card bento__card--writing">
        <CardHead Icon={NotePencil} title="Strategy & Writing" desc="PLACEHOLDER - one line on what you write about." />
        <span className="bento__media bento__lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </Link>

      <Link to="/contact" className="bento__card bento__card--contact">
        <CardHead Icon={EnvelopeSimple} title="Let's talk" desc="PLACEHOLDER - draft: questions, availability and how to reach me." />
        <dl className="bento__media bento__facts">
          {profile.stats.map((s) => (
            <div key={s.label} className="bento__fact">
              <dt>{s.label}</dt>
              <Copy as="dd" text={s.value} />
            </div>
          ))}
        </dl>
      </Link>
    </nav>
  )
}
