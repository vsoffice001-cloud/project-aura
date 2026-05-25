# V0_lite_report-legacy — 14 sections · 1 master Button (4 variants × 4 sizes × 2 bg) · 12 canonical patterns

Path `/Users/vishalchauchan/Downloads/Anti-folder01/projects/V0_lite_report-legacy/`. 2026-05-19.

## 1. Section Inventory

| Section · file | WHAT | Verdict · Why |
|---|---|---|
| HeroSection · `src/app/components/HeroSection.tsx` | 2-col hero w/ breadcrumb + serif H1 + gradient span + lede + dual responsive CTA + 3-stat strip + right preview card w/ paywall + scroll cue | USE PARTIAL · canonical pairing, 730-line monolith |
| KeyStats · `KeyStats.tsx` | 3-stat horizontal w/ purple icon-box 10%, anim counter, periwinkle gradient | USE · region-preset pattern |
| ChapterMethodology · `ChapterMethodology.tsx` | Eyebrow→serif H2→lede→stepper tabs→3-col card grid w/ chevron bullets | USE · stepper + active-shadow toggle |
| FAQSection · `FAQSection.tsx` | Eyebrow→H2→lede→accordion+chevron→contact CTA | USE · `aria-expanded/controls/region` |
| CTASection · `CTASection.tsx` | Centered eyebrow→H2→lede→brand CTA · 2-variant orbs bg | USE PARTIAL · drop FloatingVariantSwitcher |
| SampleReportPreview · `SampleReportPreview.tsx` | Sidebar TOC + 4 chapter subs + mobile TOC + IntersectionObserver | USE · 3-state sidebar |
| NewHeader · `NewHeader.tsx` | 2-row nav: secondary bar + sticky main, 5 dropdowns, search, red-gradient CTA | SKIP · header from topnav-v32 (memory) |
| Footer · `Footer.tsx` | 4-col grid + bottom legal | SKIP · footer from V0.2-for-design-system |
| Breadcrumb · `Breadcrumb.tsx` | Chevron trail + last-item triangle → 2-col dropdown panel | USE · ESC/outside close, full taxonomy |
| ReportHighlights · `ReportHighlights.tsx` | Eyebrow→H2→lede→6-card 3-col grid | USE · "what's included" recipe |
| SlideshowSection · `SlideshowSection.tsx` | 40-slide carousel, peek scaling, thumbnails, Lock paywall, light/dark | USE PARTIAL · keep 16:9 responsive sizing |
| AnalyticsDashboard · `AnalyticsDashboard.tsx` | Hidden Ctrl+Shift+A dashboard | SKIP · dev tool |
| ScrollProgress · `src/design-system/components/ScrollProgress.tsx` | 3px brand-red top bar | USE · documented 5% brand allocation |
| ScrollToTop · `ScrollToTop.tsx` | FAB after 400px | USE · 92% foundation exemplar |

Subs: `sample-report/{SidebarTOC, ChapterExecutiveSummary, ChapterMarketOverview, ChapterExtendedTOC, PhaseCard, data}.tsx`; `mobile/{MobileTOC, MobileMenu}.tsx`; 6 `*Dropdown.tsx` — all SKIP w/ Header/Footer.

## 2. Button Inventory · ALL OUTDATED

Final canonical = report-store-legacy. Documented for completeness.

Atom `src/design-system/Button.tsx:88-386`. 4 variants × 4 sizes (sm/md/lg/xl) × 2 bg (light/dark).

| Variant | File:line | Style |
|---|---|---|
| `primary` | `Button.tsx:194-195, 217-221` | Gradient `#141016, #656565, #141016` + shimmer + dynamic shadow |
| `brand` | `Button.tsx:197-198, 223-227` | Gradient `#b01f24, #eb484e, #b01f24` + brand shadow `rgba(176,31,36,0.15-0.25)` |
| `secondary` light | `Button.tsx:204` | `bg-white text-black border-warm-500 hover:bg-coral-50 active:bg-coral-100` |
| `secondary` dark | `Button.tsx:202` | `bg-white/10 border-white/30` |
| `ghost` light | `Button.tsx:210` | `bg-transparent border-black/20` |
| `ghost` dark | `Button.tsx:208` | `bg-transparent border-white/20` |

