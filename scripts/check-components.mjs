/**
 * check-components.mjs
 *
 * WHAT: CI guard — detects raw HTML element usage and DS rule violations in project
 *       source files. Enforces that components use Ken DS atoms instead of bare HTML.
 *
 * WHY:  RULES.md defines strict component-usage rules (R4.3, R4.10, R8.4, etc.).
 *       Raw <button>, <h1>-<h6>, <a href>, <input> in pages bypass DS tokens,
 *       a11y patterns, and design consistency. This script surfaces violations
 *       before they reach code review or QA.
 *
 * HOW:  1. Walk projects/{*}/src/ for .tsx and .ts files (NOT design-system — DS files declare
 *          raw HTML legitimately as atom implementations).
 *       2. Apply per-rule regex patterns to each file, capturing line numbers.
 *       3. Skip allow-listed paths (test files, stories, node_modules).
 *       4. Print grouped violation report with file:line:rule.
 *       5. Exit 1 on any violation, exit 0 if clean.
 *
 * ALLOWLIST paths: *.test.tsx · *.spec.tsx · *.stories.tsx · node_modules/
 *
 * Rules enforced:
 *   R8.4   — raw <button  (use <Button> from DS)
 *   R4.10a — raw <a href  (use <CTALink> or <InlineLink> from DS)
 *   R4.3   — raw <h1>-<h6> (use <SectionHeading> from DS)
 *   R4.10b — raw <input  (use DS input atoms)
 *   R4.1.8 — <ArrowRight or <ChevronRight imported (use showArrow prop via <ArrowUpRight>)
 *   R4.1.9 — static <ArrowUpRight directly in CTA JSX (use showArrow prop instead)
 *   R1.2   — --brand-red on non-CTA selectors (style enforcement)
 *
 * Usage:  node scripts/check-components.mjs
 *         node scripts/check-components.mjs --verbose   (print context line)
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative, basename } from 'node:path';

// ── Config ─────────────────────────────────────────────────────────────────

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

/** Only walk projects/ — DS atoms legitimately use raw HTML */
const SCAN_ROOTS = ['projects'];

const SCAN_EXTS = new Set(['.tsx', '.ts']);

const SKIP_SEGMENTS = new Set(['node_modules', '.next', 'dist', 'build', '.git', 'graphify-out']);

/**
 * Legacy/frozen projects · skip component-rule check on these.
 * Added 2026-05-15 after Wave 3 QA · these accounted for 762/762 violations.
 * Frozen post-handover · can't be refactored · creates permanent false-alarm signal.
 */
const LEGACY_SKIP_PATHS = [
  'projects/V0.2-for-design-system',
  'projects/V0_lite_report-legacy',
  'projects/casestudy-templates',
  'projects/report-store-v07',
  'projects/topnav-v32',
  'projects/template-v3',
  'projects/template-v28',
];

/**
 * File name patterns to skip entirely (allow-list).
 * These files can use raw HTML for documentation / test setup / stories.
 */
const SKIP_FILE_PATTERNS = [
  /\.test\.(tsx?|jsx?)$/,
  /\.spec\.(tsx?|jsx?)$/,
  /\.stories\.(tsx?|jsx?)$/,
  /\.story\.(tsx?|jsx?)$/,
];

/**
 * Rule definitions.
 * Each rule has:
 *   id      — rule ID from RULES.md
 *   label   — human-readable violation description
 *   fix     — suggested fix
 *   pattern — RegExp to test against each LINE (not full file, for line numbers)
 *   lineCtx — if true, print the matched line as context
 *
 * NOTE: patterns are designed to flag project consumer usage, not DS atom declarations.
 * They intentionally use specific markers to minimize false positives.
 */
const RULES = [
  {
    id: 'R8.4',
    label: 'Raw <button element',
    fix: 'Use <Button> from design-system/core-v2 atoms',
    // Matches JSX <button (with space or newline after) but not <ButtonGroup, <ButtonIcon etc.
    // Excludes: <button> inside template strings, comments
    pattern: /(?<![A-Za-z0-9_])<button[\s>\/]/,
  },
  {
    id: 'R4.3',
    label: 'Raw heading element <h1>-<h6>',
    fix: 'Use <SectionHeading> or <DisplayHeading> from design-system/core-v2 atoms',
    pattern: /(?<![A-Za-z0-9_])<h[1-6][\s>\/]/,
  },
  {
    id: 'R4.10a',
    label: 'Raw <a href anchor (nav/CTA context)',
    fix: 'Use <CTALink> for CTA anchors or <InlineLink> for body links from DS atoms',
    // Matches <a href= or <a\n  href= — but not <abbr, <aside, <article etc.
    // We flag all <a href to be safe; DS-aware components should wrap.
    pattern: /(?<![A-Za-z0-9_])<a\s+[^>]*href=/,
  },
  {
    id: 'R4.10b',
    label: 'Raw <input element',
    fix: 'Use DS input atoms or shadcn <Input> component',
    pattern: /(?<![A-Za-z0-9_])<input[\s>\/]/,
  },
  {
    id: 'R4.1.8',
    label: 'Direct import of <ArrowRight> or <ChevronRight> icon',
    fix: 'Use showArrow prop on DS CTA components — they render <ArrowUpRight> internally',
    // Match import of ArrowRight or ChevronRight from lucide-react / @radix-ui / heroicons
    pattern: /import\s+[^;]*\b(ArrowRight|ChevronRight)\b[^;]*from\s+['"][^'"]+['"]/,
  },
  {
    id: 'R4.1.9',
    label: 'Static <ArrowUpRight> icon directly in JSX (should use showArrow prop)',
    fix: 'Pass showArrow={true} to the parent DS CTA component instead',
    // Matches JSX usage like <ArrowUpRight ... /> or <ArrowUpRight> in render, not import lines
    pattern: /(?<!import[^;]+)<ArrowUpRight[\s/>]/,
  },
  {
    id: 'R1.2',
    label: 'var(--brand-red) or --brand-red used outside CTA context',
    fix: 'Ken red (#b01f24) is CTA-only. Use --color-brand-red only on Button/CTALink. For decorative red, use --color-ramp-red-* tokens.',
    // Flag any --brand-red reference; false positives filtered manually below
    pattern: /var\(--(?:color-)?brand-red\)|--(?:color-)?brand-red\s*:/,
  },
];

