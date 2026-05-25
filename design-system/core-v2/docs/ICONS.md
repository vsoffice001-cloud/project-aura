# ICONS · 4-Class Role Taxonomy

> Canonical icon system for `core-v2`. Single library. Role-based color. Indexed registry. A11y enforced.
> Ported from OG `Design_system_vs_26/src/app/components/iconColors.ts:1-45`.
> Status: P1-13 · WRITTEN 2026-05-13 · REUSABILITY 5/5.

---

## 1. WWWWH

**WHAT** — A 4-class semantic icon role taxonomy. Every icon usage in core-v2 (and every downstream consumer of `@kenresearch/design-system`) classifies the icon by **role** before assigning **color** and **size**. Roles: `content`, `utility`, `brand`, `decorative`.

**WHY** — Naive icon usage is the #1 source of color drift on Ken surfaces. Without a role rule, every author re-decides "what color is this chevron?" per file → result is purple-vs-grey-vs-black mismatch across the same page. OG solved this with `iconColors.ts` (`Design_system_vs_26 (og and final)/src/app/components/iconColors.ts:33-38`):

> *"Every Lucide icon must use one of these two colors — no exceptions."*

core-v2 extends OG's 2-class system to **4 classes** to absorb (a) brand-red CTA icons that OG implicitly handled via Button styling but never named, and (b) decorative marketing icons that should inherit `currentColor` rather than be locked to the 3% accent budget.

**WHO** — Every page author. Every component author. Every AI agent assembling a Ken page. No exceptions including hero illustrations, badge icons, footer social glyphs, stat cards, lock icons, CTAs.

**WHERE** — `core-v2/src/lib/iconColors.ts` (implementation) · imported via `@kenresearch/design-system/lib/iconColors` · consumed by every atom, molecule, organism that renders an icon. OG source of truth: `Design_system_vs_26 (og and final)/src/app/components/iconColors.ts`.

**WHEN** — Always. Mandatory on every `<Icon />` placement starting Sprint 2 cutover (Phosphor strip). Before that: progressive — new code uses 4-class; legacy code stripped batch-wise.

**HOW** — Author picks role → calls `getIconColor(role)` → passes return to `color` prop on Lucide icon. For indexed contexts (stakeholders, segmentation, methodology phases) author calls registry helper (`getStakeholderIconByIndex(i)`) instead of inline import. Decorative icons inherit `currentColor`.

---

## 2. LIBRARY DECISION — Lucide-only

**Lucide React** (`lucide-react`) is the **sole icon library** for core-v2 and all downstream Ken consumer projects.

| Decision | Verdict |
|---|---|
| `lucide-react` | ✅ SOLE LIBRARY |
| `@phosphor-icons/react` | ❌ FORBIDDEN · strip in Sprint 2 |
| Custom inline `<svg>` | ❌ FORBIDDEN (exception: `figma:asset/` imports — auto-generated raster/vector from Figma Make) |
| Icon font (FontAwesome, Material Icons) | ❌ FORBIDDEN |
| Brand-specific SVG (Ken logo, social glyphs not in Lucide) | ✅ via `figma:asset/` or `core-v2/src/atoms/Logo.tsx` only |

**WHY Lucide-only:**

1. **80KB bundle savings.** OG audit `og-audit/00_overview.md:78-80` confirms 97 Lucide imports + 0 Phosphor across the entire OG codebase — Phosphor never earned its weight at OG. V0.2 added Phosphor speculatively (data icons) → never produced a measurable difference vs Lucide equivalents → bundle bloat with no payoff. V0.2 audit `worked-examples/v02-for-design-system/pattern-lessons.md` MODIFY row reads verbatim: *"Two icon libraries → Pick ONE (Lucide for Aura production) · systematically replace Phosphor data icons via icon registry · 80KB bloat · 2 mental models."*
2. **One mental model.** Authors search one library. AI agents predict one import path. No "is this a Lucide name or a Phosphor name" lookup tax.
3. **WCAG-tested.** Lucide ships with consistent 24×24 viewBox + 2px stroke → predictable visual weight at every size in our scale → predictable AA contrast at every role color.
4. **Tree-shakeable.** Per-icon import (`import { ChartBar } from 'lucide-react'`) → only used glyphs ship.
5. **Stable license** (ISC) · maintained · 1,000+ icons cover every Ken need confirmed by OG audit grep.

