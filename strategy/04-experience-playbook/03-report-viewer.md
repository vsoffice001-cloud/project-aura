# Surface 3 — Report Viewer

_What happens after they pay. The deliverable itself._

## Buyer's job
"I bought an 80-page report. Now I need to read it, find the chart I care about, share one slide with my team, and pull a number into my own deck — without scrolling through a 14MB PDF on my phone."

## Where the bar sits today
- The category bar is **PDF emailed as attachment** — sometimes plus PowerPoint and Excel.
- A few Tier B players (Gartner, Forrester) have proprietary readers behind their subscription. None of Tier A has a real in-browser viewer.
- Statista's data viewer exists but is chart-by-chart, not report-by-report.
- **The bar is the floor.** Trivial to clear.

## Our north star
**Apple Books × Notion × Linear changelog × Substack reader.** A web-first, mobile-grade, beautiful report reading experience. The PDF still exists for download — but the *primary* artifact is the viewer.

Specifically: a long-form, dark-themed, typographically gorgeous reader with live charts, a sticky TOC, footnote citations, share-this-section links, and one-click "copy chart as image" / "copy data as CSV".

## UX laws in play
- **Aesthetic-Usability** — a beautiful reader makes the *research itself* feel more credible. Same content, more authority.
- **Peak-End** — the chart you remember and the page you closed on are what define the buyer's perception of report quality. Charts must be the peak.
- **Miller's Law** — chunking. Long sections broken into digestible blocks with clear hierarchy.
- **Law of Proximity** — chart + caption + source must visually cohere as one unit, not three floating elements.
- **Doherty** — page-jumps via TOC must be < 400ms; chart hover/filter < 200ms.
- **Jakob's Law** — readers know the Notion / Substack reading pattern. Use it. Don't invent gestures.
- **Trade-off accepted:** the viewer is more work than emailing PDFs. The trade is that the viewer becomes a brand asset — every report shared is a marketing surface for Ken Research.

## Mobile-first layout brief
- **Top:** title, sub-title, last-updated, "Download PDF / PPT / XLSX" menu, "Share" menu.
- **Sticky TOC** — collapses to a hamburger on mobile, expands as a left rail on desktop.
- **Body:** Noto Serif headings, DM Sans body at 17px mobile / 18px desktop, generous line-height.
- **Charts inline:** every chart has hover, legend toggle, "open full screen", "copy as image", "download data". Charts are dark-themed by default with a light-mode toggle for printing.
- **Citations:** footnote-style, click to open source pane.
- **Section share:** every h2 has a "copy link to this section" affordance on hover/long-press.
- **Reader settings:** font size, line-height, theme — saved per user.

Tablet adds the TOC rail. Desktop adds a right-rail summary card and a "next section" sticky CTA.

## Tokens / system decisions
- Body type 17–19px (taller than the marketing site's 16px — reading distance and dwell time differ).
- Charts: design-system token-driven palette, never raw hex. Colorblind-safe defaults.
- Code/numerics: tabular-nums on, monospaced for tables.
- Motion: section transitions ≤ 200ms, never animate charts on entry beyond a 1-tick fade-in.

## Concrete moves
**30 days:**
- Audit the current PDF deliverable — what fraction of charts are unreadable on mobile, what fraction of pages have alignment debt? Create a fixable-vs-rebuild list.
- Pick 1 flagship report and prototype the viewer for it end-to-end.

**90 days:**
- Ship the viewer as the default deliverable for new syndicated reports. PDF/PPT/XLSX become exports, not the primary artifact.
- "Copy chart as image / data as CSV" — ship.
- Per-section share links — ship.

**180 days:**
- Annotate-and-comment for team plans (Notion-style). Buyers' teams collaborate inside the report.
- "Update available" notifications when underlying data refreshes (Tier C territory).
- Embeddable single-chart widgets — Statista's distribution flywheel applied to *our* data.

## Mapped projects
- New project — viewer doesn't exist yet. Suggest folder: `projects/report-viewer-v01/` (Next.js to inherit ken-v1's stack).
- [`design-system/core/`](../../design-system/core/) — chart components, type stack, tokens.
- [`projects/ken-research-backend/`](../../projects/ken-research-backend/) — fulfillment (entitlement, signed URLs, version pinning).

## Acceptance criteria
- LCP < 2.0s on report open.
- TOC jump < 200ms.
- Charts interactive < 100ms after viewport entry.
- WCAG 2.2 AA — all charts have data table fallbacks; all interactions keyboard-accessible.
- Print stylesheet works for the rare buyer who prints.
- Reader-survey NPS > 50 within 6 months of launch (user-test target).

---

## Page-level receipts (from [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md))

This surface is genuinely sparse across the audit — none of the 5 competitors has a real in-browser report viewer. **A basic in-browser viewer with locked-section previews puts Ken Research first-in-class in the direct peer set.** The receipts below are micro-patterns, not whole-page references.

### Steal from
- **Statista stat page** ([statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/](https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/)) — **"+" suffix on download buttons** (PDF+, XLS+, PNG+) as a clean locked-state signal without an intrusive lock icon. Free data table visible; downloads gated. Apply this pattern to chart export buttons in the Ken Research viewer.
- **CB Insights "$0000 View"** ([cbinsights.com/company/anthropic](https://www.cbinsights.com/company/anthropic)) — **progressive disclosure gate**: show the field labels and the data structure, obfuscate the values. Creates curiosity; doesn't hide that the data exists. Apply to gated sections in the viewer (e.g., locked segmentation tables show row labels and column headers, redacted numbers).
- **Mordor sticky bottom CTA** ([mordorintelligence.com/industry-reports/cannabis-market](https://www.mordorintelligence.com/industry-reports/cannabis-market)) — sticky "Complete My Request" pattern on long-scroll pages. For the viewer, equivalent is a sticky "Download / Cite / Share" toolbar that follows scroll on mobile.

### Avoid like
- The category default — **PDF email attachment** — is not a "page" we can audit, but it is the trap to avoid. A viewer that downloads a PDF and ends there has thrown away the strategic surface.
