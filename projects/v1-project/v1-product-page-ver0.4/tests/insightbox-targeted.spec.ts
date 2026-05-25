import { test, chromium } from '@playwright/test';
import fs from 'fs';

test('insightbox-color-probe', async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3040/test/phase-2', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll full page to trigger all lazy-mount
  await page.evaluate(async () => {
    await new Promise<void>(resolve => {
      let y = 0;
      const step = () => {
        y += 500;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  });
  await page.waitForTimeout(2000);

  // Scroll to market-size bottom
  await page.evaluate(() => {
    const sec = document.querySelector('#market-size');
    if (sec) {
      const rect = sec.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.bottom - window.innerHeight + 200);
    }
  });
  await page.waitForTimeout(600);

  const r = await page.evaluate(() => {
    const gc = (el: Element | null): string => el ? window.getComputedStyle(el).color : 'NOT_FOUND';
    
    // Find InsightBox by role=note
    const insightAside = document.querySelector('aside[role="note"]');
    const insightEyebrowEl = insightAside?.querySelector('p:first-child');
    const insightLeadEl = insightAside?.querySelector('p:nth-child(2)');
    const insightBodyEl = insightAside?.querySelector('p:nth-child(3)');

    // Also try by aria-label
    const insightByLabel = [...document.querySelectorAll('[aria-label]')]
      .find(el => (el.getAttribute('aria-label') ?? '').includes('Insight'));

    return {
      insightAsideFound: !!insightAside,
      insightByLabelFound: !!insightByLabel,
      insightEyebrow: { t: insightEyebrowEl?.textContent?.trim().slice(0,40), c: gc(insightEyebrowEl ?? null) },
      insightLead: { t: insightLeadEl?.textContent?.trim().slice(0,60), c: gc(insightLeadEl ?? null) },
      insightBody: { t: insightBodyEl?.textContent?.trim().slice(0,60), c: gc(insightBodyEl ?? null) },
    };
  });

  console.log('\n=== INSIGHTBOX TARGETED PROBE ===');
  console.log(JSON.stringify(r, null, 2));

  const outDir = '/tmp/ink-hierarchy-restored';
  fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: `${outDir}/s08-insightbox-1440.png` });

  await browser.close();
});
