# Industry Research · GitHub Primer

**Subject:** Primer — GitHub's design system for product UI, brand UI, and brand toolkit
**Sources:** primer.style · primer.github.io · github.com/primer · Primer primitives repo · Primer contribute docs
**Audit date:** 2026-05-13
**Methodology:** WWWWH per `01_methodology.md`

---

## 1 · WHAT

Primer is GitHub's design system. It is **the developer-tooling DS** — opinionated for code-near interfaces (diffs, file trees, PR review, issue threads, markdown rendering, commit graphs). Unlike Polaris (admin / commerce) or Atlassian (cross-product productivity), Primer's distinctive challenge is **rendering dense, text-heavy, code-adjacent UI at scale** while preserving readability across light/dark/high-contrast themes.

Primer ships in three forms: **Product UI** (github.com itself), **Brand UI** (marketing surfaces), and **Brand Toolkit** (downstream content creation). The product layer ships as `@primer/react` (current focus), `@primer/view_components` (Rails / ViewComponent — maintenance mode as of Feb 2026), and `@primer/css` / `@primer/primitives` (token + style packages).

## 2 · WHY (problem it solves)

- **Code-near UI is dense.** A PR review page renders diffs, comments, file tree, navigation, status — all on one screen. Generic DS components fail here; Primer's vocabulary is built for it.
- **Markdown-heavy content.** GitHub renders Markdown everywhere: READMEs, issues, comments, discussions, wikis. Primer codifies typography + rendering rules for prose mixed with code.
- **Multi-stack consumers.** GitHub.com itself transitioned from Rails (ViewComponents) to React. Primer supports both during migration — a real-world lesson in DS framework portability.
- **Accessibility is a GitHub-platform promise.** Primer aims at WCAG 2.1 AA. Given GitHub's developer audience and high keyboard-power-user rate, a11y is non-negotiable.
- **Open-source contributors.** Primer is MIT and consumed by third-party tools (Probot, GitHub Actions UIs, internal tooling at companies that ape GitHub patterns). Public API stability matters.

## 3 · WHEN to use ✅

- Building GitHub-internal or GitHub-adjacent tooling
- Code review / diff / PR-like interfaces
- Markdown-rich content rendering (READMEs, blogs, docs)
- Developer dashboards with file trees, terminal-feel surfaces
- High-density information display (logs, repository lists, issue threads)
- Reference for token systems with functional naming
- Reference for documentation density / inline code patterns

## 4 · WHEN NOT to use ❌

- Marketing / brand-led pages (use Primer Brand UI separately, not Product UI)
- Cinematic / editorial surfaces — Primer's density is anti-editorial
- Consumer-facing B2C — too utilitarian, too developer-flavored
- Admin / commerce → use Polaris (different domain vocabulary)
- Multi-product brand differentiation → use Atlassian patterns

## 5 · WHERE used

- github.com — all surfaces (product UI)
- GitHub Desktop (subset)
- GitHub CLI rendering
- github.com marketing pages (Brand UI variant)
- Third-party developer tools that ape GitHub
- Source: `github.com/primer` (org, multiple repos)

## 6 · HOW (architecture)

**Primer is multi-repo, framework-aware:**

1. **`@primer/primitives`** — JSON token source (color, spacing, typography, shape, motion)
2. **`@primer/css`** — utility classes + base styles (legacy + still used)
3. **`@primer/react`** — React component library (current focus)
4. **`@primer/view_components`** — ViewComponent / Rails (maintenance mode Feb 2026)
5. **`@primer/octicons`** — SVG icon library, ~400 icons developer-focused
6. **`@primer/brand`** — marketing-surface component library
7. **`primer.style`** — public docs (product UI)
8. **`primer.github.io/design`** — design + brand docs
9. **`primer.github.io/contribute`** — contribution guidelines + component lifecycle

The **multi-repo** approach is deliberate: tokens are framework-agnostic, components ship per framework. Token changes propagate to all consumers; component changes are framework-local.

## 7 · Tokens — functional naming

Primer's token naming is the most-cited approach in the industry. **Three categories:**

1. **Base tokens** (primitives) — `base.size.4`, `base.color.green.5`. Lowest layer. Raw values.
2. **Functional tokens** — `bgColor.inset`, `borderColor.default`, `boxShadow.inset.thick`. Most-used layer. Names describe purpose, not appearance.
3. **Component / pattern tokens** — component-specific overrides when patterns need them.

**Naming conventions:**
- camelCase for multi-word pattern/component names
- Dash separators for CSS variables (`--bgColor-inset`), dot separators for JS (`bgColor.inset`)
- Dashes separate words within name blocks

**Functional spacing tokens** (added recently): `xxs`, `xs`, `sm`, `md`, `lg`, `xl` for semantic gap/padding/margin. This is a hybrid — T-shirt sizes for spacing, base.color.X.Y for color. Pragmatic, not pure.

**Why functional naming matters for Ken:**
- A token named `bgColor.inset` describes the **role** ("inset surface background"), not the **value** ("light gray"). When you re-theme to dark mode, `bgColor.inset` remaps to dark inset color, same role. Components don't change.
- Compare to Polaris's `--p-color-bg-surface` (similar) and Atlassian's `color.background.surface` (similar). Primer pioneered the **functional naming** approach that all three now share.

