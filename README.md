# CyberMindSpace Labs
Research-led CyberMindSpace website with static editorial imagery, working browser exercises and a versioned engineering thesis. The distributed research engine is proposed; the site does not claim production research results.

## Development and validation
- `npm run dev`: Vinext preview on port 5173.
- `npm run build`: Sites / Cloudflare Worker build.
- `npm run build:vercel`: native Next.js production build, with the Node-compatible database adapter.
- `node --experimental-strip-types scripts/test-simulations.mjs`: checks all 16 fixture configurations, verdict precedence, record authorization and memory allocation.
- `node scripts/sync-thesis.mjs`: regenerate the published thesis JSON and Markdown from `research/thesis.md`.
- `npx tsc --noEmit`: check types after the Next build. Vinext and Next generate different temporary `.next` route types; do not run their builds simultaneously.

## Deployment
The existing `.openai/hosting.json` identifies the Sites project and its managed D1 binding. Use the Sites build and packaging helpers to publish the Worker. Vercel uses `vercel.json` and the native Next build. Node is pinned to major 22.

Sites uses a static `cloudflare:workers` import. The Vercel build explicitly aliases that module to `db/vercel-env.ts`; no dynamic evaluation is used. On Vercel, durable registration optionally uses Cloudflare’s HTTPS D1 query API with the server-only variables documented in `.env.example`. Use an authorized existing database with the interests migration applied. Do not use the placeholder local database ID or expose tokens with a NEXT_PUBLIC prefix.

When storage is unconfigured, the collaboration page presents working email and telephone links rather than a registration form that cannot save. The API fails closed with 503. A configured but failing database preserves form input and displays an error. No email is sent automatically. Vercel REST persistence requires actual credentials; local adapter tests cannot establish remote database availability.

Set `NEXT_PUBLIC_SITE_URL` to a verified canonical production domain. The default is the existing Sites URL. No custom-domain connection is implied.

## Persistence
Apply pending local migrations once after a Worker build:
`node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_curvy_lila_cheney.sql`

Sites applies migrations to its separate managed production database. Do not edit already-applied migrations. Duplicate email submissions do not overwrite existing records. Consent is versioned; no public lead-list API exists. Contact and removal requests use partnerships@cybermindspace.com.

## Product behavior
- Export fixture: four controls, a deterministic evaluator, separate evidence sources and downloadable JSON. Missing required sink evidence is inconclusive. A confirmed unauthorized receipt establishes a violation.
- Object authorization: Alice reads record 1042; record 1043 belongs to Bob. The vulnerable mode exposes Bob’s synthetic record; ownership enforcement returns 403. Unknown IDs return 404.
- Scenario controls recompute the same fixture evaluator. Event inspection shows source and parent IDs. The architecture walkthrough changes only by user action.
- Classroom planner allocates 2 GiB per session within a memory budget and shows queued sessions. It does not provision resources or estimate real capacity.
- The catalog distinguishes CyberMindSpace browser exercises from external PortSwigger, OWASP, OverTheWire and CyLab environments. No affiliation or integration is claimed.
- No live LLM, target shell or hosted VM is connected to these exercises. All data is synthetic.

## Research and assets
The thesis 0.2 includes the property contract, threat model, lifecycle state machine, failure recovery, evidence integrity, retention, release gates, baselines and operational requirements. Proposed performance thresholds are not achieved results.

The supplied thesis image is used as a blurred hero background. Two original ImageGen assets illustrate optical boundaries and silicon topography; both are conceptual artwork rather than photographs of owned hardware. Sources: original CyberMindSpace brand assets; original user-supplied thesis image; generated optical and silicon artwork. Oru’el inspired the editorial restraint and atmospheric art direction; its copy and imagery were not reused.

## QA scope
Verified browser interactions include the export verdicts, ownership check, missing-evidence behavior, scenario recomputation, reset controls, event navigation, memory-budget queueing, navigation and comparison/lifecycle controls. Automated fixture checks cover all input combinations. Build and HTTP checks cover both runtime targets. These checks validate the website and bounded fixtures, not the proposed distributed research engine.
