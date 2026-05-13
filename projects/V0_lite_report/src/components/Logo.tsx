/**
 * Logo — Ken Research wordmark placeholder.
 *
 * Injected into <TopNavigation logo={<Logo/>}> via render-prop slot.
 * Replace SVG w/ real Ken Research logo asset on first design pass.
 *
 * Phase C step 4e — V0_lite_report consumer.
 */
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-foundation-black)]">
        <span className="text-[var(--color-foundation-white)] font-[var(--typography-family-display)] font-light text-[var(--typography-size-base)]">
          K
        </span>
      </div>
      <span className="font-[var(--typography-family-display)] font-light text-[var(--typography-size-base)] text-[var(--surface-text)] hidden sm:inline">
        Ken Research
      </span>
    </div>
  );
}
