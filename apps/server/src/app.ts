import { Elysia } from "elysia";

import { authModule } from "@/modules/auth";
import { healthModule } from "@/modules/health";
import { trpcModule } from "@/modules/trpc";
import { corsPlugin } from "@/plugins/cors";
import { observability } from "@/plugins/observability";

// Fully composed, runtime-agnostic Elysia app. No `.listen()` here so it can
// be imported and exercised via `app.handle()` in tests. Registration order
// mirrors the original: observability + CORS first, then the feature modules.
export const app = new Elysia({ name: "app" })
	.use(observability)
	.use(corsPlugin)
	.use(authModule)
	.use(trpcModule)
	.use(healthModule);

export type App = typeof app;
