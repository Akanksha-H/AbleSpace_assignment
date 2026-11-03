/**
 * Global setup — checks for auth.json session file.
 * If missing, authenticated tests will be skipped automatically.
 * See README.md for how to generate auth.json manually.
 */
import { type FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(_config: FullConfig) {
  const authFile = path.join(__dirname, 'auth.json');

  if (fs.existsSync(authFile)) {
    console.log('\n[global-setup] auth.json found — authenticated tests will run ✓');
  } else {
    console.log('\n[global-setup] auth.json NOT found — authenticated tests will be skipped.');
    console.log('[global-setup] To generate auth.json, see README.md\n');
  }
}

export default globalSetup;
