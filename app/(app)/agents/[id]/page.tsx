"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import {
  type AgentId,
  type AgentInstructions,
  type ChatEvent,
  type Connector,
  type QuickPrompt,
  agentConnectors,
  chatEvents,
  contentQueue as initialQueue,
  fmtUSD,
  geoQueue as initialGeoQueue,
  getAgent,
  getPendingCount,
  investment,
  pendingCampaignChanges,
  quickAnswers,
  quickPrompts,
  running,
  type TopicStatus,
} from "@/lib/mock";

const VALID_IDS: AgentId[] = ["ads", "seo", "geo"];

export default function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  if (!VALID_IDS.includes(id as AgentId)) notFound();
  const agentId = id as AgentId;
  const agent = getAgent(agentId);

  const [name, setName] = useState(agent.fullName);
  const [panelOpen, setPanelOpen] = useState(true);
  const [panelWidth, setPanelWidth] = useState(660);
  const [convo, setConvo] = useState<ChatEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pending = getPendingCount(agentId);
  const events = chatEvents[agentId];
  const prompts = quickPrompts[agentId];
  const answers = quickAnswers[agentId];
  const allEvents = [...events, ...convo];

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [convo.length]);

  function ask(prompt: QuickPrompt) {
    const a = answers[prompt.id];
    if (!a) return;
    const stamp = nowStamp();
    const qEvent: ChatEvent = {
      type: "question",
      id: `q-${prompt.id}-${Date.now()}`,
      text: prompt.text,
      time: stamp,
    };
    setConvo((c) => [...c, qEvent]);
    setTimeout(() => {
      const aEvent: ChatEvent = {
        type: "answer",
        id: `a-${prompt.id}-${Date.now()}`,
        text: a.text,
        stats: a.stats,
        time: stamp,
      };
      setConvo((c) => [...c, aEvent]);
    }, 320);
  }

  return (
    <div className="flex h-screen min-h-0 overflow-hidden">
      <main className="relative flex min-w-0 flex-1 flex-col">
        {!panelOpen && (
          <header className="absolute top-0 right-0 z-20 flex items-center gap-2 p-3">
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-[12px] text-ink-2 transition-colors duration-150 hover:border-line-strong hover:text-ink-1"
            >
              <PanelRightIcon />
              <span>Settings</span>
              {pending > 0 && (
                <span className="ml-0.5 inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-warning px-1 text-[10px] font-medium tabular text-white">
                  {pending}
                </span>
              )}
            </button>
          </header>
        )}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <CoverHero
            agentId={agentId}
            name={name}
            onNameChange={setName}
            tagline={agent.tagline}
          />
          <CenteredColumn>
            <ChatFeed events={allEvents} />
          </CenteredColumn>
        </div>
        <div className="shrink-0 bg-paper px-8 pb-4">
          <CenteredColumn>
            <Composer agentName={agent.name} prompts={prompts} onAsk={ask} />
          </CenteredColumn>
        </div>
      </main>

      {panelOpen && (
        <aside
          className="relative shrink-0 overflow-y-auto border-l border-line bg-paper"
          style={{ width: panelWidth }}
        >
          <ResizeHandle width={panelWidth} setWidth={setPanelWidth} />
          <SettingsPanel
            agentId={agentId}
            instructions={agent.instructions}
            onClose={() => setPanelOpen(false)}
          />
        </aside>
      )}
    </div>
  );
}

function CenteredColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[680px] px-8">{children}</div>
  );
}

/* ChatHeader removed — settings toggle is now an overlay button */

/* ——————————————————————————————————————— */
/*  Cover hero — band w/ avatar in front,     */
/*  centered name + tagline below             */
/* ——————————————————————————————————————— */

