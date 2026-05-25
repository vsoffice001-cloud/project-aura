# AnalystPickCardB — Molecule Audit (OG DS · Variant B)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/AnalystPickCardB.tsx:31-98`
> **OG comment (line 1-4):** *"AnalystPickCardB — Molecule (Variant B). Analyst-first card: header → blockquote → report mini-card → footer."*

---

## 1. WHAT
A **highly-composed editorial card** that leads with the analyst persona (avatar + name + role), surfaces an analyst quote about a report as a blockquote, embeds a mini report card with thumbnail/industry/title/meta, and finishes with a like counter + secondary CTA. The "B" suffix implies a deprecated "A" variant once existed.

## 2. WHY
- **Authority lever:** in Ken Research, analyst voice = trust signal. This card foregrounds the human ahead of the asset — distinct from `ReportCard` which leads with the report.
- **Quote as content:** the blockquote (with red `var(--coral-500)` left border) is the visual centerpiece — `ReportCard` has no equivalent.
- **Mini-card embed:** lets one organism (`AnalystPicks`) show analyst + report context in one card without spawning two cards side-by-side.
- **Like counter is interactive demo data:** `LikeCounter` sub-component uses `Math.random()` for seed count (line 85) — explicitly mock-data inside the molecule (anti-pattern flagged below).

## 3. WHEN to use ✅
- "Top picks from our analysts" carousels · `AnalystPicks.tsx:24`
- Editorial home-page sections that need expert endorsement framing
- Showcase grids demoing analyst-led content · `ComponentsContent.tsx:942-943`

## 4. WHEN NOT to use ❌
- Plain report listing → use `ReportCard` (analyst framing is overkill / clutter)
- Testimonial alone (no embedded asset) → use a `Testimonial` molecule (not in OG)
- Author byline on an article → use `AuthorChip` atom (not in OG; pattern below this card)
- Generic "expert pick" badge on existing card → use `Badge variant="rounded" theme="coral"` overlay
- When no quote available → fall back to `ReportCard` (this card without quote is hollow)

## 5. WHERE used (file:line)
- `components/organisms/AnalystPicks.tsx:24` — primary consumer
- `components/ComponentsContent.tsx:942-943` — DS showcase

## 6. HOW to implement

```tsx
<AnalystPickCardB
  id="apk-001"
  image="https://images.unsplash.com/..."
  title="India EV charging infrastructure outlook 2025-2030"
  industry="Automotive"
  region="India"
  date="Jan 2025"
  quote="Charging-station density per million vehicles will triple by 2027 — but only in 4 metros."
  analystName="Priya Sharma"
  analystRole="Senior Analyst, Mobility"
  analystInitials="PS"
  saved={false}
  onToggleSave={() => toggle('apk-001')}
  onClick={(id) => router.push(`/reports/${id}`)}
/>
```

## 7. Composition tree
- `Card` (atom) — hover, padding="md", flex-col h-full
  - **Analyst header row:** avatar circle (initials) + name/role stack + `Badge` (Award icon, "Expert Pick")
  - **Blockquote** w/ left red border `var(--coral-500)`
  - **Embedded report mini-card:** rounded box containing
    - `ImageWithFallback` (16:9 thumb)
    - `IndustryBadge` (molecule) + title + `CardMetaRow variant="B"` (molecule)
  - **Footer:** `LikeCounter` (internal sub-component) + `Button variant="secondary" size="xs" showArrow`

**Atoms/molecules consumed:** `Card`, `Badge`, `Button`, `ImageWithFallback`, `IndustryBadge`, `CardMetaRow`.

**Icons:** `ThumbsUp` (like), `Award` (expert pick badge).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `id` | string | — | Stable ID for click handler routing |
| `image` | string | — | URL for the embedded report thumb |
| `title` | string | — | Report title |
| `industry` | string | — | Industry label inside mini-card |
| `region` | string | — | Region in CardMetaRow |
| `date?` | string | — | Optional date for CardMetaRow variant B |
| `quote` | string | — | Analyst quote (the editorial hook) |
| `analystName` | string | — | Header line 1 |
| `analystRole?` | string | `"Analyst"` | Header line 2 |
| `analystInitials` | string | — | Avatar fallback (2-letter) |
| `saved?` | boolean | `false` | Visual saved/bookmark state (currently not wired in render) |
| `onToggleSave?` | `()=>void` | — | Save toggle (not currently invoked in render) |
| `onClick?` | `(id:string)=>void` | — | Card click → opens report; also used by CTA |
| `className?` | string | — | Pass-through |

**Note:** `saved` + `onToggleSave` are declared but not visibly rendered (lines 25-26 of types, not consumed in JSX). Suggests planned save toggle that didn't ship.

## 9. Data contract

```ts
interface AnalystPickCardBProps {
  id: string;
  image: string;
  title: string;
  industry: string;
  region: string;
  date?: string;
  quote: string;
  analystName: string;
  analystRole?: string;     // default "Analyst"
  analystInitials: string;  // 2-letter fallback
  saved?: boolean;          // declared, not rendered
  onToggleSave?: () => void;// declared, not rendered
  onClick?: (id: string) => void;
  className?: string;
}
```