Sizes map to `--button-height/px/min-width-{sm,md,lg,xl}` tokens (`Button.tsx:171-184`). All 🔴 OUTDATED.

Features: `animatedArrow` prop → 2-arrow exit/enter; loading w/ Loader2 spinner; ripple `Button.tsx:137-160` (600ms); shimmer always-on `Button.tsx:289-307` (700ms hover sweep); `TrackedButton.tsx` wraps + analytics.

CTALink (`CTALink.tsx:56-141`): 2 variants `default`/`brand` × 3 sizes (sm 16/md 20/lg 25px). 🔴 OUTDATED.

Raw `<button>` not via atom: `NewHeader.tsx:109-117` Sign-up; `NewHeader.tsx:307-311` Book-discovery red-gradient hand-rolled; `Footer.tsx:23-43` 3 social; `FAQ.tsx:90-108` accordion toggle; `Methodology.tsx:90-115` stepper tabs. All 🔴 OUTDATED.

## 3. Arrow + Directional UX

| Element | File:line | Verdict |
|---|---|---|
| `AnimatedArrow` 2-arrow ArrowUpRight | `src/design-system/components/AnimatedArrow.tsx:33-77` exit `translate-x-[150%] y-[-150%]` enter `x-[-150%] y-[150%]` 300ms `motion-reduce` | USE |
| CSS keyframes `arrow-exit/enter` | `src/styles/theme.css:378-406` 400ms cubic-bezier(0.4,0,0.2,1) | USE |
| Button arrow | `Button.tsx:336-376` via `animatedArrow` | USE |
| CTALink arrow | `CTALink.tsx:134-138` | USE |
| Breadcrumb chevron sep | `Breadcrumb.tsx:270-276` 12×12 stroke 2.5 | USE |
| Breadcrumb triangle trigger | `Breadcrumb.tsx:326-340` 8×8 path `M2 1L6 4L2 7` brand-red fill + 90° rotate | USE |
| Bullet pointer chevron | `Methodology.tsx:178-182` 14×14 stroke 2 purple `iconColors.content` | USE |
| Stepper separator | `Methodology.tsx:117-119` 20×20 black-300 | USE |
| FAQ disclosure | `FAQ.tsx:101-107` 20×20 utility-gray rotate-180 300ms | USE |
| Nav menu chevron | `NewHeader.tsx:87-93,199-205` 12×12 path `M9.75 4.5L6 8.25L2.25 4.5` | USE |
| Hero scroll-down | `HeroSection.tsx:582-612` 30×48 outer + 4×10 inner dot · `y:[0,4,0]` 2s outer · `y:[0,6,0] opacity:[1,0.4,1]` inner | USE |
| ScrollToTop FAB | `ScrollToTop.tsx:59` ArrowUp 20×20 stroke 2.5 | USE |
| Slideshow nav | `SlideshowSection.tsx:11` ChevronLeft/Right | USE |
| Sign-in arrow | `NewHeader.tsx:104-106` inline 12×12 | USE PATTERN |

## 4. Type Pairing · CANONICAL

V0_lite pairing canonical per direction.

**1. Eyebrow→Serif H2→Lede** (FAQ/Highlights/Methodology):
```
<SectionLabel background="light" variant="accent">FREQUENTLY ASKED</SectionLabel>
<SectionHeading level={2} align="left">Frequently Asked Questions</SectionHeading>
<p className="text-[1rem] text-[var(--black-500)] mt-4 leading-relaxed">...</p>
```
`FAQ.tsx:67-79`, `Highlights.tsx:105-117`, `Methodology.tsx:70-83`.

**2. Hero pulse-eyebrow→serif H1 w/ gradient span→lede** `Hero.tsx:243-275`: SectionLabel pulse · `h1 font-serif text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em]` w/ inner `span block bg-gradient-to-r bg-clip-text text-transparent` · `p font-sans max-w-lg text-[1rem] leading-relaxed`.

