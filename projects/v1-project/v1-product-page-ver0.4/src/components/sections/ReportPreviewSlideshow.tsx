'use client';

/**
 * ReportPreviewSlideshow — §22 Report page carousel with thumbnail strip
 *
 * @what  Full-width slide carousel showing 49 sample pages from the Australia Cold Chain
 *        report. Light/dark variant toggle. Edge-to-edge carousel with peek scaling,
 *        thumbnail strip, keyboard + touch nav, auto-advance, and Download CTA row.
 *
 * @why   Replaces the chaptered SamplePreviewSection (Sprint 4 2026-05-22). User mandate:
 *        port the V0_lite_report SlideshowSection 1:1 — slideshow was always the target.
 *
 * @when  §22 · full-width outside 2-col SideTOC body · before RelatedReportsSection (§23).
 *        Consumed by `src/app/test/phase-2/page.tsx`.
 *
 * @how   Framer Motion spring (stiffness 280 / damping 30) for carousel translate.
 *        Per-slide scale + opacity via motion.div animate prop. Auto-advance 4500ms.
 *        useReducedMotion() → pauses auto-advance + disables scale/opacity tweens.
 *        Responsive 5-breakpoint slide sizing locked to 16:9 ratio.
 *        All colours via DS v2 foundation tokens — zero hardcoded hex.
 *        DS atoms: SectionWrapper · SectionLabel · Button.
 *        Next.js Image for slides (priority on active · lazy others).
 *
 * @lifecycle stable
 * @promotedFrom V0_lite_report · SlideshowSection.tsx (unified light/dark variant merge)
 */

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Download, Lock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { Button } from '@kenresearch/design-system/atoms';

// ── Slide data ─────────────────────────────────────────────────────────────────
// 49 entries · Australia Cold Chain themed · image cycles over 6 PNGs in public/sample-pages/
// image field = 1-based index into /public/sample-pages/slide-{n}.png

const SLIDE_IMAGES = [
  '/sample-pages/slide-1.png',
  '/sample-pages/slide-2.png',
  '/sample-pages/slide-3.png',
  '/sample-pages/slide-4.png',
  '/sample-pages/slide-5.png',
  '/sample-pages/slide-6.png',
];

interface SlideEntry {
  id: number;
  image: number; // 1–6 · cycled index into SLIDE_IMAGES
  title: string;
  pageNumber: number;
}

