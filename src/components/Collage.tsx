import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { media } from '../lib/media'

gsap.registerPlugin(CustomEase)
if (!CustomEase.get('move')) {
  CustomEase.create('move', '0.3, 0.075, 0, 1')
}

const CARDS = [
  { id: 'cleaning', src: media.serviceCleaning, variant: 'landscape', slot: '1' },
  { id: 'beauty', src: media.serviceHair, variant: '', slot: '2' },
  { id: 'fitness', src: media.serviceFitness, variant: 'landscape', slot: '3' },
  { id: 'legal', src: media.serviceLegal, variant: 'portrait', slot: '4' },
  { id: 'trades', src: media.serviceHome, variant: '', slot: '5' },
  { id: 'food', src: media.serviceChef, variant: 'landscape', slot: '6' },
  { id: 'housing', src: media.serviceHousing, variant: 'landscape', slot: '7' },
  { id: 'gardening', src: media.serviceGardening, variant: '', slot: '8' },
] as const

type CollageApi = {
  focus: (item: HTMLElement) => void
  reset: () => void
}

export function Collage({ focusId }: { focusId: string | null }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<CollageApi | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const list = root.querySelector<HTMLElement>('[data-interactive-collage-list]')
    const items = [
      ...root.querySelectorAll<HTMLElement>('[data-interactive-collage-item]'),
    ]
    if (!list || !items.length) return

    const activeScale = 1.075
    const inactiveScale = 0.9
    const gapPercent = 3
    const secondCardBoost = 1.35
    const centerPullPercent = 25
    const duration = 0.8
    const ease = 'move'
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const controller = new AbortController()
    const { signal } = controller
    let activeItem: HTMLElement | null = null

    const getInner = (item: HTMLElement) =>
      item.querySelector<HTMLElement>('[data-interactive-collage-item-inner]')

    const getMoveStrength = (distance: number) => {
      const strength = 1 / (1 + (distance - 1) ** 1.2 * 0.45)
      return distance === 2 ? strength * secondCardBoost : strength
    }

    const animateItem = (
      item: HTMLElement,
      xPercent: number,
      yPercent: number,
      scale: number,
    ) => {
      const inner = getInner(item)
      if (!inner) return
      gsap.to(inner, {
        xPercent,
        yPercent,
        scale,
        duration,
        ease,
        overwrite: true,
      })
    }

    const resetCollage = () => {
      activeItem = null
      items.forEach((item) => {
        item.removeAttribute('data-interactive-collage-focus')
        item.style.zIndex = ''
        animateItem(item, 0, 0, 1)
      })
    }

    const focusItem = (active: HTMLElement) => {
      if (activeItem === active) return
      activeItem = active

      items.forEach((item) => {
        if (item === active) {
          item.setAttribute('data-interactive-collage-focus', '')
          item.style.zIndex = '6'
        } else {
          item.removeAttribute('data-interactive-collage-focus')
          item.style.zIndex = ''
        }
      })

      const listRect = list.getBoundingClientRect()
      const listCenterY = listRect.top + listRect.height / 2
      const gap = (listRect.width * gapPercent) / 100

      const orderedItems = [...items].sort((a, b) => {
        const aRect = a.getBoundingClientRect()
        const bRect = b.getBoundingClientRect()
        return aRect.left + aRect.width / 2 - (bRect.left + bRect.width / 2)
      })

      const activeIndex = orderedItems.indexOf(active)
      const activeRect = active.getBoundingClientRect()
      const activeCenterX = activeRect.left + activeRect.width / 2
      const activeLeft = activeCenterX - (activeRect.width * activeScale) / 2
      const activeRight = activeCenterX + (activeRect.width * activeScale) / 2

      const leftItem = orderedItems[activeIndex - 1]
      const rightItem = orderedItems[activeIndex + 1]
      let leftMove = 0
      let rightMove = 0

      if (leftItem) {
        const rect = leftItem.getBoundingClientRect()
        const itemRight = rect.left + rect.width / 2 + (rect.width * inactiveScale) / 2
        leftMove = Math.min(0, activeLeft - gap - itemRight)
      }

      if (rightItem) {
        const rect = rightItem.getBoundingClientRect()
        const itemLeft = rect.left + rect.width / 2 - (rect.width * inactiveScale) / 2
        rightMove = Math.max(0, activeRight + gap - itemLeft)
      }

      orderedItems.forEach((item, index) => {
        if (item === active) {
          animateItem(item, 0, 0, activeScale)
          return
        }
        const rect = item.getBoundingClientRect()
        const difference = index - activeIndex
        const distance = Math.abs(difference)
        const strength = getMoveStrength(distance)
        const itemCenterY = rect.top + rect.height / 2
        const centerProgress = (listCenterY - itemCenterY) / (listRect.height / 2)
        const moveX = difference < 0 ? leftMove * strength : rightMove * strength
        const scale = inactiveScale - (1 - strength) * 0.12
        animateItem(
          item,
          (moveX / rect.width) * 100,
          centerPullPercent * centerProgress * strength,
          scale,
        )
      })
    }

    apiRef.current = { focus: focusItem, reset: resetCollage }

    const getHoveredItem = (event: PointerEvent) => {
      if (activeItem) {
        const rect = getInner(activeItem)?.getBoundingClientRect()
        if (
          rect &&
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          return activeItem
        }
      }
      return (
        document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest<HTMLElement>('[data-interactive-collage-item]') ?? null
      )
    }

    if (isTouch) {
      items.forEach((item) => {
        item.addEventListener(
          'click',
          (event) => {
            event.stopPropagation()
            if (activeItem === item) resetCollage()
            else focusItem(item)
          },
          { signal },
        )
      })
      document.addEventListener(
        'click',
        (event) => {
          if (!root.contains(event.target as Node)) resetCollage()
        },
        { signal },
      )
    } else {
      root.addEventListener(
        'pointermove',
        (event) => {
          const item = getHoveredItem(event)
          if (item) focusItem(item)
          else resetCollage()
        },
        { signal },
      )
      root.addEventListener('pointerleave', resetCollage, { signal })
    }

    return () => {
      controller.abort()
      apiRef.current = null
      gsap.killTweensOf(root.querySelectorAll('[data-interactive-collage-item-inner]'))
    }
  }, [])

  useEffect(() => {
    if (!focusId) return
    const root = rootRef.current
    const item = root?.querySelector<HTMLElement>(`[data-cat="${focusId}"]`)
    if (item) apiRef.current?.focus(item)
  }, [focusId])

  return (
    <div
      ref={rootRef}
      data-interactive-collage-init=""
      className="collage"
      aria-hidden="true"
    >
      <div data-interactive-collage-list="" className="collage-list">
        {CARDS.map((card) => (
          <div
            key={card.id}
            data-interactive-collage-item=""
            data-cat={card.id}
            className={`collage-item is--${card.slot}`}
          >
            <div data-interactive-collage-item-inner="" className="collage-inner">
              <div className={`collage-card${card.variant ? ` is--${card.variant}` : ''}`}>
                <img src={card.src} alt="" className="collage-img" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
