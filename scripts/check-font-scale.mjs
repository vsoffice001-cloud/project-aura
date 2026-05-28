#!/usr/bin/env node
/**
 * check-font-scale.mjs
 * Bible §1.11 enforcement · scans component sources for raw px in fontSize.
 * Allowed: scale tokens (var(--text-*)) · semantic tokens (var(--text-eyebrow) etc.)
 * Flagged: raw px values · fontSize: '17px' etc.
 *
 * Run: node scripts/check-font-scale.mjs
 * Exit 1 if violations found.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = process.cwd();
const SCAN_DIRS = [
  'design-system/core-v2/src',
  'projects/charts-showcase/src',
  'projects/v1-project/v1-product-page-ver0.4/src',
];
const SKIP = [
  'node_modules',
  'dist',
  '.next',
  'build',
  '_archive',
  '.bak',
];

const CANONICAL_TOKENS = new Set([
  '--text-2xs', '--text-xs', '--text-sm', '--text-base', '--text-lg',
  '--text-xl', '--text-2xl', '--text-3xl', '--text-4xl', '--text-5xl',
  '--text-compact', '--text-nav', '--text-card-micro', '--text-nav-helper',
  '--text-md', '--text-13', '--text-24', '--text-30', '--text-32', '--text-48',
  '--text-eyebrow', '--text-paywall-title', '--text-paywall-body',
  '--text-paywall-cta', '--text-source-citation', '--text-data-label',
]);

const ALLOWED_SVG_TEXT_PX = /KenTreemap|KenSparklineChart|sparkline/; // SVG charts compute px dynamically
const ALLOWED_HIGHCHARTS = /style: { fontSize: '\d+px' }/; // Highcharts requires string px

let violations = 0;
const violationsList = [];

function shouldSkip(path) {
  return SKIP.some((s) => path.includes(s));
}

function scan(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e);
    if (shouldSkip(p)) continue;
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) {
      scan(p);
    } else if (s.isFile()) {
      const ext = extname(p);
      if (!['.tsx', '.ts'].includes(ext)) continue;
      check(p);
    }
  }
}

function check(file) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const isChartFile = ALLOWED_SVG_TEXT_PX.test(file);
  // Highcharts files use string-px in nested style options · API requirement
  const isHighchartsFile = /Ken(Column|Bar|DualColumn|Bubble|Donut|MultiLine|ScenarioFan|Stacked|Waterfall|Radar)Chart\.tsx$/.test(file);

  lines.forEach((line, i) => {
    // Match fontSize: '<px>px' or fontSize: "<px>px"
    const rawPxMatch = line.match(/fontSize:\s*['"](\d+(?:\.\d+)?)px['"]/);
    if (rawPxMatch) {
      // Skip Highcharts wrapper files (API requires string-px in nested style)
      if (isHighchartsFile) return;
      // Skip SVG-text chart computation (Treemap/Sparkline render <text> direct SVG)
      if (isChartFile) return;
      violationsList.push({ file: file.replace(ROOT + '/', ''), line: i + 1, content: line.trim() });
      violations++;
    }
  });
}

console.log('check-font-scale.mjs · Bible §1.11 enforcement');
console.log(`Scanning ${SCAN_DIRS.length} dirs · skip: ${SKIP.join(' · ')}`);
console.log('');

for (const d of SCAN_DIRS) {
  scan(join(ROOT, d));
}

if (violations === 0) {
  console.log(`✓ PASS · 0 raw px fontSize violations`);
  process.exit(0);
} else {
  console.log(`✗ FAIL · ${violations} raw px fontSize violations:`);
  console.log('');
  for (const v of violationsList.slice(0, 50)) {
    console.log(`  ${v.file}:${v.line}`);
    console.log(`    ${v.content}`);
  }
  if (violationsList.length > 50) {
    console.log(`  ... and ${violationsList.length - 50} more`);
  }
  console.log('');
  console.log('FIX · replace raw px with token: var(--text-xs) · var(--text-eyebrow) etc.');
  console.log('See Bible §1.11 for canonical scale + semantic tokens.');
  process.exit(1);
}
