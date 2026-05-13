# Mordor Intelligence — Page-Level UX Deep-Dive
_Audit date: 2026-04-28._

---

## Summary verdict
Mordor is the strongest pure-UX performer in the direct Tier A peer set. Its report detail pages show meaningful data upfront — CAGR, market size, driver/restraint impact tables, segment share percentages — without forcing a form fill first. The homepage is restrained and clean by category standards. The fatal weakness is site-wide: most secondary pages (methodology, pricing explainer, case studies, catalog sub-pages, press releases) either 404 or are structural shells with no real content. The "Synapse" platform is real enough to demo but invisible on price. The overall experience is best summarized as: *strong report pages wrapped in a hollow site.*

---

## Pages audited

- Homepage: `https://www.mordorintelligence.com`
- About: `https://www.mordorintelligence.com/about`
- Sectors hub: `https://www.mordorintelligence.com/industry-reports`
- Industry sector page (Food & Bev attempted — 404; Technology — 404): see note
- Report detail — large market (AI): `https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market`
- Report detail — large market (EV global): `https://www.mordorintelligence.com/industry-reports/electric-vehicle-market`
- Report detail — niche (Coffee): `https://www.mordorintelligence.com/industry-reports/coffee-market`
- Report detail — niche (Cannabis): `https://www.mordorintelligence.com/industry-reports/cannabis-market`
- Report detail — regional (India EV): `https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market`
- Report detail — regional (Europe EV): `https://www.mordorintelligence.com/industry-reports/europe-electric-vehicle-market`
- Report detail — regional (Europe Coffee): `https://www.mordorintelligence.com/industry-reports/europe-coffee-market`
- Platform (Synapse): `https://www.mordorintelligence.com/synapse`
- Blog: `https://www.mordorintelligence.com/blog`
- Contact: `https://www.mordorintelligence.com/contact-us`
- Careers: `https://www.mordorintelligence.com/careers`
- 404-confirmed pages: `/sample-request`, `/subscription`, `/subscription-plans`, `/methodology`, `/research-methodology`, `/press-releases`, `/case-studies`, `/industry-reports/healthcare`, `/industry-reports/beauty-and-personal-care`, `/industry-reports/food-and-beverages`, `/industry-reports/technology`, `/industry-reports/healthcare/pharmaceuticals`, `/industry-reports/pet-food-market`, `/industry-reports/pharmaceutical-market`, `/industry-reports/global-oncology-drugs-market`, `/contact`, `/pricing`, `/whitepapers`

---

## Page-by-page

### 1. Homepage
**URL:** `https://www.mordorintelligence.com`

**Desktop above-fold:**
Headline: *"Precise market intelligence and advisory."* — 5 words, declarative, no verb. Subheadline immediately quantifies: *"26,683 reports across 100+ industry segments exhaustively covered."* Below the fold a stat counter row shows "6,000+ enterprises across 100+ countries" and "17,000+ reports." Hero section has no full-bleed image — it's typographic with restrained white space. Navigation spans a 19-category taxonomy across five menu groups (Reports, Custom Research, About, Subscription, Resources). Two visible CTAs: "View reports" (links to catalog) and "View clients" (links to testimonials/client logos). Both are text-link style, not button-weight.

**Mobile above-fold:**
Navigation collapses to hamburger menu. Headline and subheadline stack vertically. CTAs remain as text links. No sticky CTA bar observed. The minimal typographic approach translates cleanly to mobile — no layout collapse issues reported. Category depth hidden behind hamburger.

**Primary CTA:**
"View reports" — text link style (standard blue), positioned mid-hero, below the headline-subheadline pair. Low visual weight relative to the page. No filled-button CTA above the fold, which is unusual for this category. "Download Sample" / "Get a Quote" CTAs appear on report pages, not the homepage.

**Density:**
Moderate. Sections separated by white space. No carousel overload. Testimonials section uses a carousel with 9 attributed recommendations. Client logo row is present but not cluttered. Trust badge row (ISO, MRSI, ESOMAR, Great Place to Work) sits in footer only.

**Trust signals:**
- Quantified: "26,683 reports," "6,000+ enterprises," "100+ countries," "17,000+ reports" (two different numbers used — possible version inconsistency)
- Client logos: recognizable enterprise clients displayed
- Testimonials: 9 detailed client recommendations with attributed names, titles, and downloadable recommendation letters (rare in category)
- Certifications: ISO, MRSI, ESOMAR, Great Place to Work — footer only

