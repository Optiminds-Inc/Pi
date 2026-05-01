import Link from "next/link";
import { ThemeToggleIcon } from "@/components/ThemeToggle";
import { OnboardingSteps } from "@/components/OnboardingSteps";
import { OutcomeBlock } from "@/components/OutcomeBlock";
import { BookingForm } from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Channels />
        <Pricing />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ——————————————————————————————————————— */
/*  Header / Footer                           */
/* ——————————————————————————————————————— */

function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-30">
      <div className="flex h-[52px] w-full items-center justify-between px-8">
        <Link
          href="/"
          className="font-logo text-[20px] leading-none text-ink-1 transition-opacity hover:opacity-70"
        >
          Pi
        </Link>
        <nav className="flex items-center gap-7 text-[14px] text-ink-3">
          <a
            href="#channels"
            className="transition-colors duration-150 hover:text-ink-1"
          >
            Channels
          </a>
          <a
            href="#how"
            className="transition-colors duration-150 hover:text-ink-1"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="transition-colors duration-150 hover:text-ink-1"
          >
            Pricing
          </a>
          <Link
            href="/home"
            className="transition-colors duration-150 hover:text-ink-1"
          >
            Sample dashboard
          </Link>
          <ThemeToggleIcon className="-mx-1.5" />
          <Link
            href="/book"
            className="inline-flex h-[32px] items-center rounded-md bg-ink-1 px-4 text-[13px] font-medium text-paper transition-colors duration-200 hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8 py-10 text-[12px] text-ink-4">
        <span>
          <span className="font-logo mr-2 text-ink-3">Pi</span>
          The AI marketing team for personal injury law firms.
        </span>
        <span className="tabular">&copy; 2026</span>
      </div>
    </footer>
  );
}

