"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Deliverable = {
  id: string;
  title: string;
  description: string;
  owner: string;
  done: boolean;
};

const STORAGE_KEY = "evp-riding-group-project-deliverables-v3";
const ownerOptions = ["Unassigned", "Dustin", "John G", "Todd H"];

const seededDeliverables: Deliverable[] = [
  {
    id: "packages",
    title: "Finalize Program Packages",
    description: "Build and approve the specific packages, including actual discount percentages, cash-back rates, allowances, benefit limits and any product or program exceptions.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "onboarding",
    title: "Build the Group Onboarding Workflow",
    description: "Define the complete workflow for bringing a new riding group into the program, from initial interest and review through application, approval, activation and ongoing management.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "legal",
    title: "Finalize Legal Disclaimers and Program Terms",
    description: "Add the legal disclaimers and small print needed on the application and confirmation. Cover discount limitations, unauthorized use of the EVP brand, and restrictions on representing or binding EVP or entering contracts or commitments on EVP’s behalf.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "alignment",
    title: "Align Sales, Marketing, Operations and Finance",
    description: "Make sure everyone is aligned on the plan and understands how EVP will track, approve and deliver benefits to participating riding groups.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "hubspot-form",
    title: "Build the HubSpot Form and Update the Netlify Draft",
    description: "Build the form in HubSpot, then update the Netlify development version with the approved design and copy.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "shopify-page",
    title: "Build the Draft Shopify Page and Connect HubSpot",
    description: "Port or rebuild the draft page in Shopify and connect the HubSpot form so submissions are captured correctly.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "lead-routing",
    title: "Confirm Lead Routing and Automation with Todd",
    description: "Confirm lead assignment with Todd, then create a new HubSpot automation—or update the existing automation—so leads are routed correctly.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "automation",
    title: "Build and Test HubSpot Workflows",
    description: "Build the HubSpot workflows and automations needed to manage riding groups, notify internal owners, handle follow-up and keep program statuses current. Test the full process before launch.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "metrics",
    title: "Set Up Program Tracking and Metrics",
    description: "Put tracking in place for key program metrics, including the number of participating groups, new contacts, program revenue and any other measures the team agrees are important.",
    owner: "Unassigned",
    done: false,
  },
];

