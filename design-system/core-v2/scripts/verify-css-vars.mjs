#!/usr/bin/env node
/**
 * verify-css-vars.mjs · CSS custom property usage verification.
 *
 * WHY  · G.7 audit found `--semantic-ink-muted` referenced in 7+ components
 *        but never defined → silent fallback risk. This script fails build if
 *        any var(--xxx) reference in TS/TSX/CSS source is not defined in base.css.
 *
 * WHAT · Greps var(--xxx) from all src/**\/*.{tsx,ts,css} files ·
 *        checks each name is defined in base.css (:root { --xxx: }) ·
 *        reports missing vars to stderr · exits 1 if any missing.
 *
 * WHEN · Run via `pnpm verify-css-vars` before handover or as pre-commit.
 *        Added to package.json scripts as `verify-css-vars`.
 *
 * HOW  · `node scripts/verify-css-vars.mjs`
 *        `pnpm verify-css-vars`
 *
 * @module design-system/core-v2/scripts/verify-css-vars
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const SRC_DIR = resolve(import.meta.dirname, '../src');
const BASE_CSS = resolve(import.meta.dirname, '../src/styles/base.css');
// Additional CSS definition sources: tokens.css (Style Dictionary build) + variant CSS files
const EXTRA_DEFINITION_SOURCES = [
  resolve(import.meta.dirname, '../../../design-system/tokens/build/tokens.css'),
  resolve(import.meta.dirname, '../src/styles/cinematic-dark.css'),
  resolve(import.meta.dirname, '../src/styles/editorial-light.css'),
];

// ─── Allowlist: vars defined outside base.css (third-party, injected at runtime) ───────
const EXTERNAL_VAR_ALLOWLIST = new Set([
  // Tailwind v4 CSS vars — defined by the Tailwind runtime, not our base.css
  '--tw-border-spacing-x', '--tw-border-spacing-y',
  '--tw-translate-x', '--tw-translate-y', '--tw-rotate', '--tw-skew-x', '--tw-skew-y',
  '--tw-scale-x', '--tw-scale-y', '--tw-pan-x', '--tw-pan-y', '--tw-pinch-zoom',
  '--tw-scroll-snap-strictness', '--tw-gradient-from-position', '--tw-gradient-via-position',
  '--tw-gradient-to-position', '--tw-ordinal', '--tw-slashed-zero', '--tw-numeric-figure',
  '--tw-numeric-spacing', '--tw-numeric-fraction', '--tw-ring-inset', '--tw-ring-offset-width',
  '--tw-ring-offset-color', '--tw-ring-color', '--tw-ring-shadow', '--tw-ring-offset-shadow',
  '--tw-shadow', '--tw-shadow-colored', '--tw-blur', '--tw-brightness', '--tw-contrast',
  '--tw-grayscale', '--tw-hue-rotate', '--tw-invert', '--tw-saturate', '--tw-sepia',
  '--tw-drop-shadow', '--tw-backdrop-blur', '--tw-backdrop-brightness', '--tw-backdrop-contrast',
  '--tw-backdrop-grayscale', '--tw-backdrop-hue-rotate', '--tw-backdrop-invert',
  '--tw-backdrop-opacity', '--tw-backdrop-saturate', '--tw-backdrop-sepia',
  // Radix UI vars — defined by Radix components at runtime
  '--radix-accordion-content-height', '--radix-collapsible-content-height',
  '--radix-select-content-available-height', '--radix-select-content-available-width',
  '--radix-select-trigger-height', '--radix-select-trigger-width',
  '--radix-popper-available-height', '--radix-popper-available-width',
  '--radix-popper-anchor-height', '--radix-popper-anchor-width',
  '--radix-popper-transform-origin',
  '--radix-navigation-menu-viewport-height', '--radix-navigation-menu-viewport-width',
  // shadcn/ui sidebar vars — defined by shadcn sidebar component internals
  '--sidebar', '--sidebar-accent', '--sidebar-accent-foreground', '--sidebar-border',
  '--sidebar-foreground', '--sidebar-primary', '--sidebar-primary-foreground',
  '--sidebar-ring', '--sidebar-width', '--sidebar-width-icon', '--sidebar-width-mobile',
  // shadcn/ui theme vars (set by shadcn at consumer level via CSS layer)
  '--border', '--popover', '--popover-foreground', '--spacing',
  // Consumer-provided (injected at root by design-system consumers)
  '--font-display', '--font-body',
  // Next.js image vars
  '--next-image-max-size',
  // Highcharts injected vars
  '--highcharts-color-0', '--highcharts-background-color',
  // TableShell instance-scoped --row-height (set inline, not in base.css)
  '--row-height',
  // DS vars set by consumers at page/section scope (not global base.css)
  '--token',  // ctaThemes.ts · consumer-set per CTA theme
  // Next.js font vars — defined by consumer layout.tsx via next/font
  '--font-dm-sans', '--font-noto-serif',
  // Consumer-layout vars — defined per page/project outside DS scope
  '--navbar-height', '--toc-width', '--sticky-toc-top', '--scroll-margin-section',
  // Button vars with trailing hyphen — partial match artifact (--button-height-sm etc. are defined)
  '--button-height-',
]);

// ─── Step 1: Parse defined vars from base.css ─────────────────────────────────

/** Extract all CSS custom property definitions: --xxx: value */
const DEFINED_VAR_RE = /--[\w-]+(?=\s*:)/g;
const definedVars = new Set();

