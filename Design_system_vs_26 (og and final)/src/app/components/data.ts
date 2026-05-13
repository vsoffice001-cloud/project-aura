/**
 * Report Store — Centralized Data (DS v4.3)
 *
 * WHAT: All mock data for the Report Store pages (Home + Listing).
 * WHY:  Eliminates duplicate data definitions across demo content files.
 *       Single source of truth for reports, industries, stats, highlights,
 *       analyst picks, regions, tags, and sort options.
 * WHEN: Imported by Report Store organisms and the ReportStorePage template.
 * HOW:  Named exports for each data set. Types exported for consumers.
 *
 * COLOR SYSTEM: Data-only file — no visual output, no color rules apply.
 */

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface ReportItem {
  id: string;
  image: string;
  title: string;
  industry: string;
  subcat: string;
  projection: string;
  region: string;
  date: string;
  format?: string;
  description?: string;
}

export interface IndustryData {
  label: string;
  count: number;
  subs: string[];
}

export interface RegionData {
  label: string;
  count: number;
}

export interface StatData {
  category: string;
  value: string;
  label: string;
  description: string;
  growth: string;
  metric: string;
}

export interface DataHighlight {
  value: string;
  title: string;
  source: string;
  growth: string;
  time: string;
}

export interface AnalystPick {
  id: string;
  image: string;
  title: string;
  industry: string;
  region: string;
  date: string;
  quote: string;
  analystName: string;
  analystRole: string;
  analystInitials: string;
}

export interface SectorItem {
  name: string;
  count: number;
}

export type SortKey = 'date' | 'title' | 'industry';

export interface SortOption {
  label: string;
  value: SortKey;
}

// ═══════════════════════════════════════════════════════════════
// IMAGES — Unsplash URLs (verified, unique per industry)
// ═══════════════════════════════════════════════════════════════

export const REPORT_IMAGES = {
  tech: 'https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbWFya2V0JTIwcmVzZWFyY2glMjBkYXRhfGVufDF8fHx8MTc3MzIzMjYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  health: 'https://images.unsplash.com/photo-1763070282928-fe1135165d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcGhhcm1hY2V1dGljYWwlMjBpbmR1c3RyeXxlbnwxfHx8fDE3NzMyMzI2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  energy: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzMyMjg0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  auto: 'https://images.unsplash.com/photo-1619426468047-2d7e0754ddf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZWxlY3RyaWMlMjB2ZWhpY2xlJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NzMyMzI2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  aero: 'https://images.unsplash.com/photo-1767868279704-16038283bbd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjBkZWZlbnNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMyMzI2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  finance: 'https://images.unsplash.com/photo-1770359718280-817b01057e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZXJ2aWNlcyUyMGJhbmtpbmd8ZW58MXx8fHwxNzczMjEwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  logistics: 'https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBzdXBwbHklMjBjaGFpbiUyMHdhcmVob3VzZXxlbnwxfHx8fDE3NzMyMzI2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  cyber: 'https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMGRpZ2l0YWx8ZW58MXx8fHwxNzczMjMyNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  agri: 'https://images.unsplash.com/photo-1598293629424-08fd77bbfca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBiaW90ZWNobm9sb2d5JTIwZmFybWluZ3xlbnwxfHx8fDE3NzMyMzI2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  semi: 'https://images.unsplash.com/photo-1672307613484-3254a04651fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwY2hpcCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMTU4NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  med: 'https://images.unsplash.com/photo-1768498950637-88d073faa491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MzE2MjM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  wind: 'https://images.unsplash.com/photo-1608363188566-517a7786f5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjByZW5ld2FibGUlMjBlbmVyZ3l8ZW58MXx8fHwxNzczMjMzOTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  fin: 'https://images.unsplash.com/photo-1726064855971-f12e80d59680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZGlnaXRhbCUyMGJhbmtpbmclMjBtb2JpbGV8ZW58MXx8fHwxNzczMjA4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ship: 'https://images.unsplash.com/photo-1726315185844-b4cb8e95cab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0fGVufDF8fHx8MTc3MzE0MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080',
  ev: 'https://images.unsplash.com/photo-1672542128826-5f0d578713d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZyUyMHN0YXRpb258ZW58MXx8fHwxNzczMTkyMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  retail: 'https://images.unsplash.com/photo-1759197894183-ffffa3c7fcd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBlY29tbWVyY2UlMjB3YXJlaG91c2UlMjBndWxmaWxsbWVudHxlbnwxfHx8fDE3NzMyMzM5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
} as const;

