# 🚀 Quick Start Guide - KP 2.0 Design System

## ⚡ Get Started in 5 Minutes

### 1. Import What You Need

```tsx
// Import tokens
import { colors, typography, spacing } from '@/design-system/tokens';

// Import components
import { 
  Button, 
  Card, 
  Hero, 
  FeatureShowcase 
} from '@/design-system/components';
```

### 2. Use Components

```tsx
function MyPage() {
  return (
    <Hero
      title="My Amazing Page"
      description="Built with the design system"
      primaryCTA={{ text: "Get Started", onClick: () => {} }}
    />
  );
}
```

### 3. You're Done! 🎉

That's it! You're using the design system.

---

## 📚 Common Patterns

### Pattern 1: Landing Page

```tsx
import { Hero, StatsSection, FeatureShowcase, CTASection, Footer } from '@/design-system/components';

function LandingPage() {
  return (
    <>
      <Hero
        variant="centered"
        title="Welcome"
        primaryCTA={{ text: "Get Started", onClick: () => {} }}
      />
      
      <StatsSection
        heading="Our Impact"
        stats={[
          { value: "10K+", label: "Users" },
          { value: "99%", label: "Satisfaction" },
        ]}
      />
      
      <FeatureShowcase
        heading="Features"
        features={[
          { icon: <Star />, title: "Amazing", description: "So cool" },
        ]}
      />
      
      <CTASection
        title="Ready?"
        primaryCTA={{ text: "Sign Up", onClick: () => {} }}
      />
      
      <Footer logo={<Logo />} />
    </>
  );
}
```

**Time:** 5 minutes  
**Result:** Complete landing page

---

### Pattern 2: Dashboard

```tsx
import { Section, GridLayout, Card, StatCard, DataTable } from '@/design-system/components';

function Dashboard() {
  return (
    <Section>
      <GridLayout columns={3} gap="lg">
        <StatCard value="$45M" label="Revenue" />
        <StatCard value="1.2K" label="Users" />
        <StatCard value="98%" label="Uptime" />
      </GridLayout>
      
      <Card variant="basic" padding="lg">
        <DataTable columns={columns} data={data} />
      </Card>
    </Section>
  );
}
```

**Time:** 3 minutes  
**Result:** Professional dashboard

---

### Pattern 3: Feature Grid

```tsx
import { Section, CardGrid } from '@/design-system/components';

function Features() {
  return (
    <Section>
      <CardGrid
        columns={3}
        cards={[
          { variant: "feature", icon: <Star />, title: "Fast", description: "Super fast" },
          { variant: "feature", icon: <Zap />, title: "Secure", description: "Very secure" },
          { variant: "feature", icon: <Shield />, title: "Reliable", description: "Always up" },
        ]}
      />
    </Section>
  );
}
```

**Time:** 2 minutes  
**Result:** Feature showcase

---

## 🎨 Component Cheatsheet

### Atoms (Small Building Blocks)

```tsx
// Button
<Button variant="primary" size="lg">Click Me</Button>

// StatCard
<StatCard value="$45M" label="Revenue" trend="up" />

// Badge
<Badge variant="success">Active</Badge>

// Heading
<Heading level="h1">Title</Heading>

// Text
<Text variant="body">Some text</Text>
```

### Molecules (Composed Components)

```tsx
// Card
<Card variant="feature" icon={<Star />} title="Title" description="Desc" />

// List
<BulletList items={["One", "Two", "Three"]} />

// Table
<DataTable columns={cols} data={data} />

// Layout
<TwoColumnLayout left={<div>Left</div>} right={<div>Right</div>} />
```

### Organisms (Full Sections)

```tsx
// Hero
<Hero title="Welcome" primaryCTA={{ text: "Start", onClick: () => {} }} />

// Features
<FeatureShowcase heading="Features" features={[...]} />

// Stats
<StatsSection heading="Numbers" stats={[...]} />

// CTA
<CTASection title="Join Us" primaryCTA={{ text: "Sign Up", onClick: () => {} }} />

// FAQ
<FAQSection heading="FAQ" faqs={[...]} />

// Footer
<Footer logo={<Logo />} columns={[...]} />
```

---

## 💡 Pro Tips

### Tip 1: Use Variants

Most components have variants for different styles:

```tsx
// Buttons
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Cards
<Card variant="basic">Basic</Card>
<Card variant="feature">Feature</Card>
<Card variant="stat">Stat</Card>

// Hero
<Hero variant="centered">Centered</Hero>
<Hero variant="split">Split</Hero>
```

### Tip 2: Compose Components

Build complex UIs by composing components:

```tsx
<Card variant="basic" padding="lg">
  <Heading level="h3">Title</Heading>
  <Text>Description</Text>
  <Button variant="primary">Action</Button>
</Card>
```

### Tip 3: Use Tokens for Custom Styles

When you need custom styling, use tokens:

```tsx
import { colors, spacing } from '@/design-system/tokens';

<div style={{ 
  color: colors.text.primary,
  padding: spacing[4],
}}>
  Custom styled content
</div>
```

