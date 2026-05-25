import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('contrast-detail', async ({ page }) => {
  await page.goto('http://localhost:3000/sample', { waitUntil: 'networkidle' });
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  results.violations.forEach(v => {
    console.log(`\n[${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.forEach((n, i) => {
      console.log(`  node ${i+1}: ${n.target[0]}`);
      console.log(`  html: ${n.html?.substring(0, 100)}`);
      console.log(`  failure: ${n.failureSummary?.split('\n').slice(0,3).join(' | ')}`);
    });
  });
});

test('scrollable-mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/sample', { waitUntil: 'networkidle' });
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  results.violations.forEach(v => {
    console.log(`\n[${v.impact}] ${v.id}`);
    v.nodes.forEach((n, i) => {
      console.log(`  ${i+1}. ${n.target[0]}`);
      console.log(`  html: ${n.html?.substring(0, 120)}`);
    });
  });
});
