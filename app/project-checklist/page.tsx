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

const STORAGE_KEY = "evp-riding-group-project-deliverables-v1";
const ownerOptions = ["Unassigned", "Dustin", "John G", "Todd H"];

const seededDeliverables: Deliverable[] = [
  {
    id: "packages",
    title: "Finalize partnership packages and commercial terms",
    description: "Confirm the actual numbers and rules for each option: member discount percentages, product exclusions and caps; group cash-back rate, calculation and payout timing; and official partner allowances, merchandise, event support and giveaway levels. Document eligibility, annual renewal and EVP approval rights.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "eligibility",
    title: "Define group eligibility and member verification",
    description: "Set the minimum qualifications for participating groups and dues-paying members. Finalize roster requirements, verification frequency, annual expiration and renewal, vehicle fitment data, member consent and the process for adding or removing members.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "onboarding",
    title: "Build the end-to-end riding group onboarding workflow",
    description: "Map every step from initial interest through review, package recommendation, formal application, roster collection, internal approval, benefit activation, welcome communications, annual renewal and offboarding. Define the status, owner and expected turnaround time for each step.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "legal",
    title: "Complete legal terms, disclaimers and program small print",
    description: "Add appropriate language to the application, confirmation and program terms covering discount limitations, product exclusions, eligibility and expiration; unauthorized use of EVP names, logos or brand assets; confidentiality and data sharing; termination and program changes; and clear restrictions preventing a group from representing itself as an EVP agent, binding EVP or entering agreements or commitments on EVP’s behalf.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "alignment",
    title: "Approve the cross-functional operating plan",
    description: "Get Sales, Marketing, Operations, eCommerce and Finance aligned on how benefits are approved, activated, fulfilled, tracked and reported. Document decision-makers, handoffs, service expectations, budget ownership and escalation paths.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "benefit-fulfillment",
    title: "Build the benefit fulfillment and exception process",
    description: "Document how EVP will activate member pricing, attribute purchases, fulfill labor benefits, approve event support, order co-branded merchandise and run product giveaways. Include budgets, inventory checks, exceptions, cancellations and who can approve each benefit.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "website",
    title: "Launch the partnership webpage and HubSpot interest form",
    description: "Move the approved V1 page into the production Shopify experience, recreate and connect the lead-generation form in HubSpot, confirm consent language and ownership, and test submissions, notifications, analytics and mobile behavior.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "application",
    title: "Build the formal HubSpot application and member roster process",
    description: "Recreate the formal multi-step application, confirmation experience, downloadable roster template and secure file-upload field. Map every property to HubSpot, define required fields for launch and establish how group, contact and member information will be associated and maintained.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "automation",
    title: "Build and test HubSpot workflows and automations",
    description: "Configure internal notifications, ownership, tasks, lifecycle and program statuses, missing-information follow-up, acceptance and rejection communications, activation handoffs and annual renewal reminders. Test every path with sample records before launch.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "finance",
    title: "Establish financial reconciliation and payout reporting",
    description: "Define how qualifying purchases are attributed to members and groups, how returns and cancellations are handled, when cash back or allowances are calculated, who approves payouts and what audit trail and reporting Finance needs.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "metrics",
    title: "Define program metrics, dashboard and reporting cadence",
    description: "Track active groups, new contacts, applications, approvals, enrolled members, attributed orders and revenue, discount cost, group cash back, partner support spend, events, engagement, retention and renewal. Assign metric definitions, sources, owners and a regular review cadence.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "pilot",
    title: "Recruit pilot groups and complete a controlled V1 launch",
    description: "Select a small mix of trail and race-oriented groups, run them through the full experience, capture feedback and operational issues, verify reporting and fulfillment, and agree on the fixes required before a broader launch.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "communications",
    title: "Prepare launch communications, training and support materials",
    description: "Create the internal program guide, FAQs and team training; group acceptance and welcome communications; member activation instructions; promotional assets; and a clear support and escalation path for group leaders and members.",
    owner: "Unassigned",
    done: false,
  },
  {
    id: "launch-qa",
    title: "Complete final launch readiness and ownership handoff",
    description: "Confirm legal approval, budgets, benefit rules, CRM permissions, privacy handling, analytics, form routing, downloads, uploads, emails, mobile QA and named post-launch owners. Record remaining V2 items separately so they do not block the V1 launch.",
    owner: "Unassigned",
    done: false,
  },
];

export default function ProjectChecklistPage() {
  const [items, setItems] = useState<Deliverable[]>(seededDeliverables);
  const [filter, setFilter] = useState<Filter>("open");
  const [ready, setReady] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  function resetForm() {
    setTitle("");
    setDescription("");
    setOwner("Unassigned");
    setEditingId(null);
  }

  function submitDeliverable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId
        ? { ...item, title: title.trim(), description: description.trim(), owner }
        : item));
    } else {
      setItems((current) => [...current, {
        id: `deliverable-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        owner,
        done: false,
      }]);
      setFilter("open");
    }
    resetForm();
  }

  function editDeliverable(item: Deliverable) {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setOwner(ownerOptions.includes(item.owner) ? item.owner : "Unassigned");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleDeliverable(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  function deleteDeliverable(id: string) {
    if (window.confirm("Delete this deliverable?")) {
      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    }
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
            <div><p className="kicker">{editingId ? "Editing deliverable" : "Add to the plan"}</p><h2>{editingId ? "Update deliverable" : "New deliverable"}</h2></div>
            {editingId && <button type="button" className="text-button" onClick={resetForm}>Cancel edit</button>}
          </div>
          <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to be delivered?" required /></label>
          <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add the details, decisions and definition of done." rows={6} required /></label>
          <label>Owner<select value={owner} onChange={(event) => setOwner(event.target.value)}>{ownerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <button className="button submit-button" type="submit">{editingId ? "Save Changes" : "Add Deliverable"} <span>→</span></button>
        </form>

        <div className="deliverables-panel">
          <div className="deliverables-toolbar">
            <div>
              <p className="kicker">Working list</p>
              <h2>{filter === "open" ? "Open deliverables" : filter === "done" ? "Completed deliverables" : "All deliverables"}</h2>
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
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="deliverable-owner"><span>Owner</span><strong>{item.owner}</strong></div>
                </div>
                <div className="deliverable-actions">
                  <div className="rank-actions" aria-label={`Reorder ${item.title}`}>
                    <button type="button" onClick={() => moveDeliverable(item.id, -1)} disabled={index === 0} aria-label="Move up">↑</button>
                    <button type="button" onClick={() => moveDeliverable(item.id, 1)} disabled={index === visibleItems.length - 1} aria-label="Move down">↓</button>
                  </div>
                  <button type="button" onClick={() => editDeliverable(item)}>Edit</button>
                  <button type="button" className="delete-action" onClick={() => deleteDeliverable(item.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
