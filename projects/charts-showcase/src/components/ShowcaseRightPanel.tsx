'use client';

/**
 * ShowcaseRightPanel · Active demo inspector panel.
 *
 * Receives active demo via DemoActiveContext.
 * Sections: Props · Code (import + example) · A11y · Known Issues
 * All sections collapsible via <details>.
 * Sticky top: 56px.
 *
 * @module charts-showcase/components/ShowcaseRightPanel
 */

import { useDemoActive } from '@/lib/context';
import { PropsTable } from './PropsTable';
import { CodeSnippet } from './CodeSnippet';

function PanelSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* mb-3 (12px) panel section heading per spacing spec */}
      <summary
        className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)]"
        style={{
          fontSize: '9px',
          fontWeight: 700,
          padding: '14px 16px 10px',
          cursor: 'pointer',
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        {title}
        <span aria-hidden="true" style={{ fontSize: '11px', fontWeight: 400 }}>▾</span>
      </summary>
      {/* mb-6 between section body content per spacing spec */}
      <div style={{ padding: '0 16px 24px' }}>
        {children}
      </div>
    </details>
  );
}

export function ShowcaseRightPanel() {
  const { activeDemo } = useDemoActive();

  return (
    <aside
      aria-label="Component inspector"
      style={{
        gridColumn: '3',
        gridRow: '2',
        position: 'sticky',
        top: '56px',
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        borderLeft: '1px solid rgba(0,0,0,0.06)',
        background: 'var(--semantic-bg-surface, #ffffff)',
      }}
      className="lg:block"
    >
      {!activeDemo ? (
        <div
          style={{ padding: '24px 16px' }}
        >
          <p
            className="font-body italic text-[var(--semantic-ink-subtle)]"
            style={{ fontSize: '12px', lineHeight: 1.6 }}
          >
            Scroll to a component to inspect its props, code, and a11y notes.
          </p>
        </div>
      ) : (
        <div>
          {/* Panel header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              background: 'rgba(148, 136, 236, 0.05)',
            }}
          >
            <p
              className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)]"
              style={{ fontSize: '9px', fontWeight: 700, marginBottom: '4px' }}
            >
              {activeDemo.category}
            </p>
            <h4
              className="font-display font-light text-[var(--semantic-ink-strong)]"
              style={{ fontSize: '15px', lineHeight: 1.2 }}
            >
              {activeDemo.name}
            </h4>
            <p
              className="font-body text-[var(--semantic-ink-muted)]"
              style={{ fontSize: '11px', marginTop: '4px', lineHeight: 1.55 }}
            >
              {activeDemo.importPath}
            </p>
          </div>

          {/* Props */}
          {activeDemo.propsTable.length > 0 && (
            <PanelSection title="Props">
              <PropsTable props={activeDemo.propsTable} />
            </PanelSection>
          )}

          {/* Import */}
          <PanelSection title="Import" defaultOpen={false}>
            <CodeSnippet code={activeDemo.importSnippet} label="import" />
          </PanelSection>

          {/* Example */}
          <PanelSection title="Example" defaultOpen={false}>
            <CodeSnippet code={activeDemo.exampleSnippet} label="tsx" />
          </PanelSection>

          {/* A11y */}
          {activeDemo.a11y && (
            <PanelSection title="Accessibility" defaultOpen={false}>
              <p
                className="font-body text-[var(--semantic-ink-body)]"
                style={{ fontSize: '11px', lineHeight: 1.7 }}
              >
                {activeDemo.a11y}
              </p>
            </PanelSection>
          )}

          {/* Known issues */}
          {activeDemo.knownIssues && (
            <PanelSection title="Known Issues" defaultOpen={false}>
              <p
                className="font-body text-[var(--color-brand-red,#b01f24)]"
                style={{ fontSize: '11px', lineHeight: 1.7 }}
              >
                {activeDemo.knownIssues}
              </p>
            </PanelSection>
          )}

          {/* Tokens used reference */}
          <PanelSection title="DS Tokens used" defaultOpen={false}>
            {activeDemo.tokensUsed && activeDemo.tokensUsed.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {activeDemo.tokensUsed.map(token => (
                  <div
                    key={token.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1px',
                      background: 'rgba(148,136,236,0.04)',
                      border: '1px solid rgba(148,136,236,0.1)',
                      borderRadius: '4px',
                      padding: '5px 8px',
                    }}
                  >
                    <code
                      style={{
                        fontSize: '10px',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        color: 'rgb(91, 79, 207)',
                        lineHeight: 1.3,
                      }}
                    >
                      {`var(${token.name})`}
                    </code>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '10px',
                        color: 'var(--semantic-ink-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {token.usage}
                    </span>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '9px',
                        color: 'var(--semantic-ink-subtle)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {token.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p
                  className="font-body text-[var(--semantic-ink-subtle)] italic"
                  style={{ fontSize: '11px', marginBottom: '6px' }}
                >
                  Common shared tokens:
                </p>
                {[
                  '--semantic-ink-strong',
                  '--semantic-ink-body',
                  '--semantic-ink-muted',
                  '--semantic-bg-page',
                  '--color-brand-red',
                  '--font-display',
                  '--font-body',
                ].map(tokenName => (
                  <code
                    key={tokenName}
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      color: 'rgb(91, 79, 207)',
                      background: 'rgba(148,136,236,0.06)',
                      padding: '3px 6px',
                      borderRadius: '3px',
                    }}
                  >
                    {`var(${tokenName})`}
                  </code>
                ))}
              </div>
            )}
          </PanelSection>
        </div>
      )}
    </aside>
  );
}
