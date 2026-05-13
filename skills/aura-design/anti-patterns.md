# Anti-patterns — what NOT to do on Ken Research surfaces

Half the value of this skill = explicit don'ts. Pattern-by-pattern, w/ reason.

---

## Tier A market-research moves we BEAT (never adopt)

| Don't | Why we beat it |
|---|---|
| **Hidden pricing** ("Contact for quote") | Tier A standard. We show pricing → conversion lift + trust signal |
| **Demo-wall report stores** (sample only behind form) | IMARC/Mordor pattern. Auto-generate free preview (2 charts + 1pp) instead |
| **Logo carousel of unverified clients** | "Trusted by Fortune 500" w/ no proof = noise. Use quantified citation pattern instead |
| **Form-fill funnels** to read anything | Burns trust. Free preview + clear gate |
| **PDF-first delivery** w/ web as afterthought | Gartner's pattern. We invert: web product first, PDF as export |
| **Endless dropdown nav** w/ 30+ sectors | Hick's Law. Cap top-level at 7. Sector dropdown = 2-col search-as-you-type |
| **"Request a sample"** CTA | Gating instead of giving. Show the sample |
| **Chart-junk dashboards** (12-color categorical, gradients) | Tableau/Datadog default. Sequential palette, no gradients on data |
| **Over-claim copy** ("global leader", "world-class") | Generic. Show specifics: "47 reports on GCC fintech in last 18 months" |
| **Stock photo heroes** (boardroom handshakes, cityscapes) | Tier A staple. Use data viz, real charts, real people, abstract type as hero |
| **Sticky chat bubble in bottom-right** | Drift/Intercom pattern. Use contextual help on relevant pages only |
| **Cookie-banner overlay** blocking content | Use slim non-blocking footer banner |
| **Newsletter modal interstitial** | Substack pattern. Burns trust on first visit |
| **Report titles in ALL CAPS** | Tier A SEO trick. We use proper title case + serif display |

---

## Tier C SaaS/intel moves we PASS on (not for our wedge)

| Don't | Why |
|---|---|
| **Notion-style "everything is a block"** | Kills information scent for research. Reader needs structured headings, not fluid blocks |
| **Cal.com over-skeumorphism** | 2026 trend, but our brand is editorial+cinematic, not playful |
| **Stripe docs nav depth** (5+ levels) | Too deep for product UI. Max 3 levels, prefer search |
| **Substack recommendation popups** | Anti-trust on first read |
| **Crunchbase paywall blur w/o preview** | Tease w/o substance. We give 2 free charts + 1pp |
| **CB Insights aggressive expert-collection upsell** | Earn the upsell via depth, don't push |
| **PitchBook sales-team-required entry** | We let buyers self-serve up to enterprise tier |
| **Bloomberg color-coded function keys** | Legacy. Modern keyboard shortcuts inline, no decoder ring needed |

---

## Hard-gated claims (NEVER ship until verified)

These appear on `kenresearch.com` w/ no client/source confirmation. Do NOT generate UI/copy that displays them as fact:

- "2,000+ clients"
- "70% of Fortune 2000"
- "500+ analysts"
- "190+ countries covered"
- "10 lakh+ assets"
- "15,000+ reports"
- "Trusted by global leaders"
- Generic logo wall w/o named case studies

**If a design needs trust signals → use verified-only patterns:**
- Real case studies w/ named client + metric (CB Insights pattern)
- "Cited by analysts at [N] of top 50 consulting firms" (when we can prove it)
- "[N] reports published in last 12 months on [sector]" (provable from our catalog)
- Quote w/ named buyer + role + company (signed permission)

---

## Forbidden words (analyst-memo voice)

Never write these on Ken Research surfaces:

- delve / delved / delving
- leverage (verb form — "we leverage X")
- robust
- multifaceted
- holistic
- synergy / synergize
- world-class
- best-in-class
- cutting-edge
- bleeding-edge
- next-generation
- revolutionize / revolutionary
- empower / empowering
- streamline / streamlining
- seamless / seamlessly
- game-changer / game-changing
- thought leader / thought leadership
- ecosystem (when used loosely, not technical)

**Use specifics instead:** "47 reports on X" beats "comprehensive coverage." "12-week analyst support" beats "world-class service."

---

## Punctuation discipline (Ken voice)

