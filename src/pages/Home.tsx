import { Collage } from '../components/Collage'
import { DevStudio } from '../components/DevStudio'
import { HowShutter } from '../components/HowShutter'
import { HousingStudio } from '../components/HousingStudio'
import { MatchStudio } from '../components/MatchStudio'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { SearchEmbed } from '../components/SearchEmbed'
import { SpatialSlider } from '../components/SpatialSlider'
import { StoreBadges } from '../components/StoreIcons'
import { WhyRail } from '../components/WhyRail'
import { media } from '../lib/media'
import { useState } from 'react'

const SCALE = [
  {
    t: 'Massachusetts and New Jersey',
    d: 'Live now. Matching on skill, proximity, and language. Then more markets.',
    src: media.scaleMarkets,
  },
  {
    t: 'Chat before you hire',
    d: 'Align the job in-app. No calls or texts until you decide to message.',
    src: media.scaleChat,
  },
  {
    t: 'Housing, if you need it',
    d: 'You can also rent or sell. Landlords cannot ask for more than two months’ rent.',
    src: media.scaleHousing,
  },
]

export function Home() {
  const [focusId, setFocusId] = useState<string | null>(null)

  return (
    <main>
      <section className="hero" id="find">
        <div className="shell hero-split">
          <div className="hero-visual">
            <Collage focusId={focusId} />
          </div>
          <div className="hero-copy">
            <h1 className="hero-title enter">
              <span>Rent, hire, and get everything in one place.</span>
              <span className="accent">
                Housing, rooms, health, food, legal, and more.{' '}
                <span className="hero-title-app">Find all in one app.</span>
              </span>
            </h1>
            <div className="enter hero-ask">
              <SearchEmbed onCategory={setFocusId} />
              <p className="hero-note">
                No calls or texts until you message a pro in the app.{' '}
                <a href="/#housing">Need a room?</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section spatial-band" id="services">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Services</p>
              <h2>What you can find in the app</h2>
            </div>
          </Reveal>
        </div>
        <SpatialSlider />
      </section>

      <section className="section" id="matching">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Matching</p>
              <h2>Pros, language, and one app</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <MatchStudio />
          </Reveal>
        </div>
      </section>

      <section className="section" id="housing">
        <div className="shell">
          <Reveal>
            <HousingStudio />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell control">
          <Reveal>
            <div>
              <div className="section-header left">
                <p className="eyebrow">Control</p>
                <h2>Identity-checked pros, then hire in the app</h2>
              </div>
              <ul className="plain-list">
                <li>Professionals are identity-checked before they show up</li>
                <li>Chat in the app before you hire. No calls or texts first</li>
                <li>Hiring happens in Samba, not on this website</li>
                <li>If you rent, landlords cannot ask for more than two months’ rent</li>
              </ul>
              <StoreBadges />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <aside className="id-card">
              <Photo src={media.controlPro} slot="control" className="id-photo" />
              <div className="id-card-row">
                <div>
                  <strong>Checked in</strong>
                  <span>Identity · Massachusetts · New Jersey</span>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd>Live</dd>
                </div>
                <div>
                  <dt>Hire</dt>
                  <dd>In the app</dd>
                </div>
                <div>
                  <dt>Cap</dt>
                  <dd>2 months rent</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      <WhyRail />

      <HowShutter />

      <section className="section" id="start">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Language</p>
              <h2>Ask the way you already speak</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <DevStudio />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-header">
              <p className="eyebrow">Scale</p>
              <h2>Built for how people actually live here</h2>
            </div>
          </Reveal>
          <div className="card-grid text-cards">
            {SCALE.map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <article className="text-card">
                  <Photo src={c.src} slot={c.t} className="card-photo" />
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
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
              <h2>
                The one app to get everything done.
                <br />
                Get it today.
              </h2>
              <StoreBadges />
            </div>
            <Photo
              src={media.splash}
              slot="splash"
              className="splash-photo"
              caption="Hire, apply, and list in the app"
            />
          </div>
        </Reveal>
      </section>
    </main>
  )
}