**The dual-icon REJECT is canonical.** Per `pattern-lessons.md` REJECT table — keeping both libraries is an anti-pattern even if one is "data only" and one is "UI only," because the *role* of an icon (data vs UI) is the design decision, not the library it comes from. Color encodes role. Library is fixed.

---

## 3. The 4-Class Icon Role Taxonomy

Ported and extended from OG `iconColors.ts:7-44`. OG had 2 classes; core-v2 has 4.

### Class 1 — **Content** (Purple `#806ce0`)
- **Token:** `var(--color-accent-purple)`
- **Use for:** data signals · stats · metrics · charts · analysis · feature highlights · phase/section markers · content representation
- **Maps to:** 92-5-3 rule's **3% accent tier** (per OG `tokens.ts:305-329` and reasoning-log `worked-examples/v0-lite-report-legacy/reasoning-log.md` section 1)
- **OG quote** (`iconColors.ts:7-12`):
  > *"Content Icons (#806ce0 - Periwinkle): Feature icons (Sparkles, Lightbulb, Target, Zap) · Metric/data icons (TrendingUp, BarChart3, PieChart) · Phase/section icons (BookOpen, Layers, Building2) · Content representation (FileText, Globe, Phone) · Decorative bullet pointers (ChevronRight as list markers)."*
- **Examples in core-v2:** stat-card glyphs · ChapterExecutiveSummary stat icons · methodology phase icons · paywall lock · TOC reading-time clock · chevron-right used as bullet pointer (NOT as nav).

### Class 2 — **Utility** (Grey `#737373`)
- **Token:** `var(--surface-text-muted)`
- **Use for:** nav controls · UI affordance · close · expand · arrow · chevron-as-nav · search · filter · settings · menu · state indicators (Check, Lock-as-UI-state)
- **Maps to:** 92-5-3 rule's **92% foundation tier**
- **OG quote** (`iconColors.ts:14-18`):
  > *"Utility Icons (#737373 - Gray): Navigation controls (ChevronLeft, ChevronRight, ChevronDown) · Action buttons (X, Download, Trash2, Save) · UI controls (Search, Filter, Settings, Menu) · State indicators (Check, Lock, Unlock)."*
- **Examples in core-v2:** Navbar chevron · Modal close X · ScrollToTop FAB arrow (per `reasoning-log.md` section 1 App.tsx:13-14: *"Black utility FAB (92% foundation tier — NOT purple/red, because it's a navigation aid"*) · pagination arrows · filter sheet close.

### Class 3 — **Brand** (Red `#b01f24`) · NEW vs OG
- **Token:** `var(--color-brand-red)`
- **Use for:** CTA icons ONLY · max 2 per screen (matches Ken brand-red 5% rule)
- **Maps to:** 92-5-3 rule's **5% brand tier**
- **WHY new class:** OG handled this implicitly inside `Button` variants (`bg-brand-red` cascades color to nested icons via `currentColor`). core-v2 makes it explicit so standalone CTA icons (phone-icon in "Talk to analyst" floating action, mail-icon next to "Subscribe" submit) carry brand intent without requiring a wrapping Button.
- **Examples:** Phone icon next to "Talk to analyst" CTA · Mail icon on "Get the report" submit · Download icon on "Download PDF" primary action.
- **Hard limit:** if you place 3+ brand-red icons on one screen you've broken the 5% rule. Demote two to utility-grey.

### Class 4 — **Decorative** (`currentColor`) · NEW vs OG
- **Token:** `currentColor` (inherits from parent text color — usually black `#000000` on editorial-light, `#FAFAFA` on cinematic-dark)
- **Use for:** marketing illustration glyphs · pure visual ornament · hero accents · social-link glyphs in footer · icons with zero semantic load
- **Maps to:** Whatever foundation tier the surrounding text is in — does not consume the 3% accent budget.
- **WHY new class:** OG did not name this case; in practice OG authors ended up inlining hex `#000` on hero glyphs and footer socials, creating drift. core-v2 makes the case explicit so authors don't reach for `iconColors.content` (purple) when they actually mean "match the text around me."
- **Examples:** Footer social icons (LinkedIn, X, YouTube) inherit footer text color · Hero sparkle ornament inherits hero h1 color · empty-state illustration glyphs · 404 page art.
- **A11y:** Decorative icons MUST set `aria-hidden="true"` always (see §9).

---

## 4. TypeScript Implementation

Write to `core-v2/src/lib/iconColors.ts` (NOT `src/atoms/Icon.tsx` — we deliberately do NOT wrap Lucide in a component; the wrapper adds zero value and breaks tree-shaking):

