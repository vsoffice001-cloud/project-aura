# V0.2_report

Ken Research V0.2 report (Qatar Fresh Herbs Market) — Next.js 15 port. **Heavy rewrite** of `V0.2_report-legacy/` (Vite/Figma Make export, ~70-80% throwaway).

## Setup

```bash
pnpm install
pnpm dev   # Next 15 dev server
pnpm build # production build
pnpm typecheck
pnpm lint
```

## Stack

- Next.js 15 + React 19 + Tailwind v4 + DS workspace + GSAP/Framer/Lenis
- Highcharts standard (DS-skinned)
- d3 (mindmap only — kept per user)
- pnpm@10.33.0 + Node ≥20 + alias `@/* → src/*`

## Variant

**Cinematic-dark hero** per KSA Coldchain reference image + `kenresearch.com/ksa-coldchain-test-market` live ref. Other sections editorial-light.

## Carry-over scope

- **STRUCTURE only** from legacy. Visuals discarded.
- 13-section IA + Qatar Fresh Herbs content verbatim (mock-data centralized).
- Recipe-driven: legacy 370+ DS deviation sites NOT carried.

## Lineage

- Legacy: `projects/V0.2_report-legacy/` (read-only)
- Audit: `docs/aura-sprint-2026-05-07-port/A3-V0.2_report-audit.md`
- Sprint: `docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md`
- Estimate: 9-13 working days (consumer-driven section ports)
