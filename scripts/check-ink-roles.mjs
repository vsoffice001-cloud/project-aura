/**
 * check-ink-roles.mjs
 *
 * WHAT: CI guard — scans for `--semantic-ink-subtle` used in roles that require
 *       `--semantic-ink-muted` or stronger per Bible §1.12.1 (G.13.1 doctrine).
 *
 * WHY:  Bible §1.12.1 bans `--semantic-ink-subtle` (4.5:1) on:
 *       - Eyebrows (uppercase tracked labels, any size)
 *       - Captions / italic source lines (10–13px)
 *       - Subtitles / lead-in paragraphs below headings
 *       - Card-internal body text
 *       - Any italic text (double-decrement legibility)
 *       - Text <14px that is not a decorative, disabled, or nav-inactive element
 *
 * HOW:  1. Walk .tsx files in target dirs.
 *       2. Flag lines containing `--semantic-ink-subtle` that match DRIFT patterns.
 *       3. Skip lines containing KEEP patterns (decorative, disabled, bg-, border-, hover:, nav).
 *       4. Report with file:line + matched pattern. Exit 1 on drift.
 *
 * Usage:  node scripts/check-ink-roles.mjs
 *         node scripts/check-ink-roles.mjs --fix-hint   (shows suggested replacement)
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

const SCAN_DIRS = [
  'projects/v1-project/v1-product-page-ver0.4/src/components',
  'projects/charts-showcase/src/components',
  'design-system/core-v2/src',
];

/** Lines containing these patterns are DRIFT — subtle in wrong role */
const DRIFT_PATTERNS = [
  // Eyebrow: uppercase + tracking
  /tracking-\[.*\].*semantic-ink-subtle/,
  /semantic-ink-subtle.*tracking-\[.*\]/,
  /uppercase.*semantic-ink-subtle/,
  /semantic-ink-subtle.*uppercase/,
  // Italic captions
  /italic.*semantic-ink-subtle/,
  /semantic-ink-subtle.*italic/,
  // Paragraph body (standalone <p> with 1rem+ font-size)
  /<p[^>]*className[^>]*text-\[1rem\][^>]*semantic-ink-subtle/,
  /<p[^>]*className[^>]*text-\[0\.875rem\][^>]*semantic-ink-subtle/,
  // Style-prop italic at small size (10–13px range)
  /fontSize:\s*['"]1[0-3]px['"][\s\S]{0,200}semantic-ink-subtle/,
  /fontSize:\s*['"]10\.[0-9]px['"][\s\S]{0,200}semantic-ink-subtle/,
  /semantic-ink-subtle[\s\S]{0,200}fontSize:\s*['"]1[0-3]px['"]/,
  /semantic-ink-subtle[\s\S]{0,200}fontSize:\s*['"]10\.[0-9]px['"]/,
];

/** Lines containing these patterns are KEEP — subtle intentionally correct */
const KEEP_PATTERNS = [
  // Explicit ink-role annotation on preceding comment line (multi-line context check)
  /ink-role:\s*keep/,
  // Decorative bg / border usage (not text)
  /bg-\[var\(--semantic-ink-subtle\)/,
  /border-\[var\(--semantic-ink-subtle\)/,
  // Hover transitions (inactive nav / toggle states)
  /hover:text-\[var\(--semantic-ink/,
  /: 'text-\[var\(--semantic-ink-subtle\)/,
  // Disabled state
  /cursor-not-allowed/,
  /disabled/,
  // Icon (h-N w-N pattern near subtle = decorative icon)
  /h-[0-9].*w-[0-9].*semantic-ink-subtle/,
  /semantic-ink-subtle.*h-[0-9].*w-[0-9]/,
  // CSS var definition block (token injection, not usage)
  /'--semantic-ink-subtle'/,
  // ICON_COLOR constant definition
  /ICON_COLOR.*=.*semantic-ink-subtle/,
  /const.*subtle/,
  // Comment lines
  /\/\/.*semantic-ink-subtle/,
  // Inline nav items (hover pattern = inactive nav)
  /transition-colors cursor-pointer/,
  // Breadcrumb separator / decorative chrome
  /flexShrink:\s*0/,
  // Toggle / pill inactive state (ternary with bg-black text-white active)
  /bg-black.*text-white|text-white.*bg-black/,
  // EcosystemTreemap legend (viz chrome)
  /EcosystemTreemap/,
];

async function walk(dir, results = []) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '_archive' || entry === '.next' || entry === 'dist') continue;
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      await walk(full, results);
    } else if (extname(entry) === '.tsx' || extname(entry) === '.ts') {
      results.push(full);
    }
  }
  return results;
}

async function scanFile(filePath) {
  const src = await readFile(filePath, 'utf8');
  const lines = src.split('\n');
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('semantic-ink-subtle')) continue;

    // Check KEEP patterns against line + 3-line context window (catches preceding comments)
    const lineCtx = lines.slice(Math.max(0, i - 2), i + 2).join('\n');
    const isKeep = KEEP_PATTERNS.some((p) => {
      if (p instanceof RegExp) return p.test(line) || p.test(lineCtx);
      return line.includes(p) || lineCtx.includes(p);
    });
    if (isKeep) continue;

    // Multi-line context (3 lines around current for style-prop patterns)
    const ctx = lines.slice(Math.max(0, i - 2), i + 3).join('\n');

    const isDrift = DRIFT_PATTERNS.some((p) => {
      if (p instanceof RegExp) return p.test(line) || p.test(ctx);
      return line.includes(p) || ctx.includes(p);
    });

    if (isDrift) {
      violations.push({ line: i + 1, text: line.trim() });
    }
  }
  return violations;
}

async function main() {
  const fixHint = process.argv.includes('--fix-hint');
  let totalDrift = 0;

  for (const dir of SCAN_DIRS) {
    const abs = join(ROOT, dir);
    const files = await walk(abs);

    for (const file of files) {
      const violations = await scanFile(file);
      if (violations.length === 0) continue;

      const rel = relative(ROOT, file);
      console.log(`\n🔴 ${rel}`);
      for (const v of violations) {
        console.log(`   L${v.line}: ${v.text.slice(0, 120)}`);
        if (fixHint) {
          console.log(`         → replace --semantic-ink-subtle with --semantic-ink-muted`);
        }
        totalDrift++;
      }
    }
  }

  if (totalDrift === 0) {
    console.log('✅ check-ink-roles: 0 drift violations · all --semantic-ink-subtle usages are in correct roles');
    process.exit(0);
  } else {
    console.log(`\n❌ check-ink-roles: ${totalDrift} drift violation(s) · fix per Bible §1.12.1`);
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
