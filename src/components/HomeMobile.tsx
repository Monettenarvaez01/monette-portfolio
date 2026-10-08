import { Link } from 'react-router-dom'
import { FolderOpen, Stack, Lightbulb, User, EnvelopeSimple, type Icon } from '@/components/slab'
import Copy from '@/components/Copy'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

/**
 * Home on a phone, the parts the rail and the bento carry on desktop:
 *
 *   HomeProfile  avatar, name, lead role and the QuickMenu (theme +
 *                accessibility) - the rail's identity block, laid flat
 *   HomeStats    three practical facts (profile.stats)
 *   HomeExplore  one tile per part of the story, in a snap row
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">{profile.name}</span>
        <span className="hprofile__handle">{profile.role}</span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }) => (
        <li key={label}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <Copy as="b" text={value} className="hstats__value" />
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

type Tile = { n: string; label: string; to: string; title: string; desc: string; Icon: Icon; accent?: boolean }

const TILES: Tile[] = [
  { n: '01', label: 'Work', to: '/work', title: 'Selected work', desc: 'PLACEHOLDER - one line on the work you share.', Icon: FolderOpen },
  { n: '02', label: 'Services', to: '/services', title: 'What I do', desc: 'PLACEHOLDER - draft: strategy first, with hands-on support behind it.', Icon: Stack },
  { n: '03', label: 'About', to: '/about#how-i-think', title: 'How I think', desc: 'PLACEHOLDER - draft: research, judgment and creative approach.', Icon: Lightbulb, accent: true },
  { n: '04', label: 'About', to: '/about', title: `Hi, I’m ${profile.firstName}.`, desc: 'PLACEHOLDER - one line on your story.', Icon: User },
  { n: '05', label: 'Contact', to: '/contact', title: 'Let’s talk', desc: 'PLACEHOLDER - draft: questions, availability and how to reach me.', Icon: EnvelopeSimple },
]

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to + t.n}>
            <Link to={t.to} className={`htile${t.accent ? ' htile--accent' : ''}`}>
              <span className="htile__media htile__glyph">
                <t.Icon size={52} weight="duotone" aria-hidden="true" />
              </span>
              <span className="htile__body">
                <span className="htile__n">
                  {t.n} {t.label}
                </span>
                <span className="htile__title">{t.title}</span>
                <Copy text={t.desc} className="htile__desc" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
