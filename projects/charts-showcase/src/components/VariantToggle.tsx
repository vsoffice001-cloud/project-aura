'use client';

/**
 * VariantToggle · DS-Button-powered pill toggle strip.
 *
 * Uses DS Button atoms (variant="secondary" / "primary" for active).
 * Horizontal layout · gap 8px · label uppercase tracked left.
 *
 * @module charts-showcase/components/VariantToggle
 */

import { Button } from '@kenresearch/design-system/atoms';
import { HitArea } from './HitArea';
import type { DemoVariant } from '@/lib/demo-registry';

interface VariantToggleProps {
  variants: DemoVariant[];
  activeId: string;
  onChange: (id: string) => void;
  label?: string;
}

export function VariantToggle({
  variants,
  activeId,
  onChange,
  label = 'Variant',
}: VariantToggleProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)]"
        style={{ fontSize: '10px', fontWeight: 600, flexShrink: 0 }}
      >
        {label}
      </span>
      {variants.map((v) => (
        <HitArea key={v.id}>
          <Button
            variant={activeId === v.id ? 'primary' : 'secondary'}
            size="xs"
            onClick={() => onChange(v.id)}
            aria-pressed={activeId === v.id}
            pill
          >
            {v.label}
          </Button>
        </HitArea>
      ))}
    </div>
  );
}
