"use client";

import { FormEvent, useState } from "react";

const programs = [
  {
    number: "01",
    name: "Member Preferred Pricing",
    eyebrow: "Reward your riders",
    description:
      "Give verified, dues-paying members access to exclusive pricing on eligible EVP performance products through their individual online accounts.",
    bullets: [
      "Account-based member pricing",
      "Annual group enrollment",
      "Exclusive product opportunities",
    ],
    image: "/images/product-exhaust.jpg",
    imageAlt: "EVP performance exhaust installed on a UTV",
    fit: "For groups focused on a simple, high-value member benefit.",
  },
  {
    number: "02",
    name: "Group Growth Fund",
    eyebrow: "Fuel your next ride",
    description:
      "Turn qualifying member purchases into ongoing support for events, trail initiatives, equipment and the work that keeps your group moving.",
    bullets: [
      "Purchase-based group rewards",
      "Flexible funding options",
      "Clear scheduled reporting",
    ],
    image: "/images/group-team-4.jpg",
    imageAlt: "EVP team and riders gathered with a UTV at a dune event",
    fit: "For groups looking to build sustainable operating support.",
  },
  {
    number: "03",
    name: "Official EVP Group Partner",
    eyebrow: "Go further together",
    description:
      "Build an official performance partnership with annual support tailored to your membership, event calendar and community reach.",
    bullets: [
      "Co-branded member merchandise",
      "Local or remote event support",
      "Earned member giveaway levels",
    ],
    image: "/images/our-story.jpg",
    imageAlt: "Evolution Powersports team member connecting with riders at an event",
    fit: "For established groups ready to represent EVP in their community.",
  },
];