function CoverHero({
  agentId,
  name,
  onNameChange,
  tagline,
}: {
  agentId: AgentId;
  name: string;
  onNameChange: (s: string) => void;
  tagline: string;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  return (
    <div className="relative">
      <div className="relative h-[200px] w-full overflow-hidden">
        {agentId === "ads" ? (
          <MondrianArt />
        ) : agentId === "seo" ? (
          <MorandiArt />
        ) : (
          <MonetArt />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"
        />
      </div>

      <div className="px-8 pt-5 pb-2">
        <div className="relative z-10 -mt-16">
          <AgentAvatar agentId={agentId} size="hero" />
        </div>
        <div className="mt-4">
          {editing ? (
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setEditing(false);
              }}
              className="font-display block w-full bg-transparent text-ink-1 outline-none"
              style={{
                fontSize: "32px",
                fontWeight: 600,
                letterSpacing: "-0.022em",
                lineHeight: "1.15",
              }}
              aria-label="Agent name"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="group inline-flex items-baseline gap-2"
              aria-label="Edit name"
            >
              <span
                className="font-display text-ink-1"
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  letterSpacing: "-0.022em",
                  lineHeight: "1.15",
                }}
              >
                {name}
              </span>
              <PencilIcon className="opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
            </button>
          )}
          <p className="mt-1.5 max-w-[460px] text-[13.5px] leading-[1.55] text-ink-3">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

function MondrianArt() {
  const LINE = "#1a1a1a";
  const lineW = 3;
  return (
    <div className="absolute inset-0" style={{ background: "#f6f1e3" }}>
      <div
        className="absolute"
        style={{
          top: 0,
          left: "62%",
          right: 0,
          height: "52%",
          background: "#284a85",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "52%",
          left: "62%",
          width: "16%",
          bottom: 0,
          background: "#e7b536",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "52%",
          left: "78%",
          right: 0,
          bottom: 0,
          background: "#bf3328",
        }}
      />
      <div
        className="absolute"
        style={{
          top: 0,
          bottom: 0,
          left: `calc(62% - ${lineW / 2}px)`,
          width: lineW,
          background: LINE,
        }}
      />
      <div
        className="absolute"
        style={{
          top: `calc(52% - ${lineW / 2}px)`,
          left: "62%",
          right: 0,
          height: lineW,
          background: LINE,
        }}
      />
      <div
        className="absolute"
        style={{
          top: "52%",
          bottom: 0,
          left: `calc(78% - ${lineW / 2}px)`,
          width: lineW,
          background: LINE,
        }}
      />
    </div>
  );
}

function MorandiArt() {
  const bottles: Array<{
    left: string;
    width: string;
    height: string;
    color: string;
  }> = [
    { left: "32%", width: "10%", height: "62%", color: "#a8b6a4" },
    { left: "44%", width: "13%", height: "80%", color: "#bea495" },
    { left: "59%", width: "9%", height: "55%", color: "#d2c088" },
    { left: "70%", width: "12%", height: "72%", color: "#b6a17e" },
    { left: "84%", width: "10%", height: "65%", color: "#a4abb4" },
  ];
  return (
    <div className="absolute inset-0" style={{ background: "#ece2cf" }}>
      {bottles.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: 0,
            left: b.left,
            width: b.width,
            height: b.height,
            background: b.color,
          }}
        />
      ))}
    </div>
  );
}

function MonetArt() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(circle at 12% 18%, rgba(170, 195, 235, 0.6), transparent 42%)",
          "radial-gradient(circle at 78% 22%, rgba(225, 195, 230, 0.55), transparent 45%)",
          "radial-gradient(circle at 44% 70%, rgba(195, 225, 200, 0.55), transparent 48%)",
          "radial-gradient(circle at 92% 60%, rgba(245, 215, 220, 0.50), transparent 45%)",
          "radial-gradient(circle at 28% 52%, rgba(220, 210, 240, 0.50), transparent 50%)",
          "radial-gradient(circle at 8% 90%, rgba(200, 220, 195, 0.45), transparent 42%)",
          "radial-gradient(circle at 65% 92%, rgba(210, 220, 240, 0.45), transparent 45%)",
          "linear-gradient(180deg, #ecf0f6 0%, #e2e7ef 100%)",
        ].join(","),
      }}
    />
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={["text-ink-4", className ?? ""].join(" ")}
    >
      <path
        d="M2.5 13.5L4.5 13.5L13 5L11 3L2.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AgentAvatar({
  agentId,
  size,
}: {
  agentId: AgentId;
  size: "sm" | "lg" | "hero";
}) {
  const tone: Record<AgentId, string> = {
    ads: "from-[#fce0b8] to-[#f4ad57] text-[#6b3a00] border-[#e8b577]",
    seo: "from-[#cfe6d6] to-[#6dbf91] text-[#1d4f30] border-[#9bccae]",
    geo: "from-[#dbd3f0] to-[#9b86d6] text-[#3a2670] border-[#bcadda]",
  };
  const letter = { ads: "A", seo: "S", geo: "G" }[agentId];
  const dim =
    size === "hero"
      ? "h-[88px] w-[88px] text-[36px] rounded-full"
      : size === "lg"
        ? "h-[64px] w-[64px] text-[26px] rounded-[14px]"
        : "h-[26px] w-[26px] text-[11px] rounded-[7px]";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center border bg-gradient-to-br font-medium shadow-[var(--shadow-sm)]",
        tone[agentId],
        dim,
      ].join(" ")}
    >
      {letter}
    </span>
  );
}

