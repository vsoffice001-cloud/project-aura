import {
  TrendUp,
  MapPin,
  Leaf,
  Buildings,
} from "@phosphor-icons/react";
import { StatCard } from "@/app/components/ui/stat-card";
import { OverheadText } from "@/app/components/ui/overhead-text";
import { SectionHeader } from "@/app/components/ui/section-header";
import { TextCard } from "@/app/components/ui/text-card";
import { TimelineCard } from "@/app/components/ui/timeline-card";
import { BodyText } from "@/app/components/ui/body-text";

export function MarketOverview() {
  return (
    <section
      id="market-overview"
      className="py-24 lg:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden"
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--pattern-opacity)",
          backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
          backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`,
        }}
      ></div>

      <div className="max-w-[var(--content-max-width)] mx-auto relative">
        <div className="px-[84.375px] lg:px-[112.5px]">
          <div className="mb-2">
            <OverheadText>CHAPTER 1 - INDUSTRY ANALYSIS</OverheadText>
          </div>
          <SectionHeader>Qatar Fresh Herbs Market Overview</SectionHeader>

          {/* Paragraphs */}
          <BodyText spacing="first">
            The Qatar Fresh Herbs Market is valued at $150
            million, based on a five-year historical analysis.
            This growth is primarily driven by increasing
            consumer demand for fresh and organic produce,
            coupled with a rising trend in healthy eating and
            culinary experimentation. The market has seen a
            significant uptick in the consumption of fresh
            herbs, which are integral to traditional Qatari
            cuisine and modern culinary practices.
          </BodyText>
          <BodyText>
            Doha is the dominant city in the Qatar Fresh Herbs
            Market, primarily due to its status as the capital
            and largest city, which houses a significant
            population and a variety of restaurants and food
            establishments. Additionally, the city's strategic
            location and infrastructure support the efficient
            distribution of fresh herbs, making it a hub for
            both local and imported products.
          </BodyText>
          <BodyText>
            In 2023, the Qatari government implemented
            regulations to promote sustainable agriculture
            practices, including the use of organic farming
            methods for herb cultivation. This initiative aims
            to enhance food security and reduce reliance on
            imports, encouraging local farmers to adopt
            environmentally friendly practices while meeting the
            growing demand for fresh herbs.
          </BodyText>
          <BodyText>
            The market is characterized by a growing preference
            for locally sourced produce, driven by consumer
            awareness about food miles and carbon footprint.
            Qatar's Vision 2030 includes specific provisions for
            agricultural self-sufficiency, which directly
            impacts the fresh herbs sector through increased
            investment in controlled environment agriculture
            (CEA) and modern farming techniques.
          </BodyText>

          {/* Key Stats Grid - KP 2.0 Compliant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <StatCard
              icon={<TrendUp weight="regular" />}
              label="Market Value"
              value="$150 Mn"
              subtitle="2024 Estimate"
            />

            <StatCard
              icon={<MapPin weight="regular" />}
              label="Dominant City"
              value="Doha"
              subtitle="78% Market Share"
            />

            <StatCard
              icon={<Leaf weight="regular" />}
              label="Organic Growth"
              value="15% YoY"
              subtitle="Fastest Segment"
            />

            <StatCard
              icon={<Buildings weight="regular" />}
              label="Key Players"
              value="15+"
              subtitle="Active Companies"
            />
          </div>

          {/* Future Outlook Card - KP 2.0 Compliant */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <TextCard
              title="Future Outlook"
              paragraphs={[
                "The future of the Qatar fresh herbs market appears promising, driven by increasing health consciousness and a growing preference for organic produce. As culinary tourism expands, local producers are likely to innovate and diversify their offerings.",
                "Advancements in agricultural technology, such as hydroponics and vertical farming, will enhance local production capabilities. The government's support for sustainable practices will further bolster the market."
              ]}
              stats={[
                { value: "6.0%", label: "Forecast CAGR", isPrimary: true },
                { value: "$213 Mn", label: "2030 Projection" }
              ]}
              className="lg:col-span-2"
            />
          </div>

          {/* Timeline/Period Info Grid - KP 2.0 Compliant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            <TimelineCard label="Base Year" value="2024" />
            <TimelineCard label="Historical Period" value="2019-2024" />
            <TimelineCard label="Forecast Period" value="2025-2030" />
            <TimelineCard label="Historical CAGR" value="4.6%" />
          </div>
        </div>
      </div>
    </section>
  );
}