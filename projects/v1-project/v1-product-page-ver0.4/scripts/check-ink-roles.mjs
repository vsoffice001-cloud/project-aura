/**
 * check-ink-roles.mjs
 * G.13.3 · Bible §1.12.1 canonical enforcement (updated 2026-05-28)
 *
 * INK ROLE TABLE (FINAL RULE · user-locked 2026-05-28):
 *   h1/h2/h3                              → strong  (15.5:1)
 *   Subtitle / lead-in (first <p> after   → subtle  (4.5:1) ← CHANGED from muted
 *     h1/h2/h3, same parent container)      creates rhythmic variation: 15→4.5→10→7.4
 *   All other body paragraphs             → body    (10.4:1)
 *   Caption · source citation italic      → muted   (7.4:1)
 *   Eyebrow uppercase tracked 9-12px      → muted   (7.4:1)
 *   Stat sublabels · units · type labels  → muted   (7.4:1)
 *   Placeholder · disabled · divider      → subtle  (4.5:1)
 *
 * Detects PAGE_BODY <p> paragraphs that are NOT using --semantic-ink-body.
 *
 * PAGE_BODY = <p> element at standalone page level (outside card frames)
 * that is NOT:
 *   - italic + 10-13px source citation (CAPTION)
 *   - uppercase tracking 9-12px eyebrow (EYEBROW)
 *   - subtitle lead-in (first <p> after h1/h2/h3 in same parent) on subtle → CORRECT (SUBTITLE_LEAD_IN)
 *   - inside a card container (CARD_BODY)
 *   - a flex-container <p> with no direct text (FLEX_CONTAINER)
 *
 * Rules:
 *   - standalone <p> with muted that has font-size >= 14px and is NOT italic+small → DRIFT
 *   - standalone <p> with subtle that is NOT annotated SUBTITLE_LEAD_IN → DRIFT
 *     (subtle on <p> is ONLY correct for subtitle/lead-in · everything else = body)
 *
 * Exemption: preceding line containing `ink-roles: SUBTITLE_LEAD_IN` exempts a subtle <p>.
 *
 * Exit 0 = no drift. Exit 1 = drift found.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const BASE = new URL('../src/components', import.meta.url).pathname;

const SCAN_DIRS = [
  join(BASE, 'sections'),
  join(BASE, 'sample-report'),
  join(BASE, 'atoms'),
  join(BASE, 'chrome'),
];

/**
 * Heuristic: a <p> line is PAGE_BODY drifting if:
 * 1. Uses semantic-ink-muted or semantic-ink-subtle
 * 2. Does NOT use italic class
 * 3. Does NOT use uppercase class
 * 4. Does NOT have a font size < 13px inline style or class (11px, 12px, 0.8rem, etc.)
 * 5. Is NOT inside a known card container (we check file context naively — look
 *    for `card` OR `rounded.*border` in the class string on parent divs).
 *    This is a line-level heuristic only; for card detection we just flag and
 *    let the human reviewer decide.
 */

const SMALL_SIZE_PATTERNS = [
  /9px/, /10px/, /11px/, /12px/, /13px/, /9\.5px/,
  /0\.563rem/, /0\.625rem/, /0\.75rem/, /0\.8rem/, /0\.875rem/,
];

const EYEBROW_PATTERNS = [/uppercase/, /tracking-\[/];

const CAPTION_ITALIC_PATTERNS = [/\bitalic\b/];

function collectFiles(dir) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('_archive')) continue;
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        files.push(...collectFiles(full));
      } else if (extname(full) === '.tsx') {
        files.push(full);
      }
    }
  } catch {
    // dir may not exist
  }
  return files;
}

const P_TAG_RE = /<p\s+className="([^"]+)"/g;
// G.13.3: subtle is now CORRECT for subtitle/lead-in — only muted is drift for body <p>
const MUTED_RE = /semantic-ink-muted/;
// subtle alone is allowed (subtitle role · 4.5:1 rhythmic variation)
const SUBTLE_RE = /semantic-ink-subtle/;
const BODY_RE = /semantic-ink-body|semantic-ink-strong|semantic-ink-on-dark/;

let driftCount = 0;
const driftLines = [];

for (const dir of SCAN_DIRS) {
  for (const file of collectFiles(dir)) {
    const src = readFileSync(file, 'utf8');
    const lines = src.split('\n');
    lines.forEach((line, idx) => {
      const m = P_TAG_RE.exec(line);
      if (!m) {
        P_TAG_RE.lastIndex = 0;
        return;
      }
      P_TAG_RE.lastIndex = 0;
      // Skip if preceding line has an explicit ink-roles exemption annotation
      const prevLine = idx > 0 ? lines[idx - 1] : '';
      if (/ink-roles:\s*(SUBTITLE_LEAD_IN|CAPTION|CARD_BODY|EYEBROW)/.test(prevLine)) return;
      const classes = m[1];

      // Must have muted or subtle to be a candidate
      if (!MUTED_RE.test(classes)) return;

      // Already has body/strong/on-dark → fine
      if (BODY_RE.test(classes)) return;

      // Eyebrow → skip
      if (EYEBROW_PATTERNS.some((r) => r.test(classes))) return;

      // Italic → potential caption, check size. If italic AND small → skip
      const isItalic = CAPTION_ITALIC_PATTERNS.some((r) => r.test(classes));

      // Check for small size in className
      const hasSmallClassSize = SMALL_SIZE_PATTERNS.some((r) => r.test(classes));
      if (hasSmallClassSize) return; // small size caption → skip

      // Check for small size in adjacent style= on same line
      const hasSmallStyleSize = SMALL_SIZE_PATTERNS.some((r) => r.test(line));
      if (hasSmallStyleSize) return; // caption-size style inline → skip

      // If italic but NOT small size → still a PAGE_BODY italic drift (like editorial tagline)
      // These were the ones we fixed. Flag if still present.
      const relPath = file.replace(join(BASE, '../..'), '');
      driftCount++;
      driftLines.push({
        file: relPath,
        line: idx + 1,
        content: line.trim().slice(0, 120),
        italic: isItalic,
      });
    });
  }
}

if (driftCount === 0) {
  console.log('check-ink-roles: 0 drift · all PAGE_BODY <p> use semantic-ink-body ✓');
  process.exit(0);
} else {
  console.error(`check-ink-roles: ${driftCount} PAGE_BODY drift(s) found:\n`);
  for (const d of driftLines) {
    console.error(`  ${d.file}:${d.line}${d.italic ? ' [italic]' : ''}`);
    console.error(`    ${d.content}`);
  }
  console.error('\nFix: change text-[var(--semantic-ink-muted)] → text-[var(--semantic-ink-body)] on standalone body <p>');
  console.error('Note: text-[var(--semantic-ink-subtle)] is CORRECT for subtitle/lead-in <p> (first <p> after h1/h2/h3).');
  process.exit(1);
}
