import { Sparkles, Globe, Calendar, FileText, User, Hash, Download, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/app/components/ui/button';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in video after load
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.style.opacity = '1';
      }
    }, 500);

    // Floating animation loop
    let frame = 0;
    const animate = () => {
      frame += 0.01;
      
      if (orb1Ref.current) {
        const x = Math.sin(frame) * 30;
        orb1Ref.current.style.transform = `translateX(${x}px)`;
      }
      
      if (orb2Ref.current) {
        const x = Math.cos(frame) * 30;
        orb2Ref.current.style.transform = `translateX(${x}px)`;
      }
      
      if (scrollRef.current) {
        const y = Math.sin(frame * 2) * 3;
        scrollRef.current.style.transform = `translateY(${y}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[55vh] lg:min-h-[60vh] flex items-center">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: 0 }}
        >
          <source src="https://videos.pexels.com/video-files/2547127/2547127-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlays - Exact HTML structure */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating orbs */}
        <div 
          ref={orb1Ref}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[128px]"
        ></div>
        <div 
          ref={orb2Ref}
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-white/10 rounded-full blur-[100px]"
        ></div>
      </div>

      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#262626] to-black -z-10"></div>

      {/* Content */}
      <div className="relative z-10 w-full py-10 lg:py-14 px-6 lg:px-12 xl:px-20">
        <div className="container">
          {/* Badges */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <div className="inline-flex items-center rounded-[5px] border text-xs font-bold bg-white/10 text-white/90 border-white/20 px-4 py-1.5 backdrop-blur-md hover:bg-white/20 transition-colors">
              <Globe className="h-3.5 w-3.5 mr-2" />
              Middle East
            </div>
            <div className="inline-flex items-center rounded-[5px] border text-xs font-bold bg-white/10 text-white/90 border-white/20 px-4 py-1.5 backdrop-blur-md hover:bg-white/20 transition-colors">
              November 2025
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h1 className="font-display text-4xl text-white leading-[1.1] tracking-tight">
                  Qatar Fresh
                  <span className="block text-white/90">Herbs Market</span>
                </h1>
                <p className="text-white/60 font-light tracking-wide text-[18px]">
                  2019 – 2030
                </p>
              </div>

              <p className="text-white/70 max-w-xl leading-relaxed font-light text-[18px]">
                Comprehensive analysis of market size, share, growth drivers, competitive landscape & forecast through 2030.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="cta"
                  className="rounded-md"
                >
                  Download sample report
                  <Download className="h-5 w-5" />
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm rounded-md"
                >
                  Connect with Consultant
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Card - Report Details */}
            <div className="lg:col-span-2">
              <div className="bg-[var(--glass-bg)] backdrop-blur-xl rounded-lg border border-[var(--glass-border)] p-8 lg:p-10 space-y-8 shadow-2xl relative overflow-hidden">
                {/* Background glow orbs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--glass-glow)] rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--glass-glow)] rounded-full blur-3xl"></div>

                <div className="relative">
                  <h3 className="text-xl font-normal text-[var(--glass-text)] mb-3">
                    Report Details
                  </h3>
                  <div className="w-12 h-1 bg-[var(--glass-accent)] rounded-full"></div>
                </div>

                <div className="relative grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
                      <Calendar className="h-4 w-4" />
                      <span>Base Year</span>
                    </div>
                    <p className="text-2xl font-normal text-[var(--glass-text)]">2024</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
                      <FileText className="h-4 w-4" />
                      <span>Pages</span>
                    </div>
                    <p className="text-2xl font-normal text-[var(--glass-text)]">82</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
                      <Globe className="h-4 w-4" />
                      <span>Region</span>
                    </div>
                    <p className="text-base font-normal text-[var(--glass-text)]">Middle East</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
                      <User className="h-4 w-4" />
                      <span>Author</span>
                    </div>
                    <p className="text-base font-normal text-[var(--glass-text)]">Rebecca</p>
                  </div>
                </div>

                <div className="relative pt-6 border-t border-[var(--glass-border)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
                      <Hash className="h-4 w-4" />
                      <span>Product Code</span>
                    </div>
                    <span className="text-[var(--glass-text)] font-normal text-base tracking-wider">
                      KRAD3953
                    </span>
                  </div>
                </div>

                <Button 
                  variant="glass"
                  className="w-full"
                >
                  View Full Report Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}