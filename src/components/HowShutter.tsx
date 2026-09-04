import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { media } from '../lib/media'

gsap.registerPlugin(CustomEase, ScrollTrigger)

if (!CustomEase.get('osmo')) {
  CustomEase.create('osmo', '0.625, 0.05, 0, 1')
}

const BLADES = 10
const COVER = 0.5
const STAGGER = 0.3

const SLIDES = [
  {
    n: '01',
    t: 'Ask Samba AI in your words.',
    d: 'A room in Somerville, a Saturday cut, a leak, a chef. Samba AI reads the request the way you already speak, then previews who is nearby — matched on skill, language, and proximity.',
    facts: ['Preview on the site', 'Hire only in the app'],
    src: media.howMeet,
  },
  {
    n: '02',
    t: 'Nothing books here. Open Samba.',
    d: 'Message, apply, and hire stay in the app. Professionals are identity-checked before they show up. Chat stays in-app until you decide to reach out — no calls or texts first.',
    facts: ['Identity-checked pros', 'Massachusetts · New Jersey'],
    src: media.matchApp,
  },
  {
    n: '03',
    t: 'Done in your language. Fairer rent.',
    d: 'English, Portuguese, Spanish, Chinese, Haitian Creole. Chat with a pro nearby on your phone. If you rent, landlords cannot ask for more than two months’ rent.',
    facts: ['Five languages', 'Two months’ rent cap'],
    src: media.howRenovation,
  },
] as const

export function HowShutter() {
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const pages = useRef<(HTMLElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const wrap = root.current
    const overlay = panel.current
    if (!wrap || !overlay) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStaticMode(true)
      return
    }

    const blades = overlay.querySelectorAll<HTMLElement>('[data-shutter]')
    let current = 0
    let busy = false
    let queued: number | null = null
    let running: gsap.core.Timeline | null = null

    gsap.set(pages.current, { autoAlpha: 0, y: 0 })
    gsap.set(pages.current[0], { autoAlpha: 1 })
    gsap.set(overlay, { opacity: 0 })
    gsap.set(blades, {
      scaleY: 1,
      yPercent: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })

    const show = (_from: number, to: number) => {
      setIndex(to)
    }

    const play = (from: number, to: number) => {
      const outgoing = pages.current[from]
      const incoming = pages.current[to]
      if (!outgoing || !incoming) return Promise.resolve()

      show(from, to)
      const tl = gsap.timeline({
        defaults: { ease: 'osmo' },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, y: 0 })
          gsap.set(overlay, { opacity: 0 })
        },
      })
      running = tl

      tl.set(overlay, { opacity: 1 }, 0)
      tl.set(incoming, { autoAlpha: 0, y: 0 }, 0)
      tl.set(
        blades,
        {
          scaleY: 1.02,
          yPercent: 50,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        0,
      )
      tl.to(
        blades,
        {
          duration: COVER,
          ease: 'power3.in',
          yPercent: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          stagger: { amount: STAGGER, from: 'end' },
        },
        0,
      )
      tl.fromTo(
        outgoing,
        { y: '0vh' },
        { y: '-12vh', ease: 'power3.in', duration: COVER * 1.5 },
        0,
      )

      const enter = COVER + STAGGER
      tl.set(incoming, { autoAlpha: 1 }, enter)
      tl.set(outgoing, { autoAlpha: 0, y: 0 }, enter)
      tl.to(
        blades,
        {
          duration: COVER * 1.5,
          ease: 'expo.out',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% -2%, 0% -2%)',
          yPercent: -50,
          stagger: { amount: STAGGER, from: 'end' },
          overwrite: 'auto',
        },
        enter,
      )
      tl.from(
        incoming,
        { y: '16vh', ease: 'expo.out', duration: COVER + STAGGER },
        enter,
      )

      return tl.then()
    }

    const goTo = (next: number) => {
      if (next === current && !busy) return
      if (busy) {
        queued = next
        return
      }
      if (next === current) return
      busy = true
      const from = current
      current = next
      void play(from, next).then(() => {
        busy = false
        if (queued !== null && queued !== current) {
          const jump = queued
          queued = null
          goTo(jump)
        } else {
          queued = null
        }
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const n = SLIDES.length
        const i = Math.min(n - 1, Math.floor(self.progress * n + 0.0001))
        goTo(i)
      },
    })

    return () => {
      running?.kill()
      trigger.kill()
    }
  }, [])

  return (
    <section
      ref={root}
      className={`how-shutter${staticMode ? ' is-static' : ''}`}
      id="how"
    >
      <div className="how-shutter-pin">
        {SLIDES.map((slide, i) => (
          <article
            key={slide.n}
            ref={(node) => {
              pages.current[i] = node
            }}
            className="how-shutter-page"
            aria-hidden={staticMode ? undefined : i !== index}
          >
            <div className="how-shutter-copy">
              <p className="eyebrow">How · {slide.n}</p>
              <h2>{slide.t}</h2>
              <p>{slide.d}</p>
              <ul>
                {slide.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <div className="how-shutter-visual">
              <img src={slide.src} alt="" />
            </div>
          </article>
        ))}
        <div ref={panel} className="how-shutter-overlay" aria-hidden="true">
          <div className="how-shutter-panel">
            {Array.from({ length: BLADES }, (_, i) => (
              <div key={i} data-shutter className="how-shutter-blade" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
