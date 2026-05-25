/**
 * tab-styles · PILL tab className constants · v0.4 PDP
 *
 * @what  TabsList + TabsTrigger className strings · pill style matching
 *        report-store-legacy IndustryReportSection (L68-102) verbatim.
 *
 * @why   DS Tabs primitive (`@kenresearch/design-system/ui/tabs`) is shadcn-
 *        default · ships heavy base classes (h-9 · rounded-xl · bg-muted ·
 *        flex-1 · text-sm · data-[state=active]:bg-card). Consumer className
 *        merges via cn() but DS base props on different state groups win.
 *        Solution: use `!` priority on EVERY conflicting property so consumer
 *        wins deterministically.
 *
 * @pattern · pixel-exact to report-store L74-86
 *   Active:   bg-black text-white border-black font-medium
 *   Inactive: bg-transparent text-black/50 border-warm-500 font-normal
 *             hover:text-black hover:border-black/30
 *   Border:   1px always
 *   Radius:   5px (NOT pill-full)
 *   Padding:  px-3.5 py-2.5 sm:py-1.5
 *   Font:     14px DM Sans (Tier 1) · 11px (Tier 2)
 *   Layout:   flex gap-1.5 · wraps · NOT end-to-end
 *
 * @decision_locked 2026-05-22 night · 5th iteration · FINAL
 *   - Source: `projects/report-store-legacy/.../IndustryReportSection.tsx` L68-102
 *   - User mandate 3× reinforcement: pill black-active w/ white text
 *   - DS TabStrip molecule (underline pattern) = separate component · view-switcher
 *     context · NOT for PDP section content tabs
 *
 * @how
 *   ```tsx
 *   import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
 *
 *   <TabsList className={TABS_LIST_PRIMARY}>
 *     <TabsTrigger value="..." className={TABS_TRIGGER_PRIMARY}>
 *       Overview <span className="ml-1.5 opacity-60 text-[11px]">(4)</span>
 *     </TabsTrigger>
 *   </TabsList>
 *   ```
 */

// ── Tier 1 · Primary content tabs · pill chrome · 5px radius · 14px text ────

/**
 * TabsList wrapper · clears DS h-9/rounded-xl/bg-muted defaults via ! priority.
 * Flex-wrap so tabs wrap on narrow viewports (NOT end-to-end horizontal).
 */
export const TABS_LIST_PRIMARY = [
  '!h-auto',                  // override DS h-9
  '!w-full',                  // override DS w-fit
  '!bg-transparent',          // override DS bg-muted
  '!rounded-none',            // override DS rounded-xl
  '!p-0',                     // override DS p-[3px]
  '!justify-start',           // override DS justify-center
  '!flex !flex-wrap !gap-1.5 !mb-6',
].join(' ');

/**
 * TabsTrigger · pill · overrides DS rounded-xl/flex-1/text-sm/data-[state=active]:bg-card.
 * `!` priority on every property that conflicts w/ DS base classes.
 */
export const TABS_TRIGGER_PRIMARY = [
  '!inline-flex !items-center !justify-start',
  '!h-auto',                  // override DS h-[calc(100%-1px)]
  '!flex-none',               // override DS flex-1 (don't stretch each tab equal)
  '!px-3.5 !py-2.5 sm:!py-1.5',
  '!rounded-[5px]',           // override DS rounded-xl
  '!border',
  'transition-all whitespace-nowrap cursor-pointer',
  '!text-[14px] !font-normal',
  '!bg-transparent !text-[rgba(0,0,0,0.5)]',
  '!border-[var(--warm-500,#e8e4e0)]',
  'hover:!text-black hover:!border-[rgba(0,0,0,0.3)]',
  // active state · all `!` to defeat DS data-[state=active]:bg-card
  'data-[state=active]:!bg-black',
  'data-[state=active]:!text-white',
  'data-[state=active]:!border-black',
  'data-[state=active]:!font-medium',
  'focus-visible:!outline-none',
  'focus-visible:!ring-2 focus-visible:!ring-[var(--color-brand-red,#b01f24)] focus-visible:!ring-offset-2',
].join(' ');

// ── Tier 2 · Subtle sub-pills · 11px · for filter sub-rows ──────────────────

export const TABS_LIST_SUBTLE = [
  '!h-auto !w-full !bg-transparent !rounded-none !p-0 !justify-start',
  '!flex !flex-wrap !gap-1.5 !mb-4',
].join(' ');

export const TABS_TRIGGER_SUBTLE = [
  '!inline-flex !items-center !justify-start',
  '!h-auto !flex-none',
  '!px-2.5 !py-2 sm:!py-1',
  '!rounded-[5px] !border',
  'transition-all whitespace-nowrap cursor-pointer',
  '!text-[11px] !font-normal',
  '!bg-transparent !text-[rgba(0,0,0,0.45)]',
  '!border-[var(--warm-500,#e8e4e0)]',
  'hover:!text-black hover:!border-[rgba(0,0,0,0.3)]',
  'data-[state=active]:!bg-black',
  'data-[state=active]:!text-white',
  'data-[state=active]:!border-black',
  'data-[state=active]:!font-medium',
  'focus-visible:!outline-none',
  'focus-visible:!ring-2 focus-visible:!ring-[var(--color-brand-red,#b01f24)] focus-visible:!ring-offset-2',
].join(' ');
