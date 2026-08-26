import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'

type StaggerFrom = 'first' | 'last' | 'center' | 'random'
type RotateDirection = 'top' | 'bottom'

type Props = {
  text: string
  rotateDirection?: RotateDirection
  staggerFrom?: StaggerFrom
  staggerDuration?: number
  animation?: 'hover' | 'enter'
  play?: 'in' | 'out'
  color?: string
  className?: string
}

function staggerDelays(count: number, from: StaggerFrom, step: number) {
  if (from === 'last') {
    return Array.from({ length: count }, (_, i) => (count - 1 - i) * step)
  }
  if (from === 'center') {
    const mid = (count - 1) / 2
    return Array.from({ length: count }, (_, i) => Math.abs(i - mid) * step)
  }
  if (from === 'random') {
    const order = Array.from({ length: count }, (_, i) => i)
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    const delays = Array.from({ length: count }, () => 0)
    order.forEach((idx, rank) => {
      delays[idx] = rank * step
    })
    return delays
  }
  return Array.from({ length: count }, (_, i) => i * step)
}

const FLIP = 0.4
const ease = [0.22, 1, 0.36, 1] as const
const hidden = { y: '115%', rotateX: -80 }
const shown = { y: '0%', rotateX: 0 }
const gone = { y: '-115%', rotateX: 80 }

export function flipMs(text: string, step = 0.045, flip = FLIP) {
  const n = Math.max(Array.from(text).length, 1)
  return Math.round((n * step + flip) * 1000)
}

export function StaggerFlip({
  text,
  staggerFrom = 'first',
  staggerDuration = 0.05,
  animation = 'enter',
  play = 'in',
  color,
  className = '',
}: Props) {
  const chars = useMemo(() => Array.from(text), [text])
  const hover = animation === 'hover'
  const [ready, setReady] = useState(false)
  const erasing = play === 'out'

  useEffect(() => {
    if (hover) {
      setReady(true)
      return
    }
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setReady(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [hover])

  const delays = useMemo(
    () =>
      staggerDelays(
        chars.length,
        erasing ? 'last' : staggerFrom,
        staggerDuration,
      ),
    [chars.length, erasing, staggerFrom, staggerDuration],
  )

  const pose = erasing ? gone : ready ? shown : hidden

  return (
    <span
      className={`stagger-flip ${className}`.trim()}
      dir="auto"
      style={color ? { color } : undefined}
    >
      {chars.map((char, i) => {
        const glyph = char === ' ' ? '\u00A0' : char
        return (
          <span className="stagger-flip-char" key={`${glyph}-${i}`}>
            <span className="stagger-flip-ghost" aria-hidden="true">
              {glyph}
            </span>
            <motion.span
              className="stagger-flip-cube"
              initial={hidden}
              animate={hover ? shown : pose}
              whileHover={hover ? { rotateX: -80 } : undefined}
              transition={{
                duration: FLIP,
                ease,
                delay: delays[i],
              }}
            >
              {glyph}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
