import { useState, useMemo } from 'react';
import { Globe, Leaf, FileText, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';

export function RelatedReports() {
  const [regionalReportsSearch, setRegionalReportsSearch] = useState('');
  const [adjacentReportsSearch, setAdjacentReportsSearch] = useState('');

  const regionalReports = [
    { name: 'Saudi Arabia Fresh Herbs Market', region: 'Middle East', value: '$450M' },
    { name: 'UAE Fresh Herbs Market', region: 'Middle East', value: '$380M' },
    { name: 'Egypt Fresh Herbs Market', region: 'Africa', value: '$290M' },
    { name: 'Turkey Fresh Herbs Market', region: 'Europe', value: '$520M' },
    { name: 'Morocco Fresh Herbs Market', region: 'Africa', value: '$180M' },
    { name: 'Qatar Fresh Herbs Market', region: 'Middle East', value: '$340M' },
    { name: 'Kuwait Fresh Herbs Market', region: 'Middle East', value: '$280M' },
    { name: 'Oman Fresh Herbs Market', region: 'Middle East', value: '$210M' },
    { name: 'Jordan Fresh Herbs Market', region: 'Middle East', value: '$160M' },
    { name: 'Lebanon Fresh Herbs Market', region: 'Middle East', value: '$195M' },
    { name: 'South Africa Fresh Herbs Market', region: 'Africa', value: '$410M' },
    { name: 'Kenya Fresh Herbs Market', region: 'Africa', value: '$230M' },
    { name: 'Nigeria Fresh Herbs Market', region: 'Africa', value: '$320M' },
    { name: 'Tunisia Fresh Herbs Market', region: 'Africa', value: '$175M' },
    { name: 'Algeria Fresh Herbs Market', region: 'Africa', value: '$265M' },
    { name: 'Spain Fresh Herbs Market', region: 'Europe', value: '$580M' },
    { name: 'Italy Fresh Herbs Market', region: 'Europe', value: '$625M' },
    { name: 'Greece Fresh Herbs Market', region: 'Europe', value: '$385M' },
    { name: 'France Fresh Herbs Market', region: 'Europe', value: '$690M' },
    { name: 'Germany Fresh Herbs Market', region: 'Europe', value: '$720M' },
  ];

  const adjacentReports = [
    { name: 'Organic Vegetables Market Analysis', category: 'Agriculture' },
    { name: 'Greenhouse Farming Technologies', category: 'AgriTech' },
    { name: 'Food Processing Equipment Market', category: 'Equipment' },
    { name: 'Hydroponic Systems Market', category: 'AgriTech' },
    { name: 'Spices and Seasonings Market', category: 'Food & Beverage' },
    { name: 'Urban Farming Solutions', category: 'AgriTech' },
    { name: 'Smart Irrigation Systems', category: 'AgriTech' },
    { name: 'Vertical Farming Market', category: 'Agriculture' },
    { name: 'Organic Farming Technologies', category: 'AgriTech' },
    { name: 'Agricultural Drones Market', category: 'AgriTech' },
    { name: 'Precision Agriculture Market', category: 'Agriculture' },
    { name: 'Plant-Based Foods Market', category: 'Food & Beverage' },
    { name: 'Aquaponics Systems Market', category: 'AgriTech' },
    { name: 'Packaging Solutions for Fresh Produce', category: 'Equipment' },
    { name: 'Cold Chain Logistics Market', category: 'Equipment' },
    { name: 'Soil Testing Equipment Market', category: 'Equipment' },
    { name: 'Agricultural Biotechnology Market', category: 'Agriculture' },
    { name: 'Crop Protection Chemicals Market', category: 'Agriculture' },
    { name: 'Seeds and Seedlings Market', category: 'Agriculture' },
    { name: 'Food Safety Testing Market', category: 'Food & Beverage' },
  ];

  const filteredRegionalReports = useMemo(() => {
    if (!regionalReportsSearch) return regionalReports;
    const search = regionalReportsSearch.toLowerCase();
    return regionalReports.filter(
      (report) =>
        report.name.toLowerCase().includes(search) ||
        report.region.toLowerCase().includes(search)
    );
  }, [regionalReportsSearch]);

  const filteredAdjacentReports = useMemo(() => {
    if (!adjacentReportsSearch) return adjacentReports;
    const search = adjacentReportsSearch.toLowerCase();
    return adjacentReports.filter(
      (report) =>
        report.name.toLowerCase().includes(search) ||
        report.category.toLowerCase().includes(search)
    );
  }, [adjacentReportsSearch]);

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-[var(--black-200)] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--pattern-opacity)',
          backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
          backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="mb-4">
            <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
              CHAPTER 13 - Related Research
            </span>
          </div>
          <h2 className="font-display text-4xl tracking-tight mb-6 text-foreground">
            Explore Related Reports
          </h2>
          <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
            Expand your market intelligence with complementary research across regions and adjacent markets.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Regional/Country Reports Card */}
          <Card className="bg-white border-[var(--black-200)] rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-3">
                <div className="size-11 rounded-xl flex items-center justify-center shrink-0 bg-[var(--purple-100)]">
                  <Globe className="size-5 text-[var(--purple-500)]" />
                </div>
                <div>
                  <div>Regional/Country Reports</div>
                  <p className="text-sm font-normal text-[var(--black-500)] mt-1">
                    Fresh herbs market analysis across key regions
                  </p>
                </div>
              </CardTitle>

              {/* Search Bar */}
              <div className="mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--purple-500)]" />
                  <Input
                    type="text"
                    placeholder="Search reports by name, region, or category..."
                    value={regionalReportsSearch}
                    onChange={(e) => setRegionalReportsSearch(e.target.value)}
                    className="pl-10 border-[var(--black-200)]"
                  />
                </div>
                {regionalReportsSearch && (
                  <p className="mt-2 text-sm text-[var(--black-500)]">
                    Found {filteredRegionalReports.length} report
                    {filteredRegionalReports.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {filteredRegionalReports.length === 0 ? (
                <p className="text-sm text-[var(--black-500)] text-center py-8">
                  No regional reports found matching your search.
                </p>
              ) : (
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--black-300)] scrollbar-track-[var(--black-100)]">
                  <ul className="space-y-3 pr-2">
                    {filteredRegionalReports.map((report, index) => (
                      <li key={index} className="flex items-center justify-between group hover:bg-[var(--black-50)] px-3 py-2 rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110 text-[var(--purple-500)]" />
                          <div>
                            <span className="text-base text-foreground block underline group-hover:text-foreground/80 transition-colors cursor-pointer">
                              {report.name}
                            </span>
                            <span className="text-sm text-[var(--black-500)]">{report.region}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Adjacent Reports Card */}
          <Card className="bg-white border-[var(--black-200)] rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-3">
                <div className="size-11 rounded-xl flex items-center justify-center shrink-0 bg-[var(--purple-100)]">
                  <Leaf className="size-5 text-[var(--purple-500)]" />
                </div>
                <div>
                  <div>Adjacent Reports</div>
                  <p className="text-sm font-normal text-[var(--black-500)] mt-1">
                    Related markets and complementary research
                  </p>
                </div>
              </CardTitle>

              {/* Search Bar */}
              <div className="mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--purple-500)]" />
                  <Input
                    type="text"
                    placeholder="Search reports by name, region, or category..."
                    value={adjacentReportsSearch}
                    onChange={(e) => setAdjacentReportsSearch(e.target.value)}
                    className="pl-10 border-[var(--black-200)]"
                  />
                </div>
                {adjacentReportsSearch && (
                  <p className="mt-2 text-sm text-[var(--black-500)]">
                    Found {filteredAdjacentReports.length} report
                    {filteredAdjacentReports.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {filteredAdjacentReports.length === 0 ? (
                <p className="text-sm text-[var(--black-500)] text-center py-8">
                  No adjacent reports found matching your search.
                </p>
              ) : (
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--black-300)] scrollbar-track-[var(--black-100)]">
                  <ul className="space-y-3 pr-2">
                    {filteredAdjacentReports.map((report, index) => (
                      <li key={index} className="flex items-center justify-between group hover:bg-[var(--black-50)] px-3 py-2 rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110 text-[var(--purple-500)]" />
                          <span className="text-base text-foreground underline transition-colors cursor-pointer group-hover:text-foreground/80">
                            {report.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <Card className="bg-white border-[var(--black-200)] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center">
            <CardContent className="p-8">
              <p className="text-2xl font-bold text-foreground mb-2">500+</p>
              <p className="text-sm text-[var(--black-500)]">Market Research Reports</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[var(--black-200)] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center">
            <CardContent className="p-8">
              <p className="text-2xl font-bold text-foreground mb-2">50+</p>
              <p className="text-sm text-[var(--black-500)]">Countries Covered</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[var(--black-200)] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center">
            <CardContent className="p-8">
              <p className="text-2xl font-bold text-foreground mb-2">15+</p>
              <p className="text-sm text-[var(--black-500)]">Industry Verticals</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}