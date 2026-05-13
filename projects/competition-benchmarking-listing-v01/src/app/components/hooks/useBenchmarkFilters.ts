/**
 * useBenchmarkFilters — Custom Hook
 * competition-benchmarking-listing-v01
 *
 * Encapsulates filter, sort, search, URL sync, and facet-count state
 * for the competition benchmarking listing page.
 *
 * URL contract: ?industry=...&region=...&size=...&method=...&year=...&sort=latest&q=...
 * Debounce: 300ms before URL push.
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  BENCHMARK_REPORTS,
  SORT_OPTIONS,
  computeFacetCounts,
  deriveCountry,
  deriveTags,
  type BenchmarkReport,
  type SortOption,
} from '../../../lib/mock-data';

const INITIAL_LOAD = 12;
const LOAD_MORE_COUNT = 12;
const DEBOUNCE_MS = 300;

function parseSearchParams(): {
  industries: string[];
  regions: string[];
  countries: string[];
  tags: string[];
  competitorSetSizes: string[];
  methodologies: string[];
  years: string[];
  sort: SortOption;
  q: string;
} {
  const sp = new URLSearchParams(window.location.search);
  return {
    industries: sp.getAll('industry'),
    regions: sp.getAll('region'),
    countries: sp.getAll('country'),
    tags: sp.getAll('tag'),
    competitorSetSizes: sp.getAll('size'),
    methodologies: sp.getAll('method'),
    years: sp.getAll('year'),
    sort: (sp.get('sort') as SortOption) || 'latest',
    q: sp.get('q') || '',
  };
}

function sortReports(reports: BenchmarkReport[], sort: SortOption): BenchmarkReport[] {
  const sorted = [...reports];
  switch (sort) {
    case 'latest':
      sorted.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
      break;
    case 'oldest':
      sorted.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate));
      break;
    case 'industry-az':
      sorted.sort((a, b) => a.industry.localeCompare(b.industry));
      break;
    case 'most-pages':
      sorted.sort((a, b) => b.pages - a.pages);
      break;
    case 'trending':
      // Trending = most recent + featured first
      sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.publishedDate.localeCompare(a.publishedDate);
      });
      break;
  }
  return sorted;
}

export function useBenchmarkFilters() {
  const initial = parseSearchParams();

  const [industries, setIndustries] = useState<string[]>(initial.industries);
  const [regions, setRegions] = useState<string[]>(initial.regions);
  const [countries, setCountries] = useState<string[]>(initial.countries);
  const [tags, setTags] = useState<string[]>(initial.tags);
  const [competitorSetSizes, setCompetitorSetSizes] = useState<string[]>(initial.competitorSetSizes);
  const [methodologies, setMethodologies] = useState<string[]>(initial.methodologies);
  const [years, setYears] = useState<string[]>(initial.years);
  const [sort, setSort] = useState<SortOption>(initial.sort);
  const [searchQuery, setSearchQuery] = useState(initial.q);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // URL sync — debounced 300ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const sp = new URLSearchParams();
      // Always lock reportType
      sp.set('type', 'competition-benchmarking');
      industries.forEach((v) => sp.append('industry', v));
      regions.forEach((v) => sp.append('region', v));
      countries.forEach((v) => sp.append('country', v));
      tags.forEach((v) => sp.append('tag', v));
      competitorSetSizes.forEach((v) => sp.append('size', v));
      methodologies.forEach((v) => sp.append('method', v));
      years.forEach((v) => sp.append('year', v));
      if (sort !== 'latest') sp.set('sort', sort);
      if (searchQuery) sp.set('q', searchQuery);
      window.history.replaceState({}, '', `?${sp.toString()}`);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [industries, regions, countries, tags, competitorSetSizes, methodologies, years, sort, searchQuery]);

  // Filtered + sorted reports
  const filteredReports = useMemo(() => {
    let result = BENCHMARK_REPORTS.filter((r) => {
      if (industries.length > 0 && !industries.includes(r.industry)) return false;
      if (regions.length > 0 && !regions.includes(r.region)) return false;
      if (countries.length > 0 && !countries.includes(deriveCountry(r))) return false;
      if (tags.length > 0 && !tags.some((t) => deriveTags(r).includes(t))) return false;
      if (competitorSetSizes.length > 0 && !competitorSetSizes.includes(r.competitorSetSize)) return false;
      if (methodologies.length > 0 && !methodologies.some((m) => r.methodology.includes(m as BenchmarkReport['methodology'][number]))) return false;
      if (years.length > 0 && !years.includes(r.publishedDate.slice(0, 4))) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!r.title.toLowerCase().includes(q) && !r.industry.toLowerCase().includes(q) && !r.region.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    result = sortReports(result, sort);

    // Featured always first regardless of sort (spec step 10)
    const featuredIdx = result.findIndex((r) => r.isFeatured);
    if (featuredIdx > 0) {
      const [featured] = result.splice(featuredIdx, 1);
      result.unshift(featured);
    }

    return result;
  }, [industries, regions, countries, tags, competitorSetSizes, methodologies, years, sort, searchQuery]);

  // Reset visible count when filters change
  const prevFilterHash = useRef('');
  const filterHash = `${industries.join()}-${regions.join()}-${countries.join()}-${tags.join()}-${competitorSetSizes.join()}-${methodologies.join()}-${years.join()}-${sort}-${searchQuery}`;
  useEffect(() => {
    if (prevFilterHash.current !== filterHash) {
      prevFilterHash.current = filterHash;
      setVisibleCount(INITIAL_LOAD);
    }
  }, [filterHash]);

  const visibleReports = useMemo(() => filteredReports.slice(0, visibleCount), [filteredReports, visibleCount]);
  const hasMore = visibleCount < filteredReports.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredReports.length));
      setIsLoadingMore(false);
    }, 350);
  }, [isLoadingMore, hasMore, filteredReports.length]);

  // Facet counts
  const facetCounts = useMemo(
    () => computeFacetCounts(BENCHMARK_REPORTS, { industries, regions, countries, tags, competitorSetSizes, methodologies, years, pageRanges: [] }),
    [industries, regions, countries, tags, competitorSetSizes, methodologies, years]
  );

  // Toggle helpers
  const toggleFilter = useCallback(<T extends string>(
    value: T,
    current: T[],
    setter: (next: T[]) => void
  ) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  }, []);

  const toggleIndustry = useCallback((v: string) => toggleFilter(v, industries, setIndustries), [industries, toggleFilter]);
  const toggleRegion = useCallback((v: string) => toggleFilter(v, regions, setRegions), [regions, toggleFilter]);
  const toggleCountry = useCallback((v: string) => toggleFilter(v, countries, setCountries), [countries, toggleFilter]);
  const toggleTag = useCallback((v: string) => toggleFilter(v, tags, setTags), [tags, toggleFilter]);
  const toggleSize = useCallback((v: string) => toggleFilter(v, competitorSetSizes, setCompetitorSetSizes), [competitorSetSizes, toggleFilter]);
  const toggleMethodology = useCallback((v: string) => toggleFilter(v, methodologies, setMethodologies), [methodologies, toggleFilter]);
  const toggleYear = useCallback((v: string) => toggleFilter(v, years, setYears), [years, toggleFilter]);

  const clearAll = useCallback(() => {
    setIndustries([]);
    setRegions([]);
    setCountries([]);
    setTags([]);
    setCompetitorSetSizes([]);
    setMethodologies([]);
    setYears([]);
    setSearchQuery('');
    setSort('latest');
  }, []);

  const activeFilterCount = industries.length + regions.length + countries.length + tags.length + competitorSetSizes.length + methodologies.length + years.length + (searchQuery ? 1 : 0);

  // Active filter chips for toolbar + sticky bar
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...industries.map((v) => ({ label: v, onRemove: () => setIndustries((prev) => prev.filter((x) => x !== v)) })),
    ...regions.map((v) => ({ label: v, onRemove: () => setRegions((prev) => prev.filter((x) => x !== v)) })),
    ...countries.map((v) => ({ label: v, onRemove: () => setCountries((prev) => prev.filter((x) => x !== v)) })),
    ...tags.map((v) => ({ label: v, onRemove: () => setTags((prev) => prev.filter((x) => x !== v)) })),
    ...competitorSetSizes.map((v) => ({ label: `Set: ${v}`, onRemove: () => setCompetitorSetSizes((prev) => prev.filter((x) => x !== v)) })),
    ...methodologies.map((v) => ({ label: v.replace(/-/g, ' '), onRemove: () => setMethodologies((prev) => prev.filter((x) => x !== v)) })),
    ...years.map((v) => ({ label: v, onRemove: () => setYears((prev) => prev.filter((x) => x !== v)) })),
  ];

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Latest first';

  return {
    // Filter state
    industries, regions, countries, tags, competitorSetSizes, methodologies, years, sort, searchQuery,
    // Derived
    filteredReports, visibleReports, hasMore, isLoadingMore, filterHash,
    activeFilterCount, activeChips, facetCounts, sortLabel,
    // Setters
    setSort, setSearchQuery,
    // Toggles
    toggleIndustry, toggleRegion, toggleCountry, toggleTag, toggleSize, toggleMethodology, toggleYear,
    clearAll, loadMore,
    // Mobile
    mobileFilterOpen, setMobileFilterOpen,
  };
}
