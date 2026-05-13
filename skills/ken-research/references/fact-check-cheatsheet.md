# Fact-Check Cheatsheet

## The hierarchy of trust

From most authoritative to least, for claims about Ken Research:

1. **MCA filings** (revenue, employee count, directors, registered address). Authoritative for India-registered legal facts.
2. **Independent client press releases** confirming a Ken Research engagement. Highest-trust client claim.
3. **Court records, regulatory disclosures.**
4. **Two independent industry sources** (e.g., a verified Tracxn entry plus a verified ZoomInfo entry, where neither sources the kenresearch.com marketing site).
5. **Single industry-source.** Mark `[unverified - single source]`.
6. **Marketing site (kenresearch.com).** A single source. Anything that appears here without independent confirmation is `[unverified - single source]`.
7. **Aggregators that source the marketing site.** Same source as #6, not a second source.
8. **Modeled / fabricated estimates** (e.g., GrowJo's "$516M revenue"). Treat as noise; cite only to debunk.

For competitor claims, swap `kenresearch.com` for the competitor's marketing site and apply the same hierarchy.

## The unverified-claim list (do not promote without evidence)

These appear on kenresearch.com and are flagged in the fact sheet. Any artifact this skill produces must keep them flagged unless new authoritative evidence arrives:

- "2,000+ clients"
- "70% of clients are Fortune 2000"
- "500+ seasoned analysts"
- "190+ countries"
- "10 lakh+ assets"
- "15,000+ reports delivered"
- Named clients (FIFA, Samsung, BMW, Maruti Suzuki, World Bank, IFC) — single-source on kenresearch.com

## Reputation signals — handle carefully

The Glassdoor pattern (3.2/5, with 2025–2026 reviews accusing leadership of seeded fake reviews) is **flagged** in `fact-sheet.md` §Reputation and `EXECUTIVE_SUMMARY.md`. Rules:

- It is a fact about *public perception*, not a fact about *service quality*.
- It is a *brand-risk signal*, because buyers Google before they buy.
- It is a *leadership* matter, not a strategy-doc matter.
- This skill does not propose external messaging that pretends the issue does not exist.
- This skill does not propose seeding any reviews. Refuse if asked.

## Quick verification recipes

### "Is X a real Ken Research client?"
1. Check `fact-sheet.md` §Notable Clients.
2. WebSearch: `"<client name>" "ken research"` — looking for a client-side press release, procurement document, or joint announcement.
3. If only kenresearch.com confirms, mark `[unverified - single source]`.

### "What is Ken Research's actual headcount?"
1. `fact-sheet.md` §Scale lists three numbers (MCA 62 / LinkedIn 201–500 / website "500+").
2. The MCA filing (Oct 2024) is most authoritative for India-registered employees.
3. The total may be higher if non-Indian offices file separately. The "500+" website claim is unverified.

### "What's [competitor]'s actual revenue?"
1. Check their profile in `02-competitors/profiles/<slug>.md`.
2. If unsourced or modeled (Tracxn estimate, GrowJo, etc.), mark `[unverified]`.
3. Public companies (Forrester, GlobalData) have authoritative filings. Use those over aggregators.

## When in doubt

If you cannot verify a claim from at least one authoritative source within the time budget the user has given you, **say so explicitly.** "I couldn't verify this — proceed knowing it's unsourced" is a stronger answer than a confident-sounding fabrication.
