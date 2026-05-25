import { chromium } from '@playwright/test';
import * as path from 'path';

const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';

async function run() {
  const browser = await chromium.launch();
  
  const configs = [
    { name: 'legacy-1440', url: 'http://localhost:3020/', vp: { width: 1440, height: 900 } },
    { name: 'legacy-390', url: 'http://localhost:3020/', vp: { width: 390, height: 844 } },
    { name: 'new-1440', url: 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027', vp: { width: 1440, height: 900 } },
    { name: 'new-390', url: 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027', vp: { width: 390, height: 844 } },
  ];

  for (const cfg of configs) {
    const ctx = await browser.newContext({ viewport: cfg.vp });
    const page = await ctx.newPage();
    try {
      await page.goto(cfg.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(outDir, `${cfg.name}-fold.png`) });
      await page.screenshot({ path: path.join(outDir, `${cfg.name}-full.png`), fullPage: true });
      console.log(`OK: ${cfg.name}`);
    } catch(e: any) {
      console.error(`FAIL: ${cfg.name} - ${e.message}`);
    }
    await ctx.close();
  }
  
  await browser.close();
}

run().catch(console.error);
