/**
 * PushMenuContainer - Multi-level Navigation State Manager
 * 
 * Handles navigation state, history stack, and panel transitions.
 * 
 * Features:
 * - Stack-based navigation history
 * - Parallax transitions between levels
 * - Swipe-to-go-back gesture support
 * - Breadcrumb navigation
 * - Direction tracking (forward/back)
 * - Transition locking (prevent double-taps)
 */

import { useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PushMenuPanel } from './PushMenuPanel';
import { PushMenuHeader } from './PushMenuHeader';
import { MainMenu } from './levels/MainMenu';
import { SPRING_CONFIG } from '../animations/transitions';

// ========================================
// TYPES
// ========================================

export interface MenuLevel {
  id: string;
  title: string;
  component: React.ComponentType<MenuLevelProps>;
  data?: any;
  breadcrumb: string[];
  componentProps?: any; // Additional props to pass to the component
}

export interface MenuLevelProps {
  onNavigate: (level: MenuLevel) => void;
  onBack: () => void;
  data?: any;
  [key: string]: any; // Allow any additional props
}

interface PushMenuContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

// ========================================
// MAIN COMPONENT
// ========================================

export function PushMenuContainer({ isOpen, onClose }: PushMenuContainerProps) {
  // Navigation state
  const [history, setHistory] = useState<MenuLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<MenuLevel>({
    id: 'main',
    title: 'Menu',
    component: MainMenu,
    breadcrumb: ['Main']
  });
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navigate forward (push new level)
  const navigateForward = useCallback((newLevel: MenuLevel) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection('forward');
    setHistory(prev => [...prev, currentLevel]);
    setCurrentLevel(newLevel);
    
    // Reset transition lock after animation completes
    setTimeout(() => setIsTransitioning(false), 400);
  }, [currentLevel, isTransitioning]);

  // Navigate back (pop to previous level)
  const navigateBack = useCallback(() => {
    if (isTransitioning || history.length === 0) return;
    
    setIsTransitioning(true);
    setDirection('back');
    
    const previousLevel = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentLevel(previousLevel);
    
    setTimeout(() => setIsTransitioning(false), 400);
  }, [history, isTransitioning]);

  // Navigate to specific breadcrumb level
  const navigateToLevel = useCallback((levelIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection('back');
    
    if (levelIndex === 0) {
      // Go to main menu
      setHistory([]);
      setCurrentLevel({
        id: 'main',
        title: 'Menu',
        component: MainMenu,
        breadcrumb: ['Main']
      });
    } else {
      const targetLevel = history[levelIndex - 1];
      setHistory(prev => prev.slice(0, levelIndex - 1));
      setCurrentLevel(targetLevel);
    }
    
    setTimeout(() => setIsTransitioning(false), 400);
  }, [history, isTransitioning]);

  // Close menu and reset to main
  const handleClose = useCallback(() => {
    setHistory([]);
    setCurrentLevel({
      id: 'main',
      title: 'Menu',
      component: MainMenu,
      breadcrumb: ['Main']
    });
    onClose();
  }, [onClose]);

  // Swipe-to-go-back handler
  const handleSwipeBack = useCallback(() => {
    if (history.length > 0) {
      navigateBack();
    } else {
      handleClose();
    }
  }, [history.length, navigateBack, handleClose]);

  return (
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING_CONFIG}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[390px] bg-white z-[101] overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Header with back button */}
            <PushMenuHeader
              title={currentLevel.title}
              breadcrumb={currentLevel.breadcrumb}
              canGoBack={history.length > 0}
              onBack={navigateBack}
              onClose={handleClose}
              onBreadcrumbClick={navigateToLevel}
            />

            {/* Content area with parallax panels */}
            <div className="relative h-[calc(100vh-64px)] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                {/* Background panel (previous menu) - shown when going forward */}
                {history.length > 0 && direction === 'forward' && (
                  <motion.div
                    key={`bg-${history[history.length - 1].id}`}
                    initial={{ 
                      x: 0, 
                      opacity: 1, 
                      filter: 'blur(0px)',
                      scale: 1
                    }}
                    animate={{ 
                      x: '-30%',
                      opacity: 0.4,
                      filter: 'blur(4px)',
                      scale: 0.95
                    }}
                    exit={{ 
                      x: 0, 
                      opacity: 1, 
                      filter: 'blur(0px)',
                      scale: 1
                    }}
                    transition={SPRING_CONFIG}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <PushMenuPanel
                      level={history[history.length - 1]}
                      onNavigate={navigateForward}
                      onBack={navigateBack}
                      isBackground
                    />
                  </motion.div>
                )}

                {/* Foreground panel (current menu) */}
                <motion.div
                  key={currentLevel.id}
                  custom={direction}
                  initial={(dir: string) => ({
                    x: dir === 'forward' ? '100%' : '-30%',
                    opacity: dir === 'forward' ? 1 : 0.4,
                    filter: dir === 'forward' ? 'blur(0px)' : 'blur(4px)',
                    scale: dir === 'forward' ? 1 : 0.95
                  })}
                  animate={{ 
                    x: 0, 
                    opacity: 1, 
                    filter: 'blur(0px)',
                    scale: 1
                  }}
                  exit={(dir: string) => ({
                    x: dir === 'forward' ? '-30%' : '100%',
                    opacity: dir === 'forward' ? 0.4 : 1,
                    filter: dir === 'forward' ? 'blur(4px)' : 'blur(0px)',
                    scale: dir === 'forward' ? 0.95 : 1
                  })}
                  transition={SPRING_CONFIG}
                  className="absolute inset-0"
                >
                  <PushMenuPanel
                    level={currentLevel}
                    onNavigate={navigateForward}
                    onBack={navigateBack}
                    onSwipeBack={handleSwipeBack}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}