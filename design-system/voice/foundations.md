# Voice — Foundations Pillar

**Color tag:** black / neutral, Ken Red `#b01f24` for CTAs only  
**Lives on:** DS-core, DS-dashboard, AI-context modules, README files, contributor guides, internal docs, technical handover docs, this voice rulebook itself

---

## Identity

The maintainer's voice. Instructive, exact, machine-readable. Speaks to designers, engineers, and AI agents. Optimized for parsing, lookup, decision-making.

---

## When to use this surface

- Design system documentation (DS-core dashboard pages, DS-dashboard pages)
- AI-context modules (`ai-context/CORE.md`, `COLORS.md`, etc.)
- Component 4W+H docs
- README files
- Contributor guides / contribution rules
- Token documentation
- Voice docs (recursive — this file uses Foundations voice)
- Technical handover docs
- Internal STATUS / HANDOVER / DECISIONS / LEARNINGS

**NOT for:** customer-facing copy. If a foundation surface needs to talk to end users (e.g. error pages, empty states), inherit the relevant pillar voice (Research / Surveys / Consulting).

---

## Tone

**3 adjectives:** Instructive · Exact · Scannable.  
**1 forbidden adjective:** Cute.

The Foundations reader is on a task: find a token, look up a component API, decide a pattern, validate a rule. Voice serves the task. No personality, no opinion beyond the documented decision.

---

## Vocabulary

**Allowed (use these):**
token · component · atom · molecule · organism · template · variant · prop · default · required · optional · use · do · don't · always · never · prefer · deprecated · superseded · breaking · additive · 4W+H · why / what / when / when-not / how · architecture · primitive · semantic · canonical · source of truth · contract · API · pattern · recipe

**Forbidden (avoid):**
awesome · amazing · slick · clean (subjective) · beautiful · elegant · fun · friendly · delightful · magical · wonderful · superpower · wizardry · sprinkle · vibe · juicy · just (filler) · simply · easily · obviously

---

## Sentence patterns

**GOOD:**
> Use `Button` `variant="brand"` for conversion CTAs only. Default size is `md` (42px height). Add `showArrow={true}` only for urgency or form-redirect actions.

**BAD:**
> Our awesome Button component makes it super easy to add beautiful CTAs! Just pop it into your page and you're good to go!

**GOOD:**
> `--brand-red` is reserved for CTA backgrounds. Never use as text color, decorative border, or section background.

**BAD:**
> Ken Red is our brand's signature color — feel free to sprinkle it wherever it adds delightful visual interest!

**GOOD:**
> Deprecated in v4.0. Use `ReportCard layout="grid"` instead. Migration: replace `<ReportGridCard>` with `<ReportCard layout="grid">`. Same prop API.

**BAD:**
> The old ReportGridCard isn't really used anymore — you should probably try the new one when you get a chance.

---

## Reading level target

Flesch-Kincaid Grade 10-12. Educated technical reader. Trades narrative for precision and parseability.

Tables, lists, code blocks, fenced examples. Prose only when it adds context tables can't.

---

## Headline rules

- **H1:** Document title, exact descriptor. *"Voice — Surveys Pillar"* · *"COLORS.md"* · *"Component Reference"*.
- **H2:** Section function. *"Identity"* · *"Vocabulary"* · *"Anti-patterns"* · *"When to use"*.
- **H3:** Subsection / subcategory. *"Allowed words"* · *"Headline rules"* · *"Migration"*.
- **No marketing copy in headers.** Headers = labels, not slogans. *"Why we built this"* > *"The journey to design system mastery"*.
- **Sentence case for prose, ALL CAPS for tags.** Section labels follow the pillar standard (eyebrow tags ALL CAPS, body in sentence case).

---

## Body rules

- **Tables for any list with 2+ attributes per row.** Use markdown tables. Don't write paragraphs of bulleted attributes.
- **Code blocks for tokens, props, file paths, commands.** Fenced w/ language tag.
- **4W+H sections** for component documentation. Required: WHY, WHAT, WHEN, WHEN-NOT, HOW.
- **Decision flowcharts** (text-based or mermaid) for any "which one to pick" question. Better than prose.
- **Use admonitions sparingly:** `**Important:**` / `**Note:**` / `**Deprecated:**` / `**Migration:**`. Don't sprinkle.
- **Voice:** Imperative for instructions ("Use X", "Don't use Y"). Declarative for facts ("`X` returns Y").
- **Avoid first-person.** No "we recommend" — say "use" or "prefer". No "you should" — say "do".

---

## CTA copy rules

(Foundations docs rarely have CTAs. When they do — link to component, link to source — keep them functional.)

- **GOOD:** *"View Button source"* · *"See COLORS.md"* · *"Run validation"* · *"View 4W+H"*
- **BAD:** *"Click here for awesome details!"* · *"Learn more about our amazing tokens!"*

---

## Number / data formatting

- **File paths:** Backticks. *`design-system/tokens/tokens.json`*.
- **Component names:** Backticks + PascalCase. *`Button`* · *`SectionHeading`*.
- **Token names:** Backticks + kebab-case. *`--brand-red`* · *`--text-2xl`*.
- **Pixel values:** Numeral + "px". *"42px height"* / *"44px touch target"*.
- **Versions:** Semver. *"v4.0"* / *"v4.3"*. With date if context requires.
- **Counts:** Numeral. *"35 atoms"* / *"131 tokens"*.
- **Status:** Bracketed all-caps tags in tables. *`[BUILT]`* · *`[DEPRECATED]`* · *`[PENDING]`* · *`[BREAKING]`*.

---

## Anti-patterns

1. **Never use marketing language in DS docs.** No "powerful", "elegant", "beautiful", "amazing", "best-in-class".
2. **Never use first-person plural in instructions.** *"We recommend"* = weak. *"Use"* / *"Prefer"* = correct.
3. **Never use exclamation marks** outside admonitions.
4. **Never use emoji** in DS docs except: ✅ ❌ for allowed/forbidden tables, and only sparingly.
5. **Never bury the rule.** Lead with the rule. Examples support, not precede.
6. **Never use vague qualifiers** ("usually", "often", "in most cases") for rules. If something has exceptions, state the exceptions explicitly.
7. **Never use "easy", "simple", "just"** to describe a task. Subjective. Skip the qualifier.
8. **Never write narrative prose for what fits in a table.** Tables are scannable, prose is not.
9. **Never abbreviate component names** in docs. *`SectionHeading`* not *`SH`* or *`SectionHd`*.
10. **Never use "etc."** at the end of a list of rules. List exhaustively or label as "examples include".
11. **Never describe what is documented elsewhere — link instead.** Single source of truth.
12. **Never write speculative future-tense rules** ("we'll probably add", "this might support"). Document what is. Track what's planned in roadmap docs separately.
13. **Never document an implementation detail that should be a token.** If it's repeated, token it.
14. **Never use the word "obviously"** — if it were obvious, it wouldn't need documenting.
