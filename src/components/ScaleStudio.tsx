import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineHome,
  HiOutlineMapPin,
} from 'react-icons/hi2'

gsap.registerPlugin(CustomEase)
if (!CustomEase.get('osmo')) {
  CustomEase.create('osmo', '0.625, 0.05, 0, 1')
}

const ITEMS: {
  n: string
  t: string
  d: string
  icon: ReactNode
}[] = [
  {
    n: '01',
    t: 'Massachusetts and New Jersey',
    d: 'Live now. Matching on skill, proximity, and language. Then more markets.',
    icon: <HiOutlineMapPin />,
  },
  {
    n: '02',
    t: 'Chat before you hire',
    d: 'Align the job in-app. No calls or texts until you decide to message.',
    icon: <HiOutlineChatBubbleLeftRight />,
  },
  {
    n: '03',
    t: 'Housing, if you need it',
    d: 'You can also rent or sell. Landlords cannot ask for more than two months’ rent.',
    icon: <HiOutlineHome />,
  },
]

const HOLD = 4.2

export function ScaleStudio() {
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStaticMode(true)
      return
    }

    const slides = gsap.utils.toArray<HTMLElement>('[data-scale-slide]', el)
    const fills = gsap.utils.toArray<HTMLElement>('[data-scale-fill]', el)
    const n = slides.length
    let current = 0
    let hold: gsap.core.Tween | null = null
    let flip: gsap.core.Timeline | null = null

    gsap.set(slides, {
      autoAlpha: 0,
      rotateX: 75,
      yPercent: 18,
      transformOrigin: '50% 80%',
    })
    gsap.set(slides[0], { autoAlpha: 1, rotateX: 0, yPercent: 0 })
    gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' })

    const arm = (i: number) => {
      hold?.kill()
      fills.forEach((fill, k) => {
        gsap.set(fill, { scaleX: k < i ? 1 : 0 })
      })
      hold = gsap.fromTo(
        fills[i],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: HOLD,
          ease: 'none',
          onComplete: () => goTo((i + 1) % n),
        },
      )
    }

    const goTo = (next: number) => {
      if (next === current) return
      const from = current
      const dir = ((next - from + n) % n) <= n / 2 ? 1 : -1
      current = next
      setIndex(next)
      hold?.kill()

      const outgoing = slides[from]
      const incoming = slides[next]
      flip?.kill()
      flip = gsap.timeline({
        defaults: { ease: 'osmo' },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, rotateX: dir * 75, yPercent: dir * -18 })
          arm(next)
        },
      })

      flip.to(
        outgoing,
        {
          autoAlpha: 0,
          rotateX: dir * -75,
          yPercent: dir * -18,
          duration: 0.22,
        },
        0,
      )
      flip.fromTo(
        incoming,
        { autoAlpha: 0, rotateX: dir * 75, yPercent: dir * 18 },
        { autoAlpha: 1, rotateX: 0, yPercent: 0, duration: 0.26 },
        0,
      )
    }

    arm(0)

    const onTick = (event: Event) => {
      const btn = (event.target as HTMLElement).closest<HTMLElement>('[data-scale-to]')
      if (!btn) return
      goTo(Number(btn.dataset.scaleTo))
    }

    let tapY = 0
    const onDown = (event: PointerEvent) => {
      tapY = event.clientY
    }

    const onStage = (event: PointerEvent) => {
      if (Math.abs(event.clientY - tapY) > 12) return
      if ((event.target as HTMLElement).closest('[data-scale-to]')) return
      const stage = el.querySelector('.scale-flip-window')
      if (!stage || !stage.contains(event.target as Node)) return
      const mid = stage.getBoundingClientRect().left + stage.clientWidth / 2
      goTo(event.clientX >= mid ? (current + 1) % n : (current - 1 + n) % n)
    }

    el.addEventListener('click', onTick)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onStage)

    return () => {
      hold?.kill()
      flip?.kill()
      el.removeEventListener('click', onTick)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onStage)
    }
  }, [])

  return (
    <section
      ref={root}
      className={`scale-flip${staticMode ? ' is-static' : ''}`}
    >
      <div className="shell scale-flip-layout">
        <div className="scale-flip-lead">
          <div className="section-header">
            <p className="eyebrow">Scale</p>
            <h2>
              Built for how people
              <br />
              actually live here
            </h2>
          </div>
          <div className="scale-flip-ticks" role="tablist" aria-label="Scale">
            {ITEMS.map((item, i) => (
              <button
                key={item.n}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.t}
                data-scale-to={i}
                className={i === index ? 'on' : ''}
              >
                <span aria-hidden="true">{item.icon}</span>
                <i>
                  <b data-scale-fill />
                </i>
              </button>
            ))}
          </div>
        </div>
        <div className="scale-flip-stage">
          <div className="scale-flip-window">
            {ITEMS.map((item, i) => (
              <article
                key={item.n}
                data-scale-slide
                className="scale-flip-slide"
                aria-hidden={staticMode ? undefined : i !== index}
              >
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