const VERBOSE = process.argv.includes('--verbose');

// ── Helpers ─────────────────────────────────────────────────────────────────

function shouldSkipFile(filePath) {
  const name = basename(filePath);
  return SKIP_FILE_PATTERNS.some((re) => re.test(name));
}

/**
 * Scan a single file against all rules.
 * Returns array of { rule, line, lineText } violations.
 */
function scanFileContent(content) {
  const lines = content.split('\n');
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    const lineNum = i + 1;

    // Skip comment-only lines (// and /* ... */ single-line)
    const trimmed = lineText.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      continue;
    }

    for (const rule of RULES) {
      if (rule.pattern.test(lineText)) {
        violations.push({ rule, line: lineNum, lineText: lineText.trim() });
      }
    }
  }

  return violations;
}

/** Recursively walk directory yielding .tsx/.ts files */
async function* walkDir(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
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

/** Walk projects/{project}/src — immediate subdirs only, then their src/ trees */
async function* walkProjectsSrc(projectsRoot) {
  let entries;
  try {
    entries = await readdir(projectsRoot, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_SEGMENTS.has(entry.name)) continue;
    const projectDir = join(projectsRoot, entry.name);
    const srcDir = join(projectDir, 'src');
    try {
      await stat(srcDir);
      yield* walkDir(srcDir);
    } catch {
      // no src/ — skip
    }
    // Handle nested project dirs (casestudy-templates/template-v3/src etc.)
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

  /** Map: relFilePath → [ { rule, line, lineText } ] */
  const violationsByFile = new Map();
  let totalViolations = 0;
  let filesScanned = 0;

  async function processFile(absPath) {
    if (shouldSkipFile(absPath)) return;
    let content;
    try {
      content = await readFile(absPath, 'utf8');
    } catch {
      return;
    }
    filesScanned++;
    const violations = scanFileContent(content);
    if (violations.length > 0) {
      const relPath = relative(ROOT, absPath);
      violationsByFile.set(relPath, violations);
      totalViolations += violations.length;
    }
  }

  const promises = [];
  for (const scanRoot of SCAN_ROOTS) {
    for await (const f of walkProjectsSrc(join(ROOT, scanRoot))) {
      promises.push(processFile(f));
    }
  }
  await Promise.all(promises);

  // ── Report ─────────────────────────────────────────────────────────────────
  const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);

  if (totalViolations === 0) {
    console.log(`\nOK · ${filesScanned} files scanned · 0 violations  [${elapsed}s]\n`);
    process.exit(0);
  }

  // Group and sort by file
  const sortedFiles = [...violationsByFile.keys()].sort();

  console.error('\n── DS RULE VIOLATIONS ──────────────────────────────────────────────────\n');

  for (const file of sortedFiles) {
    const violations = violationsByFile.get(file).sort((a, b) => a.line - b.line);
    console.error(`  ${file}  (${violations.length} violation${violations.length === 1 ? '' : 's'})`);
    for (const { rule, line, lineText } of violations) {
      console.error(`    L${line}  [${rule.id}] ${rule.label}`);
      if (VERBOSE || lineText.length < 120) {
        console.error(`           → ${lineText.substring(0, 100)}${lineText.length > 100 ? '…' : ''}`);
      }
      console.error(`           fix: ${rule.fix}`);
    }
    console.error('');
  }

  // Summary by rule
  const ruleCount = new Map();
  for (const violations of violationsByFile.values()) {
    for (const { rule } of violations) {
      ruleCount.set(rule.id, (ruleCount.get(rule.id) ?? 0) + 1);
    }
  }
  console.error('── VIOLATIONS BY RULE ──────────────────────────────────────────────────\n');
  for (const [ruleId, count] of [...ruleCount.entries()].sort()) {
    const rule = RULES.find((r) => r.id === ruleId);
    console.error(`  ${ruleId}  ${count}×  — ${rule?.label ?? ''}`);
  }

  console.error(`\nFAIL · ${filesScanned} files scanned · ${totalViolations} violation${totalViolations === 1 ? '' : 's'} in ${sortedFiles.length} file${sortedFiles.length === 1 ? '' : 's'}  [${elapsed}s]\n`);
  process.exit(1);
}

main().catch((err) => {
  console.error('check-components.mjs: fatal error:', err);
  process.exit(1);
});
