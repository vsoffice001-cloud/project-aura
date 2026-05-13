/**
 * Testimonials — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    3-column testimonial cards + infinite marquee trust logo bar
 * WHY:     Social proof — enterprise credibility through named client testimonials and brand logos
 * WHERE:   Report Store home mode — after ExploreByRegion
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes Card + editorial serif heading + star ratings + marquee animation
 *
 * Assets: imports trust logos via figma:asset scheme
 * Props: none (self-contained)
 */
import { Star, Quote } from "lucide-react";
import { Card } from "./Card";

import logoAdidas from "figma:asset/eb66352c183d8f9a1ef5f4756319cb131b68e656.png";
import logoBMW from "figma:asset/59953b104ee437e2b40c594a63747b9b4e40c3f3.png";
import logoFlipkart from "figma:asset/eb77ec380e95e3f0b824c822166c1e25a2c92631.png";
import logoSamsung from "figma:asset/bad19127b45e3248aa2b0db9af3a98bcc3617113.png";
import logoLogitech from "figma:asset/09a289ea3dba1f60f9efee3df897d5b9a3142bcd.png";
import logoBosch from "figma:asset/9fb3a750f36f8d99a7b3b2a07724c3583569ea3b.png";
import logoPwC from "figma:asset/a1d675ecb2c1e531b827d67b03e1fe077d45b2ad.png";
import logoCocaCola from "figma:asset/b99af8e0d4639728a48526d0b526184b808946a4.png";
import logoCisco from "figma:asset/76ee27ef253484ce984d0997b96bc92c01d2de56.png";
import logoDeloitte from "figma:asset/9c2d346a0db9e0956dedff77647197faa857bdc4.png";

export function Testimonials() {
  const testimonials = [
    { name: "Rajesh Kumar", role: "VP Strategy", company: "Reliance Industries", text: "Ken Research's healthcare reports have been instrumental in our strategic planning. The depth of analysis and accuracy of projections are unmatched in the industry.", rating: 5 },
    { name: "Sarah Al-Mazrouei", role: "Head of Research", company: "ADNOC", text: "We rely on Ken Research for our energy sector intelligence. Their GCC coverage is the most comprehensive available in the market today.", rating: 5 },
    { name: "David Chen", role: "Partner", company: "McKinsey & Company", text: "The data quality and timeliness of Ken Research reports consistently exceed our expectations. A trusted resource for our consulting engagements.", rating: 5 },
  ];

  const trustLogos: { name: string; src: string; height: string }[] = [
    { name: "Adidas", src: logoAdidas, height: "28px" },
    { name: "BMW", src: logoBMW, height: "36px" },
    { name: "Flipkart", src: logoFlipkart, height: "24px" },
    { name: "Samsung", src: logoSamsung, height: "22px" },
    { name: "Logitech", src: logoLogitech, height: "20px" },
    { name: "Bosch", src: logoBosch, height: "26px" },
    { name: "PwC", src: logoPwC, height: "28px" },
    { name: "Coca-Cola", src: logoCocaCola, height: "24px" },
    { name: "Cisco", src: logoCisco, height: "30px" },
    { name: "Deloitte", src: logoDeloitte, height: "22px" },
  ];

  // Duplicate logos for seamless loop
  const marqueeLogos = [...trustLogos, ...trustLogos];

  return (
    <div>
      {/* Section heading — centered, editorial serif */}
      <div className="mb-8 md:mb-10 text-center">
        <div className="flex items-center justify-center">
          <div className="max-w-lg">
            <h2
              className="leading-[1.15] tracking-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 'var(--font-weight-light)' as any,
                fontSize: "clamp(1.25rem, 3.5vw, var(--text-2xl))",
              }}
            >
              Trusted by Industry Leaders
            </h2>
            <p
              className="text-black/50 mt-3 leading-[1.7] mx-auto"
              style={{ fontSize: "var(--text-sm)" }}
            >
              Join 50,000+ professionals who rely on our research for strategic decision-making
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial cards — white on warm bg */}
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <Card
            key={i}
            hover
            className="relative flex flex-col"
            style={{ padding: '16px' }}
          >
            <Quote
              className="h-6 w-6 absolute top-4 right-4"
              style={{ color: "var(--black-200)" }}
            />
            <div className="flex gap-0.5 mb-2.5">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star
                  key={j}
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--amber-500)", fill: "var(--amber-500)" }}
                />
              ))}
            </div>
            <p
              className="text-black/60 mb-5 leading-relaxed flex-1"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "var(--text-nav)",
              }}
            >
              &ldquo;{t.text}&rdquo;
            </p>
            <div
              className="flex items-center gap-3 pt-3 mt-auto"
              style={{ borderTop: "1px solid var(--black-200)" }}
            >
              <div
                className="w-9 h-9 rounded-full text-black/50 flex items-center justify-center flex-shrink-0"
                style={{
                  fontSize: "var(--text-xs)",
                  background: "var(--warm-300)",
                  border: "1px solid var(--warm-500)",
                }}
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <p
                  className="text-black/80 truncate"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-black/40 truncate"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust logos bar */}
      <div
        className="mt-10 pt-8 flex flex-col items-center gap-5"
        style={{ borderTop: "1px solid var(--black-200)" }}
      >
        <span
          className="uppercase tracking-widest text-black/25"
          style={{ fontSize: "var(--badge-xs-font)", letterSpacing: "2.5px" }}
        >
          Trusted by leading organizations worldwide
        </span>
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="flex items-center gap-x-12 w-max animate-[marquee_25s_linear_infinite]"
            style={{ willChange: 'transform' }}
          >
            {marqueeLogos.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="inline-flex items-center select-none whitespace-nowrap grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: logo.height, width: 'auto', mixBlendMode: 'multiply' }}
                draggable={false}
              />
            </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
