# reports-pdp-v2 · Visual Baseline Screenshots

**Purpose:** Reference for design intent · tech-team uses to verify their build matches.

## Layout

```
qa-screenshots/
├── v1a-final/        ← v1 baseline (pre-PRD rebuild · archived)
├── v2a-final/        ← v2 post-build (Phase 1B-3B complete · 2026-05-11)
└── v2b-final/        ← v2b current (this is the canonical handover baseline · 2026-05-13)
    ├── primary-australia-cold-chain-desktop-1440.png
    ├── primary-australia-cold-chain-mobile-390.png
    ├── secondary-gcc-pharma-desktop-1440.png
    └── lighthouse/
        └── mobile-final.report.{html,json}   ← Lighthouse mobile prod-build
```

## Regenerate baselines

```bash
# 1. Start prod server
cd projects/reports-pdp-v2
rm -rf .next && pnpm build && PORT=3100 pnpm start &
sleep 10

# 2. Run full QA suite (includes screenshots)
pnpm exec playwright test qa-full --reporter=list

# 3. Capture Lighthouse mobile
npx -y lighthouse@12 http://localhost:3100/reports/australia-cold-chain-market-2022-2027 \
  --form-factor=mobile \
  --screenEmulation.mobile=true \
  --screenEmulation.width=375 \
  --screenEmulation.height=667 \
  --throttling-method=simulate \
  --chrome-flags="--headless --no-sandbox" \
  --output=json --output=html \
  --output-path=qa-screenshots/v2b-final/lighthouse/mobile-final \
  --quiet

# 4. Kill prod server
lsof -ti:3100 | xargs kill -9 2>/dev/null
```

## Diff workflow (tech-team)

After wiring Django backend:

```bash
# 1. Re-run screenshots in your environment
pnpm exec playwright test qa-full --update-snapshots

# 2. Compare against baseline in v2b-final/
# Tools: ImageMagick · pixelmatch · BackstopJS · Chromatic

magick compare -metric AE \
  qa-screenshots/v2b-final/primary-australia-cold-chain-desktop-1440.png \
  qa-screenshots/v2b-tech/primary-australia-cold-chain-desktop-1440.png \
  diff.png

# Acceptable diff:
# - < 100 pixels: noise (font rendering · subpixel)
# - 100-1000 pixels: minor (layout shift · review)
# - > 1000 pixels: significant (likely regression · investigate)
```

## What's captured

| Screenshot | Viewport | URL |
|---|---|---|
| `primary-australia-cold-chain-desktop-1440.png` | 1440×900 desktop | `/reports/australia-cold-chain-market-2022-2027` |
| `primary-australia-cold-chain-mobile-390.png` | 390×844 mobile | same |
| `secondary-gcc-pharma-desktop-1440.png` | 1440×900 desktop | `/reports/gcc-pharmaceutical-market-2024-2030` |

## Lighthouse evidence

**File:** `lighthouse/mobile-final.report.html`

**Scores (2026-05-13 · v2b prod-build):**
- Performance · 91
- Accessibility · 100
- Best Practices · 100
- SEO · 100

**Metrics:**
- FCP 1.1s · LCP 3.5s · CLS 0 · TBT 40ms · TTI 3.5s · SI 1.1s

## Test specs (regenerate-able)

- `tests/qa-full.spec.ts` — axe + screenshot + smoke (all routes)
- `tests/modal-a11y.spec.ts` — modal a11y deep test (7 assertions · all pass)

## When to regenerate

- After backend wiring (Django CMS)
- After analytics wiring (GTM/GA)
- After NextAuth wiring
- After major component changes
- Pre-deployment-PR (CI baseline)