// ═══════════════════════════════════════════════════════════════
// FEATURED REPORTS (Home — Section 2)
// ═══════════════════════════════════════════════════════════════

export const FEATURED_REPORTS: ReportItem[] = [
  { id: 'fr-1', image: REPORT_IMAGES.tech, title: 'Global AI Semiconductor Market Forecast 2026-2032', industry: 'Technology', subcat: 'Semiconductors', projection: '$487B by 2032', region: 'Global', date: 'Mar 2026' },
  { id: 'fr-2', image: REPORT_IMAGES.health, title: 'Next-Gen Biologics Pipeline Analysis: mRNA & Cell Therapy', industry: 'Healthcare', subcat: 'Biologics', projection: '$312B by 2030', region: 'North America', date: 'Mar 2026' },
  { id: 'fr-3', image: REPORT_IMAGES.energy, title: 'Green Hydrogen Economy: Production, Storage & Distribution', industry: 'Energy', subcat: 'Clean Energy', projection: '$130B by 2030', region: 'Europe', date: 'Feb 2026' },
  { id: 'fr-4', image: REPORT_IMAGES.auto, title: 'Autonomous Vehicle Supply Chain: Sensors to Software', industry: 'Automotive', subcat: 'Autonomous', projection: '$556B by 2030', region: 'Global', date: 'Feb 2026' },
  { id: 'fr-5', image: REPORT_IMAGES.cyber, title: 'Zero Trust Architecture: Enterprise Adoption Trends', industry: 'Technology', subcat: 'Cybersecurity', projection: '$67B by 2028', region: 'Global', date: 'Jan 2026' },
];

// ═══════════════════════════════════════════════════════════════
// RECOMMENDED REPORTS (Home — Section 4)
// ═══════════════════════════════════════════════════════════════

export const RECOMMENDED_REPORTS: ReportItem[] = [
  { id: 'rr-1', image: REPORT_IMAGES.finance, title: 'Embedded Finance & Banking-as-a-Service Platform Analysis', industry: 'Financial Services', subcat: 'Fintech', projection: '$230B by 2030', region: 'Global', date: 'Mar 2026', description: 'Comprehensive analysis of the embedded finance ecosystem, BaaS platforms, and the convergence of banking and technology.' },
  { id: 'rr-2', image: REPORT_IMAGES.logistics, title: 'Autonomous Logistics & Last-Mile Delivery Robotics', industry: 'Logistics', subcat: 'Automation', projection: '$84B by 2030', region: 'North America', date: 'Feb 2026', description: 'Exploration of autonomous delivery solutions, warehouse robotics, and the transformation of last-mile logistics.' },
  { id: 'rr-3', image: REPORT_IMAGES.agri, title: 'Precision Agriculture: AI, Drones & IoT in Farming', industry: 'Agriculture', subcat: 'AgriTech', projection: '$25B by 2028', region: 'Global', date: 'Feb 2026', description: 'Market sizing for precision agriculture technologies including AI-driven crop monitoring, drone services, and smart irrigation.' },
  { id: 'rr-4', image: REPORT_IMAGES.aero, title: 'Space Economy: Satellite Constellations & Launch Services', industry: 'Aerospace', subcat: 'Space Tech', projection: '$1.1T by 2040', region: 'Global', date: 'Jan 2026', description: 'Deep dive into the commercial space economy covering LEO constellations, launch vehicle competition, and space data services.' },
  { id: 'rr-5', image: REPORT_IMAGES.tech, title: 'Quantum Computing: Enterprise Readiness Assessment 2026', industry: 'Technology', subcat: 'Quantum', projection: '$125B by 2035', region: 'Global', date: 'Jan 2026', description: 'Assessment of quantum computing readiness across industries with vendor landscape, use case analysis, and adoption timelines.' },
  { id: 'rr-6', image: REPORT_IMAGES.health, title: 'Digital Therapeutics & Software-as-Medical-Device', industry: 'Healthcare', subcat: 'Digital Health', projection: '$13B by 2028', region: 'Europe', date: 'Jan 2026', description: 'Market overview for prescription digital therapeutics, regulatory frameworks, and reimbursement pathways across major markets.' },
];

