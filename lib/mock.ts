/**
 * Demo data for the Pi prototype.
 * The story: a 6-month-old Pi customer in Houston, TX, mid-size PI firm.
 * Numbers are realistic for the segment so the Strategy Call demo lands.
 */

export const firm = {
  name: "Hayes Mitchell",
  fullName: "Hayes Mitchell Personal Injury Law",
  city: "Houston, TX",
  partner: "Anna Mitchell",
  joined: "October 2025",
  practiceAreas: [
    { id: "auto", label: "Auto accidents", on: true, share: 38 },
    { id: "truck", label: "Truck accidents", on: true, share: 28 },
    { id: "slip", label: "Slip & fall", on: true, share: 14 },
    { id: "brain", label: "Brain injury / TBI", on: true, share: 12 },
    { id: "moto", label: "Motorcycle", on: true, share: 8 },
    { id: "wrongful", label: "Wrongful death", on: false, share: 0 },
    { id: "workplace", label: "Workplace", on: false, share: 0 },
    { id: "dog", label: "Dog bites", on: false, share: 0 },
  ],
  geo: {
    city: "Houston metro",
    radiusMiles: 40,
    zips: ["77002", "77004", "77005", "77019", "77024", "77027", "77056", "77098"],
  },
};

/* —————————————————————————————————————————— */
/*  AI Team — three agents, each owning channels  */
/* —————————————————————————————————————————— */

export type AgentId = "ads" | "seo" | "geo";

export type AgentInstructions = {
  overview: string;
  goal: string;
  strategy: string;
  actions: string;
};

export type Agent = {
  id: AgentId;
  name: string;             // sidebar label
  fullName: string;         // page header
  tagline: string;          // sidebar second line — channels covered
  role: string;             // one-paragraph description
  channels: string[];       // marketing surfaces this agent operates
  instructions: AgentInstructions;
};

export const agents: Agent[] = [
  {
    id: "ads",
    name: "Search ad pacer",
    fullName: "Search ad pacer",
    tagline: "Runs your Google Search Ads — keyword bids, daily budgets, and ad copy, optimized against cost per signed case.",
    role: "Runs your Google Search Ads end to end — keyword bidding, budget allocation, ad copy, and campaign pacing. Optimizes daily against cost per signed case.",
    channels: ["Google Search Ads"],
    instructions: {
      overview:
        "Pi runs your Google Search Ads account end to end. Owns keyword bidding, daily budget allocation across campaigns, ad copy testing, and campaign-level pacing.",
      goal:
        "Maximize signed cases per dollar of ad spend. Hold cost-per-signed below $2,500. Hit a blended ROAS of 4× across all campaigns.",
      strategy:
        "Reallocate budget every morning based on yesterday's CPL by campaign. Pause ad groups with CTR below 0.5% for two consecutive weeks. Scale campaigns hitting ROAS above 4× by 10% per week, capped at +$200/day per campaign.",
      actions:
        "• Always lead ad copy with the recovery story, never the firm name.\n• A/B test one variable at a time per campaign.\n• Surface for approval any campaign trending above the cost-per-signed ceiling for 7 days.\n• Pull spend from declining areas before adding new campaigns.",
    },
  },
  {
    id: "seo",
    name: "Article writer",
    fullName: "Article writer",
    tagline: "Writes and ships articles tuned for Google organic ranking — keyword-targeted, on-page optimized, refreshed quarterly.",
    role: "Writes and ships articles tuned for Google organic ranking. Keyword-targeted, on-page optimized, internally linked, refreshed quarterly to hold position.",
    channels: ["Google organic"],
    instructions: {
      overview:
        "Pi writes and ships articles tuned for Google organic search. Owns keyword targeting, on-page SEO, internal linking, schema markup, and the quarterly refresh queue.",
      goal:
        "Rank in Google's top-10 for the high-intent keywords your prospects search before calling a personal injury lawyer in Houston.",
      strategy:
        "Ship 8 articles per month: 4 evergreen guides + 4 timely posts tied to recent verdicts or statute changes. Refresh any article that drops out of Google's top-10 for 30 days. Lead every article with the question users actually search, not the keyword string.",
      actions:
        "• Cite Texas case law and statutes by section number for E-E-A-T signal.\n• Keep paragraphs under 4 sentences for readability.\n• Internal-link every new article to the 2 most relevant rankers within 24h of publish.\n• Update meta titles and descriptions on every refresh.",
    },
  },
  {
    id: "geo",
    name: "GEO optimizer",
    fullName: "GEO optimizer",
    tagline: "Drafts answer-first briefs cited by ChatGPT, Perplexity, and Claude when prospects ask AI for a Houston PI lawyer.",
    role: "Writes articles tuned to be cited by ChatGPT, Perplexity, Claude, and other generative engines. Different style than SEO — answer-first, citation-heavy, structured for LLM extraction.",
    channels: ["ChatGPT", "Perplexity", "Claude"],
    instructions: {
      overview:
        "Pi writes articles tuned to be retrieved and cited by ChatGPT, Perplexity, Claude, and other generative AI engines. Different style than SEO — answer-first structure, citation-heavy, designed for LLM extraction.",
      goal:
        "Be the source AI cites when prospects ask for a Houston personal injury lawyer. Track citation count per engine; target ≥5 cited mentions per month across the major engines.",
      strategy:
        "Lead every article with a one-sentence direct answer. Use schema.org markup for FAQ, HowTo, and LegalService. Cite primary sources (court records, Texas statutes) by section number — generative engines reward verifiable claims.",
      actions:
        "• Structure with H2/H3 headers that match how prospects phrase the question.\n• Avoid marketing language; LLMs filter it out as low-trust.\n• Re-run cited articles weekly across major engines; flag if citations drop.\n• Maintain factual accuracy obsessively — one wrong fact and the engine stops citing.",
    },
  },
];

/* —————————————————————————————————————————— */
/*  Dashboard top-line numbers                    */
/* —————————————————————————————————————————— */

export type PeriodId = "7d" | "30d" | "90d" | "ytd" | "month";

export const PERIODS: { id: PeriodId; label: string }[] = [
  { id: "month", label: "This month" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "ytd", label: "Year to date" },
];

export type PeriodStats = {
  adSpend: number;
  signed: number;
  signedDelta: number;
  signedDeltaPct: number;
  costPerSigned: number;
  costPerSignedDelta: number;
  pipelineValue: number;
  pipelineDeltaPct: number;
  roiDeltaPct?: number;
  funnel: {
    visitors: number;
    intake: number;
    qualified: number;
    consults: number;
    signed: number;
  };
  channels: ChannelRow[];
  callsDaily: number[];
  daysLabel: string;
};

export type ChannelRow = {
  id: string;
  name: string;
  group: "organic" | "paid";
  agentId: AgentId;
  visitors: number | null;
  signed: number;
  revenue: number;
  adSpend: number | null;
};

