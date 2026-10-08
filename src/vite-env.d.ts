/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string
  readonly VITE_TURNSTILE_SITE_KEY: string
  /** "true" includes projects still waiting on confirmation (private review builds only). */
  readonly VITE_SHOW_UNPUBLISHED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
