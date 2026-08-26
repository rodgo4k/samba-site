import { useState } from 'react'
import { media } from '../lib/media'
import { StoreBadges } from './StoreIcons'

const FLOWS = [
  {
    id: 'rent',
    label: 'Rent a room',
    desc: 'Browse rooms in the app. Samba forbids asking for more than two months of rent.',
    src: media.rent,
    cap: 'A room, never more than two months’ rent',
  },
  {
    id: 'sell',
    label: 'Sell a home',
    desc: 'List a room or a house in front of the same people already hiring a pro.',
    src: media.sell,
    cap: 'List a home to the same community',
  },
  {
    id: 'apply',
    label: 'Flexible apply',
    desc: 'Paystubs, ITIN, letters. Not only a FICO score. Applications flex in the app.',
    src: media.apply,
    cap: 'Apply with the papers you actually have',
  },
] as const

export function HousingStudio() {
  const [tab, setTab] = useState<(typeof FLOWS)[number]['id']>('rent')
  const current = FLOWS.find((f) => f.id === tab) ?? FLOWS[0]

  return (
    <div className="flows">
      <div className="flows-copy">
        <div className="section-header">
          <p className="eyebrow">Housing</p>
          <h2>Housing is on Samba too, without the deposit trap</h2>
        </div>
        <div className="flow-tabs">
          {FLOWS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={tab === f.id ? 'on' : ''}
              onClick={() => setTab(f.id)}
            >
              <span>{f.label}</span>
              {tab === f.id && <small>{f.desc}</small>}
            </button>
          ))}
        </div>
        <StoreBadges />
      </div>
      <figure className="photo-stage" data-slot={tab} data-parallax>
        {FLOWS.map((f) => (
          <img key={f.id} src={f.src} alt="" className={tab === f.id ? 'on' : ''} />
        ))}
        <figcaption className="photo-chip">{current.cap}</figcaption>
      </figure>
    </div>
  )
}
