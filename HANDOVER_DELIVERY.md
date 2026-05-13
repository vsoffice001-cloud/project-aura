# Ken Research — Design → Tech Handover Delivery

**Date:** 2026-05-13
**From:** Design team (Aura-assisted)
**To:** Tech team
**Scope:** Design System v2 + Reports PDP v2 · ready for tech intake

---

## TL;DR · 30-second read

Two artifacts deliverable today:
1. **`@kenresearch/design-system` (core-v2)** — workspace TS library · 168 components · 100% OG coverage · `pnpm build` clean.
2. **`reports-pdp-v2`** — Next 16 PRD-driven Reports PDP · 30 modules · 5 access tiers · Lighthouse mobile **91/100/100/100** · axe 0 critical/serious · modal a11y 7/7.

Tech team picks up: Django CMS implementation · `/api/leads` route · NextAuth · analytics wiring · deployment · npm publish.

---

## 1 · What's deliverable (✅ ready · open `STATUS.md` per project)

### Design System v2

| Item | Status | Evidence |
|---|---|---|
| Package builds clean | ✅ | `cd design-system/core-v2 && pnpm build` → `dist/` w/ .d.ts |
| 168 components organized | ✅ | atoms · molecules · organisms · hooks · ui · types · patterns · charts |
| Public subpath exports | ✅ | `package.json` exports map |
| Adapter pattern documented | ✅ | `DESIGN.md` § Adapter · `core-v2/docs/COMPONENT_REFERENCE.md` |
| AI lookup doc | ✅ | `core-v2/docs/COMPONENT_REFERENCE.md` w/ decision tree |
| 100% OG `Design_system_vs_26` coverage | ✅ | port log `docs/CHANGELOG.md` 2026-05-13 |
| F1+F2 prevention script | ✅ | `pnpm verify` · scripts/verify.sh |
| Read-only OG archive | ✅ | `Design_system_vs_26 (og and final)/` preserved |

### Reports PDP v2

| Item | Status | Evidence |
|---|---|---|
| Production build | ✅ | Next 16.2.4 · 1816ms · 6 prerendered pages |
| TypeScript strict | ✅ | `pnpm typecheck` clean |
| Mock data isolated | ✅ | `src/lib/mock-data.ts` (AU_COLD_CHAIN + GCC_PHARMA) |
| Lighthouse mobile (prod) | ✅ | **91 / 100 / 100 / 100** (perf/a11y/bp/seo) |
| Lighthouse desktop | ✅ | 98 / 96 / 100 / 100 |
| axe-playwright | ✅ | 0 critical · 0 serious (desktop + mobile) |
| Modal a11y test | ✅ | 7/7 pass (`tests/modal-a11y.spec.ts`) |
| Visual baseline | ✅ | `qa-screenshots/v2b-final/` |
| README + HANDOVER + STATUS | ✅ | per-project docs |
| `.env.example` | ✅ | template w/ NEXT_PUBLIC_API_URL etc. |

---

## 2 · What's NOT deliverable today (roadmap · NOT blockers)

### Other consumer projects (cleanup queue · separate sprints)

| Project | Status | What's left |
|---|---|---|
| `V0_lite_report` | cleanup | a11y axe · Lighthouse mobile · real Logo · useAnalytics stub · slide assets |
| `topnav-v32` | cleanup | a11y · perf · visual baseline · docs |
| `V0.2_report` | scaffold | 13-section IA port (per `docs/aura-sprint-2026-05-07-port/A3-V0.2_report-audit.md` · ~9-13 days) |
| `report-store` | scaffold | 110+ files of section ports (per `A2-report-store-audit.md`) |
| `casestudy-templates/*` | exploring | mature templates · future sprint |
| `webpages-ken/*` | exploring | static HTML · low priority |

### Out-of-scope (tech-team owns · NOT design)

- ESLint workspace config (lint script in core-v2 references uninstalled `eslint`)
- Storybook stories (skipped · `COMPONENT_REFERENCE.md` decision tree replaces)
- `.github/workflows/ci.yml` (CI setup)
- Husky + lint-staged pre-commit hooks
- npm publish of `@kenresearch/design-system` (currently `workspace:*` consumed)
- Django CMS implementation (per PRD §39)
- Real `/api/leads` Route Handler (mock-only console.log)
- NextAuth wiring (5 access tiers depend on auth state)
- Analytics wiring (GTM · GA · Leadfeeder · Clarity)
- AWS / Nginx / deploy automation
- Cross-browser test infra beyond Chrome
- Highcharts commercial license + legal review

### Known-deferred polish (low priority · tech can address)

- DS core-v2 verify script flags: 44 raw `<button>` files · 31 `[#hex]` arbitraries · 312 `[Npx]` arbitraries · 29 hardcoded hex (mostly in OG-ported organisms · pre-existing · catalogged for future sprint)
- reports-pdp-v2 verify warnings: 3 raw `<button>` files · 22 `[Npx]` arbitraries · 2 hardcoded hex · 1 `max-w-[` arbitrary
- Navbar touch-target sizes (Lighthouse flagged `/procurement` `/expert-panel` < 24px)
- Dual-section DOM cleanup (layout-wraps + organism-self-wraps = redundant `<section>`)
- StickyCTA → lead form wiring (fires analytics only · no form trigger)
- Mobile bottom-sheet for DatasetPreviewDrawer (currently right-slide all viewports)
- `--variant-editorial-text-tertiary` token registration in tokens.css

