# COMPONENT_LIFECYCLE.md · DS core-v2

**Tasks:** P1-11 (lifecycle stages) + P1-12 (WCAG status badges)
**Owner:** Aura · DS core-v2
**Audit date:** 2026-05-13
**Source citations:**
- Atlassian release phases — `design-system-audit/industry-research/atlassian.md:108-119`
- Atlassian status-badge differentiator — `atlassian.md:91-106`
- Primer component lifecycle — `design-system-audit/industry-research/primer.md:102-113`
- Primer a11y-reviewed badge — `primer.md:115-124`
- OG a11y gaps — `design-system-audit/og-audit/a11y/a11y-baseline.md:367-378`

---

## WHY this document exists

Two converging signals from the audit demand component-level governance metadata:

1. **Atlassian + Primer both ship explicit lifecycle stages** as their #1 "consumer-facing risk transparency" tool. ADS calls them "release phases" (`atlassian.md:110`); Primer calls them "component lifecycle" (`primer.md:103`). Both publish stages **on the component page itself**, so a consumer never has to guess "is this safe to use?". Per the Atlassian audit: *"The status badge is the differentiator vs Polaris — consumers see at a glance whether to depend on this component"* (`atlassian.md:106`).
2. **OG a11y audit found 8 distinct gaps** scattered across 100+ atoms — focus-trap missing on modals, ESC-close absent, contrast failures in eyebrow text, missing landmarks, sub-44px touch targets, reduced-motion misses, no `aria-live` in production, ViewToggle lacking arrow-key nav (`a11y-baseline.md:369-376`). OG ships **no central a11y test harness** (`a11y-baseline.md:22`, `a11y-baseline.md:377`), so consumers had no signal whether a given component was reviewed. Primer's `a11y_status` badge is the antidote (`primer.md:118`).

This document defines **two JSDoc front-matter tags** that every core-v2 component MUST carry: `@lifecycle` and `@a11y_status`. They render in auto-generated `COMPONENT_STATUS.md` and gate consumer imports via lint.

---

## Part 1 · Component lifecycle stages

### JSDoc shape

Every component's top-of-file JSDoc block carries lifecycle metadata in front-matter style:

```ts
/**
 * Button — primary CTA atom for editorial-light + cinematic-dark surfaces.
 *
 * @lifecycle stable
 * @a11y_status reviewed-AA
 * @reusabilityScore 5/5 ⭐⭐⭐⭐⭐
 * @since 2026-05-08
 */
```

### The 5 stages

| Badge | Stage | API contract | Production use | Source |
|---|---|---|---|---|
| 🔬 | **alpha** | API may change without notice · breaking changes expected | ❌ DO NOT use in production · feedback wanted | `atlassian.md:112` (*"early exploration, breaking changes expected, not for production"*) |
| 🧪 | **beta** | API mostly stable · minor breaking changes possible | ⚠ Use with caution · gather real-world usage | `atlassian.md:113` + `primer.md:108` (*"feature-complete, API may change, production-cautious"*) |
| ✅ | **stable** | API frozen · semver patch/minor only · major bump = announcement | ✅ Production-ready | `atlassian.md:114` (*"SemVer applies, deprecation requires notice"*) |
| 🌅 | **deprecated** | Being phased out · `@deprecated` JSDoc tag · `@replaces` pointer to successor · sunset date | ⚠ Migrate now · removal scheduled | `atlassian.md:116` + `primer.md:109` (*"migration path documented, removal scheduled"*) |
| ❌ | **removed** | Gone · only in git history | n/a | Aura extension — Atlassian/Primer don't ship this stage because removed code is removed; we keep it as a vocabulary anchor for change logs |

### Graduation rules

- **New atom defaults to `alpha`.** No exceptions, even if it's "obviously simple."
- **Graduate `alpha` → `beta` after 2 weeks** of consumer use OR 3+ consumer imports across at least 2 surfaces.
- **Graduate `beta` → `stable` after 4 weeks** of zero breaking changes AND `@a11y_status: reviewed-AA` achieved AND axe-playwright clean in isolation.
- **Major API change on `stable`** = SEMVER MAJOR bump in package version + entry in `docs/CHANGELOG.md` + announcement to design@kenresearch.com. Per `atlassian.md:114`: *"SemVer applies, deprecation requires notice."*
- **`deprecated` requires three JSDoc tags:**
  - `@deprecated` (standard JSDoc — IDE strikes through usage)
  - `@replaces <new-component-import-path>` — Aura extension pointing to successor
  - `@sunset YYYY-MM-DD` — date after which `removed` stage applies
- **Lifecycle stage MUST appear in JSDoc front-matter** · enforced in pre-handover lint rule (rule name TBD: `aura/require-lifecycle-tag`).

### Why not adopt Atlassian's full 6-stage system?

