/**
 * Ken Research design tokens — DTCG validation script
 *
 * Validates tokens.json against W3C DTCG constraints:
 *   - All $value fields present where expected
 *   - No duplicate keys (JSON parse catches these, but we add extra checks)
 *   - All $type values are valid DTCG types
 *   - No empty string values
 *
 * Exit 0 = pass. Exit 1 = fail.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = join(__dirname, '..', 'tokens.json');

// W3C DTCG composite + primitive types
const VALID_DTCG_TYPES = new Set([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'string',
  'boolean',
  'null',
  // composite types
  'typography',
  'transition',
  'shadow',
  'gradient',
  'strokeStyle',
  'border',
]);

let errors = [];
let warnings = [];
let tokenCount = 0;

/**
 * Recursively walk token tree.
 * A token is a node that has a $value (or $type without $value).
 * A group is a node without $value.
 */
function walkTokens(node, path) {
  if (typeof node !== 'object' || node === null) return;

  // Keys starting with $ are token metadata — not group children
  const childKeys = Object.keys(node).filter((k) => !k.startsWith('$'));

  const hasValue = '$value' in node;
  const hasType = '$type' in node;

  if (hasValue || hasType) {
    // This is a token node
    tokenCount++;

    if (!hasValue) {
      errors.push(`[${path}] Token has $type but missing $value`);
    }

    if (hasValue && (node.$value === null || node.$value === undefined)) {
      errors.push(`[${path}] Token $value is null or undefined`);
    }

    if (hasValue && node.$value === '') {
      errors.push(`[${path}] Token $value is empty string`);
    }

    if (hasType) {
      if (!VALID_DTCG_TYPES.has(node.$type)) {
        errors.push(
          `[${path}] Invalid $type "${node.$type}". Valid: ${[...VALID_DTCG_TYPES].join(', ')}`,
        );
      }
    } else {
      warnings.push(`[${path}] Token has $value but no $type (type inference will be used)`);
    }

    // Token nodes can still have nested children (composite tokens)
    for (const key of childKeys) {
      walkTokens(node[key], `${path}.${key}`);
    }
  } else {
    // Group node — recurse into children
    for (const key of childKeys) {
      walkTokens(node[key], path ? `${path}.${key}` : key);
    }
  }
}

/**
 * Detect duplicate keys by walking the parsed object tree.
 * JSON.parse silently uses the last value for duplicates, so we use a
 * streaming character scan that tracks nesting depth to find same-level dupes.
 * DTCG metadata keys ($value, $type, $description) are expected to repeat
 * across sibling tokens — skip them.
 */
function detectDuplicateKeys(jsonString) {
  const duplicates = [];

  // DTCG standard keys — expected to repeat at every token node level
  const DTCG_META_KEYS = new Set(['$value', '$type', '$description', '$extensions', '$schema']);

  // Walk character by character tracking object boundaries.
  // When we enter an object, track keys seen at that level.
  let depth = 0;
  const keyStacksPerDepth = new Map();
  let i = 0;
  const len = jsonString.length;

  while (i < len) {
    const ch = jsonString[i];

    if (ch === '{') {
      depth++;
      if (!keyStacksPerDepth.has(depth)) keyStacksPerDepth.set(depth, new Set());
      else keyStacksPerDepth.get(depth).clear();
      i++;
      continue;
    }

    if (ch === '}') {
      keyStacksPerDepth.delete(depth);
      depth--;
      i++;
      continue;
    }

    if (ch === '[') { depth++; i++; continue; }
    if (ch === ']') { depth--; i++; continue; }

    // Detect object keys: a quoted string followed by ':'
    if (ch === '"') {
      // Read the full string
      let j = i + 1;
      while (j < len) {
        if (jsonString[j] === '\\') { j += 2; continue; }
        if (jsonString[j] === '"') break;
        j++;
      }
      const key = jsonString.slice(i + 1, j);
      // Check if followed by ':' (ignoring whitespace)
      let k = j + 1;
      while (k < len && (jsonString[k] === ' ' || jsonString[k] === '\n' || jsonString[k] === '\r' || jsonString[k] === '\t')) k++;
      if (jsonString[k] === ':') {
        // It's an object key at this depth
        if (!DTCG_META_KEYS.has(key) && keyStacksPerDepth.has(depth)) {
          const seenAtDepth = keyStacksPerDepth.get(depth);
          if (seenAtDepth.has(key)) {
            duplicates.push(`Duplicate key "${key}" found at nesting depth ${depth}`);
          }
          seenAtDepth.add(key);
        }
      }
      i = j + 1;
      continue;
    }

    i++;
  }

  return duplicates;
}

// ── Main ──────────────────────────────────────────────────────────────────────

let rawJson;
try {
  rawJson = readFileSync(TOKENS_PATH, 'utf-8');
} catch (e) {
  console.error(`ERROR: Could not read ${TOKENS_PATH}`);
  console.error(e.message);
  process.exit(1);
}

let tokens;
try {
  tokens = JSON.parse(rawJson);
} catch (e) {
  console.error(`ERROR: tokens.json is not valid JSON`);
  console.error(e.message);
  process.exit(1);
}

// Walk the token tree
walkTokens(tokens, '');

// Warn on duplicate key patterns (heuristic only)
const dups = detectDuplicateKeys(rawJson);
for (const dup of dups) {
  warnings.push(dup);
}

// ── Report ────────────────────────────────────────────────────────────────────

console.log(`\nKen Research tokens.json — validation report`);
console.log(`─────────────────────────────────────────────`);
console.log(`Tokens found: ${tokenCount}`);

if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) {
    console.warn(`  WARN  ${w}`);
  }
}

if (errors.length > 0) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) {
    console.error(`  ERROR ${e}`);
  }
  console.log(`\nValidation FAILED — ${errors.length} error(s) must be fixed.\n`);
  process.exit(1);
} else {
  console.log(`\nValidation PASSED — all ${tokenCount} tokens are valid.\n`);
  process.exit(0);
}
