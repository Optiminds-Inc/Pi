"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  type Activity,
  activity as activityData,
  type AgentId,
  fmtAge,
} from "@/lib/mock";

type Filter = "all" | AgentId;

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ads", label: "Ads" },
  { id: "seo", label: "SEO" },
  { id: "geo", label: "GEO" },
];

const AGENT_LABEL: Record<AgentId, string> = {
  ads: "Ads",
  seo: "SEO",
  geo: "GEO",
};

const AGENT_TINT: Record<
  AgentId,
  { iconBg: string; iconText: string; dot: string }
> = {
  ads: {
    iconBg: "bg-warning-soft",
    iconText: "text-warning",
    dot: "bg-warning",
  },
  seo: {
    iconBg: "bg-success-soft",
    iconText: "text-success",
    dot: "bg-success",
  },
  geo: {
    iconBg: "bg-info-soft",
    iconText: "text-info",
    dot: "bg-info",
  },
};

type ActionKind =
  | "publish"
  | "refresh"
  | "pause"
  | "budget"
  | "keyword"
  | "cite"
  | "measure"
  | "link"
  | "edit";

function classifyAction(title: string): ActionKind {
  const t = title.toLowerCase();
  if (/cited|index|citation/.test(t)) return "cite";
  if (/pause/.test(t)) return "pause";
  if (/refresh/.test(t)) return "refresh";
  if (/budget|reallocat|increased.*\$|saved.*\$/.test(t)) return "budget";
  if (/added.*keyword|new keyword|keyword/.test(t)) return "keyword";
  if (/internal-link|internal-linked|linked/.test(t)) return "link";
  if (/sweep|rank|drop/.test(t)) return "measure";
  if (/restructur/.test(t)) return "edit";
  if (/publish|brief|article/.test(t)) return "publish";
  return "publish";
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  const items = useMemo(
    () =>
      activityData
        .filter((a) => filter === "all" || a.agent === filter)
        .slice()
        .sort((a, b) => a.ageMinutes - b.ageMinutes),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: 0, ads: 0, seo: 0, geo: 0 };
    for (const a of activityData) {
      c.all += 1;
      c[a.agent] += 1;
    }
    return c;
  }, []);

  return (
    <>
      <PageHeader
        title="Activity"
        subtitle="Every move your AI team makes."
      />

      <div className="px-10 pt-9 pb-14">
        <div className="overflow-hidden rounded-[16px] border border-line bg-paper shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3 border-b border-line bg-paper-2/40 px-5 py-3">
            <span
              className="dot-live shrink-0"
              style={{ width: "7px", height: "7px" }}
              aria-hidden
            />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink-3">
              Live feed
            </span>
            <span className="text-[11.5px] tabular text-ink-4">
              · {items.length}{" "}
              {items.length === 1 ? "event" : "events"}
            </span>
            <div className="ml-auto flex items-center gap-0.5">
              {TABS.map((t) => (
                <FilterTab
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  count={counts[t.id]}
                  active={filter === t.id}
                  onClick={() => setFilter(t.id)}
                />
              ))}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center text-[13px] text-ink-4">
              Nothing for this filter yet.
            </div>
          ) : (
            <ul>
              {items.map((a) => (
                <li
                  key={a.id}
                  className="border-b border-line/70 last:border-b-0"
                >
                  <ActivityRow a={a} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function FilterTab({
  id,
  label,
  count,
  active,
  onClick,
}: {
  id: Filter;
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
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] transition-colors duration-150",
        active
          ? "bg-ink-1 text-paper"
          : "text-ink-3 hover:bg-paper hover:text-ink-1",
      ].join(" ")}
    >
      {id !== "all" && (
        <span
          className={[
            "inline-block h-1.5 w-1.5 rounded-full",
            AGENT_TINT[id as AgentId].dot,
          ].join(" ")}
          aria-hidden
        />
      )}
      <span>{label}</span>
      <span
        className={[
          "tabular text-[11px]",
          active ? "text-paper/65" : "text-ink-5",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

function ActivityRow({ a }: { a: Activity }) {
  const tint = AGENT_TINT[a.agent];
  const kind = classifyAction(a.title);
  return (
    <article className="group flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-paper-2/40">
      <ActionIcon kind={kind} bg={tint.iconBg} fg={tint.iconText} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2.5">
          <AgentTag agent={a.agent} />
          <span className="truncate text-[11.5px] text-ink-4">{a.channel}</span>
          <span className="ml-auto shrink-0 text-[11px] tabular text-ink-4">
            {fmtAge(a.ageMinutes)}
          </span>
        </div>
        <h3 className="mt-1 text-[14px] leading-[1.4] text-ink-1">{a.title}</h3>
        {a.detail && (
          <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-3">
            {a.detail}
          </p>
        )}
        {(a.outcome || a.output) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px]">
            {a.outcome && (
              <span className="inline-flex items-center gap-1.5 text-ink-2">
                <CheckIcon />
                <span>{a.outcome}</span>
              </span>
            )}
            {a.output && (
              <a
                href={a.output.href || "#"}
                className="text-ink-3 transition-colors hover:text-ink-1"
              >
                {a.output.label} →
              </a>
            )}
          </div>
        )}
      </div>
      <ChatButton agent={a.agent} />
    </article>
  );
}

function ChatButton({ agent }: { agent: AgentId }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled
      title={`Chat with ${AGENT_LABEL[agent]} — coming soon`}
      className="mt-[2px] inline-flex h-8 shrink-0 cursor-not-allowed items-center gap-1.5 rounded-full border border-line/70 bg-paper px-3 text-[12px] font-medium text-ink-4 opacity-55 transition-opacity duration-150 group-hover:opacity-95"
    >
      <ChatBubbleIcon />
      <span>Chat</span>
    </button>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.8 5a2 2 0 012-2h6.4a2 2 0 012 2v4a2 2 0 01-2 2H8L5.5 13v-2H4.8a2 2 0 01-2-2V5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AgentTag({ agent }: { agent: AgentId }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={[
          "inline-block h-1.5 w-1.5 rounded-full",
          AGENT_TINT[agent].dot,
        ].join(" ")}
        aria-hidden
      />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {AGENT_LABEL[agent]}
      </span>
    </span>
  );
}

function ActionIcon({
  kind,
  bg,
  fg,
}: {
  kind: ActionKind;
  bg: string;
  fg: string;
}) {
  return (
    <div
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
        bg,
        fg,
      ].join(" ")}
      aria-hidden
    >
      <ActionGlyph kind={kind} />
    </div>
  );
}

function ActionGlyph({ kind }: { kind: ActionKind }) {
  const sw = 1.5;
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "publish":
      return (
        <svg {...props}>
          <path
            d="M3.5 3.5h5.5l3 3v6.5a0.5 0.5 0 01-0.5 0.5h-8a0.5 0.5 0 01-0.5-0.5v-9a0.5 0.5 0 010.5-0.5z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path
            d="M9 3.5v3h3"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <line x1="5.5" y1="9" x2="10.5" y2="9" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <line x1="5.5" y1="11.3" x2="9" y2="11.3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...props}>
          <path d="M3 8a5 5 0 018.7-3.4M13 8a5 5 0 01-8.7 3.4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <path d="M11.5 2v2.6h-2.6M4.5 14v-2.6h2.6" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "pause":
      return (
        <svg {...props}>
          <rect x="5" y="3.5" width="2" height="9" rx="0.6" stroke="currentColor" strokeWidth={sw} />
          <rect x="9" y="3.5" width="2" height="9" rx="0.6" stroke="currentColor" strokeWidth={sw} />
        </svg>
      );
    case "budget":
      return (
        <svg {...props}>
          <path d="M8 3v10M10.5 5.5h-3.5a1.5 1.5 0 000 3h2a1.5 1.5 0 010 3h-3.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "keyword":
      return (
        <svg {...props}>
          <line x1="8" y1="3.5" x2="8" y2="12.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <line x1="3.5" y1="8" x2="12.5" y2="8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "cite":
      return (
        <svg {...props}>
          <path d="M8 2.5l1.65 3.4 3.75.55-2.7 2.6.65 3.7L8 11.0l-3.35 1.75.65-3.7-2.7-2.6 3.75-.55L8 2.5z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "measure":
      return (
        <svg {...props}>
          <path d="M3 12l3-3.5 3 2 4-6" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
          <path d="M9.5 4.5h3.5v3.5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "link":
      return (
        <svg {...props}>
          <path d="M6.8 9.2L9.2 6.8M6.4 4.5L7.6 3.3a2.2 2.2 0 013.1 3.1L9.5 7.6M9.6 11.5L8.4 12.7a2.2 2.2 0 01-3.1-3.1L6.5 8.4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "edit":
      return (
        <svg {...props}>
          <path d="M3 13l0.6-2.4 7-7L13 6l-7 7L3 13z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 8.5l3 3 7-7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
