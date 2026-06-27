import "@/lib/logger";

import { auth } from "@stack/auth";
import { Elysia } from "elysia";
import {
	type BetterAuthInstance,
	createAuthMiddleware,
} from "evlog/better-auth";
import { evlog } from "evlog/elysia";

const identifyUser = createAuthMiddleware(auth as BetterAuthInstance, {
	exclude: ["/api/auth/**"],
	maskEmail: true,
});

// Logging + request identification. `evlog()` exposes the request-scoped
// `log` as a global singleton derive; the identify hook is promoted to
// `{ as: "global" }` so it runs for every route across the composed app —
// matching the original root-instance behavior where it preceded all routes.
export const observability = new Elysia({ name: "observability" })
	.use(evlog())
	.derive({ as: "global" }, async ({ request, log }) => {
		await identifyUser(log, request.headers, new URL(request.url).pathname);
		return {};
	});
