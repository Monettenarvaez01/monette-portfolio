import { tools } from '@/data/tools'

/**
 * The tools band on Home: a static, wrapping list. It does not move, so it
 * needs no pause control and reads the same to every visitor.
 */
export default function ToolsList() {
  return (
    <ul className="tools-list" role="list" aria-label="Tools I work with">
      {tools.map((t) => (
        <li key={t.name} className="tools-list__item">
          {t.iconPath && (
            <img className="tools-list__icon" src={t.iconPath} alt="" width={20} height={20} loading="lazy" decoding="async" />
          )}
          {t.name}
        </li>
      ))}
    </ul>
  )
}
