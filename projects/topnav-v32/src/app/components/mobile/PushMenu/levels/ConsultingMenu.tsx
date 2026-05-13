/**
 * ConsultingMenu - Level 2: Consulting Services Navigation
 * 
 * Features:
 * - Strategy Consulting section
 * - Deals & IPO Advisory section
 * - Featured StatsCard
 * - Book Consultation CTA
 * - Staggered reveal animations
 * - Haptic feedback on interactions
 * - Desktop-consistent color scheme
 */

import { motion } from 'motion/react';
import { Target, TrendingUp, Briefcase, Scale, Users, FileSearch, Search } from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { StatsCard } from '../../../StatsCard';
import { GradientCTA } from '../../../GradientCTA';

// Strategy Consulting (removed colors - using consistent black icons)
const STRATEGY_SERVICES = [
  { 
    id: 'market-entry', 
    label: 'Market Entry', 
    icon: Target,
    href: '/consulting/strategy/market-entry'
  },
  { 
    id: 'market-penetration', 
    label: 'Market Penetration', 
    icon: TrendingUp,
    href: '/consulting/strategy/market-penetration'
  },
  { 
    id: 'product-strategy', 
    label: 'Product Strategy', 
    icon: Briefcase,
    href: '/consulting/strategy/product-strategy'
  },
  { 
    id: 'startup-acceleration', 
    label: 'Startup Acceleration', 
    icon: TrendingUp,
    href: '/consulting/strategy/startup-acceleration'
  }
];

// Deals & IPO Advisory (removed colors - using consistent black icons)
const DEALS_SERVICES = [
  { 
    id: 'ipo-advisory', 
    label: 'IPO Advisory', 
    icon: Scale,
    href: '/consulting/deals/ipo-advisory'
  },
  { 
    id: 'deal-sourcing', 
    label: 'Deal Sourcing', 
    icon: FileSearch,
    href: '/consulting/deals/deal-sourcing'
  },
  { 
    id: 'due-diligence', 
    label: 'Due Diligence', 
    icon: FileSearch,
    href: '/consulting/deals/due-diligence'
  },
  { 
    id: 'investor-relations', 
    label: 'Investor Relations', 
    icon: Users,
    href: '/consulting/deals/investor-relations'
  }
];

export function ConsultingMenu({ onNavigate, onBack }: MenuLevelProps) {
  const handleItemClick = (item: typeof STRATEGY_SERVICES[0] | typeof DEALS_SERVICES[0]) => {
    Haptics.light();
    
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className="p-5 space-y-6 pb-8">
      {/* Search Bar - Desktop-consistent styling */}
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
            placeholder="Search consulting services..."
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

      {/* Strategy Consulting Section */}
      <div className="space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="
            font-nav text-[12px] font-bold text-[#999999] uppercase tracking-wider
            px-2
          "
        >
          Strategy Consulting
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {STRATEGY_SERVICES.map((item, index) => (
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

      {/* Deals & IPO Advisory Section */}
      <div className="space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="
            font-nav text-[12px] font-bold text-[#999999] uppercase tracking-wider
            px-2
          "
        >
          Deals & IPO Advisory
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {DEALS_SERVICES.map((item, index) => (
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

      {/* Featured Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <StatsCard
          number="500+"
          label="Projects"
          description="Successful consulting engagements delivered globally"
          linkText="View case studies"
          linkHref="/consulting/case-studies"
          variant="purple"
        />
      </motion.div>

      {/* Book Consultation CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onTouchStart={Haptics.medium}
      >
        <GradientCTA
          text="Book Consultation"
          href="/consulting/book"
          size="lg"
          fullWidth
        />
      </motion.div>
    </div>
  );
}