const SLIDES: SlideEntry[] = [
  { id: 1,  image: 1, title: 'Executive Summary',           pageNumber: 1  },
  { id: 2,  image: 2, title: 'Cold Chain Genesis',          pageNumber: 2  },
  { id: 3,  image: 3, title: 'Market Overview',             pageNumber: 3  },
  { id: 4,  image: 4, title: 'Refrigerated Transport',      pageNumber: 4  },
  { id: 5,  image: 5, title: 'Cold Storage Capacity',       pageNumber: 5  },
  { id: 6,  image: 6, title: 'End-User Segmentation',       pageNumber: 6  },
  { id: 7,  image: 1, title: 'Pharma Cold Chain',           pageNumber: 7  },
  { id: 8,  image: 2, title: 'Food & Beverage',             pageNumber: 8  },
  { id: 9,  image: 3, title: 'Last-Mile Delivery',          pageNumber: 9  },
  { id: 10, image: 4, title: 'Regulatory Landscape',        pageNumber: 10 },
  { id: 11, image: 5, title: 'Competitor Mapping',          pageNumber: 11 },
  { id: 12, image: 6, title: 'Capacity by State',           pageNumber: 12 },
  { id: 13, image: 1, title: 'Tier-1 Cities Deep-Dive',     pageNumber: 13 },
  { id: 14, image: 2, title: 'Tier-2 Expansion',            pageNumber: 14 },
  { id: 15, image: 3, title: 'Investment Climate',          pageNumber: 15 },
  { id: 16, image: 4, title: 'Tech Adoption',               pageNumber: 16 },
  { id: 17, image: 5, title: 'IoT Monitoring',              pageNumber: 17 },
  { id: 18, image: 6, title: 'Blockchain Tracking',         pageNumber: 18 },
  { id: 19, image: 1, title: 'Sustainability Trends',       pageNumber: 19 },
  { id: 20, image: 2, title: 'Energy Efficiency',           pageNumber: 20 },
  { id: 21, image: 3, title: 'Cold Chain Workforce',        pageNumber: 21 },
  { id: 22, image: 4, title: 'Skills Gap Analysis',         pageNumber: 22 },
  { id: 23, image: 5, title: 'Pricing Models',              pageNumber: 23 },
  { id: 24, image: 6, title: 'Revenue Forecast 2025-2030',  pageNumber: 24 },
  { id: 25, image: 1, title: 'Funding & M&A',               pageNumber: 25 },
  { id: 26, image: 2, title: 'Government Initiatives',      pageNumber: 26 },
  { id: 27, image: 3, title: 'ANZ Trade Flows',             pageNumber: 27 },
  { id: 28, image: 4, title: 'Asia-Pac Comparison',         pageNumber: 28 },
  { id: 29, image: 5, title: 'Risk Assessment',             pageNumber: 29 },
  { id: 30, image: 6, title: 'Climate Impact',              pageNumber: 30 },
  { id: 31, image: 1, title: 'Halal & Kosher Logistics',    pageNumber: 31 },
  { id: 32, image: 2, title: 'Vaccine Cold Chain',          pageNumber: 32 },
  { id: 33, image: 3, title: 'Cell & Gene Therapy',         pageNumber: 33 },
  { id: 34, image: 4, title: 'Frozen Foods Boom',           pageNumber: 34 },
  { id: 35, image: 5, title: 'QSR & Restaurant Demand',     pageNumber: 35 },
  { id: 36, image: 6, title: 'Seafood Export Chain',        pageNumber: 36 },
  { id: 37, image: 1, title: 'Dairy Distribution',          pageNumber: 37 },
  { id: 38, image: 2, title: 'Meat & Poultry',              pageNumber: 38 },
  { id: 39, image: 3, title: 'Floriculture Logistics',      pageNumber: 39 },
  { id: 40, image: 4, title: 'Retail Cold Chain',           pageNumber: 40 },
  { id: 41, image: 5, title: 'Q-Commerce Impact',           pageNumber: 41 },
  { id: 42, image: 6, title: 'Equipment Suppliers',         pageNumber: 42 },
  { id: 43, image: 1, title: 'Service Providers',           pageNumber: 43 },
  { id: 44, image: 2, title: '3PL Landscape',               pageNumber: 44 },
  { id: 45, image: 3, title: 'Future Outlook',              pageNumber: 45 },
  { id: 46, image: 4, title: 'Strategic Recommendations',   pageNumber: 46 },
  { id: 47, image: 5, title: 'Investment Playbook',         pageNumber: 47 },
  { id: 48, image: 6, title: 'Key Takeaways',               pageNumber: 48 },
  { id: 49, image: 1, title: 'Appendix & Sources',          pageNumber: 49 },
];

// ── Types ──────────────────────────────────────────────────────────────────────

export type SlideshowVariant = 'light' | 'dark';

