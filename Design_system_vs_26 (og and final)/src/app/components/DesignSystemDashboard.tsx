import { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Search, 
  Download, 
  Book,
  Layers,
  Box,
  Grid,
  Sparkles,
  FileText,
  Package,
  Home,
  Palette,
  Type,
  Space,
  Layout,
  Lightbulb,
  Circle,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/app/components/Button';
import {
  ColorsContent,
  AllColorsPaletteContent,
  TypographyContent,
  AllTypographyTokensContent,
  SpacingContent,
  AllSpacingTokensContent,
  LayoutGridContent,
  AllLayoutGridTokensContent,
  ElevationContent,
  AllElevationTokensContent,
  BorderRadiusContent,
  AllBorderRadiusTokensContent
} from '@/app/components/FoundationsContent';
import {
  ButtonDocumentation,
  LinksDocumentation,
  BadgeLabelsDocumentation,
  FormInputsContent,
  CardsContent,
  NavigationContent,
  FeedbackContent,
  IconsContent,
  FiltersContent
} from '@/app/components/ComponentsContent';
import {
  PageLayoutsContent,
  ReportStorePagesContent,
  SurveysPagesContent,
  ContentPatternsContent,
  BackgroundsContent
} from '@/app/components/PatternsContent';
import { ReportStorePage } from '@/app/components/ReportStorePage';
import { ReportStoreOrganismsShowcase } from '@/app/components/ReportStoreOrganismsShowcase';
import { SurveysDemoContent } from '@/app/components/SurveysDemoContent';
import { SurveysListingDemoContent } from '@/app/components/SurveysListingDemoContent';
import { TemplateDemoContent } from '@/app/components/TemplateDemoContent';
import {
  MotionPrinciplesContent,
  DurationScaleContent,
  TransitionsContent,
  MicroInteractionsContent
} from '@/app/components/MotionContent';
import {
  AccessibilityContent,
  ResponsiveDesignContent,
  BestPracticesContent
} from '@/app/components/GuidelinesContent';
import {
  DownloadsContent,
  CodeSnippetsContent,
  DesignTokensContent
} from '@/app/components/ResourcesContent';

/**
 * PROJECT K — DESIGN SYSTEM DASHBOARD
 * ====================================
 * Professional design system dashboard by Vishal Singh Chauhan
 * 
 * Structure:
 * 1. Overview - Getting Started
 * 2. Foundations - Design Tokens
 * 3. Components - UI Library
 * 4. Patterns - Design Patterns
 * 5. Motion - Animations
 * 6. Guidelines - Best Practices
 * 7. Resources - Assets & Tools
 */

// Types
type TabId = 'overview' | 'foundations' | 'components' | 'patterns' | 'motion' | 'guidelines' | 'resources';
type SubTabId = string;

interface NavigationItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  subItems?: {
    id: SubTabId;
    label: string;
  }[];
}

