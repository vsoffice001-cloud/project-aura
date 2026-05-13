import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Navbar } from '@/app/components/Navbar';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';
import { useCountUp } from '../hooks/useCountUp';

export function TemplateE() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleY = useTransform(heroProg, [0, 1], [0, -120]);
  const titleOpacity = useTransform(heroProg, [0, 0.8], [1, 0]);
  const depth = useTransform(heroProg, [0, 1], [0, 80]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProg } = useScroll({ target: timelineRef, offset: ['start start', 'end end'] });
  const x = useTransform(timelineProg, [0, 1], ['0%', `-${((c.phases.length - 1) / c.phases.length) * 100}%`]);

  const pageProg = useScroll().scrollYProgress;
  const progAngle = useTransform(pageProg, [0, 1], [0, 360]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const orbX = useTransform(smoothX, (v) => v - 160);
  const orbY = useTransform(smoothY, (v) => v - 160);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const titleChars = c.title.split('');

  return (
    <div data-template="e" style={{ background: '#0a0a0a', color: '#f5f5f5', position: 'relative' }}>
      <Navbar />

      <motion.div
        aria-hidden
        className="hidden md:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176,31,36,0.22) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1,
          x: orbX,
          y: orbY,
          mixBlendMode: 'screen',
        }}
      />

      <ScrollProgressCircle angle={progAngle} />

      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '140dvh',
          background: 'linear-gradient(180deg, #1F2A44 0%, #0a0a0a 100%)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(176,31,36,0.2) 0%, transparent 60%)',
            y: depth,
          }}
        />
        <div style={{ position: 'sticky', top: 0, height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 32px' }}>
          <motion.div style={{ y: titleY, opacity: titleOpacity, textAlign: 'center', maxWidth: '1400px' }}>
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ fontFamily: 'DM Sans', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(245,245,245,0.6)', marginBottom: '32px' }}
            >
              Case Study · {c.year}
            </motion.div>
            <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(40px, 8.5vw, 132px)', lineHeight: 0.95, margin: 0, letterSpacing: '-0.03em', fontWeight: 500 }}>
              {titleChars.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotate: -8, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1 + i * 0.02, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ marginTop: '40px', fontFamily: 'Noto Serif, serif', fontSize: 'clamp(20px, 2vw, 28px)', color: '#b01f24', fontStyle: 'italic' }}
            >
              {c.dealSize} · {c.sector}
            </motion.div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '40px', fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.4)' }}
          >
            Scroll ↓
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '160px 32px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.4, margin: 0, color: 'rgba(245,245,245,0.92)' }}
        >
          {c.thesis}
        </motion.p>
      </section>

      <div ref={timelineRef} style={{ position: 'relative', height: `${c.phases.length * 100}dvh`, overflow: 'hidden' }}>
        <div style={{ position: 'sticky', top: 0, height: '100dvh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '80px', left: '32px', fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.5)', zIndex: 2 }}>
            The Journey · {c.phases.length} Phases
          </div>
          <motion.div style={{ x, display: 'flex', width: `${c.phases.length * 100}%` }}>
            {c.phases.map((p, i) => (
              <div key={i} style={{ width: `${100 / c.phases.length}%`, flexShrink: 0, padding: '0 8vw', display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: '620px' }}>
                  <div style={{ fontFamily: 'DM Sans', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#b01f24', marginBottom: '24px' }}>
                    {p.label} · {String(i + 1).padStart(2, '0')} / {String(c.phases.length).padStart(2, '0')}
                  </div>
                  <h2 style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1, margin: '0 0 32px', fontWeight: 400 }}>
                    {p.title}
                  </h2>
                  <p style={{ fontFamily: 'DM Sans', fontSize: '20px', lineHeight: 1.6, color: 'rgba(245,245,245,0.7)', maxWidth: '52ch' }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '8vw',
              right: '8vw',
              height: '2px',
              background: 'rgba(245,245,245,0.08)',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: '#b01f24',
                scaleX: timelineProg,
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      </div>

      <section style={{ padding: '160px 32px', background: '#1F2A44', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(176,31,36,0.15) 0%, transparent 50%)' }}
        />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.6)', marginBottom: '40px' }}>
            Outcome
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
            <RollNumber value={110} prefix="₹" suffix=" Cr" label="Total Addressable Market" />
            <RollNumber value={68} prefix="₹" suffix=" Cr" label="Serviceable Opportunity" />
            <RollNumber value={3.2} decimals={1} suffix="×" label="Growth Potential" />
            <RollNumber value={15} suffix="%" label="Share Target" />
          </div>
        </div>
      </section>

      <section style={{ padding: '160px 32px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(120px, 18vw, 220px)', color: '#b01f24', lineHeight: 0.6, marginBottom: '20px' }}>"</div>
        <div style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(24px, 2.5vw, 34px)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(245,245,245,0.92)', marginBottom: '32px' }}>
          {c.endorsement.quote}
        </div>
        <div style={{ fontFamily: 'DM Sans', fontSize: '14px', letterSpacing: '0.08em', color: 'rgba(245,245,245,0.6)' }}>
          — {c.endorsement.author}, {c.endorsement.role}
        </div>
      </section>

      <section style={{ padding: '120px 32px', borderTop: '1px solid rgba(245,245,245,0.08)', textAlign: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{ padding: '18px 40px', background: '#b01f24', color: '#fff', border: 'none', borderRadius: '4px', fontFamily: 'DM Sans', fontSize: '15px', letterSpacing: '0.04em', cursor: 'pointer' }}
        >
          Discuss your mandate →
        </motion.button>
      </section>
    </div>
  );
}

function ScrollProgressCircle({ angle }: { angle: any }) {
  const dashOffset = useTransform(angle, (v: number) => 151 - (v / 360) * 151);
  return (
    <div
      aria-hidden
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        top: '100px',
        right: '28px',
        width: '56px',
        height: '56px',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(245,245,245,0.12)" strokeWidth="2" />
        <motion.circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="#b01f24"
          strokeWidth="2"
          strokeDasharray="151"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RollNumber({ value, label, prefix = '', suffix = '', decimals = 0 }: { value: number; label: string; prefix?: string; suffix?: string; decimals?: number }) {
  const { ref, value: v } = useCountUp(value, { decimals, duration: 1800 });
  return (
    <div ref={ref as any}>
      <div style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(40px, 5vw, 72px)', color: '#b01f24', marginBottom: '12px', lineHeight: 1 }}>
        {prefix}{v.toFixed(decimals)}{suffix}
      </div>
      <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.6)' }}>
        {label}
      </div>
    </div>
  );
}
