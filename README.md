# Mirror Finish Detailing

A static Next.js site for a fictitious mobile detailing crew in Arizona's East Valley. The site is a Jamstacks gallery sample.

## Local preview

Use Node 24 or later and npm.

```sh
npm ci
npm run check
npm start
```

`npm run check` runs content and configuration tests, checks types, and writes the static export to `out/`. The preview server serves that export at port 3000. Run `npm run dev` instead when you want changes to appear as you edit.

## Edit the site

| File | What to edit |
| --- | --- |
| `app/page.tsx` | Home copy, correction steps and calls to action |
| `app/packages/page.tsx` | Pad key, coating note and FAQ |
| `app/results/page.tsx` | Results intro and measurement explainer |
| `app/service-areas/page.tsx` | On-site requirements and summer heat guidance |
| `app/contact/page.tsx` | Enquiry intro, message checklist and fallback copy |
| `app/not-found.tsx` | Burn-through heading and recovery links |
| `content/business.ts` | Business name, public email, phone, base landmark and crew hours |
| `content/packages.ts` | Package names, prices, hours, scope and prerequisites |
| `content/addons.ts` | Add-on names, prices, eligibility and availability |
| `content/service-areas.ts` | Area names, open weekdays, travel fees, map coordinates and optional notes |
| `content/results.ts` | Before/after contact sheet and featured result |
| `site.config.json` | Public name, description, domain, time zone and Jamstacks integration |
| `lib/structured-data.ts` | AutoWash metadata derived from the shared content |
| `app/tailwind.input.css` | Primer and Night bay palettes, typography and shared styles |
| `components/art/` | Inline vector illustrations and icons |

Edit page copy in its route file. For example, change the text inside `<Hero.Heading>` in `app/page.tsx`. For a business rename, update `business.name` and `site.config.json.name`, the wordmark in `components/site-header.tsx` and the social image in `public/og.png`. Artwork uses locally bundled Michroma and Exo 2 via Fontsource. Both packages include their SIL Open Font License.

### Change a package price

In `content/packages.ts`, find `id: 'mirror-detail'` and change `prices.sedan`, for example from `289` to `299`. Use whole USD from 50 to 5000 and keep `sedan ≤ suv ≤ truck`. After a rebuild, the sedan price appears on Home, in the Packages rack and in the Home page's AutoWash offer catalog. Set `available: false` to show “Paused this season” and omit its price.

A package also has a pad colour, a one-sentence summary, estimated whole on-site hours, a list of inclusions, an optional prerequisite ID and an `exterior` flag. Keep exactly one package marked `featured`.

### Pause an add-on

In `content/addons.ts`, find `id: 'pet-hair'` and set `available: false`. After a rebuild, Packages strikes through its name and displays “Not offered right now.” Keep the saved price to restore the add-on later. Add-on prices are whole USD from 10 to 1000. `appliesTo` lists existing package IDs.

### Add a before/after shot

In `content/results.ts`, copy a similar shot into the `results` array and give it a unique lowercase, hyphenated `id`. Fill in `title`, `vehicle`, `panel`, `defects`, `paint` (six-digit hex) and the existing `packageId` and `areaId`. The contact sheet draws the comparison using that paint tint and uses the interior artwork for interior-only packages. Keep `featured: false` unless replacing the featured comparison, and keep exactly one featured shot.

For measured exterior paint, include both `gloss` and `paintDepth` with `before` and `after` values. Gloss improves within 0–100 GU at 20°. Paint depths must be 60–250 µm, with the after reading equal to or lower than the before reading by at most 10 µm. Omit both fields for interior shots. Run `npm run check` after editing. Validation identifies the item ID and field to correct.

### Edit areas and hours

In `content/service-areas.ts`, use whole travel fees from 0 to 100. A zero fee displays as “Free.” Select `serviceDays` from the open crew days and use percentages for `mapPosition.x` and `mapPosition.y`. Check label placement in the SVG after moving a decal. Update `crewHours` and the corresponding static `crewHoursSummary` in `content/business.ts` when changing the schedule. Same-day opening intervals use inclusive opening and exclusive closing times. The browser refreshes status every minute in the IANA zone specified by `site.config.json`.

## Public configuration and Contact

The provisioner can replace `site.config.json`. Keep its existing public shape, including the optional `provisioningId`. Business fields belong under `content/`.

| Environment variable | Build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Public site ID. Blank uses the file default. An unset ID gives the email and phone fallback. |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | Public asset CDN, defaulting to `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Override for the configured hostname |
| `SITE_TIME_ZONE` | Override for the configured IANA crew time zone |
| `PAGES_BASE_PATH` | Project path such as `/preview`. Leave blank for root hosting. |
| `PAGES_BASE_URL` | Actual Pages origin and path, used for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in, disallowed in Actions |

With a public site ID, Contact renders one real Jamstacks support-form host and site bootstrap. The runtime owns the name, email and message fields, validation and results. Email remains visible. `SiteLink` uses full-document navigation to and from Contact so the runtime can find a fresh host. A detail request is an enquiry. Test actual delivery separately against the provisioned site.

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Repeat the project-path check with `JAMSTACKS_SITE` set to exercise the configured host and script. Restore a normal build for gallery captures.

## Publishing

The Pages workflow preserves the `provisioning_id` dispatch input and correlated run name. It checks pull requests and publishes main/manual runs to GitHub Pages. Configure Pages to use GitHub Actions before publishing and manage the hostname and DNS through the Pages settings. The demo hostname is `next-detailing-gloss.jamstacks.net`. GitHub Actions deployments read the custom domain from Pages settings. The workflow can set it before building when the repository supplies `PAGES_ADMIN_TOKEN` with Administration and Pages write access. It uses the `SITE_DOMAIN` variable before falling back to the configured domain. The demo CNAME targets `jamstacktemplates.github.io` through DNS. Once GitHub issues the certificate, a later deployment can enforce HTTPS.

For a host-level CSP, allow the same-origin static assets, the inline theme script and the configured Jamstacks scripts and form API. Keep credentials out of public configuration.

`jamstacks/` holds the removable gallery manifest, captures and report. The customer site and normal checks work without it. Capture the gallery previews after a fresh normal build using the portal's screenshot helper, then run its separate test.

```sh
node /path/to/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template "$PWD" --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

After reviewing the site, remove `plan/` and `.claude/skills/` before publishing the template. Both directories are outside the export.
