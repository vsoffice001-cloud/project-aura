/**
 * Analytics Hook - Track user interactions for conversion optimization
 * 
 * Purpose: Validate which v0 lite reports should be developed into full reports
 * by tracking user engagement patterns across the landing page.
 */

import { useCallback } from 'react';

export interface AnalyticsEvent {
  eventType: 'cta_click' | 'section_view' | 'chapter_expand' | 'slide_view' | 'faq_expand' | 'scroll_depth';
  eventName: string;
  section: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface AnalyticsSession {
  sessionId: string;
  startTime: number;
  events: AnalyticsEvent[];
  userAgent: string;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private session: AnalyticsSession | null = null;
  private readonly STORAGE_KEY = 'ken_research_analytics_session';

  private constructor() {
    this.initializeSession();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private initializeSession(): void {
    // Check if session exists in localStorage
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (stored) {
      try {
        this.session = JSON.parse(stored);
        // Validate session is less than 30 minutes old
        const sessionAge = Date.now() - (this.session?.startTime || 0);
        if (sessionAge > 30 * 60 * 1000) {
          // Session expired, create new one
          this.createNewSession();
        }
      } catch (e) {
        this.createNewSession();
      }
    } else {
      this.createNewSession();
    }
  }

  private createNewSession(): void {
    this.session = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      events: [],
      userAgent: navigator.userAgent,
    };
    this.persistSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private persistSession(): void {
    if (this.session) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.session));
    }
  }

  trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    if (!this.session) {
      this.createNewSession();
    }

    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };

    this.session!.events.push(fullEvent);
    this.persistSession();

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', fullEvent);
    }
  }

  getSessionData(): AnalyticsSession | null {
    return this.session;
  }

  exportSessionData(): string {
    return JSON.stringify(this.session, null, 2);
  }

  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.createNewSession();
  }

  // Get engagement metrics
  getMetrics() {
    if (!this.session) return null;

    const events = this.session.events;
    const ctaClicks = events.filter(e => e.eventType === 'cta_click');
    const chapterExpands = events.filter(e => e.eventType === 'chapter_expand');
    const slideViews = events.filter(e => e.eventType === 'slide_view');
    const faqExpands = events.filter(e => e.eventType === 'faq_expand');

    return {
      sessionDuration: Date.now() - this.session.startTime,
      totalEvents: events.length,
      ctaClickCount: ctaClicks.length,
      mostClickedCTA: this.getMostFrequent(ctaClicks.map(e => e.eventName)),
      chapterExpandCount: chapterExpands.length,
      mostExpandedChapter: this.getMostFrequent(chapterExpands.map(e => e.metadata?.chapterTitle || '')),
      slideViewCount: slideViews.length,
      mostViewedSlide: this.getMostFrequent(slideViews.map(e => e.metadata?.slideIndex || 0)),
      faqExpandCount: faqExpands.length,
      mostExpandedFAQ: this.getMostFrequent(faqExpands.map(e => e.metadata?.question || '')),
    };
  }

  private getMostFrequent(arr: any[]): any {
    if (arr.length === 0) return null;
    const frequency: Record<string, number> = {};
    arr.forEach(item => {
      const key = String(item);
      frequency[key] = (frequency[key] || 0) + 1;
    });
    return Object.entries(frequency).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }
}

// React Hook
export function useAnalytics() {
  const analytics = AnalyticsService.getInstance();

  const trackCTAClick = useCallback((ctaName: string, section: string, metadata?: Record<string, any>) => {
    analytics.trackEvent({
      eventType: 'cta_click',
      eventName: ctaName,
      section,
      metadata,
    });
  }, []);

  const trackSectionView = useCallback((sectionName: string, metadata?: Record<string, any>) => {
    analytics.trackEvent({
      eventType: 'section_view',
      eventName: sectionName,
      section: sectionName,
      metadata,
    });
  }, []);

  const trackChapterExpand = useCallback((chapterTitle: string, chapterNumber: string, section: string) => {
    analytics.trackEvent({
      eventType: 'chapter_expand',
      eventName: `Chapter ${chapterNumber} Expanded`,
      section,
      metadata: { chapterTitle, chapterNumber },
    });
  }, []);

  const trackSlideView = useCallback((slideIndex: number, slideName: string, section: string) => {
    analytics.trackEvent({
      eventType: 'slide_view',
      eventName: slideName,
      section,
      metadata: { slideIndex, slideName },
    });
  }, []);

  const trackFAQExpand = useCallback((question: string, faqId: number, section: string) => {
    analytics.trackEvent({
      eventType: 'faq_expand',
      eventName: 'FAQ Expanded',
      section,
      metadata: { question, faqId },
    });
  }, []);

  const trackScrollDepth = useCallback((depth: number, section: string) => {
    analytics.trackEvent({
      eventType: 'scroll_depth',
      eventName: `Scrolled to ${depth}%`,
      section,
      metadata: { depth },
    });
  }, []);

  const getMetrics = useCallback(() => {
    return analytics.getMetrics();
  }, []);

  const exportData = useCallback(() => {
    return analytics.exportSessionData();
  }, []);

  const clearData = useCallback(() => {
    analytics.clearSession();
  }, []);

  return {
    trackCTAClick,
    trackSectionView,
    trackChapterExpand,
    trackSlideView,
    trackFAQExpand,
    trackScrollDepth,
    getMetrics,
    exportData,
    clearData,
  };
}