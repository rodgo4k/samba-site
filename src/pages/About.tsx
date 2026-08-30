import { useRef } from 'react'
import { AboutMotion } from '../components/AboutMotion'
import { LangCycle } from '../components/LangCycle'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { Arrow, StoreBadges } from '../components/StoreIcons'
import { FORETHEIST, YANKEE } from '../lib/links'
import { media } from '../lib/media'
import { UseIt } from '../components/UseIt'

const FAMILY = [
  {
    k: 'This product',
    t: 'Samba',
    d: 'A marketplace for professionals: beauty, health, trades, legal, food, plus housing. Matching on skill, language, and proximity. Hire only in the app.',
    href: '/#find',
    cta: 'Find a pro',
    src: media.matchApp,
    external: false,
  },
  {
    k: 'The lab',
    t: 'Foretheist',
    d: 'Applied research lab behind Samba and Yankee. Matching, identity, and multilingual models. The infrastructure, not the storefront.',
    href: FORETHEIST,
    cta: 'Visit Foretheist',
    src: media.controlPro,
    external: true,
  },
  {
    k: 'The brother',
    t: 'Yankee',
    d: 'Chronological social: feed, chat, and crowds, with no ranking working against you. Same lab as Samba, a different job.',
    href: YANKEE,
    cta: 'Visit Yankee',
    src: media.scaleChat,
    external: true,
  },
] as const

const POINTS = [
  {
    n: '01',
    t: 'This is a marketplace, not a website',
    d: 'The page previews who is around. Chat, hire, apply, and pay only happen in Samba.',
  },
  {
    n: '02',
    t: 'Matching is cultural by design',
    d: 'Skill and proximity first. Language and background when you want them. Open to everyone.',
  },
  {
    n: '03',
    t: 'Housing is extra, with a hard rule',
    d: 'You can also rent or sell. Landlords cannot ask for more than two months’ rent.',
  },
  {
    n: '04',
    t: 'Sambinha is the interface',
    d: 'Ask in the words you use. On the site it’s a preview. In the app it stays with you.',
  },
]

const RAIL = [
  media.langWords,
  media.langChat,
  media.scaleMarkets,
  media.scaleChat,
  media.scaleHousing,
  media.matchLanguage,
  media.matchApp,
  media.controlPro,
  media.serviceHousing,
  media.housingSell,
]

export function About() {
  const root = useRef<HTMLElement>(null)

  return (
    <main ref={root} className="about-page">
      <AboutMotion root={root} />

      <section className="hero about-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">About</p>
          <h1 className="about-title enter">
            <span>We built Samba so you don’t have to translate your life.</span>
            <span className="accent">
              A marketplace for professionals, and a fairer way to rent and hire.
            </span>
          </h1>
          <ul className="about-ticks enter">
            <li>Boston, 2024</li>
            <li>Massachusetts · New Jersey</li>
            <li>Hire in the app</li>
          </ul>
        </div>
        <div className="enter">
          <Photo
            src={media.aboutHero}
            className="hero-shot"
            slot="story"
            caption="Boston, 2024. A Foretheist product"
          />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Family</p>
              <h2>Two products. One lab.</h2>
              <p className="about-lede">
                Samba sits next to Yankee. Both run on Foretheist, the applied
                research lab that builds the matching, identity, and language
                layer underneath.
              </p>
            </div>
          </Reveal>
          <div className="about-family">
            {FAMILY.map((f) => (
              <a
                key={f.t}
                className="about-family-card"
                href={f.href}
                {...(f.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Photo src={f.src} slot={f.t} className="about-family-photo" />
                <p className="eyebrow">{f.k}</p>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
                <span className="about-family-cta">
                  {f.cta}
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="about-rail" aria-hidden="true">
        <div className="about-rail-track">
          {[...RAIL, ...RAIL].map((src, i) => (
            <img key={`${src}-${i}`} src={src} alt="" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell about-story">
          <Reveal>
            <div className="about-story-visual">
              <Photo
                src={media.matchLanguage}
                slot="story-side"
                className="about-sticky-photo"
                caption="Ask in the language you already use"
              />
            </div>
          </Reveal>
          <div className="about-story-copy">
            <Reveal>
              <p className="eyebrow">Story</p>
              <h2>A plumber, a lawyer, a trainer, a haircut, without switching languages.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Samba started in Boston because finding help nearby should not
                require translating your life. We match you with professionals
                on skill and proximity first, then language and background when
                you want them.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Beauty, health, home, food, legal: the marketplace is for
                everything you hire a person to do. Housing came next, as an
                extra, with one hard rule: landlords cannot ask for more than
                two months’ rent.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                <a href={FORETHEIST} target="_blank" rel="noopener noreferrer">
                  Foretheist
                </a>{' '}
                builds the infrastructure. Samba Group LLC ships the product.
                You hire, message, apply, and list only in the app.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-langs" id="language">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Language</p>
            <h2>Ask the way you actually speak.</h2>
          </Reveal>
          <Reveal delay={80}>
            <LangCycle />
          </Reveal>
        </div>
      </section>

      <UseIt />

      <section className="about-rule">
        <div className="shell">
          <p className="eyebrow">Housing</p>
          <p className="about-rule-text">
            Never more than two months’ rent.
          </p>
          <p className="about-rule-sub">
            You can rent or sell on Samba. Applications flex with real life.
            The cap is the rule, not a suggestion.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Why</p>
              <h2>Four things we won’t compromise</h2>
            </div>
          </Reveal>
          <div className="stylized">
            {POINTS.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <article className="stylized-row">
                  <span>{p.n}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="splash">
        <Reveal>
          <div className="shell splash-split">
            <div className="splash-copy">
              <h2>The one app to get everything done.</h2>
              <p className="splash-sub">iOS and Android. Free to start.</p>
              <StoreBadges />
            </div>
            <Photo
              src={media.matchApp}
              slot="splash"
              className="splash-photo"
              caption="Get the app to hire, apply, or list"
            />
          </div>
        </Reveal>
      </section>
    </main>
  )
}
