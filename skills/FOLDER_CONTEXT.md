# AI Skills Ecosystem

**What**: A curated repository of 77 modular AI skills (76 functional + 1 stub) covering design, animation, testing, deployment, reviews, documents, safety, reasoning, and Ken Research company-specific workflows. Includes `aura-design` (Ken Research design second brain). Browse by category: see [INDEX_BY_CATEGORY.md](INDEX_BY_CATEGORY.md).
**Why**: Ensures every AI model has access to specialized, production-grade intelligence while keeping token usage efficient. Read `SKILL_ROUTING.md` first to pick the right skill.
**When**: Triggered automatically when tasks require design decisions, animation, browser testing, deployment, plan review, document generation, or structured reasoning workflows.
**Where**: `/skills`
**How**: Read `SKILL_ROUTING.md` → pick the matching skill → read only that `SKILL.md`.

---

## Skill Index (77 skills, 13 categories)

### 🎨 Design & UI/UX (13)
- **`aura-design`** ★ — Ken Research design second brain. 5 surfaces (Discovery/Store/Viewer/Dashboards/Engagement), 2 brand variants (cinematic dark + editorial light), anti-pattern registry, voice spec, build-handoff brief. Phase 1 shipped: SKILL.md + report-viewer surface + anti-patterns + voice. Phase 2 stubs pending (other surfaces + decisions + brand variant detail files)
- `ui-ux-pro-max` — Comprehensive UI/UX design guide: 50+ styles, 161 palettes, 57 font pairings, 99 UX guidelines (use search script, 44KB)
- `expert-ui-ux-designer` — DEPRECATED for Ken Research as of 2026-04-30. Now pointer to `aura-design`. Generic persona preserved at `SKILL.original.md` for non-Ken work
- `frontend-design` — Production-grade frontend interfaces, avoiding generic aesthetics
- `ui-styling` — Tailwind + shadcn/ui + Radix component styling
- `banner-design` — Social media banners, ads, web heroes (22 styles, multi-platform)
- `brand` — Brand voice, visual identity, messaging frameworks, asset management
- `brand-guidelines` — Anthropic's official brand colors and typography applied to artifacts
- `design` — Unified design: logos, tokens, CIP, slides, banners, social photos
- `design-system` — Token architecture, component specs, systematic design slides
- `design-html` — Production-quality HTML/CSS generated from approved mockups
- `design-shotgun` — Generate multiple AI design variants with structured iteration
- `design-consultation` — Propose complete design systems and write `DESIGN.md`

### 🖼️ Themes & Visual Art (3)
- `theme-factory` — 10 preset professional themes for slides, docs, and HTML
- `algorithmic-art` — p5.js generative art with seeded randomness and interactivity
- `canvas-design` — Static visual art in PNG/PDF using a design-philosophy approach

### 🎬 Animation — GSAP Suite (8)
- `gsap-react` — GSAP in React / Next.js (useGSAP, refs, cleanup)
- `gsap-scrolltrigger` — Scroll-driven animations, pinning, parallax
- `gsap-timeline` — Animation sequencing and choreography
- `gsap-core` — Core API: tweens, easing, stagger, matchMedia
- `gsap-frameworks` — GSAP in Vue / Svelte / Nuxt
- `gsap-plugins` — Flip, Draggable, SplitText, SVG plugins
- `gsap-performance` — 60fps optimization, will-change, batching
- `gsap-utils` — clamp, snap, mapRange, gsap.utils.*

### 🔬 Testing, QA & Browser (8)
- `webapp-testing` — Playwright-based local web app testing
- `gstack` — Headless Chromium for QA, screenshots, prod verification
- `browse` — Fast headless browser for QA and site verification
- `qa` — Systematically QA a web app and iteratively fix bugs
- `qa-only` — Report-only QA producing a structured report (no code edits)
- `open-gstack-browser` — Launch AI-controlled Chromium with sidebar extension
- `connect-chrome` — Connect Claude to a running Chromium instance
- `setup-browser-cookies` — Import cookies from a real browser into headless sessions

