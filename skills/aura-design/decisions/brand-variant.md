# Brand Variant — decision tree

**When to load:** task brief mentions cinematic / dark / editorial / light / variant choice · or before any page-build decides per-page or per-section variant.

**Output:** variant choice (cinematic-dark / editorial-light / mixed-w/-activator) + rationale + recipe override flag.

---

## Step 1 — Context (which surface?)

| Surface | DEFAULT variant | Override allowed |
|---|---|---|
| Discovery (01) | Mixed: cinematic-dark hero + featured · editorial-light receipts/sector/methodology | Yes per recipe override |
| Report Store listing (02a) | Mixed: cinematic-dark hero + featured carousel · editorial-light body + sidebar | Yes per recipe override |
| Report Store detail (02b) | Editorial-light · cinematic-dark hero optional | Yes per user pref |
| Report Viewer (03) | Editorial-light primary (reading) · cinematic-dark optional toggle | User-controlled |
| Dashboards (04) | Cinematic-dark DEFAULT (long-session reading) · editorial-light optional toggle | User-controlled |
| Engagement (05) | Editorial-light DEFAULT (working context) · cinematic-dark optional toggle | User-controlled |

**Rule:** marketing surfaces (Discovery, Store hero) lean cinematic. Reading + working surfaces (Viewer, Dashboard, Engagement) lean editorial unless context demands cinematic.

---

## Step 2 — Recipe override (HARD)

Recipe at `design-system/recipes/<name>.md` MAY specify `Variant LOCK: <X>` at top. If present:
- Build EXACTLY X · NEVER switch to "cinematic-dark because it looks better" (Cat 13.10 anti-pattern)
- aura-qa fails recipe-conformance gate if variant ≠ recipe LOCK

If recipe is silent on variant → use surface DEFAULT from Step 1.

---

## Step 3 — Variant activation mechanisms

### Page-level
```html
<html data-variant="cinematic-dark">  <!-- or editorial-light -->
```
Cookie-driven · RSC layout reads cookie · whole-page CSS layer activates.

### Section-level (within editorial-light page)
```html
<section data-variant-section="cinematic">
  <!-- This section gets cinematic-dark mesh + dark tokens, even on light page -->
</section>
```
CSS in `core-v2/styles/cinematic-dark.css` `[data-variant-section="cinematic"]` selector lets a single section opt-in to cinematic mesh + dark tokens. **Use for:** ResourcesSection on case-study pages · featured-research band on Discovery · book-a-call CTA band.

### User toggle (Viewer / Dashboard / Engagement)
- DS `useVariant` hook + persisted cookie + theme toggle in topbar
- Toggle re-runs page-level CSS-var activation (no re-render needed)

---

## Step 4 — Cinematic dark — when

USE cinematic-dark when ANY:
- "Premium cinematic finish" requirement
- Marketing surface where credibility = first impression (Discovery hero)
- Long-session reading where eye fatigue matters (Dashboard, Viewer optional)
- Featured/hero band w/ chart-still or scroll-animated data (NYT graphics pattern)
- Book-a-call / pull-quote / closing-CTA bands (Stripe Press pattern)

DON'T USE cinematic-dark when:
- Reading-dense surfaces by default (forces user to opt-out)
- Working surfaces (engagement, billing) — context = light
- Form-heavy pages (checkout, settings) — light = scannable

---

## Step 5 — Editorial light — when

USE editorial-light when ANY:
- Reading-dense (case-study, report viewer, content marketing)
- Listing surfaces (report store grid · sector grid)
- Working/data surfaces (engagement portal · dashboards default user pref)
- Methodology proof bands (receipts shine on light bg)
- Body content of any surface (the "92% foundation")

DON'T USE editorial-light when:
- Hero needs cinematic chart-still impact (use dark mesh)
- Long-session reading w/ user pref toward dark (offer toggle)

---

## Step 6 — Mixed-page + activator pattern

Most marketing pages = mixed: dark hero + light body + dark CTA close.

**Section alternation per recipe (HARD GATE):**
1. Recipe specifies bg sequence: `black → white → warm → black → white → ...`
2. Each section's outermost element gets `section-bg-{N}` class OR token-backed inline style
3. Same bg every section = bug (per LEARNING 2026-05-08 recipe-conformance gate)

**Activator pattern in light pages:**
```tsx
<SectionWrapper data-variant-section="cinematic" /* renders dark mesh */>
  <SectionHeading>Featured research</SectionHeading>
  ...
</SectionWrapper>
```
The `[data-variant-section="cinematic"]` CSS in `cinematic-dark.css` swaps tokens for that section only. Pattern shipped in V0_lite_report HeroSection 2026-05-08.

---

## Step 7 — Token swap (what changes per variant)

| Token group | Cinematic dark | Editorial light |
|---|---|---|
| `--color-bg-deep` | `#0a0a0c` | n/a |
| `--surface-bg-primary` | rgba(15,15,20,1) | `#f5f2f1` warm off-white |
| `--surface-text` | `#FAFAFA` | `#000000` |
| `--surface-text-muted` | rgba(250,250,250,0.65) | rgba(0,0,0,0.6) |
| `--border-default` | rgba(255,255,255,0.08) | rgba(0,0,0,0.08) |
| `--composition-mesh` | 5-overlay radial gradient | none (transparent) |
| Brand red `--color-brand-red` | unchanged `#b01f24` | unchanged `#b01f24` |
| Type scale | unchanged | unchanged |
| Spacing scale | unchanged | unchanged |
| Motion durations | unchanged | unchanged |

**Brand consistency:** red, type, spacing, motion = SAME across variants. Only surface colors swap. This is what keeps brand recognizable across light/dark.

---

## Step 8 — Anti-patterns

| Anti-pattern | Why it's wrong | Cat |
|---|---|---|
| Building cinematic-dark "because it looks cooler" when recipe says light | Recipe is binding spec | 13.10 |
| Section alternation drift (same bg every section) | Reduces visual cadence · reads as monotone | 13.11 |
| Hardcoded `bg-deep #0a0a0c` instead of `var(--surface-bg-primary)` | Token-only rule | 1.1 |
| Custom `[data-theme="dark"]` w/o using DS variant system | Diverges from canonical activator | 13.12 |
| Mixing variants per element ("dark text on light section because contrast") | Use proper token (text-muted) instead | 1.2 |
| Building 3rd variant ("midnight mode" / "sepia mode") w/o ADR | Variant proliferation | 13.13 |

---

## Step 9 — Implementation checklist (per page build)

- [ ] Recipe variant LOCK respected (if present)
- [ ] Page `<html data-variant>` set via cookie
- [ ] Section alternation per recipe sequence
- [ ] `[data-variant-section="cinematic"]` activator used for opt-in dark sections in light pages
- [ ] Token-only colors (no raw hex outside DS internals)
- [ ] Theme-toggle wired (Viewer/Dashboard/Engagement only)
- [ ] aura-qa recipe-conformance gate passes

---

## Cross-surface citations

- Surface 01 — variant mixing demonstrated · activator pattern usage
- Surface 02b detail — variant toggle for hero
- Surface 03 — user-controlled toggle · long-session optimization
- Surface 04 — DEFAULT cinematic for working context
- Surface 05 — DEFAULT editorial for working context

Variant detail files (more comprehensive guides):
- `variants/cinematic-dark.md` — full dark variant token + pattern reference
- `variants/editorial-light.md` — full light variant token + pattern reference
