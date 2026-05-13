/**
 * Logo — Ken Research brand logo with size variants and display modes
 *
 * Design System primitive. Single source of truth for all logo rendering
 * across the entire application. Uses the original Figma SVG paths directly.
 *
 * The logo has two parts:
 *   1. Mark (K icon) — The distinctive red/black "K" symbol
 *   2. Wordmark — "KEN RESEARCH" logotype text
 *
 * Display modes:
 *   - 'full'     — Mark + Wordmark (default, used in most contexts)
 *   - 'mark'     — K icon only (favicons, app icons, compact UI, loading)
 *   - 'wordmark' — Text only (tight horizontal spaces, breadcrumbs)
 *
 * Size variants (height-driven, aspect ratios preserved):
 *   - 'xs'  — 16px height — Breadcrumbs, inline mentions, compact headers
 *   - 'sm'  — 20px height — Mobile navbar, footer compact, sidebar collapsed
 *   - 'md'  — 24px height — Desktop navbar (primary use), sticky headers
 *   - 'lg'  — 32px height — Footer main, about page, partner sections
 *   - 'xl'  — 48px height — Hero sections, splash screens, marketing
 *
 * Color variants:
 *   - 'default' — Black text + red/black mark (light backgrounds)
 *   - 'white'   — White text + white/red mark (dark backgrounds)
 *   - 'mono'    — All black (print, single-color contexts)
 *
 * @example
 * <Logo />                                          // Default: full, md, default color
 * <Logo size="sm" />                                // Mobile navbar
 * <Logo size="lg" />                                // Footer
 * <Logo display="mark" size="xl" />                 // Hero section icon only
 * <Logo display="wordmark" size="xs" />             // Breadcrumb
 * <Logo color="white" size="md" />                  // Dark background header
 * <Logo size="md" className="opacity-80" />         // Custom styling
 */

interface LogoProps {
  /** Size variant — controls height, width scales proportionally */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Display mode — which parts of the logo to render */
  display?: 'full' | 'mark' | 'wordmark';
  /** Color variant — adapts to background */
  color?: 'default' | 'white' | 'mono';
  /** Additional CSS classes */
  className?: string;
  /** Accessible alt text */
  ariaLabel?: string;
}

// ─── SVG Path Data (from Figma export, verified against original) ─────────

/** K mark — black body path */
const MARK_BODY = 'M14.648 0H0L0.141 14.93L7.324 20L14.648 15.07V14.085L7.535 8.662L14.366 2.958H11.338L5.141 7.817L5.071 2.958H3.028V13.592L5.071 15V9.437L12.324 14.648L7.465 18.028L1.761 13.944L1.831 2.042H14.648V0Z';

/** K mark — red accent triangle */
const MARK_ACCENT = 'M14.819 4.207L9.467 8.433L14.819 12.376V4.207Z';

/** Wordmark — "KEN" portion */
const WORDMARK_KEN = 'M0.0682906 0.410748H1.43812V4.99827H1.78058L8.83158 0.410748H10.818L4.24506 5.34073L10.8863 10.4756L8.90088 10.6122L1.78058 5.5456H1.50641V10.6122H0L0.0682906 0.410748Z';