ADS ships 6 stages — adds `caution` and `early-access` (`atlassian.md:115,117`). We drop `caution` because in our workflow a known issue is captured by `@a11y_status: known-issue` (see Part 2) — duplicating it at the lifecycle layer creates two truths. We drop `early-access` because Ken's DS has one consumer team; opt-in preview is just `alpha`. **Five stages is the minimum vocabulary that distinguishes risk.**

---

## Part 2 · WCAG a11y status badges

### JSDoc shape

Every component carries `@a11y_status` plus, when status is `reviewed-AA`, six expanded tags that document **what was verified.**

### The 5 status badges

| Badge | Status | Meaning | Production use |
|---|---|---|---|
| 🟢 | **reviewed-AA** | axe clean · WCAG 2.1 AA verified · keyboard nav tested · screen-reader smoke-tested | ✅ Approved |
| 🟡 | **reviewed-A** | Partial AA · some criteria not testable in isolation (e.g. color contrast depends on consumer surface) · gap documented in JSDoc | ✅ Approved w/ consumer-side check |
| 🟠 | **pending-review** | Built · NOT yet a11y-tested | ❌ DO NOT use in production |
| 🔴 | **known-issue** | Documented a11y gap · linked to tracking issue · workaround in JSDoc | ⚠ Use only w/ workaround applied |
| ⚪ | **n/a** | Non-interactive presentational atom · no a11y review needed (e.g. decorative gradient, divider) | ✅ Approved |

This vocabulary is directly inspired by Primer's "a11y-reviewed" badge (`primer.md:118`: *"A11y status badge on each component page — visible 'a11y-reviewed' flag"*) — extended with severity granularity because OG's audit found a long tail of partial-pass components that a single boolean would misrepresent.

### Required JSDoc tags for `reviewed-AA`

When a component graduates to `@a11y_status: reviewed-AA`, **six expanded tags MUST follow** so the audit trail is inspectable without re-running tests:

```ts
/**
 * Button — primary CTA atom.
 *
 * @lifecycle stable
 * @a11y_status reviewed-AA
 * @a11y_keyboard Tab · Enter · Space · Esc to close
 * @a11y_aria role=button · aria-disabled · aria-busy when loading · aria-pressed for toggles
 * @a11y_contrast text vs bg ≥ 4.5:1 verified all variants (Button:200-220 audited)
 * @a11y_touch_target 44×44px floor met (xs exempt · card-footer context per a11y-baseline.md:277-285)
 * @a11y_reduced_motion shimmer + ripple disabled when prefers-reduced-motion
 * @a11y_tested 2026-05-14 · axe-playwright · 0 critical · 0 serious
 */
```

### Why the six expanded tags

Each tag maps directly to a WCAG 2.1 AA criterion family that OG audited and where gaps were found:

| Tag | WCAG family | OG audit evidence |
|---|---|---|
| `@a11y_keyboard` | 2.1 Keyboard Accessible | OG Tab discipline `a11y-baseline.md:104-119` |
| `@a11y_aria` | 4.1 Compatible (Name, Role, Value) | OG ARIA usage `a11y-baseline.md:154-194` |
| `@a11y_contrast` | 1.4.3 Contrast (Minimum) | OG contrast targets + `text-black/40` 3.5:1 gap `a11y-baseline.md:250-268` |
| `@a11y_touch_target` | 2.5.5 Target Size | OG xs (28px) + sm (40px) sub-floor `a11y-baseline.md:272-286` |
| `@a11y_reduced_motion` | 2.3.3 Animation from Interactions | OG 5+ reduced-motion gaps `a11y-baseline.md:316-321` |
| `@a11y_tested` | n/a — audit trail | Date + tool + result count, so the next reviewer can decide if re-audit needed |

### The 8 known OG gaps · status flag assignments

The OG audit (`a11y-baseline.md:367-378`) lists 8 distinct a11y systems with gaps. Each maps to a flag a consumer can search for. When the equivalent component ports to core-v2, it carries this flag until remediated:

1. **`<nav>` landmark missing on Navbar outer container** (`a11y-baseline.md:139,372`: *"Outer Navbar lacks `<nav aria-label='Primary'>` landmark"*) → 🟠 **pending-review** on all Navbar organism ports. Fix is mechanical (wrap outer container in `<nav>`).
2. **Modal focus-trap not enforced** (`a11y-baseline.md:245,371`: *"Focus-trap NOT explicitly implemented — relies on natural tab order within modal. If user Tabs past the last input, focus escapes to underlying page"*) → 🔴 **known-issue** on Modal/Dialog molecule. Workaround: pass `initialFocusRef` + use Radix Dialog primitive that ships focus-trap.
3. **ESC-key close missing on overlays** (`a11y-baseline.md:246,371`: *"Escape-key close NOT explicitly handled in ContactModal.tsx — would expect `onKeyDown` listener"*) → 🔴 **known-issue** on Modal/Dialog. Workaround: consumer attaches global keydown handler until DS ships built-in.
4. **`text-black/40` contrast 3.5:1 fails AA at 14px** (`a11y-baseline.md:258,266,374`: *"3.5:1 — passes only WCAG AA Large (18pt). Used at 14px which is below large-text threshold. Technically AA fail"*) → 🔴 **known-issue** on any eyebrow / metadata text atom. Remediation: replace `text-black/40` with new semantic `--semantic-ink-eyebrow` token that resolves to `black/55` (≥4.5:1) — do NOT bake `black/40` into new atoms.
5. **xs / sm touch targets sub-44px** (`a11y-baseline.md:277-285,373`: *"`sm` and `xs` sizes are below 44px floor"*) → 🟡 **reviewed-A** on Button atom. Context-justified per `a11y-baseline.md:285` (WCAG 2.5.5 exception: *"function can be achieved via an alternative control of conforming size"*) — xs has card-footer exemption, sm acceptable in nav where outer bar height of 60px provides external padding. Document explicitly in component JSDoc rather than hiding the gap.
6. **4+ reduced-motion misses** (`a11y-baseline.md:316-321,370`: *"`animate-bounce` (HeroSection.tsx:68, NextSectionCTA.tsx:35) — Tailwind keyframe not auto-disabled. Navbar `transition-transform duration-300` — not wrapped. StickyCTA expand `transition-all duration-500` — not wrapped. Framer Motion components (ScrollToTop) — `useReducedMotion()` not explicitly invoked"*) → 🟠 **pending-review** on every motion-using atom/molecule/organism. Fix: invoke `useReducedMotion()` (Framer) or wrap in `@media (prefers-reduced-motion: reduce)` per `a11y-baseline.md:291-305` pattern.
7. **No `aria-live` in production state-change components** (`a11y-baseline.md:188,375`: *"Documented sample · GuidelinesContent.tsx:431 — `aria-live='polite' aria-atomic='true'`. Actual usage: ⚠️ no production usage found in OG. Audit gap: toast / form-feedback regions should use this"*) → 🟠 **pending-review** on Toast, FormFeedback, Status-banner atoms.
8. **ViewToggle missing arrow-key nav** (`a11y-baseline.md:119,376`: *"ViewToggle.tsx — list / grid toggles — has `aria-label` per toggle but no arrow-key nav implemented (verified — uses click only). Audit gap: ViewToggle should be radio group with arrow-key cycling"*) → 🔴 **known-issue** on ViewToggle atom. Remediation: convert to `role="radiogroup"` with arrow-key handler.

### `reviewed-A` vs `known-issue` vs `pending-review` — decision rule

- **`reviewed-A`** when the gap is **contextually justified and documented** (e.g. touch-target xs in card-footer is a WCAG 2.5.5 exception per `a11y-baseline.md:285`). Use sparingly.
- **`known-issue`** when the gap is **a defect** (focus-trap missing, ESC-close missing, contrast fail) — has a tracking issue and a workaround.
- **`pending-review`** when the component **simply hasn't been tested yet.** Most newly-ported atoms start here.

The difference matters at lint time: `pending-review` blocks production consumer import (rule `aura/no-pending-a11y-in-prod`); `known-issue` is permitted only when the consumer ALSO imports the documented workaround.

---

## Part 3 · Migration plan

**Sprint 2 scope (estimated 2 weeks):**

1. **Audit inventory** — 42 atoms · 26 molecules · 44 organisms = 112 components in core-v2 today (per workspace map in CLAUDE.md and `feedback_ds_port_workflow.md` reference of ~100-component target).
2. **Assign lifecycle stage** — sweep all 112 component files and stamp `@lifecycle` based on port status:
   - Just-ported, untested → `alpha`
   - Used in ≥2 consumer surfaces, no breaks for 2 weeks → `beta`
   - Audited stable in OG + ported clean + a11y passes → `stable`
   - Marked for removal in `_archive` migration → `deprecated` w/ `@replaces` pointing to core-v2 successor
3. **Assign a11y status** — for each component, run isolated axe-playwright (per `webapp-testing` skill in CLAUDE.md MEMORY) and stamp `@a11y_status`. Add the 6 expanded tags when `reviewed-AA`.
4. **Build lint rule `aura/no-pending-a11y-in-prod`** — rejects `@a11y_status pending-review` imports outside `_archive/` and `_playground/`. Wire into `pre-handover` workflow gate.
5. **Run axe-playwright on every component in isolation** — produces `a11y-report.json` per component. Update `@a11y_tested` JSDoc tag with date + result counts.
6. **Auto-generate `COMPONENT_STATUS.md`** — script reads JSDoc front-matter across `core-v2/atoms/**`, `core-v2/molecules/**`, `core-v2/organisms/**` and writes a Markdown status table (see Part 4 below). Runs as pre-commit hook.