**Where data comes from:** consumer org `AnalystPicks` fetches picks from API/mock (`pick` objects spread into prop). Quote is human-written content — not auto-extracted.

## 10. States
- **Default:** card visible, like counter at random seed `Math.floor(Math.random() * 40) + 5`.
- **Hover:** Card `hover` prop → atom-level lift (shadow + bg shift). `img-zoom` class scales thumbnail.
- **Group hover:** title shifts `text-black/75` → `text-black` (line 61).
- **Like clicked:** counter increments, bg `var(--green-50)`, color `var(--green-600)`, border `var(--green-500)`. Filled thumb icon.
- **Like unclicked:** counter reverts; subtle gray.
- **CTA click:** `e.stopPropagation()` on wrapper div prevents card-level onClick conflict (lines 73-77).

## 11. Variants
- "B" implies a "Variant A" once existed (not in current codebase). This is the **analyst-first** layout. No prop-level variant switch — variant differentiation is by component name.

## 12. Responsive behavior
- `flex flex-col h-full` → fills grid cell height
- Embedded mini-card: thumbnail fixed `w-16`, content `flex-1 min-w-0` — works at narrow widths
- `line-clamp-3` quote + `line-clamp-2` title prevent overflow on small cards
- No explicit mobile-vs-desktop branching — single layout

## 13. Tokens used
- `var(--warm-300)` avatar bg · `var(--warm-200)` mini-card bg · `var(--warm-500)` footer border
- `var(--coral-500)` blockquote accent line
- `var(--text-xs)` · `var(--text-card-micro)` · `var(--text-nav)`
- `var(--rc-radius-card-inner)` mini-card outer · `var(--rc-radius-image)` thumb
- `var(--green-50)` · `var(--green-500)` · `var(--green-600)` (like-state)

## 14. A11y rules
- Avatar uses initials text (line 37) — falls back gracefully without image.
- Blockquote uses `<blockquote>` semantic element (line 50).
- Like button has `title` attribute (line 92) — tooltip but not a true `aria-label`.
- **Gap:** Card-level `onClick` on a non-button `<Card>` — keyboard activation depends on Card atom's role/handler support.
- **Gap:** Like count change has no `aria-live` announcement.

## 15. Motion rules
- `img-zoom` CSS class — scale on hover (defined in DS CSS, not inline).
- `group-hover:text-black transition-colors` on title.
- Like button: `transition-all` on bg + border on toggle.
- No reduced-motion override at molecule level — depends on DS `img-zoom` CSS.

## 16. Anti-patterns ❌
- **`Math.random()` initial count (line 85)** — molecules should not generate runtime fake data. Caller should pass `initialLikes` prop. Flag for re-design.
- Don't use without an analyst quote — the blockquote IS the value of this card; skip → `ReportCard`.
- Don't nest inside another `Card` — Card-in-Card breaks hover affordance.
- Don't pass `onClick` without `e.stopPropagation()` on inner clickables (footer button already handles this — DO copy that pattern if extending).
- Don't override the coral left-border on the blockquote — it's the brand-signal element.
- Don't render in a list >4-wide grid; the embedded mini-card needs ≥240px to look balanced.

## 17. REUSABILITY SCORE
**2/5 ⭐⭐** — **Niche.** Only fits an analyst-curated module. Strong on the surfaces it serves; unusable elsewhere. If Ken pivots away from analyst-led content, this card becomes dead.

## 18. Linked components
- **Parent organisms:** `AnalystPicks`
- **Sibling cards:** `ReportCard` (the non-analyst version)
- **Child atoms/molecules:** `Card`, `Badge`, `Button`, `ImageWithFallback`, `IndustryBadge`, `CardMetaRow`
- **Internal helper:** `LikeCounter` (file-local sub-component)

## 19. Reasons + Decisions log
- **Why "B" suffix without a Variant A in repo?** Suggests Variant A was deprecated. Naming retained to avoid breaking imports.
- **Why card embedded inside card?** Single card limits visual scan to one boundary; two adjacent cards (analyst + report) would split attention. Embedded preserves "this analyst said this about that report" gestalt.
- **Why coral left border on quote not full red?** Coral is muted brand red — pulls eye without screaming. Brand-red full border would compete with "Book a call" CTAs.
- **Why ThumbsUp + count vs heart/save?** Like = endorsement (social proof for analyst); save = bookmark (utility). Different intents. This card encodes endorsement.
- **Why `saved` prop kept despite not rendering?** Forward-compat scaffold; toggle save not yet designed but type contract reserves it.
- **Why `Math.random()` seed for likes?** Demo-data shortcut — should be lifted to caller for production. Pre-handover refactor needed.
- **Why `Button variant="secondary"` not "primary"?** Card is already a click target; primary CTA would compete. Secondary "Explore Resources" is reinforcement, not main action.
- **Why `Award` icon for Expert Pick?** Stronger trust-signal than star; less generic than checkmark.
