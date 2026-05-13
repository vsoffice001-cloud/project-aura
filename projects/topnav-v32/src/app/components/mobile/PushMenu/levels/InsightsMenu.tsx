/**
 * InsightsMenu - Level 2: Insights & Publications Navigation
 * 
 * Features:
 * - By Industry section (14 industries, scrollable)
 * - By Region section
 * - Publications section
 * - Featured StatsCard
 * - Subscribe CTA
 * - Staggered reveal animations
 * - Haptic feedback on interactions
 * - Desktop-consistent color scheme
 */

import { motion } from 'motion/react';
import { 
  Sprout, Truck, Building2, ShoppingBag, Shield, GraduationCap,
  Zap, UtensilsCrossed, HeartPulse, Hotel, Factory, Film, Home, Cpu,
  Globe, FileText, Star, Lightbulb, BookOpen, Search
} from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { StatsCard } from '../../../StatsCard';
import { GradientCTA } from '../../../GradientCTA';

// By Industry (14 industries - scrollable) - removed colors
const INDUSTRY_INSIGHTS = [
  { id: 'agriculture', label: 'Agriculture & Animal Care', icon: Sprout },
  { id: 'automotive', label: 'Automotive & Transportation', icon: Truck },
  { id: 'banking', label: 'BFSI', icon: Building2 },
  { id: 'consumer', label: 'Consumer Products & Retail', icon: ShoppingBag },
  { id: 'defense', label: 'Defense & Security', icon: Shield },
  { id: 'education', label: 'Education & Recruitment', icon: GraduationCap },
  { id: 'energy', label: 'Energy & Utilities', icon: Zap },
  { id: 'food', label: 'Food, Beverage & Tobacco', icon: UtensilsCrossed },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'hospitality', label: 'Hospitality & Tourism', icon: Hotel },
  { id: 'manufacturing', label: 'Manufacturing & Construction', icon: Factory },
  { id: 'media', label: 'Media & Entertainment', icon: Film },
  { id: 'real-estate', label: 'Real Estate', icon: Home },
  { id: 'technology', label: 'Technology & Telecom', icon: Cpu },
];

// By Region - removed colors
const REGIONAL_INSIGHTS = [
  { id: 'global', label: 'Global Insights', icon: Globe },
  { id: 'asia-pacific', label: 'Asia Pacific', icon: Globe },
  { id: 'north-america', label: 'North America', icon: Globe },
  { id: 'europe', label: 'Europe', icon: Globe },
];

// Publications - removed colors
const PUBLICATIONS = [
  { id: 'articles', label: 'Articles', icon: FileText },
  { id: 'impact-stories', label: 'Impact Stories', icon: Star },
  { id: 'perspective', label: 'Perspective', icon: Lightbulb },
  { id: 'blogs', label: 'Blogs', icon: BookOpen },
];

