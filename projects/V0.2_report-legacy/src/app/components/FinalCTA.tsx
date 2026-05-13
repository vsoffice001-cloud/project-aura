import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--pattern-opacity)',
          backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
          backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-[67.5px] lg:px-[90px] relative">
        <Card className="relative bg-gradient-to-r from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)] hover:bg-gradient-to-br border-0 p-6 rounded-[var(--radius-md)] overflow-hidden shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3),0_8px_10px_-6px_rgba(176,31,36,0.2)] transition-all duration-500 hover:shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4),0_12px_15px_-6px_rgba(176,31,36,0.3)] hover:-translate-y-2">
          {/* Decorative geometric shapes */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
            <div className="absolute top-14 right-8 w-8 h-8 border border-white rounded-lg rotate-45"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 border border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border border-white rounded-full"></div>
          </div>

          <CardContent className="p-0 relative z-10">
            <h2 className="mt-2 text-[24px] leading-tight tracking-tight text-white">
              Want the full report and an analyst walkthrough?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/90">
              Unlock the complete dataset, segmentation cuts, and competitive analysis—plus a discovery call that maps insights to your go-to-market priorities.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button variant="cta" size="lg" className="bg-white text-[var(--brand-red)] hover:bg-white/95 hover:shadow-lg hover:scale-[1.02] transition-all">Download sample report</Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:text-white bg-white/20 hover:bg-transparent backdrop-blur-sm hover:scale-[1.02] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.5)]">Connect with Consultant</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}