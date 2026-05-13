# DESIGN SYSTEM - AI CONTEXT INDEX

**Version:** 4.3  
**Date:** 2026-03-18  
**Project:** Project K / Vishal  
**Repository:** vsoffice001-cloud/Design-System-vs-26

---

## READ THIS FIRST

This file is a **lightweight index** pointing to modular AI context docs. The original monolithic file was split into 6 focused modules (each under 10KB) for better AI consumption.

**Start here:** [`ai-context/CORE.md`](ai-context/CORE.md) — contains overview, rules, checklist, component inventory, and module index.

---

## Module System (`ai-context/`)

| Module | Content | Size |
|--------|---------|------|
| [`CORE.md`](ai-context/CORE.md) | Overview, critical rules, AI checklist, common mistakes, quality metrics | 9KB |
| [`TYPOGRAPHY.md`](ai-context/TYPOGRAPHY.md) | Font pairing (Serif/Sans/Mono), Major Third scale (1.25), --text-card-micro, weights | 4KB |
| [`COLORS.md`](ai-context/COLORS.md) | 92-5-3 hierarchy, 10 color families, RS color patterns, inline style rules | 8KB |
| [`COMPONENTS.md`](ai-context/COMPONENTS.md) | Button, Link, Badge, Animation, Filter, Molecules (26), Organisms (30+), decision flowcharts | 15KB |
| [`LAYOUT.md`](ai-context/LAYOUT.md) | Spacing, 5 container widths, SectionWrapper, SectionHeading v4.0, RS/CS page assembly | 10KB |
| [`PROMPTS.md`](ai-context/PROMPTS.md) | 12 copy-paste AI prompts covering all pillars and component types | 10KB |

**Total:** ~56KB across 6 modules

---

## Companion Docs

| Document | Purpose |
|----------|---------|
| [`COMPONENT_GUIDELINES_4WH.md`](COMPONENT_GUIDELINES_4WH.md) | 4W+H for every Case Study DS component (22+ entries) |
| [`REPORT_STORE_COMPONENTS_4WH.md`](REPORT_STORE_COMPONENTS_4WH.md) | 4W+H for RS atoms/molecules/organisms/templates (22 entries) |
| [`QUICK_START_PROMPT.md`](QUICK_START_PROMPT.md) | Shortened copy-paste prompt for fast AI sessions |
| [`GITHUB_PUSH_GUIDE.md`](GITHUB_PUSH_GUIDE.md) | Push safety rules, atomic classification, file registry |
| [`design-system-checklist.md`](design-system-checklist.md) | Complete file map (~165 files, 11 groups) |
| [`DESIGN_SYSTEM_UPDATES.md`](DESIGN_SYSTEM_UPDATES.md) | Changelog (v3.2 → v4.3) |
| [`GITHUB_REPO_MANIFEST.md`](GITHUB_REPO_MANIFEST.md) | Canonical repository file inventory |
| [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) | Project file tree with annotations |

---

## Quick Reading Order

**For building a new page:**
1. `ai-context/CORE.md` (always)
2. `ai-context/LAYOUT.md` (section structure)
3. `ai-context/COMPONENTS.md` (which components to use)
4. `COMPONENT_GUIDELINES_4WH.md` or `REPORT_STORE_COMPONENTS_4WH.md` (deep reference)

**For a quick fix:**
1. `QUICK_START_PROMPT.md` (paste into AI)

**For pushing to GitHub:**
1. `GITHUB_PUSH_GUIDE.md` (safety checklist)

---

> **Migration note (2026-03-18):** This file was converted from a ~50KB monolith to a 3KB index.  
> All content now lives in `ai-context/*.md`. If you previously referenced specific sections  
> of this file, use the module index above to find the equivalent content.
