# Surface 04 — Dashboards

**Buyer's question:** "Can I live with this data day-to-day?"
**North stars:** Hex × Mode Analytics × Stripe Sigma × Coinbase Prime × Linear authenticated views · `references/design-systems/{linear,stripe}/`
**Brand variant:** Cinematic dark DEFAULT (long-session reading reduces eye fatigue + matches "command center" intent). Editorial light optional toggle (light-bias users).

Dashboards = where Ken Research **graduates from one-time-purchase to subscription**. Tier A doesn't have this surface — they sell PDFs. Ken's wedge: **post-purchase data lives in a queryable workspace**, not in Downloads folder. Same data the report cites, refreshed monthly, exportable, embeddable, citable.

---

## Information architecture

```
[App shell — persistent across all dashboard views]

  Top bar (sticky · `--space-app-topbar` 56px):
    Logo · Workspace switcher (org/personal) · Search (⌘K) · Notifications · Theme toggle · Avatar menu

  Left rail (collapsible · `--space-app-sidebar` 240px expanded · 56px collapsed):
    Workspace nav: Dashboards · Reports (purchased) · Saved queries · Custom research · Settings
    Sector pinned section (top 3-5 user-pinned)
    Recent activity feed (last 5 actions)

  Main content area:
    Breadcrumb · Title · Action cluster (right) · Body

  Right rail (slide-in on demand · NOT persistent):
    Context panel — chart drill-down · cite this view · share modal · alert config
```

---

## 04a. Dashboard home

```
[Greeting band — minimal cinematic-dark]
  H1: "Good morning, [name]" (Noto Serif 39px · NOT 48 — context shift from marketing)
  Sub: "3 reports updated this week · 1 alert triggered · 47 new citations of your purchases"

[Quick-action cards · 4-col]
  Card: [icon] Title · 1-line · CTA chevron right
  Examples: "Browse new reports" · "Run a query" · "Set up an alert" · "Book intro call w/ Ken analyst"

[Pinned dashboards · masonry grid]
  Card: dashboard preview (rendered chart still) · title · last-updated · "Open" CTA
  Pin/unpin via right-click or three-dot menu
  Default 0-state: 3 system-pinned (overview · trends · custom research)

[Activity feed · single-column right side]
  Items: "Q3 2025 Healthcare report updated · 4 new charts" · "Your 'India semiconductor' query refreshed · 12 new data points" · timeline-style
  Group by day · "View all activity" footer link
```

---

## 04b. Single dashboard view (`/dashboards/[id]`)

```
[Header band — cinematic dark or editorial light per user theme]
  Breadcrumb: Dashboards / Healthcare / India market trends
  H1: dashboard title (Noto Serif 39px · editable inline · save-on-blur)
  Sub: 1-line description · last-updated timestamp · data-source citations
  Action row (right): [Refresh] [Export] [Embed] [Share] [Add chart]

[Filter band — sticky below header]
  Date range · Region · Sector · Sub-sector · Custom dimensions (per dashboard schema)
  Active-filter chip strip (RS Zone B clone, color-coded · click chip = remove)
  "Save current filter set as preset" gear icon

[Grid body — 12-col CSS grid]
  Each tile = configurable size (1×1 · 2×1 · 2×2 · 3×2 · full-width)
  Tile components:
    - Stat card (single number · trend arrow · sparkline · period comparison)
    - Chart card (Highcharts preset per chart type — see `decisions/chart-picker.md`)
    - Table card (sortable · filterable · export)
    - Text card (markdown — analyst notes · methodology callouts · context)
    - Embed card (paste any Ken chart URL · live render)
  Drag-to-rearrange (Hex/Mode pattern)
  Resize via corner handle
  Hover tile → action cluster top-right: cite · download CSV · embed code · drill-down · remove

[Right rail — drills + context (slide-in, not persistent)]
  Triggered by clicking a chart → opens drill-down panel
  Shows: filtered raw data table · cite this view · share filtered URL · alert me when X
```

---

## 04c. Saved queries

```
[List view — dense table layout, editorial light]
  Columns: Query name · Sector · Last run · Schedule (manual / weekly / monthly) · Result preview (sparkline) · Actions
  Row hover: subtle bg tint · action cluster appears right
  Filter: ⌘K search across query names + descriptions

[Query detail page]
  Top: query SQL or natural-language prompt (read-only · edit toggle)
  Body: result table + chart preview side-by-side
  Footer: schedule config · alert config · share · export · cite

[Anti-pattern]
  Don't show raw SQL by default — natural-language prompt UI on top, "View SQL" toggle for power users (Hex pattern). Most Ken buyers aren't SQL natives.
```

---

## Type system (dense, working-context)

| Element | Size | Font | Notes |
|---|---|---|---|
| App shell title (h1) | 39px | Noto Serif 600 | smaller than marketing — context shift |
| Tile title (h3) | 16-18px | DM Sans 600 | NOT serif — dashboards = sans-dense |
| Stat number | 39-48px | DM Sans 600 | tabular-nums |
| Stat label | 12.8px small caps | DM Sans 600 | letter-spacing 0.08em |
| Body / table | 14px | DM Sans 400 | NOT 16 — density mode |
| Table cell numeric | 14px tabular-nums | DM Sans 400 | right-aligned |
| Sidebar nav | 14px | DM Sans 500 | hover bg tint |
| Breadcrumb | 12.8px | DM Sans 400 | `--color-text-subtle` |

**Density toggle:** user setting (Hex pattern) — `comfortable` (default) / `compact` (rows -25% padding, fonts -1px). Persists per user.

---

## Color use (dashboard variant)

