import { media } from '../lib/media'

const TILES = [
  {
    id: 'words',
    label: 'Your words',
    d: 'Ask in English, Portuguese, Spanish, Chinese, and Haitian Creole. Samba AI reads it the way you said it.',
    src: media.langWords,
  },
  {
    id: 'match',
    label: 'Language when you want it',
    d: 'Skill and proximity first. Language and background when they matter to the job.',
    src: media.langMatch,
  },
  {
    id: 'chat',
    label: 'Chat in a language you share',
    d: 'Align the job with a pro nearby, in the app. No calls or texts until you decide to message.',
    src: media.langChat,
  },
] as const

export function DevStudio() {
  return (
    <div className="start-grid">
      {TILES.map((t) => (
        <article key={t.id} className="start-tile">
          <figure data-slot={t.id}>
            <img src={t.src} alt="" />
          </figure>
          <h3>{t.label}</h3>
          <p>{t.d}</p>
        </article>
      ))}
    </div>
  )
}
