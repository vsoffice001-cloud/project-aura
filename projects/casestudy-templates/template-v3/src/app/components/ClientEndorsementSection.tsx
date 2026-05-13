import { useState } from 'react';
import { Star } from 'lucide-react';
import { SubtleVariantSwitcher } from '@/app/components/SubtleVariantSwitcher';
import { Container } from './Container';

/**
 * CLIENT ENDORSEMENT SECTION - 5 VARIANTS
 * ========================================
 * 
 * VARIANT 1: Card Style (Original)
 * - Soft card background with subtle shadows
 * - Centered layout with padding
 * - Rating and attribution inline
 * 
 * VARIANT 2: Minimal Flat
 * - No card background or shadows
 * - Clean, open spacing
 * - Focus on typography hierarchy
 * 
 * VARIANT 3: Editorial Open Space
 * - Large decorative quote marks
 * - Generous whitespace
 * - Sophisticated decorative elements
 * - Premium editorial aesthetic
 * 
 * VARIANT 4: Carousel Centered 3-Card
 * - Active testimonial centered
 * - Previous on left, next on right
 * - Auto-scroll with 5s interval
 * - Arrow navigation & page indicators
 * - Smooth transitions with scale & blur
 * 
 * VARIANT 5: Dribbble Card (NEW)
 * - Profile-first design with avatar/initials
 * - Glassmorphism subtle effects
 * - Badge-style rating display
 * - Split layout with enhanced depth
 * - Modern hover microinteractions
 */

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  ratingCount?: string;
}

interface ClientEndorsementSectionProps {
  variant?: 'card' | 'minimal-flat' | 'editorial-open' | 'carousel-fade' | 'dribbble-card' | 'gradient-hero';
  testimonials?: Testimonial[];
  enableVariantSwitcher?: boolean;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Ken Research helped us quantify our addressable opportunity, build a sharper product strategy, and clearly articulate our competitive strengths. Their analysis played a key role in our next-stage discussions with investors.",
    author: "Rajesh Kumar",
    role: "Director",
    company: "Yash Highvoltage Insulators",
    rating: 5,
    ratingCount: "4.97 / 5"
  },
  {
    quote: "The depth of market intelligence and competitive benchmarking provided by Ken Research was instrumental in refining our go-to-market strategy. Their insights directly influenced our pricing and positioning decisions.",
    author: "Priya Sharma",
    role: "VP Strategy",
    company: "Power Grid Solutions",
    rating: 5,
    ratingCount: "4.92 / 5"
  },
  {
    quote: "Working with Ken Research transformed how we approach strategic planning. The thoroughness of their research methodology and clarity of recommendations gave us the confidence to make bold business decisions.",
    author: "Michael Chen",
    role: "Chief Operating Officer",
    company: "TransTech Industries",
    rating: 5,
    ratingCount: "4.95 / 5"
  }
];

