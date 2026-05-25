# shadcn/ui · Industry Research

**Source URLs:**
- https://ui.shadcn.com/
- https://ui.shadcn.com/docs
- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/docs/components-json
- https://vercel.com/academy/shadcn-ui
- https://vercel.com/academy/shadcn-ui/why-shadcn-ui-is-different
- https://workos.com/blog/what-is-the-difference-between-radix-and-shadcn-ui
- https://shadcnstudio.com/blog/radix-ui-vs-shadcn-ui
- https://github.com/shadcn-ui/ui

Audit applied via WWWWH framework per `01_methodology.md`.
Ken's new DS uses shadcn extensively (per CLAUDE.md case-study config: "shadcn: initialized. Add via `npx shadcn@latest add <name>` → `src/components/ui/`"). Doc is intentionally detailed.

---

## 1 · WHAT

shadcn/ui is an open-source component collection — NOT a package — that you install by copying its TypeScript source into your repository via a CLI. Each component is a React + Tailwind + Radix Primitive composition that becomes yours the moment you install it. Built and maintained by `@shadcn` (Hassan El Mghari, now at Vercel), it launched 2023 and has redefined how React component libraries are distributed.

Critically, shadcn/ui rejects the "library as dependency" model: there is no `import { Button } from "@shadcn/ui"`. Instead, `npx shadcn@latest add button` writes `src/components/ui/button.tsx` directly into your project. You own it from second zero.

---

## 2 · WHY (problem it solves)

- Traditional component libraries (Material UI, Chakra, Ant Design) require deep override patterns (`sx`, `styled()`, theme objects) to deviate even slightly from the library author's aesthetic. Customization becomes a wrestling match with the library.
- Upgrading those libraries is risky — minor versions break overrides, semantic versioning fights customization.
- The package boundary hides accessibility logic — when you need to extend a Combobox with a custom behavior, you can't reach inside.
- Headless libraries (Radix, React Aria) solve a11y but leave 100% of styling work to you. shadcn fills that gap: "Radix gives you behavior, shadcn gives you opinionated default styles, you own and modify both."
- AI codegen (Cursor, v0, Claude) struggles with opaque package APIs. Open source code in your repo is readable by both humans AND LLMs — shadcn explicitly markets itself as "AI-Ready" for this reason.
- Designers + frontend devs need a shared substrate where designers can ask "change the Button radius" and devs can reply "you can do it in one CSS var, here's the file."

---

## 3 · WHEN to use

