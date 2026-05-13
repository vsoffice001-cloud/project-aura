import { useState, useEffect, useRef } from 'react';
import { X, Search, TrendingUp, FileText, Building2, Award } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'case-study' | 'article' | 'report' | 'service' | 'industry';
  icon: React.ReactNode;
  url: string;
}

const TRENDING_SEARCHES = [
  'Market Research',
  'Due Diligence',
  'Competitive Intelligence',
  'IPO Advisory',
  'Supply Chain Analysis'
];

const SAMPLE_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Evaluating India\'s Transformer Bushing Market for IPO Readiness',
    description: '₹110 Cr TAM analysis for YASH - vertically integrated manufacturer',
    category: 'case-study',
    icon: <Award className="w-4 h-4" />,
    url: '#'
  },
  {
    id: '2',
    title: 'India Makhana Market Outlook to 2030',
    description: 'Comprehensive market sizing and growth projections',
    category: 'report',
    icon: <FileText className="w-4 h-4" />,
    url: '#'
  },
  {
    id: '3',
    title: 'Market Research & Intelligence Services',
    description: 'Strategic insights for growth and investment decisions',
    category: 'service',
    icon: <TrendingUp className="w-4 h-4" />,
    url: '#'
  },
  {
    id: '4',
    title: 'Power & Energy Sector Analysis',
    description: 'Deep-dive into transformer and grid infrastructure markets',
    category: 'industry',
    icon: <Building2 className="w-4 h-4" />,
    url: '#'
  }
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Simulated search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = SAMPLE_RESULTS.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleTrendingClick = (query: string) => {
    setSearchQuery(query);
  };

  const getCategoryLabel = (category: SearchResult['category']) => {
    const labels = {
      'case-study': 'Case Study',
      'article': 'Article',
      'report': 'Report',
      'service': 'Service',
      'industry': 'Industry'
    };
    return labels[category];
  };

  const getCategoryColor = (category: SearchResult['category']) => {
    const colors = {
      'case-study': 'bg-purple-100 text-purple-700',
      'article': 'bg-blue-100 text-blue-700',
      'report': 'bg-green-100 text-green-700',
      'service': 'bg-red-100 text-red-700',
      'industry': 'bg-amber-100 text-amber-700'
    };
    return colors[category];
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      <div 
        className="bg-white rounded-[10px] max-w-[640px] w-full relative shadow-2xl animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="border-b border-black/10 p-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-black/40 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies, reports, services..."
              className="flex-1 text-base outline-none text-black placeholder:text-black/40"
              aria-label="Search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-black/40 hover:text-black transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!searchQuery ? (
            /* Trending Searches */
            <div className="p-6">
              <h3 className="text-xs font-medium text-black/40 uppercase tracking-wider mb-3">
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleTrendingClick(search)}
                    className="px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-sm text-black/70 hover:text-black transition-all"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          ) : isSearching ? (
            /* Loading State */
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-black/40">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            /* Results List */
            <div className="py-2">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block px-6 py-4 hover:bg-black/[0.02] transition-colors group"
                  onClick={onClose}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-black/40 group-hover:text-black/60 transition-colors">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-black group-hover:text-red-600 transition-colors line-clamp-1">
                          {result.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${getCategoryColor(result.category)}`}>
                          {getCategoryLabel(result.category)}
                        </span>
                      </div>
                      <p className="text-sm text-black/60 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-black/20 mx-auto mb-3" />
              <p className="text-sm text-black/60 mb-1">No results found</p>
              <p className="text-xs text-black/40">
                Try searching for case studies, reports, or services
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 px-6 py-3 bg-black/[0.01]">
          <div className="flex items-center justify-between text-xs text-black/40">
            <span>Press <kbd className="px-1.5 py-0.5 bg-black/10 rounded">ESC</kbd> to close</span>
            <span>{results.length > 0 ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