**Color usage doc:** Primer publishes `/product/getting-started/foundations/color-usage/` — a page explaining when to use which color token. This is **decision-tree for color**, distinct from decision-trees for components. Rare and valuable.

## 8 · Component documentation pattern

Per component, Primer docs include:
1. **Status / lifecycle stage** (alpha / beta / stable / deprecated)
2. **A11y status** (a11y-reviewed checkbox)
3. **Examples** (interactive, multiple variants)
4. **Props table** (type, default, required, description)
5. **Common scenarios** — real GitHub-product use cases
6. **Accessibility** — keyboard, ARIA, common misuses (rare — calling out anti-patterns)
7. **Related components**
8. **Storybook link** (live playground)

**"Common misuses" section** is unusual — calling out anti-patterns in the same place as usage. Polaris and ADS hide anti-patterns in separate pages. Primer puts them front-and-center.

## 9 · Component lifecycle / governance

Primer publishes an explicit lifecycle (similar to ADS):
- **Draft** — proposal stage
- **Alpha** — implementation begun, unstable
- **Beta** — feature-complete, API may shift
- **Stable** — production, SemVer-protected
- **Deprecated** — migration path documented, removal scheduled

**Governance:** core team owns roadmap. Public RFC + Issue process. PRs accepted for bug fixes, docs, and components that pass alpha → beta review. Primer is more contributor-friendly than Polaris (smaller scope, more focused).

**Component lifecycle page** (`primer.github.io/contribute/component-lifecycle/`) is the canonical reference and explicitly part of contributor onboarding.

## 10 · Accessibility

- **WCAG 2.1 AA target** across stable components
- A11y status badge on each component page — visible "a11y-reviewed" flag
- Color contrast verified at token-pair level
- Keyboard interactions documented per component
- Screen reader behavior tested
- **Inclusive patterns** — Primer ships `accessibility/` docs covering language, ARIA, focus management beyond per-component scope
- Octicons designed with non-decorative consideration (semantic vs decorative SVG attributes)

## 11 · Motion

- Restrained motion vocabulary (developer tools — utility over delight)
- Duration tokens: short transitions for hover, focus, expand/collapse
- `prefers-reduced-motion` honored
- Octicons sometimes animated (loading spinners, success checkmarks)
- No cinematic / scroll-driven motion — out of scope

## 12 · Documentation density (Ken's main interest)

Primer's docs are dense and **code-near**. Each page has:
- Code blocks inline (rendered + copyable)
- Live examples with prop toggles
- API tables that read like Markdown (no fancy widgets)
- Linkable headings (every section has anchor)
- Cross-links to related concepts
- Octicons used inline in docs themselves (eat own dog food)

