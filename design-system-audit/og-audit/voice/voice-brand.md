# OG Voice + Brand · Audit (WWWWH)

**Scope:** OG's copy tone, CTA wording rules, headline patterns, microcopy, empty state, and error messaging — inferred from actual atom / molecule / organism strings.

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).

**Status of explicit voice documentation in OG:** **None.** OG has no `voice.md`, no `voice/` folder, no `TONE.md`. Voice is *practiced* in the components but never *codified*. This doc reverse-engineers the practice from canonical CTA strings, hero copy, modal labels, and the AnimatedArrow / Button documentation files.

---

## WHAT (1-paragraph essence)

OG voice is **B2B research credibility · editorial conversion-aware**. Tone is consultative-confident (not playful, not aggressive), grammatically complete (not telegraphic), action-direct on CTAs ("Schedule a Demo," "Book Discovery Call," "Get Customized Report"). Headlines are editorial sentences with full punctuation — case-study titles are full statements ("Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights"). Labels are short, uppercase, tracking-spread — visually compressed for "research / chapter / category" wayfinding. No emoji. No exclamation points (except as part of company name brand voice). No "Click here." Numbers and metrics get prominence (₹110 Cr, +12.5%, 1M+ reports).

## WHY (5 inferred principles)

- **Credibility over conversion-pressure:** Ken Research sells consulting + reports; readers are sales-side analysts evaluating *trust*. Pushy CTA language ("Buy now!", "Don't miss out!") would corrode it.
- **Editorial > marketing:** Hero copy reads like a long-form magazine subtitle, not a value-prop. *"Evaluating India's ... — ₹110 Cr TAM and Competitive Positioning Insights"* is a headline a Bloomberg / Stripe Press would publish.
- **Action verbs, not generic links:** Every CTA names what happens — "Schedule" / "Book" / "Download" / "Talk to" / "Get" / "Request." "Learn More" exists only as exploratory CTALink, never as primary Button.
- **Inversion-tier vocab:** Three CTA tiers map to three intent levels: *low* (Learn More → CTALink), *mid* (Schedule a Demo → Button secondary), *high* (Request a Demo / Book Discovery Call → Button brand). User-stated commitment grows left → right.
- **Numbers get prominence:** TAM in ₹ / $, growth % with direction, n-of-reports counts — these are research currency. Display in serif when large, sans when inline.

## WHEN ✅ (voice is on-brand)

- Hero subtitle reads like a published research-summary clause (subject + clause + qualifier).
- CTA verb is the *user action*, not the *outcome* ("Book a call" not "Get insights").
- Description paragraphs run 2-3 sentences, complete grammar.
- Numbers in body copy ("₹110 Cr TAM"; "1M+ reports") not vague hedging ("a large market").
- Empty states / error states use complete imperative + recovery suggestion.

## WHEN NOT ❌ (voice drifts)

- Marketing exclamation points ("Get yours today!") — wrong audience.
- Casual fragments on CTAs ("Yo, click this") — destroys trust.
- "Click here" / "Learn more →" without context (ambiguous · accessibility issue).
- Emoji 🎉 — outside Ken voice.
- All-caps body sentences (only labels/eyebrows use uppercase).
- "Free / Limited time / Hurry" — anti-credibility.

---

## CTA wording rules

### Three-tier CTA verb hierarchy

| Tier | Component | Verb pattern | Example |
|---|---|---|---|
| **High commitment** | `Button variant="brand"` (red) | "Request" / "Book" / "Schedule" / "Get" + noun-of-outcome | `Request a Demo`, `Book Discovery Call`, `Schedule a Demo`, `Get Customized Report` |
| **Mid commitment** | `Button variant="primary"` (black) | Action verb on direct object | `Download Report`, `Talk to an Expert`, `Get Started` |
| **Low / exploratory** | `CTALink` (text + arrow) | "Learn More" / "See How" / "View All" / "Explore" | `Learn More`, `See How →`, `View All Resources`, `Explore the Case Study` |

### Canonical CTA library (from OG · file:line)

