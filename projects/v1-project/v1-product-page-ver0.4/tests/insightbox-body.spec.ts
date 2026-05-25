import { test, chromium } from '@playwright/test';
import fs from 'fs';

test('insightbox-body-color', async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3040/test/phase-2', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const r = await page.evaluate(() => {
    const gc = (el: Element | null): string => el ? window.getComputedStyle(el).color : 'NOT_FOUND';

    const insightAside = document.querySelector('aside[role="note"]');
    const allPs = insightAside ? [...insightAside.querySelectorAll('p')] : [];

    return {
      pCount: allPs.length,
      ps: allPs.map((p, i) => ({ i, t: p.textContent?.trim().slice(0,60), c: gc(p) })),
      // also check the body text div/span
      spans: insightAside ? [...insightAside.querySelectorAll('span, div')].map(el => ({
        tag: el.tagName,
        t: el.textContent?.trim().slice(0,40),
        c: gc(el),
      })) : [],
    };
  });

  console.log('\n=== INSIGHTBOX BODY PROBE ===');
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
});
