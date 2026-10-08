/**
 * SERVICES - what Monette offers.
 *
 * The four service names follow her confirmed roles. Everything else is a
 * PLACEHOLDER until she supplies the copy. Brand & Media Strategy leads: it
 * is the primary direction, and the other three are the hands-on support
 * behind it.
 *
 * Any capability that is still being developed (not yet delivered for a
 * client) goes in `developing`, never in `includes` - the page tags it so.
 */

export type Service = {
  id: string
  title: string
  /** The role this service comes from. */
  role: string
  /** One line: what this is, for whom. */
  summary: string
  /** Who it is for. */
  audience: string
  /** What Monette does - only responsibilities she has actually carried. */
  includes: string[]
  /** Capabilities being built, shown with a "Developing" tag. */
  developing: string[]
  /** Typical deliverables. */
  deliverables: string[]
}

const PH_LIST = ['PLACEHOLDER - item one', 'PLACEHOLDER - item two', 'PLACEHOLDER - item three']

export const SERVICES: Service[] = [
  {
    id: 'strategy',
    title: 'Brand & Media Strategy',
    role: 'Brand & Media Strategist',
    summary: 'PLACEHOLDER - one line on how you help a founder decide what to say, where, and why.',
    audience: 'PLACEHOLDER - who this is for.',
    includes: PH_LIST,
    developing: ['PLACEHOLDER - a strategic capability you are developing'],
    deliverables: PH_LIST,
  },
  {
    id: 'assistance',
    title: 'Executive & Creative Assistance',
    role: 'Executive & Creative Assistant',
    summary: 'PLACEHOLDER - one line on the support you give behind the business.',
    audience: 'PLACEHOLDER - who this is for.',
    includes: PH_LIST,
    developing: [],
    deliverables: PH_LIST,
  },
  {
    id: 'social',
    title: 'Social Media Management',
    role: 'Social Media Manager',
    summary: 'PLACEHOLDER - one line on how you run a founder’s social presence.',
    audience: 'PLACEHOLDER - who this is for.',
    includes: PH_LIST,
    developing: [],
    deliverables: PH_LIST,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Ghostwriting',
    role: 'LinkedIn Ghostwriter',
    summary: 'PLACEHOLDER - one line on how you write in a founder’s voice.',
    audience: 'PLACEHOLDER - who this is for.',
    includes: PH_LIST,
    developing: [],
    deliverables: PH_LIST,
  },
]

/** How an engagement runs. Step names are a draft for Monette to confirm. */
export const PROCESS: { title: string; body: string }[] = [
  { title: 'Enquiry', body: 'PLACEHOLDER - what happens when a founder first writes.' },
  { title: 'Discovery call', body: 'PLACEHOLDER - what you cover on the first call.' },
  { title: 'Onboarding', body: 'PLACEHOLDER - voice, access and priorities.' },
  { title: 'Ongoing rhythm', body: 'PLACEHOLDER - how you work week to week and check in.' },
]
