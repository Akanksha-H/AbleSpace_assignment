/**
 * save-session.ts
 * Run once manually: npm run save-session
 * Log in when the browser opens — session saves automatically.
 */
import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const authFile = path.join(__dirname, 'auth.json');

  console.log('\n=== AbleSpace Session Saver ===');
  console.log('A browser window will open.');
  console.log('Log in to staging.ablespace.io with your credentials.');
  console.log('After logging in, WAIT — the browser will close itself.\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
    args: ['--start-maximized'],
  });

  const context = await browser.newContext({
    viewport: null, // use full window
  });

  const page = await context.newPage();

  await page.goto('https://staging.ablespace.io/signin');

  console.log('Waiting up to 5 minutes for you to log in...');

  try {
    // Poll until URL no longer contains 'signin'
    const deadline = Date.now() + 5 * 60 * 1000;
    while (Date.now() < deadline) {
      await page.waitForTimeout(2000);
      const url = page.url();
      if (!url.includes('signin')) {
        console.log(`\nDetected login success! URL: ${url}`);
        break;
      }
    }

    const finalUrl = page.url();
    if (finalUrl.includes('signin')) {
      console.error('\nLogin not detected within 5 minutes. Exiting without saving.');
      await browser.close();
      process.exit(1);
    }

    // Wait a bit for the app to fully load after login
    await page.waitForTimeout(3000);

    await context.storageState({ path: authFile });
    console.log(`\nSession saved to: ${authFile}`);
    console.log('You can now run tests with: npm test\n');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
