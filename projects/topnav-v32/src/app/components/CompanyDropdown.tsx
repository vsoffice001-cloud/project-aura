/**
 * CompanyDropdown Component - Simple, Clean Design
 * 
 * A compact dropdown menu for company-related navigation links.
 * 
 * Structure:
 * - Main links: About, Leadership, Careers, Contact Us
 * - Divider
 * - Footer link: Policies (muted styling)
 * 
 * Design:
 * - Width: 224px (w-56)
 * - Clean white background
 * - Subtle border and shadow
 * - DM Sans typography
 * - Minimal hover effects
 * 
 * Spacing System (follows design tokens):
 * - Container padding: 12px (--spacing-3) - compact for simple menus
 * - Item gap: 4px - tight, scannable list (Miller's Law)
 * - Item padding: 10px horizontal, 6px vertical (--nav-item-padding)
 * - Section gap: 8px (--spacing-2) - minimal visual separation
 * 
 * Reasoning:
 * - Simple navigation menus require less padding than featured cards
 * - Compact spacing improves scannability (Jakob's Law - users expect tight nav menus)
 * - Follows --vertical-nav-md token patterns for consistency
 */

import { motion } from 'motion/react';

interface CompanyDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function CompanyDropdown({ isOpen, className = '' }: CompanyDropdownProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute top-full left-0 mt-[4px] w-56 p-3 bg-white border border-[rgba(20,16,22,0.1)] rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] z-50 ${className}`}
    >
      {/* Main Links */}
      <ul className="space-y-1">
        <li>
          <a
            href="/about"
            className="block px-[10px] py-[6px] rounded-md font-nav text-[14px] leading-[20px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/leadership"
            className="block px-[10px] py-[6px] rounded-md font-nav text-[14px] leading-[20px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            Leadership
          </a>
        </li>
        <li>
          <a
            href="/careers"
            className="block px-[10px] py-[6px] rounded-md font-nav text-[14px] leading-[20px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            Careers
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="block px-[10px] py-[6px] rounded-md font-nav text-[14px] leading-[20px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Divider */}
      <div className="mt-2 pt-2 border-t border-[#e6e6e6]">
        <a
          href="/policies"
          className="block px-[10px] py-[6px] rounded-md font-nav text-[12px] leading-[16px] font-normal text-[#999999] hover:text-[#b01f24] transition-colors duration-200"
          style={{ fontVariationSettings: "'opsz' 9" }}
        >
          Policies
        </a>
      </div>
    </motion.div>
  );
}