**Markdown patterns** (Primer's specialty):
- Prose typography sized for long-form reading (15-16px base, 1.5+ line-height)
- Inline code: monospace, subtle bg, padding
- Code blocks: full bg, syntax highlighting, copy button
- Block quotes: left-border accent, indent
- Tables: zebra striping, clear header
- Callouts (note/warning/danger): icon + colored left-border
- Heading hierarchy: H1 page, H2 section, H3 subsection (rarely H4+)
- ToC sidebar generated from heading anchors

These patterns are **directly applicable** to Ken's research-report rendering, analyst-report viewer, and any documentation-style page.

## 13 · Voice + Content

- Direct, technical, plain language
- Developer-aware (don't over-explain code)
- Concise — terminal-user audience, not patient with verbose UI
- Active voice
- Sentence case
- Don't use emoji in product UI (brand has separate rules)

## 14 · Strengths

1. **Functional token naming** — industry reference for purpose-over-appearance.
2. **Component lifecycle stages with a11y status badges** — risk + a11y transparency.
3. **"Common misuses" sections inside docs** — anti-patterns front-and-center.
4. **Documentation density patterns** — best-in-class for markdown / code-near UI.
5. **Multi-framework support** (React + ViewComponent) — pragmatic during migration.
6. **Multi-repo, separated concerns** (primitives separate from components).
7. **Color-usage decision doc** — designer-facing color tree.
8. **Octicons** — domain-fluent icon vocabulary for developer audience.
9. **Open-source-first** — MIT, RFCs public, PR-friendly for bug fixes + docs.

## 15 · Weaknesses

1. **Developer-flavored vocabulary.** Tokens and icons assume code-near context. Hard to use for non-dev domains without re-skinning vocabulary.
2. **Density-default.** Like Polaris/ADS — dense by default. Editorial / cinematic surfaces need significant work.
3. **Maintenance burden of multi-framework.** React + VC + CSS = 3 implementations to keep parity. Slow during migration.
4. **Brand differentiation weaker.** GitHub product UI vs brand UI exists, but the brand layer is smaller in scope than ADS's accent-layer pattern.
5. **Motion vocabulary minimal.** No cinematic / scroll patterns.
6. **Documentation depth varies per component** — older components less complete than recent ones.

## 16 · What Ken can learn (adopt list)

Ken Research has one direct analogue to Primer: **research-report rendering / report viewer** — long-form, content-dense, mixed prose + data + (eventually) code-like blocks (methodology citations, source attribution). Primer's markdown patterns + token naming are directly portable.

### Adopt 1 · Functional token naming for purpose-bound colors
Ken's tokens are partly functional (`--color-foundation-black`, `--color-brand-red`) and partly raw (`#0a0a0c`). Primer's `bgColor.inset` / `borderColor.default` / `fgColor.muted` pattern is more disciplined. **Action:** for next token pass, evaluate adding functional layer: `--bgColor-inset` references `--color-foundation-surface-elevated`. Component consumers use functional names; semantic + raw stay underneath.

### Adopt 2 · A11y status badges per component
Primer's "a11y-reviewed" badge on each component page is gold. Ken's WWWWH atom docs have an a11y section but no badge. **Action:** add `a11y_reviewed: true|pending|partial` to atom doc front-matter. Pair with section 13 (a11y rules) — visible audit trail.

### Adopt 3 · "Common misuses" / "Anti-patterns" inside same doc
Primer puts anti-patterns inside the component page. Ken's methodology already has Anti-patterns section — keep it. But cross-link more aggressively: when "use X instead" mentions an atom, link to that atom's WHEN-NOT section.

### Adopt 4 · Color-usage decision doc
Primer ships a standalone color-usage page that explains **when to use which color**. Ken has token color values but no color-application decision doc. **Action:** create `design-system/foundations/color-usage.md` — when to use brand-red (CTAs only), when to use black (primary text), when to use warm off-white (editorial bg). Already implicit in Quick_start_guide but should be explicit decision doc.

### Adopt 5 · Multi-repo / multi-framework architecture (long-term)
Primer separates primitives from components. Ken's tokens already live in `design-system/tokens/` separately from `design-system/core-v2/`. Good. As Ken's projects diverge (some Next.js, some Vite, possibly mobile), per-framework component packages may matter. **Action:** note for handover sprint; current monorepo is fine.

### Adopt 6 · Documentation density patterns (HIGH PRIORITY)
This is Primer's most directly applicable strength for Ken. Ken's eventual research-report viewer will need: prose typography for long-form, inline code formatting, callout boxes (note/warning), block quotes, syntax-highlighted code, tables with zebra striping, ToC sidebar from heading anchors. **Action:** create `design-system/recipes/long-form-content.md` documenting these patterns. Copy Primer's approach directly: 16px base, 1.5+ line-height, callouts with icon + colored left-border, sentence-case headings, anchor-linked.

### Adopt 7 · Component lifecycle in atom front-matter
Same as ADS adoption — add `status: alpha|beta|stable|deprecated` to atom docs. Primer + ADS converge on this; Ken should too.

### Adopt 8 · ViewComponent-style server-side rendering as long-term option
GitHub renders much of github.com server-side via ViewComponent for performance. Ken's Next.js 14 RSC strategy is aligned philosophically. Primer's lesson: even with React focus, server-rendered components have a place. **Action:** verify Ken's core-v2 components are RSC-compatible (per `feedback_ds_port_workflow.md` — already a stated requirement). Watch Primer's React+RSC patterns for reference.

### Adopt 9 · Cite-your-source pattern (research-domain specific)
GitHub renders citations + permalinks heavily (commit SHA, line numbers, PR refs). Ken's research reports need similar primitives: source citation, page-number link, report-version permalink. **Action:** when AI/RAG ships (L3), build citation atoms borrowing Primer's permalink-style affordances.

### Reject for Ken
- **Octicons.** Developer-domain. Ken needs research-domain icons (analyst, report, industry-vertical, region) — build own set.
- **Cool gray palette.** Primer's neutrals are cool-tone. Ken's editorial-light uses warm `#f5f2f1`. Keep warm.
- **Code-block-everywhere typography.** Primer's typography is tuned for code. Ken's editorial typography (Noto Serif display + DM Sans body) is correct for analyst-report context.

---

## Sources

- [Primer home](https://primer.style/)
- [Primer Foundations · Primitives](https://primer.style/foundations/primitives)
- [Primer · Token names](https://primer.style/product/primitives/token-names/)
- [Primer · Color usage](https://primer.style/product/getting-started/foundations/color-usage/)
- [Primer · Component lifecycle](https://primer.github.io/contribute/component-lifecycle/)
- [Primer · About / Meet the team](https://primer.github.io/design/about/)
- [GitHub · primer/primitives](https://github.com/primer/primitives)
- [GitHub · primer/primitives DESIGN_TOKENS_GUIDE.md](https://github.com/primer/primitives/blob/main/DESIGN_TOKENS_GUIDE.md)
- [GitHub · primer/view_components](https://github.com/primer/view_components)
- [GitHub · primer/react](https://github.com/primer/react)
- [GitHub · primer/css](https://github.com/primer/css)
- [Motiff · Primer overview](https://motiff.com/design-system-wiki/design-systems-overview/primer)
- [Design Systems Surf · GitHub Primer](https://designsystems.surf/design-systems/github)

**Word count target:** 1500-2500 · this doc ≈ 2150 words.
