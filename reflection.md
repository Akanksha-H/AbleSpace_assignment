# Individual Reflection – Aakanksha Hedau

## What I Owned
- End-to-end manual testing of staging.ablespace.io, a live AI-powered special education platform
- Designed and executed 15 exploratory testing scenarios covering core workflows, settings, community features, and onboarding
- Wrote 8 detailed test cases for the critical student/IEP goal workflow including positive, negative, and edge-case scenarios
- Identified and documented 8 bugs with full reproduction steps, severity ratings, and screenshots as evidence
- Performed cross-browser and responsive testing across Chrome, Edge, mobile (390×844), iPad Mini, and iPad Pro
- Set up a Playwright TypeScript automation project with 6 automated test cases covering login, student management, and IEP goal workflows

## What I Learned

**Testing mindset:**  
I learned to think beyond the happy path — the most interesting bugs I found were not in the main workflow but in less-obvious areas like the Settings page, the Community section, and the onboarding flow. Testing a real live product taught me that bugs often hide in edge cases and secondary features that users encounter after the initial setup.

**Bug reporting:**  
I learned how to write clear, reproducible bug reports that give a developer everything they need without asking follow-up questions — including severity vs priority distinction, exact steps, expected vs actual results, and visual evidence.

**Test automation challenges:**  
I encountered a real-world automation challenge — Firebase reCAPTCHA blocking automated login in Playwright-controlled browsers. This taught me that not everything can be fully automated, and documenting limitations clearly with workarounds is just as valuable as writing the automation itself.

**Responsive testing:**  
Testing across different screen sizes revealed that mobile layouts have unique failure points that desktop testing alone would miss — buttons hidden behind keyboards, elements overflowing containers, and navigation patterns that don't translate well to small screens.
