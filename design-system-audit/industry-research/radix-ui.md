# Radix UI · Industry Research

**Source URLs:**
- https://www.radix-ui.com/
- https://www.radix-ui.com/primitives
- https://www.radix-ui.com/primitives/docs/overview/introduction
- https://www.radix-ui.com/primitives/docs/overview/accessibility
- https://www.radix-ui.com/primitives/docs/overview/releases
- https://www.radix-ui.com/primitives/docs/components/navigation-menu
- https://eastondev.com/blog/en/posts/dev/20260330-shadcn-radix-accessibility/
- https://workos.com/blog/what-is-the-difference-between-radix-and-shadcn-ui
- https://github.com/radix-ui/primitives

Audit applied via WWWWH framework per `01_methodology.md`.
Ken's atoms are built on Radix primitives (transitively via shadcn). Doc is intentionally detailed.

---

## 1 · WHAT

Radix UI Primitives is a low-level, unstyled, accessibility-first React component library by WorkOS. It supplies the **behavior contract** for common UI patterns — Dialog, Dropdown Menu, Combobox, Slider, Tooltip, Tabs, etc. — without imposing any visual style. Every primitive implements WAI-ARIA authoring practices, ships keyboard navigation, focus management, screen-reader support, and RTL handling out of the box. You ship the CSS; Radix ships the brains.

Radix is the gold-standard accessibility substrate for the modern React ecosystem. shadcn/ui, Vercel's interfaces, Linear's app, Modulz (its origin), Coinbase, and large swaths of the React ecosystem depend on it. It is MIT-licensed and free.

---

## 2 · WHY (problem it solves)

- **Accessibility is hard.** A "simple" Dropdown requires: roving tabindex, arrow-key nav, typeahead, Escape-to-close, focus restoration to trigger on close, ARIA roles + state attributes, Portal rendering, click-outside detection, focus trap. Almost no team can implement this from scratch correctly — Radix does it once, correctly, and exposes it for free.
- **Styling lock-in.** Every other accessible library (MUI, Chakra, Bootstrap) ships styles. Customizing means fighting CSS specificity wars. Radix ships zero styles — you can paint whatever brand you want without overriding anything.
- **Component composition pain.** Most libraries give you a monolithic `<Modal title="..." footer={...}>` API. Composition is impossible. Radix uses Compound Component pattern (`<Dialog>`, `<Dialog.Trigger>`, `<Dialog.Content>`, etc.) so consumers control structure, ordering, and even rendered HTML.
- **Polymorphism.** Sometimes a "Button" needs to render as `<a>`, sometimes as `<Link>`, sometimes as `<button>`. Radix introduced the `asChild` prop pattern (now copied by every modern React library) to solve this without polymorphic generics in TypeScript.
- **Controlled vs uncontrolled.** Form-like libs force one or the other. Radix supports both seamlessly — every state-bearing primitive accepts `defaultOpen` (uncontrolled) OR `open` + `onOpenChange` (controlled).

---

## 3 · WHEN to use

- ✅ Building any interactive overlay (Dialog, Popover, Tooltip, Dropdown, ContextMenu, HoverCard) — Radix is non-negotiable for a11y correctness.
- ✅ Building form controls beyond native HTML (Select, Combobox, Slider, Switch, Toggle Group, Radio Group, Checkbox, Date picker) — Radix handles ARIA + keyboard.
- ✅ Building structural composites (Tabs, Accordion, NavigationMenu, ScrollArea, Toolbar).
- ✅ When you want **complete styling freedom** + a11y handled for you.
- ✅ When your DS sits on top of shadcn (which transitively pulls Radix — already true for Ken).

---

## 4 · WHEN NOT to use ❌

- ❌ For pure presentation atoms (Heading, Text, Badge w/o interaction) — Radix is for behavior-bearing components, not visual atoms.
- ❌ When **native HTML element suffices** — `<button>`, `<a>`, `<details>`, `<dialog>` (modern browsers). Don't reach for Radix Dialog if a plain `<dialog>` works.
- ❌ When you need a **fully-styled out-of-box** component fast — use shadcn or another opinionated wrapper on top of Radix.
- ❌ For **complex data viz** (charts, graphs, maps) — Radix doesn't ship these. Use Recharts, Visx, react-spectrum-charts, etc.
- ❌ For **non-React stacks** — Radix is React-only (Radix Themes is also React-only). Other stacks have ports (Bits UI for Svelte, Radix-Vue) but they're community-maintained, not official.