export const STATS: Record<PeriodId, PeriodStats> = {
  month: {
    adSpend: 7_950,
    signed: 11,
    signedDelta: 2,
    signedDeltaPct: 22,
    costPerSigned: 723,
    costPerSignedDelta: -120,
    pipelineValue: 418_000,
    pipelineDeltaPct: 34,
    roiDeltaPct: 18,
    funnel: { visitors: 8_420, intake: 82, qualified: 34, consults: 20, signed: 11 },
    channels: [
      { id: "organic", name: "Organic search",      group: "organic", agentId: "seo", visitors: 4_180, signed: 5, revenue: 190_000, adSpend: null },
      { id: "aeo",     name: "AI answers (AEO)",    group: "organic", agentId: "geo", visitors: 420,   signed: 1, revenue: 38_000,  adSpend: null },
      { id: "local",   name: "Local / Map pack",    group: "organic", agentId: "geo", visitors: 1_260, signed: 2, revenue: 76_000,  adSpend: null },
      { id: "gads",    name: "Google Search Ads",    group: "paid",    agentId: "ads", visitors: 1_820, signed: 2, revenue: 76_000,  adSpend: 4_820 },
      { id: "lsa",     name: "Local Services Ads",   group: "paid",    agentId: "ads", visitors: null,  signed: 1, revenue: 38_000,  adSpend: 2_150 },
      { id: "yelp",    name: "Yelp Ads",             group: "paid",    agentId: "ads", visitors: 740,   signed: 0, revenue: 0,       adSpend: 980 },
    ],
    callsDaily: [4, 5, 4, 5, 6, 5, 4, 5, 6, 4, 5, 6, 5, 6, 5, 6, 7, 5, 6, 7, 5, 6, 7, 6, 7, 8, 6, 7, 6, 6],
    daysLabel: "last 30 days",
  },
  "7d": {
    adSpend: 1410,
    signed: 3,
    signedDelta: 1,
    signedDeltaPct: 50,
    costPerSigned: 1520,
    costPerSignedDelta: -180,
    pipelineValue: 620_000,
    pipelineDeltaPct: 22,
    funnel: { visitors: 1980, intake: 13, qualified: 6, consults: 4, signed: 3 },
    channels: [
      { id: "seo",   name: "SEO",                  group: "organic", agentId: "seo", visitors: 940, signed: 1, revenue: 38_000, adSpend: null },
      { id: "ai",    name: "AI Search",            group: "organic", agentId: "geo", visitors: 110, signed: 1, revenue: 38_000, adSpend: null },
      { id: "gads",  name: "Google Search Ads",    group: "paid",    agentId: "ads", visitors: 480, signed: 1, revenue: 110_000, adSpend: 1410 },
    ],
    callsDaily: [4, 3, 5, 6, 4, 3, 7],
    daysLabel: "last 7 days",
  },
  "30d": {
    adSpend: 5500,
    signed: 8,
    signedDelta: 2,
    signedDeltaPct: 33,
    costPerSigned: 1840,
    costPerSignedDelta: -310,
    pipelineValue: 2_100_000,
    pipelineDeltaPct: 18,
    funnel: { visitors: 8420, intake: 47, qualified: 22, consults: 14, signed: 8 },
    channels: [
      { id: "seo",   name: "SEO",                  group: "organic", agentId: "seo", visitors: 4180, signed: 3, revenue: 220_000, adSpend: null },
      { id: "ai",    name: "AI Search",            group: "organic", agentId: "geo", visitors: 420,  signed: 1, revenue: 95_000,  adSpend: null },
      { id: "gads",  name: "Google Search Ads",    group: "paid",    agentId: "ads", visitors: 1820, signed: 2, revenue: 480_000, adSpend: 5280 },
    ],
    callsDaily: [4, 3, 4, 5, 3, 4, 6, 5, 4, 5, 6, 6, 4, 5, 6, 7, 6, 6, 7, 5, 6, 7, 6, 7, 8, 7, 6, 7, 8, 7],
    daysLabel: "last 30 days",
  },
  "90d": {
    adSpend: 16_400,
    signed: 18,
    signedDelta: 5,
    signedDeltaPct: 38,
    costPerSigned: 1920,
    costPerSignedDelta: -240,
    pipelineValue: 4_800_000,
    pipelineDeltaPct: 24,
    funnel: { visitors: 24_800, intake: 142, qualified: 64, consults: 38, signed: 18 },
    channels: [
      { id: "seo",   name: "SEO",                  group: "organic", agentId: "seo", visitors: 12_400, signed: 7, revenue: 540_000, adSpend: null },
      { id: "ai",    name: "AI Search",            group: "organic", agentId: "geo", visitors: 1280,  signed: 3, revenue: 220_000, adSpend: null },
      { id: "gads",  name: "Google Search Ads",    group: "paid",    agentId: "ads", visitors: 5400, signed: 5, revenue: 1_240_000, adSpend: 16_400 },
    ],
    callsDaily: Array.from({ length: 12 }, (_, i) => 4 + Math.round(Math.sin(i / 1.6) * 2 + i / 4)),
    daysLabel: "last 90 days",
  },
  ytd: {
    adSpend: 22_400,
    signed: 22,
    signedDelta: 7,
    signedDeltaPct: 47,
    costPerSigned: 1990,
    costPerSignedDelta: -310,
    pipelineValue: 5_400_000,
    pipelineDeltaPct: 31,
    funnel: { visitors: 32_600, intake: 168, qualified: 78, consults: 46, signed: 22 },
    channels: [
      { id: "seo",   name: "SEO",                  group: "organic", agentId: "seo", visitors: 16_200, signed: 8, revenue: 620_000, adSpend: null },
      { id: "ai",    name: "AI Search",            group: "organic", agentId: "geo", visitors: 1620,  signed: 4, revenue: 320_000, adSpend: null },
      { id: "gads",  name: "Google Search Ads",    group: "paid",    agentId: "ads", visitors: 7280, signed: 6, revenue: 1_540_000, adSpend: 22_400 },
    ],
    callsDaily: Array.from({ length: 16 }, (_, i) => 3 + Math.round(Math.sin(i / 1.8) * 2.5 + i / 3.4)),
    daysLabel: "year to date",
  },
};

/* —————————————————————————————————————————— */
/*  Investment (this month)                       */
/* —————————————————————————————————————————— */

export const investment = {
  monthly: {
    platform: 1950,
    adSpend: 5500,
    total: 7450,
  },
  adBudget: { min: 1000, max: 30000, step: 250, value: 5500 },
};

/* —————————————————————————————————————————— */
/*  Activity stream — agent-attributed             */
/* —————————————————————————————————————————— */

export type Activity = {
  id: string;
  agent: AgentId;
  channel: string;
  title: string;
  detail?: string;
  outcome?: string;
  output?: { label: string; href?: string };
  when: string;
  ageMinutes: number;
};

