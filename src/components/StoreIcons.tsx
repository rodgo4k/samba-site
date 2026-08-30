import { SiApple, SiGoogleplay } from 'react-icons/si'
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

export function Apple({ size = 14 }: { size?: number }) {
  return <SiApple size={size} aria-hidden />
}

export function Play({ size = 14 }: { size?: number }) {
  return <SiGoogleplay size={size} aria-hidden />
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
        <Apple size={15} />
        App Store
      </a>
      <a className="btn btn-ghost" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
        <Play size={15} />
        Google Play
      </a>
    </div>
  )
}
