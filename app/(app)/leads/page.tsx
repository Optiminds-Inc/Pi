"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  fmtUSD,
  leads as initialLeads,
  type Lead,
  type LeadHeat,
  leadHeat,
  type LeadStatus,
} from "@/lib/mock";

const STATUS_FLOW: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "signed",
  "lost",
];

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Awaiting label",
  contacted: "Contacted",
  qualified: "Not signed yet",
  signed: "Signed",
  lost: "Disqualified",
};

const STATUS_DOT: Record<LeadStatus, string> = {
  new: "bg-ink-4",
  contacted: "bg-[#2383e2]",
  qualified: "bg-warning",
  signed: "bg-success",
  lost: "bg-danger",
};

type HeatFilter = "all" | LeadHeat;
type ViewMode = "list" | "board";

const HEAT_TABS: { id: HeatFilter; label: string }[] = [
  { id: "all", label: "All leads" },
  { id: "hot", label: "Hot" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
];

export default function LeadsPage() {
  const [view, setView] = useState<ViewMode>("list");
  const [heat, setHeat] = useState<HeatFilter>("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => heat === "all" || leadHeat(l.score) === heat)
      .filter((l) => {
        if (!q) return true;
        return (
          l.name.toLowerCase().includes(q) ||
          l.area.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q)
        );
      });
  }, [leads, heat, query]);

  const sorted = useMemo(
    () => filtered.slice().sort((a, b) => b.score - a.score),
    [filtered],
  );

  const grouped = useMemo(() => {
    const g: Record<LeadStatus, Lead[]> = {
      new: [],
      contacted: [],
      qualified: [],
      signed: [],
      lost: [],
    };
    for (const l of filtered) g[l.status].push(l);
    for (const k of STATUS_FLOW) g[k].sort((a, b) => b.score - a.score);
    return g;
  }, [filtered]);

  const counts = useMemo(() => {
    const c: Record<HeatFilter, number> = { all: 0, hot: 0, warm: 0, cool: 0 };
    for (const l of leads) {
      c.all += 1;
      c[leadHeat(l.score)] += 1;
    }
    return c;
  }, [leads]);

  const active = activeId ? leads.find((l) => l.id === activeId) ?? null : null;

  function setLeadStatus(id: string, next: LeadStatus) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: next } : l)),
    );
  }

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Score-ranked leads from every call and form. Mark each one so the agents learn what works."
      />

      <div className="px-10 pt-10 pb-12">
        <Kpis leads={leads} />

        <section className="mt-9">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {HEAT_TABS.map((t) => (
                <HeatChip
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  count={counts[t.id]}
                  active={heat === t.id}
                  onClick={() => setHeat(t.id)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <ViewSwitcher view={view} onChange={setView} />
              <SearchInput value={query} onChange={setQuery} />
            </div>
          </div>

          {view === "list" ? (
            <div className="space-y-3">
              {sorted.map((l) => (
                <LeadCard
                  key={l.id}
                  lead={l}
                  onMark={(s) => setLeadStatus(l.id, s)}
                  onOpen={() => setActiveId(l.id)}
                />
              ))}

              {sorted.length === 0 && (
                <div className="rounded-[14px] border border-line bg-paper px-6 py-14 text-center text-[13px] text-ink-4">
                  No leads match these filters.
                </div>
              )}
            </div>
          ) : (
            <div className="-mx-10 flex gap-3 overflow-x-auto px-10 pb-4">
              {STATUS_FLOW.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  leads={grouped[status]}
                  onOpen={setActiveId}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {active && (
        <LeadDetail
          lead={active}
          onClose={() => setActiveId(null)}
          onStatus={(s) => setLeadStatus(active.id, s)}
        />
      )}
    </>
  );
}

/* ——————————————————————————————————————— */
/*  View switcher — list / board              */
/* ——————————————————————————————————————— */

function ViewSwitcher({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-[8px] border border-line bg-paper p-0.5">
      <ViewSwitcherButton
        active={view === "list"}
        onClick={() => onChange("list")}
        label="List view"
      >
        <ListIcon />
      </ViewSwitcherButton>
      <ViewSwitcherButton
        active={view === "board"}
        onClick={() => onChange("board")}
        label="Board view"
      >
        <BoardIcon />
      </ViewSwitcherButton>
    </div>
  );
}

function ViewSwitcherButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={[
        "flex h-7 w-7 items-center justify-center rounded-[6px] transition-all duration-150",
        active
          ? "bg-paper-2 text-ink-1 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_1px_1px_rgba(15,17,21,0.04)]"
          : "text-ink-4 hover:text-ink-2",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ——————————————————————————————————————— */
/*  KPIs — four tiles                         */
/* ——————————————————————————————————————— */

function Kpis({ leads }: { leads: Lead[] }) {
  const newThisWeek = leads.length;
  const awaiting = leads.filter((l) => l.status === "new").length;
  const signed = leads.filter((l) => l.status === "signed").length;
  const signRate = newThisWeek
    ? Math.round((signed / newThisWeek) * 100)
    : 0;
  const hotToCallBack = leads.filter(
    (l) => leadHeat(l.score) === "hot" && l.status !== "signed" && l.status !== "lost",
  ).length;

  const tiles = [
    {
      label: "New this week",
      value: newThisWeek,
      sub: "across all channels",
      tone: "ink" as const,
    },
    {
      label: "Awaiting label",
      value: awaiting,
      sub: "tag to teach the agents",
      tone: awaiting > 0 ? "warning" : "ink",
    },
    {
      label: "Signed",
      value: signed,
      sub: `${signRate}% sign rate`,
      tone: "success" as const,
    },
    {
      label: "Hot to call back",
      value: hotToCallBack,
      sub: "highest-score unsigned",
      tone: hotToCallBack > 0 ? "danger" : "ink",
    },
  ] as const;

  return (
    <section className="animate-fade-in flex flex-wrap items-end gap-x-12 gap-y-8 border-b border-line pb-9 md:flex-nowrap">
      {tiles.map((t) => (
        <div key={t.label} className="min-w-[140px] flex-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-4">
            {t.label}
          </div>
          <div
            className={[
              "kpi-num mt-3",
              t.tone === "success"
                ? "text-success"
                : t.tone === "danger"
                  ? "text-danger"
                  : t.tone === "warning"
                    ? "text-warning"
                    : "",
            ].join(" ")}
            style={{ fontSize: "38px" }}
          >
            {t.value}
          </div>
          <div className="mt-1.5 text-[11.5px] text-ink-4">{t.sub}</div>
        </div>
      ))}
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Heat filter chip                          */
/* ——————————————————————————————————————— */

function HeatChip({
  id,
  label,
  count,
  active,
  onClick,
}: {
  id: HeatFilter;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-[32px] items-center gap-2 rounded-full px-4 text-[12.5px] font-medium transition-all duration-200",
        active
          ? "bg-ink-1 text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_1px_2px_rgba(0,0,0,0.12)]"
          : "border border-line bg-paper text-ink-2 hover:border-line-strong hover:text-ink-1",
      ].join(" ")}
    >
      {id !== "all" && <HeatGlyph heat={id} active={active} />}
      <span>{label}</span>
      <span
        className={[
          "tabular text-[11.5px]",
          active ? "text-paper/70" : "text-ink-4",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

function HeatGlyph({ heat, active }: { heat: LeadHeat; active: boolean }) {
  const color =
    heat === "hot"
      ? "bg-danger"
      : heat === "warm"
        ? "bg-warning"
        : "bg-ink-4";
  return (
    <span
      className={[
        "inline-block h-1.5 w-1.5 rounded-full",
        color,
        active ? "opacity-90" : "",
      ].join(" ")}
      aria-hidden
    />
  );
}

/* ——————————————————————————————————————— */
/*  Search input                              */
/* ——————————————————————————————————————— */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-[260px] sm:w-[240px]">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-4">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, case, source…"
        className="h-[32px] w-full rounded-full border border-line bg-paper pr-3 pl-8 text-[12.5px] text-ink-1 placeholder:text-ink-4 focus:border-line-strong focus:outline-none"
      />
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Lead card — list view                     */
/* ——————————————————————————————————————— */

function LeadCard({
  lead,
  onMark,
  onOpen,
}: {
  lead: Lead;
  onMark: (s: LeadStatus) => void;
  onOpen: () => void;
}) {
  const heat = leadHeat(lead.score);
  const accent =
    heat === "hot"
      ? "before:bg-danger"
      : heat === "warm"
        ? "before:bg-warning"
        : "before:bg-ink-5";

  return (
    <article
      className={[
        "card-interactive relative overflow-hidden rounded-[14px] border border-line bg-paper px-6 py-5 shadow-[var(--shadow-sm)]",
        "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:content-['']",
        accent,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3
              className="font-display text-ink-1"
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              {lead.name}
            </h3>
            <HeatBadge heat={heat} />
          </div>
          <div className="mt-1 text-[12px] text-ink-4">
            {areaLabel(lead.area)} · {lead.intakeAt}
          </div>
        </div>
        <ScoreDisplay score={lead.score} heat={heat} />
      </div>

      {lead.note && (
        <p className="mt-4 rounded-[10px] bg-paper-2/70 px-4 py-3 text-[13px] leading-[1.55] text-ink-2">
          {lead.note}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {lead.estValue != null && <ValuePill value={lead.estValue} />}
        <MetaPill>{lead.source}</MetaPill>
        <MetaPill>
          <span className="opacity-70">
            {lead.channel === "call" ? <PhoneIcon /> : <FormIcon />}
          </span>
          {lead.intakeMeta}
        </MetaPill>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11.5px] text-ink-4">Mark this lead:</span>
          <MarkChip
            tone="success"
            active={lead.status === "signed"}
            onClick={() => onMark("signed")}
          >
            <CheckIcon /> Signed
          </MarkChip>
          <MarkChip
            tone="warning"
            active={lead.status === "qualified" || lead.status === "contacted"}
            onClick={() => onMark("qualified")}
          >
            <RingIcon /> Not signed yet
          </MarkChip>
          <MarkChip
            tone="danger"
            active={lead.status === "lost"}
            onClick={() => onMark("lost")}
          >
            <CloseIcon /> Disqualified
          </MarkChip>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onOpen} className="btn-compact">
            Details
          </button>
          <button
            type="button"
            className="inline-flex h-[32px] items-center gap-1.5 rounded-md bg-ink-1 px-4 text-[12.5px] font-medium text-paper transition-colors duration-200 hover:bg-accent-hover"
          >
            <PhoneIcon />
            {lead.channel === "call" ? "Call back" : "Reach out"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ——————————————————————————————————————— */
/*  Kanban column + card — board view         */
/* ——————————————————————————————————————— */

function KanbanColumn({
  status,
  leads,
  onOpen,
}: {
  status: LeadStatus;
  leads: Lead[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col">
      <div className="mb-3 flex items-center gap-2 px-1.5">
        <span
          className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[status]}`}
        />
        <span className="text-[12.5px] font-medium text-ink-2">
          {STATUS_LABEL[status]}
        </span>
        <span className="text-[11px] tabular text-ink-4">{leads.length}</span>
      </div>
      <div className="flex min-h-[200px] flex-1 flex-col gap-2 rounded-[10px] bg-paper-2/40 p-2">
        {leads.map((l) => (
          <KanbanCard key={l.id} lead={l} onOpen={() => onOpen(l.id)} />
        ))}
        {leads.length === 0 && (
          <div className="py-10 text-center text-[12px] text-ink-4">
            No leads
          </div>
        )}
      </div>
    </div>
  );
}

function KanbanCard({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const heat = leadHeat(lead.score);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-[8px] border border-line bg-paper p-3.5 text-left shadow-[var(--shadow-sm)] transition-all hover:border-line-strong hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-[13px] font-medium leading-snug text-ink-1">
          {lead.name}
        </h4>
        <HeatDot heat={heat} />
      </div>
      <div className="mt-1.5 text-[11.5px] text-ink-4">
        {areaLabel(lead.area)} · {lead.source}
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-medium tabular text-ink-1">
            {lead.score}
          </span>
          <span className="text-[10px] text-ink-4">/ 100</span>
        </div>
        {lead.estValue != null && (
          <span className="text-[10.5px] font-medium tabular text-success">
            {fmtUSD(lead.estValue, { compact: true })}
          </span>
        )}
      </div>
    </button>
  );
}

function HeatDot({ heat }: { heat: LeadHeat }) {
  const color =
    heat === "hot"
      ? "bg-danger"
      : heat === "warm"
        ? "bg-warning"
        : "bg-ink-5";
  return (
    <span
      className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${color}`}
      aria-label={heat}
    />
  );
}

/* ——————————————————————————————————————— */
/*  Shared: badges + score                    */
/* ——————————————————————————————————————— */

function HeatBadge({ heat }: { heat: LeadHeat }) {
  if (heat === "hot")
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[2px] text-[10.5px] font-medium tracking-[0.02em]"
        style={{
          background: "var(--color-danger-soft)",
          color: "var(--color-danger)",
        }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-danger" />
        Hot lead
      </span>
    );
  if (heat === "warm")
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[2px] text-[10.5px] font-medium tracking-[0.02em]"
        style={{
          background: "var(--color-warning-soft)",
          color: "var(--color-warning)",
        }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
        Warm
      </span>
    );
  return (
    <span className="badge badge-quiet">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-5" />
      Cool
    </span>
  );
}

function ScoreDisplay({ score, heat }: { score: number; heat: LeadHeat }) {
  const color =
    heat === "hot"
      ? "text-success"
      : heat === "warm"
        ? "text-ink-1"
        : "text-ink-3";
  return (
    <div className="flex shrink-0 items-baseline gap-1.5">
      <div
        className={["kpi-num", color].join(" ")}
        style={{ fontSize: "30px" }}
      >
        {score}
      </div>
      <div className="text-[10.5px] tabular text-ink-4">/ 100</div>
    </div>
  );
}

function ValuePill({ value }: { value: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11.5px] font-medium tabular"
      style={{
        background: "var(--color-success-soft)",
        color: "var(--color-success)",
      }}
    >
      Est. {fmtUSD(value, { compact: true })}
    </span>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-[3px] text-[11.5px] text-ink-3">
      {children}
    </span>
  );
}

function MarkChip({
  children,
  tone,
  active,
  onClick,
}: {
  children: React.ReactNode;
  tone: "success" | "warning" | "danger";
  active: boolean;
  onClick: () => void;
}) {
  const activeStyle =
    tone === "success"
      ? {
          background: "var(--color-success-soft)",
          color: "var(--color-success)",
          borderColor: "transparent",
        }
      : tone === "warning"
        ? {
            background: "var(--color-warning-soft)",
            color: "var(--color-warning)",
            borderColor: "transparent",
          }
        : {
            background: "var(--color-danger-soft)",
            color: "var(--color-danger)",
            borderColor: "transparent",
          };

  const idleColor =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : "text-danger";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-[28px] items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium transition-all duration-150",
        active ? "" : `border-line bg-paper hover:bg-paper-2 ${idleColor}`,
      ].join(" ")}
      style={active ? activeStyle : undefined}
    >
      {children}
    </button>
  );
}

/* ——————————————————————————————————————— */
/*  Lead detail — slide-over                  */
/* ——————————————————————————————————————— */

function LeadDetail({
  lead,
  onClose,
  onStatus,
}: {
  lead: Lead;
  onClose: () => void;
  onStatus: (s: LeadStatus) => void;
}) {
  const heat = leadHeat(lead.score);
  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-fade-in absolute inset-0 bg-ink-1/20"
        style={{ animationDuration: "200ms" }}
      />
      <aside
        className="animate-slide-in absolute top-0 right-0 flex h-full w-full max-w-[460px] flex-col border-l border-line bg-paper shadow-[var(--shadow-xl)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line/70 px-7 py-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] tabular text-ink-4">
            Lead {lead.id}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[12.5px] text-ink-3 transition-colors duration-150 hover:text-ink-1"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-7 py-7">
          <div>
            <h3
              className="font-display text-ink-1"
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: "1.15",
              }}
            >
              {lead.name}
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <HeatBadge heat={heat} />
              <span className="text-[12px] text-ink-4">·</span>
              <span className="text-[12px] text-ink-4">{lead.intakeAt}</span>
            </div>
          </div>

          <div className="flex items-end gap-6 border-y border-line py-5">
            <div>
              <FieldLabel>Fit score</FieldLabel>
              <div className="mt-2 flex items-baseline gap-1.5">
                <div className="kpi-num" style={{ fontSize: "36px" }}>
                  {lead.score}
                </div>
                <div className="text-[12px] tabular text-ink-4">/ 100</div>
              </div>
            </div>
            <div className="flex-1">
              <FieldLabel>Current label</FieldLabel>
              <div className="mt-2 text-[13.5px] text-ink-1">
                {STATUS_LABEL[lead.status]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Field
              label="Channel"
              value={lead.channel === "call" ? "Phone call" : "Web form"}
            />
            <Field label="Source" value={lead.source} />
            <Field label="Practice area" value={areaLabel(lead.area)} />
            <Field
              label="Estimated value"
              value={
                lead.estValue == null ? "Not estimated" : fmtUSD(lead.estValue)
              }
            />
          </div>

          {lead.note && (
            <div>
              <FieldLabel>Intake notes</FieldLabel>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-2">
                {lead.note}
              </p>
            </div>
          )}

          {lead.channel === "call" && (
            <div>
              <FieldLabel>Call recording</FieldLabel>
              <div className="mt-2.5 flex items-center gap-3 rounded-[8px] border border-line bg-paper-2 px-4 py-3">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-1 text-paper transition-colors duration-200 hover:bg-accent-hover"
                  aria-label="Play recording"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                    <path d="M2 1.2L8.5 5L2 8.8z" fill="currentColor" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="meter">
                    <span style={{ width: "0%" }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] tabular text-ink-4">
                    <span>0:00</span>
                    <span>{lead.intakeMeta.replace(/^[^·]*·\s*/, "")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <FieldLabel>Move to</FieldLabel>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {STATUS_FLOW.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chip"
                  aria-pressed={lead.status === s}
                  onClick={() => onStatus(s)}
                  disabled={lead.status === s}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 text-[13.5px] text-ink-1">{value}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-4">
      {children}
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Helpers                                   */
/* ——————————————————————————————————————— */

const AREA_LABEL: Record<string, string> = {
  Auto: "Auto accident",
  Truck: "Truck accident",
  Brain: "Brain injury / TBI",
  Slip: "Slip & fall",
  Moto: "Motorcycle",
};
function areaLabel(a: string): string {
  return AREA_LABEL[a] ?? a;
}

/* ——— Icons ——— */

function ListIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <line x1="3" y1="4.5" x2="13" y2="4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="11.5" x2="13" y2="11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="3" height="11" rx="0.7" stroke="currentColor" strokeWidth="1.3" />
      <rect x="6.5" y="2.5" width="3" height="7" rx="0.7" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10.5" y="2.5" width="3" height="9" rx="0.7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 3.4c0-.5.4-.9.9-.9h1.7c.4 0 .7.2.8.6l.7 1.9c.1.3 0 .7-.3.9l-1 .7c.7 1.4 1.8 2.5 3.2 3.2l.7-1c.2-.3.6-.4.9-.3l1.9.7c.4.1.6.4.6.8v1.7c0 .5-.4.9-.9.9C7 12.5 3.5 9 3 3.4z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="3"
        y="2.5"
        width="10"
        height="11"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <line
        x1="5.5"
        y1="6"
        x2="10.5"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="5.5"
        y1="9"
        x2="10.5"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.4l3 2.6L12.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RingIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="4.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 4.5l7 7M11.5 4.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
