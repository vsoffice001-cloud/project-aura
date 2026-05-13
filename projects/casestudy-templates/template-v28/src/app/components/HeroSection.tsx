import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/app/components/Badge';
import { FrostedCard } from '@/app/components/FrostedCard';
import { Container } from './Container';
import heroImage from 'figma:asset/05f4f3995043a36866394a18c4e45d02681f5e64.png';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface HeroSectionProps {
  enableVariantSwitcher?: boolean;
}

type HeroVariant = 'light' | 'dark' | 'alt-white' | 'alt-dark';

interface VariantConfig {
  sectionClass: string;
  sectionBackground?: string;
  badgeColor: string;
  titleColor: string;
  breadcrumbColor: string;
  breadcrumbHoverColor: string;
  breadcrumbActiveColor: string;
  breadcrumbSeparatorColor: string;
  cardBackground: string;
  cardBorder: string;
  labelColor: string;
  valueColor: string;
}

interface InfoCardData {
  label: string;
  value: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const VIEWPORT_BREAKPOINT = 768;

const ANIMATION_CONFIG = {
  SCROLL_DIVISOR: 0.6,
  IMAGE_SCALE_MULTIPLIER: 0.05,
  CARD_TRANSLATE_MULTIPLIER: 30,
  CARD_OPACITY_MULTIPLIER: 0.7,
  OVERLAY_OPACITY: 0.6,
} as const;

const INFO_CARDS: InfoCardData[] = [
  {
    label: "CLIENT",
    value: "Yash Highvoltage Insulators",
  },
  {
    label: "ENGAGEMENT OWNER",
    value: "Director – Strategy",
  },
  {
    label: "GEOGRAPHY",
    value: "India",
  },
  {
    label: "INDUSTRY",
    value: "Power Transmission - Electrical Equipment - Grid Infrastructure",
  },
];

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Case Study 001", isActive: true },
];