**Lead-capture friction:**
None on homepage itself. No modal, no email capture, no chat prompt. Users must navigate to a report page to encounter any form.

**Steal:**
Quantified subheadline immediately under the main headline — "26,683 reports across 100+ industry segments" — is more credible than vague superlatives. The 9 testimonials with attribution and downloadable letters is the strongest trust move in the Tier A set.

**Avoid:**
Two CTAs with equal low visual weight ("View reports," "View clients") creates no clear conversion hierarchy. Neither CTA leads to a conversion event — both lead to browse/explore pages. The homepage does no active selling.

**Verdict:** Restrained and credible for the category, but functionally a brochure with no conversion architecture.

---

### 2. About / Leadership
**URL:** `https://www.mordorintelligence.com/about`

**Desktop above-fold:**
Headline: *"Your Trusted Market Intelligence Partner."* Subheadline: *"a leading market intelligence firm, built on over a decade of trusted insights and proven industry expertise."* Large hero image accompanies. Clean layout.

**Mobile above-fold:**
Standard responsive stacking — hero image moves below copy on mobile. No verified mobile-specific design moves.

**Primary CTA:**
No explicit CTA visible above the fold on this page. Navigation persists.

**Density:**
Balanced. Company timeline (2014–2025), core values, leadership carousel, and certifications each get dedicated sections with sufficient spacing.

**Trust signals:**
- CEO named: **Bharadwaj Obula Reddy**, with photo, first in leadership carousel
- 15+ team members with photos, names, and titles
- Company timeline: bootstrapped founding → ISO certifications → CSR → Synapse AI launch
- Certifications: ISO 9001:2015, ISO/IEC 27001:2022, Great Place to Work® (3 consecutive years), ESOMAR, MRSI
- Named clients: Apple, Samsung, Meta, BP, Bosch — a stronger client list than most Tier A players show on About pages
- "Serves 90+ countries"

**Lead-capture friction:**
None on this page.

**Steal:**
Named leadership with photos (CEO first) is above-average for Tier A. Most competitors show no leadership at all. The company timeline 2014–2025 with specific milestones (ISO certs, CSR, product launches) creates a credibility arc rather than vague "founded in X" boilerplate. Named Fortune 500 client references (Apple, Samsung, Meta) on the About page rather than hidden behind NDA.

**Avoid:**
Mission statement (*"In a world drowning in data, we set out to make market intelligence approachable, intelligent, and actionable."*) is generic category language — any competitor could say this identically.

**Verdict:** Above average for Tier A on leadership transparency; mission copy is indistinguishable from competitors.

---

### 3. Sectors / Industries Hub
**URL:** `https://www.mordorintelligence.com/industry-reports`

**Desktop above-fold:**
Headline: *"Uncover Opportunities with Trusted Market Insights"* followed by: *"delivers over 26,682 research reports across 19+ industries."* Single "Contact Us" CTA button. Hero image to the right.

**Mobile above-fold:**
Could not verify independently — responsive design assumed from desktop pattern.

**Primary CTA:**
"Contact Us" — positioned in hero section. Conversion intent: drive inquiry, not self-serve discovery.

**Density:**
Below the fold, a "TRENDING REPORTS" section shows 5 featured report cards with CAGR percentages and study periods. The taxonomy is a **nested list structure** — 19+ primary sectors each expanding into 3–5 levels of subcategories. Example: "Aerospace & Defense" → "Aerospace & Defense Technology" → "Aircraft Additive Manufacturing." No visual card grid per sector.

**Trust signals:**
Aggregate "26,682 research reports" number. No sector-level report counts shown.

**Lead-capture friction:**
No form on this page. CTA leads to contact, not self-serve.

**Steal:**
"TRENDING REPORTS" section with CAGR callouts on the hub page creates instant data-forward engagement — buyers see real numbers before drilling into any individual sector.

**Avoid:**
No report count per sector is a discoverability failure — buyers have no signal about coverage depth in their specific area before clicking in. No search or filter at the hub level. CTA is "Contact Us" rather than "Explore reports" — converts the browse experience into a sales inquiry immediately.

**Verdict:** Structurally functional but navigation-only; no discovery affordance beyond drilling menus.

---

