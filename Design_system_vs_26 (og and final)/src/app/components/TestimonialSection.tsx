import { Star } from 'lucide-react';

export function TestimonialSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-black/10">
      <div className="max-w-[var(--container-narrow)] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="font-medium text-black/40 uppercase tracking-[3px] mb-6 md:mb-8 block" style={{ fontSize: 'var(--text-nav)' }}>
            Client Endorsement
          </span>
        </div>

        {/* Testimonial Content */}
        <div 
          className="max-w-[var(--container-narrow)] p-6 sm:p-8 md:p-10 rounded-[10px] transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--white)',
            border: '1px solid var(--black-200)',
            boxShadow: '0 4px 20px rgba(195, 198, 249, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="h-px w-16 md:w-24 bg-black/20 mb-8 md:mb-12"></div>
          
          <p className="leading-[1.6] text-black mb-8 md:mb-10 font-light italic" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2.5vw, var(--text-lg))' }}>
            "Ken Research helped us quantify our addressable opportunity, build a sharper product strategy, and clearly articulate our competitive strengths. Their analysis played a key role in our next-stage discussions with investors."
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-1 text-black/70" style={{ fontSize: 'var(--text-xs)' }}>
              <span className="font-medium text-black">Director, Yash Highvoltage Insulators</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <span className="font-medium text-black/70" style={{ fontSize: 'var(--text-xs)' }}>4.97 / 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}