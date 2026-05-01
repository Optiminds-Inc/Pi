"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  type Activity,
  agents as agentsData,
  activity as activityData,
  type AgentId,
  fmtAge,
} from "@/lib/mock";

type AgentFilter = "all" | AgentId;
type TimeFilter = "all" | "24h" | "7d" | "30d";

const TIME_OPTIONS: { id: TimeFilter; label: string; max?: number }[] = [
  { id: "24h", label: "Last 24h", max: 60 * 24 },
  { id: "7d", label: "Last 7d", max: 60 * 24 * 7 },
  { id: "30d", label: "Last 30d", max: 60 * 24 * 30 },
  { id: "all", label: "All time" },
];

const AGENT_LABEL = Object.fromEntries(
  agentsData.map((a) => [a.id, a.name]),
) as Record<AgentId, string>;

const AGENT_TINT: Record<
  AgentId,
  { iconBg: string; iconText: string }
> = {
  ads: { iconBg: "bg-mondrian-yellow-soft", iconText: "text-mondrian-yellow" },
  seo: { iconBg: "bg-mondrian-blue-soft", iconText: "text-mondrian-blue" },
  geo: { iconBg: "bg-mondrian-red-soft", iconText: "text-mondrian-red" },
};

export default function ActivityPage() {
  const [agentFilter, setAgentFilter] = useState<AgentFilter>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setChannelFilter("all");
  }, [agentFilter]);

  const channels = useMemo(() => {
    const set = new Set<string>();
    for (const a of activityData) {
      if (agentFilter === "all" || a.agent === agentFilter) set.add(a.channel);
    }
    return Array.from(set);
  }, [agentFilter]);

  const items = useMemo(() => {
    const max = TIME_OPTIONS.find((t) => t.id === timeFilter)?.max;
    return activityData
      .filter((a) => agentFilter === "all" || a.agent === agentFilter)
      .filter((a) => channelFilter === "all" || a.channel === channelFilter)
      .filter((a) => max === undefined || a.ageMinutes <= max)
      .slice()
      .sort((a, b) => a.ageMinutes - b.ageMinutes);
  }, [agentFilter, channelFilter, timeFilter]);

  return (
    <>
      <PageHeader
        title="Activity"
        subtitle="Every move your AI team makes."
      />

      <div className="px-10 pt-9 pb-20">
        <div className="sticky top-0 z-10 -mx-10 mb-6 border-b border-line/60 bg-canvas/85 px-10 py-3 backdrop-blur">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
              <FilterLabel>Your active agents</FilterLabel>
              <AgentTab
                label="All"
                active={agentFilter === "all"}
                onClick={() => setAgentFilter("all")}
              />
              {agentsData.map((agent) => (
                <AgentTab
                  key={agent.id}
                  label={agent.name}
                  active={agentFilter === agent.id}
                  onClick={() =>
                    setAgentFilter((cur) =>
                      cur === agent.id ? "all" : agent.id,
                    )
                  }
                />
              ))}
              <Link
                href="/agents"
                className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-[13px] font-medium text-ink-4 transition-colors duration-150 hover:bg-paper hover:text-ink-1"
              >
                <span aria-hidden>+</span>
                <span>New agent</span>
              </Link>

              <div className="ml-auto">
                <TimeSelect value={timeFilter} onChange={setTimeFilter} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
              <FilterLabel>Your active channels</FilterLabel>
              <ChannelChip
                label="All"
                active={channelFilter === "all"}
                onClick={() => setChannelFilter("all")}
              />
              {channels.map((ch) => (
                <ChannelChip
                  key={ch}
                  label={ch}
                  active={channelFilter === ch}
                  onClick={() =>
                    setChannelFilter((cur) => (cur === ch ? "all" : ch))
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center text-[13px] text-ink-4">
            Nothing for this filter yet.
          </div>
        ) : (
          <ul className="mx-auto max-w-[820px] space-y-5">
            {items.map((a) => (
              <li key={a.id}>
                <ActivityRow a={a} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function TimeSelect({
  value,
  onChange,
}: {
  value: TimeFilter;
  onChange: (v: TimeFilter) => void;
}) {
  return (
    <label className="relative inline-flex h-8 items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimeFilter)}
        className="h-8 cursor-pointer appearance-none rounded-full border border-line bg-paper py-0 pr-8 pl-3 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:border-line-strong focus:outline-none"
      >
        {TIME_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-4"
      >
        <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mr-3 w-[180px] shrink-0 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-ink-4">
      {children}
    </span>
  );
}

function AgentTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-ink-1 text-paper"
          : "text-ink-3 hover:bg-paper hover:text-ink-1",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ChannelChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-ink-1 text-paper"
          : "text-ink-3 hover:bg-paper hover:text-ink-1",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ActivityRow({ a }: { a: Activity }) {
  return (
    <article className="group flex items-start gap-3">
      <AgentAvatar agent={a.agent} />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[13.5px] font-medium text-ink-1">
            {AGENT_LABEL[a.agent]}
          </span>
          <span className="text-[11.5px] tabular text-ink-4">
            {fmtAge(a.ageMinutes)}
          </span>
        </div>
        <h3 className="mt-1 text-[14.5px] leading-[1.45] text-ink-1">
          {a.title}
        </h3>
        {a.detail && (
          <p className="mt-1 text-[13px] leading-[1.55] text-ink-3">
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
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full border border-line/70 px-2 py-[1px] text-[10.5px] text-ink-4">
            {a.channel}
          </span>
        </div>
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

function AgentAvatar({ agent }: { agent: AgentId }) {
  const tint = AGENT_TINT[agent];
  return (
    <div
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        tint.iconBg,
        tint.iconText,
      ].join(" ")}
      aria-hidden
    >
      <span className="text-[13px] font-semibold leading-none">
        {AGENT_LABEL[agent][0]}
      </span>
    </div>
  );
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