- **92% foundation** — `--color-foundation-{black,white}`, deep neutrals
- **5% brand red** — alert state · destructive action confirm · primary CTA · active-state nav indicator. NEVER for chart series colors (use `chart.palette.{1..8}` from tokens)
- **3% accent** — chart series only · status (green/yellow/orange/red signal) — limited surface, never decorative

**Chart palette:** `chart.palette.1..8` — 8-color scheme tested for color-blind safety + dark/light parity. Do not improvise series colors.

---

## Motion system (restraint mode)

Dashboards are working surfaces — **less motion than marketing**.

| Element | Library | Trigger | Pattern |
|---|---|---|---|
| Tile entrance | Framer | mount | fade-up 80ms stagger · max once per session |
| Number transitions | DS `useAnimatedCounter` | data-update | 400ms · ease-out · NOT spring (too playful for working) |
| Sidebar collapse | Framer | click | width transition 200ms · ease-out |
| Right rail slide-in | Framer | drill-down | x-slide 250ms · ease-out · NOT bounce |
| Tile drag/drop | react-beautiful-dnd OR dnd-kit | drag | shadow lift · ghost preview · 150ms drop animation |
| Chart hover | Highcharts native | hover | tooltip fade 100ms · no extra Framer |
| Smooth scroll | OFF for dashboard surface — override w/ inline `style={{ scrollBehavior: 'auto' }}` on root | — | working surface · momentum-scroll = jarring on data tables |

**Hard rule:** dashboards override DS smooth scroll at layout level (`<html style={{ scrollBehavior: 'auto' }}>`). Working surfaces = native instant scroll.

---

## Density rules

- **Tile padding:** `--space-tile-md` 16px default · `--space-tile-sm` 12px in compact mode
- **Grid gap:** `--space-grid-gap` 16px · NEVER variable per page
- **Sidebar width:** 240px expanded · 56px collapsed (icon-only)
- **Topbar height:** 56px fixed · NEVER taller (working context)
- **Table row height:** 44px comfortable · 32px compact

---

## Anti-patterns (Dashboard-specific)

1. **Marketing-y typography in dashboards** — Noto Serif h2 + 16px body kills density. Sans + 14px is the working norm. (Cat 13.5 — context-mismatch)
2. **3D charts / pie >5 slices / dual y-axis** — banned in viewer also. Same rule here. (Cat 13.7)
3. **Spinner on every refresh** — use skeleton states (Vercel/Linear pattern) · animated spinners on data load = anxiety signal.
4. **"Click to expand" instead of inline drill-down** — drill-down opens right rail, NOT modal. Modal stack on data work = friction.
5. **Tile resize w/o ratio constraint** — tiles snap to grid · don't let user create 3.7×1.2 sizes. Hex/Mode constraint pattern.
6. **Dashboard auto-refresh at 30s** — manual refresh OR scheduled (hourly/daily/weekly) only. Auto-refresh = battery drain + cognitive load.
7. **Color-coded by sector w/o color-blind safety** — use `chart.palette` tokens (CB-safe tested) · NEVER raw hex.
8. **Form-gated drill-down** — clicking a chart in dashboard NEVER opens "request more data" form. Drill-down = the data, in-place.

---

## DS components used

```ts
import {
  Button, CTALink, Card, Badge, ScrollProgress,
  StatusDot,           // alert active state · live-data indicator
  Avatar, MenuItem, Divider,
} from '@kenresearch/design-system/atoms';

import {
  StatCard,            // stat-tile content
  SearchBar,           // ⌘K search
  AuthButtons,
} from '@kenresearch/design-system/molecules';

import {
  TopNavigation,       // app shell topbar
  AuthPopover,
  // App-shell organisms (Phase 2 future build):
  // AppSidebar, DashboardGrid, FilterStrip, RightRailDrawer
} from '@kenresearch/design-system/organisms';

// Charts
import { highchartsTheme, presets, mergePreset, readToken } from '@kenresearch/design-system/charts';
import Highcharts from 'highcharts';
```

**Future DS additions needed (Phase 2.x):**
- `AppSidebar` organism (collapsible left rail w/ pin/unpin)
- `DashboardGrid` organism (drag-resize 12-col grid)
- `FilterStrip` organism (sticky filter bar w/ chip strip)
- `RightRailDrawer` molecule (slide-in panel)
- `useDensity` hook (comfortable/compact toggle)
- `useDashboardLayout` hook (drag/drop persistence + tile sizes)

---

## Charts (Highcharts via DS theme + 5 presets)

Per `core-v2/charts/`:
```ts
const themed = mergePreset(highchartsTheme, presets.area, {
  chart: { backgroundColor: readToken('--color-bg-deep') }
});
```

Chart-type decision tree → `decisions/chart-picker.md`. Banned types: 3D anything · pie >5 slices · donut >5 categories · dual y-axis (use 2 stacked panels instead).

**Every chart in dashboard:**
- Title + 1-line subtitle (sourced)
- Source-citation footer (date · sample size if relevant)
- tabular-nums labels
- Hover tooltip w/ exact values
- Click → drill-down right rail (NOT modal)
- 3 affordances visible: cite · download CSV · embed code

---

## Recipe pointer

Recipe TBD: `design-system/recipes/dashboard.md` (Phase 2.x). For now build from this surface file. When recipe ships, source-of-truth file MUST cite the App-shell organisms above.

---

## Cross-surface citations

- Hero cinematic-dark mesh (when used) shared w/ surface 01 (Discovery hero) — same `DarkGradientMesh` pattern
- Cite-block shared w/ surface 03 (Viewer) + surface 02 (Store detail)
- Filter strip + chip strip shared w/ surface 02 (Report Store listing)
- Topbar `<TopNavigation>` shared across all 5 surfaces (workspace switcher slot replaces marketing nav items)
- StatCard shared w/ surface 01 (methodology proof band) + surface 03 (Viewer chart-stats sidebar)