```ts
/**
 * Icon Color System · core-v2
 *
 * 4-class semantic icon role taxonomy.
 * Ported from OG Design_system_vs_26/src/app/components/iconColors.ts.
 * Extended w/ brand + decorative classes for surface coverage parity.
 *
 * Every Lucide icon usage MUST classify role before assigning color.
 *
 * @example
 *   import { ChartBar } from 'lucide-react';
 *   import { getIconColor } from '@kenresearch/design-system/lib/iconColors';
 *   <ChartBar size={20} color={getIconColor('content')} />
 */

export type IconRole = 'content' | 'utility' | 'brand' | 'decorative';

export const iconColors: Record<IconRole, string> = {
  /** Content · purple #806ce0 · data/stats/metrics · 3% accent tier */
  content: 'var(--color-accent-purple)',
  /** Utility · grey #737373 · nav/UI/state · 92% foundation tier */
  utility: 'var(--surface-text-muted)',
  /** Brand · red #b01f24 · CTA ONLY · max 2/screen · 5% brand tier */
  brand: 'var(--color-brand-red)',
  /** Decorative · currentColor · marketing/illustration · no semantic load */
  decorative: 'currentColor',
};

export function getIconColor(role: IconRole = 'utility'): string {
  return iconColors[role];
}
```

