# VOICE · Ken Research Canonical Voice + Content Guidelines

**Status:** canonical · core-v2 · 2026-05-13
**Audience:** designers + engineers + content authors building any Ken Research surface
**Scope:** tone · verb hierarchy · CTA library · headline patterns · microcopy · number formatting · eyebrows · chapter intros · footer · anti-patterns
**Sources:**
- OG audit · [`design-system-audit/og-audit/voice/voice-brand.md`](../../../design-system-audit/og-audit/voice/voice-brand.md) (reverse-engineered)
- Polaris industry research · [`design-system-audit/industry-research/polaris.md`](../../../design-system-audit/industry-research/polaris.md) (content guidelines as first-class — §12)
- Atlassian Design System industry research · [`design-system-audit/industry-research/atlassian.md`](../../../design-system-audit/industry-research/atlassian.md) (voice + content as foundation — §12)
- Workspace canon · [`design-system/DESIGN.md`](../../DESIGN.md) (vocabulary)

> **Why this doc exists.** OG had no `voice/`, no `TONE.md`, no `VOICE.md` — voice was practiced in components but never codified (`voice-brand.md:8`, `voice-brand.md:253-262`). Polaris and ADS both treat content guidelines as first-class system primitives, co-equal with tokens and components (`polaris.md:124-133`, `atlassian.md:146-153`). Codifying voice prevents per-page drift and lets consumers ship Ken-coherent copy without re-deriving rules.

---

## 1 · WWWWH of Ken Research voice

**WHAT.** Ken voice is **B2B research credibility · editorial conversion-aware** (`voice-brand.md:14`). Tone is consultative-confident — not playful, not aggressive. Grammatically complete sentences. Action-direct CTAs. Headlines read like long-form research-magazine subtitles (Bloomberg / Stripe Press register), not like value-prop marketing slogans. No emoji. No exclamation points outside the brand name. No "Click here." Numbers are the currency of trust — `AUD 6,547.8 Mn`, `+12.5%`, `1M+ reports` get prominence.

**WHY.** Five principles below — credibility over conversion-pressure, editorial over marketing, action verbs over generic links, tiered commitment vocabulary, numbers prominent (`voice-brand.md:16-23`). Pushy language ("Buy now!", "Don't miss out!") corrodes the trust signal that Ken's analysts trade on.

**WHEN ✅.** Hero subtitle reads like a research-summary clause. CTA verb names the user action (`Book a call`), not the outcome (`Get insights`). Description paragraphs run 2-3 complete sentences. Numbers in body copy not vague hedging. Empty/error states use complete imperatives with recovery (`voice-brand.md:24-30`).

**WHEN NOT ❌.** Marketing exclamation points, casual fragments, "Click here," emoji, all-caps body sentences, "Free / Limited time / Hurry" (`voice-brand.md:32-39`).

**HOW.** Apply the verb-tier hierarchy (§3) at every CTA decision. Use the canonical CTA library (§4) before inventing new labels. Follow headline patterns (§5) by surface. Microcopy (§6) and number formatting (§7) are non-negotiable across surfaces.

---

## 2 · Five brand principles

Ported from `voice-brand.md:16-23`. Memorize these — every voice judgment defers to them.

1. **Authority without arrogance.** State evidence, not opinion. "Ken Research evaluated 1M+ reports" not "We believe the market is large." Credibility lives in the data; arrogance lives in the prose. Polaris frames this as "plain language, avoid jargon" (`polaris.md:128`).
2. **Concrete > abstract.** "₹110 Cr TAM" beats "a significant market." "32.0% YoY growth" beats "strong growth." Specificity is trust. When the number is unknown, label it `estimate` or `projection` — never claim fake numbers as Ken's real data (workspace scope rule).
3. **Buyer-relevance > vendor-vanity.** Frame copy around the buyer's job — "Book Discovery Call" (the user's experience) — not the vendor's process — "Initiate Discovery Protocol" (`voice-brand.md:78`). Atlassian: "clear, direct, action-oriented" (`atlassian.md:149`).
4. **Active voice.** "Schedule a Demo" not "Be Notified." Verb leads. Subject acts. Passive voice signals bureaucratic vendor speak (`voice-brand.md:89`).
5. **Numbers when known · estimates labeled.** If Ken has the number, surface it with precision (`AUD 6,547.8 Mn`, `CAGR 12.3%`). If projecting, prefix `est.` or `proj.` or use range notation `2022-2027`. Never round to hide imprecision. Never invent.

