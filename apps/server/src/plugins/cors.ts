import { cors } from "@elysiajs/cors";
import { env } from "@stack/env/server";

// Cross-cutting CORS plugin. `@elysiajs/cors` adds no types and owns global
// request/response lifecycle, so it is registered as a global plugin and
// carries its own internal name for deduplication. The explicit annotation
// keeps the emitted declaration portable (avoids a bare `Response` reference).
export const corsPlugin: ReturnType<typeof cors> = cors({
	origin: env.CORS_ORIGIN,
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
});
