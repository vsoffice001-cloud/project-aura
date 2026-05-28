/**
 * check-tokens.mjs
 *
 * WHAT: CI guard — verifies every var(--xxx) reference in DS core-v2 + all projects
 *       maps to a defined CSS custom property. Prevents silent undefined-token bugs
 *       from reaching production.
 *
 * WHY:  Foundation lock (2026-05-15) established 500+ canonical tokens in base.css.
 *       Components drifting to undefined var() refs produce invisible failures
 *       (CSS falls back to initial/inherit silently). This script makes the failure
 *       loud and blocking in CI.
 *
 * HOW:  1. Collect DEFINED tokens by parsing :root / selector blocks in 4 CSS source files.
 *       2. Walk .tsx/.ts/.css in DS core-v2 src + all projects/{*}/src (exclude node_modules).
 *       3. Extract every var(--xxx) reference with file + line.
 *       4. Diff: referenced − defined − allow-listed = UNDEFINED set.
 *       5. Group undefined by file, print report. Exit 1 on any violation.
 *
 * ALLOWLIST: Standard shadcn/ui CSS variables that are injected at runtime by
 *            the shadcn layer and not present in Ken DS token files.
 *
 * Usage:  node scripts/check-tokens.mjs
 *         node scripts/check-tokens.mjs --verbose   (prints all refs per file)
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';

// ── Config ─────────────────────────────────────────────────────────────────

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

/** CSS files to parse for DEFINED tokens (all `:root { --xxx }` and selector-scoped blocks) */
const DEFINITION_SOURCES = [
  'design-system/core-v2/src/styles/base.css',
  'design-system/tokens/build/tokens.css',
  'design-system/core-v2/src/styles/editorial-light.css',
  'design-system/core-v2/src/styles/cinematic-dark.css',
];

/** Directories to walk for REFERENCED tokens */
const REFERENCE_ROOTS = [
  'design-system/core-v2/src',
  'projects',
];

/** Extensions to scan */
const SCAN_EXTS = new Set(['.tsx', '.ts', '.css']);

/** Directories / path segments to skip entirely */
const SKIP_SEGMENTS = new Set(['node_modules', '.next', 'dist', 'build', '.git', 'graphify-out']);

/**
 * Legacy/frozen projects · skip token check on these.
 * Added 2026-05-15 after Wave 3 QA · these inflated undefined-count to 256 when real DS count was 8.
 * Frozen post-handover · cannot be re-tokenized · would create permanent false-alarm CI signal.
 */
const LEGACY_SKIP_PATHS = [
  'projects/V0.2-for-design-system',
  'projects/V0_lite_report-legacy',
  'projects/casestudy-templates',
  'projects/report-store-v07',
  'projects/topnav-v32',
  'projects/template-v3',
  'projects/template-v28',
  'V0.2 -for design system',
  'v1-product-page-ver0.4',
  'report-store-v07',
];

/**
 * shadcn/ui + Tailwind v4 + Radix runtime tokens.
 * These are injected by shadcn's globals.css and not defined in Ken DS files.
 * Prefix patterns: any token starting with these prefixes is allowed.
 */
const ALLOWLIST_PREFIXES = [
  '--background',
  '--foreground',
  '--ring',
  '--input',
  '--border',
  '--primary',
  '--secondary',
  '--accent',
  '--muted',
  '--popover',
  '--card',
  '--destructive',
  '--sidebar',
  '--radius',
  '--chart-',
  // Radix UI runtime-injected tokens (not in Ken DS token files)
  '--radix-',
  // Figma Make / auto-generated SVG icon tokens (Figma export convention with fallbacks)
  '--stroke-',
  '--fill-',
  '--color-fill-',
  '--color-stroke-',
];

