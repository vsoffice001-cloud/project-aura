import { TrendingUp, TriangleAlert, Lightbulb, CircleCheckBig } from 'lucide-react';
import { IconCard } from '@/app/components/ui/icon-card';

export function GrowthDriversChallenges() {
  return (
    <section id="drivers" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
        <div className="mb-16">
          <div className="mb-4">
            <span className="text-[#b01f24] font-bold tracking-widest uppercase" style={{ fontSize: '13px' }}>
              CHAPTER 7 - Growth Drivers, Challenges & Opportunities
            </span>
          </div>
          <h2 className="font-display text-[48px] tracking-tight text-[#171717]">
            Growth Drivers, Challenges
            <span className="block text-[#171717]">& Opportunities</span>
          </h2>
          <p className="text-[16px] leading-relaxed max-w-3xl text-[#737373]" style={{ paddingTop: '10px' }}>
            Comprehensive analysis of key factors shaping the Qatar fresh herbs market, including growth catalysts, operational challenges, and emerging opportunities across production, distribution, and consumer segments.
          </p>

          <div className="pt-10 mt-10 border-t border-[#e5e5e5]">
            {/* Desktop Stats */}
            <div className="hidden md:flex items-baseline gap-10 lg:gap-14">
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-[#171717]">10%</p>
                  <p className="text-sm mt-1.5 text-[#737373]">Health Market Growth</p>
                </div>
                <div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
              </div>
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-[#171717]">15%</p>
                  <p className="text-sm mt-1.5 text-[#737373]">Organic Preference</p>
                </div>
                <div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
              </div>
              <div className="flex items-baseline gap-10 lg:gap-14">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-[#171717]">QAR 500M</p>
                  <p className="text-sm mt-1.5 text-[#737373]">Hydroponic Investment</p>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:hidden">
              <div>
                <p className="text-2xl font-bold tracking-tight text-[#171717]">10%</p>
                <p className="text-sm mt-1 text-[#737373]">Health Market Growth</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-[#171717]">15%</p>
                <p className="text-sm mt-1 text-[#737373]">Organic Preference</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-[#171717]">QAR 500M</p>
                <p className="text-sm mt-1 text-[#737373]">Hydroponic Investment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Growth Drivers */}
          <IconCard
            icon={<TrendingUp className="size-5" />}
            title="Growth Drivers"
            iconColor="var(--green-600)"
            showIconBg={false}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-[#171717] mb-2">Increasing Health Consciousness</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  The growing awareness of health benefits associated with fresh herbs is driving demand in Qatar. The health and wellness market in Qatar is projected to reach approximately QAR 1.5 billion, reflecting a 10% increase from the previous year.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>65% of consumers actively seeking fresh herbs for nutritional value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>Rising interest in natural ingredients and clean eating</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#171717] mb-2">Rising Demand for Organic Produce</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  The organic food market in Qatar is expected to grow to QAR 1 billion, driven by a 15% annual increase in consumer preference for organic products. This shift is supported by the Qatar National Food Security Strategy.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>Government initiatives to increase local organic production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>Expanding certification programs for organic farming</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#171717] mb-2">Government Support for Agritech</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Public and private sectors are investing QAR 500 million in hydroponic and vertical farming projects. This strategic focus aligns with Qatar Vision 2030 for sustainable agricultural practices and reduced dependency on imports.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>Subsidies for hydroponics and protected agriculture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--green-600)' }} />
                    <span>Support for climate-controlled facilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </IconCard>

          {/* Market Challenges */}
          <IconCard
            icon={<TriangleAlert className="size-5" />}
            title="Market Challenges"
            iconColor="var(--red-600)"
            showIconBg={false}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-[#171717] mb-2">Climate Limitations</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Qatar's extreme heat (summer temperatures exceeding 45°C) and water scarcity present major challenges for year-round fresh herb cultivation. Air-conditioning and climate control systems add 30-40% to operational costs.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>High energy costs for cooling in extreme weather</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>Groundwater salinity affecting conventional farming</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#171717] mb-2">Import Dependency</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Approximately 78% of fresh herbs are imported from neighboring countries and Europe. Supply chain disruptions, currency fluctuations, and geopolitical factors create price volatility and availability risks.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>Vulnerability to global supply chain disruptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>Quality inconsistency in imported products</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#171717] mb-2">High Operational Costs</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Energy-intensive controlled environment agriculture (CEA), specialized labor requirements, and high land costs create financial barriers for entry and expansion, especially for small-scale producers.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>Land and facility costs significantly higher than region</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--red-600)' }} />
                    <span>Skilled agricultural workforce shortage</span>
                  </li>
                </ul>
              </div>
            </div>
          </IconCard>

          {/* Market Opportunities */}
          <IconCard
            icon={<Lightbulb className="size-5" />}
            title="Market Opportunities"
            iconColor="var(--amber-400)"
            showIconBg={false}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-[#171717] mb-2">E-commerce Growth</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Online grocery platforms are expanding rapidly (15% CAGR), creating new distribution channels for fresh herb producers and enabling direct-to-consumer sales with better margins.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>Direct-to-consumer sales channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>Enhanced market accessibility for local producers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>Improved profit margins through disintermediation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#171717] mb-2">Vertical Farming Expansion</h4>
                <p className="text-[16px] leading-relaxed mb-3 text-[#737373]">
                  Qatar is investing heavily in advanced vertical farming technology, which offers water-efficient, year-round production capability. Potential to reduce import dependency while maintaining quality and freshness.
                </p>
                <ul className="space-y-1 text-sm text-[#737373]">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>Year-round production capability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>90% water savings compared to traditional farming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--amber-400)' }} />
                    <span>Potential export opportunities to neighboring markets</span>
                  </li>
                </ul>
              </div>
            </div>
          </IconCard>
        </div>
      </div>
    </section>
  );
}

export default GrowthDriversChallenges;