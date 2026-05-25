# OG Composition Patterns · Audit (WWWWH)

**Scope:** Reusable cross-organism composition patterns lifted from OG. Not atoms · not molecules · not full organisms — the *recipes* organisms use to compose surfaces.

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/src/app/components/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).
**Status:** OG never extracted these into named primitives. Each pattern is implemented inline per organism. Naming below is *audit-imposed* — OG calls them nothing.

---

## Pattern 1 · DarkGradientMesh

### WHAT
Multi-layer dark immersive background: base vertical gradient (`#0f0f0f → #1a1a1a → #0f0f0f`) + 4 corner radial-gradient "blobs" in distinct accent hues (periwinkle / purple / green / coral) + 1 center white-glow blob. Each blob is `position: absolute`, large-radius (550-800px), heavily blurred (60-90px), `mix-blend-mode: screen`. The result is a static painterly dark canvas with subtle color depth — not "starfield," not "noise," not "solid black."

### WHY
- Cinematic-dark surface needs depth without distracting motion. Solid `#000` reads flat / corporate. Pure noise reads dated.
- Screen-blend blobs lift the dark base just enough that white text + glass cards on top feel *floated*, not pasted.
- Five-blob composition (4 corners + center) gives every screen quadrant subtle color — no dead zones.
- Color choice (periwinkle / purple / green / coral) echoes Ken accent scale → brand-aligned, not generic "AI gradient."
- Static (no animation) keeps motion-budget for content. Reduced-motion users see identical surface.

### WHEN ✅
- `ResourcesSection` (case-study) — black gradient mesh behind 7-variant masonry of resource cards.
- `HeroSection` cinematic variants when more drama than flat `#000` is needed.
- Dark CTA closing sections (`CustomResearchCTA` style) where flat black would feel anticlimactic.
- Any cinematic-dark section that hosts glass-style cards (`bg-white/5 backdrop-blur-sm`).

### WHEN NOT ❌
- Editorial-light sections → use `--bg-composition-warm-editorial` (warm gradient, theme.css:112) instead.
- Sections with photographic imagery → blobs fight the image. Use solid black overlay.
- Navbars / chrome → too much visual weight for utility surface.
- Mobile-first hero where users hit FCP cost from 5 large blurred layers — consider serving the simpler `linear-gradient` base alone on `< sm`.

### WHERE (file:line)
- `src/app/components/ResourcesSection.tsx:214-269` — `DarkBackground()` function, 5 layers spelled inline.
  - L220 base: `linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)`.
  - L226 TL: `radial-gradient(circle at top left, rgba(76, 95, 215, 0.15)...)` periwinkle blob, 600×600, blur 80px, opacity 0.30, screen blend.
  - L235 TR: `rgba(124, 58, 237, 0.18)` purple, 700×700, blur 90px, opacity 0.35.
  - L244 BL: `rgba(5, 150, 105, 0.14)` green, 550×550, blur 75px, opacity 0.25.
  - L254 BR: `rgba(194, 65, 12, 0.16)` coral, 650×650, blur 85px, opacity 0.28.
  - L263 center: `rgba(255, 255, 255, 0.02)` 800×800, blur 60px, opacity 0.20 — depth glow, *no* screen blend.

### HOW
```tsx
function DarkBackground() {
  return (
    <>
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)' }} />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(76, 95, 215, 0.15) 0%, rgba(76, 95, 215, 0.08) 30%, transparent 60%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen'
        }} />
      {/* repeat for TR purple, BL green, BR coral */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
          filter: 'blur(60px)'
        }} />
    </>
  );
}
```

### Reasons + Decisions
- Why 4 corners + 1 center, not 3 or 6? 4 corners give symmetric quadrant coverage; the center glow ties them together without becoming a 6th competing focal point. Tested in `ResourcesSection.tsx` — additional blobs created visual noise.
- Why `mix-blend-mode: screen` on corner blobs but *not* center? Screen brightens — used to lift dark base. Center is white-glow; screen-blending it would crush to pure white. Standard blend keeps it subtle.
- Why these specific accent colors? Match Ken's accent palette (purple `#806ce0`, periwinkle `#a7abf0`, coral `#ea7a5f`, green `#10b981`) — see `theme.css:316-378`. The blob colors are deeper than base accents (`#4c5fd7`, `#7c3aed`, `#059669`, `#c2410c`) to read on dark.
- Why no animation? Tested an animated mesh — distracted from card content. Static preserves motion budget.

---

## Pattern 2 · SectionBg (background alternation)

