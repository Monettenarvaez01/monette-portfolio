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
  title: string
  /** Short form for labels. */
  short: string
  /** The label its cards carry by default. */
  label: WorkLabel
  intro: string
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'client',
    anchor: 'client-work',
    title: 'Client Work',
    short: 'Client',
    label: 'client',
    intro: 'PLACEHOLDER - one or two lines introducing your commissioned work.',
  },
  {
    id: 'independent',
    anchor: 'independent-projects',
    title: 'Independent Projects',
    short: 'Independent',
    label: 'independent',
    intro: 'PLACEHOLDER - one or two lines introducing your self-initiated work.',
  },
  {
    id: 'writing',
    anchor: 'strategy-writing',
    title: 'Strategy & Writing',
    short: 'Strategy',
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

export type WorkItem = {
  slug: string
  collection: CollectionId
  label: WorkLabel
  title: string
  /** One line on what it is and Monette's role. */
  summary: string
  /** Optional cover image. */
  cover?: GalleryImage
}

/** Projects, newest first. Add only real work Monette has supplied. */
export const WORK: WorkItem[] = []

/**
 * Creative pieces for the visual gallery on /work (social posts, carousels,
 * graphics). Shown as an accessible grid, with an optional 3D view on
 * capable desktops. Empty until real, permissioned images are supplied.
 */
export const CREATIVE_GALLERY: GalleryImage[] = []