**3. Stat-value-label triplet** `KeyStats.tsx:101-117`:
```
size-12 rounded-[10px] bg-content-icon/10  → icon-box
font-sans font-semibold text-[1.953rem] leading-[1.2] text-black font-tabular-nums tracking-tight  → value
font-sans text-[1rem] leading-[1.5] text-utility-icon  → label
```
Also `Hero.tsx:93-115`. Tabular-nums essential.

**4. Chapter-eyebrow + serif H2 + lede w/ max-w** `Methodology.tsx:70-83`: `SectionLabel variant="accent"` "CHAPTER 11 - OUR APPROACH" · `h2 text-[1.953rem] sm:text-[2.441rem] font-light font-serif leading-[1.25]` · `p text-[1rem] text-[var(--black-500)] leading-[1.7] max-w-[50rem]`.

**5. Card title-subtitle** `Methodology.tsx:161-167`: `h3 font-sans font-medium text-[1rem] text-black leading-tight` · `p text-[0.813rem] text-[var(--black-500)] leading-snug mt-0.5`.

**6. Icon-box + stat-badge + title + desc** `Highlights.tsx:68-93`: top-row [size-11 icon-box bg-content-icon/10 + badge `px-2.5 py-1 rounded-[5px] bg-black/4 text-[0.8rem]`] · `h4 font-medium text-[1.25rem] leading-[1.4] mb-2` · `p text-[0.8rem] text-utility-icon leading-[1.5]`.

**7. Centered CTA pair** `CTASection.tsx:96-121`: eyebrow `GET IN TOUCH` · `h2 font-serif font-light text-[1.563rem] sm:text-[1.953rem] md:text-[2.441rem] leading-tight mb-4` · `p text-[0.875rem] sm:text-[1rem] md:text-[1.25rem] leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto`.

**8. Footer link list** `Footer.tsx:49-50`: `h4 text-[1rem] font-medium mb-4` · items `text-[0.875rem] text-[var(--black-500)] hover:text-black`.

**9. Breadcrumb dropdown col-header+item** `Breadcrumb.tsx:128-162`: header `text-[13px] tracking-[0.2px] text-black-400 border-b border-black-200` · item active `text-brand-red bg-rgba(176,31,36,0.06)` / inactive `text-black/60 hover:text-black/90`.

**10. Preview-card chapter-label + chapter-title** `Hero.tsx:489-494`: `text-[0.8rem] uppercase tracking-wide white/40` · `text-[1rem] font-medium white/90`.

## 5. Type Scale + Weight + Tracking + Leading

| Used | core-v2 token | Match | File examples |
|---|---|---|---|
| 0.75rem (12px) | none | extra | `Footer.tsx:16` |
| 0.8rem (12.8px) | `--text-xs` | ✅ | `Hero.tsx:113,164,489,499,562`, `Highlights.tsx:75,91` |
| 13px / 0.813rem | navHelper (none in core-v2) | 🔴 missing | `Breadcrumb.tsx:129,282,294`, `Methodology.tsx:165,176`, `NewHeader.tsx:65,82` |
| 0.875rem / 14px | nav (none) | ⚠️ | `FAQ.tsx:132,136`, `Methodology.tsx:94` |
| 1rem | `--text-sm` | ✅ | body text dozens |
| 1.25rem | `--text-base` | ✅ | `Highlights.tsx:86`, `Footer.tsx:15`, `Hero.tsx:671,675` |
| 1.563rem | `--text-lg` | ✅ | `Hero.tsx:105`, `CTASection.tsx:108` mobile |
| 1.953rem | `--text-xl` | ✅ | `KeyStats.tsx:109`, `Hero.tsx:256,648`, `Methodology.tsx:76` |
| 2.441rem | `--text-2xl` | ✅ | h2 desktops |
| 3.052rem | `--text-3xl` | ✅ | `Hero.tsx:256` h1 desktop |
| 2.25rem (36px) | none | extra | only mentioned in `SectionHeading.tsx` comment |
| 0.563/0.688/0.938rem | none | 🔴 | `Badge.tsx:160-163` per-size |

