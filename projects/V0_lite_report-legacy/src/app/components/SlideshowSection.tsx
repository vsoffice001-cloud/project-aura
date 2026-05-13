/**
 * SlideshowSection — Unified light/dark slide carousel
 *
 * Merged from SlideshowSection (light) + SlideshowSectionDark.
 * Accepts a `variant` prop ('light' | 'dark') and an `onVariantChange` callback.
 * All visual differences are driven by the `isDark` boolean derived from variant.
 */

import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Download, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionWrapper } from '@/design-system/components/SectionWrapper';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { Button } from '@/design-system/Button';
import { useAnalytics } from '../hooks/useAnalytics';
import { iconColors } from '@/design-system/iconColors';
import { FloatingVariantSwitcher } from './FloatingVariantSwitcher';

import slide1 from 'figma:asset/4867fa5985f8822dbd9b8ed8fbc9b6a9dc077214.png';
import slide2 from 'figma:asset/26f01b2660637b1c9836ccf96f4255d55d613752.png';
import slide3 from 'figma:asset/012d2b539f0c221ecd1083403504fdf1ad8cdfea.png';
import slide4 from 'figma:asset/05a95ae658446fd83616293eb20f4a8247fd435a.png';
import slide5 from 'figma:asset/496b584cae7ef80e3a2edac0ddb87b0318bd32b3.png';
import slide6 from 'figma:asset/3b756f36edbf68c18f4bfbe6755bb1bb9971f8e4.png';

const slides = [
  { id: 1,  image: slide1, title: 'Executive Summary' },
  { id: 2,  image: slide2, title: 'AI Healthcare Market Overview' },
  { id: 3,  image: slide3, title: 'Technology Landscape' },
  { id: 4,  image: slide4, title: 'Competitive Analysis' },
  { id: 5,  image: slide5, title: 'ML Diagnostics Segment' },
  { id: 6,  image: slide6, title: 'Drug Discovery AI' },
  { id: 7,  image: slide1, title: 'NLP for EHR Systems' },
  { id: 8,  image: slide2, title: 'Regional Analysis' },
  { id: 9,  image: slide3, title: 'North America Deep-Dive' },
  { id: 10, image: slide4, title: 'Revenue Forecast 2024-2030' },
  { id: 11, image: slide5, title: 'Investment & Funding Trends' },
  { id: 12, image: slide6, title: 'Clinical Trial AI Applications' },
  { id: 13, image: slide1, title: 'Regulatory Framework (FDA)' },
  { id: 14, image: slide2, title: 'Europe & APAC Markets' },
  { id: 15, image: slide3, title: 'Market Dynamics & Drivers' },
  { id: 16, image: slide4, title: 'Value Chain Analysis' },
  { id: 17, image: slide5, title: 'Key Company Profiles' },
  { id: 18, image: slide6, title: 'Computer Vision in Radiology' },
  { id: 19, image: slide1, title: 'Pricing & Deployment Models' },
  { id: 20, image: slide2, title: 'Hospital & Payer Adoption' },
  { id: 21, image: slide3, title: 'Patient Monitoring AI' },
  { id: 22, image: slide4, title: 'Market Share Analysis' },
  { id: 23, image: slide5, title: 'Emerging Markets Growth' },
  { id: 24, image: slide6, title: 'Generative AI in Healthcare' },
  { id: 25, image: slide1, title: 'Partnership Ecosystem Map' },
  { id: 26, image: slide2, title: 'Business Model Analysis' },
  { id: 27, image: slide3, title: 'Investment Recommendations' },
  { id: 28, image: slide4, title: 'Future Outlook 2025-2030' },
  { id: 29, image: slide5, title: 'Data Privacy & Ethics' },
  { id: 30, image: slide6, title: 'Success Factors & KPIs' },
  { id: 31, image: slide1, title: 'Market Entry Strategies' },
  { id: 32, image: slide2, title: 'Competitive Positioning Map' },
  { id: 33, image: slide3, title: 'Growth Projections by Segment' },
  { id: 34, image: slide4, title: 'Innovation Pipeline Tracker' },
  { id: 35, image: slide5, title: 'Digital Health Transformation' },
  { id: 36, image: slide6, title: 'Precision Medicine Trends' },
  { id: 37, image: slide1, title: 'Operational Efficiency Gains' },
  { id: 38, image: slide2, title: 'Strategic Roadmap' },
  { id: 39, image: slide3, title: 'Implementation Playbook' },
  { id: 40, image: slide4, title: 'Key Takeaways & Actions' },
];

export type SlideshowVariant = 'light' | 'dark';

