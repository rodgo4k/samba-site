import { APP_STORE, PLAY_STORE } from '../lib/links'
import { Apple, Play } from './StoreIcons'

export function SplashCta() {
  return (
    <section className="splash">
      <div className="shell splash-copy">
        <h2>
          The one app to get everything done.
          <br />
          Get it today.
        </h2>
        <div className="splash-stores">
          <a
            className="splash-store"
            href={APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
          >
            <span className="splash-store-icon">
              <Apple size={18} />
            </span>
            <span className="splash-store-text">
              <span>App Store</span>
              <span>Get it today</span>
            </span>
          </a>
          <a
            className="splash-store"
            href={PLAY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
          >
            <span className="splash-store-icon">
              <Play size={16} />
            </span>
            <span className="splash-store-text">
              <span>Google Play</span>
              <span>Get it today</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