export const activity: Activity[] = [
  {
    id: "a1",
    agent: "seo",
    channel: "Google organic",
    title: "Published 3 articles on brain injury settlements",
    detail: "Targeting Houston, Sugar Land, and The Woodlands.",
    outcome: "Indexed by Google within 4 hours.",
    output: { label: "View articles", href: "#" },
    when: "Today, 9:14 AM",
    ageMinutes: 132,
  },
  {
    id: "a2",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Increased Truck Accident campaign budget by $300/day",
    detail: "Reallocated from Slip & Fall — CTR there has held below 0.5% all month.",
    outcome: "Projected +6 to +9 qualified leads this week.",
    when: "Today, 8:02 AM",
    ageMinutes: 204,
  },
  {
    id: "a3",
    agent: "geo",
    channel: "ChatGPT",
    title: 'Cited by ChatGPT for "TBI lawyer Houston"',
    detail: "Hayes Mitchell appears in 2 of 5 ChatGPT answers for the keyword.",
    outcome: "First citation for this query — schema markup paid off.",
    when: "Yesterday, 4:48 PM",
    ageMinutes: 60 * 24,
  },
  {
    id: "a4",
    agent: "geo",
    channel: "Perplexity",
    title: "Restructured 'Brain injury TBI' article for AI retrieval",
    detail: "Added one-sentence answers under each H2; cited Texas TBI statute by section.",
    outcome: "Perplexity now cites the article for 6 query variants.",
    when: "Yesterday, 2:11 PM",
    ageMinutes: 60 * 26,
  },
  {
    id: "a11",
    agent: "geo",
    channel: "Claude",
    title: "Claude indexed 'Slip and fall premises liability' brief",
    detail: "Schema.org LegalService + FAQ markup picked up.",
    outcome: "Now eligible for Claude citations on 11 related queries.",
    when: "Yesterday, 11:08 AM",
    ageMinutes: 60 * 28,
  },
  {
    id: "a5",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Paused 2 underperforming ad groups",
    detail: "'Slip downtown' and 'general PI Houston' — CTR below 0.5%.",
    outcome: "Saved $640 this week, redirected to Truck Accident.",
    when: "Mon, Apr 28",
    ageMinutes: 60 * 60,
  },
  {
    id: "a6",
    agent: "seo",
    channel: "Google organic",
    title: "Refreshed 'Brain injury TBI compensation Texas' article",
    detail: "Added 2026 verdict data and updated insurer caps.",
    outcome: "Now ranks #3 (up from #7) for primary keyword.",
    output: { label: "View article", href: "#" },
    when: "Mon, Apr 28",
    ageMinutes: 60 * 64,
  },
  {
    id: "a7",
    agent: "seo",
    channel: "Google organic",
    title: "Internal-linked 4 new articles to top rankers",
    detail: "Auto-linked from new bicycle / dog-bite / motorcycle / TBI posts.",
    outcome: "Average new-page time-to-index dropped to under 4 hours.",
    when: "Sun, Apr 27",
    ageMinutes: 60 * 88,
  },
  {
    id: "a8",
    agent: "geo",
    channel: "ChatGPT",
    title: "Published AI brief: 'Truck accident HOS violations'",
    detail: "Answer-first structure; cites FMCSA hours-of-service rules by section.",
    outcome: "Indexed by ChatGPT and Perplexity within 6 hours.",
    when: "Sun, Apr 27",
    ageMinutes: 60 * 90,
  },
  {
    id: "a12",
    agent: "geo",
    channel: "Perplexity",
    title: "Weekly engine sweep — Perplexity citations up 40%",
    detail: "12 cited mentions this week vs 8 last week, across 4 articles.",
    when: "Sat, Apr 26",
    ageMinutes: 60 * 110,
  },
  {
    id: "a9",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Added 24 new keywords to Truck Accident campaign",
    detail: "'18 wheeler accident lawyer Houston' top performer.",
    outcome: "First-day CPC $4.20, well below $7 ceiling.",
    when: "Fri, Apr 25",
    ageMinutes: 60 * 132,
  },
  {
    id: "a10",
    agent: "geo",
    channel: "ChatGPT",
    title: "Refreshed 'Settlement amounts' article — re-cited",
    detail: "Updated with 2026 verdict data; re-tested across all engines.",
    outcome: "ChatGPT citation count restored after dropping last week.",
    when: "Fri, Apr 25",
    ageMinutes: 60 * 134,
  },
  {
    id: "a13",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Lifted bid +12% on 'truck accident lawyer Houston'",
    detail: "CTR climbed from 3.1% to 4.8% over the past 48 hours.",
    outcome: "CPC holding at $6.40 — well below the $9 ceiling.",
    when: "Today, 10:42 AM",
    ageMinutes: 18,
  },
  {
    id: "a14",
    agent: "seo",
    channel: "Google organic",
    title: "Found new opportunity: 'rideshare accident attorney Houston' (vol 320, KD 28)",
    detail: "Low-competition long-tail with rising 90-day search volume.",
    outcome: "Added to next week's queue.",
    when: "Today, 10:15 AM",
    ageMinutes: 45,
  },
  {
    id: "a15",
    agent: "geo",
    channel: "Perplexity",
    title: "Perplexity started citing 'What to do after a car accident in Houston'",
    detail: "Article published 3 weeks ago — first Perplexity citation today.",
    outcome: "Now cited in 3 of 5 query variants.",
    when: "Today, 9:50 AM",
    ageMinutes: 70,
  },
  {
    id: "a16",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Added 14 negative keywords across 3 campaigns",
    detail: "'Free consultation', 'pro bono', 'do it yourself' — none convert here.",
    outcome: "Estimated −$180/wk in wasted spend.",
    when: "Today, 7:38 AM",
    ageMinutes: 200,
  },
  {
    id: "a17",
    agent: "seo",
    channel: "Google organic",
    title: "Updated meta titles + descriptions on 6 ranking articles",
    detail: "Google's new SERP layout favors 58-character titles.",
    when: "Today, 6:50 AM",
    ageMinutes: 250,
  },
  {
    id: "a18",
    agent: "ads",
    channel: "Google Search Ads",
    title: "A/B test launched: 2 headline variants for Motorcycle Accident",
    detail: "'Hit-and-run? We find them.' vs current control.",
    when: "Yesterday, 5:14 PM",
    ageMinutes: 60 * 19,
  },
  {
    id: "a19",
    agent: "geo",
    channel: "ChatGPT",
    title: "Drafted answer-first version of 'Slip and fall liability'",
    detail: "Lead sentence rewritten to match how prospects phrase the question.",
    outcome: "Re-tested across 5 engines; 2 citations already.",
    when: "Yesterday, 3:08 PM",
    ageMinutes: 60 * 21,
  },
  {
    id: "a20",
    agent: "seo",
    channel: "Google organic",
    title: "Dropped 8 keywords with zero traffic after 90 days",
    detail: "Effort reallocated to 5 rising long-tails in the brain-injury cluster.",
    when: "Yesterday, 11:30 AM",
    ageMinutes: 60 * 25,
  },
  {
    id: "a21",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Saved $420 with overnight bid adjustments",
    detail: "Pulled spend from 9 PM–6 AM where conversions run 70% lower.",
    outcome: "Reallocated to the 11 AM–4 PM peak window.",
    when: "Mon, Apr 28",
    ageMinutes: 60 * 56,
  },
  {
    id: "a22",
    agent: "geo",
    channel: "Claude",
    title: "Added LegalService schema to 4 practice-area pages",
    detail: "Bar number, languages, and hours now structured for LLM extraction.",
    outcome: "Eligible for Claude citations on 14 related queries.",
    when: "Mon, Apr 28",
    ageMinutes: 60 * 68,
  },
  {
    id: "a23",
    agent: "seo",
    channel: "Google organic",
    title: "Optimized 'Houston motorcycle accident' — readability 78 → 92",
    detail: "Shortened paragraphs, added 4 H2 headers, simplified legal terms.",
    outcome: "Now ranks #6 (up from #11) for primary keyword.",
    output: { label: "View article", href: "#" },
    when: "Sun, Apr 27",
    ageMinutes: 60 * 82,
  },
  {
    id: "a24",
    agent: "geo",
    channel: "ChatGPT",
    title: "ChatGPT now cites Hayes Mitchell for '18-wheeler injury Texas'",
    detail: "First time appearing in this engine for a commercial-vehicle query.",
    when: "Sat, Apr 26",
    ageMinutes: 60 * 105,
  },
];

