import { test } from '@playwright/test';
import * as path from 'path';

test('drift scan screenshots', async ({ page, browser }) => {
  // Desktop 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/sample', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/phase1-drift/desktop-1440-top.png', fullPage: false });
  
  // Scroll full to trigger all lazy loads
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/phase1-drift/desktop-1440-full.png', fullPage: true });
  
  // Probe backgrounds
  const sectionData = await page.evaluate(() => {
    const mains = document.querySelector('main');
    if (!mains) return [];
    const children = Array.from(mains.children);
    return children.map((el, i) => {
      const style = window.getComputedStyle(el);
      return { 
        index: i, 
        tag: el.tagName, 
        id: el.id || '',
        ariaLabel: el.getAttribute('aria-labelledby') || el.getAttribute('aria-label') || '',
        bg: style.backgroundColor,
        className: el.className?.slice(0,80) || '',
        firstH2: el.querySelector('h2')?.textContent?.trim()?.slice(0,60) || '',
        firstH1: el.querySelector('h1')?.textContent?.trim()?.slice(0,60) || '',
      };
    });
  });
  console.log('SECTIONS:', JSON.stringify(sectionData, null, 2));
  
  // H1 check
  const h1 = await page.locator('h1').first().textContent();
  console.log('H1:', h1);
  
  // H2 list
  const h2s = await page.locator('h2').allTextContents();
  console.log('H2s:', JSON.stringify(h2s));
  
  // StatCard count (2x2 panel)
  const statPanel = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('[style*="rgba(255,255,255,0.04)"], [style*="rgba(255,255,255,.04)"]'));
    return divs.length;
  });
  console.log('Stat panel divs:', statPanel);
  
  // Methodology section check - is it a tab stepper or numbered cards?
  const methTabs = await page.locator('button[class*="rounded"]').allTextContents();
  console.log('Buttons:', JSON.stringify(methTabs.slice(0,15)));
  
  // FAQ
  const faqButtons = await page.locator('button[aria-expanded]').allTextContents();
  console.log('FAQ buttons:', JSON.stringify(faqButtons.slice(0,6)));
  
  // Final CTA heading
  const finalH2 = await page.locator('section[aria-label*="call to action"] h2').textContent().catch(() => '');
  console.log('Final CTA H2:', finalH2);
  
  // Slideshow section present?
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Has slideshow ref:', bodyText.includes('Executive Summary') && (bodyText.includes('slide') || bodyText.includes('Slide')));
  console.log('Has ChapterMethodology tabs (Approach/Data Collection/Validation):', 
    bodyText.includes('Approach') && bodyText.includes('Data Collection') && bodyText.includes('Validation'));
  
  // Scroll progress bar present?
  const scrollBar = await page.locator('[style*="scaleX"], [class*="scroll-progress"], [class*="ScrollProgress"]').count();
  console.log('ScrollProgress bar count:', scrollBar);
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/phase1-drift/mobile-390-top.png', fullPage: false });
  await page.screenshot({ path: '/tmp/phase1-drift/mobile-390-full.png', fullPage: true });
});
