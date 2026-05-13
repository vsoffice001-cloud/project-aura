import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * FOUNDATIONS HELPERS
 * ===================
 * Shared helper components used across all Foundations content sections.
 */

// ============================================
// HELPER COMPONENTS
// ============================================

interface DocSectionProps {
  title: string;
  why?: string;
  what?: string;
  when?: string;
  whenNot?: string;
  where?: string;
  how?: string;
  children: React.ReactNode;
}

export function DocSection({ title, why, what, when, whenNot, where, how, children }: DocSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-normal mb-4 text-black">
          {title}
        </h2>
        <div className="space-y-2">
          {why && (
            <InfoBlock label="WHY" content={why} color="purple" />
          )}
          {what && (
            <InfoBlock label="WHAT" content={what} color="blue" />
          )}
          {when && (
            <InfoBlock label="WHEN" content={when} color="green" />
          )}
          {whenNot && (
            <InfoBlock label="WHEN NOT" content={whenNot} color="red" />
          )}
          {where && (
            <InfoBlock label="WHERE" content={where} color="amber" />
          )}
          {how && (
            <InfoBlock label="HOW" content={how} color="gray" />
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function InfoBlock({ label, content, color }: { label: string; content: string; color: string }) {
  const colors = {
    purple: 'bg-purple-50 text-purple-900 border-purple-200',
    blue: 'bg-blue-50 text-blue-900 border-blue-200',
    green: 'bg-green-50 text-green-900 border-green-200',
    red: 'bg-red-50 text-red-900 border-red-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200',
    gray: 'bg-gray-50 text-gray-900 border-gray-200',
  };

  return (
    <div className={`px-4 py-3 rounded-[5px] border ${colors[color as keyof typeof colors]}`}>
      <span className="font-mono text-xs font-bold mr-2">{label}:</span>
      <span className="text-sm">{content}</span>
    </div>
  );
}

export function ColorCard({ name, token, value, usage, wcag }: any) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 relative group cursor-pointer" style={{ background: value }} onClick={copyToClipboard}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
          {copied ? (
            <Check size={24} className="text-white" />
          ) : (
            <Copy size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="font-semibold text-sm mb-1">{name}</p>
        <p className="font-mono text-xs text-black/60 mb-2">{value}</p>
        {wcag && <p className="text-xs text-green-600 mb-2">✓ {wcag}</p>}
        <p className="text-xs text-black/60 mb-3">{usage}</p>
        <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80">
          var({token})
        </code>
      </div>
    </div>
  );
}

export function TextColorCard({ name, token, value, contrast, usage, where }: any) {
  return (
    <div className="border border-black/8 rounded-[5px] p-6 bg-white hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <p className="text-4xl mb-2" style={{ color: value }}>Aa</p>
        <p className="font-semibold text-sm mb-1">{name}</p>
        <p className="text-xs text-green-600 mb-2">✓ WCAG AAA ({contrast})</p>
      </div>
      <p className="text-xs text-black/60 mb-2"><strong>USAGE:</strong> {usage}</p>
      <p className="text-xs text-black/50 mb-3"><strong>WHERE:</strong> {where}</p>
      <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80">
        var({token})
      </code>
    </div>
  );
}

export function CodeExample({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4 bg-black/5 rounded-[5px] p-4 border border-black/8">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded bg-white/80 hover:bg-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12">
        {code}
      </pre>
    </div>
  );
}

export function TypeScaleDemo({ token, pixels, usage, where }: any) {
  return (
    <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6 hover:bg-black/[0.04] transition-colors">
      <div className="flex items-end justify-between mb-4">
        <p style={{ fontSize: `var(${token})`, lineHeight: 1.3 }}>
          The quick brown fox
        </p>
        <div className="text-right ml-4">
          <p className="font-mono text-xs text-black/60">{token}</p>
          <p className="font-mono text-xs text-black/40">{pixels}</p>
        </div>
      </div>
      <div className="pt-4 border-t border-black/8 space-y-1">
        <p className="text-xs text-black/60"><strong>USAGE:</strong> {usage}</p>
        <p className="text-xs text-black/50"><strong>WHERE:</strong> {where}</p>
      </div>
    </div>
  );
}