/* —————————————————————————————————————————— */
/*  Chat events — structured Notion-style          */
/* —————————————————————————————————————————— */

export type ChatEvent =
  | { type: "thought"; id: string; text: string; time: string }
  | { type: "task"; id: string; label: string; source?: string; sourceDetail?: string; time: string }
  | { type: "steps"; id: string; count: number; time: string }
  | { type: "done"; id: string; items: { icon: "✅" | "⚠️"; text: string }[]; time: string }
  | { type: "running"; id: string; text: string; status: string; time: string }
  | { type: "question"; id: string; text: string; time: string }
  | { type: "answer"; id: string; text: string; stats?: { label: string; value: string }[]; time: string };

export const chatEvents: Record<AgentId, ChatEvent[]> = {
  ads: [
    { type: "running", id: "ce-a0", text: "Daily budget reallocation", status: "Pulling yesterday's CPL data to redistribute today's spend.", time: "Today, 4:00 AM" },
    { type: "thought", id: "ce-a1", text: "Truck Accident has the highest signed-case rate at 4.2%. Slip & Fall CTR dropped below 0.5% — reallocating $300/day.", time: "Today, 8:02 AM" },
    { type: "steps", id: "ce-a2", count: 3, time: "Today, 8:02 AM" },
    { type: "done", id: "ce-a3", items: [
      { icon: "✅", text: "Increased Truck Accident budget by $300/day" },
      { icon: "✅", text: "Paused 2 underperforming ad groups" },
      { icon: "✅", text: "Added 14 negative keywords — est. −$180/wk wasted spend" },
    ], time: "Today, 8:04 AM" },
    { type: "task", id: "ce-a4", label: "Keyword opportunity detected", source: "Google Search Ads", sourceDetail: "'truck accident lawyer Houston' CTR up 55% in 48h", time: "Today, 10:42 AM" },
    { type: "done", id: "ce-a5", items: [
      { icon: "✅", text: "Lifted bid +12% on 'truck accident lawyer Houston'" },
      { icon: "✅", text: "CPC holding at $6.40 — well below $9 ceiling" },
    ], time: "Today, 10:43 AM" },
    { type: "task", id: "ce-a6", label: "A/B test ready", source: "Motorcycle Accident campaign", sourceDetail: "New headline: 'Hit-and-run? We find them.'", time: "Yesterday" },
    { type: "done", id: "ce-a8", items: [
      { icon: "✅", text: "Launched 2 headline variants for Motorcycle Accident" },
      { icon: "✅", text: "Saved $420 with overnight bid adjustments" },
    ], time: "Yesterday" },
  ],
  seo: [
    { type: "running", id: "ce-s0", text: "3 articles in draft", status: "Bicycle accidents · Dog bites · Motorcycle DUI", time: "Today, 6:02 AM" },
    { type: "thought", id: "ce-s1", text: "Brain injury cluster has 3 keywords in top-10 but none in top-5. Refreshing with 2026 verdict data should push #7 → #3.", time: "Today, 9:00 AM" },
    { type: "steps", id: "ce-s2", count: 4, time: "Today, 9:00 AM" },
    { type: "done", id: "ce-s3", items: [
      { icon: "✅", text: "Published 3 articles on brain injury settlements" },
      { icon: "✅", text: "Indexed by Google within 4 hours" },
      { icon: "✅", text: "Internal-linked 4 new articles to top rankers" },
    ], time: "Today, 9:14 AM" },
    { type: "task", id: "ce-s4", label: "New keyword opportunity", source: "Google organic", sourceDetail: "'rideshare accident attorney Houston' — vol 320, KD 28", time: "Today, 10:15 AM" },
    { type: "done", id: "ce-s5", items: [
      { icon: "✅", text: "Added to next week's content queue" },
    ], time: "Today, 10:15 AM" },
    { type: "running", id: "ce-s6", text: "Refreshing 'Houston slip-and-fall' article", status: "Adding 2026 case-law updates.", time: "Today, 11:00 AM" },
  ],
  geo: [
    { type: "running", id: "ce-g0", text: "Drafting AI brief: 'Premises liability for self-driving cars'", status: "Answer-first structure with FMCSA + Texas Civ. Prac. Code citations.", time: "Today, 7:10 AM" },
    { type: "thought", id: "ce-g1", text: "Settlement amounts article lost a ChatGPT citation last week. Re-adding 2026 verdict data and structured FAQ should restore it.", time: "Today, 9:30 AM" },
    { type: "steps", id: "ce-g2", count: 5, time: "Today, 9:30 AM" },
    { type: "done", id: "ce-g3", items: [
      { icon: "✅", text: "Refreshed 'Settlement amounts' — ChatGPT citation restored" },
      { icon: "✅", text: "Added LegalService schema to 4 practice-area pages" },
      { icon: "✅", text: "Published AI brief: 'Truck accident HOS violations'" },
      { icon: "⚠️", text: "Claude indexing pending — usually takes 24–48h" },
    ], time: "Today, 9:48 AM" },
    { type: "task", id: "ce-g4", label: "New citation detected", source: "Perplexity", sourceDetail: "'What to do after a car accident in Houston' — first Perplexity citation", time: "Today, 9:50 AM" },
    { type: "done", id: "ce-g5", items: [
      { icon: "✅", text: "Now cited in 3 of 5 Perplexity query variants" },
    ], time: "Today, 9:50 AM" },
  ],
};

/* —————————————————————————————————————————— */
/*  Currently running                              */
/* —————————————————————————————————————————— */

export type RunningItem = {
  id: string;
  agent: AgentId;
  channel: string;
  title: string;
  status: string;
  progress?: number;
  startedAt: string;
  etaText?: string;
};

export const running: RunningItem[] = [
  {
    id: "r1",
    agent: "seo",
    channel: "SEO",
    title: "3 articles in draft",
    status: "Bicycle accidents · Dog bites · Motorcycle DUI",
    progress: 60,
    startedAt: "Today, 6:02 AM",
    etaText: "Ships in ~6 hours",
  },
  {
    id: "r2",
    agent: "ads",
    channel: "Google Search Ads",
    title: "Daily budget reallocation",
    status: "Pulling yesterday's CPL data to redistribute today's spend.",
    progress: 80,
    startedAt: "Today, 4:00 AM",
    etaText: "Completes by 9 AM",
  },
  {
    id: "r3",
    agent: "geo",
    channel: "ChatGPT",
    title: "Drafting AI brief: 'Premises liability for self-driving cars'",
    status: "Answer-first structure with FMCSA + Texas Civ. Prac. Code citations.",
    progress: 75,
    startedAt: "Today, 7:10 AM",
    etaText: "Ships today",
  },
  {
    id: "r4",
    agent: "seo",
    channel: "SEO",
    title: "Refreshing 'Houston slip-and-fall' article",
    status: "Adding 2026 case-law updates.",
    progress: 35,
    startedAt: "Today, 8:25 AM",
    etaText: "Ships today",
  },
];

