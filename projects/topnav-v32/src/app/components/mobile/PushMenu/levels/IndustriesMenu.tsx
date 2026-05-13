/**
 * IndustriesMenu - Level 2: Industries List
 * 
 * Features:
 * - 14 industries from /src/data/industries.tsx
 * - Icons from lucide-react
 * - Each item navigates to Level 3 (IndustryDetail - coming soon)
 * - Scrollable list with staggered animations
 * - Search bar for filtering
 * - Quick Access cards at bottom
 */

import { motion } from 'motion/react';
import { 
  Sprout, Truck, Building2, ShoppingBag, Shield, GraduationCap,
  Zap, UtensilsCrossed, HeartPulse, Hotel, Factory, Film, Home, Cpu,
  Search, ChevronRight, FileText, Target
} from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { IndustryDetail } from './IndustryDetail';

// Industry mapping (removed colors - using consistent black icons)
const INDUSTRIES = [
  { id: 'agriculture', label: 'Agriculture & Animal Care', icon: Sprout },
  { id: 'automotive', label: 'Automotive, Transportation & Warehousing', icon: Truck },
  { id: 'banking', label: 'BFSI', icon: Building2 },
  { id: 'consumer-products', label: 'Consumer Products & Retail', icon: ShoppingBag },
  { id: 'defense', label: 'Defense & Security', icon: Shield },
  { id: 'education', label: 'Education & Recruitment', icon: GraduationCap },
  { id: 'energy', label: 'Energy & Utilities', icon: Zap },
  { id: 'food-beverage', label: 'Food, Beverage & Tobacco', icon: UtensilsCrossed },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'hospitality', label: 'Hospitality & Tourism', icon: Hotel },
  { id: 'manufacturing', label: 'Manufacturing & Construction', icon: Factory },
  { id: 'media', label: 'Media & Entertainment', icon: Film },
  { id: 'real-estate', label: 'Real Estate & Construction', icon: Home },
  { id: 'technology', label: 'Technology & Telecom', icon: Cpu }
];

// Quick Access items at bottom
const QUICK_ACCESS = [
  { id: 'industry-reports', label: 'Industry Reports', icon: FileText, href: '/reports/industry' },
  { id: 'benchmarking', label: 'Benchmarking', icon: Target, href: '/reports/benchmarking' }
];

export function IndustriesMenu({ onNavigate, onBack }: MenuLevelProps) {
  const handleIndustryClick = (industry: typeof INDUSTRIES[0]) => {
    Haptics.light();
    
    // Navigate to IndustryDetail (Level 3)
    onNavigate({
      id: `industry-${industry.id}`,
      title: industry.label,
      component: IndustryDetail,
      breadcrumb: ['Main', 'Industries', industry.label],
      componentProps: { industryId: industry.id }
    });
  };

  const handleQuickAccessClick = (item: typeof QUICK_ACCESS[0]) => {
    Haptics.light();
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className="pb-8">
      {/* Search Bar */}
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
              placeholder="Search industries..."
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

      {/* Industries List */}
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
          {INDUSTRIES.map((industry) => (
            <motion.button
              key={industry.id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleIndustryClick(industry)}
              onTouchStart={Haptics.light}
              className="
                group relative overflow-hidden
                w-full min-h-[60px] p-3.5
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
              {/* Subtle shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>

              <div className="relative flex items-center gap-3">
                {/* Icon with desktop-style background (alternating) */}
                <motion.div
                  whileTap={{ scale: 0.9, rotate: -3 }}
                  className={`
                    size-[44px] rounded-[10px] 
                    flex items-center justify-center
                    ${INDUSTRIES.indexOf(industry) % 2 === 0 ? 'bg-[#f5f3ff]' : 'bg-[#f0f0f0]'}
                  `}
                >
                  <industry.icon 
                    className="size-[22px] text-[#141016]" 
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
                  {industry.label}
                </span>
                
                {/* Arrow indicator */}
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                >
                  <ChevronRight 
                    className="size-[18px] text-[#656565] group-hover:text-[#806ce0] transition-colors" 
                    strokeWidth={2} 
                  />
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Quick Access Cards */}
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
          Quick Access
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          {QUICK_ACCESS.map((item, index) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleQuickAccessClick(item)}
              onTouchStart={Haptics.light}
              className="
                group relative overflow-hidden
                w-full min-h-[56px] p-3.5
                bg-gradient-to-br from-[#fcfcfc] to-white
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
                {/* Icon with desktop-style background */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`
                    size-[40px] rounded-[10px] 
                    flex items-center justify-center
                    ${index === 0 ? 'bg-[#f5f3ff]' : 'bg-[#f0f0f0]'}
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
    </div>
  );
}