### 4. Individual Sector Landing Page
**Note:** Direct sector URLs tested (`/industry-reports/healthcare`, `/industry-reports/technology`, `/industry-reports/food-and-beverages`, `/industry-reports/beauty-and-personal-care`) all returned **404 or 410 errors**. The hub page (`/industry-reports`) itself has the nested taxonomy, and report pages are reached directly. No intermediate sector landing pages with report listing cards could be verified.

**URL:** `https://www.mordorintelligence.com/industry-reports` (hub as substitute)

**Desktop above-fold:**
See Sectors Hub above. No dedicated sector landing page was accessible.

**Verdict:** Could not verify — all sector-level intermediate pages returned errors. Significant navigation gap.

---

### 5. Catalog / Reports Listing Page
**Note:** No dedicated catalog/reports listing page with cards was accessible. Direct URL paths to sub-category report lists (`/industry-reports/healthcare/pharmaceuticals`) returned 404. Reports are accessed via the taxonomy drill-down in the hub's nested list or directly by URL. No card-grid catalog with filter/sort/pagination was verifiable.

**Steal:** Nothing to steal — this is a gap.

**Avoid:** No self-serve catalog browsing is a conversion barrier. Buyers cannot browse "all EV reports" or "all pharma reports" with price, date, and CAGR metadata visible in a scannable grid.

**Verdict:** Could not verify catalog page — appears to not exist as a discrete page type.

---

### 6a. Report Detail — Large Market (AI)
**URL:** `https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market`

**Desktop above-fold:**
Breadcrumb navigation → Headline: *"Artificial Intelligence Market Size & Share Analysis - Growth Trends and Forecast (2026 - 2031)"* — then immediately: Market Size (2026): **USD 434.42 Billion**, Market Size (2031): **USD 2,503.13 Billion**, CAGR (2026-2031): **41.95%**, Fastest Growing Region: Asia Pacific, Largest Market: North America. Major player logos (IBM, Intel, Microsoft, Google, AWS) shown in a grid labeled "sorted in no particular order." Primary CTA: "Download Sample Report" — positioned prominently above fold, appears 3+ times on page scroll.

**Mobile above-fold:**
Form fields (Name, Business Email, Phone, Country) appear prominently. Data metrics stack vertically. CTA button visible without scroll.

**Primary CTA:**
"Download Sample Report" — repeated multiple times. Requires: Name, Business Email, Phone, Country selector (4 fields). Secondary: "Get Detailed Market Forecasts at the Most Granular Levels" (custom research inquiry). Tertiary: form with email verification and note "Your data is secure and never sold or shared."

**Density:**
High but structured. Key Takeaways section surfaces: Software 61.35% revenue share, Public Cloud 43.72% share, ML 41.12% share, IT & Telecom 27.02%, North America 37.12%. Driver/restraint table quantifies CAGR impact: predictive analytics demand +8.2%, GPU bottlenecks -5.8%, talent shortages -6.7%. 23+ TOC subsections. Recent developments section with dated milestones (February–May 2025).

**Trust signals:**
D-U-N-S® certification number displayed, ESOMAR badge, ISO badge, Great Place to Work badge, company credentials, media partnerships.

**Lead-capture friction:**
Sample form: 4 fields (Name, Business Email, Phone, Country). No pricing shown. "Buy Now" leads to contact/inquiry, pricing not public. Substantial free content is given (all the data cited above is visible without a form fill) — this is the key Mordor differentiator vs. IMARC.

**Steal:**
Driver/restraint impact table with specific CAGR percentage contributions (+8.2%, -5.8%) is a genuinely useful and distinctive data format — no other Tier A player uses this format visibly. Major player logos in a labeled grid above the fold adds instant legitimacy. Segment percentages in the Key Takeaways (Software 61.35%, Public Cloud 43.72%) give buyers meaningful preview data before requesting a sample.

**Avoid:**
No pricing shown anywhere on the page. The sample form captures data before delivering value — the buyer has to hand over contact info to get something they can't evaluate the contents of. "Download Sample Report" as the primary CTA is ambiguous: buyers don't know if they'll get a 2-page brochure or a 20-page preview.

**Verdict:** Best report page UX in Tier A — data-forward, credibility-rich, but pricing opacity and sample ambiguity undermine trust.

---

### 6b. Report Detail — Large Market (EV Global)
**URL:** `https://www.mordorintelligence.com/industry-reports/electric-vehicle-market`