// ═══════════════════════════════════════════════════════════════
// ALL REPORTS (Listing page — full catalog mock)
// ═══════════════════════════════════════════════════════════════

export const ALL_REPORTS: ReportItem[] = [
  { id: 'r-1', image: REPORT_IMAGES.semi, title: 'Global AI Semiconductor Market Forecast 2026-2032', industry: 'Technology & Telecom', subcat: 'Semiconductor & Chip Design', projection: '$487B by 2032', region: 'Global', date: 'Mar 2026', format: 'Full Report', description: 'Complete TAM analysis of AI-optimized chips including GPUs, TPUs, and custom ASICs across cloud and edge deployments.' },
  { id: 'r-2', image: REPORT_IMAGES.med, title: 'Next-Gen Biologics Pipeline Analysis: mRNA & Cell Therapy', industry: 'Healthcare & Life Sciences', subcat: 'Pharma & Biotech', projection: '$312B by 2030', region: 'Americas', date: 'Mar 2026', format: 'Full Report', description: 'Deep dive into mRNA therapeutics, CAR-T cell therapy, and gene editing platforms with clinical pipeline assessment.' },
  { id: 'r-3', image: REPORT_IMAGES.wind, title: 'Green Hydrogen Economy: Production & Distribution', industry: 'Energy & Utilities', subcat: 'Green Hydrogen', projection: '$130B by 2030', region: 'Europe', date: 'Feb 2026', format: 'Market Brief', description: 'Production costs, electrolyzer technology landscape, and distribution infrastructure requirements for green hydrogen.' },
  { id: 'r-4', image: REPORT_IMAGES.ev, title: 'Autonomous Vehicle Supply Chain: Sensors to Software', industry: 'Automotive & Transportation', subcat: 'Autonomous Driving', projection: '$556B by 2030', region: 'Global', date: 'Feb 2026', format: 'Full Report', description: 'End-to-end supply chain analysis from LiDAR sensors and compute hardware to software stacks and mapping data.' },
  { id: 'r-5', image: REPORT_IMAGES.cyber, title: 'Zero Trust Architecture: Enterprise Adoption Trends', industry: 'Technology & Telecom', subcat: 'Cybersecurity Solutions', projection: '$67B by 2028', region: 'Global', date: 'Jan 2026', format: 'Market Brief', description: 'Adoption rates, vendor landscape, and implementation frameworks for zero trust security in enterprise environments.' },
  { id: 'r-6', image: REPORT_IMAGES.fin, title: 'Embedded Finance & Banking-as-a-Service Platforms', industry: 'Banking & Financial Services', subcat: 'Digital Banking', projection: '$230B by 2030', region: 'Global', date: 'Mar 2026', format: 'Full Report', description: 'BaaS platform analysis, embedded payments, lending, and insurance with regulatory landscape overview.' },
  { id: 'r-7', image: REPORT_IMAGES.ship, title: 'Autonomous Logistics & Last-Mile Delivery Robotics', industry: 'Consumer & Retail', subcat: 'E-Commerce', projection: '$84B by 2030', region: 'Americas', date: 'Feb 2026', format: 'Data Pack', description: 'Autonomous delivery robots, warehouse automation, and drone logistics with deployment metrics and cost analysis.' },
  { id: 'r-8', image: REPORT_IMAGES.agri, title: 'Precision Agriculture: AI, Drones & IoT in Farming', industry: 'Agriculture', subcat: 'Precision Farming', projection: '$25B by 2028', region: 'Global', date: 'Feb 2026', format: 'Full Report', description: 'AI-driven crop monitoring, drone services, smart irrigation, and yield optimization technology assessment.' },
  { id: 'r-9', image: REPORT_IMAGES.aero, title: 'Space Economy: Satellite Constellations & Launch Services', industry: 'Defense & Security', subcat: 'Aerospace & Defense', projection: '$1.1T by 2040', region: 'Global', date: 'Jan 2026', format: 'Full Report', description: 'LEO constellation economics, launch vehicle competition, and commercial space data services market sizing.' },
  { id: 'r-10', image: REPORT_IMAGES.semi, title: 'Quantum Computing Enterprise Readiness Assessment', industry: 'Technology & Telecom', subcat: 'Cloud Computing', projection: '$125B by 2035', region: 'Global', date: 'Jan 2026', format: 'Market Brief', description: 'Quantum hardware vendor landscape, error correction progress, and enterprise use case viability timelines.' },
  { id: 'r-11', image: REPORT_IMAGES.med, title: 'Digital Therapeutics & Software-as-Medical-Device', industry: 'Healthcare & Life Sciences', subcat: 'Digital Health', projection: '$13B by 2028', region: 'Europe', date: 'Jan 2026', format: 'Data Pack', description: 'Prescription digital therapeutics pipeline, regulatory frameworks, and reimbursement pathway analysis.' },
  { id: 'r-12', image: REPORT_IMAGES.retail, title: 'Retail Media Networks: Advertiser Spending Forecast', industry: 'Consumer & Retail', subcat: 'Retail Media', projection: '$175B by 2028', region: 'Americas', date: 'Mar 2026', format: 'Full Report', description: 'Retail media ad spend projections, platform capabilities comparison, and attribution measurement frameworks.' },
  { id: 'r-13', image: REPORT_IMAGES.wind, title: 'Battery Energy Storage Systems: Grid-Scale Deployment', industry: 'Energy & Utilities', subcat: 'Energy Storage', projection: '$92B by 2030', region: 'Global', date: 'Mar 2026', format: 'Full Report', description: 'Lithium-ion, sodium-ion, and flow battery technology comparison for utility-scale energy storage applications.' },
  { id: 'r-14', image: REPORT_IMAGES.fin, title: 'RegTech & Compliance Automation Market Analysis', industry: 'Banking & Financial Services', subcat: 'RegTech & Compliance', projection: '$28B by 2028', region: 'Europe', date: 'Feb 2026', format: 'Market Brief', description: 'AI-powered compliance monitoring, KYC/AML automation, and regulatory reporting platform landscape.' },
  { id: 'r-15', image: REPORT_IMAGES.ev, title: 'Electric Vehicle Battery Recycling & Second Life', industry: 'Automotive & Transportation', subcat: 'Battery Technology', projection: '$18B by 2030', region: 'Global', date: 'Dec 2025', format: 'Data Pack', description: 'Li-ion battery recycling economics, second-life applications, and circular economy supply chain models.' },
  { id: 'r-16', image: REPORT_IMAGES.cyber, title: 'Cloud-Native Application Security: CNAPP Market', industry: 'Technology & Telecom', subcat: 'Cybersecurity Solutions', projection: '$21B by 2028', region: 'Global', date: 'Dec 2025', format: 'Full Report', description: 'Cloud-native application protection platform vendor landscape, feature comparison, and adoption drivers.' },
  { id: 'r-17', image: REPORT_IMAGES.ship, title: 'Cross-Border E-Commerce Logistics Infrastructure', industry: 'Consumer & Retail', subcat: 'E-Commerce', projection: '$680B by 2030', region: 'Southeast Asia', date: 'Jan 2026', format: 'Full Report', description: 'Cross-border fulfillment networks, customs tech, and last-mile solutions across APAC markets.' },
  { id: 'r-18', image: REPORT_IMAGES.agri, title: 'Vertical Farming & Controlled Environment Agriculture', industry: 'Agriculture', subcat: 'Precision Farming', projection: '$31B by 2030', region: 'Americas', date: 'Nov 2025', format: 'Market Brief', description: 'Indoor vertical farming economics, LED grow technology, and crop yield optimization analysis.' },
];

