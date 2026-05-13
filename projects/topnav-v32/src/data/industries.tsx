/**
 * Industries Data Structure
 * 
 * Contains all 14 industry categories with their segments and popular tags.
 * Icons use lucide-react for consistency across all industries.
 */

import { 
  Sprout, 
  Truck, 
  Building2, 
  ShoppingBag, 
  Shield, 
  GraduationCap, 
  Zap, 
  UtensilsCrossed, 
  HeartPulse, 
  Hotel, 
  Factory, 
  Film, 
  Home, 
  Cpu 
} from 'lucide-react';

export interface SubCategory {
  id: string;
  label: string;
  href: string;
}

export interface Segment {
  name: string;
  href: string;
}

export interface Industry {
  id: string;
  label: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
  /** Segments for the new Industries dropdown layout */
  segments?: Segment[];
  /** Popular tags for the industry */
  popularTopics?: string[];
  /** CTA text for "Explore X" button (e.g., "Healthcare", "Banking") */
  ctaText?: string;
}

export const industries: Industry[] = [
  // 1. AGRICULTURE AND ANIMAL CARE
  {
    id: 'agriculture',
    label: 'Agriculture & Animal Care',
    icon: <Sprout className="size-[16px]" />,
    ctaText: 'Agriculture & Animal Care',
    segments: [
      { name: 'Crop Production', href: '/industries/agriculture/crop-production' },
      { name: 'Livestock & Poultry', href: '/industries/agriculture/livestock' },
      { name: 'Aquaculture & Fisheries', href: '/industries/agriculture/aquaculture' },
      { name: 'Agricultural Equipment', href: '/industries/agriculture/equipment' },
      { name: 'Seeds & Fertilizers', href: '/industries/agriculture/seeds-fertilizers' },
      { name: 'Veterinary Services', href: '/industries/agriculture/veterinary' },
      { name: 'Forestry & Logging', href: '/industries/agriculture/forestry' },
      { name: 'Organic Farming', href: '/industries/agriculture/organic' },
    ],
    popularTopics: ['Precision Agriculture', 'Organic Farming', 'AgriTech', 'Smart Farming', 'Sustainable Agriculture'],
    subcategories: [
      { id: 'crop-production', label: 'Crop Production', href: '/industries/agriculture/crop-production' },
      { id: 'animal-husbandry', label: 'Animal Husbandry', href: '/industries/agriculture/animal-husbandry' },
      { id: 'forestry', label: 'Forestry', href: '/industries/agriculture/forestry' },
    ],
  },

  // 2. AUTOMOTIVE, TRANSPORTATION AND WAREHOUSING
  {
    id: 'automotive',
    label: 'Automotive, Transportation & Warehousing',
    icon: <Truck className="size-[16px]" />,
    ctaText: 'Automotive',
    segments: [
      { name: 'Automotive Manufacturing', href: '/industries/automotive/manufacturing' },
      { name: 'Electric Vehicles', href: '/industries/automotive/ev' },
      { name: 'Auto Parts & Accessories', href: '/industries/automotive/parts' },
      { name: 'Logistics & Supply Chain', href: '/industries/automotive/logistics' },
      { name: 'Warehousing Solutions', href: '/industries/automotive/warehousing' },
      { name: 'Public Transportation', href: '/industries/automotive/public-transport' },
      { name: 'Aviation & Aerospace', href: '/industries/automotive/aviation' },
      { name: 'Maritime & Shipping', href: '/industries/automotive/maritime' },
    ],
    popularTopics: ['Electric Vehicles', 'Autonomous Driving', 'Supply Chain', 'Last-Mile Delivery', 'Connected Cars'],
    subcategories: [
      { id: 'automotive-manufacturing', label: 'Automotive Manufacturing', href: '/industries/automotive/automotive-manufacturing' },
      { id: 'logistics', label: 'Logistics and Distribution', href: '/industries/automotive/logistics' },
      { id: 'warehousing', label: 'Warehousing', href: '/industries/automotive/warehousing' },
      { id: 'public-transport', label: 'Public Transportation', href: '/industries/automotive/public-transport' },
    ],
  },

  // 3. BANKING, FINANCIAL SERVICES, AND INSURANCE (BFSI)
  {
    id: 'banking',
    label: 'BFSI',
    icon: <Building2 className="size-[16px]" />,
    ctaText: 'BFSI',
    segments: [
      { name: 'Retail Banking', href: '/industries/bfsi/retail-banking' },
      { name: 'Investment Banking', href: '/industries/bfsi/investment' },
      { name: 'Commercial Banking', href: '/industries/bfsi/commercial' },
      { name: 'Insurance Services', href: '/industries/bfsi/insurance' },
      { name: 'Wealth Management', href: '/industries/bfsi/wealth' },
      { name: 'Fintech Solutions', href: '/industries/bfsi/fintech' },
      { name: 'Payment Systems', href: '/industries/bfsi/payments' },
      { name: 'Credit & Lending', href: '/industries/bfsi/lending' },
    ],
    popularTopics: ['Digital Banking', 'Blockchain', 'InsurTech', 'Open Banking', 'RegTech'],
    subcategories: [
      { id: 'retail-banking', label: 'Retail Banking', href: '/industries/banking/retail-banking' },
      { id: 'investment-banking', label: 'Investment Banking', href: '/industries/banking/investment-banking' },
      { id: 'insurance', label: 'Insurance', href: '/industries/banking/insurance' },
      { id: 'fintech', label: 'Financial Technology', href: '/industries/banking/fintech' },
    ],
  },

  // 4. CONSUMER PRODUCTS AND RETAIL
  {
    id: 'consumer-products',
    label: 'Consumer Products & Retail',
    icon: <ShoppingBag className="size-[16px]" />,
    ctaText: 'Consumer',
    segments: [
      { name: 'E-commerce Platforms', href: '/industries/consumer/ecommerce' },
      { name: 'Consumer Electronics', href: '/industries/consumer/electronics' },
      { name: 'Fashion & Apparel', href: '/industries/consumer/fashion' },
      { name: 'Home & Living', href: '/industries/consumer/home' },
      { name: 'Beauty & Personal Care', href: '/industries/consumer/beauty' },
      { name: 'Luxury Goods', href: '/industries/consumer/luxury' },
      { name: 'Sports & Fitness', href: '/industries/consumer/sports' },
      { name: 'Baby Care Products', href: '/industries/consumer/baby-care' },
      { name: 'Wholesale & Retail Trade', href: '/industries/consumer/wholesale' },
      { name: 'Consumer Services', href: '/industries/consumer/services' },
    ],
    popularTopics: ['D2C Brands', 'Omnichannel', 'Sustainability', 'Consumer Trends', 'Experiential Retail'],
    subcategories: [
      { id: 'baby-care', label: 'Baby Care', href: '/industries/consumer-products/baby-care' },
      { id: 'consumer-electronics', label: 'Consumer Electronics', href: '/industries/consumer-products/consumer-electronics' },
      { id: 'consumer-services', label: 'Consumer Services', href: '/industries/consumer-products/consumer-services' },
      { id: 'cosmetics', label: 'Cosmetics and Personal Care', href: '/industries/consumer-products/cosmetics' },
      { id: 'home-furnishings', label: 'Home and Office Furnishings', href: '/industries/consumer-products/home-furnishings' },
      { id: 'luxury-goods', label: 'Luxury Goods', href: '/industries/consumer-products/luxury-goods' },
      { id: 'sports-equipment', label: 'Sports Equipment', href: '/industries/consumer-products/sports-equipment' },
      { id: 'textile-apparel', label: 'Textile, Apparel, and Footwear', href: '/industries/consumer-products/textile-apparel' },
      { id: 'wholesale-retail', label: 'Wholesale and Retail', href: '/industries/consumer-products/wholesale-retail' },
    ],
  },

  // 5. DEFENSE AND SECURITY
  {
    id: 'defense',
    label: 'Defense & Security',
    icon: <Shield className="size-[16px]" />,
    ctaText: 'Defense',
    segments: [
      { name: 'Aerospace & Defense', href: '/industries/defense/aerospace' },
      { name: 'Military Equipment', href: '/industries/defense/military' },
      { name: 'Cybersecurity Solutions', href: '/industries/defense/cybersecurity' },
      { name: 'Private Security Services', href: '/industries/defense/private-security' },
      { name: 'Surveillance Systems', href: '/industries/defense/surveillance' },
      { name: 'Defense Technology', href: '/industries/defense/technology' },
    ],
    popularTopics: ['Cybersecurity', 'Defense Tech', 'National Security', 'Threat Intelligence'],
    subcategories: [
      { id: 'aerospace-defense', label: 'Aerospace and Defense', href: '/industries/defense/aerospace-defense' },
      { id: 'cybersecurity', label: 'Cybersecurity', href: '/industries/defense/cybersecurity' },
      { id: 'private-security', label: 'Private Security', href: '/industries/defense/private-security' },
    ],
  },

  // 6. EDUCATION AND RECRUITMENT
  {
    id: 'education',
    label: 'Education & Recruitment',
    icon: <GraduationCap className="size-[16px]" />,
    ctaText: 'Education',
    segments: [
      { name: 'K-12 Education', href: '/industries/education/k12' },
      { name: 'Higher Education', href: '/industries/education/higher-education' },
      { name: 'EdTech Platforms', href: '/industries/education/edtech' },
      { name: 'Online Learning', href: '/industries/education/online' },
      { name: 'Vocational Training', href: '/industries/education/vocational' },
      { name: 'HR & Recruitment', href: '/industries/education/recruitment' },
      { name: 'Corporate Training', href: '/industries/education/corporate' },
      { name: 'Language Learning', href: '/industries/education/language' },
    ],
    popularTopics: ['EdTech', 'Remote Learning', 'Skill Development', 'HR Tech', 'LMS Platforms'],
    subcategories: [
      { id: 'k12', label: 'K-12 Education', href: '/industries/education/k12' },
      { id: 'higher-education', label: 'Higher Education', href: '/industries/education/higher-education' },
      { id: 'edtech', label: 'Educational Technology', href: '/industries/education/edtech' },
    ],
  },

  // 7. ENERGY AND UTILITIES
  {
    id: 'energy',
    label: 'Energy & Utilities',
    icon: <Zap className="size-[16px]" />,
    ctaText: 'Energy',
    segments: [
      { name: 'Oil & Gas', href: '/industries/energy/oil-gas' },
      { name: 'Renewable Energy', href: '/industries/energy/renewable' },
      { name: 'Solar Power', href: '/industries/energy/solar' },
      { name: 'Wind Energy', href: '/industries/energy/wind' },
      { name: 'Electric Utilities', href: '/industries/energy/utilities' },
      { name: 'Energy Storage', href: '/industries/energy/storage' },
      { name: 'Smart Grid', href: '/industries/energy/smart-grid' },
      { name: 'Nuclear Energy', href: '/industries/energy/nuclear' },
    ],
    popularTopics: ['Renewable Energy', 'Clean Tech', 'Energy Transition', 'Smart Grid', 'Carbon Neutral'],
    subcategories: [
      { id: 'oil-gas', label: 'Oil and Gas', href: '/industries/energy/oil-gas' },
      { id: 'renewable-energy', label: 'Renewable Energy', href: '/industries/energy/renewable-energy' },
      { id: 'utilities', label: 'Utilities', href: '/industries/energy/utilities' },
    ],
  },

  // 8. FOOD, BEVERAGE & TOBACCO
  {
    id: 'food-beverage',
    label: 'Food, Beverage & Tobacco',
    icon: <UtensilsCrossed className="size-[16px]" />,
    ctaText: 'Food & Beverage',
    segments: [
      { name: 'Food Processing', href: '/industries/food/processing' },
      { name: 'Beverages & Drinks', href: '/industries/food/beverages' },
      { name: 'Packaged Foods', href: '/industries/food/packaged' },
      { name: 'Dairy Products', href: '/industries/food/dairy' },
      { name: 'Meat & Seafood', href: '/industries/food/meat' },
      { name: 'Bakery & Confectionery', href: '/industries/food/bakery' },
      { name: 'Tobacco Products', href: '/industries/food/tobacco' },
      { name: 'Food Service Equipment', href: '/industries/food/equipment' },
    ],
    popularTopics: ['Plant-Based Foods', 'Food Safety', 'Sustainable Packaging', 'Functional Foods'],
    subcategories: [],
  },

  // 9. HEALTHCARE AND LIFE SCIENCES
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: <HeartPulse className="size-[16px]" />,
    ctaText: 'Healthcare',
    segments: [
      { name: 'Hospitals & Clinics', href: '/industries/healthcare/hospitals' },
      { name: 'Pharmaceuticals', href: '/industries/healthcare/pharma' },
      { name: 'Medical Devices', href: '/industries/healthcare/devices' },
      { name: 'Biotechnology', href: '/industries/healthcare/biotech' },
      { name: 'Diagnostics', href: '/industries/healthcare/diagnostics' },
      { name: 'Telemedicine', href: '/industries/healthcare/telemedicine' },
      { name: 'Health Insurance', href: '/industries/healthcare/insurance' },
      { name: 'Medical Research', href: '/industries/healthcare/research' },
    ],
    popularTopics: ['Digital Health', 'HealthTech', 'Genomics', 'AI in Healthcare', 'Remote Patient Monitoring'],
    subcategories: [
      { id: 'hospitals', label: 'Hospitals and Clinics', href: '/industries/healthcare/hospitals' },
      { id: 'pharmaceuticals', label: 'Pharmaceuticals', href: '/industries/healthcare/pharmaceuticals' },
      { id: 'medical-devices', label: 'Medical Devices', href: '/industries/healthcare/medical-devices' },
      { id: 'biotechnology', label: 'Biotechnology', href: '/industries/healthcare/biotechnology' },
    ],
  },

  // 10. HOSPITALITY AND TOURISM
  {
    id: 'hospitality',
    label: 'Hospitality & Tourism',
    icon: <Hotel className="size-[16px]" />,
    ctaText: 'Hospitality',
    segments: [
      { name: 'Hotels & Resorts', href: '/industries/hospitality/hotels' },
      { name: 'Restaurants & Dining', href: '/industries/hospitality/restaurants' },
      { name: 'Travel Agencies', href: '/industries/hospitality/travel' },
      { name: 'Event Management', href: '/industries/hospitality/events' },
      { name: 'Theme Parks', href: '/industries/hospitality/theme-parks' },
      { name: 'Cruise Lines', href: '/industries/hospitality/cruise' },
      { name: 'Short-term Rentals', href: '/industries/hospitality/rentals' },
      { name: 'Tourism Boards', href: '/industries/hospitality/tourism' },
    ],
    popularTopics: ['Experience Economy', 'Sustainable Tourism', 'Food Tourism', 'Contactless Service'],
    subcategories: [
      { id: 'hotels', label: 'Hotels and Resorts', href: '/industries/hospitality/hotels' },
      { id: 'restaurants', label: 'Restaurants and Food Services', href: '/industries/hospitality/restaurants' },
      { id: 'travel', label: 'Travel and Tourism', href: '/industries/hospitality/travel' },
    ],
  },

  // 11. MANUFACTURING & CONSTRUCTION
  {
    id: 'manufacturing',
    label: 'Manufacturing & Construction',
    icon: <Factory className="size-[16px]" />,
    ctaText: 'Manufacturing',
    segments: [
      { name: 'Industrial Manufacturing', href: '/industries/manufacturing/industrial' },
      { name: 'Electronics Manufacturing', href: '/industries/manufacturing/electronics' },
      { name: 'Chemical Manufacturing', href: '/industries/manufacturing/chemical' },
      { name: 'Construction Services', href: '/industries/manufacturing/construction' },
      { name: 'Building Materials', href: '/industries/manufacturing/materials' },
      { name: 'Heavy Machinery', href: '/industries/manufacturing/machinery' },
      { name: 'Infrastructure Projects', href: '/industries/manufacturing/infrastructure' },
      { name: '3D Printing & Additive', href: '/industries/manufacturing/3d-printing' },
    ],
    popularTopics: ['Industry 4.0', 'Smart Manufacturing', 'Green Building', 'Modular Construction'],
    subcategories: [
      { id: 'industrial-manufacturing', label: 'Industrial Manufacturing', href: '/industries/manufacturing/industrial-manufacturing' },
      { id: 'electronics-manufacturing', label: 'Electronics Manufacturing', href: '/industries/manufacturing/electronics-manufacturing' },
      { id: 'food-beverage', label: 'Food and Beverage', href: '/industries/manufacturing/food-beverage' },
    ],
  },

  // 12. MEDIA AND ENTERTAINMENT
  {
    id: 'media',
    label: 'Media & Entertainment',
    icon: <Film className="size-[16px]" />,
    ctaText: 'Media',
    segments: [
      { name: 'Broadcasting', href: '/industries/media/broadcasting' },
      { name: 'Publishing & Print', href: '/industries/media/publishing' },
      { name: 'Gaming & Esports', href: '/industries/media/gaming' },
      { name: 'Streaming Services', href: '/industries/media/streaming' },
      { name: 'Film & TV Production', href: '/industries/media/production' },
      { name: 'Music Industry', href: '/industries/media/music' },
      { name: 'Digital Media', href: '/industries/media/digital' },
      { name: 'Social Media Platforms', href: '/industries/media/social' },
    ],
    popularTopics: ['OTT Platforms', 'Content Creation', 'Creator Economy', 'Metaverse', 'Web3'],
    subcategories: [
      { id: 'broadcasting', label: 'Broadcasting', href: '/industries/media/broadcasting' },
      { id: 'publishing', label: 'Publishing', href: '/industries/media/publishing' },
      { id: 'gaming', label: 'Gaming', href: '/industries/media/gaming' },
      { id: 'streaming', label: 'Streaming Services', href: '/industries/media/streaming' },
    ],
  },

  // 13. REAL ESTATE AND CONSTRUCTION
  {
    id: 'real-estate',
    label: 'Real Estate & Construction',
    icon: <Home className="size-[16px]" />,
    ctaText: 'Real Estate',
    segments: [
      { name: 'Commercial Real Estate', href: '/industries/real-estate/commercial' },
      { name: 'Residential Real Estate', href: '/industries/real-estate/residential' },
      { name: 'Property Management', href: '/industries/real-estate/management' },
      { name: 'Real Estate Investment', href: '/industries/real-estate/investment' },
      { name: 'PropTech Solutions', href: '/industries/real-estate/proptech' },
      { name: 'Construction Services', href: '/industries/real-estate/construction' },
      { name: 'Architecture & Design', href: '/industries/real-estate/architecture' },
      { name: 'Facilities Management', href: '/industries/real-estate/facilities' },
    ],
    popularTopics: ['PropTech', 'Smart Buildings', 'Co-working Spaces', 'Green Real Estate', 'REITs'],
    subcategories: [
      { id: 'commercial-real-estate', label: 'Commercial Real Estate', href: '/industries/real-estate/commercial-real-estate' },
      { id: 'residential-real-estate', label: 'Residential Real Estate', href: '/industries/real-estate/residential-real-estate' },
      { id: 'construction', label: 'Construction', href: '/industries/real-estate/construction' },
    ],
  },

  // 14. TECHNOLOGY AND TELECOMMUNICATIONS
  {
    id: 'technology',
    label: 'Technology & Telecom',
    icon: <Cpu className="size-[16px]" />,
    ctaText: 'Technology',
    segments: [
      { name: 'Software & SaaS', href: '/industries/technology/software' },
      { name: 'Hardware & Semiconductors', href: '/industries/technology/hardware' },
      { name: 'Telecommunications', href: '/industries/technology/telecom' },
      { name: 'Cloud Services', href: '/industries/technology/cloud' },
      { name: 'AI & Machine Learning', href: '/industries/technology/ai' },
      { name: 'IoT Solutions', href: '/industries/technology/iot' },
      { name: '5G Technology', href: '/industries/technology/5g' },
      { name: 'Data Centers', href: '/industries/technology/data-centers' },
      { name: 'Cybersecurity Software', href: '/industries/technology/security' },
      { name: 'Enterprise Software', href: '/industries/technology/enterprise' },
    ],
    popularTopics: ['AI & ML', 'Cloud Computing', '5G Networks', 'Edge Computing', 'Quantum Computing'],
    subcategories: [
      { id: 'software', label: 'Software and SaaS', href: '/industries/technology/software' },
      { id: 'hardware', label: 'Hardware', href: '/industries/technology/hardware' },
      { id: 'telecommunications', label: 'Telecommunications', href: '/industries/technology/telecommunications' },
      { id: 'cloud-services', label: 'Cloud Services', href: '/industries/technology/cloud-services' },
    ],
  },
];