**Desktop above-fold:**
Market size 2026: **USD 0.75 trillion**, 2031: **USD 1.30 trillion**, CAGR: **11.68%**. Asia-Pacific dominates at 52.73% of 2025 volume. BYD, Tesla, SAIC as major players (~1/3 of global share). "Medium" market concentration label — unusual and useful. Battery segment detail: NMC 42.38%, LFP accelerating at 14.93% CAGR.

**Primary CTA:**
"Download Sample Report" (same pattern as AI report).

**Density:**
High — multiple segment breakdowns, battery chemistry analysis, geographic breakdown. Follows identical template to AI report page.

**Pricing visibility:**
Not shown. Consistent with site-wide policy.

**Steal:**
"Market concentration" label (Medium/High/Low) is a distinctive format not seen on other Tier A pages.

**Verdict:** Data-dense, template-consistent, no pricing.

---

### 6c. Report Detail — Niche Market (Coffee)
**URL:** `https://www.mordorintelligence.com/industry-reports/coffee-market`

**Desktop above-fold:**
Headline: *"Coffee Market Size, Share & Industry Growth Report 2031."* Market size 2026: **USD 185.69 billion**, 2031: **USD 238.99 billion**, CAGR: **5.18%**. Fastest growing: Asia Pacific, Largest: North America. Major player logos. Form (name, email, phone) in the hero column.

**Primary CTA:**
"Get Sample Report" (same template). Also "Buy Now" button. "Complete My Request" (bottom sticky CTA — observed here but not on every page).

**Pricing visibility:**
Not shown on page.

**Trust signals:**
D&B D-U-N-S certification, ISO badge, ESOMAR, Great Place to Work, social media links.

**Steal:**
Sticky bottom CTA ("Complete My Request") on niche pages creates persistent conversion opportunity on long-scroll pages.

**Verdict:** Consistent template; sticky CTA is a good low-friction add.

---

### 6d. Report Detail — Niche Market (Cannabis)
**URL:** `https://www.mordorintelligence.com/industry-reports/cannabis-market`

**Desktop above-fold:**
Headline: *"Cannabis Market Size & Share Analysis - Growth Trends and Forecast (2026 - 2031)"* Market 2026: **USD 45 Billion**, 2031: **USD 86.60 Billion**, CAGR: **14.00%**. Segment detail free: flowers 42.5%, medical 56.8%, THC-dominant 63%.

**Pricing visibility (CONFIRMED on this page):**
Three license tiers displayed:
- Single User: **$4,750**
- Team License: **$5,250**
- Corporate License: **$8,750**

This is the ONLY report page where pricing was confirmed visible. Pricing tiers differ from IMARC's disclosed pricing — Mordor's pricing is higher and uses different tier names ("Team" not "Five User").

**Unique features:**
Interactive driver/restraint impact tables, FAQ section (6 questions answered), methodology explanation section addressing why Mordor's baseline differs from competitors. The disclaimer *"Segment shares of all individual segments available upon report purchase"* explicitly signals what is gated.

**Steal:**
Explicit gating disclaimer ("available upon report purchase") is more honest than hiding the gate. FAQ section on the report page answers common buyer questions without a call. Methodology explanation addressing competitor discrepancies is a credibility move that positions Mordor as more rigorous.

**Avoid:**
Pricing is inconsistently shown across report pages — some show it (cannabis), others don't (AI, EV, coffee). This inconsistency erodes trust and creates a confusing purchase experience.

**Verdict:** Strongest page on the site — data-forward, pricing shown, methodology explained, FAQ answered.

---

### 6e. Report Detail — Regional Market (India EV)
**URL:** `https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market`

**Desktop above-fold:**
Market Size (2025): **USD 54.41 Billion**, 2029: **USD 110.7 Billion**, CAGR: **19.44%** (2025–2029). "View Global Report" link visible — allows lateral navigation between regional and global versions. Regional alternatives listed: Africa, Asia, Australia, China, Europe, France, Middle East, Singapore, South America, Southeast Asia.

**Primary CTA:**
"Download Sample Report" (consistent).

**Steal:**
"View Global Report" link + listed regional alternatives creates a geographic navigation layer not seen on IMARC. Buyers can self-navigate from India to Europe to Global without going back to search.

**Verdict:** Regional navigation between variants is a strong discoverability UX move.

---

### 6f. Report Detail — Regional Market (Europe EV)
**URL:** `https://www.mordorintelligence.com/industry-reports/europe-electric-vehicle-market`