- ✅ When you want **production-grade React components fast** w/o vendor lock-in (Ken's case-study templates, report-store, topnav projects — all consumer-facing Next.js / Vite projects).
- ✅ When the team wants **transparent code** (no black-box props, every styling decision auditable).
- ✅ When **AI codegen is part of the workflow** (Aura uses Claude + Cursor heavily — readable source matters).
- ✅ When **theming is brand-critical** — Ken has a strong brand (cinematic dark + editorial light + brand red), and shadcn's CSS-var-driven theming handles brand overrides natively.
- ✅ As a **starting point for a custom DS** — copy, then bend. shadcn is the lattice for `design-system/core-v2/` per CLAUDE.md.

---

## 4 · WHEN NOT to use ❌

- ❌ When you need a **packaged, versioned library** consumed across many independent repos at scale (use Mantine, Chakra, MUI — they ship semantic versions). Single-product / single-repo only.
- ❌ When the team is **not React + Tailwind** — shadcn is Tailwind-coupled. Vue / Svelte have ports but the official line is React.
- ❌ When you **want zero-maintenance components** — you own the code, so security fixes in Radix downstream don't auto-arrive. You must re-run `npx shadcn add` periodically.
- ❌ When you need **Material Design or Fluent compliance** — shadcn is its own opinionated aesthetic (clean / minimal / Vercel-adjacent).
- ❌ When **bundle size of pre-built packages is preferred** over copy-paste (shadcn duplicates utilities if you `add` many components without DRY discipline).

---

## 5 · WHERE (Ken codebase references)

- `projects/casestudy-templates/template-v3/src/components/ui/` — shadcn primitives consumed by case-study build
- `projects/casestudy-templates/template-v28/src/components/ui/` — same pattern
- `projects/report-store-v07/src/components/ui/` — shadcn add target
- `design-system/core-v2/` — Ken DS that wraps shadcn primitives w/ brand tokens (per Sprint 2026-05-07 closure)
- CLAUDE.md case-study consumer notes: "shadcn: initialized. Add via `npx shadcn@latest add <name>` → `src/components/ui/`"

---

## 6 · HOW (architectural patterns)

### Copy-paste via CLI

```bash
# Initialize once per project
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button card dialog dropdown-menu

# Files land at src/components/ui/button.tsx (configurable in components.json)
```

`components.json` at the project root encodes config: alias paths, Tailwind base color, CSS variable mode, RSC support, icon library (Lucide default).

### Component anatomy (Button example)

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

Five things are happening simultaneously:
1. **CVA** declares variant matrix (`variant` × `size`) and generates className strings.
2. **`cn()`** (a `clsx` + `tailwind-merge` wrapper) lets consumers override Tailwind classes deterministically.
3. **`asChild`** via Radix `Slot` lets the Button project its styles onto a `<Link>`, `<a>`, or any other element — solving the "is this a button or a link" problem cleanly.
4. **forwardRef** preserves ref-passing.
5. **CSS variables** (`bg-primary`, `text-primary-foreground`) come from the theming layer — not hard-coded Tailwind colors.

### CSS variable theming (shadcn's most-copied idea)

Every color is a semantic CSS variable, with a foreground pair:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* etc */
}
```

Dark mode is one selector override, not a duplicated stylesheet. OKLCH is now the default color space (perceptually uniform, predictable across light/dark).

### Composition over configuration

Instead of a Modal w/ 30 props, shadcn ships Dialog as compound parts:

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

This is the Radix compound pattern — shadcn just adds styled parts.

---

## 7 · Tokens

shadcn's tokens are intentionally semantic, not raw:

| Token pair | Purpose |
|---|---|
| `--background` / `--foreground` | Default app surface + text |
| `--card` / `--card-foreground` | Elevated surfaces |
| `--popover` / `--popover-foreground` | Floating layers (menus, tooltips) |
| `--primary` / `--primary-foreground` | Primary action |
| `--secondary` / `--secondary-foreground` | Secondary action |
| `--muted` / `--muted-foreground` | Subdued content |
| `--accent` / `--accent-foreground` | Hover / focus accent |
| `--destructive` | Error / dangerous action |
| `--border` | Dividers |
| `--input` | Form-field borders |
| `--ring` | Focus rings |
| `--radius` | Base radius (derived `sm/md/lg`) |
| `--chart-1..5` | Data viz palette |

Every component class references these vars via Tailwind utilities (`bg-primary`, `text-primary-foreground`). Ken's brand work fits cleanly: map `--primary` to Ken red `#b01f24` for brand variant, set `--background` / `--foreground` per surface variant (cinematic dark vs editorial light).

---

## 8 · Component documentation method

Each component page on `ui.shadcn.com` follows: preview · CLI install command · manual install (deps + paste) · usage · API table (props, default, description) · example variants. Code is always shown verbatim — no abstraction or hand-waving. This is one of the most-copied doc patterns in the React ecosystem; Ken DS docs should match this density of "preview + install + usage + variants + props" per component.

---

## 9 · Decision trees