### Tip 4: Stack Sections

Build pages by stacking sections:

```tsx
<>
  <Hero />
  <StatsSection />
  <FeatureShowcase />
  <CTASection />
  <Footer />
</>
```

---

## 🎯 Common Use Cases

### Use Case 1: Marketing Page

**Components needed:**
- Hero (centered)
- StatsSection (inline)
- FeatureShowcase (cards)
- CTASection (centered)
- Footer (default)

**Time:** 15 minutes

---

### Use Case 2: Product Page

**Components needed:**
- Hero (split with media)
- FeatureShowcase (list)
- DataTable
- CTASection (banner)

**Time:** 12 minutes

---

### Use Case 3: Dashboard

**Components needed:**
- Section
- GridLayout
- StatCards
- Card with DataTable
- Charts (if needed)

**Time:** 10 minutes

---

### Use Case 4: Blog/Content

**Components needed:**
- Hero (minimal)
- Section
- Card (content variant)
- TwoColumnLayout
- Footer (minimal)

**Time:** 10 minutes

---

## 🔥 Power Moves

### 1. Build a Page in 10 Lines

```tsx
function Page() {
  return (
    <>
      <Hero title="Hi" primaryCTA={{ text: "Go", onClick: () => {} }} />
      <StatsSection stats={[{ value: "100", label: "Users" }]} />
      <FeatureShowcase features={[{ icon: <Star />, title: "Cool", description: "Nice" }]} />
      <CTASection title="Join" primaryCTA={{ text: "Now", onClick: () => {} }} />
      <Footer />
    </>
  );
}
```

### 2. Create a Feature Grid in 3 Lines

```tsx
<CardGrid columns={3} cards={[
  { variant: "feature", icon: <Star />, title: "Feature", description: "Desc" },
]} />
```

### 3. Build a Dashboard in 5 Lines

```tsx
<Section>
  <GridLayout columns={4}>
    {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
  </GridLayout>
</Section>
```

---

## 📖 Learn More

### Detailed Documentation

- **Atoms:** `/src/design-system/components/atoms/`
- **Molecules:** `/src/design-system/components/molecules/`
- **Organisms:** `/src/design-system/components/organisms/`
- **Tokens:** `/src/design-system/tokens/`

### Examples in Code

Every component has JSDoc examples:

```tsx
/**
 * @example
 * ```tsx
 * <Button variant="primary">Click</Button>
 * ```
 */
```

Just hover over the component in your IDE!

---

## ⚠️ Common Mistakes

### ❌ Don't Hardcode Values

```tsx
// Bad
<div style={{ color: '#7f5fe3', padding: '24px' }}>

// Good
<div style={{ color: colors.primary[500], padding: spacing[6] }}>
```

### ❌ Don't Create Custom Components for Common Patterns

```tsx
// Bad - creating custom button
<div onClick={handleClick} style={{ ... }}>Click</div>

// Good - use Button component
<Button onClick={handleClick}>Click</Button>
```

### ❌ Don't Skip Variants

```tsx
// Bad - using basic Card for everything
<Card>Content</Card>

// Good - use appropriate variant
<Card variant="feature" icon={<Star />} title="..." />
```

---

## 🎓 Next Steps

### 1. Browse Components

Open `/src/design-system/components/` and explore!

### 2. Read Phase Docs

Check out the phase completion docs for detailed info:
- `PHASE_3_ATOMIC_COMPONENTS_COMPLETE.md`
- `PHASE_4_COMPOSITE_COMPONENTS_COMPLETE.md`
- `PHASE_5_ORGANISMS_COMPLETE.md`

### 3. Start Building

Just start using components in your pages!

### 4. Customize

Use tokens for custom styling when needed.

### 5. Extend

Need more components? Follow the same patterns!

---

## 🎉 You're Ready!

Start building amazing things with the design system!

**Key Takeaways:**
- ✅ Import components from `@/design-system/components`
- ✅ Use tokens for consistency
- ✅ Compose components together
- ✅ Choose appropriate variants
- ✅ Build pages 10x faster

**Happy coding!** 🚀

---

## 📞 Quick Reference Card

```tsx
// IMPORTS
import { colors, typography, spacing } from '@/design-system/tokens';
import { Button, Card, Hero } from '@/design-system/components';

// BUTTON
<Button variant="primary" size="lg" onClick={() => {}}>Text</Button>

// CARD
<Card variant="feature" icon={<Icon />} title="Title" description="Desc" />

// HERO
<Hero title="Title" primaryCTA={{ text: "CTA", onClick: () => {} }} />

// STATS
<StatsSection stats={[{ value: "100", label: "Label" }]} />

// FEATURES
<FeatureShowcase features={[{ icon: <Icon />, title: "Title", description: "Desc" }]} />

// LAYOUT
<Section><Content /></Section>
<TwoColumnLayout left={<Left />} right={<Right />} />
<GridLayout columns={3}><Cards /></GridLayout>
```

Print this out and keep it handy! 📄

---

**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Status:** Production-Ready ✅