// ═══════════════════════════════════════════════════════════════
// STAT DATA (Home — Section 3: Key Market Indicators)
// ═══════════════════════════════════════════════════════════════

export const STAT_DATA: StatData[] = [
  { category: 'AI & ML', value: '$487B', label: 'AI Semiconductor TAM', description: 'Total addressable market for AI-optimized chips including GPUs, TPUs, and custom ASICs', growth: '29.4%', metric: '2026-2032 forecast' },
  { category: 'Energy', value: '$1.7T', label: 'Global Clean Energy Investment', description: 'Annual investment in renewable energy, grid modernization, and energy storage systems', growth: '12.8%', metric: 'YoY growth' },
  { category: 'Healthcare', value: '$312B', label: 'Biologics Market', description: 'Next-generation biologics including mRNA therapeutics, cell therapy, and gene editing', growth: '18.2%', metric: '2024-2030 CAGR' },
  { category: 'FinTech', value: '$230B', label: 'Embedded Finance', description: 'Banking-as-a-service, embedded payments, and integrated lending platforms', growth: '24.1%', metric: '2025-2030 CAGR' },
];

// ═══════════════════════════════════════════════════════════════
// DATA HIGHLIGHTS (Home — Section 5: Daily Highlights)
// ═══════════════════════════════════════════════════════════════

