# Skill Routing Guide

> **Read this first** before invoking any skill.
> This file tells every AI model exactly which skill to use and when,
> preventing token waste and duplicate reasoning.

---

## Core Rule

**Only load a SKILL.md when the task matches its trigger.**
Each skill file is 2–45KB. Loading irrelevant skills wastes context window.
For pure coding tasks with no design decisions, skip skills entirely.

---

## Routing Table

### 🎨 Design & UI/UX

| Trigger | Primary Skill | Fallback | Notes |
|---------|--------------|----------|-------|
| "Design a page / component / layout" | `ui-ux-pro-max` | `expert-ui-ux-designer` | Use the search script for targeted output instead of reading full 44KB |
| "Build a web component / page" | `frontend-design` | `ui-styling` | For HTML/CSS/React/Next.js work |
| "Style with Tailwind / shadcn / tokens" | `ui-styling` | `frontend-design` | Includes shadcn/ui and Radix components |
| "Design a banner / social media asset" | `banner-design` | `design` | 22 styles, multi-platform |
| "Create brand identity / logo / CIP" | `brand` | `design` | Full corporate identity |
| "Comprehensive design (all types)" | `design` | `brand` | 55 logo styles, 50 deliverables |
| "Apply a theme to an artifact" | `theme-factory` | — | 10 preset themes |
| "Create generative / algorithmic art" | `algorithmic-art` | `canvas-design` | p5.js, seeded randomness |
| "Create a poster / static image design" | `canvas-design` | `frontend-design` | PNG/PDF output |
| "Apply Anthropic brand colors/style" | `brand-guidelines` | — | Anthropic-specific only |

---

### 🎬 Animation (GSAP Suite — load only what you need)

| Trigger | Skill | Notes |
|---------|-------|-------|
| GSAP in **React / Next.js** | `gsap-react` | useGSAP hook, refs, cleanup |
| **Scroll-triggered** animations | `gsap-scrolltrigger` | Pinning, scrub, parallax |
| **Timeline / sequence** choreography | `gsap-timeline` | Position parameter, nesting |
| GSAP in **Vue / Svelte / Nuxt** | `gsap-frameworks` | Lifecycle, scoping, cleanup |
| **Core** tweens, easing, stagger | `gsap-core` | gsap.to/from/fromTo, matchMedia |
| **Plugins** (Flip, Draggable, SplitText, etc.) | `gsap-plugins` | Registration, plugin-specific APIs |
| **Performance** (60fps, no jank) | `gsap-performance` | will-change, batching |
| **Utilities** (clamp, snap, mapRange) | `gsap-utils` | gsap.utils.* helpers |

> **Rule**: Never load all 8 GSAP skills. Pick the single one that matches the task.

---

### 🔬 Testing & QA

| Trigger | Primary Skill | Notes |
|---------|--------------|-------|
| "Test a local web app / verify UI" | `webapp-testing` | Playwright-based, local apps |
| "Browse a live page / take screenshots / QA prod" | `gstack` | Headless Chromium, persistent sessions |
| "Create a web app for testing" | `webapp-testing` | Supports form testing, UI behavior |

**gstack for non-Claude models:**
The `gstack` SKILL.md has a Claude-specific preamble (telemetry/config bash).
For Gemini, GPT, or other models — **skip the preamble section entirely** and go
directly to the `# gstack browse: QA Testing & Dogfooding` section of SKILL.md.
The `browse` binary works identically across all models — only the preamble is Claude-specific.
One-time setup still required: `cd skills/gstack && ./setup`

---

### 📄 Documents & Presentations

| Trigger | Primary Skill | Fallback |
|---------|--------------|----------|
| "Create / edit a PowerPoint / deck / slides" | `pptx` | `slides` |
| "Create HTML presentation / slides" | `slides` | `pptx` |
| "Create / edit a Word document (.docx)" | `docx` | — |
| "Create / edit a spreadsheet (.xlsx / .csv)" | `xlsx` | — |
| "Create / edit / extract from a PDF" | `pdf` | — |
| "Write internal communications" | `internal-comms` | — |

---

### 🧠 Reasoning & Intelligence

| Trigger | Skill | Notes |
|---------|-------|-------|
| "Design tokens / type scale / spacing system" | `design-system` | 3-layer token architecture |
| "Build a claude.ai multi-component artifact" | `web-artifacts-builder` | React + Tailwind + shadcn/ui |
| "Build an MCP server / tool integration" | `mcp-builder` | Python FastMCP or TypeScript SDK |
| "Create or improve an AI skill" | `skill-creator` | Evals, benchmarks, optimization |
| "Co-author a document / spec / proposal" | `doc-coauthoring` | Structured writing workflow |
| "Create an animated GIF for Slack" | `slack-gif-creator` | Optimized for Slack constraints |

---

### 🏢 Ken Research (company-specific)

| Trigger | Skill | Notes |
|---------|-------|-------|
| Anything about Ken Research, our competitors, our wedge, our claims, our positioning | `ken-research` | Anchors every answer in `strategy/`. Verifies before claiming. Maps recommendations to `projects/`. Works with all models. |
| "How do we beat IMARC / Mordor / Statista / CB Insights / Crunchbase?" | `ken-research` | Pulls page-level receipts from the deep-dive synthesis |
| "Where does this fit in our strategy?" | `ken-research` | Routes to the right surface playbook + roadmap wave |
| "Is this claim about us true?" | `ken-research` | Fact-check cheatsheet + verified fact sheet |

**Trigger this proactively** whenever the conversation touches Ken Research the company, our 5 experience surfaces (Discovery / Report Store / Report Viewer / Dashboards / Engagement), or any of the active project folders that ship the strategy.

---

## Token Efficiency Rules

1. **Use the search script for `ui-ux-pro-max`** — don't read the full 44KB file:
   ```bash
   python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system
   ```
   This returns targeted recommendations, not the entire database.

2. **GSAP skills are modular** — read only one per task, not the whole suite.

3. **For pure code edits** with no design decision — skip all skills, write code directly.

4. **gstack preamble is optional** for non-Claude models — skip to the browse commands.

5. **Layer skills when needed** — e.g., for an animated Next.js page:
   - Load `ui-ux-pro-max` first (design decisions)
   - Then `gsap-react` (animation implementation)
   - Skip all others

---

## Decision Tree

```
Is there a design decision? (colors, layout, typography, style)
  YES → Load ui-ux-pro-max (search script) or expert-ui-ux-designer
  NO ↓

Is there an animation?
  YES → Which framework?
    React/Next.js → gsap-react
    Vue/Svelte    → gsap-frameworks
    Scroll-based  → gsap-scrolltrigger
    Sequenced     → gsap-timeline
  NO ↓

Is there a document output? (pptx, docx, pdf, xlsx)
  YES → Match the file type to the skill above
  NO ↓

Is there browser testing / QA?
  YES → webapp-testing (local) or gstack (live/prod)
  NO ↓

Write code directly — no skill needed.
```

---

## Skill File Sizes (for context budget planning)

| Skill | Size | Load Cost |
|-------|------|-----------|
| `gstack` | 45KB | High — skip preamble for non-Claude |
| `ui-ux-pro-max` | 44KB | High — use search script instead |
| `gsap-scrolltrigger` | ~15KB | Medium |
| `gsap-react` | ~12KB | Medium |
| `gsap-timeline` | ~10KB | Medium |
| `frontend-design` | ~8KB | Low-Medium |
| `expert-ui-ux-designer` | ~6KB | Low-Medium |
| `gsap-core`, `gsap-plugins`, others | 4–8KB | Low |
| `theme-factory`, `skill-creator` | 2–4KB | Low |