/** Exact allow-listed tokens (full names) */
const ALLOWLIST_EXACT = new Set([
  '--tw-ring-color',
  '--tw-ring-shadow',
  '--tw-shadow',
  '--tw-shadow-color',
  '--tw-ring-inset',
  '--tw-ring-offset-shadow',
  '--tw-ring-offset-color',
  '--tw-ring-offset-width',
  '--tw-blur',
  '--tw-brightness',
  '--tw-contrast',
  '--tw-grayscale',
  '--tw-hue-rotate',
  '--tw-invert',
  '--tw-opacity',
  '--tw-saturate',
  '--tw-sepia',
  '--tw-backdrop-blur',
  '--tw-backdrop-brightness',
  '--tw-backdrop-contrast',
  '--tw-backdrop-grayscale',
  '--tw-backdrop-hue-rotate',
  '--tw-backdrop-invert',
  '--tw-backdrop-opacity',
  '--tw-backdrop-saturate',
  '--tw-backdrop-sepia',
  '--tw-drop-shadow',
  '--tw-translate-x',
  '--tw-translate-y',
  '--tw-rotate',
  '--tw-skew-x',
  '--tw-skew-y',
  '--tw-scale-x',
  '--tw-scale-y',
  '--tw-scroll-snap-strictness',
  '--tw-ordinal',
  '--tw-slashed-zero',
  '--tw-numeric-figure',
  '--tw-numeric-spacing',
  '--tw-numeric-fraction',
  '--tw-border-spacing-x',
  '--tw-border-spacing-y',
  '--tw-gradient-stops',
  '--tw-gradient-from',
  '--tw-gradient-via',
  '--tw-gradient-to',
  '--tw-content',
  '--tw-pan-x',
  '--tw-pan-y',
  '--tw-pinch-zoom',
  '--color',               // Tailwind v4 internal
  '--spacing',             // Tailwind v4 internal
  '--font-dm-sans',        // Next.js font variable (injected at runtime)
  '--font-noto-serif',     // Next.js font variable (injected at runtime)
]);

const VERBOSE = process.argv.includes('--verbose');

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Skip token names that are clearly incomplete/dynamic constructs extracted
 * from Tailwind safelist strings or template literal partial matches.
 * e.g. "--button-height-" (ends in dash — concatenated at runtime)
 *      "--token" (literal placeholder word, not a real token name)
 *      "--color-" (prefix only, full name computed at runtime)
 */
function isMalformedTokenName(tokenName) {
  if (tokenName.endsWith('-')) return true;               // partial/dynamic
  if (tokenName === '--token') return true;               // placeholder
  if (tokenName === '--color-') return true;              // prefix only
  if (tokenName === '--spacing') return true;             // Tailwind v4 config
  if (tokenName === '--color') return true;               // Tailwind v4 config
  return false;
}

function isAllowListed(tokenName) {
  if (isMalformedTokenName(tokenName)) return true;
  if (ALLOWLIST_EXACT.has(tokenName)) return true;
  for (const prefix of ALLOWLIST_PREFIXES) {
    if (tokenName.startsWith(prefix)) return true;
  }
  return false;
}

/**
 * Parse CSS content and extract all CSS custom property names defined in it.
 * Handles:
 *   - :root { --foo: ... }
 *   - [data-variant="x"] { --foo: ... }
 *   - @layer tokens { :root { --foo: ... } }
 *   - Any selector block containing --xxx: definitions
 */
function extractDefinedTokens(cssContent) {
  const defined = new Set();
  // Match CSS custom property definitions: --token-name: (with optional leading whitespace)
  const defRe = /^\s*(--[\w-]+)\s*:/gm;
  let m;
  while ((m = defRe.exec(cssContent)) !== null) {
    defined.add(m[1]);
  }
  return defined;
}

/**
 * Extract all var(--xxx) references from file content.
 * Returns array of { token, line } objects.
 */
function extractReferences(content) {
  const refs = [];
  // Match var(--token-name) — capture the token name only
  // Also match var(--token-name, fallback) — capture first arg
  const refRe = /var\(\s*(--[\w-]+)/g;
  const lines = content.split('\n');
  let lineIdx = 0;
  let charPos = 0;

  // Build line start positions for fast line lookup
  const lineStarts = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\n') lineStarts.push(i + 1);
  }

  let match;
  while ((match = refRe.exec(content)) !== null) {
    const pos = match.index;
    // Binary search for line number
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= pos) lo = mid;
      else hi = mid - 1;
    }
    refs.push({ token: match[1], line: lo + 1 });
  }
  return refs;
}

/** Recursively walk directory, yielding file paths with allowed extensions. */
async function* walkDir(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // dir doesn't exist, skip
  }
  for (const entry of entries) {
    if (SKIP_SEGMENTS.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (LEGACY_SKIP_PATHS.some(p => fullPath.includes(p))) continue;
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (entry.isFile() && SCAN_EXTS.has(extname(entry.name))) {
      yield fullPath;
    }
  }
}

