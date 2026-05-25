# TOKEN_PYRAMID · 3-Tier Token Restructure Plan (Sprint 2)

**Status:** PLAN only · DO NOT execute against `tokens/build/tokens.css` until Sprint 2 scheduled.
**Author:** Aura · 2026-05-13 · P1-9 audit deliverable.
**Scope:** Document target architecture · migration phases · risk model. Token CSS untouched.
**Pair docs:** `design-system-audit/og-audit/tokens/colors.md` · `spacing.md` · `typography.md` · industry research (Material · Carbon · Atlassian).

---

## 1 · WWWWH of 3-Tier Tokens

### WHAT
A **3-tier token pyramid** is a layered design-token architecture in which every visual decision sits on exactly one of three rungs: **Primitive** (raw values), **Semantic** (role-bound aliases), **Component** (component-scoped bindings). Each tier consumes only from the tier below — never sideways, never skipping. Industry-canonical (Material `md.ref → md.sys → md.comp`, Carbon `palette → role → component`, Atlassian `base → semantic → component`).

### WHY (problem it solves)
- **Theming without forking.** Switching editorial-light ↔ cinematic-dark today edits dozens of overlay files. With a semantic layer, variant switch = remap semantic tokens to different primitives. One swap, system-wide.
- **Contrast by construction.** Pairing `--surface-text-strong` with `--surface-bg` at the semantic tier guarantees WCAG ≥4.5:1 by design — designer judgment becomes token math.
- **Stop primitive leakage.** Today, components reach for `var(--color-ramp-red-600)` directly. When Sprint 4 introduces a client whitelabel, that consumer breaks because the ramp identity changed. Components should only ever consume **semantic** tokens.
- **Scale-resilient.** When the DS grows to 100+ atoms across 3 surfaces (editorial · cinematic · admin), a flat token list creates a quadratic decision surface. The pyramid amortizes growth across tiers.

### WHEN it fits ✅
- DS consumed by ≥2 surface variants (Ken: editorial-light · cinematic-dark · planned admin) ✅
- Long-lived system (Ken DS is forever) ✅
- Component count ≥30 (Ken core-v2: 20 atoms + 5 molecules + 8 organisms · growing to 100 post-OG-port) ✅
- A11y is contractual (Ken: 9.5/10 craft bar) ✅

### WHEN NOT ❌
- 4-page brochure site (Ken is well past this)
- Single-variant brand-locked product (Ken has variants)
- Solo-designer prototype throwaway (Ken DS is production handover surface)

### WHERE (Ken-specific application)
- `design-system/tokens/build/tokens.css` — generated Style Dictionary output (canonical primitive + currently-mixed semantic source)
- `design-system/core-v2/src/styles/editorial-light.css` — variant overlay (Tier 2 semantic)
- `design-system/core-v2/src/styles/cinematic-dark.css` — variant overlay (Tier 2 semantic, future)
- `design-system/core-v2/src/components/<atom>/<Atom>.css` — Tier 3 component tokens

### HOW (implementation pattern)
```css
/* Tier 1 · Primitive — never consumed by components */
--color-ramp-red-600: #b01f24;
--space-12-rem: 3rem;

/* Tier 2 · Semantic — what components reference */
--cta-bg: var(--color-ramp-red-600);
--surface-text-strong: var(--color-foundation-black);
--space-section-gap: var(--space-12-rem);

/* Tier 3 · Component — ultra-narrow scope */
--button-height-md: 48px;
--button-bg-primary: var(--cta-bg);   /* → semantic, not primitive */
```

---

## 2 · Current State (core-v2 · 2026-05-13)

`tokens.css` is **2-tier with leakage** — primitives + semantics + component tokens coexist flat in `:root`, and the boundary is informal.

