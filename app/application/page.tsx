"use client";

import { FormEvent, useState } from "react";

const stepLabels = ["Group Contact", "Partnership Fit", "Member Roster"];

export default function ApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function continueApplication() {
    setStep((current) => Math.min(3, current + 1));
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
        <a className="text-link application-back" href="/">← Back to program</a>
      </header>

      <section className="application-layout">
        <aside className="application-intro">
          <div>
            <p className="kicker">Ready to make it official?</p>
            <h1>Build something powerful together.</h1>
            <p>Tell us how your group rides, what matters to your members and which type of EVP support can make the biggest impact.</p>
          </div>

          <div className="application-expectations">
            <span>What you’ll need</span>
            <p><b>01</b> Group and primary contact details</p>
            <p><b>02</b> Membership, activities and partnership goals</p>
            <p><b>03</b> A completed member roster</p>
          </div>

          <div className="hubspot-ready-note">
            <strong>HubSpot-ready structure</strong>
            <p>Uses native form steps, radio fields, file upload and consent fields for a straightforward rebuild.</p>
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
                <div><span>Formal Partnership Application</span><small>Internal preview · validation disabled</small></div>
                <em>Step {step} of 3</em>
              </div>

              <div className="application-progress" aria-label="Application progress">
                {stepLabels.map((label, index) => {
                  const number = index + 1;
                  return (
                    <div className={number === step ? "active" : number < step ? "complete" : ""} key={label}>
                      <span>{number < step ? "✓" : `0${number}`}</span><p>{label}</p>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={submitApplication}>
                {step === 1 && (
                  <section className="application-step" aria-labelledby="step-one-title">
                    <p className="step-eyebrow">Step 01</p>
                    <h2 id="step-one-title">Primary contact and group</h2>
                    <p className="step-intro">Start with the person EVP should contact throughout the application process.</p>
                    <div className="field-row">
                      <label>First name<input name="firstname" autoComplete="given-name" placeholder="First name" /></label>
                      <label>Last name<input name="lastname" autoComplete="family-name" placeholder="Last name" /></label>
                    </div>
                    <div className="field-row">
                      <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@ridinggroup.com" /></label>
                      <label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" /></label>
                    </div>
                    <label>Riding group name<input name="group_name" placeholder="Official group name" /></label>
                    <div className="field-row">
                      <label>Your role
                        <select name="group_role" defaultValue="">
                          <option value="" disabled>Select your role</option>
                          <option>Founder or Owner</option><option>President or Chair</option><option>Board Member</option><option>Event Organizer</option><option>Group Administrator</option><option>Other</option>
                        </select>
                      </label>
                      <label>Website or social page <small>(optional)</small><input name="group_url" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder="www.yourgroup.com or social profile" /></label>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="application-step" aria-labelledby="step-two-title">
                    <p className="step-eyebrow">Step 02</p>
                    <h2 id="step-two-title">Your group and partnership fit</h2>
                    <p className="step-intro">These details help EVP understand your community and prepare the right partnership structure.</p>
                    <fieldset className="application-fieldset">
                      <legend>Which partnership option interests you most?</legend>
                      <div className="application-choice-grid">
                        <label><input type="radio" name="application_program" value="Member Preferred Pricing" /><span><b>01</b> Member Preferred Pricing</span></label>
                        <label><input type="radio" name="application_program" value="Group Growth Fund" /><span><b>02</b> Group Growth Fund</span></label>
                        <label><input type="radio" name="application_program" value="Official EVP Group Partner" /><span><b>03</b> Official EVP Group Partner</span></label>
                        <label><input type="radio" name="application_program" value="Not sure" /><span><b>?</b> Help us choose</span></label>
                      </div>
                    </fieldset>
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
                )}

                {step === 3 && (
                  <section className="application-step" aria-labelledby="step-three-title">
                    <p className="step-eyebrow">Step 03</p>
                    <h2 id="step-three-title">Upload your member roster</h2>
                    <p className="step-intro">Use the EVP template so member eligibility, vehicle fitment and optional swag fulfillment information can be reviewed consistently.</p>
                    <div className="template-download-card">
                      <div className="template-file-icon">XLSX</div>
                      <div><strong>EVP Member Roster Template</strong><p>Includes required member contact fields plus optional address and vehicle fitment columns.</p></div>
                      <a href="/EVP-Riding-Group-Member-Roster-Template.xlsx" download>Download template ↓</a>
                    </div>
                    <label className="upload-field">Completed member roster
                      <span>Upload the completed EVP template in XLSX, XLS or CSV format.</span>
                      <input type="file" name="member_roster" accept=".xlsx,.xls,.csv" />
                    </label>
                    <div className="roster-fields">
                      <span>Roster fields included</span>
                      <p><b>Required:</b> Riding group, first name, last name, email and data-sharing confirmation.</p>
                      <p><b>Optional:</b> Swag shipping address and primary vehicle year, make, model and trim/engine.</p>
                    </div>
                    <label className="consent application-consent"><input type="checkbox" name="authority_confirmed" /><span>I confirm that I am authorized to submit this application on behalf of the riding group.</span></label>
                    <label className="consent application-consent"><input type="checkbox" name="member_consent_confirmed" /><span>I confirm that members included in the roster have authorized the group to share their information with EVP for partnership administration, benefits, product fitment and optional swag fulfillment.</span></label>
                  </section>
                )}

                <div className="application-controls">
                  {step > 1 ? <button className="application-secondary" type="button" onClick={() => setStep((current) => current - 1)}>← Back</button> : <span />}
                  {step < 3 ? <button className="button" type="button" onClick={continueApplication}>Continue <span>→</span></button> : <button className="button" type="submit">Submit Application <span>→</span></button>}
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
