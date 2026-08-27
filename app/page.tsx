"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
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
const navRoutes: Record<string, string> = { "Overview": "/", "Priority leads": "/priority-leads", "Recommendations": "/recommendations", "Content library": "/content-library", "Insights": "/insights" };

function OverviewPage({ openLeads }: { openLeads: () => void }) {
  return <><div className="section-heading"><div><p className="overline"><Sparkle weight="fill" /> WORKSPACE OVERVIEW</p><h1>Good morning. Here&apos;s what<br /><em>deserves attention.</em></h1><p>A concise view of customer intent, pending decisions, and the impact of actions your team approved.</p></div><button className="primary" onClick={openLeads}><Target /> Review priority leads</button></div><section className="metric-grid overview-metrics"><article><span className="metric-icon mint"><Target /></span><div><small>Pipeline influenced</small><strong>$482k</strong><p><b>+12.4%</b> this month</p></div><TrendUp /></article><article><span className="metric-icon peach"><PaperPlaneTilt /></span><div><small>Decisions pending</small><strong>8</strong><p>4 are time-sensitive</p></div><ArrowUpRight /></article><article><span className="metric-icon lavender"><CheckCircle /></span><div><small>Actions completed</small><strong>126</strong><p><b>91%</b> delivered on time</p></div><TrendUp /></article></section><section className="overview-grid"><article className="panel overview-card"><div className="panel-title"><div><h2>Today&apos;s focus</h2><span>Ordered by expected impact</span></div></div><div className="focus-list"><button onClick={openLeads}><span className="focus-number">01</span><div><strong>Review 4 high-intent leads</strong><small>Potential pipeline impact · $148k</small></div><ArrowUpRight /></button><button><span className="focus-number">02</span><div><strong>Approve 3 personalized follow-ups</strong><small>Recommended send window closes at 2 PM</small></div><ArrowUpRight /></button><button><span className="focus-number">03</span><div><strong>Refresh the security proof point</strong><small>Used in 41% of decision-stage recommendations</small></div><ArrowUpRight /></button></div></article><article className="panel impact-card"><p className="label">WEEKLY IMPACT</p><h2>Personalized actions created <em>17 more conversations</em> this week.</h2><div className="impact-bars"><div><span>Approved actions</span><b style={{width:"86%"}} /></div><div><span>Customer responses</span><b style={{width:"64%"}} /></div><div><span>Meetings booked</span><b style={{width:"42%"}} /></div></div><p className="impact-note"><Sparkle weight="fill" /> Security and ROI content drove the strongest response.</p></article></section></>;
}

function RecommendationsPage() {
  const [approved, setApproved] = useState<number[]>([]);
  return <><div className="section-heading"><div><p className="overline"><Sparkle weight="fill" /> RECOMMENDATION QUEUE</p><h1>Eight thoughtful next steps,<br /><em>waiting on you.</em></h1><p>Review the agent&apos;s reasoning and approve only the actions that feel right for the customer.</p></div><span className="quiet-pill">8 ready · 4 today</span></div><section className="queue-list">{leads.slice(0,3).map((lead) => <article className="panel queue-card" key={lead.id}><div className="queue-person"><span className={`avatar ${lead.color}`}>{lead.initials}</span><div><strong>{lead.name}</strong><small>{lead.role} · {lead.company}</small></div><span className="score-pill">{lead.confidence}% confidence</span></div><div className="queue-copy"><p className="label">NEXT BEST ACTION</p><h2>{lead.action}</h2><p><Sparkle weight="fill" /> {lead.signal}. Similar actions performed 24% above baseline.</p></div><div className="queue-time"><Clock /><span><strong>{lead.when}</strong><small>Recommended window</small></span></div><div className="queue-actions">{approved.includes(lead.id) ? <span className="approved-label"><CheckCircle weight="fill" /> Approved and queued</span> : <><button className="secondary">View draft</button><button className="primary" onClick={() => setApproved([...approved, lead.id])}><Check /> Approve</button></>}</div></article>)}</section></>;
}

