import { Elysia } from "elysia";

// Health check. Plain liveness probe at the root path.
export const healthModule = new Elysia({ name: "health" }).get("/", () => "OK");
