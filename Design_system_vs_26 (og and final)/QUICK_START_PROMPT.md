# QUICK START PROMPT - Copy & Paste This

**Version:** 4.3 | **Updated:** 2026-03-18  
**Use this shortened version when you need to quickly start a new Figma Make page**

---

## PASTE THIS INTO FIGMA MAKE

```
Follow our design system from vsoffice001-cloud/Design-System-vs-26:

TYPOGRAPHY (Major Third 1.25x):
- Labels: 12.8px (--text-xs)
- Body: 16px (--text-sm) — 90% of text
- Section h2: 39px (--text-2xl)
- Hero h1: 48.8px (--text-3xl)
- TOC/Nav: 14px (--text-nav)
- Micro-labels: 10px (--text-card-micro) — counts/numbers ONLY

COLORS:
- Black #000000 — Hero, Resources sections
- White #ffffff — Default sections
- Warm #f5f2f1 — Challenges, Methodology
- Red #b01f24 — CTAs ONLY (sparingly)
- Icons: #806ce0 (content), #737373 (utility)

BUTTONS:
- Default size: md (42px height, 16px font)
- Navbar size: sm (36px height, 14px font)
- Card footer: xs (28px height, 12px font)
- Hero size: lg (48px) — big landing pages ONLY
- Shimmer: Always active (brand signature)
- Arrow: ArrowUpRight (45deg diagonal) — ONLY for urgent CTAs
  - Uses showArrow prop on Button, or automatic in CTALink
  - NEVER use ArrowRight or ChevronRight — diagonal only

LAYOUT:
- SectionWrapper: handles background, padding, max-width
- SectionHeading v4.0: prop-based (title, label, subtitle — NOT children)
- Container tokens: --container-page (1200px), --container-content (1000px)
- DO NOT use max-w-6xl — use var(--container-content) or SectionWrapper

SECTIONS:
- Alternate: Black → White → Warm → White
- Use SectionWrapper for every section
- Use SectionHeading for every heading

MOLECULES (from @/app/components/molecules):
- ScrollFade: pill/tab overflow with fade edges
- HorizontalScroll: card carousel with drag/momentum
- ReportCard: layout="grid" or layout="list"
- StatCard: KPI/metric display
- SkeletonCard: loading state
- EmptyState: zero results
- CardReveal: staggered card entrance

ORGANISMS (from @/app/components/organisms):
- ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner
- ProductPageTemplate: declarative page assembly
- ReportStoreHero, FeaturedResearch, CardListing, FiltersPanel, etc.

BADGES:
- Section labels: minimal + sm (11px, 23px height)
- Step pills: pill + sm + warm + bordered + shimmer
- Info labels: minimal + xs (9-10px, 18px height)

ACCESSIBILITY:
- IconOnly buttons need ariaLabel
- Focus: 2px black outline
- Min touch: 40px

Import from /src/app/components/ (atoms) or /src/app/components/molecules/ or /src/app/components/organisms/
Import Foundations via @/app/components/FoundationsContent (re-export hub), never directly from foundations/
Quality target: 9.5/10 (Stripe/Material Design level)
```

---

## BUTTON QUICK COPY-PASTE

```tsx
// Standard CTA (most common)
<Button variant="brand">Get Started</Button>

// Urgency CTA with animated arrow (ArrowUpRight — NOT ArrowRight)
<Button variant="brand" showArrow>Schedule Demo</Button>

// Hero CTA (big pages only)
<Button variant="brand" size="lg" showArrow>Transform Business</Button>

// Navbar (compact)
<Button variant="brand" size="sm">Sign Up</Button>

// Card footer CTA (compact)
<Button variant="secondary" size="xs">View Report</Button>

// Text + Arrow Link (AnimatedArrow included automatically)
<CTALink href="/learn">Explore More</CTALink>

// Inline paragraph link
<InlineLink href="/about">our approach</InlineLink>
```

---

## SECTION TEMPLATE (Using SectionWrapper + SectionHeading v4.0)

```tsx
<SectionWrapper background="white" spacing="lg">
  <SectionHeading
    level={2}
    title="Section Title"
    label="CATEGORY"
    subtitle="Description text here"
    action={{ text: "View All", href: "/all" }}
  />

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Your content */}
  </div>
</SectionWrapper>
```

---

## MOLECULE QUICK COPY-PASTE

```tsx
// Pill/tab overflow with fade edges
<ScrollFade fadeBg="white">
  <div className="flex gap-2">
    {items.map(i => <Badge key={i}>{i}</Badge>)}
  </div>
</ScrollFade>

// Card carousel
<HorizontalScroll fadeBg="white" gap="gap-4">
  {reports.map(r => <ReportCard key={r.id} layout="grid" {...r} />)}
</HorizontalScroll>

// Staggered card entrance
<div className="grid grid-cols-3 gap-6">
  {items.map((item, i) => (
    <CardReveal key={item.id} delay={i * 0.1}>
      <Card>{/* content */}</Card>
    </CardReveal>
  ))}
</div>
```

---

## ORGANISM QUICK COPY-PASTE

```tsx
// Declarative page (fastest)
<ProductPageTemplate
  hero={{ label: 'Store', title: 'Research Hub', ... }}
  featured={{ label: 'Featured', title: 'Picks', children: ... }}
  browse={{ label: 'Browse', title: 'All', items: [...], renderCard: ... }}
  cta={{ label: 'CTA', title: 'Need More?', primaryText: 'Contact' }}
/>

// Manual organism stack
<ReportStoreHero />
<FeaturedResearch />
<KeyMarketIndicators />
<RecommendedForYou />
<CustomResearchCTA />
```

---

**Full documentation:** See ai-context/ modules (CORE, COMPONENTS, LAYOUT, TYPOGRAPHY, COLORS, PROMPTS)  
**Live examples:** Design System Dashboard  
**Canonical file map:** design-system-checklist.md in repo root  
**Project:** Project K / Vishal
