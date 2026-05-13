import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from '@/app/components/Navbar';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';

const CHAPTERS = [
  { num: '01', title: 'Market Structure', body: "India's transformer bushing market sits at the intersection of utility modernization and renewable integration. Voltage-wise segmentation reveals a long tail of low-voltage volume and a concentrated high-voltage value pool.", side: 'HV concentrates value; LV concentrates volume.', figure: 'Segment distribution by voltage class' },
  { num: '02', title: 'Competitive Landscape', body: 'Ten manufacturers account for the majority of domestic output. Differentiation clusters around certifications, reliability KPIs, and the ability to supply OEMs directly versus through distributors.', side: 'OEM-direct is the moat; distributors are table stakes.', figure: 'Competitive positioning matrix' },
  { num: '03', title: 'Financial Diagnostic', body: 'Margin profile, working capital cycle, and capex intensity were benchmarked against listed peers. The diagnostic surfaced defensible unit economics in the high-voltage segment.', side: 'Margin defensibility anchored the IPO narrative.', figure: 'Peer benchmarking: margin vs. growth' },
  { num: '04', title: 'IPO Readiness Assessment', body: 'SEBI disclosure alignment, governance remediation, and investor narrative were the three pillars of readiness. Each was scored against a rubric with specific remediation actions.', side: 'Readiness = disclosure + governance + story.', figure: 'Readiness scorecard, by pillar' },
  { num: '05', title: 'Recommendations', body: 'The final report proposed a staged capacity plan, a procurement de-risking program, and an investor-facing narrative anchored in ₹110 Cr TAM with a credible path to 15% share.', side: 'Stage capacity with demand; de-risk the supply side.', figure: 'Strategic roadmap, 2026–2029' },
];

const WORDS = CHAPTERS.reduce((acc, ch) => acc + ch.body.split(' ').length, 0);
const READING_MIN = Math.max(1, Math.round(WORDS / 220));

export function TemplateC() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight));

      let current = 0;
      chapterRefs.current.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) current = i;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div data-template="c" style={{ background: '#fdfcf9', color: '#0a0a0a', fontFamily: 'Noto Serif, serif', position: 'relative' }}>
      <Navbar />

      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '3px',
          height: '100dvh',
          background: 'rgba(0,0,0,0.06)',
          zIndex: 50,
        }}
      >
        <motion.div
          style={{ width: '100%', background: '#b01f24', transformOrigin: 'top' }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: '120px',
          right: '32px',
          zIndex: 40,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(0,0,0,0.55)',
          textTransform: 'uppercase',
          textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        <div>{Math.round(progress * 100)}% read</div>
        <div>{READING_MIN} min</div>
        <div style={{ color: '#b01f24', marginTop: '4px' }}>
          Ch. {CHAPTERS[active].num}
        </div>
      </div>

      <section style={{ padding: '180px 32px 120px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: '40px' }}>
          Report № 04 · April 2026 · {READING_MIN} min read
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.1, margin: '0 auto', maxWidth: '16ch', fontWeight: 400 }}>
          {c.title}
        </h1>
        <div style={{ marginTop: '32px', fontFamily: 'Noto Serif, serif', fontStyle: 'italic', fontSize: '20px', color: 'rgba(0,0,0,0.6)', maxWidth: '40ch', marginInline: 'auto' }}>
          {c.subtitle}
        </div>
        <div style={{ marginTop: '64px', display: 'inline-flex', gap: '32px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
          <span>{c.sector}</span>
          <span>·</span>
          <span>{c.role}</span>
          <span>·</span>
          <span>{c.year}</span>
        </div>
      </section>

      <section style={{ padding: '80px 32px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: '24px' }}>
          Contents
        </div>
        {CHAPTERS.map((ch, i) => (
          <motion.div
            key={ch.num}
            whileHover={{ x: 4 }}
            onClick={() => chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', fontSize: '18px', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: active === i ? '#b01f24' : 'rgba(0,0,0,0.4)', fontSize: '13px' }}>{ch.num}</span>
            <span style={{ flex: 1 }}>{ch.title}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.4)', fontSize: '13px' }}>
              {String((i + 1) * 4).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </section>

      {CHAPTERS.map((ch, i) => (
        <ChapterBlock key={ch.num} chapter={ch} index={i} setRef={(el) => (chapterRefs.current[i] = el)} />
      ))}

      <section style={{ padding: '120px 32px', maxWidth: '720px', margin: '0 auto', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.5)', marginBottom: '24px' }}>
          Appendix · Notes
        </div>
        {CHAPTERS.map((ch, i) => (
          <div key={ch.num} style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', marginBottom: '12px' }}>
            <sup style={{ color: '#b01f24', marginRight: '8px' }}>{i + 1}</sup>
            Primary and secondary research, {ch.title.toLowerCase()}. Methodology available on request.
          </div>
        ))}
      </section>

      <section style={{ padding: '80px 32px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.6)', fontSize: '14px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
        End of report · Typeset in Noto Serif &amp; DM Sans · © 2026
      </section>
    </div>
  );
}

function ChapterBlock({ chapter, index, setRef }: { chapter: typeof CHAPTERS[number]; index: number; setRef: (el: HTMLElement | null) => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => setRef(ref.current), [setRef]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);

  return (
    <section ref={ref} style={{ padding: '140px 32px', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-4vw',
          top: '40px',
          fontFamily: 'Noto Serif, serif',
          fontSize: 'clamp(180px, 28vw, 380px)',
          lineHeight: 1,
          color: '#b01f24',
          opacity: ghostOpacity,
          y: ghostY,
          pointerEvents: 'none',
          fontWeight: 400,
          letterSpacing: '-0.04em',
        }}
      >
        {chapter.num}
      </motion.div>

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#b01f24', marginBottom: '24px' }}>
          CHAPTER {chapter.num}
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15, margin: '0 0 40px', fontWeight: 400 }}>
          <span style={{ float: 'left', fontSize: '0.9em', lineHeight: 0.9, paddingRight: '12px', paddingTop: '6px', color: '#b01f24' }}>
            {chapter.title[0]}
          </span>
          {chapter.title.slice(1)}
        </h2>

        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '19px', lineHeight: 1.75, color: 'rgba(0,0,0,0.82)', maxWidth: '62ch' }}>
            {chapter.body}<sup style={{ color: '#b01f24', fontSize: '0.7em', marginLeft: '2px' }}>{index + 1}</sup>
          </p>

          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="hidden lg:block"
            style={{
              position: 'absolute',
              right: '-220px',
              top: '8px',
              width: '200px',
              paddingLeft: '16px',
              borderLeft: '2px solid #b01f24',
              fontFamily: 'Noto Serif, serif',
              fontSize: '14px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            {chapter.side}
          </motion.aside>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ margin: '48px 0 0', padding: '24px', border: '1px solid rgba(0,0,0,0.12)', background: '#fff' }}
        >
          <div style={{ height: '180px', background: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 8px, transparent 8px 16px)' }} />
          <figcaption style={{ marginTop: '16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
            Fig. {index + 1} · {chapter.figure}
          </figcaption>
        </motion.figure>

        <div style={{ position: 'absolute', right: '0', bottom: '-40px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>
          — {String((index + 1) * 4).padStart(2, '0')} —
        </div>
      </div>
    </section>
  );
}
