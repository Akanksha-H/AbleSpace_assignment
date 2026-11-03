# Section 2 – Exploratory Testing Scenarios

**Application:** staging.ablespace.io  
**Tester:** Aakanksha Hedau  
**Date Tested:** October 21, 2026  
**Browser:** Google Chrome (latest)

---

## Overview

AbleSpace is an AI-powered special education platform used by teachers, SLPs, OTs, and BCBAs to manage student caseloads, track IEP goals, collect data, generate progress notes, and handle scheduling.

Exploratory testing was performed across the most critical user-facing flows, starting from account creation and progressing through the core features a real special education professional would use daily.

---

## Exploratory Testing Scenarios

---

### ES-01 – Signup / Account Creation
- **What Was Checked:** Checked that a new user can sign up with valid fictional details (name, email, password), receive a confirmation, and land on the dashboard. Also tested signup with an already-registered email, an invalid email format, and a weak password to verify validation messages.
- **Result:** ✅ Pass – Valid signup works. Invalid email and duplicate email show appropriate error messages. Weak password is flagged.

---

### ES-02 – Login / Authentication
- **What Was Checked:** Tested login with correct credentials, wrong password, and blank fields. Checked "Forgot Password" link presence and navigation. Verified that the session persists on page refresh.
- **Result:** ✅ Pass – Login works with valid credentials. Wrong password shows an error. Blank fields are caught. "Forgot Password" link is present.

---

### ES-03 – Add a Student (Caseload Management)
- **What Was Checked:** Attempted to add a fictional student to the caseload with all required fields, then with required fields missing, and then with very long text (200+ characters) in the name field.
- **Result:** ⚠️ Partial Pass – Student is saved successfully with valid data. Missing required fields show validation errors. Very long text in name field is accepted without truncation warning — potential usability issue.

---

### ES-04 – Add an IEP Goal to a Student
- **What Was Checked:** Added an IEP goal to a fictional student, including goal description, target, baseline, and date. Then tested saving with the goal description field empty and with only spaces entered.
- **Result:** ⚠️ Partial Pass – Goal is saved correctly with valid data. Empty goal description is caught. However, a goal description containing only whitespace/spaces is accepted and saved — this is a validation gap. See BUG-01.

---

### ES-05 – Data Collection / Log a Session
- **What Was Checked:** Opened a student's goal and attempted to log a data point for a session. Checked that data is saved and reflected in the progress graph. Also tested navigating away without saving and returning to verify no phantom data was saved.
- **Result:** ✅ Pass – Data is logged and graph updates. Navigating away without saving does not persist unsaved data.

---

### ES-06 – Edit and Update a Student's Details
- **What Was Checked:** Edited a saved student's name and grade level, saved the changes, then refreshed the page to verify changes persisted. Also tested cancelling an edit to ensure original data is not modified.
- **Result:** ✅ Pass – Edits persist after save and page refresh. Cancelling an edit restores original values.

---

### ES-07 – Navigation and Back Button Behaviour
- **What Was Checked:** Used the browser Back button after adding a student, after editing a goal, and after logging a session. Checked for broken states, duplicate entries, or lost data.
- **Result:** ⚠️ Partial Pass – Back navigation generally works. After logging a session and pressing Back, the form can repopulate with old data on some screens, which could confuse users into thinking unsaved data is still pending.

---

### ES-08 – Empty State Handling
- **What Was Checked:** Logged in and checked the caseload list view with no students added. Checked the goals list with no goals added for a student. Checked whether helpful empty-state messages or prompts are displayed.
- **Result:** ✅ Pass – Empty states show helpful messages prompting the user to add a student or add a goal. UI does not break or show blank/broken layouts.

---

### ES-09 – Search / Filter Students
- **What Was Checked:** Used the search bar on the caseload page to search for a fictional student by name. Tested searching with a partial name, full name, wrong name (no results), and special characters (e.g., `@`, `#`, `!`).
- **Result:** ⚠️ Partial Pass – Partial and full name search works correctly. Searching with no results shows a "no results found" message. Special characters in the search field do not cause an error but may return unexpected results on some inputs.

---

### ES-10 – Session Timeout / Persistent Login
- **What Was Checked:** Left the application idle for an extended period and then attempted to perform an action (save a data point). Checked whether the user is redirected to login or shown a meaningful session expiry message.
- **Result:** ❌ Fail – After a long idle period, the action fails silently without a clear session-expired message. The user is not immediately redirected to login, and no toast/alert explains why the action did not complete. See BUG-02.

---

### ES-11 – Onboarding Screen UI
- **What Was Checked:** After creating a new account, checked the onboarding screen "Select the features you'll use" for layout and usability issues. Inspected the bottom action area with the Skip button and helper text.
- **Result:** ❌ Fail – The "Skip" button overlaps the helper text "You can always change these settings later in preferences." The text is partially hidden behind the button, meaning new users miss this important information. See BUG-04.

---

### ES-12 – Community Page – Attachment Button
- **What Was Checked:** Navigated to the Community section, opened the feedback post form, and clicked the attachment (📎) button to test its behaviour.
- **Result:** ❌ Fail – The Canny login popup triggered by the attachment button renders completely below the visible viewport. No visual feedback is shown near the button. User must scroll down to discover the popup. See BUG-05.

---

### ES-13 – Community Page – Upvote Button
- **What Was Checked:** Navigated to the Community section and clicked the upvote (▲) button on an existing post to test the voting interaction.
- **Result:** ❌ Fail – The Canny login popup triggered by upvoting also renders below the visible viewport. Same positioning issue as BUG-05. First-time users would assume their vote did not register. See BUG-06.

---

### ES-14 – Settings – Default Service Type
- **What Was Checked:** Navigated to Settings → Preferences → General and tested the "Default Service Type" dropdown which lets users set a default service type for new sessions.
- **Result:** ❌ Fail – The dropdown is completely empty with no options available. Users cannot set a default service type at all. The control appears to be failing to load its data. See BUG-07.

---

### ES-15 – Settings – My Account Page Layout
- **What Was Checked:** Navigated to Settings → My Account → General and checked both the Profile and Standards sections for layout issues.
- **Result:** ❌ Fail – The "Save" and "Cancel" buttons overflow outside the right boundary in both the Profile section and the Standards section. Form field labels on the left are also cut off in both areas. The entire page has a structural horizontal overflow issue. See BUG-08.

---

## Key Observations

- The application's core flows (add student, add goal, log data) work as expected under normal conditions.
- Validation is present for most required fields but has gaps — whitespace-only input is accepted in some text fields.
- Back-button behaviour on some form screens can leave users in a confusing state.
- Session timeout handling lacks a clear user-facing message, which could cause data loss.
- Empty states are handled gracefully with helpful prompts.
- Special characters in search do not crash the app but warrant further investigation.
- Community page interactions (upvote, attachment) are broken for new users due to off-screen popup positioning.
- Settings page has two separate functional/layout issues (Default Service Type and My Account overflow).