const benefits = [
  ["Preferred install labor", "Eligible EVP product installations at our Somerset facility."],
  ["Early product access", "Be among the first to hear about select new EVP products and releases."],
  ["Product education", "Group-only education, promotions and performance opportunities."],
  ["Events & experiences", "Qualifying facility visits, demos and on-site group support."],
  ["A real EVP connection", "A designated program contact who understands your group."],
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <div className="announcement">Built for UTV communities that ride harder together</div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Evolution Powersports home">
          <img
            src="https://evopowersports.com/cdn/shop/files/Main_Nav_Logo-EVP_1_205x.svg?v=1701447538"
            alt="Evolution Powersports"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#programs">Program Options</a>
          <a href="#benefits">Benefits</a>
          <a href="#how-it-works">How It Works</a>
        </nav>
        <a className="button button-small" href="#interest-form">Start a Conversation</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/hero-group-action.jpg" alt="" />
        </div>
        <div className="hero-content">
          <p className="kicker">EVP Riding Group Partnership Program</p>
          <h1>More power for<br /><span>your community.</span></h1>
          <p className="hero-copy">
            Exclusive member benefits, group funding opportunities and official partnership support—built for the people who bring riders together.
          </p>
          <div className="hero-actions">
            <a className="button" href="#interest-form">Become an EVP Partner <span>→</span></a>
            <a className="text-link" href="#programs">Explore the program</a>
          </div>
        </div>
        <p className="hero-credit">EVP UTV in the dunes</p>
      </section>

      <section className="proof-strip" aria-label="Program highlights">
        <p><strong>Built for real groups.</strong> Flexible support based on how your community rides, grows and shows up.</p>
        <span className="proof-divider" />
        <p><strong>Race-day power. Trail-day confidence.</strong> Whether your group is chasing podiums or a smoother, more capable day on the trail, EVP helps every rider get more from their machine.</p>
      </section>

      <section className="section programs-section" id="programs">
        <div className="section-heading">
          <div>
            <p className="kicker">Three ways to partner</p>
            <h2>Choose what moves<br />your group forward.</h2>
          </div>
          <p>
            From member value to organizational support and brand collaboration, each option is designed to serve a different group priority.
          </p>
        </div>

        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.name}>
              <div className="program-image"><img src={program.image} alt={program.imageAlt} /></div>
              <div className="program-number">{program.number}</div>
              <p className="card-eyebrow">{program.eyebrow}</p>
              <h3>{program.name}</h3>
              <p className="program-description">{program.description}</p>
              <ul>
                {program.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <p className="best-for">{program.fit}</p>
            </article>
          ))}
        </div>
        <p className="detail-note">Program specifics are customized after EVP learns more about your group, membership and annual activities.</p>
      </section>

      <section className="benefits-section" id="benefits">
        <div className="benefits-copy">
          <p className="kicker">Included with every partnership option</p>
          <h2>Performance support that goes beyond a discount.</h2>
          <p>
            No matter which option fits your group, every approved partner receives a shared foundation of EVP benefits, expertise and opportunities.
          </p>
          <a className="text-link light" href="#interest-form">Tell us about your group <span>→</span></a>
        </div>
        <div className="benefit-list">
          {benefits.map(([title, copy], index) => (
            <div className="benefit-item" key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section steps-section" id="how-it-works">
        <div className="center-heading">
          <p className="kicker">Simple by design</p>
          <h2>From first conversation to official partner.</h2>
        </div>
        <div className="steps">
          <article><span>01</span><h3>Tell us about your group</h3><p>Share your membership, location, events and what matters most to your riders.</p></article>
          <article><span>02</span><h3>Find the right fit</h3><p>EVP reviews your information and recommends the strongest partnership path.</p></article>
          <article><span>03</span><h3>Launch together</h3><p>We confirm the details, activate benefits and give your group what it needs to get started.</p></article>
        </div>
      </section>

      <section className="interest-section" id="interest-form">
        <div className="interest-copy">
          <p className="kicker">Let’s ride together</p>
          <h2>Put your group on EVP’s radar.</h2>
          <p>
            Tell us a little about your riding community. An EVP team member will reach out to learn more and explore the right partnership option.
          </p>
          <div className="contact-meta">
            <span>What happens next</span>
            <p>Personal outreach from EVP</p>
            <p>No commitment to apply</p>
            <p>Program details shared after review</p>
          </div>
        </div>

        <div className="form-card">
          {submitted ? (
            <div className="success-message" role="status">
              <div className="success-icon">✓</div>
              <p className="kicker">Interest received</p>
              <h3>Thanks for introducing your group.</h3>
              <p>An EVP team member will follow up to learn more about your community and partnership goals.</p>
              <button className="text-button" onClick={() => setSubmitted(false)}>Submit another group</button>
            </div>
          ) : (
            <form onSubmit={submitInterest}>
              <div className="form-heading"><span>Partnership Interest Form</span><small>All fields required unless noted</small></div>
              <div className="field-row">
                <label>First name<input required name="firstname" autoComplete="given-name" placeholder="First name" /></label>
                <label>Last name<input required name="lastname" autoComplete="family-name" placeholder="Last name" /></label>
              </div>
              <div className="field-row">
                <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@ridinggroup.com" /></label>
                <label>Phone number<input required type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></label>
              </div>
              <label>Riding group name<input required name="group_name" placeholder="Your group’s name" /></label>
              <div className="field-row">
                <label>Your role
                  <select required name="group_role" defaultValue="">
                    <option value="" disabled>Select your role</option>
                    <option>Founder or Owner</option><option>President or Chair</option><option>Board Member</option><option>Event Organizer</option><option>Group Administrator</option><option>Member</option><option>Other</option>
                  </select>
                </label>
                <label>Approximate paying members
                  <select required name="member_count" defaultValue="">
                    <option value="" disabled>Select range</option>
                    <option>Under 25</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option>
                  </select>
                </label>
              </div>
              <label>Primary location<input required name="location" placeholder="City, State" /></label>
              <label>Website or social page <small>(optional)</small><input name="group_url" type="url" placeholder="https://" /></label>
              <label>What interests your group most?
                <select required name="program_interest" defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option>Member Preferred Pricing</option>
                  <option>Group Growth Fund</option>
                  <option>Official EVP Group Partnership</option>
                  <option>Not sure—help us choose</option>
                </select>
              </label>
              <label className="consent"><input required type="checkbox" name="consent" /><span>I agree that EVP may contact me about the Riding Group Partnership Program.</span></label>
              <button className="button submit-button" type="submit">Start the Conversation <span>→</span></button>
              <p className="privacy-note">Your information will only be used to evaluate and communicate about this program.</p>
            </form>
          )}
        </div>
      </section>

      <section className="faq-section">
        <div><p className="kicker">Good to know</p><h2>Built to fit the way your group rides.</h2></div>
        <div className="faq-list">
          <details><summary>Does submitting interest commit our group?</summary><p>No. This starts a conversation so EVP can learn about your group and recommend the right program option.</p></details>
          <details><summary>Are program rates listed publicly?</summary><p>Program details vary by option and group. Specific benefits, eligibility and terms are shared during the review process.</p></details>
          <details><summary>What types of groups can apply?</summary><p>The initial program is designed for organized UTV riding groups with verified, dues-paying members. Additional powersports communities may be added later.</p></details>
        </div>
      </section>

      <footer>
        <img src="https://evopowersports.com/cdn/shop/files/Main_Nav_Logo-EVP_1_205x.svg?v=1701447538" alt="Evolution Powersports" />
        <p>More Speed. More Power. Stronger Communities.</p>
        <div><span>Somerset, Wisconsin</span><span>© 2026 Evolution Powersports</span></div>
      </footer>
    </main>
  );
}
