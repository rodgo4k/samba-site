import { Reveal } from './Reveal'
import { media } from '../lib/media'

const CARDS = [
  {
    t: 'Language-first matching',
    d: 'Skill and proximity first. Language and background when you want them.',
    src: media.language,
    cap: 'Community, in more than one language',
  },
  {
    t: 'Verified professionals',
    d: 'Identity-checked profiles. Chat in the app before you hire.',
    src: media.verified,
    cap: 'A professional you can actually meet',
  },
  {
    t: 'One app',
    d: 'Beauty, home, health, legal, food, and housing if you need it. Hire in Samba, not here.',
    src: media.app,
    cap: 'The rest happens on your phone',
  },
]

export function MatchStudio() {
  return (
    <div className="card-grid">
      {CARDS.map((c, i) => (
        <Reveal key={c.t} delay={i * 120}>
          <article className="m-card">
            <figure className="m-graphic" data-slot={c.t} data-parallax>
              <img src={c.src} alt="" />
              <figcaption>{c.cap}</figcaption>
            </figure>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
