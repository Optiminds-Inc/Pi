# Pi — Product Spec

## What Pi is

Pi is the AI marketing team for personal injury law firms. It replaces the traditional agency retainer ($10K+/mo, 12-month lock-in, monthly PDF reports) with an always-on AI system that runs six marketing channels simultaneously, reports in real time, and costs a flat monthly fee with no commitment.

The target customer is a solo, small, or mid-size PI firm — 1 to 15 attorneys — that today relies on referrals and chance for client acquisition. Pi gives these firms the same digital marketing playbook the largest PI firms run on, without hiring a single marketer.

## Core value proposition

**Your future clients become visible, predictable, and in your control.**

Three promises, in priority order:

1. **Visibility** — every dollar spent, every article published, every lead that came in, every action the AI team took — surfaced live, the moment it happens. Not in next month's PDF.
2. **Control** — raise or lower budget, swap practice areas, approve content, ask questions — and the AI team adjusts immediately.
3. **Outcome** — signed cases in core practice areas at or under target CPA, with full-loop attribution from page visit to signed case to revenue.

## The six channels

Pi operates all six channels that generate PI clients. Each channel has a dedicated reason to exist and a specific AI agent responsible for it:

| Channel | What it is | What Pi does |
|---|---|---|
| **Google Search Ads** | Paid keyword search at the moment of highest intent | Bids and budget tuned daily, optimized to cost per signed lead |
| **Google Business Profile** | The firm's verified card on branded search | Weekly posts, review replies, photos refreshed monthly |
| **Google Maps** | The map listing local prospects open before calling | Office verified, categories tuned, reviews synced |
| **SEO** | Articles answering questions prospects search | 8–10 new articles/month, older pages refreshed quarterly |
| **AI Search** | Citations in ChatGPT, Perplexity, Claude | Content structured for LLM retrieval, citations tracked weekly |
| **Social** | Short-form video on platforms where prospects scroll | Case-win shorts and educational posts |

## The AI team — three agents

Each agent owns a subset of channels and operates autonomously within user-defined guardrails:

### Search ad pacer (ads)
- **Owns:** Google Search Ads
- **Does:** keyword bidding, budget allocation, ad copy testing, campaign pacing
- **Optimizes for:** cost per signed case
- **User controls:** monthly ad budget ceiling (slider), pending campaign changes (approve/decline)

### Article writer (seo)
- **Owns:** Google organic
- **Does:** keyword-targeted articles, on-page SEO, internal linking, quarterly refresh
- **Optimizes for:** top-10 rankings for high-intent keywords
- **User controls:** article cadence (slider), topic queue (approve/decline)

### GEO optimizer (geo)
- **Owns:** ChatGPT, Perplexity, Claude citations
- **Does:** answer-first briefs structured for LLM extraction, schema markup, citation tracking
- **Optimizes for:** citations per engine per month
- **User controls:** brief cadence (slider), brief queue (approve/decline)

## How it works — the user journey

### Day 0: Onboarding call (30 minutes)
A specialist team (lawyers, product, engineering) meets the firm on one call. Four things happen:
1. **Website** — connect the firm's site (or Pi builds one)
2. **Strategy** — lock in the Ads, SEO, and AI Search playbook for 30 days
3. **Agents** — configure three agents to execute that strategy
4. **Deploy** — AI marketing team goes live

The user leaves with a written plan and a fixed price.

### Day 1+: Agents run autonomously
The AI team operates every channel — managing bids, publishing content, monitoring rankings, replying to reviews, reallocating budget from real performance, killing what doesn't convert, doubling down on what does. Reports back in real time.

### Anytime: Dashboard
The user opens Pi daily to:
- Check top-line KPIs (ad spend, signed cases, cost per signed, ROI)
- See the full funnel (visitors → calls/forms → qualified → consult → signed)
- Review channel attribution (which channel produced which signed case at what cost)
- Read the activity feed (every action every agent took)
- Label leads (signed / not signed yet / disqualified — teaches agents what works)
- Adjust strategy (budget, practice areas, content topics)

**That's all the user does.**

## Product surface — seven screens

### 1. Landing page (`/`)
Marketing site. Hero, channels grid, how-it-works 3-step, pricing tiers, and a final CTA with an inline booking form. Links to a sample dashboard at `/home`.

### 2. Book (`/book`)
Standalone booking page. Left column: outcome block + onboarding steps. Right column: sticky booking form with firm info fields + time slots.

