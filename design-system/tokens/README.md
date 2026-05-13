# Ken Research Design Tokens

W3C DTCG canonical token source for the Ken Research design system. Single source of truth — all platform outputs (CSS, JS/TS, SCSS, iOS, Android) are generated from `tokens.json`.

---

## What this is

`tokens.json` holds every design decision as a structured, typed token using the [W3C Design Token Community Group (DTCG)](https://design-tokens.github.io/community-group/format/) format. Style Dictionary v4 compiles it into platform-specific outputs.

This is the **canonical source**. Do not edit generated files in `build/` — edit `tokens.json` and rebuild.

---

## Quick start

```bash
# Install dependencies (first time only)
pnpm install

# Build all platform outputs
pnpm build

# Validate tokens.json structure
pnpm validate

# Clean build artifacts
pnpm clean

# Clean + rebuild
pnpm rebuild
```

Build outputs land in `build/`:

| File | Platform | Use for |
|---|---|---|
| `build/tokens.css` | CSS custom properties | Web — import in stylesheets |
| `build/tokens.js` | JavaScript ES6 exports | JS/TS projects |
| `build/tokens.d.ts` | TypeScript declarations | Type-safe token usage |
| `build/tokens.scss` | SCSS variables | Legacy SCSS codebases |
| `build/tokens.flat.json` | Flat JSON map | Tooling, Figma plugins, integrations |
| `build/ios/KRTokens.swift` | Swift class | iOS / macOS apps |
| `build/android/colors.xml` | Android resources | Color values |
| `build/android/dimens.xml` | Android resources | Dimension values |

---

## Two-variant model

The same brand ships on two distinct surfaces:

| Variant | Surface | Background | Text | Where |
|---|---|---|---|---|
| **Cinematic dark** | Dark immersive | `#0a0a0c` | `#FAFAFA` | `ken-v1` main site |
| **Editorial light** | Warm off-white | `#f5f2f1` | `#000000` | `design-system-v26`, case-study editorials |

Tokens for both variants live under `variant.cinematic` and `variant.editorial` in `tokens.json`. Foundation color ramps and typography are shared across both.

---

## tokens.json structure

```
tokens.json
├── color
│   ├── foundation        — black, white (92% of surfaces)
│   ├── brand             — red #b01f24 (CTAs only — 5%)
│   ├── accent            — purple, periwinkle, perano, warm, teal (3%)
│   └── ramp              — full 50–900 scales for:
│       ├── red           — brand red scale
│       ├── black         — neutral grey scale
│       ├── white         — near-white tints (defined values only)
│       ├── warm          — warm off-white scale (editorial bg source)
│       ├── purple        — True V purple scale
│       ├── periwinkle    — periwinkle blue scale
│       ├── perano        — light blue scale
│       └── coral         — coral/terracotta scale
├── typography
│   ├── family            — display (Noto Serif), body (DM Sans), mono
│   ├── size              — 12 sizes: 2xs → 5xl (Major Third 1.25× scale)
│   ├── weight            — light/normal/medium/bold/black
│   └── lineHeight        — tight/snug/normal/relaxed
├── container             — page/content/narrow/prose/compact max-widths
├── padding               — mobile/tablet/desktop horizontal padding
├── radius                — image/button/card/pill border radius
└── variant
    ├── cinematic         — dark surface: bg, text, accent overrides
    └── editorial         — light surface: bg, text values
```

---

## Typography scale

Major Third ratio (1.25×), base 16px:

| Token | Value | Pixels | Use |
|---|---|---|---|
| `typography.size.2xs` | 0.75rem | 12px | Navbar text, micro labels |
| `typography.size.xs` | 0.8rem | 12.8px | Labels, eyebrows, metadata |
| `typography.size.compact` | 0.875rem | 14px | Compact body, dense grids |
| `typography.size.nav` | 0.875rem | 14px | TOC, buttons, navigation |
| `typography.size.sm` | 1rem | 16px | Standard body (90% of text) |
| `typography.size.base` | 1.25rem | 20px | Large body, card titles (4+) |
| `typography.size.lg` | 1.563rem | 25px | Card titles (2-3 cards) |
| `typography.size.xl` | 1.953rem | 31.25px | H3 subsections |
| `typography.size.2xl` | 2.441rem | 39px | H2 section headings |
| `typography.size.3xl` | 3.052rem | 48.8px | H1 hero — reserved |
| `typography.size.4xl` | 3.815rem | 61px | Extra large, stat numbers |
| `typography.size.5xl` | 4.768rem | 76.3px | Massive — future use |

---

## Why DTCG format

- **W3C standard** — ensures longevity and interoperability
- **Figma Variables compatible** — tokens.json maps 1:1 to Figma's variable format
- **Multi-platform** — Style Dictionary compiles to CSS/SCSS/JS/iOS/Android from one source
- **Typed** — `$type` field enables platform-appropriate transforms (e.g., hex → `UIColor` on iOS)
- **Tool-agnostic** — works with Theo, Cobalt, Specify, Token Pipeline, and any DTCG-aware tool

---

## Usage in web projects

**CSS (import generated file):**
```css
@import '@kenresearch/tokens/build/tokens.css';

.cta-button {
  background-color: var(--color-brand-red);
  font-family: var(--typography-family-body);
  font-size: var(--typography-size-sm);
  border-radius: var(--radius-button);
}
```

**JavaScript/TypeScript:**
```ts
import { ColorBrandRed, TypographySizeSm } from '@kenresearch/tokens/build/tokens.js';
```

**SCSS:**
```scss
@use '@kenresearch/tokens/build/tokens' as tokens;

.hero-title {
  font-size: tokens.$typography-size-3xl;
  font-family: tokens.$typography-family-display;
}
```

---

## Phase 2 (next sprint)

`design-system/core/src/styles/theme.css` and `ken-v1/src/app/globals.css` will be replaced with imports of `build/tokens.css`. This sprint establishes the canonical source only — source CSS files are not modified.
