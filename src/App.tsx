import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import QuickMenu from '@/components/QuickMenu'
import Rail from '@/components/Rail'
import AccessMenu from '@/components/AccessMenu'
import { useIsPhone } from '@/hooks/useMediaQuery'
import { SCROLLER_ID } from '@/lib/shell'

/**
 * The shell. It owns everything that outlives a route change: the profile
 * rail (desktop), the tab bar and quick menu (phone), the accessibility
 * panel, and the one scrolling panel each route renders into.
 *
 * Every page scrolls. On desktop the panel is the scroller; below the phone
 * breakpoint the shell dissolves and the document scrolls instead.
 */
export default function App() {
  const { pathname } = useLocation()
  // Below the shell breakpoint the rail is gone: a bottom tab bar navigates,
  // and the QuickMenu (theme + accessibility) floats top-right on every page
  // but Home, whose profile header carries it.
  const phone = useIsPhone()
  const panelRef = useRef<HTMLElement>(null)

  // A new page starts at the top. The panel is the desktop scroller, so it
  // has to be reset by hand; the document covers phones.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // From the first route change on, a page that mounts fades up into place
  // (mobile-pass.css). Not on first load, so the first paint is immediate.
  // Layout effect: set before paint, or the new page flashes at full opacity.
  const firstPath = useRef(pathname)
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.classList.add('has-navigated')
  }, [pathname])

  return (
    <>
      <a href={`#${SCROLLER_ID}`} className="skip-link">Skip to main content</a>
      {phone && pathname !== '/' && <QuickMenu className="qmenu--float" />}
      <div className="shell">
        <Rail />
        <main ref={panelRef} id={SCROLLER_ID} className="shell__panel" tabIndex={-1}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      {phone && <TabBar />}
      <AccessMenu />
    </>
  )
}