### 3. Dashboard (`/home`)
Top-line KPIs in a flat row → full funnel visualization → channel-to-revenue attribution table → calls-over-time chart (Mondrian-style) → "Pi's read" insight block. Period selector (this month / 7d / 30d / 90d / YTD) drives all numbers.

### 4. Leads (`/leads`)
Score-ranked lead list with AI-assigned fit scores (0–100) driving Hot/Warm/Cool tiers. Two views: list (card-based, with mark buttons: Signed / Not signed yet / Disqualified) and board (kanban columns by status). Search, heat filter, slide-over detail panel with call recording playback. KPI tiles at top: new this week, awaiting label, signed, hot to call back.

### 5. Activity (`/activity`)
Chronological feed of every action every agent took, filterable by agent and channel. Each item shows: agent avatar, title, detail, outcome, output link, channel badge, age. "Chat" button (disabled — coming soon).

### 6. Agent page (`/agents/[id]`)
Split layout: left is a chat-style feed (Notion-style events: running, thought, task, done, question, answer), right is a resizable settings panel. Cover hero with art-style banner per agent (Mondrian / Morandi / Monet). Composer at bottom with preset prompt chips. Settings panel sections: Performance metrics, To-do (approve/decline queue), Budget or Cadence slider, Instructions editor (overview/goal/strategy/actions), Connectors list.

### 7. Agents marketplace (`/agents`)
Grid of available agents built by other lawyers. Each card shows: name, category, description, creator, pricing, hire count. "Coming soon" card for building and listing your own agents. Status badges: available, training, drafting, tuning.

### 8. Setup (`/setup`)
Foundation page — connections + firm core info, not a feed. Five sections:
- **Firm** — editable profile with Edit/Save/Cancel. Pi-managed fields (legal name, bar info) are locked; user-editable fields (display name, phone, email, etc.) unlock on Edit.
- **Practice areas & service area** — chip toggles for areas, radius slider with ZIP overlay.
- **Connections** — Pi-managed integrations (WordPress, Google Ads, GBP, Maps, GA4, Search Console) with status pills (Connected / Pending / Action needed / Not connected). All accounts stay in the firm's name.
- **Office line** — master intake number where all tracking numbers forward.
- **Tracking numbers** — one per channel (auto-placed or manual), with test-call verification.

## Design system

### Philosophy
Notion-inspired. Clean, warm, text-first. Information density over decoration. Every pixel earns its place.

### Typography
- **Sans:** Inter — body, UI, display headings
- **Logo:** DM Serif Display — the "Pi" wordmark only. A luxury upright printing serif (Didot/Georgia fallback).
- **Display:** bold weight, tight tracking at large sizes (-0.04em), fluid sizing via `clamp()`
- **Body:** 13–16px, line-height 1.55–1.65
- **Eyebrow:** 10–12px, uppercase, tracking 0.04em, semibold, `ink-3`
- **KPI numbers:** tabular numerals, -0.04em tracking, `font-display`

### Color

**Light mode — Apple-classic cool-toned whites:**
- Paper: `#ffffff` → `#f5f5f7` → `#ebebef` (3-tier surface stack)
- Ink: `#1d1d1f` → `#424245` → `#6e6e73` → `#86868b` → `#d2d2d7` (5-tier text scale)
- Lines: `rgba(0,0,0, 0.08)` / `0.14` (standard / strong)
- Accent: `#1d1d1f` (ink-1 as primary action)
- Info: `#0abab5` (Tiffany blue — the brand color, used for links, ghost buttons, focus rings)
- Status: green `#14832b`, orange `#d9730d`, red `#e03e3e`
- Mondrian primaries: red `#d02e36`, yellow `#c89510`, blue `#1c4cb5` — for differentiation only (agent categories, chart bars, step numbers)

**Dark mode — deep cool blacks:**
- Paper: `#0c0c0c` → `#161616` → `#1e1e1e`
- Ink: `#ececea` → `#bbbbb8` → `#7d7d7a` → `#4f4f4c` → `#2a2a28`
- Info: `#41d9d3` (lighter Tiffany for contrast)
- All status colors shift to higher saturation for dark background readability

**Background glow:** subtle radial gradients of Tiffany blue at corners of the body, fixed-attachment. Light mode uses pale cyan centers; dark mode uses teal at ~0.2 opacity.

### Surfaces
- **Nav:** glass blur (`backdrop-filter: saturate(180%) blur(24px)`) — the only glass element. Everything else is solid.
- **Cards:** solid `paper` bg, 1px `line` border, `shadow-sm`. Elevated variant adds `shadow-md`. Hero variant adds `shadow-lg`.
- **Interactive cards:** `translateY(-1px)` + `shadow-md` on hover.
- **Tinted sections:** `#ebedf2` in light (Apple cool gray), `paper-2` in dark.

