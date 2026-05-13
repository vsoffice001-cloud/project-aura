# Voice — Ken Research microcopy + UI text

**Tone:** analyst memo. Confident, specific, never generic. **"Verified > vibes."**

---

## Core principles

1. **Specific beats general.** "47 reports on GCC fintech in last 18 months" beats "comprehensive coverage."
2. **Verified beats claimed.** Every factual statement has a source. Unverifiable items → flag, don't ship.
3. **Quantify trust.** Numbers w/ provenance > adjectives. "Cited by analysts at 12 of top 50 consulting firms" > "trusted by industry leaders."
4. **Show, don't promise.** Live data preview > "we deliver insights."
5. **Push back on Tier A genericism.** Forbidden words list (see `anti-patterns.md`) is a discipline, not a style choice.

---

## Voice across surfaces

| Surface | Voice register | Example heading | Example CTA |
|---|---|---|---|
| Discovery hero | Editorial confident | "Market intelligence for the GCC, SEA, and Africa, in browser." | "Browse 4,200+ reports →" |
| Report Store list | Catalog clinical | "Saudi Arabia OTT Streaming Market — 2026" | "Preview · $2,950" |
| Report detail | Detailed analyst | "47-page deep-dive · Updated Mar 2026 · Includes 12 weeks analyst support" | "Buy single license" |
| Report Viewer | Reading-mode neutral | (chapter titles match report) | "Cite this section" |
| Dashboards | Data-confident | "Saudi OTT subscribers — Q1 2026" | "Add to tracker" |
| Engagement portal | Status-direct | "Project status: in analyst review · 3 days remaining" | "Message your analyst" |
| Errors | Direct + actionable | "Report not found." (not "Oops!") | "Browse all reports →" |

---

## Headlines (hero + section)

### Yes
- "Market intelligence for the GCC, SEA, and Africa."
- "47 reports on Saudi fintech. None of them PDFs."
- "Live data on 130 sectors. Source-cited, browser-native."
- "Built by analysts in Gurugram, Dubai, Tangerang, Doha."
- "From query to citation in under 5 minutes."

### No
- "Comprehensive market intelligence solutions" (generic)
- "Empowering global decision-makers" (filler)
- "Your trusted research partner" (vague + claim w/o proof)
- "Unlock the power of data" (cliché)
- "Revolutionizing the research industry" (overclaim)
- "World-class insights at your fingertips" (3 forbidden words)

---

## CTAs (button text)

### Yes (specific verbs, scannable)
- "Browse reports"
- "Buy single license · $2,950"
- "Preview 2 charts free"
- "Cite this section"
- "Download CSV"
- "Add to dashboard"
- "Schedule analyst call"
- "Request team license"

### No
- "Learn more" (generic)
- "Get started" (no signal)
- "Click here" (banned)
- "Explore" (vague unless paired w/ noun)
- "Sign up now!" (exclamation + no specifics)

---

## Microcopy (form labels, tooltips, empty states)

### Yes
- Empty store search: "No reports match. Try broader keywords or browse [Saudi Arabia](#) · [OTT](#) · [2026](#)"
- Form label: "Work email" (above field, never placeholder-as-label)
- Tooltip: "CAGR = Compound Annual Growth Rate. See methodology."
- Loading: skeleton screen shaped like real content (no "Loading..." text)
- Error 404: "We don't have a report at that URL. Try [search](#) or [browse all](#)."
- Cite-success toast: "Citation copied (APA format)"

### No
- "Oops! Something went wrong" (replace w/ specific failure)
- "Loading awesome content..." (filler)
- "Sorry, no results" (drop the apology, give path forward)
- Generic "Welcome to Ken Research!" (welcome dialogs anti-pattern)

---

## Data labels + chart copy

- **Title:** what the chart shows. "Saudi OTT subscribers, 2020-2026"
- **Subtitle:** method/source 1 line. "Forecast model · n=2,847 · ±5% CI"
- **Y-axis:** unit + scale. "Subscribers (millions)"
- **X-axis:** period. "Year"
- **Footer:** source + date. "Source: Ken Research, Q1 2026 · Updated 2026-03-15"
- **Legend:** entity name only, no acronyms unless space-constrained
- **Annotations:** event triggers. "← Pandemic peak (Apr 2020)" "← STC Play launch (Jul 2023)"

---

## Citation format (auto-generated, every chart + section)

```
APA 7th:
Ken Research. (2026). Saudi Arabia OTT Streaming Market — 2026 (Section 4: Subscriber forecast). Retrieved March 15, 2026, from https://kenresearch.com/r/saudi-ott-2026#sec-4

Harvard:
Ken Research, 2026. Saudi Arabia OTT Streaming Market — 2026, Section 4: Subscriber forecast. Available at: https://kenresearch.com/r/saudi-ott-2026#sec-4 [Accessed 15 March 2026].

Chicago 17:
Ken Research. 2026. "Saudi Arabia OTT Streaming Market — 2026," Section 4: Subscriber forecast. Accessed March 15, 2026. https://kenresearch.com/r/saudi-ott-2026#sec-4.

BibTeX:
@misc{kenresearch2026saudiott,
  author = {Ken Research},
  title = {Saudi Arabia OTT Streaming Market — 2026},
  year = {2026},
  url = {https://kenresearch.com/r/saudi-ott-2026},
  note = {Section 4: Subscriber forecast},
  urldate = {2026-03-15}
}
```

Citation block visible on free preview pages too — drives backlinks even from non-buyers (per strategic wedge: "single highest-leverage move").

---

## Pricing copy

### Yes
- "$2,950 · single user · 12-month access · includes 12 weeks analyst Q&A"
- "$5,500 · team (up to 10) · all of single + Slack channel"
- "Enterprise · contact sales · all of team + custom data extracts + named analyst"

### No
- "Starting at..." (give the actual number)
- "Best value!" (let buyer decide)
- "Most popular" badge w/o data behind it (use only if analytics confirm + cite)

---

## Status / progress copy (Engagement portal)

### Yes
- "Project status: in analyst review · 3 working days remaining"
- "Last updated by [Analyst Name] · 2h ago"
- "Next deliverable: Subscriber forecast model · due Mar 22"

### No
- "We're working on it!" (no info)
- "Just a moment..." (vague timeline)
- "Almost done!" (no commitment)

---

## Pushback patterns (when stakeholder asks for Tier A copy)

If asked to write generic copy ("comprehensive solutions", "trusted partner", logo carousel labels), default response:

```
That's Tier A pattern. We beat them on specifics.
Alternative: <specific verifiable claim>
Source: <if claim ships, what verifies it>
If unverifiable: flag as draft, don't publish.
```

This is the discipline. Even internal mockups follow it — drafts that ship publishable-quality copy avoid retrofit later.