---

## 3 · Three-tier verb hierarchy

The single most-load-bearing rule. Every CTA + link in Ken Research belongs to exactly one tier. Picking the wrong tier corrodes either trust (over-aggressive) or conversion (under-confident). Ported from `voice-brand.md:45-51`.

| Tier | Intent | Component / variant | Verbs | Visual weight |
|---|---|---|---|---|
| **Tier 1 · Conversion** | High commitment · user has decided | `Button variant="brand"` (Ken red `#b01f24`) | **Book · Talk · Get · Download · Request · Schedule** | strongest · max 1 per screen |
| **Tier 2 · Navigation** | Mid commitment · user is browsing | `Button variant="primary"` or neutral nav links | **View · Read · Explore · Browse · See** | neutral · multiple per screen OK |
| **Tier 3 · Internal** | Low commitment · UI affordance | text-link or icon-button | **Continue · Open · Show · Hide · Expand · Collapse** | subtle · purely functional |

**Pairing rule.** A screen typically has **1 Tier-1 + 1 Tier-2 paired CTA** (e.g., `Book Discovery Call` + `Browse All Reports`) plus N Tier-3 internal affordances. Two Tier-1 CTAs on the same screen split user attention and dilute conversion (`voice-brand.md:21` — inversion-tier intent grows left → right).

**`showArrow` discipline.** Arrow indicators (`AnimatedArrow`) belong only to Tier-1 forward-momentum CTAs. Per OG `ai-context/COMPONENTS.md:114-119` cited in `voice-brand.md:81`: NEVER attach `showArrow` to `Learn More`, `View Details`, `Cancel`, `Back`.

---

## 4 · Canonical CTA library

These are the **only** approved label strings for the named contexts. Reach for these first; invent new labels only with explicit decision logged in `docs/DECISIONS.md`. Extends `voice-brand.md:53-73` canonical library.

| CTA text | Tier | Variant | Context | Source |
|---|---|---|---|---|
| `Book a discovery call` | 1 | brand-red · 1 per screen max | Hero · final CTA · navbar | `voice-brand.md:59` (`StickyCTA.tsx:23`) |
| `Download Sample Report` | 1 | brand-red OR primary | Report detail · listing card | `voice-brand.md:64` (`GuidelinesContent.tsx:1084`) |
| `Talk to Analyst` | 1 | secondary outline | Pair w/ primary brand CTA | `voice-brand.md:66` (`StickyCTA.tsx:18,38`) |
| `Request Customization` | 1 | ghost outline (works on dark bg) | Report detail · custom-scope path | extension of `voice-brand.md:62` `Request a Demo` |
| `Get Report Access` | 1 | brand-red · sticky mobile bottom bar | Mobile-only sticky conversion | extension of `voice-brand.md:63` `Get Started Today` |
| `View All Reports` | 2 | neutral nav-link | Section endSlot · mega-menu · listing | `voice-brand.md:71` (`ResourcesSection.tsx:48`) |
| `Read Methodology` | 2 | neutral learn-more | Chapter intro · methodology section | extension of `voice-brand.md:68` `Learn More` |
| `Explore Industries` | 2 | neutral mega-menu CTA | Top-nav · industry mega-menu | extension of `voice-brand.md:72` `Explore the Case Study` |
| `View all reports` | 2 | neutral nav-link · sentence-case variant | section header endSlot | grep hit (`FeaturedCarousel ctaText`) |
| `Schedule a Demo` | 1 | brand-red | Top-nav top-right · sticky | `voice-brand.md:58` (`Navbar.tsx:357`) |
| `Continue` / `Open` / `Show` / `Hide` / `Expand` | 3 | text-link · icon-button | Disclosure widgets · accordion · modal | inferred (Tier-3 internal) |

