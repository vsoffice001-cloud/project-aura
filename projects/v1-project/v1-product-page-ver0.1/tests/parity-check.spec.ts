/**
 * DS Parity check for /sample — desktop 1440 + mobile 390
 * Screenshots → /tmp/ds-parity/
 * DOM probes: StatCard × 4 · MethodologySection connectors · FAQ aria-expanded · ReportCard images · SectionLabel atoms
 */
import { test, expect, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('parity-check desktop 1440', async ({ page }) => {
  await page.goto('http://localhost:3001/sample', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  // scroll full page to trigger lazy + framer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/ds-parity/desktop-1440.png', fullPage: true });
  console.log('[SHOT] desktop-1440 done');
});

test('parity-check mobile 390', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/sample', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '/tmp/ds-parity/mobile-390.png', fullPage: true });
  console.log('[SHOT] mobile-390 done');
  await ctx.close();
});

test('DOM probes', async ({ page }) => {
  await page.goto('http://localhost:3001/sample', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));

  const dom = await page.evaluate(() => {
    const r: Record<string, any> = {};

    // StatCard × 4
    const statCards = document.querySelectorAll('[class*="StatCard"], [class*="stat-card"], [data-component="StatCard"]');
    r.statCardCount = statCards.length;
    r.statCardClasses = Array.from(statCards).slice(0,4).map((e: any) => e.className.substring(0,100));

    // aria-expanded buttons (FAQ)
    const ariaExp = document.querySelectorAll('button[aria-expanded]');
    r.faqAriaExpandedCount = ariaExp.length;
    r.faqButtonSamples = Array.from(ariaExp).slice(0,3).map((e: any) => ({
      text: e.textContent.trim().substring(0,60),
      expanded: e.getAttribute('aria-expanded')
    }));

    // Methodology connectors
    r.methodConnectors = document.querySelectorAll('[class*="connector"], [class*="step-line"], [class*="timeline"], [class*="StepConnector"]').length;
    const methodEl = document.querySelector('[class*="Methodology"], [class*="methodology"]');
    r.methodologyFound = !!methodEl;
    r.methodologyClass = methodEl ? (methodEl as any).className.substring(0,100) : 'NOT_FOUND';

    // Step numbers inside Methodology
    const stepNums = document.querySelectorAll('[class*="step"] [class*="number"], [class*="Step"] span, [class*="methodology"] [class*="num"]');
    r.methodStepNumCount = stepNums.length;

    // ReportCard images
    const rcImgs = document.querySelectorAll('[class*="ReportCard"] img, [class*="report-card"] img, [class*="reportCard"] img');
    r.reportCardImgCount = rcImgs.length;
    r.reportCardImgSrcs = Array.from(rcImgs).slice(0,3).map((e: any) => e.src.substring(0,80));

    // SectionLabel atoms
    const sl = document.querySelectorAll('[class*="SectionLabel"], [class*="section-label"], [class*="sectionLabel"]');
    r.sectionLabelCount = sl.length;
    r.sectionLabelSamples = Array.from(sl).slice(0,6).map((e: any) => ({
      text: e.textContent.trim().substring(0,40),
      color: window.getComputedStyle(e).color,
      bg: window.getComputedStyle(e).backgroundColor,
      cls: e.className.substring(0,80)
    }));

    // Section backgrounds
    const sections = document.querySelectorAll('main section, main > div[class*="Wrapper"], main > div[class*="wrapper"]');
    r.sectionCount = sections.length;
    r.sectionBgs = Array.from(sections).slice(0,15).map((el: any, i) => ({
      i,
      bg: window.getComputedStyle(el).backgroundColor,
      cls: el.className.substring(0,60)
    }));

    // H1 + H2 headings
    r.h2s = Array.from(document.querySelectorAll('main h1, main h2')).map((e: any) => e.textContent.trim().substring(0,60));

    // Inline bg counts (non-DS pattern)
    r.inlineStyleBgCount = Array.from(document.querySelectorAll('[style*="background"]')).length;

    // Images total
    r.imgCount = document.querySelectorAll('img').length;
    r.imgWithAlt = document.querySelectorAll('img[alt]').length;
    r.imgMissingAlt = document.querySelectorAll('img:not([alt])').length;

    return r;
  });
  console.log('[DOM]', JSON.stringify(dom, null, 2));

  // Basic smoke assertions
  expect(dom.faqAriaExpandedCount).toBeGreaterThan(0);
});

test('axe full pass', async ({ page }) => {
  await page.goto('http://localhost:3001/sample', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const byImpact: Record<string, number> = {};
  for (const v of results.violations) {
    byImpact[v.impact || 'unknown'] = (byImpact[v.impact || 'unknown'] || 0) + v.nodes.length;
  }

  const summary = results.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    nodeCount: v.nodes.length,
    desc: v.description.substring(0,80),
    nodes: v.nodes.slice(0,2).map(n => n.target?.toString().substring(0,60))
  }));

  console.log('[AXE_SUMMARY] violations:', results.violations.length);
  console.log('[AXE_BY_IMPACT]', JSON.stringify(byImpact));
  console.log('[AXE_VIOLATIONS]', JSON.stringify(summary, null, 2));
});
