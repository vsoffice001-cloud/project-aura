import { Button } from '../../design-system/components/Button';

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#fcfcfc] via-white to-[#f5f5fd] overflow-hidden">
        <div className="nav-container py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#806ce0]/10 to-[#b01f24]/10 rounded-full border border-[rgba(128,108,224,0.2)]">
                <span className="font-nav text-[12px] font-medium text-[#806ce0]">Industry Leading Research</span>
              </div>
              <h1 className="font-nav text-[48px] md:text-[64px] leading-[1.1] font-bold text-[#141016]">Transform Your Business with Data-Driven Insights</h1>
              <p className="font-nav text-[18px] leading-[28px] text-[#656565]">Access comprehensive market research, industry reports, and expert consulting services across 500+ industries worldwide.</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="brand" size="lg">Explore Reports</Button>
                <Button variant="secondary" size="lg">Book a Call</Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1758518726775-70e538b0d46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDIzNzAwOXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Business team" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141016]/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-[16px] shadow-xl p-6 border border-[rgba(20,16,22,0.1)]">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-[#806ce0] to-[#b01f24] flex items-center justify-center">
                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="font-nav text-[24px] font-bold text-[#141016]">10 Lac+</div>
                    <div className="font-nav text-[12px] text-[#656565]">Reports Published</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#141016] py-16">
        <div className="nav-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center"><div className="font-nav text-[40px] font-bold text-white mb-2">500+</div><div className="font-nav text-[14px] text-[#fcfcfc]/70">Industries Covered</div></div>
            <div className="text-center"><div className="font-nav text-[40px] font-bold text-white mb-2">10 Lac+</div><div className="font-nav text-[14px] text-[#fcfcfc]/70">Research Reports</div></div>
            <div className="text-center"><div className="font-nav text-[40px] font-bold text-white mb-2">150+</div><div className="font-nav text-[14px] text-[#fcfcfc]/70">Countries Analyzed</div></div>
            <div className="text-center"><div className="font-nav text-[40px] font-bold text-white mb-2">25 Years</div><div className="font-nav text-[14px] text-[#fcfcfc]/70">Industry Experience</div></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="nav-container">
          <div className="text-center mb-16">
            <h2 className="font-nav text-[40px] font-bold text-[#141016] mb-4">Why Choose Ken Research</h2>
            <p className="font-nav text-[18px] text-[#656565] max-w-2xl mx-auto">We provide comprehensive market intelligence and strategic insights to help businesses make informed decisions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-[16px] bg-[#fcfcfc] border border-[rgba(20,16,22,0.1)] hover:border-[#806ce0] hover:shadow-[0px_4px_24px_0px_rgba(128,108,224,0.15)] transition-all duration-300">
              <div className="size-16 rounded-[12px] bg-gradient-to-br from-[#806ce0]/10 to-[#b01f24]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="size-8 text-[#806ce0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 11-6.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 016.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <h3 className="font-nav text-[20px] font-bold text-[#141016] mb-3">Comprehensive Coverage</h3>
              <p className="font-nav text-[14px] leading-[22px] text-[#656565]">Access research across 500+ industries with in-depth analysis and market trends.</p>
            </div>
            <div className="group p-8 rounded-[16px] bg-[#fcfcfc] border border-[rgba(20,16,22,0.1)] hover:border-[#806ce0] hover:shadow-[0px_4px_24px_0px_rgba(128,108,224,0.15)] transition-all duration-300">
              <div className="size-16 rounded-[12px] bg-gradient-to-br from-[#806ce0]/10 to-[#b01f24]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="size-8 text-[#806ce0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="font-nav text-[20px] font-bold text-[#141016] mb-3">Expert Insights</h3>
              <p className="font-nav text-[14px] leading-[22px] text-[#656565]">Our team of analysts brings decades of experience across diverse sectors.</p>
            </div>
            <div className="group p-8 rounded-[16px] bg-[#fcfcfc] border border-[rgba(20,16,22,0.1)] hover:border-[#806ce0] hover:shadow-[0px_4px_24px_0px_rgba(128,108,224,0.15)] transition-all duration-300">
              <div className="size-16 rounded-[12px] bg-gradient-to-br from-[#806ce0]/10 to-[#b01f24]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="size-8 text-[#806ce0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <h3 className="font-nav text-[20px] font-bold text-[#141016] mb-3">Custom Research</h3>
              <p className="font-nav text-[14px] leading-[22px] text-[#656565]">Tailored research solutions designed specifically for your business needs.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}