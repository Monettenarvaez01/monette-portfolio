import { labelName, type WorkItem } from '@/data/work'

/** The provenance tag a project carries, e.g. "Client · Anonymized". */
export default function WorkLabelChip({ item }: { item: Pick<WorkItem, 'label' | 'labelNote'> }) {
  return (
    <span className={`ed-label ed-label--${item.label}`}>
      {labelName(item.label)}
      {item.labelNote && ` · ${item.labelNote}`}
    </span>
  )
}
