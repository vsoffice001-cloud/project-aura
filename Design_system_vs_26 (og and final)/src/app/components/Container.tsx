/**
 * Container Component
 * 
 * WHY: Consistent content width constraints ensure optimal readability
 * and visual rhythm. Centralizes the responsive padding + max-width
 * pattern used across all case study sections.
 * 
 * WHAT: A semantic wrapper that applies --container-content (1000px)
 * max-width, centers content, and adds responsive horizontal padding.
 * 
 * WHEN:
 * - Use in ALL case study page sections
 * - Use in any full-width section that needs centered, constrained content
 * 
 * WHEN NOT:
 * - Don't use for full-bleed backgrounds (wrap section around Container instead)
 * - Don't nest Containers
 * 
 * HOW:
 * ```tsx
 * <section className="bg-black">
 *   <Container className="relative z-10">
 *     <h2>Content here</h2>
 *   </Container>
 * </section>
 * ```
 * 
 * CONTAINER WIDTH HIERARCHY (from theme.css):
 * --container-page:    1200px — Full page shell, heros, nav
 * --container-content: 1000px — Standard sections, card grids (DEFAULT)
 * --container-narrow:   900px — CTAs, testimonials, focused content
 * --container-prose:    700px — Long-form text, optimal line length
 * --container-compact:  600px — Short descriptions, methodology text
 */

interface ContainerProps {
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Override the max-width token. Defaults to --container-content (1000px) */
  maxWidth?: 'page' | 'content' | 'narrow' | 'prose' | 'compact';
}

const maxWidthMap = {
  page: 'var(--container-page)',
  content: 'var(--container-content)',
  narrow: 'var(--container-narrow)',
  prose: 'var(--container-prose)',
  compact: 'var(--container-compact)',
};

export function Container({ 
  children, 
  className = '', 
  maxWidth = 'content' 
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-4 sm:px-6 md:px-8 ${className}`}
      style={{ maxWidth: maxWidthMap[maxWidth] }}
    >
      {children}
    </div>
  );
}