---

## 5 · WHERE (Ken codebase + ecosystem references)

- Transitively present in every Ken `projects/*` consuming shadcn — `template-v3`, `template-v28`, `report-store-v07`, `topnav-v32`.
- `design-system/core-v2/molecules/` — anywhere there's a Dropdown, Tooltip, Sheet, Dialog, Tabs, Accordion, the underlying primitive is Radix.
- Reference for hand-rolled Ken organisms (e.g., custom Combobox for industry catalog filter) — should adopt Radix's hooks/patterns directly rather than reinventing.

---

## 6 · HOW (architectural patterns Ken should inherit)

### 6.1 Compound Component pattern

```tsx
import * as Dialog from "@radix-ui/react-dialog"

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open report sample</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/60" />
    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg">
      <Dialog.Title>Sample report</Dialog.Title>
      <Dialog.Description>Preview the first 5 pages.</Dialog.Description>
      <Dialog.Close asChild><Button variant="ghost">Close</Button></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

Consumer controls every node. Composition over configuration.

### 6.2 `asChild` polymorphism

```tsx
// Trigger projects its props/handlers onto the child element
<Dialog.Trigger asChild>
  <a href="/talk-to-analyst" className="ken-cta">Talk to analyst</a>
</Dialog.Trigger>
```

The Trigger doesn't render a `<button>` — it passes its behavior (ref, onClick, aria-haspopup, etc.) to the child `<a>`. Eliminates wrapper-in-wrapper soup.

### 6.3 Controlled + uncontrolled in one API

```tsx
// Uncontrolled
<Dialog.Root defaultOpen>...</Dialog.Root>

