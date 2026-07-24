"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Deliverable = {
  id: string;
  title: string;
  description: string;
  owner: string;
  done: boolean;
};

type Filter = "open" | "done" | "all";

const STORAGE_KEY = "evp-riding-group-project-deliverables-v2";
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
    id: "website",
    title: "Launch the Webpage and Connect HubSpot",
    description: "Launch the partnership webpage, build the form in HubSpot and confirm that submissions, routing and follow-up are connected and working correctly.",
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
  const [filter, setFilter] = useState<Filter>("open");
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

  const visibleItems = useMemo(() => items.filter((item) => {
    if (filter === "open") return !item.done;
    if (filter === "done") return item.done;
    return true;
  }), [filter, items]);

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
    setFilter("open");
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

  function moveDeliverable(id: string, direction: -1 | 1) {
    const currentVisibleIndex = visibleItems.findIndex((item) => item.id === id);
    const targetItem = visibleItems[currentVisibleIndex + direction];
    if (!targetItem) return;

    setItems((current) => {
      const next = [...current];
      const fromIndex = next.findIndex((item) => item.id === id);
      const toIndex = next.findIndex((item) => item.id === targetItem.id);
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
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
              <h2>{filter === "open" ? "Open deliverables" : filter === "done" ? "Completed deliverables" : "All deliverables"}</h2>
              <small>Click any title or description to edit · changes save automatically</small>
            </div>
            <div className="checklist-filters" aria-label="Filter deliverables">
              {(["open", "done", "all"] as Filter[]).map((option) => (
                <button className={filter === option ? "active" : ""} type="button" onClick={() => setFilter(option)} key={option}>
                  {option === "open" ? "Open" : option === "done" ? "Done" : "All"} <span>{counts[option]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="deliverables-list">
            {visibleItems.length === 0 ? (
              <div className="deliverables-empty"><h3>Nothing here yet.</h3><p>Change the filter or add a new deliverable.</p></div>
            ) : visibleItems.map((item, index) => (
              <article className={`deliverable-card${item.done ? " is-done" : ""}`} key={item.id}>
                <div className="deliverable-rank"><span>Rank</span><strong>{String(items.findIndex((candidate) => candidate.id === item.id) + 1).padStart(2, "0")}</strong></div>
                <div className="deliverable-content">
                  <label className="deliverable-check"><input type="checkbox" checked={item.done} onChange={() => toggleDeliverable(item.id)} /><span>{item.done ? "Completed" : "Mark done"}</span></label>
                  <h3 contentEditable suppressContentEditableWarning role="textbox" aria-label={`Edit title: ${item.title}`} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } }} onBlur={(event) => updateText(item.id, "title", event.currentTarget.innerText, event.currentTarget)}>{item.title}</h3>
                  <p contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label={`Edit description: ${item.title}`} onBlur={(event) => updateText(item.id, "description", event.currentTarget.innerText, event.currentTarget)}>{item.description}</p>
                  <label className="deliverable-owner"><span>Owner</span><select value={ownerOptions.includes(item.owner) ? item.owner : "Unassigned"} onChange={(event) => updateOwner(item.id, event.target.value)}>{ownerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                </div>
                <div className="deliverable-actions">
                  <div className="rank-actions" aria-label={`Reorder ${item.title}`}>
                    <button type="button" onClick={() => moveDeliverable(item.id, -1)} disabled={index === 0} aria-label="Move up">↑</button>
                    <button type="button" onClick={() => moveDeliverable(item.id, 1)} disabled={index === visibleItems.length - 1} aria-label="Move down">↓</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
