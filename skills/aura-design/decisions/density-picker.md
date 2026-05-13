# Density Picker — decision tree

**When to load:** picking type sizes / spacing / row heights / line-lengths for a surface · or "should this be denser?" critique.

**Output:** density profile (marketing / reading / working / data-grid) + token-backed values.

---

## Step 1 — Match surface to density profile

| Surface | Profile | Body size | Line-height | Card padding |
|---|---|---|---|---|
| 01 Discovery (marketing) | **Marketing** | 16px (90%) · 18-19px hero sub | 1.5-1.6 | `--space-card-md` 24px |
| 02a Store listing | **Marketing-density** | 16px · 14-15px card abstract | 1.5-1.6 | `--space-card-md` 24px |
| 02b Store detail | **Reading** | 17-19px center column | 1.6-1.7 | n/a (column-based) |
| 03 Viewer | **Reading-dense** | **17-19px** (NOT 16) | 1.6-1.7 | n/a |
| 04 Dashboards | **Working** | 14px (NOT 16) | 1.5 | `--space-tile-md` 16px |
| 05 Engagement | **Working** | 14-15px | 1.5 | `--space-card-md` 24px (cards) · `--space-tile-md` 16px (action queue) |

**Critical:** Reading surface (03) bumps body UP to 17-19px (reduces fatigue at 80pp). Working surface (04+05) drops body DOWN to 14px (density mode). Marketing keeps standard 16px.

---

## Step 2 — Density toggle (Hex pattern)

Working surfaces (04, 05) get a user-level density toggle:

| Mode | Row height | Body | Card padding | Sidebar |
|---|---|---|---|---|
| Comfortable (DEFAULT) | 44px | 14-15px | 16-24px | 240px expanded |
| Compact | 32px | 13-14px | 12-16px | 240px expanded |

Persists per user. CSS via `[data-density="compact"]` selector.

---

## Step 3 — Type scale (Major Third 1.25× — DON'T DEVIATE)

Canonical scale (from `Quick_start_guide.md`):

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 12.8px | Labels · captions · table cells |
| `--text-sm` | 16px | Body (90% of text) |
| `--text-md` | 19.5px | Hero sub · enlarged body in reading surfaces |
| `--text-lg` | 24.4px | h3 marketing |
| `--text-xl` | 30.5px | h3 hero |
| `--text-2xl` | 39px | h2 section |
| `--text-3xl` | 48.8px | h1 hero (desktop) |
| `--text-4xl` | 56px (custom) | h1 hero impact (desktop only) |
| `--text-nav` | 14px (custom) | TOC · nav · sidebar items |

**Anti-pattern:** raw Tailwind `text-2xl` / `font-bold` bypasses token system (Cat 1.1). Use `var(--text-...)` via `@theme` registration in `globals.css`.

**Tailwind v4 typography no-op LEARNING (2026-05-06):** `text-[var(--typography-size-*)]` arbitrary classes silently produce zero CSS rules. Use:
1. Register tokens in `@theme { --text-display-2xl: var(...); }` to get `.text-display-2xl` utility
2. OR inline `style={{ fontSize: 'var(...)' }}` for one-offs
3. NEVER `text-[var()]` arbitrary class

---

## Step 4 — Spacing scale (4px-base, 0..24)

From `tokens.json` `spacing.{0..24}` group. `space-N` = `N × 4px`.

| Token | px | Use |
|---|---|---|
| `--space-1` | 4px | Tight gap (icon to label) |
| `--space-2` | 8px | Inline gap |
| `--space-3` | 12px | Card meta row gap |
| `--space-4` | 16px | Tile padding |
| `--space-6` | 24px | Card padding · grid gap |
| `--space-8` | 32px | Section sub-band gap |
| `--space-12` | 48px | Section vertical rhythm |
| `--space-16` | 64px | Major section break |
| `--space-20` | 80px | Hero band padding |
| `--space-24` | 96px | Page-end padding |

**Section vertical rhythm:** use `--space-section-{md,lg,xl}` aliases (Phase 2.x token group). Never random `py-20` literals.

---

## Step 5 — Line-length

| Profile | ch (character count) |
|---|---|
| Marketing (01, 02a) | 65-75ch on body · 50ch on hero sub (text-wrap: balance) |
| Reading (02b, 03) | **65-75ch HARD** on body · drop cap on chapter openers |
| Working (04, 05) | No constraint on tables · 50-65ch on text-card markdown content |

**Tailwind v4:** use `prose:max-w-prose` for reading surfaces · explicit `[max-width:65ch]` for marketing body.

---

## Step 6 — Sidebar widths

| Surface | Sidebar width | Behavior |
|---|---|---|
| 02a Store listing | 224px (NOT 280) | Per RS canonical · LEARNING 2026-05-06 |
| 03 Viewer | 240-280px | Sticky TOC · scroll-spy · expandable to 320px on demand |
| 04 Dashboards | 240px expanded · 56px collapsed | Toggle persists |
| 05 Engagement | 240px expanded · 56px collapsed | Same as 04 |

---

## Step 7 — Topbar / sticky-header heights

| Surface | Height |
|---|---|
| 01 Discovery | 80px (marketing breathing room) |
| 02a Store listing | 80px |
| 02b Store detail | 56px after scroll past hero (compact) |
| 03 Viewer | **48px** (minimal — reading surface) |
| 04 Dashboards | 56px (working) |
| 05 Engagement | 56px (working) |

---

## Step 8 — Anti-patterns

| Anti-pattern | Why wrong |
|---|---|
| Marketing-y typography on dashboards (Noto Serif h2 + 16px body) | Density-mismatch (Cat 13.5) — kills working scan |
| Body 16px on Viewer reading surface | Eye fatigue at 80pp (LEARNING — bumped to 17-19px) |
| Random `py-20` literals instead of token-backed section rhythm | Cat 1.1 token-only rule |
| Card padding varies per surface w/o reason | Inconsistent rhythm across product · use `--space-card-md` everywhere |
| Sidebar 280px on Store listing | Drift from RS canonical (LEARNING 2026-05-06) |
| Compact mode default (saves vertical space at cost of scan-ability) | Working surfaces default = comfortable · user toggles up to compact |
| Tailwind v4 typography arbitrary classes (`text-[var()]`) | Silent no-op (LEARNING 2026-05-06) — use `@theme` registration |

---

## Cross-surface citations

- Surface 01 — marketing density profile in detail
- Surface 02 — listing density (RS canonical) + detail reading density
- Surface 03 — reading-dense profile (Apple Books / Stripe Press patterns)
- Surface 04 — working density + Hex toggle pattern
- Surface 05 — working density (engagement-specific row heights)
- Variant detail: `variants/cinematic-dark.md` + `editorial-light.md` (color/density per variant)
