import PageHeader from "@/components/PageHeader";

type MarketCategory = "seo" | "ads" | "geo" | "ops";

const CATEGORY_TINT: Record<
  MarketCategory,
  { iconBg: string; iconText: string; label: string }
> = {
  seo: {
    iconBg: "bg-mondrian-blue-soft",
    iconText: "text-mondrian-blue",
    label: "Organic search",
  },
  ads: {
    iconBg: "bg-mondrian-yellow-soft",
    iconText: "text-mondrian-yellow",
    label: "Paid ads",
  },
  geo: {
    iconBg: "bg-mondrian-red-soft",
    iconText: "text-mondrian-red",
    label: "AI search",
  },
  ops: {
    iconBg: "bg-paper-2",
    iconText: "text-ink-2",
    label: "Case ops",
  },
};

type MarketStatus = "available" | "training" | "drafting" | "tuning";

type PricingUnit = "mo" | "call" | "hr" | "letter" | "article" | "case" | "lead";

type MarketAudience = "lawyer" | "public";

type MarketAgent = {
  id: string;
  name: string;
  category: MarketCategory;
  audience: MarketAudience;
  description: string;
  seller: string;
  sellerCity: string;
  status: MarketStatus;
  hires: number | null;
  pricing: { amount: number; unit: PricingUnit } | null;
};

const MARKET_AGENTS: MarketAgent[] = [
  // ——— Public-facing (lead-gen on the lawyer's site) ———
  {
    id: "case-worth-estimator",
    name: "Case worth estimator",
    category: "ops",
    audience: "public",
    description:
      "The public describes their accident; gets an instant case-value range based on Texas verdict data and similar settlements in their county.",
    seller: "Hayes Mitchell",
    sellerCity: "Houston, TX",
    status: "available",
    hires: 240,
    pricing: { amount: 35, unit: "lead" },
  },
  {
    id: "after-crash-checklist",
    name: "After-crash checklist",
    category: "ops",
    audience: "public",
    description:
      "The first 48 hours after a Texas crash — what to photograph, who to call, and exactly what NOT to say to insurance adjusters.",
    seller: "Walker PI",
    sellerCity: "Dallas, TX",
    status: "available",
    hires: 180,
    pricing: { amount: 28, unit: "lead" },
  },
  {
    id: "settlement-offer-checker",
    name: "Settlement offer checker",
    category: "ops",
    audience: "public",
    description:
      "The public pastes their insurance settlement offer; gets a fair-vs-lowball read with the line items the adjuster left out.",
    seller: "Reed & Co.",
    sellerCity: "Atlanta, GA",
    status: "available",
    hires: 95,
    pricing: { amount: 45, unit: "lead" },
  },

  // ——— Lawyer-facing (run inside their practice) ———
  {
    id: "article-writer",
    name: "Article writer",
    category: "seo",
    audience: "lawyer",
    description:
      "Drafts deeply researched articles for niche PI verticals — TBI, motorcycle, premises liability.",
    seller: "Reed & Co.",
    sellerCity: "Atlanta, GA",
    status: "available",
    hires: 142,
    pricing: { amount: 240, unit: "article" },
  },
  {
    id: "media-buyer",
    name: "Search ad pacer",
    category: "ads",
    audience: "lawyer",
    description:
      "Bid pacer tuned for Texas PI keywords. Hits sub-$2,500 cost-per-signed within 90 days.",
    seller: "Walker PI",
    sellerCity: "Dallas, TX",
    status: "available",
    hires: 89,
    pricing: { amount: 620, unit: "mo" },
  },
  {
    id: "demand-drafter",
    name: "Demand letter drafter",
    category: "ops",
    audience: "lawyer",
    description:
      "Writes demand letters for auto accidents using your case files and the local insurer's payout history.",
    seller: "Sarah Tan",
    sellerCity: "Solo · Phoenix, AZ",
    status: "available",
    hires: 56,
    pricing: { amount: 85, unit: "letter" },
  },
  {
    id: "citation-hunter",
    name: "Citation hunter",
    category: "geo",
    audience: "lawyer",
    description:
      "Tracks LLM citations across ChatGPT, Perplexity, Claude, Gemini. Flags drops, reverse-engineers wins.",
    seller: "Brand & Sons",
    sellerCity: "Seattle, WA",
    status: "available",
    hires: 38,
    pricing: { amount: 240, unit: "mo" },
  },
  {
    id: "settlement-researcher",
    name: "Settlement researcher",
    category: "ops",
    audience: "lawyer",
    description:
      "Pulls comparable verdicts and settlements for any case profile in 30 seconds.",
    seller: "Owens & Park",
    sellerCity: "Chicago, IL",
    status: "available",
    hires: 71,
    pricing: { amount: 40, unit: "hr" },
  },
  {
    id: "ad-copy-tester",
    name: "Ad copy tester",
    category: "ads",
    audience: "lawyer",
    description:
      "Spins headline + description variants, runs them as proper splits, kills losers automatically.",
    seller: "Lin Bryant",
    sellerCity: "Solo · Los Angeles, CA",
    status: "training",
    hires: null,
    pricing: null,
  },
  {
    id: "yelp-pacer",
    name: "Yelp pacer",
    category: "ops",
    audience: "lawyer",
    description:
      "Asks the right clients for reviews at the right time. Replies to negatives within 24 hours.",
    seller: "Raj Patel",
    sellerCity: "Solo · Houston, TX",
    status: "drafting",
    hires: null,
    pricing: null,
  },
  {
    id: "local-seo",
    name: "Local SEO",
    category: "seo",
    audience: "lawyer",
    description:
      "Owns Google Business Profile, citation consistency, and the local 3-pack push.",
    seller: "Carla Munoz",
    sellerCity: "Solo · Miami, FL",
    status: "tuning",
    hires: null,
    pricing: null,
  },
  {
    id: "intake-screener",
    name: "Intake screener",
    category: "ops",
    audience: "lawyer",
    description:
      "Triages inbound calls and forms in real time. Routes high-intent leads, deflects low-fit.",
    seller: "Hayes Mitchell",
    sellerCity: "Houston, TX",
    status: "available",
    hires: 320,
    pricing: { amount: 4, unit: "call" },
  },
];

