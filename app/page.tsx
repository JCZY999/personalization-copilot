"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CaretDown,
  Check,
  CheckCircle,
  Clock,
  DotsThree,
  FunnelSimple,
  Lightning,
  MagnifyingGlass,
  PaperPlaneTilt,
  PencilSimple,
  SidebarSimple,
  Sparkle,
  Target,
  TrendUp,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react";

type Lead = {
  id: number;
  initials: string;
  name: string;
  company: string;
  role: string;
  score: number;
  stage: string;
  signal: string;
  action: string;
  actionType: "email" | "call" | "nurture";
  when: string;
  confidence: number;
  color: string;
};

const leads: Lead[] = [
  { id: 1, initials: "JM", name: "Jordan Mitchell", company: "Northstar Labs", role: "VP of Operations", score: 92, stage: "Decision", signal: "Viewed enterprise pricing twice", action: "Send security case study", actionType: "email", when: "Today, 10:30 AM", confidence: 88, color: "coral" },
  { id: 2, initials: "AS", name: "Avery Santos", company: "Layered Health", role: "Director of IT", score: 87, stage: "Evaluation", signal: "Attended security webinar", action: "Schedule a technical follow-up", actionType: "call", when: "Today, 2:00 PM", confidence: 84, color: "blue" },
  { id: 3, initials: "MC", name: "Morgan Chen", company: "Fieldwork", role: "Head of Growth", score: 81, stage: "Evaluation", signal: "Shared ROI guide internally", action: "Send customer results brief", actionType: "email", when: "Tomorrow, 9:15 AM", confidence: 79, color: "gold" },
  { id: 4, initials: "RP", name: "Riley Patel", company: "Morrow & Co.", role: "COO", score: 74, stage: "Awareness", signal: "Returned after 18 days", action: "Add to executive nurture", actionType: "nurture", when: "Friday", confidence: 72, color: "violet" },
];

const nav = ["Overview", "Priority leads", "Recommendations", "Content library", "Insights"];

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);
  const [activeNav, setActiveNav] = useState("Priority leads");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ready" | "approved" | "dismissed">("ready");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("Hi Jordan,\n\nI noticed your team has been exploring how Current supports enterprise security requirements. Based on your interest, I thought Northstar Labs might find our security case study useful—it covers how a similar operations team shortened their review cycle by 30%.\n\nWould it be helpful if I sent over the full brief?\n\nBest,\nMaya");

  const filtered = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.company}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = leads.find((lead) => lead.id === selectedId) ?? leads[0];

  function selectLead(id: number) {
    setSelectedId(id);
    setStatus("ready");
    setEditing(false);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Lightning weight="fill" /></span><span>Current</span></div>
        <nav>
          <p className="eyebrow">Workspace</p>
          {nav.map((item) => <button key={item} className={activeNav === item ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(item)}><span className="nav-dot" />{item}{item === "Recommendations" && <span className="count">8</span>}</button>)}
        </nav>
        <div className="sidebar-footer">
          <div className="usage"><div className="usage-top"><span>Monthly actions</span><strong>68%</strong></div><div className="progress"><span /></div><small>6,842 of 10,000 used</small></div>
          <button className="profile"><span className="avatar mini">MK</span><span><strong>Maya Kim</strong><small>Acme workspace</small></span><CaretDown /></button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="icon-button mobile"><SidebarSimple /></button>
          <div className="search"><MagnifyingGlass /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search leads, companies, or signals" /><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-button"><Bell /></button><button className="invite"><UsersThree /> Invite team</button></div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div><p className="overline"><Sparkle weight="fill" /> AI PERSONALIZATION COPILOT</p><h1>Your highest-impact moves,<br /><em>ready for review.</em></h1><p>Current reads the signals, ranks the opportunities, and prepares the next step. You stay in control.</p></div>
            <div className="heading-actions"><button className="secondary"><Clock /> Activity</button><button className="primary"><Lightning weight="fill" /> Run analysis</button></div>
          </div>

          <section className="metric-grid">
            <article><span className="metric-icon mint"><Target /></span><div><small>High-intent leads</small><strong>24</strong><p><b>+18%</b> from last week</p></div><TrendUp /></article>
            <article><span className="metric-icon peach"><PaperPlaneTilt /></span><div><small>Actions ready</small><strong>8</strong><p>4 need approval today</p></div><ArrowUpRight /></article>
            <article><span className="metric-icon lavender"><CheckCircle /></span><div><small>Acceptance rate</small><strong>86%</strong><p><b>+7.2%</b> this month</p></div><TrendUp /></article>
          </section>

          <section className="work-grid">
            <div className="lead-panel panel">
              <div className="panel-title"><div><h2>Priority leads</h2><span>{filtered.length} opportunities ranked by intent</span></div><button className="filter"><FunnelSimple /> Filter</button></div>
              <div className="lead-list">
                {filtered.map((lead, index) => (
                  <button className={selected.id === lead.id ? "lead active" : "lead"} key={lead.id} onClick={() => selectLead(lead.id)}>
                    <span className="rank">{String(index + 1).padStart(2, "0")}</span><span className={`avatar ${lead.color}`}>{lead.initials}</span>
                    <span className="lead-main"><strong>{lead.name}</strong><small>{lead.role} · {lead.company}</small><span className="signal"><Sparkle weight="fill" /> {lead.signal}</span></span>
                    <span className="lead-score"><strong>{lead.score}</strong><small>intent</small></span>
                  </button>
                ))}
              </div>
              <button className="view-all">View all 24 priority leads <ArrowUpRight /></button>
            </div>

            <aside className="recommendation panel">
              <div className="rec-top"><span className="live-dot" /> RECOMMENDATION <button><DotsThree /></button></div>
              <div className="person"><span className={`avatar large ${selected.color}`}>{selected.initials}</span><div><h2>{selected.name}</h2><p>{selected.role} at {selected.company}</p></div><span className="score-pill">{selected.score} intent</span></div>
              <div className="reasoning">
                <div className="reasoning-heading"><Sparkle weight="fill" /><strong>Why now</strong><span>{selected.confidence}% confidence</span></div>
                <ul><li><Check /> {selected.signal}</li><li><Check /> Matches 12 recently converted accounts</li><li><Check /> Most responsive Tuesday mornings</li></ul>
              </div>
              <div className="next-action"><p className="label">NEXT BEST ACTION</p><div className="action-row"><span><PaperPlaneTilt /></span><div><strong>{selected.action}</strong><small>{selected.when} · Email</small></div></div></div>
              <div className="draft-box">
                <div className="draft-head"><span>Personalized draft</span><button onClick={() => setEditing(!editing)}><PencilSimple /> {editing ? "Done" : "Edit"}</button></div>
                {editing ? <textarea value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Edit personalized email" /> : <p>{draft.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</p>}
              </div>
              {status === "ready" ? <div className="decision-row"><button className="dismiss" onClick={() => setStatus("dismissed")}><X /> Dismiss</button><button className="approve" onClick={() => setStatus("approved")}><Check /> Approve & queue</button></div> : <div className={`status-message ${status}`}><CheckCircle weight="fill" /> {status === "approved" ? "Approved and queued for the recommended time." : "Recommendation dismissed. Your feedback was recorded."}<button onClick={() => setStatus("ready")}>Undo</button></div>}
              <p className="audit"><UserCircle /> Human approval required · Recommendation generated 4 min ago</p>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
