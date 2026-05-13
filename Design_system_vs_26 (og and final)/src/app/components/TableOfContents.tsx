/**
 * Table of Contents Navigation
 * 
 * Sticky sidebar navigation for the design system
 */

import React from 'react';

export interface TOCSection {
  id: string;
  label: string;
  subsections?: {
    id: string;
    label: string;
  }[];
}

export interface TableOfContentsProps {
  sections: TOCSection[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function TableOfContents({ sections, activeSection, onNavigate }: TableOfContentsProps) {
  return (
    <nav className="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pb-8">
      <div className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className={`
                w-full text-left px-3 py-2 text-sm rounded-[5px] transition-all
                ${activeSection === section.id 
                  ? 'bg-black text-white font-bold' 
                  : 'text-black/70 hover:text-black hover:bg-black/5'
                }
              `}
            >
              {section.label}
            </button>
            
            {/* Subsections */}
            {section.subsections && (
              <div className="ml-4 mt-1 space-y-1">
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => onNavigate(subsection.id)}
                    className={`
                      w-full text-left px-3 py-1.5 text-xs rounded-[5px] transition-all
                      ${activeSection === subsection.id 
                        ? 'bg-black/10 text-black font-bold' 
                        : 'text-black/60 hover:text-black hover:bg-black/5'
                      }
                    `}
                  >
                    {subsection.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
