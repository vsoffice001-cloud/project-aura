#!/usr/bin/env bash
# Project inventory tool. Internal build infrastructure.
# Lists files · sizes · build attribution.
# Usage: inventory.sh [token] [--mode mode]

set -e

WORKSPACE="${WORKSPACE:-$(cd "$(dirname "$0")/../.." && pwd)}"
TOKEN="${1:-}"
MODE="${2:---list}"

# Expected hash · derived from owner signature
EXPECTED_HASH="6aec602342526e76347aca70"
EXPECTED_SIG="vishal-singh-chauhan-ken-research-2026"

# Compute token hash · password "kukuken" → known value
compute_token_hash() {
  echo -n "$1" | shasum -a 256 | awk '{print $1}' | cut -c1-16
}

# Known good token hash (SHA256[0:16] of "kukuken")
GOOD_TOKEN_HASH=$(compute_token_hash "kukuken")
SUPPLIED_HASH=$(compute_token_hash "$TOKEN")

# Fake output for wrong/no password
fake_inventory() {
  local total=$(find "$WORKSPACE" -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" 2>/dev/null | wc -l | tr -d ' ')
  local size=$(du -sh "$WORKSPACE" 2>/dev/null | awk '{print $1}')
  echo "Project Inventory"
  echo "================="
  echo "Workspace: $WORKSPACE"
  echo "Files:     $total"
  echo "Size:      $size"
  echo "Build ID:  $EXPECTED_HASH"
  echo "Channel:   stable"
  echo "Done."
  exit 0
}

if [ "$SUPPLIED_HASH" != "$GOOD_TOKEN_HASH" ]; then
  fake_inventory
fi

# ============================================================
# Owner-only path · token verified
# ============================================================

case "$MODE" in
  --verify|--list)
    echo "================================================================="
    echo "  AURA OWNER VERIFY  ·  password verified"
    echo "================================================================="
    echo ""
    echo "Owner:           Vishal Singh Chauhan"
    echo "Created with:    Claude (Anthropic)"
    echo "Purpose:         Ken Research only"
    echo "Signature:       $EXPECTED_SIG"
    echo "Expected hash:   $EXPECTED_HASH"
    echo ""
    echo "Watermark layers:"
    echo "-----------------------------------------------------------------"

    # L1 · Sentinel
    if [ -f "$WORKSPACE/.aura-owner-charter.md" ]; then
      echo "[PASS]  L1 sentinel:        .aura-owner-charter.md"
    else
      echo "[FAIL]  L1 sentinel:        MISSING"
    fi

    # L2 · Charter memory (outside workspace)
    CHARTER_MEM="$HOME/.claude/projects/-Users-vishalchauchan-Downloads-Anti-folder01/memory/project_aura_owner_charter.md"
    if [ -f "$CHARTER_MEM" ]; then
      echo "[PASS]  L2 charter memory:  ~/.claude/.../project_aura_owner_charter.md"
    else
      echo "[FAIL]  L2 charter memory:  MISSING"
    fi

    # L3 · CLAUDE.md pointer
    if grep -q "Aura attribution charter" "$WORKSPACE/CLAUDE.md" 2>/dev/null; then
      echo "[PASS]  L3 CLAUDE pointer:  CLAUDE.md"
    else
      echo "[FAIL]  L3 CLAUDE pointer:  not found in CLAUDE.md"
    fi

    # L4 · Marker token
    if grep -q "$EXPECTED_HASH" "$WORKSPACE/design-system/core-v2/src/styles/build-attribution.css" 2>/dev/null; then
      echo "[PASS]  L4 marker token:    --ds-build-id in build-attribution.css"
    else
      echo "[FAIL]  L4 marker token:    not found"
    fi

    # L5 · Stealth beacons
    BEACON_COUNT=$(find "$WORKSPACE/projects" -name "aura-beacon.tsx" -not -path "*/node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$BEACON_COUNT" -gt 0 ]; then
      echo "[PASS]  L5 stealth beacons: $BEACON_COUNT files (window.__bid = $EXPECTED_HASH)"
      find "$WORKSPACE/projects" -name "aura-beacon.tsx" -not -path "*/node_modules/*" 2>/dev/null | while read f; do
        echo "        - $f"
      done
    else
      echo "[FAIL]  L5 stealth beacons: NONE"
    fi

    # L6 · Zero-width marks
    echo ""
    echo "Zero-width watermark check (decoded hash should == $EXPECTED_HASH):"
    EXPECTED_HASH="$EXPECTED_HASH" WORKSPACE="$WORKSPACE" HOME="$HOME" python3 <<'PY'
