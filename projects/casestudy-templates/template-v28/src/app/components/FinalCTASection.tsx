import svgPaths from "@/imports/svg-oz6ytj1r6m";
import { Button } from '@/app/components/Button';
import { ContactModal } from '@/app/components/ContactModal';
import { SubtleVariantSwitcher } from '@/app/components/SubtleVariantSwitcher';
import { Container } from './Container';
import { useState } from 'react';

/**
 * FINAL CONVERSION SECTION
 * =================================================
 * 
 * Two elegant variants:
 * - Light: Clean white background with sophisticated multi-color highlighting
 * - Dark: Deep dark background with vibrant multi-color gradients
 * 
 * Both maintain minimal, professional aesthetic with subtle depth
 */

interface FinalCTASectionProps {
  variant?: 'light' | 'dark';
  enableVariantSwitcher?: boolean;
}

export function FinalCTASection({ 
  variant: initialVariant = 'light',
  enableVariantSwitcher = false
}: FinalCTASectionProps) {
  const [variant, setVariant] = useState(initialVariant);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Variant options for switcher
  const variants = [
    { id: 'light', label: 'Light', description: 'Clean white background' },
    { id: 'dark', label: 'Dark', description: 'Deep black background' }
  ];

  // Variant-specific styles
  const isDark = variant === 'dark';
  
  const backgroundColor = isDark ? '#0a0a0a' : '#fefdfd';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'var(--warm-900)';
  const headingColor = isDark ? 'white' : 'black';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';

  return (
    <>
      <section 
        id="final-cta"
        className="border-t relative" 
        style={{ 
          paddingTop: 'var(--section-py-standard)', 
          paddingBottom: 'var(--section-py-standard)',
          background: backgroundColor,
          borderColor: borderColor,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 400ms ease, border-color 400ms ease'
        }}
      >
        {/* Variant Switcher */}
        {enableVariantSwitcher && (
          <SubtleVariantSwitcher
            sectionName="Final CTA"
            currentVariant={variant}
            variants={variants}
            onVariantChange={(variantId) => setVariant(variantId as 'light' | 'dark')}
            position="top-right"
          />
        )}

        {/* Light Variant - Subtle Sophisticated Highlighting */}
        {!isDark && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multi-color sophisticated highlighting with depth */}
            
            {/* 1. Center spotlight - Brand Red with warmth */}
            <div 
              className="absolute w-[900px] h-[900px] rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(176, 31, 36, 0.08) 0%, rgba(251, 146, 60, 0.05) 30%, rgba(234, 179, 8, 0.03) 50%, transparent 70%)',
                filter: 'blur(80px)',
                opacity: 0.95
              }}
            ></div>
            
            {/* 2. Top-left - Coral to Purple gradient for sophistication */}
            <div 
              className="absolute w-[700px] h-[700px] rounded-full"
              style={{
                top: '-25%',
                left: '-12%',
                background: 'radial-gradient(circle, rgba(251, 146, 60, 0.12) 0%, rgba(244, 114, 182, 0.08) 35%, rgba(168, 85, 247, 0.06) 55%, transparent 75%)',
                filter: 'blur(90px)',
                opacity: 0.85
              }}
            ></div>
            
            {/* 3. Top-right - Blue to teal for contrast */}
            <div 
              className="absolute w-[650px] h-[650px] rounded-full"
              style={{
                top: '-20%',
                right: '-8%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(20, 184, 166, 0.07) 40%, rgba(16, 185, 129, 0.04) 60%, transparent 75%)',
                filter: 'blur(85px)',
                opacity: 0.8
              }}
            ></div>
            
            {/* 4. Bottom-left - Emerald to amber warmth */}
            <div 
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                bottom: '-18%',
                left: '5%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, rgba(234, 179, 8, 0.07) 40%, rgba(251, 146, 60, 0.05) 60%, transparent 75%)',
                filter: 'blur(75px)',
                opacity: 0.78
              }}
            ></div>
            
            {/* 5. Bottom-right - Purple to pink sophistication */}
            <div 
              className="absolute w-[650px] h-[650px] rounded-full"
              style={{
                bottom: '-20%',
                right: '-5%',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.11) 0%, rgba(217, 70, 239, 0.08) 35%, rgba(244, 114, 182, 0.06) 55%, transparent 75%)',
                filter: 'blur(88px)',
                opacity: 0.82
              }}
            ></div>
            
            {/* 6. Center-left accent - Red to orange energy */}
            <div 
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                top: '35%',
                left: '8%',
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.10) 0%, rgba(251, 146, 60, 0.07) 45%, transparent 70%)',
                filter: 'blur(70px)',
                opacity: 0.75
              }}
            ></div>
            
            {/* 7. Center-right accent - Cyan to blue freshness */}
            <div 
              className="absolute w-[520px] h-[520px] rounded-full"
              style={{
                top: '38%',
                right: '10%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.09) 0%, rgba(59, 130, 246, 0.06) 45%, transparent 70%)',
                filter: 'blur(72px)',
                opacity: 0.72
              }}
            ></div>

            {/* 8. Top-center golden accent for warmth */}
            <div 
              className="absolute w-[450px] h-[450px] rounded-full"
              style={{
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 70%)',
                filter: 'blur(65px)',
                opacity: 0.7
              }}
            ></div>

            {/* Decorative top border gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.20) 15%, rgba(176, 31, 36, 0.25) 35%, rgba(234, 179, 8, 0.20) 50%, rgba(59, 130, 246, 0.20) 65%, rgba(244, 114, 182, 0.18) 85%, transparent 100%)',
                opacity: 0.6
              }}
            ></div>
            
            {/* Subtle bottom border gradient */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.15) 25%, rgba(234, 179, 8, 0.18) 50%, rgba(168, 85, 247, 0.15) 75%, transparent 100%)',
                opacity: 0.5
              }}
            ></div>
          </div>
        )}

        {/* Dark Variant - Diagonal Cascade Pattern (Brand Colors: Red, Warm, Amber) */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Premium Banner Effect - Strategic Brand Color Composition */}
            
            {/* 1. Central Spotlight - Brand Red Core (Primary Focus) */}
            <div 
              className="absolute w-[1100px] h-[800px]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(176, 31, 36, 0.35) 0%, rgba(210, 57, 64, 0.22) 28%, rgba(142, 16, 20, 0.12) 52%, transparent 75%)',
                filter: 'blur(160px)',
                opacity: 0.95
              }}
            ></div>

            {/* 2. Left Drama - Deep Red Intensity */}
            <div 
              className="absolute w-[950px] h-[950px] rounded-full"
              style={{
                top: '50%',
                left: '-22%',
                transform: 'translateY(-50%)',
                background: 'radial-gradient(circle, rgba(142, 16, 20, 0.42) 0%, rgba(176, 31, 36, 0.28) 35%, rgba(210, 57, 64, 0.16) 58%, transparent 78%)',
                filter: 'blur(145px)',
                opacity: 0.88
              }}
            ></div>

            {/* 3. Right Warmth - Amber Energy */}
            <div 
              className="absolute w-[900px] h-[900px] rounded-full"
              style={{
                top: '50%',
                right: '-20%',
                transform: 'translateY(-50%)',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.38) 0%, rgba(251, 191, 36, 0.25) 38%, rgba(251, 146, 60, 0.14) 62%, transparent 80%)',
                filter: 'blur(140px)',
                opacity: 0.85
              }}
            ></div>

            {/* 4. Top Glow - Warm Sophistication */}
            <div 
              className="absolute w-[1400px] h-[380px]"
              style={{
                top: '-12%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(200, 188, 184, 0.22) 0%, rgba(236, 218, 206, 0.14) 40%, transparent 70%)',
                filter: 'blur(120px)',
                opacity: 0.75
              }}
            ></div>

            {/* 5. Bottom Foundation - Red to Amber Blend */}
            <div 
              className="absolute w-[1500px] h-[420px]"
              style={{
                bottom: '-15%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse 75% 100% at 50% 100%, rgba(176, 31, 36, 0.28) 0%, rgba(234, 179, 8, 0.18) 45%, rgba(251, 191, 36, 0.10) 70%, transparent 85%)',
                filter: 'blur(155px)',
                opacity: 0.82
              }}
            ></div>

            {/* 6. Left-Center Accent - Coral Warmth */}
            <div 
              className="absolute w-[620px] h-[620px] rounded-full"
              style={{
                top: '42%',
                left: '8%',
                transform: 'translateY(-50%)',
                background: 'radial-gradient(circle, rgba(217, 101, 72, 0.26) 0%, rgba(234, 122, 95, 0.16) 50%, transparent 75%)',
                filter: 'blur(110px)',
                opacity: 0.72
              }}
            ></div>

            {/* 7. Right-Center Accent - Amber Glow */}
            <div 
              className="absolute w-[580px] h-[580px] rounded-full"
              style={{
                top: '45%',
                right: '10%',
                transform: 'translateY(-50%)',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.24) 0%, rgba(234, 179, 8, 0.14) 52%, transparent 76%)',
                filter: 'blur(105px)',
                opacity: 0.70
              }}
            ></div>

            {/* 8. Cinematic Vignette - Top Edge */}
            <div 
              className="absolute w-full h-[180px]"
              style={{
                top: 0,
                left: 0,
                background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.40) 50%, transparent 100%)',
                opacity: 0.6
              }}
            ></div>

            {/* 9. Cinematic Vignette - Bottom Edge */}
            <div 
              className="absolute w-full h-[200px]"
              style={{
                bottom: 0,
                left: 0,
                background: 'linear-gradient(0deg, rgba(10, 10, 10, 0.90) 0%, rgba(10, 10, 10, 0.45) 55%, transparent 100%)',
                opacity: 0.65
              }}
            ></div>

            {/* 10. Premium Border Glow - Top */}
            <div 
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(176, 31, 36, 0.35) 20%, rgba(234, 179, 8, 0.40) 50%, rgba(176, 31, 36, 0.35) 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(176, 31, 36, 0.25)',
                opacity: 0.85
              }}
            ></div>

            {/* 11. Subtle Border Glow - Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.30) 25%, rgba(176, 31, 36, 0.35) 50%, rgba(251, 191, 36, 0.28) 75%, transparent 100%)',
                boxShadow: '0 0 16px rgba(234, 179, 8, 0.20)',
                opacity: 0.70
              }}
            ></div>
          </div>
        )}

        <Container width="narrow" className="relative z-10 text-center">
          <span 
            className="font-normal uppercase mb-6 md:mb-8 block transition-colors duration-400" 
            style={{ 
              fontSize: '15px',
              letterSpacing: '1.8px',
              lineHeight: '1.6',
              color: labelColor
            }}
          >
            Let's Connect
          </span>
          
          <h2 
            className="leading-[1.15] font-light mb-6 md:mb-8 tracking-tight transition-colors duration-400" 
            style={{ 
              fontFamily: "'Noto Serif', serif", 
              fontSize: 'clamp(1.75rem, 5vw, var(--text-3xl))',
              color: headingColor
            }}
          >
            Clarity for Your Next Strategic Move
          </h2>
          
          <p 
            className="leading-[1.7] mb-10 md:mb-12 max-w-[700px] mx-auto transition-colors duration-400" 
            style={{ 
              fontSize: 'var(--text-base)',
              color: textColor
            }}
          >
            We help leadership teams navigate market uncertainty with structured insights, rigorous analysis, and practical guidance tailored to your objectives.
          </p>
          
          {/* Single CTA Button */}
          <div className="flex items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              fullWidth={false}
              onClick={() => setIsModalOpen(true)}
              animatedArrow
            >
              Schedule a Discovery Call
            </Button>
          </div>
        </Container>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}