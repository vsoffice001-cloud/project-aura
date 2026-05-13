import { Headphones, FileText, Users, Clock } from "lucide-react";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { Container } from "./Container";

export function CustomResearchCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050505 0%, #0c0c0c 50%, #111 100%)' }}>
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: 'rgba(128, 108, 224, 0.05)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[150px]" style={{ background: 'rgba(195, 198, 249, 0.03)' }} />

      <Container maxWidth="content" className="relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-6">
              <span className="text-white/70" style={{ fontSize: 'var(--text-xs)' }}>Custom Research Solutions</span>
            </div>
            <h2 className="text-white mb-4 leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--font-weight-light)' as any, fontSize: 'clamp(1.5rem, 4vw, var(--text-2xl))' }}>
              Need tailored market intelligence?
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-md" style={{ fontSize: 'var(--text-sm)' }}>
              Our team of 200+ expert analysts can deliver custom research
              reports tailored to your specific business requirements. From
              market sizing to competitive benchmarking, we provide
              enterprise-grade insights.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="brand" size="md" background="dark" icon={<Headphones />} iconPosition="left">
                Request Custom Research
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FileText, value: "500+", label: "Custom Reports Delivered" },
              { icon: Users, value: "200+", label: "Expert Analysts" },
              { icon: Clock, value: "2-4 wks", label: "Avg. Delivery Time" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="p-4 sm:p-5 bg-white/[0.04] border border-white/[0.06] text-center hover:border-white/[0.12] transition-all group" style={{ borderRadius: 'var(--rc-radius-card)' }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/[0.06] flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-white/[0.1] transition-colors" style={{ borderRadius: 'var(--radius-element)' }}>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
                <p className="text-white mb-0.5 sm:mb-1 tabular-nums" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--font-weight-light)' as any, fontSize: 'var(--text-base)' }}>
                  {value}
                </p>
                <p className="text-white/40 leading-tight" style={{ fontSize: 'var(--text-2xs)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}