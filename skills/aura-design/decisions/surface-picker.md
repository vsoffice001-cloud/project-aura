# Surface Picker — decision tree

**When to load:** ambiguous build brief · "design a page for X" · need to identify which Ken surface a task belongs to.

**Output:** surface ID (01-05) + recipe pointer (if applicable) + parent skill chain.

---

## The 5 Ken surfaces

| ID | Surface | Buyer's question | Detail file |
|---|---|---|---|
| 01 | Discovery | "Are these credible in 5 sec?" | `surfaces/01-discovery.md` |
| 02 | Report Store | "Can I find/eval/buy w/o a form?" | `surfaces/02-report-store.md` |
| 03 | Report Viewer | "Is this 80-page PDF actually usable?" | `surfaces/03-report-viewer.md` |
| 04 | Dashboards | "Can I live with this data day-to-day?" | `surfaces/04-dashboards.md` |
| 05 | Engagement | "What's it like to work with you?" | `surfaces/05-engagement.md` |

---

## Step 1 — Match by user-task verb

| User says | Surface |
|---|---|
| "homepage" · "landing page" · "sector landing" · "industry page" · "what we do" · "marketing page" | **01 Discovery** |
| "report listing" · "browse reports" · "buy a report" · "report detail" · "report sample" · "checkout" · "pricing page" | **02 Report Store** |
| "read this report" · "report viewer" · "TOC" · "in-browser PDF" · "cite this" · "embed chart" | **03 Report Viewer** |
| "dashboard" · "saved query" · "data workspace" · "drill-down" · "filter view" · "alert" · "subscription view" | **04 Dashboards** |
| "client portal" · "engagement detail" · "milestone" · "custom research request" · "billing" · "account settings" · "team invite" | **05 Engagement** |

---

## Step 2 — Match by signal phrase

| Signal phrase | Surface |
|---|---|
| "5 seconds" · "credibility" · "first impression" · "wow factor" · "hero" | **01** |
| "form-free" · "no email gate" · "checkout flow" · "filter sidebar" · "card grid" · "shopping" | **02** |
| "long-form reading" · "drop cap" · "pull quote" · "TOC scroll-spy" · "margin notes" · "citation" | **03** |
| "command center" · "live data" · "tile" · "drill-down" · "schedule a query" · "alert when X" | **04** |
| "client work" · "milestone tracker" · "deliverable" · "team member" · "invoice" · "renewal" · "async thread" | **05** |

---

## Step 3 — Recipe routing

Each surface MAY have one or more recipes at `design-system/recipes/`:

| Surface | Recipes (existing or planned) |
|---|---|
| 01 | `discovery.md` (homepage) · `sector-landing.md` (industry pages) — both Phase 2.x |
| 02 | `report-store-listing.md` ✓ shipped · `report-store-detail.md` ✓ shipped (case-study reuses for sample band) |
| 03 | `case-study.md` ✓ shipped · `report-viewer.md` (Phase 2.x) |
| 04 | `dashboard-home.md` (Phase 2.x) · `dashboard-detail.md` (Phase 2.x) · `saved-queries.md` (Phase 2.x) |
| 05 | `engagement-portal.md` (Phase 2.x) · `engagement-detail.md` (Phase 2.x) · `custom-research-flow.md` (Phase 2.x) |

When recipe exists → `/page <recipe>` slash-command flow. When recipe missing → propose recipe before building (per CLAUDE.md `/page` skill rule).

---

## Step 4 — Skill chain per surface

| Surface | Skill chain |
|---|---|
| 01 Discovery | `aura-design` (decisions) → `frontend-design` (code) → Framer Motion (state + scroll-driven) → `webapp-testing` (QA) |
| 02 Store | `aura-design` → `frontend-design` → catalogs (industries/regions) → `webapp-testing` |
| 03 Viewer | `aura-design` (reading rules — Apple Books pattern) → `frontend-design` → `webapp-testing` |
| 04 Dashboards | `aura-design` (working surface — restraint) → `frontend-design` → Highcharts via DS theme → `webapp-testing` |
| 05 Engagement | `aura-design` (working surface) → `frontend-design` → integrations (Cal.com / Stripe / Auth) → `webapp-testing` |

---

## Step 5 — When build brief crosses surfaces

If brief mentions 2+ surfaces (e.g. "Report Store w/ embedded sample reader" = 02 + 03):
- Identify primary surface (the page user is on)
- Identify secondary surfaces consumed inline (reader = embed of 03 patterns)
- Read both surface files
- Note shared atoms/molecules/organisms

**Cross-surface element catalog:**

| Element | Primary surface | Reused on |
|---|---|---|
| `<TopNavigation>` | All | All (different render-prop slot config per surface) |
| `<StatCard>` | 01 (methodology) | 03 (chart-stats) · 04 (dashboard tile) · 05 (action queue) |
| Cite-block | 03 (Viewer) | 02b (detail) · 04 (chart cite) |
| `<DarkGradientMesh>` | 01 (hero) | 02a (hero) · 04 (optional hero) |
| Filter strip + chip | 02a (listing) | 04 (dashboard) · 05 (engagement list) |
| `<ReportCard>` | 02a (grid) | 01 (featured band) · 03 (related) · 05 (deliverables) |
| `useAnimatedCounter` | 01 (stats) | 04 (dashboard stat tile) |

---

## Step 6 — Anti-patterns

| Anti-pattern | Why wrong |
|---|---|
| Building "case study page" by improvising organism names instead of reading recipe | Recipe is binding spec (Cat 13.9) |
| Treating Discovery (marketing) typography as default for Dashboards (working) | Context-mismatch — see surface 04 type system |
| Using cinematic-dark on Engagement portal w/o user toggle | Working context = light DEFAULT |
| Building "report search" w/o consulting Surface 02 catalog patterns | Workspace catalog = single source of truth |
| Inventing 6th surface ("admin console", "marketing CMS", "blog") | If new surface needed → ADR + brief w/ user before building |

---

## When in doubt

- Read the most specific surface file fully
- Cross-ref `anti-patterns.md` for surface-specific anti-pattern flags
- Cross-ref `voice.md` for tone calibration per surface
- Confirm w/ user before building if brief is ambiguous

---

## Cross-surface citations

This file = decision routing. Surface details live in `surfaces/<id>-<name>.md`.
- Cinematic mesh shared between 01 + 04 → `decisions/brand-variant.md`
- Chart picker → `decisions/chart-picker.md`
- Motion router → `decisions/motion-router.md`
- Density rules → `decisions/density-picker.md`