Market 2025: **USD 146.58 billion**, 2031: **USD 423.02 billion**, CAGR: **19.32%**. Germany: 28.76% revenue share. Spain: fastest growth at 21.86% CAGR. ICE phase-out 2035 regulatory driver cited. Same template as India EV.

**Verdict:** Consistent template; country-level data within region is useful preview.

---

### 7. Sample Request Flow / Lead Capture
**URL:** `/sample-request` — **404 confirmed**

The sample request is embedded inline on every report page rather than as a standalone page. Form fields observed across report pages: Name, Business Email, Phone Number (with country code selector), optional Message field. 4 required fields total. Privacy note: "Your data is secure and never sold or shared."

**Lead-capture friction:**
4 fields (Name, Business Email, Phone, Country) is moderate friction for a B2B context — lower than IMARC's 9-10 field contact form. No CAPTCHA observed on report-page sample forms. No indication of what the sample contains (page count, format, recency).

**Steal:**
Inline form (embedded on report page, not a redirect) reduces friction by keeping context. "Your data is secure and never sold or shared" privacy note is a small but meaningful trust addition.

**Avoid:**
No standalone sample request page creates no SEO value for "request market research sample" queries. No sample preview (even a table of contents screenshot) before the form.

**Verdict:** Moderate friction, context-preserving, but opaque about what sample delivery looks like.

---

### 8. Pricing Page
**URL:** `/subscription`, `/subscription-plans`, `/pricing` — all **404 confirmed**

Pricing is inconsistently shown on individual report pages. Cannabis report shows: Single $4,750 / Team $5,250 / Corporate $8,750. Other report pages show no pricing. No dedicated pricing/plans comparison page exists or is accessible.

**Verdict:** No pricing page — could not verify. Inconsistent pricing display across report pages is a significant UX failure.

---

### 9. Methodology Page
**URL:** `/methodology`, `/research-methodology` — both **404 confirmed**

Methodology content is embedded within individual report pages (a "Research Methodology" section in the TOC and a "Methodology" tab on some report detail pages). The Cannabis report page includes an explanation addressing why Mordor's market size baseline differs from competitors — this is methodology embedded in context.

**Verdict:** No standalone methodology page — could not verify. Methodology appears as in-page content on report pages.

---

### 10. Case Studies / Client Work
**URL:** `/case-studies` — **404 confirmed**

No case studies section accessible. Testimonials (9, with attribution and downloadable letters) appear on the homepage and About page. No project outcome metrics or client case narratives were found.

**Verdict:** Could not verify — no case studies page exists at tested URLs.

---

### 11. Blog / Press / Insights Hub
**URL:** `https://www.mordorintelligence.com/blog`

**Desktop above-fold:**
Hero mission statement: *"Our mission is to map complex business ecosystems across the globe to better predict butterfly effects."* Card-based layout with thumbnail images. Five posts shown:
1. "Introducing myRA AI™: The Future of Market Intelligence" (Feb 11, 2025)
2. "On-Demand Market Intelligence: Get Answers When It Matters the Most with Synapse" (Feb 11, 2025)
3. "AI Meets Human Expertise: Transforming Market Intelligence with Synapse" (Jan 17, 2025)
4. "Hidden Cost of Siloed Data & Synapse" (Jan 17, 2025)
5. "Sustainable Furniture: Designing for a Better Future" (Oct 3, 2023)

**Post frequency:**
Multiple posts in early 2025, then a gap — post #5 is from October 2023. Inconsistent cadence is visible.

**Primary CTA:**
No explicit conversion CTA on the blog hub. Product references (Synapse, myRA AI) serve as indirect CTAs.

**Density:**
Low. Card layout with thumbnails, minimal metadata. No categories, no tag filtering, no author bylines visible.

**Trust signals:**
None beyond branding.

**Steal:**
Mission statement as blog hero copy is a differentiated approach — contextualizes why editorial content exists rather than leading with "Latest Articles."

**Avoid:**
No category filtering, no author attribution, no publication date prominently shown on cards, visible content cadence gap (recent posts in 2025 alongside one from 2023 on the same screen).

**Verdict:** Thin content operation with inconsistent cadence; blog is mainly used as a Synapse product marketing channel.

---

### 12. Contact / "Talk to Analyst"
**URL:** `https://www.mordorintelligence.com/contact-us`

