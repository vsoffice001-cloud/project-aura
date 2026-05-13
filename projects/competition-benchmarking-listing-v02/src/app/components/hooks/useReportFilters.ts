/**
 * useReportFilters — Custom Hook
 *
 * Encapsulates all filter, search, sort, and pagination state
 * for the Report Store listing mode. Keeps App.tsx lean.
 *
 * Cross-industry consistency rules:
 *   1. When a sub-industry is toggled ON and it doesn't belong to the current
 *      sidebarIndustry → clear sidebarIndustry (switch to cross-industry mode).
 *   2. When an industry is selected → clear any sub-industries that don't
 *      belong to the newly selected industry.
 *   3. Banner pill clicks only show subs from the current industry, so no
 *      conflict is possible there.
 */
import { useState, useMemo } from "react";
import { reports, industries, subcategoryTagMap } from "../data";
import { toast } from "sonner";

/* ── Helpers ── */

/** Return the set of subcategory names that belong to a given industry */
function getSubsForIndustry(industryName: string): Set<string> {
  const ind = industries.find((i) => i.name === industryName);
  return new Set(ind?.subcategories ?? []);
}

/** Check whether every sub in the array belongs to the given industry */
function allSubsBelongToIndustry(
  subs: string[],
  industryName: string | null
): boolean {
  if (!industryName || subs.length === 0) return true;
  const valid = getSubsForIndustry(industryName);
  return subs.every((s) => valid.has(s));
}

/** Keep only subs that belong to the given industry */
function filterSubsToIndustry(
  subs: string[],
  industryName: string
): string[] {
  const valid = getSubsForIndustry(industryName);
  return subs.filter((s) => valid.has(s));
}

/** Find the parent industry name for a given subcategory */
function findParentIndustry(subcategory: string): string | null {
  for (const ind of industries) {
    if (ind.subcategories?.includes(subcategory)) {
      return ind.name;
    }
  }
  return null;
}

