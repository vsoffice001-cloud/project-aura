/**
 * Section Header Icons
 * 
 * Icon components for section headers in mega menu dropdowns.
 * These icons provide visual cues for different content categories.
 * 
 * Icons:
 * - LightbulbIcon: For insights, ideas, featured content
 * - DocumentIcon: For publications, reports, documents
 * - EyeIcon: For perspectives, viewpoints, analysis
 * - BriefcaseIcon: For capabilities, services, business functions
 * - LayersIcon: For frameworks, methodologies, structures
 * - TargetIcon: For client impact, results, outcomes
 * - BrainIcon: For knowledge, learning, expertise
 * 
 * Design System:
 * - Size: 16px x 16px
 * - Color: Matches section header text
 * - Style: Simple, clean line icons
 */

interface IconProps {
  className?: string;
}

/**
 * Lightbulb Icon - For insights and ideas
 */
export function LightbulbIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8 1.5V2.5M3.25 3.25L3.95 3.95M1.5 8H2.5M13.5 8H14.5M12.05 3.95L12.75 3.25M10.5 12.5V13.5C10.5 14.0523 10.0523 14.5 9.5 14.5H6.5C5.94772 14.5 5.5 14.0523 5.5 13.5V12.5M10.5 10C11.5 9.5 12.5 8.5 12.5 6.5C12.5 4.01472 10.4853 2 8 2C5.51472 2 3.5 4.01472 3.5 6.5C3.5 8.5 4.5 9.5 5.5 10V11.5C5.5 12.0523 5.94772 12.5 6.5 12.5H9.5C10.0523 12.5 10.5 12.0523 10.5 11.5V10Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Document Icon - For publications and reports
 */
export function DocumentIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M9.5 1.5H4C3.44772 1.5 3 1.94772 3 2.5V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5V5.5M9.5 1.5L13 5.5M9.5 1.5V5.5H13M10.5 9.5H5.5M10.5 11.5H5.5M7 7.5H5.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Eye Icon - For perspectives and viewpoints
 */
export function EyeIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1.5 8C1.5 8 3.5 3.5 8 3.5C12.5 3.5 14.5 8 14.5 8C14.5 8 12.5 12.5 8 12.5C3.5 12.5 1.5 8 1.5 8Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Briefcase Icon - For capabilities and services
 */
export function BriefcaseIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M13.5 4.5H2.5C1.94772 4.5 1.5 4.94772 1.5 5.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V5.5C14.5 4.94772 14.0523 4.5 13.5 4.5Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10.5 4.5V3.5C10.5 2.94772 10.0523 2.5 9.5 2.5H6.5C5.94772 2.5 5.5 2.94772 5.5 3.5V4.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M14.5 8.5C12.5 9.5 10 9.5 8 9.5C6 9.5 3.5 9.5 1.5 8.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Layers Icon - For frameworks and methodologies
 */
export function LayersIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1.5 5.5L8 2L14.5 5.5L8 9L1.5 5.5Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M1.5 8L8 11.5L14.5 8" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M1.5 10.5L8 14L14.5 10.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Target Icon - For client impact and results
 */
export function TargetIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Brain Icon - For knowledge and expertise
 */
export function BrainIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={`size-[16px] ${className}`}
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 4.89782 4.15804 5.25794 4.41459 5.51459M5.5 3C6.32843 3 7 3.67157 7 4.5M5.5 3C5.5 2.17157 6.17157 1.5 7 1.5C7.82843 1.5 8.5 2.17157 8.5 3M7 4.5V13.5M7 4.5C7 3.67157 7.67157 3 8.5 3M8.5 3C9.32843 3 10 3.67157 10 4.5M8.5 3C8.5 2.17157 9.17157 1.5 10 1.5C10.8284 1.5 11.5 2.17157 11.5 3C11.5 3.82843 10.8284 4.5 10 4.5M10 4.5C10 5.32843 10.6716 6 11.5 6C12.3284 6 13 6.67157 13 7.5C13 8.32843 12.3284 9 11.5 9M10 4.5V9M11.5 9C11.5 9.82843 10.8284 10.5 10 10.5M11.5 9C11.5 9.82843 12.1716 10.5 13 10.5C13.8284 10.5 14.5 11.1716 14.5 12C14.5 12.8284 13.8284 13.5 13 13.5C12.1716 13.5 11.5 12.8284 11.5 12M10 10.5V12M10 10.5C10 11.3284 9.32843 12 8.5 12M10 12C10 12.8284 10.6716 13.5 11.5 13.5M10 12V13.5M8.5 12H7M8.5 12C8.5 12.8284 9.17157 13.5 10 13.5M3.5 6C2.67157 6 2 6.67157 2 7.5C2 8.32843 2.67157 9 3.5 9M3.5 9C3.5 9.82843 4.17157 10.5 5 10.5M3.5 9C2.67157 9 2 9.67157 2 10.5C2 11.3284 2.67157 12 3.5 12C4.33333 12 5 11.3284 5 10.5M5 10.5V12M5 12C5 12.8284 5.67157 13.5 6.5 13.5M5 12C5 12.8284 4.33333 13.5 3.5 13.5C2.67157 13.5 2 12.8284 2 12" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}