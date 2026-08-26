import { media } from '../lib/media'
import { APP_STORE, PLAY_STORE } from '../lib/links'

const TILES = [
  {
    id: 'ios',
    label: 'iOS',
    d: 'Download Samba on the App Store.',
    src: media.ios,
    href: APP_STORE,
    external: true,
  },
  {
    id: 'android',
    label: 'Android',
    d: 'Get Samba on Google Play.',
    src: media.android,
    href: PLAY_STORE,
    external: true,
  },
  {
    id: 'sambinha',
    label: 'Sambinha',
    d: 'Ask here first. Then open the app to hire.',
    src: media.sambinha,
    href: '/#find',
    external: false,
  },
] as const

export function DevStudio() {
  return (
    <div className="start-grid">
      {TILES.map((t) => (
        <a
          key={t.id}
          className="start-tile"
          href={t.href}
          {...(t.external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <figure data-slot={t.id}>
            <img src={t.src} alt="" />
          </figure>
          <h3>{t.label}</h3>
          <p>{t.d}</p>
        </a>
      ))}
    </div>
  )
}
