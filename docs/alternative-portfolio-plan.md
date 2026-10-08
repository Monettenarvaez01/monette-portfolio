# Alternative portfolio plan - if client content cannot be shown

This plan keeps the portfolio strong without any client media. **Scenario B is the default** until there is written permission to describe or showcase client work. The plan also works alongside a client case study if permission arrives later.

## Approved priorities (Monette)

| # | Project | Collection · Label | Source material |
|---|---|---|---|
| 1 | **Building My Personal Brand** | Independent Projects · Independent | Real LinkedIn posts, positioning decisions, experiments, audience observations, analytics - [intake](intake-personal-brand.md) |
| 2 | **Monette Visual Brand Identity** | Independent Projects · Independent | Navy, coral, cream and neutral identity (the site's own system) |
| 3 | **Video Editing & Repurposing** | Independent Projects · Independent | Only footage Monette owns or has permission to use |
| 4 | **Founder Content Strategy Concept** | Strategy & Writing · Concept | A fictional founder; clearly labeled hypothetical |

Personal brand experiments are never presented as client campaigns, and no performance results are invented.

## Ground rules

- **Client media stays private.** No client videos, graphics, captions, screenshots, logos, documents or prospect data in the repository or on the site. Keep any client files in `private/` on your own machine; that folder is ignored by git.
- **The client case study stays private.** Its details live only in the gitignored folder `src/data/private/` and in Monette's own records - never in the repository. A normal production build does not read that folder (see "Publishing gate" below).
- **Concept work is never presented as paid client work.** Every concept carries the Concept label, says it was not commissioned, and uses a fictional brand (or states plainly that it is unaffiliated).
- **Everything shown is yours or properly licensed.** Your own photos, footage, writing and designs, or stock/music/fonts whose license allows portfolio use. Keep a note of each license.
- **No invented results.** Independent and concept work show process and craft, not performance. Your own LinkedIn numbers are shown exactly, with date ranges.

## The two scenarios

| | A. Description permitted, media not | B. Nothing permitted |
|---|---|---|
| Client case study | Text-only page goes live (dates confirmed) | Stays unpublished; not mentioned by name or industry |
| About / experience | Role and responsibilities listed | Left out, or a generic line only if Monette chooses - no client, industry or market details |
| Services evidence | The client role + the samples below | The samples below only |

Either way, the four tracks below become the visual core of the Work page.

---

## Track 1 - Independent graphic design samples (priority 1)

**Collection:** Independent Projects · **Label:** Independent (your own brand) or Concept (a fictional brand)

**What to make:** a small, coherent set rather than many one-offs.

| Piece | What it shows | Format |
|---|---|---|
| Your own brand kit | Color, type and layout decisions for Monette Oledan | 1 overview page + 3 example posts |
| A carousel series (5-8 slides) | Turning an idea into a sequence | 4:5, 1080 × 1350 px |
| Instagram story sequence (4-6 frames) | Pacing and hierarchy | 9:16, 1080 × 1920 px |
| Quote / insight cards (3-4) | Typography and brand consistency | 1:1 or 4:5 |
| Before / after redesign of your own older post | Revision judgment | Two images side by side |

**For each piece I need:** the file, the brief you set yourself (one line), the tools used, one line on a design decision, and alt text.

**On the site:** the accessible gallery grid with a lightbox; the optional 3D view becomes available once there are 6 or more images.

---

## Track 2 - Original video editing and repurposing demos (priority 2)

**Collection:** Independent Projects · **Label:** Independent

**Source footage options (in order of preference):**
1. Video you record yourself - talking to camera about your work, a screen recording of your process, b-roll you shoot.
2. Licensed stock footage whose license permits portfolio use (note the license).
3. Long-form content under a license that allows derivatives (e.g. Creative Commons BY), credited as required.

**Demos to make:**

| Demo | What it shows | Output |
|---|---|---|
| Long-form to short-form | One 5-15 min recording cut into 3 short clips | 3 vertical clips (9:16, 15-60 s) |
| Captioned edit | Subtitles, pacing, hook in the first seconds | 1 vertical clip |
| Carousel from video | Turning spoken points into a static carousel | 5-8 slides |
| Edit breakdown | Why you cut where you cut | A short written note with timestamps |

**On the site:** a poster image + short clip per demo, captions on, no autoplay with sound; a text breakdown beside it. Hosting the video files themselves is a launch-prep decision (they are large; a video host may be better than the repository).

---

## Track 3 - Your own LinkedIn writing and personal brand (priority 3)

**Collection:** Independent Projects ("Building My Personal Brand") and Strategy & Writing (individual posts/essays) · **Labels:** Independent; Essay

This is the intake already in `docs/content-inventory.md`: starting point, goal, positioning decisions, content experiments, analytics (exact, dated), writing samples, lessons.

**Why it matters:** it is the strongest real evidence for Brand & Media Strategy and LinkedIn Ghostwriting, because it shows decisions and outcomes you own - described as applied to your own brand, not a client's.

---

## Track 4 - Concept projects (priority 4)

**Collection:** Strategy & Writing · **Label:** Concept - "A strategy exercise or spec piece, not commissioned."

**Rules for every concept:**
- A fictional founder or brand, clearly named as fictional; or, if a real public brand is used, the page says "Unsolicited concept - not affiliated with or commissioned by [brand]." Fictional is safer and recommended.
- No results, testimonials or metrics - concepts have none.
- Show the thinking: brief, research, decisions, the work, what you would test.

**Suggested concepts** (pick two or three; each built from your own research and writing):

| Concept | Shows | Deliverables |
|---|---|---|
| LinkedIn voice and content plan for a fictional founder | Voice capture, positioning, ghostwriting | Voice notes, 3 content pillars, 4-week calendar, 3 sample posts |
| Brand presence audit of a fictional founder-led consultancy | Strategic judgment | Audit findings, priorities, a 30-day plan |
| Repurposing plan for one long-form video | Content strategy + editing | Clip map, captions, carousel |

*Avoid any concept that resembles a past or current client's business, so it can't be read as their work.*

---

## How the site adapts (no structural rebuild needed)

| Area | If client media is never permitted |
|---|---|
| Home "Selected work" | Features your strongest independent project (e.g. personal brand or design set) |
| Work page | Independent Projects and Strategy & Writing carry the visuals; Client Work shows the text-only case (scenario A) or the "no projects" note is replaced with a single line or the section is hidden (scenario B - your call) |
| Creative gallery | Filled with Track 1 and Track 2 images |
| Services | "What I do" lines link to the independent sample that proves them |
| About | Experience section follows scenario A or B above |

## Publishing gate (already in place)

- Unpublished projects are files in `src/data/private/` (gitignored). They load only in `npm run dev` and in a private review build made with `VITE_SHOW_UNPUBLISHED=true npm run build`.
- A normal `npm run build` never reads that folder - verified with the private file present: the built files contain none of its text.
- Client Work is hidden on the public site while it has no approved projects.
- A project moves to `APPROVED_WORK` in `src/data/work.ts` only when every condition is confirmed.

## Suggested order

1. Personal brand project (Track 3) - you already have the material.
2. Graphic design set (Track 1) - your own brand kit first, so later pieces share one visual system.
3. One long-form-to-short-form video demo (Track 2).
4. One concept project (Track 4), then more as time allows.

## What I need from you to start

- Track 3: the personal-brand intake (any part of it).
- Track 1: which pieces you already have, and which you'd like to make.
- Track 2: whether you have your own footage, or would like to record some.
- Track 4: which concept(s) appeal to you, and the fictional brand name(s) you'd like to use.
