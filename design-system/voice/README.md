# Voice — Ken Research

**Purpose:** Pillar voice rulebooks. Each surface inherits a tone, vocabulary, and copy pattern. Aura reads the matching pillar doc before composing copy for any page.

**Pillars (3 content + 1 docs):**

| # | Pillar | Color tag | Doc | Lives on |
|---|---|---|---|---|
| 1 | **Consulting** | black/neutral, red CTA | [`consulting.md`](consulting.md) | Case studies, advisory pages, methodology, engagement showcases |
| 2 | **Research** | purple `#806ce0` | [`research.md`](research.md) | Report Store, listing pages, report detail, sector pages, market trackers |
| 3 | **Surveys** | purple `#806ce0` | [`surveys.md`](surveys.md) | Survey listings, survey detail, lifecycle pages, completion flows |
| 4 | **Foundations** | black/neutral | [`foundations.md`](foundations.md) | DS-core, DS-dashboard, internal docs, AI context, contributor guides |

**Voice ≠ Brand.** Brand is shared (Ken Red CTA, 92-5-3, Major Third). Voice changes per pillar — same brand, different tone for different reader intent.

---

## How Aura uses these docs

When asked to build a page or write copy:

1. Identify pillar from intent (or ask)
2. Open that pillar's voice doc
3. Apply tone, vocabulary, sentence patterns, headline rules
4. Cross-check against forbidden words list
5. Compose copy

When in doubt: pillar voice → Ken brand foundation → industry default. Never invent.

---

## Voice doc structure

Every pillar doc follows the same template so Aura can parse mechanically:

```
1. Identity (1-line)
2. When to use this surface
3. Tone — 3 adjectives + 1 forbidden adjective
4. Vocabulary
   - Allowed words (10-15)
   - Forbidden words (10-15)
5. Sentence patterns — GOOD vs BAD examples
6. Reading level target
7. Headline rules
8. Body rules
9. CTA copy rules
10. Number/data formatting
11. Anti-patterns
```

---

## Brand fundamentals (shared, do not override)

- **Ken Red `#b01f24`** = CTAs ONLY. Never decorative, never body copy emphasis.
- **Major Third 1.25× type scale** — see `design-system/tokens/tokens.json` typography
- **Noto Serif** = headings/display. **DM Sans** = body/UI. Never mix.
- **92-5-3 color rule** — 92% foundation, 5% brand, 3% accent.
- **44px touch target minimum** on interactive elements (mobile).
- **`prefers-reduced-motion`** must be respected for any motion.

These apply to all pillars. Voice docs override only tone, words, and copy patterns — never brand fundamentals.

---

**Status:** Phase 1 (Aura Sprint 2026-05-01). Drafted from existing DS source + strategy docs. Vishal-confirmed line-by-line on first review.
