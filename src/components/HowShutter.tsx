import { media } from '../lib/media'

const STEPS = [
  {
    t: 'Ask',
    d: 'A room in Somerville, a Saturday cut, a leak, a chef. Samba AI reads the request the way you already speak, then previews who is nearby — matched on skill, language, and proximity.',
  },
  {
    t: 'Hire',
    d: 'Nothing books on this site. Message, apply, and hire stay in the app. Professionals are identity-checked before they show up. No calls or texts until you decide to reach out.',
  },
  {
    t: 'Done',
    d: 'English, Portuguese, Spanish, Chinese, Haitian Creole. Chat with a pro nearby on your phone. If you rent, landlords cannot ask for more than two months’ rent.',
  },
] as const

export function HowShutter() {
  return (
    <section className="how-badge" id="how">
      <div className="how-badge-card">
        <div className="how-badge-start">
          <div className="how-badge-label">
            <span>New</span>
          </div>
          <h2>
            Ask
            <br />
            Hire
            <br />
            Done
          </h2>
        </div>
        <div className="how-badge-end">
          <img src={media.howHouse} alt="" />
        </div>
      </div>
      <ol className="how-badge-steps">
        {STEPS.map((step) => (
          <li key={step.t}>
            <strong>{step.t}</strong>
            <p>{step.d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
