import { useState } from 'react'
import { FORETHEIST, YANKEE } from '../lib/links'
import { Arrow } from './StoreIcons'

const ITEMS = [
  {
    n: '01',
    t: 'Samba',
    d: 'A marketplace for professionals: beauty, health, trades, legal, food, plus housing. Matching on skill, language, and proximity. Hire only in the app.',
    href: '/#find',
    cta: 'Find a pro',
    src: '/brand/samba-green.png',
    external: false,
  },
  {
    n: '02',
    t: 'Foretheist',
    d: 'Applied research lab behind Samba and Yankee. Matching, identity, and multilingual models. The infrastructure, not the storefront.',
    href: FORETHEIST,
    cta: 'Visit Foretheist',
    src: '/brand/foretheist.png',
    external: true,
  },
  {
    n: '03',
    t: 'Yankee',
    d: 'Chronological social: feed, chat, and crowds, with no ranking working against you. Same lab as Samba, a different job.',
    href: YANKEE,
    cta: 'Visit Yankee',
    src: '/brand/yankee.png',
    external: true,
  },
] as const

export function FamilyStudio() {
  const [active, setActive] = useState(0)
  const item = ITEMS[active]

  return (
    <div className="scale-studio">
      <div className="section-header">
        <p className="eyebrow">Family</p>
        <h2>Two products. One lab.</h2>
        <p className="about-lede">
          Samba sits next to Yankee. Both run on Foretheist, the applied
          research lab that builds the matching, identity, and language layer
          underneath.
        </p>
      </div>
      <div className="scale-board">
        <figure className="scale-frame is-logo" data-slot={item.n}>
          {ITEMS.map((entry, i) => (
            <img
              key={entry.n}
              src={entry.src}
              alt=""
              className={i === active ? 'on' : undefined}
            />
          ))}
        </figure>
        <ol className="scale-index">
          {ITEMS.map((entry, i) => (
            <li key={entry.n}>
              <button
                type="button"
                className={i === active ? 'on' : undefined}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <span>{entry.n}</span>
                <strong>{entry.t}</strong>
                <p>{entry.d}</p>
              </button>
              <a
                className="scale-index-cta"
                href={entry.href}
                {...(entry.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {entry.cta}
                <Arrow />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
