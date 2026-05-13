/**
 * ReportStoreHero — Section Organism (Template-specific)
 * Ken Bold DS v4.2
 *
 * WHAT:    Full-viewport dark hero with search bar, globe visualization, stats row
 * WHY:     Primary entry point for Report Store — search + credibility stats + visual impact
 * WHERE:   Report Store page — top of page, below Header
 * WHEN:    Always renders (both home + listing mode)
 * HOW:     Composes Container + Button + LazyWorld (globe) + search input + category dropdown
 *
 * NOTE: This is the REPORT STORE hero. The case study hero is a separate component (HeroSection.tsx)
 *       with different props and visual design.
 *
 * Data coupling: none (search state via props)
 * Props: searchQuery, onSearchChange, onSearchSubmit, onPopularClick, selectedCategory, onCategoryChange
 */
import { useState } from "react";
import { lazy, Suspense } from "react";
import {
  Search,
  ChevronDown,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { Container } from "./Container";

const LazyWorld = lazy(() =>
  import("./ui/globe").then((mod) => ({ default: mod.World }))
);

type GlobeConfigType = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

/*
 * Globe palette — white hexagons + white atmosphere on deep dark body.
 * Arcs use amber + coral/terracotta from DS.
 * Points are small and refined. Clean, editorial aesthetic.
 */
const globeConfig: GlobeConfigType = {
  pointSize: 0.6,
  globeColor: "#000000",
  showAtmosphere: true,
  atmosphereColor: "#7a6f63",
  atmosphereAltitude: 0.06,
  emissive: "#111111",
  emissiveIntensity: 0.15,
  shininess: 0.7,
  polygonColor: "#ffffff",
  ambientLight: "#cccccc",
  directionalLeftLight: "#dddddd",
  directionalTopLight: "#dddddd",
  pointLight: "#d97706",
  arcTime: 2200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

/*
 * Arc colors — amber and coral hex strings only.
 * Safe for d3-color parsing.
 */
const sampleArcs = [
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.1, color: "#f59e0b" },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: "#ea7a5f" },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#fbbf24" },
  { order: 4, startLat: 40.7128, startLng: -74.006, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.2, color: "#d97706" },
  { order: 5, startLat: 22.3193, startLng: 114.1694, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.25, color: "#f99b85" },
  { order: 6, startLat: 55.7558, startLng: 37.6173, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.15, color: "#f59e0b" },
  { order: 7, startLat: 34.0522, startLng: -118.2437, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.1, color: "#fcd34d" },
  { order: 8, startLat: -23.5505, startLng: -46.6333, endLat: 30.0444, endLng: 31.2357, arcAlt: 0.35, color: "#ea7a5f" },
  { order: 9, startLat: 37.5665, startLng: 126.978, endLat: 13.7563, endLng: 100.5018, arcAlt: 0.15, color: "#fbbf24" },
  { order: 10, startLat: 41.0082, startLng: 28.9784, endLat: -1.2921, endLng: 36.8219, arcAlt: 0.2, color: "#d97706" },
  { order: 11, startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.006, arcAlt: 0.28, color: "#f59e0b" },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.12, color: "#fcd34d" },
  { order: 13, startLat: 25.2048, startLng: 55.2708, endLat: 28.6139, endLng: 77.209, arcAlt: 0.1, color: "#ea7a5f" },
  { order: 14, startLat: 48.8566, startLng: 2.3522, endLat: 55.7558, endLng: 37.6173, arcAlt: 0.08, color: "#fbbf24" },
  { order: 15, startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.22, color: "#d97706" },
  { order: 16, startLat: 19.4326, startLng: -99.1332, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.3, color: "#f99b85" },
  { order: 17, startLat: 30.0444, startLng: 31.2357, endLat: 41.0082, endLng: 28.9784, arcAlt: 0.06, color: "#f59e0b" },
  { order: 18, startLat: 13.7563, startLng: 100.5018, endLat: -6.2088, endLng: 106.8456, arcAlt: 0.08, color: "#fbbf24" },
  { order: 19, startLat: 39.9042, startLng: 116.4074, endLat: 37.5665, endLng: 126.978, arcAlt: 0.07, color: "#ea7a5f" },
  { order: 20, startLat: 34.0522, startLng: -118.2437, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.38, color: "#d97706" },
];

const popularSearches = [
  "Healthcare",
  "Technology & Telecom",
  "Banking & Financial Services",
  "Energy & Utilities",
  "Consumer & Retail",
];

const statsData = [
  { value: "25,000+", label: "Research Reports" },
  { value: "50,000+", label: "Clients Served" },
  { value: "150+", label: "Countries Covered" },
  { value: "14", label: "Industry Verticals" },
];

const categories = [
  "All Categories",
  "Healthcare",
  "Technology & Telecom",
  "Banking & Financial Services",
  "Energy & Utilities",
  "Consumer & Retail",
];

