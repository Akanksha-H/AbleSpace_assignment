# Section 3 – Detailed Test Cases

**Application:** staging.ablespace.io  
**Tester:** Aakanksha Hedau

---

## Chosen Workflow: Add Student → Add IEP Goal → Log Data → View Progress → Edit Goal

**Why this workflow?**  
This is the most critical end-to-end flow for a special education professional. Every user of AbleSpace relies on this path daily — from setting up a student and their IEP goals to logging session data and monitoring progress. A failure anywhere in this chain directly impacts student outcome tracking and compliance.

---

## Test Cases

---

### TC-01 – Successfully Add a Student with All Valid Details

| Field | Description |
|---|---|
| **Test Case ID** | TC-01 |
| **Title** | Add a new student with all valid required fields |
| **Preconditions** | User is logged in. The caseload page is open. |
| **Test Data** | Name: `Alex Johnson`, Grade: `3`, Date of Birth: `01/15/2016`, Disability: `Autism Spectrum Disorder` |
| **Steps** | 1. Navigate to the Caseload/Students section. <br> 2. Click "Add Student" or equivalent button. <br> 3. Enter the fictional student name `Alex Johnson`. <br> 4. Fill in all required fields with valid test data. <br> 5. Click "Save" or "Add Student". |
| **Expected Result** | Student `Alex Johnson` is saved and appears in the caseload list. A success message/toast is shown. |
| **Actual Result** | Student was saved successfully and appeared in the caseload list with a success confirmation. |
| **Status** | ✅ Pass |

---

### TC-02 – Attempt to Add a Student with Required Fields Blank

| Field | Description |
|---|---|
| **Test Case ID** | TC-02 |
| **Title** | Add a student with required fields left empty |
| **Preconditions** | User is logged in. The "Add Student" form is open. |
| **Test Data** | All fields left blank. |
| **Steps** | 1. Navigate to the Caseload/Students section. <br> 2. Click "Add Student". <br> 3. Leave all fields empty. <br> 4. Click "Save". |
| **Expected Result** | Form submission is blocked. Validation error messages appear next to each required field (e.g., "Name is required"). |
| **Actual Result** | Form submission was blocked and inline validation errors appeared for required fields. |
| **Status** | ✅ Pass |

---

### TC-03 – Add a Student with an Extremely Long Name (Boundary Case)

| Field | Description |
|---|---|
| **Test Case ID** | TC-03 |
| **Title** | Add a student using a name exceeding normal length (200+ characters) |
| **Preconditions** | User is logged in. The "Add Student" form is open. |
| **Test Data** | Name: `Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` (200+ 'a' characters), other fields filled with valid data. |
| **Steps** | 1. Navigate to the "Add Student" form. <br> 2. Paste 200+ character string into the Name field. <br> 3. Fill remaining required fields with valid data. <br> 4. Click "Save". |
| **Expected Result** | App should either enforce a character limit with an error message (e.g., "Name cannot exceed 100 characters") OR accept and display the name truncated gracefully in the UI. |
| **Actual Result** | Name was accepted and saved. However, the name overflows its container in the student list view, breaking the layout slightly. No character limit warning was shown. |
| **Status** | ❌ Fail |

---

### TC-04 – Successfully Add an IEP Goal to a Student

| Field | Description |
|---|---|
| **Test Case ID** | TC-04 |
| **Title** | Add a valid IEP goal to an existing student |
| **Preconditions** | User is logged in. Student `Alex Johnson` exists in the caseload. |
| **Test Data** | Goal: `Alex will identify 10 sight words with 80% accuracy across 3 consecutive sessions`, Baseline: `20%`, Target: `80%`, Start Date: `10/01/2026` |
| **Steps** | 1. Open student `Alex Johnson` from the caseload. <br> 2. Navigate to the Goals section. <br> 3. Click "Add Goal". <br> 4. Enter goal description, baseline, target, and start date. <br> 5. Click "Save". |
| **Expected Result** | IEP goal is saved and displayed under the student's goals list with all entered details visible. |
| **Actual Result** | Goal was saved and appeared correctly in the goals list with all details. |
| **Status** | ✅ Pass |

