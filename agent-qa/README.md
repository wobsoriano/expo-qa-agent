# agent-qa

A [Flue](https://flueframework.com) agent project.

## Setup

```sh
bun install
```

Then add a model provider API key to `.env` (any [provider Pi supports](https://pi.dev/docs/latest/providers#api-keys)).

## Talk to your agent

```sh
bunx flue run src/agents/hello.ts --message "Say hello!"
```

Conversations are durable — pass `--id <id>` to continue one.

## Develop

```sh
bun run dev
```

The Hello agent is served at `http://localhost:5173/agents/hello` — see `src/app.ts` for the route map and an example request.

## Deploy

```sh
bun run build
node dist/server.mjs
```

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `bunx flue docs` from the terminal.