**Weights:** `font-light` 300 all serif headings · `font-medium` 500 body emphasis + card titles · `font-semibold` 600 stat values + SectionLabel · `font-bold` 700 brand button. Variable-font system `theme.css:345-353`.

**Tracking:** `[-0.02em]` hero h1 · `[0.0875px]` Button + CTALink · `[0.2em]` SectionLabel uppercase · `[0.2px]` breadcrumb · `wide` chapter eyebrow · `tight` stat numerics · Badge per-size `[0.15/0.12/0.08/0.05em]`.

**Leading:** `[1.1]` 4xl/5xl · `[1.2]` h1 + stat-value · `[1.25]` chapter h2 · `tight` h2 + card title · `relaxed` lede + preview · `[1.5]` stat-label + highlight-desc · `[1.6]` Highlights lede · `[1.7]` chapter lede · `snug` card subtitle.

## 6. Color / Palette

Hex literals (mostly atom internals):

- **Ink:** `#000000`/`#ffffff` (`tokens.ts:20-21`)
- **Warm:** `#f5f2f1` bg / `#eae5e3` border / `#fcfbfa` Badge / `#a6968e` Badge-warm text
- **Brand red:** `#b01f24` primary CTA (`tokens.ts:30`, `Button.tsx:225,260`, `Badge.tsx:101`, `SectionLabel.tsx:104,121`, `Breadcrumb.tsx:339,149`) · `#c62d31` gradient end · `#8f181d` hover · `#771419` active · `#eb484e` shimmer mid (`Button.tsx:225,260`)
- **Neutral mid:** `#737373` SectionLabel default text + icon-utility (`SectionLabel.tsx:101`, `iconColors.ts:58`) · `#404040` Badge-neutral text · `#a3a3a3` Badge-muted
- **Accent purple 600** `#806ce0` icon stroke + badge + glow (`iconColors.ts:52`, `KeyStats.tsx:104`, `Methodology.tsx:153`) · RGBA tints `(128,108,224, 0.05/0.06/0.08/0.1/0.15/0.2)`
- **Accent periwinkle 500** `#c3c6f9` · perano 500 `#dfeafa` · coral 600 `#d9d1ce`
- **Dark-hero accent** `#ff6b6b` SectionLabel-accent-dark (`SectionLabel.tsx:101,121`)
- **Primary gradient stops** `#141016, #656565` (`Button.tsx:219`)
- **Modal bg** `var(--black-900)`/`black-800` (`Hero.tsx:628`)
- **Semantic Badge:** info `#1e40af/#bfdbfe/#eff6ff`; success `#166534/#bbf7d0/#f0fdf4`; warning `#92400e/#fde68a/#fffbeb`; error `#991b1b/#fecaca/#fef2f2` (`Badge.tsx:107-138`)

CSS vars used in consumers: `--brand-red`, `--brand-red-hover`, `--red-500`, `--black-50…500`, `--warm-100/300/400/500`, `--coral-50/100/200/300/500`, `--periwinkle-50/200/300`, `--perano-200/300`, `--purple-50/200/300`, `--text-sm/base/lg`. Source `src/styles/theme.css:1-260`.

## 7. Spacing Inventory