export const DATA_HIGHLIGHTS: DataHighlight[] = [
  { value: '34.2M', title: 'EV units sold globally in Q4 2025, surpassing ICE for first time in key markets', source: 'IEA Global EV Outlook', growth: '+47%', time: '2h ago' },
  { value: '$4.8B', title: 'Record VC funding into AI infrastructure startups in February 2026', source: 'PitchBook Data', growth: '+62%', time: '5h ago' },
  { value: '127 GW', title: 'New solar capacity installed worldwide in 2025, led by China and India', source: 'IRENA Statistics', growth: '+31%', time: '8h ago' },
  { value: '2,340', title: 'Active clinical trials for mRNA-based therapies beyond COVID-19 vaccines', source: 'ClinicalTrials.gov', growth: '+89%', time: '12h ago' },
];

// ═══════════════════════════════════════════════════════════════
// ANALYST PICKS (Home — Section 6)
// ═══════════════════════════════════════════════════════════════

export const ANALYST_PICKS: AnalystPick[] = [
  { id: 'ap-1', image: REPORT_IMAGES.tech, title: 'Edge AI Chipset Market: On-Device Intelligence', industry: 'Technology', region: 'Global', date: 'Mar 2026', quote: 'Edge AI will be the defining technology shift of 2026-2028. On-device inference is moving from smartphones to industrial IoT at an unprecedented pace.', analystName: 'Dr. Sarah Chen', analystRole: 'Chief Technology Analyst', analystInitials: 'SC' },
  { id: 'ap-2', image: REPORT_IMAGES.energy, title: 'Grid-Scale Battery Storage Economics', industry: 'Energy', region: 'North America', date: 'Feb 2026', quote: 'Lithium-iron-phosphate costs have broken below $50/kWh. We are at the inflection point where storage becomes cheaper than peaking gas plants.', analystName: 'James Morrison', analystRole: 'Energy Markets Lead', analystInitials: 'JM' },
  { id: 'ap-3', image: REPORT_IMAGES.health, title: 'GLP-1 Receptor Agonist Market Expansion', industry: 'Healthcare', region: 'Global', date: 'Feb 2026', quote: 'The GLP-1 class is reshaping not just diabetes care but obesity, cardiovascular, and potentially neurodegenerative disease markets.', analystName: 'Dr. Priya Sharma', analystRole: 'Pharma & Biotech Analyst', analystInitials: 'PS' },
];

// ═══════════════════════════════════════════════════════════════
// SECTORS (Home — Section 7: Explore by Sector)
// ═══════════════════════════════════════════════════════════════