**Desktop above-fold:**
Email: info@mordorintelligence.com, media@mordorintelligence.com, careers@mordorintelligence.com. Phone: +1 617-765-2493. Office: 11th Floor, Rajapushpa Summit, Financial District, Gachibowli, Hyderabad, India. Two CTA buttons: "Request for Proposal" and a "Let's Talk" section with copy: *"Whether you're exploring a new market, validating a strategy, or seeking tailored research support, our team is here to assist. Connect with our experts; we're just a message away."* Also a "Submit Feedback" form.

**Lead-capture friction:**
Could not verify form field count on this page directly (404 on `/contact`), but "Request for Proposal" suggests a multi-field form. Response time: "Standard reports within a few business days, custom research may take a few weeks."

**Trust signals:**
Certifications in footer. No SLA commitment beyond "business days."

**Steal:**
"Submit Feedback" form alongside contact options creates a two-way relationship signal — not just inquiry capture but client service intent.

**Avoid:**
No "Speak to an Analyst" or live chat option. US phone number (+1 617) belies Hyderabad location — can create trust friction with US enterprise buyers who call and get a time-zone disconnect.

**Verdict:** Functional but generic; no analyst-specific positioning or urgency language.

---

### 13. Synapse (Platform Page)
**URL:** `https://www.mordorintelligence.com/synapse`

**Desktop above-fold:**
Headline: *"Synapse: Your Market Intelligence Command Centre."* Subheading: *"Revolutionizing Market Intelligence with Synapse—where cutting-edge AI seamlessly blends with human expertise to drive smarter decisions and unparalleled insights."* Two primary CTAs: "Start Your Trial" and "Login to Synapse." Banner: "Major Updates — dashboard enhancements, 650+ new reports, 30+ language support."

**Key stats shown:**
- 9,000+ Reports
- 100+ Industries
- 27 Hubs (covering 1,400+ Markets)
- 10,000 Projects Delivered
- 550+ Research Experts

**Pricing visibility:**
Not shown. "7-day free trial" is the entry point.

**Demo:**
No interactive demo. Static product imagery for each feature module.

**Steal:**
"7-day free trial" is the strongest self-serve offer in the Tier A set — no other direct competitor offers a trial of any kind. 30+ language support is a genuine differentiator for non-English markets. "Major Updates" banner creates freshness signal — shows the product is actively developed.

**Avoid:**
No screenshots showing actual platform UI. "Command Centre" copy is vague — what does the platform actually look like? No pricing visible despite a trial CTA creates a trust gap for enterprise buyers evaluating budget.

**Verdict:** Best platform page in Tier A, undercut by no screenshots and invisible pricing.

---

### 14. Careers
**URL:** `https://www.mordorintelligence.com/careers`

**Desktop above-fold:**
Headline: *"Where Great Work Meets Great People."* Employee photography, CTAs: "View Job Openings," "Join Our Team." Glassdoor integration with star ratings.

**Culture messaging:**
Five benefit pillars: Flexibility (hybrid/remote, flexible hours), Growth (clear career paths), Learning (company-sponsored tools), Wellness (health insurance, mental health), Recognition (performance bonuses). Employee testimonials with tenure (7–10+ years). Great Place to Work® certification prominently displayed.

**Job categories:**
Senior Research Manager, Research Associate, Software Engineer, Sales/Business Development, Operations, Training.

**Design maturity:**
Modern layout with dot-and-line decorative patterns, employee photography, webp images, Glassdoor integration. Above-average for Tier A.

**Steal:**
Glassdoor integration with ratings on the careers page is a third-party social proof move that most research firms skip. Tenure-marked testimonials (7–10+ years) are a retention signal that sophisticated candidates notice.

**Avoid:**
No specific open positions listed on the page — users must click "View Job Openings" to see listings. Decorative dot-and-line patterns are dated visual motifs.

**Verdict:** Polished, people-forward; design signal is "corporate modern" not "product-led."

---

### 15. Footer
**Observed from:** Homepage and multiple report pages

**Structure:**
5-section footer: product/report links, custom research links, About subsections, Subscription, Resources. 20+ navigational paths. Contact: email (info@mordorintelligence.com), phone (+1 617-765-2493), office address (Hyderabad). Social media icons: LinkedIn, Facebook, X, Pinterest, Instagram. Certifications: ISO, MRSI, ESOMAR, Great Place to Work — badges displayed.

**Trust signals:**
- 4 certification badges
- Social media presence across 5 platforms
- Physical address (Hyderabad)

**Sitemap quality:**
Comprehensive link architecture with 20+ paths. However, many linked destinations 404 — the footer promises pages that don't exist.