export default function ProjectChecklistPage() {
  const [items, setItems] = useState<Deliverable[]>(seededDeliverables);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("Unassigned");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved) as Deliverable[]);
      } catch {
        setItems(seededDeliverables);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const counts = useMemo(() => ({
    open: items.filter((item) => !item.done).length,
    done: items.filter((item) => item.done).length,
    all: items.length,
  }), [items]);

  const openItems = useMemo(() => items.filter((item) => !item.done), [items]);
  const doneItems = useMemo(() => items.filter((item) => item.done), [items]);

  function submitDeliverable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setItems((current) => [...current, {
      id: `deliverable-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      owner,
      done: false,
    }]);
    setTitle("");
    setDescription("");
    setOwner("Unassigned");
  }

  function toggleDeliverable(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  function updateOwner(id: string, nextOwner: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, owner: nextOwner } : item));
  }

  function updateText(id: string, field: "title" | "description", value: string, element: HTMLElement) {
    const cleanedValue = value.trim();
    if (!cleanedValue) {
      const existingItem = items.find((item) => item.id === id);
      element.textContent = existingItem?.[field] ?? "";
      return;
    }
    setItems((current) => current.map((item) => item.id === id ? { ...item, [field]: cleanedValue } : item));
  }

  function moveDeliverable(id: string, direction: -1 | 1, sectionItems: Deliverable[]) {
    const currentVisibleIndex = sectionItems.findIndex((item) => item.id === id);
    const targetItem = sectionItems[currentVisibleIndex + direction];
    if (!targetItem) return;

    setItems((current) => {
      const next = [...current];
      const fromIndex = next.findIndex((item) => item.id === id);
      const toIndex = next.findIndex((item) => item.id === targetItem.id);
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }

  function renderDeliverable(item: Deliverable, index: number, sectionItems: Deliverable[], rankOffset = 0) {
    return (
      <article className={`deliverable-card${item.done ? " is-done" : ""}`} key={item.id}>
        <div className="deliverable-rank"><span>Rank</span><strong>{String(rankOffset + index + 1).padStart(2, "0")}</strong></div>
        <div className="deliverable-content">
          <label className="deliverable-check"><input type="checkbox" checked={item.done} onChange={() => toggleDeliverable(item.id)} /><span>{item.done ? "Completed" : "Mark done"}</span></label>
          <h3 contentEditable suppressContentEditableWarning role="textbox" aria-label={`Edit title: ${item.title}`} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } }} onBlur={(event) => updateText(item.id, "title", event.currentTarget.innerText, event.currentTarget)}>{item.title}</h3>
          <p contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label={`Edit description: ${item.title}`} onBlur={(event) => updateText(item.id, "description", event.currentTarget.innerText, event.currentTarget)}>{item.description}</p>
          <label className="deliverable-owner"><span>Owner</span><select value={ownerOptions.includes(item.owner) ? item.owner : "Unassigned"} onChange={(event) => updateOwner(item.id, event.target.value)}>{ownerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>
        <div className="deliverable-actions">
          <div className="rank-actions" aria-label={`Reorder ${item.title}`}>
            <button type="button" onClick={() => moveDeliverable(item.id, -1, sectionItems)} disabled={index === 0} aria-label="Move up">↑</button>
            <button type="button" onClick={() => moveDeliverable(item.id, 1, sectionItems)} disabled={index === sectionItems.length - 1} aria-label="Move down">↓</button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <main className="checklist-page">
      <div className="announcement">EVP Riding Group Partnership Program · Internal Project Checklist</div>
      <header className="site-header checklist-header">
        <a className="brand" href="/" aria-label="Back to EVP Riding Group Partnerships">
          <img src="https://evopowersports.com/cdn/shop/files/Main_Nav_Logo-EVP_1_205x.svg?v=1701447538" alt="Evolution Powersports" />
        </a>
        <nav aria-label="Internal project navigation">
          <a href="/">Website</a>
          <a href="/application">Application</a>
          <a href="/project-checklist" aria-current="page">Project Checklist</a>
        </nav>
        <span className="checklist-save-status">Saved in this browser</span>
      </header>

      <section className="checklist-hero">
        <div>
          <p className="kicker">V1 launch plan</p>
          <h1>Deliverables that move the program forward.</h1>
          <p>Add work, assign an owner, rank priorities and separate what is still open from what is complete.</p>
        </div>
        <div className="checklist-summary" aria-label="Deliverable summary">
          <div><strong>{counts.open}</strong><span>Open</span></div>
          <div><strong>{counts.done}</strong><span>Done</span></div>
          <div><strong>{counts.all}</strong><span>Total</span></div>
        </div>
      </section>

      <section className="checklist-workspace">
        <form className="deliverable-form" onSubmit={submitDeliverable}>
          <div className="deliverable-form-heading">
            <div><p className="kicker">Add to the plan</p><h2>New deliverable</h2></div>
          </div>
          <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to be delivered?" required /></label>
          <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add the details, decisions and definition of done." rows={6} required /></label>
          <label>Owner<select value={owner} onChange={(event) => setOwner(event.target.value)}>{ownerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <button className="button submit-button" type="submit">Add Deliverable <span>→</span></button>
        </form>

        <div className="deliverables-panel">
          <div className="deliverables-toolbar">
            <div>
              <p className="kicker">Working list</p>
              <h2>Open deliverables</h2>
              <small>Click any title or description to edit · changes save automatically</small>
            </div>
          </div>

          <div className="deliverables-list">
            {openItems.length === 0
              ? <div className="deliverables-empty"><h3>All caught up.</h3><p>Completed deliverables are listed below.</p></div>
              : openItems.map((item, index) => renderDeliverable(item, index, openItems))}
          </div>

          <section className="completed-deliverables-section" aria-labelledby="completed-deliverables-heading">
            <div className="completed-deliverables-heading">
              <h2 id="completed-deliverables-heading">Completed deliverables</h2>
              <span>{counts.done} Done</span>
            </div>
            <div className="deliverables-list">
              {doneItems.length === 0
                ? <div className="deliverables-empty completed-empty"><h3>Nothing completed yet.</h3><p>Finished work will move here automatically.</p></div>
                : doneItems.map((item, index) => renderDeliverable(item, index, doneItems, openItems.length))}
            </div>
          </section>
          </div>
      </section>
    </main>
  );
}
