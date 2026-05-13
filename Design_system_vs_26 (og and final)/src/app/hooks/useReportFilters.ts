/**
 * useReportFilters — Hook (DS v4.3)
 *
 * WHAT: Manages all filter state for the Report Store listing page.
 * WHY:  Extracts the ~80 lines of filter state + derived logic from the
 *       monolithic listing demo content into a single composable hook.
 * WHEN: Used by the Report Store listing page template and any component
 *       that needs to read or modify filter state.
 * HOW:  Returns state setters, derived values (filtered/sorted/paginated
 *       results, active filter count, active chip descriptors), and
 *       action helpers (clearAll, applyFilter).
 *
 * FILTER DIMENSIONS:
 *   1. Industry (single-select with nested sub-industries)
 *   2. Sub-Industries (multi-select, dependent on industry)
 *   3. Tags (multi-select, dependent on industry)
 *   4. Regions (multi-select)
 *   5. Publish Year (multi-select)
 *   6. Format (multi-select)
 *   7. Search query (text)
 *   + Sort key (date | title | industry)
 */
import { useState, useMemo, useCallback } from 'react';
import type { ReportItem, SortKey } from '@/app/components/data';
import {
  ALL_REPORTS,
  FULL_INDUSTRIES,
  TAGS_BY_INDUSTRY,
  PAGE_SIZE,
} from '@/app/components/data';

export interface ActiveChip {
  label: string;
  category?: string;
  onRemove: () => void;
}

export interface ReportFilters {
  // ── State values ──
  searchQuery: string;
  sortBy: SortKey;
  currentPage: number;
  sidebarSearch: string;
  selectedIndustry: string | null;
  selectedSubIndustries: string[];
  selectedTags: string[];
  selectedRegions: string[];
  selectedYears: string[];
  selectedFormats: string[];

  // ── Section open/close ──
  industriesOpen: boolean;
  tagsOpen: boolean;
  regionsOpen: boolean;
  publishYearOpen: boolean;

  // ── Setters ──
  setSearchQuery: (q: string) => void;
  setSortBy: (key: SortKey) => void;
  setCurrentPage: (page: number) => void;
  setSidebarSearch: (q: string) => void;
  setSelectedIndustry: (industry: string | null) => void;
  setSelectedSubIndustries: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFormats: React.Dispatch<React.SetStateAction<string[]>>;
  setIndustriesOpen: (open: boolean) => void;
  setTagsOpen: (open: boolean) => void;
  setRegionsOpen: (open: boolean) => void;
  setPublishYearOpen: (open: boolean) => void;

  // ── Derived ──
  filteredSidebarIndustries: typeof FULL_INDUSTRIES;
  availableTags: string[];
  activeFilterCount: number;
  filtered: ReportItem[];
  totalPages: number;
  paginated: ReportItem[];
  activeChips: ActiveChip[];

  // ── Actions ──
  clearAllFilters: () => void;
  applyFilter: () => void;
  handlePageChange: (page: number) => void;
  selectIndustry: (label: string) => void;
  toggleSubIndustry: (sub: string) => void;
  toggleTag: (tag: string) => void;
  toggleRegion: (region: string) => void;
  toggleYear: (year: string) => void;
  toggleFormat: (format: string) => void;
}

