"use client";

import { FormEvent, useState } from "react";

const stepLabels = ["Primary Contact", "Group Profile", "Program Details", "Member Roster"];
const applicationBenefits = [
  "Discounted installation labor",
  "Early product access",
  "Event support",
  "Discounted co-branded merchandise",
  "Member product giveaways",
  "Dedicated EVP contact",
];

export default function ApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [rosterFileName, setRosterFileName] = useState("");

  function continueApplication() {
    setStep((current) => Math.min(4, current + 1));
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="application-page">
      <div className="announcement">EVP Riding Group Partnership Program</div>
      <header className="site-header application-header">
        <a className="brand" href="/" aria-label="Back to EVP Riding Group Partnerships">
          <img src="https://evopowersports.com/cdn/shop/files/Main_Nav_Logo-EVP_1_205x.svg?v=1701447538" alt="Evolution Powersports" />
        </a>
        <span className="application-header-label">Formal Application Preview</span>
        <div className="application-header-links"><a href="/project-checklist">Project Checklist</a><a className="text-link application-back" href="/">← Back to program</a></div>
      </header>

      <section className="application-layout">
        <aside className="application-intro">
          <div>
            <p className="kicker">Ready to make it official?</p>
            <h1>Build something powerful together.</h1>
            <p>Tell us how your group rides, what matters to your members and how the EVP partnership can make the biggest impact.</p>
          </div>

          <div className="application-expectations">
            <span>What you’ll need</span>
            <p><b>01</b> Primary contact details</p>
            <p><b>02</b> Group profile, activities and goals</p>
            <p><b>03</b> Program review and benefit interests</p>
            <p><b>04</b> A completed member roster</p>
          </div>

          <div className="hubspot-ready-note">
            <strong>HubSpot-ready structure</strong>
            <p>Uses native form steps, checkbox fields, file upload and consent fields for a straightforward rebuild.</p>
          </div>
        </aside>

        <div className="application-form-card">
          {submitted ? (
            <div className="application-success" role="status">
              <div className="success-icon">✓</div>
              <p className="kicker">Application received</p>
              <h2>Thanks for taking the next step.</h2>
              <p>EVP will review your group information and member roster, then contact the primary applicant with next steps.</p>
              <button className="button" type="button" onClick={() => { setSubmitted(false); setStep(1); }}>View the form again</button>
            </div>
          ) : (
            <>
              <div className="application-form-heading">
                <div><span>Formal Partnership Application</span><small>Four-step HubSpot-ready mockup · validation disabled</small></div>
                <em>Step {step} of 4</em>
              </div>

              <div className="application-progress" aria-label="Application progress">
                {stepLabels.map((label, index) => {
                  const number = index + 1;
                  return (
                    <button
                      className={number === step ? "active" : number < step ? "complete" : ""}
                      key={label}
                      type="button"
                      onClick={() => setStep(number)}
                      aria-label={`Go to step ${number}: ${label}`}
                    >
                      <span>{number < step ? "✓" : `0${number}`}</span><p>{label}</p>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={submitApplication}>
                  <section className="application-step" hidden={step !== 1} aria-labelledby="step-one-title">
                    <p className="step-eyebrow">Step 01</p>
                    <h2 id="step-one-title">Primary contact</h2>
                    <p className="step-intro">Start with the person EVP should contact throughout the application process.</p>
                    <div className="field-row">
                      <label>First name<input name="firstname" autoComplete="given-name" placeholder="First name" /></label>
                      <label>Last name<input name="lastname" autoComplete="family-name" placeholder="Last name" /></label>
                    </div>
                    <div className="field-row">
                      <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@ridinggroup.com" /></label>
                      <label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></label>
                    </div>
                    <label>Your role
                      <select name="group_role" defaultValue="">
                        <option value="" disabled>Select your role</option>
                        <option>Founder or Owner</option><option>President or Chair</option><option>Board Member</option><option>Event Organizer</option><option>Group Administrator</option><option>Other</option>
                      </select>
                    </label>
                  </section>

                  <section className="application-step" hidden={step !== 2} aria-labelledby="step-two-title">
                    <p className="step-eyebrow">Step 02</p>
                    <h2 id="step-two-title">Group profile</h2>
                    <p className="step-intro">Help EVP understand the size, location and riding activity of your community.</p>
                    <label>Riding group name<input name="group_name" placeholder="Official group name" /></label>
                    <label>Website or social page <small>(optional)</small><input name="group_url" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder="www.yourgroup.com or social profile" /></label>
                    <div className="field-row">
                      <label>Primary location<input name="location" placeholder="City, State" /></label>
                      <label>Paying members
                        <select name="member_count" defaultValue="">
                          <option value="" disabled>Select range</option>
                          <option>Under 25</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option>
                        </select>
                      </label>
                    </div>
                    <div className="field-row">
                      <label>Primary riding focus
                        <select name="riding_focus" defaultValue="">
                          <option value="" disabled>Select focus</option>
                          <option>Trail and recreational riding</option><option>Racing and competition</option><option>Both trail and racing</option>
                        </select>
                      </label>
                      <label>Organized events per year
                        <select name="annual_events" defaultValue="">
                          <option value="" disabled>Select range</option>
                          <option>0–2</option><option>3–5</option><option>6–10</option><option>11+</option>
                        </select>
                      </label>
                    </div>
                    <label>What would make this partnership valuable to your group?
                      <textarea name="partnership_goals" rows={4} placeholder="Tell us about your members, goals, events and priorities." />
                    </label>
                  </section>

                  <section className="application-step" hidden={step !== 3} aria-labelledby="step-three-title">
                    <p className="step-eyebrow">Step 03</p>
                    <h2 id="step-three-title">Review the program</h2>
                    <p className="step-intro">Review the core program structure and identify the additional partnership benefits that matter most to your group.</p>
                    <div className="program-terms-card">
                      <div className="program-terms-heading">
                        <div><p className="step-eyebrow">EVP Riding Group Partnership</p><h3>One program. Value for members and the group.</h3></div>
                        <span>12-Month Program</span>
                      </div>
                      <div className="program-terms-grid">
                        <div><strong>Up to 10%</strong><span>Member discount on eligible EVP products</span></div>
                        <div><strong>2% Cash Back</strong><span>On qualifying group spend above $10,000</span></div>
                        <div><strong>Paid Annually</strong><span>Program activity resets at annual renewal</span></div>
                      </div>
                      <p>Qualifying spend is calculated after discounts and returns, excludes taxes and shipping, and includes eligible EVP products and qualifying shop work installing EVP products. Cash back applies only to qualifying spend above the annual threshold.</p>
                    </div>
                    <fieldset className="application-fieldset">
                      <legend>Which additional partnership benefits interest your group? <small>(select all that apply)</small></legend>
                      <div className="application-choice-grid">
                        {applicationBenefits.map((benefit, index) => (
                          <label key={benefit}><input type="checkbox" name="application_benefit_interest" value={benefit} /><span><b>0{index + 1}</b> {benefit}</span></label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="consent application-consent program-acknowledgement"><input type="checkbox" name="program_terms_acknowledged" /><span>I understand that eligibility, qualifying purchases, additional benefits and final program participation are subject to EVP approval and the complete program terms.</span></label>
                  </section>

                  <section className="application-step" hidden={step !== 4} aria-labelledby="step-four-title">
                    <p className="step-eyebrow">Step 04</p>
                    <h2 id="step-four-title">Upload your member roster</h2>
                    <p className="step-intro">Download the sample roster, add member information and attach the completed file. For this internal preview, no file is required and nothing is transmitted.</p>
                    <div className="template-download-card">
                      <div className="template-file-icon">01</div>
                      <div><strong>Download the EVP Member Roster Template</strong><p>Sample XLSX with member contact, address and vehicle fitment columns.</p></div>
                      <a className="template-download-button" href="/EVP-Riding-Group-Member-Roster-Template.xlsx" download>Download XLSX ↓</a>
                    </div>
                    <label className="upload-field" htmlFor="member-roster">
                      <b className="upload-step-number">02</b>
                      <strong>Attach completed member roster</strong>
                      <span>Choose an XLSX, XLS or CSV file to preview the upload experience.</span>
                      <span className="upload-button">{rosterFileName ? "Change file" : "Choose roster file"}</span>
                      <em>{rosterFileName || "No file selected"}</em>
                      <input
                        id="member-roster"
                        type="file"
                        name="member_roster"
                        accept=".xlsx,.xls,.csv"
                        onChange={(event) => setRosterFileName(event.target.files?.[0]?.name ?? "")}
                      />
                    </label>
                    <div className="roster-fields">
                      <span>Roster fields included</span>
                      <p><b>Required:</b> Riding group, first name, last name, email and data-sharing confirmation.</p>
                      <p><b>Optional:</b> Swag shipping address and primary vehicle year, make, model and trim/engine.</p>
                    </div>
                    <label className="consent application-consent"><input type="checkbox" name="authority_confirmed" /><span>I confirm that I am authorized to submit this application on behalf of the riding group.</span></label>
                    <label className="consent application-consent"><input type="checkbox" name="member_consent_confirmed" /><span>I confirm that members included in the roster have authorized the group to share their information with EVP for partnership administration, benefits, product fitment and optional swag fulfillment.</span></label>
                  </section>

                <div className="application-controls">
                  {step > 1 ? <button className="application-secondary" type="button" onClick={() => setStep((current) => current - 1)}>← Back</button> : <span />}
                  {step < 4 ? <button className="button" type="button" onClick={continueApplication}>Continue <span>→</span></button> : <button className="button" type="submit">Submit Application <span>→</span></button>}
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