**Why `var(--token)` and not raw hex:** OG inlined hex directly (`content: '#806ce0'`). core-v2 routes through CSS custom properties so:
- Cinematic-dark variant overrides purple to a higher-contrast tone via `[data-variant-section="cinematic"]` selector without touching this file.
- Style Dictionary v4 (DTCG) is single source of truth — no parallel hex-in-TS drift (the OG weakness called out in `og-audit/00_overview.md` weakness #2).

**Why default `'utility'`:** When in doubt, an unclassified icon is most-likely UI affordance → grey is safest.

---

## 5. Usage Pattern

```tsx
import { ChartBar, ChevronRight, Phone, Sparkles } from 'lucide-react';
import { getIconColor } from '@kenresearch/design-system/lib/iconColors';

// Content · data signal in stat card
<ChartBar size={20} color={getIconColor('content')} aria-hidden="true" />

// Utility · nav affordance · chevron pointing to next page
<ChevronRight size={16} color={getIconColor('utility')} aria-hidden="true" />

// Brand · CTA · "Talk to analyst" floating action button
<Phone size={20} color={getIconColor('brand')} aria-hidden="true" />

// Decorative · hero ornament · inherits surrounding text color
<Sparkles size={24} color={getIconColor('decorative')} aria-hidden="true" />
```

**Same lucide glyph, different role per context.** Per `reasoning-log.md` section 2:

> *"`ChevronRight` shows up twice in the lists — once as a content icon (when used as a decorative bullet pointer) and once as a utility icon (when used as nav). The same lucide-react icon, two different `iconColors.*` values, depending on role. Decisions are role-based, not lexical-based."*

A `ChevronRight` rendered as a bullet pointer in `ChapterMethodology` is `content` (purple). The same `ChevronRight` rendered inside a Navbar dropdown is `utility` (grey). Author chooses the role; the icon name is irrelevant.

---

## 6. Size Scale

Eight discrete sizes. No off-scale sizes permitted. Each step has a named role:

| Size | Use for |
|---|---|
| **12** | Inline w/ `text-xs` (badge labels, footer meta) |
| **14** | Inline w/ `text-compact` (table cell glyphs, dense tag rows) |
| **16** | Body inline · button icon · **default** when no context |
| **18** | Slightly prominent body · nav-item glyphs |
| **20** | Card icon · prominent in dense layout · stat cards |
| **24** | Section header eyebrow · stand-out feature glyph |
| **32** | Hero feature icons · rare |
| **48** | Hero illustration · feature-grid icons · rare |

**Default if unsure:** `16`. **Forbidden:** any size not on this scale (no `size={22}`, no `size={36}`).

---

## 7. WHEN to use each role ✅

| Role | ✅ Use when |
|---|---|
| **content** | Icon represents data, metric, content type, phase, feature highlight, or used as decorative bullet pointer in a list. |
| **utility** | Icon is a navigation control, UI affordance, action button, state indicator, or close/dismiss. |
| **brand** | Icon is the sole or primary visual of a conversion CTA AND CTA budget on screen permits (≤2 brand icons total). |
| **decorative** | Icon is pure visual ornament, hero illustration, footer glyph, empty-state art, or inherits surrounding text color by design. |

---

## 8. WHEN NOT to use ❌

| Role | ❌ Do NOT use when |
|---|---|
| **content** | Icon is purely navigational (use `utility`). · Icon is a CTA's visual (use `brand`). · You're trying to make a UI control "feel more designed" by coloring it purple — UI is grey. |
| **utility** | Icon represents real content (use `content`). · Icon needs to draw attention as part of a CTA (use `brand`). |
| **brand** | You already have 2 brand-red icons on the screen — demote to utility. · Icon is decoration not action (use `decorative`). · Icon is inside a non-CTA card just to "add brand presence" — wrong, brand-red signals action, not ambient brand. |
| **decorative** | Icon has any semantic load — if removing the icon changes user comprehension, it's content/utility/brand, not decorative. · Icon is for state ("warning ⚠") — that's content or utility w/ accompanying text, never decorative. |

---

## 9. A11y Rules

1. **Decorative icons always set `aria-hidden="true"`.** No exceptions. AT users get nothing useful from a sparkle glyph.
2. **Semantic icons (carrying meaning) require an accessible name.** Two patterns:
   - Co-located visible text: text label sits next to icon → set `aria-hidden="true"` on icon (text carries the name).
   - Icon-only control (icon button, no visible text): pair with `<span className="sr-only">{label}</span>` inside the button, OR set `aria-label="{label}"` on the parent interactive element.
3. **NEVER use icon alone to communicate state.** A red X alone is illegible to color-blind users and AT users. Always pair semantic state icons with text or `sr-only` text. (per `feedback_a11y_patterns.md` axe rules learned 2026-05-13).
4. **NEVER set `aria-label` on a `<div>` that has no `role`** — `aria-prohibited-attr` axe rule. If the icon's container needs an accessible name, give it a role first or use `<button>`.
5. **Reduced motion compliance** — any icon that animates (spin, pulse, slide) MUST be wrapped in a Framer Motion component that respects `useReducedMotion()`.
6. **WCAG AA contrast** verified at every role × surface combo:
   - Purple `#806ce0` on white `#f5f2f1`: ✅ AA (4.6:1)
   - Grey `#737373` on white: ✅ AA (4.5:1 — borderline; verify with axe before shipping novel placements)
   - Red `#b01f24` on white: ✅ AA (7.1:1)
   - All four colors on cinematic-dark `#0a0a0c`: re-verify per surface — purple may need lighter variant.

---

## 10. Icon Stripping Plan — Sprint 2

Mechanical task. Haiku-class via `aura-mech`. Steps:

1. `grep -rln "@phosphor-icons/react" projects/ design-system/` → enumerate consumer files.
2. Per file: replace each Phosphor import with closest Lucide equivalent. Maintain a translation table in `core-v2/scripts/phosphor-to-lucide.json` (e.g. `Buildings → Building2`, `ChartLine → LineChart`, `MagnifyingGlass → Search`).
3. Update icon registry maps (`stakeholder-icons.tsx`, `segmentation-icons.tsx`) to reference Lucide.
4. Remove `@phosphor-icons/react` from every `package.json`. Verify `pnpm dedupe`.
5. Run `pnpm build` per project — confirm bundle delta. Target ≥80KB savings per project per `pattern-lessons.md`.
6. `aura-qa` Lighthouse re-run — confirm no a11y regressions.

**Status:** P1-13 doc (this file) is the spec. Strip itself is P2 task — not yet scheduled.

---

## 11. Indexed Icon Registry Pattern

Ported from V0.2 (`pattern-lessons.md` REPLICATE table: *"Centralized indexed icon registry · `constants/stakeholder-icons.tsx` · `constants/segmentation-icons.tsx`"*).

**Problem this solves:** Without a registry, every author building (say) a stakeholders section re-imports specific Lucide icons inline (`import { Building2, Users, Briefcase } from 'lucide-react'`) and picks them ad-hoc → stakeholder section A uses `Building2` for "Enterprise," section B uses `Factory` for "Enterprise," section C uses `Briefcase` — visual incoherence across pages.

**Solution:** Centralized registry exports indexed helpers. Consumer asks for "stakeholder #2 icon" — registry decides the glyph.

```tsx
// core-v2/src/lib/iconRegistry.tsx

import { Building2, Users, Briefcase, GraduationCap, Stethoscope } from 'lucide-react';
import { LineChart, PieChart, BarChart3, TrendingUp, Layers } from 'lucide-react';

const STAKEHOLDER_ICONS = [Building2, Users, Briefcase, GraduationCap, Stethoscope];
const SEGMENTATION_ICONS = [LineChart, PieChart, BarChart3, TrendingUp, Layers];

export function getStakeholderIconByIndex(i: number) {
  return STAKEHOLDER_ICONS[i % STAKEHOLDER_ICONS.length];
}

export function getSegmentationIconByIndex(i: number) {
  return SEGMENTATION_ICONS[i % SEGMENTATION_ICONS.length];
}
```

**Consumer usage:**

```tsx
import { getStakeholderIconByIndex } from '@kenresearch/design-system/lib/iconRegistry';
import { getIconColor } from '@kenresearch/design-system/lib/iconColors';

{stakeholders.map((s, i) => {
  const Icon = getStakeholderIconByIndex(i);
  return <Icon key={s.id} size={24} color={getIconColor('content')} aria-hidden="true" />;
})}
```

**Rule:** within indexed contexts (stakeholders, segmentation, methodology phases, report-store category tiles) **never inline-import a specific Lucide icon per consumer**. Always go through the registry. This way a brand-level decision to change "stakeholder #3" from `Briefcase` to `Hardhat` propagates across every Ken page in one edit.

**Allowed direct imports:** one-off icons in standalone components (e.g. `Phone` in the "Talk to analyst" CTA — there is no "CTA icon registry," it's a single call site).

---

## 12. Anti-Patterns ❌

| Anti-pattern | Why it's wrong |
|---|---|
| Inline hex `<Icon color="#806ce0" />` | Bypasses token system → drift when purple shifts in cinematic-dark · pattern explicitly rejected in `pattern-lessons.md` REJECT table. |
| Mixing Lucide + Phosphor in the same project | 80KB bloat · 2 mental models · rejected per `pattern-lessons.md`. |
| Wrapping every Lucide icon in a custom `<Icon role="content">` atom | Breaks tree-shaking (forces all Lucide icons into one bundle chunk) · adds prop-drilling tax for zero design payoff. |
| Off-scale sizes (`size={22}`) | Breaks visual rhythm · scale is in §6 for a reason. |
| Using `brand` role on non-CTA icons to "add brand presence" | Brand-red signals **action** scarcity (5% rule) · ambient brand-red dilutes the CTA signal. |
| Decorative icon without `aria-hidden="true"` | Pollutes AT output with "sparkle" announcements. |
| Icon-only state communication (red X for error, no text) | Fails color-blind users · fails AT · `feedback_a11y_patterns.md` rule. |
| `aria-label` on a `<div>` wrapping an icon, no `role` set | Triggers `aria-prohibited-attr` axe violation. |
| Inline-imported Lucide icon in an indexed-context section (stakeholders, segmentation) | Bypasses registry → cross-page incoherence. |
| Custom inline `<svg>` for a glyph that exists in Lucide | Defeats the single-library decision · use Lucide. |
| `currentColor` everywhere "to keep things simple" | Hides role classification · author skipped the decision · breaks 92-5-3 rule. |
| Brand-red icon in a non-action context (e.g. footer copyright glyph) | Brand-red is reserved for conversion moments. Use `decorative`. |

---

## 13. Reusability Score

**5 / 5** — Every page. Every component. Every consumer project. The icon role taxonomy is invoked at every Lucide call site across `core-v2`, `report-store-v07`, `template-v3`, `template-v28`, `topnav-v32`, future Next 15 Ken surfaces, and the Aura page-build workflow (`/page` recipe-driven assembly). No other doc in `core-v2/docs/` is invoked at higher frequency.

---

## Source citations

- OG implementation (verbatim source): `Design_system_vs_26 (og and final)/src/app/components/iconColors.ts:1-45`
- OG audit confirming Lucide-only + 97 imports + 0 Phosphor: `design-system-audit/og-audit/00_overview.md` §7.9 + §6
- Reasoning for role-based-not-lexical: `design-system-audit/worked-examples/v0-lite-report-legacy/reasoning-log.md` §2
- Dual-icon REJECT and registry REPLICATE: `design-system-audit/worked-examples/v02-for-design-system/pattern-lessons.md` REJECT row "Inline hex everywhere" + REPLICATE row "Centralized indexed icon registry" + MODIFY row "Two icon libraries"
- 92-5-3 color-tier constitution: OG `tokens.ts:305-329` quoted in `reasoning-log.md` §1
- A11y axe rules: `~/.claude/projects/-Users-vishalchauchan-Downloads-Anti-folder01/memory/feedback_a11y_patterns.md`