| Section | inter (py) | intra | internal | file:line |
|---|---|---|---|---|
| Hero | `py-6 sm:py-8 md:py-12`, `min-h-[50vh] sm:min-h-[60vh]` | grid `gap-12 lg:grid-cols-2` · left `space-y-6` · stats `grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8` | breadcrumb `mb-6 sm:mb-8` · CTA `pt-2` · card `p-4` · content `space-y-3` | `Hero.tsx:181,219,233,235,279,349` |
| KeyStats | `py-10 md:py-14` | `cols-1 sm:cols-3 gap-8 sm:gap-12 md:gap-16` | icon-box→value flex-col `gap-2` | `KeyStats.tsx:132,138,96` |
| Methodology | (parent) chapter `mb-12` | header→h2 `mb-4` · h2→lede `mb-4` · lede→stepper `mb-10` · stepper→cards `mb-10` · grid `gap-4 lg:gap-5 md:grid-cols-3` | card `px-3 py-4 sm:px-4 sm:py-5` · icon-row→bullets `mb-4` · bullets `space-y-2` | `Methodology.tsx:69,70,76,79,86,126,148,172` |
| FAQ | SectionWrapper lg `py-12 md:py-20` | header `mb-12` · list `space-y-4` · contact `mt-10 sm:mt-12` | button `px-4 sm:px-6 py-4 sm:py-5` · answer `pt-4` · contact `p-5 sm:p-8 gap-4` | `FAQ.tsx:66,67,81,127,93,115` |
| CTA | `py-12 md:py-16` | max-w-4xl · eyebrow `mb-4 sm:mb-6` · h2→p `mb-4` · p→cta `mb-8 sm:mb-10` | container `max-w-[1200px] px-4 sm:px-6 md:px-8` | `CTASection.tsx:20,98,108,115` |
| SamplePreview | `!py-0` · main `py-8 sm:py-12 md:py-16` | chapter divider `my-8 sm:my-12 border-t border-black/5` | content `max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-12` | `Preview.tsx:88,100,104` |
| Highlights | `py-12 md:py-20` | header `mb-10` · grid `gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3` | card `p-6` · top→title `mb-5` · title→desc `mb-2` | `Highlights.tsx:100,105,120,65,68,86` |
| Footer | `py-8 sm:py-12` | `gap-8` · bottom `mt-8 sm:mt-12 pt-6 sm:pt-8` | column→list `mb-4` · list `space-y-2` · social `gap-3` | `Footer.tsx:5,7,144,49,22` |

Recurring: container `max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8` universal · SectionWrapper sm/md/lg/xl = `py-8/10/12/16 md:py-12/16/20/24` (`SectionWrapper.tsx:46-51`).

## 8. Composition Recipes

1. **Hero** = bg-orbs section → breadcrumb (mb-6) → 2-col grid gap-12 → [left space-y-6 {pulse-eyebrow → serif h1 3-step responsive → lede max-w-lg → CTA row responsive `flex-col sm:hidden` / `hidden sm:flex md:hidden` / `hidden md:flex` → 3-stat grid pt-6} | right preview card w/ blurs + paywall blur+badge overlay] → scroll-down indicator bottom-6 center.

2. **KeyStats** = section gradient bg → container max-w-1200 → grid 1/3 col × {size-12 icon-box bg-content-icon/10 → value text-[1.953rem] tabular-nums → label text-[1rem] text-utility-icon} `flex flex-col items-start gap-2`.

3. **Chapter** = `<SectionLabel variant="accent">CHAPTER N - …</SectionLabel>` (mb-4) → serif h2 (mb-4) → lede max-w-[50rem] (mb-10) → content.

4. **Methodology stepper** = horizontal stepper `flex gap-1 sm:gap-2 sm:justify-center overflow-x-auto` w/ active `bg-black text-white` + inactive `bg-white border-warm-500 hover:bg-coral-50` + chevron seps → 3-col card grid w/ active=elevated dual-shadow.

5. **FAQ accordion** = title header (mb-12) → list `space-y-4` × {border-rounded item → button px-4-6 py-4-5 flex justify-between → answer panel `animate-in fade-in slide-in-from-top-2`} → contact-CTA card.

6. **CTA centered** = orbs bg → centered eyebrow → serif h2 3-step → lede max-w-2xl mx-auto → single brand CTA.

7. **Highlights cards** = header (mb-10) → 3-col grid × {card p-6 rounded-[10px] → top-row [size-11 icon-box + stat-badge px-2.5 py-1] (mb-5) → h4 medium (mb-2) → desc 0.8rem text-utility-icon}.

8. **Preview-card paywall** = rounded-[10px] card → window controls (3 dots + label) → chapter-label+title pair → text → mini chart rounded-[5px] bg-white/5 → blurred overlay w/ centered PREMIUM Badge.