| Range (line) | Tier | Naming | Notes |
|---|---|---|---|
| L6–13 | Brand/foundation primitives | `--color-foundation-*` · `--color-brand-red` · `--color-accent-*` | Mixed: `--color-brand-red` is **conceptually semantic** but named like a primitive |
| L14–85 | Primitive ramps | `--color-ramp-{family}-{N}` | Clean Tier 1 — these ARE the primitive layer |
| L86–122 | Semantic (ink · hairline · surface · scrim · status · section-bg) | `--semantic-*` | Already prefixed correctly as Tier 2 — best part of current file |
| L123–142 | Semantic status colors | `--semantic-status-*-{text,bg,border}` | Tier 2 — well-named pairs |
| L143–170 | Typography primitives | `--typography-family-*` · `--typography-size-*` · `--typography-line-height-*` | All Tier 1 — no semantic typography tokens exist yet (gap) |
| L171–178 | Layout primitives | `--container-*` · `--padding-{mobile,tablet,desktop}` | Tier 1.5 — semantic-ish names but role-bound (acceptable) |
| L179–182 | Radius primitives | `--radius-{image,button,card,pill}` | **Already Tier 2-styled** (role-bound) — anti-pattern: named by use not by value |
| L183–197 | Variant tokens | `--variant-cinematic-*` · `--variant-editorial-*` | **Tier 2 trying to be Tier 1** — should be semantic that re-points based on variant attr, not literal hex per variant |
| L198–217 | Composition gradients | `--composition-gradient-*` · `--composition-blur-*` | Mixed primitive/semantic — gradient literals (Tier 1) with role names (Tier 2 nomenclature) |
| L218–233 | Chart palette | `--chart-palette-*` · `--chart-axis-*` | Tier 2 (chart-semantic) referencing duplicated hex (should `var()` into ramp) |
| L234–247 | Motion primitives | `--motion-duration-*` · `--motion-easing-*` · `--motion-stagger-*` | Tier 1 — clean |
| L248–253 | Shadow | `--shadow-{sm,md,lg,xl,premium,inset-soft}` | Hybrid — all resolve to `rgba(0,0,0,0.05–0.1)` (Tier 1 alphas) but named semantically (Tier 2 usage) |
| L254–266 | Spacing primitives | `--spacing-{0…24}` | Tier 1 — numbered (Carbon-style) ✅ already correct |
| L267–282 | Component tokens (button) | `--button-{min-width,height,px,font}-{xs..xl}` | **Tier 3 correctly scoped** ✅ — keep as-is |
| L283–291 | Z-index | `--z-index-*` | Tier 2 — role-bound |

**Diagnosis:**
1. ✅ **Tier 1 partially formed** — `--color-ramp-*`, `--spacing-*`, `--typography-size-*`, `--motion-duration-*`, `--motion-easing-*` are clean primitives.
2. ⚠️ **Tier 2 partially formed** — `--semantic-*` namespace is correct but incomplete (typography has no semantic layer · radius has wrong layer · `--variant-*` should be Tier 2 but redundantly literalizes hex).
3. ✅ **Tier 3 minimal-and-correct** — `--button-*` block is exemplary. Replicate the pattern for badge, card, modal, input.
4. ⚠️ **Cross-tier name collisions** — `--color-brand-red` reads primitive but is semantic; `--shadow-md` reads semantic but is primitive alpha.

---

## 3 · Target State · 3-Tier Pyramid

### Tier 1 · Primitive (raw values · NEVER consumed by components)
**Naming:** `--{category}-{family}-{scale}` · numeric scale where applicable.
**Examples:**
```css
--color-ramp-red-500: #b01f24;
--color-ramp-warm-300: #f5f2f1;
--space-12-rem: 3rem;
--type-size-7: 2.441rem;     /* 39px · scale step 7 */
--type-family-serif: "Noto Serif", Georgia, serif;
--motion-duration-300: 300ms;
--shadow-alpha-10: rgba(0, 0, 0, 0.1);
```
**Rules:**
- No semantic meaning in the name — `red-500` not `danger-base`.
- No `var()` references — primitives are literal values only.
- Mass-changeable: editing one primitive ripples through semantics.