**Six rules derived from canonical library** (`voice-brand.md:75-82`):

1. **Verb-led.** Every CTA starts with a verb. No noun-CTAs (`Demo Request` → `Request a Demo`).
2. **Article preserved.** `Schedule a Demo` not `Schedule Demo`. Exception: gerund-style single-token (`Get Started`).
3. **Outcome-noun, not feature.** `Book Discovery Call` not `Initiate Discovery Process`.
4. **Title-case for Tier 1 conversion CTAs** (`Book a Discovery Call`); **sentence-case for Tier 2 nav links** (`View all reports`) per Polaris convention `Save changes` (`polaris.md:127`). Excepted small words: `a / the / for / and / to / of`.
5. **No trailing punctuation.** CTAs end without period or exclamation mark.
6. **`showArrow` only on Tier-1.** Arrow = forward-momentum conversion only.

---

## 5 · Headline patterns

### Hero h1 · report-listing or report-detail page
**Pattern:** `{Region} {Market Name} Outlook {Base Year}-{Forecast End}`
**Example:** `Australia Cold Chain Market Outlook 2022-2027`
**Why:** matches Ken's research-product naming convention. Region front-loads geo-relevance. `Outlook` signals forecast-horizon report (vs `Analysis` for historical). Year range is precise — never `2022 onwards` or `Long-term`.
**Typography:** `var(--font-serif)` Noto Serif weight 300 · `clamp(1.75rem, 5vw, var(--text-3xl))` · `leading-[1.15]` · `tracking-tight` (`voice-brand.md:109`).

### Hero h1 · case-study page (alt pattern from OG)
**Pattern:** `[Verb-ing] [Subject] for [Outcome] — [Quantified Hook] and [Qualifier]`
**Example:** `Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights` (`voice-brand.md:99`).
**Em-dash separator** — not colon, not hyphen.

### Final CTA h2
**Pattern:** `Ready to [Verb] [Outcome] for [Audience]?`
**Example:** `Ready to Unlock Strategic Insights for Your Business?` (`voice-brand.md:115`).
**Why question mark.** Reads as invitation, not push. User holds the decision seat (`voice-brand.md:117`).

### Section h2
**Pattern:** noun-phrase · **4-7 words · NO period**.
**Examples:** `Market Overview` · `Competitive Landscape` · `Engagement Objectives` · `Methodology and Approach` · `Impact on Business`.
**Why short.** Sections alternate BLACK→WARM rhythm. Long h2s break visual cadence (`voice-brand.md:130`).

### Card titles
**Pattern:** noun-phrase · **2-5 words** · title-case or sentence-case per surface convention.
**Examples:** `Cold Chain Logistics` · `Top 10 Market Players` · `Latest Research`.

---

## 6 · Microcopy conventions

Industry-canon source: Polaris §12 (`polaris.md:124-133`) + ADS §12 (`atlassian.md:146-153`) — both treat microcopy as system primitive, not afterthought.

### Empty states
- **Message:** present-tense neutral — `No reports match these filters`.
- **Action:** offer recovery — `Try clearing filters` CTA inline.
- **Voice:** describe state. Don't apologize. Don't blame the user (`voice-brand.md:202-207`).