---

### TC-05 – Attempt to Add an IEP Goal with Whitespace-Only Description

| Field | Description |
|---|---|
| **Test Case ID** | TC-05 |
| **Title** | Add an IEP goal where the description field contains only spaces |
| **Preconditions** | User is logged in. Student `Alex Johnson` exists. The "Add Goal" form is open. |
| **Test Data** | Goal description: `     ` (5 spaces), other fields with valid data. |
| **Steps** | 1. Open student `Alex Johnson`. <br> 2. Click "Add Goal". <br> 3. Enter only spaces (press spacebar 5 times) in the goal description field. <br> 4. Fill in baseline, target, and start date with valid data. <br> 5. Click "Save". |
| **Expected Result** | Form submission should be blocked with a validation error such as "Goal description cannot be empty or contain only spaces." |
| **Actual Result** | The goal was accepted and saved with a blank-looking description. No validation error was shown. |
| **Status** | ❌ Fail |

---

### TC-06 – Log a Data Point for a Student's IEP Goal

| Field | Description |
|---|---|
| **Test Case ID** | TC-06 |
| **Title** | Log a session data point for an existing IEP goal |
| **Preconditions** | User is logged in. Student `Alex Johnson` exists with at least one IEP goal. |
| **Test Data** | Session Date: today's date, Score: `60%`, Note: `Student identified 6 out of 10 words correctly.` |
| **Steps** | 1. Open student `Alex Johnson`. <br> 2. Open the IEP goal added in TC-04. <br> 3. Click "Log Data" or "Add Data Point". <br> 4. Enter session date, score `60%`, and a note. <br> 5. Click "Save". |
| **Expected Result** | Data point is saved. The progress graph updates to reflect the new data point. The logged entry appears in the session history list. |
| **Actual Result** | Data point was saved successfully. Progress graph updated and the entry appeared in the history. |
| **Status** | ✅ Pass |

---

### TC-07 – Edit an Existing IEP Goal and Verify Persistence

| Field | Description |
|---|---|
| **Test Case ID** | TC-07 |
| **Title** | Edit an existing IEP goal and verify the change persists after page refresh |
| **Preconditions** | User is logged in. Student `Alex Johnson` has a saved IEP goal from TC-04. |
| **Test Data** | Updated Target: `90%`, Updated Description: `Alex will identify 10 sight words with 90% accuracy across 3 consecutive sessions` |
| **Steps** | 1. Open student `Alex Johnson`. <br> 2. Open the IEP goal. <br> 3. Click "Edit". <br> 4. Change the target from `80%` to `90%`. <br> 5. Update the description text. <br> 6. Click "Save". <br> 7. Refresh the page (F5). <br> 8. Reopen the goal. |
| **Expected Result** | Updated target (`90%`) and description persist after refresh. A success message is shown on save. |
| **Actual Result** | Changes were saved correctly and persisted after page refresh. |
| **Status** | ✅ Pass |

---

### TC-08 – Delete a Student and Verify Removal from Caseload

| Field | Description |
|---|---|
| **Test Case ID** | TC-08 |
| **Title** | Delete a student from the caseload and verify they no longer appear |
| **Preconditions** | User is logged in. Student `Alex Johnson` exists in the caseload. |
| **Test Data** | Student: `Alex Johnson` |
| **Steps** | 1. Navigate to the caseload list. <br> 2. Find student `Alex Johnson`. <br> 3. Click the delete/remove option (e.g., three-dot menu → Delete). <br> 4. Confirm the deletion in any confirmation dialog. <br> 5. Check the caseload list. |
| **Expected Result** | A confirmation dialog is shown before deletion. After confirming, `Alex Johnson` is removed from the caseload list. A success message is shown. Searching for the student returns no results. |
| **Actual Result** | Confirmation dialog appeared before deletion. Student was removed from the caseload and no longer appeared in the list or search results. |
| **Status** | ✅ Pass |
