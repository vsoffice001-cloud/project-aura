import { TemplateVariant, TEMPLATE_META } from './useTemplateVariant';

interface Props {
  variant: TemplateVariant;
  onChange: (v: TemplateVariant) => void;
}

export function VariantSwitcher({ variant, onChange }: Props) {
  const variants: TemplateVariant[] = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div
      role="radiogroup"
      aria-label="Case study template variant"
      className="fixed left-1/2 -translate-x-1/2 print:hidden"
      style={{
        bottom: '24px',
        zIndex: 100,
        background: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '999px',
        padding: '6px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        display: 'flex',
        gap: '4px',
      }}
    >
      {variants.map((v) => {
        const meta = TEMPLATE_META[v];
        const active = v === variant;
        return (
          <button
            key={v}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(v)}
            style={{
              padding: '8px 14px',
              borderRadius: '999px',
              background: active ? '#b01f24' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.72)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 160ms ease, color 160ms ease',
            }}
            title={meta.tagline}
          >
            <span style={{ fontFamily: 'Noto Serif, serif', fontWeight: 500, opacity: active ? 1 : 0.6 }}>
              {meta.label}
            </span>
            <span>{meta.name}</span>
          </button>
        );
      })}
      <div
        aria-hidden
        style={{
          alignSelf: 'center',
          marginLeft: '6px',
          marginRight: '10px',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        ← → · 1–5
      </div>
    </div>
  );
}
