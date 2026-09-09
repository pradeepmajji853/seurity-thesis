# CyberMindSpace Labs

A responsive research-led website for CyberMindSpace Labs. Built with React, Vinext and a Cloudflare Worker. The research infrastructure described by the website is proposed; diagrams and lab interactions are explicitly scripted demonstrations.

## Run locally

- `npm run install:ci` installs the locked dependencies.
- `npm run dev` starts the local development site on port 5173.
- `npm run build` creates the Worker and browser assets.
- `npx tsc --noEmit` checks application types.

The Sites skill's build and packaging helpers are used for hosted delivery. `.openai/hosting.json` identifies this site's existing project and logical D1 binding; reuse it.

## Main source

- `components/labs/site.tsx`: homepage, shared navigation, topology, lifecycle and depth/motion controls.
- `components/labs/experiments.tsx`: simulations, scenario controls, classroom visualization, catalog and research questions.
- `components/labs/pages.tsx`: route content and thesis renderer.
- `app/globals.css`: shared visual and motion system, mobile and reduced-motion adaptations.
- `research/thesis.md`: complete research thesis with sources.
- `lib/thesis.json` and `public/research-thesis.md`: rendered and downloadable copies of the thesis. Regenerate these when updating the canonical Markdown.
- `app/api/interest/route.ts`: validated, same-origin interest registration. No public lead-list endpoint exists.
- `db/schema.ts` and `drizzle/`: persistent interest schema and migration.

## Local database

After building, apply each pending migration once:

`node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_curvy_lila_cheney.sql`

Hosting applies the migration to its separate production database. Test registrations in the local database do not become production data. Duplicate emails do not create additional records or overwrite existing details. Registrations include the submitted consent version. The site does not send email automatically.

## Delivery notes

All requested routes are implemented. The introduction lab is a scripted interface; it is not a connected LLM. The classroom animation illustrates a target of 50 sessions, not current capacity. No prices, customer counts, research results or partnerships are asserted.

The published CyberMindSpace mark is reused without geometric changes. Inter and JetBrains Mono assets were obtained from the existing CyberMindSpace site. The palette follows the supplied brief.

The generated Sites origin is configured in `lib/site-config.ts`. The custom domain `labs.cybermindspace.com` has not been connected. Change the canonical origin only after domain setup is verified.

WebMCP interest registration is progressively enabled when a compatible browser provides `document.modelContext`. No supported WebMCP validation context was available in this run; that interface is not claimed to have been verified. The shared HTTP registration API was tested with valid, invalid, duplicate and cross-origin input.

Browser screenshot and interaction QA was not performed. Validation covered production compilation, TypeScript, route responses, database persistence and server-side registration behavior.
