import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { APP_STORE, PLAY_STORE } from '../lib/links'
import { Logo } from './Logo'
import { Arrow } from './StoreIcons'

export function Header() {
  const [mini, setMini] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setMini(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${mini ? ' mini' : ''}${open ? ' open' : ''}`}>
      <div className="shell nav-row">
        <div className="nav-start">
          <NavLink to="/" end className="wordmark" aria-label="Samba home" onClick={close}>
            <Logo />
          </NavLink>
          <nav className="nav-links" id="nav-drawer" aria-label="Primary">
            <a href="/#find" onClick={close}>
              Find a pro
            </a>
            <a href="/#housing" className="nav-new" onClick={close}>
              Housing
              <span className="new-pill">New</span>
            </a>
            <a href="/#start" onClick={close}>
              Start
            </a>
            <NavLink to="/about" onClick={close}>
              About
            </NavLink>
            <div className="nav-drawer-stores">
              <a className="btn btn-ghost" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
                Google Play
              </a>
              <a className="btn btn-leaf" href={APP_STORE} target="_blank" rel="noopener noreferrer">
                App Store
                <Arrow />
              </a>
            </div>
          </nav>
        </div>
        <div className="nav-end">
          <a className="btn btn-ghost nav-play" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
            Google Play
          </a>
          <a className="btn btn-leaf" href={APP_STORE} target="_blank" rel="noopener noreferrer">
            App Store
            <Arrow />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open ? (
        <button type="button" className="nav-scrim" aria-label="Close menu" onClick={close} />
      ) : null}
    </header>
  )
}