/** Wordmark — "RESEARCH" portion */
const WORDMARK_RESEARCH = 'M12.6659 0.410748H21.4985V1.78058H14.0357V4.51823H21.5668V5.95635H14.0357V9.24334H21.5668V10.6122H12.6659V0.410748ZM22.4566 10.5439V0.410748H25.2635L32.1106 8.90088V0.342457H33.6853V10.6122H31.3574L24.0313 1.64299L23.8947 10.6122L22.4566 10.5439ZM51.0071 6.50468C50.9388 6.02464 50.1163 5.06656 50.1163 5.06656C50.528 4.44994 50.528 3.90261 50.528 3.90261V2.3962C50.1163 0.684915 48.405 0.410748 48.405 0.410748H39.2992V10.6122H41.1481V5.95635H47.8577C48.884 6.3671 49.5689 6.3671 49.5689 6.3671V10.5439H50.9388C51.0071 10.6122 51.0071 6.57297 51.0071 6.50468ZM49.0899 4.17677C49.0899 4.17677 48.4733 4.24506 47.5152 4.58752H41.1481V1.78058H47.3786C47.3786 1.78058 48.7474 2.25962 49.0899 2.25962V4.17677ZM110.846 6.50468C110.777 6.02464 109.956 5.06656 109.956 5.06656C110.367 4.44994 110.367 3.90261 110.367 3.90261V2.3962C109.956 0.684915 108.244 0.410748 108.244 0.410748H99.2062V10.6122H101.055V5.95635H107.833C108.86 6.3671 109.545 6.3671 109.545 6.3671V10.5439H110.914C110.846 10.6122 110.846 6.57297 110.846 6.50468ZM108.997 4.17677C108.997 4.17677 108.381 4.24506 107.422 4.58752H101.055V1.78058H107.286C107.286 1.78058 108.654 2.25962 108.997 2.25962V4.17677ZM52.8549 0.410748H61.7558V1.78058H54.293V4.58752H61.7558V5.95635H54.293V9.17404H61.7558V10.6122H52.8549V0.410748ZM64.9052 0.410748H72.7787C74.6959 0.616624 74.9017 3.62844 74.9017 3.62844C74.9017 3.62844 73.6002 3.69673 73.1894 2.73865C72.847 1.71128 71.8889 1.78058 71.8889 1.78058H65.5901C64.8369 1.78058 64.631 2.60207 64.631 2.60207V4.10748C64.631 4.10748 69.6976 4.38165 72.0938 4.7241C74.491 4.99827 74.7641 6.91543 74.7641 7.25688V8.76329C74.7641 8.76329 74.7641 10.4756 72.2997 10.5439C72.2314 10.5439 65.5218 10.6804 65.0418 10.5439C63.2622 10.2014 63.1939 7.9418 63.1939 7.9418V7.32618H64.5627V8.07938C64.5627 8.07938 64.4944 8.96917 65.7267 9.17404H72.2314C72.2314 9.17404 73.1212 9.17404 73.3953 8.695C73.5319 6.23051 70.5191 6.02464 70.5191 6.02464H65.795C63.6047 5.88806 62.988 4.51823 62.9197 4.17677C62.4407 2.67036 62.8515 1.98545 62.8515 1.84887C63.7412 0.410748 64.8369 0.410748 64.9052 0.410748ZM76.6813 0.410748H85.5822V1.78058H78.1194V4.58752H85.5822V6.02464H78.1194V9.24334H85.5822V10.6122H76.7496L76.6813 0.410748ZM93.524 0.479039H91.3327L86.3354 10.4756L87.7042 10.5439L89.0047 8.14767H95.7836L97.0158 10.4756L98.5905 10.5439L93.524 0.479039ZM89.758 6.84613L92.2917 1.84887L95.0987 6.77784L89.758 6.84613ZM112.215 2.87524C112.215 2.87524 112.831 0.342457 115.502 0H121.526C121.526 0 123.169 0 123.854 1.30053C124.197 1.91716 124.333 3.21769 124.333 3.21769C124.333 3.21769 122.964 3.21769 122.622 2.25962C122.211 1.23224 121.321 1.36883 121.321 1.36883H116.186C114.406 1.36883 114.063 2.87524 114.063 2.87524C114.063 2.87524 113.738 7.17152 114.063 8.76329C114.389 10.3551 114.474 9.24334 115.364 9.24334H121.594C121.594 9.24334 122.143 9.24333 122.485 8.55842C122.69 7.46276 124.333 7.39447 124.333 7.39447C124.333 7.39447 124.471 10.2697 122.348 10.6122H114.612C112.489 10.2014 112.215 7.39447 112.215 7.39447V2.87524ZM126.25 0.410748H127.62V4.58752H135.562V0.410748H137V10.5439H135.562V5.95635H127.62V10.6122H126.182L126.25 0.410748Z';

// ─── Size Configuration ───────────────────────────────────────────────────

/**
 * Size config: height-driven. All dimensions computed from the height.
 *
 * Original Figma measurements:
 *   Mark:     14.819 x 20      → aspect ratio 0.741 : 1
 *   Wordmark: 137    x 10.612  → aspect ratio 12.91 : 1
 *   Gap:      6px at 20px mark height
 *
 * Each size defines:
 *   markHeight   — Height of the K mark (= overall logo height)
 *   markWidth    — Width of the K mark (markHeight * 0.741)
 *   wordHeight   — Height of the wordmark (markHeight * 0.531)
 *   wordWidth    — Width of the wordmark (wordHeight * 12.91)
 *   gap          — Space between mark and wordmark
 */
