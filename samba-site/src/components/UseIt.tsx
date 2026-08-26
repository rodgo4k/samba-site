import { useState } from 'react'
import { media } from '../lib/media'

const COVERS = [
  { t: 'Hair & beauty', src: media.beauty },
  { t: 'Health & fitness', src: media.fitness },
  { t: 'Private chef', src: media.chef },
  { t: 'Home & trades', src: media.kitchen },
  { t: 'Legal', src: media.control },
  { t: 'Housing', src: media.rent, fresh: true },
] as const

export function UseIt() {
  const [on, setOn] = useState(0)
  const current = COVERS[on]

  return (
    <section className="about-use">
      <div className="shell">
        <div className="about-use-intro">
          <p className="eyebrow">Use it for</p>
          <h2>Whatever you’d hire a person to do</h2>
          <p className="about-lede">
            Beauty, health, home, food, legal, then housing if you need a room.
            Preview here. Hire, apply, and list only in the app.
          </p>
        </div>
        <div className="about-use-pair">
          <figure className="about-use-preview" aria-label={current.t}>
            <div className="about-use-frame" data-parallax>
              {COVERS.map((c, i) => (
                <img
                  key={c.src}
                  src={c.src}
                  alt=""
                  className={i === on ? 'on' : ''}
                />
              ))}
            </div>
            <figcaption>
              <span>{String(on + 1).padStart(2, '0')}</span>
              {current.t}
            </figcaption>
          </figure>
          <ol className="about-use-list">
            {COVERS.map((c, i) => (
              <li key={c.t}>
                <button
                  type="button"
                  className={i === on ? 'on' : ''}
                  onMouseEnter={() => setOn(i)}
                  onFocus={() => setOn(i)}
                >
                  <span className="about-use-n">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="about-use-t">
                    {c.t}
                    {'fresh' in c && c.fresh ? (
                      <span className="new-pill">New</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
