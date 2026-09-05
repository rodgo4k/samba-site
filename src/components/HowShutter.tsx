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
    <section className="how-steps" id="how">
      <div className="how-steps-container">
        <div className="how-steps-collection">
          <div className="how-steps-list">
            {STEPS.map((step) => (
              <article key={step.t} className="how-steps-item">
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </article>
            ))}
          </div>
          <figure className="how-steps-visual">
            <img src={media.howHouse} alt="" />
          </figure>
        </div>
      </div>
    </section>
  )
}
