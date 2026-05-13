import { useState } from 'react';
import yashLogo from "figma:asset/faa51f6035eb6438eb4b8b0be770366215f25dc2.png";
import { ArrowRight } from 'lucide-react';
import { InlineLink } from '@/app/components/InlineLink';
import { SubtleVariantSwitcher } from '@/app/components/SubtleVariantSwitcher';
import { BackgroundHighlight } from '@/app/components/BackgroundHighlight';
import CheckIcon from '@/imports/CheckIcon';
import { SectionLabel } from '@/app/components/Badge';
import { Container } from './Container';

// Content block types
type ContentBlock = 
  | { type: 'heading'; text: string; size?: 'large' | 'medium' }
  | { type: 'paragraph'; text: string; hasLinks?: boolean }
  | { type: 'list'; items: string[]; style?: 'numbered' | 'inline' | 'bullets' }
  | { type: 'highlight'; text: string };

interface ClientContextSectionProps {
  variant?: 'full' | 'split-content' | 'minimal-sticky' | 'compact-inline';
  companyName?: string;
  industry?: string;
  logo?: string;
  contentBlocks?: ContentBlock[];
  showCTA?: boolean;
  ctaText?: string;
  enableVariantSwitcher?: boolean;
}

const DEFAULT_CONTENT: ContentBlock[] = [
  {
    type: 'heading',
    text: 'A vertically integrated manufacturer of high-voltage condenser and non-condenser bushings serving utilities, transformer OEMs, and EPC companies across India.'
  },
  {
    type: 'paragraph',
    text: "India's power transmission sector is undergoing accelerated modernization, driven by utility expansions, renewable energy integration, and grid reliability mandates. In this environment, the demand for transformer bushings—especially high-voltage and condenser variants—has become increasingly strategic.",
    hasLinks: true
  },
  {
    type: 'paragraph',
    text: 'Yash Highvoltage Insulators is positioned as one of the few domestic players with:'
  },
  {
    type: 'list',
    items: [
      'Deep engineering capability in HV condenser bushings',
      'Vertical integration across ceramic, insulation, and assembly processes',
      'Faster turnaround relative to imported alternatives, especially from Europe',
      'Ability to deliver fully customized and retrofit-grade products'
    ]
  },
  {
    type: 'paragraph',
    text: 'Despite strong product and technical maturity, the leadership faced strategic blind spots around market sizing, competitive positioning, supply chain risks, and investor narrative development.'
  }
];

/**
 * ClientContextSection Component
 * 
 * Modular section with 4 layout variants.
 * Features inline link highlighting and responsive design.
 * 
 * Variants:
 * 1. full - Complete layout with all elements
 * 2. split-content - Left: Identity+Overview, Right: Context
 * 3. minimal-sticky - No logo, minimal left, text-heavy right
 * 4. compact-inline - Capabilities integrated inline
 */
