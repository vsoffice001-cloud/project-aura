# competition-benchmarking-listing-v01

> Ken Research Competition Benchmarking listing page — editorial light variant. Browse, filter, and discover competitive benchmarking reports across 12 industries and 7 regions.

## Stack

- Vite 6.3.5 + React 19
- Tailwind v4 (`@tailwindcss/vite`)
- GSAP 3.x (hero animation)
- Radix UI + custom Ken Bold DS atoms/molecules

## Quick start

```bash
pnpm install
pnpm dev      # dev server (auto-port from 5173)
pnpm build    # production build → dist/
```

## Structure

```
src/
  app/
    App.tsx                           # Page orchestration
    components/
      BenchmarkHeroBanner.tsx         # Black hero, GSAP, stats
      BenchmarkFilterSidebar.tsx      # Desktop 280px sticky sidebar
      BenchmarkListingToolbar.tsx     # Sort + chips + ViewToggle
      BenchmarkCard.tsx               # Report card (featured + standard)
      BenchmarkMobileFilterSheet.tsx  # Mobile slide-from-right sheet
      ActiveFilterStickyBar.tsx       # Desktop sticky filter chips
      BenchmarkTrendingTopics.tsx     # Tail: trending topic pills
      BenchmarkTestimonials.tsx       # Tail: buyer testimonials
      BenchmarkCustomResearchCTA.tsx  # Tail: black bg CTA
      hooks/
        useBenchmarkFilters.ts        # Filter + sort + URL sync
        useProgressiveLoad.ts         # Infinite scroll
        useCrossfade.ts               # Filter change crossfade
  lib/
    mock-data.ts                      # TODO: replace w/ real API
  styles/
    index.css → fonts.css + tailwind.css + theme.css
```

## Mock data

All benchmark data is in `src/lib/mock-data.ts`. Every export is marked `// TODO: replace w/ real API`.

## Tokens

Brand tokens: `src/styles/theme.css`. Variant: **editorial light** (warm off-white surfaces, `#b01f24` CTA only).

## Docs

- `STATUS.md` — current status + pre-handover checklist
- `HANDOVER.md` — full tech-team handover notes
