import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutMotion({ root }: { root: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const family = el.querySelector('.scale-board')
      if (family) {
        gsap.from(family, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: family, start: 'top 88%' },
        })
      }

      const rail = el.querySelector('.about-rail-track')
      if (rail) {
        gsap.to(rail, {
          xPercent: -32,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-rail',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((node) => {
        const end = Number(node.dataset.count)
        if (Number.isNaN(end)) return
        const obj = { n: 0 }
        node.textContent = '0'
        gsap.to(obj, {
          n: end,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: node, start: 'top 86%' },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.n))
          },
        })
      })

      const rule = el.querySelector('.about-rule-text')
      if (rule) {
        gsap.from(rule, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rule, start: 'top 85%' },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [root])

  return null
}