export function ClientContextSection({ 
  variant: initialVariant = 'full',
  companyName = 'Yash Highvoltage Insulators',
  industry = 'Power Transmission & Electrical Equipment',
  logo = yashLogo,
  contentBlocks = DEFAULT_CONTENT,
  showCTA = true,
  ctaText = 'View Full Profile',
  enableVariantSwitcher = true
}: ClientContextSectionProps) {
  const [variant, setVariant] = useState(initialVariant);

  const variants = [
    { id: 'full', label: 'Full Featured', description: 'Complete layout with all elements' },
    { id: 'split-content', label: 'Split Content', description: 'Left: Identity, Right: Context' },
    { id: 'minimal-sticky', label: 'Minimal Sticky', description: 'No logo, text-focused' },
    { id: 'compact-inline', label: 'Compact Inline', description: 'Capabilities integrated' }
  ];

  // Helper to add inline links to paragraphs (demo purposes)
  const renderParagraphWithLinks = (text: string, hasLinks: boolean = false) => {
    if (!hasLinks) return text;

    // Demo: Highlight specific terms with inline links
    const linkTerms = [
      { term: 'power transmission sector', url: '#' },
      { term: 'renewable energy integration', url: '#' },
      { term: 'transformer bushings', url: '#' }
    ];

    let parts: React.ReactNode[] = [];
    let remainingText = text;
    let key = 0;

    linkTerms.forEach(({ term, url }) => {
      const index = remainingText.toLowerCase().indexOf(term.toLowerCase());
      if (index !== -1) {
        // Add text before the link
        if (index > 0) {
          parts.push(remainingText.slice(0, index));
        }
        // Add the link
        const actualTerm = remainingText.slice(index, index + term.length);
        parts.push(
          <InlineLink key={`link-${key++}`} href={url}>
            {actualTerm}
          </InlineLink>
        );
        // Update remaining text
        remainingText = remainingText.slice(index + term.length);
      }
    });

    // Add any remaining text
    if (remainingText) {
      parts.push(remainingText);
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  // Render functions for each variant
  const renderVariant = () => {
    switch (variant) {
      case 'full':
        return renderFullVariant();
      case 'split-content':
        return renderSplitContentVariant();
      case 'minimal-sticky':
        return renderMinimalStickyVariant();
      case 'compact-inline':
        return renderCompactInlineVariant();
      default:
        return renderFullVariant();
    }
  };

  // VARIANT 1: Full Featured (Current + Improvements)
  const renderFullVariant = () => {
    const headingBlock = contentBlocks.find(b => b.type === 'heading');
    const paragraphBlocks = contentBlocks.filter(b => b.type === 'paragraph');
    const listBlock = contentBlocks.find(b => b.type === 'list') as { type: 'list'; items: string[] } | undefined;
    const lastParagraph = paragraphBlocks[paragraphBlocks.length - 1];

    return (
      <>
        {/* Company Header - Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-black/10">
          {/* Left: Logo & Identity (Sticky on desktop, stack on mobile) */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-8">
              <img src={logo} alt={`${companyName} Logo`} className="h-11 md:h-12 mb-5 rounded-[2.5px]" />
              
              <div className="space-y-2.5">
                <div>
                  <h3 className="font-semibold text-black leading-[1.3]" style={{ fontSize: 'var(--text-base)' }}>
                    {companyName}
                  </h3>
                </div>
                
                <div className="h-px w-12 bg-black/20"></div>
                
                <div>
                  <p className="text-black/60 leading-[1.4]" style={{ fontSize: 'var(--text-xs)' }}>
                    {industry}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Company Overview */}
          <div className="md:col-span-8">
            {headingBlock && (
              <p 
                className="leading-[1.45] font-normal text-black/90" 
                style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(19px, 2.8vw, 24px)' }}
              >
                {headingBlock.text}
              </p>
            )}
          </div>
        </div>

        {/* Market Context - Narrative Flow */}
        <div style={{ marginBottom: 'var(--pair-description-subheading)' }}>
          <div className="space-y-3.5 md:space-y-4">
            {paragraphBlocks.slice(0, -1).map((block, index) => (
              <p 
                key={index} 
                className="leading-[1.7] text-black/70 max-w-[780px]" 
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {renderParagraphWithLinks(block.text, block.hasLinks)}
              </p>
            ))}
          </div>
        </div>

        {/* Key Capabilities - Feature Grid */}
        {listBlock && (
          <div className="mb-6 md:mb-8">
            <div style={{ marginBottom: 'var(--pair-subheading-content)' }}>
              <h4 className="font-normal text-black leading-[1.3]" style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px' }}>
                Key Capabilities & Differentiators
              </h4>
            </div>
            
            <div className="space-y-2.5 md:space-y-3">
              {listBlock.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="group relative bg-black/[0.015] hover:bg-black/[0.025] border-l-2 border-black/10 hover:border-black/30 pl-5 pr-4 py-3.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Icon pointer - CheckIcon for modern clean look */}
                    <div 
                      className="text-black/40 group-hover:text-black/50 transition-colors flex-shrink-0 w-[14px] h-[14px]"
                      style={{ marginTop: '6px' }}
                    >
                      <CheckIcon />
                    </div>
                    
                    <p 
                      className="leading-[1.6] text-black/70 group-hover:text-black/90 transition-colors duration-300 flex-1" 
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Challenge - Highlighted */}
        {lastParagraph && (
          <div className="mb-6 md:mb-8">
            <div className="relative rounded-[5px] p-6 md:p-8 overflow-hidden" style={{ background: '#ffffff' }}>
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              
              <div className="relative">
                <p 
                  className="leading-[1.6] text-black/70 max-w-[700px]" 
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {lastParagraph.text}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // VARIANT 2: Split Content
  const renderSplitContentVariant = () => {
    const headingBlock = contentBlocks.find(b => b.type === 'heading');
    const paragraphBlocks = contentBlocks.filter(b => b.type === 'paragraph');

    return (
      <div className="grid md:grid-cols-5 gap-6 md:gap-12">
        {/* Left: Identity + Overview (Sticky on desktop) */}
        <div className="md:col-span-2">
          <div className="md:sticky md:top-8 space-y-5 md:space-y-6">
            <img src={logo} alt={`${companyName} Logo`} className="h-11 md:h-12 rounded-[2.5px]" />
            
            <div className="space-y-2.5">
              <h3 className="font-semibold text-black leading-[1.3]" style={{ fontSize: 'var(--text-base)' }}>
                {companyName}
              </h3>
              
              <div className="h-px w-12 bg-black/20"></div>
              
              <p className="text-black/60 leading-[1.4]" style={{ fontSize: 'var(--text-xs)' }}>
                {industry}
              </p>
            </div>

            {headingBlock && (
              <div className="pt-4 md:pt-5 border-t border-black/10">
                <p 
                  className="leading-[1.5] font-normal text-black/70" 
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {headingBlock.text}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Context Paragraphs */}
        <div className="md:col-span-3">
          <div className="space-y-3.5 md:space-y-4">
            {paragraphBlocks.map((block, index) => (
              <p 
                key={index} 
                className="leading-[1.7] text-black/70" 
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {renderParagraphWithLinks(block.text, block.hasLinks)}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // VARIANT 3: Minimal Sticky
  const renderMinimalStickyVariant = () => {
    const headingBlock = contentBlocks.find(b => b.type === 'heading');
    const paragraphBlocks = contentBlocks.filter(b => b.type === 'paragraph');

    return (
      <div className="grid md:grid-cols-5 gap-6 md:gap-12">
        {/* Left: Minimal Identity (Sticky on desktop) */}
        <div className="md:col-span-2">
          <div className="md:sticky md:top-8 space-y-2.5">
            <h3 className="font-light text-black leading-[1.2]" style={{ fontFamily: "'Noto Serif', serif", fontSize: 'var(--text-2xl)' }}>
              {companyName}
            </h3>
            
            <div className="h-px w-16 bg-black/20"></div>
            
            <p className="text-black/60 leading-[1.4]" style={{ fontSize: '13px' }}>
              {industry}
            </p>
          </div>
        </div>

        {/* Right: Overview + Context */}
        <div className="md:col-span-3 space-y-5 md:space-y-6 md:pt-1">
          {headingBlock && (
            <>
              <p 
                className="leading-[1.45] font-normal text-black/90" 
                style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(19px, 2.8vw, 24px)' }}
              >
                {headingBlock.text}
              </p>

              <div className="h-px bg-black/10"></div>
            </>
          )}

          <div className="space-y-3.5 md:space-y-4">
            {paragraphBlocks.map((block, index) => (
              <p 
                key={index} 
                className="leading-[1.7] text-black/70" 
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {renderParagraphWithLinks(block.text, block.hasLinks)}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // VARIANT 4: Compact Inline
  const renderCompactInlineVariant = () => {
    const paragraphBlocks = contentBlocks.filter(b => b.type === 'paragraph');
    const listBlock = contentBlocks.find(b => b.type === 'list') as { type: 'list'; items: string[] } | undefined;

    return (
      <div className="grid md:grid-cols-5 gap-6 md:gap-12">
        {/* Left: Minimal Identity (Sticky on desktop) */}
        <div className="md:col-span-2">
          <div className="md:sticky md:top-8 space-y-2.5">
            <h3 className="font-light text-black leading-[1.2]" style={{ fontFamily: "'Noto Serif', serif", fontSize: 'var(--text-xl)' }}>
              {companyName}
            </h3>
            
            <div className="h-px w-16 bg-black/20"></div>
            
            <p className="text-black/60 leading-[1.4]" style={{ fontSize: '13px' }}>
              {industry}
            </p>
          </div>
        </div>

        {/* Right: Mixed Content (Paragraphs + Inline Capabilities) */}
        <div className="md:col-span-3 space-y-5 md:space-y-6 md:pt-1">
          {/* First paragraphs */}
          {paragraphBlocks.slice(0, 2).map((block, index) => (
            <p 
              key={`para-${index}`} 
              className="leading-[1.7] text-black/70" 
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {renderParagraphWithLinks(block.text, block.hasLinks)}
            </p>
          ))}

          {/* Inline Capabilities */}
          {listBlock && (
            <div className="space-y-2.5">
              {listBlock.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3.5">
                  {/* Icon pointer - CheckIcon for modern clean look */}
                  <div 
                    className="text-black/40 flex-shrink-0 w-[14px] h-[14px]"
                    style={{ marginTop: '6px' }}
                  >
                    <CheckIcon />
                  </div>
                  <p 
                    className="leading-[1.6] text-black/70 flex-1" 
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Remaining paragraphs */}
          {paragraphBlocks.slice(2).map((block, index) => (
            <p 
              key={`para-after-${index}`} 
              className="leading-[1.7] text-black/70" 
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {block.text}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="client-context" className="relative overflow-hidden" style={{ background: '#ffffff', paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)' }}>
      {/* VARIANT-SPECIFIC PREMIUM BACKGROUND HIGHLIGHTING 
          Theme: Two-Palette Harmony for Optimal Readability
          Palette A: Light Red + Amber Mix (warm energy)
          Palette B: Lightest Periwinkle + Warm Mix (cool trust)
          Opacity: 10-18% for excellent text readability */}
      
      {/* Full Variant - Dual Palette Radial Harmony */}
      {variant === 'full' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 1. Center Foundation - Periwinkle + Warm Mix */}
          <div 
            className="absolute w-[1200px] h-[1000px] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(220, 215, 230, 0.16) 0%, rgba(215, 210, 220, 0.12) 35%, rgba(210, 205, 210, 0.08) 65%, transparent 85%)',
              filter: 'blur(90px)',
              opacity: 1
            }}
          />
          
          {/* 2. Top Left - Light Red + Amber Mix */}
          <div 
            className="absolute w-[750px] h-[750px] rounded-full"
            style={{
              top: '-12%',
              left: '-8%',
              background: 'radial-gradient(circle, rgba(230, 160, 95, 0.15) 0%, rgba(240, 180, 110, 0.11) 45%, transparent 75%)',
              filter: 'blur(85px)',
              opacity: 1
            }}
          />
          
          {/* 3. Bottom Right - Periwinkle + Warm Depth */}
          <div 
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              bottom: '-10%',
              right: '-6%',
              background: 'radial-gradient(circle, rgba(215, 210, 220, 0.14) 0%, rgba(210, 205, 215, 0.10) 50%, transparent 75%)',
              filter: 'blur(80px)',
              opacity: 1
            }}
          />
          
          {/* 4. Top Right - Light Red + Amber Accent */}
          <div 
            className="absolute w-[650px] h-[650px] rounded-full"
            style={{
              top: '-8%',
              right: '-5%',
              background: 'radial-gradient(circle, rgba(235, 170, 100, 0.13) 0%, rgba(240, 185, 115, 0.09) 48%, transparent 75%)',
              filter: 'blur(75px)',
              opacity: 1
            }}
          />
        </div>
      )}

      {/* Split-Content Variant - Dual Panel Two-Palette Balance */}
      {variant === 'split-content' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 1. Left Panel - Light Red + Amber Energy */}
          <div 
            className="absolute w-[750px] h-[1100px]"
            style={{
              top: '50%',
              left: '-10%',
              transform: 'translateY(-50%)',
              background: 'radial-gradient(ellipse 100% 70% at 0% 50%, rgba(230, 160, 95, 0.16) 0%, rgba(240, 180, 110, 0.12) 40%, transparent 75%)',
              filter: 'blur(85px)',
              opacity: 1
            }}
          />
          
          {/* 2. Right Panel - Periwinkle + Warm Trust */}
          <div 
            className="absolute w-[800px] h-[1050px]"
            style={{
              top: '50%',
              right: '-8%',
              transform: 'translateY(-50%)',
              background: 'radial-gradient(ellipse 100% 75% at 100% 50%, rgba(220, 215, 230, 0.15) 0%, rgba(215, 210, 220, 0.11) 45%, transparent 75%)',
              filter: 'blur(90px)',
              opacity: 1
            }}
          />
          
          {/* 3. Center Bridge - Soft Periwinkle + Warm Blend */}
          <div 
            className="absolute w-[850px] h-[850px] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(218, 213, 225, 0.12) 0%, rgba(215, 210, 220, 0.08) 55%, transparent 80%)',
              filter: 'blur(80px)',
              opacity: 1
            }}
          />
        </div>
      )}

      {/* Minimal-Sticky Variant - Vertical Two-Palette Flow */}
      {variant === 'minimal-sticky' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 1. Top - Periwinkle + Warm Clarity */}
          <div 
            className="absolute w-[1150px] h-[600px]"
            style={{
              top: '-12%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(220, 215, 230, 0.14) 0%, rgba(215, 210, 220, 0.10) 50%, transparent 80%)',
              filter: 'blur(85px)',
              opacity: 1
            }}
          />
          
          {/* 2. Center - Mixed Palette Core */}
          <div 
            className="absolute w-[1100px] h-[750px] rounded-full"
            style={{
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(225, 188, 165, 0.16) 0%, rgba(220, 195, 175, 0.12) 45%, rgba(215, 200, 185, 0.08) 70%, transparent 85%)',
              filter: 'blur(90px)',
              opacity: 1
            }}
          />
          
          {/* 3. Bottom - Light Red + Amber Depth */}
          <div 
            className="absolute w-[1100px] h-[550px]"
            style={{
              bottom: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse 85% 100% at 50% 100%, rgba(230, 165, 100, 0.14) 0%, rgba(235, 175, 110, 0.10) 55%, transparent 80%)',
              filter: 'blur(80px)',
              opacity: 1
            }}
          />
        </div>
      )}

      {/* Compact-Inline Variant - Horizontal Two-Palette Narrative */}
      {variant === 'compact-inline' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 1. Left - Light Red + Amber Opening */}
          <div 
            className="absolute w-[900px] h-[800px] rounded-full"
            style={{
              top: '50%',
              left: '-12%',
              transform: 'translateY(-50%)',
              background: 'radial-gradient(circle, rgba(235, 165, 100, 0.17) 0%, rgba(240, 180, 115, 0.13) 48%, transparent 75%)',
              filter: 'blur(85px)',
              opacity: 1
            }}
          />
          
          {/* 2. Center - Periwinkle + Warm Professional Core */}
          <div 
            className="absolute w-[1000px] h-[750px]"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(ellipse 70% 90% at 50% 50%, rgba(220, 215, 230, 0.16) 0%, rgba(215, 210, 220, 0.12) 45%, transparent 75%)',
              filter: 'blur(90px)',
              opacity: 1
            }}
          />
          
          {/* 3. Right - Mixed Palette Blend */}
          <div 
            className="absolute w-[850px] h-[850px] rounded-full"
            style={{
              top: '50%',
              right: '-10%',
              transform: 'translateY(-50%)',
              background: 'radial-gradient(circle, rgba(225, 190, 160, 0.14) 0%, rgba(220, 195, 170, 0.10) 50%, transparent 75%)',
              filter: 'blur(85px)',
              opacity: 1
            }}
          />
          
          {/* 4. Top Subtle Accent - Light Red + Amber Optimism */}
          <div 
            className="absolute w-[700px] h-[550px] rounded-full"
            style={{
              top: '-5%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(238, 175, 110, 0.11) 0%, rgba(242, 185, 120, 0.07) 60%, transparent 80%)',
              filter: 'blur(75px)',
              opacity: 1
            }}
          />
        </div>
      )}

      {/* Variant Switcher */}
      {enableVariantSwitcher && (
        <SubtleVariantSwitcher
          sectionName="Client Context"
          currentVariant={variant}
          variants={variants}
          onVariantChange={setVariant}
          position="top-right"
        />
      )}

      <Container className="relative z-10">
        {/* Section Label */}
        <div style={{ marginBottom: 'var(--pair-label-heading)' }}>
          <SectionLabel>Client Context</SectionLabel>
        </div>
        
        {/* Variant Content */}
        {renderVariant()}

        {/* CTA */}
        {showCTA && (
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-medium text-black/45 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Want to learn more?
                </p>
                <p className="text-black/70 leading-[1.6]" style={{ fontSize: 'var(--text-xs)' }}>
                  Explore the complete company profile and industry insights
                </p>
              </div>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-2.5 text-black/60 hover:text-black font-normal group whitespace-nowrap transition-colors duration-300"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}