interface ReportPreviewSlideshowProps {
  variant?: SlideshowVariant;
  onVariantChange?: (v: SlideshowVariant) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ReportPreviewSlideshow({
  variant = 'light',
  onVariantChange,
}: ReportPreviewSlideshowProps) {
  const isDark = variant === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth]     = useState(620);
  const [slideHeight, setSlideHeight]   = useState(349);
  const [gap, setGap]                   = useState(12);
  const [peekScale, setPeekScale]       = useState(0.75);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);

  // ── Responsive slide dimensions — 16:9 locked ─────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSlideWidth(260); setSlideHeight(146); setGap(8);  setPeekScale(0.85);
      } else if (w < 768) {
        setSlideWidth(340); setSlideHeight(191); setGap(10); setPeekScale(0.80);
      } else if (w < 1024) {
        setSlideWidth(440); setSlideHeight(248); setGap(12); setPeekScale(0.75);
      } else if (w < 1280) {
        setSlideWidth(520); setSlideHeight(292); setGap(12); setPeekScale(0.75);
      } else {
        setSlideWidth(620); setSlideHeight(349); setGap(12); setPeekScale(0.75);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // ── Thumbnail auto-scroll to keep active centred ──────────────────────────
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const inactiveW = 64;
    const activeW   = 80;
    const gapPx     = 8;
    const offset    = currentIndex * (inactiveW + gapPx) + activeW / 2 - container.offsetWidth / 2;
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }, [currentIndex]);

  // ── Auto-advance 4.5 s · paused when reduced-motion ──────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setCurrentIndex(p => (p + 1) % SLIDES.length),
      4500,
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setCurrentIndex(p => (p - 1 + SLIDES.length) % SLIDES.length);
      if (e.key === 'ArrowRight') setCurrentIndex(p => (p + 1) % SLIDES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const prev  = () => setCurrentIndex(p => (p - 1 + SLIDES.length) % SLIDES.length);
  const next  = () => setCurrentIndex(p => (p + 1) % SLIDES.length);
  const goTo  = (i: number) => setCurrentIndex(i);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e: React.TouchEvent) => { touchEndX.current   = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const scrollThumbs = (dir: 'left' | 'right') => {
    thumbnailContainerRef.current?.scrollBy({
      left: dir === 'left' ? -250 : 250,
      behavior: 'smooth',
    });
  };

  // ── Reduced-motion overrides ──────────────────────────────────────────────
  // When reduced-motion: no scale tweens · no opacity tweens · instant transitions
  const slideAnimateScale   = (isActive: boolean) => prefersReducedMotion ? 1 : (isActive ? 1 : peekScale);
  const slideAnimateOpacity = (isActive: boolean, distance: number) => {
    if (prefersReducedMotion) return 1;
    return distance > 1 ? 0 : isActive ? 1 : 0.35;
  };
  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };
  const carouselTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 280, damping: 30 };

  // ── Render ─────────────────────────────────────────────────────────────────
  // Token audit note (P0 fix · 2026-05-22):
  // All --border-on-dark-card/hairline swapped. Remaining rgba() groups:
  //   A · Dark bg gradient hex (#0e0b1c etc) — justified inline, no DS token for cinematic near-blacks
  //   B · Decorative amber+ember radial gradients — no semantic mapping, same precedent as FinalCTABanner
  //   C · Dark-surface text opacity (rgba(255,255,255,0.N)) — DS gap: no --semantic-ink-on-dark-* tokens yet
  //       TODO: map to token once DS adds dark-surface text-opacity scale
  //   D · Shadow rgba — no DS shadow token set exists yet
  //   E · Light-mode bg rgba (rgba(0,0,0,0.04) etc) — no light-surface token for these micro-opacities
  //   F · Gradient color-stop rgba — functional gradient stops, no token equivalent
  return (
    <section
      data-component="ReportPreviewSlideshow"
      data-section-bg={isDark ? 'black' : 'white'}
      className="relative overflow-hidden py-8 md:py-12"
      style={{
        backgroundColor: isDark ? 'var(--color-foundation-black)' : 'var(--color-foundation-white)',
        color: isDark ? 'var(--color-foundation-white)' : 'var(--color-foundation-black)',
      }}
    >

      {/* ── Dark background composition · full-bleed across entire section ── */}
      {isDark && (
        <>
          {/* Layer 1: Rich dark base
              Gradient stops kept as raw hex — no DS token maps to these near-black purpled values.
              --color-foundation-black = #000000 which is too flat for cinematic depth.
              Same precedent as FinalCTABanner.tsx cinematic gradient. Flag DS: needs --slideshow-bg-* tokens.
              #0e0b1c → warm-black with purple cast (start)
              #07080f → deep neutral near-black (mid)
              #090b12 → slight blue-black (end) */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: 'linear-gradient(135deg, #0e0b1c 0%, #07080f 50%, #090b12 100%)' }}
          />
          {/* Layer 2: Amber warm light-source — upper-right focal orb */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: [
                'radial-gradient(ellipse 38% 42% at 80% 4%,  rgba(215, 160, 50, 0.35) 0%, transparent 55%)',
                'radial-gradient(ellipse 72% 62% at 92% 22%, rgba(190, 120, 30, 0.18) 0%, transparent 68%)',
              ].join(', '),
            }}
          />
          {/* Layer 3: Warm ember counterweight — lower-left */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: [
                'radial-gradient(ellipse 55% 50% at 3%  90%,  rgba(220,  88, 55, 0.28) 0%, transparent 60%)',
                'radial-gradient(ellipse 38% 38% at 18% 62%, rgba(240, 110, 70, 0.16) 0%, transparent 58%)',
                'radial-gradient(ellipse 60% 18% at 48% 100%, rgba(200, 75,  55, 0.13) 0%, transparent 65%)',
              ].join(', '),
            }}
          />
          {/* Layer 4: Film-grain noise overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              opacity: 0.10,
              mixBlendMode: 'overlay' as CSSProperties['mixBlendMode'],
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='220' height='220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23grain)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '220px 220px',
            }}
          />
        </>
      )}

      {/* ── Header ── */}
      <div className={`mx-auto max-w-[1200px] mb-4 sm:mb-6 px-4 sm:px-6 md:px-8 relative ${isDark ? 'z-10' : ''}`}>

        {/* Inline variant toggle pill — top-right */}
        <div className="absolute top-0 right-4 sm:right-6 md:right-8 flex gap-1 p-1 rounded-full border"
          style={{
            background: isDark ? 'var(--border-on-dark-hairline)' : 'rgba(0,0,0,0.04)',
            borderColor: isDark ? 'var(--border-on-dark-card)' : 'rgba(0,0,0,0.08)',
          }}
          role="group"
          aria-label="Slideshow variant"
        >
          {(['light', 'dark'] as SlideshowVariant[]).map(v => (
            <button
              key={v}
              onClick={() => onVariantChange?.(v)}
              className="px-3 py-1 rounded-full text-[0.75rem] font-medium font-body transition-all duration-200 focus-visible:outline focus-visible:outline-2"
              style={{
                background: variant === v
                  ? (isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)')
                  : 'transparent',
                color: isDark
                  ? (variant === v ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)')
                  : (variant === v ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)'),
                outlineColor: 'var(--color-ramp-purple-500)',
              }}
              aria-pressed={variant === v}
            >
              {v === 'light' ? 'Light' : 'Dark Premium'}
            </button>
          ))}
        </div>

        <div className="inline-flex mb-3">
          <SectionLabel background={isDark ? 'dark' : 'light'} variant="accent">REPORT PREVIEW</SectionLabel>
        </div>
        <h2
          className={`font-display font-light text-[1.953rem] sm:text-[2.441rem] mb-2 ${isDark ? 'text-white' : 'text-black'}`}
        >
          Inside the Report
        </h2>
        {/* G.13.3 user direction · standalone subtitle = body */}
        <p
          className="font-body text-[1rem] max-w-2xl"
          style={{ color: isDark ? 'rgba(255,255,255,0.78)' : 'var(--semantic-ink-body)' }}
        >
          Browse through sample pages from our comprehensive market analysis report.
          Each report delivers in-depth research, expert insights, and data-driven
          recommendations across 200+ pages.
        </p>
      </div>

      {/* ── Carousel ── */}
      <div
        className={`relative w-full mb-4 sm:mb-6 ${isDark ? 'z-10' : ''}`}
        role="region"
        aria-label="Report page slideshow"
        aria-roledescription="carousel"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: `${slideHeight + 30}px`,
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex items-center h-full"
            style={{
              gap: `${gap}px`,
              paddingLeft:  `calc(50% - ${slideWidth / 2}px)`,
              paddingRight: `calc(50% - ${slideWidth / 2}px)`,
            }}
            animate={{ x: `calc(-${currentIndex * (slideWidth + gap)}px)` }}
            transition={carouselTransition}
          >
            {SLIDES.map((slide, index) => {
              const isActive   = index === currentIndex;
              const distance   = Math.abs(index - currentIndex);
              const imageSrc   = SLIDE_IMAGES[(slide.image - 1) % SLIDE_IMAGES.length];

              return (
                <motion.div
                  key={slide.id}
                  className="flex-shrink-0 cursor-pointer"
                  style={{ width: `${slideWidth}px`, height: `${slideHeight}px` }}
                  animate={{
                    scale:   slideAnimateScale(isActive),
                    opacity: slideAnimateOpacity(isActive, distance),
                  }}
                  transition={slideTransition}
                  onClick={() => !isActive && goTo(index)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Page ${index + 1} of ${SLIDES.length}: ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div
                    className={`relative w-full h-full rounded-[2.5px] overflow-hidden border transition-all duration-300 ${
                      isDark
                        ? `bg-black ${isActive
                            ? 'shadow-[0_2px_24px_rgba(0,0,0,0.2)]'
                            : 'shadow-[0_1px_4px_rgba(0,0,0,0.2)]'}`
                        : `bg-white ${isActive
                            ? 'shadow-[0_2px_16px_rgba(0,0,0,0.05)]'
                            : 'shadow-[0_1px_4px_rgba(0,0,0,0.03)]'}`
                    }`}
                    style={{
                      borderColor: isDark
                        ? (isActive ? 'var(--pdp-accent-icon)' : 'var(--border-on-dark-hairline)')
                        : (isActive ? 'var(--pdp-accent-icon)' : 'rgba(0,0,0,0.06)'),
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt={slide.title}
                      width={slideWidth}
                      height={slideHeight}
                      className="w-full h-full object-cover"
                      priority={isActive}
                      loading={isActive ? undefined : 'lazy'}
                    />
                    {!isActive && (
                      <div
                        className="absolute inset-0"
                        style={{ background: isDark ? 'rgba(0,0,0,0.40)' : 'rgba(255,255,255,0.25)' }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-[0.7rem] italic mt-1 relative z-[1]"
          style={{ color: isDark ? 'rgba(255,255,255,0.50)' : 'var(--semantic-ink-muted)' }}
        >
          Note: These are illustrative representations and do not reflect the actual data or real-world figures.
        </p>

        {/* Nav arrows — min touch target 44px at sm+ · w-11 h-11 on mobile */}
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none">
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={prev}
            aria-label="Previous slide"
            className={`w-11 h-11 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-200 focus-visible:outline focus-visible:outline-2 ${
              isDark
                ? 'backdrop-blur-sm'
                : ''
            }`}
            style={{
              background: isDark ? 'var(--border-on-dark-card)' : 'rgba(255,255,255,0.95)',
              border: isDark ? `1px solid var(--border-on-dark-card)` : '1px solid rgba(0,0,0,0.06)',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.30)' : '0 2px 8px rgba(0,0,0,0.05)',
              outlineColor: 'var(--color-ramp-purple-500)',
            }}
          >
            <ChevronLeft
              className="h-4 w-4 sm:h-5 sm:w-5"
              strokeWidth={2}
              style={{ color: isDark ? 'var(--color-foundation-white)' : 'var(--icon-utility)' }}
            />
          </motion.button>

          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={next}
            aria-label="Next slide"
            className={`w-11 h-11 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-200 focus-visible:outline focus-visible:outline-2 ${
              isDark ? 'backdrop-blur-sm' : ''
            }`}
            style={{
              background: isDark ? 'var(--border-on-dark-card)' : 'rgba(255,255,255,0.95)',
              border: isDark ? `1px solid var(--border-on-dark-card)` : '1px solid rgba(0,0,0,0.06)',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.30)' : '0 2px 8px rgba(0,0,0,0.05)',
              outlineColor: 'var(--color-ramp-purple-500)',
            }}
          >
            <ChevronRight
              className="h-4 w-4 sm:h-5 sm:w-5"
              strokeWidth={2}
              style={{ color: isDark ? 'var(--color-foundation-white)' : 'var(--icon-utility)' }}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mb-6 ${isDark ? 'relative z-10' : ''}`}>
        <div
          className={`rounded-[10px] px-4 sm:px-6 py-3 border`}
          style={{
            background: isDark
              ? 'var(--border-on-dark-hairline)' /* hairline = rgba(255,255,255,0.06) — closest dark-surface bg token */
              : `linear-gradient(to right, var(--periwinkle-50), #ffffff, var(--periwinkle-50))`,
            borderColor: isDark
              ? 'var(--border-on-dark-card)'
              : 'rgba(var(--color-ramp-periwinkle-600, 167, 171, 240), 0.10)',
          }}
        >
          <div className="flex items-center gap-3 sm:gap-6">

            {/* Page counter */}
            <div className="flex-shrink-0">
              <span className="font-body text-[0.875rem] sm:text-[1rem]"
                style={{ color: isDark ? 'rgba(255,255,255,0.70)' : 'var(--color-foundation-black)' }}
              >
                <span className="hidden sm:inline">Page </span>
                <span
                  className="font-medium"
                  style={{ color: 'var(--pdp-accent-icon)' }}
                >
                  {currentIndex + 1}
                </span>
                <span style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'var(--black-400)' }}>
                  /{SLIDES.length}
                </span>
              </span>
            </div>

            {/* Scrollable thumbnails */}
            <div className="relative flex-1 min-w-0">
              {/* Left gradient fade */}
              <div
                className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, rgba(0,0,0,0.80), rgba(0,0,0,0.40), transparent)'
                    : 'linear-gradient(to right, var(--periwinkle-50), rgba(250,251,254,0.70), transparent)',
                }}
              />
              {/* Right gradient fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{
                  background: isDark
                    ? 'linear-gradient(to left, rgba(0,0,0,0.80), rgba(0,0,0,0.40), transparent)'
                    : 'linear-gradient(to left, var(--periwinkle-50), rgba(250,251,254,0.70), transparent)',
                }}
              />
              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-2 overflow-x-auto px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {SLIDES.map((slide, index) => {
                  const isActive = index === currentIndex;
                  const thumbSrc = SLIDE_IMAGES[(slide.image - 1) % SLIDE_IMAGES.length];
                  return (
                    <motion.button
                      key={slide.id}
                      onClick={() => goTo(index)}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -1 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                      aria-label={`Go to page ${index + 1}: ${slide.title}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-[2.5px] overflow-hidden transition-all duration-300 border flex-shrink-0 focus-visible:outline focus-visible:outline-2 ${
                        isActive
                          ? `w-20 h-[45px] ${isDark ? 'shadow-[0_2px_8px_rgba(0,0,0,0.25)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'}`
                          : `w-16 h-[36px] opacity-45 hover:opacity-75 shadow-sm`
                      }`}
                      style={{
                        borderColor: isActive
                          ? 'var(--pdp-accent-icon)'
                          : (isDark ? 'var(--border-on-dark-card)' : 'rgba(0,0,0,0.08)'),
                        outlineColor: 'var(--color-ramp-purple-500)',
                      }}
                    >
                      <Image
                        src={thumbSrc}
                        alt={`Page ${index + 1}`}
                        width={80}
                        height={45}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className={`absolute bottom-0.5 right-0.5 px-1 py-0.5 rounded-[2.5px] text-[0.625rem] font-medium`}
                        style={{
                          background: isActive
                            ? 'var(--pdp-accent-icon)'
                            : (isDark ? 'rgba(255,255,255,0.20)' : 'rgba(0,0,0,0.60)'),
                          color: 'var(--color-foundation-white)',
                        }}
                      >
                        {index + 1}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Thumbnail scroll arrows */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => scrollThumbs('left')}
                aria-label="Scroll thumbnails left"
                className="w-7 h-7 rounded-full flex items-center justify-center border opacity-60 hover:opacity-100 transition-all duration-200 focus-visible:outline focus-visible:outline-2"
                style={{
                  background: isDark ? 'var(--border-on-dark-card)' : 'rgba(255,255,255,0.60)',
                  borderColor: isDark ? 'var(--border-on-dark-card)' : 'rgba(0,0,0,0.06)',
                  outlineColor: 'var(--color-ramp-purple-500)',
                }}
              >
                <ChevronLeft
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                  style={{ color: isDark ? 'var(--color-foundation-white)' : 'var(--icon-utility)' }}
                />
              </motion.button>
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                onClick={() => scrollThumbs('right')}
                aria-label="Scroll thumbnails right"
                className="w-7 h-7 rounded-full flex items-center justify-center border opacity-60 hover:opacity-100 transition-all duration-200 focus-visible:outline focus-visible:outline-2"
                style={{
                  background: isDark ? 'var(--border-on-dark-card)' : 'rgba(255,255,255,0.60)',
                  borderColor: isDark ? 'var(--border-on-dark-card)' : 'rgba(0,0,0,0.06)',
                  outlineColor: 'var(--color-ramp-purple-500)',
                }}
              >
                <ChevronRight
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                  style={{ color: isDark ? 'var(--color-foundation-white)' : 'var(--icon-utility)' }}
                />
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Download CTA row ── */}
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 ${isDark ? 'relative z-10' : ''}`}>
        <div
          className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{ borderColor: isDark ? 'var(--border-on-dark-hairline)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p
              className="font-body text-[1rem] font-medium"
              style={{ color: isDark ? 'var(--color-foundation-white)' : 'var(--color-foundation-black)' }}
            >
              Free 12-page sample — review before you buy
            </p>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <span
                className="font-body text-[0.875rem] flex items-center gap-1.5"
                style={{ color: isDark ? 'rgba(255,255,255,0.50)' : 'var(--semantic-ink-muted)' }}
              >
                <Lock className="h-3 w-3 flex-shrink-0" />
                No sign-up required
              </span>
              <span
                className="font-body text-[0.875rem]"
                style={{ color: isDark ? 'rgba(255,255,255,0.20)' : 'var(--black-300)' }}
              >
                &middot;
              </span>
              <span
                className="font-body text-[0.875rem]"
                style={{ color: isDark ? 'rgba(255,255,255,0.50)' : 'var(--semantic-ink-muted)' }}
              >
                PDF &middot; 4.2 MB
              </span>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              variant="brand"
              size="md"
              background={isDark ? 'dark' : 'light'}
              icon={<Download />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Download Sample Deck
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
