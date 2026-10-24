# WeReach

**Find a good home for what you give.**

A mobile-friendly donation finder for Detroit, Pontiac, and Flint, Michigan.

**Demo only:** All ten opportunities are fictional examples, not real donation requests. There are no actual donation submissions or organization partnerships. The app has not been publicly deployed.

## Features

- Explore with combined item search, city, and category filters.
- Categories: Clothing, Food, Baby & Kids, Household, Furniture, Hygiene, School Supplies, and **Cleaning Products**.
- Details include accepted items, condition requirements, exclusions, beneficiaries, drop-off guidance, and pickup information.
- Save opportunities on this device/browser; storage failures show a warning.
- Expired current requests disappear from Explore and Saved.
- Fictional contact actions are disabled; missing information has clear confirmation guidance.
- Responsive styling, keyboard focus indicators, and an accessible details dialog.

The Cleaning Products example covers unopened laundry detergent, dish soap, all-purpose cleaner, and new sponges. These are illustrative acceptance rules, not a real organization's policies.

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

## Replace examples with real data

Edit `src/data.ts`. Preserve stable, unique IDs so bookmarks keep working. Listings include organization, city, title, category, description, keywords, beneficiaries, accepted items, condition rules, exclusions, drop-off instructions, optional address and pickup information, optional website/phone/source/date, listing type, optional expiration date, and demo flag.

Use official sources. Record `sourceUrl` and `dateChecked` (YYYY-MM-DD); set `demo: false` only for a real researched listing. An ongoing acceptance policy is not evidence of an urgent request. Use `current request` only when supported by a dated source. Set `expiresOn` in YYYY-MM-DD for dated requests; they remain visible through that day and disappear afterward.

Leave unknown details absent; the UI prompts donors to confirm. Never invent addresses, hours, pickup services, or accepted items. Never publish private recipient or confidential shelter addresses. Demo contact actions remain disabled even if links are accidentally entered.

The global demo banner is intentional. Remove or adapt it only after replacing all displayed examples. Real listings show their source/date when supplied; otherwise they show “Details need confirmation.” Donors should confirm acceptance before traveling.

## Privacy and scope

Bookmarks use localStorage under `wereach-saved`. No data is sent to a server. Clearing browser storage removes bookmarks. No accounts, payments, analytics, API keys, external fonts, maps, or AI features are included.

Community drives and volunteer coordination are future ideas outside this version. The canonical personal repository is [FretterR/WeReach](https://github.com/FretterR/WeReach). Pushing code here does not publish the app.
