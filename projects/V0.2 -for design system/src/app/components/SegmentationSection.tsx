import { Card, CardContent } from '@/app/components/ui/card';
import { OverheadText } from '@/app/components/ui/overhead-text';
import { SectionHeader } from '@/app/components/ui/section-header';
import { BodyText } from '@/app/components/ui/body-text';
import { StatCard } from '@/app/components/ui/stat-card';
import { SegmentationCard, SegmentationItem } from '@/app/components/ui/segmentation-card';
import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';

export function SegmentationSection() {
  const herbTypeData: SegmentationItem[] = [
    { name: 'Mint', share: 25, cagr: '7.2%' },
    { name: 'Parsley', share: 20, cagr: '5.5%' },
    { name: 'Basil', share: 18, cagr: '6.8%' },
    { name: 'Coriander', share: 15, cagr: '5.2%' },
    { name: 'Thyme', share: 8 },
    { name: 'Oregano', share: 6 },
    { name: 'Others', share: 8 },
  ];

  const endUserData: SegmentationItem[] = [
    { name: 'Retail Consumers', share: 35, cagr: '8.0%', description: 'Home cooking & personal use' },
    { name: 'Restaurants', share: 30, description: 'Fine dining & casual eateries' },
    { name: 'Food Processing', share: 15, description: 'Manufacturing & packaging' },
    { name: 'Catering Services', share: 12, description: 'Events & institutional' },
    { name: 'Others', share: 8, description: 'Hotels, airlines, etc.' },
  ];

  const distributionData: SegmentationItem[] = [
    { name: 'Supermarkets/Hypermarkets', share: 40 },
    { name: 'Online Retail', share: 18, cagr: '15%' },
    { name: 'Specialty Stores', share: 17 },
    { name: "Farmers' Markets", share: 15 },
    { name: 'Others', share: 10 },
  ];

  const packagingData: SegmentationItem[] = [
    { name: 'Fresh Bunches', share: 45 },
    { name: 'Packaged Herbs', share: 30, cagr: '9%' },
    { name: 'Dried Herbs', share: 15 },
    { name: 'Others', share: 10 },
  ];

  const geographicData: SegmentationItem[] = [
    { name: 'Urban Areas (Doha)', share: 78 },
    { name: 'Suburban Areas', share: 15 },
    { name: 'Rural Areas', share: 5 },
    { name: 'Others', share: 2 },
  ];

  const organicData: SegmentationItem[] = [
    { name: 'Conventional Herbs', share: 82 },
    { name: 'Organic Herbs', share: 18, cagr: '12%' },
  ];

  const priceData: SegmentationItem[] = [
    { name: 'Mid-Range', share: 50 },
    { name: 'Premium', share: 25, cagr: '8%' },
    { name: 'Budget', share: 20 },
    { name: 'Others', share: 5 },
  ];

  return (
    <section id="segmentation" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
        <div className="mb-16">
          <div className="mb-4">
            <OverheadText>CHAPTER 5 - Industrial Analysis</OverheadText>
          </div>
          <SectionHeader>
            Qatar Fresh Herbs
            <span className="block">Market Segmentation</span>
          </SectionHeader>
          <BodyText spacing="first" className="max-w-3xl">
            Comprehensive analysis across seven key dimensions providing insights into market structure, consumer preferences, and distribution patterns.
          </BodyText>

          <div className="grid grid-cols-2 md:flex md:items-baseline gap-6 md:gap-10 lg:gap-14 pt-10 mt-10 border-t border-[var(--black-200)]">
            <StatCard value="7" label="Segments Analyzed" showDivider />
            <StatCard value="78%" label="Urban Concentration" showDivider />
            <StatCard value="+15%" label="Online Channel CAGR" />
          </div>
        </div>

        {/* First Row - 2 Columns */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <SegmentationCard
            icon={getSegmentationIconByIndex(0)}
            title="Product Type"
            description="Mint and Parsley dominate due to extensive use in traditional Arabic and Mediterranean cuisines, with growing demand for specialty herbs."
            items={herbTypeData}
          />

          <SegmentationCard
            icon={getSegmentationIconByIndex(1)}
            title="End-User"
            description="Retail consumers lead with 35% share as home cooking trends rise, while restaurants maintain steady demand from Qatar's hospitality sector."
            items={endUserData}
          />
        </div>

        {/* Second Row - 3 Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <SegmentationCard
            icon={getSegmentationIconByIndex(2)}
            title="Distribution Channel"
            description="Supermarkets dominate while online retail shows fastest growth at 15% CAGR, driven by convenience and delivery services."
            items={distributionData}
          />

          <SegmentationCard
            icon={getSegmentationIconByIndex(3)}
            title="Packaging Type"
            description="Fresh bunches preferred for authenticity, while packaged herbs grow through extended shelf life and convenience."
            items={packagingData}
          />

          <SegmentationCard
            icon={getSegmentationIconByIndex(4)}
            title="Geographic Distribution"
            description="Doha and urban areas account for 78% of consumption due to population density and hospitality concentration."
            items={geographicData}
          />
        </div>

        {/* Third Row - 2 Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          <SegmentationCard
            icon={getSegmentationIconByIndex(5)}
            title="Organic vs Conventional"
            description="Organic segment projected to double to 36% by 2030, driven by health-conscious consumers willing to pay premium prices."
            items={organicData}
          />

          <SegmentationCard
            icon={getSegmentationIconByIndex(6)}
            title="Price Range"
            description="Mid-range dominates volume, but Qatar's high per capita income supports a significant and growing premium segment."
            items={priceData}
          />
        </div>

        {/* Key Takeaways Card */}
        <Card 
          className="mt-12 rounded-[var(--radius-md)]" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(243, 244, 255, 0.5), rgba(250, 250, 250, 0.3))',
            borderColor: 'rgba(226, 228, 253, 0.5)',
            borderWidth: '1px'
          }}
        >
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg text-[var(--black-900)] mb-1">
                  Key Segmentation Takeaways
                </h3>
                <p className="text-sm text-[var(--black-500)]">
                  Online retail and organic herbs represent the highest growth opportunities, while retail consumers and urban Doha remain the largest market segments.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]">
                <h4 className="text-base text-[var(--black-900)] mb-2">
                  Commercial Sector Demand
                </h4>
                <p className="text-sm text-[var(--black-500)]">
                  The commercial segment shows strong demand from restaurants and hotels, particularly in Doha's hospitality sector, with basil and mint leading consumption patterns across both retail and commercial channels.
                </p>
              </div>
              <div className="p-4 bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]">
                <h4 className="text-base text-[var(--black-900)] mb-2">
                  Distribution Channel Dynamics
                </h4>
                <p className="text-sm text-[var(--black-500)]">
                  Distribution through supermarkets maintains dominance with established infrastructure, while online channels are rapidly expanding due to increased digital adoption and convenience-seeking consumer behavior.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}