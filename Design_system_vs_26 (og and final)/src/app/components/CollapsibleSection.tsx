/**
 * Collapsible Section
 * 
 * Expandable/collapsible content section with smooth animation
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-black/10 rounded-[10px] overflow-hidden bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
      >
        <div className="text-left">
          <h4 className="text-lg font-bold text-black">{title}</h4>
          {subtitle && (
            <p className="text-sm text-black/60 mt-1">{subtitle}</p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-black/60 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-6 py-6 border-t border-black/10">
          {children}
        </div>
      )}
    </div>
  );
}
