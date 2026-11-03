import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Use auth.json session if it exists, otherwise run without session
const authFile = path.join(__dirname, 'auth.json');
const storageState = fs.existsSync(authFile) ? authFile : undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,

  // global-setup only runs if auth.json needs to be created
  globalSetup: './global-setup.ts',

  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    baseURL: 'https://staging.ablespace.io',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    headless: false,
    // Only use storageState if auth.json exists
    ...(storageState ? { storageState } : {}),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  timeout: 90_000,
  expect: { timeout: 15_000 },
});
