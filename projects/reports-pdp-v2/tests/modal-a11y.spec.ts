/**
 * Modal a11y deep test — v2b polish (2026-05-13)
 *
 * Validates LeadFormModalProvider:
 *   1. role="dialog" + aria-modal="true"
 *   2. aria-labelledby points to title
 *   3. Focus moves into modal on open (first focusable)
 *   4. ESC closes modal + restores focus to trigger
 *   5. Tab + Shift+Tab trap focus inside modal
 *   6. Click outside (backdrop) closes modal
 *
 * Run: pnpm exec playwright test modal-a11y --headed
 */
import { test, expect } from '@playwright/test';

const SAMPLE_REPORT = '/reports/australia-cold-chain-market-2022-2027';

test.describe('LeadFormModalProvider a11y', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAMPLE_REPORT);
    await page.waitForLoadState('networkidle');
  });

  test('modal not in DOM when closed', async ({ page }) => {
    const dialogs = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(dialogs).toHaveCount(0);
  });

  test('clicking "Request Sample" CTA opens dialog w/ correct a11y attrs', async ({ page }) => {
    // Find first sample-request trigger (FinalCTABlock or ExecutiveSummary etc.)
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(dialog).toHaveCount(1);
    await expect(dialog).toBeVisible();

    // aria-labelledby points to existing title element
    const labelId = await dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const title = page.locator(`#${labelId}`);
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  });

  test('focus moves into modal on open', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    // Wait for animation + focus shift
    await page.waitForTimeout(400);

    const dialog = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible();

    // Focused element must be inside the dialog
    const focusedIsInDialog = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"][aria-modal="true"]');
      return dlg ? dlg.contains(document.activeElement) : false;
    });
    expect(focusedIsInDialog).toBe(true);
  });

  test('ESC key closes dialog + restores focus to trigger', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    await page.waitForTimeout(400);
    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toHaveCount(0);

    // Focus restored to trigger
    const focusedMatchesTrigger = await page.evaluate(() => {
      const active = document.activeElement;
      const triggerText = active?.textContent?.toLowerCase() ?? '';
      return triggerText.includes('download sample report');
    });
    expect(focusedMatchesTrigger).toBe(true);
  });

  test('Tab + Shift+Tab cycle focus inside modal (no escape to page)', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await page.waitForTimeout(400);

    // Tab through 20 times · verify focus never leaves dialog
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const stillInside = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][aria-modal="true"]');
        return dlg ? dlg.contains(document.activeElement) : false;
      });
      expect(stillInside, `Tab #${i + 1} escaped modal`).toBe(true);
    }

    // Shift+Tab 20 times · same check
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Shift+Tab');
      const stillInside = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][aria-modal="true"]');
        return dlg ? dlg.contains(document.activeElement) : false;
      });
      expect(stillInside, `Shift+Tab #${i + 1} escaped modal`).toBe(true);
    }
  });

  test('backdrop click closes dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await page.waitForTimeout(400);

    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toBeVisible();

    // Click backdrop (aria-hidden div above dialog z-index)
    await page.locator('[aria-hidden="true"].fixed.inset-0').first().click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(400);

    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toHaveCount(0);
  });

  test('close button (X) closes dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /download sample report/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await page.waitForTimeout(400);

    const closeBtn = page.getByRole('button', { name: /close form/i });
    await closeBtn.click();
    await page.waitForTimeout(400);

    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toHaveCount(0);
  });
});