/* ——————————————————————————————————————— */
/*  Hero                                      */
/* ——————————————————————————————————————— */

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-[1200px] gap-14 px-8 pt-24 pb-28 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-12 md:pt-32 md:pb-36">
        <div className="animate-fade-in">
          <div className="mb-9 inline-flex items-center gap-2 rounded-md border border-line bg-paper-2 px-3 py-1 text-[12px] text-ink-3">
            <span className="dot dot-success" />
            How PI lawyers win clients in the age of AI
          </div>

          <h1 className="font-display text-ink-1">
            <span
              className="block text-balance"
              style={{
                fontSize: "clamp(32px, 3.4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}
            >
              Own your AI marketing team.
            </span>
            <span
              className="mt-3 block text-balance text-ink-3"
              style={{
                fontSize: "clamp(22px, 2.2vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              Built for every <span className="font-logo text-info">P</span>
              ersonal <span className="font-logo text-info">i</span>njury lawyer.
            </span>
          </h1>

          <p
            className="mt-8 max-w-[520px] text-ink-2"
            style={{ fontSize: "16px", lineHeight: "1.65" }}
          >
            Pi makes your future clients{" "}
            <span className="text-ink-1">
              visible, predictable, and in your control
            </span>
            . The AI marketing team for every solo, small, and mid-size PI
            firm — with the same digital marketing power as the biggest.
          </p>
          <p
            className="mt-5 max-w-[520px] text-ink-2"
            style={{ fontSize: "16px", lineHeight: "1.65" }}
          >
            One call to onboard your AI marketing team. We handle every setup
            — Google Search Ads, Business Profile, Maps, SEO, AI Search, and
            Social. After that,{" "}
            <span className="text-ink-1">
              you watch every move and outcome in real time — and adjust your
              strategy whenever you want
            </span>
            .
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/book" className="btn-primary group">
              Book a 30-min onboarding call
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              >
                &rarr;
              </span>
            </Link>
            <Link href="/home" className="btn-ghost group !text-mondrian-yellow hover:!text-mondrian-yellow">
              Explore a sample dashboard
              <span aria-hidden className="arrow text-[12px]">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-3">
            <span>Flat monthly fee</span>
            <span className="text-ink-5">&middot;</span>
            <span>Cancel anytime</span>
            <span className="text-ink-5">&middot;</span>
            <span>Live instantly</span>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative animate-scale-in">
      <div className="card-hero relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="font-logo text-[14px] text-ink-1">Pi</span>
            <span className="text-ink-5">/</span>
            <span className="text-[12px] text-ink-3">Hayes Mitchell</span>
            <span className="text-ink-5">/</span>
            <span className="text-[12px] font-medium text-ink-1">Home</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-line bg-paper-2 px-2.5 py-[3px] text-[11px] text-ink-3">
            <span className="dot-live-red" />
            <span className="ml-2.5">Live</span>
          </div>
        </div>

        <div className="border-b border-line bg-paper-2 px-5 py-3.5">
          <div className="text-[11px] uppercase tracking-[0.04em] font-medium text-ink-4">
            Friday, May 1
          </div>
          <div className="mt-1 text-[13px] text-ink-1">
            <span className="font-medium">8 cases signed</span> this month &mdash;
            best month since onboarding.
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
          <PreviewKpi label="New leads" value="47" delta="+6" />
          <PreviewKpi label="Cases signed" value="8" delta="+2" />
          <PreviewKpi
            label="Cost / signed"
            value="$1,840"
            delta="−$310"
            positive
          />
        </div>

        <div className="px-5 pt-4 pb-5">
          <div className="mb-3 flex items-baseline justify-between">
            <div className="text-[11px] uppercase tracking-[0.04em] font-medium text-ink-4">
              What Pi shipped this week
            </div>
            <div className="text-[11px] text-ink-4 tabular">10 updates</div>
          </div>

          <ul className="space-y-3 text-[13px]">
            <PreviewActivity
              kind="content"
              title="Published 3 articles · brain-injury settlements"
              outcome="Indexed by Google in 4 hours"
              when="Today"
            />
            <PreviewActivity
              kind="ads"
              title="Truck Accident campaign +$300/day"
              outcome="Projected +6 to +9 leads this week"
              when="Today"
            />
            <PreviewActivity
              kind="local"
              title="GBP refreshed with 6 new firm photos"
              outcome="Profile views up 18% w/w"
              when="Yest."
            />
            <PreviewActivity
              kind="ai"
              title='Cited by ChatGPT for "TBI lawyer Houston"'
              outcome="2 of 5 AI answers now reference Hayes Mitchell"
              when="Yest."
            />
          </ul>
        </div>
      </div>

      <div className="card absolute -right-6 -bottom-8 hidden w-[210px] rotate-[2deg] overflow-hidden md:block">
        <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
          <div className="text-[10px] uppercase tracking-[0.04em] font-medium text-ink-4">
            This week&rsquo;s leads
          </div>
          <div className="text-[10px] text-ink-4 tabular">+13</div>
        </div>
        <ul className="divide-y divide-line text-[12px]">
          <PreviewLead name="Marcus J." source="Google Ads" status="Qualified" />
          <PreviewLead name="Robert C." source="Google Ads" status="Signed" />
          <PreviewLead name="Rosa V." source="GBP" status="Signed" />
          <PreviewLead name="Tom&aacute;s G." source="Organic" status="Signed" />
        </ul>
      </div>
    </div>
  );
}

function PreviewKpi({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="px-5 py-4">
      <div className="text-[10px] text-ink-3">{label}</div>
      <div className="mt-1.5 flex items-baseline justify-between gap-1.5">
        <div className="kpi-num" style={{ fontSize: "22px" }}>
          {value}
        </div>
        <div
          className={`text-[11px] tabular ${positive ? "text-success" : "text-ink-4"}`}
        >
          {delta}
        </div>
      </div>
    </div>
  );
}

function PreviewActivity({
  kind,
  title,
  outcome,
  when,
}: {
  kind: "content" | "ads" | "local" | "ai" | "running";
  title: string;
  outcome?: string;
  when: string;
}) {
  const dotCls: Record<string, string> = {
    content: "dot-mondrian-blue",
    ads: "dot-mondrian-yellow",
    local: "dot-warning",
    ai: "dot-mondrian-red",
    running: "",
  };
  return (
    <li className="flex gap-2.5">
      <span className={`dot ${dotCls[kind]} mt-[7px] shrink-0`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="truncate text-ink-1">{title}</div>
          <div className="shrink-0 text-[11px] text-ink-4 tabular">{when}</div>
        </div>
        {outcome && (
          <div className="mt-0.5 text-[11px] text-ink-4">{outcome}</div>
        )}
      </div>
    </li>
  );
}

function PreviewLead({
  name,
  source,
  status,
}: {
  name: string;
  source: string;
  status: "Qualified" | "Signed";
}) {
  return (
    <li className="flex items-center justify-between px-3.5 py-2">
      <div className="min-w-0 flex-1">
        <div className="truncate text-ink-1">{name}</div>
        <div className="text-[10px] text-ink-4">{source}</div>
      </div>
      <span
        className={[
          "ml-2 rounded-md px-1.5 py-[1px] text-[10px] font-medium",
          status === "Signed"
            ? "bg-success-soft text-success"
            : "bg-paper-2 text-ink-3",
        ].join(" ")}
      >
        {status}
      </span>
    </li>
  );
}

/* ——————————————————————————————————————— */
/*  Channels                                  */
/* ——————————————————————————————————————— */

function Channels() {
  const items = [
    {
      Icon: AdsIcon,
      name: "Google Search Ads",
      outcome: "Top of Google the moment they search.",
      what: "Paid placement on the highest-intent search a prospect makes.",
      pi: "Bids and budget tuned daily, optimized to cost per signed lead.",
    },
    {
      Icon: GbpIcon,
      name: "Google Business Profile",
      outcome: "The first thing prospects see on Google.",
      what: "Your firm's verified profile across search and Maps.",
      pi: "Weekly posts, review replies, photos refreshed every month.",
    },
    {
      Icon: MapIcon,
      name: "Google Maps",
      outcome: 'Top of "lawyer near me" searches.',
      what: "The map listing local prospects open before they call.",
      pi: "Office verified, categories tuned, reviews migrated and synced.",
    },
    {
      Icon: SeoIcon,
      name: "SEO",
      outcome: "Pages that rank for years.",
      what: "Articles answering the questions your prospects search.",
      pi: "8–10 new articles a month, older pages refreshed every quarter.",
    },
    {
      Icon: AiIcon,
      name: "AI Search",
      outcome: "Be the answer AI gives.",
      what: "When prospects ask ChatGPT or Perplexity for a lawyer.",
      pi: "Content structured for AI retrieval, citations tracked weekly.",
    },
    {
      Icon: SocialIcon,
      name: "Social",
      outcome: "Top of mind when an accident happens.",
      what: "Short-form video where prospects scroll every day.",
      pi: "Case-win shorts and educational posts across all major platforms.",
    },
  ];

  return (
    <section id="channels" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-8 py-24 md:py-32">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
          <div>
            <div className="eyebrow">The channels</div>
            <h2 className="font-display mt-5 text-ink-1">
              <span
                className="block"
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                }}
              >
                Six channels.
              </span>
              <span
                className="mt-2 block text-ink-3"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                Every PI client comes through one.
              </span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2 md:max-w-[460px]">
            Most small and mid-size personal injury firms grow on referrals and
            chance. Pi runs all six channels at once — the same playbook the
            largest firms run on, working in parallel.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line shadow-[var(--shadow-sm)] md:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={i}
              className="group relative flex flex-col bg-paper transition-colors duration-200 hover:bg-paper-tint"
            >
              <div className="flex flex-1 flex-col px-7 pt-7 pb-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-paper-2 text-ink-2 transition-all duration-200 group-hover:text-ink-1">
                    <it.Icon />
                  </div>
                  <div className="truncate text-[12px] font-semibold uppercase tracking-[0.04em] text-ink-3">
                    {it.name}
                  </div>
                </div>

                <h3
                  className="font-display mt-7 text-balance text-ink-1"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.25",
                  }}
                >
                  {it.outcome}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-ink-3">
                  {it.what}
                </p>
              </div>

              <div className="mt-auto flex min-h-[104px] flex-col justify-start border-t border-line bg-paper-2 px-7 py-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-logo text-[13px] text-ink-1">Pi</span>
                  <span className="text-[11px] font-medium text-ink-3">
                    runs
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-1">
                  {it.pi}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— Channel icons —— */
function AdsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}
function GbpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="3" width="11" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="2.5" y1="6.5" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 14C10 11 12 9 12 6.5C12 4 10.2 2 8 2C5.8 2 4 4 4 6.5C4 9 6 11 8 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function SeoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <line x1="2.5" y1="4" x2="11" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2.5" y1="7" x2="13.5" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2.5" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2.5" y1="13" x2="12" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function AiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2L9.2 6.8L14 8L9.2 9.2L8 14L6.8 9.2L2 8L6.8 6.8L8 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SocialIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6.6" y1="7" x2="9.4" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  How Pi works                              */
/* ——————————————————————————————————————— */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      mark: "Day 0 · 30 minutes",
      title: "We map your firm in one call.",
      body:
        "Our specialist team — lawyers, product, and engineering — meets you on one call. They understand your branding, your goals, and what you need, fast. You leave with a written plan and a fixed price.",
      tag: "Live with you",
    },
    {
      n: "02",
      mark: "From day one · always-on",
      title: "Your AI team runs and optimizes — automatically.",
      body:
        "Your AI team operates every channel: managing Google Ads bids, publishing SEO and AI Search content, monitoring rankings, refreshing GBP, replying to reviews, posting social. It reallocates budget from real performance, kills what isn’t converting, doubles down on what is — and reports back in real time.",
      tag: "Pi · running and optimizing 24/7",
    },
    {
      n: "03",
      mark: "Anytime · live dashboard",
      title: "Real-time visibility. Real-time control.",
      body:
        "See every channel’s performance, every lead that came in, every action your AI team took — the moment it happens, not in next month’s PDF. Raise or lower budget, swap practice areas, approve next month’s content — and your team adjusts immediately.",
      tag: "You · always in control",
    },
  ];

  return (
    <section id="how" className="border-t border-line bg-tinted">
      <div className="mx-auto w-full max-w-[1200px] px-8 py-24 md:py-32">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
          <div>
            <div className="eyebrow">How <span className="normal-case">Pi</span> works</div>
            <h2 className="font-display mt-5 text-ink-1">
              <span
                className="block"
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                }}
              >
                One call.
              </span>
              <span
                className="mt-2 block text-ink-3"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                Then your AI team takes over.
              </span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2 md:max-w-[460px]">
            Pi is built so you have a complete marketing team running every
            day — without a single hire — and full visibility into the work
            and the result.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line shadow-[var(--shadow-sm)] md:grid-cols-3">
          {steps.map((s, i) => {
            const stepColor =
              i === 0
                ? "text-mondrian-yellow"
                : i === 1
                  ? "text-mondrian-blue"
                  : "text-mondrian-red";
            return (
            <li key={s.n} className="relative flex flex-col bg-paper p-8">
              <div className="flex items-center gap-3">
                <span className={`font-display text-[28px] ${stepColor} tabular leading-none`}>
                  {s.n}
                </span>
                <div className="flex-1 border-t border-line" aria-hidden />
                {i < steps.length - 1 && (
                  <span className="text-ink-4" aria-hidden>
                    &rarr;
                  </span>
                )}
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.04em] font-medium text-ink-4">
                {s.mark}
              </div>
              <h3
                className="font-display mt-2 text-balance text-ink-1"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.25",
                }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-ink-3">
                {s.body}
              </p>
              <div className="mt-auto pt-7">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-2 px-3 py-1 text-[11px] text-ink-3">
                  <span className="dot" />
                  {s.tag}
                </div>
              </div>
            </li>
            );
          })}
        </ol>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-6 px-7 py-5 text-[14px] text-ink-2">
          <span>
            Every dollar, every article, every lead — surfaced live, the moment
            it happens.
          </span>
          <Link href="/home" className="btn-ghost group">
            Explore a sample dashboard
            <span aria-hidden className="arrow text-[12px]">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ——————————————————————————————————————— */
