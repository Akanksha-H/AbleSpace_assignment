# Section 4 – Bug Reports

**Application:** staging.ablespace.io  
**Tester:** Aakanksha Hedau 
**Date Tested:** October 21, 2026  

---

## Full Bug Reports (Top 3)

---

### BUG-01 – IEP Goal Accepts Whitespace-Only Description and Saves as Blank

| Field | Description |
|---|---|
| **Bug ID** | BUG-01 |
| **Title** | IEP Goal form accepts whitespace-only input in the description field and saves a blank goal |
| **Severity** | High |
| **Priority** | High |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Chrome 129 on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io with a valid account.
2. Navigate to the Caseload/Students section.
3. Open any existing student (or add one first).
4. Navigate to the Goals tab for that student.
5. Click "Add Goal" (or equivalent button).
6. In the goal description/title field, press the spacebar 5–10 times (enter only whitespace).
7. Fill in the remaining fields (Baseline, Target, Start Date) with valid data.
8. Click "Save".

**Expected Result:**  
The form should reject the submission and display a validation error such as: *"Goal description cannot be empty or contain only spaces."* The goal should not be saved.

**Actual Result:**  
The goal is saved successfully. In the goals list, the description appears blank or as an empty entry. No validation error is shown. A provider reviewing this student's goals would see a goal with no description, which is meaningless and could cause compliance issues in an IEP context.

**Evidence:**  
[Attach screenshot showing the blank goal saved in the goals list]

---

### BUG-02 – Session Timeout Fails Silently — No User-Facing Message

| Field | Description |
|---|---|
| **Bug ID** | BUG-02 |
| **Title** | After session expires due to inactivity, actions fail silently without redirecting the user or showing a session-expired message |
| **Severity** | High |
| **Priority** | High |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Chrome 129 on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Leave the browser tab open and idle (do not interact with the app) for 30–60 minutes.
3. Return to the tab without refreshing.
4. Attempt to perform an action — e.g., click "Add Student", click "Save" on any form, or navigate to a new section.

**Expected Result:**  
The application should detect the expired session and either:
- Automatically redirect the user to the login page, OR
- Display a clear message such as *"Your session has expired. Please log in again."*  
Any unsaved data should ideally be preserved or the user warned before the session ends.

**Actual Result:**  
The action fails silently. No error message, toast notification, or redirect occurs. The user remains on the same screen with no indication that their session has expired. Attempting further actions continues to fail. The user has no way of knowing they need to log back in unless they manually refresh the page, at which point they are redirected to login — and any unsaved work is lost.

**Evidence:**  
[Attach screenshot showing the app in an idle state with no visible error after a failed action]

---

### BUG-03 – Student Name with 200+ Characters Overflows UI Container in Caseload List

| Field | Description |
|---|---|
| **Bug ID** | BUG-03 |
| **Title** | Saving a student with an extremely long name causes text overflow and layout breakage in the caseload list view |
| **Severity** | Medium |
| **Priority** | Medium |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Chrome 129 on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Navigate to the Caseload/Students section.
3. Click "Add Student".
4. In the Name field, enter a string of 200+ characters — e.g., paste `Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`.
5. Fill all other required fields with valid data.
6. Click "Save".
7. Observe the student's entry in the caseload list.

**Expected Result:**  
The application should either:
- Enforce a maximum character limit on the name field with a validation error (e.g., *"Name cannot exceed 100 characters"*), OR
- Display the name truncated with an ellipsis (e.g., `Aaaaaaaaa...`) in the list view, preserving the layout.

**Actual Result:**  
The name is accepted and saved without any character limit warning. In the caseload list view, the long name overflows its container, pushing adjacent elements (such as action buttons or grade/disability labels) out of alignment. This breaks the row layout and makes action buttons partially inaccessible for that student entry.

**Evidence:**  
[Attach screenshot showing the overflowing student name in the caseload list]

---

### BUG-04 – "Skip" Button Overlaps Helper Text on Onboarding Screen

| Field | Description |
|---|---|
| **Bug ID** | BUG-04 |
| **Title** | "Skip" button overlaps and obscures the helper text on the feature selection onboarding screen |
| **Severity** | Medium |
| **Priority** | Medium |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Google Chrome (latest) on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Create a new account on staging.ablespace.io.
2. Complete the signup flow and reach the onboarding screen titled **"Select the features you'll use"**.
3. Scroll to the bottom of the page without scrolling the feature cards.
4. Observe the bottom area where the helper text and Skip button are displayed.

**Expected Result:**
The helper text *"You can always change these settings later in preferences."* should be fully visible and readable. The "Skip" button should be positioned beside or below the text without overlapping it.

**Actual Result:**
The **"Skip" button is rendered directly on top of the helper text**, obscuring the word "preferences" and part of the sentence. The text is partially unreadable. A new user would miss the important information that they can change these settings later.

**Evidence:**  
`screenshots/BUG-04-skip-button-overlap.png`

---

### BUG-05 – Canny Login Popup Appears Off-Screen When Clicking Attachment Button in Community

| Field | Description |
|---|---|
| **Bug ID** | BUG-05 |
| **Title** | Clicking the attachment (📎) button on the Community feedback form opens a Canny login popup that renders below the visible viewport |
| **Severity** | Medium |
| **Priority** | High |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Google Chrome (latest) on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Navigate to the **Community** section from the left sidebar.
3. Click the **attachment icon (📎)** button at the bottom-right of the feedback/post creation form.
4. Observe where the Canny login popup appears.

**Expected Result:**
A login popup should appear centered on screen or near the triggered button — fully visible without any scrolling required.

