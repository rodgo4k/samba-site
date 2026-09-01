import { Link } from 'react-router-dom'
import { FORETHEIST, SOCIAL, SUPPORT } from '../lib/links'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link to="/" className="wordmark" aria-label="Samba home">
            <Logo />
          </Link>
          <p className="footer-tagline">
            The perfect professional for you. Housing, rooms, health, food,
            legal, and more. Find all in one app.
          </p>
        </div>
        <div className="footer-nav">
          <div className="footer-nav-col">
            <div>
              <p className="footer-label">Product</p>
              <a href="/#find">Samba AI</a>
              <a href="/#services">Services</a>
              <a href="/#matching">Matching</a>
              <a href="/#housing">Housing</a>
              <a href="/#start">Language</a>
            </div>
            <div>
              <p className="footer-label">Company</p>
              <Link to="/about">About</Link>
              <a href={FORETHEIST} target="_blank" rel="noopener noreferrer">
                Foretheist
              </a>
              <a href={SUPPORT}>Contact</a>
            </div>
          </div>
          <div className="footer-nav-col">
            <div>
              <p className="footer-label">Connect</p>
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shell footer-legal">
        <p>
          Samba is a product of Foretheist. Hiring happens in the app. This site
          is a preview.
        </p>
        <p>© {new Date().getFullYear()} Samba Group LLC</p>
      </div>
    </footer>
  )
}
