import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { MindMapModal } from '@/app/components/MindMapModal';
import { MindMapNode } from '@/types/mindmap';
import MindMap from '@/app/components/MindMap';
import { OverheadText } from '@/app/components/ui/overhead-text';
import { SectionHeader } from '@/app/components/ui/section-header';

const scopeItems = [
  {
    name: "Market Size & Growth",
    children: [
      {
        name: "Historical Analysis",
        children: [
          { name: "2019-2021 Baseline" },
          { name: "2022-2024 Recent Trends" }
        ]
      },
      {
        name: "Forecast Projections",
        children: [
          { name: "2025-2027 Short-term" },
          { name: "2028-2030 Long-term" }
        ]
      },
      {
        name: "CAGR Analysis",
        children: [
          { name: "Overall Market Growth" },
          { name: "Segment-wise Growth" }
        ]
      }
    ]
  },
  {
    name: "Market Segmentation",
    children: [
      {
        name: "By Product Type",
        children: [
          { name: "Premium Segment" },
          { name: "Mid-range Segment" },
          { name: "Economy Segment" }
        ]
      },
      {
        name: "By Application",
        children: [
          { name: "Commercial Use" },
          { name: "Industrial Use" },
          { name: "Residential Use" }
        ]
      },
      {
        name: "By Distribution Channel",
        children: [
          { name: "Direct Sales" },
          { name: "Retail Distribution" },
          { name: "Online Channels" }
        ]
      },
      {
        name: "By End-User",
        children: [
          { name: "B2B Customers" },
          { name: "B2C Customers" }
        ]
      }
    ]
  },
  {
    name: "Regional Analysis",
    children: [
      {
        name: "North America",
        children: [
          { name: "United States" },
          { name: "Canada" },
          { name: "Mexico" }
        ]
      },
      {
        name: "Europe",
        children: [
          { name: "Western Europe" },
          { name: "Eastern Europe" }
        ]
      },
      {
        name: "Asia-Pacific",
        children: [
          { name: "China" },
          { name: "India" },
          { name: "Southeast Asia" },
          { name: "Japan & South Korea" }
        ]
      },
      {
        name: "Latin America",
        children: [
          { name: "Brazil" },
          { name: "Argentina" },
          { name: "Rest of LATAM" }
        ]
      },
      {
        name: "Middle East & Africa",
        children: [
          { name: "GCC Countries" },
          { name: "South Africa" },
          { name: "Rest of MEA" }
        ]
      }
    ]
  },
  {
    name: "Competitive Landscape",
    children: [
      {
        name: "Market Leaders",
        children: [
          { name: "Top 3 Players" },
          { name: "Market Share Analysis" }
        ]
      },
      {
        name: "Emerging Players",
        children: [
          { name: "Startups & Innovators" },
          { name: "Regional Champions" }
        ]
      },
      {
        name: "Strategic Positioning",
        children: [
          { name: "Competitive Strategies" },
          { name: "SWOT Analysis" }
        ]
      }
    ]
  },
  {
    name: "Market Dynamics",
    children: [
      {
        name: "Growth Drivers",
        children: [
          { name: "Technology Advancement" },
          { name: "Regulatory Support" },
          { name: "Consumer Demand" }
        ]
      },
      {
        name: "Market Restraints",
        children: [
          { name: "Cost Barriers" },
          { name: "Regulatory Challenges" }
        ]
      },
      {
        name: "Opportunities",
        children: [
          { name: "Emerging Markets" },
          { name: "Innovation Areas" }
        ]
      },
      {
        name: "Challenges",
        children: [
          { name: "Supply Chain Issues" },
          { name: "Competition Intensity" }
        ]
      }
    ]
  },
  {
    name: "Consumer Insights",
    children: [
      {
        name: "Behavioral Patterns",
        children: [
          { name: "Purchase Journey" },
          { name: "Decision Factors" }
        ]
      },
      {
        name: "Preferences & Trends",
        children: [
          { name: "Product Preferences" },
          { name: "Channel Preferences" }
        ]
      },
      {
        name: "Demographics",
        children: [
          { name: "Age Groups" },
          { name: "Income Levels" },
          { name: "Geographic Distribution" }
        ]
      }
    ]
  },
  {
    name: "Future Outlook",
    children: [
      {
        name: "Emerging Trends",
        children: [
          { name: "Technology Trends" },
          { name: "Consumer Trends" },
          { name: "Sustainability Trends" }
        ]
      },
      {
        name: "Innovation Landscape",
        children: [
          { name: "R&D Investments" },
          { name: "Product Innovation" }
        ]
      },
      {
        name: "Investment Opportunities",
        children: [
          { name: "High-growth Segments" },
          { name: "Strategic Partnerships" }
        ]
      },
      {
        name: "Strategic Recommendations",
        children: [
          { name: "Market Entry Strategies" },
          { name: "Growth Strategies" }
        ]
      }
    ]
  }
];

export function ScopeOfReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mind map data structure
  const mindMapData: MindMapNode = {
    name: "Report Coverage Taxonomy",
    children: scopeItems
  };

  const handleNodeClick = (name: string) => {
    console.log("Node clicked:", name);
  };

  return (
    <section id="scope-of-report" className="py-24 lg:py-32 bg-[var(--black-50)] relative overflow-hidden">
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
            <OverheadText>CHAPTER 2 REPORT COVERAGE</OverheadText>
          </div>
          <SectionHeader className="mb-6">
            Scope of the Report
          </SectionHeader>
          <p className="text-lg text-[#737373] max-w-3xl">
            Comprehensive analysis across seven key market dimensions, offering actionable insights
            for strategic decision-making and investment planning.
          </p>
        </div>

        {/* Interactive Mind Map Preview */}
        <div className="flex justify-center">
          <div 
            onClick={() => setIsModalOpen(true)}
            className="w-full overflow-hidden"
          >
            <div className="border border-[var(--black-200)] bg-white rounded-[var(--radius-md)] hover:shadow-[var(--shadow-brand-periwinkle)] transition-all duration-300 overflow-hidden">
              <div className="h-[600px] relative group">
                <MindMap
                  data={mindMapData}
                  searchTerm=""
                  onNodeClick={handleNodeClick}
                  interactionMode="preview"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 pointer-events-none">
                  <div className="flex items-center gap-2 text-white">
                    <Maximize2 className="w-5 h-5" />
                    <span className="font-bold text-base">Click to Explore Interactive Mind Map</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mind Map Modal */}
      <MindMapModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={mindMapData}
      />
    </section>
  );
}