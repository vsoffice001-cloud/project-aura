'use client';

/**
 * PropsTable · Hand-typed props documentation table.
 *
 * Uses DS TableShell (eating own dog food).
 * variant="open" · headerStyle="transparent" · density="compact"
 * Mono font for Name/Type/Default · italic for Description.
 * Required badge = red pill.
 *
 * @module charts-showcase/components/PropsTable
 */

import { TableShell } from '@kenresearch/design-system/charts';
import type { DemoProp } from '@/lib/demo-registry';

interface PropsTableProps {
  props: DemoProp[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) {
    return (
      <p
        className="font-body italic text-[var(--semantic-ink-subtle)]"
        style={{ fontSize: '12px' }}
      >
        No props documented.
      </p>
    );
  }

  return (
    <TableShell
      variant="open"
      headerStyle="transparent"
      density="compact"
      caption="Component props table"
      ariaLabel="Props documentation table"
      scrollX
    >
      <thead>
        <tr>
          {['Name', 'Type', 'Default', 'Description'].map((h) => (
            <th
              key={h}
              scope="col"
              className="font-body"
              style={{
                textAlign: 'left',
                padding: '6px 10px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--semantic-ink-subtle)',
                whiteSpace: 'nowrap',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td
              className="font-mono"
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                color: 'var(--semantic-ink-strong)',
                whiteSpace: 'nowrap',
                verticalAlign: 'top',
              }}
            >
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {prop.name}
              </span>
              {prop.required && (
                <span
                  className="inline-block ml-1.5 rounded-full font-body"
                  style={{
                    background: 'var(--color-brand-red, #b01f24)',
                    color: '#fff',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    letterSpacing: '0.04em',
                    verticalAlign: 'middle',
                  }}
                  aria-label="Required prop"
                >
                  req
                </span>
              )}
            </td>
            <td
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                color: 'rgb(91, 79, 207)',
                verticalAlign: 'top',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              {prop.type}
            </td>
            <td
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                color: 'var(--semantic-ink-muted)',
                verticalAlign: 'top',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                whiteSpace: 'nowrap',
              }}
            >
              {prop.default ?? '—'}
            </td>
            <td
              className="font-body italic"
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                color: 'var(--semantic-ink-body)',
                verticalAlign: 'top',
                maxWidth: '280px',
              }}
            >
              {prop.description}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
