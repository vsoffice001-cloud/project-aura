/**
 * Example Page - Market Insights
 * 
 * This page demonstrates correct usage of the KP 2.0 Design System v3.0:
 * - 🔴 RED for brand & action elements
 * - 🟣 PURPLE for data & informational content
 * - Proper token imports
 * - Context-specific tokens
 * - Component patterns
 */

import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  BarChart3,
  Download,
  ArrowRight,
  CheckCircle2,
  Building2,
  Target,
  Zap
} from 'lucide-react';

// ============================================================================
// STEP 1: Import Design System Tokens
// ============================================================================

// Import context tokens (recommended approach)
import { contextColors } from '@/design-system/tokens';

// Or import colors directly if needed
// import { colors } from '@/design-system/tokens';

export default function MarketInsightsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ====================================================================
          SECTION 1: HERO WITH CHAPTER HEADER
          Pattern: Chapter header (RED) + Main heading + CTA (RED)
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-white">
        {/* Chapter Header - Always RED for brand identity */}
        <div className="max-w-[1200px] mx-auto">
          <span 
            className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest block mb-4"
          >
            CHAPTER 9 - Market Insights
          </span>
          
          {/* Main Heading - Uses Noto Serif for top-level */}
          <h1 className="font-display text-[48px] leading-tight text-[var(--grey-700)] mb-6 max-w-[800px]">
            Unlock Strategic Opportunities in the Qatar Market
          </h1>
          
          {/* Description - Secondary text color */}
          <p className="text-[var(--grey-500)] text-base leading-relaxed max-w-[700px] mb-8">
            Comprehensive market intelligence powered by data-driven insights. 
            Our analysis covers 500+ companies across 12 key sectors in Qatar's 
            rapidly evolving market landscape.
          </p>
          
          {/* CTA Buttons - RED for primary action */}
          <div className="flex items-center gap-4">
            {/* Primary CTA - RED background */}
            <button 
              className="bg-[var(--brand-red-500)] hover:bg-[var(--brand-red-600)] text-white px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download Full Report
            </button>
            
            {/* Secondary CTA - Outline with RED hover */}
            <button 
              className="border border-[var(--grey-200)] text-[var(--grey-700)] hover:text-[var(--brand-red-500)] hover:border-[var(--brand-red-500)] px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              View Sample
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: KEY METRICS (STAT CARDS)
          Pattern: Purple numbers (data color) + grid layout
          Even section = grey background
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-[var(--grey-50)]">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest block mb-4">
            KEY METRICS
          </span>
          
          <h2 className="font-display text-[40px] leading-tight text-[var(--grey-700)] mb-12">
            Market at a Glance
          </h2>
          
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '$2.4B', label: 'Market Size', trend: '+12.5%', icon: TrendingUp },
              { number: '500+', label: 'Active Companies', trend: '+8.2%', icon: Building2 },
              { number: '15.3%', label: 'Annual Growth', trend: '+2.1%', icon: BarChart3 },
              { number: '12', label: 'Key Sectors', trend: 'Stable', icon: Target },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white border border-[var(--grey-200)] rounded-[10px] p-6 text-center hover:shadow-[var(--shadow-brand-hover)] transition-shadow duration-200"
              >
                {/* Number - PURPLE because it's data */}
                <div className="text-[40px] font-bold text-[var(--data-purple-500)] mb-2">
                  {stat.number}
                </div>
                
                {/* Label - Secondary text */}
                <div className="text-[var(--grey-500)] text-sm mb-2">
                  {stat.label}
                </div>
                
                {/* Trend - Success color (green) */}
                <div className="text-[var(--green-600)] text-sm font-semibold flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: INFORMATIONAL CARDS (ICON CARDS)
          Pattern: Purple icon + purple background + grid layout
          Odd section = white background
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest block mb-4">
            INSIGHTS
          </span>
          
          <h2 className="font-display text-[40px] leading-tight text-[var(--grey-700)] mb-6">
            What You'll Discover
          </h2>
          
          <p className="text-[var(--grey-500)] text-base leading-relaxed max-w-[700px] mb-12">
            Our comprehensive analysis provides actionable insights across 
            multiple dimensions of the Qatar market.
          </p>
          
          {/* Icon Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Target Audience Analysis',
                description: 'Deep dive into consumer behavior, demographics, and purchasing patterns across Qatar's diverse market segments.',
              },
              {
                icon: TrendingUp,
                title: 'Growth Projections',
                description: 'Data-driven forecasts for market expansion, revenue opportunities, and emerging trends through 2028.',
              },
              {
                icon: Globe,
                title: 'Regional Dynamics',
                description: 'Geographic analysis of market distribution across Doha, Al Rayyan, and other key Qatari regions.',
              },
              {
                icon: Building2,
                title: 'Competitive Landscape',
                description: 'Comprehensive competitor profiling with market share analysis and strategic positioning insights.',
              },
              {
                icon: BarChart3,
                title: 'Market Segmentation',
                description: 'Detailed breakdown by product type, application, distribution channel, and customer segment.',
              },
              {
                icon: Zap,
                title: 'Key Drivers & Challenges',
                description: 'Critical factors accelerating growth and potential barriers affecting market development.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-[var(--grey-200)] rounded-[10px] p-6 hover:shadow-[var(--shadow-brand-hover)] transition-all duration-200"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon Container - PURPLE background with PURPLE icon (informational) */}
                  <div className="w-12 h-12 rounded-lg bg-[var(--data-purple-100)] flex items-center justify-center mb-4">
                    <Icon 
                      className="h-6 w-6 text-[var(--data-purple-500)]"
                      style={{
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 200ms'
                      }}
                    />
                  </div>
                  
                  {/* Title - Primary text */}
                  <h3 className="text-lg font-semibold text-[var(--grey-700)] mb-2">
                    {item.title}
                  </h3>
                  
                  {/* Description - Secondary text */}
                  <p className="text-[var(--grey-500)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: CHART EXAMPLE
          Pattern: Purple charts with context tokens
          Even section = grey background
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-[var(--grey-50)]">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest block mb-4">
            DATA VISUALIZATION
          </span>
          
          <h2 className="font-display text-[40px] leading-tight text-[var(--grey-700)] mb-12">
            Market Growth Trends
          </h2>
          
          {/* Chart Container */}
          <div className="bg-white border border-[var(--grey-200)] rounded-[10px] p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[var(--grey-700)] mb-2">
                Revenue Growth 2020-2026
              </h3>
              <p className="text-[var(--grey-500)] text-sm">
                Historical data and projections (in million USD)
              </p>
            </div>
            
            {/* Mock Chart - In real implementation, this would be Highcharts */}
            <div className="h-[300px] relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[var(--grey-500)] text-sm">
                <span>$3,000M</span>
                <span>$2,500M</span>
                <span>$2,000M</span>
                <span>$1,500M</span>
                <span>$1,000M</span>
              </div>
              
              {/* Chart area with PURPLE gradient */}
              <div 
                className="ml-16 h-full border border-[var(--grey-200)] rounded-[10px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(to top, 
                    rgba(127, 95, 227, 0.1) 0%, 
                    rgba(127, 95, 227, 0.05) 50%,
                    transparent 100%)`
                }}
              >
                {/* Mock line - PURPLE color for data */}
                <svg className="absolute inset-0 w-full h-full">
                  <polyline
                    points="20,240 120,200 220,180 320,140 420,120 520,80 620,60"
                    fill="none"
                    stroke="var(--data-purple-500)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Data points - PURPLE circles */}
                  {[20, 120, 220, 320, 420, 520, 620].map((x, i) => {
                    const y = [240, 200, 180, 140, 120, 80, 60][i];
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="var(--data-purple-500)"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="ml-16 mt-4 flex justify-between text-[var(--grey-500)] text-sm">
                {['2020', '2021', '2022', '2023', '2024', '2025', '2026'].map((year, i) => (
                  <span key={i}>{year}</span>
                ))}
              </div>
            </div>
            
            {/* Legend - PURPLE dot for data series */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--data-purple-500)]"></div>
                <span className="text-sm text-[var(--grey-500)]">Total Market Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: FEATURES WITH CHECKMARKS
          Pattern: Mixed content with proper color usage
          Odd section = white background
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <span className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest block mb-4">
                COMPREHENSIVE ANALYSIS
              </span>
              
              <h2 className="font-display text-[40px] leading-tight text-[var(--grey-700)] mb-6">
                Everything You Need to Make Informed Decisions
              </h2>
              
              <p className="text-[var(--grey-500)] text-base leading-relaxed mb-8">
                Our market research report combines quantitative data with qualitative 
                insights to provide a complete picture of opportunities and challenges.
              </p>
              
              {/* Features List - Use success green for checkmarks */}
              <div className="space-y-4">
                {[
                  'Executive summary with key takeaways',
                  'Detailed market size and forecast',
                  'Competitive landscape analysis',
                  'Regulatory environment assessment',
                  'Strategic recommendations',
                  'Custom data tables and appendices',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--green-600)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--grey-700)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '250+', label: 'Pages', icon: '📄' },
                { number: '50+', label: 'Charts', icon: '📊' },
                { number: '100+', label: 'Data Tables', icon: '📈' },
                { number: '24/7', label: 'Support', icon: '💬' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-[var(--grey-200)] rounded-[10px] p-6 text-center"
                >
                  {/* Emoji icon */}
                  <div className="text-4xl mb-3">{item.icon}</div>
                  
                  {/* Number - PURPLE for data */}
                  <div className="text-3xl font-bold text-[var(--data-purple-500)] mb-1">
                    {item.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-[var(--grey-500)] text-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: FINAL CTA WITH RED GRADIENT
          Pattern: High-impact conversion section with RED gradient
          Even section with RED gradient background
          ==================================================================== */}
      
      <section className="py-24 px-[84.375px] lg:px-[112.5px] bg-gradient-to-br from-[var(--brand-red-500)] to-[var(--brand-red-700)]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-display text-[48px] leading-tight text-white mb-6 max-w-[800px] mx-auto">
            Ready to Unlock Market Insights?
          </h2>
          
          <p className="text-white/90 text-lg leading-relaxed max-w-[700px] mx-auto mb-10">
            Download the full report today and gain the competitive advantage 
            you need to succeed in Qatar's dynamic market.
          </p>
          
          {/* CTA Buttons - White on RED gradient */}
          <div className="flex items-center justify-center gap-4">
            {/* Primary CTA - White background on RED */}
            <button className="bg-white text-[var(--brand-red-500)] hover:bg-white/90 px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200 flex items-center gap-2 shadow-lg">
              <Download className="h-5 w-5" />
              Download Report ($499)
            </button>
            
            {/* Secondary CTA - Outline white */}
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200 flex items-center gap-2">
              Contact Sales
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>PDF + Excel</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 7: FOOTER
          Pattern: Dark footer with proper text contrast
          ==================================================================== */}
      
      <footer className="py-16 px-[84.375px] lg:px-[112.5px] bg-[var(--grey-800)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Our Team', 'Careers', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[var(--grey-400)] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Reports', 'Case Studies', 'Blog', 'FAQ'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[var(--grey-400)] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[var(--grey-400)] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                {['LinkedIn', 'Twitter', 'Email'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[var(--grey-400)] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-[var(--grey-700)] text-center text-[var(--grey-400)] text-sm">
            © 2026 KP Market Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
