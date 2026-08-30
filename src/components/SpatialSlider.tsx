import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { storeUrl } from '../lib/links'
import { media } from '../lib/media'

gsap.registerPlugin(Draggable, InertiaPlugin)

const SERVICES = [
  { id: 'housing', t: 'Housing', src: media.serviceHousing, fresh: true },
  { id: 'rooms', t: 'Rooms', src: media.serviceRoom, fresh: true },
  { id: 'cleaning', t: 'House cleaning', src: media.serviceCleaning },
  { id: 'beauty', t: 'Hair & beauty', src: media.serviceHair },
  { id: 'fitness', t: 'Health & fitness', src: media.serviceFitness },
  { id: 'food', t: 'Private chef', src: media.serviceChef },
  { id: 'legal', t: 'Legal', src: media.serviceLegal },
  { id: 'trades', t: 'Home & trades', src: media.serviceHome },
  { id: 'gardening', t: 'Gardening', src: media.serviceGardening },
] as const

const COPIES = 3

function readVar(el: HTMLElement, name: string, fallback: number) {
  const n = parseFloat(getComputedStyle(el).getPropertyValue(name))
  return Number.isFinite(n) ? n : fallback
}

export function SpatialSlider() {
  const root = useRef<HTMLDivElement>(null)
  const [href, setHref] = useState(() => storeUrl())

  useEffect(() => {
    setHref(storeUrl())
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return

    const stage = el.querySelector<HTMLElement>('.spatial-stage')
    const track = el.querySelector<HTMLElement>('.spatial-track')
    const slots = gsap.utils.toArray<HTMLElement>('.spatial-slot', el)
    const count = SERVICES.length
    if (!stage || !track || slots.length === 0) return

    const state = { p: count }
    const press = { x: 0, p: count }
    const proxy = document.createElement('div')
    let snapTween: gsap.core.Tween | null = null

    const metrics = () => {
      const styles = getComputedStyle(track)
      const gap = parseFloat(styles.columnGap || styles.gap) || 80
      const w = readVar(el, '--spatial-card-w', 340)
      return { w, step: w + gap }
    }

    const loop = () => {
      if (state.p < count) {
        state.p += count
        press.p += count
      } else if (state.p >= count * 2) {
        state.p -= count
        press.p -= count
      }
    }

    const place = () => {
      const { w, step } = metrics()
      const minScale = readVar(el, '--spatial-min-scale', 0.74)
      const curve = readVar(el, '--spatial-curve', 11)
      const x = stage.clientWidth / 2 - w / 2 - state.p * step
      track.style.transform = `translate3d(${x}px, -50%, 0)`

      slots.forEach((slot, i) => {
        const off = i - state.p
        const d = Math.abs(off)
        const falloff = 1 / (1 + d * d * 0.72)
        const scale = minScale + (1 - minScale) * falloff
        const rotateY = -off * curve
        const sink = d * d * 14
        slot.style.transform = `translateY(${sink}px) rotateY(${rotateY}deg) scale(${scale})`
        const card = slot.querySelector<HTMLElement>('.spatial-card')
        if (card) card.style.transform = ''
        slot.style.zIndex = String(Math.round(falloff * 100))
        slot.classList.toggle('is-active', d < 0.45)
      })
    }

    const snap = (index?: number) => {
      snapTween?.kill()
      const dest = index == null ? Math.round(state.p) : index
      snapTween = gsap.to(state, {
        p: dest,
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: place,
        onComplete() {
          loop()
          place()
        },
      })
    }

    place()
    requestAnimationFrame(place)

    const drag = Draggable.create(proxy, {
      trigger: stage,
      type: 'x',
      inertia: true,
      dragResistance: 0.12,
      onPress() {
        snapTween?.kill()
        press.x = this.x
        press.p = state.p
        stage.classList.add('is-drag')
      },
      onDrag() {
        const { step } = metrics()
        state.p = press.p - (this.x - press.x) / step
        loop()
        place()
      },
      onThrowUpdate() {
        const { step } = metrics()
        state.p = press.p - (this.x - press.x) / step
        loop()
        place()
      },
      onRelease() {
        stage.classList.remove('is-drag')
      },
      onThrowComplete() {
        snap()
      },
      onDragEnd() {
        if (!this.tween) snap()
      },
    })[0]

    const onClick = (e: Event) => {
      if (Math.abs(drag.endX - drag.startX) > 6) e.preventDefault()
    }

    slots.forEach((slot) => slot.addEventListener('click', onClick))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        snap(Math.round(state.p) + 1)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        snap(Math.round(state.p) - 1)
      }
    }

    stage.tabIndex = 0
    stage.addEventListener('keydown', onKey)

    const ro = new ResizeObserver(place)
    ro.observe(stage)

    return () => {
      snapTween?.kill()
      ro.disconnect()
      stage.removeEventListener('keydown', onKey)
      slots.forEach((slot) => slot.removeEventListener('click', onClick))
      drag.kill()
    }
  }, [])

  return (
    <div className="spatial" ref={root}>
      <div className="spatial-stage" aria-label="Services. Drag or use arrow keys.">
        <div className="spatial-track">
          {Array.from({ length: COPIES }, (_, copy) =>
            SERVICES.map((s) => (
              <a
                key={`${copy}-${s.id}`}
                className="spatial-slot"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <article className="spatial-card">
                  <figure>
                    <img src={s.src} alt="" />
                  </figure>
                  <h3>
                    {s.t}
                    {'fresh' in s && s.fresh ? (
                      <span className="new-pill">New</span>
                    ) : null}
                  </h3>
                </article>
              </a>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
