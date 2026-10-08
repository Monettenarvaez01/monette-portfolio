import type { ElementType, ReactNode } from 'react'
import { isPlaceholder } from '@/lib/placeholder'

/**
 * A piece of copy that marks itself while it is still a placeholder.
 *
 * Text starting with "PLACEHOLDER" gets the dashed `.ed-placeholder` marker
 * (brand.css). Replace the string with approved copy and the marker goes
 * away on its own - no class to remember to remove.
 */
export default function Copy({
  text,
  as: Tag = 'span',
  className = '',
  children,
}: {
  text: string
  as?: ElementType
  className?: string
  children?: ReactNode
}) {
  const marked = isPlaceholder(text)
  const cls = [className, marked ? 'ed-placeholder' : ''].filter(Boolean).join(' ')
  return (
    <Tag className={cls || undefined} data-placeholder={marked || undefined}>
      {text}
      {children}
    </Tag>
  )
}
