# Section 6 – Test Summary

**Application:** staging.ablespace.io  
**Tester:** Aakanksha Hedau
**Date Tested:** October 21, 2026  

---

## 1. Testing Performed

Testing was conducted on the staging environment of AbleSpace — an AI-powered special education platform used by teachers, SLPs, OTs, and BCBAs to manage student caseloads, IEP goals, session data, and progress reporting.

The following areas were covered:

- **Account creation and login** — signup flow, login with valid/invalid credentials, session handling
- **Student (Caseload) management** — adding, editing, searching, and deleting fictional students
- **IEP Goal management** — adding goals with valid data, edge-case inputs (whitespace-only, very long text), editing and saving goals
- **Data collection / Session logging** — logging data points against IEP goals, verifying progress graph updates
- **Navigation and back-button behaviour** — browser back button, page refresh persistence, empty states
- **Cross-browser compatibility** — tested on Google Chrome 129 and Microsoft Edge 129 on Windows 11
- **Responsive / mobile testing** — tested via browser DevTools device emulation at 390×844 (mobile), 768×1024 (iPad Mini), and 1024×1366 (iPad Pro)

---

## 2. Issues Found

A total of **12 issues** were identified — 8 full bug reports and 5 minor issues.

| ID | Title | Severity |
|---|---|---|
| BUG-01 | IEP Goal accepts whitespace-only description and saves as blank | High |
| BUG-02 | Session timeout fails silently — no user-facing message or redirect | High |
| BUG-03 | Long student name (200+ chars) overflows UI container in caseload list | Medium |
| BUG-04 | "Skip" button overlaps helper text on onboarding screen | Medium |
| BUG-05 | Community attachment button triggers Canny popup below visible viewport | Medium |
| BUG-06 | Community upvote button triggers Canny popup below visible viewport | Medium |
| BUG-07 | "Default Service Type" dropdown in Settings is empty — no options load | High |
| BUG-08 | Save/Cancel buttons overflow outside page boundary on My Account settings — affects Profile and Standards sections | Medium |
| MI-01 | Special characters in search return inconsistent results | Low |
| MI-02 | Back navigation repopulates session log form with stale data | Low |
| MI-03 | Goals list does not show created/modified date | Low |
| MI-04 | Save button obscured by on-screen keyboard on mobile | Low |
| MI-05 | "Skip" button overlaps helper text on onboarding screen (detail in BUG-04) | Medium |

**Which bug I would fix first and why:**  
**BUG-02 (Silent session timeout)** is the highest priority fix. Special education professionals regularly step away during sessions with students. If the app silently expires their session and they return to complete documentation — unaware they've been logged out — any data they enter and attempt to save is simply lost. This directly impacts data integrity and can affect IEP compliance. A simple redirect to login with a clear "Your session has expired" message would resolve this.

---

## 3. Areas Not Tested

| Area | Reason Skipped |
|---|---|
| **AI-generated progress notes** | Requires sufficient session history data; did not have enough time to build up meaningful data for the AI to generate notes. |
| **Medicaid billing** | This feature likely requires specific account permissions or a district-level setup that was not available on the test account. |
| **IEP & SIS integrations** | Requires third-party system access (external IEP/SIS platforms); not testable in isolation on a single test account. |
| **Scheduling (recurring sessions, rotating schedules)** | Complex feature requiring multi-session setup; deprioritised in favour of the core data collection workflow. |
| **Family dashboard (parent-facing view)** | Requires a separate family/parent account to be linked; not set up within the time available. |
| **Security and penetration testing** | Explicitly excluded per the assignment rules. |

---

## 4. What I Would Test Next

Given 1–2 more hours, I would prioritise the following:

1. **AI progress note generation** — This is a key differentiator for AbleSpace. I would log enough session data to trigger an AI-generated note, then verify it is accurate, well-structured, and reflects the logged data correctly. Incorrect AI output in a medical/educational context is high risk.

2. **Scheduling feature** — Create recurring sessions for a fictional student, test schedule conflicts, and verify that session data is correctly linked to the right scheduled event. Errors here could result in time tracking inaccuracies and billing issues.

3. **Data persistence under network interruption** — Simulate a slow or dropped connection while saving a data point or goal, and verify whether the app shows an error, retries gracefully, or loses data silently (similar to the session timeout issue). This matters greatly for providers working in schools with unreliable Wi-Fi.

4. **Role-based access** — If the staging environment allows creating multiple user roles (e.g., teacher vs. admin vs. parent), test that each role can only access what it is permitted to. Incorrectly exposed data in a special education context is a serious FERPA/HIPAA compliance risk.