const SIZE_CONFIG = {
  xs: { markHeight: 16, markWidth: 11.9, wordHeight: 8.5, wordWidth: 109.7, gap: 4 },
  sm: { markHeight: 20, markWidth: 14.8, wordHeight: 10.6, wordWidth: 137, gap: 6 },
  md: { markHeight: 24, markWidth: 17.8, wordHeight: 12.7, wordWidth: 164, gap: 7 },
  lg: { markHeight: 32, markWidth: 23.7, wordHeight: 17.0, wordWidth: 219.5, gap: 9 },
  xl: { markHeight: 48, markWidth: 35.6, wordHeight: 25.5, wordWidth: 329, gap: 12 },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────

/** K mark icon (black body + red accent triangle) */
function LogoMark({
  width,
  height,
  bodyColor,
  accentColor,
}: {
  width: number;
  height: number;
  bodyColor: string;
  accentColor: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14.819 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d={MARK_BODY} fill={bodyColor} />
      <path d={MARK_ACCENT} fill={accentColor} />
    </svg>
  );
}

/** "KEN RESEARCH" wordmark */
function LogoWordmark({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 137 10.6122"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d={WORDMARK_KEN} fill={color} />
      <path d={WORDMARK_RESEARCH} fill={color} />
    </svg>
  );
}

// ─── Color Configuration ──────────────────────────────────────────────────

const COLOR_CONFIG = {
  default: { body: '#141016', accent: '#D72B31', wordmark: '#141016' },
  white:   { body: '#ffffff', accent: '#D72B31', wordmark: '#ffffff' },
  mono:    { body: '#141016', accent: '#141016', wordmark: '#141016' },
} as const;

// ─── Main Component ──────────────────────────────────────────────────────

export function Logo({
  size = 'md',
  display = 'full',
  color = 'default',
  className = '',
  ariaLabel = 'Ken Research',
}: LogoProps) {
  const config = SIZE_CONFIG[size];
  const colors = COLOR_CONFIG[color];

  const showMark = display === 'full' || display === 'mark';
  const showWordmark = display === 'full' || display === 'wordmark';

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap: showMark && showWordmark ? config.gap : 0 }}
      role="img"
      aria-label={ariaLabel}
    >
      {showMark && (
        <LogoMark
          width={config.markWidth}
          height={config.markHeight}
          bodyColor={colors.body}
          accentColor={colors.accent}
        />
      )}
      {showWordmark && (
        <LogoWordmark
          width={config.wordWidth}
          height={config.wordHeight}
          color={colors.wordmark}
        />
      )}
    </div>
  );
}

// ─── Size Reference (for documentation) ──────────────────────────────────
/**
 * USE CASE MATRIX:
 *
 * | Use Case                    | Size | Display  | Color   | Notes                          |
 * |-----------------------------|------|----------|---------|--------------------------------|
 * | Desktop navbar              | md   | full     | default | Primary branding, 60px bar     |
 * | Mobile navbar               | sm   | full     | default | Compact, 60px bar              |
 * | Footer (main)               | lg   | full     | default | Prominent, anchors footer      |
 * | Footer (compact)            | sm   | full     | default | Minimal footer variant         |
 * | Dark section/hero           | lg   | full     | white   | On dark backgrounds            |
 * | Loading screen              | xl   | mark     | default | Centered, with spinner below   |
 * | Sidebar collapsed           | sm   | mark     | default | Icon-only when sidebar narrow  |
 * | Sidebar expanded            | sm   | full     | default | Full when sidebar wide         |
 * | Breadcrumb inline           | xs   | mark     | default | Tiny mark before "Home"        |
 * | Auth page header            | lg   | full     | default | Welcome screen branding        |
 * | Email template              | md   | full     | default | HTML email header              |
 * | Favicon / app icon          | xs   | mark     | default | 16px mark only                 |
 * | OG image / social           | xl   | full     | default | Large for previews             |
 * | Partner logo row            | sm   | full     | mono    | Monochrome alongside partners  |
 * | Print / PDF header          | md   | full     | mono    | Single-color printing          |
 * | Mobile menu header          | sm   | full     | default | Top of push menu               |
 * | 404 / Error page            | xl   | full     | default | Large, reassuring branding     |
 */
