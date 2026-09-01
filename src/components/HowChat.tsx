import { useEffect, useRef, useState } from 'react'
import { StoreIcons } from './StoreIcons'

const GREET = 'What do you need? A room, a cut, a trainer, a leak, a chef.'
const USER = 'I need a room in Somerville.'
const BOT =
  'Rooms live in the app. Landlords cannot ask for more than two months’ rent. Open Samba to browse.'

const HOLD = 4000
const MATCH = 2000

type Item =
  | { id: string; role: 'bot' | 'user'; text: string }
  | { id: string; role: 'wait' }
  | { id: string; role: 'reply'; text: string }

const GREET_ITEM: Item = { id: 'greet', role: 'bot', text: GREET }
const USER_ITEM: Item = { id: 'user', role: 'user', text: USER }
const WAIT_ITEM: Item = { id: 'wait', role: 'wait' }
const REPLY_ITEM: Item = { id: 'reply', role: 'reply', text: BOT }

function renderItem(item: Item) {
  if (item.role === 'wait') {
    return (
      <p key={item.id} className="bubble bot wait">
        Matching nearby
        <i className="dots" />
      </p>
    )
  }
  if (item.role === 'reply') {
    return (
      <div key={item.id} className="ask-out">
        <p className="bubble bot">{item.text}</p>
        <StoreIcons />
      </div>
    )
  }
  return (
    <p key={item.id} className={`bubble ${item.role}`}>
      {item.text}
    </p>
  )
}

export function HowChat() {
  const root = useRef<HTMLDivElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Item[]>([GREET_ITEM])

  useEffect(() => {
    const el = log.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [items])

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setItems([GREET_ITEM, USER_ITEM, REPLY_ITEM])
      return
    }

    let timers: number[] = []
    let running = false

    const clear = () => {
      timers.forEach((id) => window.clearTimeout(id))
      timers = []
    }

    const play = () => {
      clear()
      setItems([GREET_ITEM])
      timers = [
        window.setTimeout(() => setItems([GREET_ITEM, USER_ITEM]), HOLD),
        window.setTimeout(
          () => setItems([GREET_ITEM, USER_ITEM, WAIT_ITEM]),
          HOLD * 2,
        ),
        window.setTimeout(
          () => setItems([GREET_ITEM, USER_ITEM, REPLY_ITEM]),
          HOLD * 2 + MATCH,
        ),
        window.setTimeout(play, HOLD * 3 + MATCH),
      ]
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!running) {
            running = true
            play()
          }
        } else {
          running = false
          clear()
          setItems([GREET_ITEM])
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      clear()
    }
  }, [])

  return (
    <div ref={root} className="how-chat ask-panel" aria-hidden="true">
      <div className="ask-head">
        <img src="/favicon.png" alt="" width={28} height={28} />
        <div>
          <strong>Samba AI</strong>
          <span>Ask in your words. Hire in the app.</span>
        </div>
      </div>
      <div ref={log} className="ask-log">
        {items.map(renderItem)}
      </div>
    </div>
  )
}
