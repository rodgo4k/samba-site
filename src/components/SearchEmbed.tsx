import { useState } from 'react'
import { CATEGORIES } from '../data/professionals'
import { portrait } from '../lib/media'
import { searchSamba, type SearchResult } from '../lib/search'
import { StoreIcons } from './StoreIcons'

type Turn = { q: string; a: SearchResult | null }

export function SearchEmbed({
  onCategory,
}: {
  onCategory?: (id: string | null) => void
}) {
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [turn, setTurn] = useState<Turn | null>(null)
  const [hired, setHired] = useState<string | null>(null)
  const [pop, setPop] = useState<string | null>(null)

  async function run(q: string, cat?: string) {
    const query = q.trim()
    if (!query || busy) return
    setHired(null)
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
          <strong>Sambinha</strong>
          <span>Ask in your words. Hire in the app.</span>
        </div>
      </div>

      <div className="ask-log">
        {!turn && !busy && (
          <p className="bubble bot">
            What do you need? A cut, a trainer, a leak, a chef.
          </p>
        )}
        {turn && (
          <p className="bubble user" key={turn.q}>
            {turn.q}
          </p>
        )}
        {busy && (
          <p className="bubble bot wait" aria-label="Sambinha is matching">
            Matching nearby
            <i className="dots" />
          </p>
        )}
        {turn?.a && <Result a={turn.a} hired={hired} onHire={setHired} />}
      </div>

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
          </button>
        ))}
      </div>

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
          placeholder="A Portuguese-speaking cleaner in Boston…"
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

function Result({
  a,
  hired,
  onHire,
}: {
  a: SearchResult
  hired: string | null
  onHire: (id: string) => void
}) {
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
      <ul className="pros">
        {a.pros.map((p, i) => (
          <li key={p.id} style={{ animationDelay: `${i * 70}ms` }}>
            <img src={p.photo ?? portrait(p.id)} alt="" width={40} height={40} />
            <div>
              <strong>{p.name}</strong>
              <span>
                {p.profession}
                {p.languages[0] ? ` · ${p.languages[0]}` : ''}
              </span>
            </div>
            {hired === p.id ? (
              <StoreIcons />
            ) : (
              <button type="button" className="hire" onClick={() => onHire(p.id)}>
                Hire
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
