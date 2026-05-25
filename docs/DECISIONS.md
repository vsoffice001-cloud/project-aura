# Aura Decisions

ADR-style log of fork-in-the-road choices. "We chose X over Y because Z."

**Read pattern:** Aura reads `## Active` section on tasks where domain matches an entry. `## Archive` only on archaeology need ("why did we used to do X").

**Write pattern:** any non-default choice → log here. Includes the alternatives rejected + reversal trigger so future-Aura can re-evaluate.

**Bloat protocol:** Active section ≤30 entries. When exceeded, archive oldest entries that haven't been referenced in 90 days.

Entry format:
```
## YYYY-MM-DD — title
**Context:** what task surfaced this
**Decision:** chose X
**Alternatives:** Y (rejected: ...), Z (rejected: ...)
**Tied to:** lib/version/file dependencies (for staleness tracking)
**Reversal trigger:** what would make us reconsider
**Status:** active | provisional | superseded by <link> | archived
```

---

## Active

## 2026-05-19 — DS heritage reclaim · Stage 3 port · doc-first methodology w/ 5 batched gates
**Context:** user flagged v0.3 product page UI regressing · root-cause audit found new core-v2 DS shipped from OG vs_26 + topnav only · V0.2 organism layer never ported · 13 of 22 V0.2 organisms missing · AI invents flat substitutes on miss · rationalizes in JSDoc.
**Decision:** Synthesize FIRST · port SECOND · NO code in Stage 2 · 7 synthesis docs gate Stage 2 · 5-batch decomposed port (3.0 tokens · 3.1 primitives · 3.2 layout+data · 3.3 specialty + 3.3e templates) gated between batches · 4WH applied to every doc + component · TodoWrite decomposes >3-step tasks.
**Alternatives rejected:**
- (A) "Just port everything from V0.2 blanket" — user flagged buttons/CTAs/bottom-banner outdated in V0.2 · would re-introduce drift
- (B) "Just port everything from V0_lite blanket" — V0_lite missing dense-data organisms (MindMap · Scope · etc) which v0.3 needs
- (C) "Code first, document later" — token name collisions (V0.2 `--text-sm`=13px vs core-v2 `--text-sm`=16px) would silently shift body type · doc-first prevents
- (D) "Single mega-batch" — Sonnet credit exhaustion mid-batch likely (proved correct · one agent ran out · partial deliverable salvaged)
- (E) "Keep using v0.3 as source" — user flagged v0.3 NOT approved · DELETED v0.3-sourced files mid-port (MapFallback · DatasetPreviewTable) · re-ported from V0.2 canonical
**Reversal trigger:** if Stage 4 v0.3 swap reveals critical port quality issues · revert to v0.3 inline UI for affected sections · investigate root cause · fix in next batch. If user redirects: any synthesis doc updated → re-version → re-approve before further execution.
**Status:** APPROVED · executed · TSC green · 228 components in core-v2 · 8 gates passed · Stage 4 paused at user gate.

## 2026-05-19 — Charts: @ken-research/charts npm pkg + react-simple-maps for Map (NOT Highmaps)
**Context:** Stage 3 audit · `@ken-research/charts` v0.1.5 ships 9 charts (Pie · Bar · Column · Area · Line · StackedBar · MultiSeriesLine · MultiAxisLine · HistoricalProjectedArea) but lacks Map. User asked: "we also have charts npm package installed we can use them too. instead of old page graphs and charts?". User also said: "if there is no map create it learn it and then create it ... also create a variant switcher to showcase both the map and table ui of v0.2".
**Decision:** Use `@ken-research/charts` for ALL chart rendering (Pie/Bar/Stacked/etc) · DO NOT port V0.2 `ui/chart.tsx`. For Map (gap): build NEW `MapChart` organism via `react-simple-maps` v3 (MIT · ~35kB · pure-React composition · Framer-friendly · TopoJSON via `topojson-client`). For Map ⇄ Table variant switcher: build `TabStrip` molecule (role=tablist · underline-active · Framer crossfade 150ms · `useReducedMotion()` guard · URL `?view=` persistence via Next 15 `useSearchParams`). Compose Map + Table + TabStrip in `RegionalComparison` organism.
**Alternatives rejected:**
- (A) **Highcharts Highmaps** · industry gold standard · already loaded as runtime dep of `@ken-research/charts` (Highcharts v11.4.6) · marginal +25kB · API cohesion · BUT commercial license · procurement gate · ~$535/dev minimum
- (B) **D3-geo direct** · max control · ~30kB · BUT high build cost (2-3 dev-days) · no tooltip/legend/zoom built-in
- (C) **Visx (@visx/geo)** · MIT · React-native · BUT less map-specific tooling than react-simple-maps · no map collection
- (D) **Pill toggle / segmented control / icon button group** for view switcher · all valid · but tab strip matches editorial style (Stripe / FT / Bloomberg precedent)
**Reversal trigger:** if Ken Research procurement confirms Highmaps covered under existing Highcharts license · swap `react-simple-maps` → Highmaps for publishing-grade SVG + native drill-down + PDF export. If Map is rarely used (<3 instances on V1 PDP) · keep react-simple-maps indefinitely.
**Status:** APPROVED · MapChart built + TabStrip built + RegionalComparison composed · TSC green · TopoJSON files NOT bundled (consumer responsibility · note in MapChart.md w/ sourcing guide).