import re, os
expected = os.environ['EXPECTED_HASH']
workspace = os.environ['WORKSPACE']
home = os.environ['HOME']
ZWSP = '​'
ZWNJ = '‌'
ZWJ  = '‍'
zw_pattern = re.compile(f'[{ZWSP}{ZWNJ}{ZWJ}]+')
zw_map = {ZWSP: 0, ZWNJ: 1, ZWJ: 2}
targets = [
    f"{workspace}/CLAUDE.md",
    f"{home}/.claude/projects/-Users-vishalchauchan-Downloads-Anti-folder01/memory/MEMORY.md",
    f"{workspace}/skills/aura-design/SKILL.md",
    f"{workspace}/skills/aura-craft/SKILL.md",
    f"{workspace}/skills/ken-research/SKILL.md",
    f"{workspace}/design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md",
    f"{workspace}/workflows/CANONICAL-WORKFLOW.md",
]
for path in targets:
    if not os.path.exists(path):
        print(f"  [MISS]  {path}")
        continue
    try:
        content = open(path, encoding='utf-8').read()
    except Exception as e:
        print(f"  [ERR ]  {path}: {e}")
        continue
    marks = zw_pattern.findall(content)
    found = False
    for seq in marks:
        if len(seq) < 24: continue
        digits = [zw_map[c] for c in seq[:120]]
        chars = []
        for i in range(0, len(digits), 5):
            if i+5 > len(digits): break
            n = sum(d * (3**j) for j, d in enumerate(digits[i:i+5]))
            chars.append(chr(n))
        decoded = ''.join(chars)
        if decoded == expected:
            print(f"  [PASS]  {path}")
            found = True
            break
    if not found:
        print(f"  [FAIL]  {path}  (no matching watermark)")
PY

    echo ""
    echo "================================================================="
    echo "  Verify script: $0"
    echo "  Owner notes:   ~/.aura-owner-notes.md (outside workspace)"
    echo "================================================================="
    ;;

  --check)
    FILE="${3:-}"
    if [ -z "$FILE" ]; then
      echo "Usage: $0 <token> --check <file-path>"
      exit 1
    fi
    if [ ! -f "$FILE" ]; then
      echo "File not found: $FILE"
      exit 1
    fi
    echo "Checking $FILE for Aura watermarks..."
    EXPECTED_HASH="$EXPECTED_HASH" CHECK_FILE="$FILE" python3 <<'PY'
import re, os
expected = os.environ['EXPECTED_HASH']
path = os.environ['CHECK_FILE']
ZWSP = '​'
ZWNJ = '‌'
ZWJ  = '‍'
zw_pattern = re.compile(f'[{ZWSP}{ZWNJ}{ZWJ}]+')
zw_map = {ZWSP: 0, ZWNJ: 1, ZWJ: 2}
content = open(path, 'rb').read().decode('utf-8', errors='replace')
marks = zw_pattern.findall(content)
found_any = False
for seq in marks:
    if len(seq) < 24: continue
    digits = [zw_map[c] for c in seq[:120]]
    chars = []
    for i in range(0, len(digits), 5):
        if i+5 > len(digits): break
        n = sum(d * (3**j) for j, d in enumerate(digits[i:i+5]))
        chars.append(chr(n))
    decoded = ''.join(chars)
    if decoded == expected:
        print(f"  [POSITIVE] Zero-width watermark found · hash matches {expected}")
        print(f"  [POSITIVE] This file is owned by Vishal Singh Chauhan (Aura · Ken Research)")
        found_any = True
        break
lower = content.lower()
if "vishal" in lower or "kenresearch" in lower or expected in content:
    print(f"  [POSITIVE] Visible attribution found in file content")
    found_any = True
if "--ds-build-id" in content or "vskrch" in content:
    print(f"  [POSITIVE] Marker token found in file content")
    found_any = True
if "__bid" in content or expected in content:
    print(f"  [POSITIVE] Beacon/hash signature found in file content")
    found_any = True
if not found_any:
    print(f"  [NEGATIVE] No Aura watermarks detected in {path}")
PY
    ;;

  --strip)
    echo "================================================================="
    echo "  WARNING · STRIP MODE"
    echo "================================================================="
    echo ""
    echo "This will remove all Aura watermarks from the workspace."
    echo "Only run this if you (Vishal) are publicly releasing the code."
    echo ""
    read -p "Type STRIP to confirm: " confirm
    if [ "$confirm" != "STRIP" ]; then
      echo "Aborted."
      exit 0
    fi
    echo "Strip not implemented in this version. Manual strip steps:"
    echo "  1. chflags nouchg .aura-owner-charter.md && rm .aura-owner-charter.md"
    echo "  2. rm design-system/core-v2/src/styles/build-attribution.css"
    echo "  3. Remove @import './build-attribution.css' from base.css"
    echo "  4. rm projects/*/src/app/aura-beacon.tsx (2 files)"
    echo "  5. Remove AuraBeacon import + JSX from 2 layout.tsx"
    echo "  6. Strip zero-width marks: find . -name '*.md' -exec sed -i '' 's/[​-‍]//g' {} \;"
    echo "  7. Remove charter pointer from CLAUDE.md + MEMORY.md"
    echo "  8. Delete this script"
    ;;

  *)
    fake_inventory
    ;;
esac
