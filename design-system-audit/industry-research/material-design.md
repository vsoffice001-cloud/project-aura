# Material Design 3 (Google) · Industry DS Reference

**Source:** [m3.material.io](https://m3.material.io) · official Google docs · cross-referenced w/ Material Web, Compose M3, and 9to5Google component reporting.
**Audited:** 2026-05-13 · for Ken Research DS gap analysis · methodology: WWWWH per `01_methodology.md`.

---

## WWWWH summary

### WHAT (essence)
Material Design 3 (M3) is Google's open-source design system spanning Android, ChromeOS, web, and Wear OS. It is a **token-first, role-driven system** built around algorithmically-generated color palettes (Dynamic Color · Material You), a **physics-based motion engine** (M3 Expressive · spring slots), and ~30 first-party components with reference implementations in Compose, Flutter, and Material Web (Lit).

### WHY they exist (problem · adoption story)
- **Cross-platform consistency at planetary scale.** Android alone ships on 3B+ devices; Google Search, Gmail, Drive, Photos, Workspace, YouTube all consume M3 to some degree. Without a shared token/component layer, every Google product would drift.
- **Personalization without fork.** Dynamic Color (introduced w/ Android 12) extracts a 5-tone palette from a user's wallpaper and re-themes the entire OS + apps. This was only buildable because tokens are decoupled from values.
- **Accessibility as default not afterthought.** Audit of M2 components found contrast failures; M3 rebuilt the color system so role pairings (`on-primary` on `primary`) are guaranteed ≥4.5:1 by construction.
- **Motion as language.** M3 Expressive (2025) replaced durations w/ springs because real interfaces need overshoot/bounce for "alive" feel, but utilitarian flows need critically-damped resolves. One engine, two schemes (Expressive · Standard).

### WHEN their approach fits ✅
- Multi-platform product family (mobile + web + wearable)
- Personalization is a brand requirement (user-themed surfaces)
- 30+ components, 100+ surfaces, 5+ product teams sharing tokens
- Strong engineering org that can absorb Compose/Lit/SwiftUI runtime cost
- Brand permits algorithmic color (i.e., not strict hex-locked)

### WHEN NOT ❌
- **Single-product, single-platform shop** (Ken Research: editorial web + report viewer). M3's 40+ color roles · 15-style type scale · spring physics engine = enormous decision surface for a 4-page site.
- **Strict brand-locked palette.** Ken's `#b01f24` is fixed; Dynamic Color is irrelevant.
- **Editorial / publication design.** M3 is product-app DNA (toolbars, FABs, nav rails); a long-form case study reads as a magazine, not an Android app.
- **Small team.** Token domains alone (`md.sys.color.*`, `md.sys.typescale.*`, `md.sys.motion.*`, `md.sys.shape.*`, `md.sys.elevation.*`, `md.sys.state.*`) require ongoing curation.

### WHERE deployed (scale)
- **Android** (system UI + first-party apps) — 3B+ devices
- **Google Workspace** web (Gmail, Drive, Calendar, Docs) — selectively, often M2/M3 hybrid
- **ChromeOS** system surfaces · YouTube (mobile) · Google Maps (mobile)
- **Wear OS** · Android Auto
- Third-party: any app using `androidx.compose.material3` or `material-web`

### HOW structured (folder + token format + doc method)
- **Reference impls:** `material-components-android`, `material-web` (Lit web components), `compose-material3` (Kotlin), Flutter `material` package.
- **Token format:** DTCG-compatible JSON; namespaced as `md.{ref|sys|comp}.{domain}.{role}` — e.g., `md.sys.color.primary`, `md.sys.typescale.body-large.size`, `md.comp.filled-button.container.color`.
- **Three token layers:**
  1. **Reference tokens** (`md.ref.*`) — raw palette values (Primary 40, Neutral 90, etc.)
  2. **System tokens** (`md.sys.*`) — semantic roles (primary, on-primary, surface-container-high)
  3. **Component tokens** (`md.comp.*`) — per-component bindings (filled-button.container.color → sys.primary)
- **Doc method:** every component page has Overview · Guidelines · Specs (anatomy diagrams w/ token names per part) · Accessibility · Code (Compose · Web · Flutter tabs).

---

## Token system deep dive

M3 tokens sit at the **center** of the system — not an afterthought layer over Sketch styles. Three layers, strictly enforced.

**Reference layer** = the palette source-of-truth. M3 generates 13 tonal palettes × 13 stops (0–100) from a single source color via HCT (Hue · Chroma · Tone) color space. Output: Primary, Secondary, Tertiary, Neutral, Neutral Variant, Error palettes each w/ tones 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100.

**System layer** = the role layer. ~40 color roles. Examples:
- `primary` / `on-primary` / `primary-container` / `on-primary-container`
- `secondary` / `on-secondary` / `secondary-container` / `on-secondary-container`
- `tertiary` (accent · less used)
- `surface` / `surface-dim` / `surface-bright` / `surface-container-lowest` through `surface-container-highest` (5 elevation tiers as **surface roles** not shadow values · key M3 innovation)
- `outline` / `outline-variant`
- `error` / `error-container`

Each role has a **light** value (e.g., light theme primary = palette tone 40) and a **dark** value (dark theme primary = tone 80). Mappings are deterministic — change the source color, every role re-derives.

**Component layer** = the binding. `md.comp.filled-button.container.color` = `md.sys.color.primary`. Designers tweak system roles; components inherit automatically.

**Typography:** 15-style scale across 5 roles × 3 sizes — Display (Large/Medium/Small) · Headline · Title · Body · Label. M3 Expressive added 15 "emphasized" variants. Each style is a token bundle: font-family, weight, size, line-height, tracking. Example: `md.sys.typescale.body-large` = Roboto · 400 · 16px · 24px · 0.5px.

**Shape:** 7-tier corner scale — None (0) · ExtraSmall (4) · Small (8) · Medium (12) · Large (16) · ExtraLarge (28) · Full (9999). Per-component shape bindings allow themes to round everything globally.

**Elevation:** 6 tiers (0, 1, 2, 3, 4, 5dp). Importantly: in M3, elevation primarily affects **surface color tint** (via `surface-container-*` roles) rather than shadow. Shadows still exist but are de-emphasized vs. M2 where shadow = elevation.

---

## Component documentation method

Every M3 component page (e.g., [Cards](https://m3.material.io/components/cards), [Extended FAB](https://m3.material.io/components/extended-fab), [Navigation Drawer](https://m3.material.io/components/navigation-drawer)) follows the same 5-section structure:

1. **Overview** — what it is · 1-paragraph essence · live demo
2. **Guidelines** — WHEN to use · WHEN NOT (compared w/ sibling components — e.g., "use FAB for single primary action · use Extended FAB when label needed · use Filled Button for inline primary")
3. **Specs** — labeled anatomy diagram. Every part labeled w/ token reference. Example for Cards: container · headline · subhead · supporting text · media · actions — each w/ `md.comp.elevated-card.container.color`, `md.comp.elevated-card.container.elevation`, etc.
4. **Accessibility** — keyboard interactions · screen-reader behavior · touch-target spec · contrast minimum
5. **Code** — tabbed Compose / Web / Flutter snippets · every variant covered

Cards specifically: three variants documented — **elevated** (default · `surface-container-low` + shadow 1dp), **filled** (`surface-container-highest` · no shadow), **outlined** (`surface` + 1dp `outline-variant` border · no shadow). The doc page explicitly contrasts them ("Use filled cards in lists where elevation would be repetitive · use outlined for low-emphasis").

---

## Decision tree examples (use X when Y)

- **Button choice:** Filled (high-emphasis primary) · Filled Tonal (medium · secondary-container bg) · Elevated (medium · subtle elevation needed) · Outlined (medium · w/ alternative high) · Text (lowest · inline w/ content)
- **FAB vs Extended FAB:** FAB when screen has 1 primary action and label not needed (icon-only) · Extended when label clarifies action (`+ Compose`)
- **Navigation: Bar vs Rail vs Drawer:** Bottom navigation bar (mobile, ≤5 destinations) · Navigation rail (tablet, 3–7 destinations) · Navigation drawer (large screens or >7 destinations · permanent or modal)
- **Card variant:** elevated (default) · filled (lists, to avoid elevation noise) · outlined (low-emphasis or dense surfaces)

These decision rules are baked into the docs — every component's Guidelines section starts by **disambiguating it from siblings**. This is a pattern Ken should copy verbatim.

---

## Accessibility standards

- **Contrast guarantee by construction.** `on-{role}` is the only correct foreground for `{role}` backgrounds. HCT tone math ensures ≥4.5:1.
- **Text scaling** supported up to 200% minimum.
- **Reduced motion:** all transitions check `prefers-reduced-motion` · springs are auto-replaced w/ critically-damped equivalents.
- **Touch target floor:** 48×48 dp (note: M3 uses dp not px — slightly larger than 44px web baseline).
- **WCAG alignment:** WCAG 2.1 AA is the baseline · components ship w/ ARIA roles · keyboard interaction patterns documented per component.
- **Audit history:** Google Accessibility team + Material team ran a joint audit of M2→M3 to identify which components needed fixes; results drove M3 redesign decisions (per Google Design publications).

---

## Motion philosophy (M3 Expressive · 2025)

Replaces M2's duration-based system with a **spring-based engine**. Two parameters: **stiffness** (resolve speed) and **damping ratio** (bounce decay).

- **Motion schemes:**
  - **Expressive** — lower damping · overshoot + bounce · for hero moments, key actions
  - **Standard** — higher damping · minimal bounce · for utilitarian flows
- **Token types:**
  - **Spatial tokens** — for position/size/shape changes · configured to allow overshoot
  - **Effect tokens** — for color/opacity · high damping · no bounce (you don't want color to oscillate)
- **Legacy easing/duration tokens** still exist for backward compat:
  - Easing: `emphasized`, `emphasized-decelerate`, `emphasized-accelerate`, `standard`, `standard-decelerate`, `standard-accelerate`
  - Duration: `short1-4` (50–200ms) · `medium1-4` (250–400ms) · `long1-4` (450–600ms) · `extra-long1-4` (700–1000ms)

The token-tier philosophy is the win: motion is a first-class token domain alongside color/type.

---

## Strengths (5 things Ken should learn)

1. **3-tier token architecture (ref → sys → comp).** Drives almost every M3 capability — theming, dark mode, dynamic color, component-level overrides. Ken's `tokens/build/tokens.css` is a one-tier flat list; adopting the ref/sys split would let cinematic-dark and editorial-light reuse one ref palette.
2. **Color roles instead of color names.** `on-primary` not `text-on-red`. Forces designers to think in pairs (bg + foreground guarantee) rather than picking colors and hoping. Ken's surface tokens (`bg`, `text`) already do this for two variants; extend to a fuller role set (`accent`, `on-accent`, `container`, `on-container`).
3. **Component anatomy diagrams w/ token names per part.** Every Material component page labels every visual region w/ the exact token that drives it. Ken's `COMPONENT_REFERENCE.md` lists components but doesn't pin tokens to anatomy.
4. **Decision rules in component docs (use X when Y).** Material disambiguates every sibling component in the Guidelines section. Ken should add "use this NOT that" per atom (already in WWWWH methodology — bake into every atom doc).
5. **Surface roles instead of shadow-driven elevation.** `surface-container-low` through `-highest` lets dark mode have elevation without shadows (shadows don't read on dark). Cinematic-dark surfaces in Ken would benefit — currently a flat `#0a0a0c` with no elevation system.

---

## Weaknesses / overkill (3 things NOT to copy)

1. **40+ color roles** is right for Google · catastrophic for Ken. Tertiary, multiple container variants, error-container, outline-variant — most are dead weight in a 4-page editorial site. Pick 8–12 roles max.
2. **Spring-based motion engine.** Beautiful for Android Compose where spring is native and free. On web w/ Framer Motion you'd be reimplementing damping math. Ken's Framer `useScroll`/`useTransform` is sufficient. Borrow the **token naming** (spatial vs effect; emphasized vs standard) without the physics rewrite.
3. **15-style typography scale.** Display Large through Label Small × emphasized variants = 30 type tokens. Ken needs ~6 (display, headline, title, body, eyebrow, caption). M3's Major Third philosophy is right; the tier count is too many.

---

## Specific patterns Ken should adopt + why

| Pattern | Why | Where in Ken |
|---|---|---|
| **ref → sys → comp 3-tier tokens** | Future-proof for variants (cinematic vs editorial, future client whitelabel) · cuts duplication | Refactor `design-system/tokens/build/tokens.css` from flat list to 3-tier JSON source · Style Dictionary already supports DTCG layers |
| **Pair tokens (`on-{role}`)** | Guarantees contrast at design-token level, not at component-author judgment | Add `--color-on-surface-cinematic`, `--color-on-surface-editorial`, `--color-on-brand-red` to tokens |
| **Surface-tier roles instead of pure shadow** | Cinematic-dark has no shadow vocabulary today — needs tonal surfaces for elevation | Define `--surface-1` through `--surface-4` for cinematic (tone-shifted `#0a0a0c`) + same for editorial |
| **Component anatomy doc per atom** | Already in WWWWH methodology · enforce token-binding callouts | Every WWWWH doc adds an "Anatomy → Token map" section |
| **Sibling-disambiguation in Guidelines** | Stops drift like "Button vs CTALink vs TextLink" confusion that already exists | Already in methodology · audit existing atom docs to verify present |
| **Motion token domain naming (spatial · effect · emphasized · standard)** | Cleaner than ad-hoc Framer values · forces motion intent classification | Add motion tokens layer to Style Dictionary build · map to Framer transition presets |

---

## Sources

- [Material Design 3 · Components index](https://m3.material.io/components)
- [Design tokens · m3.material.io](https://m3.material.io/foundations/design-tokens/overview)
- [Easing and duration tokens · m3.material.io](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
- [Material Web theming](https://material-web.dev/theming/material-theming/)
- [Material 3 Design System (YLabZ on Medium)](https://zoewave.medium.com/material-3-design-system-e91a15d303a0)
- [Google details Material Design 3 components · 9to5Google](https://9to5google.com/2021/10/28/google-material-design-3/)
- [Compose Material 3 Expressive](https://zoewave.medium.com/compose-material-3-expressive-89f4147df5b8)
- [Design Tokens in Material Design 3 · softAai](https://softaai.com/design-tokens-in-material-design-with-jetpack-compose/)