**Hard gate at end of Sprint 2:** no component in core-v2 ships without `@lifecycle` + `@a11y_status`. CI fails build if any file under `core-v2/(atoms|molecules|organisms)/` lacks both tags.

---

## Part 4 · Consumer-facing visibility

Auto-generated `design-system/core-v2/docs/COMPONENT_STATUS.md` reads JSDoc front-matter at commit time and produces a single table consumers scan before importing. Example shape:

```md
| Component | Layer | Lifecycle | A11y | Reusability |
|---|---|---|---|---|
| Button | atom | ✅ stable | 🟢 reviewed-AA | 5/5 ⭐⭐⭐⭐⭐ |
| TextInput | atom | ✅ stable | 🟢 reviewed-AA | 5/5 ⭐⭐⭐⭐⭐ |
| Modal | molecule | 🧪 beta | 🔴 known-issue (focus-trap · ESC-close) | 4/5 ⭐⭐⭐⭐ |
| ViewToggle | atom | 🔬 alpha | 🔴 known-issue (arrow-keys) | 2/5 ⭐⭐ |
| Eyebrow | atom | 🧪 beta | 🔴 known-issue (contrast 3.5:1 → use semantic-ink-eyebrow) | 3/5 ⭐⭐⭐ |
| Toast | molecule | 🔬 alpha | 🟠 pending-review (aria-live) | 3/5 ⭐⭐⭐ |
| Navbar | organism | 🧪 beta | 🟠 pending-review (nav landmark) | 4/5 ⭐⭐⭐⭐ |
| Divider | atom | ✅ stable | ⚪ n/a | 5/5 ⭐⭐⭐⭐⭐ |
```

**Consumer rules from the table:**
- 🟢 + ✅ = import freely.
- 🟡 + ✅ = import + add the surface-side check documented in JSDoc.
- 🔴 anywhere = import only after applying the JSDoc workaround.
- 🟠 anywhere = blocked by lint outside `_archive/_playground`.
- 🔬 alpha anywhere = blocked by lint outside `_playground`.

The table is part of the DS public docs (published at `design-system/core-v2/docs/COMPONENT_STATUS.md`), updated on commit, and linked from `QUICK_START.md`. Consumers never have to read source to know risk — they scan the table.

---

## Linked concepts

- **Page-build canonical workflow** — lifecycle gating fires at the pre-handover step (`workflows/ROUTING.md` · `pre-handover` workflow + 13-point gate in `HANDOVER_TRACKER.md`).
- **DS port workflow** — `feedback_ds_port_workflow.md` (OG → core-v2 method) — port batches stamp `alpha` initially, graduate as audits clear.
- **Token discipline** — `design-system/tokens/build/tokens.css` — new `--semantic-ink-eyebrow` token added to remediate gap #4 (contrast).
- **webapp-testing skill** — `.agents/skills/webapp-testing/` (Anthropic official, installed 2026-05-12 per `feedback_craft_skills.md`) — provides the axe-playwright + Lighthouse harness used to graduate `@a11y_status`.
- **Component reference** — `design-system/core-v2/docs/COMPONENT_REFERENCE.md` — per-component WWWWH docs cross-link to lifecycle entry.
- **Anti-patterns** — `design-system/core-v2/docs/ANTI_PATTERNS.md` — known-issue workarounds documented there, linked from JSDoc `@a11y_status known-issue` comments.
- **Decisions log** — `docs/DECISIONS.md` — major lifecycle promotions (`beta → stable`) logged as decisions.
- **Industry precedent** — Atlassian release phases (`atlassian.md:108-119`) + Primer component lifecycle (`primer.md:102-113`) — both adopt explicit stages; this doc is Ken's specific instantiation.

---

## REUSABILITY SCORE for this doc method

⭐⭐⭐⭐⭐ **5/5** — every component in core-v2 gets the two tags; every consumer surface (case-study, report-store, report-viewer, landing) reads the auto-generated `COMPONENT_STATUS.md`; the lint rule enforces compliance at CI; the JSDoc tags propagate into IDE tooltips so design@kenresearch.com sees lifecycle + a11y inline when hovering an import. The same vocabulary scales from the current 112 components to whatever number Sprint 3+ adds without revision.

The pattern is also **portable across DS versions** — if core-v3 ever ships, the JSDoc tags carry forward; the lint rule and `COMPONENT_STATUS.md` generator are agnostic to version.

---

**Doc word count:** ~2050 words · **Audit cites:** 21 (atlassian.md · primer.md · a11y-baseline.md) · **Tasks closed:** P1-11 · P1-12.