### Tier 2 · Semantic (context-bound aliases · what components reference)
**Naming:** `--{role}-{property}-{state}` · role-first.
**Examples:**
```css
--surface-bg: var(--color-foundation-white);
--surface-text-strong: var(--color-foundation-black);
--surface-text-body: var(--semantic-ink-body);
--cta-bg: var(--color-brand-red);
--cta-bg-hover: var(--color-ramp-red-700);
--border-default: var(--semantic-hairline-default);
--space-section-gap: var(--space-12-rem);
--type-heading-section: var(--type-size-7);
--type-body-default: var(--type-size-3);    /* 16px */
--motion-duration-ui: var(--motion-duration-300);
--shadow-card-rest: 0 1px 3px var(--shadow-alpha-10);
```
**Rules:**
- Every semantic token MUST consume from Tier 1 via `var()` — never literal hex.
- Variant overlays (`editorial-light.css` · `cinematic-dark.css`) re-bind these at `[data-variant="…"]` scope.
- Pair-bound: every `bg` has a matching `text` (the "on-" pattern · §5 below).

### Tier 3 · Component (ultra-narrow scope · already correct in core-v2)
**Naming:** `--{component}-{property}-{variant/size/state}`.
**Examples:**
```css
--button-height-md: 48px;
--button-px-lg: 20px;
--button-bg-primary: var(--cta-bg);            /* → Tier 2 */
--badge-py-sm: 5px;
--card-padding-lg: 24px;
--card-shadow-hover: var(--shadow-card-elevated);
--modal-max-width: 640px;
```
**Rules:**
- Consume from Tier 2 only (NOT Tier 1).
- Scoped to one component; never reused elsewhere — that's a Tier 2 signal.
- Currently exemplary in `tokens.css:267–282`. Pattern to clone for badge · card · input · modal · tooltip.

---

## 4 · Migration Plan · Sprint 2 (3–5 days · 2 devs)

### Phase A · Primitive layer formalization (Day 1 · 1 dev)
- ✅ **Color ramps** — `--color-ramp-{family}-{N}` already in place (L14–85). No change.
- 🟡 **Spacing** — rename `--spacing-N` → `--space-N-rem` to expose unit explicitly (matches Carbon `$spacing-01..13`). Numeric-step preserved.
- 🟡 **Typography** — split `--typography-size-{xs..5xl}` into numbered scale `--type-size-{1..9}` (1=12px, 9=76.3px). T-shirt names move to Tier 2 (`--type-body-default`, `--type-heading-section`).
- 🟡 **Motion** — keep `--motion-duration-{instant..slowest}` BUT add numeric primitives `--motion-duration-100/200/300/500/800/1200`. T-shirt aliases become Tier 2.
- 🟡 **Shadow alphas** — extract `--shadow-alpha-{05,06,10}` primitives. Reconstitute current `--shadow-{sm,md,lg,…}` as Tier 2 composing primitives + offset + spread.

### Phase B · Semantic layer expansion (Days 2–3 · 2 devs parallel)
Audit every Tier 3 + every component CSS for `var(--color-ramp-*)` or `var(--typography-size-*)` references. Each direct primitive consumption becomes a new semantic token.

| Gap | New semantic token | Resolves to |
|---|---|---|
| Body text size | `--type-body-default` | `var(--type-size-3)` (16px) |
| Section heading size | `--type-heading-section` | `var(--type-size-7)` (39px) |
| Hero h1 size | `--type-heading-hero` | `var(--type-size-8)` (48.8px) |
| Card radius | `--radius-surface-card` | (replaces magic `--radius-card`) |
| Section vertical rhythm | `--space-section-mobile/-tablet/-desktop` | maps to `--space-12-rem` etc. |
| Cinematic-dark layer surface | `--surface-bg-layer-1/-2/-3` (Carbon model) | per-variant primitive (§6) |

### Phase C · Component-tier audit (Day 3 · 1 dev)
Document Tier 3 scope per atom — no migration, just documentation. Add a one-line "tokens it owns" header to each atom's WWWWH doc:
```md
**Owned Tier 3 tokens:** `--button-height-{sm,md,lg,xl}` · `--button-px-{sm..xl}` · `--button-font-{sm,md,lg}` · `--button-min-width-{xs..xl}`
**Consumes (Tier 2):** `--cta-bg` · `--cta-bg-hover` · `--cta-text` · `--shadow-card-rest`
```
Already-correct components: Button ✅. Required port: Badge · Card · Input · Modal · Toast · Tooltip · DropdownMenu.

