import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';

export function DealTombstoneRail() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="hidden xl:block"
          style={{
            position: 'fixed',
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            width: '240px',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderLeft: '3px solid #b01f24',
            padding: '24px 20px',
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 20px 48px -20px rgba(0,0,0,0.18)',
          }}
        >
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: '14px' }}>
            Deal Tombstone
          </div>
          <div style={{ fontFamily: 'Noto Serif, serif', fontSize: '32px', lineHeight: 1, color: '#b01f24', marginBottom: '18px' }}>
            {c.dealSize}
          </div>
          <Row label="Sector" value={c.sector} />
          <Row label="Year" value={c.year} />
          <Row label="Role" value={c.role} />
          <Row label="Status" value={c.status} isLast />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.85)', lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}
