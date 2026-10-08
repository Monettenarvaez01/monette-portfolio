import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import WorkLabelChip from './WorkLabelChip'
import type { WorkItem } from '@/data/work'

/**
 * A project as a card: label, title, one-line summary, and a link to its
 * page. The whole card is the link. `headingLevel` keeps the page outline
 * in order wherever the card is placed.
 */
export default function WorkCard({ item, headingLevel = 'h3' }: { item: WorkItem; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  return (
    <Link to={`/work/${item.slug}`} className="workcard">
      <WorkLabelChip item={item} />
      <H className="workcard__title">{item.title}</H>
      <p className="workcard__summary">{item.summary}</p>
      <span className="workcard__more">
        View project <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
      </span>
    </Link>
  )
}