/*  Pricing                                   */
/* ——————————————————————————————————————— */

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      tagline: "Solo and 2-attorney firms",
      price: "$399",
      unit: "/ month",
      cta: "Book a strategy call",
      ctaHref: "/book",
      headline: "All six channels, lighter cadence",
      includes: [
        "100 monthly credits",
        "2 SEO + AI Search articles per month",
        "2 social posts per week",
        "Daily ad campaign management",
        "Live dashboard",
      ],
    },
    {
      name: "Growth",
      tagline: "3 to 15-attorney firms",
      price: "$999",
      unit: "/ month",
      cta: "Book a strategy call",
      ctaHref: "/book",
      headline: "All six channels, full cadence",
      includes: [
        "300 monthly credits",
        "8 SEO + AI Search articles per month",
        "5 social posts per week",
        "Plan controls — budget, focus, content approvals",
        "Strategy partner monthly review",
      ],
      featured: true,
    },
    {
      name: "Scale",
      tagline: "15+ attorneys or multi-state",
      price: "Custom",
      unit: "let’s talk",
      cta: "Talk to a partner",
      ctaHref: "/book",
      headline: "All six channels, custom cadence",
      includes: [
        "Custom credit volume",
        "Multi-location & multi-state",
        "Custom AI agent configuration",
        "Dedicated Pi partner",
        "Quarterly executive review",
      ],
    },
  ];

  return (
    <section id="pricing" className="border-t border-line bg-tinted">
      <div className="mx-auto w-full max-w-[1200px] px-8 py-24 md:py-32">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
          <div>
            <div className="eyebrow">Pricing</div>
            <h2 className="font-display mt-5 text-ink-1">
              <span
                className="block"
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                }}
              >
                The end of the
              </span>
              <span
                className="mt-2 block text-ink-3"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                agency retainer.
              </span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2 md:max-w-[480px]">
            Legacy agencies bill{" "}
            <span className="text-ink-1">$10,000+ a month</span>, locked in for
            twelve months, with monthly PDF reports for visibility. Pi runs more
            channels, more often, fully visible in real time — for one flat
            monthly fee, month-to-month, cancel any time.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "relative flex flex-col rounded-[12px] border bg-paper p-8 transition-all duration-200 hover:-translate-y-0.5",
                t.featured
                  ? "border-ink-1 shadow-[var(--shadow-md)]"
                  : "border-line shadow-[var(--shadow-sm)] hover:border-line-strong hover:shadow-[var(--shadow-md)]",
              ].join(" ")}
            >
              {t.featured && (
                <div className="absolute -top-3 left-8 rounded-md bg-ink-1 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-paper">
                  Recommended
                </div>
              )}

              <h3
                className="font-display text-ink-1"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {t.name}
              </h3>
              <p className="mt-1.5 text-[13px] text-ink-3">{t.tagline}</p>

              <div className="mt-7 flex items-baseline gap-2">
                <div
                  className="font-display text-ink-1 tabular"
                  style={{
                    fontSize: "44px",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: "1",
                  }}
                >
                  {t.price}
                </div>
                <div className="text-[13px] text-ink-4">{t.unit}</div>
              </div>

              <Link
                href={t.ctaHref}
                className={[
                  "group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[14px] font-medium transition-all duration-200",
                  t.featured
                    ? "bg-ink-1 text-paper hover:bg-accent-hover"
                    : "border border-line text-ink-1 hover:border-line-strong hover:bg-paper-2",
                ].join(" ")}
              >
                {t.cta}
                <span
                  aria-hidden
                  className="text-[12px] transition-transform duration-200 group-hover:translate-x-[3px]"
                >
                  &rarr;
                </span>
              </Link>

              <div className="mt-7 border-t border-line pt-5">
                <div className="text-[13px] font-semibold text-ink-1">
                  {t.headline}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {t.includes.map((it) => (
                    <li
                      key={it}
                      className="flex items-baseline gap-2.5 text-[13px] leading-[1.55] text-ink-2"
                    >
                      <CheckMini />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 px-7 py-5 text-[13px] text-ink-3">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <span>
              <span className="text-ink-4">+</span>{" "}
              <span className="text-ink-2">One-time onboarding setup</span> &middot;
              quoted in your strategy call
            </span>
            <span>
              <span className="text-ink-4">+</span>{" "}
              <span className="text-ink-2">Ad spend</span> &middot; paid direct to Google
            </span>
          </div>
          <Link
            href="/book"
            className="text-info transition-colors duration-150 hover:text-info-hover"
          >
            See full pricing details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function CheckMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden className="mt-[6px] shrink-0">
      <path
        d="M3 8.4l3 3L13 5"
        fill="none"
        stroke="var(--color-ink-1)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ——————————————————————————————————————— */
/*  Final CTA                                 */
/* ——————————————————————————————————————— */

function FinalCTA() {
  return (
    <section id="book" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-8 py-24 md:py-28">
        <h2 className="font-display max-w-[760px] text-ink-1">
          <span
            className="block text-balance"
            style={{
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
          >
            Thirty minutes to stop guessing
          </span>
          <span
            className="mt-2 block text-balance text-ink-3"
            style={{
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}
          >
            where next month&rsquo;s clients come from.
          </span>
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <OutcomeBlock />
            <div className="mt-10">
              <OnboardingSteps
                heading="What we set up for you"
                showAfter={false}
              />
            </div>
          </div>
          <BookingForm className="animate-scale-in self-start" />
        </div>
      </div>
    </section>
  );
}
