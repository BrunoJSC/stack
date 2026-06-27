import { createContext } from "@stack/api/context";
import { appRouter } from "@stack/api/routers/index";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";

// tRPC HTTP boundary. tRPC stays the type-safe API surface; Elysia only
// bridges the request to the generic fetch adapter. The handler is inline so
// the Elysia context (passed into the tRPC context factory) stays typed.
export const trpcModule = new Elysia({ name: "trpc" }).all(
	"/trpc/*",
	async (context) => {
		const res = await fetchRequestHandler({
			endpoint: "/trpc",
			router: appRouter,
			req: context.request,
			createContext: () => createContext({ context }),
		});
		return res;
	}
);