const VARIANT_BUTTONS: { value: HeroVariant; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'alt-white', label: 'Alt White' },
  { value: 'alt-dark', label: 'Alt Dark' },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function HeroSection({ enableVariantSwitcher = true }: HeroSectionProps) {
  const [variant, setVariant] = useState<HeroVariant>('light');
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Detect desktop viewport
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= VIEWPORT_BREAKPOINT);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Track hero section visibility for variant switcher
  useEffect(() => {
    if (!enableVariantSwitcher || !heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [enableVariantSwitcher]);

  // Premium parallax scroll animation (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || window.innerWidth < VIEWPORT_BREAKPOINT) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const scrollDistance = -heroRect.top;
      
      if (heroHeight > 0) {
        const progress = Math.min(
          Math.max(scrollDistance / (heroHeight * ANIMATION_CONFIG.SCROLL_DIVISOR), 0), 
          1
        );
        setScrollProgress(isNaN(progress) ? 0 : progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Get variant-specific theme configuration
   * Returns colors, backgrounds, and styling for the selected variant
   */
  const getVariantConfig = (): VariantConfig => {
    switch (variant) {
      case 'dark':
        return {
          sectionClass: 'relative bg-black',
          sectionBackground: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(176, 31, 36, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03), transparent 40%), #000000',
          badgeColor: '#888',
          titleColor: 'white',
          breadcrumbColor: 'rgba(255, 255, 255, 0.6)',
          breadcrumbHoverColor: 'rgba(255, 255, 255, 0.9)',
          breadcrumbActiveColor: 'rgba(255, 255, 255, 1)',
          breadcrumbSeparatorColor: 'rgba(255, 255, 255, 0.4)',
          // ✅ FROSTED GLASS: backdrop-blur + semi-transparent background
          cardBackground: 'rgba(26, 26, 26, 0.9)', // 90% dark gray with blur
          cardBorder: 'rgba(255, 255, 255, 0.15)',
          labelColor: 'rgba(255, 255, 255, 0.7)',
          valueColor: 'rgba(255, 255, 255, 1)',
        };
      
      case 'alt-white':
        return {
          sectionClass: 'relative bg-white',
          sectionBackground: 'radial-gradient(ellipse 120% 80% at 80% 20%, rgba(176, 31, 36, 0.08), transparent 60%), radial-gradient(ellipse 100% 70% at 20% 80%, rgba(255, 147, 41, 0.12), transparent 50%), radial-gradient(circle at 50% 90%, rgba(249, 247, 246, 0.9), transparent 60%), radial-gradient(ellipse 80% 60% at 90% 85%, rgba(255, 193, 7, 0.06), transparent 50%), linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f8f8f8 100%)',
          badgeColor: 'rgba(0, 0, 0, 0.5)',
          titleColor: 'var(--black-900)',
          breadcrumbColor: 'rgba(0, 0, 0, 0.6)',
          breadcrumbHoverColor: 'rgba(0, 0, 0, 0.9)',
          breadcrumbActiveColor: 'rgba(0, 0, 0, 1)',
          breadcrumbSeparatorColor: 'rgba(0, 0, 0, 0.4)',
          // ✅ SOLID CARDS: No frosted effect, clean white cards
          cardBackground: 'rgba(255, 255, 255, 1)', // Solid white
          cardBorder: 'rgba(0, 0, 0, 0.12)',
          labelColor: 'rgba(0, 0, 0, 0.7)',
          valueColor: 'rgba(0, 0, 0, 1)',
        };
      
      case 'alt-dark':
        return {
          sectionClass: 'relative bg-black',
          sectionBackground: 'radial-gradient(ellipse 100% 60% at 30% 20%, rgba(176, 31, 36, 0.25), transparent 50%), radial-gradient(ellipse 90% 70% at 15% 75%, rgba(255, 147, 41, 0.15), transparent 55%), radial-gradient(circle at 70% 85%, rgba(255, 193, 7, 0.1), transparent 45%), radial-gradient(circle at 85% 70%, rgba(255, 255, 255, 0.05), transparent 40%), linear-gradient(180deg, #0a0a0a 0%, #000000 50%, #050505 100%)',
          badgeColor: '#888',
          titleColor: 'white',
          breadcrumbColor: 'rgba(255, 255, 255, 0.6)',
          breadcrumbHoverColor: 'rgba(255, 255, 255, 0.9)',
          breadcrumbActiveColor: 'rgba(255, 255, 255, 1)',
          breadcrumbSeparatorColor: 'rgba(255, 255, 255, 0.4)',
          // ✅ SOLID CARDS: No frosted effect, clean dark cards
          cardBackground: 'rgba(26, 26, 26, 1)', // Solid dark gray
          cardBorder: 'rgba(255, 255, 255, 0.15)',
          labelColor: 'rgba(255, 255, 255, 0.7)',
          valueColor: 'rgba(255, 255, 255, 1)',
        };
      
      default: // 'light'
        return {
          sectionClass: 'relative bg-white',
          badgeColor: 'rgba(0, 0, 0, 0.5)',
          titleColor: 'var(--black-900)',
          breadcrumbColor: 'rgba(0, 0, 0, 0.6)',
          breadcrumbHoverColor: 'rgba(0, 0, 0, 0.9)',
          breadcrumbActiveColor: 'rgba(0, 0, 0, 1)',
          breadcrumbSeparatorColor: 'rgba(0, 0, 0, 0.4)',
          // ✅ FROSTED GLASS: backdrop-blur + semi-transparent background
          cardBackground: 'rgba(255, 255, 255, 0.9)', // 90% white with blur
          cardBorder: 'rgba(0, 0, 0, 0.12)',
          labelColor: 'rgba(0, 0, 0, 0.7)',
          valueColor: 'rgba(0, 0, 0, 1)',
        };
    }
  };

  const config = getVariantConfig();

  return (
    <>
      {/* Variant Switcher - Fixed position, visible when hero is in view */}
      {enableVariantSwitcher && isHeroVisible && (
        <div 
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 backdrop-blur-md rounded-[5px] p-1.5 shadow-xl transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex gap-1">
            {VARIANT_BUTTONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setVariant(value)}
                className={`px-2.5 py-1.5 rounded-[5px] text-[11px] font-medium transition-all whitespace-nowrap ${
                  variant === value
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black/70 hover:text-black hover:bg-black/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Layout */}
      <HeroLayout 
        isDesktop={isDesktop}
        heroRef={heroRef}
        config={config}
        scrollProgress={scrollProgress}
        variant={variant}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface CardProps {
  label: string;
  value: string;
  background: string;
  border: string;
  labelColor: string;
  valueColor: string;
}

/**
 * Mobile Info Card Component
 * Solid card with no frosted effect (not overlaid on images)
 */
function MobileInfoCard({ 
  label, 
  value, 
  background, 
  border, 
  labelColor, 
  valueColor 
}: CardProps) {
  return (
    <FrostedCard
      background={background}
      borderColor={border}
      borderRadius="5px"
      padding="clamp(12px, 3vw, 16px)"
      shadow="sm"
      frosted={false}
    >
      <p 
        style={{ 
          fontSize: 'clamp(9px, 2vw, 10px)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: labelColor,
          marginBottom: 'clamp(6px, 1.5vw, 8px)',
        }}
      >
        {label}
      </p>
      <p 
        style={{ 
          fontSize: 'clamp(13px, 3.5vw, 15px)',
          fontWeight: 600,
          lineHeight: 1.3,
          color: valueColor,
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </p>
    </FrostedCard>
  );
}

/**
 * Desktop Info Card Component
 * Frosted glass card with backdrop blur effect (overlaid on hero image)
 */
function DesktopInfoCard({ 
  label, 
  value, 
  background, 
  border, 
  labelColor, 
  valueColor 
}: CardProps) {
  return (
    <FrostedCard
      background={background}
      borderColor={border}
      borderRadius="5px"
      padding="clamp(12px, 1.2vw, 16px)"
      shadow="xl"
      blurIntensity="50px"
      frosted={true}
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      }}
    >
      <p 
        style={{ 
          fontSize: 'clamp(9px, 0.8vw, 10px)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: labelColor,
          marginBottom: 'clamp(6px, 0.6vw, 8px)',
        }}
      >
        {label}
      </p>
      <p 
        style={{ 
          fontSize: 'clamp(12px, 1.1vw, 14px)',
          fontWeight: 600,
          lineHeight: 1.25,
          color: valueColor,
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </p>
    </FrostedCard>
  );
}

/**
 * Alt Variant Info Card Component
 * Standard card layout without frosted effect
 * Optimized for horizontal 4-column layout on desktop
 */
function AltVariantInfoCard({ 
  label, 
  value, 
  background, 
  border, 
  labelColor, 
  valueColor 
}: CardProps) {
  return (
    <FrostedCard
      background={background}
      borderColor={border}
      borderRadius="5px"
      padding="clamp(12px, 1.2vw, 14px)"
      shadow="sm"
      frosted={false}
    >
      <p 
        style={{ 
          fontSize: 'clamp(9px, 0.75vw, 10px)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: labelColor,
          marginBottom: 'clamp(6px, 0.6vw, 8px)',
        }}
      >
        {label}
      </p>
      <p 
        style={{ 
          fontSize: 'clamp(12px, 1vw, 13px)',
          fontWeight: 600,
          lineHeight: 1.3,
          color: valueColor,
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </p>
    </FrostedCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO LAYOUT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface HeroLayoutProps {
  isDesktop: boolean;
  heroRef: React.RefObject<HTMLElement>;
  config: VariantConfig;
  scrollProgress: number;
  variant: HeroVariant;
}

/**
 * Main hero layout with responsive design
 * - Mobile: Cards above image, no parallax
 * - Desktop: Glass cards overlaid on image with parallax effects
 * - Alt variants: No image, cards below title in standard layout
 */
function HeroLayout({ isDesktop, heroRef, config, scrollProgress, variant }: HeroLayoutProps) {
  // Check if this is an alt variant (no image)
  const isAltVariant = variant === 'alt-white' || variant === 'alt-dark';

  return (
    <section 
      id="hero"
      className={config.sectionClass}
      style={{
        background: config.sectionBackground,
        transition: 'background 0.5s ease-in-out',
        paddingTop: isAltVariant ? 'clamp(40px, 8vw, 80px)' : undefined,
        paddingBottom: isAltVariant ? 'clamp(40px, 8vw, 80px)' : undefined,
      }}
      ref={heroRef}
    >
      <Container className="relative w-full z-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs breadcrumbs={BREADCRUMBS} config={config} />

        {/* Case Study Badge */}
        <div className="mb-3 md:mb-4">
          <Badge 
            variant="minimal" 
            size="sm"
            theme="neutral"
            mode={variant === 'dark' || variant === 'alt-dark' ? 'dark' : 'light'}
            style={{ color: config.badgeColor }}
          >
            CASE STUDY
          </Badge>
        </div>

        {/* Hero Title */}
        <h1 
          className="font-light tracking-tight" 
          style={{ 
            fontFamily: "'Noto Serif', serif", 
            fontSize: isAltVariant 
              ? (isDesktop ? 'clamp(36px, 4vw, 48px)' : 'clamp(36px, 8vw, 64px)')
              : (isDesktop ? 'clamp(28px, 3vw, 36px)' : 'clamp(28px, 7vw, 50px)'),
            letterSpacing: '-0.02em',
            fontWeight: 300,
            color: config.titleColor,
            lineHeight: isDesktop ? '1.2' : '1.15',
            marginBottom: isAltVariant ? 'clamp(32px, 6vw, 48px)' : 'clamp(20px, 4vw, 24px)',
          }}
        >
          Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights
        </h1>

        {/* Alt Variant: Desktop Cards Below Title (No Image) */}
        {isAltVariant && (
          <AltVariantCards config={config} />
        )}

        {/* Standard Variants: Mobile Cards - Display above image */}
        {!isAltVariant && <MobileCards config={config} />}

        {/* Standard Variants: Hero Image with Desktop Glass Cards Overlay */}
        {!isAltVariant && (
          <HeroImage 
            isDesktop={isDesktop} 
            scrollProgress={scrollProgress} 
            config={config}
          />
        )}
      </Container>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  config: VariantConfig;
}

function Breadcrumbs({ breadcrumbs, config }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 md:mb-4">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {breadcrumbs.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span style={{ color: config.breadcrumbSeparatorColor }}>›</span>
            )}
            {item.isActive ? (
              <span 
                style={{
                  color: config.breadcrumbActiveColor,
                  fontSize: 'clamp(12px, 3vw, 13px)',
                  fontWeight: 500
                }}
              >
                {item.label}
              </span>
            ) : (
              <a 
                href={item.href}
                className="transition-colors hover:opacity-100"
                style={{
                  color: config.breadcrumbColor,
                  fontSize: 'clamp(12px, 3vw, 13px)'
                }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface MobileCardsProps {
  config: VariantConfig;
}

function MobileCards({ config }: MobileCardsProps) {
  return (
    <div className="block md:hidden mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {INFO_CARDS.map((card) => (
          <MobileInfoCard 
            key={card.label}
            label={card.label}
            value={card.value}
            background={config.cardBackground}
            border={config.cardBorder}
            labelColor={config.labelColor}
            valueColor={config.valueColor}
          />
        ))}
      </div>
    </div>
  );
}

interface HeroImageProps {
  isDesktop: boolean;
  scrollProgress: number;
  config: VariantConfig;
}

function HeroImage({ isDesktop, scrollProgress, config }: HeroImageProps) {
  return (
    <div 
      className="relative w-full rounded-[2.5px] overflow-visible"
      style={{
        aspectRatio: isDesktop ? '3 / 1' : '16 / 9',
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-full rounded-[2.5px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Transformer Bushing Infrastructure - High-voltage condenser bushing cross-section with electrical grid background" 
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center',
            transform: `scale(${1 + scrollProgress * ANIMATION_CONFIG.IMAGE_SCALE_MULTIPLIER})`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform'
          }}
          loading="eager"
        />
      </div>

      {/* Desktop Info Cards - Overlaid on image */}
      <DesktopInfoCards 
        scrollProgress={scrollProgress} 
        config={config}
      />
    </div>
  );
}

interface DesktopInfoCardsProps {
  scrollProgress: number;
  config: VariantConfig;
}

function DesktopInfoCards({ scrollProgress, config }: DesktopInfoCardsProps) {
  return (
    <div 
      className="hidden md:grid absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6 grid-cols-4 gap-3 lg:gap-4"
      style={{
        transform: `translateY(${scrollProgress * ANIMATION_CONFIG.CARD_TRANSLATE_MULTIPLIER}px)`,
        opacity: 1 - scrollProgress * ANIMATION_CONFIG.CARD_OPACITY_MULTIPLIER,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        willChange: 'transform, opacity'
      }}
    >
      {INFO_CARDS.map((card) => (
        <DesktopInfoCard 
          key={card.label}
          label={card.label}
          value={card.value}
          background={config.cardBackground}
          border={config.cardBorder}
          labelColor={config.labelColor}
          valueColor={config.valueColor}
        />
      ))}
    </div>
  );
}

interface AltVariantCardsProps {
  config: VariantConfig;
}

function AltVariantCards({ config }: AltVariantCardsProps) {
  return (
    <div className="w-full">
      {/* Desktop: 4 cards in one horizontal row */}
      <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4">
        {INFO_CARDS.map((card) => (
          <AltVariantInfoCard 
            key={card.label}
            label={card.label}
            value={card.value}
            background={config.cardBackground}
            border={config.cardBorder}
            labelColor={config.labelColor}
            valueColor={config.valueColor}
          />
        ))}
      </div>
      
      {/* Mobile/Tablet: 2 column grid */}
      <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {INFO_CARDS.map((card) => (
          <AltVariantInfoCard 
            key={card.label}
            label={card.label}
            value={card.value}
            background={config.cardBackground}
            border={config.cardBorder}
            labelColor={config.labelColor}
            valueColor={config.valueColor}
          />
        ))}
      </div>
    </div>
  );
}