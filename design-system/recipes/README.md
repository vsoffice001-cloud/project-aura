# Page Recipes — Ken Research

**Purpose:** Declarative page-assembly specs. Aura reads the matching recipe before composing a page. Reduces guessing, eliminates drift, makes prompt-to-page possible.

**Status:** Phase 1 (Aura Sprint 2026-05-01)

---

## How recipes work

Each recipe = one page intent. Specifies:

1. **Intent** — what user wants to accomplish on this page
2. **Pillar** — voice + color tag (Consulting / Research / Surveys / Foundations)
3. **Variant** — cinematic dark or editorial light
4. **Section sequence** — ordered list of organisms to compose
5. **Voice rules** — pointer to `voice/<pillar>.md`
6. **Motion rules** — pointer to `motion/MOTION_SPEC.md`
7. **Anti-patterns** — pointers to relevant `ANTI_PATTERNS.md` categories
8. **Mock-data shape** — what the recipe expects in `mock-data.ts`
9. **A11y / perf gates** — must-pass items before "done"

Aura's flow: intent → recipe → component reference → compose → screenshot → verify → done.

---

## Available recipes

### Consulting pillar

| Recipe | Intent | File |
|---|---|---|
| Case study | Premium narrative showcase of client engagement | [`case-study.md`](case-study.md) |
| Service overview | Single advisory service detail page | [`service-overview.md`](service-overview.md) |
| Methodology page | Detailed methodology explainer | [`methodology.md`](methodology.md) |

### Research pillar

| Recipe | Intent | File |
|---|---|---|
| Report Store home | Report Store homepage w/ featured + browse + categories | [`report-store-home.md`](report-store-home.md) |
| Report Store listing | Filterable report listing page | [`report-store-listing.md`](report-store-listing.md) |
| Report detail | Single report detail page (preview, TOC, methodology, CTA) | [`report-detail.md`](report-detail.md) |
| Sector landing | Industry / sector landing page | [`sector-landing.md`](sector-landing.md) |

### Surveys pillar

| Recipe | Intent | File |
|---|---|---|
| Survey listing | Survey listings (open / closing / completed) | [`survey-listing.md`](survey-listing.md) |
| Survey detail | Single survey w/ description, time estimate, take-survey CTA | [`survey-detail.md`](survey-detail.md) |

### Foundations pillar

| Recipe | Intent | File |
|---|---|---|
| DS doc page | Documentation page in DS-core or DS-dashboard | [`ds-doc-page.md`](ds-doc-page.md) |

---

## Recipe schema (template)

Every recipe follows this structure:

```yaml
intent: <short phrase>
pillar: <consulting | research | surveys | foundations>
variant: <cinematic-dark | editorial-light>
voice_doc: voice/<pillar>.md
motion_doc: motion/MOTION_SPEC.md
anti_patterns: [list of category numbers from ANTI_PATTERNS.md]

sections:
  - id: <unique-id>
    organism: <component-name>
    purpose: <one-line>
    background: <bg-token>
    spacing: <spacing-token>
    motion: <motion-pattern>
    data: <mock-data shape ref>

mock_data:
  required_keys: [list of expected keys in src/lib/mock-data.ts]

gates:
  a11y: [WCAG AA, kbd nav, ARIA, contrast]
  perf: [LCP < 2.5s, INP < 200ms, CLS < 0.1]
  visual: [screenshot baseline at 1440 + 768 + 390]
```

This is an MD-based schema (not strict YAML) — Aura reads markdown sections. Update parser if YAML preferred later.

---

## When to use which recipe

If user prompt contains:

| Prompt signal | Recipe |
|---|---|
| "case study", "client story", "engagement showcase" | `case-study.md` |
| "service page", "advisory service", "how we work" | `service-overview.md` |
| "methodology", "approach", "research process" | `methodology.md` |
| "report store home", "research home", "browse reports" | `report-store-home.md` |
| "report listing", "filter reports", "search reports" | `report-store-listing.md` |
| "report detail", "single report", "report page" | `report-detail.md` |
| "industry page", "sector page", "vertical landing" | `sector-landing.md` |
| "survey list", "survey listing", "all surveys" | `survey-listing.md` |
| "survey detail", "take survey", "survey page" | `survey-detail.md` |
| "DS doc", "foundations page", "tokens page", "components page" | `ds-doc-page.md` |

If no recipe matches → ask user, don't compose blind. Better: propose a new recipe + write it.

---

## Phase 2 expansion

Recipes to add post-sprint:
- Comparison page (multi-report side-by-side)
- Author / analyst profile page
- Newsletter / mailing list landing
- Press / news page
- About / company page
- Pricing page
- Contact page
- Search results page (cross-pillar)
- Error pages (404, 500)
- Maintenance / coming-soon pages

---

**Voice:** Foundations — exact, scannable, link-rich.