9. **Breadcrumb** = `<ol flex items-center flex-wrap>` × `<li>` {idx>0 chevron sep → anchor (last font-medium aria-current=page) → if last+hasDropdown: triangle button → dropdown panel 1 or 2 col}.

10. **Sample orchestrator** = SectionWrapper full+!py-0+border-b → flex {Sidebar 3-state + main flex-1 max-w-1200 py-8-16 × [Chapter1 → divider my-8-12 border-t black/5 → Chapter2 → … → Chapter11]} + Mobile floating TOC.

## 9. Layout Patterns

**Page:** container `max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8` universal (Hero/KeyStats/CTA/Footer/Highlights). Content narrow `max-w-[1000px]` (`SectionWrapper.tsx:54`). Text constraints `max-w-2xl` (CTA lede) · `max-w-3xl` (FAQ/Highlights header) · `max-w-lg` (hero lede) · `max-w-[50rem]` (chapter lede) · `max-w-4xl` (CTA content) · `max-w-md` (preview card). Sticky nav `sticky top-0 z-[50]` (`NewHeader.tsx:124`). Z-ladder `tokens.ts:288-296` base=1 dropdown=10 sticky=100 navbar=1000 modal=9999 tooltip=10000.

**Section:** 2-col `grid items-center gap-12 lg:grid-cols-2` (Hero) · `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` (Footer). 3-col `grid grid-cols-3 gap-3 sm:gap-6` (hero stats) · `grid gap-4 lg:gap-5 md:grid-cols-3` (Methodology) · `grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16` (KeyStats) · `md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6` (Highlights). Nav row `nav-container h-full flex items-center justify-between`. CTA responsive 3-tier visibility `<sm` / `sm:flex md:hidden` / `md:flex` (`Hero.tsx:285-345`). Horizontal scroll w/ hidden bar `overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 style={scrollbarWidth:none}` (Methodology stepper). Tailwind breakpoints sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536 (`tokens.ts:230-234`).

## 10. Token Gap Report vs core-v2 base.css

| V0_lite value | core-v2 | Status · Recommend |
|---|---|---|
| `--text-xs/sm/base/lg/xl/2xl/3xl/4xl` | matched | ✅ keep |
| `--text-5xl` 4.769 vs 4.768 | ~ | ⚠️ normalize to 4.768 |
| 0.813rem navHelper | none | 🔴 add `--text-nav-helper: 0.813rem` |
| `--brand-red`/-hover/-active | matched | ✅ |
| `--red-500` #d23940 vs core-v2 #dc3238 | ⚠️ | core-v2 wins |
| `#c62d31`/`#eb484e` brand-gradient stops | none | 🔴 OUTDATED — skip or add alias |
| `--warm-*`/`--black-*`/`--purple-*`/`--periwinkle-*`/`--perano-*`/`--coral-*` | matched | ✅ |
| Button gradient `primary` | none | 🔴 OUTDATED — replace w/ report-store buttons |
| `--button-height-sm/md/lg/xl` 40/48/56/64 | matched | ✅ |
| `--button-px-lg` 36 vs core-v2 32 | ⚠️ | core-v2 wins (OG diff comment) |
| `borderRadius.image` 2.5px | none | 🔴 add `--radius-image: 2.5px` (chart bars) |
| `borderRadius.small` 5px fixed | core-v2 calc | ⚠️ add `--radius-sm-fixed: 5px` |
| `borderRadius.large` 10px | core-v2 0.625rem (=10px) | ✅ |
| `tracking-[0.0875px]` button | none | 🔴 add `--tracking-button` |
| `tracking-[0.2em]` uppercase label | none | 🔴 add `--tracking-label-uppercase` |
| `tracking-[-0.02em]` display | none | 🔴 add `--tracking-display-tight` |
| Easing `cubic-bezier(0.22,1,0.36,1)` / `(0.4,0,0.2,1)` | unknown | 🔴 add `--ease-smooth` / `--ease-arrow` |
| Duration 150/300/600/900ms | unknown semantic | 🔴 add `--duration-{instant,fast,normal,slow}` |
| Shadow `0 1px 3px rgba(0,0,0,0.04)` (Highlight card) | core-v2 `--shadow-sm` 0.08 | ⚠️ use core-v2 |
| Shadow `0 8px 24px rgba(0,0,0,0.06)` (Highlight hover) | core-v2 `--shadow-lg` 0.15 | ⚠️ use core-v2 |
| Shadow `0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)` (Methodology active) | none dual-layer | 🔴 add `--shadow-card-active` |
| Brand-button shadow `rgba(176,31,36,0.15-0.25)` | core-v2 only purple accents | 🔴 add `--shadow-brand-button/-hover` |
| Section bg `linear-gradient(180deg, rgba(250,251,254,0.6), rgba(235,237,251,0.45))` | none | 🔴 add `--bg-section-stats-tinted` |
| Card bg `linear-gradient(135deg, #f3f4ff80, #fafafa4d)` | none | 🔴 add `--bg-card-methodology` |

