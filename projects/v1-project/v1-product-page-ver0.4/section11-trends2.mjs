import { chromium } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to section 11
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(h => h.textContent.includes('forces shaping'));
    if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);

  // Click Trends & Tech
  await page.locator('#radix-_R_12teatpesnelb_-trigger-trends').click();
  await page.waitForTimeout(3000);

  // Check ALL tabpanels
  const allPanels = await page.evaluate(() => {
    const panels = document.querySelectorAll('[role="tabpanel"]');
    return Array.from(panels).map(p => ({
      id: p.id,
      state: p.dataset.state,
      hidden: p.hidden,
      textPreview: p.textContent?.substring(0,120)
    }));
  });
  console.log('ALL PANELS:', JSON.stringify(allPanels, null, 2));

  // Check what the industry section contains right now
  const industrySection = await page.evaluate(() => {
    const sec = document.getElementById('industry');
    if (!sec) return { found: false };
    const panels = sec.querySelectorAll('[role="tabpanel"]');
    return {
      found: true,
      panelCount: panels.length,
      panels: Array.from(panels).map(p => ({
        id: p.id,
        state: p.dataset.state,
        textPreview: p.textContent?.substring(0,100)
      }))
    };
  });
  console.log('INDUSTRY SECTION PANELS:', JSON.stringify(industrySection, null, 2));

  await page.screenshot({ path: `${OUT}/debug-trends-click.png` });

  // Check the Highcharts containers globally
  const hcGlobal = await page.evaluate(() => {
    const containers = document.querySelectorAll('[data-highcharts-chart]');
    return {
      count: containers.length,
      info: Array.from(containers).map(c => ({ 
        id: c.id, 
        chart: c.dataset.highchartsChart,
        visible: c.offsetParent !== null,
        parentClass: c.parentElement?.className?.substring(0,60)
      }))
    };
  });
  console.log('HIGHCHARTS GLOBAL:', JSON.stringify(hcGlobal, null, 2));

  await browser.close();
})();
