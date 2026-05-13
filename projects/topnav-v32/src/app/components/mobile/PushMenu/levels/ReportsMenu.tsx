/**
 * ReportsMenu - Level 2: Reports Navigation
 * 
 * Features:
 * - Quick Links section (4 items)
 * - Report Types section (4 items)
 * - Featured StatsCard
 * - Request Study CTA
 * - Staggered reveal animations
 * - Haptic feedback on interactions
 */

import { motion } from 'motion/react';
import { FileText, Building2, Globe, Sparkles, BarChart3, Globe2, MapPin, Target, Search, ChevronRight } from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { StatsCard } from '../../../StatsCard';
import { GradientCTA } from '../../../GradientCTA';

// Quick Links Section
const QUICK_LINKS = [
  { 
    id: 'all-reports', 
    label: 'All Reports', 
    icon: FileText,
    href: '/reports/all'
  },
  { 
    id: 'by-industry', 
    label: 'By Industry', 
    icon: Building2,
    hasArrow: true  // Leads to Level 3
  },
  { 
    id: 'by-region', 
    label: 'By Region', 
    icon: Globe,
    href: '/reports/by-region'
  },
  { 
    id: 'latest', 
    label: 'Latest Releases', 
    icon: Sparkles,
    href: '/reports/latest'
  }
];

// Report Types Section
const REPORT_TYPES = [
  { 
    id: 'industry-reports', 
    label: 'Industry Reports', 
    icon: BarChart3,
    href: '/reports/industry'
  },
  { 
    id: 'global-reports', 
    label: 'Global Reports', 
    icon: Globe2,
    href: '/reports/global'
  },
  { 
    id: 'regional-reports', 
    label: 'Regional Reports', 
    icon: MapPin,
    href: '/reports/regional'
  },
  { 
    id: 'benchmarking', 
    label: 'Competition Benchmarking', 
    icon: Target,
    href: '/reports/benchmarking'
  }
];

export function ReportsMenu({ onNavigate, onBack }: MenuLevelProps) {
  const handleItemClick = (item: typeof QUICK_LINKS[0] | typeof REPORT_TYPES[0]) => {
    Haptics.light();
    
    if (item.hasArrow) {
      // TODO: Navigate to IndustriesMenu (Level 3)
      // onNavigate({ ... });
      return;
    }
    
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className="p-5 space-y-6 pb-8">
      {/* Contextual Search Bar */}
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
            placeholder="Search reports..."
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

      {/* Quick Links Section */}
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
          Quick Links
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {QUICK_LINKS.map((item) => (
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
                {/* Icon with desktop-style background */}
                <motion.div
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  className="
                    size-[40px] rounded-[10px] 
                    bg-[#f5f3ff]
                    flex items-center justify-center
                  "
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
                
                {/* Arrow indicator (if applicable) */}
                {item.hasArrow && (
                  <ChevronRight className="size-[18px] text-[#656565] group-hover:text-[#806ce0] transition-colors" strokeWidth={2} />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Report Types Section */}
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
          Report Types
        </motion.h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {REPORT_TYPES.map((item, index) => (
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

      {/* Featured StatsCard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <StatsCard
          number="10 Lac+"
          label="Reports"
          description="Access comprehensive market research across all industries and regions"
          linkText="Explore all reports"
          linkHref="/reports/all"
          variant="purple"
        />
      </motion.div>

      {/* Request Study CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onTouchStart={Haptics.medium}
      >
        <GradientCTA
          text="Request Custom Study"
          href="/request-study"
          size="lg"
          fullWidth
        />
      </motion.div>
    </div>
  );
}