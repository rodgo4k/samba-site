import type { CSSProperties } from 'react'

export function LineReveal({
  lines,
  as: Tag = 'h1',
  className = '',
}: {
  lines: { text: string; tone?: 'ink' | 'leaf' }[]
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <Tag className={`line-reveal ${className}`.trim()}>
      {lines.map((line, i) => (
        <span className="line" key={line.text} style={{ '--i': i } as CSSProperties}>
          <span className={line.tone === 'leaf' ? 'accent' : undefined}>{line.text}</span>
        </span>
      ))}
    </Tag>
  )
}
