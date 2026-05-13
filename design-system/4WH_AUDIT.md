# 4WH Audit — DS Components

**Date:** 2026-05-13 (rewritten · supersedes 2026-05-04 OG audit)
**Status:** Inline · JSDoc 4WH lives in each component file (not in this doc)

---

## Where 4WH actually lives

After DS Port Phase 1-3 (2026-05-13) · 4WH headers moved INLINE to each `.tsx` file as JSDoc:

```tsx
/**
 * ComponentName — one-line summary.
 *
 * WHY: ...
 * WHAT: ...
 * WHEN: ...
 * WHEN NOT: ...
 * HOW: ...
 *
 * @promotedFrom <source>
 */
```

## Coverage (2026-05-13)

| Layer | Files | 4WH coverage |
|---|---|---|
| Atoms | 41 | ~25/41 (priority files done · utility atoms skipped) |
| Molecules | 26 | full (ported w/ headers) |
| Organisms | 43 | ~36/43 (priority + adapter-ported done) |
| Hooks | 23 | full (all 11 lifted · plus 12 net-new) |

## How AI uses 4WH

1. Read `core-v2/docs/COMPONENT_REFERENCE.md` for intent → component lookup (decision tree)
2. Drill into source `.tsx` if prop signature / when-not unclear
3. JSDoc 4WH at top of file answers Why · What · When · When-Not · How

## Backfill priority for remaining (~10 atoms · ~7 organisms)

Lowest priority — utility atoms (Divider · StatusDot · HamburgerIcon · etc.) AI rarely drills into. Backfill opportunistically when editing.

## Cross-references

- Decision tree: `core-v2/docs/COMPONENT_REFERENCE.md`
- Brand vocab: `DESIGN.md`
- Anti-patterns: `ANTI_PATTERNS.md`
- Port methodology: `skills/aura-craft/reference/DS_PORT_WORKFLOW.md`
