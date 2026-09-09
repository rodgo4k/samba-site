import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { media } from '../lib/media'
import { StoreBadges } from './StoreIcons'

gsap.registerPlugin(ScrollTrigger)

const FLOWS = [
  {
    id: 'rent',
    label: 'Rent a room',
    desc: 'Browse rooms in the app. Samba forbids asking for more than two months of rent.',
    src: media.serviceRoom,
    cap: 'A room, never more than two months’ rent',
  },
  {
    id: 'sell',
    label: 'Sell a home',
    desc: 'List a room or a house in front of the same people already hiring a pro.',
    src: media.housingSell,
    cap: 'List a home to the same community',
  },
  {
    id: 'apply',
    label: 'Flexible apply',
    desc: 'Paystubs, ITIN, letters. Not only a FICO score. Applications flex in the app.',
    src: media.housingApply,
    cap: 'Apply with the papers you actually have',
  },
] as const

type Tab = (typeof FLOWS)[number]['id']

export function HousingStudio() {
  const root = useRef<HTMLDivElement>(null)
  const tabRef = useRef<Tab>('rent')
  const [tab, setTab] = useState<Tab>('rent')
  const [pinned, setPinned] = useState(false)
  const current = FLOWS.find((f) => f.id === tab) ?? FLOWS[0]

  useEffect(() => {
    tabRef.current = tab
  }, [tab])

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setPinned(true)

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top+=68',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const next =
          FLOWS[Math.min(FLOWS.length - 1, Math.floor(self.progress * FLOWS.length))]
            ?.id ?? 'rent'
        if (next !== tabRef.current) setTab(next)
      },
    })

    return () => st.kill()
  }, [])

  function goTo(id: Tab) {
    setTab(id)
    const el = root.current
    if (!el || !pinned) return
    const i = FLOWS.findIndex((f) => f.id === id)
    const start = window.scrollY + el.getBoundingClientRect().top
    const range = el.offsetHeight - window.innerHeight
    if (range <= 0) return
    window.scrollTo({
      top: start + ((i + 0.4) / FLOWS.length) * range,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={root} className={`housing-scroll${pinned ? ' is-pinned' : ''}`}>
      <div className="shell housing-scroll-sticky">
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
                  onClick={() => goTo(f.id)}
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
              <img
                key={f.id}
                src={f.src}
                alt=""
                className={tab === f.id ? 'on' : ''}
              />
            ))}
            <figcaption className="photo-chip">{current.cap}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