// Collect definitions from base.css + extra sources (tokens.css + variant CSS files)
const definitionSources = [BASE_CSS, ...EXTRA_DEFINITION_SOURCES];
for (const src of definitionSources) {
  try {
    const content = readFileSync(src, 'utf-8');
    for (const m of content.matchAll(DEFINED_VAR_RE)) definedVars.add(m[0]);
  } catch {
    // Optional source missing — skip
  }
}

// ─── Step 2: Walk src/ and collect all var(--xxx) references ─────────────────

/** Recursively collect all files matching extensions */
function collectFiles(dir, exts, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      // Skip generated files and node_modules
      if (!['node_modules', 'dist', '.next', 'playground'].includes(entry)) {
        collectFiles(full, exts, acc);
      }
    } else if (exts.some(e => full.endsWith(e))) {
      acc.push(full);
    }
  }
  return acc;
}

const SOURCE_FILES = collectFiles(SRC_DIR, ['.tsx', '.ts', '.css']);

/** Extract all var(--xxx) references from a string */
const VAR_REF_RE = /var\(\s*(--[\w-]+)/g;

// Map: varName → Set of files that reference it
const usages = new Map();

for (const file of SOURCE_FILES) {
  const content = readFileSync(file, 'utf-8');
  let m;
  VAR_REF_RE.lastIndex = 0;
  const re = /var\(\s*(--[\w-]+)/g;
  while ((m = re.exec(content)) !== null) {
    const varName = m[1];
    if (!usages.has(varName)) usages.set(varName, new Set());
    usages.get(varName).add(file.replace(SRC_DIR + '/', 'src/'));
  }
}

// ─── Step 3: Find undefined vars ─────────────────────────────────────────────

const missing = [];
for (const [varName, files] of usages.entries()) {
  if (!definedVars.has(varName) && !EXTERNAL_VAR_ALLOWLIST.has(varName)) {
    missing.push({ varName, files: [...files] });
  }
}

// ─── Step 4: Report ───────────────────────────────────────────────────────────

const total = usages.size;
const defined = total - missing.length;

const defSrcNames = definitionSources.map(s => s.split('/').slice(-3).join('/')).join(' + ');
console.log(`\n  CSS var verification`);
console.log(`  Definition sources: ${defSrcNames}`);
console.log(`  Source files scanned: ${SOURCE_FILES.length}`);
console.log(`  Unique vars referenced: ${total}`);
console.log(`  Defined in base.css:  ${defined}`);

if (missing.length === 0) {
  console.log(`  Missing vars: 0 — all clear\n`);
  process.exit(0);
} else {
  console.error(`\n  MISSING CSS VARS (${missing.length}):`);
  for (const { varName, files } of missing.sort((a, b) => a.varName.localeCompare(b.varName))) {
    console.error(`    ${varName}`);
    for (const f of files.slice(0, 3)) {
      console.error(`      → ${f}`);
    }
    if (files.length > 3) console.error(`      → ...and ${files.length - 3} more`);
  }
  console.error(`\n  Add missing vars to src/styles/base.css or the EXTERNAL_VAR_ALLOWLIST.\n`);
  process.exit(1);
}