/** Scroll to the listing area instead of page top */
function scrollToListing() {
  const el = document.getElementById("listing-area");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function useReportFilters() {
  // View mode
  const [viewMode, setViewMode] = useState<"home" | "listing">("home");

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All Categories");

  // Sidebar
  const [sidebarIndustry, setSidebarIndustry] = useState<string | null>(null);

  // Sidebar filter sections (wired from IndustrySidebar)
  const [sidebarSubIndustries, setSidebarSubIndustries] = useState<string[]>([]);
  const [sidebarTags, setSidebarTags] = useState<string[]>([]);
  const [sidebarRegions, setSidebarRegions] = useState<string[]>([]);
  const [sidebarYears, setSidebarYears] = useState<string[]>([]);

  // Sort
  const [sortBy, setSortBy] = useState("Newest First");

  // Mobile filter sheet
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 6;

  // ── Handlers ──

  const handleIndustrySelect = (industry: string) => {
    setSidebarIndustry(industry);
    // Rule 2: clear sub-industries that don't belong to the new industry
    setSidebarSubIndustries((prev) => filterSubsToIndustry(prev, industry));
    setViewMode("listing");
    setCurrentPage(1);
    scrollToListing();
  };

  const handleBackToHome = () => {
    setViewMode("home");
    setSidebarIndustry(null);
    setSearchQuery("");
    setSearchCategory("All Categories");
    setSidebarSubIndustries([]);
    setSidebarTags([]);
    setSidebarRegions([]);
    setSidebarYears([]);
    setCurrentPage(1);
  };

  const handlePopularClick = (tag: string) => {
    setSearchQuery(tag);
    setViewMode("listing");
    setCurrentPage(1);
    scrollToListing();
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setViewMode("listing");
      setCurrentPage(1);
      scrollToListing();
    }
  };

  const handleSidebarIndustrySelect = (industry: string) => {
    if (sidebarIndustry === industry) {
      // Deselecting current industry — clear tags since they're industry-contextual
      setSidebarIndustry(null);
      setSidebarTags([]);
    } else {
      setSidebarIndustry(industry);
      // Rule 2: clear sub-industries that don't belong to the new industry
      setSidebarSubIndustries((prev) => filterSubsToIndustry(prev, industry));
      // Clear tags — they're contextual to the industry and may not apply to the new one
      setSidebarTags([]);
      if (viewMode === "home") {
        setViewMode("listing");
        // Only scroll when transitioning from home → listing
        scrollToListing();
      }
    }
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    // Compute the next sub-industry set
    const next = sidebarSubIndustries.includes(subcategory)
      ? sidebarSubIndustries.filter((s) => s !== subcategory)
      : [...sidebarSubIndustries, subcategory];

    setSidebarSubIndustries(next);

    // Auto-select the parent industry if none is selected
    if (!sidebarIndustry) {
      const parent = findParentIndustry(subcategory);
      if (parent) {
        setSidebarIndustry(parent);
      }
    }

    // Rule 1: if the new sub-industry set doesn't fully belong to the
    // current industry, auto-select the parent of the newly added subcategory
    if (sidebarIndustry && !allSubsBelongToIndustry(next, sidebarIndustry)) {
      const parent = findParentIndustry(subcategory);
      if (parent) {
        setSidebarIndustry(parent);
        // Keep only subs belonging to the new parent industry
        setSidebarSubIndustries(filterSubsToIndustry(next, parent));
        // Clear tags since we changed industry context
        setSidebarTags([]);
        toast(`Switched to ${parent}`, {
          description: `Showing results for ${parent}`,
          duration: 2500,
        });
      }
    }

    if (viewMode === "home") {
      setViewMode("listing");
    }
    setCurrentPage(1);
  };

  const handleClearSidebar = () => {
    setSidebarIndustry(null);
    setSidebarSubIndustries([]);
    setSidebarTags([]);
    setSidebarRegions([]);
    setSidebarYears([]);
    setCurrentPage(1);
  };

  const handleFilterIndustryChange = (industry: string) => {
    const newIndustry = industry === "All Industries" ? null : industry;
    setSidebarIndustry(newIndustry);
    // Rule 2: scope sub-industries to the new industry
    if (newIndustry) {
      setSidebarSubIndustries((prev) => filterSubsToIndustry(prev, newIndustry));
    }
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSearchCategory("All Categories");
    setSidebarIndustry(null);
    setSidebarSubIndustries([]);
    setSidebarTags([]);
    setSidebarRegions([]);
    setSidebarYears([]);
    setCurrentPage(1);
  };

  const handleRegionClick = (region: string) => {
    setSidebarRegions([region]);
    setViewMode("listing");
    setCurrentPage(1);
    scrollToListing();
  };

  // Individual removal handlers (for active filter chips)
  const removeIndustry = () => {
    setSidebarIndustry(null);
    setSidebarTags([]); // Tags are industry-contextual, clear when industry is removed
    setCurrentPage(1);
  };

  const removeSubIndustry = (value: string) => {
    setSidebarSubIndustries((prev) => prev.filter((s) => s !== value));
    setCurrentPage(1);
  };

  const removeTag = (value: string) => {
    setSidebarTags((prev) => prev.filter((t) => t !== value));
    setCurrentPage(1);
  };

  const removeRegion = (value: string) => {
    setSidebarRegions((prev) => prev.filter((r) => r !== value));
    setCurrentPage(1);
  };

  const removeYear = (value: string) => {
    setSidebarYears((prev) => prev.filter((y) => y !== value));
    setCurrentPage(1);
  };

  const removeSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Sidebar filter callbacks (called by IndustrySidebar onChange effects)
  const handleSidebarSubIndustriesChange = (subs: string[]) => {
    setSidebarSubIndustries(subs);

    // Auto-select parent industry if none is selected and subs are added
    if (!sidebarIndustry && subs.length > 0) {
      const parent = findParentIndustry(subs[subs.length - 1]);
      if (parent) {
        setSidebarIndustry(parent);
      }
    }

    // Rule 1: if any sub doesn't belong to the current industry,
    // switch to the parent of the most recently added sub
    if (sidebarIndustry && !allSubsBelongToIndustry(subs, sidebarIndustry)) {
      const lastSub = subs[subs.length - 1];
      const parent = findParentIndustry(lastSub);
      if (parent) {
        setSidebarIndustry(parent);
        setSidebarSubIndustries(filterSubsToIndustry(subs, parent));
        setSidebarTags([]);
        toast(`Switched to ${parent}`, {
          description: `Showing results for ${parent}`,
          duration: 2500,
        });
      }
    }

    if (subs.length > 0 && viewMode === "home") setViewMode("listing");
    setCurrentPage(1);
  };

  const handleSidebarTagsChange = (tags: string[]) => {
    setSidebarTags(tags);
    if (tags.length > 0 && viewMode === "home") setViewMode("listing");
    setCurrentPage(1);
  };

  const handleSidebarRegionsChange = (regions: string[]) => {
    setSidebarRegions(regions);
    if (regions.length > 0 && viewMode === "home") setViewMode("listing");
    setCurrentPage(1);
  };

  const handleSidebarYearsChange = (years: string[]) => {
    setSidebarYears(years);
    if (years.length > 0 && viewMode === "home") setViewMode("listing");
    setCurrentPage(1);
  };

  // ── Derived state ──

  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.industry.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          (r.subcat && r.subcat.toLowerCase().includes(q))
      );
    }

    if (sidebarIndustry)
      result = result.filter((r) => r.industry === sidebarIndustry);

    if (sidebarSubIndustries.length > 0)
      result = result.filter((r) =>
        sidebarSubIndustries.includes(r.subcat || "")
      );

    if (sidebarRegions.length > 0)
      result = result.filter((r) =>
        sidebarRegions.some((g) =>
          r.region.toLowerCase().includes(g.toLowerCase())
        )
      );

    if (sidebarYears.length > 0)
      result = result.filter((r) =>
        sidebarYears.some((y) => r.date.includes(y))
      );

    if (sidebarTags.length > 0)
      result = result.filter((r) =>
        sidebarTags.some((tag) => {
          // Check if report's subcategory is mapped to this tag via the CSV hierarchy
          const mappedTags = subcategoryTagMap[r.subcat] || [];
          return (
            mappedTags.includes(tag) ||
            r.title.toLowerCase().includes(tag.toLowerCase()) ||
            r.subcat.toLowerCase().includes(tag.toLowerCase())
          );
        })
      );

    if (searchCategory !== "All Categories")
      result = result.filter((r) => r.industry === searchCategory);

    switch (sortBy) {
      case "Newest First":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest First":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Most Popular":
        result.sort(
          (a, b) =>
            parseInt(b.downloads.replace(",", "")) -
            parseInt(a.downloads.replace(",", ""))
        );
        break;
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [
    searchQuery,
    sidebarIndustry,
    sidebarSubIndustries,
    sidebarRegions,
    sidebarYears,
    sidebarTags,
    searchCategory,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / reportsPerPage)
  );

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const activeFilterCount = [
    sidebarIndustry != null,
    sidebarSubIndustries.length > 0,
    sidebarRegions.length > 0,
    sidebarYears.length > 0,
    sidebarTags.length > 0,
  ].filter(Boolean).length;

  return {
    // State
    viewMode,
    searchQuery,
    searchCategory,
    sortBy,
    sidebarIndustry,
    sidebarSubIndustries,
    sidebarTags,
    sidebarRegions,
    sidebarYears,
    mobileFilterOpen,
    currentPage,

    // Derived
    filteredReports,
    paginatedReports,
    totalPages,
    activeFilterCount,

    // Setters
    setSearchQuery,
    setSearchCategory,
    setSortBy,
    setMobileFilterOpen,
    setCurrentPage,

    // Handlers
    handleIndustrySelect,
    handleBackToHome,
    handlePopularClick,
    handleSearchSubmit,
    handleSidebarIndustrySelect,
    handleSubcategorySelect,
    handleClearSidebar,
    handleFilterIndustryChange,
    handleRegionClick,
    clearAllFilters,
    handleSidebarSubIndustriesChange,
    handleSidebarTagsChange,
    handleSidebarRegionsChange,
    handleSidebarYearsChange,

    // Individual removal handlers
    removeIndustry,
    removeSubIndustry,
    removeTag,
    removeRegion,
    removeYear,
    removeSearch,
  };
}