**Avoid:**
Footer promises (via links) pages that 404 — this is a credibility failure when users discover the dead ends. Pinterest presence is incongruous for a B2B research firm.

**Verdict:** Visually complete but internally broken — links to dead pages undermine trust.

---

## Cross-page patterns

- **Data-forward report pages** are Mordor's strongest asset: CAGR, market size, segment percentages, driver/restraint impact tables are visible without a form fill. This is the best free-preview strategy in Tier A.
- **Template consistency** is high on report detail pages — every report follows the same structure (headline → key metrics → major players → key takeaways → segments → geography → competitive landscape → form). Predictable UX for returning buyers.
- **Regional navigation** (global ↔ regional ↔ country via "View Global Report" links) is a unique discoverability feature not seen in IMARC.
- **404 rot is severe** — methodology, pricing, case studies, catalog sub-pages, sample request standalone page, and all sector-level landing pages tested returned 404 or 410. The site architecture promises more than it delivers.
- **Synapse platform** is positioned aggressively on the homepage and blog (4 of 5 recent blog posts are Synapse marketing) but is completely isolated from the report catalog experience — buyers cannot see how Synapse relates to any individual report.
- **Pricing inconsistency**: Cannabis report shows pricing ($4,750 / $5,250 / $8,750); AI and EV reports show no pricing. No site-wide pricing page exists. This is a trust and conversion failure.
- **Trust badge placement** — certifications appear only in footers, never in the hero or above-fold of any page. Given the category, this is a missed opportunity (IMARC surfaces client logos and testimonials higher on pages).

---

## What Ken Research should beat them at (specific)

1. **Fix the 404 problem first** — Mordor's site has severe structural decay. A Ken Research site where every promised page exists and delivers real content immediately signals more professional operation. (`mordorintelligence.com/methodology`, `/case-studies`, `/subscription-plans`, `/sample-request` all 404.)

2. **Show pricing consistently, not selectively** — Mordor shows pricing on some report pages but not others. Ken Research showing a consistent pricing structure (even ranges) on every report page removes a buyer friction that Mordor has failed to solve.

3. **Build a standalone methodology page** — Mordor has no accessible methodology page. A Ken Research methodology page with a visual research process diagram, named data sources, primary vs. secondary research split, and quality validation steps would be a category differentiator.

4. **Create a real sector landing page layer** — All Mordor sector-level pages 404. Ken Research can own sector hubs (e.g., `/sectors/healthcare`) that show: sub-sector taxonomy, report count, featured reports with CAGR previews, filter/sort, and a sector-specific CTA. This is the discoverability layer Mordor is missing entirely.

5. **Build a functioning report catalog** — No card-grid catalog with filter/sort exists on Mordor. Ken Research can offer: filter by sector, geography, CAGR range, price range, publication date — standard e-commerce catalog UX applied to research reports.

6. **Add screenshots to the platform page** — Mordor's Synapse page has no actual UI screenshots. A Ken Research platform or portal page showing real interface screenshots immediately differentiates from "platform marketing" vs. actual product.

7. **Publish consistent blog content with author attribution** — Mordor's blog has visible cadence gaps (most recent posts from early 2025, then one from 2023). Ken Research publishing 2–4 posts/week with named analysts, publish dates, and category tags beats Mordor's blog immediately on credibility and SEO.

8. **Standalone case study section** — Mordor has no case studies page. Ken Research building even 5–10 anonymized case studies with measurable outcomes (e.g., "Helped [Global Auto OEM] validate a $2B market entry in Southeast Asia") fills a complete trust gap.

---

## Sources

- `https://www.mordorintelligence.com`
- `https://www.mordorintelligence.com/about`
- `https://www.mordorintelligence.com/industry-reports`
- `https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market`
- `https://www.mordorintelligence.com/industry-reports/electric-vehicle-market`
- `https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market`
- `https://www.mordorintelligence.com/industry-reports/europe-electric-vehicle-market`
- `https://www.mordorintelligence.com/industry-reports/coffee-market`
- `https://www.mordorintelligence.com/industry-reports/europe-coffee-market`
- `https://www.mordorintelligence.com/industry-reports/cannabis-market`
- `https://www.mordorintelligence.com/synapse`
- `https://www.mordorintelligence.com/blog`
- `https://www.mordorintelligence.com/contact-us`
- `https://www.mordorintelligence.com/careers`