### 🧭 Reviews & Quality (6)
- `review` — Pre-landing PR review (SQL, LLM boundary, side-effect checks)
- `design-review` — Designer's-eye QA, then fix issues in source iteratively
- `devex-review` — Live developer-experience audit (docs, CLI, onboarding)
- `health` — Weighted 0–10 code-quality dashboard with trend tracking
- `benchmark` — Core Web Vitals and bundle-size regression detection
- `benchmark-models` — Cross-model comparison (Claude / GPT / Gemini) for skills

### 🗂️ Plan-Mode Reviews (5)
- `plan-ceo-review` — CEO/founder-mode review with scope expand/reduce
- `plan-design-review` — Designer's-eye plan review with 0–10 dimension ratings
- `plan-devex-review` — Developer-experience plan review with DX scoring
- `plan-eng-review` — Eng-manager review of architecture, data flow, edge cases
- `plan-tune` — Self-tune question sensitivity and developer psychographics

### 🚀 Ship, Deploy & Release (6)
- `ship` — Detect base branch, run tests, bump version, open PR
- `land-and-deploy` — Merge PR, await CI, verify production health
- `setup-deploy` — Configure deployment settings for `land-and-deploy`
- `canary` — Post-deploy canary monitoring for errors/regressions
- `document-release` — Post-ship sync of README, ARCHITECTURE, CHANGELOG
- `gstack-upgrade` — Upgrade gstack to latest, show what's new

### 🛡️ Safety & Workflow Guardrails (5)
- `careful` — Warn before destructive commands (rm -rf, force-push)
- `guard` — Full safety mode (combines `careful` + `freeze`)
- `freeze` — Restrict edits to a single directory for focused, safe changes
- `unfreeze` — Clear the freeze boundary, allow edits anywhere
- `autoplan` — Auto-pipeline running CEO / design / eng / DX reviews

### 🧠 Reasoning, Context & Investigation (8)
- `learn` — Manage, search, prune, export project learnings across sessions
- `context-save` — Save git state, decisions, and remaining work
- `context-restore` — Restore a previously saved working context
- `investigate` — Four-phase root-cause debugging
- `retro` — Weekly engineering retrospective from commits and patterns
- `office-hours` — YC-style office-hours brainstorming for ideas/side projects
- `cso` — Chief Security Officer mode: infra-first audits, threat modeling
- `codex` — OpenAI Codex wrapper for code review and adversarial challenges

### 🤝 Collaboration & Pairing (1)
- `pair-agent` — Pair a remote AI agent with your browser for collaborative work

### 📄 Documents & Artifacts (10)
- `pptx` — PowerPoint creation, editing, extraction
- `slides` — HTML presentations with Chart.js
- `docx` — Word document creation and manipulation
- `xlsx` — Spreadsheet creation and editing
- `pdf` — PDF creation, extraction, merging, OCR
- `make-pdf` — Convert markdown files into publication-quality PDFs
- `doc-coauthoring` — Structured documentation co-authoring
- `internal-comms` — Internal-comms writing with company-standard templates
- `slack-gif-creator` — Animated GIFs optimized for Slack
- `web-artifacts-builder` — Multi-component claude.ai HTML artifacts

### 🛠️ Skill & Tooling Authoring (2)
- `mcp-builder` — Build MCP servers (Python / TypeScript)
- `skill-creator` — Create, improve, and evaluate AI skills

### 🏢 Ken Research (company-specific) (1)
- `ken-research` — Anchored in `strategy/` + `projects/`. Trigger proactively for any Ken Research, competitor (IMARC/Mordor/Statista/CB Insights), wedge, or positioning question.

### ⚠️ Empty / scaffolding (1)
- `ken-research-workspace/` — no SKILL.md present, scaffold only. Skip.

---

## External reference library
[`../references/design-systems/`](../references/design-systems/) — 59 documented design systems (Linear, Stripe, Vercel, Figma, etc.). MIT-licensed mirror of [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md). **Not a skill** — browse for inspiration, copy individual `README.md` into projects when relevant.

---

## Token Efficiency

- **Always read `SKILL_ROUTING.md` first** — it has a decision tree and file sizes
- **`ui-ux-pro-max`**: Use the search script (`scripts/search.py`), not the full 44KB file
- **GSAP**: Load only the one module you need, never all 8
- **`gstack`**: Skip the preamble bash block when using non-Claude models
