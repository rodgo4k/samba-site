import { useEffect, useRef, useState } from 'react'
import { StoreIcons } from './StoreIcons'

const HOST_1 = 'The room in Somerville is still open.'
const USER = 'I’ll take it. Confirm for next week.'
const HOST_2 =
  'Confirmed. Apply in Samba. Landlords cannot ask for more than two months’ rent.'

const HOLD = 4000
const MATCH = 2000

type Item =
  | { id: string; role: 'bot' | 'user'; text: string }
  | { id: string; role: 'wait' }
  | { id: string; role: 'reply'; text: string }

const OPEN_ITEM: Item = { id: 'open', role: 'bot', text: HOST_1 }
const USER_ITEM: Item = { id: 'user', role: 'user', text: USER }
const WAIT_ITEM: Item = { id: 'wait', role: 'wait' }
const DONE_ITEM: Item = { id: 'done', role: 'reply', text: HOST_2 }

function renderItem(item: Item) {
  if (item.role === 'wait') {
    return (
      <p key={item.id} className="bubble bot wait">
        Typing
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

export function HowConfirm() {
  const root = useRef<HTMLDivElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Item[]>([OPEN_ITEM])

  useEffect(() => {
    const el = log.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [items])

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setItems([OPEN_ITEM, USER_ITEM, DONE_ITEM])
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
      setItems([OPEN_ITEM])
      timers = [
        window.setTimeout(() => setItems([OPEN_ITEM, USER_ITEM]), HOLD),
        window.setTimeout(
          () => setItems([OPEN_ITEM, USER_ITEM, WAIT_ITEM]),
          HOLD * 2,
        ),
        window.setTimeout(
          () => setItems([OPEN_ITEM, USER_ITEM, DONE_ITEM]),
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
          setItems([OPEN_ITEM])
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
          <strong>Room in Somerville</strong>
          <span>Chat in the app. In your language.</span>
        </div>
      </div>
      <div ref={log} className="ask-log">
        {items.map(renderItem)}
      </div>
    </div>
  )
}