### Error states
- **Message:** verb-led, specific — `Couldn't load reports` not `Something went wrong`.
- **Action:** retry CTA inline — `Try again`.
- **Voice:** **NEVER** `Oops!` · `Whoops!` · `Sorry about that!` — these belong to consumer apps, not research credibility brand (`voice-brand.md:204`).
- **Color:** `--rose-600` semantic error · distinct from brand red (`voice-brand.md:227`).
- **A11y:** `role="alert"` + `aria-describedby` linking input to error (`voice-brand.md:222`).

### Loading
- **Inline text:** `Loading reports…` (ellipsis character `…`, not three dots `...`).
- **Skeleton-first preferred** — show shape, not text.
- **NEVER:** `Please wait` (passive · slow-implying) · `Hang tight` (casual).

### Form validation
- **Pattern:** short imperative — `Email required` · `Invalid email format` · `Enter a valid work email address`.
- **Position:** inline below input · `text-rose-600`.
- **No exclamation marks. No generic `Error` / `Invalid input`** — always specific (`voice-brand.md:223`).
- **Tell user what's wrong AND how to fix** (`voice-brand.md:226`).

### Confirmation
- **Pattern:** past-tense single verb — `Subscribed` · `Saved` · `Sent` · `Booked`.
- **NEVER:** `Yay!` · `Awesome!` · `You did it!` · `🎉` · marketing fluff (`voice-brand.md:241`).

### Modal labels
- **Title:** full statement, sentence-case — `Get in Touch`, `Schedule a Demo` (`voice-brand.md:181`).
- **Close:** `aria-label="Close modal"` (`voice-brand.md:180`).

### Navigation TOC
- **Single-word labels** where space-constrained — `Context`, `Challenges`, `Methodology`, `Impact` (`voice-brand.md:185`).

---

## 7 · Number formatting

Numbers are research currency. Format with discipline. Inconsistency = perceived sloppiness.

### Currency
- **Pattern:** `{ISO} {N,NNN.N} {Mn|Bn}` — e.g. `AUD 6,547.8 Mn` · `USD 45.0 Bn` · `INR 110 Cr` · `$ 12.5 Mn`.
- **Currency prefix** (ISO 3-letter OR symbol). Comma thousand separators. **`Mn` / `Bn` suffix in body — NOT `million` / `billion`** (verbose, breaks scan).
- **Tabular numerals** preferred for column alignment (CSS `font-variant-numeric: tabular-nums`).

### Percent
- **Pattern:** `{N.N}%` — always include one decimal even if zero: `32.0%` not `32%`.
- **Rationale.** Decimal precision matches WCAG-style "show precision claimed" — `32%` reads as rounded, `32.0%` reads as measured.
- **Growth direction:** prefix sign — `+12.5%` (positive) · `−4.2%` (negative · use Unicode minus `−` U+2212, not hyphen).

### Date / time range
- **Pattern:** `Q1 2026` · `2022-2027` · `H2 2025`.
- **NEVER:** `Jan-Mar 2026` (verbose) · `2022 to 2027` (use en-dash `–` for ranges or hyphen `-` per surface convention).
- **Year in copyright:** `new Date().getFullYear()` — never hard-code (`§10` below).

### Large counts
- **Pattern:** `1M+ reports` · `8,000+ clients` · `450K downloads` — `K` / `M` / `B` SI-suffix in display; full number in tooltips/alt text for screen readers.

---

## 8 · Section eyebrows

Three orthogonal demotion signals — uppercase + tracking + opacity 40% (`voice-brand.md:142`). Reader's eye lands on the h2 first; the eyebrow registers as category metadata, not content.

- **Length:** 1-3 words.
- **Case:** UPPERCASE.
- **Letter-spacing:** `0.15em` (~`tracking-[2.5px]` Tailwind equivalent — OG used `tracking-[3px]`, core-v2 normalizes to `0.15em` per [`DESIGN.md`](../../DESIGN.md)).
- **Font:** `var(--font-sans)` DM Sans · weight 500 medium · `var(--text-nav)` 14px.
- **Color:** `text-white/40` (cinematic dark) or `text-black/40` (editorial light).

