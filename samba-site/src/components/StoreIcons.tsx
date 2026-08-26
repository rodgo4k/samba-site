import { APP_STORE, PLAY_STORE } from '../lib/links'

export function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 25 25" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.72 24.22c-.27-.32-.4-.73-.37-1.14.04-.42.24-.8.55-1.07l7.34-6.18H2.34a1.67 1.67 0 0 1-1.35-2.56 1.67 1.67 0 0 1 1.35-.78h16.9L11.94 6.53a1.67 1.67 0 0 1 2.01-2.41l9.1 7.72a2.9 2.9 0 0 1 0 4.86l-9.1 7.73a1.67 1.67 0 0 1-2.23-.21z"
      />
    </svg>
  )
}

function Apple({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c1-.1.7-1.9 1.8-3.1-1.6-.7-1.9-2.3-1.9-2.3zm-2-6.3c.6-.8 1.1-1.9.9-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4z"
      />
    </svg>
  )
}

function Play({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.3 21.3V2.7c0-.7.8-1.1 1.4-.7l14.3 9.3c.6.4.6 1.3 0 1.7L5.7 22c-.6.4-1.4 0-1.4-.7z"
      />
    </svg>
  )
}

export function StoreIcons({ size = 14 }: { size?: number }) {
  return (
    <span className="store-icons">
      <a href={APP_STORE} target="_blank" rel="noopener noreferrer" aria-label="App Store">
        <Apple size={size} />
      </a>
      <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" aria-label="Google Play">
        <Play size={size} />
      </a>
    </span>
  )
}

export function StoreBadges() {
  return (
    <div className="hero-actions">
      <a className="btn btn-leaf" href={APP_STORE} target="_blank" rel="noopener noreferrer">
        App Store
        <Arrow />
      </a>
      <a className="btn btn-ghost" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
        Google Play
      </a>
    </div>
  )
}