/* —————————————————————————————————————————— */
/*  Per-agent intervention prompts                 */
/* —————————————————————————————————————————— */

export type PromptKind = "action" | "query" | "approval";

export type AgentPrompt = {
  id: string;
  agent: AgentId;
  kind: PromptKind;
  prompt: string;       // user-facing label
  hint: string;         // one-line explanation
  // For queries — a fixed response rendered inline.
  response?: {
    headline: string;
    body: string;
    stats?: { label: string; value: string }[];
  };
};

export const prompts: AgentPrompt[] = [
  /* ——— Ads ——— */
  {
    id: "ads.budget",
    agent: "ads",
    kind: "action",
    prompt: "Adjust monthly budget",
    hint: "Move the slider — Pi reallocates daily within the new ceiling.",
  },
  {
    id: "ads.working",
    agent: "ads",
    kind: "query",
    prompt: "What's working this week?",
    hint: "Top campaigns and where the wins came from.",
    response: {
      headline: "Truck Accident is your strongest campaign this week.",
      body:
        "4 signed cases at $132 CPL, well below your $200 ceiling. Auto Accident close behind at 3 signed, $117 CPL. Slip & Fall paused — CTR holding at 0.4%, not converting.",
      stats: [
        { label: "Top campaign", value: "Truck Accident" },
        { label: "Signed", value: "4" },
        { label: "CPL", value: "$132" },
      ],
    },
  },
  {
    id: "ads.scale",
    agent: "ads",
    kind: "query",
    prompt: "Should I scale or pull back?",
    hint: "Pi reads ROAS and recommends a direction.",
    response: {
      headline: "Scale up — ROAS at 4.2× across all campaigns.",
      body:
        "Up from 3.1× last month. Truck Accident has the most headroom. Recommend +$100/day to capture more I-10 corridor traffic. Pi will start the lift Monday if you approve below.",
      stats: [
        { label: "Blended ROAS", value: "4.2×" },
        { label: "vs last month", value: "+1.1×" },
        { label: "Suggested lift", value: "+$100/day" },
      ],
    },
  },
  {
    id: "ads.pending",
    agent: "ads",
    kind: "approval",
    prompt: "Review pending campaign changes",
    hint: "Reallocations and keyword expansions waiting on you.",
  },

  /* ——— SEO ——— */
  {
    id: "seo.cadence",
    agent: "seo",
    kind: "action",
    prompt: "Adjust article cadence",
    hint: "Articles per month — Pi packs the queue accordingly.",
  },
  {
    id: "seo.queue",
    agent: "seo",
    kind: "approval",
    prompt: "Review topic queue",
    hint: "Approve or decline what Pi proposes to write next.",
  },
  {
    id: "seo.ranking",
    agent: "seo",
    kind: "query",
    prompt: "What's ranking?",
    hint: "Top articles on Google plus AI Search citations.",
    response: {
      headline: "3 articles in Google's top 5 + 1 cited by ChatGPT.",
      body:
        "'Brain injury TBI compensation Texas' moved to #3 (up from #7). '18-wheeler accident lawyer Houston' at #5. 'Slip and fall premises liability Texas' at #8. ChatGPT cites Hayes Mitchell in 2 of 5 answers for 'TBI lawyer Houston'.",
      stats: [
        { label: "Top 10 keywords", value: "11" },
        { label: "Top 5 keywords", value: "3" },
        { label: "AI citations / mo", value: "4" },
      ],
    },
  },
  {
    id: "seo.request",
    agent: "seo",
    kind: "action",
    prompt: "Request a topic for a practice area",
    hint: "Pick an area — Pi adds 3 candidate topics to the queue.",
  },

  /* ——— GEO ——— */
  {
    id: "geo.post",
    agent: "geo",
    kind: "approval",
    prompt: "Approve this week's GBP post",
    hint: "Pi drafts one post a week — you have final say.",
  },
  {
    id: "geo.replies",
    agent: "geo",
    kind: "approval",
    prompt: "Approve review replies",
    hint: "Pi drafts replies to new reviews. Approve, edit, or skip.",
  },
  {
    id: "geo.rank",
    agent: "geo",
    kind: "query",
    prompt: "How am I ranking locally?",
    hint: "Local-pack position by ZIP, plus where you're slipping.",
    response: {
      headline: "Top-3 in 6 of 8 target ZIPs.",
      body:
        "Strong: 77002 (Downtown, #1), 77019 (River Oaks, #2). Mid: 77004, 77024, 77056, 77098. Weak: 77027 (Galleria — Houston Injury Lawyers dominates) and 77005 (Rice Village — recent competitor entry).",
      stats: [
        { label: "Top-3 ZIPs", value: "6 of 8" },
        { label: "Avg rank", value: "2.4" },
        { label: "Slipping", value: "2 ZIPs" },
      ],
    },
  },
  {
    id: "geo.info",
    agent: "geo",
    kind: "action",
    prompt: "Update business info",
    hint: "Hours, categories, photos — changes sync to GBP and Maps.",
  },
];

/* —————————————————————————————————————————— */
/*  Pending approvals — referenced by .approval prompts */
/* —————————————————————————————————————————— */

export type PendingCampaignChange = {
  id: string;
  type: "budget" | "pause" | "keyword";
  campaign: string;
  summary: string;
  rationale: string;
};

export const pendingCampaignChanges: PendingCampaignChange[] = [
  {
    id: "cc1",
    type: "budget",
    campaign: "Truck Accident — Houston Metro",
    summary: "+$100/day (from $145 to $245)",
    rationale: "ROAS 5.1× this month, well above target. Headroom in I-10 corridor traffic.",
  },
  {
    id: "cc2",
    type: "pause",
    campaign: "Slip & Fall — Downtown",
    summary: "Pause until further notice",
    rationale: "CTR 0.4% for 3 weeks running. Spend better deployed elsewhere.",
  },
  {
    id: "cc3",
    type: "keyword",
    campaign: "Brain Injury / TBI",
    summary: "Add 8 new keywords",
    rationale: "Google's keyword planner shows 'tbi settlement amount' and 'concussion lawsuit Houston' rising.",
  },
];

export type GeoBrief = {
  id: string;
  title: string;
  target: string;       // which engines
  status: TopicStatus;
  eta: string;
};

export const geoQueue: GeoBrief[] = [
  { id: "gx1", title: "TBI settlement amounts in Texas: a definitive answer-first guide", target: "ChatGPT, Perplexity", status: "pending", eta: "May 5" },
  { id: "gx2", title: "Houston truck accident liability: who pays under FMCSA rules", target: "All engines", status: "pending", eta: "May 8" },
  { id: "gx3", title: "Premises liability cheat sheet — schema-rich, citation-heavy", target: "ChatGPT", status: "pending", eta: "May 12" },
  { id: "gx4", title: "What insurance adjusters won't tell you (rewritten for AI retrieval)", target: "Perplexity, Claude", status: "in_progress", eta: "May 4" },
];

/* —————————————————————————————————————————— */
/*  Firm-level profile (user-editable)             */
/* —————————————————————————————————————————— */

export type FirmProfile = {
  name: string;
  displayName: string;
  partner: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  hours: string;
  languages: string[];
  landingUrl: string;
  barState: string;
  barNumber: string;
  style: string;
  objective: string;
};

