# Monette Oledan - Portfolio

The portfolio site of Monette Oledan, Brand & Media Strategist, with hands-on experience in executive and creative support, social media and LinkedIn writing. It is built for international founders: who Monette is, how she thinks, what she does, and real examples of her work.

Adapted from the [BrewedOps portfolio template](https://github.com/brewed-ops/portfolio-template) under its own-portfolio permission (see [License](#license)).

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, React Router 7, Phosphor icons, Fraunces + Poppins (self-hosted). Three.js loads only for the optional 3D gallery view.

## Pages

| Route | Page |
|---|---|
| `/` | Home - the value headline and a bento of Selected work, Who I am, How I think, What I do, Strategy & Writing, Let's talk |
| `/work` | Work - Client Work, Independent Projects, Strategy & Writing; every piece carries a provenance label |
| `/services` | Services - Brand & Media Strategy first, then the hands-on services and how an engagement runs |
| `/about` | About - story, how I think, what I do, what I'm developing, practical details |
| `/contact` | Contact - FAQs and an email form (opens the visitor's email app) |
| `/projects` | Redirects to `/work` |

## Content rules

- Every unconfirmed line starts with **PLACEHOLDER** and shows a dashed coral outline on the page (`src/components/Copy.tsx`). Replace the text and the marker disappears on its own.
- No invented biography, clients, results, testimonials, tools, metrics or samples. Work is added only from real pieces Monette supplies, with permission to share.
- Work labels: Client (commissioned), Independent (self-initiated), Concept (not commissioned), Essay. Capabilities still being built are tagged Developing.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint       # ESLint with the TypeScript parser and the React hooks rules
```

## Where things live

| What | Where |
|---|---|
| Name, role, photo, email, socials, Home headline, practical facts | `src/data/profile.ts` |
| Services and the engagement steps | `src/data/services.ts` |
| Work collections, projects and the creative gallery | `src/data/work.ts` |
| Tools (the Home band shows once the list is not empty) | `src/data/tools.ts` |
| FAQs | `src/data/faqs.ts` |
| Page copy | the top of `HomeBento`, `HomeMobile`, `WorkPage`, `ServicesPage`, `AboutPage`, `ContactGrid` in `src/components/` |
| Contact | `src/lib/contact.ts` (email app by default; no third-party form service is connected) |
| Colors and type | `src/styles/tokens.css`, `src/styles/brand.css` |
| SEO, share image, favicon | `index.html`, `public/favicon.svg` |

## Notes

- Every page scrolls. On desktop the panel beside the profile rail is the scroller; below 1100px the document scrolls and a bottom tab bar navigates (`src/styles/mobile-app.css`, `src/styles/mobile-pass.css`).
- Motion is deliberately small: a short fade-in, small scroll reveals, hover lifts, a brief theme switch. All of it respects `prefers-reduced-motion` and the site's own Reduce motion switch.
- The 3D gallery (`Carousel3D`) is optional. It is offered only on a desktop with a mouse or trackpad, with motion allowed, WebGL available and at least six gallery images, and it loads only when the visitor asks for it. The accessible grid is always there.

## Content

All page content comes from [`docs/content-inventory.md`](docs/content-inventory.md). Only items marked Approved there are published; everything else stays a visible placeholder. If client content can't be shown, see [`docs/alternative-portfolio-plan.md`](docs/alternative-portfolio-plan.md).

- **Unpublished projects** are files in `src/data/private/` (ignored by git). They show in `npm run dev` and in a private review build (`VITE_SHOW_UNPUBLISHED=true npm run build`); a normal `npm run build` never reads them.
- **Client details and media** never go in the repository. Keep them in `private/` or `src/data/private/` (both ignored by git).

## Pre-launch checklist

- [ ] Every PLACEHOLDER replaced with approved copy, or the section removed (`grep -rn PLACEHOLDER src index.html`)
- [ ] Each project has its label, Monette's role, and permission to share; results only with evidence
- [ ] Real portrait and alt text; email and LinkedIn URL set
- [ ] Privacy page written and checked; site description and share image set
- [ ] `npm run build` and `npm run lint` clean
- [ ] Desktop test (1280-1920px): keyboard only, light and dark
- [ ] **Tablet test** (iPad portrait 768-834px and landscape 1024-1194px; Android tablet ~800px): navigation, tab bar, bento, Work gallery, Contact form. Tablets below 1100px currently get the phone layout - confirm it reads well or adjust the breakpoint
- [ ] Phone test (iPhone ~390px, small Android ~360px): tab bar, no sideways scroll, text size 200%
- [ ] Screen reader pass (VoiceOver and NVDA) on all five pages
- [ ] Reduced motion (OS setting and the site switch) on all five pages
- [ ] Automated accessibility check (axe) clean on all five pages, both themes
- [ ] 3D gallery: offered only on desktop with motion allowed; grid and lightbox work without it
- [ ] Normal build (no `VITE_SHOW_UNPUBLISHED`): nothing from `src/data/private/` ships
- [ ] No client media in `public/` or anywhere in the repository
- [ ] LICENSE and attribution notices intact

## Credits

- Template: [BrewedOps portfolio template](https://github.com/brewed-ops/portfolio-template). Its contour background (inspired by the landonorris.com site by OFF+BRAND, simplex noise by Ashima Arts / Ian McEwan, MIT) has been removed from this adaptation.
- Icons: [Phosphor](https://phosphoricons.com) (MIT). Any tool or platform logos in `public/icons/` are trademarks of their owners.
- Fonts: Fraunces and Poppins (SIL Open Font License), self-hosted via Fontsource.

## License

[PolyForm Noncommercial 1.0.0](LICENSE), plus one extra permission: you can use it for **your own** portfolio, even if that portfolio promotes your paid services.

What it does not allow without a commercial license: selling or reselling this template, or building portfolio sites for other people for payment. For a commercial license, email brewedops@gmail.com.

Versions up to tag `v1.0.0-mit` (commit d3c05da) were MIT and stay MIT. Everything after that is under the license above.
