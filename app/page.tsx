"use client";

import { FormEvent, useState } from "react";

const programPillars = [
  ["Member savings", "Verified group members receive exclusive pricing on eligible EVP performance products through their individual online accounts."],
  ["Annual group rewards", "Qualifying member purchases help unlock annual cash-back support for the riding group after its program threshold is reached."],
  ["Products and shop work", "Eligible EVP products and qualifying installation work both contribute toward the group’s annual program activity."],
];

const benefits = [
  ["Discounted installation labor", "Preferred labor rates on eligible EVP product installations at our Somerset facility."],
  ["Early product access", "Be among the first to hear about select new EVP products and releases."],
  ["Event support", "Local or remote event support based on location, timing and availability."],
  ["Co-branded merchandise", "Access to discounted co-branded merchandise created for your members."],
  ["Member product giveaways", "EVP-managed giveaway opportunities based on group activity and qualifying purchases."],
  ["A dedicated EVP contact", "A designated program contact who understands your group and helps keep things moving."],
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
          <a href="#programs">The Program</a>
          <a href="#benefits">Additional Benefits</a>
          <a href="#how-it-works">How It Works</a>
          <a href="/application">Application + Roster</a>
          <a className="checklist-nav-button" href="/project-checklist">Project Checklist</a>
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
            Exclusive member pricing, annual group rewards and partnership support—built for the people who bring riders together.
          </p>
          <div className="hero-actions">
            <a className="button" href="#interest-form">Let&apos;s Ride! <span>→</span></a>
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
            <p className="kicker">One program. Shared momentum.</p>
            <h2>More value for every rider—and the group behind them.</h2>
          </div>
          <p>
            Every approved group joins the same EVP partnership program, creating value for individual members while rewarding the group’s collective activity.
          </p>
        </div>

        <article className="single-program">
          <div className="single-program-media">
            <img className="single-program-main-image" src="/images/group-team-4.jpg" alt="EVP team and riders gathered with a UTV at a dune event" />
            <img src="/images/product-exhaust.jpg" alt="EVP performance exhaust installed on a UTV" />
            <img src="/images/our-story.jpg" alt="Evolution Powersports team member connecting with riders at an event" />
          </div>
          <div className="single-program-content">
            <p className="card-eyebrow">The EVP Riding Group Partnership</p>
            <h3>Built to reward the whole group.</h3>
            <p className="single-program-intro">Members get meaningful EVP value from the start. As qualifying activity grows, the riding group can unlock annual support of its own.</p>
            <div className="program-pillars">
              {programPillars.map(([title, copy], index) => (
                <div className="program-pillar" key={title}>
                  <span>0{index + 1}</span>
                  <div><h4>{title}</h4><p>{copy}</p></div>
                </div>
              ))}
            </div>
            <a className="button" href="#interest-form">Tell Us About Your Group <span>→</span></a>
            <p className="program-fine-print">Specific rates, thresholds, eligible purchases, renewal terms and program limitations are shared during the formal application process.</p>
          </div>
        </article>
      </section>

      <section className="benefits-section" id="benefits">
        <div className="benefits-copy">
          <p className="kicker">Additional partnership benefits</p>
          <h2>More ways EVP can support your group.</h2>
          <p>
            Approved groups may also receive access to additional EVP support based on group activity, location, timing and program availability.
          </p>
          <a className="text-link light" href="#interest-form">Tell us about your group <span>→</span></a>
        </div>
        <div className="benefits-list-wrap">
          <div className="benefit-list">
            {benefits.map(([title, copy], index) => (
              <div className="benefit-item" key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </div>
            ))}
          </div>
          <p className="benefits-note">Additional benefits are subject to EVP approval, availability, scheduling and applicable program terms.</p>
        </div>
      </section>

      <section className="section steps-section" id="how-it-works">
        <div className="center-heading">
          <p className="kicker">Simple by design</p>
          <h2>From first conversation to official partner.</h2>
        </div>
        <div className="steps">
          <article><span>01</span><h3>Tell us about your group</h3><p>Share your membership, location, events and what matters most to your riders.</p></article>
          <article><span>02</span><h3>Confirm program details</h3><p>EVP reviews your information, confirms eligibility and shares the complete program terms.</p></article>
          <article><span>03</span><h3>Launch together</h3><p>We confirm the details, activate benefits and give your group what it needs to get started.</p></article>
        </div>
      </section>

      <section className="interest-section" id="interest-form">
        <div className="interest-copy">
          <p className="kicker">Let’s ride together</p>
          <h2>Put your group on EVP’s radar.</h2>
          <p>
            Tell us a little about your riding community. An EVP team member will reach out to learn more and explore whether the program is a strong fit.
          </p>
          <div className="contact-meta">
            <span>What happens next</span>
            <p>Personal outreach from EVP</p>
            <p>Specific program details tailored to your group</p>
            <p>Formal application sent for completion</p>
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
              <div className="application-preview-callout">
                <div><strong>Reviewing the complete application?</strong><p>See the downloadable member roster template and file-upload mockup.</p></div>
                <a href="/application">Open Application + Roster <span>→</span></a>
              </div>
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
              <label>Website or social page <small>(optional)</small><input name="group_url" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder="www.yourgroup.com or social profile" /></label>
              <fieldset className="benefit-interest">
                <legend>What additional support interests your group? <small>(optional)</small></legend>
                <p>Select any that would be valuable. Availability is confirmed during program review.</p>
                <div className="benefit-grid">
                  {benefits.map(([title]) => (
                    <label className="benefit-option" key={title}>
                      <input type="checkbox" name="benefit_interest" value={title} /><span>{title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
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
          <details><summary>Does submitting interest commit our group?</summary><p>No. This starts a conversation so EVP can learn about your group, confirm eligibility and share the complete program details.</p></details>
          <details><summary>Are program rates listed publicly?</summary><p>No. Specific member savings, group reward rates, qualifying thresholds, eligibility requirements and limitations are shared during the formal application process.</p></details>
          <details><summary>How are group rewards tracked?</summary><p>Qualifying activity is tracked across each group’s annual program period. Complete calculation, payout and renewal terms are provided with the formal application.</p></details>
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
