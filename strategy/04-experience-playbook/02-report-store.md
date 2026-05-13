# Surface 2 — Report Store

_The transactional surface where most rivals lose._

## Buyer's job
"I want to find a specific report, evaluate whether it answers my question, see what it costs, and buy it — without filling a form, without a sales call, without 'request a sample, our analyst will reach out in 24 hours.'"

## Where the bar sits today
From the audit ([`../02-competitors/competitor-landscape.md`](../02-competitors/competitor-landscape.md), §"Tier A UX Gap Nobody Is Filling"):

> Every Tier A competitor's website still behaves like a 2012 B2B lead-generation funnel rather than a 2026 research product experience.

- **No pricing visible** on IMARC, Mordor, MarketsandMarkets, Grand View, Technavio, Allied, Frost. You must inquire.
- **No real search** — taxonomy menus only. Buyers have to know our category structure before they can find a report.
- **No real preview** — TOC + a watermarked sample chart at best. Mordor leads here; everyone else is worse.
- **No checkout** — "Add to cart" usually means "submit a contact form."
- **Statista and Research and Markets are the exceptions** — they show pricing, have shopping carts, and convert without sales handoff.

This is the single largest UX opportunity in the entire category.

## Our north star
**Stripe checkout × Linear product page × NYT article preview.** The buyer should be able to:
1. Search naturally.
2. Read a substantial free preview.
3. See the price.
4. Add to cart and pay.
5. Get the report in their viewer immediately.

If they want to talk to an analyst, that's an *upsell* on top — not a gate in front.

## UX laws in play
- **Tesler's Law (conservation of complexity)** — the complexity of a 2,000-report catalog has to live somewhere. We absorb it in search and faceting; we do not push it onto the buyer as 14 nested menus.
- **Hick's Law** — every page shows ≤ 5 facet groups at a time. Buyers don't want to choose between 47 sub-industries.
- **Doherty Threshold (<400ms)** — search and filter responses must feel instant.
- **Jakob's Law** — buyers expect Amazon/Stripe-grade catalog and checkout. We honor that pattern.
- **Postel's Law** — be liberal in what we accept (typos in search, partial queries, NL phrasing) and strict in what we return (relevant, ranked).
- **Peak-End** — the *first* search result quality and the *last* checkout confirmation are what gets remembered. Both must be immaculate.
- **Trade-off accepted:** we lose some lead-capture form fills. We gain measurable conversion and *trust* — and the leads we do capture (custom research, consulting) are higher-intent because they came from a confident buyer, not a confused one.

## Mobile-first layout brief

### Catalog landing page (mobile)
- Big search field at top with NL placeholder examples that rotate ("Find OTT reports in Southeast Asia", "GCC parking market 2028").
- Below: 3–5 horizontally scrollable rails — "New this month", "GCC", "SEA", "Healthcare", "BFSI".
- Filter chips, not faceted sidebar. Sidebar appears on tablet+.

