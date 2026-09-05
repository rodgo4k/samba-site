import { useRef } from 'react'
import { AboutMotion } from '../components/AboutMotion'
import { LangCycle } from '../components/LangCycle'
import { Reveal } from '../components/Reveal'
import { FamilyStudio } from '../components/FamilyStudio'
import { SplashCta } from '../components/SplashCta'
import { FORETHEIST } from '../lib/links'
import { media } from '../lib/media'
import { UseIt } from '../components/UseIt'

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
    t: 'Samba AI is the interface',
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

      <section className="about-intro">
        <div className="shell about-intro-stage enter">
          <figure className="about-intro-frame">
            <img src={media.aboutHero} alt="" width={1024} height={681} />
            <figcaption>Boston, 2024</figcaption>
          </figure>
          <div className="about-intro-copy">
            <p className="eyebrow">About</p>
            <p className="about-intro-mark" aria-hidden="true">
              2024
            </p>
            <h1>We built Samba so you don’t have to translate your life.</h1>
            <p className="about-intro-sub">
              A marketplace for professionals, and a fairer way to rent and
              hire.
            </p>
            <ul className="about-intro-facts">
              <li>
                <span>Founded</span>
                Boston, 2024
              </li>
              <li>
                <span>Live now</span>
                Massachusetts · New Jersey
              </li>
              <li>
                <span>Hire</span>
                In the app
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <FamilyStudio />
          </Reveal>
        </div>
      </section>

      <section className="about-rail" aria-hidden="true">
        <div className="about-rail-track">
          {[...RAIL, ...RAIL].map((src, i) => (
            <img key={`${src}-${i}`} src={src} alt="" />
          ))}
        </div>
      </section>

      <section className="section about-essay">
        <div className="shell about-essay-grid">
          <Reveal>
            <p className="eyebrow">Story</p>
            <h2>
              A plumber, a lawyer, a trainer, a haircut, without switching
              languages.
            </h2>
          </Reveal>
          <div className="about-essay-read">
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
            <p className="about-lede">
              English, Portuguese, Spanish, Chinese, and Haitian Creole.
            </p>
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

      <SplashCta />
    </main>
  )
}
