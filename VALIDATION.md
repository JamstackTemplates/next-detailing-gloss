# Local verification

- `npm run check` passes 44 tests, TypeScript and the static Next.js build.
- Chromium review covered Home, Packages, Results, Service areas, Contact and the custom 404 in light and dark at 1440px and 390px. Checked page width down to 360px and confirmed the Home artwork, wordmark and primary action fit at 390px.
- Checked keyboard focus, skip navigation, the tape slider by keyboard and pointer, vehicle pricing with the keyboard, package deep links, theme switching and the static no-JavaScript fallbacks.
- Print checks kept the package prices, contact links and service timetable.
- Both `/preview` exports passed canonical, sitemap, social-image and internal-link checks. Contact navigation created a new document in both directions. The configured build emitted one form host and one intercepted bootstrap request per Contact visit. The unconfigured build showed the email fallback.
- An isolated build without the planning or gallery files verified the README edits for the Mirror Detail sedan price, a paused Pet hair removal add-on and a new contact-sheet comparison.
- The gallery helper captured both homepage previews from the normal export. `node --test jamstacks/config.test.mjs` passes both gallery checks.

These checks covered the local export and its form integration. Deployment and actual enquiry delivery require a provisioned site.