shadcn itself does not publish decision trees (it's component-by-component). But the registry pattern means decision-making is offloaded to consumers: pick what you need, ignore the rest. Ken should publish its own decision trees layered on shadcn (e.g., "use Button vs CTALink vs TextLink").

---

## 10 · Accessibility

shadcn inherits Radix's WAI-ARIA-conformant behaviour wholesale — focus traps, ARIA roles, keyboard nav, screen-reader announcements all come from Radix primitives underneath. Where shadcn adds custom styling (focus rings via `--ring`, disabled opacity, etc.), it preserves accessible contrast and never blocks focus visibility. Form components integrate with `react-hook-form` + `zod` and surface error states with `aria-invalid` + `aria-describedby` paired w/ `FormMessage`.

---

## 11 · Motion

shadcn ships subtle motion via Tailwind utilities + Radix data-state attributes. Dialogs fade-and-scale in; Dropdowns slide; Sheet slides from edge — all via `data-[state=open]:animate-in data-[state=closed]:animate-out` patterns. `tailwindcss-animate` plugin (now `tw-animate-css` in v4) ships a small set of keyframes. For richer motion (parallax, scroll-driven), Ken layers Framer Motion on top — shadcn doesn't get in the way.

---

## 12 · Strengths

1. **Code ownership** — no version-lock fights.
2. **Radix substrate** — a11y handled by industry-leading primitives.
3. **CVA pattern** — typesafe variant matrix, eliminates prop sprawl.
4. **CSS variable theming** — brand re-skinning is trivial.
5. **AI-readable** — open code in your repo is grokable by LLMs.
6. **Registry model** — components, hooks, blocks, themes all distributed via the same CLI.
7. **Docs as source of truth** — every component is an example.
8. **OKLCH-default colors** — perceptually uniform, future-proof.
9. **`asChild` + Slot pattern** — solves polymorphic component problem cleanly.
10. **Massive ecosystem** — themes, blocks, charts, MCP server, and copycats (Magic UI, Aceternity) all extend the model.

---

## 13 · Weaknesses

1. **No auto-updates** — security/a11y fixes in shadcn upstream don't propagate to your copy unless you re-run `add` and merge manually.
2. **Code duplication** — adding 30 components copies 30 files; if you don't refactor shared utilities, repos grow.
3. **Tailwind lock-in** — non-Tailwind teams can't easily adopt.
4. **No semantic versioning** — you can't pin "shadcn Button v1.2.3"; you pinned a snapshot.
5. **Aesthetic is opinionated** — components look "shadcn" until heavily customized; for brand-strong products, the default look needs significant override work.
6. **Component breadth gap** — shadcn doesn't ship every primitive (no Color Picker, no DateRangePicker out of the box — but registry / Origin UI / similar fills gaps).
7. **RSC vs client confusion** — every shadcn component must be reviewed for `'use client'` directive correctness, especially in Next.js 14/15.
8. **CLI churn** — `components.json` schema, registry URLs, and shadcn CLI flags have evolved several times; pin shadcn CLI version per project.

---

## 14 · What Ken's new DS shares with shadcn (and what to do about it)

Ken's `design-system/core-v2/` post-Sprint 2026-05-07 inherits the shadcn pattern almost wholesale:
- Components copied into `src/components/ui/` per project (case-study, report-store, topnav).
- Radix primitives underneath where applicable.
- CVA variant matrices.
- CSS variable theming via `--primary`, `--background`, etc., mapped to Ken brand tokens in `design-system/tokens/build/tokens.css`.
- `cn()` utility for className merging.

**Ken-adopt list (prioritized):**

1. **Audit + dedupe `components/ui/` across all `projects/*`** — confirm same shadcn version. HIGH. (Audit project deliverable.)
2. **Map shadcn semantic tokens to Ken brand tokens** explicitly in DESIGN.md: `--primary` → Ken black (default) OR Ken red (brand variant), `--background` → cinematic-dark `#0a0a0c` OR editorial-light `#f5f2f1` per variant activator. HIGH.
3. **Document Ken's deviations from default shadcn aesthetic** — shimmer button, cinematic hero patterns, editorial typography (Noto Serif display, DM Sans body) — so future imports don't undo brand work. HIGH.
4. **Pin shadcn CLI version** in each project's `package.json` to prevent surprise registry changes. MEDIUM.
5. **Build a private Ken registry** (per https://ui.shadcn.com/docs/registry) so brand-locked Button, Card, CTALink etc. can be added via `npx shadcn add @ken/button` instead of manual paste. MEDIUM-HIGH.
6. **Use `asChild` everywhere** — Ken's CTALink and TextLink should leverage Slot so the same styles work as `<a>`, `<Link>`, or `<button>`. HIGH.
7. **Adopt OKLCH colors** in `tokens.css` if not already — perceptually uniform handling of brand red and dark/light surfaces. MEDIUM (current Ken tokens are hex per CLAUDE.md).
8. **Standardize the cn() + cva pattern** in DESIGN.md so every new Ken atom (not just shadcn-derived ones) uses the same variant declaration shape. HIGH.

---

**Net read for Ken:** shadcn is not a library to learn, it's a substrate Ken already runs on. The audit project should document Ken's overlay on top of shadcn — what's vanilla, what's branded, what's a Ken-original atom. Without that doc, the next dev / AI agent will re-derive variants and drift.
