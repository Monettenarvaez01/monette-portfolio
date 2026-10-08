import { profile } from '@/data/profile'

/**
 * Contact submission.
 *
 * Out of the box there is no backend: submitLead() opens the visitor's mail
 * client with a message addressed to profile.email (src/data/profile.ts).
 *
 * To wire a real backend (Formspree, a serverless function, a webhook...):
 *   1. Set VITE_CONTACT_ENDPOINT in .env.production to the URL that accepts
 *      a JSON POST of the Lead type below.
 *   2. Have it answer 2xx on success, or a non-2xx with { "error": "..." }
 *      and that sentence is shown to the visitor as-is.
 * With the variable unset the mail client path below is used instead.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''
export const RECIPIENT = profile.email

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Characters stripped from every field, checked by code point rather than a
// regex literal (a control-character regex is exactly what no-control-regex
// exists to flag, and here the stripping is the point):
//   - C0 controls U+0000-U+001F and DEL U+007F. In the message, tab (U+0009),
//     LF (U+000A) and CR (U+000D) survive so line breaks are kept.
//   - Zero-width and bidi marks: U+200B-U+200F, U+202A-U+202E, U+2060, U+FEFF.
const TAB = 0x09
const LF = 0x0a
const CR = 0x0d

function isControl(code: number, allowNewlines: boolean): boolean {
  if (allowNewlines && (code === TAB || code === LF || code === CR)) return false
  return code <= 0x1f || code === 0x7f
}

function isInvisibleMark(code: number): boolean {
  return (
    (code >= 0x200b && code <= 0x200f) ||
    (code >= 0x202a && code <= 0x202e) ||
    code === 0x2060 ||
    code === 0xfeff
  )
}

export function sanitize(input: string, allowNewlines = false): string {
  let out = ''
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0
    if (!isControl(code, allowNewlines) && !isInvisibleMark(code)) out += ch
  }
  return out
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  /** Honeypot. Empty for a person; your backend should drop anything else. */
  website: string
}

export type SubmitResult = { via: 'webhook' } | { via: 'mailto' }

/** Read, trim, cap and sanitise the four fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new SubmitError(body?.error || `The server answered ${res.status}.`)
    }
    return { via: 'webhook' }
  }

  const subject = `Project inquiry from ${lead.firstName} ${lead.lastName}`
  const body = [`Name: ${lead.firstName} ${lead.lastName}`, `Email: ${lead.email}`, '', lead.message].join('\n')
  // encodeURIComponent on every value blocks header injection (CR/LF) and
  // parameter smuggling via & or ?.
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