**Canonical examples:**
- `MARKET OVERVIEW`
- `SCOPE OF REPORT`
- `COMPETITIVE LANDSCAPE`
- `KEY INSIGHTS`
- `METHODOLOGY`
- `CASE STUDY`
- `CHAPTER 1`

---

## 9 · Three-element chapter intro

Canonical pattern for **V0.2 report-viewer surface** and **case-study section openings**. Every chapter / major section opens with the same three-element stack:

1. **Overhead.** 1-3 word UPPERCASE eyebrow per §8 — e.g. `CHAPTER 1` · `MARKET OVERVIEW`.
2. **SectionHeading.** Noun phrase 4-7 words per §5 — e.g. `Australia Cold Chain Market Size`. No period.
3. **Body.** 1-2 complete sentences setting context — verb-led, outcome-framed, 2-3 sentences max (§2 principle 3 · `voice-brand.md:144-150`).

**Why the stack.** Eyebrow categorizes (where am I), heading names (what is this), body orients (why care). Reader gets a 3-second answer before committing to the section body. Polaris and ADS both ship analogous patterns (`polaris.md:154` patterns above components).

---

## 10 · Footer copy conventions

Ported from V0.2 `footer-anatomy` reference and OG navbar/footer audit.

- **Column headers:** 1-2 words · UPPERCASE eyebrow per §8 — `RESEARCH` · `COMPANY` · `RESOURCES` · `LEGAL`.
- **Link labels:** 1-3 words · sentence-case · noun phrase — `About us` · `Contact` · `Privacy policy` · `Terms of service`.
- **Copyright:** `© {currentYear} Ken Research Pvt. Ltd. · All rights reserved.`
  - **NEVER hard-code year** (`© 2026 …`). Drifts the moment the year rolls over.
  - **ALWAYS** compute at render: `new Date().getFullYear()` in React / `{{ now().year }}` in templates.
  - Use middle-dot separator `·` not pipe `|` per workspace typography canon.

---

## 11 · Anti-patterns ❌

Ported and extended from `voice-brand.md:236-249`. These break Ken voice in identifiable ways. Each row maps a forbidden pattern to its replacement and the reason.

| ❌ Forbidden | ✅ Replacement | Why it breaks Ken voice |
|---|---|---|
| `Click here` | descriptive label — `Download annual report PDF` | non-descriptive · a11y issue · lazy (`voice-brand.md:240`) |
| `Learn more` with no context | `Read Methodology` · `Explore Industries` | ambiguous link · screen-reader anti-pattern (`voice-brand.md:248`) |
| `Discover the power of…` · `Unlock the secrets of…` | state value concretely — `Australia Cold Chain Market Outlook 2022-2027` | marketing fluff · vendor-vanity (P3) |
| `BUY NOW` (all-caps body) | `Buy Now` (title-case) | caps reserved for eyebrow labels ONLY (`voice-brand.md:247`) |
| Em-dash em-dash em-dash in same para | max **1 em-dash per paragraph** | over-use signals breathless marketing register |
| `Oops!` · `Whoops!` · `Yay!` · `🎉` | adult tone always — `Couldn't load reports` · `Subscribed` | emoji + exclamation = wrong audience (`voice-brand.md:242`) |
| `We believe…` · `We think…` (first-person opinion) | state evidence — `Ken Research evaluated 1M+ reports` | authority without arrogance (P1) |
| `Submit` (form button) | `Send Message` · `Save Settings` · `Confirm Booking` | vendor-tech jargon · user-outcome verb (`voice-brand.md:243`) |
| `Don't miss out!` · `Limited time!` · `Hurry!` | `Schedule a Demo` | urgency = corrosive to trust (`voice-brand.md:241`) |
| `Demo Request` (noun CTA) | `Request a Demo` (verb-led) | CTAs are actions (Rule 1 §4) |
| `Be Notified` (passive) | `Get Notified` (active) | active voice always (P4) |
| Hard-coded `© 2026 Ken Research` | `© {new Date().getFullYear()} Ken Research Pvt. Ltd.` | drifts at year-end (§10) |
| `million` / `billion` in body | `Mn` / `Bn` suffix | verbose · breaks scan (§7) |
| `Please wait` · `Hang tight` (loading) | `Loading reports…` · skeleton | passive · casual (§6) |

