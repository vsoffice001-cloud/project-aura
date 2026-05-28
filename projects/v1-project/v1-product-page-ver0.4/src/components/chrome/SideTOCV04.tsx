'use client';

/**
 * SideTOCV04 — v0.4 sticky TOC (V0.2 canonical 3-state pattern · spec-correct)
 *
 * @what  Sticky left sidebar · V0.2-canonical 3-state items:
 *          - active    → filled black circle w/ number · bg-[--black-50] row · ink-strong bold text
 *          - completed → filled black circle w/ Check icon · ink-body 70% text · hover bg
 *          - upcoming  → light grey circle w/ faded number · ink-subtle 50% text
 *        Truncated titles + Tooltip-on-truncation (report-store pattern).
 *        Bottom-pinned CTA INSIDE sticky flex column.
 *        Mobile/tablet: Sheet drawer from left.
 *
 * @why   User 2026-05-21: V0.2 3-state UI canonical · drop my red 2px L border invention.
 *        Source canonical: projects/V0.2 -for design system/src/app/components/TableOfContentsSidebar.tsx L100-128
 *
 * @when  v0.4 chrome L4a. PDP body left col. Below DummyHeaderV04.
 *
 * @how   240px sticky col · flex column · "IN THIS REPORT" subtle label · scrollable nav (overflow-y-auto · scroll-spy active scrollIntoView) · bottom CTA pinned at flex end.
 */

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useScrollSpy } from '@kenresearch/design-system/hooks';
import { Tooltip } from '@kenresearch/design-system/atoms';
import { Button } from '@kenresearch/design-system/atoms';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@kenresearch/design-system/ui/sheet';

export interface SideTOCItem {
  id: string;
  number: string;
  title: string;
}

type TOCStatus = 'active' | 'completed' | 'upcoming';

export interface SideTOCV04Props {
  sections: SideTOCItem[];
  /** Sticky top offset (header height). Default 108px lg. */
  scrollOffset?: number;
  /** Mobile drawer open state · controlled by parent (header hamburger) */
  drawerOpen: boolean;
  /** Drawer close callback */
  onDrawerOpenChange: (open: boolean) => void;
}

/**
 * Status circle · 20px round · filled black (active/completed) OR light grey outline (upcoming).
 */
function StatusCircle({ status, number }: { status: TOCStatus; number: string }) {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const filled = isActive || isCompleted;

  return (
    <span
      aria-hidden="true"
      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
      style={{
        background: filled ? 'var(--color-foundation-black, #171717)' : 'var(--black-100, #f5f5f5)',
        color: filled ? '#ffffff' : 'rgba(115,115,115,0.5)',
      }}
    >
      {isCompleted ? (
        <Check className="w-3 h-3" strokeWidth={3} />
      ) : (
        <span className="text-[11px] tabular-nums font-medium">{number}</span>
      )}
    </span>
  );
}

/**
 * Single TOC row · handles truncation detection + conditional Tooltip wrap.
 */
function TOCRow({
  item,
  status,
  scrollOffset,
  itemRef,
  onClick,
}: {
  item: SideTOCItem;
  status: TOCStatus;
  scrollOffset: number;
  itemRef?: React.RefObject<HTMLLIElement | null>;
  onClick?: () => void;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = useState(false);

  // Detect truncation
  useEffect(() => {
    if (!labelRef.current) return;
    const detect = () => {
      const el = labelRef.current;
      if (!el) return;
      setTruncated(el.scrollWidth > el.clientWidth);
    };
    detect();
    const ro = new ResizeObserver(detect);
    ro.observe(labelRef.current);
    return () => ro.disconnect();
  }, [item.title]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = document.getElementById(item.id);
    if (!target) return;
    const top = target.offsetTop - scrollOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    onClick?.();
  }

  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  const rowClass = isActive
    ? 'bg-[var(--black-100,#f5f5f5)] text-[var(--semantic-ink-strong,#171717)] font-bold'
    : isCompleted
      ? 'text-[var(--semantic-ink-body,#171717)] opacity-70 hover:bg-[var(--black-50,#fafafa)] hover:opacity-100'
      : 'text-[var(--semantic-ink-subtle,#737373)] opacity-50 hover:bg-[var(--black-50,#fafafa)] hover:opacity-100 hover:text-[var(--semantic-ink-strong)]';

  const label = (
    <span
      ref={labelRef}
      className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left"
    >
      {item.title}
    </span>
  );

  return (
    <li ref={itemRef}>
      <button
        type="button"
        onClick={handleClick}
        aria-current={isActive ? 'true' : undefined}
        className={`w-full text-left px-3 py-2 rounded-[var(--radius-2xs,2.5px)] flex items-center gap-2 transition-all duration-200 ${rowClass}`}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          lineHeight: '1.4',
        }}
      >
        <StatusCircle status={status} number={item.number} />
        {truncated ? (
          <Tooltip text={item.title} position="top">
            {label}
          </Tooltip>
        ) : (
          label
        )}
      </button>
    </li>
  );
}