### WHAT
The convention by which OG case-study and report-store pages alternate background tokens between section organisms to create rhythm: `BLACK → WHITE → WARM → WHITE → WARM → ... → BLACK`. Each organism declares its own `<SectionWrapper background="...">` so the alternation is encoded *in the page composition*, not as a separate component.

### WHY
- Visual rhythm — uninterrupted white kills editorial pacing. Alternation provides eye-rest between chapters.
- Semantic — `BLACK` reads "hero / drama / closing." `WHITE` reads "standard editorial." `WARM` reads "highlighted / break / methodology."
- No floating dividers needed — the bg change itself is the section separator. Removes 100s of `border-t`/spacer pixels.
- Token-driven — `--bg-warm: #f5f2f1` (theme.css:409) means changing warmth across the whole site is one-line.

### WHEN ✅ (canonical sequences from LAYOUT.md:167-200)

**Case study (10 sections):**
1. HeroSection → BLACK
2. ClientContextSection → WHITE
3. ChallengesSection → WARM
4. EngagementObjectivesSection → WHITE
5. MethodologySection → WARM
6. ImpactSection → WHITE
7. ValuePillarsSection → WHITE (border-t separator)
8. TestimonialSection → WHITE (border-t separator)
9. ResourcesSection → BLACK (with DarkGradientMesh)
10. FinalCTASection → WHITE (border-t separator)

**Report-store home (10 sections):** BLACK · NEUTRAL50 · WHITE · WARM · WHITE · WHITE · WARM · WHITE · WARM · BLACK.

### WHEN NOT ❌
- Never two WARM sections back-to-back (the alternation collapses).
- Never deviate from BLACK at hero+resources+final on case study (anchors the page).
- Avoid 3+ WHITE in a row — insert `border-t` separator (Pattern 5) at minimum if WARM is unavailable.

### WHERE
- `ai-context/LAYOUT.md:165-200` — canonical sequences.
- `src/app/components/SectionWrapper.tsx` — implements `background="white | warm | black | neutral50"`.
- Every organism in `src/app/components/*Section.tsx` declares its own background.

### HOW
```tsx
<SectionWrapper background="black" spacing="xl">  {/* Hero */}
<SectionWrapper background="white" spacing="lg">   {/* Context */}
<SectionWrapper background="warm" spacing="lg">    {/* Challenges */}
<SectionWrapper background="white" spacing="lg">   {/* Objectives */}
<SectionWrapper background="warm" spacing="lg">    {/* Methodology */}
```

### Reasons + Decisions
- Why `--bg-warm: #f5f2f1` not pure `#f5f5f5`? Warm has the same brightness but a touch of red in the chroma — pairs with brand red without competing. From `theme.css:409` legacy comment: *"Warm Off-White for Highlighted Sections."*
- Why `neutral50: #fafafa` exclusive to report-store? Subtle dividers between identical-bg sections without resorting to lines. Editorial pages use full warmth.
- Why never on case-study hero anything but black? Editorial entry point — black is the editorial-publication convention (NYT, Atlantic). White hero = ad-feel.

---

## Pattern 3 · NavbarGlassHover

### WHAT
Sticky navbar that combines: (a) `backdrop-blur-[4px] bg-white` on the *main* white bar, (b) `bg-white/95 backdrop-blur-sm border-t border-black/5` on the TOC sub-bar when the user has scrolled past hero, (c) hide-on-scroll-down / show-on-scroll-up via `translate-y` transform, (d) state-aware logo offset (`left-[48px]` at hero → `left-[76px]` away from hero), (e) `shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)]` purple-tinted lift shadow.

### WHY
- Backdrop blur preserves content visibility under the bar (vs. opaque navbar that occludes scroll context).
- Auto-hide on scroll-down recovers viewport for content; auto-show on scroll-up returns navigation when wanted.
- Hero-aware TOC: when user is past the hero, surface the in-page nav. When at hero, keep chrome minimal.
- Purple-tinted shadow ties the chrome to the brand accent shadow system (`--shadow-accent-sm`, theme.css:553) rather than generic gray drop-shadow.

### WHEN ✅
- Long-scroll editorial pages (case-study, PDP).
- Pages with section TOCs (≥4 anchorable sections).
- Pages where conversion CTA must stay reachable (Schedule a Demo persists on dark sub-bar).

### WHEN NOT ❌
- Single-screen landing pages (no scroll → no hide/show benefit).
- Pages with full-bleed video heroes (blur on video = perf cost).
- Embed / iframe / modal contexts (chrome unwanted).
- Mobile primary nav (use full-screen sheet instead — see `Navbar.tsx:380-475` mobile menu pattern).

