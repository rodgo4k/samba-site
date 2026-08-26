import { useEffect } from 'react'

export function Motion() {
  useEffect(() => {
    let raf = 0

    const tick = () => {
      const vh = window.innerHeight || 1
      document.documentElement.style.setProperty('--sy', `${window.scrollY}`)
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect()
        const p = (r.top + r.height / 2 - vh / 2) / vh
        el.style.setProperty('--p', p.toFixed(4))
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return null
}
