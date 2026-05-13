export interface CaseStudyContent {
  title: string;
  subtitle: string;
  dealSize: string;
  sector: string;
  year: string;
  role: string;
  status: string;
  thesis: string;
  challenges: { number: string; title: string; questions: string[] }[];
  objectives: { number: string; title: string; description: string }[];
  methodology: { number: string; title: string; description: string }[];
  impact: { value: string; label: string; description: string }[];
  endorsement: { quote: string; author: string; role: string };
  phases: { label: string; title: string; description: string }[];
}

export const caseStudyContent: CaseStudyContent = {
  title: "Evaluating India's Transformer Bushing Market",
  subtitle: "IPO Readiness — ₹110 Cr Market Diagnostic",
  dealSize: "₹110 Cr",
  sector: "Industrials · Power T&D",
  year: "2026",
  role: "Strategic Advisor",
  status: "Closed",
  thesis: "A voltage-wise, application-wise diagnostic of India's transformer bushing market, translating fragmented sector data into an investor-ready narrative for IPO positioning.",
  challenges: [
    { number: "01", title: "Market Visibility Gaps", questions: ["What is the actual size of the Indian transformer bushing market?", "How much is addressable by the client today?", "Which segments represent the highest-value opportunities?"] },
    { number: "02", title: "Competitive Blind Spots", questions: ["How does Yash's portfolio compare with competitors?", "What differentiated the fastest-growing players?", "Where are the white spaces in product range?"] },
    { number: "03", title: "Supply Chain Risks", questions: ["What percentage depends on imports vs domestic production?", "Which suppliers pose pricing or lead-time risks?", "What are the procurement bottlenecks?"] },
    { number: "04", title: "Investor Narrative Weakness", questions: ["How to articulate market opportunity clearly?", "Which growth levers matter to stakeholders?", "What pathways justify capacity expansion?"] },
  ],
  objectives: [
    { number: "01", title: "Build a High-Resolution TAM–SAM–SOM Model", description: "Develop a voltage-wise, application-wise, and customer cluster-wise mapping of the transformer bushing market, grounded in primary interviews, utility procurement cycles, and OEM expansion plans." },
    { number: "02", title: "Construct a Competitor Intelligence System", description: "Evaluate 10+ manufacturers (domestic and international) on product depth, price competitiveness, certifications, reliability KPIs, and strategic differentiators." },
    { number: "03", title: "Conduct a Supply Chain & Import Dependency Audit", description: "Analyze sourcing flows for key ceramic, condenser, and insulation components; benchmark supplier ecosystems; assess risks and cost levers." },
    { number: "04", title: "Deliver an Investor-Ready Strategic Narrative", description: "Translate insights into a growth story that strengthens valuation logic and provides a credible roadmap for capacity planning and market penetration." },
  ],
  methodology: [
    { number: "01", title: "Function-Level Integration Mapping", description: "Conducted comprehensive mapping across Finance, HR, Supply Chain, Sales, Quality, and Regulatory Affairs. Identified cultural, process, and compliance gaps between entities. Developed harmonization pathways aligned with governance standards." },
    { number: "02", title: "SOP & Risk Practice Benchmarking", description: "Benchmarked existing SOPs, audit findings, risk controls, and compliance mechanisms against governance standards. Highlighted high-priority remediation areas and designed a unified compliance framework." },
    { number: "03", title: "SEBI Compliance Support", description: "Developed a comprehensive IPO readiness report aligned with SEBI disclosure requirements. Built investor inputs across market potential, business strengths, risk factors, and long-term opportunity mapping." },
  ],
  impact: [
    { value: "₹110 Cr", label: "Total Addressable Market", description: "Sell-side positioning achieved for transformer bushing market evaluation" },
    { value: "₹68 Cr", label: "Serviceable Market Opportunity", description: "Identified high-voltage segment opportunity with competitive positioning insights" },
    { value: "3.2x", label: "Market Growth Potential", description: "Projected expansion driven by grid modernization and renewable energy integration" },
    { value: "15%", label: "Market Share Target", description: "Strategic positioning identified through competitive benchmarking and gap analysis" },
  ],
  endorsement: {
    quote: "The diagnostic reframed how we see our own market. The IPO narrative now stands on data we trust and can defend in front of any investor.",
    author: "Leadership Team",
    role: "Yash Highvoltage Ltd.",
  },
  phases: [
    { label: "Phase 01", title: "Mandate", description: "Scoping meetings; defined deliverables and IPO timeline anchors." },
    { label: "Phase 02", title: "Primary Research", description: "30+ expert interviews across utilities, OEMs, and component suppliers." },
    { label: "Phase 03", title: "Diagnostic", description: "TAM-SAM-SOM modeled voltage-wise; competitor matrix built across 10 players." },
    { label: "Phase 04", title: "Narrative", description: "Investor-ready story assembled; SEBI disclosure structure validated." },
    { label: "Phase 05", title: "Close", description: "IPO readiness report delivered; positioning defended in investor pre-reads." },
  ],
};
