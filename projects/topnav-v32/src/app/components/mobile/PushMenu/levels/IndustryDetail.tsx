/**
 * IndustryDetail - Level 3: Industry-Specific Navigation
 * 
 * Dynamic component that displays details for a selected industry:
 * - Industry name and segment count
 * - 2-column segment grid (from industries data)
 * - Popular tags/topics (pills)
 * - Explore Industry CTA
 * - Staggered reveal animations
 * - Haptic feedback on interactions
 */

import { motion } from 'motion/react';
import { MenuLevelProps } from '../PushMenuContainer';
import { containerVariants, itemVariants, Haptics } from '../../animations/transitions';
import { GradientCTA } from '../../../GradientCTA';
import { industries, Industry } from '@/data/industries';

interface IndustryDetailProps extends MenuLevelProps {
  industryId: string;
}

export function IndustryDetail({ industryId, onNavigate, onBack }: IndustryDetailProps) {
  // Find the industry from data
  const industry = industries.find(ind => ind.id === industryId);

  if (!industry) {
    return (
      <div className="p-5">
        <p className="text-[#656565] font-nav">Industry not found</p>
      </div>
    );
  }

  const segments = industry.segments || [];
  const popularTopics = industry.popularTopics || [];
  const ctaText = industry.ctaText || industry.label;

  const handleSegmentClick = (segment: typeof segments[0]) => {
    Haptics.light();
    window.location.href = segment.href;
  };

  const handleTopicClick = (topic: string) => {
    Haptics.light();
    // Navigate to search/filter for this topic
    window.location.href = `/search?topic=${encodeURIComponent(topic)}&industry=${industryId}`;
  };

  return (
    <div className="p-5 space-y-6 pb-8">
      {/* Industry Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <h2 className="font-nav text-[20px] font-medium text-[#141016]">
          {industry.label}
        </h2>
        <p className="font-nav text-[13px] text-[#656565]">
          {segments.length} segment{segments.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Segments Section (2-column grid) */}
      {segments.length > 0 && (
        <div>
          <h3 className="text-[12px] font-nav font-medium text-[#999999] uppercase tracking-wide mb-3 px-1">
            Segments
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3"
          >
            {segments.map((segment, index) => (
              <motion.button
                key={segment.name}
                variants={itemVariants}
                custom={index}
                onClick={() => handleSegmentClick(segment)}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center p-3 bg-white rounded-[10px] shadow-[0px_2px_10px_rgba(128,108,224,0.08)] hover:shadow-[0px_4px_18px_rgba(128,108,224,0.15)] transition-all duration-200 group"
              >
                <span className="text-center font-nav text-[13px] text-[#141016] group-hover:text-[#b01f24] transition-colors leading-tight">
                  {segment.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}

      {/* Popular Topics Section (Pills) - Desktop-consistent styling */}
      {popularTopics.length > 0 && (
        <div>
          <h3 className="text-[12px] font-nav font-bold text-[#999999] uppercase tracking-wider mb-3 px-1">
            Popular Tags
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {popularTopics.map((topic, index) => (
              <motion.button
                key={topic}
                variants={itemVariants}
                custom={segments.length + index}
                onClick={() => handleTopicClick(topic)}
                onTouchStart={Haptics.light}
                whileTap={{ scale: 0.95 }}
                className="
                  px-3 py-1.5
                  bg-[#fcfcfc]
                  border border-[rgba(20,16,22,0.1)]
                  rounded-full
                  font-nav text-[12px] font-normal text-[#656565]
                  hover:text-[#b01f24]
                  hover:bg-white
                  hover:border-[#b01f24]
                  hover:shadow-[0px_2px_8px_0px_rgba(176,31,36,0.15)]
                  transition-all duration-200
                  touch-manipulation
                "
              >
                {topic}
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}

      {/* Explore Industry CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <GradientCTA
          text={`Explore ${ctaText}`}
          href={`/industries/${industryId}`}
        />
      </motion.div>
    </div>
  );
}