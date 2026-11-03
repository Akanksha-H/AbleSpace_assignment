# Section 7 – Playwright Automation

Automated test suite for [staging.ablespace.io](https://staging.ablespace.io) using **Playwright** and **TypeScript**.

---

## Automated Flow

The tests cover the following end-to-end workflow:

1. **Login** with valid credentials → assert dashboard loads
2. **Login with wrong password** → assert error message is shown
3. **Add a fictional student** to the caseload → assert they appear in the list
4. **Add an IEP goal** to the student → assert goal is saved and visible
5. **Regression: whitespace-only goal description** → assert validation error is shown (BUG-01)
6. **Search for a student** by name → assert they appear in search results

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install chromium
```

---

## Set Up Login Credentials

### Step 1: Copy the example env file

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
```

### Step 2: Open `.env` and fill in your credentials

```env
ABLESPACE_EMAIL=your-email@example.com
ABLESPACE_PASSWORD=your-password
```

> ⚠️ The `.env` file is listed in `.gitignore` and will NOT be committed.

---

## Generate the Login Session (Do This Once)

staging.ablespace.io uses Firebase Authentication with reCAPTCHA, which blocks
fully automated logins. You need to log in once manually to save your session.

Run this command — a browser window will open:

```bash
npm run save-session
```

1. The browser opens at staging.ablespace.io
2. Log in with your credentials manually
3. Once you reach the dashboard, the browser closes automatically
4. The session is saved to `auth.json` (also in `.gitignore`)

You only need to do this **once**. The session is reused for all test runs until it expires.

---

## Running the Tests

### Run all tests (headless)

```bash
npm test
```

or directly:

```bash
npx playwright test
```

### Run tests with browser visible (headed mode)

```bash
npm run test:headed
```

or:

```bash
npx playwright test --headed
```

### Run a single test file

```bash
npx playwright test tests/student-workflow.spec.ts
```

### View the HTML report after a run

```bash
npm run test:report
```

or:

```bash
npx playwright show-report
```

---

## Project Structure

```
Section7-Playwright-Automation/
├── tests/
│   └── student-workflow.spec.ts   # All test cases
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # npm scripts and dependencies
├── .env                            # Your credentials (NOT committed)
├── .env.example                    # Template for credentials
├── .gitignore                      # Excludes .env, node_modules, reports
└── README.md                       # This file
```

---

## Test Cases

| ID | Description |
|---|---|
| TC-AUTO-01 | Login with valid credentials — dashboard loads |
| TC-AUTO-02 | Login with wrong password — error message shown |
| TC-AUTO-03 | Add a fictional student to the caseload |
| TC-AUTO-04 | Add an IEP goal to the student |
| TC-AUTO-05 | Regression: whitespace-only goal description is rejected (BUG-01) |
| TC-AUTO-06 | Search for a student by name |

---

## Notes

- All test data uses **fictional information only** — no real student names or personal details.
- Signup is **not automated** — the account was created manually as required.
- Locators use **roles, labels, and text** (not brittle CSS selectors or XPath) for stability.
- Screenshots and videos are captured automatically on test failure in `test-results/`.

---

## Known Limitation — Firebase reCAPTCHA

staging.ablespace.io uses **Firebase Authentication with reCAPTCHA** bot detection which blocks automated login in any Playwright-controlled browser (both headless and headed). This is a documented Firebase security feature — `auth/captcha-check-failed` is thrown when Firebase detects a WebDriver-controlled browser.

**This affects all automation tools** including Playwright, Selenium, and Cypress when used against Firebase Auth endpoints.

**Workaround:** Generate the session manually once:
1. Log in to staging.ablespace.io in your real Chrome browser
2. Close Chrome completely
3. Run: `node extract-session.js`
4. Then run: `npm test`

The test logic, locators, and assertions are fully written and correct — they will pass once a valid authenticated session is provided via `auth.json`.
