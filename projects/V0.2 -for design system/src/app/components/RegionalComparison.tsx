import { ChartBar, Globe, TrendUp } from '@phosphor-icons/react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Highcharts from 'highcharts';
import { Chart } from '@/app/components/ui/chart';
import { IconCard } from '@/app/components/ui/icon-card';
import { StatCardGroup } from '@/app/components/ui/stat-card-group';
import { OverheadText } from '@/app/components/ui/overhead-text';
import { TextCard } from '@/app/components/ui/text-card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/app/components/ui/table';

export function RegionalComparison() {
  // GCC Market Size Comparison Chart
  const gccComparisonOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 350,
      spacingBottom: 35,
      spacingTop: 10,
      spacingLeft: 15,
      spacingRight: 15,
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
    xAxis: {
      categories: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'],
      title: {
        text: '',
      },
      gridLineWidth: 0,
      lineColor: 'var(--black-200)',
      labels: {
        enabled: false,
        style: {
          color: 'var(--black-500)',
          fontSize: '12px',
          fontFamily: 'DM Sans',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '$ Million',
        style: {
          color: 'var(--black-600)',
          fontSize: '12px',
          fontFamily: 'DM Sans',
        },
      },
      gridLineColor: 'var(--black-200)',
      labels: {
        formatter: function () {
          return '$' + this.value + 'M';
        },
        style: {
          color: 'var(--black-500)',
          fontSize: '12px',
          fontFamily: 'DM Sans',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--black-200)',
      borderRadius: 10,
      style: {
        color: 'var(--black-900)',
        fontFamily: 'DM Sans',
      },
      formatter: function () {
        return `<b>${this.x}</b><br/>Market Size: <b>$${this.y}M</b>`;
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        pointWidth: 30,
        dataLabels: {
          enabled: true,
          format: '${point.y}M',
          style: {
            color: 'var(--black-500)',
            fontSize: '11px',
            fontWeight: '400',
            fontFamily: 'DM Sans',
          },
        },
      },
      series: {
        states: {
          hover: {
            brightness: 0.1,
          },
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: 'Market Size',
        data: [
          { y: 850, color: 'var(--black-300)' },
          { y: 420, color: 'var(--purple-300)' },
          { y: 180, color: 'var(--purple-400)' },
          { y: 150, color: 'var(--purple-500)' },
          { y: 95, color: 'var(--purple-600)' },
          { y: 65, color: 'var(--purple-700)' },
        ],
      },
    ],
  };

  return (
    <section id="regional" className="py-24 lg:py-32 bg-[var(--black-50)]">
      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
        <div className="mb-16">
          <div className="mb-4">
            <OverheadText>CHAPTER 6 - Regional Analysis</OverheadText>
          </div>
          <h2 className="font-serif tracking-tight text-[48px] text-[var(--black-900)]">
            Qatar vs GCC Fresh Herbs Markets
          </h2>
          <p className="leading-relaxed max-w-3xl text-[16px] pt-3 text-[var(--black-500)]">
            Comparative analysis of fresh herbs market size across Gulf Cooperation Council (GCC) countries, highlighting Qatar's position in the regional landscape. Qatar's strategic investments in agricultural technology and government support for food security initiatives have positioned it as a leader in per capita consumption and growth rates within the GCC region.
          </p>

          <div className="pt-10 mt-10 border-t border-[var(--black-200)]">
            <StatCardGroup
              stats={[
                { value: "8.5%", label: "GCC Market Share" },
                { value: "6.0%", label: "Qatar CAGR" },
                { value: "4th", label: "Regional Ranking" },
              ]}
            />
          </div>
        </div>

        {/* Two Column Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* GCC Market Size Comparison Chart */}
          <TextCard
            title="GCC Market Size Comparison (2024)"
            paragraphs={["Qatar holds approximately 8.5% of the total GCC fresh herbs market"]}
          >
            <Chart
              title=""
              chartOptions={gccComparisonOptions}
              height={280}
            />
          </TextCard>

          {/* Qatar vs GCC Comparison Table */}
          <TextCard
            title="Qatar vs GCC Comparison"
            paragraphs={[]}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[14px] font-[700] text-[var(--black-900)]">Metric</TableHead>
                  <TableHead className="text-[14px] font-[700] text-center text-[var(--black-900)]">Qatar</TableHead>
                  <TableHead className="text-[14px] font-[700] text-center text-[var(--black-900)]">Saudi Arabia</TableHead>
                  <TableHead className="text-[14px] font-[700] text-center text-[var(--black-900)]">UAE</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                <TableRow>
                  <TableCell className="text-[14px] text-[var(--black-500)] py-3">Market Size (2024)</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">$150 Mn</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">$850 Mn</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">$420 Mn</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="text-[14px] text-[var(--black-500)] py-3">CAGR (2025-2030)</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">6.0%</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">5.1%</TableCell>
                  <TableCell className="text-[14px] text-center text-[var(--black-900)] py-3">5.3%</TableCell>
                </TableRow>
                
                {/* Blurred paywalled rows with overlay */}
                <TableRow>
                  <TableCell colSpan={4} className="p-0">
                    <div className="relative py-4">
                      {/* Blurred row 1 */}
                      <div className="blur-sm pointer-events-none select-none py-3 px-2">
                        <div className="grid grid-cols-4 gap-4">
                          <span className="text-[14px] text-[var(--black-500)]">Per Capita Consumption</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">High</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">Medium</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">High</span>
                        </div>
                      </div>
                      
                      {/* Blurred row 2 */}
                      <div className="blur-sm pointer-events-none select-none py-3 px-2 border-t border-[var(--black-200)]">
                        <div className="grid grid-cols-4 gap-4">
                          <span className="text-[14px] text-[var(--black-500)]">Organic Adoption Rate</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">18%</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">12%</span>
                          <span className="text-[14px] text-center text-[var(--black-900)]">15%</span>
                        </div>
                      </div>
                      
                      {/* CTA Overlay - Positioned over blurred rows only */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
                        <Button variant="cta" size="default" className="pointer-events-auto">
                          Unlock Comparison Data
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TextCard>
        </div>

        {/* Bottom Three Insight Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <IconCard
            icon={<ChartBar weight="regular" className="size-5" />}
            title="Market Position"
            description="Qatar ranks 4th among GCC countries in fresh herbs market size, with significant growth potential driven by government initiatives and increasing health consciousness."
          />

          <IconCard
            icon={<TrendUp weight="regular" className="size-5" />}
            title="Growth Advantage"
            description="Qatar's projected CAGR of 6.0% exceeds the GCC average of 5.2%, positioning it as one of the fastest-growing markets in the region for fresh herbs."
          />

          <IconCard
            icon={<Globe weight="regular" className="size-5" />}
            title="Competitive Strengths"
            description="Advanced hydroponics adoption, strong government support for sustainable agriculture, and high per capita income contribute to Qatar's competitive position."
          />
        </div>
      </div>
    </section>
  );
}