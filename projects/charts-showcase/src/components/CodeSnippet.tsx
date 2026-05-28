'use client';

/**
 * CodeSnippet · Syntax-highlighted code block with copy button.
 *
 * No shiki (not installed). Uses <pre><code> with minimal monospace styling
 * and token-coloring via CSS classes. Copy via clipboard API.
 *
 * Tokens color map (CSS classes on spans — applied by tokenize()):
 *   .tok-keyword  → periwinkle
 *   .tok-string   → green-muted
 *   .tok-comment  → gray
 *   .tok-prop     → purple
 *
 * @module charts-showcase/components/CodeSnippet
 */

import { useState, useCallback } from 'react';
import { Button } from '@kenresearch/design-system/atoms';
import { HitArea } from './HitArea';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  label?: string;
}

/** Very minimal tokenizer — colors JSX/TS keywords, strings, comments, props */
function tokenize(code: string): string {
  // Escape HTML first
  let safe = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Apply color spans (order matters — comments first to not re-color internals)
  // Comments
  safe = safe.replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>');
  // JSX string attributes (already escaped quotes)
  safe = safe.replace(/(&quot;[^&]*&quot;|&#x27;[^&]*&#x27;|`[^`]*`)/g, '<span class="tok-string">$1</span>');
  // TSX/JSX keywords
  safe = safe.replace(/\b(import|from|export|const|let|var|function|return|type|interface|default|null|undefined|true|false|async|await)\b/g, '<span class="tok-keyword">$1</span>');
  // Prop names (word before =)
  safe = safe.replace(/\b([a-zA-Z][a-zA-Z0-9]*)(={)/g, '<span class="tok-prop">$1</span>$2');

  return safe;
}

export function CodeSnippet({ code, label }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [code]);

  return (
    <div
      style={{
        background: 'rgb(248, 248, 252)',
        border: '1px solid rgba(148, 136, 236, 0.15)',
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(148, 136, 236, 0.1)',
          background: 'rgba(148, 136, 236, 0.05)',
        }}
      >
        <span
          className="font-body uppercase tracking-[0.1em]"
          style={{ fontSize: '9px', fontWeight: 700, color: 'var(--semantic-ink-muted)' }}
        >
          {label ?? 'tsx'}
        </span>
        <HitArea>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            ariaLabel={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            icon={copied
              ? <Check size={11} aria-hidden="true" />
              : <Copy size={11} aria-hidden="true" />
            }
            iconPosition="left"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </HitArea>
      </div>

      {/* Code block */}
      <pre
        className="token-colors"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, "Courier New", monospace',
          fontSize: '11px',
          lineHeight: 1.65,
          padding: '14px 16px',
          margin: 0,
          overflowX: 'auto',
          color: 'var(--semantic-ink-body)',
        }}
        aria-label="Code example"
      >
        <code
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: tokenize(code) }}
        />
      </pre>

      {/* Token color CSS — injected once */}
      <style>{`
        .token-colors .tok-keyword { color: rgb(91, 79, 207); font-weight: 600; }
        .token-colors .tok-string  { color: rgb(21, 128, 61); }
        .token-colors .tok-comment { color: rgb(156, 163, 175); }
        .token-colors .tok-prop    { color: rgb(148, 80, 0); }
      `}</style>
    </div>
  );
}
