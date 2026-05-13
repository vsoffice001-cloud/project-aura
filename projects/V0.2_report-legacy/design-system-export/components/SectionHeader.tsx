import { ReactNode } from 'react';

interface SectionHeaderProps {
  chapter?: string;
  title: string;
  heading?: ReactNode;
  subtitle?: string;
  description?: string;
}

export function SectionHeader({ chapter, title, heading, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="mb-16">
      <div className="mb-4">
        <span className="text-sm font-bold tracking-widest uppercase text-[var(--brand-red)]">
          {chapter ? `${chapter}: ${title}` : title}
        </span>
      </div>
      {heading ? (
        <h2 className="text-3xl tracking-tight text-black-900">
          {heading}
        </h2>
      ) : subtitle ? (
        <>
          <h2 className="text-3xl tracking-tight text-black-900">
            {subtitle.split('\n')[0]}
            {subtitle.includes('\n') && <span className="block">{subtitle.split('\n')[1]}</span>}
          </h2>
        </>
      ) : null}
      {description && (
        <p className="text-base leading-relaxed max-w-3xl mt-4 text-black-500">
          {description}
        </p>
      )}
    </div>
  );
}
