/**
 * Hero Section Theme Configuration — Design System VS 26.
 * Centralized theme variants. All colors reference DS tokens via CSS vars.
 *
 * Note (Phase C step 2c): legacy `import { colors }` removed — unused at runtime.
 * Theme strings reference CSS variables; tokens consumed via globals.css.
 */

export type HeroVariant = 'darkPremium' | 'light' | 'warmEditorial' | 'darkEmber';

export interface HeroTheme {
  name: string;
  background: string;
  textColor: string;
  subtitleGradient: string;
  bodyText: string;
  statText: string;
  statLabel: string;
  buttonBackground: 'light' | 'dark';
  badgeVariant: 'purple' | 'default';
  previewCardBg: string;
  previewCardBorder: string;
  previewCardText: string;
  // Decorative accent colors for card area (replaces hardcoded periwinkle)
  cardDecorBlur1: string;   // CSS class for top-right decorative blur
  cardDecorBlur2: string;   // CSS class for bottom-left decorative blur
  accentOverlayBg: string;  // CSS class for accent content overlay bg
  accentOverlayBorder: string; // CSS border-color for accent overlays
  // Modal accent theming (expanded preview)
  modalAccentBg: string;          // CSS class for modal premium section bg
  modalAccentBorder: string;      // CSS border-color value for modal premium section
  modalAccentBorderHover: string; // CSS border-color value on hover
  // Badge theming
  badgeTheme: 'purple' | 'warm' | 'neutral' | 'brand'; // Theme for PREMIUM CONTENT badges
  badgeGlow: string; // Shadow class for badge glow effect (matches badge theme colour family)
  badgeAutoShimmer: boolean; // Continuous shimmer animation (light variants only)
  badgeStyle?: React.CSSProperties; // Optional inline styles for badge (gradient backgrounds)
  // Card decorative blur opacity override (for pure black backgrounds)
  cardDecorOpacity: string;  // Tailwind opacity class for card decorative blurs
  glows: Array<{
    className: string;
    animation: Record<string, any>;
    transition: Record<string, any>;
    style?: React.CSSProperties;
  }>;
}

