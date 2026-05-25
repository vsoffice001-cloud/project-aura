/**
 * SOURCES_REGISTRY · centralized mock citations for v0.4 PDP.
 *
 * @what  Lookup table of 25 realistic Australia cold-chain sources covering
 *        primary (Ken field work) · secondary (ABS · ASX · trade bodies) ·
 *        derived (Ken forecast model outputs).
 *
 * @why   Section components reference by ID · never inline source strings.
 *        Single edit point when CMS provides real values · zero string
 *        duplication risk across sections · tech team sees full provenance graph.
 *
 * @when  Import as `SOURCES_REGISTRY` · look up via `getSource(id)` helper ·
 *        pass array to `<SourceCluster>` molecule.
 *
 * @how   Each citation is one SourceCitation object. Backend CMS will mirror
 *        this shape per chart/stat. Replace mock w/ API fetch when ready.
 *
 * Naming convention for ids: `<org-lowercase>-<short-title>-<year>`
 *   - `abs-warehousing-2023`
 *   - `lineage-investor-day-2024`
 *   - `ken-primary-coldchain-2024`
 *   - `ken-forecast-coldchain-2025`
 */

import type { SourceCitation } from './types/sources';

export const SOURCES_REGISTRY: Record<string, SourceCitation> = {
  // ─── KEN PRIMARY · proprietary field research ──────────────────────
  'ken-primary-coldchain-2024': {
    id: 'ken-primary-coldchain-2024',
    tier: 'primary',
    org: 'Ken Primary',
    title: 'Australia Cold Chain Operator Survey',
    year: 2024,
    period: 'Q3–Q4',
    internalNote: '30+ CATI interviews · Tier-1 + Tier-2 operators · pricing · occupancy · capacity disclosed under NDA',
  },
  'ken-primary-consolidation-2024': {
    id: 'ken-primary-consolidation-2024',
    tier: 'primary',
    org: 'Ken Primary',
    title: 'Player Consolidation Analysis',
    year: 2024,
    internalNote: 'Share-of-market computed from operator-disclosed pallet capacity · cross-validated w/ ASX filings',
  },
  'ken-primary-segment-2024': {
    id: 'ken-primary-segment-2024',
    tier: 'primary',
    org: 'Ken Primary',
    title: 'Storage vs Transport Segment Survey',
    year: 2024,
    internalNote: 'Per-segment revenue split derived from 30+ operator P&Ls under NDA · cross-validated w/ ABS data',
  },
  'ken-primary-pharma-2024': {
    id: 'ken-primary-pharma-2024',
    tier: 'primary',
    org: 'Ken Primary',
    title: 'Pharma Cold-Chain Demand Study',
    year: 2024,
    internalNote: '12 pharma + biologics distributors · TGA-compliant route analysis · vaccine + biologic cold-chain segments',
  },

  // ─── SECONDARY · government, trade bodies, public filings ───────────
  'abs-warehousing-2023': {
    id: 'abs-warehousing-2023',
    tier: 'secondary',
    org: 'ABS',
    title: 'Cat. 8731 Refrigerated Warehousing Census',
    year: 2023,
    url: 'https://www.abs.gov.au/statistics',
    internalNote: 'Australian Bureau of Statistics refrigerated warehousing capacity + employment census · biennial',
  },
  'abs-freight-2024': {
    id: 'abs-freight-2024',
    tier: 'secondary',
    org: 'ABS',
    title: 'Freight Movement Survey · Refrigerated',
    year: 2024,
    url: 'https://www.abs.gov.au/statistics',
    internalNote: 'Refrigerated freight tonne-km · domestic + export · annual',
  },
  'rwta-directory-2024': {
    id: 'rwta-directory-2024',
    tier: 'secondary',
    org: 'RWTA',
    title: 'Member Directory + Capacity Index',
    year: 2024,
    url: 'https://www.rwta.com.au',
    internalNote: 'Refrigerated Warehouse & Transport Association of Australia · 200+ member directory · annual',
  },
  'afcc-standards-2023': {
    id: 'afcc-standards-2023',
    tier: 'secondary',
    org: 'AFCC',
    title: 'Cold-Chain Code of Practice',
    year: 2023,
    url: 'https://www.afcca.com.au',
    internalNote: 'Australian Food Cold-Chain Council standards · referenced by all major operators',
  },
  'tga-cold-chain-2023': {
    id: 'tga-cold-chain-2023',
    tier: 'secondary',
    org: 'TGA',
    title: 'Cold-Chain Guideline · Pharma + Biologics',
    year: 2023,
    url: 'https://www.tga.gov.au',
    internalNote: 'Therapeutic Goods Administration · pharma cold-chain compliance · drives premium pharma logistics demand',
  },
  'lineage-investor-day-2024': {
    id: 'lineage-investor-day-2024',
    tier: 'secondary',
    org: 'Lineage Logistics',
    title: 'Investor Day Presentation',
    year: 2024,
    url: 'https://ir.onelineage.com',
    internalNote: 'NASDAQ:LINE IR disclosures · Australia pallet count + expansion pipeline · 2024-2026 plans',
  },
  'americold-10k-2023': {
    id: 'americold-10k-2023',
    tier: 'secondary',
    org: 'Americold Realty Trust',
    title: 'Annual Report 10-K · ANZ segment',
    year: 2023,
    url: 'https://ir.americold.com',
    internalNote: 'NYSE:COLD SEC filing · ANZ segment revenue + capacity disclosures',
  },
  'newcold-website-2024': {
    id: 'newcold-website-2024',
    tier: 'secondary',
    org: 'NewCold',
    title: 'Australian Operations Capacity Disclosure',
    year: 2024,
    url: 'https://www.newcold.com',
    internalNote: 'Public corporate site · Melbourne + Truganina facility pallet capacities',
  },
  'coles-fy25h1-2025': {
    id: 'coles-fy25h1-2025',
    tier: 'secondary',
    org: 'Coles Group',
    title: 'FY25 H1 Results · Logistics Capex',
    year: 2025,
    url: 'https://www.colesgroup.com.au/investors',
    internalNote: 'ASX:COL · refrigerated DC capex + e-grocery fulfillment capacity additions',
  },
  'woolworths-fy24-2024': {
    id: 'woolworths-fy24-2024',
    tier: 'secondary',
    org: 'Woolworths Group',
    title: 'FY24 Annual Report · Primary Connect',
    year: 2024,
    url: 'https://www.woolworthsgroup.com.au/investors',
    internalNote: 'ASX:WOW · Primary Connect refrigerated logistics arm · capacity + automation roadmap',
  },
  'linfox-mediarelease-2024': {
    id: 'linfox-mediarelease-2024',
    tier: 'secondary',
    org: 'Linfox',
    title: 'EV Refrigerated Fleet Commitment',
    year: 2024,
    url: 'https://www.linfox.com/news',
    internalNote: 'Linfox + Toll media release · AUD 280 Mn EV reefer fleet by 2027',
  },
  'mla-redmeat-2024': {
    id: 'mla-redmeat-2024',
    tier: 'secondary',
    org: 'Meat & Livestock Australia',
    title: 'Red Meat Industry Statistics',
    year: 2024,
    url: 'https://www.mla.com.au',
    internalNote: 'Cold-storage demand from beef + lamb processors · annual industry report',
  },
  'dairy-australia-2024': {
    id: 'dairy-australia-2024',
    tier: 'secondary',
    org: 'Dairy Australia',
    title: 'Dairy Cold-Chain Outlook',
    year: 2024,
    url: 'https://www.dairyaustralia.com.au',
    internalNote: 'Refrigerated dairy logistics demand · export + domestic',
  },
  'ibisworld-i5301-2024': {
    id: 'ibisworld-i5301-2024',
    tier: 'secondary',
    org: 'IBISWorld',
    title: 'I5301 Refrigerated Storage in Australia',
    year: 2024,
    url: 'https://www.ibisworld.com',
    internalNote: 'Industry profile · revenue + 5-yr historic + concentration index',
  },
  'accc-grocerysupply-2024': {
    id: 'accc-grocerysupply-2024',
    tier: 'secondary',
    org: 'ACCC',
    title: 'Grocery Supply Chain Inquiry Report',
    year: 2024,
    url: 'https://www.accc.gov.au',
    internalNote: 'Competition + Consumer Commission · supply-chain economics + supermarket DC analysis',
  },

  // ─── DERIVED · Ken proprietary model outputs ────────────────────────
  'ken-forecast-coldchain-2025': {
    id: 'ken-forecast-coldchain-2025',
    tier: 'derived',
    org: 'Ken Forecast Model',
    title: 'Australia Cold Chain 5-yr Forecast',
    year: 2025,
    internalNote: 'Regression + moving average + primary research + analyst judgment · SPSS outputs rejected (false COVID signal) per PRD',
    derivedFrom: [
      'ken-primary-coldchain-2024',
      'abs-warehousing-2023',
      'lineage-investor-day-2024',
      'americold-10k-2023',
    ],
  },
  'ken-forecast-segment-2025': {
    id: 'ken-forecast-segment-2025',
    tier: 'derived',
    org: 'Ken Forecast Model',
    title: 'Storage + Transport Segment Forecast',
    year: 2025,
    internalNote: 'Per-segment 5-yr forecast · disaggregated from blended market model',
    derivedFrom: [
      'ken-primary-segment-2024',
      'abs-freight-2024',
      'ibisworld-i5301-2024',
    ],
  },
  'ken-cagr-historical-2024': {
    id: 'ken-cagr-historical-2024',
    tier: 'derived',
    org: 'Ken Analysis',
    title: 'Historical CAGR 2017–2022',
    year: 2024,
    internalNote: 'Compounded growth rate computed from ABS census anchor years + Ken Primary cross-validation',
    derivedFrom: ['abs-warehousing-2023', 'ken-primary-coldchain-2024'],
  },
  'ken-phase-classification-2024': {
    id: 'ken-phase-classification-2024',
    tier: 'derived',
    org: 'Ken Analysis',
    title: 'Market Phase Classification',
    year: 2024,
    internalNote: 'Pre-COVID / COVID / Recovery / Forecast phase tags · analyst judgment based on growth-rate inflection + qualitative drivers',
    derivedFrom: ['ken-primary-coldchain-2024'],
  },
  'ken-interpolation-2024': {
    id: 'ken-interpolation-2024',
    tier: 'derived',
    org: 'Ken Analysis',
    title: 'Annual Interpolation · 2018–2021 + 2023–2026',
    year: 2024,
    internalNote: 'Intermediate years compounded at observed (9.1%) and forecast (10.3%) CAGR from anchor years',
    derivedFrom: ['ken-cagr-historical-2024', 'ken-forecast-coldchain-2025'],
  },

  // ─── COMPETITOR (§14) ───────────────────────────────────────────
  'ibisworld-competitor-2024': {
    id: 'ibisworld-competitor-2024',
    tier: 'secondary',
    org: 'IBISWorld',
    title: 'I5301 · Major Company Market Shares',
    year: 2024,
    url: 'https://www.ibisworld.com',
    internalNote: 'Refrigerated Storage in Australia · market concentration + top-4 revenue share',
  },
  'company-filings-reefer-2024': {
    id: 'company-filings-reefer-2024',
    tier: 'secondary',
    org: 'ASX Company Filings',
    title: 'Linfox · Toll · Americold · NewCold Filings',
    year: 2024,
    internalNote: 'Fleet size + temperature range + revenue band from ASX + private company disclosures · FY23/24',
  },
  'ken-competitor-estimate-2024': {
    id: 'ken-competitor-estimate-2024',
    tier: 'derived',
    org: 'Ken Analysis',
    title: 'Competitor Landscape · Fleet & Revenue Estimates',
    year: 2024,
    internalNote: 'Ken estimate · HHI computed from primary + filing data · revenue bands for non-disclosed private cos',
    derivedFrom: ['ibisworld-competitor-2024', 'company-filings-reefer-2024', 'ken-primary-coldchain-2024'],
  },

  // ─── REGULATORY (§15) ───────────────────────────────────────────
  'fsanz-code-2024': {
    id: 'fsanz-code-2024',
    tier: 'secondary',
    org: 'FSANZ',
    title: 'Food Standards Code 3.2.2 · Temperature Control',
    year: 2024,
    url: 'https://www.foodstandards.gov.au',
    internalNote: 'Australia New Zealand Food Standards Code · Standard 3.2.2 amendment consultation open 2024 · Q2-2026 expected enforcement',
  },
  'tga-gdp-2023': {
    id: 'tga-gdp-2023',
    tier: 'secondary',
    org: 'TGA',
    title: 'Good Distribution Practice (GDP) Guidelines · Pharma Cold-Chain',
    year: 2023,
    url: 'https://www.tga.gov.au',
    internalNote: 'GDP compliance mandatory for all pharma cold-chain distributors · TGA audit program active',
  },
  'daff-biosecurity-2024': {
    id: 'daff-biosecurity-2024',
    tier: 'secondary',
    org: 'DAFF',
    title: 'Biosecurity Act 2015 · Reefer Import Protocols',
    year: 2024,
    url: 'https://www.agriculture.gov.au',
    internalNote: 'Department of Agriculture, Fisheries and Forestry · mandatory reefer container inspection + temperature logging at border',
  },
  'ken-regulatory-analysis-2024': {
    id: 'ken-regulatory-analysis-2024',
    tier: 'derived',
    org: 'Ken Analysis',
    title: 'Regulatory Compliance Cost Band Estimate',
    year: 2024,
    internalNote: 'Compliance cost band AUD 8,000–28,000 per site pa · estimated from operator interviews + HACCP certification costs',
    derivedFrom: ['fsanz-code-2024', 'tga-cold-chain-2023', 'ken-primary-coldchain-2024'],
  },

  // ─── OPPORTUNITIES (§17) ───────────────────────────────────────
  'ken-opportunity-analysis-2024': {
    id: 'ken-opportunity-analysis-2024',
    tier: 'derived',
    org: 'Ken Research',
    title: 'Australia Cold Chain Opportunity Ranking Analysis',
    year: 2024,
    internalNote: 'Impact × feasibility scoring · 7 opportunities · weighted composite score · primary + macro inputs',
    derivedFrom: ['ken-primary-coldchain-2024', 'ken-primary-pharma-2024', 'ken-forecast-coldchain-2025'],
  },
  'ken-iot-saas-sizing-2024': {
    id: 'ken-iot-saas-sizing-2024',
    tier: 'derived',
    org: 'Ken Research',
    title: 'IoT Cold-Chain Monitoring SaaS Market Sizing',
    year: 2024,
    internalNote: 'TAM derived from operator fleet + warehouse count × avg SaaS contract value · primary interview basis',
    derivedFrom: ['ken-primary-coldchain-2024', 'abs-warehousing-2023'],
  },

  // ─── MACROECONOMIC (§18) ───────────────────────────────────────
  'rba-economic-outlook-2024': {
    id: 'rba-economic-outlook-2024',
    tier: 'secondary',
    org: 'RBA',
    title: 'Statement on Monetary Policy · Economic Outlook',
    year: 2024,
    url: 'https://www.rba.gov.au/publications/smp/',
    internalNote: 'Reserve Bank of Australia · GDP · CPI · disposable income projections · quarterly publication',
  },
  'abs-household-income-2024': {
    id: 'abs-household-income-2024',
    tier: 'secondary',
    org: 'ABS',
    title: 'Cat. 6523 Household Income and Wealth',
    year: 2024,
    url: 'https://www.abs.gov.au/statistics',
    internalNote: 'Disposable income growth · real terms · household survey · biennial',
  },
  'world-bank-australia-2024': {
    id: 'world-bank-australia-2024',
    tier: 'secondary',
    org: 'World Bank',
    title: 'Australia Economic Monitor 2024',
    year: 2024,
    url: 'https://www.worldbank.org/en/country/australia',
    internalNote: 'GDP growth + trade balance + macro indicator cross-validation · annual monitor',
  },
  'ken-macro-correlation-2024': {
    id: 'ken-macro-correlation-2024',
    tier: 'derived',
    org: 'Ken Research',
    title: 'Macro–Cold-Chain Demand Correlation Analysis',
    year: 2024,
    internalNote: 'GDP correlation r=0.78 · disposable income 2Q lead-lag · r²=0.74 · SPSS + Ken model overlay',
    derivedFrom: ['rba-economic-outlook-2024', 'abs-household-income-2024', 'ken-primary-coldchain-2024'],
  },

  // ─── METHODOLOGY (§19) ─────────────────────────────────────────
  'ken-methodology-framework-2024': {
    id: 'ken-methodology-framework-2024',
    tier: 'primary',
    org: 'Ken Research',
    title: 'Research Methodology Framework · Australia Cold Chain',
    year: 2024,
    internalNote: '3-pillar methodology: primary CATI/CAPI + secondary datasets + quantitative model · 3-round validation',
  },
  'rwta-member-survey-2024': {
    id: 'rwta-member-survey-2024',
    tier: 'secondary',
    org: 'RWTA',
    title: 'Member Operator Survey · Sample Frame',
    year: 2024,
    url: 'https://www.rwta.com.au',
    internalNote: 'RWTA member directory used as primary sample frame for CATI interviews · 200+ members',
  },

  // ─── FUTURE OUTLOOK (§16) ──────────────────────────────────────
  'ken-scenario-forecast-2025': {
    id: 'ken-scenario-forecast-2025',
    tier: 'derived',
    org: 'Ken Forecast Model',
    title: 'Scenario Fan · Bear / Base / Bull 2022–2027',
    year: 2025,
    internalNote: 'Three-scenario model · bear (7.1% CAGR) · base (10.3%) · bull (13.8%) · Monte Carlo + analyst judgment overlay',
    derivedFrom: ['ken-forecast-coldchain-2025', 'ken-primary-coldchain-2024'],
  },
  'industry-macro-forecast-2025': {
    id: 'industry-macro-forecast-2025',
    tier: 'secondary',
    org: 'Oxford Economics',
    title: 'Australia Economic Outlook 2025–2030',
    year: 2025,
    url: 'https://www.oxfordeconomics.com',
    internalNote: 'Macro GDP + consumer spend + export trade projections · underpins cold-chain demand scenarios',
  },

  // ─── KEN FRAMEWORK · publication standards + client knowledge base ────
  'ken-framework-2024': {
    id: 'ken-framework-2024',
    tier: 'derived',
    org: 'Ken Research',
    title: 'Publication Framework · Australia Cold Chain 2022–2027',
    year: 2024,
    internalNote: 'Ken Research internal publication standard · 24-section report structure · methodological transparency guidelines · CATI field protocols',
    derivedFrom: ['ken-primary-coldchain-2024'],
  },
  'ken-client-kb-2024': {
    id: 'ken-client-kb-2024',
    tier: 'derived',
    org: 'Ken Research',
    title: 'Client Knowledge Base · Australia Research Sales Q&A',
    year: 2024,
    internalNote: 'Aggregated from 60+ pre-purchase client conversations · sales team transcripts · analyst onboarding sessions · 2023–2024',
    derivedFrom: ['ken-primary-coldchain-2024'],
  },
};

/**
 * Helper · safely retrieve citation by id w/ fallback warning.
 * Use this in section components instead of direct registry access.
 */
export function getSource(id: string): SourceCitation {
  const citation = SOURCES_REGISTRY[id];
  if (!citation) {
    // Dev-only warning · won't crash render · sentinel returned
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`[sources] missing citation id: "${id}" — falling back to placeholder`);
    }
    return {
      id,
      tier: 'secondary',
      org: 'Unknown Source',
      year: new Date().getFullYear(),
      internalNote: `Missing citation · update SOURCES_REGISTRY in src/lib/sources.ts`,
    };
  }
  return citation;
}

/**
 * Helper · retrieve multiple citations by id array (common in chart captions).
 */
export function getSources(ids: string[]): SourceCitation[] {
  return ids.map(getSource);
}
