/**
 * MainMenu - Level 1: Primary Navigation
 * 
 * The main entry point for mobile navigation with:
 * - 5 primary nav items (Reports, Industries, Surveys, Consulting, Insights)
 * - Search bar with auto-focus
 * - Staggered reveal animation
 * - Menu item cards with icons, labels, counts, arrows
 * - CTA button
 * - Secondary links
 * 
 * Uses your design system:
 * - 5px border radius (buttons)
 * - Purple/red colors
 * - 8px spacing grid
 * - DM Sans font
 */

import { motion } from 'motion/react';
import { Search, FileText, Building2, BarChart2, Briefcase, Lightbulb, LogIn, User } from 'lucide-react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { ReportsMenu } from './ReportsMenu';
import { IndustriesMenu } from './IndustriesMenu';
import { SurveysMenu } from './SurveysMenu';
import { ConsultingMenu } from './ConsultingMenu';
import { InsightsMenu } from './InsightsMenu';
import { useAuth } from '../../../../context/AuthContext';

// Menu items data (from your existing navigation)
const MAIN_MENU_ITEMS = [
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: FileText,
    count: 125,
    nextLevel: ReportsMenu
  },
  { 
    id: 'industries', 
    label: 'Industries', 
    icon: Building2,
    count: 14,
    nextLevel: IndustriesMenu
  },
  { 
    id: 'surveys', 
    label: 'Surveys', 
    icon: BarChart2,
    count: 32,
    nextLevel: SurveysMenu
  },
  { 
    id: 'consulting', 
    label: 'Consulting', 
    icon: Briefcase,
    count: 18,
    nextLevel: ConsultingMenu
  },
  { 
    id: 'insights', 
    label: 'Insights', 
    icon: Lightbulb,
    count: 67,
    nextLevel: InsightsMenu
  }
];

export function MainMenu({ onNavigate }: MenuLevelProps) {
  const { isAuthenticated } = useAuth();
  const handleItemClick = (item: typeof MAIN_MENU_ITEMS[0]) => {
    if (!item.nextLevel) return;
    
    Haptics.light();
    
    onNavigate({
      id: item.id,
      title: item.label,
      component: item.nextLevel,
      breadcrumb: ['Main', item.label]
    });
  };

  return (
    <div className="p-5 space-y-6">
      {/* Search Bar - Clean Modern Design */}
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
            placeholder="Search..."
            autoFocus
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

      {/* Primary Navigation Items - Staggered Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {MAIN_MENU_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleItemClick(item)}
            onTouchStart={Haptics.light}
            disabled={!item.nextLevel}
            className="
              group relative overflow-hidden
              w-full min-h-[64px] p-4
              bg-gradient-to-r from-white to-[#fcfcfc]
              rounded-[14px]
              shadow-[0px_2px_10px_0px_rgba(128,108,224,0.08)]
              border border-[rgba(128,108,224,0.1)]
              hover:shadow-[0px_4px_18px_0px_rgba(128,108,224,0.15)]
              hover:border-[#806ce0]
              active:shadow-[0px_1px_6px_0px_rgba(128,108,224,0.1)]
              transition-all duration-150
              disabled:opacity-50 disabled:cursor-not-allowed
              touch-manipulation
            "
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>

            <div className="relative flex items-center gap-4">
              {/* Icon with light purple background (matching desktop) */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="
                  size-[48px] rounded-full
                  bg-[#f5f3ff]
                  flex items-center justify-center
                "
              >
                <item.icon 
                  className="size-[24px] text-[#141016]" 
                  strokeWidth={2}
                />
              </motion.div>
              
              {/* Text */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="
                    font-nav text-[16px] font-semibold text-[#141016]
                    group-hover:text-[#806ce0] transition-colors
                  ">
                    {item.label}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
                    className="
                      px-2 py-0.5 rounded-full
                      bg-[#f5f3ff]
                      text-[11px] font-semibold text-[#806ce0]
                    "
                  >
                    {item.count}
                  </motion.span>
                </div>
              </div>
              
              {/* Arrow indicator */}
              {item.nextLevel && (
                <motion.svg
                  className="size-[16px] text-[#999999] group-hover:text-[#806ce0]"
                  fill="none"
                  viewBox="0 0 16 16"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <path 
                    d="M6 4L10 8L6 12" 
                    stroke="currentColor" 
                    strokeWidth={2} 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onTouchStart={Haptics.medium}
        className="
          w-full py-4 px-6
          bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24]
          rounded-[12px]
          font-nav text-[15px] font-bold text-white
          shadow-[0px_4px_16px_0px_rgba(176,31,36,0.25)]
          hover:shadow-[0px_6px_24px_0px_rgba(176,31,36,0.35)]
          active:shadow-[0px_2px_8px_0px_rgba(176,31,36,0.2)]
          transition-all duration-150
          touch-manipulation
        "
      >
        Book Discovery Call
      </motion.button>

      {/* Secondary Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-4 border-t border-gray-100 space-y-2"
      >
        {isAuthenticated ? (
          <a 
            href="/account" 
            className="
              block py-3 px-3 rounded-[8px]
              text-[14px] text-[#656565] font-nav
              hover:text-[#b01f24] hover:bg-gray-50
              transition-colors
              touch-manipulation min-h-[44px] flex items-center gap-2
            "
            onTouchStart={Haptics.light}
          >
            <User className="size-[14px]" strokeWidth={2} />
            My Account
          </a>
        ) : (
          <a 
            href="/auth?mode=signin" 
            className="
              block py-3 px-3 rounded-[8px]
              text-[14px] text-[#656565] font-nav
              hover:text-[#b01f24] hover:bg-gray-50
              transition-colors
              touch-manipulation min-h-[44px] flex items-center gap-2
            "
            onTouchStart={Haptics.light}
          >
            <LogIn className="size-[14px]" strokeWidth={2} />
            Sign in
          </a>
        )}
        <a 
          href="/procurement" 
          className="
            block py-3 px-3 rounded-[8px]
            text-[14px] text-[#656565] font-nav
            hover:text-[#b01f24] hover:bg-gray-50
            transition-colors
            touch-manipulation min-h-[44px] flex items-center
          "
          onTouchStart={Haptics.light}
        >
          Procurement
        </a>
        <a 
          href="/expert-panel" 
          className="
            block py-3 px-3 rounded-[8px]
            text-[14px] text-[#656565] font-nav
            hover:text-[#b01f24] hover:bg-gray-50
            transition-colors
            touch-manipulation min-h-[44px] flex items-center
          "
          onTouchStart={Haptics.light}
        >
          Expert Panel
        </a>
        <a 
          href="/company" 
          className="
            block py-3 px-3 rounded-[8px]
            text-[14px] text-[#656565] font-nav
            hover:text-[#b01f24] hover:bg-gray-50
            transition-colors
            touch-manipulation min-h-[44px] flex items-center
          "
          onTouchStart={Haptics.light}
        >
          Company
        </a>
      </motion.div>
    </div>
  );
}