Summary: type sizes ✅ aligned · most color ramps ✅ aligned (1 minor mismatch `--red-500`) · tracking + easing + duration + brand-button shadow + section-bg-tints + radius-image/sm-fixed all 🔴 missing in core-v2.

## 11. Motion Patterns

Framer Motion (`motion/react`) only:
- entrance `initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay}}` recurring (`Hero.tsx:82,221,237,255,268,278,383,484,498,534`, `KeyStats.tsx:97`, `Highlights.tsx:62`)
- `useInView({once:true, amount:0.5})` for trigger-on-scroll counter (`Hero.tsx:17`, `KeyStats.tsx:49`)
- `whileHover` patterns: `{scale:1.05, y:-4}` stat card · `{scale:1.1, rotate:5}` icon · `{scale:1.02, boxShadow:…}` preview · `whileTap={{scale:0.95}}` consistent
- `AnimatePresence` for modal/dropdown/FAB (`Hero.tsx:617`, `Breadcrumb.tsx:344`, `ScrollToTop.tsx:45`)
- infinite: pulse dot 2s scale/opacity (`SectionLabel.tsx:200-208`) · shimmer pill 2s linear w/ 1s delay (`SectionLabel.tsx:127-138`) · hero scroll cue 2s y-loop outer + inner (`Hero.tsx:601-609`) · hero blurs 4-5s scale+opacity (`Hero.tsx:398-422`)
- chart bars height 0→100% staggered 0.1s × index (`Hero.tsx:137-139`)
- counter rAF + easeOutCubic (`Hero.tsx:14-43`, `KeyStats.tsx:46-67`)

**Reduced motion:** `motion-reduce:transition-none motion-reduce:transform-none` on Button (`Button.tsx:293,301`) + AnimatedArrow (`AnimatedArrow.tsx:50,67`). NO `useReducedMotion()` Framer hook used. CSS global opt-out NOT in legacy `theme.css` (core-v2 has it). ⚠️ partial.

## 12. A11y Patterns

| Pattern | File:line | Verdict |
|---|---|---|
| Skip link sr-only→focus | `NewHeader.tsx:49-54` | USE |
| aria-expanded dropdowns | `NewHeader.tsx:83,195` | USE |
| aria-controls + role region | `FAQ.tsx:95-96,111-114` aria-expanded/controls/role region/labelledby | USE exemplar |
| aria-label icon-only buttons | `Hero.tsx:455,593,640`, `Footer.tsx:26,33,40`, `NewHeader.tsx:144,156,163`, `ScrollToTop.tsx:57`, `Breadcrumb.tsx:322` | USE |
| aria-current page | `Breadcrumb.tsx:303` | USE |
| aria-haspopup | `Breadcrumb.tsx:324` | USE |
| aria-modal + role dialog | `Hero.tsx:623-625` | USE |
| aria-hidden decorative | `Breadcrumb.tsx:275,334` | USE |
| Esc/Enter/Space handler | `NewHeader.tsx:37-44`, `Breadcrumb.tsx:191-198` | USE |
| Focus trap (hook) | `AnalyticsDashboard.tsx:19` `useFocusTrap` | USE PATTERN |
| Focus ring | `InlineLink.tsx:61` `focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2` · NewHeader skip-link | USE PARTIAL — not universal |
| Touch target 44px+ | sm=40 button borderline; mobile icon `p-2.5` ~50px ok | ⚠️ Button-sm |
| Outside-click close | `Breadcrumb.tsx:181-188` mousedown | USE |
| Tabular-nums | `KeyStats.tsx:109` | USE |
| Reduced-motion Framer hook | not used | ⚠️ |