### Report detail page (mobile)
- Sticky purchase bar at bottom: title compact, price, "Buy" button. (Fitts's Law — thumb zone.)
- Above the fold: title, geography, last-updated date, page count, price.
- Free preview section: 2–3 real charts (interactive on dashboards, static here), 1 page of executive summary text, a real TOC.
- Methodology block — short, named, signed.
- Author analyst block with face + LinkedIn.
- Related reports rail.

### Checkout (mobile)
- Stripe-style 1-page checkout. No account required for single-report purchase. Receipt + viewer link on confirm. Account creation optional, post-purchase.

## Tokens / system decisions
- Search field: largest interactive element on the page (Fitts), 56px height mobile, dark-card surface, focus ring in `#806ce0`.
- Price tag: DM Sans, weight 600, never red. (Ken Red is *only* for the buy CTA.)
- Result cards: editorial, image-optional. Title in Noto Serif at 18–22px, dek in DM Sans at 14px.
- 8px grid throughout.

## Concrete moves
**30 days:**
- Get pricing onto every report detail page. Not "from $4,850" — actual per-license tiers (single user / team / enterprise).
- Remove the "request sample" gate. Replace with auto-generated free preview (2 charts + 1 page summary).
- Search input on the homepage and store header — even if backed by a basic full-text index, ship it.

**90 days:**
- Faceted search with chip-style filters. Region, sector, sub-sector, date, price band.
- Real cart + Stripe checkout for syndicated reports. (Custom research and consulting stay on a separate "Talk to us" path.)
- Embed-ready preview viewer (continues into Surface 3).

**180 days:**
- Natural-language search backed by an LLM over our catalog with actual citations to reports. This is a Tier-C-grade differentiator nobody in Tier A has.
- Personalized rails (region, sector) once accounts exist.
- Bundle/subscription packaging — successor to Dossier 360, with public pricing this time.

## Mapped projects
- [`projects/report-store-v07/`](../../projects/report-store-v07/) — primary
- [`projects/ken-research-backend/`](../../projects/ken-research-backend/) — search, pricing, checkout, fulfillment
- [`design-system/core/`](../../design-system/core/) — components used here

## Acceptance criteria
- Search response < 200ms (Doherty).
- LCP < 2.0s on report detail page (mid-range mobile, 4G).
- WCAG 2.2 AA on every interactive element including price tier selector.
- Conversion-funnel events instrumented end-to-end (search → detail → checkout → fulfillment) — we cannot improve what we cannot see.
- A buyer who has never bought from us can purchase a single-license report in < 3 minutes from search to download (user-test target).

---

## Page-level receipts (from [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md))

The Report Store is the surface with the densest receipt list. Most of the ranked moves from the synthesis live here.

### Steal from — report detail page
- **Mordor AI Market** ([mordorintelligence.com/industry-reports/artificial-intelligence-market](https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market)) — **driver/restraint impact table** with specific CAGR % contributions (e.g., "predictive analytics demand +8.2% CAGR / GPU bottlenecks -5.8% CAGR"). Highest-leverage single move from the entire 5-site audit. Surfaces analyst judgment as scannable data above the fold; no other competitor shows this. Add as a fixed section in the report detail page template.
- **IMARC EV Market** ([imarcgroup.com/electric-vehicles-market](https://www.imarcgroup.com/electric-vehicles-market)) — **inline 3-tier pricing block** (Single / 5-User / Corporate) with strikethrough anchoring; **"10–12 Weeks Post Purchase Analyst Support"** stated as a service-level commitment on the report page. Ken Research already offers analyst follow-up; the gap is *display*, not capability. Add the line in the report metadata block.
- **IMARC India EV** ([imarcgroup.com/india-electric-vehicle-market](https://www.imarcgroup.com/india-electric-vehicle-market)) — **regional vs global pricing differential** ($3,499 vs $3,999) signals rational pricing logic. Sub-national data previewed free.
- **Mordor India EV** ([mordorintelligence.com/industry-reports/india-electric-vehicle-market](https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market)) — **"View Global Report" + sibling regional variant links** for lateral navigation (Africa / Asia / Europe / Global). Cross-sell embedded in the reading experience, not a separate widget.
- **Mordor Cannabis** ([mordorintelligence.com/industry-reports/cannabis-market](https://www.mordorintelligence.com/industry-reports/cannabis-market)) — **explicit gating disclaimer** ("Segment shares available upon report purchase") more honest than hiding the gate; **6-question FAQ** answering buyer objections inline; methodology section explaining data discrepancies vs competitors.
- **Statista Outlook** ([statista.com/outlook/emo/ecommerce/worldwide](https://www.statista.com/outlook/emo/ecommerce/worldwide)) — **headline KPIs free above fold** (market size, CAGR, user count). Every "[sector] market size [year]" Google query that lands here immediately gets the answer; the gate fires only when the buyer wants the segmentation table. Also Google-feature-snippet rankable.
- **Statista locked stat** ([statista.com/statistics/617136/digital-population-worldwide/](https://www.statista.com/statistics/617136/digital-population-worldwide/)) — **citation block (APA, Harvard, Chicago) free on every page including locked ones.** Single most efficient distribution mechanism in the audit. Cost: a static UI component below every report card. Should be in the next sprint.
- **CB Insights company profile** ([cbinsights.com/company/anthropic](https://www.cbinsights.com/company/anthropic)) — **"$0000 View" progressive disclosure gate**: show field labels and obfuscated values rather than hiding fields. Creates data hunger; converts better than a hard wall.

### Steal from — sector hub page
- **Mordor "TRENDING REPORTS"** section on the sector hub — CAGR callouts on featured reports. The one working element on a mostly-broken hub.
- A complete sector hub doesn't exist anywhere in the audit. **The pattern Ken Research should ship** is: sub-sector taxonomy + report count + CAGR callouts on featured reports + filter/sort by geography/price/date. Whitespace win — neither direct rival has this.

### Avoid like
- **IMARC Cosmetics** ([imarcgroup.com/cosmetics-market](https://www.imarcgroup.com/cosmetics-market)) — **6 competing CTAs** (Buy Now / Request Sample / Request Customization / Speak to Analyst / Request Brochure / Inquire Before Buying). Hick's Law paralysis. Maximum 3 paths per page.
- **IMARC Packaged Food** ([imarcgroup.com/packaged-food-market](https://www.imarcgroup.com/packaged-food-market)) — **reversed strikethrough pricing** ($3,999 crossed out → $4,500). Destroys credibility instantly.
- **IMARC Healthcare hub** ([imarcgroup.com/categories/healthcare-market-research-reports](https://www.imarcgroup.com/categories/healthcare-market-research-reports)) — **sector page that's a marketing-copy shell** with no report listings. Page's job is to show the product, not sell the firm.
- **Mordor pricing inconsistency** — pricing shown on the Cannabis report, absent on AI / EV / Coffee. Inconsistency is worse than opacity. Either show pricing on all report pages or none.
