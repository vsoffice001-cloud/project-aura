/**
 * SkeletonCard — Molecule
 * Shimmer loading placeholders for grid and list card variants.
 * Uses .skeleton-shimmer CSS class.
 */

interface SkeletonCardProps {
  variant?: "grid" | "list";
  aspectRatio?: string;
  className?: string;
}

export function SkeletonCard({ variant = "grid", aspectRatio = "16/9", className }: SkeletonCardProps) {
  if (variant === "list") {
    return (
      <div className={`flex bg-white overflow-hidden ${className || ""}`} style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: "var(--rc-radius-card)" }}>
        <div className="w-16 sm:w-20 flex-shrink-0 skeleton-shimmer self-stretch" />
        <div className="flex-1 min-w-0 flex flex-col py-2.5 px-3 sm:px-4 gap-2">
          <div className="h-4 w-20 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
          <div className="h-3.5 w-full skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
          <div className="h-3.5 w-2/3 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
          <div className="h-3 w-1/2 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
        </div>
        <div className="hidden sm:flex flex-col items-end flex-shrink-0 justify-between py-2.5 pr-4">
          <div className="h-3 w-16 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
          <div className="h-7 w-24 skeleton-shimmer" style={{ borderRadius: "var(--radius-element, 5px)" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white overflow-hidden flex flex-col ${className || ""}`} style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: "var(--rc-radius-card)" }}>
      <div className="w-full skeleton-shimmer" style={{ aspectRatio }} />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-4 w-20 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-full skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
          <div className="h-3.5 w-3/4 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
        </div>
        <div className="h-3 w-2/3 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
        <div className="h-3 w-1/2 skeleton-shimmer" style={{ borderRadius: "var(--radius-inner, 2.5px)" }} />
      </div>
    </div>
  );
}
