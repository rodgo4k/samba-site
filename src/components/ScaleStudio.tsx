import { useState } from 'react'
import { media } from '../lib/media'

const ITEMS = [
  {
    n: '01',
    t: 'Massachusetts and New Jersey',
    d: 'Live now. Matching on skill, proximity, and language. Then more markets.',
    src: media.scaleMarkets,
  },
  {
    n: '02',
    t: 'Chat before you hire',
    d: 'Align the job in-app. No calls or texts until you decide to message.',
    src: media.scaleChat,
  },
  {
    n: '03',
    t: 'Housing, if you need it',
    d: 'You can also rent or sell. Landlords cannot ask for more than two months’ rent.',
    src: media.scaleHousing,
  },
] as const

export function ScaleStudio() {
  const [active, setActive] = useState(0)
  const item = ITEMS[active]

  return (
    <div className="scale-studio">
      <div className="section-header">
        <p className="eyebrow">Scale</p>
        <h2>Built for how people actually live here</h2>
      </div>
      <div className="scale-board">
        <figure className="scale-frame" data-slot={item.n}>
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
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