function ContentLibraryPage() {
  const content = [{title:"Enterprise security brief",type:"Case study",use:"Decision stage",lift:"+31%",color:"mint"},{title:"The operations ROI guide",type:"Guide",use:"Evaluation stage",lift:"+24%",color:"peach"},{title:"Implementation in 30 days",type:"Customer story",use:"Objection handling",lift:"+18%",color:"lavender"},{title:"Platform overview",type:"One-pager",use:"Awareness stage",lift:"+12%",color:"mint"}];
  return <><div className="section-heading"><div><p className="overline"><Sparkle weight="fill" /> APPROVED CONTENT</p><h1>Your best proof points,<br /><em>ready for the right moment.</em></h1><p>The agent only recommends material your team has reviewed and approved.</p></div><button className="primary">+ Add content</button></div><div className="library-toolbar"><div className="search library-search"><MagnifyingGlass /><input placeholder="Search approved content" /></div><button className="filter"><FunnelSimple /> All content</button></div><section className="content-grid">{content.map((item,index) => <article className="panel content-card" key={item.title}><div className={`content-preview ${item.color}`}><span>0{index+1}</span><Sparkle weight="fill" /></div><div className="content-info"><div><span className="content-type">{item.type}</span><span className="approved-dot"><Check /> Approved</span></div><h2>{item.title}</h2><p>Best for · {item.use}</p><div className="content-stats"><span>Response lift <b>{item.lift}</b></span><button><ArrowUpRight /></button></div></div></article>)}</section></>;
}

function InsightsPage() {
  return <><div className="section-heading"><div><p className="overline"><Sparkle weight="fill" /> PERFORMANCE INSIGHTS</p><h1>Learn what resonates,<br /><em>without losing context.</em></h1><p>See how human-approved personalization changes customer behavior over time.</p></div><button className="secondary"><Clock /> Last 30 days</button></div><section className="metric-grid"><article><span className="metric-icon mint"><TrendUp /></span><div><small>Conversion lift</small><strong>+22%</strong><p>vs. generic outreach</p></div></article><article><span className="metric-icon peach"><PaperPlaneTilt /></span><div><small>Reply rate</small><strong>18.4%</strong><p><b>+4.1%</b> this period</p></div></article><article><span className="metric-icon lavender"><CheckCircle /></span><div><small>Qualified meetings</small><strong>38</strong><p>From 126 approved actions</p></div></article></section><section className="insights-grid"><article className="panel chart-card"><div className="panel-title"><div><h2>Personalization impact</h2><span>Approved actions compared with baseline</span></div></div><div className="chart"><div className="chart-y"><span>30%</span><span>20%</span><span>10%</span><span>0%</span></div><div className="chart-bars">{[12,18,15,24,21,29].map((n,i)=><div key={i}><b style={{height:`${n*2.8}px`}} /><span>W{i+1}</span></div>)}</div></div></article><article className="panel signal-card"><p className="label">WHAT&apos;S WORKING</p><h2>Decision-stage buyers respond to <em>specific proof</em>, not broader product claims.</h2><ul><li><span>01</span><div><strong>Security case studies</strong><small>31% response lift</small></div></li><li><span>02</span><div><strong>Peer-company ROI</strong><small>24% response lift</small></div></li><li><span>03</span><div><strong>Implementation timelines</strong><small>18% response lift</small></div></li></ul></article></section></>;
}

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ready" | "approved" | "dismissed">("ready");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("Hi Jordan,\n\nI noticed your team has been exploring how Current supports enterprise security requirements. Based on your interest, I thought Northstar Labs might find our security case study useful—it covers how a similar operations team shortened their review cycle by 30%.\n\nWould it be helpful if I sent over the full brief?\n\nBest,\nMaya");

  const filtered = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.company}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = leads.find((lead) => lead.id === selectedId) ?? leads[0];
  const activeNav = Object.entries(navRoutes).find(([, route]) => route === pathname)?.[0] ?? "Overview";

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
          {nav.map((item) => <button key={item} className={activeNav === item ? "nav-item active" : "nav-item"} onClick={() => router.push(navRoutes[item])}><span className="nav-dot" />{item}{item === "Recommendations" && <span className="count">8</span>}</button>)}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="icon-button mobile"><SidebarSimple /></button>
          <div className="search"><MagnifyingGlass /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search leads, companies, or signals" /></div>
          <div className="top-actions"><button className="icon-button"><Bell /></button><button className="invite"><UsersThree /> Invite team</button></div>
        </header>

        <div className="content">
          {activeNav === "Overview" && <OverviewPage openLeads={() => router.push("/priority-leads")} />}
          {activeNav === "Recommendations" && <RecommendationsPage />}
          {activeNav === "Content library" && <ContentLibraryPage />}
          {activeNav === "Insights" && <InsightsPage />}
          {activeNav === "Priority leads" && <>
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
          </>}
        </div>
      </section>
    </main>
  );
}