| CTA text | Component / variant | Source | Context |
|---|---|---|---|
| `Schedule a Demo` | Button brand | `Navbar.tsx:357`, `Navbar.tsx:464` (mobile), `StickyCTA.tsx:28,43` | Top-right conversion / mobile menu / sticky |
| `Book a Consultation` | Button brand / SectionLabel | `StickyCTA.tsx:23` | Sticky CTA in engagement section |
| `Book Discovery Call` | Button secondary lg | `FinalCTASection.tsx:48` | Final CTA secondary (modal trigger) |
| `Get Customized Report` | Button primary lg + arrow | `FinalCTASection.tsx:38` | Final CTA primary |
| `Request a Demo` | Button brand | `data.ts:283`, `LinkSystemDemo.tsx:107` | CTABanner primary text default |
| `Get Started` | Button brand | `LinkSystemDemo.tsx:32`, `ShimmerDemo.tsx:206`, `data.ts:280` | CTABanner label / generic conversion |
| `Get Started Today` / `Get Started Now` / `Get Started Free` | Button brand | `LinkSystemDemo.tsx:101`, `CTALink.tsx:29`, `ShimmerDemo.tsx:149` | Conversion w/ urgency modifier |
| `Download Report` | Button primary | `GuidelinesContent.tsx:1084`, `ShimmerDemo.tsx:102,114` | Resource download |
| `Discuss Your Challenges` | Sticky CTA | `StickyCTA.tsx:13` | Contextual to challenges section |
| `Talk to an Expert` | Sticky CTA | `StickyCTA.tsx:18,38` | Contextual challenges + testimonial |
| `See Results for Your Business` | Sticky CTA | `StickyCTA.tsx:33` | Contextual to impact section |
| `Learn More` | CTALink | `CTALink.tsx:34`, `AnimatedArrowQuickRef.tsx:38`, `LinksDocumentation.tsx:310` | Exploratory |
| `Learn More About Our Process` | CTALink | `LinkSystemDemo.tsx:117` | Exploratory w/ subject |
| `View All Resources` | CTALink | `ResourcesSection.tsx:386` | Section action |
| `View All Posts` / `View All Reports` | CTALink | `ResourcesSection.tsx:48`, derived | Section action |
| `Explore the Case Study` | scroll-cue link | `HeroSection.tsx:65` | Hero scroll affordance |
| `Skip to main content` | sr-only link | `Navbar.tsx:47` | Accessibility |

