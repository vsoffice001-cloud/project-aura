import { Globe, TrendingUp, BarChart3, X, Maximize2, FileText, Crown } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../design-system/Button";
import { Badge } from "../../design-system/components/Badge";
import { SectionLabel } from "../../design-system/components/SectionLabel";
import { colors } from "../../design-system/tokens";
import { heroThemes } from "./heroThemes";
import { chartData } from "./chartData";
import { FloatingVariantSwitcher } from "./FloatingVariantSwitcher";
import { Breadcrumb, healthcareBreadcrumbData } from "./Breadcrumb";

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return { count, ref };
}

// Stat Card Component with animations
function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  color, 
  delay,
  isNumeric = false,
  suffix = "",
  variant = "light"
}: { 
  icon: any; 
  value: string; 
  label: string; 
  color: string;
  delay: number;
  isNumeric?: boolean;
  suffix?: string;
  variant?: keyof typeof heroThemes;
}) {
  // Extract numeric value for animation
  const numericValue = isNumeric ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
  const { count, ref } = useAnimatedCounter(numericValue, 2000);
  
  // Format the animated count
  const formatValue = (val: number) => {
    if (!isNumeric) return value;
    
    if (value.includes('B')) return `$${val.toFixed(1)}B`;
    if (value.includes('%')) return `${val.toFixed(1)}%`;
    if (value.includes('+')) return `${val}+`;
    return val.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative space-y-2 cursor-pointer"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-[10px] bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl"
        style={{ backgroundColor: `${color}20` }}
      />
      
      <div className="relative">
        <div className="flex items-center gap-2">
          <motion.div 
            className="flex h-8 w-8 items-center justify-center rounded-[5px] transition-all duration-300"
            style={{ backgroundColor: `${color}15` }}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="h-4 w-4 transition-all duration-300" style={{ color }} />
          </motion.div>
        </div>
        
        <motion.div 
          className={`font-sans text-[1.563rem] font-semibold mt-2 ${heroThemes[variant].statText}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        >
          {isNumeric ? formatValue(count) : value}
        </motion.div>
        
        <p className={`font-sans text-[0.8rem] font-medium transition-colors ${heroThemes[variant].statLabel}`}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// Interactive Chart Bar
function ChartBar({ item, index, isDark }: { item: typeof chartData[0]; index: number; isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const height = (item.value / 80) * 100;

  // Theme-aware bar colors: periwinkle-400 on light, perano on dark
  const barGradient = isDark
    ? "linear-gradient(to top, rgba(223, 234, 250, 0.30), rgba(223, 234, 250, 0.60))"
    : "linear-gradient(to top, rgba(128, 108, 224, 0.15), rgba(128, 108, 224, 0.35))";
  const barHoverGradient = isDark
    ? "linear-gradient(to top, rgba(223, 234, 250, 0.60), rgba(223, 234, 250, 0.90))"
    : "linear-gradient(to top, rgba(128, 108, 224, 0.30), rgba(128, 108, 224, 0.50))";

  return (
    <motion.div
      className="flex-1 relative group"
      initial={{ height: 0 }}
      animate={{ height: '100%' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute bottom-0 w-full rounded-t-[2.5px] cursor-pointer"
        style={{ height: `${height}%`, background: barGradient }}
        whileHover={{ 
          height: `${Math.min(height + 10, 100)}%`,
          background: barHoverGradient
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -top-12 left-1/2 -translate-x-1/2 backdrop-blur-md px-3 py-1.5 rounded-[5px] border whitespace-nowrap z-10 ${
            isDark
              ? 'bg-white/10 border-white/20'
              : 'bg-black/5 border-black/10'
          }`}
        >
          <div className={`text-[0.8rem] font-medium ${isDark ? 'text-white' : 'text-black/80'}`}>${item.value}B</div>
          <div className={`text-[0.8rem] ${isDark ? 'text-white/60' : 'text-black/50'}`}>{item.year}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function HeroSection() {
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<keyof typeof heroThemes>("light");
  
  // Dark variant helper — true for darkPremium & darkEmber
  const isDark = heroThemes[selectedVariant].buttonBackground === 'dark';

  return (
    <>
      <section className={`relative overflow-hidden ${heroThemes[selectedVariant].background} min-h-[50vh] sm:min-h-[60vh] flex items-center py-6 sm:py-8 md:py-12`}>
        {/* Variant Switcher - Floating control */}
        <FloatingVariantSwitcher
          options={[
            { key: 'light', label: heroThemes.light.name },
            { key: 'darkEmber', label: heroThemes.darkEmber.name },
          ]}
          activeKey={selectedVariant}
          onSelect={(key) => setSelectedVariant(key as keyof typeof heroThemes)}
          colorScheme={isDark ? 'dark' : 'light'}
          menuTitle="Background Style"
          menuWidth="w-56"
          position="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:block"
          delay={1}
        />
        
        {/* Layered background composition - subtle and elegant */}
        <div className="absolute inset-0 pointer-events-none">
          {heroThemes[selectedVariant].glows.map((glow, i) => {
            const hasAnimation = Object.keys(glow.animation).length > 0;
            return hasAnimation ? (
              <motion.div
                key={`${selectedVariant}-glow-${i}`}
                className={glow.className}
                animate={glow.animation}
                transition={glow.transition}
                style={glow.style}
              />
            ) : (
              <div
                key={`${selectedVariant}-glow-${i}`}
                className={glow.className}
                style={glow.style}
              />
            );
          })}
        </div>

        <div className="container relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumb Navigation */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Breadcrumb
              levels={healthcareBreadcrumbData}
              colorScheme={isDark ? 'dark' : 'light'}
            />
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <div className="space-y-6">
              {/* Badge with purple accent (premium feature indicator - 3% rule) */}
              <motion.div 
                className="inline-flex"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDark ? (
                  <SectionLabel background="dark" pulse>
                    New Report Available
                  </SectionLabel>
                ) : (
                  <SectionLabel background="light" pulse>
                    New Report Available
                  </SectionLabel>
                )}
              </motion.div>

              {/* Hero heading - text-3xl (48.8px) - Noto Serif Light for editorial elegance */}
              <motion.h1 
                className={`font-serif text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em] ${heroThemes[selectedVariant].textColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Global AI in Healthcare
                <span className={`block bg-gradient-to-r ${heroThemes[selectedVariant].subtitleGradient} bg-clip-text text-transparent`}>
                  Market Analysis 2024
                </span>
              </motion.h1>

              {/* Body text - text-sm (16px) - DM Sans for readability */}
              <motion.p 
                className={`font-sans max-w-lg text-[1rem] leading-relaxed ${heroThemes[selectedVariant].bodyText}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Comprehensive market intelligence covering 50+ countries, 200+ companies, and strategic insights to drive your business decisions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Mobile (<sm): sm size, flex-1 so both fill the row equally */}
                <div className="flex flex-col items-stretch gap-2 sm:hidden">
                  <Button 
                    variant="brand" 
                    size="sm"
                    animatedArrow={true}
                    className="font-sans font-bold w-full"
                  >
                    Download Sample Report
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    background={heroThemes[selectedVariant].buttonBackground as "light" | "dark"}
                    icon={<FileText />}
                    className="font-sans font-medium w-full"
                  >
                    Request Custom Report
                  </Button>
                </div>

                {/* Tablet (sm–md): md size, natural widths side by side */}
                <div className="hidden sm:flex md:hidden flex-row items-center gap-3">
                  <Button 
                    variant="brand" 
                    size="md"
                    animatedArrow={true}
                    className="font-sans font-bold"
                  >
                    Download Sample Report
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="md"
                    background={heroThemes[selectedVariant].buttonBackground as "light" | "dark"}
                    icon={<FileText />}
                    className="font-sans font-medium"
                  >
                    Request Custom Report
                  </Button>
                </div>

                {/* Desktop (md+): lg size, natural widths side by side */}
                <div className="hidden md:flex flex-row items-center gap-4">
                  <Button 
                    variant="brand" 
                    size="lg"
                    animatedArrow={true}
                    className="font-sans font-bold"
                  >
                    Download Sample Report
                  </Button>
                  <Button 
                    variant={isDark ? "ghost" : "secondary"}
                    size="lg"
                    background={heroThemes[selectedVariant].buttonBackground as "light" | "dark"}
                    icon={<FileText />}
                    className="font-sans font-medium"
                  >
                    Request Custom Report
                  </Button>
                </div>
              </motion.div>

              {/* Stats Cards with strategic accent usage */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8">
                <StatCard
                  icon={BarChart3}
                  value="$45.2B"
                  label="Market Size 2024"
                  color={colors.accent.purple600}
                  delay={0.4}
                  isNumeric={true}
                  variant={selectedVariant}
                />
                
                <StatCard
                  icon={TrendingUp}
                  value="32.5%"
                  label="CAGR 2024-2030"
                  color={colors.accent.purple600}
                  delay={0.5}
                  isNumeric={true}
                  variant={selectedVariant}
                />
                
                <StatCard
                  icon={Globe}
                  value="50+"
                  label="Countries Covered"
                  color={colors.accent.purple600}
                  delay={0.6}
                  isNumeric={true}
                  variant={selectedVariant}
                />
              </div>
            </div>

            {/* Right content - Preview card */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative mx-auto max-w-md">
                {/* Decorative blurs — theme-driven accent colors, static for non-animated variants */}
                {isDark && selectedVariant === 'darkEmber' ? (
                  <>
                    <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-[10px] ${heroThemes[selectedVariant].cardDecorBlur1} ${heroThemes[selectedVariant].cardDecorOpacity} blur-xl`} />
                    <div className={`absolute -bottom-4 -left-4 h-32 w-32 rounded-[10px] ${heroThemes[selectedVariant].cardDecorBlur2} ${heroThemes[selectedVariant].cardDecorOpacity} blur-xl`} />
                  </>
                ) : (
                  <>
                    <motion.div 
                      className={`absolute -right-4 -top-4 h-24 w-24 rounded-[10px] ${heroThemes[selectedVariant].cardDecorBlur1} ${heroThemes[selectedVariant].cardDecorOpacity} blur-xl`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={`absolute -bottom-4 -left-4 h-32 w-32 rounded-[10px] ${heroThemes[selectedVariant].cardDecorBlur2} ${heroThemes[selectedVariant].cardDecorOpacity} blur-xl`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </>
                )}
                
                {/* Card with design system border radius (10px) */}
                <motion.div 
                  className={`relative rounded-[10px] backdrop-blur-sm p-4 cursor-pointer group ${heroThemes[selectedVariant].previewCardBg}`}
                  style={{
                    borderColor: heroThemes[selectedVariant].previewCardBorder,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: isDark 
                      ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                      : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: isDark
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.4)"
                      : "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsPreviewExpanded(true)}
                >
                  {/* Expand button */}
                  <motion.button
                    className={`absolute top-4 right-4 p-2 rounded-[5px] transition-colors opacity-0 group-hover:opacity-100 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'bg-black/5 hover:bg-black/10'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Expand report preview"
                  >
                    <Maximize2 className={`h-4 w-4 ${
                      isDark ? 'text-white/60' : 'text-black/60'
                    }`} />
                  </motion.button>

                  {/* Window controls */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${
                        isDark ? 'bg-white/20' : 'bg-black/20'
                      }`}></div>
                      <div className={`h-3 w-3 rounded-full ${
                        isDark ? 'bg-white/20' : 'bg-black/20'
                      }`}></div>
                      <div className={`h-3 w-3 rounded-full ${
                        isDark ? 'bg-white/20' : 'bg-black/20'
                      }`}></div>
                    </div>
                    <span className={`text-[0.8rem] ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}>Sample Preview</span>
                  </div>

                  {/* Content lines */}
                  <div className="space-y-3">
                    {/* Report Title */}
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className={`text-[0.8rem] uppercase tracking-wide ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}>Chapter 2</div>
                      <div className={`text-[1rem] font-medium ${
                        isDark ? 'text-white/90' : 'text-black/90'
                      }`}>Market Overview & Definition</div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div 
                      className={`space-y-2 text-[0.8rem] leading-relaxed ${
                        isDark ? 'text-white/50' : 'text-black/60'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <p>Artificial Intelligence in healthcare encompasses machine learning, natural language processing, and computer vision applied to medical applications...</p>
                    </motion.div>

                    {/* Chart with perano accent (data visualization) */}
                    <div className={`my-3 rounded-[5px] p-3 ${
                      isDark ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <div className={`mb-2 flex justify-between text-[0.8rem] ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}>
                        <span>Revenue ($B)</span>
                        <span>2020-2026</span>
                      </div>
                      <div className="flex h-20 items-end gap-2 relative">
                        {chartData.map((item, idx) => (
                          <ChartBar key={idx} item={item} index={idx} isDark={isDark} />
                        ))}
                      </div>
                    </div>

                    {/* Premium content overlay — theme-driven accent */}
                    <motion.div 
                      className={`relative mt-2 rounded-[5px] ${heroThemes[selectedVariant].accentOverlayBg} p-3`}
                      style={{
                        borderColor: heroThemes[selectedVariant].accentOverlayBorder,
                        borderWidth: "1px",
                        borderStyle: "solid"
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="pill"
                            size="sm"
                            theme={heroThemes[selectedVariant].badgeTheme}
                            bordered
                            shimmer
                            interactive
                            icon={<Crown />}
                            className={heroThemes[selectedVariant].badgeGlow}
                            autoShimmer={heroThemes[selectedVariant].badgeAutoShimmer}
                            style={heroThemes[selectedVariant].badgeStyle}
                          >
                            PREMIUM CONTENT
                          </Badge>
                        </motion.div>
                      </div>
                      <div className={`blur-[2px] space-y-2 select-none ${
                        isDark ? 'text-white/30' : 'text-black/30'
                      }`}>
                        <div className="text-[0.8rem]">Regional Market Distribution</div>
                        <div className={`h-2 w-full rounded-full ${
                          isDark ? 'bg-white/10' : 'bg-black/10'
                        }`}></div>
                        <div className={`h-2 w-4/5 rounded-full ${
                          isDark ? 'bg-white/10' : 'bg-black/10'
                        }`}></div>
                        <div className={`h-2 w-3/4 rounded-full ${
                          isDark ? 'bg-white/10' : 'bg-black/10'
                        }`}></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 cursor-pointer group hidden lg:block"
          onClick={() => {
            const nextSection = document.getElementById('report');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          aria-label="Scroll to next section"
        >
          <motion.div
            className={`w-[30px] h-[48px] rounded-full border-2 flex items-start justify-center pt-2 transition-colors duration-200 ${
              isDark
                ? 'border-white/30 group-hover:border-white/60'
                : 'border-black/25 group-hover:border-black/50'
            }`}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className={`w-[4px] h-[10px] rounded-full ${
                isDark ? 'bg-white/50 group-hover:bg-white/80' : 'bg-black/35 group-hover:bg-black/60'
              } transition-colors duration-200`}
              animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.button>
      </section>

      {/* Expanded Preview Modal */}
      {isPreviewExpanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPreviewExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sample report preview"
        >
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[10px] border border-white/10 bg-gradient-to-br from-[var(--black-900)] to-[var(--black-800)] p-4 sm:p-6 md:p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-[5px] bg-white/5 hover:bg-white/10 transition-colors z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPreviewExpanded(false)}
              aria-label="Close preview"
            >
              <X className="h-5 w-5 text-white/80" />
            </motion.button>

            {/* Expanded content */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif font-light text-[1.953rem] sm:text-[2.441rem] text-white mb-2 pr-10">
                  Sample Report Preview
                </h2>
                <p className="text-[1rem] text-white/60">
                  Full preview of the market analysis report
                </p>
              </div>

              {/* Report Title */}
              <div className="space-y-2">
                <div className="text-[0.8rem] text-white/40 uppercase tracking-wide">Chapter 2</div>
                <div className="text-[1rem] text-white/90 font-medium">Market Overview & Definition</div>
              </div>

              {/* Text Content */}
              <div className="text-[0.8rem] text-white/50 leading-relaxed">
                <p>Artificial Intelligence in healthcare encompasses machine learning, natural language processing, and computer vision applied to medical applications. This comprehensive analysis examines market dynamics, technology adoption patterns, regulatory frameworks, and competitive landscape across major healthcare segments including diagnostics, drug discovery, patient monitoring, and administrative workflows.</p>
              </div>

              {/* Market Stats — moved above chart */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[10px] bg-white/5 p-4 border border-white/10">
                  <div className="text-[0.8rem] text-white/40 mb-2">Market Size 2024</div>
                  <div className="text-[1.25rem] text-white/90 font-medium">$45.2B</div>
                </div>
                <div className="rounded-[10px] bg-white/5 p-4 border border-white/10">
                  <div className="text-[0.8rem] text-white/40 mb-2">CAGR 2024-30</div>
                  <div className="text-[1.25rem] text-white/90 font-medium">32.5%</div>
                </div>
              </div>

              {/* Full chart — reduced height */}
              <div className="rounded-[10px] bg-white/5 p-4 sm:p-6 border border-white/10">
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-[1rem] text-white/80 font-medium">Revenue Growth ($B)</span>
                  <span className="text-[0.8rem] text-white/50">2020-2026 Forecast</span>
                </div>
                <div className="flex h-32 sm:h-48 items-end gap-2 sm:gap-3 relative">
                  {chartData.map((item, idx) => (
                    <ChartBar key={idx} item={item} index={idx} isDark={true} />
                  ))}
                </div>
                {/* Year labels below chart */}
                <div className="flex gap-3 mt-3">
                  {chartData.map((item, idx) => (
                    <div key={idx} className="flex-1 text-center text-[0.8rem] text-white/60">
                      {item.year}
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium section — theme-driven accent colors */}
              <motion.div 
                className={`relative rounded-[10px] ${heroThemes[selectedVariant].modalAccentBg} p-8`}
                style={{
                  borderColor: heroThemes[selectedVariant].modalAccentBorder,
                  borderWidth: "1px",
                  borderStyle: "solid"
                }}
                whileHover={{ borderColor: heroThemes[selectedVariant].modalAccentBorderHover }}
              >
                <div className="blur-[3px] space-y-3 select-none">
                  <div className="text-[0.8rem] text-white/30 font-medium">Regional Market Distribution & Competitive Analysis</div>
                  <div className="h-3 w-full rounded-full bg-white/10"></div>
                  <div className="h-3 w-4/5 rounded-full bg-white/10"></div>
                  <div className="h-3 w-5/6 rounded-full bg-white/10"></div>
                  <div className="h-3 w-3/4 rounded-full bg-white/10"></div>
                  <div className="h-3 w-11/12 rounded-full bg-white/10"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <Button variant="brand" size="md" animatedArrow={true} className="font-sans font-bold">
                    Unlock Full Report
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}