## 13. Cards + Listing Patterns

| Variant · file:line | Padding | Shadow | Radius · Border | Context | Verdict |
|---|---|---|---|---|---|
| Card atom white · `Card.tsx:28-44` | `p-4/6/8` | sm `0 1px 2px rgba(0,0,0,0.05)` / md `0 4px 6px -1px 0.1` / lg `0 10px 15px -3px 0.1` | 10px · `#e5e5e5` | generic | USE |
| Card atom warm · `Card.tsx:29` | same | same | 10px · `#eae5e3` bg `#f5f2f1` | warm | USE |
| Card atom outlined · `Card.tsx:30` | same | same | 10px · `#e5e5e5` no bg | outlined | USE |
| Methodology step · `Methodology.tsx:132-147` | `px-3 py-4 sm:px-4 sm:py-5` | active `0 4px 16px rgba(0,0,0,0.06), 0 1px 4px 0.04` / inactive `0 1px 2px 0.03 hover:0 4px 6px -1px 0.06` | 10px · `border-black-200` · purple-tint gradient | clickable step w/ active-shadow | USE |
| Highlight card · `Highlights.tsx:64-65` | `p-6` | `0 1px 3px rgba(0,0,0,0.04)` → hover `0 8px 24px rgba(0,0,0,0.06)` + `-translate-y-0.5` | 10px · shadow-only | 6-card 3-col grid | USE clean lift |
| Hero preview · `Hero.tsx:427-445` | `p-4` | dark `0 10px 15px -3px rgba(0,0,0,0.3)` / light 0.1; hover stronger | 10px · theme-driven inline border | clickable expand | USE |
| Modal stat · `Hero.tsx:669,673` | `p-4` | none | 10px · `border-white/10 bg-white/5` | inside modal | USE PATTERN |
| FAQ accordion item · `FAQ.tsx:86-89` | btn `px-4-6 py-4-5` body `px-4-6 pb-4-5 pt-4` | none | 10px · `border-black/10 hover:border-black/25` | accordion | USE |
| FAQ contact card · `FAQ.tsx:127` | `p-5 sm:p-8` | none | 10px · `border-black/10 bg-black/[0.02]` | trailing CTA | USE |
| Preview chart sub-card · `Hero.tsx:510-512` | `p-3` | none | 5px · `bg-white/5` or `bg-black/5` | chart sub | USE PATTERN |
| ScrollToTop FAB · `ScrollToTop.tsx:54-56` | n/a | `0 4px 16px rgba(0,0,0,0.12)` hover `0 8px 24px 0.18` | full circle · none | floating action | USE |
| Stat badge pill · `Highlights.tsx:74-79` | `px-2.5 py-1` | none | 5px · `bg-black/0.04` | inline stat pill | USE |

**Listings:** 3-col card responsive `grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3` (Highlights) and `gap-4 lg:gap-5 md:grid-cols-3` (Methodology) · 3-stat horizontal `grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16` (KeyStats) · denser hero variant `grid-cols-3 gap-3 sm:gap-6` · accordion `space-y-4` · footer links `space-y-2` · breadcrumb dropdown items `space-y-0.5` · sidebar TOC 3-state width (open/compressed/minimal · `data.ts` `TOCState`) · slideshow thumbs auto-center on currentIndex change.

---

End audit. Path `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/core-v2/docs/LEGACY-AUDIT/V0_lite_report.md`.