## 2026-05-19 — Token foundation extension · 53 tokens added · existing values win on collision
**Context:** Token-rename trap discovered: V0.2 + core-v2 share token NAMES (`--text-sm`, `--radius-md`, `--purple-500`) but ship DIFFERENT VALUES. Silent drift on naive port.
**Decision:** Strategy A · core-v2 values win · legacy ports refactor to new names/values via TOKEN-GAP-REPORT §4 port refactor rules (23 rules). 50 tokens appended to `base.css :root` L626-731 in 18 blocks: 3 legacy aliases (`--warmBg` · `--warmBorder` · `--content-max-width`) · 6 type tokens · 3 weight tokens · 7 tracking · 1 leading + 1 stat-label · 1 color (`--black-25`) · 9 glass tokens (cinematic-dark surfaces) · 6 shadows · 2 spacing (`--space-14` · `--space-20`) · 10 motion (3 ease + 7 duration) · 3 bg compositions · 4 pattern tokens. 2 reconciliation collisions found post-add: `--leading-snug` existing `1.3` wins (rejected spec `1.25`) · `--duration-slow` existing `500ms` wins (rejected spec `600ms`). Plus 4 semantic ink aliases (`--semantic-ink-strong/body/subtle` + `--border-soft`) added post-Batch-3.2a for cross-tier consumer parity. Total: 53 new CSS vars.
**Alternatives rejected:**
- (B) Override core-v2 to legacy values · reverts brand alignment · breaks AA contrast guarantees · invalidates foundation-lock memory
- (C) Namespace legacy values (`--text-legacy-sm`) · permanent tech debt · AI confusion · doubles maintenance
**Reversal trigger:** if v0.3 visual regression after Stage 4 swap reveals hex/size drift was user-visible · revisit per-token decision · case-by-case.
**Status:** APPROVED · executed · TSC green · documented in TOKEN-GAP-REPORT §10 reconciliation log + FOUNDATIONS.md "Added 2026-05-19" section + base.css.bak backup.

## 2026-05-12 — Page-build workflow: 8-step process w/ 2 user-blocking gates (PROPOSE + SHOW FIRST CUT)
**Context:** User correction after reports-pdp-v2 partial rebuild went wrong — built 34 bespoke organisms before user saw first cut. Spawned aura-builder w/o approach approval. Spawned aura-qa w/o user picking gates. Result: ~10000 LOC rework + multi-turn refinement cycles.
**Decision:** Lock 8-step canonical process for ALL page builds + major UI builds. Two HARD user-blocking gates:
  - Step 3 PROPOSE+BLOCK (approach + 3 LOCKS + DS atoms list + spacing + grid) — Aura cannot spawn step 4 without explicit user "Yes/change/cancel"
  - Step 5 SHOW FIRST CUT (screenshots + URL + summary) — Aura cannot spawn step 7 QA without user direction
Steps: INTAKE · RESEARCH (write RESEARCH.md) · PROPOSE+BLOCK · COMPOSE · SHOW FIRST CUT · PROPOSE QA · EXECUTE QA · EXIT.
Encoded in 6 files + 1 memory file (see CHANGELOG 2026-05-12 entry).
**Alternatives:**
- Soft "instruction-only" enforcement (current state pre-correction) — REJECTED: bypassed twice (ken-v2 2026-05-05 · reports-pdp-v2 2026-05-12). Soft rules ≠ enforcement.
- Skip RESEARCH step for "small builds" — REJECTED: no "small" page builds. Any drift compounds. Single process.
- Auto-spawn QA after build w/ blanket gates — REJECTED: blanket gates burn cycles · misalign w/ user priority.
- Allow agent override of LOCKS for "creative" reasons — REJECTED: every prior override = recipe drift (Cat 13.9/10).
**Tied to:** `skills/aura-design/SKILL.md` (page-build section) · `skills/aura-design/chains/page-build.md` (full chain) · `workflows/agents/aura-builder.md` (DS atom HARD GATE) · `workflows/agents/aura-qa.md` (C1-C7 gates) · `workflows/ROUTING.md` (page-build entry) · `CLAUDE.md` (global pointer) · memory `feedback_page_build_process.md`.
**Reversal trigger:** if 2 hard gates create unacceptable friction for trivial cases (e.g. 1-section update on existing page) AND drift incidents stay zero over 90 days, consider adding a "minor-change" exception path. Until then: no exceptions.
**Status:** active

