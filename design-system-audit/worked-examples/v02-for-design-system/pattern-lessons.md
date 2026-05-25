# Pattern Lessons · V0.2 -for design system

**WHAT** — REPLICATE / REJECT / MODIFY decision matrix per pattern observed in V0.2. The synthesis layer · what new DS adopts from V0.2.

**WHY** — V0.2 is the DESIGN reference · NOT the CODE reference. Must separate the two clearly to prevent dragging anti-patterns during port.

**WHEN to reference ✅**
- During port planning for new DS
- When deciding "do we keep V0.2 pattern X?"
- During gap analysis vs OG

**WHEN NOT ❌**
- Don't use this doc as a code transfer checklist · use `coding-differences-from-og.md` for that
- Don't apply blindly · each REPLICATE/REJECT/MODIFY has nuance

**WHERE applied** — Cross-references every other doc in this folder.

**HOW** — Pick a pattern · look it up in the matrix · follow the disposition.

---

## REPLICATE · bring into `design-system/core-v2/`

| Pattern | Source · file:line | Why · single-sentence |
|---|---|---|
| WWWWH per-component template | All `COMPREHENSIVE_COMPONENT_ANALYSIS_PART*.md` | Captures WHY before WHAT · reviewer-proof |
| 10 Commandments doc structure | `MASTER_COMPONENT_INDEX.md:287-338` | Constitution · short · testable |
| REUSABILITY SCORE | All PART*.md | Triage signal · quantifies "should this be repo-level" |
| ✅ DO / ❌ DON'T paired lists | All PART*.md | Pre-empts misuse before it happens |
| 3-element chapter intro (OverheadText + SectionHeader + BodyText) | Used 13× in PDP | Canonical for Ken report pages · don't deviate |
| Tri-modal hover language (purple-shadow / grey-static / border-darken / red-gradient) | `StatCard` / `TimelineCard` / `ComparisonParameterCard` / `FinalCTA` | Maps content type → interaction · readable grammar |
| Brand RED vs Data PURPLE color split | `theme.css:13-44` · `MASTER_COMPONENT_INDEX.md:67-77` | Most disciplined color-semantic in workspace |
| Semantic red ≠ Brand red | `theme.css` red-600 vs brand-red-500 | Critical for SWOT/error states · WCAG AA on white |
| Centralized indexed icon registry | `constants/stakeholder-icons.tsx` · `constants/segmentation-icons.tsx` | Uniform mental model for icon selection · `getStakeholderIconByIndex()` helpers |
| Sticky TOC sidebar w/ scroll-spy + reading-time + 3 states | `TableOfContentsSidebar.tsx` + `useScrollSpy.tsx` + `TOC_DOCUMENTATION.md` | Premium wayfinding · no other Ken project has this complete |
| Footer 4-region structure | `Footer.tsx` | Canonical Ken footer · see footer-anatomy.md |
| Oversized brand wordmark in Footer | `Footer.tsx:178-189` | Best brand moment in workspace |
| FinalCTA inversion (white CTA on red gradient) | `FinalCTA.tsx:35` | End-of-page delight signal · earns the inversion |
| Alternating white/grey-50 sections | spec at `MASTER_COMPONENT_INDEX.md:115-119` | Rhythm without color noise |
| Mind-map for ScopeOfReport | `ScopeOfReport.tsx` + d3 | Visual taxonomy beats bulleted list |
| Mixed-grid composition (2/3/2 rhythm) | `SegmentationSection.tsx` | Breaks card-grid monotony · creates editorial cadence |
| Inline mid-page TOC + sticky sidebar TOC | `TableOfContentsSection` + `TableOfContentsSidebar` | Mirrors real research-doc convention · dual wayfinding |
| Phosphor=data + Lucide=UI rule IF dual-lib stays | `MASTER_COMPONENT_INDEX.md:122-145` | If keeping both libs · this is the rule (else collapse to Lucide-only) |
| Decision trees as docs | `START_HERE.md:142-164` · `MASTER_COMPONENT_INDEX.md:209-233` · `MIGRATION_GUIDE.md:24-72` | Designer-facing · readable without TS fluency |
| Per-component WHERE section w/ file:line citations | All PART*.md | Forces grounding in actual code · prevents abstract guidance |
| 14-section ordered PDP recipe | `App.tsx:174-187` | Mimics buyer research flow · canonical Ken report order |
| Subscribe button as accent CTA | `Footer.tsx:217-227` | Newsletter conversion · uses KP-red despite being inside dark footer |
| Section header w/ 3-element intro repeats discipline | every section | Visual rhythm · sets reader expectation |

---

## REJECT · do NOT copy

