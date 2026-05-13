import svgPaths from "@/imports/svg-oz6ytj1r6m";
import { Button } from '@/app/components/Button';
import { ContactModal } from '@/app/components/ContactModal';
import { useState } from 'react';

export function FinalCTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-black/10">
        <div className="max-w-[var(--container-narrow)] mx-auto px-4 sm:px-6 md:px-8 text-center">
          <span className="font-medium text-black/40 uppercase tracking-[3px] mb-6 md:mb-8 block" style={{ fontSize: 'var(--text-nav)' }}>Final Conversion Section</span>
          
          <h2 className="leading-[1.15] font-light text-black mb-6 md:mb-8 tracking-tight" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 5vw, var(--text-3xl))' }}>
            Ready to Unlock Strategic Insights for Your Business?
          </h2>
          
          <p className="leading-[1.7] text-black/70 mb-10 md:mb-12 max-w-[var(--container-prose)] mx-auto" style={{ fontSize: 'var(--text-base)' }}>
            Partner with our team of industry experts to transform market complexity into actionable strategy. Let's discuss how we can help you achieve your business goals.
          </p>
          
          {/* Button Combination */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            {/* Primary Button: Get Customized Report */}
            <Button
              variant="primary"
              size="lg"
              fullWidth={false}
              icon={
                <svg className="size-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 16 16">
                  <path d="M3.33333 8H12.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p1d405500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              }
              iconPosition="right"
            >
              Get Customized Report
            </Button>

            {/* Secondary Button: Book Discovery Call */}
            <Button
              variant="secondary"
              size="lg"
              fullWidth={false}
              onClick={() => setIsModalOpen(true)}
            >
              Book Discovery Call
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}