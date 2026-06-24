import { cors } from "@elysiajs/cors";
import { createContext } from "@stack/api/context";
import { appRouter } from "@stack/api/routers/index";
import { auth } from "@stack/auth";
import { env } from "@stack/env/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";
import { initLogger } from "evlog";
import {
	type BetterAuthInstance,
	createAuthMiddleware,
} from "evlog/better-auth";
import { evlog } from "evlog/elysia";

initLogger({
	env: { service: "stack-server" },
});

const identifyUser = createAuthMiddleware(auth as BetterAuthInstance, {
	exclude: ["/api/auth/**"],
	maskEmail: true,
});

new Elysia()
	.use(evlog())
	.derive(async ({ request, log }) => {
		await identifyUser(log, request.headers, new URL(request.url).pathname);
		return {};
	})
	.use(
		cors({
			origin: env.CORS_ORIGIN,
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	)
	.all("/api/auth/*", (context) => {
		const { request, status } = context;
		if (["POST", "GET"].includes(request.method)) {
			return auth.handler(request);
		}
		return status(405);
	})
	.all("/trpc/*", async (context) => {
		const res = await fetchRequestHandler({
			endpoint: "/trpc",
			router: appRouter,
			req: context.request,
			createContext: () => createContext({ context }),
		});
		return res;
	})
	.get("/", () => "OK")
	.listen(Number(process.env.PORT) || 3000, ({ hostname, port }) => {
		console.log(`Server is running on http://${hostname}:${port}`);
	});
