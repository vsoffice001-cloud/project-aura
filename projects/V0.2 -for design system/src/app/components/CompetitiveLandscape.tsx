import { useState } from 'react';
import {
  TrendingUp,
  Target,
  Users,
  ChartColumn,
  Truck,
  Star,
  DollarSign,
  Network,
  Cpu,
  BadgeCheck,
  ArrowUpDown,
  ArrowDown,
  Building2,
  PieChart,
  Grid3x3,
  Shield,
  FileText,
} from 'lucide-react';
import Highcharts from 'highcharts';
import { Chart } from '@/app/components/ui/chart';
import { ComparisonParameterCard } from '@/app/components/ui/comparison-parameter-card';
import { AnalysisCard } from '@/app/components/ui/analysis-card';
import { Card, CardContent } from '@/app/components/ui/card';
import { StatCard } from '@/app/components/ui/stat-card';
import { Button } from '@/app/components/ui/button';
import HighchartsReact from 'highcharts-react-official';

export function CompetitiveLandscape() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'share',
    direction: 'desc',
  });

  // Market Share Pie Chart
  const marketShareOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e5e5',
      borderRadius: 8,
      style: {
        color: '#171717',
      },
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '50%',
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    },
    series: [
      {
        name: 'Market Share',
        colorByPoint: true,
        data: [
          { name: 'Qatar Green Farms', y: 12, color: '#b8aeef' },  // Purple 300
          { name: 'Al Waha Farms', y: 10, color: '#9b80eb' },      // Purple 400
          { name: 'Fresh Herbs Qatar', y: 8, color: '#7f5fe3' },   // Purple 500 (BASE)
          { name: 'Qatar Organic Farms', y: 8, color: '#6d52d9' }, // Purple 600
          { name: 'Gulf Herbs Co.', y: 7, color: '#5b43b8' },      // Purple 700
          { name: 'Others', y: 55, color: '#e5e5e5' },             // Black 200
        ],
      },
    ],
  };

  const companies = [
    { company: 'Qatar Green Farms', share: 12, est: 2010, type: 'Local', focus: 'Organic herbs & vegetables' },
    { company: 'Al Waha Farms', share: 10, est: 2015, type: 'Local', focus: 'Hydroponic cultivation' },
    { company: 'Fresh Herbs Qatar', share: 8, est: 2018, type: 'Local', focus: 'Fresh herb retail' },
    { company: 'Qatar Organic Farms', share: 8, est: 2012, type: 'Local', focus: 'Certified organic produce' },
    { company: 'Gulf Herbs Co.', share: 7, est: 2016, type: 'Regional', focus: 'Wholesale distribution' },
    { company: 'Al Jazeera Herbs', share: 5, est: null, type: 'Local', focus: 'Traditional herbs' },
    { company: 'Doha Fresh Produce', share: 5, est: null, type: 'Local', focus: 'Multi-category fresh produce' },
    { company: 'Green Oasis', share: 4, est: null, type: 'Local', focus: 'Vertical farming' },
    { company: 'Qatar Herb Company', share: 4, est: null, type: 'Local', focus: 'Import & distribution' },
    { company: 'Al Fardan Farms', share: 3, est: null, type: 'Local', focus: 'Premium herbs' },
    { company: 'Fresh Fields Qatar', share: 3, est: null, type: 'Local', focus: 'Farm-to-table supply' },
    { company: 'Qatar Agricultural Development Co.', share: 3, est: null, type: 'Government', focus: 'Agricultural development' },
    { company: 'Al Rayyan Herbs', share: 2, est: null, type: 'Local', focus: 'Specialty herbs' },
    { company: 'Qatar Farm Fresh', share: 2, est: null, type: 'Local', focus: 'Direct consumer sales' },
    { company: 'Green Thumb Qatar', share: 2, est: null, type: 'Local', focus: 'Urban farming' },
  ];

  const sortedCompanies = [...companies].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <section id="key-players" className="py-24 lg:py-32 relative overflow-hidden bg-[var(--black-50)]">
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
        <div className="mb-16" style={{ opacity: 1, transform: 'none' }}>
          <div className="mb-4">
            <span className="text-[#b01f24] font-bold tracking-widest uppercase" style={{ fontSize: '13px' }}>
              CHAPTER 8 - Competitive Landscape
            </span>
          </div>
          <h2 className="font-display text-[48px] tracking-tight mb-6 text-[#171717]">
            Qatar Fresh Herbs Market
            <span className="block text-[#171717]">Competitive Landscape</span>
          </h2>
          <p className="text-[16px] leading-relaxed max-w-3xl text-[#737373]">
            The Qatar Fresh Herbs Market is characterized by a dynamic mix of regional and international players. 
            The top 5 players hold approximately 45% combined market share, indicating moderate market concentration 
            with significant opportunity for new entrants.
          </p>

          {/* Inline Stats Section */}
          <div className="pt-10 mt-10 border-t border-[#e5e5e5]" style={{ opacity: 1, transform: 'none' }}>
            {/* Desktop Stats */}
            <div className="hidden md:flex items-baseline gap-10 lg:gap-14">
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#171717] tracking-tight">
                    15+
                  </p>
                  <p className="text-sm mt-1.5 text-[#737373]">Key Players</p>
                </div>
                <div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
              </div>
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#171717] tracking-tight">
                    45%
                  </p>
                  <p className="text-sm mt-1.5 text-[#737373]">Top 5 Share</p>
                </div>
                <div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
              </div>
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#171717] tracking-tight">
                    8
                  </p>
                  <p className="text-sm mt-1.5 text-[#737373]">New Entrants (5yr)</p>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:hidden">
              <div>
                <p className="text-2xl font-bold text-[#171717] tracking-tight">
                  15+
                </p>
                <p className="text-sm mt-1 text-[#737373]">Key Players</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#171717] tracking-tight">
                  45%
                </p>
                <p className="text-sm mt-1 text-[#737373]">Top 5 Share</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#171717] tracking-tight">
                  8
                </p>
                <p className="text-sm mt-1 text-[#737373]">New Entrants (5yr)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Three Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Market Share Distribution Card */}
          <div className="h-full p-4 bg-white border border-[#e5e5e5] rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1),0_4px_6px_-4px_rgba(127,95,227,0.08)] transition-shadow duration-300">
            <p className="text-sm text-[16px] text-[#737373] mb-4">
              Market Share Distribution
            </p>
            <div className="h-[200px]">
              <HighchartsReact highcharts={Highcharts} options={marketShareOptions} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#b8aeef' }}></div>
                <span className="text-xs truncate text-[#737373]">Qatar Green Farms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9b80eb' }}></div>
                <span className="text-xs truncate text-[#737373]">Al Waha Farms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7f5fe3' }}></div>
                <span className="text-xs truncate text-[#737373]">Fresh Herbs Qatar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6d52d9' }}></div>
                <span className="text-xs truncate text-[#737373]">Qatar Organic Farms</span>
              </div>
            </div>
          </div>

          {/* Top 5 Players Card */}
          <div className="h-full p-4 bg-white border border-[#e5e5e5] rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1),0_4px_6px_-4px_rgba(127,95,227,0.08)] transition-shadow duration-300">
            <p className="text-sm text-[16px] text-[#737373] mb-4">
              Top 5 Players
            </p>
            <div className="space-y-3">
              {companies.slice(0, 5).map((company, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg flex items-center justify-center bg-[#eff1fe]">
                      <span className="text-sm font-bold text-[#171717]">{index + 1}</span>
                    </div>
                    <span className="text-sm text-[#171717]">{company.company}</span>
                  </div>
                  <span className="text-sm font-bold text-[#171717] blur-sm select-none">{company.share}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
              <div className="flex justify-between text-sm">
                <span className="text-[#737373]">Combined Share</span>
                <span className="font-bold text-[#171717] blur-sm select-none">~45%</span>
              </div>
            </div>
          </div>

          {/* Market Dynamics Card */}
          <div className="h-full p-4 bg-white border border-[#e5e5e5] rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1),0_4px_6px_-4px_rgba(127,95,227,0.08)] transition-shadow duration-300">
            <p className="text-sm text-[16px] text-[#737373] mb-4">
              Market Dynamics
            </p>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#171717]">Local Players</span>
                  <span className="text-sm font-bold text-[#171717]">70%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden relative bg-[#f5f5f5]">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out bg-[#9d9aef]"
                    style={{ width: '70%' }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#171717]">Regional/Int'l</span>
                  <span className="text-sm font-bold text-[#171717]">30%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden relative bg-[#f5f5f5]">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out bg-[#9d9aef]"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-[#e5e5e5]">
                <p className="text-xs text-[#737373]">
                  <strong className="text-[#171717]">8 new entrants</strong> in the past 5 years, 
                  indicating strong market attractiveness and growth potential.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="relative overflow-x-auto bg-white border border-[#e5e5e5] rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1),0_4px_6px_-4px_rgba(127,95,227,0.08)] transition-shadow duration-300 mb-6">
          <table className="w-full text-sm text-left rtl:text-right text-[#737373]">
            <caption className="p-5 text-lg text-left rtl:text-right text-[#171717]">
              Major Players (15 Companies Profiled)
              <p className="mt-1.5 text-sm font-normal text-[#737373]">
                Click column headers to sort • Sorted by market share
              </p>
            </caption>
            <thead className="text-sm text-[#737373] bg-[#fafafa] border-b border-t border-[#e5e5e5]">
              <tr>
                <th 
                  scope="col"
                  className="px-6 py-3 font-normal cursor-pointer hover:bg-[#fafafa]/80 transition-colors select-none"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center">
                    Company
                    <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" style={{ color: '#7f5fe3' }} />
                  </div>
                </th>
                <th 
                  scope="col"
                  className="px-6 py-3 font-normal cursor-pointer hover:bg-[#fafafa]/80 transition-colors select-none blur-sm"
                  onClick={() => handleSort('share')}
                >
                  <div className="flex items-center">
                    Share
                    {sortConfig.key === 'share' && <ArrowDown className="h-4 w-4 ml-1 text-primary" />}
                    {sortConfig.key !== 'share' && <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" style={{ color: '#7f5fe3' }} />}
                  </div>
                </th>
                <th 
                  scope="col"
                  className="px-6 py-3 font-normal cursor-pointer hover:bg-[#fafafa]/80 transition-colors select-none blur-sm"
                  onClick={() => handleSort('est')}
                >
                  <div className="flex items-center">
                    Est.
                    <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" style={{ color: '#7f5fe3' }} />
                  </div>
                </th>
                <th 
                  scope="col"
                  className="px-6 py-3 font-normal cursor-pointer hover:bg-[#fafafa]/80 transition-colors select-none blur-sm"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" style={{ color: '#7f5fe3' }} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 font-normal blur-sm">
                  Focus Area
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-[#fafafa]/50 transition-colors ${
                    index < sortedCompanies.length - 1 ? 'border-b border-[#e5e5e5]' : ''
                  } bg-white`}
                >
                  <th scope="row" className="px-6 py-4 text-[#171717] whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#eff1fe]">
                        <Building2 className="h-4 w-4" style={{ color: '#7f5fe3' }} />
                      </div>
                      <span>{company.company}</span>
                    </div>
                  </th>
                  <td className="px-6 py-4 blur-sm select-none">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-[#f5f5f5] text-[#525252]">
                      {company.share}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#737373] blur-sm select-none">
                    {company.est || '–'}
                  </td>
                  <td className="px-6 py-4 text-[#737373] blur-sm select-none">
                    {company.type}
                  </td>
                  <td className="px-6 py-4 text-[#737373] blur-sm select-none">
                    {company.focus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Unlock CTA Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <Button variant="cta" size="default">
                Unlock Company Profiles
              </Button>
            </div>
          </div>
        </div>

        {/* Cross Comparison Parameters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-base text-[var(--black-500)] mb-2">
              Cross Comparison Parameters
            </p>
            <p className="text-sm mb-4 text-[var(--black-500)]">
              The report provides detailed cross-comparison of key players across 10 performance parameters 
              to identify competitive strengths and weaknesses.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ComparisonParameterCard
                number={1}
                title="Revenue Growth Rate"
                description="Year-over-year revenue growth trajectory"
              />

              <ComparisonParameterCard
                number={2}
                title="Market Penetration Rate"
                description="Percentage of addressable market captured"
              />

              <ComparisonParameterCard
                number={3}
                title="Customer Retention Rate"
                description="Percentage of repeat customers"
              />

              <ComparisonParameterCard
                number={4}
                title="Product Diversification"
                description="Range of herb varieties offered"
              />

              <ComparisonParameterCard
                number={5}
                title="Supply Chain Efficiency"
                description="Farm-to-consumer delivery speed"
              />

              <ComparisonParameterCard
                number={6}
                title="Brand Recognition"
                description="Consumer awareness and preference"
              />

              <ComparisonParameterCard
                number={7}
                title="Pricing Strategy"
                description="Competitive pricing models and strategies"
              />

              <ComparisonParameterCard
                number={8}
                title="Distribution Network"
                description="Geographic reach and channel partners"
              />

              <ComparisonParameterCard
                number={9}
                title="Technology Adoption"
                description="Digital infrastructure and innovation"
              />

              <ComparisonParameterCard
                number={10}
                title="Quality Certifications"
                description="Industry standards and compliance"
              />
            </div>
          </CardContent>
        </Card>

        {/* Analysis Included in Report */}
        <div 
          className="p-4 rounded-[10px]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(243, 244, 255, 0.5), rgba(250, 250, 250, 0.3))',
            borderColor: 'rgba(226, 228, 253, 0.5)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg text-[#171717] mb-1">
                Analysis Included in Report
              </h3>
              <p className="text-sm text-[#737373]">
                Comprehensive competitive analysis with actionable insights across all key players
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnalysisCard
              icon={<PieChart className="size-5" />}
              title="Market Share Analysis"
              description="Detailed breakdown of market share by company, including historical trends and projected changes"
            />
            <AnalysisCard
              icon={<Grid3x3 className="size-5" />}
              title="Cross Comparison Matrix"
              description="Side-by-side comparison of all key players across 10 performance parameters"
            />
            <AnalysisCard
              icon={<Shield className="size-5" />}
              title="SWOT Analysis"
              description="Individual strengths, weaknesses, opportunities, and threats for top 5 players"
            />
            <AnalysisCard
              icon={<DollarSign className="size-5" />}
              title="Pricing Strategy Analysis"
              description="Comparison of pricing models, discount strategies, and value propositions"
            />
            <AnalysisCard
              icon={<FileText className="size-5" />}
              title="Company Profiles"
              description="Detailed profiles including history, financials, products, and strategic initiatives"
            />
          </div>
        </div>
      </div>
    </section>
  );
}