### Radius
- `5px` (sm) / `8px` (md) / `12px` (lg) / `16px` (xl) / `624.9375rem` (pill)
- Cards and major containers: 12px
- Buttons, inputs, chips: 8px
- Pill shapes (badges, chips, filter tabs): fully rounded

### Shadows
Multi-layer composite shadows throughout. Five tiers (xs → xl), each with 2–4 layers for realistic depth. Focus ring: 3px Tiffany blue glow at 18% opacity.

### Motion
- Standard easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` — no spring physics
- Three speeds: fast (120ms), base (200ms), slow (300ms)
- Three entrance animations: fade-in (translateY 4px), slide-in-right (translateX 16px), scale-in (scale 0.97)
- `prefers-reduced-motion` respected — kills all animation

### Components
- **Buttons:** primary (ink bg, paper text), secondary (paper bg, line border), ghost (info color, no border), compact (32px height)
- **Chips:** 32px height, pill radius, toggle via `aria-pressed`. Active state inverts to ink bg.
- **Status dots:** 6px colored circles. Live variant has a ping animation (1.8s pulse).
- **Badges:** 22px height, pill shape, semantic soft-bg variants (success, warning, danger, quiet)
- **KPI numbers:** large tabular numerals, tight tracking, display font
- **Eyebrow labels:** 10–11px, uppercase, wide tracking, `ink-4`
- **Form inputs:** underline-only style (`input-line`), info-colored focus state
- **Range sliders:** custom thumb with multi-layer shadow, grab cursor

### Layout
- **Sidebar:** fixed left, 232px default width, resizable (200–380px), `paper-2` background. Profile menu at bottom with pop-up. Navigation: Dashboard, Leads, Activity, then "Your AI team" section with agent items, then "Operations" with Setup.
- **Content area:** `marginLeft: var(--sidebar-width)`. Max content width 1200px for marketing, unconstrained for app pages.
- **Page headers:** 36px display font, optional subtitle and action buttons.

### Brand identity
- **Name:** Pi — a double meaning: **P**ersonal **i**njury, and the mathematical constant (implying precision, infinite value).
- **Wordmark:** "Pi" set in DM Serif Display. The custom SVG logo encodes P as a hammer/gavel and i as a pen with a nib.
- **Personality:** professional but not corporate, precise but not cold, technical but accessible. Writes in plain English, second person, no legalese, no superlatives, no fear-mongering.

## Writing principles (惜字如金)

Every word earns its place:
- No filler taglines, no marketing fluff, no sentences that restate the section title
- A subtitle that doesn't tell the user what to do or what just happened doesn't ship
- Only express the core product value — if you can't, say nothing
- UI copy, comments, commit messages, and chat replies all follow this rule

## Pricing

| | Starter | Growth | Scale |
|---|---|---|---|
| **Target** | Solo / 2-attorney | 3–15 attorneys | 15+ or multi-state |
| **Price** | $399/mo | $999/mo | Custom |
| **Credits** | 100/mo | 300/mo | Custom |
| **SEO articles** | 2/mo | 8/mo | Custom |
| **Social** | 2 posts/wk | 5 posts/wk | Custom |
| **Ads management** | Daily | Daily | Daily |
| **Dashboard** | Yes | Yes | Yes |
| **Content approvals** | — | Yes | Yes |
| **Strategy reviews** | — | Monthly | Quarterly exec |
| **Commitment** | Month-to-month | Month-to-month | Let's talk |

Plus: one-time onboarding setup (quoted in strategy call) + ad spend (paid direct to Google).

## Tech stack

- **Framework:** Next.js 16.2 (App Router)
- **React:** 19.2
- **CSS:** Tailwind CSS 4 (CSS-first config via `@theme`)
- **Fonts:** Google Fonts (Inter + DM Serif Display)
- **State:** React `useState` (all client-side mock data, no backend)
- **Routing:** file-based, `(app)` route group for authenticated layout with sidebar
- **Theme:** class-based dark mode with `localStorage` persistence and FOUC-prevention script

## Current status

Prototype/demo — all data is mock (`lib/mock.ts`). No backend, no auth, no real integrations. The demo tells the story of Hayes Mitchell Personal Injury Law, a 6-month-old Pi customer in Houston, TX, to make the strategy call landing feel real.
