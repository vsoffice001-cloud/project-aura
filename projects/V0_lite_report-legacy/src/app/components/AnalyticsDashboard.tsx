/**
 * Analytics Dashboard - Internal tool for viewing engagement metrics
 * 
 * Access: Press Ctrl+Shift+A to toggle dashboard
 * Purpose: Monitor user engagement patterns to validate report demand
 */

import { useState, useEffect } from 'react';
import { X, Download, Trash2, BarChart3, Clock, MousePointer, Eye } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { Button } from '@/design-system/Button';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { getMetrics, exportData, clearData } = useAnalytics();
  const [metrics, setMetrics] = useState<ReturnType<typeof getMetrics>>(null);
  const containerRef = useFocusTrap(isOpen);

  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: () => setIsOpen(false),
    enabled: isOpen,
  });

  // Toggle with Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Refresh metrics when dashboard opens
  useEffect(() => {
    if (isOpen) {
      setMetrics(getMetrics());
      const interval = setInterval(() => {
        setMetrics(getMetrics());
      }, 2000); // Refresh every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen, getMetrics]);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Clear all analytics data? This cannot be undone.')) {
      clearData();
      setMetrics(getMetrics());
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Analytics Dashboard">
      <div className="bg-white rounded-[10px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" ref={containerRef}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-content-icon/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-content-icon" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[1.25rem] font-medium text-black">Analytics Dashboard</h2>
              <p className="text-[0.813rem] text-[var(--black-500)]">Session Engagement Metrics</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
            aria-label="Close analytics dashboard"
          >
            <X className="h-5 w-5 text-[var(--black-500)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!metrics ? (
            <div className="text-center py-12">
              <p className="text-[var(--black-500)]">No analytics data available yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Session Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-periwinkle/5 rounded-[10px] p-4 border border-periwinkle/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-content-icon" />
                    <span className="text-[0.75rem] text-[var(--black-500)] uppercase tracking-wide">Duration</span>
                  </div>
                  <p className="text-[1.563rem] font-semibold text-black">
                    {formatDuration(metrics.sessionDuration)}
                  </p>
                </div>

                <div className="bg-periwinkle/5 rounded-[10px] p-4 border border-periwinkle/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MousePointer className="h-4 w-4 text-content-icon" />
                    <span className="text-[0.75rem] text-[var(--black-500)] uppercase tracking-wide">Events</span>
                  </div>
                  <p className="text-[1.563rem] font-semibold text-black">{metrics.totalEvents}</p>
                </div>

                <div className="bg-periwinkle/5 rounded-[10px] p-4 border border-periwinkle/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-content-icon" />
                    <span className="text-[0.75rem] text-[var(--black-500)] uppercase tracking-wide">CTA Clicks</span>
                  </div>
                  <p className="text-[1.563rem] font-semibold text-black">{metrics.ctaClickCount}</p>
                </div>

                <div className="bg-periwinkle/5 rounded-[10px] p-4 border border-periwinkle/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-content-icon" />
                    <span className="text-[0.75rem] text-[var(--black-500)] uppercase tracking-wide">Chapters</span>
                  </div>
                  <p className="text-[1.563rem] font-semibold text-black">{metrics.chapterExpandCount}</p>
                </div>
              </div>

              {/* Top Engagements */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* CTA Performance */}
                <div className="bg-white rounded-[10px] p-5 border border-black/10">
                  <h3 className="text-[1rem] font-semibold text-black mb-3">Most Clicked CTA</h3>
                  {metrics.mostClickedCTA ? (
                    <div className="bg-periwinkle/5 rounded-[5px] p-3">
                      <p className="text-[0.875rem] text-black font-medium">{metrics.mostClickedCTA}</p>
                      <p className="text-[0.75rem] text-[var(--black-500)] mt-1">Primary conversion action</p>
                    </div>
                  ) : (
                    <p className="text-[0.813rem] text-[var(--black-400)]">No CTA clicks yet</p>
                  )}
                </div>

                {/* Chapter Performance */}
                <div className="bg-white rounded-[10px] p-5 border border-black/10">
                  <h3 className="text-[1rem] font-semibold text-black mb-3">Most Expanded Chapter</h3>
                  {metrics.mostExpandedChapter ? (
                    <div className="bg-periwinkle/5 rounded-[5px] p-3">
                      <p className="text-[0.875rem] text-black font-medium">{metrics.mostExpandedChapter}</p>
                      <p className="text-[0.75rem] text-[var(--black-500)] mt-1">Highest interest topic</p>
                    </div>
                  ) : (
                    <p className="text-[0.813rem] text-[var(--black-400)]">No chapters expanded yet</p>
                  )}
                </div>

                {/* Slide Performance */}
                <div className="bg-white rounded-[10px] p-5 border border-black/10">
                  <h3 className="text-[1rem] font-semibold text-black mb-3">Most Viewed Slide</h3>
                  {metrics.mostViewedSlide !== null ? (
                    <div className="bg-periwinkle/5 rounded-[5px] p-3">
                      <p className="text-[0.875rem] text-black font-medium">Slide {Number(metrics.mostViewedSlide) + 1}</p>
                      <p className="text-[0.75rem] text-[var(--black-500)] mt-1">{metrics.slideViewCount} total views</p>
                    </div>
                  ) : (
                    <p className="text-[0.813rem] text-[var(--black-400)]">No slides viewed yet</p>
                  )}
                </div>

                {/* FAQ Performance */}
                <div className="bg-white rounded-[10px] p-5 border border-black/10">
                  <h3 className="text-[1rem] font-semibold text-black mb-3">FAQ Engagement</h3>
                  {metrics.faqExpandCount > 0 ? (
                    <div className="bg-periwinkle/5 rounded-[5px] p-3">
                      <p className="text-[0.875rem] text-black font-medium">{metrics.faqExpandCount} Questions Opened</p>
                      <p className="text-[0.75rem] text-[var(--black-500)] mt-1">Active information seeking</p>
                    </div>
                  ) : (
                    <p className="text-[0.813rem] text-[var(--black-400)]">No FAQs expanded yet</p>
                  )}
                </div>
              </div>

              {/* Insights */}
              <div className="bg-gradient-to-br from-periwinkle/10 to-periwinkle/5 rounded-[10px] p-5 border border-periwinkle/20">
                <h3 className="text-[1rem] font-semibold text-black mb-3">💡 Session Insights</h3>
                <ul className="space-y-2 text-[0.875rem] text-[var(--black-500)]">
                  {metrics.ctaClickCount > 0 && (
                    <li>✓ User clicked {metrics.ctaClickCount} CTA{metrics.ctaClickCount > 1 ? 's' : ''} - High conversion intent</li>
                  )}
                  {metrics.chapterExpandCount > 0 && (
                    <li>✓ User expanded {metrics.chapterExpandCount} chapter{metrics.chapterExpandCount > 1 ? 's' : ''} - Actively researching content</li>
                  )}
                  {metrics.slideViewCount > 0 && (
                    <li>✓ User viewed {metrics.slideViewCount} slide{metrics.slideViewCount > 1 ? 's' : ''} - Exploring report samples</li>
                  )}
                  {metrics.sessionDuration > 60000 && (
                    <li>✓ Session duration: {formatDuration(metrics.sessionDuration)} - High engagement level</li>
                  )}
                  {metrics.totalEvents === 0 && (
                    <li className="text-[var(--black-400)]">Start interacting with the page to see insights</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-black/10 bg-[var(--black-50)]">
          <div className="text-[0.75rem] text-[var(--black-500)]">
            Press <kbd className="px-2 py-1 bg-white rounded border border-black/10 font-mono">Ctrl+Shift+A</kbd> to toggle
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" icon={<Trash2 />} onClick={handleClear}>
              Clear Data
            </Button>
            <Button variant="secondary" size="sm" icon={<Download />} onClick={handleExport}>
              Export JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}