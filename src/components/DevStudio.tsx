import { APP_STORE } from '../lib/links'
import { media } from '../lib/media'
import { LangCycle } from './LangCycle'
import { Arrow } from './StoreIcons'

const POINTS = [
  'Ask in English, Portuguese, Spanish, Chinese, and Haitian Creole',
  'Samba AI reads it the way you said it',
  'Skill and proximity first. Language when it matters to the job',
  'Chat with a pro nearby, in a language you share',
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 8.2 6.1 11.1 12.8 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Verified() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="var(--leaf)" />
      <path
        d="M5 8.1 7.1 10.2 11.2 6"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DevStudio() {
  return (
    <div className="lang-split">
      <div>
        <div className="section-header">
          <p className="eyebrow">Language</p>
          <h2>Ask the way you already speak</h2>
        </div>
        <ul className="check-list">
          {POINTS.map((point) => (
            <li key={point}>
              <Check />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="lang-split-actions">
          <a className="btn btn-midnight" href={APP_STORE} target="_blank" rel="noopener noreferrer">
            Get the app
            <Arrow />
          </a>
          <a className="lang-split-link" href="/#find">
            Find a pro
          </a>
        </div>
      </div>
      <div className="lang-split-stage">
        <article className="lang-card">
          <div className="lang-card-head">
            <div>
              <strong>
                Samba AI
                <Verified />
              </strong>
              <span>Ask in your words</span>
              <div className="lang-card-tools">
                <span className="lang-card-pill">Open app</span>
              </div>
            </div>
            <img src={media.langChat} alt="" />
          </div>
          <dl>
            <div>
              <dt>Spoken</dt>
              <dd>
                <LangCycle />
              </dd>
            </div>
            <div>
              <dt>Chat</dt>
              <dd>In the app</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  )
}
