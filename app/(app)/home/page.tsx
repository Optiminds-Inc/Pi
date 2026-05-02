"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  fmtNum,
  fmtUSD,
  PERIODS,
  STATS,
  type ChannelRow,
  type PeriodId,
} from "@/lib/mock";

export default function HomePage() {
  const [period, setPeriod] = useState<PeriodId>("month");

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="From page visit → signed case → revenue. Full-loop tracking."
        actions={<PeriodDropdown value={period} onChange={setPeriod} />}
      />

      <div className="px-10 pb-12">
        <Kpis period={period} />
        <Funnel period={period} />
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Attribution period={period} />
          <div className="flex flex-col gap-10">
            <CallsChart />
            <Insight period={period} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ——————————————————————————————————————— */
/*  Period dropdown                          */
/* ——————————————————————————————————————— */

function PeriodDropdown({
  value,
  onChange,
}: {
  value: PeriodId;
  onChange: (p: PeriodId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = PERIODS.find((p) => p.id === value)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="btn-compact"
      >
        <span>{current.label}</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="animate-scale-in absolute top-full right-0 z-30 mt-1.5 w-[160px] origin-top-right overflow-hidden rounded-[8px] border border-line bg-paper shadow-[var(--shadow-lg)]">
          <ul role="listbox" className="py-1">
            {PERIODS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={p.id === value}
                  onClick={() => {
                    onChange(p.id);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition-colors duration-150",
                    p.id === value
                      ? "text-ink-1"
                      : "text-ink-2 hover:bg-paper-2 hover:text-ink-1",
                  ].join(" ")}
                >
                  <span>{p.label}</span>
                  {p.id === value && <Check />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  KPIs — flat row, single divider           */
/* ——————————————————————————————————————— */

function Kpis({ period }: { period: PeriodId }) {
  const s = STATS[period];
  const totalRevenue = s.channels.reduce((sum, ch) => sum + ch.revenue, 0);
  const roi = s.adSpend > 0 ? Math.floor(totalRevenue / s.adSpend) : 0;

  const items = [
    {
      label: "Ad spend",
      value: fmtUSD(s.adSpend),
      sub: "this month",
    },
    {
      label: "Signed cases",
      value: fmtNum(s.signed),
      delta: `+${s.signedDeltaPct}%`,
      deltaSub: "vs last month",
    },
    {
      label: "Est. contract value",
      value: fmtUSD(totalRevenue, { compact: true }),
      delta: `+${s.pipelineDeltaPct}%`,
      deltaSub: "vs last month",
    },
    {
      label: "ROI",
      value: `${roi}x`,
      delta: `+${s.roiDeltaPct ?? 18}%`,
      deltaSub: "vs last month",
    },
  ];

  return (
    <section className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8 border-b border-line pb-9 md:flex-nowrap">
      {items.map((it) => (
        <div key={it.label} className="min-w-[140px] flex-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-4">
            {it.label}
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <div className="kpi-num" style={{ fontSize: "38px" }}>
              {it.value}
            </div>
            {it.delta && (
              <div className="text-[12.5px] tabular text-success">
                {it.delta}
              </div>
            )}
          </div>
          <div className="mt-1.5 text-[11.5px] text-ink-4">
            {it.sub ?? it.deltaSub}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Funnel — flat layout                     */
/* ——————————————————————————————————————— */

function Funnel({ period }: { period: PeriodId }) {
  const f = STATS[period].funnel;
  const stages: { label: string; value: number; highlight?: boolean }[] = [
    { label: "Page Visitors", value: f.visitors },
    { label: "Calls / Forms", value: f.intake },
    { label: "AI Qualified", value: f.qualified },
    { label: "Attorney Consult", value: f.consults },
    { label: "Signed Cases", value: f.signed, highlight: true },
  ];

  return (
    <section className="mt-14">
      <SectionHead
        title="Full Funnel"
        sub="Page visit → signed case. Each step's conversion to the next."
      />
      <div className="mt-6">
        <div className="flex items-center gap-2">
          {stages.map((st, i) => {
            const isLast = i === stages.length - 1;
            return (
              <div key={st.label} className="flex flex-1 items-center gap-2">
                <div
                  className={[
                    "flex flex-1 flex-col items-center rounded-[12px] border px-3 py-5",
                    isLast
                      ? "border-success/30 bg-success-soft/40"
                      : "border-line bg-paper-2/40",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "kpi-num tabular",
                      isLast ? "text-success" : "",
                    ].join(" ")}
                    style={{ fontSize: "28px" }}
                  >
                    {fmtNum(st.value)}
                  </div>
                  <div className="mt-1.5 text-[11px] text-ink-3">{st.label}</div>
                </div>
                {!isLast && (
                  <span className="shrink-0 text-[11px] text-ink-4">›</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex items-center gap-2">
          {stages.map((st, i) => {
            const next = stages[i + 1];
            const conv = next ? (next.value / st.value) * 100 : null;
            const isLast = i === stages.length - 1;
            return (
              <div key={st.label} className="flex flex-1 items-center gap-2">
                <div className="flex-1 text-center">
                  {conv !== null && (
                    <span className="text-[11px] tabular text-ink-4">
                      {conv < 1 ? conv.toFixed(2) : Math.round(conv)}% →
                    </span>
                  )}
                </div>
                {!isLast && <span className="shrink-0 invisible text-[11px]">›</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Channel Attribution                      */
/* ——————————————————————————————————————— */

function Attribution({ period }: { period: PeriodId }) {
  const rows = STATS[period].channels;
  return (
    <section>
      <SectionHead
        title="Channel → Revenue Attribution"
        sub="Where signed cases came from, and how each channel paid back."
      />
      <div className="mt-6">
        <div className="grid grid-cols-[minmax(0,1.6fr)_72px_60px_82px_82px_72px] gap-3 px-1 pb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-4">
          <div>Channel</div>
          <div className="text-right">Visitors</div>
          <div className="text-right">Signed</div>
          <div className="text-right">Revenue</div>
          <div className="text-right">Ad spend</div>
          <div className="text-right">True ROAS</div>
        </div>
        <div className="border-t border-line">
          {rows.map((r) => (
            <ChannelLine key={r.id} row={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelLine({ row }: { row: ChannelRow }) {
  const roas = (() => {
    if (row.adSpend == null || row.adSpend === 0) return null;
    if (row.revenue === 0) return 0;
    return Math.round(row.revenue / row.adSpend);
  })();

  return (
    <div className="grid grid-cols-[minmax(0,1.6fr)_72px_60px_82px_82px_72px] items-center gap-3 border-b border-line px-1 py-3.5 text-[13.5px]">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={[
            "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
            row.group === "organic" ? "bg-success" : "bg-ink-3",
          ].join(" ")}
        />
        <span className="truncate text-ink-1">{row.name}</span>
      </div>
      <div className="text-right tabular text-ink-2">
        {row.visitors == null ? "—" : fmtNum(row.visitors)}
      </div>
      <div className="text-right tabular font-medium text-success">
        {row.signed}
      </div>
      <div className="text-right tabular text-ink-2">
        {row.revenue > 0 ? fmtUSD(row.revenue, { compact: true }) : "$0"}
      </div>
      <div className="text-right tabular text-ink-2">
        {row.adSpend == null || row.adSpend === 0
          ? "—"
          : fmtUSD(row.adSpend)}
      </div>
      <div
        className={[
          "text-right tabular font-medium",
          roas === null
            ? "text-success"
            : roas === 0
              ? "text-danger"
              : "text-ink-1",
        ].join(" ")}
      >
        {roas === null ? "∞ Free" : `${roas}x`}
      </div>
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Calls over time                          */
/* ——————————————————————————————————————— */

type ChartPeriod = "7d" | "30d" | "90d";

function CallsChart() {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("30d");

  const periodMap: Record<ChartPeriod, PeriodId> = {
    "7d": "7d",
    "30d": "month",
    "90d": "90d",
  };
  const data = STATS[periodMap[chartPeriod]].callsDaily;
  const total = data.reduce((a, b) => a + b, 0);
  const max = Math.max(...data, 1);

  const dateLabels = (() => {
    if (chartPeriod !== "30d") {
      return [
        { index: 0, label: "Start" },
        { index: data.length - 1, label: "Now" },
      ];
    }
    const end = new Date(2026, 3, 6);
    const labels: { index: number; label: string }[] = [];
    for (let i = 1; i < data.length; i += 4) {
      const d = new Date(end);
      d.setDate(d.getDate() - (data.length - 1 - i));
      labels.push({
        index: i,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
      });
    }
    return labels;
  })();

  const chips: { id: ChartPeriod; label: string }[] = [
    { id: "7d", label: "7d" },
    { id: "30d", label: "30d" },
    { id: "90d", label: "90d" },
  ];

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <SectionHead
          title="Calls over time"
          sub={`${total} calls in the ${STATS[periodMap[chartPeriod]].daysLabel}.`}
        />
        <div className="flex shrink-0 gap-1 pt-1">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setChartPeriod(c.id)}
              aria-pressed={c.id === chartPeriod}
              className="chip"
              style={{ height: "26px", padding: "0 10px", fontSize: "11.5px" }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex h-[120px] items-end gap-[3px]">
          {data.map((v, i) => {
            // Mondrian quartet — red / blue / yellow / black (ink-1 inverts in dark mode)
            const palette = ["#D40920", "#1356A2", "#F7D842", "var(--color-ink-1)"];
            const ci = (i * 7 + v * 3) % palette.length;
            const color = palette[ci];
            return (
              <div
                key={i}
                className="group relative flex-1 self-stretch"
                title={`${v}`}
              >
                <div
                  className="absolute right-0 bottom-0 left-0 transition-opacity duration-150 group-hover:opacity-80"
                  style={{
                    height: `${(v / max) * 100}%`,
                    minHeight: "2px",
                    backgroundColor: color,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between border-t border-line pt-2 text-[11px] tabular text-ink-4">
          {dateLabels.map((dl) => (
            <span key={dl.index}>{dl.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Insight                                  */
/* ——————————————————————————————————————— */

function Insight({ period }: { period: PeriodId }) {
  const rows = STATS[period].channels;
  const organic = rows.filter((r) => r.group === "organic");
  const organicRev = organic.reduce((s, r) => s + r.revenue, 0);
  const totalRev = rows.reduce((s, r) => s + r.revenue, 0);
  const organicShare =
    totalRev > 0 ? Math.round((organicRev / totalRev) * 100) : 0;
  const paid = rows.filter((r) => r.group === "paid" && r.revenue > 0);
  const paidLeader = [...paid].sort((a, b) => b.revenue - a.revenue)[0];
  const paidLeaderROAS =
    paidLeader?.adSpend
      ? Math.round(paidLeader.revenue / paidLeader.adSpend)
      : null;
  const yelp = rows.find((r) => r.id === "yelp" && r.revenue === 0);

  return (
    <section>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-4">
        Pi&rsquo;s read
      </div>
      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-2">
        Organic channels (search + AEO + local) deliver{" "}
        <span className="text-ink-1">{organicShare}%</span> of your signed case
        revenue at zero ad spend.{" "}
        {paidLeader && paidLeaderROAS != null && (
          <>
            {paidLeader.name} has the best paid ROAS at{" "}
            <span className="tabular text-ink-1">{paidLeaderROAS}x</span>
            {yelp ? " — consider shifting Yelp budget there." : "."}
          </>
        )}
      </p>
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Section header                           */
/* ——————————————————————————————————————— */

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="max-w-[640px]">
      <h2 className="text-[16px] font-medium tracking-[-0.01em] text-ink-1">
        {title}
      </h2>
      {sub && (
        <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-3">{sub}</p>
      )}
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Icons                                    */
/* ——————————————————————————————————————— */

function ChevronDown() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      aria-hidden
      className="opacity-60"
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M4 8.4l2.8 2.4L12 5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
