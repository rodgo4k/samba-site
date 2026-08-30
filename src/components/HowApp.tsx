import type { CSSProperties } from 'react'

const WORD = { src: '/brand/wordmark-tight.png', w: 295, h: 67 }

const LETTERS = [
  { x: 0, w: 59 },
  { x: 59, w: 55 },
  { x: 114, w: 81 },
  { x: 195, w: 54 },
  { x: 249, w: 46 },
] as const

export function HowApp() {
  return (
    <div className="how-app" aria-hidden="true">
      <p className="how-app-word">
        {LETTERS.map((letter, i) => (
          <span
            key={letter.x}
            style={
              {
                '--i': i,
                '--lx': letter.x,
                '--lw': letter.w,
              } as CSSProperties
            }
          >
            <img src={WORD.src} alt="" width={WORD.w} height={WORD.h} />
          </span>
        ))}
      </p>
    </div>
  )
}