## 2026-05-08 — Stack lock-in: Framer Motion ONLY (GSAP + Lenis REMOVED) for dev-team parity
**Context:** User confirmed dev-team prod stack via Wappalyzer scan of kenresearch.com: Next.js 14.2.35 · React (implied 18) · Framer Motion · Tailwind · shadcn/ui · Radix · Lucide · Three.js 183 · NextAuth · NO GSAP · NO Lenis · NO Highcharts (in scan; we use). User direction: "do not downgrade Next/React/Tailwind, use latest framer motion, do not use gsap, lenis. use highcharts and customise. no need for GTM + Clarity + Crazy Egg."
**Decision:** Animation stack = **Framer Motion ONLY** (latest v12). GSAP + Lenis REMOVED from all 3 active projects + DS docs + agent templates + workflows. Smooth scroll = native CSS `html { scroll-behavior: smooth }` at DS layer (`core-v2/styles/base.css`). Scroll-driven animation via Framer `useScroll`+`useTransform`+`useInView`. Reduced-motion guard via Framer `useReducedMotion()` + CSS `@media (prefers-reduced-motion: reduce)` global. Stay on Next 15 / React 19 / Tailwind v4 (NOT downgrading — user explicit). Highcharts kept (custom-skinned via DS). Analytics scripts (GTM/Clarity/Crazy Egg) NOT wired by Aura.
**Alternatives:**
- Keep GSAP + Lenis "justified at handover" — rejected: dev-team doesn't use, adds 2 deps they'd strip
- Downgrade Next/React/Tailwind to dev-team versions (14/18/v3) — rejected: user explicit "do not downgrade"
- Build framer-motion skill in `skills/` — rejected: framer-motion docs are good enough ad-hoc, no skill needed (per LEARNING 2026-05-08 don't-build-skill-for-docs)
**Tied to:** 3 projects' `package.json` (gsap + @gsap/react + lenis removed), 3 `app/layout.tsx` (LenisProvider stripped), 3 `lenis-provider.tsx` (deleted), `design-system/core-v2/src/styles/base.css` (added native smooth scroll), `skills/aura-design/decisions/motion-router.md` (rewritten Framer-only), `skills/aura-design/surfaces/{01,02,04,05}.md` (motion sections updated), `skills/aura-design/chains/page-build.md`, `skills/aura-design/anti-patterns.md`, `skills/aura-design/decisions/surface-picker.md`, `CLAUDE.md`, `Quick_start_guide.md`, `.claude/agents/{aura-builder,aura-mech,aura-qa}.md` + `workflows/agents/*` (dual-path), `workflows/ROUTING.md`, `skills/SKILL_ROUTING.md`, `skills/INDEX_BY_CATEGORY.md`, deleted `skills/gsap-scrolltrigger/` skill.
**Reversal trigger:** if dev-team adopts GSAP for new feature OR motion patterns prove uncoverable by Framer alone (unlikely — Framer covers all current Ken needs)
**Status:** active

## 2026-05-08 — Delete `skills/_archive/` (73 dirs · 838 MB) — recovery via fresh install
**Context:** User direction "delete unnecessary skills." Tightening sprint moved 73 skills to `skills/_archive/` w/ recovery README. Archive sat at 838 MB. After 6+ weeks of zero use of any archived skill, delete = correct cleanup.
**Decision:** Delete entire `skills/_archive/` folder (73 dirs + README.md). Recovery path = fresh install via `npx skills add <repo>` if any archived skill proves load-bearing later.
**Alternatives:** (a) Keep archive on disk indefinitely — rejected: 838 MB + invites scope creep ("just one more skill, just in case"). (b) Tar+gz to single archive file before delete — rejected: still on disk, doesn't reduce friction (would need to extract before fresh install anyway). (c) Selective delete (keep ui-ux-pro-max + theme-factory + design-review for edge cases) — rejected: bright-line rule = active set is selective, anything else = fresh-install path.
**Captured for recovery (alphabetical, 73 dirs):** algorithmic-art · autoplan · banner-design · benchmark · benchmark-models · brand · brand-guidelines · browse · canary · canvas-design · careful · codex · connect-chrome · context-restore · context-save · cso · design · design-consultation · design-html · design-review · design-shotgun · design-system · devex-review · doc-coauthoring · document-release · docx · expert-ui-ux-designer · freeze · gsap-core · gsap-frameworks · gsap-performance · gsap-plugins · gsap-react · gsap-timeline · gsap-utils · gstack · gstack-upgrade · guard · health · impeccable (workspace duplicate, canonical at ~/.claude/skills/) · internal-comms · investigate · ken-research-workspace · land-and-deploy · learn · make-pdf · mcp-builder · office-hours · open-gstack-browser · pair-agent · pdf · plan-ceo-review · plan-design-review · plan-devex-review · plan-eng-review · plan-tune · pptx · qa · qa-only · retro · review · setup-browser-cookies · setup-deploy · ship · slack-gif-creator · slides · theme-factory · ui-styling · ui-ux-pro-max · unfreeze · web-artifacts-builder · xlsx
**Tied to:** `skills/_archive/` (deleted) · `skills/INDEX_BY_CATEGORY.md` (active set unchanged 7+3) · `docs/CHANGELOG.md` (entry on top) · prior ADR 2026-05-08 "Skill prune 79→7"
**Reversal trigger:** any archived skill proves load-bearing → `npx skills add <repo>` fresh install (most are public: pbakaus/* · anthropics/* · vercel-labs/agent-skills · etc.) + add row to `INDEX_BY_CATEGORY.md`
**Status:** active

## 2026-05-08 — `aura-design` Phase 2 closed (14 files total · 4 surfaces + 5 decisions + 2 variants + 1 chain + anti-patterns + voice + SKILL.md)
**Context:** Phase 1 shipped 2026-04-30 w/ only `surfaces/03-report-viewer.md` + `anti-patterns.md` + `voice.md`. Phase 2 deferred 12 files. Per user direction "proceed systematically" after Tracks 1+3+3b+4+2 of tightening sprint, finished Phase 2 in this session.
**Decision:** Ship all 12 deferred files. Total skill = 14 files (3 from Phase 1 + 1 SKILL.md + 12 new). Decision-tree split into `decisions/` dir (5 files), variant detail into `variants/` dir (2 files), workflow chain into `chains/` dir (1 file). Each file = single-purpose, cross-linked, ~250-400 LOC.
**Alternatives:** (a) Ship subset (just 4 surfaces, defer decisions + variants + chain) — rejected: chain file = forcing function for end-to-end build flow, deferring it = no reason to build other detail files. (b) Inline all detail into SKILL.md — rejected: skill bloat (Layer 2 anti-bloat), readers can't on-demand load just decisions/chart-picker.
**Tied to:** `skills/aura-design/{SKILL.md, surfaces/01-discovery.md, surfaces/02-report-store.md, surfaces/04-dashboards.md, surfaces/05-engagement.md, decisions/chart-picker.md, decisions/motion-router.md, decisions/brand-variant.md, decisions/surface-picker.md, decisions/density-picker.md, variants/cinematic-dark.md, variants/editorial-light.md, chains/page-build.md}` · LEARNINGS 2026-05-06 (Tailwind v4 typography no-op, DS-sync hierarchy) baked into decisions
**Reversal trigger:** if 1+ surface files prove wrong-fit (e.g. user pivots Ken to subscription-only model, surface 02 Store needs heavy rework) → ADR new variant + supersede affected file(s)
**Status:** active

## 2026-05-08 — `impeccable` un-gated, full-use approved
**Context:** User instruction "impeccable skill is a good skill install it fully and remove gated rules use it fully." Prior gate (ADR 2026-04-30) required confirm-before-mutate per change set + Bash command preview + restricted to user-explicit-invoke only — friction blocked actual use; skill never invoked in 6 weeks despite design polish being a recurring need.
**Decision:** Remove gated rules. Use `impeccable` freely for frontend polish/critique/audit/animate/colorize/typeset/layout/live across any `projects/*` surface. Subcommand routing per intent table in `SKILL_ROUTING.md`. Live-inject (`live`/`overdrive`) localhost only. Backend folders + prod URLs still out of scope.
**Alternatives:** (a) Keep gated — rejected: friction blocked use, defeats install purpose. (b) Uninstall — rejected: user explicit "use it fully." (c) Add "auto-confirm" toggle — rejected: complicates rules; user wants flat usage.
**Tied to:** `~/.claude/skills/impeccable/SKILL.md` v3.0.5 · `skills/SKILL_ROUTING.md` (un-gated block) · `workflows/ROUTING.md` `impeccable-polish` workflow (simplified to 4 steps, no per-mutation confirm) · `CLAUDE.md` skill-routing table.
**Reversal trigger:** if `impeccable` mutates files in unexpected ways causing rework 2+ times → re-gate. If Snyk/Socket scores worsen → re-gate or uninstall.
**Status:** active — supersedes ADR 2026-04-30 "Installed `impeccable` skill (gated, opt-in only)".

## 2026-05-08 — DS heal: Option B fork to `core-v2/` over heal-in-place
**Context:** Sprint 2026-05-07 — 3-project Vite→Next port required clean DS. v1 forensic surfaced 1207 inline `style={{}}` + 436 hex literals + 850 `[Npx]/[#xxx]` arbitraries + zero `'use client'` + duplicate hook dirs + token namespace drift (`--brand-red` vs canonical `--color-brand-red`) + 4 AnimatedArrow files + 26 stale .md.
**Decision:** Fork to `design-system/core-v2/`. Freeze v1 as legacy after sprint cutover.
**Alternatives:** (a) heal-in-place — rejected: too many cross-cutting structural issues. Estimated reconciliation cost > rebuild cost. (c) extract atoms-only to packages — rejected: leaves variant + tokens orphaned.
**Tied to:** `design-system/core-v2/`, `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`
**Reversal trigger:** if v2 atoms turn out to need v1 patterns we discarded (variant DSL, etc.) — recover from `design-system/core/` (still on disk).
**Status:** active

## 2026-05-08 — Charts: Highcharts standard, custom-skinned via DS theme
**Context:** Sprint 2026-05-07. Legacy projects mixed recharts + Highcharts + d3. User confirmed "we are using similar Highcharts but ours is custom-made."
**Decision:** Highcharts is workspace chart standard. `core-v2/src/charts/highchartsTheme.ts` + 5 presets (area/line/pie/bar/column) consume DS color tokens via `readToken()` runtime CSS-var resolver. `mergePreset(theme, preset, overrides)` deep-merger.
**Alternatives:** (a) Recharts — rejected: less data-viz coverage, weaker enterprise pedigree. (b) d3 throughout — rejected: too low-level, no batteries. (c) Multi-engine (Recharts + Highcharts adapter) — rejected: maintenance burden.
**Tied to:** `core-v2/src/charts/`, `tokens/tokens.json` `chart.palette.{1..8}` group
**Reversal trigger:** Highcharts license cost exceeds budget OR new chart requirements not covered.
**Status:** active

## 2026-05-08 — V0.2 mindmap: keep d3, redesign visuals only
**Context:** Sprint 2026-05-07 Phase E. V0.2 has 400-LOC d3 mindmap (ScopeOfReport). Original audit recommended replacing w/ semantic accordion list (saves 400 LOC + dep).
**Decision:** Keep d3 mindmap. Redesign visuals only against DS tokens.
**Alternatives:** (a) drop d3 + accordion list — rejected by user: zoom/pan/click interaction is part of report value prop.
**Tied to:** `projects/V0.2_report/` (d3 dependency in package.json)
**Reversal trigger:** d3 perf becomes a Lighthouse blocker OR maintainers find d3 hard to update.
**Status:** active

## 2026-05-08 — V0.2 hero: cinematic-dark variant per KSA Coldchain reference
**Context:** Sprint 2026-05-07 Phase E. Recipe default = editorial-light. User shared KSA Coldchain reference image + live ref `kenresearch.com/ksa-coldchain-test-market` showing cinematic-dark hero (deep charcoal + serif white + glass right-card + Ken-red + ghost CTAs).
**Decision:** V0.2 hero = cinematic-dark. Activated via `data-section="hero"` + `data-variant-section="cinematic"` attributes (mesh activator works in editorial-light pages too).
**Alternatives:** (a) editorial-light hero per recipe default — rejected: visual contract from user explicit. (b) Per-section variant DSL — rejected: too complex, single-variant page is the rule.
**Tied to:** `core-v2/src/styles/{editorial-light,cinematic-dark}.css` `[data-variant-section="cinematic"]` exception, `projects/V0.2_report/src/components/sections/HeroSection.tsx` (Phase E section port)
**Reversal trigger:** brand pivots to all-editorial-light, cinematic-dark deprecated.
**Status:** active

## 2026-05-08 — Navbar source: topnav-v32 (NOT legacy project Header)
**Context:** Sprint 2026-05-07 Phase C step 4. V0_lite_report had inline 442-LOC NewHeader. topnav-v32 = atomic-design 22-file navbar w/ injectable render-prop slots.
**Decision:** Promote topnav-v32 navbar tree (atoms+molecules+hooks+organisms+types) to DS core-v2. Use `<TopNavigation>` drop-in across all consumers via `NavbarShell` thin client wrapper.
**Alternatives:** (a) Port V0_lite NewHeader — rejected: monolith, not reusable. (b) Build new from scratch — rejected: topnav-v32 already DS-aligned.
**Tied to:** `core-v2/src/{atoms,molecules,organisms,hooks}/navbar*`, `projects/{V0_lite_report,report-store,V0.2_report}/src/components/NavbarShell.tsx`
**Reversal trigger:** product needs single-page navbar variant that doesn't fit injectable-slot pattern.
**Status:** active

## 2026-05-08 — Color tokens only — analyze hex usage, replace systematically
**Context:** Sprint 2026-05-07. User: "we are using colors from design system colors so DS token should only use, analyse how current colors are being used compare hex codes and then replace with our tokens."
**Decision:** All hex/rgba in component bodies replaced w/ canonical CSS vars during port. ~600+ sites converted across V0_lite_report port. Scan-and-swap pattern: read legacy → identify hex → map to canonical token (`--color-foundation-{black,white}`, `--color-ramp-{black,red,warm,purple,...}-{50..900}`, `--surface-text-{,muted,subtle}`, `--border-{soft,default,strong}`, `--tint-{soft,default,strong}`, `--color-brand-red`, `--color-accent-{purple,periwinkle,perano,coral}`).
**Alternatives:** (a) Allow inline hex w/ lint warning — rejected: drift accumulates. (b) Strip-and-rebuild atoms — rejected: too aggressive, loses micro-decisions.
**Tied to:** All ported atoms/molecules/sections in core-v2 + V0_lite_report.
**Reversal trigger:** consumer-specific accent colors become production need (escape hatch via `style={{ color }}` on consumer-side ONLY, never atom-side).
**Status:** active

## 2026-05-08 — pnpm workspace TS source consumption: drop `.js` import suffix
**Context:** Sprint 2026-05-07 Phase C step 8. DS used `from './Foo.js'` ESM-strict suffix. TS bundler resolution accepted (typecheck clean). Next webpack (`transpilePackages: ['@kenresearch/design-system']`) rejected — can't resolve `.js` paths back to `.ts` source.
**Decision:** Drop `.js` suffix from all internal DS imports + consumer mock-data imports. 82 sites in DS + 5 in V0_lite_report consumer fixed via sed regex.
**Alternatives:** (a) Build dist/ on every DS change — rejected: slow dev loop. (b) Configure webpack `extensionAlias` resolver — rejected: brittle. (c) Add `@kenresearch/design-system` to webpack `resolve.fullySpecified: false` — rejected: hidden config.
**Tied to:** `core-v2/src/**/*.{ts,tsx}`, `projects/V0_lite_report/src/lib/mock-data.ts`, `projects/V0_lite_report/next.config.ts` `transpilePackages`
**Reversal trigger:** Publishing DS to npm as compiled dist (then `.js` paths required, switch back).
**Status:** active

## 2026-05-08 — Phase D + E: scaffold-only foundation, defer detailed section ports consumer-driven
**Context:** Sprint 2026-05-07. report-store = 110+ component files. V0.2_report = 9-13 working day estimate. Sprint scope can't fit both fully.
**Decision:** Phase D (report-store) + Phase E (V0.2_report) deliver foundation only — Next 15 scaffold + mock-data gateway + NavbarShell wired + production build clean. Detailed section ports deferred to consumer-driven follow-up sprints. Foundation = consumer can pick up section-by-section per per-project audit.
**Alternatives:** (a) Full port both projects in this sprint — rejected: multi-week scope. (b) Skip scaffolds, audit-only — rejected: leaves consumers without foundation.
**Tied to:** `projects/{report-store,V0.2_report}/`, `docs/aura-sprint-2026-05-07-port/{A2,A3}-*-audit.md`
**Reversal trigger:** sprint scope expanded OR follow-up sprint scheduled.
**Status:** active

### 2026-05-07 — DS infra batch from competition-benchmarking-listing-v01 learnings (8 items)
**Context:** Building competition-benchmarking-listing-v01 surfaced 8 systemic DS gaps across 4+ user-correction rounds. Rather than fix per-page, batched as DS-level changes so next consumer page inherits fixes.
**Decision:** Ship 8 P0 items in one pass:
- A. Recipe source-of-truth headers — added `**Source-of-truth files**` block to top of `report-store-listing.md` + `case-study.md`. Pre-empts "wrong file" cloning bug (cloned legacy `FiltersPanel.tsx` when prod uses `IndustrySidebar.tsx`).
- B. 5 semantic token groups in `design-system/tokens/tokens.json` (`semantic.ink`, `ink-on-dark`, `hairline`, `hairline-on-dark`, `surface-tint`, `surface`, `scrim`, `brand-red-alpha`) → rebuilt `tokens.css` w/ `--semantic-*` namespace. Replaces 323 ad-hoc rgba literals across page files.
- C. `SectionWrapper` `bg="warm-darker"` option (`warm-400`) — closes "every page works around missing warm-darker bg" pattern.
- D. `ResourceCard` `metaSlot?: ReactNode` prop (canonical DS) — closes negative-margin sibling-div hack.
- E. `SidebarPanel` `style?: CSSProperties` prop — closes Tailwind-class-only width prop limitation (`w-[280px]` arbitrary class anti-pattern).
- F. New atom `<ImageOverlayBadge>` (DS public) — collapses RS-v07 `IMAGE_BADGE_OVERRIDES` + `ResourceCard` `CardBadge` + ad-hoc inline glassmorphism wrappers. WCAG AAA contrast over images. Themes: brand · neutral · success · warm.
- G. `skills/aura-design/SKILL.md` "Source-mirror checklist" section — 8-step pre-build/during-build/post-build process. Forcing function before next consumer-page build.
- H. `design-system/catalogs/ken-research.ts` — canonical `INDUSTRIES` (14), `REGIONS` (6), `COUNTRIES_BY_REGION`, `COUNTRIES` (23), `TRENDING_TAGS` (10), `METHODOLOGY_LABELS`, `COMPETITOR_SET_SIZES`. Single source for all consumer pages.
**Alternatives rejected:**
- New `consumer-page-builder` skill (rejected: skill bloat per `feedback_anti_bloat.md`; appended to existing aura-design instead).
- New `recipe-conformance-gate` (rejected: already done per ken-v2 LEARNINGS Phase 2).
- Per-recipe `source-truth.md` files (rejected: inline header line in existing recipe is lighter).
- DS drift check script (deferred: wait for 2 more consumer pages before automating — premature optimization).
**Tied to:** `docs/LEARNINGS.md` 2026-05-06 entries (DS-sync hierarchy + DS gaps + CheckboxFilterSection bridging + ResourceCard metaSlot patterns); `competition-benchmarking-listing-v01/`.
**Reversal trigger:** if `--semantic-*` token namespace conflicts w/ another DS layer (e.g. variant override system at section-bg level), revisit prefix scheme. None expected.
**Status:** active.

### 2026-04-30 — Installed `impeccable` skill (gated, opt-in only)
**Context:** User ran `npx skills add pbakaus/impeccable` — wanted install + regulation to limit blast radius given risk scores.
**Decision:**
- Installed v3.0.5 to `~/.claude/skills/impeccable/` + `~/.agents/skills/impeccable/` via manual git clone (interactive CLI prompt blocked stdin auto-confirm; clone of `pbakaus/impeccable` `.claude/skills/impeccable/` subtree is functionally identical to CLI install).
- Risk scores at install time: **Snyk Med · Gen High · Socket 0 alerts**. Source: https://skills.sh/pbakaus/impeccable.
- Gated via two layers:
  1. `skills/SKILL_ROUTING.md` — added entry + "gated usage" block: opt-in, in-scope frontend only, never auto-mutate, prefer `aura-design`/`expert-ui-ux-designer` for Ken-grounded work.
  2. `workflows/ROUTING.md` — added `impeccable-polish` workflow: 5 steps with confirm-before-mutate, brand-divergence revert, `Bash(npx impeccable *)` shown before run.
- Allowed-tool from SKILL.md frontmatter (`Bash(npx impeccable *)`) is acknowledged but governed by step 2 of workflow (show command first).
**Alternatives:**
- Skip install (rejected: user explicit ask).
- Install with no governance (rejected: Gen High = wide capability surface; without rules, conflicts with `aura-design` brand discipline).
- Install only universal `~/.agents/skills/` (rejected: Antigravity/Claude Code reads `~/.claude/skills/` first; universal+claude dual-install matches CLI behavior).
- Run skill with full auto-confirm (rejected: live-inject + file-edit subcommands need per-change OK).
**Tied to:** `~/.claude/skills/impeccable/SKILL.md` v3.0.5, `skills/SKILL_ROUTING.md` (impeccable rows), `workflows/ROUTING.md` (`impeccable-polish` workflow), `pbakaus/impeccable` GitHub repo.
**Reversal trigger:** Snyk score → High · Socket alerts > 0 · skill conflicts repeatedly with Ken brand → uninstall via `npx skills remove impeccable -g` + remove governance entries.
**Status:** superseded by 2026-05-08 "`impeccable` un-gated, full-use approved"

---

### 2026-04-30 — Model routing recalibrated to fine-grained use-case map + new `aura-mech` Haiku template
**Context:** User asked: "haiku is light, sonnet medium, opus higher level — re-calibrate task process and workflows according to use-cases." Prior rule was binary Haiku eligibility per workflow step. Real cost-quality optimum needs finer triggers + hard-never lines.
**Decision:**
- 5-tier ladder: **L0 Haiku (`aura-mech`) · L1 Sonnet (`aura-builder` build / `aura-qa` validate) · L2 Opus (main) · L3 Explore · L4 Plan.**
- Use-case map: Haiku gets locked-scope mechanical (≤3 files, exact spec, no stack nuance). Sonnet gets stack-aware build/refactor (5-15 files). Opus gets ambiguity, synthesis, brand/token/architecture, 5+ md synthesis, routing decisions.
- New `aura-mech.md` template (Haiku) at both `.claude/agents/` + `workflows/agents/` (dual-path synced). Boundary check: refuses + escalates if scope unclear or stack-touching.
- `aura-builder.md` + `aura-qa.md` updated w/ "Boundary check" section: refuse + escalate when task should be Haiku (cheaper) or Opus (judgment).
- `feedback_model_routing.md` memory rewritten as fine-grained use-case map w/ decision tree + spawn patterns.
- `workflows/ROUTING.md`: model-ladder table updated (5 tiers + decision tree); per-workflow Agent columns updated for `pre-handover` (L0/L1/L2 mix per step), `content-update` (L0 default), `refactor` (L0 if tight scope), `bug-fix` (L0 if Opus pre-decided), `quick-answer` (3-way Opus/Explore/Haiku); spawn pattern section rewritten w/ 5 example invocations.
- `CLAUDE.md` model-routing section: 3-tier ladder → 5-tier table + decision tree summary.
**Alternatives:**
- Keep binary eligibility (rejected: user explicit recalibration request; binary misses 30%+ of workflow steps where Haiku safe).
- Add only Haiku triggers, no boundary checks (rejected: silent escalation = harder to debug; explicit refuse pattern is safer).
- Build all 4 deferred Aura agents (motion, critic, etc.) at once (rejected: validate `aura-mech` Haiku pattern first; 1 new template is enough new surface).
**Tied to:** `feedback_model_routing.md`, `aura-builder.md`, `aura-qa.md`, `aura-mech.md` (new), `workflows/ROUTING.md`, `CLAUDE.md` model-routing section.
**Reversal trigger:** (1) Haiku quality regression observed twice in same workflow → tighten scope or remove from workflow. (2) Boundary-check refusal becomes friction (Sonnet refuses too often) → soften criteria. (3) New tier needed (e.g. Opus subagent for parallel synthesis) → add L2.5.
**Status:** active.

### 2026-04-30 — New skill `aura-design`, deprecate generic `expert-ui-ux-designer`
**Context:** User asked: upgrade `expert-ui-ux-designer` into Ken-specific design second brain for webpages/dashboards/flows/UX/UI. Current skill = 72-line generic Creative Director persona, zero Ken awareness. Research (3 parallel Sonnet agents) surfaced: strategic wedge (design-led × emerging-market depth), 5-surface taxonomy, 2 brand variants (cinematic dark + editorial light), Ken-specific anti-patterns (Tier A moves we beat), voice rules ("verified > vibes"), 9 design ref playbooks (Linear/Stripe/Hex/Apple Books/etc.), token-aware decision trees needed.
**Decision:** Create new `aura-design` skill (separate dir, doesn't disrupt skill loader for existing references). Deprecate `expert-ui-ux-designer` w/ pointer to `aura-design` for Ken work; preserve original at `SKILL.original.md` for archaeology + generic non-Ken use. **Phase 1 only** ships now: SKILL.md (entry, persona, decision-engine routing) + 1 example surface (`surfaces/03-report-viewer.md`) + `anti-patterns.md` + `voice.md`. Phase 2 (other 4 surfaces + 5 decision trees + 2 brand-variant detail files + workflow chain files) deferred until pattern validated.
**Alternatives:** Edit `expert-ui-ux-designer` in place (rejected: high disruption, existing references would break, no archaeology trail); name `aura-designing-works` per literal user wording (rejected: clean dir name `aura-design` matches Aura naming convention; user spirit not literal); ship all phases at once (rejected: per CEO scope-reduction framework — validate pattern first w/ 1 surface, bulk-fill after user reviews).
**Tied to:** `skills/aura-design/` dir, `skills/expert-ui-ux-designer/SKILL.md` + `SKILL.original.md`, `SKILL_ROUTING.md`, `INDEX_BY_CATEGORY.md`, `FOLDER_CONTEXT.md`, `CLAUDE.md` skill-routing table.
**Reversal trigger:** Pattern in Phase 1 doesn't fit user mental model → restructure before Phase 2. OR user finds split-file structure too fragmented → consolidate into single SKILL.md (loses on-demand load benefit but simpler).
**Status:** active. Phase 2 build = next session w/ user approval.

### 2026-04-30 — Path A (separate repos per project) + pnpm workspace-wide + handover discipline + version-stay-modern
**Context:** Design team owns 7 projects, hands each to tech team when ready. User asked: should we centralize deps (monorepo) or keep separate? Researched Vercel/Netlify free tiers, handover practices, kenresearch.com prod stack (Next 14 / React 18 / Radix / shadcn / Tailwind / NextAuth / AWS+Nginx). User decisions: tech adapts to our versions, no Vercel previews now (local-only), per-project handover when complete, new versions = new folders.
**Decision:**
- **Path A** (separate repos per project, NOT monorepo). Each `projects/*` standalone — own `package.json`, own boot, own handover. Tech merges one app at a time, zero monorepo learning curve.
- **pnpm** workspace-wide (single pkg manager, content-addressed store saves ~2GB disk via hardlinks). `packageManager: "pnpm@10.33.0"` + `engines.node: ">=20"` in every `package.json`.
- **Stay on current versions** (Next 15.5, React 19, Tailwind 4) — tech team adapts, no downgrade.
- **Handover gate** (13 points) per `HANDOVER_TRACKER.md`. `STATUS.md` + `HANDOVER.md` + `README.md` mandatory before `ready-for-tech`. Templates at `templates/`.
- **Versioning rule:** handed-over folders are read-only. New iteration → copy to `<name>-v<n+1>/`. No silent overwrite, no merge conflict w/ tech.
- **No Vercel/Netlify wiring now** — local only, free tier wiring deferred until user explicitly says preview URLs needed.
**Alternatives:**
- Monorepo (pnpm workspaces + Turborepo) — rejected: tech team must adopt monorepo too if not already; bigger refactor at handover; uncertain prod tooling.
- Hybrid (DS as npm package, apps separate) — rejected: extra publish step, dep duplication still happens.
- Match prod versions (Next 14 / React 18 / Tailwind 3) — rejected: user explicit "they will adapt."
- Wire Vercel previews — deferred: user explicit "local only for now."
**Tied to:** `HANDOVER_TRACKER.md`, `templates/*.template`, `workflows/ROUTING.md` `pre-handover` workflow, `feedback_handover_discipline.md` memory, `aura-builder.md` + `aura-qa.md` (handover-aware), CLAUDE.md Scope + Handover discipline sections.
**Reversal trigger:** (1) tech team confirms they use monorepo (Turborepo/Nx) in prod → re-evaluate Path B. (2) Stakeholder previews need Vercel URLs → wire `vercel.json` per app. (3) Design starts sharing components across 3+ apps actively → DS becomes installable npm package.
**Status:** active.

### 2026-04-29 — Install graphify (knowledge graph skill) + flip caveman to full mode
**Context:** User asked for graphify install + caveman full after research showed graphify is real (37.8k★, 71.5× token reduction on large corpora). Caveman default was lite per earlier DECISION.
**Decision:** Installed Python 3.12.13 + graphify v1 via `uv` (no sudo, isolated tool install at `~/.local/share/uv/tools/graphifyy`). Wired skill to both Claude Code (`~/.claude/skills/graphify/`) and Antigravity (`~/.agents/skills/graphify/`). Set caveman default to `full` (was `lite`).
**Alternatives:** Path A python.org installer (rejected: needed sudo); Path B Homebrew (rejected: needed sudo + interactive password); SKILL.md only (rejected: no real indexing); keeping caveman lite (rejected: user explicit request).
**Tied to:** `~/.local/bin/uv`, `~/.local/bin/graphify`, `~/.config/caveman/config.json`, `~/.claude/skills/graphify/`, `~/.agents/skills/graphify/`. Python 3.12.13 isolated to graphify tool venv.
**Reversal trigger:** graphify quality issues, OR user finds caveman full unreadable for design discussion (high probability — was the original lite reason).
**Status:** active. **Supersedes:** caveman default mode lite (2026-04-29 entry below — user explicitly chose full).

### 2026-04-29 — Dual-path: native `.claude/agents/` + workflow templates coexist
**Context:** Markdown templates were the original choice (Antigravity compatibility). User installed native `.claude/agents/aura-builder.md` + `aura-qa.md` w/ proper Claude Code frontmatter post-rename. Both paths now exist.
**Decision:** Keep both. CLI uses native (`subagent_type: "aura-builder"` direct). Antigravity uses templates (paste-into-prompt). Same agent persona, two surfaces.
**Alternatives:** Native only (rejected: breaks Antigravity); templates only (rejected: CLI users lose auto-pick from `description:` frontmatter); symlink (rejected: native needs frontmatter, template doesn't — file structures differ).
**Tied to:** `.claude/agents/*.md` + `workflows/agents/*.md` files. Sync risk: edits to one must propagate to other.
**Reversal trigger:** Antigravity adds native `.claude/agents/` support → drop templates, rely on native only. OR sync drift causes bug → consolidate to one path.
**Status:** active. **Supplements** "Use markdown templates over native `.claude/agents/`" entry above (not supersedes — both true now).

### 2026-04-29 — Rename agent persona Atlas → Aura
**Context:** User requested rename. "Aura" = Auto UI Rendering Agent.
**Decision:** Replace Atlas with Aura everywhere — CLAUDE.md, ROUTING.md, agent templates, all memories, DECISIONS, LEARNINGS, CHANGELOG. Rename agent files: `atlas-builder.md` → `aura-builder.md`, `atlas-qa.md` → `aura-qa.md`. Updated deferred-agent names in this file (`aura-motion`, `aura-critic`).
**Alternatives:** Keep Atlas + add "aka Aura" alias (rejected: confuses search/grep, half-rename); rename only user-facing surfaces (rejected: inconsistent — memory + templates would still call me Atlas).
**Tied to:** All workspace docs + memory files. `CLAUDE.original.md` not renamed (historical backup, intentional).
**Reversal trigger:** User reverts the request, OR persona name conflicts w/ another tool/skill named Aura.
**Status:** active.

### 2026-04-29 — Use markdown templates over native `.claude/agents/`
**Context:** Setting up custom Aura subagents (`aura-builder`, `aura-qa`).
**Decision:** Store as markdown spawn templates in `workflows/agents/`, paste into `Agent` prompt at spawn time.
**Alternatives:** Native `.claude/agents/<name>.md` (rejected: Antigravity IDE doesn't read this dir, only Claude Code CLI does); inline brief on every spawn (rejected: 50+ tokens of repeat briefing per spawn).
**Tied to:** Antigravity IDE behavior, Claude Code CLI subagent loader.
**Reversal trigger:** Antigravity adds native `.claude/agents/` support. Then symlink templates → native dir.
**Status:** active.

### 2026-04-29 — Default caveman mode to `lite`, not `full`
**Context:** Caveman skill install. Three intensity levels available.
**Decision:** Default `lite` (drop filler, keep grammar).
**Alternatives:** `full` (rejected: too aggressive — design discussion needs grammar/connective tissue for UX-law tradeoffs); `ultra` (rejected: unreadable for design work); `off` (rejected: defeats purpose).
**Tied to:** Caveman config at `~/.config/caveman/config.json`.
**Reversal trigger:** User reports `lite` still too verbose, OR design discussion stops being readable in `full` mode.
**Status:** archived (superseded by "Install graphify + flip caveman to full mode" 2026-04-29 — user explicit override).

### 2026-04-29 — 3-tier model ladder: Opus / Sonnet / Haiku
**Context:** Cost-quality optimization across workflow steps.
**Decision:** Opus for reasoning/judgment. Sonnet for builds w/ stack knowledge. Haiku for clear-spec mechanical (content swap, lookup, lint, locked-scope refactor). **Never Haiku for shadcn/GSAP/Framer/Tailwind v4.**
**Alternatives:** 2-tier (Opus + Sonnet) — rejected: Haiku is ~3× cheaper on mechanical work, real savings; All-Sonnet — rejected: overpays for trivial tasks; All-Opus — rejected: cost.
**Tied to:** Per-workflow eligibility rules in `workflows/ROUTING.md`.
**Reversal trigger:** Haiku quality regression observed twice in same workflow → tighten or remove from that workflow.
**Status:** active.

### 2026-04-29 — Compress files loaded every turn, skip lean tables
**Context:** Caveman compression on workspace docs.
**Decision:** Compress `CLAUDE.md` (20% byte cut) + `skills/SKILL_ROUTING.md` (50%). Skip `Quick_start_guide.md` (already lean tables, low yield).
**Alternatives:** Compress all docs (rejected: low yield on table-heavy files); compress none (rejected: CLAUDE.md loads every turn, recurring savings).
**Tied to:** `.original.md` backups exist for both compressed files.
**Reversal trigger:** User finds compressed version unreadable → restore from `.original.md`.
**Status:** active.

### 2026-04-29 — Solo workflow: CHANGELOG only, no formal SESSIONS or ADRs
**Context:** Setting up Aura-infra logging. Considered SESSIONS daily logs, formal ADR docs, decision logs separate from learnings.
**Decision:** One `docs/CHANGELOG.md` for Aura-infra changes. `DECISIONS.md` + `LEARNINGS.md` for content. No daily SESSIONS log (git history + chat history cover it).
**Alternatives:** Full ADR + SESSIONS + CHANGELOG (rejected: team-coordination tools, user is solo); no logs at all (rejected: Aura would re-decide same forks).
**Tied to:** Solo design lead workflow. Re-evaluate if team grows.
**Reversal trigger:** User onboards a teammate → add SESSIONS for handoff context.
**Status:** active.

### 2026-04-29 — Build agents on real signal, not speculation
**Context:** Considered 4 custom agent templates (`aura-builder`, `aura-qa`, `aura-motion`, `aura-critic`).
**Decision:** Ship 2 (builder + qa). Defer motion + critic.
**Alternatives:** All 4 (rejected: motion rules already in `project_animation_stack.md` memory, no agent file needed; critic is judgment work, belongs in main Opus thread where reasoning is visible to user).
**Tied to:** Workflow library in ROUTING.md.
**Reversal trigger:** User says "I keep wishing motion/critic had its own agent" twice → build it.
**Status:** active.

### 2026-04-29 — Trim build plan: 40 min, defer 5 items w/ trigger conditions
**Context:** Risk-mitigation infra plan was 65 min (10 phases). CEO-framework review.
**Decision:** Build 7 phases (~40 min). Defer pre-edit budget hook, hook health check, watch-list staleness, audit script, 2 extra forcing functions. Each deferred item has explicit trigger condition.
**Alternatives:** Full 10-phase build (rejected: premature — no drift observed yet to justify hooks/scripts); minimal 30 min (rejected: skipped subagent return format which has architectural coupling — lost-data trap).
**Tied to:** CEO scope-reduction framework from `skills/plan-ceo-review/SKILL.md`.
**Reversal trigger:** Each deferred item has its own trigger logged here when fired.
**Status:** active.

---

## Archive

(empty)