/** For projects/ root — walk immediate subdirs (each is a project), then their src/ */
async function* walkProjectsSrc(projectsRoot) {
  let entries;
  try {
    entries = await readdir(projectsRoot, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_SEGMENTS.has(entry.name)) continue;
    const projectDir = join(projectsRoot, entry.name);
    const srcDir = join(projectDir, 'src');
    // Try src/ first; fall back to walking entire project dir
    try {
      await stat(srcDir);
      yield* walkDir(srcDir);
    } catch {
      // No src dir — skip (don't walk entire project tree, too slow)
    }
    // Also handle nested projects like casestudy-templates/template-v3/src
    const subEntries = await readdir(projectDir, { withFileTypes: true }).catch(() => []);
    for (const sub of subEntries) {
      if (!sub.isDirectory() || SKIP_SEGMENTS.has(sub.name)) continue;
      const subSrc = join(projectDir, sub.name, 'src');
      try {
        await stat(subSrc);
        yield* walkDir(subSrc);
      } catch {
        // no nested src
      }
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const startMs = Date.now();

  // ── Step 1: Build DEFINED set ─────────────────────────────────────────────
  const defined = new Set();
  for (const relPath of DEFINITION_SOURCES) {
    const absPath = join(ROOT, relPath);
    try {
      const content = await readFile(absPath, 'utf8');
      const tokens = extractDefinedTokens(content);
      for (const t of tokens) defined.add(t);
    } catch (err) {
      console.warn(`WARN: Could not read definition source: ${relPath} — ${err.message}`);
    }
  }

  // ── Step 2: Collect REFERENCED tokens across all source files ─────────────
  // Map: tokenName → [ { file, line } ]
  const referenced = new Map();

  async function scanFile(absPath) {
    let content;
    try {
      content = await readFile(absPath, 'utf8');
    } catch {
      return;
    }
    const refs = extractReferences(content);
    const relPath = relative(ROOT, absPath);
    for (const { token, line } of refs) {
      if (!referenced.has(token)) referenced.set(token, []);
      referenced.get(token).push({ file: relPath, line });
    }
  }

  const scanPromises = [];

  // DS core-v2 src
  for await (const f of walkDir(join(ROOT, 'design-system/core-v2/src'))) {
    scanPromises.push(scanFile(f));
  }

  // projects/*/src
  for await (const f of walkProjectsSrc(join(ROOT, 'projects'))) {
    scanPromises.push(scanFile(f));
  }

  await Promise.all(scanPromises);

  // ── Step 3: Diff ──────────────────────────────────────────────────────────
  // undefined = referenced − defined − allow-listed
  /** Map: tokenName → [ { file, line } ] */
  const undefinedTokens = new Map();

  for (const [token, locs] of referenced) {
    if (defined.has(token)) continue;
    if (isAllowListed(token)) continue;
    undefinedTokens.set(token, locs);
  }

  // ── Step 4: Report ────────────────────────────────────────────────────────
  const totalRef = referenced.size;
  const totalDef = defined.size;
  const totalUndef = undefinedTokens.size;

  if (totalUndef === 0) {
    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
    console.log(`\nOK · ${totalDef} defined · ${totalRef} referenced · 0 undefined  [${elapsed}s]\n`);
    process.exit(0);
  }

  // Group violations by file for readable output
  /** Map: file → [ { token, line } ] */
  const byFile = new Map();
  for (const [token, locs] of undefinedTokens) {
    for (const { file, line } of locs) {
      if (!byFile.has(file)) byFile.set(file, []);
      byFile.get(file).push({ token, line });
    }
  }

  // Sort files alphabetically
  const sortedFiles = [...byFile.keys()].sort();

  console.error('\n── UNDEFINED TOKEN REFERENCES ──────────────────────────────────────────\n');
  for (const file of sortedFiles) {
    const violations = byFile.get(file).sort((a, b) => a.line - b.line);
    console.error(`  ${file}`);
    for (const { token, line } of violations) {
      console.error(`    L${line}: ${token}`);
    }
    console.error('');
  }

  // Print unique undefined token names
  const sortedUndef = [...undefinedTokens.keys()].sort();
  console.error('── UNIQUE UNDEFINED TOKENS ─────────────────────────────────────────────\n');
  for (const t of sortedUndef) {
    const count = undefinedTokens.get(t).length;
    console.error(`  ${t}  (${count} ref${count === 1 ? '' : 's'})`);
  }

  const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
  console.error(`\nFAIL · ${totalDef} defined · ${totalRef} referenced · ${totalUndef} undefined  [${elapsed}s]\n`);
  process.exit(1);
}

main().catch((err) => {
  console.error('check-tokens.mjs: fatal error:', err);
  process.exit(1);
});
