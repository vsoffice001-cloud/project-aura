import { test, chromium } from '@playwright/test';
import fs from 'fs';

test('ink-hierarchy-§08', async () => {
  const outDir = '/tmp/ink-hierarchy-restored';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3040/test/phase-2#market-size', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  await page.evaluate(() => {
    const el =
      document.querySelector('#market-size') ||
      [...document.querySelectorAll('[id]')].find((e) =>
        (e as HTMLElement).id.toLowerCase().includes('market')
      );
    if (el) (el as HTMLElement).scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' as ScrollLogicalPosition });
  });
  await page.waitForTimeout(700);

  const results = await page.evaluate(() => {
    const gc = (el: Element | null | undefined): string =>
      el ? window.getComputedStyle(el as Element).color : 'NOT_FOUND';

    const section: Element | null =
      (document.querySelector('#market-size') ||
        [...document.querySelectorAll('[id]')].find((e) =>
          (e as HTMLElement).id.toLowerCase().includes('market')
        )) as Element | null;

    const h2 = [...document.querySelectorAll('h2')].find(
      (h) =>
        h.textContent?.toLowerCase().includes('decade') ||
        h.textContent?.toLowerCase().includes('acceleration')
    );

    const ledePara = section
      ? [...section.querySelectorAll('p')].find(
          (p) =>
            (p.textContent?.trim().length ?? 0) > 60 &&
            !p.closest('figcaption') &&
            !p.closest('[class*="nsight"]') &&
            !p.closest('[class*="Insight"]')
        )
      : null;

    const yearEl = [...document.querySelectorAll('*')].find(
      (el) =>
        el.textContent?.trim() === '2017' &&
        el.children.length === 0 &&
        !['SCRIPT', 'STYLE', 'META', 'LINK'].includes(el.tagName)
    );

    const audEl = [...document.querySelectorAll('*')].find(
      (el) =>
        /4\.2/.test(el.textContent ?? '') &&
        el.children.length === 0 &&
        !['SCRIPT', 'STYLE', 'META', 'LINK'].includes(el.tagName)
    );

    const preCovidEl = [...document.querySelectorAll('*')].find(
      (el) =>
        (el.textContent ?? '').includes('Pre-COVID') &&
        el.children.length === 0 &&
        !['SCRIPT', 'STYLE'].includes(el.tagName)
    );

    const figEl = document.querySelector('figcaption');

    const insightEyeEl = [...document.querySelectorAll('*')].find(
      (el) =>
        (el.textContent ?? '').includes('WHAT THIS MEANS') &&
        el.children.length < 3 &&
        !['SCRIPT', 'STYLE'].includes(el.tagName)
    );

    const insightBox = (
      section?.querySelector('[class*="nsight"], [class*="Insight"]') ??
      document.querySelector('[class*="nsight"], [class*="Insight"]')
    ) as Element | null;

    const insightBodyEl = insightBox
      ? [...insightBox.querySelectorAll('p')].find(
          (p) => (p.textContent?.trim().length ?? 0) > 40
        )
      : null;

    return {
      h2:          { t: h2?.textContent?.trim().slice(0, 60) ?? 'NOT_FOUND', c: gc(h2) },
      lede:        { t: ledePara?.textContent?.trim().slice(0, 60) ?? 'NOT_FOUND', c: gc(ledePara) },
      y2017:       { t: yearEl?.textContent?.trim() ?? 'NOT_FOUND', c: gc(yearEl) },
      aud42:       { t: audEl?.textContent?.trim().slice(0, 25) ?? 'NOT_FOUND', c: gc(audEl) },
      preCovid:    { t: preCovidEl?.textContent?.trim().slice(0, 40) ?? 'NOT_FOUND', c: gc(preCovidEl) },
      figcap:      { t: figEl?.textContent?.trim().slice(0, 60) ?? 'NOT_FOUND', c: gc(figEl) },
      insightEye:  { t: insightEyeEl?.textContent?.trim().slice(0, 35) ?? 'NOT_FOUND', c: gc(insightEyeEl) },
      insightBody: { t: insightBodyEl?.textContent?.trim().slice(0, 60) ?? 'NOT_FOUND', c: gc(insightBodyEl) },
      sectionId:   (section as HTMLElement | null)?.id ?? 'NO_SECTION',
    };
  });

  console.log('\n=== INK HIERARCHY PROBE ===');
  console.log(JSON.stringify(results, null, 2));

  await page.screenshot({ path: `${outDir}/section08-viewport-1440.png` });
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/section08-milestones-1440.png` });
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/section08-chart-insight-1440.png` });

  console.log('Screenshots saved to /tmp/ink-hierarchy-restored/');
  await browser.close();
});