**Actual Result:**
The Canny login popup renders **completely below the visible viewport**. The user sees no response to their click and has no indication a popup appeared at all. Only after scrolling down does the popup become visible. A first-time user would assume the button is broken or non-functional.

**Evidence:**
`screenshots/BUG-05-BUG-06-community-popup-offscreen.png`

---

### BUG-06 – Canny Login Popup Appears Off-Screen When Upvoting a Community Post

| Field | Description |
|---|---|
| **Bug ID** | BUG-06 |
| **Title** | Clicking the upvote (▲) button on a Community post opens a Canny login popup that renders below the visible viewport |
| **Severity** | Medium |
| **Priority** | High |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Google Chrome (latest) on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Navigate to the **Community** section from the left sidebar.
3. Scroll down to any existing post in the list (e.g., "Generate a report").
4. Click the **upvote (▲)** button on the right side of the post.
5. Observe where the Canny login popup appears.

**Expected Result:**
A Canny login popup should appear centered on screen or anchored near the upvote button — fully visible without scrolling.

**Actual Result:**
The Canny login popup renders **below the visible viewport**, completely hidden from the user. The user gets zero visual feedback after clicking and would assume the upvote had no effect. The popup is only discoverable by scrolling down, which is not intuitive at all.

**Root Cause (likely):**
The Canny widget calculates its popup position relative to the full document height rather than the current viewport, causing it to anchor off-screen when the page has any vertical scroll offset.

**Evidence:**
`screenshots/BUG-05-BUG-06-community-popup-offscreen.png` (same screenshot covers both BUG-05 and BUG-06)

---

---

### BUG-07 – "Default Service Type" Dropdown in Settings Shows No Options

| Field | Description |
|---|---|
| **Bug ID** | BUG-07 |
| **Title** | "Default Service Type" dropdown under Settings → Preferences → General is empty — no options are available to select |
| **Severity** | High |
| **Priority** | High |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Google Chrome (latest) on Windows 11 |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Navigate to **Settings** (via the sidebar or profile menu).
3. Click **Preferences** under Account Settings.
4. On the **General** tab, scroll down to the **"Default Service Type"** section.
5. Click the dropdown beneath the label "Choose a service type to be automatically selected for new sessions."

**Expected Result:**
The dropdown should show a list of available service types (e.g., Direct Service, Consultation, Group Session, etc.) so the user can select their preferred default for new sessions.

**Actual Result:**
The dropdown opens but is completely empty — **no options are displayed**. The user cannot set a default service type at all. This means every time a user creates a new session, they must manually select a service type rather than having their preferred default pre-selected. For special education providers who log many sessions daily, this is a significant workflow disruption.

**Impact:**
- Core settings feature is non-functional
- Forces extra manual steps on every session creation
- May indicate a data-loading failure (API not returning service type options)

**Evidence:**
`screenshots/BUG-07-default-service-type-empty.png`

---

---

### BUG-08 – Save/Cancel Buttons and Form Fields Overflow Outside Page Boundary on My Account Settings Page (Affects Profile and Standards Sections)

| Field | Description |
|---|---|
| **Bug ID** | BUG-08 |
| **Title** | Save/Cancel buttons and form fields overflow outside the content area on Settings → My Account page — affects both the Profile section and the Standards section |
| **Severity** | Medium |
| **Priority** | Medium |
| **Environment** | https://staging.ablespace.io – October 21, 2026 |
| **Browser / Device** | Google Chrome (latest) on Windows 11, standard browser window size |
| **Reproducibility** | Always |

**Steps to Reproduce:**
1. Log in to staging.ablespace.io.
2. Navigate to **Settings** from the sidebar.
3. Click **My Account** under Account Settings.
4. The **General** tab is shown by default.
5. Observe the **Profile** section at the top — note the Save/Cancel buttons and the Name field.
6. Scroll down to the **Standards** section — note the Save/Cancel buttons there too.

**Expected Result:**
Both the Profile section and the Standards section should be fully contained within the visible content area. All form fields and action buttons (Save, Cancel) should be visible and accessible without horizontal overflow or clipping.

**Actual Result:**
The layout overflow affects **two separate sections** on the same page:

- **Profile section:** The "Save" and "Cancel" buttons are pushed outside the right boundary of the content container. The Name field label on the left is cut off — only partial text is visible.
- **Standards section:** The "Save" and "Cancel" buttons are similarly pushed outside the right boundary. The "Standards" label and description text on the left are also partially cut off.

The same horizontal overflow bug is present throughout the entire My Account → General page, indicating a structural layout issue with the page container width rather than an isolated component problem.

**Evidence:**
- `screenshots/BUG-08-save-button-overflow.png` — Profile section overflow
- `screenshots/BUG-08b-standards-save-button-overflow.png` — Standards section overflow

---

## Additional Minor Issues

| # | Area | Issue | Severity |
|---|------|--------|----------|
| MI-01 | Search | Searching with special characters (e.g., `@`, `!`, `#`) in the student search bar returns inconsistent results on some inputs rather than a clean "no results found" message. | Low |
| MI-02 | Back Navigation | After logging a session data point and pressing the browser Back button, the data entry form on some screens repopulates with previously entered values, which could mislead users into thinking unsaved data is pending. | Low |
| MI-03 | Goals List | The goals list does not display the date a goal was created or last modified, making it harder for providers to track goal history at a glance. | Low |
| MI-04 | Forms | On mobile view (390×844 emulation), the "Save" button on the Add Student form is partially obscured by the browser's on-screen keyboard when the keyboard is open. | Low |
| MI-05 | Onboarding | "Skip" button overlaps helper text on the "Select the features you'll use" onboarding screen — see BUG-04 for full details. | Medium |
