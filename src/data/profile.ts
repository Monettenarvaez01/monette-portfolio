/**
 * IDENTITY - Monette Oledan.
 *
 * Who the site is about, in one place: name, positioning, photo, contact
 * details and the Home headline. Confirmed facts are written plainly. Every
 * value that still needs Monette's own words starts with "PLACEHOLDER" and is
 * rendered with a visible dashed marker (see components/Copy.tsx), so nothing
 * unconfirmed can pass for a real claim.
 *
 * Page copy lives at the top of each page component and in src/data/.
 */

import { Clock, Translate, CalendarCheck, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  /** Leave empty until the real URL is confirmed - empty links are not rendered. */
  href: string
  iconPath: string
}

/** A practical fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  firstName: string
  /** Lead professional positioning, shown under the name. */
  role: string
  /** The four roles, lead role first. */
  roles: string[]
  /** Square image. Swap /avatar.svg for a real portrait (.webp or .png). */
  avatarSrc: string
  /** Alt text for the portrait. Describe the real photo once it is in. */
  avatarAlt: string
  email: string
  location: string
  /** Three practical facts shown on phones under the Home lede. */
  stats: Stat[]
  /** The Home headline: the value Monette brings founders. Two halves. */
  displayName: { line1: string; line2: string }
  hero: { body: string }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Monette Oledan',
  firstName: 'Monette',
  role: 'Brand & Media Strategist',
  roles: [
    'Brand & Media Strategist',
    'Executive & Creative Assistant',
    'Social Media Manager',
    'LinkedIn Ghostwriter',
  ],
  avatarSrc: '/avatar.svg',
  avatarAlt: 'Portrait of Monette Oledan (placeholder image)',
  email: 'you@example.com',
  location: 'PLACEHOLDER - city or timezone',
  stats: [
    { value: 'PLACEHOLDER', label: 'Timezone', Icon: Clock },
    { value: 'PLACEHOLDER', label: 'Working hours', Icon: CalendarCheck },
    { value: 'PLACEHOLDER', label: 'Languages', Icon: Translate },
  ],
  displayName: {
    line1: 'PLACEHOLDER - the value you bring founders,',
    line2: 'in one short line.',
  },
  hero: {
    body: 'PLACEHOLDER - one sentence on who you help (international founders) and how: strategy behind the brand, support behind the business.',
  },
  socials: [{ label: 'LinkedIn profile', href: '', iconPath: '/icons/linkedin.svg' }],
}

/** True while the email is still the template address. */
export const emailIsPlaceholder = profile.email === 'you@example.com'
