# WeReach

**Find a good home for what you give.**

A mobile-friendly donation finder for Detroit, Pontiac, and Flint, Michigan.

**Local directory:** Seven listings cover five real organizations, with official donation policies checked October 23, 2026. This is a manually maintained directory, not live inventory or an exhaustive search engine. Confirm acceptance before traveling. No organization partnerships are implied. The app has not been publicly deployed.

## Features

- Explore with combined item, organization, city, and category search. Results update as you type; organizations can appear in multiple supported categories. A clearly labeled web-search link opens Google with the selected item/city to find additional places. It does not import or verify those results.
- Categories: Clothing, Food, Baby & Kids, Household, Furniture, Hygiene, School Supplies, and **Cleaning Products**.
- Details include accepted items, condition requirements, exclusions, beneficiaries, drop-off guidance, and pickup information.
- Save opportunities on this device/browser; storage failures show a warning.
- Expired current requests disappear from Explore and Saved.
- Official contact and source links work for real listings; missing information has clear confirmation guidance.
- Responsive styling, keyboard focus indicators, and an accessible details dialog.

Cleaning Products includes the published policies from NSO and Grace Centers of Hope. Specific accepted products and unknown conditions are explained in each listing.

## Start locally

Requirements: Node.js 24 and pnpm 11.25.0 (used for the included lockfile).

```sh
git clone https://github.com/FretterR/WeReach.git
cd WeReach
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed in the terminal, normally http://127.0.0.1:5173/. **Keep the terminal running while using the preview.** Closing it stops the website. Double-clicking index.html will not start the app.

If you have npm instead, `npm install` followed by `npm run dev` also works; pnpm is canonical for reproducible installs and CI.

```sh
pnpm test
pnpm run build
```

The build checks TypeScript and writes production files to `dist/`. GitHub Actions runs tests and the build on pushes and pull requests; it does not deploy the website.

## Project files

| File | Purpose |
| --- | --- |
| src/data.ts | Listings, types, and category names |
| src/main.tsx | Explore, Saved, and opportunity details |
| src/style.css | Responsive styling |
| src/logic.ts | Filtering, expiration, bookmark parsing, and safe links |
| tests/logic.test.ts | Focused behavior checks |
| AGENTS.md | Project conventions and repository preference |

## Maintain the directory

Edit `src/data.ts`. Preserve stable, unique IDs so bookmarks keep working. Listings include organization, city, title, category, description, keywords, beneficiaries, accepted items, condition rules, exclusions, drop-off instructions, optional address and pickup information, optional website/phone/source/date, listing type, optional expiration date, and demo flag.

Use official sources. Record `sourceUrl` and `dateChecked` (YYYY-MM-DD); set `demo: false` only for a real researched listing. An ongoing acceptance policy is not evidence of an urgent request. Use `current request` only when supported by a dated source. Set `expiresOn` in YYYY-MM-DD for dated requests; they remain visible through that day and disappear afterward.

Leave unknown details absent; the UI prompts donors to confirm. Never invent addresses, hours, pickup services, or accepted items. Never publish private recipient or confidential shelter addresses. Demo contact actions remain disabled even if links are accidentally entered.

The banner explains the directory scope and research date. Cards display policy-check dates; detail views link directly to official sources. Listings use ongoing acceptance rather than claiming urgent, real-time requests. Recheck official policies periodically and update dates only after actually reviewing the source. Old fictional bookmark IDs are harmless and do not appear as active saved listings.

## Privacy and scope

Bookmarks use localStorage under `wereach-saved`. Filtering and bookmarks stay on this device. Clicking an external source/contact link leaves the app; clicking web search sends the current item and city/category query to Google. There is no background searching or tracking. Clearing browser storage removes bookmarks. No accounts, payments, analytics, API keys, external fonts, maps, or AI features are included.

Community drives and volunteer coordination are future ideas outside this version. The canonical personal repository is [FretterR/WeReach](https://github.com/FretterR/WeReach). Pushing code here does not publish the app.

## Official sources

Checked October 23, 2026:

- [NSO in-kind donations](https://www.nso-mi.org/in-kind.html): arrange donations with its team; do not treat the corporate office as an unconfirmed drop-off.
- [Capuchin item donations](https://www.cskdetroit.org/donate/donate-items/): clothing, food, diapers, household basics, and explicit exclusions. Household chemicals are excluded.
- [Grace Centers of Hope](https://gracecentersofhope.org/): published department wish lists and Pontiac contact information. Call to confirm the correct receiving department.
- [CCRT](https://www.ccrt.org/get-involved): furniture, household goods, and pickup coordination. Program includes direct assistance and fundraising sales.
- [Carriage Town Ministries](https://www.carriagetown.org/donate-foodgoods): food and goods have separate Flint receiving addresses and hours. The site's phone formatting is inconsistent, so the app directs donors to its source page rather than guessing a phone number.

Some categories have only one or two listings. Zero results means no matching entry in this small directory, not that no organization accepts the item. Use the web-search link for further research.