export function useReportFilters(): ReportFilters {
  // ── Core state ──
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarSearch, setSidebarSearch] = useState('');

  // ── Filter selections ──
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSubIndustries, setSelectedSubIndustries] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  // ── Section toggles ──
  const [industriesOpen, setIndustriesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);
  const [regionsOpen, setRegionsOpen] = useState(true);
  const [publishYearOpen, setPublishYearOpen] = useState(true);

  // ── Derived: sidebar industry search ──
  const filteredSidebarIndustries = useMemo(() => {
    if (!sidebarSearch) return FULL_INDUSTRIES;
    return FULL_INDUSTRIES.filter(ind =>
      ind.label.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      ind.subs.some(s => s.toLowerCase().includes(sidebarSearch.toLowerCase()))
    );
  }, [sidebarSearch]);

  // ── Derived: available tags (dependent on industry) ──
  const availableTags = selectedIndustry ? (TAGS_BY_INDUSTRY[selectedIndustry] || []) : [];

  // ── Derived: active filter count ──
  const activeFilterCount = [
    selectedIndustry !== null,
    selectedSubIndustries.length > 0,
    selectedTags.length > 0,
    selectedRegions.length > 0,
    selectedYears.length > 0,
    selectedFormats.length > 0,
    searchQuery !== '',
  ].filter(Boolean).length;

  // ── Actions ──
  const applyFilter = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedIndustry(null);
    setSelectedSubIndustries([]);
    setSelectedTags([]);
    setSelectedRegions([]);
    setSelectedYears([]);
    setSelectedFormats([]);
    setSearchQuery('');
    setSortBy('date');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const selectIndustry = useCallback((label: string) => {
    setSelectedIndustry(prev => {
      const next = prev === label ? null : label;
      setSelectedSubIndustries([]);
      setSelectedTags([]);
      return next;
    });
    applyFilter();
  }, [applyFilter]);

  const toggleSubIndustry = useCallback((sub: string) => {
    setSelectedSubIndustries(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
    applyFilter();
  }, [applyFilter]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    applyFilter();
  }, [applyFilter]);

  const toggleRegion = useCallback((region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
    applyFilter();
  }, [applyFilter]);

  const toggleYear = useCallback((year: string) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
    applyFilter();
  }, [applyFilter]);

  const toggleFormat = useCallback((format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
    applyFilter();
  }, [applyFilter]);

  // ── Derived: filtered + sorted results ──
  const filtered = useMemo(() => {
    let results = ALL_REPORTS.filter((r) => {
      if (selectedIndustry && r.industry !== selectedIndustry) return false;
      if (selectedSubIndustries.length > 0 && !selectedSubIndustries.includes(r.subcat)) return false;
      if (selectedRegions.length > 0 && !selectedRegions.includes(r.region)) return false;
      if (selectedYears.length > 0 && !selectedYears.some(y => r.date.includes(y))) return false;
      if (selectedFormats.length > 0 && r.format && !selectedFormats.includes(r.format)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.industry.toLowerCase().includes(q) &&
          !r.subcat.toLowerCase().includes(q) &&
          !(r.description || '').toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'industry') return a.industry.localeCompare(b.industry);
      return 0; // 'date' — default order is chronological from the array
    });

    return results;
  }, [selectedIndustry, selectedSubIndustries, selectedRegions, selectedYears, selectedFormats, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // ── Derived: active filter chips ──
  const activeChips = useMemo(() => {
    const chips: ActiveChip[] = [];
    selectedSubIndustries.forEach(s =>
      chips.push({ label: s, category: 'SUB-INDUSTRY', onRemove: () => { setSelectedSubIndustries(prev => prev.filter(x => x !== s)); applyFilter(); } })
    );
    selectedTags.forEach(t =>
      chips.push({ label: t, category: 'TAG', onRemove: () => { setSelectedTags(prev => prev.filter(x => x !== t)); applyFilter(); } })
    );
    selectedRegions.forEach(r =>
      chips.push({ label: r, category: 'REGION', onRemove: () => { setSelectedRegions(prev => prev.filter(x => x !== r)); applyFilter(); } })
    );
    selectedYears.forEach(y =>
      chips.push({ label: y, category: 'YEAR', onRemove: () => { setSelectedYears(prev => prev.filter(x => x !== y)); applyFilter(); } })
    );
    selectedFormats.forEach(f =>
      chips.push({ label: f, category: 'FORMAT', onRemove: () => { setSelectedFormats(prev => prev.filter(x => x !== f)); applyFilter(); } })
    );
    if (searchQuery) {
      chips.push({ label: `\u201C${searchQuery}\u201D`, category: 'SEARCH', onRemove: () => { setSearchQuery(''); applyFilter(); } });
    }
    return chips;
  }, [selectedIndustry, selectedSubIndustries, selectedTags, selectedRegions, selectedYears, selectedFormats, searchQuery, applyFilter]);

  return {
    searchQuery, sortBy, currentPage, sidebarSearch,
    selectedIndustry, selectedSubIndustries, selectedTags, selectedRegions, selectedYears, selectedFormats,
    industriesOpen, tagsOpen, regionsOpen, publishYearOpen,
    setSearchQuery, setSortBy, setCurrentPage, setSidebarSearch,
    setSelectedIndustry, setSelectedSubIndustries, setSelectedTags, setSelectedRegions, setSelectedYears, setSelectedFormats,
    setIndustriesOpen, setTagsOpen, setRegionsOpen, setPublishYearOpen,
    filteredSidebarIndustries, availableTags, activeFilterCount,
    filtered, totalPages, paginated, activeChips,
    clearAllFilters, applyFilter, handlePageChange,
    selectIndustry, toggleSubIndustry, toggleTag, toggleRegion, toggleYear, toggleFormat,
  };
}