export const firmProfile: FirmProfile = {
  name: "Hayes Mitchell Personal Injury Law, PLLC",
  displayName: "Hayes Mitchell PI Law",
  partner: "Anna Mitchell",
  email: "intake@hayesmitchelllaw.com",
  phone: "(713) 555-0142",
  website: "hayesmitchelllaw.com",
  address: "800 Main St, Suite 1400, Houston, TX 77002",
  hours: "Mon–Fri 8:00 AM – 6:00 PM CT · 24/7 intake line",
  languages: ["English", "Spanish"],
  landingUrl: "hayesmitchelllaw.com/houston-injury",
  barState: "TX",
  barNumber: "24038621",
  style: "Plain English, second person. No legalese, no superlatives, no fear-mongering. Lead with what we'll do, not what they've suffered.",
  objective: "Signed cases in core practice areas at or under target CPA. Quality over volume — turn down cases outside focus.",
};

/* —————————————————————————————————————————— */
/*  Connections — third-party accounts Pi runs      */
/*  in the lawyer's name.                          */
/* —————————————————————————————————————————— */

export type ConnectionStatus = "connected" | "pending" | "issue" | "not_connected";

export type ConnectionCategory =
  | "site"
  | "search"
  | "paid"
  | "local"
  | "intake"
  | "crm";

export type Connection = {
  id: string;
  name: string;
  description: string;
  status: ConnectionStatus;
  identifier?: string;
  holder?: string;
  category: ConnectionCategory;
  pi_managed: boolean;
  agent?: AgentId;
  detailNote?: string;
};

export const connections: Connection[] = [
  {
    id: "wordpress",
    name: "WordPress",
    description: "Your site. Pi publishes articles + runs landing-page tests here.",
    status: "connected",
    identifier: "hayesmitchelllaw.com",
    holder: firmProfile.partner,
    category: "site",
    pi_managed: true,
    agent: "seo",
  },
  {
    id: "gads",
    name: "Google Search Ads",
    description: "Paid keyword search. Pi reallocates budget daily.",
    status: "connected",
    identifier: "Customer ID 471-883-9920",
    holder: firmProfile.partner,
    category: "paid",
    pi_managed: true,
    agent: "ads",
  },
  {
    id: "lsa",
    name: "Local Services Ads",
    description: "Lead-priced paid local listings. Background check in progress.",
    status: "pending",
    identifier: "Application #G-LSA-21804",
    holder: firmProfile.partner,
    category: "paid",
    pi_managed: true,
    agent: "ads",
    detailNote: "Day 4 of 7 — bar license confirmed, awaiting background check.",
  },
  {
    id: "gbp",
    name: "Google Business Profile",
    description: "The card that appears on branded searches.",
    status: "connected",
    identifier: "Hayes Mitchell PI Law",
    holder: firmProfile.partner,
    category: "local",
    pi_managed: true,
    agent: "geo",
  },
  {
    id: "gmaps",
    name: "Google Maps listing",
    description: "Verified at office address. Drives the local pack.",
    status: "connected",
    identifier: "Hayes Mitchell — 800 Main St, Houston",
    holder: firmProfile.partner,
    category: "local",
    pi_managed: true,
    agent: "geo",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    description: "Page-level analytics across the whole site.",
    status: "connected",
    identifier: "Property G-J9XQ2P11",
    holder: firmProfile.partner,
    category: "search",
    pi_managed: true,
    agent: "seo",
  },
  {
    id: "gsc",
    name: "Google Search Console",
    description: "Organic indexing, ranking, and keyword data.",
    status: "connected",
    identifier: "hayesmitchelllaw.com",
    holder: firmProfile.partner,
    category: "search",
    pi_managed: true,
    agent: "seo",
  },
];

/* —————————————————————————————————————————— */
/*  Tracking numbers — one per channel             */
/* —————————————————————————————————————————— */

export type TrackingTestStatus = "working" | "failed" | "untested";

export type TrackingNumber = {
  channelKey: string;        // "gads", "lsa", "gbp", "gmaps", "site", "yelp"
  channel: string;           // display name
  number: string;            // formatted phone
  placement: "auto" | "manual";
  test: TrackingTestStatus;  // initial verified state
};

export const trackingNumbers: TrackingNumber[] = [
  {
    channelKey: "gads",
    channel: "Google Search Ads",
    number: "(713) 555-0211",
    placement: "auto",
    test: "working",
  },
  {
    channelKey: "lsa",
    channel: "Local Services Ads",
    number: "(713) 555-0212",
    placement: "auto",
    test: "untested",
  },
  {
    channelKey: "gbp",
    channel: "Google Business Profile",
    number: "(713) 555-0213",
    placement: "auto",
    test: "working",
  },
  {
    channelKey: "gmaps",
    channel: "Google Maps listing",
    number: "(713) 555-0214",
    placement: "auto",
    test: "working",
  },
  {
    channelKey: "site",
    channel: "Site footer + contact page",
    number: "(713) 555-0215",
    placement: "manual",
    test: "working",
  },
  {
    channelKey: "yelp",
    channel: "Yelp + directories",
    number: "(713) 555-0216",
    placement: "manual",
    test: "untested",
  },
];

/* —————————————————————————————————————————— */
/*  Content topic queue                           */
/* —————————————————————————————————————————— */

export type TopicStatus =
  | "pending"
  | "approved"
  | "in_progress"
  | "published"
  | "declined";

export const contentQueue = [
  { id: "c1", title: "Bicycle accidents in Houston: who pays?", area: "Auto", status: "approved" as TopicStatus, eta: "May 2" },
  { id: "c2", title: "Dog bite settlements in Texas: 2026 guide", area: "Other", status: "approved" as TopicStatus, eta: "May 4" },
  { id: "c3", title: "Motorcycle DUI accidents: pursuing the at-fault driver", area: "Moto", status: "in_progress" as TopicStatus, eta: "May 5" },
  { id: "c4", title: "What insurance adjusters won't tell you about TBI claims", area: "Brain", status: "pending" as TopicStatus, eta: "May 8" },
  { id: "c5", title: "Truck driver hours-of-service violations: how they help your case", area: "Truck", status: "pending" as TopicStatus, eta: "May 12" },
  { id: "c6", title: "Houston Metro slip-and-fall: premises liability primer", area: "Slip", status: "pending" as TopicStatus, eta: "May 14" },
];

/* —————————————————————————————————————————— */
/*  Leads                                          */
/* —————————————————————————————————————————— */

export type LeadStatus = "new" | "contacted" | "qualified" | "signed" | "lost";
export type LeadSource = "Google Ads" | "Organic" | "GBP" | "Maps" | "Referral" | "Direct";

export type Lead = {
  id: string;
  name: string;
  channel: "call" | "form";
  source: LeadSource;
  area: string;
  intakeAt: string;
  status: LeadStatus;
  estValue: number | null;
  note?: string;
  /** AI-assigned fit score, 0–100. Drives the Hot/Warm/Cool tier. */
  score: number;
  /** Channel-specific intake duration label, e.g. "Call · 4:32" */
  intakeMeta: string;
};

