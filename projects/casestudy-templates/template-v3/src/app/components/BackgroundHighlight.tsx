/**
 * BackgroundHighlight Component
 * ================================
 * Reusable sophisticated background highlighting system using exclusive brand colors.
 * Apply to any section for premium editorial aesthetics with WCAG AAA compliance.
 * 
 * DOCUMENTATION: See /BACKGROUND_THEMES_DOCUMENTATION.md for complete guide
 * 
 * SECTION MAPPING:
 * - Section 1 (Hero): theme="hero-dark" on Black (#0a0a0a)
 * - Section 2 (Client Context): theme="multi-color-sophisticated" on White (#ffffff)
 * - Section 3 (Challenges): Solid background (#f5f2f1) - no theme
 * - Section 4 (Objectives): theme="objectives-energy" on White (#ffffff)
 * - Section 5 (Methodology): Solid background (#f9f7f6) - no theme
 * - Section 6 (Impact): theme="growth-impact" on White (#ffffff)
 * - Section 7 (Endorsement): Solid background with hover effects - no theme
 * - Section 8 (Final CTA): Custom implementation in FinalCTASection.tsx
 * - Section 9 (Resources): Custom implementation in ResourcesSection.tsx
 * 
 * BRAND COLORS (Primary):
 * - Ken Red: #b01f24 (Red 700) - Brand identity, confidence, power
 * - Amber: #eab308 (Amber 500) - Energy, optimism, achievement
 * - Warm: #b79fa3 (Warm 700) - Editorial sophistication, neutral elegance
 * - Coral: #ea7a5f (Coral 600) - Warmth, approachability, friendliness
 * 
 * SUPPORTING COLORS:
 * - True V Purple: #9488ec (Purple 500) - Innovation, premium, technology
 * - Periwinkle: #c3c6f9 (Periwinkle 500) - Trust, professionalism, reliability
 * - Perano: #c8dff7 (Perano 500) - Light professionalism, open space
 * 
 * USAGE:
 * <BackgroundHighlight theme="objectives-energy" />
 * 
 * Last Updated: January 28, 2026
 */

interface BackgroundHighlightProps {
  theme?: 'multi-color-sophisticated' | 'red-purple-energy' | 'periwinkle-trust' | 'warm-editorial' | 'purple-premium' | 'red-power' | 'objectives-energy' | 'objectives-energy-subtle' | 'objectives-premium' | 'impact-success' | 'growth-impact' | 'endorsement-trust' | 'hero-dark' | 'hero-light' | 'hero-pure-black';
}

