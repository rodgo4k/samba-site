import { useEffect, useState } from 'react'
import { StaggerFlip, flipMs } from './originkit/StaggerFlip'

const LANGS = [
  'English',
  'Portuguese',
  'Spanish',
  'Chinese',
  'Haitian Creole',
] as const

const HOLD_MS = 1800
const GAP_MS = 120
const STEP = 0.045

export function LangCycle() {
  const [active, setActive] = useState(0)
  const [play, setPlay] = useState<'in' | 'out'>('in')
  const [motionOn, setMotionOn] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionOn(!reduce.matches)
    sync()
    reduce.addEventListener('change', sync)
    return () => reduce.removeEventListener('change', sync)
  }, [])

  const word = LANGS[active]

  useEffect(() => {
    if (!motionOn) return
    const write = flipMs(word, STEP)
    const erase = flipMs(word, STEP)

    const eraseAt = window.setTimeout(() => setPlay('out'), write + HOLD_MS)
    const nextAt = window.setTimeout(
      () => {
        setActive((n) => (n + 1) % LANGS.length)
        setPlay('in')
      },
      write + HOLD_MS + erase + GAP_MS,
    )

    return () => {
      window.clearTimeout(eraseAt)
      window.clearTimeout(nextAt)
    }
  }, [active, motionOn, word])

  return (
    <div className="lang-cycle">
      <div className="lang-cycle-stage" aria-live="polite" aria-atomic="true">
        {motionOn ? (
          <StaggerFlip
            key={word}
            text={word}
            play={play}
            rotateDirection="top"
            staggerFrom="first"
            staggerDuration={STEP}
            animation="enter"
          />
        ) : (
          <span>{word}</span>
        )}
      </div>
    </div>
  )
}
