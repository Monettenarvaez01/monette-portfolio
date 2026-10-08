import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Cube, SquaresFour } from '@/components/slab'
import Lightbox from '@/components/Lightbox'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { motionReduced, A11Y_EVENT } from '@/lib/a11y'
import { LABEL_KEY, type GalleryImage } from '@/data/work'

// Three.js and the drum load only when a visitor asks for the 3D view.
const Carousel3D = lazy(() => import('@/components/Carousel3D'))

/** Where the 3D view is offered at all: a mouse or trackpad at desktop width. */
const CAPABLE = '(pointer: fine) and (hover: hover) and (min-width: 1100px)'
/** The drum repeats its cards to fill the barrel; below this it looks thin. */
const MIN_FOR_3D = 6

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Live reduced-motion: the OS setting or the site's own switch. */
function useReducedMotion(): boolean {
  const os = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [site, setSite] = useState(motionReduced)
  useEffect(() => {
    const on = () => setSite(motionReduced())
    window.addEventListener(A11Y_EVENT, on)
    return () => window.removeEventListener(A11Y_EVENT, on)
  }, [])
  return os || site
}

/**
 * A gallery of real creative pieces.
 *
 * The grid is the gallery: every image is a button with real alt text that
 * opens the lightbox, on every device. On a capable desktop with motion
 * allowed, a "3D view" toggle adds the Carousel3D drum above the grid -
 * an extra way to browse, never the only one. Renders nothing when empty.
 */
export default function WorkGallery({ items, title }: { items: GalleryImage[]; title: string }) {
  const capable = useMediaQuery(CAPABLE)
  const reduced = useReducedMotion()
  const [webgl] = useState(webglAvailable)
  const [threeD, setThreeD] = useState(false)
  const [open, setOpen] = useState<GalleryImage | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const can3D = capable && !reduced && webgl && items.length >= MIN_FOR_3D
  // Losing the conditions (window narrowed, motion switched off) closes it.
  const show3D = threeD && can3D

  const show = useCallback((item: GalleryImage, el?: HTMLElement | null) => {
    triggerRef.current = el ?? null
    setOpen(item)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  if (items.length === 0) return null

  return (
    <div className="wgallery">
      {can3D && (
        <div className="wgallery__bar">
          <button
            type="button"
            className="wgallery__toggle"
            aria-pressed={show3D}
            onClick={() => setThreeD((v) => !v)}
          >
            {show3D ? <SquaresFour size={16} aria-hidden="true" /> : <Cube size={16} aria-hidden="true" />}
            {show3D ? 'Hide 3D view' : '3D view'}
          </button>
        </div>
      )}

      {show3D && (
        <Suspense fallback={<div className="carousel3d carousel3d--loading" aria-hidden="true" />}>
          <Carousel3D items={items} onOpen={show} />
        </Suspense>
      )}

      <ul className="wgallery__grid" role="list" aria-label={title}>
        {items.map((item) => {
          const label = LABEL_KEY.find((l) => l.label === item.label)?.name
          return (
            <li key={item.id}>
              <button type="button" className="wgallery__item" onClick={(e) => show(item, e.currentTarget)} aria-haspopup="dialog">
                <span className="wgallery__frame">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                </span>
                <span className="wgallery__meta">
                  {label && <span className={`ed-label ed-label--${item.label}`}>{label}</span>}
                  <span className="wgallery__title">{item.title}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {open && <Lightbox item={open} onClose={close} />}
    </div>
  )
}
