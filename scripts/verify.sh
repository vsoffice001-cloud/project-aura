#!/usr/bin/env bash
# verify.sh — F1+F2 prevention grep gates + typecheck
# Used by `pnpm verify` in core-v2 + consumer projects.
#
# WHY: v1 Reports PDP failed w/ 1207 inline styles · 436 hex literals · 850 arbitrary classes.
#      Doc rules alone (ANTI_PATTERNS.md Cat 1-3) ignored under pressure.
# WHAT: Bash gates · run from project root via `pnpm verify`. Exits non-zero on critical violations.
# WHEN: Pre-commit · pre-build · pre-handover · in CI.
# WHEN NOT: For backend Python files · for `_consumer-coupled/` excluded dirs.
# HOW: grep over src/ · count violations · core-v2 = zero-tolerance · consumers = warning + 2 hard errors.

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR" || exit 1

PKG_NAME=$(grep -E '^\s*"name":' package.json 2>/dev/null | head -1 | sed -E 's/.*"name": *"([^"]+)".*/\1/')
case "$PKG_NAME" in
  "@kenresearch/design-system") ZERO_TOLERANCE=true ;;
  *) ZERO_TOLERANCE=false ;;
esac

errors=0
warnings=0

echo "=== verify.sh · running in $(pwd) ==="
echo "  · pkg=$PKG_NAME · zero_tolerance=$ZERO_TOLERANCE"

bump_severity() {
  if [ "$ZERO_TOLERANCE" = "true" ]; then
    errors=$((errors+1))
  else
    warnings=$((warnings+1))
  fi
}

# Gate 1 · raw <button> w/o role (Cat 5)
RAW_BUTTON=$(grep -rln "<button" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$RAW_BUTTON" -gt 0 ]; then
  echo "  ⚠️  raw <button> in $RAW_BUTTON files (use DS <Button> · Cat 5.4)"
  bump_severity
fi

# Gate 2 · Tailwind arbitrary [#hex] (Cat 1.1) — ALWAYS error
ARBITRARY_HEX=$(grep -rE "\[#[0-9a-fA-F]{3,8}\]" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ARBITRARY_HEX" -gt 0 ]; then
  echo "  ❌  Tailwind [#hex] arbitrary in $ARBITRARY_HEX places (use var(--color-*) · Cat 1.1)"
  errors=$((errors+1))
fi

# Gate 3 · Tailwind arbitrary [Npx] (Cat 1.5)
ARBITRARY_PX=$(grep -rE "\[[0-9]+px\]" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ARBITRARY_PX" -gt 0 ]; then
  echo "  ⚠️  Tailwind [Npx] arbitrary in $ARBITRARY_PX places (use --space-* / --text-* / --radius-* · Cat 1.5)"
  bump_severity
fi

# Gate 4 · hardcoded hex in tsx (Cat 1.1)
HARDCODED_HEX=$(grep -rnE "['\"]#[0-9a-fA-F]{3,8}['\"]" src/ --include="*.tsx" 2>/dev/null | grep -v "node_modules" | wc -l | tr -d ' ')
if [ "$HARDCODED_HEX" -gt 0 ]; then
  echo "  ⚠️  hardcoded #hex in $HARDCODED_HEX places (use var(--color-*) · Cat 1.1)"
  bump_severity
fi

# Gate 5 · max-w-[ arbitrary container (Cat 4.3)
ARBITRARY_MAXW=$(grep -rE "max-w-\[" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ARBITRARY_MAXW" -gt 0 ]; then
  echo "  ⚠️  max-w-[ arbitrary in $ARBITRARY_MAXW places (use <Container variant> · Cat 4.3)"
  bump_severity
fi

# Gate 6 · typecheck — ALWAYS error
echo "  → running typecheck..."
if pnpm typecheck > /tmp/verify-tc.log 2>&1; then
  echo "  ✓ typecheck clean"
else
  echo "  ❌ typecheck FAILED"
  tail -5 /tmp/verify-tc.log
  errors=$((errors+1))
fi

echo ""
echo "=== summary ==="
echo "  errors: $errors · warnings: $warnings"
if [ "$errors" -gt 0 ]; then
  echo "  → FAIL"
  exit 1
fi
if [ "$warnings" -gt 0 ]; then
  echo "  → PASS w/ warnings (run pre-handover to address)"
fi
echo "  → PASS"
exit 0