---

## REUSABILITY SCORE · 5/5

Voice rules apply to **every Ken surface, every screen, every component**. There is no Ken Research page where these rules don't bind. Polaris and ADS both score content guidelines at the highest reuse tier in their own DS audits (`polaris.md:133`, `atlassian.md:153`). Ken's voice rules sit at the same tier: load-bearing for every consumer.

- CTA verb-tier hierarchy (§3) — ⭐⭐⭐⭐⭐ every conversion surface
- Canonical CTA library (§4) — ⭐⭐⭐⭐⭐ every page
- Headline patterns (§5) — ⭐⭐⭐⭐⭐ every report + case-study
- Microcopy conventions (§6) — ⭐⭐⭐⭐⭐ every form, list, modal
- Number formatting (§7) — ⭐⭐⭐⭐⭐ every data-bearing surface
- Eyebrows + chapter intro (§8 + §9) — ⭐⭐⭐⭐⭐ every section
- Footer conventions (§10) — ⭐⭐⭐⭐⭐ every page
- Anti-patterns table (§11) — ⭐⭐⭐⭐⭐ universal gate

---

## LINKED concepts

- **Tokens · [`design-system/tokens/build/tokens.css`](../../tokens/build/tokens.css)** — brand red `#b01f24` for Tier-1 CTAs · `--rose-600` for error state (§6) · type scale Major Third 1.25× for headline patterns (§5).
- **DESIGN.md · [`design-system/DESIGN.md`](../../DESIGN.md)** — vocabulary canon · eyebrow letter-spacing normalization · two-variant surface model (cinematic dark · editorial light).
- **ANTI_PATTERNS.md · [`design-system/core-v2/docs/ANTI_PATTERNS.md`](./ANTI_PATTERNS.md)** — visual + structural anti-patterns. §11 above is the **voice** anti-pattern peer.
- **COMPONENT_REFERENCE.md · [`design-system/core-v2/docs/COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md)** — Button variants (`brand` · `primary` · `secondary` · `ghost`) bind to Tier-1/2 verbs (§3). SectionHeading + Eyebrow atoms implement §8 + §9.
- **RECIPES.md · [`design-system/core-v2/docs/RECIPES.md`](./RECIPES.md)** — page-level assemblies that consume this voice doc per section.
- **OG audit · [`design-system-audit/og-audit/voice/voice-brand.md`](../../../design-system-audit/og-audit/voice/voice-brand.md)** — primary source · 30+ component strings reverse-engineered.
- **Polaris content guidelines · [`design-system-audit/industry-research/polaris.md`](../../../design-system-audit/industry-research/polaris.md) §12** — content as first-class system primitive (industry validation).
- **ADS voice + content · [`design-system-audit/industry-research/atlassian.md`](../../../design-system-audit/industry-research/atlassian.md) §12** — sentence case + active voice + per-product variants (industry validation).
- **Workspace identity · [`CLAUDE.md`](../../../CLAUDE.md)** — Aura · `design@kenresearch.com` · 9.5/10 Premium Cinematic Finish quality bar.
- **Aura craft skill · [`skills/aura-craft/SKILL.md`](../../../skills/aura-craft/SKILL.md)** — invoked at step 4.5 of page-build · verifies voice + content decisions per section (craft-pass gate).

---

**Doc canonical · 2026-05-13 · revisit after any voice DECISION logged in `docs/DECISIONS.md`.**