export const heroThemes: Record<HeroVariant, HeroTheme> = {
  darkPremium: {
    name: "Dark Premium",
    background: "bg-gradient-to-br from-black via-gray-800 to-gray-700",
    textColor: "text-white",
    subtitleGradient: "from-white to-white/70",
    bodyText: "text-white/70",
    statText: "text-white",
    statLabel: "text-white/50 group-hover:text-white/70",
    buttonBackground: "dark",
    badgeVariant: "default",
    previewCardBg: "bg-white/5",
    previewCardBorder: "rgba(255, 255, 255, 0.1)",
    previewCardText: "text-white/90",
    cardDecorBlur1: "bg-content-icon",
    cardDecorBlur2: "bg-periwinkle",
    accentOverlayBg: "bg-[#806ce0]/5",
    accentOverlayBorder: "rgba(128, 108, 224, 0.2)",
    modalAccentBg: "bg-[#806ce0]/5",
    modalAccentBorder: "rgba(128, 108, 224, 0.2)",
    modalAccentBorderHover: "rgba(128, 108, 224, 0.4)",
    badgeTheme: "purple",
    badgeGlow: "shadow-md shadow-black/15",
    badgeAutoShimmer: false,
    cardDecorOpacity: "opacity-[0.10]",
    glows: [
      {
        className: "absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-content-icon blur-3xl opacity-[0.03]",
        animation: { scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      },
      {
        className: "absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-periwinkle blur-3xl opacity-[0.03]",
        animation: { scale: [1, 1.3, 1], opacity: [0.03, 0.05, 0.03] },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
      },
      {
        className: "absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent blur-3xl",
        animation: { opacity: [0, 0, 0] },
        transition: { duration: 1 }
      }
    ]
  },
  
  light: {
    name: "Light",
    background: "bg-gradient-to-br from-white via-white to-periwinkle-50",
    textColor: "text-black",
    subtitleGradient: "from-[#806ce0] to-black",
    bodyText: "text-utility-icon",
    statText: "text-black",
    statLabel: "text-utility-icon group-hover:text-gray-600",
    buttonBackground: "light",
    badgeVariant: "purple",
    previewCardBg: "bg-white/80",
    previewCardBorder: "rgba(0, 0, 0, 0.1)",
    previewCardText: "text-black/90",
    cardDecorBlur1: "bg-perano",
    cardDecorBlur2: "bg-periwinkle",
    accentOverlayBg: "bg-[#806ce0]/5",
    accentOverlayBorder: "rgba(128, 108, 224, 0.2)",
    modalAccentBg: "bg-[#806ce0]/5",
    modalAccentBorder: "rgba(128, 108, 224, 0.2)",
    modalAccentBorderHover: "rgba(128, 108, 224, 0.4)",
    badgeTheme: "purple",
    badgeGlow: "!text-white !border-[#2a2a3e] shadow-xl shadow-black/30",
    badgeAutoShimmer: true,
    badgeStyle: { background: "linear-gradient(135deg, #1a1a2e, #111111, #1a1820)" },
    cardDecorOpacity: "opacity-[0.10]",
    glows: [
      {
        // Top-right — perano (cool light blue), bleeds off corner
        // Provides a cool "ambient light" feel on the card side
        className: "absolute -right-16 -top-24 h-[480px] w-[480px] rounded-full bg-perano blur-[100px]",
        animation: { scale: [1, 1.12, 1], opacity: [0.35, 0.50, 0.35] },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      },
      {
        // Bottom-left — periwinkle (medium purple), bleeds off corner
        // Creates diagonal color tension with glow 1
        className: "absolute -bottom-20 -left-16 h-[420px] w-[420px] rounded-full bg-periwinkle blur-[100px]",
        animation: { scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
      },
      {
        // Center-right — content-icon (deep purple), subtle halo behind card area
        // Gives the preview card a "lit from behind" depth effect
        className: "absolute top-1/3 right-[15%] h-[300px] w-[450px] rounded-full bg-content-icon blur-[120px]",
        animation: { opacity: [0.04, 0.07, 0.04], scale: [1, 1.05, 1] },
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }
      }
    ]
  },

  warmEditorial: {
    name: "Warm Editorial",
    background: "bg-gradient-to-br from-warm-100 via-warm-50 to-white",
    textColor: "text-black",
    subtitleGradient: "from-[var(--coral-500)] to-black",
    bodyText: "text-utility-icon",
    statText: "text-black",
    statLabel: "text-utility-icon group-hover:text-gray-600",
    buttonBackground: "light",
    badgeVariant: "purple",
    previewCardBg: "bg-white/90",
    previewCardBorder: "rgba(0, 0, 0, 0.06)",
    previewCardText: "text-black/90",
    cardDecorBlur1: "bg-coral-light",
    cardDecorBlur2: "bg-perano",
    accentOverlayBg: "bg-coral-light/5",
    accentOverlayBorder: "rgba(249, 155, 133, 0.15)",
    modalAccentBg: "bg-coral-light/5",
    modalAccentBorder: "rgba(249, 155, 133, 0.15)",
    modalAccentBorderHover: "rgba(249, 155, 133, 0.3)",
    badgeTheme: "purple",
    badgeGlow: "!text-white !border-[#2a2a3e] shadow-xl shadow-black/30",
    badgeAutoShimmer: true,
    badgeStyle: { background: "linear-gradient(135deg, #1a1a2e, #111111, #1a1820)" },
    cardDecorOpacity: "opacity-[0.10]",
    glows: [
      {
        // Top-left — coral-500 (#f99b85), warm editorial anchor
        // Echoes BannerSection dark's coral orbs and ReportHighlights' warm glow
        className: "absolute -left-12 -top-20 h-[450px] w-[500px] rounded-full bg-coral-light blur-[120px]",
        animation: { scale: [1, 1.1, 1], opacity: [0.10, 0.16, 0.10] },
        transition: { duration: 9, repeat: Infinity, ease: "easeInOut" }
      },
      {
        // Bottom-right — perano (#dfeafa), periwinkle washed with white
        // A barely-there cool accent that doesn't compete with the warmth
        className: "absolute -bottom-16 -right-12 h-[420px] w-[420px] rounded-full bg-perano blur-[120px]",
        animation: { scale: [1, 1.12, 1], opacity: [0.15, 0.22, 0.15] },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
      },
      {
        // Center — coral-400 (#fbb8a7), warm haze bridging the two zones
        // Echoes ReportHighlights' subtle coral radial glow
        className: "absolute top-[40%] left-[35%] h-[350px] w-[500px] rounded-full bg-orange-accent blur-[130px]",
        animation: { opacity: [0.06, 0.10, 0.06], scale: [1, 1.06, 1] },
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }
      }
    ]
  },

  darkEmber: {
    name: "Dark Ember",
    background: "bg-black",
    textColor: "text-white",
    subtitleGradient: "from-[var(--coral-400)] to-white/70",
    bodyText: "text-white/70",
    statText: "text-white",
    statLabel: "text-white/50 group-hover:text-white/70",
    buttonBackground: "dark",
    badgeVariant: "default",
    previewCardBg: "bg-white/5",
    previewCardBorder: "rgba(249, 155, 133, 0.10)",
    previewCardText: "text-white/90",
    cardDecorBlur1: "bg-coral",
    cardDecorBlur2: "bg-amber-light",
    accentOverlayBg: "bg-coral-light/5",
    accentOverlayBorder: "rgba(249, 155, 133, 0.12)",
    modalAccentBg: "bg-coral-light/5",
    modalAccentBorder: "rgba(249, 155, 133, 0.12)",
    modalAccentBorderHover: "rgba(249, 155, 133, 0.24)",
    badgeTheme: "purple",
    badgeGlow: "shadow-md shadow-black/15",
    badgeAutoShimmer: false,
    cardDecorOpacity: "opacity-[0.18]",
    glows: [
      {
        // Primary coral — top-left, large diffused wash anchoring the warm side
        className: "absolute -left-24 -top-20 h-[650px] w-[650px] rounded-full bg-coral opacity-[0.10] blur-[160px]",
        animation: {},
        transition: {}
      },
      {
        // Coral-light — upper-right, softer coral glow illuminating card area
        className: "absolute -top-12 -right-16 h-[500px] w-[500px] rounded-full bg-coral-light opacity-[0.06] blur-[140px]",
        animation: {},
        transition: {}
      },
      {
        // Amber — bottom-right, golden warmth anchoring the lower card zone
        className: "absolute -bottom-24 -right-20 h-[550px] w-[550px] rounded-full bg-amber-light opacity-[0.06] blur-[160px]",
        animation: {},
        transition: {}
      },
      {
        // Orange-accent — center bridge, blends coral and amber into continuous field
        className: "absolute top-[35%] left-[30%] h-[400px] w-[600px] rounded-full bg-orange-accent opacity-[0.05] blur-[180px]",
        animation: {},
        transition: {}
      },
      {
        // Deep coral — bottom-left, secondary ember providing depth
        className: "absolute -bottom-16 -left-12 h-[400px] w-[400px] rounded-full bg-coral opacity-[0.05] blur-[140px]",
        animation: {},
        transition: {}
      }
    ]
  }
};

/**
 * Get theme configuration by variant key
 */
export function getHeroTheme(variant: HeroVariant): HeroTheme {
  return heroThemes[variant];
}

/**
 * Get all available theme variants
 */
export function getAllHeroVariants(): HeroVariant[] {
  return Object.keys(heroThemes) as HeroVariant[];
}