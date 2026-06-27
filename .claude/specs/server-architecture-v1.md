# Server architecture — v1 (Elysia, feature-based modules)

_Applies to `apps/server`. Runtime: **Bun**. HTTP framework: **Elysia**. API surface: **tRPC** (generic `@trpc/server/adapters/fetch` adapter mounted on an Elysia catch-all — NOT `@elysiajs/trpc`)._

## Directory layout

```
apps/server/src/
  index.ts              # Bun runtime entry — the ONLY place .listen() is called
  app.ts                # composed Elysia app; exports `app` + `type App` (testable via app.handle())
  lib/
    logger.ts           # initLogger() boot-time side effect (evlog)
  plugins/              # cross-cutting Elysia plugins (global lifecycle, add no business types)
    cors.ts             # configured @elysiajs/cors plugin
    observability.ts    # evlog() + Better Auth identify derive ({ as: "global" })
  modules/              # feature modules — each an Elysia({ name }) controller instance
    health/index.ts     # GET /
    auth/index.ts       # ALL /api/auth/* (GET/POST → Better Auth, else 405)
    trpc/index.ts       # ALL /trpc/* → fetchRequestHandler(appRouter)
```

## Rationale per top-level directory

- **`index.ts` vs `app.ts`** — composition is decoupled from the runtime adapter. `app.ts` has no `.listen()` side effect, so it is importable and exercisable via `app.handle()`; `index.ts` only binds the Bun listener.
- **`modules/<feature>/`** — each feature is its own named `Elysia` instance (the controller). Handlers are inline to preserve Elysia's context type inference. `service.ts` / `model.ts` are intentionally omitted today: health/auth/trpc carry no business logic or TypeBox DTOs inside `apps/server` (tRPC procedures live in `@stack/api`, auth logic in `@stack/auth`). They will be added when request-dependent logic (e.g. payments) lands.
- **`plugins/`** — cross-cutting concerns that own global lifecycle and add no business types (CORS, logging/identify), registered globally.
- **`lib/`** — framework-agnostic clients / boot config. Currently only `logger.ts`; db/auth clients live in shared `@stack/*` packages.
- **env** — imported directly from `@stack/env/server` (schema-validated, fails at boot). No server-local `env.ts` re-export, to respect the repo's no-barrel-file lint rule.

## Behavior-preservation notes

- The Better Auth identify hook was a root-instance `.derive` (applied to all routes). After splitting routes into separate module instances it is promoted to `.derive({ as: "global" }, …)` in `observability.ts` so it still runs for every route. `evlog()` already exposes `log` as a global singleton derive. Verified: the `auth:` log line appears on `/` and `/trpc/*` but not on `/api/auth/*` (honoring `exclude: ["/api/auth/**"]`).
- Registration order preserved: observability → cors → auth → trpc → health.
- tRPC surface unchanged (same router, same `/trpc` endpoint, same fetch adapter).

## Conventions for future modules

1. One named `Elysia({ prefix, name })` per feature; keep the chain unbroken.
2. Inline handlers only — never pass a controller method by reference.
3. Business logic in `service.ts` (abstract class / pure functions); model only request-dependent services as Elysia plugins.
4. Shared DTOs via `.model()` reference models, not inlined duplicate schemas.
5. Scope lifecycle hooks intentionally (local by default; `scoped`/`global` only when the cross-cutting effect must reach mounted modules).