export function BackgroundHighlight({ theme = 'multi-color-sophisticated' }: BackgroundHighlightProps) {
  const themes = {
    /**
     * THEME 1: Multi-Color Sophisticated (Default) ✨
     * =================================================
     * USED IN: Section 2 - Client Context Section
     * Perfect for: Case studies, client stories, comprehensive content
     * Mood: Balanced, professional, warm yet trustworthy
     * Background: White (#ffffff)
     * Colors: All brand colors in harmony - Red, Purple, Periwinkle, Coral, Amber
     * Blur: 70-90px | Opacity: 0.75-0.95
     */
    'multi-color-sophisticated': (
      <>
        {/* Center spotlight - Brand Red with warmth */}
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
        />
        
        {/* Top-left - Light Red to Light Purple gradient */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-25%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(251, 209, 210, 0.12) 0%, rgba(239, 237, 253, 0.08) 35%, rgba(247, 246, 254, 0.06) 55%, transparent 75%)',
            filter: 'blur(90px)',
            opacity: 0.85
          }}
        />
        
        {/* Top-right - Periwinkle to Perano trust blend */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            top: '-20%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.10) 0%, rgba(223, 234, 250, 0.07) 40%, rgba(200, 223, 245, 0.04) 60%, transparent 75%)',
            filter: 'blur(85px)',
            opacity: 0.8
          }}
        />
        
        {/* Bottom-left - Coral to warm editorial blend */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            bottom: '-18%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(249, 155, 133, 0.09) 0%, rgba(217, 101, 72, 0.07) 40%, rgba(200, 188, 184, 0.05) 60%, transparent 75%)',
            filter: 'blur(75px)',
            opacity: 0.78
          }}
        />
        
        {/* Bottom-right - Light Purple to Light Periwinkle */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '-20%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(223, 220, 251, 0.11) 0%, rgba(235, 237, 253, 0.08) 35%, rgba(245, 246, 253, 0.06) 55%, transparent 75%)',
            filter: 'blur(88px)',
            opacity: 0.82
          }}
        />
        
        {/* Center-left accent - Red to coral energy */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '35%',
            left: '8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.10) 0%, rgba(249, 155, 133, 0.07) 45%, transparent 70%)',
            filter: 'blur(70px)',
            opacity: 0.75
          }}
        />
        
        {/* Center-right accent - Perano to purple clarity */}
        <div 
          className="absolute w-[520px] h-[520px] rounded-full"
          style={{
            top: '38%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(200, 223, 245, 0.09) 0%, rgba(148, 136, 236, 0.06) 45%, transparent 70%)',
            filter: 'blur(72px)',
            opacity: 0.72
          }}
        />

        {/* Top-center warm accent */}
        <div 
          className="absolute w-[450px] h-[450px] rounded-full"
          style={{
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.08) 0%, rgba(251, 184, 167, 0.05) 50%, transparent 70%)',
            filter: 'blur(65px)',
            opacity: 0.7
          }}
        />

        {/* Top border gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(148, 136, 236, 0.20) 15%, rgba(176, 31, 36, 0.25) 35%, rgba(234, 122, 95, 0.20) 50%, rgba(195, 198, 249, 0.20) 65%, rgba(228, 109, 114, 0.18) 85%, transparent 100%)',
            opacity: 0.6
          }}
        />
        
        {/* Bottom border gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200, 223, 245, 0.15) 25%, rgba(249, 155, 133, 0.18) 50%, rgba(148, 136, 236, 0.15) 75%, transparent 100%)',
            opacity: 0.5
          }}
        />
      </>
    ),

    /**
     * THEME 2: Red-Purple Energy
     * Perfect for: Impact sections, results, achievements
     * Mood: Bold, confident, powerful
     * Colors: Ken Red 500-700 + True V Purple 500 + Amber accents
     */
    'red-purple-energy': (
      <>
        {/* Center - Bold Red spotlight */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.12) 0%, rgba(210, 57, 64, 0.08) 40%, rgba(148, 136, 236, 0.06) 65%, transparent 80%)',
            filter: 'blur(85px)',
            opacity: 0.9
          }}
        />
        
        {/* Top-left - Purple power */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            top: '-22%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(148, 136, 236, 0.14) 0%, rgba(176, 31, 36, 0.09) 50%, transparent 75%)',
            filter: 'blur(80px)',
            opacity: 0.85
          }}
        />
        
        {/* Top-right - Red to Amber warmth */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-18%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.11) 0%, rgba(234, 179, 8, 0.07) 45%, transparent 70%)',
            filter: 'blur(75px)',
            opacity: 0.82
          }}
        />
        
        {/* Bottom-left - Deep Purple */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            bottom: '-20%',
            left: '3%',
            background: 'radial-gradient(circle, rgba(128, 108, 224, 0.10) 0%, rgba(148, 136, 236, 0.08) 40%, transparent 70%)',
            filter: 'blur(82px)',
            opacity: 0.78
          }}
        />
        
        {/* Bottom-right - Red energy */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '-18%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.11) 0%, rgba(228, 109, 114, 0.07) 45%, transparent 70%)',
            filter: 'blur(78px)',
            opacity: 0.8
          }}
        />

        {/* Top border - Bold red to purple */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(176, 31, 36, 0.28) 25%, rgba(148, 136, 236, 0.25) 50%, rgba(210, 57, 64, 0.22) 75%, transparent 100%)',
            opacity: 0.7
          }}
        />
      </>
    ),

    /**
     * THEME 3: Periwinkle Trust
     * Perfect for: Methodology, process sections, trust-building content
     * Mood: Professional, calm, trustworthy, clean
     * Colors: Periwinkle 500 + White + True V Purple 400 + subtle Perano
     */
    'periwinkle-trust': (
      <>
        {/* Center - Cool periwinkle foundation */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.10) 0%, rgba(223, 234, 250, 0.07) 45%, rgba(255, 255, 255, 0.03) 70%, transparent 85%)',
            filter: 'blur(88px)',
            opacity: 0.92
          }}
        />
        
        {/* Top-left - Light Purple clarity */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-23%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(239, 237, 253, 0.12) 0%, rgba(235, 237, 253, 0.09) 40%, transparent 75%)',
            filter: 'blur(85px)',
            opacity: 0.88
          }}
        />
        
        {/* Top-right - Perano trust */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '-20%',
            right: '-9%',
            background: 'radial-gradient(circle, rgba(223, 234, 250, 0.11) 0%, rgba(200, 223, 245, 0.08) 42%, transparent 73%)',
            filter: 'blur(83px)',
            opacity: 0.84
          }}
        />
        
        {/* Bottom-left - Periwinkle depth */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '-19%',
            left: '4%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.11) 0%, rgba(164, 169, 246, 0.08) 45%, transparent 72%)',
            filter: 'blur(80px)',
            opacity: 0.8
          }}
        />
        
        {/* Bottom-right - Light periwinkle */}
        <div 
          className="absolute w-[670px] h-[670px] rounded-full"
          style={{
            bottom: '-21%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(235, 237, 253, 0.10) 0%, rgba(245, 246, 253, 0.07) 40%, transparent 70%)',
            filter: 'blur(84px)',
            opacity: 0.82
          }}
        />

        {/* Center accent - Purple sophistication */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(148, 136, 236, 0.08) 0%, rgba(195, 198, 249, 0.05) 50%, transparent 75%)',
            filter: 'blur(72px)',
            opacity: 0.75
          }}
        />

        {/* Top border - Periwinkle gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(195, 198, 249, 0.22) 20%, rgba(223, 234, 250, 0.25) 50%, rgba(148, 136, 236, 0.20) 80%, transparent 100%)',
            opacity: 0.65
          }}
        />
      </>
    ),

    /**
     * THEME 4: Warm Editorial
     * Perfect for: Testimonials, stories, human-centered content
     * Mood: Warm, approachable, editorial elegance
     * Colors: Amber 500 + Coral 500 + Warm 700 + subtle White
     */
    'warm-editorial': (
      <>
        {/* Center - Warm amber glow */}
        <div 
          className="absolute w-[880px] h-[880px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.09) 0%, rgba(251, 191, 36, 0.06) 40%, rgba(249, 155, 133, 0.04) 65%, transparent 80%)',
            filter: 'blur(86px)',
            opacity: 0.93
          }}
        />
        
        {/* Top-left - Coral warmth */}
        <div 
          className="absolute w-[690px] h-[690px] rounded-full"
          style={{
            top: '-24%',
            left: '-11%',
            background: 'radial-gradient(circle, rgba(249, 155, 133, 0.11) 0%, rgba(251, 184, 167, 0.08) 42%, transparent 74%)',
            filter: 'blur(84px)',
            opacity: 0.86
          }}
        />
        
        {/* Top-right - Amber brightness */}
        <div 
          className="absolute w-[660px] h-[660px] rounded-full"
          style={{
            top: '-21%',
            right: '-9%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.10) 0%, rgba(234, 179, 8, 0.07) 45%, transparent 72%)',
            filter: 'blur(81px)',
            opacity: 0.83
          }}
        />
        
        {/* Bottom-left - Deep coral */}
        <div 
          className="absolute w-[640px] h-[640px] rounded-full"
          style={{
            bottom: '-20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(234, 122, 95, 0.10) 0%, rgba(217, 101, 72, 0.08) 43%, transparent 71%)',
            filter: 'blur(79px)',
            opacity: 0.81
          }}
        />
        
        {/* Bottom-right - Warm editorial blend */}
        <div 
          className="absolute w-[670px] h-[670px] rounded-full"
          style={{
            bottom: '-22%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.09) 0%, rgba(236, 218, 206, 0.06) 44%, transparent 73%)',
            filter: 'blur(82px)',
            opacity: 0.79
          }}
        />

        {/* Center warm accent */}
        <div 
          className="absolute w-[520px] h-[520px] rounded-full"
          style={{
            top: '42%',
            left: '48%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, rgba(249, 155, 133, 0.05) 48%, transparent 73%)',
            filter: 'blur(73px)',
            opacity: 0.76
          }}
        />

        {/* Top border - Warm gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(249, 155, 133, 0.23) 22%, rgba(234, 179, 8, 0.26) 50%, rgba(251, 184, 167, 0.21) 78%, transparent 100%)',
            opacity: 0.68
          }}
        />
      </>
    ),

    /**
     * THEME 5: Purple Premium
     * Perfect for: Premium services, innovation, technology
     * Mood: Sophisticated, premium, innovative
     * Colors: True V Purple 500 + Periwinkle 500 + Light Purple + White
     */
    'purple-premium': (
      <>
        {/* Center - Rich purple core */}
        <div 
          className="absolute w-[860px] h-[860px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(148, 136, 236, 0.11) 0%, rgba(128, 108, 224, 0.08) 42%, rgba(195, 198, 249, 0.05) 68%, transparent 82%)',
            filter: 'blur(87px)',
            opacity: 0.94
          }}
        />
        
        {/* Top-left - Light purple elegance */}
        <div 
          className="absolute w-[710px] h-[710px] rounded-full"
          style={{
            top: '-25%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(239, 237, 253, 0.13) 0%, rgba(223, 220, 251, 0.10) 41%, transparent 76%)',
            filter: 'blur(86px)',
            opacity: 0.87
          }}
        />
        
        {/* Top-right - Periwinkle clarity */}
        <div 
          className="absolute w-[685px] h-[685px] rounded-full"
          style={{
            top: '-22%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.12) 0%, rgba(164, 169, 246, 0.09) 43%, transparent 75%)',
            filter: 'blur(83px)',
            opacity: 0.85
          }}
        />
        
        {/* Bottom-left - Deep purple sophistication */}
        <div 
          className="absolute w-[655px] h-[655px] rounded-full"
          style={{
            bottom: '-21%',
            left: '4%',
            background: 'radial-gradient(circle, rgba(128, 108, 224, 0.11) 0%, rgba(148, 136, 236, 0.08) 44%, transparent 73%)',
            filter: 'blur(81px)',
            opacity: 0.82
          }}
        />
        
        {/* Bottom-right - Light purple finish */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            bottom: '-23%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(223, 220, 251, 0.10) 0%, rgba(245, 246, 253, 0.07) 42%, transparent 72%)',
            filter: 'blur(84px)',
            opacity: 0.83
          }}
        />

        {/* Center premium accent */}
        <div 
          className="absolute w-[510px] h-[510px] rounded-full"
          style={{
            top: '38%',
            left: '52%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(148, 136, 236, 0.09) 0%, rgba(195, 198, 249, 0.06) 47%, transparent 74%)',
            filter: 'blur(74px)',
            opacity: 0.77
          }}
        />

        {/* Top border - Purple premium */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(148, 136, 236, 0.24) 23%, rgba(195, 198, 249, 0.27) 50%, rgba(128, 108, 224, 0.22) 77%, transparent 100%)',
            opacity: 0.69
          }}
        />
      </>
    ),

    /**
     * THEME 6: Red Power
     * Perfect for: CTAs, urgent actions, key highlights
     * Mood: Bold, energetic, attention-grabbing
     * Colors: Ken Red 500-700 + Amber accents + Coral warmth
     */
    'red-power': (
      <>
        {/* Center - Bold red focus */}
        <div 
          className="absolute w-[820px] h-[820px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.13) 0%, rgba(210, 57, 64, 0.10) 40%, rgba(228, 109, 114, 0.06) 66%, transparent 81%)',
            filter: 'blur(84px)',
            opacity: 0.91
          }}
        />
        
        {/* Top-left - Deep red power */}
        <div 
          className="absolute w-[675px] h-[675px] rounded-full"
          style={{
            top: '-23%',
            left: '-11%',
            background: 'radial-gradient(circle, rgba(142, 16, 20, 0.12) 0%, rgba(176, 31, 36, 0.09) 43%, transparent 75%)',
            filter: 'blur(82px)',
            opacity: 0.86
          }}
        />
        
        {/* Top-right - Red to amber energy */}
        <div 
          className="absolute w-[645px] h-[645px] rounded-full"
          style={{
            top: '-19%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.11) 0%, rgba(234, 179, 8, 0.08) 46%, transparent 73%)',
            filter: 'blur(79px)',
            opacity: 0.84
          }}
        />
        
        {/* Bottom-left - Coral warmth */}
        <div 
          className="absolute w-[630px] h-[630px] rounded-full"
          style={{
            bottom: '-20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(234, 122, 95, 0.10) 0%, rgba(249, 155, 133, 0.08) 44%, transparent 72%)',
            filter: 'blur(77px)',
            opacity: 0.8
          }}
        />
        
        {/* Bottom-right - Light red glow */}
        <div 
          className="absolute w-[660px] h-[660px] rounded-full"
          style={{
            bottom: '-21%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(228, 109, 114, 0.10) 0%, rgba(251, 209, 210, 0.07) 43%, transparent 72%)',
            filter: 'blur(80px)',
            opacity: 0.81
          }}
        />

        {/* Center power accent */}
        <div 
          className="absolute w-[490px] h-[490px] rounded-full"
          style={{
            top: '41%',
            left: '49%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.11) 0%, rgba(210, 57, 64, 0.07) 48%, transparent 74%)',
            filter: 'blur(71px)',
            opacity: 0.78
          }}
        />

        {/* Top border - Red power */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(176, 31, 36, 0.29) 24%, rgba(210, 57, 64, 0.32) 50%, rgba(228, 109, 114, 0.26) 76%, transparent 100%)',
            opacity: 0.72
          }}
        />
      </>
    ),

    /**
     * THEME 7: Objectives Energy ⭐
     * ================================
     * USED IN: Section 4 - Engagement Objectives Section
     * Perfect for: Value pillars, strategic objectives, key initiatives, action-oriented content
     * Mood: Confident, energetic, bold yet professional
     * Background: White (#ffffff)
     * Pattern: Diagonal cascade with brand color dominance
     * Colors: Ken Red 500-700 + Warm 700 + Amber 500 + White
     * Blur: 115-145px (ultra-smooth) | Opacity: 0.70-0.85
     * 
     * COMPOSITION SPECS:
     * - 14 gradient blobs (balanced composition)
     * - Ken Red: 3 blobs, 580-620px, opacity 0.78-0.82, RGBA 0.08-0.10 (balanced visibility)
     * - Amber: Primary driver (30% distribution)
     * - Warm: Editorial sophistication (25% distribution)
     * - White: Clarity foundation (25% distribution)
     * - Ken Red: Visible confidence (20% distribution)
     * - Periwinkle: Trust accent (5% distribution)
     * - Works perfectly on white backgrounds
     */
    'objectives-energy': (
      <>
        {/* 1. Top-Left - Amber primary energy glow */}
        <div 
          className="absolute w-[750px] h-[750px] rounded-full"
          style={{
            top: '-14%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.14) 0%, rgba(251, 191, 36, 0.10) 40%, rgba(255, 255, 255, 0.05) 68%, transparent 82%)',
            filter: 'blur(68px)',
            opacity: 0.94
          }}
        />

        {/* 2. Top-Right - Warm editorial sophistication */}
        <div 
          className="absolute w-[780px] h-[780px] rounded-full"
          style={{
            top: '-16%',
            right: '-9%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.15) 0%, rgba(217, 209, 206, 0.11) 42%, rgba(236, 218, 206, 0.06) 68%, transparent 80%)',
            filter: 'blur(72px)',
            opacity: 0.92
          }}
        />

        {/* 3. Center-Left - White clarity foundation */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            top: '36%',
            left: '1%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(234, 179, 8, 0.08) 44%, rgba(200, 188, 184, 0.05) 70%, transparent 82%)',
            filter: 'blur(70px)',
            opacity: 0.88
          }}
        />

        {/* 4. Center-Right - Amber + Warm blend */}
        <div 
          className="absolute w-[760px] h-[760px] rounded-full"
          style={{
            top: '44%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.13) 0%, rgba(200, 188, 184, 0.10) 40%, rgba(217, 209, 206, 0.06) 66%, transparent 80%)',
            filter: 'blur(74px)',
            opacity: 0.90
          }}
        />

        {/* 5. Mid-Left - Warm + White sophistication */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '60%',
            left: '7%',
            background: 'radial-gradient(circle, rgba(183, 169, 163, 0.13) 0%, rgba(255, 255, 255, 0.09) 46%, rgba(236, 218, 206, 0.05) 70%, transparent 80%)',
            filter: 'blur(66px)',
            opacity: 0.86
          }}
        />

        {/* 6. Bottom-Center - Amber energy core */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            bottom: '16%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(251, 191, 36, 0.09) 44%, rgba(255, 255, 255, 0.05) 68%, transparent 80%)',
            filter: 'blur(68px)',
            opacity: 0.85
          }}
        />

        {/* 7. Bottom-Right - Warm editorial depth */}
        <div 
          className="absolute w-[710px] h-[710px] rounded-full"
          style={{
            bottom: '-11%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.14) 0%, rgba(183, 169, 163, 0.10) 42%, rgba(217, 209, 206, 0.06) 66%, transparent 80%)',
            filter: 'blur(69px)',
            opacity: 0.89
          }}
        />
        
        {/* 8. Center - White + Warm clarity core */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, rgba(200, 188, 184, 0.08) 38%, rgba(251, 191, 36, 0.05) 64%, transparent 78%)',
            filter: 'blur(78px)',
            opacity: 0.82
          }}
        />
        
        {/* 9. Bottom-Left - Amber + Warm blend */}
        <div 
          className="absolute w-[690px] h-[690px] rounded-full"
          style={{
            bottom: '-13%',
            left: '-7%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.11) 0%, rgba(200, 188, 184, 0.09) 42%, rgba(236, 218, 206, 0.05) 66%, transparent 78%)',
            filter: 'blur(67px)',
            opacity: 0.83
          }}
        />
        
        {/* 10. Top-Center - Amber + White clarity accent */}
        <div 
          className="absolute w-[640px] h-[640px] rounded-full"
          style={{
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.10) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(251, 191, 36, 0.05) 70%, transparent 82%)',
            filter: 'blur(62px)',
            opacity: 0.80
          }}
        />

        {/* 11. Top-Right Quarter - Ken Red strategic accent */}
        <div 
          className="absolute w-[580px] h-[580px] rounded-full"
          style={{
            top: '18%',
            right: '8%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.10) 0%, rgba(210, 57, 64, 0.08) 45%, rgba(228, 109, 114, 0.05) 68%, transparent 78%)',
            filter: 'blur(60px)',
            opacity: 0.80
          }}
        />

        {/* 12. Mid-Left - Ken Red + Amber energy blend */}
        <div 
          className="absolute w-[620px] h-[620px] rounded-full"
          style={{
            top: '52%',
            left: '12%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.09) 0%, rgba(234, 179, 8, 0.07) 42%, rgba(228, 109, 114, 0.05) 66%, transparent 78%)',
            filter: 'blur(62px)',
            opacity: 0.78
          }}
        />

        {/* 13. Bottom-Right Quarter - Ken Red confident finish */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            bottom: '8%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(228, 109, 114, 0.10) 0%, rgba(176, 31, 36, 0.08) 44%, rgba(210, 57, 64, 0.05) 68%, transparent 78%)',
            filter: 'blur(61px)',
            opacity: 0.82
          }}
        />

        {/* 14. Center-Right - Periwinkle trust (minimal) */}
        <div 
          className="absolute w-[450px] h-[450px] rounded-full"
          style={{
            top: '48%',
            right: '22%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.05) 0%, rgba(164, 169, 246, 0.03) 50%, transparent 75%)',
            filter: 'blur(50px)',
            opacity: 0.62
          }}
        />

        {/* Top border - Balanced spectrum with visible red */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.28) 15%, rgba(176, 31, 36, 0.24) 28%, rgba(200, 188, 184, 0.22) 42%, rgba(251, 191, 36, 0.26) 58%, rgba(210, 57, 64, 0.23) 72%, rgba(234, 179, 8, 0.25) 88%, transparent 100%)',
            opacity: 0.72
          }}
        />
        
        {/* Bottom border - Warm + Amber + Red balance */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200, 188, 184, 0.24) 20%, rgba(234, 179, 8, 0.26) 38%, rgba(176, 31, 36, 0.22) 55%, rgba(251, 191, 36, 0.24) 72%, rgba(228, 109, 114, 0.20) 88%, transparent 100%)',
            opacity: 0.68
          }}
        />
      </>
    ),

    /**
     * THEME 8: Objectives Energy Subtle - VARIANT 2 🌙
     * CREATED: January 27, 2025 - 10% Less Highlighted Version for Value Pillars
     * UPDATED: January 27, 2025 - New blob arrangement for visual variety
     * Perfect for: Value Pillars, softer strategic content, reduced visual intensity
     * Mood: Calm energy, subtle sophistication, gentle professionalism
     * Colors: Same balance as Variant 1 (Amber 30%, Warm 25%, White 25%, Ken Red 20%, Periwinkle 5%)
     * 
     * VARIANT 2 SPECS:
     * - 14 gradient blobs (same count as Variant 1)
     * - NEW COMPOSITION: Different positioning and layering for fresh visual
     * - Same color distribution, different spatial arrangement
     * - Opacity values: 10% less than Variant 1
     * - Perfect for sections that need softer backgrounds with variety
     */
    'objectives-energy-subtle': (
      <>
        {/* 1. Top-Center - Large Amber energy wash */}
        <div 
          className="absolute w-[820px] h-[820px] rounded-full"
          style={{
            top: '-18%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.13) 0%, rgba(251, 191, 36, 0.09) 38%, rgba(255, 255, 255, 0.04) 66%, transparent 80%)',
            filter: 'blur(76px)',
            opacity: 0.88
          }}
        />

        {/* 2. Left-Mid - Warm editorial depth */}
        <div 
          className="absolute w-[760px] h-[760px] rounded-full"
          style={{
            top: '28%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.14) 0%, rgba(183, 169, 163, 0.10) 40%, rgba(217, 209, 206, 0.05) 68%, transparent 78%)',
            filter: 'blur(74px)',
            opacity: 0.85
          }}
        />

        {/* 3. Right-Top - Warm + Amber sophistication */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-8%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(217, 209, 206, 0.13) 0%, rgba(251, 191, 36, 0.09) 42%, rgba(236, 218, 206, 0.05) 68%, transparent 80%)',
            filter: 'blur(70px)',
            opacity: 0.82
          }}
        />

        {/* 4. Center - Large White clarity core */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full"
          style={{
            top: '45%',
            left: '48%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(200, 188, 184, 0.07) 36%, rgba(234, 179, 8, 0.04) 62%, transparent 76%)',
            filter: 'blur(80px)',
            opacity: 0.76
          }}
        />

        {/* 5. Bottom-Left - Amber energy glow */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            bottom: '-14%',
            left: '8%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(234, 179, 8, 0.08) 44%, rgba(255, 255, 255, 0.04) 68%, transparent 80%)',
            filter: 'blur(72px)',
            opacity: 0.80
          }}
        />

        {/* 6. Bottom-Right - Warm editorial finish */}
        <div 
          className="absolute w-[740px] h-[740px] rounded-full"
          style={{
            bottom: '-10%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(183, 169, 163, 0.13) 0%, rgba(200, 188, 184, 0.09) 42%, rgba(236, 218, 206, 0.05) 66%, transparent 78%)',
            filter: 'blur(73px)',
            opacity: 0.83
          }}
        />

        {/* 7. Top-Left - White + Warm blend */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '2%',
            left: '-4%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, rgba(217, 209, 206, 0.08) 46%, rgba(200, 188, 184, 0.04) 70%, transparent 82%)',
            filter: 'blur(68px)',
            opacity: 0.78
          }}
        />

        {/* 8. Mid-Right - Amber + White clarity accent */}
        <div 
          className="absolute w-[640px] h-[640px] rounded-full"
          style={{
            top: '56%',
            right: '2%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.10) 0%, rgba(255, 255, 255, 0.07) 44%, rgba(251, 191, 36, 0.04) 68%, transparent 80%)',
            filter: 'blur(64px)',
            opacity: 0.74
          }}
        />

        {/* 9. Center-Left - Warm sophistication layer */}
        <div 
          className="absolute w-[660px] h-[660px] rounded-full"
          style={{
            top: '62%',
            left: '18%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.11) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(217, 209, 206, 0.04) 70%, transparent 80%)',
            filter: 'blur(66px)',
            opacity: 0.77
          }}
        />

        {/* 10. Top-Right Quarter - Ken Red strategic presence */}
        <div 
          className="absolute w-[590px] h-[590px] rounded-full"
          style={{
            top: '12%',
            right: '12%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.09) 0%, rgba(228, 109, 114, 0.07) 44%, rgba(210, 57, 64, 0.04) 68%, transparent 78%)',
            filter: 'blur(62px)',
            opacity: 0.73
          }}
        />

        {/* 11. Center-Left Quarter - Ken Red + Warm energy */}
        <div 
          className="absolute w-[610px] h-[610px] rounded-full"
          style={{
            top: '38%',
            left: '6%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.08) 0%, rgba(200, 188, 184, 0.06) 42%, rgba(228, 109, 114, 0.04) 66%, transparent 78%)',
            filter: 'blur(63px)',
            opacity: 0.70
          }}
        />

        {/* 12. Bottom-Center - Ken Red confident accent */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            bottom: '14%',
            left: '54%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(228, 109, 114, 0.09) 0%, rgba(176, 31, 36, 0.07) 44%, rgba(234, 179, 8, 0.04) 68%, transparent 78%)',
            filter: 'blur(61px)',
            opacity: 0.75
          }}
        />

        {/* 13. Mid-Right - Periwinkle trust accent (minimal) */}
        <div 
          className="absolute w-[460px] h-[460px] rounded-full"
          style={{
            top: '42%',
            right: '16%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.045) 0%, rgba(164, 169, 246, 0.027) 50%, transparent 75%)',
            filter: 'blur(52px)',
            opacity: 0.56
          }}
        />

        {/* 14. Center accent - Periwinkle + Amber blend */}
        <div 
          className="absolute w-[520px] h-[520px] rounded-full"
          style={{
            top: '48%',
            left: '46%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(164, 169, 246, 0.04) 0%, rgba(234, 179, 8, 0.03) 48%, transparent 74%)',
            filter: 'blur(56px)',
            opacity: 0.58
          }}
        />

        {/* Top border - Balanced spectrum */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200, 188, 184, 0.22) 12%, rgba(234, 179, 8, 0.25) 28%, rgba(176, 31, 36, 0.20) 44%, rgba(251, 191, 36, 0.24) 60%, rgba(210, 57, 64, 0.21) 76%, rgba(200, 188, 184, 0.22) 92%, transparent 100%)',
            opacity: 0.64
          }}
        />
        
        {/* Bottom border - Warm + Amber flow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.23) 18%, rgba(200, 188, 184, 0.21) 36%, rgba(176, 31, 36, 0.19) 52%, rgba(251, 191, 36, 0.22) 68%, rgba(228, 109, 114, 0.18) 84%, transparent 100%)',
            opacity: 0.60
          }}
        />
      </>
    ),

    /**
     * THEME: Objectives Premium ⭐
     * =============================
     * USED IN: Section 4 - Engagement Objectives Section (Premium Version)
     * Perfect for: Strategic objectives, value pillars, professional initiatives
     * Mood: Premium, sophisticated, refined, non-distracting
     * Background: White (#ffffff)
     * Colors: Amber (subtle energy) + Light Red (soft warmth) + Periwinkle (trust) + White (clarity)
     * Blur: 85-100px (ultra-soft) | Opacity: 0.72-0.88 (gentle)
     * RGBA Values: 0.06-0.12 (very subtle, optimal readability)
     * 
     * COMPOSITION STRATEGY:
     * - 8 gradient blobs (clean, uncluttered)
     * - Periwinkle + White: Primary trust foundation (40%)
     * - Amber: Subtle energy accents (30%)
     * - Light Red: Soft warmth touches (20%)
     * - White: Clarity and openness (10%)
     * - All colors are muted and blended for premium feel
     */
    'objectives-premium': (
      <>
        {/* 1. Center Foundation - Periwinkle Trust Base */}
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.16) 0%, rgba(215, 220, 245, 0.12) 38%, rgba(235, 237, 250, 0.08) 68%, transparent 85%)',
            filter: 'blur(90px)',
            opacity: 0.95
          }}
        />

        {/* 2. Top Left - Amber Energy */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            top: '-15%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.14) 0%, rgba(251, 191, 36, 0.11) 40%, rgba(255, 230, 120, 0.07) 68%, transparent 82%)',
            filter: 'blur(85px)',
            opacity: 0.92
          }}
        />

        {/* 3. Top Right - Periwinkle + White Clarity */}
        <div 
          className="absolute w-[780px] h-[780px] rounded-full"
          style={{
            top: '-13%',
            right: '-9%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.15) 0%, rgba(223, 234, 250, 0.11) 42%, rgba(240, 245, 252, 0.07) 70%, transparent 82%)',
            filter: 'blur(88px)',
            opacity: 0.90
          }}
        />

        {/* 4. Bottom Left - Light Red Warmth */}
        <div 
          className="absolute w-[750px] h-[750px] rounded-full"
          style={{
            bottom: '-12%',
            left: '3%',
            background: 'radial-gradient(circle, rgba(228, 109, 114, 0.13) 0%, rgba(251, 146, 160, 0.10) 44%, rgba(255, 200, 200, 0.06) 70%, transparent 80%)',
            filter: 'blur(83px)',
            opacity: 0.88
          }}
        />

        {/* 5. Bottom Right - Periwinkle Depth */}
        <div 
          className="absolute w-[770px] h-[770px] rounded-full"
          style={{
            bottom: '-13%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(164, 169, 246, 0.14) 0%, rgba(195, 198, 249, 0.11) 42%, rgba(223, 234, 250, 0.07) 68%, transparent 82%)',
            filter: 'blur(86px)',
            opacity: 0.89
          }}
        />

        {/* 6. Center Left - Amber + Red Blend */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '40%',
            left: '6%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(228, 109, 114, 0.09) 46%, rgba(251, 160, 100, 0.06) 70%, transparent 80%)',
            filter: 'blur(82px)',
            opacity: 0.86
          }}
        />

        {/* 7. Center Right - Red + Periwinkle Sophistication */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            top: '46%',
            right: '8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.11) 0%, rgba(195, 198, 249, 0.09) 44%, rgba(230, 180, 200, 0.06) 68%, transparent 80%)',
            filter: 'blur(84px)',
            opacity: 0.84
          }}
        />

        {/* 8. Top Center - Amber Glow */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '6%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.13) 0%, rgba(234, 179, 8, 0.10) 48%, rgba(255, 220, 150, 0.06) 72%, transparent 82%)',
            filter: 'blur(80px)',
            opacity: 0.82
          }}
        />

        {/* 9. Mid-Bottom - Red Warmth Accent */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.10) 0%, rgba(228, 109, 114, 0.08) 46%, rgba(251, 146, 160, 0.05) 70%, transparent 80%)',
            filter: 'blur(78px)',
            opacity: 0.80
          }}
        />

        {/* Premium Top Border */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(195, 198, 249, 0.22) 18%, rgba(234, 179, 8, 0.20) 36%, rgba(228, 109, 114, 0.18) 52%, rgba(251, 191, 36, 0.21) 68%, rgba(164, 169, 246, 0.19) 84%, transparent 100%)',
            opacity: 0.68
          }}
        />

        {/* Premium Bottom Border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.20) 22%, rgba(195, 198, 249, 0.18) 44%, rgba(228, 109, 114, 0.16) 66%, rgba(223, 234, 250, 0.17) 88%, transparent 100%)',
            opacity: 0.62
          }}
        />
      </>
    ),

    /**
     * THEME 9: Impact Success
     * Perfect for: Success stories, achievements, milestones
     * Mood: Celebratory, impactful, successful
     * Colors: Ken Red 500-700 + Amber accents + Coral warmth + White
     */
    'impact-success': (
      <>
        {/* Center - Bold red focus */}
        <div 
          className="absolute w-[820px] h-[820px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.13) 0%, rgba(210, 57, 64, 0.10) 40%, rgba(228, 109, 114, 0.06) 66%, transparent 81%)',
            filter: 'blur(84px)',
            opacity: 0.91
          }}
        />
        
        {/* Top-left - Deep red power */}
        <div 
          className="absolute w-[675px] h-[675px] rounded-full"
          style={{
            top: '-23%',
            left: '-11%',
            background: 'radial-gradient(circle, rgba(142, 16, 20, 0.12) 0%, rgba(176, 31, 36, 0.09) 43%, transparent 75%)',
            filter: 'blur(82px)',
            opacity: 0.86
          }}
        />
        
        {/* Top-right - Red to amber energy */}
        <div 
          className="absolute w-[645px] h-[645px] rounded-full"
          style={{
            top: '-19%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.11) 0%, rgba(234, 179, 8, 0.08) 46%, transparent 73%)',
            filter: 'blur(79px)',
            opacity: 0.84
          }}
        />
        
        {/* Bottom-left - Coral warmth */}
        <div 
          className="absolute w-[630px] h-[630px] rounded-full"
          style={{
            bottom: '-20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(234, 122, 95, 0.10) 0%, rgba(249, 155, 133, 0.08) 44%, transparent 72%)',
            filter: 'blur(77px)',
            opacity: 0.8
          }}
        />
        
        {/* Bottom-right - Light red glow */}
        <div 
          className="absolute w-[660px] h-[660px] rounded-full"
          style={{
            bottom: '-21%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(228, 109, 114, 0.10) 0%, rgba(251, 209, 210, 0.07) 43%, transparent 72%)',
            filter: 'blur(80px)',
            opacity: 0.81
          }}
        />

        {/* Center power accent */}
        <div 
          className="absolute w-[490px] h-[490px] rounded-full"
          style={{
            top: '41%',
            left: '49%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.11) 0%, rgba(210, 57, 64, 0.07) 48%, transparent 74%)',
            filter: 'blur(71px)',
            opacity: 0.78
          }}
        />

        {/* Top border - Red power */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(176, 31, 36, 0.29) 24%, rgba(210, 57, 64, 0.32) 50%, rgba(228, 109, 114, 0.26) 76%, transparent 100%)',
            opacity: 0.72
          }}
        />
      </>
    ),

    /**
     * THEME 10: Growth Impact 🌱
     * ================================
     * USED IN: Section 6 - Impact Metrics Section
     * Perfect for: Data-backed results, growth metrics, achievement showcase
     * Mood: Fresh, optimistic, growth-focused, trustworthy, success-oriented
     * Background: White (#ffffff)
     * Colors: Amber Light (50-100) + Green (100-200) + Periwinkle (100-200)
     * Blur: 70-90px | Opacity: 0.72-0.88
     * 
     * SPECS:
     * - 7 gradient blobs (light, airy composition)
     * - White: Clarity foundation (40% distribution)
     * - Green: Growth anchor (30% distribution)
     * - Amber Light: Optimism (20% distribution)
     * - Periwinkle: Trust element (10% distribution)
     * - Light composition showcasing growth and impact
     */
    'growth-impact': (
      <>
        {/* 1. Top-Center - Large White clarity canvas */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full"
          style={{
            top: '-12%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, rgba(249, 247, 246, 0.40) 40%, rgba(243, 244, 246, 0.20) 68%, transparent 82%)',
            filter: 'blur(75px)',
            opacity: 0.5
          }}
        />

        {/* 2. Bottom-Left - Green growth anchor */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            bottom: '-15%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(187, 247, 208, 0.32) 0%, rgba(167, 243, 208, 0.24) 38%, rgba(209, 250, 229, 0.14) 66%, transparent 80%)',
            filter: 'blur(68px)',
            opacity: 0.35
          }}
        />

        {/* 3. Top-Right - Amber light optimism */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '-10%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(254, 243, 199, 0.35) 0%, rgba(253, 230, 138, 0.26) 42%, rgba(254, 249, 195, 0.16) 68%, transparent 80%)',
            filter: 'blur(65px)',
            opacity: 0.4
          }}
        />

        {/* 4. Bottom-Right - Periwinkle trust element */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '-12%',
            right: '8%',
            background: 'radial-gradient(circle, rgba(223, 237, 253, 0.30) 0%, rgba(195, 198, 249, 0.22) 40%, rgba(235, 237, 253, 0.14) 66%, transparent 78%)',
            filter: 'blur(62px)',
            opacity: 0.32
          }}
        />

        {/* 5. Center-Left - Green secondary growth */}
        <div 
          className="absolute w-[580px] h-[580px] rounded-full"
          style={{
            top: '40%',
            left: '12%',
            background: 'radial-gradient(circle, rgba(209, 250, 229, 0.28) 0%, rgba(187, 247, 208, 0.20) 45%, rgba(240, 253, 244, 0.12) 68%, transparent 78%)',
            filter: 'blur(58px)',
            opacity: 0.3
          }}
        />

        {/* 6. Center-Right - Periwinkle professional reliability */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '32%',
            right: '16%',
            background: 'radial-gradient(circle, rgba(235, 237, 253, 0.26) 0%, rgba(223, 237, 253, 0.18) 44%, rgba(245, 246, 253, 0.10) 68%, transparent 76%)',
            filter: 'blur(60px)',
            opacity: 0.28
          }}
        />

        {/* 7. Center-Top - Amber warmth boost */}
        <div 
          className="absolute w-[520px] h-[520px] rounded-full"
          style={{
            top: '18%',
            left: '32%',
            background: 'radial-gradient(circle, rgba(254, 249, 195, 0.32) 0%, rgba(254, 243, 199, 0.24) 46%, rgba(253, 224, 71, 0.12) 68%, transparent 78%)',
            filter: 'blur(56px)',
            opacity: 0.35
          }}
        />

        {/* Top border - Growth gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(167, 243, 208, 0.18) 20%, rgba(254, 243, 199, 0.20) 38%, rgba(223, 237, 253, 0.16) 58%, rgba(187, 247, 208, 0.18) 78%, transparent 100%)',
            opacity: 0.45
          }}
        />
      </>
    ),

    /**
     * THEME 11: Endorsement Trust
     * Perfect for: Testimonials, endorsements, client testimonials
     * Mood: Trustworthy, professional, reliable
     * Colors: Periwinkle 500 + White + True V Purple 400 + subtle Perano
     */
    'endorsement-trust': (
      <>
        {/* Center - Cool periwinkle foundation */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.10) 0%, rgba(223, 234, 250, 0.07) 45%, rgba(255, 255, 255, 0.03) 70%, transparent 85%)',
            filter: 'blur(88px)',
            opacity: 0.92
          }}
        />
        
        {/* Top-left - Light Purple clarity */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-23%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(239, 237, 253, 0.12) 0%, rgba(235, 237, 253, 0.09) 40%, transparent 75%)',
            filter: 'blur(85px)',
            opacity: 0.88
          }}
        />
        
        {/* Top-right - Perano trust */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '-20%',
            right: '-9%',
            background: 'radial-gradient(circle, rgba(223, 234, 250, 0.11) 0%, rgba(200, 223, 245, 0.08) 42%, transparent 73%)',
            filter: 'blur(83px)',
            opacity: 0.84
          }}
        />
        
        {/* Bottom-left - Periwinkle depth */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '-19%',
            left: '4%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.11) 0%, rgba(164, 169, 246, 0.08) 45%, transparent 72%)',
            filter: 'blur(80px)',
            opacity: 0.8
          }}
        />
        
        {/* Bottom-right - Light periwinkle */}
        <div 
          className="absolute w-[670px] h-[670px] rounded-full"
          style={{
            bottom: '-21%',
            right: '-7%',
            background: 'radial-gradient(circle, rgba(235, 237, 253, 0.10) 0%, rgba(245, 246, 253, 0.07) 40%, transparent 70%)',
            filter: 'blur(84px)',
            opacity: 0.82
          }}
        />

        {/* Center accent - Purple sophistication */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(148, 136, 236, 0.08) 0%, rgba(195, 198, 249, 0.05) 50%, transparent 75%)',
            filter: 'blur(72px)',
            opacity: 0.75
          }}
        />

        {/* Top border - Periwinkle gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(195, 198, 249, 0.22) 20%, rgba(223, 234, 250, 0.25) 50%, rgba(148, 136, 236, 0.20) 80%, transparent 100%)',
            opacity: 0.65
          }}
        />
      </>
    ),

    /**
     * THEME 12: Hero Dark
     * Perfect for: Hero sections with dark backgrounds
     * Mood: Bold, premium, energetic yet sophisticated
     * Pattern: Refined diagonal cascade with harmonious left-side colors
     * Colors: Ken Red 500-700 + Warm 700 + Amber 500 + subtle highlights
     * Optimized for: Black (#000000) backgrounds
     */
    'hero-dark': (
      <>
        {/* 1. Top-left corner - Red confidence anchor */}
        <div 
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            top: '-20%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.14) 0%, rgba(210, 57, 64, 0.10) 35%, rgba(142, 16, 20, 0.06) 60%, rgba(176, 31, 36, 0.03) 75%, transparent 88%)',
            filter: 'blur(135px)',
            opacity: 0.80
          }}
        />
        
        {/* 2. Upper-right - Amber sunrise */}
        <div 
          className="absolute w-[820px] h-[820px] rounded-full"
          style={{
            top: '5%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(251, 191, 36, 0.11) 38%, rgba(251, 146, 60, 0.07) 62%, rgba(234, 179, 8, 0.03) 78%, transparent 90%)',
            filter: 'blur(130px)',
            opacity: 0.82
          }}
        />
        
        {/* 3. Left-center - Subtle red continuation */}
        <div 
          className="absolute w-[780px] h-[780px] rounded-full"
          style={{
            top: '32%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.12) 0%, rgba(176, 31, 36, 0.09) 40%, rgba(228, 109, 114, 0.06) 64%, rgba(210, 57, 64, 0.03) 78%, transparent 88%)',
            filter: 'blur(125px)',
            opacity: 0.76
          }}
        />
        
        {/* 4. Center-right cascade - Amber energy */}
        <div 
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            top: '45%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.13) 0%, rgba(251, 191, 36, 0.10) 40%, rgba(251, 146, 60, 0.06) 65%, rgba(234, 179, 8, 0.03) 80%, transparent 90%)',
            filter: 'blur(138px)',
            opacity: 0.78
          }}
        />
        
        {/* 5. Lower-left - Warm red harmony */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            bottom: '8%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.11) 0%, rgba(210, 57, 64, 0.08) 42%, rgba(217, 101, 72, 0.05) 66%, rgba(176, 31, 36, 0.03) 80%, transparent 90%)',
            filter: 'blur(128px)',
            opacity: 0.75
          }}
        />
        
        {/* 6. Bottom-right - Amber warmth finish */}
        <div 
          className="absolute w-[860px] h-[860px] rounded-full"
          style={{
            bottom: '-16%',
            right: '-12%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(234, 179, 8, 0.09) 44%, rgba(251, 146, 60, 0.06) 68%, rgba(251, 191, 36, 0.03) 82%, transparent 92%)',
            filter: 'blur(132px)',
            opacity: 0.79
          }}
        />

        {/* 7. Mid-upper diagonal - Red energy accent */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            top: '20%',
            left: '35%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.10) 0%, rgba(210, 57, 64, 0.07) 48%, rgba(176, 31, 36, 0.03) 72%, transparent 85%)',
            filter: 'blur(118px)',
            opacity: 0.70
          }}
        />

        {/* 8. Mid-lower diagonal - Warm amber harmony */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            bottom: '26%',
            right: '30%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.09) 0%, rgba(217, 101, 72, 0.07) 46%, rgba(234, 179, 8, 0.03) 70%, transparent 85%)',
            filter: 'blur(120px)',
            opacity: 0.68
          }}
        />

        {/* 9. Central focal point - Balanced red-amber core */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.11) 0%, rgba(234, 179, 8, 0.08) 42%, rgba(210, 57, 64, 0.05) 66%, rgba(176, 31, 36, 0.03) 80%, transparent 90%)',
            filter: 'blur(125px)',
            opacity: 0.72
          }}
        />

        {/* 10. Upper cascade - Amber shimmer */}
        <div 
          className="absolute w-[550px] h-[550px] rounded-full"
          style={{
            top: '14%',
            right: '22%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, rgba(234, 179, 8, 0.06) 50%, rgba(251, 191, 36, 0.03) 74%, transparent 88%)',
            filter: 'blur(112px)',
            opacity: 0.65
          }}
        />

        {/* 11. Lower cascade - Coral warmth */}
        <div 
          className="absolute w-[580px] h-[580px] rounded-full"
          style={{
            bottom: '18%',
            left: '26%',
            background: 'radial-gradient(circle, rgba(234, 122, 95, 0.09) 0%, rgba(217, 101, 72, 0.06) 48%, rgba(234, 122, 95, 0.03) 72%, transparent 88%)',
            filter: 'blur(115px)',
            opacity: 0.67
          }}
        />

        {/* Diagonal accent line - Red to Amber sweep */}
        <div 
          className="absolute w-[1400px] h-[400px] rounded-full"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            background: 'radial-gradient(ellipse, rgba(176, 31, 36, 0.06) 0%, rgba(234, 179, 8, 0.05) 35%, rgba(210, 57, 64, 0.03) 65%, rgba(176, 31, 36, 0.02) 80%, transparent 92%)',
            filter: 'blur(150px)',
            opacity: 0.60
          }}
        />

        {/* Top border - Diagonal flow gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, rgba(176, 31, 36, 0.22) 0%, rgba(234, 179, 8, 0.18) 25%, rgba(210, 57, 64, 0.15) 50%, rgba(251, 191, 36, 0.16) 75%, transparent 100%)',
            opacity: 0.55,
            filter: 'blur(1px)'
          }}
        />

        {/* Bottom border - Warm finish */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(176, 31, 36, 0.16) 25%, rgba(234, 179, 8, 0.18) 50%, rgba(210, 57, 64, 0.14) 75%, rgba(251, 191, 36, 0.12) 100%)',
            opacity: 0.48,
            filter: 'blur(0.5px)'
          }}
        />
      </>
    ),

    /**
     * THEME 13: Hero Light ☀️
     * ========================
     * Perfect for: Light version of hero sections on white backgrounds
     * Mood: Fresh, approachable, premium yet light
     * Background: White/Light gradient (#fafafa to #ffffff)
     * Colors: Brand Red, Warm, Amber, Coral, Periwinkle (balanced visibility)
     * Blur: 80-95px | Opacity: 0.75-0.92
     * 
     * COMPOSITION SPECS:
     * - 12 gradient blobs (rich composition)
     * - Amber: Primary energy (30% distribution)
     * - Warm: Editorial sophistication (25% distribution)
     * - Red: Brand identity (20% distribution)
     * - Coral: Warmth accent (15% distribution)
     * - Periwinkle: Trust element (10% distribution)
     */
    'hero-light': (
      <>
        {/* 1. Top-Left - Amber primary energy */}
        <div 
          className="absolute w-[850px] h-[850px] rounded-full"
          style={{
            top: '-18%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(251, 191, 36, 0.09) 42%, rgba(254, 243, 199, 0.05) 68%, transparent 82%)',
            filter: 'blur(88px)',
            opacity: 0.92
          }}
        />

        {/* 2. Top-Right - Warm editorial elegance */}
        <div 
          className="absolute w-[820px] h-[820px] rounded-full"
          style={{
            top: '-15%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.13) 0%, rgba(236, 218, 206, 0.10) 44%, rgba(217, 209, 206, 0.06) 68%, transparent 80%)',
            filter: 'blur(85px)',
            opacity: 0.88
          }}
        />

        {/* 3. Center-Left - Brand Red identity */}
        <div 
          className="absolute w-[780px] h-[780px] rounded-full"
          style={{
            top: '36%',
            left: '2%',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.10) 0%, rgba(228, 109, 114, 0.08) 40%, rgba(251, 209, 210, 0.04) 66%, transparent 80%)',
            filter: 'blur(82px)',
            opacity: 0.85
          }}
        />

        {/* 4. Center-Right - Amber + Coral warmth */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            top: '44%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.11) 0%, rgba(234, 122, 95, 0.08) 42%, rgba(249, 155, 133, 0.05) 66%, transparent 80%)',
            filter: 'blur(84px)',
            opacity: 0.87
          }}
        />

        {/* 5. Bottom-Left - Coral warmth accent */}
        <div 
          className="absolute w-[750px] h-[750px] rounded-full"
          style={{
            bottom: '-14%',
            left: '8%',
            background: 'radial-gradient(circle, rgba(234, 122, 95, 0.11) 0%, rgba(249, 155, 133, 0.08) 44%, rgba(251, 184, 167, 0.05) 68%, transparent 80%)',
            filter: 'blur(80px)',
            opacity: 0.83
          }}
        />

        {/* 6. Bottom-Right - Warm editorial depth */}
        <div 
          className="absolute w-[830px] h-[830px] rounded-full"
          style={{
            bottom: '-16%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(183, 169, 163, 0.12) 0%, rgba(200, 188, 184, 0.09) 42%, rgba(236, 218, 206, 0.05) 66%, transparent 80%)',
            filter: 'blur(86px)',
            opacity: 0.86
          }}
        />

        {/* 7. Center spotlight - Multi-brand harmony */}
        <div 
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.08) 0%, rgba(234, 179, 8, 0.06) 35%, rgba(200, 188, 184, 0.04) 60%, transparent 78%)',
            filter: 'blur(92px)',
            opacity: 0.90
          }}
        />

        {/* 8. Top-Center - Amber energy glow */}
        <div 
          className="absolute w-[720px] h-[720px] rounded-full"
          style={{
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.10) 0%, rgba(251, 191, 36, 0.08) 46%, rgba(255, 255, 255, 0.04) 70%, transparent 82%)',
            filter: 'blur(78px)',
            opacity: 0.82
          }}
        />

        {/* 9. Mid-Left - Red + Warm blend */}
        <div 
          className="absolute w-[680px] h-[680px] rounded-full"
          style={{
            top: '58%',
            left: '6%',
            background: 'radial-gradient(circle, rgba(210, 57, 64, 0.09) 0%, rgba(200, 188, 184, 0.07) 44%, rgba(228, 109, 114, 0.04) 68%, transparent 80%)',
            filter: 'blur(76px)',
            opacity: 0.79
          }}
        />

        {/* 10. Mid-Right - Amber + Coral energy */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '62%',
            right: '12%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.10) 0%, rgba(234, 122, 95, 0.07) 42%, rgba(234, 179, 8, 0.04) 66%, transparent 78%)',
            filter: 'blur(77px)',
            opacity: 0.80
          }}
        />

        {/* 11. Upper-Left Quarter - Periwinkle trust element */}
        <div 
          className="absolute w-[620px] h-[620px] rounded-full"
          style={{
            top: '18%',
            left: '14%',
            background: 'radial-gradient(circle, rgba(195, 198, 249, 0.08) 0%, rgba(223, 234, 250, 0.06) 48%, rgba(247, 246, 254, 0.03) 72%, transparent 82%)',
            filter: 'blur(72px)',
            opacity: 0.75
          }}
        />

        {/* 12. Lower-Right Quarter - Warm + Red sophistication */}
        <div 
          className="absolute w-[640px] h-[640px] rounded-full"
          style={{
            bottom: '22%',
            right: '18%',
            background: 'radial-gradient(circle, rgba(200, 188, 184, 0.10) 0%, rgba(176, 31, 36, 0.07) 44%, rgba(217, 209, 206, 0.04) 68%, transparent 80%)',
            filter: 'blur(74px)',
            opacity: 0.77
          }}
        />

        {/* Top border - Brand color spectrum */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200, 188, 184, 0.20) 15%, rgba(176, 31, 36, 0.22) 30%, rgba(234, 179, 8, 0.24) 50%, rgba(234, 122, 95, 0.20) 70%, rgba(195, 198, 249, 0.18) 85%, transparent 100%)',
            opacity: 0.65
          }}
        />
        
        {/* Bottom border - Warm editorial flow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.21) 20%, rgba(200, 188, 184, 0.19) 40%, rgba(234, 122, 95, 0.18) 60%, rgba(251, 191, 36, 0.20) 80%, transparent 100%)',
            opacity: 0.58
          }}
        />
      </>
    ),

    /**
     * THEME 14: Hero Pure Black 🌑
     * ===============================
     * CLEAN & MINIMAL - Black-900 Foundation
     * Perfect for: Pure black (#000000) backgrounds with subtle depth
     * Mood: Ultra-premium, minimalist, clean sophistication
     * Background: Pure Black (#000000)
     * Primary Color: Black-900 (rgba(23, 23, 23)) - 85% of composition
     * Accent Colors: Minimal warm hints - 15% total
     * Blur: 140-160px | Opacity: 0.25-0.40 (very clean & subtle)
     * 
     * CLEAN COMPOSITION:
     * - 7 gradient blobs only (minimal, clean design)
     * - Black-900 dominant in all gradients
     * - Warm accents barely visible (Red, Amber hints only)
     * - No complex color mixing - clean and simple
     */
    'hero-pure-black': (
      <>
        {/* 1. Black-900 Base - Top Half */}
        <div 
          className="absolute w-[1200px] h-[1200px] rounded-full"
          style={{
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(23, 23, 23, 0.40) 0%, rgba(23, 23, 23, 0.25) 50%, transparent 85%)',
            filter: 'blur(160px)',
            opacity: 0.40
          }}
        />
        
        {/* 2. Black-900 Base - Bottom Half */}
        <div 
          className="absolute w-[1200px] h-[1200px] rounded-full"
          style={{
            bottom: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(23, 23, 23, 0.38) 0%, rgba(23, 23, 23, 0.22) 50%, transparent 85%)',
            filter: 'blur(155px)',
            opacity: 0.38
          }}
        />
        
        {/* 3. Black-900 Base - Left Side */}
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            top: '50%',
            left: '-20%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, rgba(23, 23, 23, 0.35) 0%, rgba(23, 23, 23, 0.20) 50%, transparent 80%)',
            filter: 'blur(150px)',
            opacity: 0.35
          }}
        />
        
        {/* 4. Black-900 Base - Right Side */}
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            top: '50%',
            right: '-20%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, rgba(23, 23, 23, 0.35) 0%, rgba(23, 23, 23, 0.20) 50%, transparent 80%)',
            filter: 'blur(150px)',
            opacity: 0.35
          }}
        />

        {/* 5. Subtle Red Accent - Top-Left */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '15%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(142, 16, 20, 0.08) 0%, rgba(23, 23, 23, 0.15) 60%, transparent 85%)',
            filter: 'blur(140px)',
            opacity: 0.30
          }}
        />

        {/* 6. Subtle Amber Accent - Top-Right */}
        <div 
          className="absolute w-[580px] h-[580px] rounded-full"
          style={{
            top: '20%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.06) 0%, rgba(23, 23, 23, 0.12) 60%, transparent 85%)',
            filter: 'blur(145px)',
            opacity: 0.28
          }}
        />

        {/* 7. Subtle Red Accent - Center-Bottom */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full"
          style={{
            bottom: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(176, 31, 36, 0.06) 0%, rgba(23, 23, 23, 0.13) 60%, transparent 85%)',
            filter: 'blur(142px)',
            opacity: 0.25
          }}
        />

        {/* Clean minimal border */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'rgba(23, 23, 23, 0.25)',
            opacity: 0.30
          }}
        />
      </>
    )
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {themes[theme]}
    </div>
  );
}