export const leads: Lead[] = [
  { id: "L047", name: "Marcus J.",   channel: "call", source: "Google Ads", area: "Truck",  intakeAt: "Today, 11:42 AM", status: "qualified", estValue: 380000, score: 96, intakeMeta: "Call · 6:14", note: "18-wheeler rear-ended on I-10. Hospitalized, ongoing treatment." },
  { id: "L046", name: "Elena R.",    channel: "form", source: "Organic",    area: "Brain",  intakeAt: "Today, 9:20 AM",  status: "new",       estValue: null,   score: 88, intakeMeta: "Form · 3:08", note: "TBI from MVA 8 weeks ago, treatment ongoing, no attorney yet." },
  { id: "L045", name: "David K.",    channel: "call", source: "GBP",        area: "Auto",   intakeAt: "Today, 8:55 AM",  status: "contacted", estValue: 65000,  score: 72, intakeMeta: "Call · 4:32", note: "Rear-ended on Hwy 59, neck pain, has insurance info." },
  { id: "L044", name: "Sarah W.",    channel: "call", source: "Google Ads", area: "Slip",   intakeAt: "Yesterday",       status: "qualified", estValue: 42000,  score: 64, intakeMeta: "Call · 3:48", note: "Slipped at grocery store, hip injury, store accepted incident." },
  { id: "L043", name: "Tomás G.",    channel: "form", source: "Organic",    area: "Auto",   intakeAt: "Yesterday",       status: "signed",    estValue: 220000, score: 91, intakeMeta: "Form · 2:54", note: "T-bone collision, passenger injured, police report filed." },
  { id: "L042", name: "Janelle P.",  channel: "call", source: "Maps",       area: "Auto",   intakeAt: "Yesterday",       status: "lost",      estValue: null,   score: 32, intakeMeta: "Call · 1:22", note: "Out of state — referred out." },
  { id: "L041", name: "Robert C.",   channel: "call", source: "Google Ads", area: "Truck",  intakeAt: "Mon, Apr 28",     status: "signed",    estValue: 540000, score: 97, intakeMeta: "Call · 8:02", note: "Commercial truck collision, severe injury, three-week hospital stay." },
  { id: "L040", name: "Amelia O.",   channel: "form", source: "Direct",     area: "Auto",   intakeAt: "Mon, Apr 28",     status: "qualified", estValue: 88000,  score: 74, intakeMeta: "Form · 2:17" },
  { id: "L039", name: "Hassan B.",   channel: "call", source: "Google Ads", area: "Moto",   intakeAt: "Mon, Apr 28",     status: "contacted", estValue: 175000, score: 81, intakeMeta: "Call · 5:48", note: "Motorcycle vs. car at intersection, multiple fractures." },
  { id: "L038", name: "Rosa V.",     channel: "call", source: "GBP",        area: "Brain",  intakeAt: "Sun, Apr 27",     status: "signed",    estValue: 410000, score: 93, intakeMeta: "Call · 7:21", note: "Severe TBI from auto collision, family making decisions." },
  { id: "L037", name: "Daniel S.",   channel: "form", source: "Organic",    area: "Auto",   intakeAt: "Sun, Apr 27",     status: "lost",      estValue: null,   score: 24, intakeMeta: "Form · 1:08", note: "Statute of limitations expired." },
  { id: "L036", name: "Priya N.",    channel: "call", source: "Google Ads", area: "Truck",  intakeAt: "Sat, Apr 26",     status: "signed",    estValue: 295000, score: 89, intakeMeta: "Call · 6:42", note: "18-wheeler hit-and-run, witnesses identified plate." },
  { id: "L035", name: "Wesley T.",   channel: "call", source: "Referral",   area: "Auto",   intakeAt: "Fri, Apr 25",     status: "signed",    estValue: 140000, score: 78, intakeMeta: "Call · 4:14" },
  { id: "L034", name: "Maya F.",     channel: "form", source: "Organic",    area: "Brain",  intakeAt: "Fri, Apr 25",     status: "qualified", estValue: 205000, score: 84, intakeMeta: "Form · 4:02", note: "Post-concussive symptoms 6 weeks after rear-end collision." },
  { id: "L033", name: "Chris D.",    channel: "call", source: "Google Ads", area: "Slip",   intakeAt: "Thu, Apr 24",     status: "contacted", estValue: 36000,  score: 58, intakeMeta: "Call · 2:36" },
  { id: "L032", name: "Yvette H.",   channel: "call", source: "Maps",       area: "Auto",   intakeAt: "Thu, Apr 24",     status: "signed",    estValue: 95000,  score: 70, intakeMeta: "Call · 3:54" },
  { id: "L031", name: "Marco L.",    channel: "form", source: "Direct",     area: "Moto",   intakeAt: "Wed, Apr 23",     status: "lost",      estValue: null,   score: 41, intakeMeta: "Form · 1:48", note: "Decided to handle pro se." },
  { id: "L030", name: "Adaeze N.",   channel: "call", source: "Google Ads", area: "Auto",   intakeAt: "Wed, Apr 23",     status: "qualified", estValue: 120000, score: 76, intakeMeta: "Call · 5:02" },
  { id: "L029", name: "Ben P.",      channel: "call", source: "GBP",        area: "Truck",  intakeAt: "Tue, Apr 22",     status: "signed",    estValue: 480000, score: 95, intakeMeta: "Call · 7:48", note: "Trucking company at fault, FMCSA hours-of-service violation." },
  { id: "L028", name: "Linda M.",    channel: "form", source: "Organic",    area: "Slip",   intakeAt: "Tue, Apr 22",     status: "contacted", estValue: 28000,  score: 52, intakeMeta: "Form · 1:24" },
];

export type LeadHeat = "hot" | "warm" | "cool";

export function leadHeat(score: number): LeadHeat {
  if (score >= 80) return "hot";
  if (score >= 60) return "warm";
  return "cool";
}

export type Campaign = {
  id: string;
  name: string;
  status: "active" | "paused" | "learning";
  spendMTD: number;
  budgetDaily: number;
  leads: number;
  cpl: number;
  signed: number;
};

export const campaigns: Campaign[] = [
  { id: "cp1", name: "Truck Accident — Houston Metro",   status: "active",   spendMTD: 2380, budgetDaily: 145, leads: 18, cpl: 132, signed: 4 },
  { id: "cp2", name: "Auto Accident — Houston Core",     status: "active",   spendMTD: 1640, budgetDaily:  92, leads: 14, cpl: 117, signed: 3 },
  { id: "cp3", name: "Brain Injury / TBI",               status: "active",   spendMTD:  920, budgetDaily:  48, leads:  6, cpl: 153, signed: 1 },
  { id: "cp4", name: "Motorcycle Accident",              status: "learning", spendMTD:  340, budgetDaily:  22, leads:  3, cpl: 113, signed: 0 },
  { id: "cp5", name: "Slip & Fall — Downtown",           status: "paused",   spendMTD:  220, budgetDaily:   0, leads:  2, cpl: 110, signed: 0 },
];

/* —————————————————————————————————————————— */
/*  Helpers                                       */
/* —————————————————————————————————————————— */

export function fmtUSD(n: number, opts: { compact?: boolean } = {}) {
  if (opts.compact && Math.abs(n) >= 1000) {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  }
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function fmtNum(n: number) {
  return n.toLocaleString("en-US");
}

export function fmtAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.round(days / 7)}w ago`;
}

export function getAgent(id: AgentId): Agent {
  const a = agents.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown agent: ${id}`);
  return a;
}

