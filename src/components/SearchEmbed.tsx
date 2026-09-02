import { useState } from 'react'
import { CATEGORIES, type Professional } from '../data/professionals'
import { storeUrl } from '../lib/links'
import { media, portrait } from '../lib/media'
import { searchSamba, type SearchResult } from '../lib/search'
import { StoreIcons } from './StoreIcons'

const CAT_LABEL: Record<string, string> = {
  cleaning: 'House cleaning',
  beauty: 'Hair & beauty',
  fitness: 'Health & fitness',
  food: 'Private chef',
  legal: 'Immigration',
  trades: 'Trades',
  housing: 'Housing',
}

const CAT_THUMB: Record<string, string> = {
  cleaning: media.serviceCleaning,
  beauty: media.serviceHair,
  fitness: media.serviceFitness,
  food: media.serviceChef,
  legal: media.serviceLegal,
  trades: media.serviceHome,
  housing: media.serviceHousing,
}

type Turn = { q: string; a: SearchResult | null }

const PLACEHOLDERS = [
  'An English-speaking cleaner in Boston…',
  'A Portuguese-speaking cleaner in Boston…',
  'A Spanish-speaking cleaner in Boston…',
  'A Chinese-speaking cleaner in Boston…',
  'A Haitian Creole-speaking cleaner in Boston…',
] as const

export function SearchEmbed({
  onCategory,
}: {
  onCategory?: (id: string | null) => void
}) {
  const [placeholder] = useState(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
  )
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [turn, setTurn] = useState<Turn | null>(null)
  const [pop, setPop] = useState<string | null>(null)

  async function run(q: string, cat?: string) {
    const query = q.trim()
    if (!query || busy) return
    setActive(cat ?? null)
    onCategory?.(cat ?? null)
    setTurn({ q: query, a: null })
    setValue('')
    if (cat) {
      setPop(cat)
      window.setTimeout(() => setPop(null), 520)
    }
    setBusy(true)
    const wait = new Promise((r) => window.setTimeout(r, 640))
    const [a] = await Promise.all([searchSamba(query), wait])
    setTurn({ q: query, a })
    setBusy(false)
  }

  return (
    <div className={`ask-panel ask-hero${turn || busy ? ' is-open' : ''}`}>
      <div className="ask-head">
        <img src="/favicon.png" alt="" width={36} height={36} />
        <div>
          <strong>Samba</strong>
          <span>Ask in your words. Hire in the app.</span>
        </div>
      </div>

      <div className="ask-log">
        {!turn && !busy && (
          <p className="bubble bot">
            What do you need? A room, a cut, a trainer, a leak, a chef.
          </p>
        )}
        {turn && (
          <p className="bubble user" key={turn.q}>
            {turn.q}
          </p>
        )}
        {busy && (
          <p className="bubble bot wait" aria-label="Samba AI is matching">
            Matching nearby
            <i className="dots" />
          </p>
        )}
        {turn?.a && <Result a={turn.a} />}
      </div>

      {!turn?.a && (
        <div className="cats" role="list">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="listitem"
              className={`cat${active === c.id ? ' on' : ''}${pop === c.id ? ' pop' : ''}`}
              onClick={() => run(c.label, c.id)}
            >
              {c.label}
              {'fresh' in c && c.fresh ? <span className="new-pill">New</span> : null}
            </button>
          ))}
        </div>
      )}

      <form
        className="embed-form"
        onSubmit={(e) => {
          e.preventDefault()
          void run(value)
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Find a pro"
          autoComplete="off"
        />
        <button type="submit" disabled={busy || !value.trim()}>
          Find a pro
        </button>
      </form>
    </div>
  )
}

function Result({ a }: { a: SearchResult }) {
  if (a.kind === 'text' || a.kind === 'housing') {
    return (
      <div className="ask-out">
        <p className="bubble bot">{a.text}</p>
        <StoreIcons />
      </div>
    )
  }

  return (
    <div className="ask-out">
      <p className="bubble bot">{a.text}</p>
      <ul className="pro-cards">
        {a.pros.map((p, i) => (
          <li key={p.id} style={{ animationDelay: `${i * 70}ms` }}>
            <ProCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const DEMO_META: Record<string, { miles: string; rating: string }> = {
  p1: { miles: '0.8 mi', rating: '5' },
  p4: { miles: '1.4 mi', rating: '5' },
  p10: { miles: '2.1 mi', rating: '4' },
  p13: { miles: '1.1 mi', rating: '5' },
}

function OutLink() {
  return (
    <svg className="pro-card-out" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M10 7h7v7"
      />
    </svg>
  )
}

function Star() {
  return (
    <svg className="pro-card-star" width="12" height="12" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.6 14.7 8l6 .9-4.3 4.2 1 5.9L12 16.2 6.6 19l1-5.9L3.3 8.9 9.3 8z"
      />
    </svg>
  )
}

function ProCard({ p }: { p: Professional }) {
  const extra = DEMO_META[p.id]
  return (
    <a
      className="pro-card"
      href={storeUrl()}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="pro-card-photo">
        <img src={p.photo ?? CAT_THUMB[p.category] ?? portrait(p.id)} alt="" />
      </span>
      <div className="pro-card-body">
        <p className="pro-card-name">
          <strong>{p.name}</strong>
          <OutLink />
        </p>
        <p className="pro-card-row">
          <span>{CAT_LABEL[p.category] ?? p.category}</span>
          <span className={`pro-tag ${p.category}`}>{p.profession}</span>
        </p>
        <p className="pro-card-foot">
          <span>
            {p.city}
            {extra ? ` · ${extra.miles}` : ''}
          </span>
          {extra ? (
            <span className="pro-card-rate">
              <Star />
              {extra.rating}
            </span>
          ) : null}
        </p>
      </div>
    </a>
  )
}
