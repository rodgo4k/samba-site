import { useEffect, useRef, useState, type ReactNode } from 'react'

const CARDS = [
  {
    tone: 'leaf',
    tag: 'hire',
    icon: 'ask',
    q: 'Ask in the words you already use. Samba AI previews who is around.',
    name: 'Samba AI',
    role: 'The interface',
  },
  {
    tone: 'night',
    tag: 'hire',
    icon: 'id',
    q: 'Professionals are identity-checked before they show up.',
    name: 'Identity',
    role: 'Hire in the app',
  },
  {
    tone: 'mist',
    tag: 'hire',
    icon: 'pin',
    q: 'Skill and proximity first. Language when you want it.',
    name: 'Matching',
    role: 'Massachusetts and New Jersey',
  },
  {
    tone: 'leaf',
    tag: 'hire',
    icon: 'app',
    q: 'Nothing books here. Hire, message, and apply only in Samba.',
    name: 'The app',
    role: 'Clients and pros',
  },
  {
    tone: 'night',
    tag: 'housing',
    icon: 'home',
    q: 'You can also rent or sell. Landlords cannot ask for more than two months’ rent.',
    name: 'Housing',
    role: 'The two-month cap',
  },
  {
    tone: 'mist',
    tag: 'housing',
    icon: 'file',
    q: 'Applications flex with real life. Paystubs, ITIN, letters. Not only a FICO score.',
    name: 'Apply',
    role: 'Housing in the app',
  },
  {
    tone: 'leaf',
    tag: 'hire',
    icon: 'chat',
    q: 'Chat in the app before you hire. No calls or texts until you decide to message.',
    name: 'Chat',
    role: 'Hire when you are ready',
  },
  {
    tone: 'night',
    tag: 'hire',
    icon: 'speak',
    q: 'Ask the way you actually speak. The rest of the job stays in Samba.',
    name: 'Language',
    role: 'From the site to the app',
  },
  {
    tone: 'mist',
    tag: 'hire',
    icon: 'grid',
    q: 'Beauty, health, home, food, legal: everything you hire a person to do.',
    name: 'The work',
    role: 'One marketplace',
  },
] as const

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'hire', label: 'Hire' },
  { id: 'housing', label: 'Housing' },
] as const

function Glyph({ name }: { name: (typeof CARDS)[number]['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  const paths: Record<(typeof CARDS)[number]['icon'], ReactNode> = {
    ask: <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.2A8 8 0 0 1 4 12Z" />,
    id: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="10" cy="12" r="2" />
        <path d="M14 11h4M14 15h3" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    app: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M10 18h4" />
      </>
    ),
    home: (
      <>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10.5V20h12v-9.5" />
      </>
    ),
    file: (
      <>
        <path d="M7 3h7l5 5v13H7Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    chat: (
      <>
        <path d="M5 6h14v9H8l-3 3V6Z" />
        <path d="M8 10h8M8 13h5" />
      </>
    ),
    speak: (
      <>
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a6 6 0 0 1 0 10" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </>
    ),
  }
  return <svg {...common}>{paths[name]}</svg>
}

export function WhyRail() {
  const rail = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const cards = CARDS.filter((c) => filter === 'all' || c.tag === filter)

  useEffect(() => {
    const el = rail.current
    if (!el) return

    let hold = false
    let moved = false
    let x = 0
    let left = 0

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      hold = true
      moved = false
      x = e.clientX
      left = el.scrollLeft
      el.classList.add('is-drag')
      el.setPointerCapture(e.pointerId)
    }

    const move = (e: PointerEvent) => {
      if (!hold) return
      const dx = e.clientX - x
      if (Math.abs(dx) > 3) moved = true
      el.scrollLeft = left - dx
    }

    const up = () => {
      hold = false
      el.classList.remove('is-drag')
    }

    const click = (e: Event) => {
      if (moved) e.preventDefault()
    }

    const wheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return
      const next = el.scrollLeft + e.deltaY + e.deltaX
      const max = el.scrollWidth - el.clientWidth
      if (next <= 0 && el.scrollLeft <= 0) return
      if (next >= max && el.scrollLeft >= max) return
      e.preventDefault()
      el.scrollLeft = next
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('click', click, true)
    el.addEventListener('wheel', wheel, { passive: false })

    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('click', click, true)
      el.removeEventListener('wheel', wheel)
    }
  }, [filter])

  useEffect(() => {
    rail.current?.scrollTo({ left: 0 })
  }, [filter])

  return (
    <section className="why-band">
      <div className="shell">
        <div className="why-head">
          <p className="eyebrow">Product</p>
          <h2>A marketplace with a few hard lines.</h2>
        </div>
      </div>
      <div className="why-rail" ref={rail}>
        <div className="why-rail-track">
          {cards.map((c) => (
            <article key={c.name} className={`why-card is-${c.tone}`}>
              <span className="why-card-mark">
                <Glyph name={c.icon} />
              </span>
              <p className="why-card-q">“{c.q}”</p>
              <footer>
                <div>
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </div>
                <i />
              </footer>
            </article>
          ))}
        </div>
      </div>
      <div className="shell">
        <div className="why-filters" role="tablist" aria-label="Product cards">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? 'on' : ''}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
