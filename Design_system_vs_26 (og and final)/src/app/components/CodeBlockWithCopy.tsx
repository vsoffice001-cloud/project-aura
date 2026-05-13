/**
 * Code Block with Copy
 * 
 * Displays code with syntax highlighting and copy-to-clipboard functionality
 */

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: 'tsx' | 'css' | 'typescript' | 'javascript';
  showLineNumbers?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  title?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
  collapsible = false,
  defaultCollapsed = false,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="bg-black/5 rounded-[5px] overflow-hidden border border-black/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/10 bg-black/[0.02]">
        <div className="flex items-center gap-2">
          {collapsible && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-black/60 hover:text-black font-mono"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          <span className="text-xs text-black/60 font-mono">
            {title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 text-xs text-black/70 hover:text-black hover:bg-black/5 rounded-[5px] transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      {isExpanded && (
        <div className="overflow-x-auto">
          <pre className="p-4">
            <code className="text-xs text-black/80 font-mono">
              {showLineNumbers ? (
                <table>
                  <tbody>
                    {lines.map((line, index) => (
                      <tr key={index}>
                        <td className="pr-4 text-black/40 text-right select-none">
                          {index + 1}
                        </td>
                        <td>{line}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

// Export alias for convenience
export { CodeBlock as CodeBlockWithCopy };