import { useState } from 'react';
import { CaretUpDown } from '@phosphor-icons/react';
import { OverheadText } from '@/app/components/ui/overhead-text';
import { SectionHeader } from '@/app/components/ui/section-header';
import { BodyText } from '@/app/components/ui/body-text';
import { TextCard } from '@/app/components/ui/text-card';

interface MarketData {
  year: number;
  marketSize: number;
  yoyGrowth: number | null;
  domestic: number;
  imports: number;
  organicShare: number;
  period: 'Historical' | 'Forecast';
}

const marketData: MarketData[] = [
  { year: 2019, marketSize: 120, yoyGrowth: null, domestic: 18, imports: 82, organicShare: 8, period: 'Historical' },
  { year: 2020, marketSize: 125, yoyGrowth: 4.2, domestic: 19, imports: 81, organicShare: 10, period: 'Historical' },
  { year: 2021, marketSize: 132, yoyGrowth: 5.6, domestic: 20, imports: 80, organicShare: 12, period: 'Historical' },
  { year: 2022, marketSize: 140, yoyGrowth: 6.1, domestic: 22, imports: 78, organicShare: 14, period: 'Historical' },
  { year: 2023, marketSize: 145, yoyGrowth: 3.6, domestic: 24, imports: 76, organicShare: 16, period: 'Historical' },
  { year: 2024, marketSize: 150, yoyGrowth: 3.4, domestic: 26, imports: 74, organicShare: 18, period: 'Historical' },
  { year: 2025, marketSize: 158, yoyGrowth: 5.3, domestic: 28, imports: 72, organicShare: 21, period: 'Forecast' },
  { year: 2026, marketSize: 167, yoyGrowth: 5.7, domestic: 31, imports: 69, organicShare: 24, period: 'Forecast' },
  { year: 2027, marketSize: 177, yoyGrowth: 6.0, domestic: 34, imports: 66, organicShare: 27, period: 'Forecast' },
  { year: 2028, marketSize: 188, yoyGrowth: 6.2, domestic: 37, imports: 63, organicShare: 30, period: 'Forecast' },
  { year: 2029, marketSize: 200, yoyGrowth: 6.4, domestic: 40, imports: 60, organicShare: 33, period: 'Forecast' },
  { year: 2030, marketSize: 213, yoyGrowth: 6.5, domestic: 44, imports: 56, organicShare: 36, period: 'Forecast' },
];

type SortKey = keyof MarketData;
type SortDirection = 'asc' | 'desc' | null;

function MarketPerformanceTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...marketData].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="relative overflow-x-auto bg-white border border-[var(--black-200)] rounded-[var(--radius-md)] hover:shadow-[var(--shadow-brand-purple)] transition-shadow duration-300">
      <table className="w-full text-sm text-left rtl:text-right text-[var(--black-500)]">
        <caption className="p-5 text-lg text-left rtl:text-right text-[var(--black-900)]">
          Market Performance Data
          <p className="mt-1.5 text-sm font-normal text-[var(--black-500)]">
            Click column headers to sort • Historical data (2019-2024) • Projected data (2025-2030)
          </p>
        </caption>
        <thead className="text-sm text-[var(--black-500)] bg-[var(--black-50)] border-b border-t border-[var(--black-200)]">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('year')}
            >
              <div className="flex items-center">
                Year
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('marketSize')}
            >
              <div className="flex items-center">
                Market Size ($ Mn)
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('yoyGrowth')}
            >
              <div className="flex items-center">
                YoY Growth (%)
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('domestic')}
            >
              <div className="flex items-center">
                Domestic (%)
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('imports')}
            >
              <div className="flex items-center">
                Imports (%)
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
              onClick={() => handleSort('organicShare')}
            >
              <div className="flex items-center">
                Organic Share (%)
                <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 font-normal">Period</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.year}
              className={`hover:bg-[var(--black-50)]/50 transition-colors ${
                index < sortedData.length - 1 ? 'border-b border-[var(--black-200)]' : ''
              } ${row.period === 'Forecast' ? 'bg-[var(--black-50)]' : 'bg-white'}`}
            >
              <th scope="row" className="px-6 py-4 text-[var(--black-900)] whitespace-nowrap">
                {row.year}
              </th>
              <td className="px-6 py-4 text-[var(--black-900)]">${row.marketSize} Mn</td>
              <td className="px-6 py-4">
                {row.yoyGrowth === null ? (
                  <span className="text-[var(--black-500)]">Base Year</span>
                ) : row.yoyGrowth >= 5 ? (
                  <span className="text-[var(--black-900)]">+{row.yoyGrowth}%</span>
                ) : (
                  <span className="text-[var(--black-500)]">+{row.yoyGrowth}%</span>
                )}
              </td>
              <td className="px-6 py-4 text-[var(--black-500)]">{row.domestic}%</td>
              <td className="px-6 py-4 text-[var(--black-500)]">{row.imports}%</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-[120px]">
                    <div className="w-full bg-[var(--black-200)] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300 bg-[var(--purple-500)]"
                        style={{ width: `${(row.organicShare / 50) * 100}%` }}
                      >
                      </div>
                    </div>
                  </div>
                  <span className="text-[var(--black-500)] text-sm min-w-[2.5rem]">{row.organicShare}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs ${
                    row.period === 'Historical'
                      ? 'bg-[var(--black-100)] text-[var(--black-600)]'
                      : 'bg-[var(--green-100)] text-[var(--green-700)]'
                  }`}
                >
                  {row.period}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarketDataTable() {
  return (
    <section id="data-table" className="py-20 lg:py-24 bg-[var(--black-50)]">
      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
        <div className="mb-16">
          <div className="mb-4">
            <OverheadText>CHAPTER 4 - Market Breakdown</OverheadText>
          </div>
          <SectionHeader>
            Qatar Fresh Herbs
            <span className="block">Market Data (2019-2030)</span>
          </SectionHeader>
          <BodyText spacing="first" className="max-w-3xl">
            Interactive historical and projected market data. Click on any column header to sort the data. This table provides year-by-year breakdown of market size, growth rates, domestic production vs imports ratio, and organic herb market share.
          </BodyText>
        </div>

        <MarketPerformanceTable />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <TextCard 
            title="Domestic Production Trend"
            paragraphs={[
              "Local production is expected to increase from 18% in 2019 to 44% by 2030, driven by government initiatives supporting hydroponic and vertical farming technologies. This represents a 144% increase in domestic production capacity over the forecast period."
            ]}
          />

          <TextCard 
            title="Import Dependency Reduction"
            paragraphs={[
              "Qatar aims to reduce herb imports from 82% to 56% by 2030, aligning with the Qatar National Food Security Strategy. This shift will improve supply chain resilience and reduce vulnerability to international market fluctuations."
            ]}
          />

          <TextCard 
            title="Organic Market Expansion"
            paragraphs={[
              "The organic herbs segment is projected to grow from 8% market share in 2019 to 36% by 2030, reflecting a 350% increase. This growth is fueled by rising health consciousness and premium pricing opportunities for producers."
            ]}
          />
        </div>
      </div>
    </section>
  );
}