const STATUS_LABEL: Record<MarketStatus, string> = {
  available: "",
  training: "Training",
  drafting: "Drafting",
  tuning: "Tuning",
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        title="Agents"
        subtitle="Hire agents built by other lawyers — or list your own."
      />

      <div className="space-y-10 px-10 pt-9 pb-14">
        <BuildYourOwnCard />

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <SectionLabel>Marketplace</SectionLabel>
            <span className="text-[12px] text-ink-4">
              {MARKET_AGENTS.length} agents · built by lawyers
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MARKET_AGENTS.map((m) => (
              <MarketAgentCard key={m.id} agent={m} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink-3">
      {children}
    </div>
  );
}

function MarketAgentCard({ agent }: { agent: MarketAgent }) {
  const tint = CATEGORY_TINT[agent.category];
  const isAvailable = agent.status === "available";
  return (
    <div
      className={[
        "group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-paper shadow-[var(--shadow-sm)] transition-all duration-200",
        isAvailable
          ? "hover:border-line-strong hover:shadow-[var(--shadow-md)]"
          : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3 p-5">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]",
            tint.iconBg,
            tint.iconText,
          ].join(" ")}
          aria-hidden
        >
          <span className="text-[15px] font-semibold leading-none">
            {agent.name[0]}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[14.5px] font-medium text-ink-1">
              {agent.name}
            </span>
            {agent.audience === "public" && <AudienceBadge />}
            {!isAvailable && <StatusBadge status={agent.status} />}
          </div>
          <div className="mt-0.5 truncate text-[11.5px] text-ink-4">
            {agent.audience === "public"
              ? `For your clients · ${tint.label}`
              : tint.label}
          </div>
        </div>
      </div>
      <p className="flex-1 px-5 pb-4 text-[12.5px] leading-[1.55] text-ink-3 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
        {agent.description}
      </p>
      <CreatorBlock seller={agent.seller} sellerCity={agent.sellerCity} />
      <div className="flex items-center justify-between border-t border-line bg-paper-tint px-5 py-2.5 text-[12px]">
        {isAvailable && agent.pricing ? (
          <>
            <span className="tabular text-ink-4">
              ${agent.pricing.amount}/{agent.pricing.unit} · {agent.hires}{" "}
              hires
            </span>
            <button
              type="button"
              className="font-medium text-ink-2 transition-colors duration-150 hover:text-ink-1"
            >
              Hire →
            </button>
          </>
        ) : (
          <>
            <span className="text-ink-4">Not yet available</span>
            <button
              type="button"
              className="text-ink-3 transition-colors duration-150 hover:text-ink-1"
            >
              Notify me
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CreatorBlock({
  seller,
  sellerCity,
}: {
  seller: string;
  sellerCity: string;
}) {
  const initials = seller
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="flex items-center gap-2.5 border-t border-line px-5 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 text-[10.5px] font-medium text-ink-2">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-4">
          Created by
        </div>
        <div className="truncate text-[12.5px] font-medium text-ink-1">
          {seller}
        </div>
      </div>
      <div className="shrink-0 text-[11px] text-ink-4">{sellerCity}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: MarketStatus }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-paper-2 px-2 py-[1px] text-[10px] font-medium uppercase tracking-[0.14em] text-ink-3">
      <span className="h-1 w-1 rounded-full bg-ink-3" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}

function AudienceBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-mondrian-yellow-soft px-2 py-[1px] text-[10px] font-medium uppercase tracking-[0.14em] text-mondrian-yellow">
      <span className="h-1 w-1 rounded-full bg-mondrian-yellow" aria-hidden />
      Lead-gen
    </span>
  );
}

function BuildYourOwnCard() {
  return (
    <section className="rounded-[16px] border border-line bg-paper-2 px-7 py-6">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="max-w-[58ch]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-3">
            <span
              className="h-1 w-1 rounded-full bg-ink-3"
              aria-hidden
            />
            Coming soon
          </div>
          <h2 className="mt-3 text-balance text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-1">
            Share your skills as agents. Get paid. Get clients.
          </h2>
          <p className="mt-2 text-pretty text-[13px] leading-[1.6] text-ink-3">
            Build agents from what you know — lawyers pay to use them, the
            public becomes your clients. Set your own price.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center rounded-full bg-ink-1 px-4 text-[12.5px] font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
        >
          Join waitlist →
        </button>
      </div>
    </section>
  );
}