- **Prefer commas, periods, "..." over em dashes** in marketing copy. Em dashes OK in long-form analyst writing where pauses serve.
- **No exclamation marks** (one is fine in casual portal microcopy, never in marketing/headlines)
- **Curly quotes** in headings/body. Straight quotes in code only.
- **No emoji** in marketing/headers/buttons. OK in internal portal toast notifications, sparingly.

---

## Color anti-patterns

| Don't | Why |
|---|---|
| Ken red `#b01f24` on borders, hovers, accents | CTAs only. Scarce = signal. Else dilutes |
| Pure black `#000` on dark variant | OLED smearing, harsh contrast. Use `--color-bg-deep #0a0a0c` |
| Pure white `#ffffff` on light variant | Eye fatigue. Use warm off-white `#f5f2f1` |
| Gradient backgrounds on data viz | Tableau anti-pattern. Sequential single-hue scales only |
| 12-color categorical palettes | Datadog pattern. Cap at 5-7, use sequential where order matters |
| Brand red on text body | Reserve for CTAs + active TOC border + 1-2 emphatic markers per page max |
| Neon glows / cyberpunk accents | Off-brand. Cinematic ≠ cyberpunk |
| Heavy bloom on dark hero | Apple TV+ pattern. Kills text legibility |

---

## Motion anti-patterns

| Don't | Why |
|---|---|
| Auto-play page-load motion blocking content | Reader can't scan past it. Even if "skippable" |
| Parallax >50% bg shift | Disorienting on long-scroll reports |
| Scroll-jacking | Removes user control. Cinematic ≠ hijack |
| Adding GSAP / Lenis to project | REMOVED 2026-05-08 dev-team parity · Framer-only |
| Motion w/o `prefers-reduced-motion` guard | A11y violation, mandatory not optional |
| Easing >300ms on state changes | Doherty threshold. Feels sluggish |
| Bounce / overshoot on B2B UI | Cal.com vibe, off-brand for analyst memo voice |
| Animated emoji or icon "personality" | Generic SaaS. We're not Slack |
| Progress spinners >400ms | Use skeleton screens shaped like real content (Linear pattern) |

---

## Information-architecture anti-patterns

| Don't | Why |
|---|---|
| Flat navigation w/ 12+ items | Hick's Law. Cap top-level at 7, group else |
| Mega-menus revealing 30+ links on hover | Cognitive load. Use search-first, then categorized |
| Mystery-meat icons w/o labels | Discovery cost. Always pair icon + label except in repeated contexts |
| "Featured" sections w/ no clear curation rule | Editorial discipline. Either editor-picked w/ rationale or remove |
| Breadcrumbs >4 levels deep | URL too nested. Restructure IA |
| Tab navigation w/ scroll arrows | Doesn't fit = too many tabs. Use side rail or filtered list |
| Modal-on-modal | Stack confusion. Refactor to single modal w/ steps |

---

## Form anti-patterns

| Don't | Why |
|---|---|
| Multi-step forms w/o progress indicator | Disorientation |
| Required-by-default everywhere | Mark optional explicitly, default = required only when truly needed |
| Generic placeholder copy in label position | Disappears on focus, accessibility fail. Labels above input always |
| Validation on blur only | Show success/error inline as user types (debounced) |
| "Email or phone" toggles | Just accept both, detect format |
| Captcha on low-risk flows | Use rate limiting + honeypot, not human friction |

---

## Empty-state / loading anti-patterns

| Don't | Why |
|---|---|
| Spinner-only loading state | Use skeleton screen shaped like real content (Linear pattern) |
| "Loading..." text indefinitely | Show progress where possible |
| Generic "No results" w/o suggestions | Always suggest: broaden filter, browse category, try search |
| 404 page that doesn't help | Show search bar + popular reports + "back to home" |
| Empty dashboard w/o sample data | Show "preview w/ sample data" button (Hex pattern) |

---

## Build-time anti-patterns (extends `aura-builder` template)

| Don't | Why |
|---|---|
| Hard-code colors / px values | Use tokens from `globals.css` / `theme.css` |
| Inline mock data in components | Extract to `src/lib/mock-data.ts` w/ `// TODO: replace w/` markers (per handover discipline) |
| Custom shadcn variants when defaults work | Use defaults first, extend only when needed |
| Importing `gsap` / `@gsap/react` / `lenis` | REMOVED 2026-05-08 dev-team parity · Framer Motion only |
| Skip `prefers-reduced-motion` guard | Mandatory |
| Use `npm` commands | We are pnpm workspace-wide |
| Use `motion` package separately when `framer-motion` already installed | Pick one consistently per project |
