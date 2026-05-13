# Recipes

Recipe files live at: `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/recipes/`

Each recipe defines:
- Variant lock (editorial-light or cinematic-dark)
- Organism filename table (EXACT names — do not improvise)
- Background alternation sequence (HARD GATE — same bg twice = wrong build)
- Mock data shape

---

## Available recipes

| Recipe | File | Variant | Bg sequence |
|---|---|---|---|
| Case study | `design-system/recipes/case-study.md` | editorial-light (DEFAULT) | BLACK → WHITE → WARM × alternating |

## Section alternation (case-study)

```
1. HeroSection          → BLACK  (#000000)
2. ClientContextSection → WHITE  (#ffffff)
3. ChallengesSection    → WARM   (#f5f2f1)
4. EngagementObjectives → WHITE
5. MethodologySection   → WARM
6. ImpactSection        → WHITE
7. ValuePillarsSection  → WHITE  (+ border-t)
8. TestimonialSection   → WHITE  (+ border-t)
9. ResourcesSection     → BLACK  (dark gradient mesh)
10. FinalCTASection     → WHITE  (+ border-t)
```

aura-qa validates via `getComputedStyle(section).backgroundColor` — asserts alternation.

## lint:recipes

```sh
pnpm lint:recipes
```

Asserts section bg alternation matches recipe sequence per organism file order.
Script: `scripts/lint-section-alternation.mjs` (populated Step 10.5).
