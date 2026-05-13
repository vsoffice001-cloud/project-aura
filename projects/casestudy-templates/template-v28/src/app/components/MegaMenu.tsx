import { TrendingUp, Building2, Users, FileText, Target, BarChart3, Briefcase, Globe, Zap, Factory, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface MegaMenuItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuProps {
  type: 'services' | 'industries';
  isVisible: boolean;
  onClose: () => void;
}

const SERVICES_DATA: MegaMenuSection[] = [
  {
    title: 'Research & Intelligence',
    items: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        title: 'Market Research',
        description: 'In-depth market sizing, segmentation, and opportunity analysis',
        url: '#'
      },
      {
        icon: <BarChart3 className="w-4 h-4" />,
        title: 'Competitive Intelligence',
        description: 'Comprehensive competitor benchmarking and positioning',
        url: '#'
      },
      {
        icon: <Target className="w-4 h-4" />,
        title: 'Customer Insights',
        description: 'Voice of customer and buyer journey mapping',
        url: '#'
      }
    ]
  },
  {
    title: 'Advisory Services',
    items: [
      {
        icon: <Briefcase className="w-4 h-4" />,
        title: 'Due Diligence',
        description: 'Commercial and operational due diligence for M&A',
        url: '#'
      },
      {
        icon: <FileText className="w-4 h-4" />,
        title: 'IPO Advisory',
        description: 'Market validation and investor narrative development',
        url: '#'
      },
      {
        icon: <Users className="w-4 h-4" />,
        title: 'Go-to-Market Strategy',
        description: 'Market entry and expansion strategy consulting',
        url: '#'
      }
    ]
  }
];

const INDUSTRIES_DATA: MegaMenuSection[] = [
  {
    title: 'Infrastructure & Energy',
    items: [
      {
        icon: <Zap className="w-4 h-4" />,
        title: 'Power & Energy',
        description: 'Grid infrastructure, renewables, and transformer markets',
        url: '#'
      },
      {
        icon: <Factory className="w-4 h-4" />,
        title: 'Manufacturing',
        description: 'Industrial equipment, automation, and supply chains',
        url: '#'
      },
      {
        icon: <Building2 className="w-4 h-4" />,
        title: 'Construction',
        description: 'Building materials, real estate, and infrastructure',
        url: '#'
      }
    ]
  },
  {
    title: 'Consumer & Technology',
    items: [
      {
        icon: <ShoppingCart className="w-4 h-4" />,
        title: 'Consumer Goods',
        description: 'FMCG, food & beverage, and specialty products',
        url: '#'
      },
      {
        icon: <Globe className="w-4 h-4" />,
        title: 'Technology',
        description: 'Software, hardware, and digital transformation',
        url: '#'
      },
      {
        icon: <Heart className="w-4 h-4" />,
        title: 'Healthcare',
        description: 'Pharmaceuticals, medical devices, and diagnostics',
        url: '#'
      }
    ]
  }
];

export function MegaMenu({ type, isVisible, onClose }: MegaMenuProps) {
  const data = type === 'services' ? SERVICES_DATA : INDUSTRIES_DATA;

  if (!isVisible) return null;

  return (
    <div 
      className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-black/10 animate-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-8" style={{ maxWidth: 'var(--container-nav)' }}>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-xs font-medium text-black/40 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.url}
                    className="flex items-start gap-3 p-3 rounded-[5px] hover:bg-black/[0.02] transition-colors group"
                    onClick={onClose}
                  >
                    <div className="mt-0.5 text-black/40 group-hover:text-red-600 transition-colors shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-black group-hover:text-red-600 transition-colors mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-sm text-black/60 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-6 border-t border-black/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-black mb-1">
                Looking for something specific?
              </p>
              <p className="text-sm text-black/60">
                Connect with our team to discuss your unique requirements
              </p>
            </div>
            <Button
              variant="brand"
              size="md"
              onClick={onClose}
              animatedArrow
            >
              Talk to an Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}