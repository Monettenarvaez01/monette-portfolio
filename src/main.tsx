import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import { restorePrefs } from '@/lib/a11y'

// Every route but Home is its own chunk: the first visit only pays for Home.
const WorkPage = lazy(() => import('@/components/WorkPage'))
const ServicesPage = lazy(() => import('@/components/ServicesPage'))
const AboutPage = lazy(() => import('@/components/AboutPage'))
const ContactGrid = lazy(() => import('@/components/ContactGrid'))
const Privacy = lazy(() => import('@/components/Privacy'))
import './styles/tokens.css'
import './styles/global.css'
import './styles/theme-glyph.css'
import './styles/shell.css'
import './styles/rail.css'
import './styles/home.css'
import './styles/bento.css'
import './styles/pages.css'
import './styles/work.css'
import './styles/contact-grid.css'
import './styles/legal.css'
import './styles/mobile-app.css'
import './styles/a11y.css'
// Apple design pass - an overlay on everything above.
import './styles/apple.css'
// Mobile motion + component pass on top of it (phone shell only).
import './styles/mobile-pass.css'
// Last: the brand layer (headline serif, editorial pieces, work labels).
import './styles/brand.css'

// Re-apply the visitor's accessibility switches before the first paint.
restorePrefs()

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The shell owns the rail, the tab bar and the scrolling panel;
            each child renders into that panel. */}
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          {/* The template's old Projects route now lives at /work. */}
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactGrid />} />
        </Route>
        {/* Standalone pages: their own layout, no rail, document scroll. */}
        <Route path="/privacy" element={<Suspense fallback={null}><Privacy /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