export const SECTORS: SectorItem[] = [
  { name: 'Technology', count: 234 },
  { name: 'Healthcare', count: 187 },
  { name: 'Energy', count: 156 },
  { name: 'Financial Services', count: 142 },
  { name: 'Automotive', count: 98 },
  { name: 'Aerospace', count: 76 },
  { name: 'Logistics', count: 64 },
  { name: 'Agriculture', count: 45 },
  { name: 'Cybersecurity', count: 89 },
  { name: 'Materials', count: 52 },
];

// ═══════════════════════════════════════════════════════════════
// FILTER DATA (Listing page — Sidebar)
// ═══════════════════════════════════════════════════════════════

export const FULL_INDUSTRIES: IndustryData[] = [
  { label: 'Agriculture', count: 987, subs: ['Precision Farming', 'Crop Science', 'Livestock Tech', 'Smart Irrigation', 'Organic & Sustainable', 'AgriTech Platforms'] },
  { label: 'Automotive & Transportation', count: 1543, subs: ['Electric Vehicles', 'Autonomous Driving', 'Fleet Management', 'Battery Technology', 'Connected Cars', 'Mobility-as-a-Service'] },
  { label: 'Banking & Financial Services', count: 1892, subs: ['Digital Banking', 'Payments & Wallets', 'Lending Platforms', 'InsurTech', 'RegTech & Compliance', 'Wealth Management'] },
  { label: 'Consumer & Retail', count: 2034, subs: ['E-Commerce', 'D2C Brands', 'Retail Media', 'Luxury & Fashion', 'CPG Analytics', 'Omnichannel'] },
  { label: 'Defense & Security', count: 654, subs: ['Cybersecurity', 'Aerospace & Defense', 'Surveillance Tech', 'GovTech', 'Border Security'] },
  { label: 'Education & Training', count: 876, subs: ['EdTech Platforms', 'LMS & LXP', 'Corporate Training', 'E-Learning Content', 'Upskilling & Reskilling'] },
  { label: 'Energy & Utilities', count: 1456, subs: ['Solar Energy', 'Wind Power', 'Green Hydrogen', 'Energy Storage', 'Grid Modernization', 'Nuclear'] },
  { label: 'Food & Beverage', count: 1234, subs: ['Plant-Based Foods', 'FoodTech', 'Cold Chain', 'Nutraceuticals', 'Sustainable Packaging'] },
  { label: 'Healthcare & Life Sciences', count: 2187, subs: ['Pharma & Biotech', 'Medical Devices', 'Digital Health', 'Diagnostics', 'Genomics & Precision Med', 'Clinical Trials'] },
  { label: 'Manufacturing', count: 1678, subs: ['Industrial Robotics', 'IIoT Platforms', 'Additive Manufacturing', '3D Printing', 'Smart Factory'] },
  { label: 'Media & Entertainment', count: 1123, subs: ['Streaming & OTT', 'Gaming & Esports', 'AdTech', 'Creator Economy', 'VR/AR Content'] },
  { label: 'Mining & Chemicals', count: 765, subs: ['Mining Tech', 'Specialty Chemicals', 'Green Chemistry', 'Process Automation'] },
  { label: 'Public Sector', count: 432, subs: ['Smart Cities', 'Digital Government', 'Public Safety', 'Civic Tech'] },
  { label: 'Technology & Telecom', count: 3215, subs: ['5G & Connectivity', 'AI & Machine Learning', 'Blockchain & Web3', 'Cloud Computing', 'Cybersecurity Solutions', 'Data Analytics & BI', 'Edge Computing', 'Enterprise Networking', 'IoT Platforms', 'Managed IT Services', 'Semiconductor & Chip Design', 'Software Development & DevOps', 'Telecom Infrastructure'] },
];