interface ReportStoreHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  onPopularClick: (tag: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ReportStoreHero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onPopularClick,
  selectedCategory,
  onCategoryChange,
}: ReportStoreHeroProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050505 0%, #0c0c0c 60%, #111 100%)', minHeight: 'min(100svh, 900px)' }}>
      {/* Ambient background — clean dark, no colored glows */}
      <div className="absolute inset-0">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <Container maxWidth="page" className="relative flex flex-col justify-center" style={{ zIndex: 5, minHeight: 'min(100svh, 900px)', pointerEvents: 'none' }}>
        {/* Globe — right-aligned within container bounds, hidden below lg */}
        <div
          className="absolute hidden lg:block"
          style={{
            top: '50%',
            right: '-2rem',
            transform: 'translateY(-50%)',
            width: 'min(85vh, 750px)',
            height: 'min(85vh, 750px)',
            minWidth: '300px',
            minHeight: '300px',
            zIndex: 2,
            opacity: 1,
            pointerEvents: 'auto',
          }}
        >
          <Suspense
            fallback={<div className="w-full h-full" />}
          >
            <LazyWorld globeConfig={globeConfig} data={sampleArcs} />
          </Suspense>
        </div>

        {/* Account for sticky header (56px) + breathing room */}
        <div style={{ paddingTop: '80px', paddingBottom: '32px' }}>
          {/* Hero content — sits above the globe, re-enable pointer events */}
          <div className="relative" style={{ pointerEvents: 'auto' }}>
            <div className="max-w-2xl">
              <p
                className="tracking-[0.2em] uppercase text-white/30 mb-3"
                style={{ fontSize: 'var(--text-2xs)' }}
              >
                Market Research Platform
              </p>

              <h1
                className="text-white leading-[1.08] mb-4 tracking-tight"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 'var(--font-weight-light)' as any,
                  fontSize: 'clamp(2.25rem, 5.5vw, var(--text-3xl))',
                }}
              >
                Market Intelligence
                <span className="block text-white/50 mt-1">
                  for Strategic Decisions
                </span>
              </h1>

              <p
                className="text-white/40 leading-relaxed max-w-md mb-7"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Access 25,000+ market research reports across 14
                industries. Trusted by Fortune 500 companies.
              </p>

              {/* Search Bar */}
              <div className="relative z-40 max-w-xl mb-4">
                <div
                  className="flex items-stretch bg-white overflow-hidden"
                  style={{ borderRadius: 'var(--rc-radius-card)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                >
                  <div className="flex-1 flex items-center gap-2.5 px-5 py-3.5">
                    <Search className="h-4 w-4 flex-shrink-0" color={iconColors.utility} />
                    <input
                      type="text"
                      placeholder="Search reports, industries, regions..."
                      aria-label="Search reports, industries, regions"
                      className="flex-1 bg-transparent outline-none text-black placeholder:text-black/35 min-w-0"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-nav)',
                      }}
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
                    />
                  </div>

                  <div className="hidden sm:block w-px my-3" style={{ background: 'var(--warm-500)' }} />

                  {/* Category dropdown */}
                  <div
                    className="hidden sm:block relative"
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setCategoryOpen(false);
                      }
                    }}
                  >
                    <button
                      className="flex items-center gap-2 h-full px-4 text-black/45 hover:text-black/70 transition-colors"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      style={{ fontSize: 'var(--text-nav)' }}
                    >
                      <span className="whitespace-nowrap max-w-[120px] truncate">
                        {selectedCategory}
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform flex-shrink-0 ${categoryOpen ? "rotate-180" : ""}`}
                        color={iconColors.utility}
                      />
                    </button>
                    {categoryOpen && (
                      <div
                        className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl py-1.5 z-50"
                        style={{
                          border: '1px solid var(--warm-500)',
                          borderRadius: 'var(--rc-radius-card)',
                        }}
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            className={`block w-full text-left px-4 py-2.5 transition-colors ${
                              selectedCategory === cat
                                ? "text-black bg-[var(--warm-300)]"
                                : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                            }`}
                            style={{ fontSize: 'var(--text-nav)' }}
                            onClick={() => {
                              onCategoryChange(cat);
                              setCategoryOpen(false);
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className="inline-flex items-center justify-center transition-all py-2 h-auto px-6 text-white hover:opacity-90"
                    style={{
                      background: 'var(--brand-red)',
                      fontSize: 'var(--text-nav)',
                    }}
                    onClick={onSearchSubmit}
                    aria-label="Search"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Popular searches */}
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 mb-7">
                {popularSearches.map((tag, i) => (
                  <button
                    key={tag}
                    className="text-white/35 hover:text-white/70 transition-colors px-1.5 py-0.5"
                    style={{ fontSize: 'var(--text-2xs)' }}
                    onClick={() => onPopularClick(tag)}
                  >
                    {tag}
                    {i < popularSearches.length - 1 && (
                      <span className="text-white/15 ml-2">&bull;</span>
                    )}
                  </button>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="brand" size="lg" background="dark" showArrow>
                  Talk to Expert
                </Button>
                <Button variant="ghost" size="lg" background="dark" icon={<Calendar />} iconPosition="left">
                  Schedule a call
                </Button>
              </div>
            </div>
          </div>

          {/* Stats row — full width below content */}
          <div className="relative max-w-2xl mt-8 lg:mt-10" style={{ pointerEvents: 'auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--rc-radius-card)', overflow: 'hidden' }}>
              {statsData.map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 py-3 md:px-5 md:py-3.5 text-left"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <p
                    className="text-white/90 mb-0.5 tabular-nums"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                      fontWeight: 'var(--font-weight-normal)' as any,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/30" style={{ fontSize: 'var(--text-2xs)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
