"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

const REVIEW_PASSWORD = "EVP-Ride-2026";
const ACCESS_KEY = "evp-riding-group-review-access";

export default function ReviewGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(ACCESS_KEY) === "granted");
    setReady(true);
  }, []);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === REVIEW_PASSWORD) {
      window.sessionStorage.setItem(ACCESS_KEY, "granted");
      setUnlocked(true);
      setError("");
      return;
    }
    setError("That password doesn’t match. Please try again.");
  }

  if (!ready || !unlocked) {
    return (
      <main className="review-gate">
        <div className="review-gate-image" aria-hidden="true" />
        <section className="review-gate-panel">
          <img src="https://evopowersports.com/cdn/shop/files/Main_Nav_Logo-EVP_1_205x.svg?v=1701447538" alt="Evolution Powersports" />
          <div>
            <p className="kicker">Private Team Preview</p>
            <h1>Riding Group Partnership Program</h1>
            <p>This page is being shared for review. Enter the provided password to continue.</p>
          </div>
          <form onSubmit={unlock}>
            <label htmlFor="review-password">Review password</label>
            <input id="review-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" autoFocus={ready} />
            {error && <p className="review-gate-error" role="alert">{error}</p>}
            <button className="button" type="submit">View Preview <span>→</span></button>
          </form>
          <small>Evolution Powersports · Shared for internal review</small>
        </section>
      </main>
    );
  }

  return children;
}