export function InsightsMenu({ onNavigate, onBack }: MenuLevelProps) {
  const handleItemClick = (item: any) => {
    Haptics.light();
    // Navigate to specific insight/publication
    window.location.href = `/insights/${item.id}`;
  };

  return (
    <div className="pb-8">
      {/* Search Bar - Sticky */}
      <div className="sticky top-0 bg-white z-10 p-5 pb-4 border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="
            relative
            bg-white
            rounded-[8px]
            border border-[rgba(20,16,22,0.1)]
            focus-within:ring-1 focus-within:ring-[#806ce0]
            transition-all duration-200
          ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-[16px] text-[#656565]" strokeWidth={2} />
            
            <input
              type="text"
              placeholder="Search insights..."
              onFocus={Haptics.selection}
              className="
                w-full pl-10 pr-4 py-2.5
                bg-transparent
                font-nav text-[14px] text-[#141016]
                placeholder:text-[#999999]
                outline-none
              "
            />
          </div>
        </motion.div>
      </div>

      {/* By Industry Section */}
      <div className="px-5 pt-4 space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="
            font-nav text-[12px] font-bold text-[#999999] uppercase tracking-wider
            px-2
          "
        >
          By Industry
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {INDUSTRY_INSIGHTS.map((item, index) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleItemClick(item)}
              onTouchStart={Haptics.light}
              className="
                group relative overflow-hidden
                w-full min-h-[56px] p-3.5
                bg-white
                rounded-[10px]
                shadow-[0px_2px_8px_0px_rgba(128,108,224,0.06)]
                border border-[rgba(128,108,224,0.08)]
                hover:shadow-[0px_4px_14px_0px_rgba(128,108,224,0.12)]
                hover:border-[#806ce0]
                active:shadow-[0px_1px_4px_0px_rgba(128,108,224,0.08)]
                transition-all duration-150
                touch-manipulation
              "
            >
              <div className="relative flex items-center gap-3">
                {/* Icon with desktop-style background (alternating) */}
                <motion.div
                  whileTap={{ scale: 0.9, rotate: -3 }}
                  className={`
                    size-[40px] rounded-[10px] 
                    flex items-center justify-center
                    ${index % 2 === 0 ? 'bg-[#f5f3ff]' : 'bg-[#f0f0f0]'}
                  `}
                >
                  <item.icon 
                    className="size-[20px] text-[#141016]" 
                    strokeWidth={2}
                  />
                </motion.div>
                
                {/* Label */}
                <span className="
                  flex-1 text-left
                  font-nav text-[14px] font-normal text-[#656565]
                  group-hover:text-[#806ce0] transition-colors
                  leading-tight
                ">
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* By Region Section */}
      <div className="px-5 pt-6 space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="
            font-nav text-[12px] font-bold text-[#999999] uppercase tracking-wider
            px-2
          "
        >
          By Region
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {REGIONAL_INSIGHTS.map((item, index) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleItemClick(item)}
              onTouchStart={Haptics.light}
              className="
                group relative overflow-hidden
                w-full min-h-[56px] p-3.5
                bg-white
                rounded-[10px]
                shadow-[0px_2px_8px_0px_rgba(128,108,224,0.06)]
                border border-[rgba(128,108,224,0.08)]
                hover:shadow-[0px_4px_14px_0px_rgba(128,108,224,0.12)]
                hover:border-[#806ce0]
                active:shadow-[0px_1px_4px_0px_rgba(128,108,224,0.08)]
                transition-all duration-150
                touch-manipulation
              "
            >
              <div className="relative flex items-center gap-3">
                {/* Icon with desktop-style background (alternating) */}
                <motion.div
                  whileTap={{ scale: 0.9, rotate: 5 }}
                  className={`
                    size-[40px] rounded-[10px] 
                    flex items-center justify-center
                    ${index % 2 === 0 ? 'bg-[#f5f3ff]' : 'bg-[#f0f0f0]'}
                  `}
                >
                  <item.icon 
                    className="size-[20px] text-[#141016]" 
                    strokeWidth={2}
                  />
                </motion.div>
                
                {/* Label */}
                <span className="
                  flex-1 text-left
                  font-nav text-[14px] font-normal text-[#656565]
                  group-hover:text-[#806ce0] transition-colors
                ">
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Publications Section */}
      <div className="px-5 pt-6 space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="
            font-nav text-[12px] font-bold text-[#999999] uppercase tracking-wider
            px-2
          "
        >
          Publications
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {PUBLICATIONS.map((item, index) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleItemClick(item)}
              onTouchStart={Haptics.light}
              className="
                group relative overflow-hidden
                w-full min-h-[56px] p-3.5
                bg-white
                rounded-[10px]
                shadow-[0px_2px_8px_0px_rgba(128,108,224,0.06)]
                border border-[rgba(128,108,224,0.08)]
                hover:shadow-[0px_4px_14px_0px_rgba(128,108,224,0.12)]
                hover:border-[#806ce0]
                active:shadow-[0px_1px_4px_0px_rgba(128,108,224,0.08)]
                transition-all duration-150
                touch-manipulation
              "
            >
              <div className="relative flex items-center gap-3">
                {/* Icon with desktop-style background (alternating) */}
                <motion.div
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  className={`
                    size-[40px] rounded-[10px] 
                    flex items-center justify-center
                    ${index % 2 === 0 ? 'bg-[#f5f3ff]' : 'bg-[#f0f0f0]'}
                  `}
                >
                  <item.icon 
                    className="size-[20px] text-[#141016]" 
                    strokeWidth={2}
                  />
                </motion.div>
                
                {/* Label */}
                <span className="
                  flex-1 text-left
                  font-nav text-[14px] font-normal text-[#656565]
                  group-hover:text-[#806ce0] transition-colors
                ">
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Featured Stats Card */}
      <div className="px-5 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatsCard
            number="2,500+"
            label="Insights"
            description="Thought leadership articles and research publications"
            linkText="Explore insights"
            linkHref="/insights/all"
            variant="purple"
          />
        </motion.div>
      </div>

      {/* Subscribe CTA */}
      <div className="px-5 pt-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onTouchStart={Haptics.medium}
        >
          <GradientCTA
            text="Subscribe to Insights"
            href="/insights/subscribe"
            size="lg"
            fullWidth
          />
        </motion.div>
      </div>
    </div>
  );
}