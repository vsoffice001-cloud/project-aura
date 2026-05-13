# Surface 1 — Discovery

_The first 5 seconds. Homepage, sector pages, top nav._

## Buyer's job
"I just landed here from a Google query for [GCC EV market 2028]. In 5 seconds I need to know: are these people credible? Are they better than the four other tabs I have open?"

## Where the bar sits today
From [`../02-competitors/competitor-landscape.md`](../02-competitors/competitor-landscape.md):

- **Tier A baseline (IMARC, Mordor, Grand View, Allied):** Navy/blue corporate palette, stock photography, logo carousels, "ESOMAR member" badges. Identical-looking sites. 2 / 5 design maturity.
- **Tier B (Gartner, Forrester):** Role-based IA, real brand voice, proprietary frameworks visible. 4–5 / 5.
- **Tier C (Crunchbase, CB Insights, PitchBook):** Best homepage UX in the category — natural-language search examples, live data, free editorial. 4–4.5 / 5.

Crunchbase has better homepage UX than firms with 10× its revenue. **Design is a strategic choice, not a budget question.**

## Our north star
A homepage that feels closer to **NYT cover story × Linear product page × Stripe credibility** than to a research firm. Editorial weight. Real specificity over generic claims. Live numbers, not stock photos.

References we steal from outside the category: nytimes.com (front-page editorial weight), linear.app (product clarity), stripe.com (trust through specificity), apple.com/macbook-pro (cinematic dark).

## UX laws in play
- **Jakob's Law** — buyers come from sites with strong search and previews. We honor that pattern; we don't reinvent navigation.
- **Aesthetic-Usability Effect** — a more beautiful site is *believed* to be more usable and more credible. In a category where rivals look 2014, this is a real advantage.
- **Fitts's Law** — primary CTA gets the largest tap target on mobile, in the thumb zone.
- **Hick's Law** — homepage shows ≤ 5 primary paths, not 14 (the count of our sectors). Sectors live one click deep.
- **Von Restorff** — Ken Red `#b01f24` is a scarce element; one CTA per viewport, max.
- **Peak-End Rule** — the hero and the footer are the two most-remembered points. Both must land.
- **Trade-off accepted:** we break a Tier A "category convention" (logo carousel, certification badges) on purpose. Replaced with one specific verifiable claim (e.g., "[N] reports across GCC since 2019") and one named case study.

## Mobile-first layout brief (360px → up)
- **Above the fold (mobile):** Editorial headline (Noto Serif, 39–48px), one specific dek line, single primary CTA (Ken Red), trust micro-line ("Gurugram · Dubai · Tangerang · Doha").
- **Section 2:** Live recent reports — 3 cards, real titles, real dates, real geographies (kills the stock-photo problem in one move).
- **Section 3:** Sector grid — 14 sectors, but only 6 visible on mobile, "see all" reveals the rest. Hick's Law respected.
- **Section 4:** One named, design-grade case study with outcome metric. Replaces logo carousel.
- **Section 5:** GCC/SEA/Africa specialization — a map visual or a regional report-count number, *verified*.
- **Section 6:** What we sell (Ken Consulting, Intelligence, Survey, Procurement, Expert Panel) — 5 cards, one line each.
- **Section 7:** Quiet contact band, then footer.

Tablet adds breathing room; desktop adds editorial side rail and a sticky sub-nav.

## Tokens / system decisions
- Background `#030304`, text `#FAFAFA`, scarce Ken Red `#b01f24` for CTAs only, purple `#806ce0` for editorial highlights.
- Display: Noto Serif at hero h1 (48.8px) and section h2 (39px). Body: DM Sans at 16px (`--text-sm`).
- Spacing: 8px grid; section padding 64–96px desktop, 32–48px mobile.
- Motion: ≤ 200ms eases, opacity + 4–8px translate only. No parallax. Respect `prefers-reduced-motion`.

## Concrete moves
**30 days:**
- Rewrite hero copy off the "Global Strategic Consulting Firm" cliché. Replace with one specific, verifiable promise.
- Replace logo carousel with one design-grade case study card.
- Add live "Recent reports" strip wired to the report store.
- Audit and remove unverified claim chips ("190+ countries", "10 lakh+ assets") unless they can be re-anchored.

**90 days:**
- Sector pages built on a single template — each sector gets a real, design-grade landing page (not a category dump).
- GCC / SEA region pages — lean into existing publishing strength.
- Top nav v32 hardened: search-first, with NL query suggestions ("Find me OTT reports in Southeast Asia").

**180 days:**
- "State of [sector]" free editorial pieces, embeddable, one per top sector. Statista's distribution flywheel applied.

## Mapped projects
- [`projects/topnav-v32/`](../../projects/topnav-v32/) — discovery anchor
- [`projects/webpages-ken/ken-research-about/`](../../projects/webpages-ken/ken-research-about/) — about/credibility
- [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) — credibility surface (link from home)

## Acceptance criteria
- LCP < 1.8s on mid-range mobile (4G).
- INP < 200ms.
- CLS < 0.05.
- WCAG 2.2 AA on all interactive elements.
- Lighthouse design + content audit passes 9.5/10 internal review.
- A buyer who has never heard of Ken Research can describe what we do correctly after 30 seconds on the page (user-test target).

---

## Page-level receipts (from [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md))

### Steal from
- **Crunchbase homepage** ([crunchbase.com](https://www.crunchbase.com)) — search bar as the primary hero interactive element with NL query chips below; live statistics row showing catalog vitality ("X reports / Y new this month / Z sectors").
- **Mordor homepage** ([mordorintelligence.com](https://www.mordorintelligence.com)) — quantified subheadline under the main headline ("26,683 reports across 100+ industry segments"). One specific number, sourced.
- **Statista homepage** ([statista.com](https://www.statista.com)) — search bar in persistent header (not hidden behind an icon); popular topic chips in hero; price anchor in nav ("Reports from $X").
- **CB Insights homepage** ([cbinsights.com](https://www.cbinsights.com)) — outcome-first trust badge row ("All of the Big 4 / 86% of software companies / 26 of 30 largest banks") replacing generic certification logos. Ours: "Cited by analysts at [X] of the top 50 consulting firms / [Y] investment memos."

### Avoid like
- **IMARC homepage** ([imarcgroup.com](https://www.imarcgroup.com)) — hero CTA pointing to "IMARC Engineering" (a different business). Brand identity fragmentation at the entry point. Ken Research's homepage gets exactly one identity.
- **Mordor sector hub** ([mordorintelligence.com/industry-reports](https://www.mordorintelligence.com/industry-reports)) — "Contact Us" as the primary sector-hub CTA, converting browse intent into sales inquiry before any reports are shown.
- **IMARC About** ([imarcgroup.com/about-us](https://www.imarcgroup.com/about-us)) — strongest trust stats ("34 of top 50 pharma firms") buried on the contact page. Trust signals belong in the hero.
