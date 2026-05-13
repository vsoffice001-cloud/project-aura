/**
 * PushMenuPanel - Animated Panel with Swipe Support
 * 
 * Wraps menu content with:
 * - Swipe-to-go-back gesture handling
 * - Smooth scroll behavior
 * - Background blur when inactive
 */

import { motion, useMotionValue, PanInfo } from 'motion/react';
import { MenuLevel, MenuLevelProps } from './PushMenuContainer';
import { GESTURE, Haptics } from '../animations/transitions';

interface PushMenuPanelProps {
  level: MenuLevel;
  onNavigate: (level: MenuLevel) => void;
  onBack: () => void;
  onSwipeBack?: () => void;
  isBackground?: boolean;
}

export function PushMenuPanel({ 
  level, 
  onNavigate, 
  onBack, 
  onSwipeBack,
  isBackground = false 
}: PushMenuPanelProps) {
  const x = useMotionValue(0);

  // Swipe gesture handler
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Swipe right to go back
    if (
      offset.x > GESTURE.swipeThreshold || 
      velocity.x > GESTURE.velocityThreshold
    ) {
      if (onSwipeBack) {
        Haptics.light();
        onSwipeBack();
      }
    } else {
      // Snap back to position
      x.set(0);
    }
  };

  const Component = level.component;

  return (
    <motion.div
      drag={!isBackground && onSwipeBack ? 'x' : false}
      dragConstraints={{ left: 0, right: 400 }}
      dragElastic={{ left: 0, right: 0.2 }}
      onDragEnd={!isBackground ? handleDragEnd : undefined}
      style={{ x: !isBackground ? x : undefined }}
      className="h-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-white to-[#fcfcfc] custom-scrollbar"
    >
      <Component 
        onNavigate={onNavigate} 
        onBack={onBack}
        data={level.data}
        {...(level.componentProps || {})}
      />
    </motion.div>
  );
}