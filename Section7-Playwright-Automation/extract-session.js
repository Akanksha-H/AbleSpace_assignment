/**
 * extract-session.js
 *
 * Run this with Node.js AFTER you have manually logged in to
 * staging.ablespace.io in your real Chrome browser.
 *
 * It reads your Chrome cookies for staging.ablespace.io and
 * builds a valid auth.json that Playwright can use.
 *
 * Usage:
 *   node extract-session.js
 *
 * Requirements:
 *   npm install chrome-cookies-secure
 */

const fs = require('fs');
const path = require('path');

async function main() {
  let chromeCookies;
  try {
    const chromeCookiesSecure = require('chrome-cookies-secure');
    chromeCookies = chromeCookiesSecure;
  } catch {
    console.error('\nMissing dependency. Run: npm install chrome-cookies-secure');
    process.exit(1);
  }

  const url = 'https://staging.ablespace.io';

  console.log(`\nReading Chrome cookies for ${url}...`);
  console.log('Make sure you are logged in to staging.ablespace.io in Chrome first!\n');

  chromeCookies.getCookies(url, 'puppeteer', async (err, cookies) => {
    if (err) {
      console.error('Error reading cookies:', err.message);
      console.error('\nMake sure Chrome is CLOSED before running this script.');
      process.exit(1);
    }

    if (!cookies || cookies.length === 0) {
      console.error('No cookies found for staging.ablespace.io');
      console.error('Please log in to the site in Chrome first, then run this script.');
      process.exit(1);
    }

    console.log(`Found ${cookies.length} cookie(s)`);

    // Build Playwright storageState format
    const storageState = {
      cookies: cookies.map(c => ({
        name: c.name,
        value: c.value,
        domain: c.domain || 'staging.ablespace.io',
        path: c.path || '/',
        expires: c.expires || -1,
        httpOnly: c.httpOnly || false,
        secure: c.secure || false,
        sameSite: 'Lax',
      })),
      origins: [],
    };

    const authFile = path.join(__dirname, 'auth.json');
    fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
    console.log(`\n✓ auth.json saved with ${cookies.length} cookies`);
    console.log('Now run: npm test\n');
  });
}

main();