---

## 3 · Order of operations · tech intake checklist

```
[ ] 1. Clone workspace (git URL TBD by user)
[ ] 2. pnpm install (workspace root)
[ ] 3. Verify match: Node 20.20.1 · pnpm 10.33.0 (`.nvmrc` · `packageManager`)
[ ] 4. Read README.md · this doc · CLAUDE.md (in that order)
[ ] 5. cd design-system/core-v2 && pnpm typecheck && pnpm build
[ ] 6. Read core-v2/HANDOVER.md · STATUS.md · README.md
[ ] 7. cd ../../projects/reports-pdp-v2 && pnpm typecheck && pnpm build && pnpm start
[ ] 8. Open localhost · click through all 30 modules · 5 access tiers · 4 forms
[ ] 9. Read reports-pdp-v2/HANDOVER.md · STATUS.md · README.md
[ ] 10. Read docs/API_CONTRACT.md (Django endpoint spec)
[ ] 11. Read docs/SCHEMA.md · MOCK_DATA.md (data shapes)
[ ] 12. Run pnpm --filter reports-pdp-v2 test (Playwright qa-full + modal-a11y)
[ ] 13. Run pnpm --filter reports-pdp-v2 verify (F1+F2 prevention gates)
[ ] 14. Wire Django CMS per API_CONTRACT.md
[ ] 15. Set up CI w/ pnpm verify + typecheck + Playwright
[ ] 16. Add ESLint workspace config (currently broken)
[ ] 17. Add Husky pre-commit · lint-staged
[ ] 18. Pre-npm-publish: flip core-v2 package.json exports map dist/ paths · semver bump
```

---

## 4 · Evidence package

### Lighthouse reports
- `projects/reports-pdp-v2/qa-screenshots/v2b-final/lighthouse/mobile-final.report.html` (prod-build mobile)
- `projects/reports-pdp-v2/qa-screenshots/v2b-final/lighthouse/mobile-final.report.json`

### Visual baselines
- `projects/reports-pdp-v2/qa-screenshots/v2b-final/` (latest)
- `qa-screenshots/v1a-final/` (v1 baseline) · `v2a-final/` (v2 post-build)
- Comparison guide: `projects/reports-pdp-v2/qa-screenshots/README.md`

### Test artifacts
- `projects/reports-pdp-v2/tests/qa-full.spec.ts` (axe + visual + a11y)
- `projects/reports-pdp-v2/tests/modal-a11y.spec.ts` (7 assertions · all pass)
- Run results: `projects/reports-pdp-v2/test-results/` (regenerated per run)

### Memories (Aura context · informational · not required reading)
- `~/.claude/.../memory/MEMORY.md` (index of standing rules + project state)
- 20+ feedback/project memories · auto-loaded each Aura session

---

## 5 · API contract for Django team

See [docs/API_CONTRACT.md](docs/API_CONTRACT.md) for full endpoint spec mirroring `src/lib/mock-data.ts` shapes:

- `GET /api/reports?industry=&region=&page=` → `{ items: ReportItem[], total, totalPages }`
- `GET /api/reports/[slug]` → `ReportDetailV2` (full PDP shape · access-tier aware)
- `POST /api/leads` → `{ status: 'received' }` (replaces console.log in forms/shared.tsx)
- `GET /api/industries` → `IndustryData[]`
- `GET /api/regions` → `RegionData[]`
- etc.

Access tier resolution: `src/lib/access-tier.ts` (mock · tech wires to real subscription state).

---

## 6 · Standing rules (Ken Research design discipline)

These apply to all design work going forward · tech-team good to know for code review:

1. **Token-only** — no hardcoded hex/px in components. Use `var(--color-*)` · `var(--space-*)` · `var(--text-*)`.
2. **DS atoms over inline** — never `<button>` raw · always `<Button>` from DS.
3. **Adapter pattern** — DS organisms take data via PROPS · never import consumer mock data.
4. **Recipe-driven** — page builds follow recipes · LOCK variant + organism filenames + bg alternation.
5. **A11y first** — WCAG AA min · Lighthouse a11y ≥95 mobile · `prefers-reduced-motion` honored.
6. **Framer Motion only** — no GSAP · no Lenis (removed 2026-05-08 dev-team parity).
7. **9.5/10 cinematic finish** — per-section craft decisions logged inline.

Full rules: [CLAUDE.md](CLAUDE.md) + [design-system/DESIGN.md](design-system/DESIGN.md) + [design-system/ANTI_PATTERNS.md](design-system/ANTI_PATTERNS.md).

---

## 7 · Support during intake

Design lead: **design@kenresearch.com** (Aura-assisted)

First-week intake support:
- Async questions: Slack/email channel
- Live walkthrough call available (60-min · DS overview + reports-pdp-v2 deep-dive + Q&A)
- Loom recording covering all 30 PDP modules + access tier matrix (TBD · request via email)

---

**Reviewed:** 2026-05-13
**Next review:** post-tech-intake (3 weeks) · update based on tech-team feedback
