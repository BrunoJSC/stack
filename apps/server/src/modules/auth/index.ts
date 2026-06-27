import { auth } from "@stack/auth";
import { Elysia } from "elysia";

// Better Auth HTTP boundary. The handler is inline to keep Elysia's context
// types intact; only GET/POST are forwarded to Better Auth, everything else
// returns 405 — preserving the original behavior exactly.
export const authModule = new Elysia({ name: "auth" }).all(
	"/api/auth/*",
	(context) => {
		const { request, status } = context;
		if (["POST", "GET"].includes(request.method)) {
			return auth.handler(request);
		}
		return status(405);
	}
);
