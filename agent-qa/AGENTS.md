# AGENTS.md

This is a [Flue](https://flueframework.com) project: agents are TypeScript functions.

## Layout

- `src/agents/` — agent modules. A module whose first line is the `'use agent'` directive exports agents: every exported capitalized function is one, and the function name is its durable identity.
- `src/app.ts` — the route map; every route is mounted here explicitly.
- `src/db.ts` — the persistence adapter for durable conversations.

## Commands

- `bunx flue run src/agents/hello.ts --message "Hi"` — run an agent locally, no server.
- `bun run dev` — start the dev server.
- `bun run build` — build `dist/server.mjs` (start it with `bun run start`).
- `bun run check:types` — typecheck.
- `bunx flue docs search <query>` — search the Flue docs from the terminal (then `flue docs read <path>`).
- `bunx flue add` — list blueprints for adding channels, sandboxes, and databases.
