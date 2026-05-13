/**
 * SurveysMenu - Level 2: Surveys Navigation
 * 
 * Features:
 * - Survey Verticals section (5 categories)
 * - Featured StatsCard
 * - Request Survey CTA
 * - Staggered reveal animations
 * - Haptic feedback on interactions
 * - Desktop-consistent color scheme
 */

import { motion } from 'motion/react';
import { BarChart3, Users, Heart, DollarSign, Search as SearchIcon } from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { StatsCard } from '../../../StatsCard';
import { GradientCTA } from '../../../GradientCTA';

// Survey Verticals (removed colors - using consistent black icons)
const SURVEY_VERTICALS = [
  { 
    id: 'brand-perception', 
    label: 'Brand Perception', 
    icon: BarChart3,
    href: 'https://www.kenresearch.com/survey/brand-awareness-recall-survey'
  },
  { 
    id: 'c-sat', 
    label: 'C-SAT', 
    icon: Users,
    href: 'https://www.kenresearch.com/survey/customer-satisfaction-survey'
  },
  { 
    id: 'dealer-voice', 
    label: "Dealer's Voice", 
    icon: Users,
    href: '/surveys/dealer-voice'
  },
  { 
    id: 'employee-engagement', 
    label: 'Employee Engagement', 
    icon: Heart,
    href: '/surveys/employee-engagement'
  },
  { 
    id: 'customer-need', 
    label: 'Customer Need & Pain Point', 
    icon: SearchIcon,
    href: '/surveys/customer-need'
  }
];

export function SurveysMenu({ onNavigate, onBack }: MenuLevelProps) {
  const handleItemClick = (item: typeof SURVEY_VERTICALS[0]) => {
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
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-[16px] text-[#656565]" strokeWidth={2} />
          
          <input
            type="text"
            placeholder="Search surveys..."
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

      {/* Survey Verticals Section */}
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
          Survey Verticals
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {SURVEY_VERTICALS.map((item, index) => (
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <StatsCard
          number="50,000+"
          label="Responses"
          description="Survey responses collected across all industries and regions"
          linkText="View survey portfolio"
          linkHref="/surveys/portfolio"
          variant="purple"
        />
      </motion.div>

      {/* Request Survey CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onTouchStart={Haptics.medium}
      >
        <GradientCTA
          text="Request Custom Survey"
          href="/surveys/request"
          size="lg"
          fullWidth
        />
      </motion.div>
    </div>
  );
}