/* —————————————————————————————————————————— */
/*  Connectors — per-agent integrations           */
/* —————————————————————————————————————————— */

export type Connector = {
  id: string;
  name: string;
  icon: string;           // emoji shorthand rendered in UI
  connected: boolean;     // true = set up during onboarding
  description: string;    // one-liner shown under name
};

export const agentConnectors: Record<AgentId, Connector[]> = {
  ads: [
    { id: "google-ads", name: "Google Ads", icon: "📣", connected: true, description: "Campaign management and bidding" },
    { id: "google-analytics", name: "Google Analytics", icon: "📊", connected: true, description: "Conversion and traffic data" },
    { id: "callrail", name: "CallRail", icon: "📞", connected: true, description: "Call tracking and attribution" },
    { id: "meta-ads", name: "Meta Ads", icon: "📘", connected: false, description: "Facebook & Instagram campaigns" },
  ],
  seo: [
    { id: "google-search-console", name: "Google Search Console", icon: "🔍", connected: true, description: "Index coverage and queries" },
    { id: "wordpress", name: "WordPress", icon: "📝", connected: true, description: "Content publishing" },
    { id: "google-analytics-seo", name: "Google Analytics", icon: "📊", connected: true, description: "Organic traffic and goals" },
    { id: "ahrefs", name: "Ahrefs", icon: "🔗", connected: false, description: "Backlink monitoring" },
  ],
  geo: [
    { id: "perplexity", name: "Perplexity", icon: "🤖", connected: true, description: "Citation monitoring" },
    { id: "chatgpt-monitor", name: "ChatGPT", icon: "💬", connected: true, description: "AI answer tracking" },
    { id: "claude-monitor", name: "Claude", icon: "🧠", connected: true, description: "AI answer tracking" },
    { id: "schema-markup", name: "Schema Markup", icon: "🏷️", connected: false, description: "Structured data for AI indexing" },
  ],
};

/* —————————————————————————————————————————— */
/*  Quick prompts — preset chips on the agent page  */
/* —————————————————————————————————————————— */

export type QuickPrompt = { id: string; text: string };
export type QuickAnswer = {
  text: string;
  stats?: { label: string; value: string }[];
};

export const quickPrompts: Record<AgentId, QuickPrompt[]> = {
  ads: [
    { id: "spend", text: "How's our spend looking?" },
    { id: "cpl", text: "Cost per signed case?" },
    { id: "leak", text: "Where's the leak?" },
    { id: "change", text: "What should I change?" },
  ],
  seo: [
    { id: "ranking", text: "What's ranking?" },
    { id: "slipping", text: "What's slipping?" },
    { id: "shipped", text: "What did we ship?" },
    { id: "next", text: "What's next?" },
  ],
  geo: [
    { id: "cited", text: "Where are we cited?" },
    { id: "engines", text: "Which engines lead?" },
    { id: "pending", text: "What's in draft?" },
    { id: "topic", text: "What topic next?" },
  ],
};

export const quickAnswers: Record<AgentId, Record<string, QuickAnswer>> = {
  ads: {
    spend: {
      text: "$1,410 spent across 4 campaigns this week. Truck Accident converts at $310 per signed case; Slip & Fall at $890 — I shifted $300/day from Slip & Fall on Monday.",
      stats: [
        { label: "Spend (7d)", value: "$1,410" },
        { label: "Best CPL", value: "$310" },
        { label: "Worst CPL", value: "$890" },
      ],
    },
    cpl: {
      text: "$782 per signed case this month, down 14% from last month. Truck Accident leads at $620, MVA at $810, Slip & Fall is dragging the average up.",
      stats: [
        { label: "Cost / case", value: "$782" },
        { label: "vs last mo", value: "−14%" },
        { label: "Best", value: "Truck $620" },
      ],
    },
    leak: {
      text: "Slip & Fall — 0.4% CTR, $890 CPL, zero signed cases in 14 days. I paused the 3 worst keywords yesterday and moved the budget to Truck Accident.",
      stats: [
        { label: "Worst", value: "Slip & Fall" },
        { label: "CPL", value: "$890" },
        { label: "Paused", value: "3 keywords" },
      ],
    },
    change: {
      text: "Bump Truck Accident daily budget from $200 → $300. Your CPL there is half the campaign average and impression share is capped. I've drafted the change — it's awaiting your approval in the queue.",
    },
  },
  seo: {
    ranking: {
      text: "11 keywords in Google top-10, 3 in top-5. 'TBI lawyer Houston' moved #7 → #3 after last week's verdict-data refresh.",
      stats: [
        { label: "Top-10", value: "11" },
        { label: "Top-5", value: "3" },
        { label: "Best move", value: "TBI #7→#3" },
      ],
    },
    slipping: {
      text: "Two articles slipping: 'Settlement amounts' (#5 → #11) and 'Truck accident liability' (#8 → #14). Likely cause: a new competitor article. I'm queuing refreshes with 2026 data.",
      stats: [
        { label: "Slipping", value: "2 articles" },
        { label: "Worst drop", value: "−6 spots" },
      ],
    },
    shipped: {
      text: "Three published this week — Bicycle accidents, Dog bites, Motorcycle DUI. One refreshed: 'Settlement amounts' with 2026 verdict data.",
      stats: [
        { label: "Shipped", value: "3 new" },
        { label: "Refreshed", value: "1" },
      ],
    },
    next: {
      text: "'Premises liability for self-driving cars' — high search volume, no Houston PI competitor has covered it. 12-week window before others publish. I'll draft if you approve.",
    },
  },
  geo: {
    cited: {
      text: "12 AI citations this month: 5 ChatGPT, 6 Perplexity, 1 Claude. New this week — 'TBI lawyer Houston' on Perplexity, cited in 3 of 5 query variants.",
      stats: [
        { label: "Total", value: "12" },
        { label: "ChatGPT", value: "5" },
        { label: "Perplexity", value: "6" },
        { label: "Claude", value: "1" },
      ],
    },
    engines: {
      text: "Perplexity leads — 6 query variants cite us, up from 4 last week. ChatGPT steady at 5. Claude lagging at 1; indexing on the latest brief is still pending (24–48h typical).",
      stats: [
        { label: "Leader", value: "Perplexity" },
        { label: "ChatGPT", value: "5" },
        { label: "Claude", value: "1 (indexing)" },
      ],
    },
    pending: {
      text: "3 briefs in draft: TBI settlement amounts, Truck accident HOS rules, Premises liability cheat sheet. All structured answer-first with citations to Texas statutes and FMCSA.",
      stats: [
        { label: "Drafts", value: "3" },
        { label: "Awaiting indexing", value: "1" },
      ],
    },
    topic: {
      text: "'Premises liability for self-driving cars' — emerging query, no PI firm has answered yet. I've started a brief; awaiting your approval to publish.",
    },
  },
};

/**
 * Count of items waiting on a user decision, per agent. Drives the
 * red dot in the sidebar and the "needs your input" panel.
 */
export function getPendingCount(agentId: AgentId): number {
  if (agentId === "ads") return pendingCampaignChanges.length;
  if (agentId === "seo") return contentQueue.filter((t) => t.status === "pending").length;
  if (agentId === "geo") return geoQueue.filter((t) => t.status === "pending").length;
  return 0;
}