interface SlideshowSectionProps {
  variant?: SlideshowVariant;
  onVariantChange?: (v: SlideshowVariant) => void;
}

export function SlideshowSection({
  variant = 'light',
  onVariantChange,
}: SlideshowSectionProps) {
  const isDark = variant === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth]     = useState(620);
  const [slideHeight, setSlideHeight]   = useState(349);
  const [gap, setGap]                   = useState(12);
  const [peekScale, setPeekScale]       = useState(0.75);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const { trackSlideView } = useAnalytics();

  // Track slide views
  useEffect(() => {
    trackSlideView(currentIndex, slides[currentIndex].title, `Slideshow Section${isDark ? ' Dark' : ''}`);
  }, [currentIndex, trackSlideView, isDark]);

  // Responsive slide dimensions — locked to 16:9
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

  // Auto-scroll thumbnails to keep active centred
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const inactiveW = 64;
    const activeW   = 80;
    const gapPx     = 8;
    const offset    = currentIndex * (inactiveW + gapPx) + activeW / 2 - container.offsetWidth / 2;
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }, [currentIndex]);

  // Auto-advance every 4.5 s
  useEffect(() => {
    const id = setInterval(() => setCurrentIndex(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setCurrentIndex(p => (p - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') setCurrentIndex(p => (p + 1) % slides.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const prev = () => setCurrentIndex(p => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrentIndex(p => (p + 1) % slides.length);
  const goTo = (i: number) => setCurrentIndex(i);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const scrollThumbs = (dir: 'left' | 'right') => {
    thumbnailContainerRef.current?.scrollBy({ left: dir === 'left' ? -250 : 250, behavior: 'smooth' });
  };

  return (
    <SectionWrapper
      background={isDark ? 'black' : 'white'}
      spacing="sm"
      maxWidth="full"
      className={isDark ? 'relative overflow-hidden' : undefined}
    >

      {/* ── Dark Background Composition ── */}
      {isDark && (
        <>
          {/* Layer 1: Rich dark base */}
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
          {/* Layer 4: Film-grain noise */}
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

        {/* Floating variant switcher */}
        <FloatingVariantSwitcher
          options={[
            { key: 'light', label: 'Light' },
            { key: 'dark', label: 'Dark Premium' },
          ]}
          activeKey={variant}
          onSelect={(key) => onVariantChange?.(key as SlideshowVariant)}
          colorScheme={isDark ? 'dark' : 'light'}
        />

        <div className="inline-flex mb-3">
          <SectionLabel background={isDark ? 'dark' : 'light'} variant="accent">REPORT PREVIEW</SectionLabel>
        </div>
        <h2 className={`font-serif font-light text-[1.953rem] sm:text-[2.441rem] mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Inside the Report
        </h2>
        <p className={`font-sans text-[1rem] max-w-2xl ${isDark ? 'text-white/60' : 'text-[var(--black-500)]'}`}>
          Browse through sample pages from our comprehensive market analysis report. Each report delivers in-depth research, expert insights, and data-driven recommendations across 200+ pages.
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
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;
              const distance = Math.abs(index - currentIndex);
              return (
                <motion.div
                  key={slide.id}
                  className="flex-shrink-0 cursor-pointer"
                  style={{ width: `${slideWidth}px`, height: `${slideHeight}px` }}
                  animate={{
                    scale:   isActive ? 1 : peekScale,
                    opacity: distance > 1 ? 0 : isActive ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => !isActive && goTo(index)}
                  role="button"
                  aria-label={`View slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className={`relative w-full h-full rounded-[2.5px] overflow-hidden border transition-all duration-300 ${
                    isDark
                      ? `bg-black ${isActive ? 'border-content-icon shadow-[0_2px_24px_rgba(0,0,0,0.2)]' : 'border-white/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.2)]'}`
                      : `bg-white ${isActive ? 'border-content-icon shadow-[0_2px_16px_rgba(0,0,0,0.05)]' : 'border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.03)]'}`
                  }`}>
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    {!isActive && <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/25'}`} />}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className={`text-center text-[0.7rem] italic mt-1 relative z-[1] ${
          isDark ? 'text-white/50' : 'text-[var(--black-500)]'
        }`}>
          Note: These are illustrative representations and do not reflect the actual data or real-world figures.
        </p>

        {/* Nav arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={prev}
            aria-label="Previous slide"
            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-200 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-sm'
                : 'bg-white/95 hover:bg-white border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            {isDark
              ? <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2} />
              : <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" color={iconColors.utility} strokeWidth={2} />
            }
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={next}
            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-200 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-sm'
                : 'bg-white/95 hover:bg-white border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
            aria-label="Next slide"
          >
            {isDark
              ? <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2} />
              : <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" color={iconColors.utility} strokeWidth={2} />
            }
          </motion.button>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mb-6 ${isDark ? 'relative z-10' : ''}`}>
        <div className={`rounded-[10px] px-4 sm:px-6 py-3 border ${
          isDark
            ? 'bg-white/[0.04] border-white/10'
            : 'bg-gradient-to-r from-[var(--purple-50)] via-white to-[var(--purple-50)] border-[var(--purple-600)]/10'
        }`}>
          <div className="flex items-center gap-3 sm:gap-6">

            {/* Page counter */}
            <div className="flex-shrink-0">
              <span className={`font-sans text-[0.875rem] sm:text-[1rem] ${isDark ? 'text-white/70' : 'text-black'}`}>
                <span className="hidden sm:inline">Page </span>
                <span className="font-medium text-content-icon">{currentIndex + 1}</span>
                <span className={isDark ? 'text-white/40' : 'text-[var(--black-400)]'}>/{slides.length}</span>
              </span>
            </div>

            {/* Scrollable thumbnails */}
            <div className="relative flex-1 min-w-0">
              <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
                isDark
                  ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent'
                  : 'bg-gradient-to-r from-[var(--purple-50)] via-[var(--purple-50)]/70 to-transparent'
              }`} />
              <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
                isDark
                  ? 'bg-gradient-to-l from-black/80 via-black/40 to-transparent'
                  : 'bg-gradient-to-l from-[var(--purple-50)] via-[var(--purple-50)]/70 to-transparent'
              }`} />
              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-2 overflow-x-auto px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {slides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => goTo(index)}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-[2.5px] overflow-hidden transition-all duration-300 border flex-shrink-0 ${
                      index === currentIndex
                        ? `w-20 h-[45px] border-content-icon ${isDark ? 'shadow-[0_2px_8px_rgba(0,0,0,0.25)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'}`
                        : `w-16 h-[36px] opacity-45 hover:opacity-75 shadow-sm ${isDark ? 'border-white/[0.1]' : 'border-black/[0.08]'}`
                    }`}
                  >
                    <img src={slide.image} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
                    <div className={`absolute bottom-0.5 right-0.5 px-1 py-0.5 rounded-[2.5px] text-[0.625rem] font-medium ${
                      index === currentIndex
                        ? 'bg-content-icon text-white'
                        : isDark ? 'bg-white/20 text-white' : 'bg-black/60 text-white'
                    }`}>
                      {index + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Scroll arrows */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => scrollThumbs('left')}
                className={`w-7 h-7 rounded-full flex items-center justify-center border opacity-60 hover:opacity-100 transition-all duration-200 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border-white/10'
                    : 'bg-white/60 hover:bg-white border-black/[0.06]'
                }`}
                aria-label="Scroll thumbnails left"
              >
                {isDark
                  ? <ChevronLeft className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
                  : <ChevronLeft className="h-3.5 w-3.5" color={iconColors.utility} strokeWidth={1.5} />
                }
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => scrollThumbs('right')}
                className={`w-7 h-7 rounded-full flex items-center justify-center border opacity-60 hover:opacity-100 transition-all duration-200 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border-white/10'
                    : 'bg-white/60 hover:bg-white border-black/[0.06]'
                }`}
                aria-label="Scroll thumbnails right"
              >
                {isDark
                  ? <ChevronRight className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
                  : <ChevronRight className="h-3.5 w-3.5" color={iconColors.utility} strokeWidth={1.5} />
                }
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Download CTA row ── */}
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 ${isDark ? 'relative z-10' : ''}`}>
        <div className={`mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 ${
          isDark ? 'border-white/[0.08]' : 'border-black/[0.06]'
        }`}>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className={`font-sans text-[1rem] font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              Free 12-page sample — review before you buy
            </p>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <span className={`font-sans text-[0.875rem] flex items-center gap-1.5 ${isDark ? 'text-white/50' : 'text-[var(--black-500)]'}`}>
                <Lock className="h-3 w-3 flex-shrink-0" />
                No sign-up required
              </span>
              <span className={`font-sans text-[0.875rem] ${isDark ? 'text-white/20' : 'text-[var(--black-300)]'}`}>&middot;</span>
              <span className={`font-sans text-[0.875rem] ${isDark ? 'text-white/50' : 'text-[var(--black-500)]'}`}>PDF &middot; 4.2 MB</span>
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

    </SectionWrapper>
  );
}