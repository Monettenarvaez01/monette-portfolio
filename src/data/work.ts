/**
 * WORK - the portfolio, in three collections.
 *
 *   client       Client Work            commissioned, shared with permission
 *   independent  Independent Projects   self-initiated real work
 *   writing      Strategy & Writing     strategic analyses, concept briefs, essays
 *
 * Every project carries a provenance label (brand.css `.ed-label--*`) so a
 * visitor always knows whether a piece was commissioned, self-initiated or a
 * concept. The project lists are EMPTY on purpose: entries are added only
 * from real work Monette supplies and has permission to show.
 */

/** The provenance label a project shows. Matches the .ed-label--* classes. */
export type WorkLabel = 'client' | 'independent' | 'concept' | 'essay'

export type CollectionId = 'client' | 'independent' | 'writing'

export type Collection = {
  id: CollectionId
  /** URL fragment on /work. */
  anchor: string
  /** Full collection title, used as the section heading. */
  title: string
  /** Shorter name for navigation (Work contents, Home cards). */
  navLabel: string
  /** The label its cards carry by default. */
  label: WorkLabel
  intro: string
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'client',
    anchor: 'client-work',
    title: 'Client Work',
    navLabel: 'Client Work',
    label: 'client',
    intro: 'PLACEHOLDER - one or two lines introducing your commissioned work.',
  },
  {
    id: 'independent',
    anchor: 'independent-projects',
    title: 'Independent Projects',
    navLabel: 'Independent Projects',
    label: 'independent',
    intro: 'PLACEHOLDER - one or two lines introducing your self-initiated work.',
  },
  {
    id: 'writing',
    anchor: 'strategy-writing',
    title: 'Strategy & Writing',
    navLabel: 'Ideas & Writing',
    label: 'concept',
    intro: 'PLACEHOLDER - one or two lines on how you think through brand, audience and voice.',
  },
]

/** What each provenance label means, shown as a key on the Work page. */
export const LABEL_KEY: { label: WorkLabel; name: string; meaning: string }[] = [
  { label: 'client', name: 'Client', meaning: 'Commissioned work, shared with permission.' },
  { label: 'independent', name: 'Independent', meaning: 'Self-initiated work.' },
  { label: 'concept', name: 'Concept', meaning: 'A strategy exercise or spec piece, not commissioned.' },
  { label: 'essay', name: 'Essay', meaning: 'Writing and thinking.' },
]

/** One image in a creative gallery. `alt` describes the image itself. */
export type GalleryImage = {
  id: string
  src: string
  alt: string
  title: string
  label: WorkLabel
  caption?: string
}

/** A titled group of responsibilities on a project page. */
export type ResponsibilityGroup = { title: string; items: string[] }

export type WorkItem = {
  slug: string
  collection: CollectionId
  label: WorkLabel
  /** Shown after the label, e.g. "Anonymized" for a client kept private. */
  labelNote?: string
  title: string
  /** One line on what it is and Monette's role. Used on cards. */
  summary: string
  /** Shown on Home; also in a Featured strip on Work once two or more are featured. */
  featured?: boolean
  /** Who the work was for, as it may be shown publicly. */
  client: string
  /** Monette's actual role, exactly as approved. */
  role: string
  dates: string
  responsibilities: ResponsibilityGroup[]
  /**
   * Conditions still open before this project may go live. While any remain,
   * the page shows them as a marked placeholder note.
   */
  pending?: string[]
  /** Optional cover image - only with the client's permission. */
  cover?: GalleryImage
}

/**
 * Projects cleared for publication, newest first. Add only real work Monette
 * has supplied and approved (docs/content-inventory.md), with every condition
 * confirmed and permission in writing where a client is involved.
 */
const APPROVED_WORK: WorkItem[] = []

/**
 * Private, unpublished projects. Each is a file in src/data/private/, which
 * is gitignored: client details never enter the repository. They load only in
 * `npm run dev` or a review build made with VITE_SHOW_UNPUBLISHED=true. In a
 * normal build the folder is not read at all (the glob below sits behind a
 * compile-time constant), so nothing private can reach the shipped files.
 */
export const SHOW_UNPUBLISHED = import.meta.env.DEV || import.meta.env.VITE_SHOW_UNPUBLISHED === 'true'

const PRIVATE_WORK: WorkItem[] = SHOW_UNPUBLISHED
  ? Object.values(import.meta.glob<{ default: WorkItem[] }>('./private/*.ts', { eager: true })).flatMap((m) => m.default)
  : []

export const WORK: WorkItem[] = [...APPROVED_WORK, ...PRIVATE_WORK]

/**
 * Collections shown publicly. Client Work stays hidden until there is at least
 * one approved client project (Scenario B: no client work is described
 * without written permission). The other collections always show.
 */
export const VISIBLE_COLLECTIONS = COLLECTIONS.filter((c) => c.id !== 'client' || WORK.some((w) => w.collection === 'client'))
/** The label key, without the Client label while no client work is shown. */
export const VISIBLE_LABEL_KEY = LABEL_KEY.filter((k) => k.label !== 'client' || WORK.some((w) => w.label === 'client'))

export const workBySlug = (slug: string | undefined) => WORK.find((w) => w.slug === slug)
export const FEATURED_WORK = WORK.filter((w) => w.featured)
export const labelName = (label: WorkLabel) => LABEL_KEY.find((k) => k.label === label)?.name ?? ''

/**
 * Creative pieces for the visual gallery on /work (social posts, carousels,
 * graphics). Shown as an accessible grid, with an optional 3D view on
 * capable desktops. Empty until real, permissioned images are supplied.
 */
export const CREATIVE_GALLERY: GalleryImage[] = []