### Rules derived from canonical library
1. **Verb-led.** Every CTA starts with a verb (Schedule, Book, Get, Download, Talk, Learn, View, Explore). No noun-CTAs ("Demo Request").
2. **Article preserved.** "Schedule **a** Demo" not "Schedule Demo." Grammatical completeness signals professionalism. Exception: gerund-style "Get Started" (single token).
3. **Outcome-noun, not feature.** "Book Discovery Call" (the user's experience) not "Initiate Discovery Process" (vendor jargon).
4. **Capitalize each word** in CTA strings except `a / the / for / and / to / of` — title-case discipline.
5. **No trailing punctuation.** CTAs end without period or exclamation mark.
6. **showArrow only on conversion-tier.** Per `ai-context/COMPONENTS.md:118`: *"NEVER: 'Learn More', 'View Details', 'Cancel', 'Back'"* receive `showArrow`. Arrow is for forward-momentum conversion CTAs only.

### Anti-patterns ❌ (CTA wording)
- ❌ "Click here" — non-descriptive, accessibility issue, lazy.
- ❌ "Submit" — implies form-tech, not user-outcome. Replace with "Send Message" / "Save Settings" / "Confirm Booking."
- ❌ "OK" alone on confirmation — replace with "Confirm" / "Continue."
- ❌ All-caps CTA text — buttons are sentence-case (uppercase is for Badges/Labels).
- ❌ "Demo" alone — too feature-ish. "Schedule a Demo" / "Request a Demo" / "Get a Demo."
- ❌ Putting CTA verb in passive ("Be Notified") — always active voice.

---

## Headline patterns

### Hero h1 (case study) · pattern
**Form:** `[Verb-ing] [Subject] for [Outcome] — [Quantified Hook] and [Qualifier]`

**OG example (HeroSection.tsx:24):**
> *"Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights"*

**Decomposed:**
- `Evaluating` — present participle. Establishes ongoing research stance (vs. "We Evaluated" = retrospective).
- `India's Transformer Bushing Market` — specific subject. Geography + industry vertical.
- `for IPO Readiness` — outcome lens.
- `—` em-dash separator (not colon, not hyphen).
- `₹110 Cr TAM` — quantified hook. Number + unit + currency mark.
- `and Competitive Positioning Insights` — qualifier on what else is included.

**Font:** `var(--font-serif)` Noto Serif, weight 300 (light), `clamp(1.75rem, 5vw, var(--text-3xl))` size, `leading-[1.15]`, `tracking-tight` (HeroSection.tsx:23).

### Final CTA h2 · pattern
**Form:** `Ready to [Verb] [Outcome] for [Audience]?`

**OG example (FinalCTASection.tsx:16):**
> *"Ready to Unlock Strategic Insights for Your Business?"*

**Why "Ready to" + question mark?** Question reads as invitation, not push. "Ready" implies the user (not the vendor) is in the decision seat. Question mark ends with rising intonation in mental read-aloud.

### Section h2 · pattern (warm/white sections)
**Form:** `[Single-Noun] / [Two-Word Phrase]` — short editorial section title.

Examples (inferred):
- `Challenges` (ChallengesSection)
- `Engagement Objectives`
- `Methodology`
- `Impact`
- `Value Pillars`
- `Resources`

**Why short?** Sections live in alternating BLACK→WARM rhythm. Long h2s break the visual cadence; short h2s let the eyebrow label do the categorization work.

### Eyebrow label · pattern
**Form:** `[ALL CAPS]` · single word or short phrase · `tracking-[3px]` · `var(--text-nav)` 14px sans medium · `text-white/40` or `text-black/40`.

Examples (HeroSection.tsx:19, FinalCTASection.tsx:13):
- `CASE STUDY`
- `FINAL CONVERSION SECTION`
- `CHALLENGES` / `IMPACT` / `METHODOLOGY` (section eyebrows)
- `KEY INSIGHTS` (SectionLabel theme="brand")
- `CHAPTER 1` (Badge minimal w/ fontWeight=600)

**Why uppercase + tracking + opacity 40%?** Three orthogonal demotion signals. Reader's eye lands on the h2 first; the eyebrow registers as category metadata, not content.

### Description paragraph · pattern
**Form:** 2-3 complete sentences. Verb-led. Outcome-framed. Often ends with "Let's discuss" / "Partner with..." soft-invite.

**OG example (FinalCTASection.tsx:20):**
> *"Partner with our team of industry experts to transform market complexity into actionable strategy. Let's discuss how we can help you achieve your business goals."*

**Pattern:** Sentence 1 = value claim with verb-of-action ("transform"). Sentence 2 = soft invitation ("Let's discuss"). No exclamation.

---

## Microcopy conventions

### Sticky CTA descriptions (StickyCTA.tsx:11-47)
Each section gets a context-aware *description* (the tooltip / sub-CTA hint):

| Section | CTA text | Description tooltip |
|---|---|---|
| client-context | Discuss Your Challenges | Get expert insights |
| challenges | Talk to an Expert | We can help solve this |
| engagement | Book a Consultation | Free 30-min strategy call |
| methodology | Schedule a Demo | See our process in action |
| impact | See Results for Your Business | Custom impact analysis |
| testimonial | Talk to an Expert | Start your success story |
| resources | Schedule a Demo | See how we can help |

**Pattern rules:**
- Description is 3-5 words.
- Action-oriented (verb-led) OR benefit-oriented ("Free 30-min strategy call").
- Resonates with the section topic — "Talk to an Expert" + "We can help solve this" (challenges section) is contextually paired.

### Form labels & inputs
- Label format: title-case noun phrase ("Email Address", "Company Name").
- Required indicator: red asterisk via `aria-label="required"` (`Label.tsx:96-97`).
- Helper text: full sentence, sentence-case, no period if standalone.
- Placeholder text: action hint ("e.g. Acme Corporation" / "you@company.com") not label-restatement.

### Modal labels
- Close button `aria-label="Close modal"` (ContactModal.tsx:81).
- Modal title: full statement, sentence-case ("Get in Touch", "Schedule a Demo").

### Navigation TOC
- Single-word labels: `Context`, `Challenges`, `Objectives`, `Approach`, `Impact`, `Testimonial`, `Resources` (Navbar.tsx:19-27).
- Why? TOC bar is space-constrained. Single-word labels keep horizontal layout consistent.

### Section eyebrow categories
- All-caps, `tracking-[2px]` or `tracking-[3px]`, low-opacity.
- Examples: `CASE STUDY`, `LEADERSHIP`, `INSIGHTS`, `CHAPTER 1`.

---

## Empty state messaging

**OG component:** `molecules/EmptyState.tsx` (COMPONENTS.md:467).

**Pattern (inferred from references in molecules/EmptyState and FiltersDocumentation):**
- Icon (lucide-react `Inbox`, `Search`, `Filter` depending on context).
- Message: present-tense, neutral. "No reports match your filters" / "No results yet."
- Optional action: CTA to clear filters / retry.

**Voice rules for empty states:**
- Don't apologize. ("Oops! Sorry!" — wrong).
- Don't blame. ("You haven't selected enough filters" — wrong).
- Describe state in neutral. ("No matches" — right).
- Offer recovery. ("Clear filters" CTA inline · right).

**OG example (from FiltersDocumentation/CardListing inferred pattern):**
> "No reports match your filters."
> [Clear all filters]

---

## Error messaging

**OG components:** ContactModal.tsx, ResourcesContent.tsx (form validation).

**Inferred pattern:**
- Inline below input, `text-rose-600` (`--rose-600 #e11d48` per theme.css:399).
- Verb-led: "Enter a valid email address" / "Choose at least one option."
- Role: `role="alert"` + `aria-describedby` linking input to error (ResourcesContent.tsx:736,744).
- No exclamation.
- No generic "Error" / "Invalid input" — always specific.

**Voice rules for errors:**
- Tell user what's wrong AND how to fix.
- Use rose-600 (semantic error · distinct from brand red) per COLORS.md:206 ("Don't use `--rose-*` as substitute for `--brand-red`").
- Field-level errors live next to the field; form-level errors live above the submit.

**OG example (ContactModal form, inferred):**
> "Enter a valid work email address."

---

## Brand voice anti-patterns ❌

| ❌ Don't | ✅ Do | Why |
|---|---|---|
| "Click here for our report" | "Download the report" | Action verb + object · accessibility |
| "Don't miss out!" | "Schedule a Demo" | Urgency = corrosive to trust brand |
| "🎉 Welcome aboard!" | "Welcome to Ken Research." | No emoji in Ken voice |
| "Submit" | "Send Message" / "Confirm Booking" | Vendor-tech jargon · user-outcome verb |
| "Get yours today!!!" | "Get Started" | Punctuation discipline |
| "Hey there 👋" | (none — no casual greeting in Ken) | Wrong audience |
| "Demo Request" (noun CTA) | "Request a Demo" (verb-led) | CTAs are actions |
| `BUY NOW` (all-caps body) | `Buy Now` (title-case) | Caps reserved for eyebrow labels |
| "Learn more →" (no context) | "Learn More About Our Process" | Context for screen readers + scanability |
| "Click to subscribe" | "Subscribe to Updates" | Active outcome |

---

## Audit gaps · voice documentation in OG

- ❌ No `voice/` folder.
- ❌ No `TONE.md` / `VOICE.md` / `COPY.md`.
- ❌ No copy-guidance in `guidelines/Guidelines.md` (file is template-stub, lines 1-64).
- ❌ Voice principles not documented anywhere — inferred entirely from component strings.
- ✅ Per-CTA guidance exists in `ai-context/COMPONENTS.md:114-119` (when to use showArrow vs not) — only documented "voice rule" in OG.
- ✅ `LinkSystemDemo.tsx` + `LinksDocumentation.tsx` model exemplar CTA strings as canonical examples.

**Recommendation for new DS:** codify this audit as `voice/voice.md` with the verb-tier hierarchy + canonical CTA library + headline patterns + microcopy conventions.

---

## REUSABILITY SCORE · voice atoms
- CTA tier-hierarchy (Button brand / Button primary / CTALink) — ⭐⭐⭐⭐⭐ (every page · every conversion).
- Headline pattern (case-study hero) — ⭐⭐⭐⭐ (every case study · once per).
- Section h2 short-noun + eyebrow label — ⭐⭐⭐⭐⭐ (every section).
- Sticky CTA contextual variants — ⭐⭐⭐ (case-study only · 7 variants).
- Empty / error microcopy — ⭐⭐⭐ (listing / form-bearing pages).

---

**Audit complete · voice extracted from 30+ component strings + ai-context CTA rules + form a11y patterns. Codification path: synthesize into `voice/voice.md` in new DS with the 5 inferred principles + canonical library + anti-pattern table.**