export const TAGS_BY_INDUSTRY: Record<string, string[]> = {
  'Agriculture': ['Crop Monitoring', 'Drone Spraying', 'Soil Analytics', 'Yield Optimization', 'Farm Management Software', 'Livestock Tracking'],
  'Automotive & Transportation': ['Battery Recycling', 'Charging Infrastructure', 'LiDAR Sensors', 'V2X Communication', 'Supply Chain Chips', 'Ride-Hailing'],
  'Banking & Financial Services': ['Open Banking APIs', 'BNPL', 'Fraud Detection', 'KYC Automation', 'Neobanks', 'Embedded Insurance'],
  'Consumer & Retail': ['Social Commerce', 'Retail Analytics', 'Store Automation', 'Dynamic Pricing', 'AR Shopping', 'Quick Commerce'],
  'Defense & Security': ['Drone Warfare', 'Satellite Intel', 'Zero Trust', 'Identity Management', 'Threat Intelligence'],
  'Education & Training': ['Adaptive Learning', 'Micro-Credentials', 'VR Training', 'Assessment AI', 'Cohort-Based Courses'],
  'Energy & Utilities': ['Electrolyzer Tech', 'Battery Chemistry', 'Smart Meters', 'Carbon Capture', 'Perovskite Solar', 'Grid-Scale Storage'],
  'Food & Beverage': ['Cultured Meat', 'Food Safety IoT', 'Last-Mile Cold Chain', 'Alt-Protein', 'Traceability'],
  'Healthcare & Life Sciences': ['mRNA Therapeutics', 'Wearable Diagnostics', 'Telehealth Platforms', 'Drug Discovery AI', 'CRISPR Applications', 'Remote Patient Monitoring'],
  'Manufacturing': ['Predictive Maintenance', 'Digital Twins', 'Cobots', 'Quality Inspection AI', 'MES Platforms'],
  'Media & Entertainment': ['Content Recommendation', 'Game Engines', 'Programmatic Ads', 'NFT Marketplaces', 'Spatial Computing'],
  'Mining & Chemicals': ['Autonomous Haulage', 'Mineral Processing', 'ESG Compliance', 'Chemical Simulation'],
  'Public Sector': ['Digital Identity', 'Open Data Platforms', 'Emergency Response AI', 'Smart Traffic'],
  'Technology & Telecom': ['5G Network Deployment', 'API Management', 'Blockchain Protocols', 'Chip Fabrication', 'Cloud Migration Services', 'Computer Vision', 'Data Center Infrastructure', 'Data Warehousing', 'Decentralized Finance', 'DevOps & Automation', 'Digital Twins', 'Endpoint Protection', 'Generative AI', 'Network Slicing', 'Quantum Computing'],
};

export const FULL_REGIONS: RegionData[] = [
  { label: 'Africa', count: 4 },
  { label: 'Americas', count: 6 },
  { label: 'Europe', count: 8 },
  { label: 'GCC', count: 8 },
  { label: 'Global', count: 67 },
  { label: 'India', count: 19 },
  { label: 'Middle East', count: 1 },
  { label: 'Saudi Arabia', count: 2 },
  { label: 'Southeast Asia', count: 4 },
];

export const PUBLISH_YEARS = ['2026', '2025', '2024', '2023'] as const;
export const FORMATS = ['Full Report', 'Market Brief', 'Data Pack'] as const;
export const TOTAL_REPORTS_IN_CATALOG = 20836;
export const PAGE_SIZE = 6;

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest', value: 'date' },
  { label: 'Title A\u2013Z', value: 'title' },
  { label: 'Industry', value: 'industry' },
];

// ═══════════════════════════════════════════════════════════════
// HERO CONFIG
// ═══════════════════════════════════════════════════════════════

export const HERO_CONFIG = {
  label: 'Report Store',
  title: 'Market Intelligence, Delivered',
  subtitle: 'Access 1,200+ research reports spanning 10 industries. Data-driven insights for strategic decision making.',
  searchPlaceholder: 'Search reports by title, industry, or keyword...',
  badges: ['1,200+ Reports', '10 Industries', '42 Countries', 'Updated Weekly'],
} as const;

export const CTA_CONFIG = {
  label: 'Get Started',
  title: 'Ready to Access Our Research?',
  subtitle: 'Join 5,000+ organizations using our market intelligence to make data-driven decisions.',
  primaryText: 'Request a Demo',
  secondaryText: 'Browse Reports',
} as const;
