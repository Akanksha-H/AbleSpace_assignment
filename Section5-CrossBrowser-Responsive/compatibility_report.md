# Section 5 – Cross-Browser and Responsive Testing Report

**Application:** staging.ablespace.io  
**Tester:** Aakanksha Hedau

---

## Test Environments

| Setup | Details |
|---|---|
| Desktop – Chrome | Google Chrome 129 on Windows 11 |
| Desktop – Edge | Microsoft Edge 129 on Windows 11 |
| Mobile – 390×844 | Browser DevTools device emulation (iPhone 14 Pro equivalent) |
| iPad Mini | Browser DevTools device emulation – 768×1024 |
| iPad Pro | Browser DevTools device emulation – 1024×1366 |

---

## Compatibility Report

| Area / Feature | Chrome | Firefox / Edge | Mobile (390×844) | Notes |
|---|---|---|---|---|
| **Signup and Login** | Pass | Pass | Pass | All three setups handle signup and login correctly. Form fields and buttons render and function as expected. |
| **Main Workflow** (Add Student → Add Goal → Log Data) | Pass | Pass | Partial Fail | On mobile (390×844), after adding a student and navigating to add a goal, the "Add Goal" button is rendered below the visible viewport and requires unexpected scrolling. Button is functional once scrolled to, but discoverability is poor. |
| **Forms** (Add Student, Add Goal, Log Data) | Pass | Pass | Partial Fail | On mobile, the Save button on the Add Student form is partially obscured by the on-screen keyboard when a text field is active. User must dismiss the keyboard to tap Save. On Chrome and Edge desktop, all form fields and buttons render correctly. |
| **Navigation** (Sidebar, Breadcrumbs, Back) | Pass | Pass | Partial Fail | On mobile view, the sidebar navigation collapses into a hamburger menu. The hamburger menu opens correctly, but closing it requires tapping outside — there is no explicit close (×) button, which is a usability gap. |
| **Student List / Caseload View** | Pass | Pass | Fail | On mobile (390×844), the student list rows do not wrap text properly. Long student names (even moderate length like 40 characters) overflow the row container and overlap the action icons (edit/delete), making them hard to tap. |
| **IEP Goals View** | Pass | Pass | Pass | Goals list renders correctly across all tested setups. Progress graphs scale appropriately on mobile. |
| **Data Collection / Session Logging** | Pass | Pass | Pass | Session logging form is usable across all setups. Data points are saved and reflected in graphs consistently. |
| **iPad Mini (768×1024)** | Pass | Pass | Pass | Layout scales well. Navigation sidebar is visible. Forms are fully usable. No overlapping elements observed. |
| **iPad Pro (1024×1366)** | Pass | Pass | Pass | Layout renders cleanly at this size. All features tested are accessible and visually correct. |

---

## Failures and Notes Detail

### FAIL – Student List on Mobile (390×844)
**Area:** Student List / Caseload View  
**Browser/Device:** Mobile – 390×844 emulation  
**Issue:** Student names that exceed approximately 30–40 characters overflow their row container in the caseload list. The overflowing text overlaps the edit/delete action icons on the right side of the row, making those icons difficult or impossible to tap on a real mobile device.  
**Impact:** Users managing students with longer names (common in real school environments) cannot reliably access edit/delete actions on mobile.

---

### PARTIAL FAIL – Main Workflow "Add Goal" Button on Mobile
**Area:** Main Workflow  
**Browser/Device:** Mobile – 390×844 emulation  
**Issue:** After opening a student's profile on mobile, the "Add Goal" button is positioned below the visible viewport. Users must scroll down without any visual cue indicating more content is below the fold.  
**Impact:** New users may not discover the button, especially if the student profile page shows enough content to fill the screen.

---

### PARTIAL FAIL – Save Button Obscured by Keyboard on Mobile
**Area:** Forms  
**Browser/Device:** Mobile – 390×844 emulation  
**Issue:** When a text field in the Add Student form is focused (triggering the on-screen keyboard), the "Save" button is pushed below the keyboard. The user must dismiss the keyboard before they can tap Save.  
**Impact:** Minor friction — the app remains functional but the experience is noticeably poor compared to apps that use sticky/floating buttons above the keyboard.

---

### PARTIAL FAIL – Hamburger Menu No Close Button on Mobile
**Area:** Navigation  
**Browser/Device:** Mobile – 390×844 emulation  
**Issue:** The sidebar navigation menu opens via a hamburger icon but has no explicit close button. Users must tap outside the menu area to close it, which is not immediately obvious.  
**Impact:** Usability issue — some users (especially less tech-savvy educators) may be confused about how to dismiss the menu.

---

## Summary

| Setup | Overall Result |
|---|---|
| Desktop – Chrome | ✅ Pass |
| Desktop – Edge | ✅ Pass |
| Mobile – 390×844 | ⚠️ Partial Fail (3 issues noted) |
| iPad Mini – 768×1024 | ✅ Pass |
| iPad Pro – 1024×1366 | ✅ Pass |

The application performs well on desktop (Chrome and Edge) and on iPad sizes. The primary area of concern is the **mobile view (390×844)**, where layout issues affect the caseload list, forms, and navigation usability. These issues should be addressed before promoting the mobile experience to users.
