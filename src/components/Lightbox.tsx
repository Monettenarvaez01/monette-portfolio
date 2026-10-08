import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@/components/slab'
import { LABEL_KEY, type GalleryImage } from '@/data/work'

/**
 * One gallery image, full size, in a modal dialog.
 *
 * Escape, the close button or a click on the backdrop closes it; focus moves
 * to the close button on open, stays inside the dialog while it is open, and
 * goes back to whatever opened it (the caller restores it).
 */
export default function Lightbox({ item, onClose }: { item: GalleryImage; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const label = LABEL_KEY.find((l) => l.label === item.label)?.name

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab inside the dialog.
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <figure className="lightbox__figure">
        <img className="lightbox__img" src={item.src} alt={item.alt} />
        <figcaption className="lightbox__caption">
          {label && <span className={`ed-label ed-label--${item.label}`}>{label}</span>}
          <span className="lightbox__title" id="lightbox-title">
            {item.title}
          </span>
          {item.caption && <span className="lightbox__note">{item.caption}</span>}
        </figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  )
}