export function DesignSystemDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('welcome');
  
  const [expandedSections, setExpandedSections] = useState<TabId[]>(() => {
    const defaults: TabId[] = ['overview', 'foundations'];
    if (activeTab && !defaults.includes(activeTab)) {
      return [...defaults, activeTab];
    }
    return defaults;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Scroll main content to top whenever the active page changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    // Auto-expand the active tab's section in sidebar
    if (activeTab && !expandedSections.includes(activeTab)) {
      setExpandedSections(prev => [...prev, activeTab]);
    }
  }, [activeTab, activeSubTab]);

  // Navigation structure
  const navigation: NavigationItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Home size={18} />,
      subItems: [
        { id: 'welcome', label: 'Welcome' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'principles', label: 'Design Principles' },
        { id: 'quickstart', label: 'Quick Start' },
        { id: 'whats-new', label: "What's New" },
      ]
    },
    {
      id: 'foundations',
      label: 'Foundations',
      icon: <Layers size={18} />,
      subItems: [
        { id: 'colors', label: 'Colors - Overview & Usage' },
        { id: 'all-colors-palette', label: 'All Colors Palette (50-900)' },
        { id: 'typography', label: 'Typography - Overview & Usage' },
        { id: 'all-typography-tokens', label: 'All Typography Tokens (Complete)' },
        { id: 'spacing', label: 'Spacing - Overview & Usage' },
        { id: 'all-spacing-tokens', label: 'All Spacing Tokens (Complete)' },
        { id: 'layout-grid', label: 'Layout & Grid - Overview & Usage' },
        { id: 'all-layout-grid-tokens', label: 'All Layout & Grid Tokens (Complete)' },
        { id: 'elevation', label: 'Elevation - Overview & Usage' },
        { id: 'all-elevation-tokens', label: 'All Elevation Tokens (Complete)' },
        { id: 'radius', label: 'Border Radius - Overview & Usage' },
        { id: 'all-radius-tokens', label: 'All Border Radius Tokens (Complete)' },
      ]
    },
    {
      id: 'components',
      label: 'Components',
      icon: <Box size={18} />,
      subItems: [
        { id: 'buttons', label: 'Buttons' },
        { id: 'links-ctas', label: 'Links & CTAs' },
        { id: 'badges-labels', label: 'Badges & Section Labels' },
        { id: 'forms', label: 'Form Inputs' },
        { id: 'cards', label: 'Cards' },
        { id: 'navigation', label: 'Navigation' },
        { id: 'feedback', label: 'Feedback' },
        { id: 'icons', label: 'Icons' },
        { id: 'filters', label: 'Filters' },
      ]
    },
    {
      id: 'patterns',
      label: 'Patterns',
      icon: <Grid size={18} />,
      subItems: [
        { id: 'page-layouts', label: 'Consulting Pages' },
        { id: 'report-store-pages', label: 'Report Store Pages' },
        { id: 'report-store-organisms', label: 'RS Organisms' },
        { id: 'report-store-demo', label: 'Report Store Demo' },
        { id: 'report-store-listing', label: 'RS Listing' },
        { id: 'surveys-pages', label: 'Surveys Pages' },
        { id: 'surveys-demo', label: 'Surveys Demo' },
        { id: 'surveys-listing', label: 'Surveys Listing' },
        { id: 'template-demo', label: 'Template Demo' },
        { id: 'content-patterns', label: 'Content Patterns' },
        { id: 'backgrounds', label: 'Backgrounds' },
      ]
    },
    {
      id: 'motion',
      label: 'Motion',
      icon: <Sparkles size={18} />,
      subItems: [
        { id: 'motion-principles', label: 'Principles' },
        { id: 'duration-scale', label: 'Duration Scale' },
        { id: 'transitions', label: 'Transitions' },
        { id: 'micro-interactions', label: 'Micro-interactions' },
      ]
    },
    {
      id: 'guidelines',
      label: 'Guidelines',
      icon: <FileText size={18} />,
      subItems: [
        { id: 'accessibility', label: 'Accessibility' },
        { id: 'responsive', label: 'Responsive Design' },
        { id: 'best-practices', label: 'Best Practices' },
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: <Package size={18} />,
      subItems: [
        { id: 'downloads', label: 'Downloads' },
        { id: 'code-snippets', label: 'Code Snippets' },
        { id: 'tokens-export', label: 'Design Tokens' },
      ]
    },
  ];

  const toggleSection = (tabId: TabId) => {
    setExpandedSections(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const handleNavClick = (tabId: TabId, subTabId?: SubTabId) => {
    setActiveTab(tabId);
    if (subTabId) {
      setActiveSubTab(subTabId);
      if (!expandedSections.includes(tabId)) {
        setExpandedSections(prev => [...prev, tabId]);
      }
    } else {
      const firstSubItem = navigation.find(item => item.id === tabId)?.subItems?.[0];
      if (firstSubItem) {
        setActiveSubTab(firstSubItem.id);
      }
    }
    // Close sidebar on mobile after navigation
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-dvh bg-white flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-64 border-r border-black/8 bg-white top-0 h-dvh flex flex-col flex-shrink-0 z-50 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky`}>
        {/* Logo / Header */}
        <div className="px-6 py-6 border-b border-black/8 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-[5px] flex items-center justify-center">
                <span className="text-white font-semibold" style={{ fontSize: '14px', fontFamily: 'var(--font-serif)' }}>K</span>
              </div>
              <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-normal, 400)' }}>Project K</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-[5px] hover:bg-black/5 transition-colors"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-black/40 mt-1">Design System by Vishal Singh Chauhan</p>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-black/8 relative flex-shrink-0" style={{ zIndex: 50 }}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search components, tokens, pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') { setSearchQuery(''); (e.target as HTMLInputElement).blur(); } }}
              className="w-full pl-9 pr-8 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              style={{ fontSize: 'var(--text-xs)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
              >
                <span style={{ fontSize: '14px', lineHeight: 1 }}>&times;</span>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim().length > 0 && (() => {
            const q = searchQuery.trim().toLowerCase();
            const keywordMap: Record<string, string[]> = {
              'welcome': ['home', 'start', 'intro', 'getting started'],
              'architecture': ['structure', 'atomic', 'layers', 'hierarchy'],
              'principles': ['design principles', 'philosophy'],
              'quickstart': ['quick start', 'setup', 'install', 'getting started'],
              'whats-new': ['changelog', 'updates', 'release', 'new', 'latest'],
              'colors': ['colour', 'palette', 'brand', 'hex', 'rgb', 'warm', 'cool', 'red', 'blue', 'green', 'neutral'],
              'all-colors-palette': ['colour', 'swatch', 'shades', 'tints'],
              'typography': ['font', 'type', 'text', 'heading', 'body', 'serif', 'scale', 'weight'],
              'all-typography-tokens': ['font size', 'line height', 'letter spacing'],
              'spacing': ['space', 'gap', 'margin', 'padding', 'whitespace'],
              'all-spacing-tokens': ['space tokens', 'rem', 'px'],
              'layout-grid': ['grid', 'columns', 'container', 'breakpoint', 'responsive'],
              'all-layout-grid-tokens': ['grid tokens', 'max-width'],
              'elevation': ['shadow', 'depth', 'z-index', 'box-shadow'],
              'all-elevation-tokens': ['shadow tokens'],
              'radius': ['border radius', 'corner', 'rounded', 'pill'],
              'all-radius-tokens': ['radius tokens'],
              'buttons': ['button', 'cta', 'primary', 'secondary', 'ghost', 'action', 'submit'],
              'links-ctas': ['link', 'anchor', 'href', 'cta link', 'arrow', 'animated arrow'],
              'badges-labels': ['badge', 'label', 'tag', 'chip', 'section label', 'status'],
              'forms': ['form', 'input', 'select', 'textarea', 'checkbox', 'radio', 'field'],
              'cards': ['card', 'report card', 'stat card', 'survey card', 'data card'],
              'navigation': ['nav', 'menu', 'sidebar', 'breadcrumb', 'tab', 'header'],
              'feedback': ['toast', 'alert', 'notification', 'error', 'success', 'loading', 'skeleton', 'empty state'],
              'icons': ['icon', 'lucide', 'svg'],
              'filters': ['filter', 'search', 'sort', 'facet', 'panel'],
              'page-layouts': ['consulting', 'page', 'template', 'layout'],
              'report-store-pages': ['report store', 'market research'],
              'report-store-organisms': ['organism', 'showcase', 'gallery'],
              'report-store-demo': ['RS demo', 'report store demo'],
              'report-store-listing': ['RS listing', 'browse', 'catalog'],
              'surveys-pages': ['survey', 'questionnaire'],
              'surveys-demo': ['survey demo', 'surveys home'],
              'surveys-listing': ['survey listing', 'survey browse'],
              'template-demo': ['template', 'product page', 'organism template'],
              'content-patterns': ['content', 'section', 'hero', 'cta banner', 'featured'],
              'backgrounds': ['background', 'warm', 'dark', 'section wrapper'],
              'motion-principles': ['animation', 'motion', 'easing'],
              'duration-scale': ['duration', 'timing', 'speed', 'ms'],
              'transitions': ['transition', 'fade', 'slide', 'transform'],
              'micro-interactions': ['micro', 'interaction', 'hover', 'press'],
              'accessibility': ['a11y', 'accessible', 'aria', 'screen reader', 'wcag', 'contrast'],
              'responsive': ['responsive', 'mobile', 'tablet', 'desktop', 'adaptive'],
              'best-practices': ['best practice', 'guideline', 'rule', 'convention'],
              'downloads': ['download', 'asset', 'figma', 'file', 'export'],
              'code-snippets': ['code', 'snippet', 'copy', 'jsx', 'tsx', 'react', 'example'],
              'tokens-export': ['token', 'export', 'json', 'css', 'variable'],
            };

            const results: { tabId: TabId; subId: string; tabLabel: string; subLabel: string }[] = [];
            navigation.forEach((item) => {
              item.subItems?.forEach((sub) => {
                const labelMatch = sub.label.toLowerCase().includes(q) || item.label.toLowerCase().includes(q);
                const aliases = keywordMap[sub.id] || [];
                const aliasMatch = aliases.some(a => a.includes(q) || q.includes(a));
                if (labelMatch || aliasMatch) {
                  results.push({ tabId: item.id, subId: sub.id, tabLabel: item.label, subLabel: sub.label });
                }
              });
            });

            return results.length > 0 ? (
              <div
                className="absolute left-4 right-4 overflow-y-auto"
                style={{
                  top: '100%',
                  maxHeight: '360px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0,0,0,0.12)',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,1)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div className="px-3 py-1.5" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                </div>
                {results.map((r) => (
                  <button
                    key={`${r.tabId}-${r.subId}`}
                    onClick={() => {
                      handleNavClick(r.tabId, r.subId);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 transition-colors hover:bg-black/[0.04] flex items-start gap-2 cursor-pointer"
                    style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.03)' }}
                  >
                    <span className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(0,0,0,0.25)' }}>
                      <ChevronRight size={12} />
                    </span>
                    <div className="min-w-0">
                      <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.8)' }}>{r.subLabel}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>{r.tabLabel}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div
                className="absolute left-4 right-4 px-3 py-4 text-center"
                style={{
                  top: '100%',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0,0,0,0.12)',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,1)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>No results for &ldquo;{searchQuery}&rdquo;</p>
                <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.25)', marginTop: '4px' }}>Try: button, color, card, layout, motion</p>
              </div>
            );
          })()}
        </div>

        {/* Navigation */}
        <nav className="py-4 flex-1 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.id} className="mb-1">
              {/* Main nav item */}
              <button
                onClick={() => {
                  toggleSection(item.id);
                  handleNavClick(item.id);
                }}
                className={`
                  w-full px-4 py-2 flex items-center justify-between
                  transition-colors hover:bg-black/5
                  ${activeTab === item.id && !item.subItems ? 'bg-black/5 font-medium' : ''}
                `}
                style={{ fontSize: 'var(--text-nav)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-black/60">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.subItems && (
                  <ChevronRight 
                    size={16} 
                    className={`text-black/40 transition-transform ${
                      expandedSections.includes(item.id) ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </button>

              {/* Sub-items */}
              {item.subItems && expandedSections.includes(item.id) && (
                <div className="pl-11 pr-4 py-1 space-y-0.5">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleNavClick(item.id, subItem.id)}
                      className={`
                        w-full px-3 py-1.5 text-left rounded-[5px]
                        transition-colors hover:bg-black/5
                        ${activeTab === item.id && activeSubTab === subItem.id 
                          ? 'bg-black/8 font-medium text-black' 
                          : 'text-black/60'
                        }
                      `}
                      style={{ fontSize: 'var(--text-nav)' }}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-black/8 flex-shrink-0">
          <p className="text-xs text-black/40">Project K &middot; v4.3</p>
          <p className="text-xs text-black/40 mt-1">Last updated: Mar 2026</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/8">
          <div className="max-w-[var(--container-page)] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {/* Mobile hamburger */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-1.5 -ml-1.5 rounded-[5px] hover:bg-black/5 transition-colors flex-shrink-0"
                  aria-label="Open navigation"
                >
                  <Menu size={20} />
                </button>
                <div className="min-w-0">
                  <h1 className="font-normal truncate" style={{ fontSize: 'var(--text-xl)' }}>
                    {navigation.find(n => n.id === activeTab)?.label}
                  </h1>
                  <p className="text-black/60 mt-0.5 truncate" style={{ fontSize: 'var(--text-nav)' }}>
                    {navigation.find(n => n.id === activeTab)?.subItems?.find(s => s.id === activeSubTab)?.label}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                <Button variant="secondary" size="sm" icon={<Download size={16} />} onClick={() => {
                  const content = document.querySelector('main')?.innerText || '';
                  const blob = new Blob([`Project K Design System v4.3\n${navigation.find(n => n.id === activeTab)?.label} > ${navigation.find(n => n.id === activeTab)?.subItems?.find(s => s.id === activeSubTab)?.label}\nExported: ${new Date().toLocaleDateString()}\n\n${content}`], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `projectk-ds-${activeTab}-${activeSubTab}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}>
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden sr-only">Export</span>
                </Button>
                <Button variant="primary" size="sm" onClick={() => window.open('https://github.com/vsoffice001-cloud/Design-System-vs-26', '_blank')}>
                  <span className="hidden sm:inline">View on GitHub</span>
                  <span className="sm:hidden">GitHub</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-[var(--container-page)] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderContent(activeTab, activeSubTab, handleNavClick)}
        </div>
      </main>
    </div>
  );
}

// Content rendering function
function renderContent(tab: TabId, subTab: SubTabId, handleNavClick: (tabId: TabId, subTabId?: SubTabId) => void) {
  // TAB 1: OVERVIEW
  if (tab === 'overview') {
    if (subTab === 'welcome') {
      return <WelcomeContent onNavigate={handleNavClick} />;
    }
    if (subTab === 'architecture') {
      return <ArchitectureContent />;
    }
    if (subTab === 'principles') {
      return <PrinciplesContent />;
    }
    if (subTab === 'quickstart') {
      return <QuickStartContent onNavigate={handleNavClick} />;
    }
    if (subTab === 'whats-new') {
      return <WhatsNewContent />;
    }
  }

  // TAB 2: FOUNDATIONS
  if (tab === 'foundations') {
    if (subTab === 'colors') {
      return <ColorsContent />;
    }
    if (subTab === 'all-colors-palette') {
      return <AllColorsPaletteContent />;
    }
    if (subTab === 'typography') {
      return <TypographyContent />;
    }
    if (subTab === 'all-typography-tokens') {
      return <AllTypographyTokensContent />;
    }
    if (subTab === 'spacing') {
      return <SpacingContent />;
    }
    if (subTab === 'all-spacing-tokens') {
      return <AllSpacingTokensContent />;
    }
    if (subTab === 'layout-grid') {
      return <LayoutGridContent />;
    }
    if (subTab === 'all-layout-grid-tokens') {
      return <AllLayoutGridTokensContent />;
    }
    if (subTab === 'elevation') {
      return <ElevationContent />;
    }
    if (subTab === 'all-elevation-tokens') {
      return <AllElevationTokensContent />;
    }
    if (subTab === 'radius') {
      return <BorderRadiusContent />;
    }
    if (subTab === 'all-radius-tokens') {
      return <AllBorderRadiusTokensContent />;
    }
  }

  // TAB 3: COMPONENTS
  if (tab === 'components') {
    if (subTab === 'buttons') {
      return <ButtonDocumentation />;
    }
    if (subTab === 'links-ctas') {
      return <LinksDocumentation />;
    }
    if (subTab === 'badges-labels') {
      return <BadgeLabelsDocumentation />;
    }
    if (subTab === 'forms') {
      return <FormInputsContent />;
    }
    if (subTab === 'cards') {
      return <CardsContent />;
    }
    if (subTab === 'navigation') {
      return <NavigationContent />;
    }
    if (subTab === 'feedback') {
      return <FeedbackContent />;
    }
    if (subTab === 'icons') {
      return <IconsContent />;
    }
    if (subTab === 'filters') {
      return <FiltersContent />;
    }
  }

  // TAB 4: PATTERNS
  if (tab === 'patterns') {
    if (subTab === 'page-layouts') {
      return <PageLayoutsContent />;
    }
    if (subTab === 'report-store-pages') {
      return <ReportStorePagesContent />;
    }
    if (subTab === 'report-store-organisms') {
      return <ReportStoreOrganismsShowcase />;
    }
    if (subTab === 'report-store-demo') {
      return <ReportStorePage initialMode="home" />;
    }
    if (subTab === 'report-store-listing') {
      return <ReportStorePage initialMode="listing" />;
    }
    if (subTab === 'surveys-pages') {
      return <SurveysPagesContent />;
    }
    if (subTab === 'surveys-demo') {
      return <SurveysDemoContent />;
    }
    if (subTab === 'surveys-listing') {
      return <SurveysListingDemoContent />;
    }
    if (subTab === 'template-demo') {
      return <TemplateDemoContent />;
    }
    if (subTab === 'content-patterns') {
      return <ContentPatternsContent />;
    }
    if (subTab === 'backgrounds') {
      return <BackgroundsContent />;
    }
  }

  // TAB 5: MOTION
  if (tab === 'motion') {
    if (subTab === 'motion-principles') {
      return <MotionPrinciplesContent />;
    }
    if (subTab === 'duration-scale') {
      return <DurationScaleContent />;
    }
    if (subTab === 'transitions') {
      return <TransitionsContent />;
    }
    if (subTab === 'micro-interactions') {
      return <MicroInteractionsContent />;
    }
  }

  // TAB 6: GUIDELINES
  if (tab === 'guidelines') {
    if (subTab === 'accessibility') {
      return <AccessibilityContent />;
    }
    if (subTab === 'responsive') {
      return <ResponsiveDesignContent />;
    }
    if (subTab === 'best-practices') {
      return <BestPracticesContent />;
    }
  }

  // TAB 7: RESOURCES
  if (tab === 'resources') {
    if (subTab === 'downloads') {
      return <DownloadsContent />;
    }
    if (subTab === 'code-snippets') {
      return <CodeSnippetsContent />;
    }
    if (subTab === 'tokens-export') {
      return <DesignTokensContent />;
    }
  }

  // Placeholder for other tabs
  return (
    <div className="py-12 text-center">
      <Lightbulb size={48} className="mx-auto text-black/20 mb-4" />
      <h2 className="text-xl font-normal mb-2">Content Coming Soon</h2>
      <p className="text-black/60">
        This section is being built. Check back soon!
      </p>
    </div>
  );
}

// ============================================
// TAB 1: OVERVIEW - CONTENT COMPONENTS
// ============================================

function WelcomeContent({ onNavigate }: { onNavigate: (tabId: TabId, subTabId?: SubTabId) => void }) {
  return (
    <div className="space-y-12">
      {/* 4W+H Framework — Our System */}
      <section className="border border-black/10 rounded-[10px] p-8 bg-[#fafaf9]">
        <h2 className="text-2xl font-normal mb-6">Project K at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Circle size={8} className="fill-black text-black" />
              WHY
            </h3>
            <p className="text-sm text-black/70">
              Creates consistency across three business pillars — Research, Consulting, and Surveys.
              A single source of truth that speeds development, ensures quality, and enables team scalability
              across both editorial display pages and systematic product pages.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Circle size={8} className="fill-black text-black" />
              WHAT
            </h3>
            <p className="text-sm text-black/70">
              Minimalist editorial design system: black/white alternating sections, Major Third typography 
              (1.25 ratio), Ken Bold Red (#b01f24) for CTAs only, 92-5-3 color hierarchy, and 
              two-font pairing (Noto Serif headings + DM Sans body/UI). Shared foundations with 
              pillar-specific page patterns.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Circle size={8} className="fill-black text-black" />
              WHEN
            </h3>
            <p className="text-sm text-black/70">
              Use for ALL pages across all three pillars. Display pages (Case Studies) use bespoke 
              editorial organisms. Product pages (Report Store, Surveys) use systematic 
              <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">SectionHeading</code> + molecule compositions.
              Start with foundations, compose with components, follow the pillar's section pattern.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Circle size={8} className="fill-[var(--brand-red)] text-[var(--brand-red)]" />
              WHEN NOT
            </h3>
            <p className="text-sm text-black/70">
              Never deviate unless explicitly requested with clear reasoning. Don't use brand red 
              for decorative purposes. Don't use Serif for body text or Sans for headings. 
              Don't disable shimmer animation. Don't mix Display and Product page patterns.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Circle size={8} className="fill-black text-black" />
              HOW
            </h3>
            <p className="text-sm text-black/70">
              Atoms from <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">/components/</code> (flat), 
              molecules from <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">/components/molecules/</code>, 
              organisms from <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">/components/organisms/</code> (30 total — 6 cross-pillar + 24 RS-specific),
              tokens from <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">theme.css</code>. 
              Report Store pages (v4.3) compose entirely from self-contained organisms — no prop wiring at the template level.
              Use <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">ProductPageTemplate</code> for declarative assembly or compose organisms directly via{' '}
              <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">ReportStorePage</code>.
              Consult <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">ai-context/</code> modules for detailed rules.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Overview */}
      <section className="border border-black/10 rounded-[10px] p-8">
        <h2 className="text-2xl font-normal mb-2">Three-Pillar Architecture</h2>
        <p className="text-sm text-black/60 mb-6">One design system, three business verticals, two page types.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-mono text-black/50">PILLAR 1</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Research</h4>
            <p className="text-xs text-black/60 mb-3">Report Store, market intelligence, data products</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">Product Pages</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">30 RS Organisms</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">Home + Listing</span>
              <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-[5px]">v4.3 Complete</span>
            </div>
          </div>
          
          <div className="p-5 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-mono text-black/50">PILLAR 2</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Consulting</h4>
            <p className="text-xs text-black/60 mb-3">Case studies, client showcases, editorial content</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">Display Pages</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">Bespoke Headings</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">10-Section</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">ResourceCard</span>
            </div>
          </div>
          
          <div className="p-5 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-mono text-black/50">PILLAR 3</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Surveys</h4>
            <p className="text-xs text-black/60 mb-3">Survey catalog, response dashboards, data collection</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">Product Pages</span>
              <span className="text-[10px] px-2 py-0.5 bg-black/5 rounded-[5px]">SectionHeading</span>
              <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-[5px]">Molecules Built</span>
            </div>
          </div>
        </div>
        
        {/* Display vs Product comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border-l-2 border-black pl-5">
            <h4 className="font-medium text-sm mb-2">Display Pages</h4>
            <p className="text-xs text-black/60 mb-2">Editorial storytelling — bespoke per section</p>
            <ul className="space-y-1">
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-black/40" /> Consulting (Case Studies)
              </li>
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-black/40" /> Hand-authored, scroll-driven
              </li>
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-black/40" /> 10-section B/W/Warm sequence
              </li>
            </ul>
          </div>
          <div className="p-5 border-l-2 border-[#806ce0] pl-5">
            <h4 className="font-medium text-sm mb-2">Product Pages</h4>
            <p className="text-xs text-black/60 mb-2">Data-driven — systematic, composable sections</p>
            <ul className="space-y-1">
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-[#806ce0]/40" /> Research (Report Store), Surveys
              </li>
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-[#806ce0]/40" /> 30 organisms (6 cross-pillar + 24 RS-specific)
              </li>
              <li className="text-xs text-black/50 flex items-center gap-2">
                <Circle size={4} className="fill-[#806ce0]/40" /> Dual-mode (home / listing)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Composition Layer Map */}
      <section className="border border-black/10 rounded-[10px] p-8">
        <h2 className="text-2xl font-normal mb-2">Composition Layer Map</h2>
        <p className="text-sm text-black/60 mb-6">How atoms, molecules, organisms, and templates compose into pages.</p>
        
        {/* Layer diagram */}
        <div className="space-y-2 mb-6">
          {[
            { layer: 'TEMPLATES', count: '1', items: 'ProductPageTemplate (declarative page assembly)', bg: 'bg-black', text: 'text-white', desc: 'Full page compositions with bespoke slots' },
            { layer: 'ORGANISMS', count: '30', items: '6 cross-pillar (ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner, ProductPageTemplate) + 24 RS-specific (ReportStoreHero, FeaturedResearch, CardListing...)', bg: 'bg-black/80', text: 'text-white', desc: 'Section-level compositions — self-contained, no prop wiring at template level' },
            { layer: 'MOLECULES', count: '26', items: '19 Report Store + 2 new RS (CategoryListCard, LoadMoreSentinel) + 5 Surveys', bg: 'bg-[#806ce0]/15', text: 'text-black', desc: 'Domain-specific compositions (/molecules/)' },
            { layer: 'ATOMS', count: '72+', items: 'Button, Badge, CTALink, Label, ViewToggle, SectionHeading, IconBadge, CategoryListItem...', bg: 'bg-black/5', text: 'text-black', desc: 'Standalone primitives (/components/ flat)' },
            { layer: 'TOKENS', count: '6 files', items: 'Colors, Typography, Spacing, Layout, Elevation, Radius', bg: 'bg-white border border-black/8', text: 'text-black', desc: 'Design foundations (/foundations/)' },
          ].map((l) => (
            <div key={l.layer} className={`rounded-[5px] p-4 ${l.bg} ${l.text} flex items-center gap-4`}>
              <div className="w-24 flex-shrink-0">
                <span className="text-[10px] font-mono opacity-60">{l.layer}</span>
                <p className="text-sm font-medium">{l.count}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs opacity-70 truncate">{l.items}</p>
                <p className="text-[10px] opacity-50 mt-0.5">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product page assembly */}
        <div className="bg-[#fafaf9] border border-black/8 rounded-[5px] p-5">
          <h3 className="text-sm font-medium mb-3">Product Page Assembly Flow</h3>
          <div className="flex items-center gap-2 text-xs text-black/60 flex-wrap">
            <span className="px-2 py-1 bg-white border border-black/8 rounded-[5px] font-mono">Tokens</span>
            <span className="text-black/30">&rarr;</span>
            <span className="px-2 py-1 bg-white border border-black/8 rounded-[5px] font-mono">Atoms</span>
            <span className="text-black/30">&rarr;</span>
            <span className="px-2 py-1 bg-[#806ce0]/10 border border-[#806ce0]/20 rounded-[5px] font-mono">Molecules</span>
            <span className="text-black/30">&rarr;</span>
            <span className="px-2 py-1 bg-black/10 border border-black/15 rounded-[5px] font-mono">Organisms</span>
            <span className="text-black/30">&rarr;</span>
            <span className="px-2 py-1 bg-black text-white rounded-[5px] font-mono">Template</span>
            <span className="text-black/30">&rarr;</span>
            <span className="px-2 py-1 bg-[var(--brand-red)] text-white rounded-[5px] font-mono">Page</span>
          </div>
          <p className="text-[11px] text-black/50 mt-3">
            Each Product page stacks organisms in order: ProductHero &rarr; FeaturedCarousel &rarr; StatsRow &rarr; [bespoke sections] &rarr; BrowseGrid &rarr; [bespoke sections] &rarr; CTABanner. Use <code className="font-mono text-[10px] bg-black/5 px-1 rounded-[5px]">ProductPageTemplate</code> for the declarative approach, or compose organisms directly for full control.
          </p>
        </div>
      </section>

      {/* 92-5-3 Color Rule — Visual */}
      <section className="border border-black/10 rounded-[10px] p-8">
        <h2 className="text-2xl font-normal mb-2">The 92-5-3 Color Rule</h2>
        <p className="text-sm text-black/60 mb-6">The single most important color rule in this system.</p>
        
        {/* Proportional bar */}
        <div className="flex rounded-[5px] overflow-hidden h-12 mb-6">
          <div className="flex-[92] bg-black flex items-center justify-center text-white text-xs font-mono">
            92% Foundation
          </div>
          <div className="flex-[5] bg-[var(--brand-red)] flex items-center justify-center text-white text-xs font-mono">
            5%
          </div>
          <div className="flex-[3] bg-[#806ce0] flex items-center justify-center text-white text-xs font-mono">
            3%
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-[5px] bg-black" />
                <div className="w-4 h-4 rounded-[5px] bg-white border border-black/10" />
                <div className="w-4 h-4 rounded-[5px] bg-[#f5f2f1]" />
              </div>
              <span className="text-xs font-mono text-black/50">92%</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Foundation</h4>
            <p className="text-xs text-black/60">Black, White, Warm — page structure, backgrounds, text</p>
          </div>
          <div className="p-4 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-[5px] bg-[var(--brand-red)]" />
              <span className="text-xs font-mono text-black/50">5%</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Brand</h4>
            <p className="text-xs text-black/60">Ken Bold Red #b01f24 — CTAs only, conversion actions</p>
          </div>
          <div className="p-4 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-[5px] bg-[#806ce0]" />
                <div className="w-4 h-4 rounded-[5px] bg-[#c3c6f9]" />
                <div className="w-4 h-4 rounded-[5px] bg-[#ea7a5f]" />
              </div>
              <span className="text-xs font-mono text-black/50">3%</span>
            </div>
            <h4 className="font-medium text-sm mb-1">Accent</h4>
            <p className="text-xs text-black/60">Purple, Periwinkle, Coral — badges, data viz, shadows</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section>
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="px-3 py-1 bg-[var(--brand-red)] text-white text-xs font-medium rounded-full">
              v4.3
            </span>
            <span className="text-xs text-black/40">March 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6">
            Welcome to<br />Project K Design System
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-8">
            A unified design system powering three business pillars — Research, Consulting, and Surveys.
            Built on a pure black/white/warm palette with Ken Bold Red (#b01f24) for CTAs, 
            Noto Serif for editorial headings, DM Sans for functional UI. 70+ components, 
            26 molecules, 30 organisms, 1 page template, two page types, one consistent identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<Book size={20} />}
              onClick={() => onNavigate('overview', 'quickstart')}
            >
              Get Started
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => onNavigate('components', 'buttons')}
            >
              View Components
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-black/8">
        <StatCard number="70+" label="Components" />
        <StatCard number="26" label="Molecules" />
        <StatCard number="30" label="Organisms" />
        <StatCard number="3" label="Pillars" />
      </section>

      {/* Key Features — System-Specific */}
      <section>
        <h2 className="text-2xl font-normal mb-6">System Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Palette size={24} />}
            title="92-5-3 Color Hierarchy"
            description="92% foundation (black/white/warm), 5% brand red (CTAs only), 3% accent (purple, periwinkle, coral)"
          />
          <FeatureCard
            icon={<Type size={24} />}
            title="Two-Font Strategy"
            description="Noto Serif for editorial headings (h1-h3), DM Sans for body text and all UI elements"
          />
          <FeatureCard
            icon={<Sparkles size={24} />}
            title="Brand Signatures"
            description="Always-active shimmer on buttons, ArrowUpRight for urgency CTAs, secondary two-state hover"
          />
          <FeatureCard
            icon={<Layers size={24} />}
            title="Three-Pillar Architecture"
            description="Research, Consulting, Surveys — shared foundations with Display (editorial) and Product (systematic) page patterns"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickLinkCardButton title="Architecture" description="Three pillars & page types" onClick={() => onNavigate('overview', 'architecture')} />
          <QuickLinkCardButton title="Colors" description="Palette & semantic colors" onClick={() => onNavigate('foundations', 'colors')} />
          <QuickLinkCardButton title="Typography" description="Type scale & hierarchy" onClick={() => onNavigate('foundations', 'typography')} />
          <QuickLinkCardButton title="Components" description="UI component library" onClick={() => onNavigate('components', 'buttons')} />
          <QuickLinkCardButton title="Spacing" description="10-step spacing scale" onClick={() => onNavigate('foundations', 'spacing')} />
          <QuickLinkCardButton title="Motion" description="Animation guidelines" onClick={() => onNavigate('motion', 'motion-principles')} />
          <QuickLinkCardButton title="Consulting Pages" description="Display page patterns" onClick={() => onNavigate('patterns', 'page-layouts')} />
          <QuickLinkCardButton title="Report Store" description="Product page patterns" onClick={() => onNavigate('patterns', 'report-store-pages')} />
          <QuickLinkCardButton title="RS Organisms" description="Interactive showcase (30)" onClick={() => onNavigate('patterns', 'report-store-organisms')} />
          <QuickLinkCardButton title="Surveys" description="Molecules & demo" onClick={() => onNavigate('patterns', 'surveys-pages')} />
          <QuickLinkCardButton title="Template Demo" description="Declarative page assembly" onClick={() => onNavigate('patterns', 'template-demo')} />
        </div>
      </section>
    </div>
  );
}

function ArchitectureContent() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4">Architecture</h1>
        <p className="text-lg text-black/70">
          One design system, three business pillars, two page types. This is the "read this first" 
          for anyone building a new page.
        </p>
      </div>

      {/* Three Pillars Diagram */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Three-Pillar Structure</h2>
        
        {/* Shared Layer */}
        <div className="border border-black/10 rounded-[5px] p-6 mb-4 bg-[#fafaf9]">
          <div className="text-xs font-mono text-black/40 mb-3">SHARED LAYER — ALL PILLARS</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Foundations</h4>
              <p className="text-xs text-black/50">Colors, Typography, Spacing, Layout, Elevation, Radius</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Shared Atoms</h4>
              <p className="text-xs text-black/50">Button, Badge, CTALink, InlineLink, Label, Container, Tooltip</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Hooks & Utilities</h4>
              <p className="text-xs text-black/50">useShimmer, useScrollDirection, useCounter, iconColors</p>
            </div>
          </div>
        </div>
        
        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Research */}
          <div className="border border-black/10 rounded-[10px] overflow-hidden">
            <div className="bg-black p-4">
              <span className="text-xs font-mono text-white/50">PILLAR 1</span>
              <h3 className="text-white font-medium mt-1">Research</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGE TYPE</span>
                <p className="text-sm">Product Pages</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGES</span>
                <p className="text-sm">Report Store (home + listing)</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">HEADING SYSTEM</span>
                <p className="text-sm">SectionHeading (prop-driven)</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">KEY MOLECULES</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">ReportCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">StatCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">ViewToggle</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">SkeletonCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">DataHighlightCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">AnalystPickCardB</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">STATUS</span>
                <p className="text-xs text-green-700">30 organisms (6 cross-pillar + 24 RS). Home + Listing fully composed from self-contained organisms.</p>
              </div>
            </div>
          </div>

          {/* Consulting */}
          <div className="border border-black/10 rounded-[10px] overflow-hidden">
            <div className="bg-black p-4">
              <span className="text-xs font-mono text-white/50">PILLAR 2</span>
              <h3 className="text-white font-medium mt-1">Consulting</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGE TYPE</span>
                <p className="text-sm">Display Pages</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGES</span>
                <p className="text-sm">Case Studies (editorial showcase)</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">HEADING SYSTEM</span>
                <p className="text-sm">Bespoke per-section (inline)</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">KEY ORGANISMS (10)</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">HeroSection</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">ClientContext</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Challenges</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Objectives</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Methodology</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Impact</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">ValuePillars</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Testimonial</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Resources</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">FinalCTA</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">CONTENT MODEL</span>
                <p className="text-xs text-black/60">Hand-authored editorial. Each case study is a unique narrative with bespoke copy, client logos, and scroll-driven storytelling. Background alternates Black → White → Warm.</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">SHARED FOUNDATIONS</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Card</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Button</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Badge</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">CTALink</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Container</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">ResourceCard</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">STATUS</span>
                <p className="text-xs text-green-700">Complete — 10 organisms production-ready.</p>
              </div>
            </div>
          </div>

          {/* Surveys */}
          <div className="border border-black/10 rounded-[10px] overflow-hidden">
            <div className="bg-black p-4">
              <span className="text-xs font-mono text-white/50">PILLAR 3</span>
              <h3 className="text-white font-medium mt-1">Surveys</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGE TYPE</span>
                <p className="text-sm">Product Pages</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">PAGES</span>
                <p className="text-sm">Survey Catalog (home + listing), Survey Detail, Response Dashboard</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">HEADING SYSTEM</span>
                <p className="text-sm">SectionHeading (shared with Research)</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">REUSED FROM RESEARCH</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">ViewToggle</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">SectionHeading</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">SkeletonCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">EmptyState</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">HorizontalScroll</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">BackToTop</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">SURVEY-SPECIFIC (BUILT)</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-[5px]">SurveyCard</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-[5px]">ResponseChart</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-[5px]">QuestionPreview</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-[5px]">CompletionBadge</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-[5px]">SurveySkeleton</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">CONTENT MODEL</span>
                <p className="text-xs text-black/60">Data-driven like Research. Survey products browsed/filtered with ViewToggle. Detail pages show survey metadata, question previews, and response summaries.</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-black/40">STATUS</span>
                <p className="text-xs text-green-700">All 5 molecules + 4 Product organisms built. Home + Listing demos complete. Ready for template assembly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Type Comparison */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Display vs Product Pages</h2>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/[0.03]">
                <th className="text-left p-4 font-medium text-black/60">Dimension</th>
                <th className="text-left p-4 font-medium">Display Pages</th>
                <th className="text-left p-4 font-medium">Product Pages</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/8">
              {[
                ['Purpose', 'Showcase, storytelling, persuasion', 'Discovery, filtering, data consumption'],
                ['Content', 'Hand-authored, editorial', 'Data-driven, repeatable'],
                ['Heading style', 'Bespoke per-section', 'SectionHeading component'],
                ['Card system', 'ResourceCard (7 variants)', 'ReportCard, StatCard, DataHighlightCard, AnalystPickCardB'],
                ['Section pattern', 'Fixed 10-section B/W/Warm', 'Flexible dual-mode (home/listing)'],
                ['Interactivity', 'Scroll-driven, reading progress', 'Filters, search, view toggle, pagination'],
                ['Loading states', 'None (static content)', 'SkeletonCard, EmptyState'],
                ['Scroll paradigm', 'Vertical story flow', 'Grid/list + carousel sections'],
                ['Page shell', 'Navbar + StickyCTA + ProgressBar', 'Header (glass) + Footer + BackToTop'],
              ].map(([dim, display, product], idx) => (
                <tr key={idx}>
                  <td className="p-4 font-medium text-black/60 text-xs">{dim}</td>
                  <td className="p-4 text-black/70">{display}</td>
                  <td className="p-4 text-black/70">{product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Component Taxonomy */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Component Taxonomy</h2>
        <p className="text-sm text-black/60 mb-6">
          Hybrid "flat with molecules exception" — standalone primitives live flat, 
          Report Store domain compositions live in <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">/molecules/</code>.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-black/8 rounded-[5px] p-6">
            <div className="text-xs font-mono text-black/40 mb-3">FLAT — /src/app/components/</div>
            <div className="space-y-2">
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Atoms (shared)</h4>
                <p className="text-xs text-black/50">Button, Badge, CTALink, InlineLink, Label, Container, Tooltip, ViewToggle, FadeInSection</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Layout (shared)</h4>
                <p className="text-xs text-black/50">SectionHeading, SectionWrapper, ScrollToTop, ScrollProgress, Card</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Case Study Organisms (Consulting)</h4>
                <p className="text-xs text-black/50">HeroSection, ChallengesSection, ImpactSection, TestimonialSection, etc. (10 total)</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Product Page Organisms (30) — /components/organisms/</h4>
                <p className="text-xs text-black/50">6 cross-pillar (ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner, ProductPageTemplate) + 24 RS-specific</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Dashboard (internal)</h4>
                <p className="text-xs text-black/50">DesignSystemDashboard, FoundationsContent, ComponentsContent, etc.</p>
              </div>
            </div>
          </div>
          
          <div className="border border-[#806ce0]/20 rounded-[5px] p-6 bg-[#806ce0]/[0.02]">
            <div className="text-xs font-mono text-[#806ce0]/60 mb-3">MOLECULES (26) — /components/molecules/</div>
            <div className="space-y-2">
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Cards (5)</h4>
                <p className="text-xs text-black/50">ReportCard, StatCard, DataHighlightCard, AnalystPickCardB, ReportGridCard (deprecated)</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Card Internals (2)</h4>
                <p className="text-xs text-black/50">CardMetaRow, CardFooterRow</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Loading States (2)</h4>
                <p className="text-xs text-black/50">SkeletonCard, EmptyState</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Scroll & Animation (4)</h4>
                <p className="text-xs text-black/50">HorizontalScroll, ScrollFade, CardReveal, RevealImage</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Filters & Layout (4)</h4>
                <p className="text-xs text-black/50">ActiveFilterChip, FilterAccordion, MobileFilterSheet, SidebarPanel</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">RS Additions (2)</h4>
                <p className="text-xs text-black/50">CategoryListCard, LoadMoreSentinel</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Surveys (5)</h4>
                <p className="text-xs text-black/50">SurveyCard, CompletionBadge, ResponseChart, QuestionPreview, SurveySkeleton</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-black/60 mb-1">Utility (2)</h4>
                <p className="text-xs text-black/50">IndustryBadge, BackToTop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Import Conventions */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Import Conventions</h2>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="bg-black/5 px-4 py-2 border-b border-black/8">
            <span className="text-xs font-mono text-black/60">tsx</span>
          </div>
          <pre className="p-4 overflow-x-auto bg-black/2">
            <code className="text-sm font-mono">{`// Shared atoms — flat imports
import { Button } from '@/app/components/Button';
import { Badge } from '@/app/components/Badge';
import { ViewToggle } from '@/app/components/ViewToggle';

// Layout components — flat imports
import { SectionHeading } from '@/app/components/SectionHeading';
import { SectionWrapper } from '@/app/components/SectionWrapper';

// Report Store molecules — from barrel
import { 
  ReportCard, StatCard, DataHighlightCard,
  SkeletonCard, EmptyState, HorizontalScroll
} from '@/app/components/molecules';

// Icon colors
import { iconColors } from '@/app/components/iconColors';
// iconColors.content = '#806ce0' (periwinkle)
// iconColors.utility = '#737373' (gray)`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}

function PrinciplesContent() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4">Design Principles</h1>
        <p className="text-lg text-black/70">
          Seven non-negotiable rules that govern every design decision. These are derived from
          the <code className="font-mono text-sm bg-black/5 px-1.5 rounded-[5px]">ai-context/</code> modules
          and enforced across all pages and components.
        </p>
      </div>

      <div className="space-y-8">
        <PrincipleCard
          number="01"
          title="92-5-3 Color Hierarchy"
          description="The single most important color rule. 92% foundation colors, 5% brand red, 3% accent. This ratio creates the minimalist editorial aesthetic."
          principles={[
            'Foundation (92%): Black #000, White #fff, Warm #f5f2f1 — page structure, backgrounds, text',
            'Brand (5%): Ken Bold Red #b01f24 — CTA buttons and conversion actions ONLY',
            'Accent (3%): Purple #806ce0, Periwinkle #c3c6f9, Coral #ea7a5f — badges, shadows, data viz',
            'NEVER use brand red for decorative borders, icons, or general accents',
            'NEVER use accent colors for section backgrounds (use Black/White/Warm only)',
          ]}
        />
        
        <PrincipleCard
          number="02"
          title="Two-Font Strategy"
          description="Contrast pairing creates editorial authority (Serif headings) while maintaining functional clarity (Sans body/UI). Proven pattern from NYT, Medium, Stripe."
          principles={[
            'Noto Serif → Headings (h1-h3), hero titles, testimonial quotes, large display numbers',
            'DM Sans → Body text, buttons, badges, labels, navigation, forms, card descriptions',
            'System Mono → Code blocks, metric values, tabular data',
            'NEVER use Serif for body text, buttons, labels, or navigation',
            'NEVER use Sans for hero headings or section titles',
          ]}
        />
        
        <PrincipleCard
          number="03"
          title="Major Third Typography Scale (1.25×)"
          description="Mathematical 1.25 ratio creates harmonious visual hierarchy. Every size is a deliberate step — no arbitrary values."
          principles={[
            '--text-xs (12.8px): Labels, metadata, section eyebrows, badge text',
            '--text-sm (16px): ALL body text — used for 90% of text on every page',
            '--text-2xl (39px): ALL section headings (h2)',
            '--text-3xl (48.8px): Hero h1 ONLY — reserved for a single heading per page',
            'Custom: --text-nav (14px) for navigation, --text-compact (14px) for dense content, --text-card-micro (10px) for micro labels',
          ]}
        />
        
        <PrincipleCard
          number="04"
          title="Brand Identity Signatures"
          description="Three visual signatures that make every page instantly recognizable. These are always active and never disabled."
          principles={[
            'Shimmer Effect: Always-active 700ms sweep on ALL buttons — core brand identity, NEVER disable',
            'Arrow Animation: ArrowUpRight (45° diagonal) ONLY for urgency CTAs redirecting to forms/pages',
            'Secondary Two-State: Neutral rest (black/gray) → Brand-red hover (border, text, shadow all shift)',
            'NEVER use ArrowRight or ChevronRight on buttons — always ArrowUpRight',
            'NEVER add showArrow to "Learn More" or "Cancel" buttons — only conversion CTAs',
          ]}
        />
        
        <PrincipleCard
          number="05"
          title="Section Patterns & Page Assembly"
          description="Two page types, each with its own section pattern. Display pages use a fixed 10-section editorial sequence. Product pages use flexible dual-mode compositions."
          principles={[
            'DISPLAY (Case Study): Hero (BLACK) → ClientContext (WHITE) → Challenges (WARM) → Objectives (WHITE) → Methodology (WARM) → Impact (WHITE) → ValuePillars (WHITE, border-t) → Testimonial (WHITE, border-t) → Resources (BLACK mesh) → FinalCTA (WHITE, border-t)',
            'PRODUCT (Report Store) HOME: Hero (BLACK) → Featured (WHITE) → Sectors (WARM) → Recommended (WHITE) → AnalystPicks (WHITE, border-t) → Trending (WHITE, border-t) → DailyHighlights (WARM) → CTA (WHITE)',
            'PRODUCT (Report Store) LISTING: ContextBanner → FiltersPanel + CardGrid (with ViewToggle, pagination)',
            '5 container widths: page (1200px), content (1000px), narrow (900px), prose (700px), compact (600px)',
            'Standard padding: py-12 sm:py-16 md:py-20 + px-4 sm:px-6 md:px-8',
          ]}
        />
        
        <PrincipleCard
          number="06"
          title="Component Decision Rules"
          description="Clear decision flowcharts ensure team members always pick the right component for the right context."
          principles={[
            'Button: Primary actions, form submits, conversions — size md (42px) by default, lg only for heroes',
            'CTALink: Text + arrow for exploratory navigation ("Learn More →", "See How →")',
            'InlineLink: Within paragraph text only — never standalone',
            'Badge: 11 themes, 3 variants, CSS custom property driven — always use theme prop, never inline colors',
            'Container: 5 semantic presets — always use tokens, never hardcode widths',
          ]}
        />
        
        <PrincipleCard
          number="07"
          title="Accessible by Default"
          description="Every component meets WCAG 2.1 AA minimum. Accessibility is built in, not bolted on."
          principles={[
            'Minimum 4.5:1 contrast ratios for normal text, 3:1 for large text',
            'Semantic HTML with proper heading hierarchy (h1 → h2 → h3, never skip levels)',
            'Full keyboard navigation with 2px black outline focus states',
            'Icon-only buttons always need ariaLabel prop',
            'Touch targets minimum 44px for mobile accessibility',
          ]}
        />
      </div>
    </div>
  );
}

function QuickStartContent({ onNavigate }: { onNavigate: (tabId: TabId, subTabId?: SubTabId) => void }) {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4">Quick Start Guide</h1>
        <p className="text-lg text-black/70">
          Get up and running with the design system in minutes.
        </p>
      </div>

      {/* Step-by-step guide */}
      <div className="space-y-6">
        <StepCardButton
          step="1"
          title="Understand the Foundations"
          description="Start by familiarizing yourself with our core design tokens: colors, typography, and spacing."
          action="View Foundations"
          onClick={() => onNavigate('foundations', 'colors')}
        />
        
        <StepCardButton
          step="2"
          title="Explore Components"
          description="Browse our comprehensive component library with live examples and code snippets."
          action="Browse Components"
          onClick={() => onNavigate('components', 'buttons')}
        />
        
        <StepCardButton
          step="3"
          title="Review Patterns"
          description="Learn common design patterns for layouts, navigation, and content organization."
          action="See Patterns"
          onClick={() => onNavigate('patterns', 'page-layouts')}
        />
        
        <StepCardButton
          step="4"
          title="Download Resources"
          description="Export design tokens, download Figma files, and access code snippets."
          action="Get Resources"
          onClick={() => onNavigate('resources', 'downloads')}
        />
      </div>

      {/* Code Example */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Import & Use Design Tokens</h2>
        <CodeBlock
          language="css"
          code={`/* All tokens live in theme.css */
@import '@/styles/theme.css';

/* Typography — Major Third 1.25× scale */
.section-heading { font-size: var(--text-2xl); }  /* 39px — section h2 */
.body-text       { font-size: var(--text-sm); }   /* 16px — 90% of text */
.hero-title      { font-size: var(--text-3xl); }  /* 48.8px — hero h1 ONLY */

/* Spacing — base-10 scale */
.section  { padding: var(--space-12) 0; }     /* 48px between sections */
.element  { margin-bottom: var(--space-4); }  /* 16px between elements */

/* Colors — 92-5-3 hierarchy */
.bg-warm  { background: var(--warm-300); }    /* #f5f2f1 — highlighted sections */
.cta-btn  { background: var(--brand-red); }   /* #b01f24 — CTAs ONLY */

/* Container widths */
.content  { max-width: var(--container-content); } /* 1000px */
.prose    { max-width: var(--container-prose); }   /* 700px */`}
        />
      </section>

      {/* Font Pairing Reference */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Font Pairing Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black/8 rounded-[5px] p-6">
            <p className="text-xs font-mono text-black/40 mb-3">SERIF — var(--font-serif)</p>
            <p className="text-2xl font-normal mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Noto Serif — Editorial Authority
            </p>
            <p className="text-sm text-black/60 mb-4">Used for headings h1-h3, hero titles, testimonial quotes, large display numbers.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">h1-h3</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Hero titles</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Quotes</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Display numbers</span>
            </div>
          </div>
          <div className="border border-black/8 rounded-[5px] p-6">
            <p className="text-xs font-mono text-black/40 mb-3">SANS — var(--font-sans)</p>
            <p className="text-2xl font-normal mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
              DM Sans — Functional Clarity
            </p>
            <p className="text-sm text-black/60 mb-4">Used for body text, buttons, badges, labels, navigation, forms, cards.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Body</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Buttons</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Badges</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Nav</span>
              <span className="text-xs px-2 py-1 bg-black/5 rounded-[5px]">Forms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsNewContent() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4">What's New</h1>
        <p className="text-lg text-black/70">
          Latest updates and improvements to the design system.
        </p>
      </div>

      <div className="space-y-8">
        <ChangelogSection
          version="4.3"
          date="March 2026"
          type="major"
          changes={[
            {
              category: 'Report Store Clean Rebuild — Architecture (6 phases)',
              items: [
                'Full clean rebuild of Report Store: deleted 2 monolithic demo files, created 34 new files across 6 phases',
                'Option A (clean rebuild) chosen over Option B (incremental refactor) after cross-reference audit confirmed universal foundation intact',
                'Self-contained organism architecture: every RS organism encapsulates its own data, layout, and interactions — zero prop wiring at template level',
                'ReportStorePage.tsx template: single file composing all organisms with mode switching (home/listing)',
              ]
            },
            {
              category: 'Phase 1: Data Layer & Hooks Infrastructure',
              items: [
                'data.ts: centralized mock data — ALL_REPORTS (18), FEATURED_REPORTS (5), RECOMMENDED_REPORTS (6), FULL_INDUSTRIES (9 with nested subs), TAGS_BY_INDUSTRY, FULL_REGIONS, PUBLISH_YEARS, SORT_OPTIONS, CTA_CONFIG, HERO_CONFIG',
                'industryIconMap.ts: Lucide icon mapping for 9 industries',
                'useReportFilters hook: complete filter state machine — 7 filter dimensions, derived filtered/sorted/paginated results, active chips, clear/toggle actions',
                'useProgressiveLoad, useCrossfade, useMountTransition hooks for animation orchestration',
              ]
            },
            {
              category: 'Phases 2–3: Core RS Organisms (10 organisms)',
              items: [
                'ReportStoreHero: full-bleed black hero with search bar, featured badge, category quick-links row',
                'FeaturedResearch: HorizontalScroll + ReportCard featured row with section heading',
                'ListingToolbar: result count, sort dropdown, ViewToggle, mobile filter button, back navigation',
                'CardListing: card grid/list with pagination, SkeletonCard loading, EmptyState fallback',
                'FiltersPanel: complete filter accordion (Industries/Tags/Regions/Years) with FilterSearchInput',
                'IndustrySidebar: SidebarPanel wrapper with header, scrollable FiltersPanel, footer count',
                'DailyDataHighlights: 4-card DataHighlightCard grid with daily market data points',
                'AnalystPicks: 3-card AnalystPickCardB grid with expert recommendations',
                'IndustrySectorsGrid: industry sector cards with IconBadge and report counts',
                'QuickAccessBar: horizontal action bar (New Reports, Trending, Formats, Regions)',
              ]
            },
            {
              category: 'Phase 4: Section RS Organisms (13 organisms)',
              items: [
                'KeyMarketIndicators: StatsRow wrapper with 4 RS market stat cards',
                'RecommendedForYou: BrowseGrid wrapper with personalized report recommendations + ViewToggle',
                'CustomResearchCTA: CTABanner wrapper with RS-specific CTA copy on black background',
                'TrendingTopics: clickable topic pills with growth percentage badges',
                'TopDownloads: ranked list of most-downloaded reports with download counts',
                'RecentlyViewed: HorizontalScroll row of recently viewed reports (personalization)',
                'UpcomingReports: pipeline reports with expected dates and notify buttons',
                'ResearchMethodology: 5-step process section with IconBadge steps (trust-building)',
                'NewsletterSignup: email subscription banner with input + submit button',
                'IndustrySpotlight: featured industry deep-dive with stats grid + featured report',
                'ComparisonTable: report format comparison (Full Report vs Market Brief vs Data Pack)',
                'TestimonialsRS: client testimonial quote cards (social proof)',
                'ReportPreview: detailed report detail view with metadata, TOC, and download actions',
              ]
            },
            {
              category: 'Phase 5: New Atoms & Molecules',
              items: [
                'IconBadge atom: icon container with tinted background, 4 sizes (xs/sm/md/lg)',
                'CategoryListItem atom: category row with icon, label, count, chevron, active state',
                'CategoryListCard molecule: card wrapping vertical CategoryListItem list with header/footer',
                'LoadMoreSentinel molecule: IntersectionObserver trigger + loading indicator for infinite scroll',
              ]
            },
            {
              category: 'Phase 6: Template, Barrels & Dashboard Integration',
              items: [
                'ReportStorePage.tsx template: home mode (10 organisms) + listing mode (sidebar + toolbar + card grid + mobile filters)',
                'Organisms barrel updated: 30 exports (6 cross-pillar + 24 RS-specific)',
                'Molecules barrel updated: CategoryListCard + LoadMoreSentinel added',
                'Components barrel updated: IconBadge + CategoryListItem exports',
                'Hooks barrel updated: useReportFilters + useProgressiveLoad + useCrossfade + useMountTransition',
                'RS Organisms showcase: interactive gallery with 30 organisms (6 cross-pillar + 24 RS-specific), category filtering, expand/collapse, inventory table',
                'PatternsContent updated: v4.3 section sequence, organism architecture table, component selection reference with atomic level badges',
                'Patterns tab: new RS Organisms sub-tab (11 sub-tabs total)',
                'Welcome page: layer counts, pillar cards, quick links, HOW section all updated for v4.3',
              ]
            },
          ]}
        />

        <ChangelogSection
          version="4.2"
          date="March 2026"
          type="major"
          changes={[
            {
              category: 'Report Store Page Patterns (Sessions 9-10)',
              items: [
                'New "Report Store Pages" sub-tab with 8-section home sequence and molecule annotations',
                'Listing page wireframe: filters sidebar + ViewToggle + card grid + pagination',
                'Component Triad formal pattern doc with relationship diagram and code example',
                'Hero Template pattern: Display vs Product hero comparison with shared structure analysis',
                'Section recipe table (7 rows) mapping sections to molecules, layout, and background',
                'Product page shell template with full import block',
              ]
            },
            {
              category: 'Surveys Pillar Framework (Session 10)',
              items: [
                'Surveys elevated from "planned" to "framework defined" across all dashboard surfaces',
                'New "Surveys Pages" sub-tab with projected 6-section home page sequence',
                'Reuse vs Build analysis table (11 components): 7 reuse, 1 extend, 4 build new',
                'Survey-specific molecules defined: SurveyCard, ResponseChart, QuestionPreview, CompletionBadge',
                '4 locked design decisions + Phase 6-7 implementation roadmap checklist',
              ]
            },
            {
              category: 'Consulting Pillar Expansion (Session 10)',
              items: [
                '"Page Layouts" renamed to "Consulting Pages" for pillar alignment',
                'Architecture pillar card expanded: all 10 organism names, content model, shared foundations',
                'Display page title updated with cross-link to Report Store Pages',
              ]
            },
            {
              category: 'Dashboard Navigation and Welcome Updates',
              items: [
                'Patterns tab expanded: 11 sub-tabs (Consulting, Report Store, RS Organisms, RS Demo, RS Listing, Surveys, Surveys Demo, Surveys Listing, Template Demo, Content Patterns, Backgrounds)',
                'Welcome quick links expanded from 7 to 9 with dedicated pillar page pattern links',
                'Surveys pillar card on Welcome page upgraded with amber "Framework" badge',
                'Architecture Surveys card: 6 reused components + 4 planned molecules + content model',
              ]
            },
            {
              category: 'Report Store Home Demo (Session 12)',
              items: [
                'Full interactive 8-section Report Store home page with real molecule components',
                'Live ViewToggle + SkeletonCard loading simulation in Recommended section',
                'HorizontalScroll carousel for Featured Reports with 5 ReportCards',
                'StatCard, DataHighlightCard, AnalystPickCardB grids with realistic mock data',
                'Section map legend annotating which molecule each section uses',
              ]
            },
            {
              category: 'Surveys Pillar Molecules (Session 13)',
              items: [
                'CompletionBadge: 4 lifecycle states (draft/active/completed/closed) with optional progress',
                'SurveyCard: dual grid+list layout, response progress bar, CompletionBadge integration',
                'ResponseChart: CSS-only horizontal bar + donut modes, no chart library dependency',
                'QuestionPreview: 6 question types with rendered input previews (radio, checkbox, text, rating, number, dropdown)',
                'All 4 molecules added to molecules/index.ts barrel with full type exports',
                'Cards documentation expanded with Surveys Pillar Molecules section + live showcases',
              ]
            },
            {
              category: 'Surveys Home Demo (Session 14)',
              items: [
                'Full interactive 6-section Surveys home page with real Surveys molecules',
                'Live ViewToggle + SkeletonCard loading simulation in Popular Surveys section',
                'HorizontalScroll carousel for Featured Surveys with 4 SurveyCards',
                'ResponseChart horizontal bars + donut completion summaries for Recent Results',
                'QuestionPreview grid showing 4 question types from sample survey',
                'Topic badges with CompletionBadge status indicators',
                'Surveys Pages sub-tab updated: "Framework" badge → "Molecules Built", section statuses upgraded',
              ]
            },
            {
              category: 'SurveySkeleton + Surveys Listing Demo (Session 15)',
              items: [
                'SurveySkeleton: survey-specific shimmer loading matching SurveyCard grid+list structure',
                'Surveys Listing Demo: full product listing page with filters sidebar, search, ViewToggle, pagination',
                'Filter sidebar: topic filter (12 topics), status filter (4 states), quick stats panel',
                'Active filter pills with individual clear + clear-all, result count updates',
                'SurveySkeleton + SurveyCard triad with simulated loading on filter/page/view changes',
                'Pagination: numbered pages, prev/next, showing X–Y of Z, 6 per page across 18 surveys',
                'EmptyState component integration for no-results filter combinations',
                'Molecule count updated to 20 (15 Report Store + 5 Surveys)',
              ]
            },
            {
              category: 'Report Store Listing Demo (Session 16)',
              items: [
                'Report Store Listing Demo: full product listing page paralleling Surveys Listing pattern',
                'Filter sidebar: 9 industries, 3 formats, 4 regions with real-time counts',
                'Sort options: Newest, Title A–Z, Industry with SkeletonCard loading on change',
                'Cross-pillar Pattern Comparison table showing shared vs pillar-specific elements',
                'Patterns tab expanded to 9 sub-tabs with dedicated RS Listing entry',
                '10 unique Unsplash images across 18 mock reports with full descriptions',
              ]
            },
            {
              category: 'Organism Composition (Session 17)',
              items: [
                'ProductHero: reusable hero template with SectionHeading, optional search, badge row, and children slot',
                'FeaturedCarousel: SectionHeading + HorizontalScroll carousel accepting any card as children',
                'StatsRow: SectionHeading + responsive StatCard grid with configurable 2/3/4 columns',
                'CTABanner: centered SectionHeading + primary/secondary button pair for page bottom',
                'Organisms barrel: /components/organisms/index.ts with full type exports',
                'Product Page Organisms showcase added to Components tab with code examples',
                'Architecture section updated with organisms directory listing',
              ]
            },
            {
              category: 'BrowseGrid + Demo Refactors (Session 18)',
              items: [
                'BrowseGrid organism: generic Component Triad section with ViewToggle + renderCard + SkeletonCard, supports controlled/uncontrolled viewMode',
                'Organism count: 5 (ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner)',
                'Report Store Demo refactored: 5 of 8 sections now use organisms (Hero, Featured, Stats, Browse, CTA)',
                'Surveys Demo refactored: 4 of 6 sections now use organisms (Hero, Featured, Browse, CTA)',
                'Both demos show "Organisms" badge and updated section maps showing organism vs bespoke sections',
                'Proves end-to-end organism reusability across both pillars with identical API',
              ]
            },
            {
              category: 'Template Layer + Welcome Update (Session 19)',
              items: [
                'ProductPageTemplate: declarative page template with hero/featured/stats/browse/cta config + afterStats/afterBrowse/beforeCta bespoke slots',
                'Composition Layer Map added to Welcome: visual 5-layer diagram (Tokens → Atoms → Molecules → Organisms → Templates)',
                'Product Page Assembly Flow: horizontal pipeline showing Tokens → Atoms → Molecules → Organisms → Template → Page',
                'Welcome stats updated: 5+1 Organisms + Template count, Research/Surveys status badges updated',
                'HOW section updated with organisms directory, Product Pages comparison updated with organism/template info',
                'Organisms barrel now exports 5 organisms + 1 template with full type exports',
              ]
            },
            {
              category: 'Template Demo + Training Pillar (Session 20)',
              items: [
                'TemplateDemoContent: hypothetical "Training" pillar assembled entirely via ProductPageTemplate',
                'Zero custom layout code — all 5 organism zones from config objects + 1 afterStats bespoke slot (Learning Tracks)',
                'Inline CourseCard molecule (grid + list modes) demonstrates plugging new card types into organisms',
                'Code comparison panel: Manual (~350 lines) vs Template (~80 lines config) for same visual output',
                'Zone Map + Badge Comparison showing Report Store (manual) vs Surveys (manual) vs Training (template)',
                'New "Template Demo" sub-tab in Content Patterns section',
              ]
            },
            {
              category: 'Phase 6: React Router Integration (Session 21)',
              items: [
                'React Router Data mode: createBrowserRouter with /:tab/:subTab URL pattern',
                'Deep-linking: every tab/sub-tab now has a unique URL (e.g. /patterns/template-demo)',
                'Browser back/forward navigation fully functional',
                'GitHub version uses useState-based tab routing (Figma Make version uses react-router URL params)',
                'handleNavClick uses setActiveTab/setActiveSubTab for tab switching',
                'Auto-expand: active section auto-expands in sidebar on tab change',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="4.1"
          date="March 2026"
          type="major"
          changes={[
            {
              category: 'Component Triad Pattern',
              items: [
                'ReportCard unified with layout="grid"|"list" prop — replaces separate grid/list components',
                'ViewToggle ↔ ReportCard ↔ SkeletonCard share single viewMode state',
                'ReportGridCard marked @deprecated — thin wrapper forwarding to ReportCard layout="grid"',
                'SkeletonCard matches both grid and list layouts automatically',
              ]
            },
            {
              category: 'Three-Pillar Architecture',
              items: [
                'Dashboard Welcome rewritten for Research, Consulting, Surveys framing',
                'Architecture sub-tab with three-pillar diagram and page type comparison',
                'Display Pages (editorial, bespoke) vs Product Pages (systematic, composable) distinction formalized',
                'Stats updated: 70+ components, 15 molecules, 3 pillars',
              ]
            },
            {
              category: 'Dashboard v4.1 Updates',
              items: [
                'Version bumped across all surfaces (footer, hero badge, changelog)',
                'Design Principle 05 expanded for dual section patterns (Case Study + Report Store)',
                'System Identity cards updated with three-pillar architecture',
                'Quick Links expanded with Architecture entry',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="4.0"
          date="March 2026"
          type="major"
          changes={[
            {
              category: 'Report Store Molecules (15 components)',
              items: [
                'ReportCard — grid+list layout with badge, metadata, footer action',
                'StatCard — metric display with trend indicator and sparkline slot',
                'DataHighlightCard — daily data points with source attribution',
                'AnalystPickCardB — analyst recommendation with avatar and rating',
                'CardMetaRow, CardFooterRow — shared card sub-components',
                'SkeletonCard, EmptyState — loading and zero-result states',
                'HorizontalScroll, ScrollFade — carousel and fade-edge containers',
                'CardReveal, RevealImage — scroll-triggered animation wrappers',
                'IndustryBadge, BackToTop — utility components',
              ]
            },
            {
              category: 'New Atoms & Layout Components',
              items: [
                'Tooltip — portal-based with auto top/bottom positioning',
                'ViewToggle — grid/list switch with warm pill container, 44px touch targets',
                'FadeInSection — intersection observer animation wrapper',
                'SectionHeading — prop-driven heading for Product pages (title/subtitle/label/action/endSlot)',
                'SectionWrapper — section container with background variants',
                'ScrollToTop, ScrollProgress — scroll utility components',
              ]
            },
            {
              category: 'Infrastructure',
              items: [
                'GitHub→Figma Make sync plan v4 completed — all 35 tasks across 6 sessions',
                'Molecules barrel (molecules/index.ts) with full re-exports',
                'Master barrel (components/index.ts) updated with v4.0/v4.1 export blocks',
                'Button.tsx enhanced with xs size and CSS var-driven sizing',
                'Badge.tsx CSS custom property pattern finalized',
                'Icon color system (iconColors.ts): content #806ce0, utility #737373',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="3.3.2"
          date="March 2026"
          type="minor"
          changes={[
            {
              category: 'AI Context Modularization',
              items: [
                'Split 53KB monolith into 6 focused modules in ai-context/ directory (CORE, TYPOGRAPHY, COLORS, COMPONENTS, LAYOUT, PROMPTS)',
                'All modules under 10KB — fully readable via GitHub API',
                'DESIGN_SYSTEM_AI_CONTEXT.md now a 3KB lightweight index pointing to modules',
                'DESIGN_SYSTEM_UPDATES.md converted to pure changelog',
              ]
            },
            {
              category: 'Badge CSS Custom Property Migration',
              items: [
                'Phase 1: Added 17 --badge-* CSS variables to theme.css (size, shape, animation)',
                'Phase 2: Badge.tsx consumes CSS vars for all sizes and shapes',
                'Phase 3: CSS color consumption rules (hover, shimmer states)',
                'Phase 4: All 11 theme colors via CSS custom properties — zero hardcoded values',
                'Architecture: JS selects theme → sets inline CSS vars → CSS rules consume them',
              ]
            },
            {
              category: 'Documentation Consolidation',
              items: [
                'BADGES_DOCUMENTATION.md rewritten to v3.0 (18KB→12KB) aligned with CSS migration',
                'TECHNICAL_HANDOVER.md marked historical with staleness warnings',
                'PROJECT_STRUCTURE.md deleted (merged into GITHUB_REPO_MANIFEST.md)',
                'design-system-checklist.md updated to v2.1',
                'Dashboard updated: version refs, 92-5-3 visual, principles rewrite, Quick Start tokens fix',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="3.3"
          date="March 2026"
          type="minor"
          changes={[
            {
              category: 'Secondary Button Two-State Design',
              items: [
                'Resting: neutral border rgba(0,0,0,0.12), text rgba(0,0,0,0.7), white shimmer',
                'Hover: brand-red border #b01f24, brand-red text, red-tinted shimmer + shadow',
                'Dark mode secondary unchanged (bg-white/10, white text)',
                '300ms ease-out transition for all property changes',
              ]
            },
            {
              category: 'New Rules & Guides',
              items: [
                '92-5-3 Color Usage Hierarchy formalized — the #1 color rule',
                'Page Assembly Guide with 7 section-type recipes',
                'Token Cross-Reference table linking elements to tokens',
                'Component-level recipes for all 10 section types',
              ]
            },
            {
              category: 'Page-Level Components Documented',
              items: [
                'SectionWrapper, SectionHeading, Card, ScrollToTop, ScrollProgress, NextSectionCTA',
                'Navbar two-state system, ReadingProgressBar, StickyCTA, ContactModal, TableOfContents',
                'COMPONENT_GUIDELINES_4WH.md expanded with 3 new component entries',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="3.2.0"
          date="February 2026"
          type="minor"
          changes={[
            {
              category: 'New',
              items: [
                'Badge convenience wrappers documentation added to all 3 AI context files',
                'Full 10-wrapper inventory table (SectionLabel, StepPill, ObjectivePill, ObjectivePillInteractive, InfoCardLabel, CategoryBadge, StatusBadge, InfoBadge, MutedBadge, ClickableBadge)',
                'Fixed 6 broken barrel exports in index.ts — now correctly exports all named content components',
                'Removed dead ButtonAnimationTest import from Dashboard',
                'Version numbers updated across all surfaces (sidebar, hero badge, changelog)',
              ]
            },
            {
              category: 'Documentation',
              items: [
                'DESIGN_SYSTEM_AI_CONTEXT.md updated with full wrapper API reference',
                'AI_DESIGN_SYSTEM_PROMPT.md file structure section expanded with 10 wrapper descriptions',
                'AI_CONTEXT_DESIGN_SYSTEM.md Badge section expanded with convenience wrapper table',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="3.1.0"
          date="February 2026"
          type="minor"
          changes={[
            {
              category: 'Completed',
              items: [
                'Massive local-to-GitHub sync gap fully resolved — all missing files pushed',
                'GITHUB_REPO_MANIFEST.md created at repo root with comprehensive file inventory',
                '5-batch token formalization migration complete (49 code edits across 17 files, zero regressions)',
                'Stale documentation sweep finished — all docs verified accurate',
              ]
            },
            {
              category: 'Infrastructure',
              items: [
                'GitHub API push workflow validated for non-terminal Figma Make environment',
                'Migration exceptions documented (AllTypographyTokensContent hardcoded values, ChallengesSection JS card-width calc, ContactModal modal width, PatternsContent demo code string)',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="3.0.0"
          date="February 2026"
          type="major"
          changes={[
            {
              category: 'New',
              items: [
                'Badge.tsx unified component — 132 combinations (3 variants × 4 sizes × 11 themes)',
                '10 pre-configured convenience wrappers for common badge patterns',
                'Form-only Label.tsx separated from Badge system (3 variants: default, secondary, required)',
                'Layout Container system with 5 semantic width tokens (page/content/narrow/prose/compact)',
                'Mobile-First Responsive Padding system with 3 breakpoint tokens',
              ]
            },
            {
              category: 'Enhanced',
              items: [
                'Color palette expanded: coral (50-900), purple (50-900), periwinkle (50-900), perano (50-900)',
                'Muted theme added to Badge — deliberately subdued, distinct from neutral',
                'Secondary button style: white base, warm-500 border, coral-50 shimmer sweep',
                'Font Pairing System formalized: DM Sans (UI) / Noto Serif (editorial) / system mono',
              ]
            },
            {
              category: 'Documentation',
              items: [
                'Three AI context markdown files created at v3.0 (DESIGN_SYSTEM_AI_CONTEXT.md, AI_DESIGN_SYSTEM_PROMPT.md, AI_CONTEXT_DESIGN_SYSTEM.md)',
                'BadgeLabelsDocumentation.tsx comprehensive showcase page',
                'BadgeShowcase.tsx with all 132 combinations rendered',
              ]
            }
          ]}
        />

        <ChangelogSection
          version="2.0.0"
          date="January 2026"
          type="major"
          changes={[
            {
              category: 'New',
              items: [
                'Added comprehensive Motion & Animation system with 4-layer duration scale',
                'New Layout Patterns section with grid systems and z-index strategy',
                'Stripe-style dashboard with side navigation',
                'Interactive component playground'
              ]
            },
            {
              category: 'Enhanced',
              items: [
                'Expanded typography section with responsive sizing examples',
                'Added 6 new spacing helper components',
                'Improved color accessibility documentation',
                'Enhanced button component with more variants'
              ]
            }
          ]}
        />
        
        <ChangelogSection
          version="1.0.0"
          date="December 2025"
          type="initial"
          changes={[
            {
              category: 'Initial Release',
              items: [
                'Complete design system with 7 categories',
                'Atomic design methodology implementation',
                '50+ documented components',
                'Comprehensive WHY/WHAT/WHERE/WHEN/HOW framework'
              ]
            }
          ]}
        />
      </div>
    </div>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-normal mb-1">{number}</div>
      <div className="text-sm text-black/60">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-6 border border-black/8 rounded-[5px] hover:border-black/20 transition-colors">
      <div className="text-black/80 mb-3">{icon}</div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-black/60">{description}</p>
    </div>
  );
}

function QuickLinkCardButton({ title, description, onClick }: { 
  title: string; 
  description: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 hover:bg-black/2 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium mb-1 group-hover:text-[var(--brand-red)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-black/60">{description}</p>
        </div>
        <ChevronRight size={18} className="text-black/40 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

function PrincipleCard({ 
  number, 
  title, 
  description, 
  principles 
}: { 
  number: string; 
  title: string; 
  description: string;
  principles: string[];
}) {
  return (
    <div className="border-l-2 border-black pl-8">
      <div className="text-sm text-black/40 font-mono mb-2">{number}</div>
      <h3 className="text-2xl font-normal mb-3">{title}</h3>
      <p className="text-black/70 mb-4">{description}</p>
      <ul className="space-y-2">
        {principles.map((principle, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Circle size={6} className="mt-2 fill-black" />
            <span className="text-sm text-black/80">{principle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCardButton({ 
  step, 
  title, 
  description, 
  action,
  onClick
}: { 
  step: string; 
  title: string; 
  description: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="flex gap-6 p-6 border border-black/8 rounded-[5px] hover:border-black/15 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-mono text-lg">
        {step}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-normal mb-2">{title}</h3>
        <p className="text-black/70 mb-4">{description}</p>
        <button
          className="text-sm font-medium hover:text-[var(--brand-red)] transition-colors inline-flex items-center gap-2"
          onClick={onClick}
        >
          {action}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="border border-black/8 rounded-[10px] overflow-hidden">
      <div className="bg-black/5 px-4 py-2 border-b border-black/8 flex items-center justify-between">
        <span className="text-xs font-mono text-black/60">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-xs font-medium hover:text-[var(--brand-red)] transition-colors cursor-pointer"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-black/2">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

function ChangelogSection({ 
  version, 
  date, 
  type, 
  changes 
}: { 
  version: string; 
  date: string;
  type: 'major' | 'minor' | 'initial';
  changes: { category: string; items: string[] }[];
}) {
  const typeColors = {
    major: 'bg-[var(--brand-red)] text-white',
    minor: 'bg-black/10 text-black',
    initial: 'bg-black text-white'
  };

  return (
    <div className="border border-black/8 rounded-[5px] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-2xl font-normal">Version {version}</h3>
            <span className={`px-2 py-0.5 rounded-[5px] text-xs font-medium ${typeColors[type]}`}>
              {type === 'major' ? 'Major' : type === 'minor' ? 'Minor' : 'Initial Release'}
            </span>
          </div>
          <p className="text-sm text-black/60">{date}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {changes.map((change, idx) => (
          <div key={idx}>
            <h4 className="font-medium mb-2">{change.category}</h4>
            <ul className="space-y-2">
              {change.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3 text-sm text-black/70">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}