### WHERE
- `src/app/components/Navbar.tsx:37-50` — outer container, transform-based hide/show.
- `src/app/components/Navbar.tsx:151` — `backdrop-blur-[4px] bg-white min-h-[56px] sm:h-[60px]` main bar.
- `src/app/components/Navbar.tsx:50` — `shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)]` purple-tinted lift.
- `src/app/components/Navbar.tsx:476` — `bg-white/95 backdrop-blur-sm border-t border-black/5 hidden md:block` TOC sub-bar.
- `src/app/components/Navbar.tsx:38-40` — `${shouldHide ? '-translate-y-full' : 'translate-y-0'}` toggle.
- `src/app/hooks/useScrollDirection.ts` — scroll-direction detection.
- `src/app/hooks/useHeroVisibility.ts` — hero in/out detection.

### HOW
```tsx
const shouldHide = !isHeroVisible && scrollDirection === 'down';

<div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
  shouldHide ? '-translate-y-full' : 'translate-y-0'
}`}>
  <div className="flex flex-col w-full shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)]">
    {/* Optional dark secondary bar (hero only) */}
    {isHeroVisible && <div className="bg-[#141016] h-[40px] ..." />}
    {/* Main white bar w/ backdrop-blur */}
    <div className="backdrop-blur-[4px] bg-white min-h-[56px] sm:h-[60px] ...">
      {/* logo + nav links + CTA */}
    </div>
    {/* TOC sub-bar — only past hero */}
    {!isHeroVisible && (
      <div className="bg-white/95 backdrop-blur-sm border-t border-black/5 hidden md:block">
        {/* TOC links */}
      </div>
    )}
  </div>
</div>
```

### Reasons + Decisions
- Why `backdrop-blur-[4px]` not `-sm` (4px)? Same value, but Tailwind arbitrary form is used because `-sm` was once 8px in earlier Tailwind. Inline `[4px]` is version-proof. Don't refactor.
- Why hide *only* when scrolling down past hero? At-hero scrolls feel like part of the hero — hiding chrome there is disorienting. Past-hero scrolls are content-reading mode, where chrome can recede.
- Why purple shadow `rgba(128,108,224,0.15)`? Maps to `--purple-600 #806ce0` at 15% alpha. Ties chrome lift to brand accent (not pure black) without breaking the 5% brand-color rule (no red in chrome).
- Why `bg-white/95` on sub-bar, not full `bg-white`? Subtle translucency lets scrolled content tint through — keeps the bar feeling layered rather than stamped.

---

## Pattern 4 · CarouselFadeMask

### WHAT
Horizontal scrolling region (cards or pills) edged by left + right `linear-gradient(to right, <bgColor>, transparent)` overlays positioned `absolute` with `pointer-events-none`. Width: 16px-32px-64px depending on use (pills/cards/large-cards). Background color matches parent section so the fade *looks like* the content is dissolving into the background, not a generic shadow.

### WHY
- Native CSS `overflow-x: scroll` exposes the scroll without UX hint that more content exists. Fade masks signal "there's more →" without arrow buttons.
- Color-matched fade (rather than fixed gray) reads as continuous surface, not a separate widget.
- Pointer-events-none = clicks pass through the fade to underlying cards — no dead zones at scroll edges.
- Two molecules exist (`ScrollFade` for pills, `HorizontalScroll` for cards) but the *fade primitive* is identical → reusable concept.

### WHEN ✅
- Card carousels (FeaturedResearch, RecentlyViewed) — uses `HorizontalScroll` (64px fade, transform-based).
- Pill / tab / chip rows that overflow on mobile — uses `ScrollFade` (16-32px fade, native scroll).
- Category filter rows in `ReportStoreHero`.
- Industry quick-link rows.

### WHEN NOT ❌
- Grids that should wrap (use CSS grid — fade implies horizontal scroll).
- Sections where the section bg is dark *and* a card has a different bg (fade fights the card). Match fade bg to the *card-side* surface.
- Pinned / sticky carousels (fade conflicts with scroll-snap centered indicators).
- Vertical lists — fade masks are horizontal-only in OG (no vertical implementation found).

### WHERE
- `src/app/components/molecules/ScrollFade.tsx:45,51` — pill/chip fade primitives.
- `src/app/components/molecules/HorizontalScroll.tsx:134,142` — card carousel fades.
- `src/app/components/Navbar.tsx:476+` TOC overflow uses inline ScrollFade pattern.