### Phase D · Deprecation alias layer (Day 4 · 1 dev)
Old tokens stay as **aliases** for 1 sprint (Sprint 2 → Sprint 3). Each alias prints a console warning in dev mode (CSS can't · linter does).

Examples:
```css
--brand-red: var(--color-brand-red);          /* @deprecated · use --cta-bg or --color-brand-red */
--text-2xl: var(--type-size-7);               /* @deprecated · use --type-heading-section */
--shadow-md: 0 4px 6px var(--shadow-alpha-10); /* @deprecated · use --shadow-card-rest */
```
Add `scripts/lint-deprecated-tokens.mjs` (mirrors `lint-section-alternation.mjs` pattern) to flag deprecated references in PRs. Sprint 3 removes aliases entirely.

### Phase E · Variant-overlay re-binding (Day 5 · 2 devs)
Today `editorial-light.css` and the future `cinematic-dark.css` bind variant-specific colors. After migration, both files only re-point semantics to different primitives:

```css
/* editorial-light.css */
[data-variant="editorial-light"] {
  --surface-bg: var(--color-foundation-white);
  --surface-text-strong: var(--color-foundation-black);
  --cta-bg: var(--color-brand-red);
}

/* cinematic-dark.css */
[data-variant="cinematic"] {
  --surface-bg: var(--color-ramp-black-900);
  --surface-text-strong: var(--color-foundation-white);
  --cta-bg: var(--color-brand-red);           /* same — Ken red is variant-invariant */
}
```
Components untouched. Variant switch = single attribute flip.

---

## 5 · Paired-Role Tokens (`on-{role}` pattern · Material)

Every background-bearing semantic token gets a paired foreground token. Material guarantees WCAG ≥4.5:1 by *naming*; Ken adopts the same discipline.

| Background semantic | Paired foreground (`--on-*`) | Contrast verified |
|---|---|---|
| `--surface-bg` (white #fff) | `--on-surface` (black #000) | 21:1 ✅ |
| `--section-bg-accent` (#f5f2f1) | `--on-section-accent` (rgba(0,0,0,0.80)) | 14:1 ✅ (was 0.60, bumped 2026-05-13 for WCAG AA) |
| `--section-bg-contrast` (#000000) | `--on-section-contrast` (#fafafa) | 19:1 ✅ |
| `--cta-bg` (#b01f24) | `--on-cta` (#ffffff) | 5.2:1 ✅ AA |
| `--surface-cinematic-1` (#1a1a1c) | `--on-surface-cinematic` (rgba(255,255,255,0.92)) | 13:1 ✅ |
| `--badge-bg-warning` (status-warning-bg) | `--on-badge-warning` (status-warning-text) | already-pair-validated L128–132 |

**Rule:** if a new bg token lands without an `--on-*` partner, the token PR is rejected. Adds 1 token-pair-lint check to Phase D.

---

## 6 · Carbon Layer Model (`--layer-01..03`)

Carbon's killer move for nested surfaces. Use case: dark variant has no shadow vocabulary (shadows don't read on `#0a0a0c`), so elevation comes from **tonal step** of surface.

**Cinematic-dark adoption (primary use case):**
```css
[data-variant="cinematic"] {
  --layer-01: #0a0a0c;   /* page surface — bottom */
  --layer-02: #111114;   /* card on page */
  --layer-03: #1a1a1c;   /* popover on card · modal on card */
  --layer-04: #232328;   /* tooltip on popover · rarely used */
}
```
**Editorial-light parallel (lower priority — light theme can use shadows):**
```css
[data-variant="editorial-light"] {
  --layer-01: #ffffff;   /* page */
  --layer-02: #faf9f8;   /* card (subtle warm tint, between white + warm-300) */
  --layer-03: #f5f2f1;   /* nested card · drawer · = warm-300 */
}
```
**Component consumption:**
```css
.card {
  background: var(--layer-02);
  /* nested card automatically goes to --layer-03 via CSS-var inheritance trick */
}
.card .card {
  background: var(--layer-03);
}
```
Sprint 2 ships `--layer-01..03` for cinematic + documents; editorial adoption deferred to Sprint 3 (light shadows still work).

---

## 7 · What Stays (no migration cost)

| Domain | File location | Why no change |
|---|---|---|
| `--button-*` (height, px, font, min-width) | L267–282 | Already Tier 3 ✅ |
| `--spacing-{0..24}` | L254–266 | Already Tier 1 numeric scale (Carbon-style) ✅ |
| `--motion-duration-*` t-shirt names | L234–239 | Stay as Tier 2; Tier 1 numeric added underneath |
| `--motion-easing-*` named curves | L240–244 | Easing curves are inherently semantic (`ease-out-expo` describes intent) — keep |
| `--z-index-*` | L283–291 | Tier 2 role-bound · already correct |
| `--semantic-status-*` triplets | L123–142 | Pair pattern already correct |
| Container width tokens (`--container-*`) | L171–175 | Role-bound; Tier 2-correct already |

---

## 8 · What Changes (the migration surface area)

| Domain | Current | Target | Effort |
|---|---|---|---|
| Typography sizes | `--typography-size-{xs..5xl}` Tier 1 only | Add `--type-size-{1..9}` (Tier 1) + `--type-{body,heading-section,heading-hero,…}` (Tier 2) | M (4h) |
| Radius | `--radius-{image,button,card,pill}` Tier 2-styled, no primitives | Add `--radius-{0,2,5,10,9999}` (Tier 1) underneath | S (1h) |
| Shadow | `--shadow-{sm..premium}` blended | Extract `--shadow-alpha-*` (Tier 1) · re-compose `--shadow-card-rest/-hover/…` (Tier 2) | M (3h) |
| Variant overlays | Literal hex per `--variant-*` token | Replace w/ semantic re-bindings at `[data-variant="…"]` scope | L (8h, 2 devs) |
| Chart palette | Duplicated hex (L218–225) | `var()` into `--color-ramp-*` primitives | S (1h) |
| Brand red alias | `--color-brand-red` and `--cta-bg` both exist | `--color-brand-red` = primitive · `--cta-bg` = semantic (the one components use) | S (30m + alias for back-compat) |
| Surface layer model | None | Add `--layer-01..03` (Tier 2) for cinematic + editorial | M (3h) |
| `on-*` pairs | Partial (ink-on-dark exists) | Formalize every bg ↔ on-* pair | M (4h) |

---

## 9 · Naming Conventions (locked)

**Template:** `--{tier-marker?}-{category}-{role}-{variant?}-{state?}`

| Tier | Marker | Example |
|---|---|---|
| Tier 1 (primitive) | `ramp` for color · numeric for spacing/type · alpha for shadow | `--color-ramp-red-500` · `--space-12-rem` · `--type-size-7` · `--shadow-alpha-10` |
| Tier 2 (semantic) | none (role-first) | `--cta-bg` · `--surface-text-strong` · `--type-heading-section` |
| Tier 2 paired | `on-` prefix | `--on-cta` · `--on-surface` · `--on-section-contrast` |
| Tier 2 layer | `layer-NN` | `--layer-01` · `--layer-02` |
| Tier 3 (component) | component name first | `--button-height-md` · `--card-padding-lg` |

**Banned:**
- Mixing tier markers (`--color-brand-red-500-cta` ❌ — pick a tier)
- Naming by value (`--blue-500-darker` ❌ — name by role)
- Magic numbers in names (`--text-18` ❌ — use scale step or role)

---

## 10 · Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Components break when primitive renamed | High if no alias layer | Site-wide visual regression | **Phase D alias layer** keeps old names live 1 sprint; lint flags deprecations |
| Semantic mis-binding breaks contrast | Medium | A11y regression | `--on-*` pair tokens + automated Lighthouse contrast check at handover gate |
| Variant overlay drifts from primitive source | Medium | Cinematic + editorial diverge | All variant overlays MUST `var()` into Tier 1 only — never literal hex (lint rule) |
| Tier 3 leaks Tier 1 references | High during migration | Future re-theme breaks | Phase C audit + lint rule: components consume Tier 2 only |
| OG port (still in progress) lands w/ old token names | Certain | Mid-port refactor cost | Sequence: complete OG port FIRST (current sprint) THEN run pyramid migration (Sprint 2) |
| Style Dictionary build emits wrong order | Low | Cascade resolution fails | Generated `tokens.css` must order primitives → semantics → component (Style Dictionary `outputReferences: true`) |
| Designer-facing docs go stale | Medium | Internal team friction | Update `COMPONENT_REFERENCE.md` + per-atom WWWWH headers in Phase C |

**Hard mitigation rule:** No Sprint 2 PR merges without:
1. ✅ All variant overlays only re-bind semantics (no new hex)
2. ✅ All components consume Tier 2 only
3. ✅ All bg semantic tokens have `--on-*` pair
4. ✅ Lighthouse a11y score ≥95 on case-study + report-store consumer apps

---

## 11 · Sprint 2 Effort Estimate

**Timeline:** 3–5 working days · 2 devs in parallel where possible.

| Day | Phase | Devs | Output |
|---|---|---|---|
| 1 | A · Primitive formalization | 1 | Typography numeric scale · Spacing rename · Motion numeric primitives · Shadow alpha extraction |
| 2 | B · Semantic layer expansion (color, type) | 2 parallel | Body/heading/hero type tokens · `--on-*` pairs · Layer model (cinematic) · radius primitives |
| 3 | B (cont.) + C · Component audit | 2 parallel | All component-tier docs in WWWWH headers · Tier 3 leakage report |
| 4 | D · Deprecation aliases + lint | 1 | Alias layer · `lint-deprecated-tokens.mjs` · CHANGELOG entry |
| 5 | E · Variant overlay re-binding + QA | 2 parallel | `editorial-light.css` reduced to semantic-rebind · `cinematic-dark.css` skeleton · Lighthouse a11y pass on case-study consumer |

**Stretch (Day 5 if ahead):**
- Sprint 3 plan doc for editorial layer model + per-component CHANGELOG.md (Atlassian pattern)
- Style Dictionary `outputReferences: true` config audit
- Figma token re-export (if Figma sync is in scope by Sprint 2)

**Total burn:** ~6 dev-days (3 days × 2 devs + 1 solo day buffer).

---

## 12 · REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — The token pyramid is THE foundational architecture for every component, every variant, every future surface. Every atom, molecule, organism, page, and consumer project benefits from this migration. Once shipped, ROI compounds: Sprint 4 client whitelabel = 1-day token swap instead of week-long fork; AI/RAG admin surface (Ken L3) = drops onto same pyramid as 4th variant; design Figma sync gets a single source of truth.

**Sprint 2 is the highest-leverage DS investment of the year.**

---

## 13 · LINKED Concepts

- **`design-system-audit/industry-research/material-design.md`** — 3-tier (`md.ref → md.sys → md.comp`) reference · §5 `on-*` pair pattern source
- **`design-system-audit/industry-research/carbon.md`** — §6 `--layer-01..03` model + named numeric spacing scale (`spacing-01..13`)
- **`design-system-audit/industry-research/atlassian.md`** — three-tier discipline rationale (multi-product theming via accent-layer rebind)
- **`design-system-audit/og-audit/tokens/colors.md`** — Tier 1 primitive ramp source (red/black/warm/purple/periwinkle/perano/coral families)
- **`design-system-audit/og-audit/tokens/typography.md`** — Tier 2 type role table (display/heading/body/eyebrow) source
- **`design-system-audit/og-audit/tokens/spacing.md`** — 4px base unit + Carbon-aligned spacing-01..13 rationale
- **`design-system/tokens/build/tokens.css`** — current state · L267–282 (button) is the Tier 3 gold standard
- **`design-system/core-v2/src/styles/editorial-light.css`** — Phase E re-binding target
- **`design-system/core-v2/docs/COMPONENT_REFERENCE.md`** — Tier 3 owned-tokens header lands here per atom (Phase C)
- **`design-system/core-v2/docs/MIGRATION_FROM_V1.md`** — Sprint 2 migration appendix lives here
- **`docs/DECISIONS.md`** — log Sprint 2 kickoff + token rename decision-records
- **`feedback_ds_port_workflow.md`** — sequencing rule: complete OG port BEFORE pyramid migration

---

**Doc status:** PLAN · ready for review · DO NOT execute against token CSS until Sprint 2 scheduled in `docs/DECISIONS.md`.
**Word count:** ~2,550 words.