export function ClientEndorsementSection({ 
  variant: initialVariant = 'card',
  testimonials = DEFAULT_TESTIMONIALS,
  enableVariantSwitcher = false // Disabled by default
}: ClientEndorsementSectionProps) {
  const [variant, setVariant] = useState(initialVariant);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Move to top level

  const variants = [
    { id: 'card', label: 'Card Style', description: 'Original with hover effects' },
    { id: 'dribbble-card', label: 'Dribbble Card', description: 'Profile-first modern design' },
    { id: 'gradient-hero', label: 'Gradient Hero', description: 'Dark card with hero stat' }
  ];

  // VARIANT 1: Card Style (Original)
  const renderCardVariant = () => {
    const testimonial = testimonials[0];
    
    return (
      <div className="mx-auto" style={{ maxWidth: 'var(--container-narrow)' }}>
        <div 
          className="p-6 sm:p-7 md:p-9 rounded-[10px] transition-all duration-500 relative overflow-hidden"
          style={{ 
            backgroundColor: 'var(--white)',
            // XL Elevated Shadow - Appears only on hover
            boxShadow: isHovering 
              ? '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)'
              : 'none'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Gradient Blob - Bottom Right Corner - Appears on Hover */}
          {/* COLORS USED: Warm 200 + True V Purple 100 blend for premium feel */}
          <div 
            className="absolute pointer-events-none"
            style={{
              bottom: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle at center, rgba(239, 237, 253, 0.12) 0%, rgba(249, 247, 246, 0.08) 30%, rgba(247, 246, 254, 0.04) 50%, transparent 70%)',
              filter: 'blur(40px)',
              opacity: isHovering ? 1 : 0,
              transform: isHovering ? 'scale(1.2)' : 'scale(0.8)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              zIndex: 0
            }}
          ></div>

          {/* Content Layer */}
          <div className="relative z-10">
            <div className="h-px w-16 md:w-24 bg-black/20" style={{ marginBottom: 'var(--pair-subheading-content)' }}></div>
            
            <p 
              className="leading-[1.6] text-black font-light italic" 
              style={{ 
                fontFamily: "'Noto Serif', serif", 
                fontSize: 'clamp(1rem, 2.5vw, var(--text-lg))',
                marginBottom: 'var(--pair-subheading-content)'
              }}
            >
              "{testimonial.quote}"
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-1 text-black/70" style={{ fontSize: 'var(--text-xs)' }}>
                <span className="font-medium text-black">{testimonial.role}, {testimonial.company}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <span className="font-medium text-black/70" style={{ fontSize: 'var(--text-xs)' }}>
                  {testimonial.ratingCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // VARIANT 5: Dribbble Card - Modern Profile-First Design
  const renderDribbbleCardVariant = () => {
    const testimonial = testimonials[0];
    
    // Get initials from author name
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };
    
    return (
      <div className="mx-auto" style={{ maxWidth: 'var(--container-narrow)' }}>
        {/* Main Quote Card */}
        <div 
          className="relative rounded-[10px] overflow-hidden transition-all duration-500 mb-6"
          style={{
            background: 'rgba(249, 247, 246, 0.4)', // Warm 200 with opacity
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="px-8 md:px-10 py-10 md:py-12">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star 
                  key={i} 
                  className="transition-all duration-300"
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: '#b01f24',
                    color: '#b01f24',
                    strokeWidth: 0,
                  }}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote 
              className="text-black/90 leading-[1.65]"
              style={{ 
                fontSize: 'clamp(17px, 2.2vw, 20px)',
                fontWeight: '400',
                letterSpacing: '-0.01em',
                fontFamily: "'Noto Serif', serif",
              }}
            >
              {testimonial.quote}
            </blockquote>
          </div>
        </div>

        {/* Author Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Card */}
          <div 
            className="rounded-[10px] transition-all duration-300"
            style={{
              background: 'rgba(239, 237, 253, 0.25)', // True V Purple 100 with opacity
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '20px',
            }}
          >
            <div 
              className="uppercase tracking-wider mb-3"
              style={{
                fontSize: '11px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: '500',
                letterSpacing: '1.2px',
              }}
            >
              Client
            </div>
            <div 
              className="font-medium text-black mb-1"
              style={{ 
                fontSize: '15px',
                lineHeight: '1.4',
                letterSpacing: '-0.01em'
              }}
            >
              {testimonial.author}
            </div>
            <div 
              className="text-black/55"
              style={{ 
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {testimonial.role}
            </div>
          </div>

          {/* Company Card */}
          <div 
            className="rounded-[10px] transition-all duration-300"
            style={{
              background: 'rgba(249, 247, 246, 0.5)', // Warm 200
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '20px',
            }}
          >
            <div 
              className="uppercase tracking-wider mb-3"
              style={{
                fontSize: '11px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: '500',
                letterSpacing: '1.2px',
              }}
            >
              Company
            </div>
            <div className="flex items-center gap-3">
              {/* Company Avatar/Icon - Light and Subtle */}
              <div 
                className="rounded-full overflow-hidden flex-shrink-0"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(176, 31, 36, 0.08)', // Very light brand red
                  border: '1px solid rgba(176, 31, 36, 0.12)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span 
                    className="font-medium"
                    style={{ 
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                      color: '#b01f24', // Solid brand red for text
                    }}
                  >
                    {testimonial.company.slice(0, 1)}
                  </span>
                </div>
              </div>
              <div 
                className="font-medium text-black"
                style={{ 
                  fontSize: '15px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.01em'
                }}
              >
                {testimonial.company}
              </div>
            </div>
          </div>

          {/* Rating Score Card */}
          <div 
            className="rounded-[10px] transition-all duration-300"
            style={{
              background: 'rgba(247, 246, 254, 0.4)', // True V Purple 50 with opacity
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '20px',
            }}
          >
            <div 
              className="uppercase tracking-wider mb-3"
              style={{
                fontSize: '11px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: '500',
                letterSpacing: '1.2px',
              }}
            >
              Rating
            </div>
            <div 
              className="font-semibold"
              style={{ 
                fontSize: '28px',
                lineHeight: '1.2',
                color: '#b01f24',
                letterSpacing: '-0.02em',
              }}
            >
              {testimonial.ratingCount}
            </div>
            <div 
              className="text-black/50 mt-1"
              style={{ 
                fontSize: '13px',
              }}
            >
              out of 5 stars
            </div>
          </div>
        </div>
      </div>
    );
  };

  // VARIANT 6: Gradient Hero - Full Background Layout (No Card)
  const renderGradientHeroVariant = () => {
    const testimonial = testimonials[currentIndex];
    
    return (
      <div className="relative" style={{ margin: '0 -2rem' }}>
        {/* Full Section Background with Gradient */}
        <div 
          className="relative overflow-hidden transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 24, 32, 0.95) 0%, rgba(90, 20, 25, 0.98) 20%, rgba(40, 15, 18, 1) 50%, rgba(18, 10, 12, 1) 80%, #000000 100%)',
            padding: '80px 60px',
          }}
        >
          {/* Decorative Rounded Corner Border Frame */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '3px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '60px',
            }}
          ></div>

          {/* Subtle gradient overlay for depth */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 15% 20%, rgba(176, 31, 36, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(139, 24, 32, 0.08) 0%, transparent 50%)',
              opacity: 0.5,
            }}
          ></div>

          <div className="relative z-10 mx-auto" style={{ maxWidth: 'var(--container-nav)' }}>
            
            {/* Top Section: Quote Icon & Hashtags */}
            <div className="flex items-start justify-between mb-16">
              {/* Opening Quote Icon - White Block */}
              <div 
                className="bg-white flex-shrink-0"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 28V16C10 12 12 10 16 10H18V14H16C14 14 14 14 14 16V18H20V28H10Z" fill="#000000"/>
                  <path d="M28 28V16C28 12 30 10 34 10H36V14H34C32 14 32 14 32 16V18H38V28H28Z" fill="#000000"/>
                </svg>
              </div>

              {/* Hashtags - Top Right */}
              <div className="flex flex-wrap gap-6 justify-end items-start pt-2">
                <span 
                  className="text-white/60"
                  style={{ 
                    fontSize: '16px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                  }}
                >
                  #market-research
                </span>
                <span 
                  className="text-white/60"
                  style={{ 
                    fontSize: '16px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                  }}
                >
                  #testimonial
                </span>
                <span 
                  className="text-white/60"
                  style={{ 
                    fontSize: '16px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                  }}
                >
                  #ipo-readiness
                </span>
              </div>
            </div>

            {/* Middle: Quote with Vertical Line */}
            <div className="mb-16 px-8">
              <div className="flex gap-12 items-start" style={{ maxWidth: 'var(--container-narrow)' }}>
                {/* Vertical Line - Left Side */}
                <div 
                  style={{
                    width: '3px',
                    minHeight: '200px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '2px',
                    flexShrink: 0,
                  }}
                ></div>

                {/* Quote Text */}
                <blockquote 
                  className="text-white/90 leading-[1.5]"
                  style={{ 
                    fontSize: 'clamp(24px, 3.5vw, 38px)',
                    fontWeight: '300',
                    letterSpacing: '-0.02em',
                    fontFamily: "'Noto Serif', serif",
                  }}
                >
                  Ken Research helped us <span style={{ fontWeight: '700', color: 'rgba(255, 255, 255, 1)' }}>quantify our addressable opportunity</span>, build a sharper product strategy, and clearly articulate our <span style={{ fontWeight: '700', color: 'rgba(255, 255, 255, 1)' }}>competitive strengths</span>. Their analysis played a key role in our next-stage discussions with investors.
                </blockquote>
              </div>
            </div>

            {/* Bottom Section: Author & Closing Quote */}
            <div className="flex items-end justify-between px-8">
              {/* Author Attribution - Bottom Left */}
              <div className="flex flex-col gap-3">
                <div 
                  className="text-white/70"
                  style={{ 
                    fontSize: '18px',
                    letterSpacing: '0.3px',
                    fontWeight: '400',
                  }}
                >
                  - {testimonial.author}
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="transition-all duration-300"
                      style={{
                        width: '16px',
                        height: '16px',
                        fill: 'rgba(255, 255, 255, 0.75)',
                        color: 'rgba(255, 255, 255, 0.75)',
                        strokeWidth: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Closing Quote Icon - White Block - Bottom Right */}
              <div 
                className="bg-white flex-shrink-0"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M38 20V32C38 36 36 38 32 38H30V34H32C34 34 34 34 34 32V30H28V20H38Z" fill="#000000"/>
                  <path d="M20 20V32C20 36 18 38 14 38H12V34H14C16 34 16 34 16 32V30H10V20H20Z" fill="#000000"/>
                </svg>
              </div>
            </div>

            {/* Pagination Dots - Bottom Center */}
            <div className="flex items-center justify-center gap-3 pt-12 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="transition-all duration-300"
                  style={{
                    width: currentIndex === index ? '40px' : '10px',
                    height: '3px',
                    borderRadius: '2px',
                    background: currentIndex === index 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(255, 255, 255, 0.25)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'card':
        return renderCardVariant();
      case 'dribbble-card':
        return renderDribbbleCardVariant();
      case 'gradient-hero':
        return renderGradientHeroVariant();
      default:
        return renderCardVariant();
    }
  };

  return (
    <section 
      id="testimonial"
      className="border-t relative" 
      style={{ 
        paddingTop: 'var(--section-py-standard)', 
        paddingBottom: 'var(--section-py-standard)',
        background: variant === 'gradient-hero' 
          ? 'linear-gradient(180deg, rgba(18, 10, 12, 1) 0%, rgba(10, 10, 12, 1) 50%, #000000 100%)' 
          : '#ffffff',
        borderTopColor: variant === 'gradient-hero' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Variant Switcher */}
      {enableVariantSwitcher && (
        <SubtleVariantSwitcher
          sectionName="Client Endorsement"
          currentVariant={variant}
          variants={variants}
          onVariantChange={setVariant}
          position="top-right"
        />
      )}

      <Container className="relative z-10">
        {/* Section Label */}
        <div style={{ marginBottom: 'var(--section-header-mb)' }}>
          <span 
            className="font-normal uppercase block" 
            style={{ 
              fontSize: '15px',
              letterSpacing: '1.8px',
              lineHeight: '1.6',
              color: variant === 'gradient-hero' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.6)',
              marginBottom: 'var(--pair-label-heading)'
            }}
          >
            Client Endorsement
          </span>
        </div>

        {/* Variant Content */}
        {renderVariant()}
      </Container>
    </section>
  );
}