### HOW
```tsx
// Generic inline (pills):
{canScrollLeft && (
  <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
    style={{ width: fadeWidth, background: `linear-gradient(to right, ${fadeBg}, transparent)` }} />
)}
{canScrollRight && (
  <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
    style={{ width: fadeWidth, background: `linear-gradient(to left, ${fadeBg}, transparent)` }} />
)}

// Cards (HorizontalScroll molecule):
<div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
  style={{ background: `linear-gradient(to right, ${fadeBg}, transparent)` }} />
```

### Reasons + Decisions
- Why 32px for pills but 64px for cards? Pills are ~32px tall — the fade matches typographic scale. Cards are 250-400px wide; a 32px fade reads as a thin shadow strip, not a fade. 64px ≈ 16% of card width = perceptible dissolve.
- Why `canScrollLeft` / `canScrollRight` state (ScrollFade) instead of always rendering both fades? When user reaches the left edge, the left fade would mask non-existent content. Conditional rendering keeps the affordance honest.
- Why `pointer-events-none` over `z-index: -1`? The fade sits *over* scrolled content (z:10) so the gradient effect is visible — but interaction must pass to the cards beneath. `pointer-events-none` is the cleanest solution.

---

## Pattern 5 · BorderTopSeparator (white-on-white divider)

### WHAT
A `border-t border-black/10` (or `border-black/5`) added to the *top* of a WHITE section when the previous section was also WHITE. Provides a hairline visual break without changing background. Used only when the page composition prevents the WARM/BLACK alternation from happening naturally.

### WHY
- Case-study `ValuePillarsSection → TestimonialSection → FinalCTASection` is three WHITE in a row by content logic. Inserting WARM would interrupt the closing crescendo. Hairline border preserves rhythm.
- Cheaper than a designed divider element — uses the section's existing wrapper.
- Token-discipline — opacity-on-black `(black/10)` not a custom gray, ensures auto-dark-mode parity (if added).

### WHEN ✅
- White section directly after another white section.
- Closing-sequence sections (ValuePillars → Testimonial → FinalCTA) on case study.
- Report-store sequence where two WHITEs are unavoidable (DailyDataHighlights after RecommendedForYou).

### WHEN NOT ❌
- Between WHITE and BLACK (the bg flip *is* the divider — adding a line is noise).
- Between WHITE and WARM (same as above).
- Inside a section between sub-sections (use spacing tokens, not borders).

### WHERE
- `src/app/components/FinalCTASection.tsx:11` — `<section className="py-12 sm:py-16 md:py-20 bg-white border-t border-black/10">`
- `src/app/components/TestimonialSection.tsx` — same pattern (border-t after ValuePillars).

### HOW
```tsx
<section className="py-12 sm:py-16 md:py-20 bg-white border-t border-black/10">
  {/* WHITE section content, separated from previous WHITE */}
</section>
```

### Reasons + Decisions
- Why `black/10` not `--warm-500 #eae5e3`? Pure black-opacity scales linearly across light/dark mode; named tokens don't.
- Why on the *top* of the new section, not bottom of the previous? Lets each section own its own boundary — if you re-order sections, the border travels with the consumer, not the predecessor.

---

## Cross-Pattern Notes (audit observations · not OG rules)

- **None of these patterns is named in OG.** They live as inline code in `*Section.tsx` files. The new DS should consider extracting them as named primitives: `<DarkGradientMesh />`, `<FadeEdge side="left|right" width="..." />`, etc.
- **All patterns respect `prefers-reduced-motion`** only indirectly — none animate by default. DarkGradientMesh is static; navbar hide/show is `transition-transform` which IS affected by reduced-motion at the browser level (Safari/Chrome auto-clamp transitions when reduced-motion is set).
- **Token leakage:** DarkGradientMesh hardcodes `rgba(76, 95, 215, 0.15)` etc. — should reference `--periwinkle-700` family. Logged as token-discipline gap for the new DS.
- **Reusability ratings:** DarkGradientMesh ⭐⭐⭐ (one consumer · ResourcesSection — but valuable to extract for V0.2). SectionBg ⭐⭐⭐⭐⭐ (every page). NavbarGlassHover ⭐⭐⭐⭐ (every Ken page). CarouselFadeMask ⭐⭐⭐⭐⭐ (every overflow scroll). BorderTopSeparator ⭐⭐⭐ (3-4 usages but mandatory when triggered).

---

**Audit complete · 5 patterns documented · all 5 are inline implementations in OG (no extracted primitives). Extraction recommendations live in `decisions/` once gap-analysis closes.**