function BottomCTACard() {
  return (
    <div className="border-t border-[var(--black-100)] bg-[var(--black-50,#fafafa)] p-4">
      <p className="font-body text-[12px] leading-relaxed mb-3 text-[var(--semantic-ink-muted)]">
        Get the full Australia Cold Chain report.
      </p>
      <Button variant="brand" size="sm" fullWidth animatedArrow>
        Download Sample
      </Button>
    </div>
  );
}

function TOCList({
  sections,
  scrollOffset,
  onItemClick,
}: {
  sections: SideTOCItem[];
  scrollOffset: number;
  onItemClick?: () => void;
}) {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds, 200);
  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const itemRefs = useRef<Record<string, React.RefObject<HTMLLIElement | null>>>({});

  sections.forEach((s) => {
    if (!itemRefs.current[s.id]) itemRefs.current[s.id] = { current: null };
  });

  // Auto-scroll TOC list so active item stays inside viewport
  useEffect(() => {
    if (!activeId) return;
    const ref = itemRefs.current[activeId];
    if (ref?.current) {
      ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  function statusFor(idx: number): TOCStatus {
    if (activeIndex === -1) return 'upcoming';
    if (idx === activeIndex) return 'active';
    if (idx < activeIndex) return 'completed';
    return 'upcoming';
  }

  return (
    <ol className="space-y-0.5 px-2 py-2">
      {sections.map((item, idx) => (
        <TOCRow
          key={item.id}
          item={item}
          status={statusFor(idx)}
          scrollOffset={scrollOffset}
          itemRef={itemRefs.current[item.id]}
          onClick={onItemClick}
        />
      ))}
    </ol>
  );
}

export function SideTOCV04({
  sections,
  scrollOffset = 108,
  drawerOpen,
  onDrawerOpenChange,
}: SideTOCV04Props) {
  return (
    <>
      {/* ─── Desktop sticky sidebar · lg+ only · 240px col ─────── */}
      <aside
        aria-label="Table of contents"
        className="hidden lg:flex lg:flex-col flex-shrink-0 sticky self-start"
        style={{
          width: '240px',
          top: `${scrollOffset}px`,
          height: `calc(100vh - ${scrollOffset}px)`,
          zIndex: 40,
        }}
      >
        {/* Header label · subtle */}
        <div className="flex items-center gap-2 px-4 pb-3 pt-4 border-b border-[var(--black-100)]">
          <span
            className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600 }}
          >
            Table of Contents
          </span>
        </div>

        {/* Scrollable nav · flex-1 · subtle scrollbar */}
        <nav
          aria-label="Report sections"
          className="flex-1 min-h-0 overflow-y-auto side-toc-scrollbar"
        >
          <TOCList sections={sections} scrollOffset={scrollOffset} />
        </nav>

        {/* Bottom CTA · pinned at flex end · inside sticky col */}
        <BottomCTACard />
      </aside>

      {/* ─── Mobile/tablet drawer · Sheet from left ─────────────── */}
      <Sheet open={drawerOpen} onOpenChange={onDrawerOpenChange}>
        <SheetContent
          id="side-toc-drawer"
          side="left"
          className="w-[300px] p-0 flex flex-col lg:hidden bg-[var(--color-foundation-white)]"
        >
          <SheetHeader className="border-b border-[var(--black-100)] p-4">
            <SheetTitle
              className="text-[var(--semantic-ink-muted)]"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              Table of Contents
            </SheetTitle>
          </SheetHeader>
          <nav
            aria-label="Report sections"
            className="flex-1 min-h-0 overflow-y-auto side-toc-scrollbar"
          >
            <TOCList
              sections={sections}
              scrollOffset={scrollOffset}
              onItemClick={() => onDrawerOpenChange(false)}
            />
          </nav>
          <BottomCTACard />
        </SheetContent>
      </Sheet>

      <style>{`
        .side-toc-scrollbar::-webkit-scrollbar { width: 4px; }
        .side-toc-scrollbar::-webkit-scrollbar-thumb { background: var(--black-200); border-radius: 2px; }
        .side-toc-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </>
  );
}