// Controlled
<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>...</Dialog.Root>
```

No two APIs. One prop pair toggles modes.

### 6.4 Portal-by-default for overlays

Dialog, Popover, Tooltip, DropdownMenu, ContextMenu all render their content in a Portal so they escape ancestor `overflow: hidden`, `transform`, or stacking-context bugs. Consumer can opt out via `forceMount` for SSR scenarios.

### 6.5 Data-state attributes for styling

Radix exposes interactive state via `data-state="open|closed"`, `data-side="top|right|bottom|left"`, `data-orientation="horizontal|vertical"`, etc. shadcn uses these heavily:

```tsx
className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[side=top]:slide-in-from-bottom-2"
```

No CSS class-toggling logic in JS — animation hooks are pure CSS driven by Radix state.

### 6.6 Slot primitive

Reusable building block (`@radix-ui/react-slot`) underpinning `asChild`. shadcn ships it inside every variant component (Button, NavigationMenuLink, etc.).

---

## 7 · Primitive catalog (relevant to Ken)

| Primitive | Ken usage |
|---|---|
| Dialog | Lead-form modal · Talk-to-analyst CTA · Sample-report preview |
| AlertDialog | Destructive confirmations (cancel subscription, delete account — admin-side) |
| DropdownMenu | Navbar mega-menu sublists, user menu, sort/filter triggers |
| ContextMenu | Right-click affordance on dashboard items (future) |
| Popover | Tooltip-like rich content (industry tag explainer, KPI definition) |
| Tooltip | Icon-only button hover hint, KPI inline notes |
| HoverCard | Author profile preview on byline hover |
| NavigationMenu | Multi-tier mega-nav (Industries → Regions → Reports) |
| Tabs | Report detail view tab strip (Overview · TOC · Sample · Inquire) |
| Accordion | FAQ section, methodology disclosure |
| Toggle / ToggleGroup | View-mode switch (grid / list), light/dark toggle |
| Switch | Settings toggles, marketing-consent toggles |
| Slider | Price filter, year-range filter |
| Select | Industry / region / country dropdowns (with catalog catalogs) |
| RadioGroup | Pricing-tier selection, contact-form preferred-method |
| Checkbox | Filter pills (multi-select industries), GDPR-consent checkboxes |
| Form (via shadcn) | All lead-capture forms |
| ScrollArea | Long sidebar lists (industries A-Z), report sample preview |
| Separator | Visual divider w/ `role="separator"` correctness |
| Toast (via shadcn `Sonner`) | Form-submit confirmations |
| Toolbar | Editor / admin toolstrips |
| Avatar | Author bylines, team grids |
| Progress | Reading-progress bar on case-study, form-step progress |
| AspectRatio | Responsive media containers (report cover, hero video) |
| Collapsible | Expandable section in long-form report |

---

## 8 · Tokens

Radix Primitives have NO tokens — they are zero-style. Tokens come from your DS layer (Ken's `design-system/tokens/`). What Radix DOES define is **data attributes** that your tokens hook into:

```css
[data-state="open"] { /* open state styling */ }
[data-side="top"]   { /* placement-specific styling */ }
```

Ken's CSS layer should always pair tokens with data-state selectors rather than JS-driven class toggles.

---

## 9 · Component documentation method

Each primitive page on `radix-ui.com` follows: anatomy (with every part labeled and matching the component API) · features list · accessibility table (keyboard map + ARIA roles) · API reference (parts + their props) · examples (controlled / uncontrolled / w/ animation / w/ portal control). Anatomy diagrams are the canonical reference — Ken should adopt this format for any in-house compound component docs.

---

## 10 · Decision trees

Radix doesn't publish decision trees per se, but the API surface implies them. Ken's audit should formalize:
- Dialog vs AlertDialog (destructive confirm vs general modal)
- Dialog vs Sheet (centered vs edge-anchored)
- Popover vs Tooltip vs HoverCard (rich vs short-text vs link-content)
- DropdownMenu vs NavigationMenu (action menu vs nav)
- ContextMenu vs DropdownMenu (right-click vs trigger-click)
- Select vs Combobox (no-search vs typeahead)
- ToggleGroup vs RadioGroup (visual chip vs traditional radio)

---

## 11 · Accessibility (the gold standard)

This is the section that justifies Radix's existence. Every primitive ships:

- **WAI-ARIA conformance** — roles, aria-* attributes, live regions per spec.
- **Keyboard interactions** documented per component:
  - Dialog: Tab cycles within content (focus trap), Shift+Tab reverses, Escape closes, focus returns to trigger.
  - DropdownMenu: ArrowDown/Up navigates items, Home/End jumps, typeahead matches, Enter/Space activates, Escape closes.
  - Tabs: ArrowLeft/Right for `orientation="horizontal"`, ArrowUp/Down for vertical, Home/End jumps.
  - Slider: ArrowLeft/Right adjusts by step, Shift+Arrow adjusts by 10×, Home/End jumps to min/max, Page Up/Down adjusts by larger step.
  - Combobox: ArrowDown opens, Arrow nav within listbox, Enter selects, Escape closes, Tab confirms+moves on.
- **Focus management:**
  - Auto-focus first interactive element on open (Dialog focuses initial focus target).
  - Focus trap inside Dialog/AlertDialog/Drawer — Tab doesn't escape until close.
  - Focus restoration on close — returns to trigger element (critical for screen-reader continuity).
  - Programmatic focus shift documented for edge cases (e.g., AlertDialog moves focus to Cancel button per ARIA-APG).
- **Screen reader testing** — every primitive verified against NVDA, JAWS, VoiceOver per the docs.
- **Labels + descriptions** — Radix provides `Label` primitive that auto-wires `htmlFor` and `aria-labelledby`. Description parts use `aria-describedby`.
- **Reduced-motion respect** — Radix exposes data attributes; CSS animations honor `prefers-reduced-motion` at the consumer layer.
- **RTL** — every spatial primitive (Slider, Tabs, NavigationMenu) flips correctly based on `dir` attribute or ancestor `[dir="rtl"]`.

**Developer responsibility** — Radix is explicit that you MUST supply: meaningful labels (Dialog needs Title or aria-label), live-region announcements where appropriate, and ensure custom CSS doesn't hide focus rings.

---

## 12 · Motion

Radix doesn't ship animations. It ships **data attributes** that animation libraries can hook into. shadcn pairs `data-[state=open]:animate-in` Tailwind utilities; Framer Motion users can wrap with `AnimatePresence` keyed by Radix state. Ken's pattern (per CLAUDE.md) is Framer Motion-only — wire Framer to Radix data-state by reading `data-state` in motion variants, OR use shadcn's Tailwind utilities directly for built-in primitives.

---

## 13 · Strengths

1. **Best-in-class accessibility** — verified against major screen readers, follows WAI-ARIA practices.
2. **Zero styling lock-in** — full visual freedom.
3. **Compound Components** — composition-first API.
4. **`asChild` polymorphism** — solves a problem React's type system can't elegantly solve.
5. **Portal-by-default** — overlays just work, no stacking context surprises.
6. **Controlled + uncontrolled** — both modes in one API.
7. **Tree-shakeable** — each primitive is a separate package (`@radix-ui/react-dialog`), import only what you use.
8. **TypeScript-first** — every prop fully typed, every Compound part is a typed sub-component.
9. **Stable + actively maintained** — backed by WorkOS, releases regularly.
10. **Massive ecosystem leverage** — adopting Radix = adopting the substrate everyone else (shadcn, Vercel, Linear) uses.

---

## 14 · Weaknesses

1. **Verbose** — Compound components require multiple imports/elements per usage. shadcn somewhat mitigates by wrapping.
2. **No bundled styles** — beginners hit a "blank canvas" wall. (Radix Themes addresses this for those who want it.)
3. **Bundle size adds up** — every primitive is a separate package; large apps importing 15+ primitives accumulate KBs. Tree-shaking helps but not perfectly.
4. **Documentation is API-heavy, example-light** — for newcomers, examples often live in shadcn or community blogs, not Radix docs.
5. **No data viz, no charts, no maps** — out of scope.
6. **No Form primitive** — relies on shadcn-form pattern w/ `react-hook-form` + `zod` (which Ken already uses).
7. **Some primitives have learning-curve gotchas** — NavigationMenu's `Viewport` requirements, Combobox virtualization, Select customization beyond native limits.
8. **Animation isn't first-class** — you BYO motion via Tailwind or Framer.

---

## 15 · Why Radix is the gold-standard a11y baseline

- WorkOS funds full-time maintenance; a11y is not a side project.
- Tested across NVDA / JAWS / VoiceOver / TalkBack on real devices, not just axe.
- Conforms to WAI-ARIA Authoring Practices (the W3C reference for non-native widgets).
- Every interaction documented w/ keyboard map AND aria roles AND focus rules — bidirectional spec.
- Used by accessibility-conscious orgs (GitHub, Vercel, Linear, Coinbase, Notion).
- Open-source — bugs get fixed by the community + WorkOS.
- Adoption breeds testing: millions of users hitting Radix primitives every day in production = a11y bugs surface and get patched fast.

---

## 16 · Ken-adopt list (prioritized)

1. **Every Ken atom that wraps a Radix primitive must preserve Radix's a11y guarantees** — never strip `aria-*` attrs, never override focus styles to `outline: none` without replacement, never short-circuit focus traps. Add lint rule. HIGH.
2. **Document the Radix dependency graph in Ken DS** — DESIGN.md should state explicitly "Dialog inherits Radix Dialog; Tooltip inherits Radix Tooltip" so dev/AI agents know not to re-implement. HIGH.
3. **Adopt `asChild` everywhere polymorphism is needed** — Button, CTALink, MenuItem all should support `asChild` so consumers can swap rendered element. HIGH.
4. **Standardize compound API for Ken-original organisms** — when Ken builds something Radix doesn't (e.g., CinematicHero, ReportPicker), use Compound pattern (CinematicHero.Header, CinematicHero.Body, CinematicHero.CTA) for composability. MEDIUM.
5. **Use `data-state` selectors over JS class toggles** for animations + styling. Already in shadcn-derived components; reaffirm. HIGH.
6. **Map keyboard interactions per Ken organism** in WWWWH docs — even if Radix handles it, document it (e.g., Navbar mega-menu keyboard map). MEDIUM.
7. **Adopt React Aria (Adobe) for primitives Radix doesn't have** (Color Picker, DateRangePicker, complex tables) rather than building from scratch. MEDIUM.
8. **Reduced-motion + RTL discipline at consumer layer** — Radix exposes the hooks; Ken's CSS must honor them. HIGH.
9. **Test against real screen readers** as part of `aura-qa` workflow (NVDA on Windows, VoiceOver on macOS) — not just axe. MEDIUM-HIGH.
10. **Pin Radix major versions** per project to prevent API drift across `projects/*`. LOW.

---

**Net read for Ken:** Radix is the load-bearing a11y substrate beneath every interactive atom in the Ken DS. The audit must explicitly document the Radix-derived behavior contract for each compound component so it can't accidentally be dropped during refactors, redesigns, or AI-driven rewrites. The biggest risk is a future agent re-implementing a Dropdown from scratch and silently losing keyboard nav. Document the chain — Ken atom → shadcn wrapper → Radix primitive → ARIA spec — for every behavior-bearing component.