| Pattern | Why · single-sentence |
|---|---|
| Inline hex everywhere instead of tokens | Escapes token-build · drift-prone |
| `@mui/material` dep | Dead-weight · conflicts w/ Tailwind philosophy |
| Vite SPA architecture | Aura target = Next 14 RSC · re-coding required |
| No tests / no lint / no CI | Below production gate · 13-point checklist fails |
| Hard-coded `© 2026` | Auto-rolls broken |
| Newsletter form w/o submit | Confusion · placeholder handler needed |
| Dormant `#6400E4` Footer purple bar | Vestigial dead code |
| `SIMPLE_TOC_TEMPLATE.tsx` orphan at root | Never imported · dead file |
| `PlayerVariantSwitcher` debug widget in production tree | Should be DEV-gated or stripped |
| Pexels.com video hot-link | Third-party · no fallback · license risk |
| Google Fonts hot-link | Self-host via next/font for perf + privacy |
| 98 root MDs w/ ~30 redundant audits | Signal/noise destroyed · compress to ~25 |
| `@figma/my-make-file` package name | Figma Make residue |
| `requestAnimationFrame` for orb animations | Loses `useReducedMotion()` compliance · use Framer Motion |
| Untokenized letter-spacing magic numbers (`tracking-[0.62px]`) | Pseudo-tokens · codify or drop |
| Mobile Footer accordion w/o ARIA | A11y violation · use Radix |
| `@types/d3` in `dependencies` (not devDeps) | Build bloat |
| Mixed CSS-var notation (`var(--name)` vs `bg-[var(--name)]` vs `--name`) | Pick one · standardize |

---

## MODIFY · keep the IDEA · change the EXECUTION

| Idea (keep) | Execution (change) | Why |
|---|---|---|
| Padding rhythm `px-[84.375px] lg:px-[112.5px]` | Codify as `--section-px-base` + `--section-px-lg` tokens OR Tailwind step (`px-20 lg:px-28`) | Magic numbers · no token |
| Two icon libraries | Pick ONE (Lucide for Aura production) · systematically replace Phosphor data icons via icon registry | 80KB bloat · 2 mental models |
| Footer mobile accordion | Replace w/ Radix Accordion or add `aria-expanded`/`aria-controls` | A11y |
| Hover orb animation | Replace `requestAnimationFrame` w/ Framer Motion + `useReducedMotion()` | A11y · preference compliance |
| `tracking-[0.62px]` recurring | Codify as `--tracking-footer-meta` OR drop · usually unneeded at body sizes | Pseudo-token |
| Dot-pattern overlay | Move from inline `style={{ backgroundImage: ... }}` to `.dot-pattern` CSS utility class | DRY |
| Hard-coded year stamp | `new Date().getFullYear()` | Auto-roll |
| Per-section MD walk-throughs | Keep ONE canonical per section · archive duplicates | 98 MDs → ~25 |
| Audit-report MD family | Consolidate 4 near-duplicates into 1 canonical | Signal density |
| Vite SPA routing | Port to Next 14/15 App Router w/ RSC + `'use client'` boundaries | Production stack |
| `bg-[#141016]` hex Footer bg | Map to `--grey-800` token · reference via Tailwind utility | Token discipline |
| `pexels.com` video hot-link | Self-host as `/public/assets/hero-bg.mp4` · add poster fallback | Perf + license |
| Google Fonts | Self-host via `next/font` (Next-port) | LCP improvement |
| `SIMPLE_TOC_TEMPLATE` orphan | If pattern useful · move to `templates/page-template.tsx` · else delete | Cleanup |
| 98 root MDs w/ duplicates | Compress to ~25 canonical · archive rest in `_archive/` w/ datestamp | Findability |
| `@types/d3` in deps | Move to `devDependencies` | Bundle hygiene |
| Mixed CSS-var consumption | Standardize on Tailwind utility (`bg-grey-800`) generated from `@theme` | Consistency |

---

## Single-line synthesis

V0.2 is the **documentation reference** · NOT the **code reference**.

Replicate every DECISION rule (WWWWH · 10 Commandments · REUSABILITY SCORE · tri-modal hover · brand-vs-data color split · Footer shape · sticky TOC · 14-section PDP recipe).

Reject the IMPLEMENTATION specifics (inline hex · Vite · dual icons · MUI · missing tests · hot-linked assets · vestigial code).

Port section/component COMPOSITION into `design-system/core-v2/` using Aura's stack (Next 14/15 + Tailwind v4 utilities from `@theme` + Lucide + Style Dictionary tokens + Framer Motion + pnpm + tests).

---

## REUSABILITY SCORE

⭐⭐⭐⭐⭐ — This synthesis is the highest-leverage doc in the V0.2 folder. Single source of truth for "what to bring · what to leave · what to evolve."

## Linked concepts
- `00_overview.md`
- `report-pdp-anatomy.md` — design patterns to bring
- `documentation-method.md` — doc framework to bring
- `coding-differences-from-og.md` — code-level anti-patterns to leave
- `footer-anatomy.md` — Footer canonical
- `og-audit/00_overview.md`
- `industry-research/shadcn-ui.md` · `industry-research/radix-ui.md` · `industry-research/lightning.md`
- `gap-analysis/og-vs-core-v2.md` (forthcoming)
- `99_decision-record.md` (forthcoming)