/* ——————————————————————————————————————— */
/*  Chat feed — Notion-style event stream     */
/* ——————————————————————————————————————— */

function ChatFeed({ events }: { events: ChatEvent[] }) {
  return (
    <div className="pt-6 pb-8 space-y-4">
      {events.map((ev) => {
        switch (ev.type) {
          case "running":
            return (
              <div key={ev.id} className="space-y-1">
                <p className="text-[14px] leading-[1.6] text-ink-1">{ev.text}</p>
                <p className="flex items-center gap-1.5 text-[13px] text-ink-3">
                  <PulseDot />
                  <span>{ev.status}</span>
                </p>
              </div>
            );
          case "thought":
            return (
              <details key={ev.id} className="group">
                <summary className="flex cursor-pointer items-center gap-1.5 text-[13px] text-ink-3 select-none">
                  <span className="text-[14px]">💡</span>
                  <span className="font-medium">Thought</span>
                  <ChevronToggle />
                </summary>
                <p className="mt-2 pl-6 text-[13.5px] leading-[1.6] text-ink-2">{ev.text}</p>
              </details>
            );
          case "steps":
            return (
              <details key={ev.id} className="group">
                <summary className="flex cursor-pointer items-center gap-1.5 text-[13px] text-ink-4 select-none">
                  <ChevronToggle />
                  <span>{ev.count} steps</span>
                </summary>
              </details>
            );
          case "task":
            return (
              <div key={ev.id} className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2/50 px-2.5 py-1 text-[12px] font-medium text-ink-2">
                  <span className="text-[13px]">⚡</span>
                  {ev.label}
                </div>
                {ev.source && (
                  <div className="rounded-[10px] border border-line bg-paper-2/30 px-3.5 py-2.5">
                    <div className="text-[12px] text-ink-3">{ev.source}</div>
                    {ev.sourceDetail && (
                      <div className="mt-0.5 text-[13px] text-ink-1">{ev.sourceDetail}</div>
                    )}
                  </div>
                )}
              </div>
            );
          case "done":
            return (
              <div key={ev.id} className="space-y-1">
                {ev.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 text-[13.5px] leading-[1.55]">
                    <span className="shrink-0 mt-[1px]">{item.icon}</span>
                    <span className={item.icon === "⚠️" ? "text-ink-3" : "text-ink-1"}>{item.text}</span>
                  </div>
                ))}
              </div>
            );
          case "question":
            return (
              <div key={ev.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-[14px] rounded-tr-[4px] border border-line bg-paper-2 px-3.5 py-2 text-[13.5px] leading-[1.5] text-ink-1">
                  {ev.text}
                </div>
              </div>
            );
          case "answer":
            return (
              <div key={ev.id} className="space-y-2.5">
                <p className="text-[14px] leading-[1.6] text-ink-1">{ev.text}</p>
                {ev.stats && ev.stats.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-[10px] border border-line bg-paper-2/40 px-3.5 py-2.5">
                    {ev.stats.map((s, j) => (
                      <div key={j}>
                        <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-4">{s.label}</div>
                        <div className="text-[14px] tabular text-ink-1">{s.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
        }
      })}
    </div>
  );
}

function ChevronToggle() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-open:rotate-90 text-ink-4">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  Composer — chat entry, preset chips only  */
/* ——————————————————————————————————————— */

function Composer({
  agentName,
  prompts,
  onAsk,
}: {
  agentName: string;
  prompts: QuickPrompt[];
  onAsk: (p: QuickPrompt) => void;
}) {
  return (
    <div className="mt-2 rounded-[14px] border border-line bg-paper px-4 pt-3 pb-3 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-1.5 text-[12px] text-ink-4">
        <ChatBubbleIcon />
        <span>Ask {agentName}</span>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {prompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onAsk(p)}
            className="inline-flex h-8 items-center rounded-full border border-line bg-paper-2 px-3 text-[12.5px] text-ink-2 transition-colors duration-150 hover:border-ink-4 hover:bg-paper hover:text-ink-1"
          >
            {p.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function nowStamp() {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `Today, ${h}:${m} ${ampm}`;
}

function ChatBubbleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 7C2.5 4.5 4.5 2.5 7 2.5h2c2.5 0 4.5 2 4.5 4.5v0.5c0 2.5-2 4.5-4.5 4.5H7l-2.5 2v-2H4c-0.83 0-1.5-0.67-1.5-1.5V7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  Resize handle — invisible, no visible gap */
/* ——————————————————————————————————————— */

function ResizeHandle({
  width,
  setWidth,
}: {
  width: number;
  setWidth: (n: number) => void;
}) {
  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    function onMove(ev: MouseEvent) {
      const next = Math.max(
        320,
        Math.min(800, startWidth + (startX - ev.clientX)),
      );
      setWidth(next);
    }
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }
  return (
    <div
      onMouseDown={onMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize settings panel"
      className="absolute -left-[3px] top-0 z-10 h-full w-[6px] cursor-col-resize"
    />
  );
}

/* ——————————————————————————————————————— */
/*  Settings panel — sticky header + sections */
/* ——————————————————————————————————————— */

function SettingsPanel({
  agentId,
  instructions,
  onClose,
}: {
  agentId: AgentId;
  instructions: AgentInstructions;
  onClose: () => void;
}) {
  const pending = getPendingCount(agentId);

  return (
    <div>
      <header className="sticky top-0 z-10 flex h-[52px] items-center justify-between border-b border-line bg-paper px-5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="flex h-6 w-6 items-center justify-center rounded-md text-ink-3 transition-colors duration-150 hover:bg-paper hover:text-ink-1"
          >
            <ChevronRightIcon />
          </button>
          <span className="text-[14px] font-medium text-ink-1">Settings</span>
          {pending > 0 && (
            <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-warning px-1.5 text-[10px] font-medium tabular text-white">
              {pending}
            </span>
          )}
        </div>
        <button
          type="button"
          className="rounded-md bg-[#2383e2] px-3.5 py-1 text-[13px] font-medium text-white transition-colors hover:bg-[#1b6ec2]"
        >
          Save
        </button>
      </header>

      <div className="px-6 pt-6 pb-12">
        <PanelSection title="Performance" sub="Last 30 days">
          <PerformanceGrid agentId={agentId} />
        </PanelSection>

        <PanelSection title="To do">
          <Todos agentId={agentId} />
        </PanelSection>

        <PanelSection title={strategyTitle(agentId)} sub={strategySub(agentId)}>
          <Strategy agentId={agentId} />
        </PanelSection>

        <PanelSection title="Instructions" sub="The playbook this agent runs on. Editable.">
          <InstructionsEditor instructions={instructions} />
        </PanelSection>

        <PanelSection title="Connectors" sub="Integrations this agent needs to run.">
          <Connectors agentId={agentId} />
        </PanelSection>
      </div>
    </div>
  );
}

function PanelSection({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-7 first:border-t-0 first:pt-0">
      <div className="mb-4">
        <div className="text-[15px] font-semibold tracking-[-0.005em] text-ink-1">{title}</div>
        {sub && <div className="mt-1 text-[12.5px] leading-[1.5] text-ink-4">{sub}</div>}
      </div>
      {children}
    </section>
  );
}

function strategyTitle(agentId: AgentId): string {
  if (agentId === "ads") return "Budget";
  if (agentId === "seo") return "Cadence";
  return "Cadence";
}

function strategySub(agentId: AgentId): string {
  if (agentId === "ads")
    return "Monthly ceiling — Pi reallocates daily within it.";
  if (agentId === "seo")
    return "Articles per month for Google organic.";
  return "AI briefs per month — Pi packs the queue.";
}

function Strategy({ agentId }: { agentId: AgentId }) {
  if (agentId === "ads") return <BudgetSlider />;
  if (agentId === "seo") return <CadenceSlider unit="articles / mo" defaultVal={8} />;
  return <CadenceSlider unit="briefs / mo" defaultVal={6} />;
}

/* ——————————————————————————————————————— */
/*  Performance metrics                       */
/* ——————————————————————————————————————— */

function PerformanceGrid({ agentId }: { agentId: AgentId }) {
  const metrics = getMetrics(agentId);
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      {metrics.map((m) => (
        <div key={m.label}>
          <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-4">
            {m.label}
          </div>
          <div className="mt-1.5 text-[22px] font-medium tabular text-ink-1 leading-none">
            {m.value}
          </div>
          {m.sub && <div className="mt-1 text-[11px] text-ink-4">{m.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function getMetrics(
  agentId: AgentId,
): { label: string; value: string; sub?: string }[] {
  if (agentId === "ads")
    return [
      { label: "Signed", value: "8", sub: "+2 vs prior" },
      { label: "Cost / signed", value: "$1,840", sub: "−$310" },
      { label: "Spend MTD", value: "$5.5K" },
      { label: "Top campaign", value: "Truck", sub: "4 signed" },
    ];
  if (agentId === "seo")
    return [
      { label: "Articles shipped", value: "8" },
      { label: "Top-10 keywords", value: "11" },
      { label: "Top-5 keywords", value: "3" },
      { label: "Organic visitors", value: "4.2K", sub: "+12% w/w" },
    ];
  return [
    { label: "AI citations", value: "12", sub: "this month" },
    { label: "ChatGPT", value: "5", sub: "queries cite us" },
    { label: "Perplexity", value: "6", sub: "queries cite us" },
    { label: "Claude", value: "1", sub: "query cites us" },
  ];
}

/* ——————————————————————————————————————— */
/*  TODOs — compact list per agent            */
/* ——————————————————————————————————————— */

function Todos({ agentId }: { agentId: AgentId }) {
  if (agentId === "ads") return <AdsTodos />;
  if (agentId === "seo") return <SeoTodos />;
  return <GeoTodos />;
}

function TodoRow({
  title,
  onApprove,
  onDecline,
  decided,
}: {
  title: string;
  onApprove: () => void;
  onDecline: () => void;
  decided?: "approve" | "decline";
}) {
  return (
    <li
      className={[
        "flex items-center justify-between gap-3 border-t border-line py-2.5 first:border-t-0",
        decided === "decline" ? "opacity-40" : "",
      ].join(" ")}
    >
      <div className="min-w-0 flex-1 truncate text-[13px] text-ink-1">{title}</div>
      <div className="flex shrink-0 items-center gap-1">
        {decided ? (
          <span className="text-[11.5px] text-ink-4">
            {decided === "approve" ? "Approved" : "Declined"}
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={onDecline}
              className="rounded-md px-2 py-1 text-[11.5px] text-ink-3 hover:bg-paper-2 hover:text-ink-1"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="rounded-md bg-ink-1 px-2.5 py-1 text-[11.5px] text-paper hover:bg-accent-hover"
            >
              Approve
            </button>
          </>
        )}
      </div>
    </li>
  );
}

function AdsTodos() {
  const [decisions, setDecisions] = useState<Record<string, "approve" | "decline">>({});
  if (pendingCampaignChanges.length === 0)
    return <Empty>Nothing pending. Pi surfaces the next batch tomorrow morning.</Empty>;
  return (
    <ul>
      {pendingCampaignChanges.map((c) => (
        <TodoRow
          key={c.id}
          title={c.summary}
          decided={decisions[c.id]}
          onApprove={() => setDecisions((d) => ({ ...d, [c.id]: "approve" }))}
          onDecline={() => setDecisions((d) => ({ ...d, [c.id]: "decline" }))}
        />
      ))}
    </ul>
  );
}

function SeoTodos() {
  const [queue, setQueue] = useState(initialQueue);
  function decide(id: string, status: TopicStatus) {
    setQueue((q) => q.map((t) => (t.id === id ? { ...t, status } : t)));
  }
  const pending = queue.filter((t) => t.status === "pending");
  if (pending.length === 0)
    return <Empty>All topics decided. Pi will queue more next week.</Empty>;
  return (
    <ul>
      {pending.map((t) => (
        <TodoRow
          key={t.id}
          title={t.title}
          onApprove={() => decide(t.id, "approved")}
          onDecline={() => decide(t.id, "declined")}
        />
      ))}
    </ul>
  );
}

function GeoTodos() {
  const [queue, setQueue] = useState(initialGeoQueue);
  function decide(id: string, status: TopicStatus) {
    setQueue((q) => q.map((t) => (t.id === id ? { ...t, status } : t)));
  }
  const pending = queue.filter((t) => t.status === "pending");
  if (pending.length === 0)
    return <Empty>All briefs decided. Pi will queue more next week.</Empty>;
  return (
    <ul>
      {pending.map((t) => (
        <TodoRow
          key={t.id}
          title={t.title}
          onApprove={() => decide(t.id, "approved")}
          onDecline={() => decide(t.id, "declined")}
        />
      ))}
    </ul>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="text-[12.5px] text-ink-4">{children}</div>;
}

/* ——————————————————————————————————————— */
/*  Strategy bodies                          */
/* ——————————————————————————————————————— */

function BudgetSlider() {
  const [budget, setBudget] = useState(investment.adBudget.value);
  const [committed, setCommitted] = useState(investment.adBudget.value);
  const dirty = budget !== committed;
  const delta = budget - committed;
  const projected = Math.round((delta / 1000) * 10);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="kpi-num" style={{ fontSize: "26px" }}>
          {fmtUSD(budget)}
        </div>
        <div className="text-[10.5px] tabular text-ink-4">
          {fmtUSD(investment.adBudget.min)} – {fmtUSD(investment.adBudget.max)}
        </div>
      </div>
      <div className="mt-1 text-[11.5px] text-ink-4">/ month</div>
      <div className="mt-3">
        <input
          type="range"
          min={investment.adBudget.min}
          max={investment.adBudget.max}
          step={investment.adBudget.step}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Monthly ad budget"
        />
      </div>
      {dirty && (
        <div className="mt-3 text-[12px] leading-[1.55] text-ink-3">
          {delta > 0 ? (
            <>
              <span className="text-ink-1">+{fmtUSD(delta)}.</span> Projected{" "}
              <span className="text-ink-1">+{projected} leads</span>.
            </>
          ) : (
            <>
              <span className="text-ink-1">−{fmtUSD(Math.abs(delta))}.</span>{" "}
              Estimated{" "}
              <span className="text-ink-1">−{Math.abs(projected)} leads</span>.
            </>
          )}
        </div>
      )}
      <SaveDiscardRow
        dirty={dirty}
        onDiscard={() => setBudget(committed)}
        onSave={() => setCommitted(budget)}
      />
    </div>
  );
}

function CadenceSlider({
  unit,
  defaultVal,
}: {
  unit: string;
  defaultVal: number;
}) {
  const [v, setV] = useState(defaultVal);
  const [committed, setCommitted] = useState(defaultVal);
  const dirty = v !== committed;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <div className="kpi-num" style={{ fontSize: "26px" }}>
            {v}
          </div>
          <div className="text-[12px] text-ink-3">{unit}</div>
        </div>
        <div className="text-[10.5px] tabular text-ink-4">2 – 16</div>
      </div>
      <div className="mt-3">
        <input
          type="range"
          min={2}
          max={16}
          step={1}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Cadence"
        />
      </div>
      <SaveDiscardRow
        dirty={dirty}
        onDiscard={() => setV(committed)}
        onSave={() => setCommitted(v)}
      />
    </div>
  );
}

function SaveDiscardRow({
  dirty,
  onDiscard,
  onSave,
}: {
  dirty: boolean;
  onDiscard: () => void;
  onSave: () => void;
}) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        onClick={onDiscard}
        disabled={!dirty}
        className="text-[12px] text-ink-3 hover:text-ink-1 disabled:opacity-40"
      >
        Discard
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!dirty}
        className="rounded-md bg-ink-1 px-3 py-1.5 text-[12px] text-paper transition-colors hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-ink-1"
      >
        Save
      </button>
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Instructions — single scrollable box     */
/*  with bold section headings inside        */
/* ——————————————————————————————————————— */

function formatInstructions(ins: AgentInstructions): string {
  return [
    `📖 Overview\n${ins.overview}`,
    `🎯 Goal\n${ins.goal}`,
    `🧭 Strategy\n${ins.strategy}`,
    `✅ Actions\n${ins.actions}`,
  ].join("\n\n");
}

function parseInstructions(raw: string): AgentInstructions {
  const sections: Record<string, string> = {};
  const keys = ["overview", "goal", "strategy", "actions"];
  const labels = ["📖 Overview", "🎯 Goal", "🧭 Strategy", "✅ Actions"];

  let current = "";
  for (const line of raw.split("\n")) {
    const idx = labels.findIndex((l) => line.trim() === l);
    if (idx !== -1) {
      current = keys[idx];
      continue;
    }
    if (current) {
      sections[current] = sections[current] ? sections[current] + "\n" + line : line;
    }
  }

  return {
    overview: (sections.overview ?? "").trim(),
    goal: (sections.goal ?? "").trim(),
    strategy: (sections.strategy ?? "").trim(),
    actions: (sections.actions ?? "").trim(),
  };
}

function InstructionsEditor({
  instructions,
}: {
  instructions: AgentInstructions;
}) {
  const [text, setText] = useState(() => formatInstructions(instructions));
  const [committed, setCommitted] = useState(text);
  const dirty = text !== committed;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        className="block w-full resize-y rounded-[8px] border border-line bg-paper px-4 py-3.5 text-[13px] leading-[1.7] text-ink-1 outline-none transition-all placeholder:text-ink-4 hover:border-line-strong focus:border-line-strong focus:shadow-[0_0_0_3px_rgba(35,131,226,0.10)]"
        style={{ fontFamily: "var(--font-sans)" }}
      />
      {dirty && (
        <SaveDiscardRow
          dirty={dirty}
          onDiscard={() => setText(committed)}
          onSave={() => setCommitted(text)}
        />
      )}
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Connectors                                */
/* ——————————————————————————————————————— */

function Connectors({ agentId }: { agentId: AgentId }) {
  const connectors = agentConnectors[agentId];
  return (
    <ul className="space-y-0">
      {connectors.map((c) => (
        <ConnectorRow key={c.id} connector={c} />
      ))}
    </ul>
  );
}

function ConnectorRow({ connector }: { connector: Connector }) {
  const { name, icon, connected, description } = connector;
  return (
    <li className="flex items-center gap-3 border-t border-line py-3 first:border-t-0">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-paper-2 text-[15px]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-ink-1">{name}</div>
        <div className="text-[11.5px] text-ink-4">{description}</div>
      </div>
      {connected ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] text-success">
          <ConnectedCheckIcon />
          Connected
        </span>
      ) : (
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            className="rounded-md bg-ink-1 px-2.5 py-1 text-[11.5px] font-medium text-paper transition-colors hover:bg-accent-hover"
          >
            Set up
          </button>
          <button
            type="button"
            className="rounded-md border border-line px-2.5 py-1 text-[11.5px] text-ink-3 transition-colors hover:border-line-strong hover:text-ink-1"
          >
            Book a call
          </button>
        </div>
      )}
    </li>
  );
}

function ConnectedCheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8.5l3 3 7-7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  Misc                                      */
/* ——————————————————————————————————————— */

function PulseDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  );
}

function PanelRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
      <line x1="10" y1="2.5" x2="10" y2="13.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l3 4-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Unused icons removed — ChatIcon, ArchiveIcon, FilterIcon */
