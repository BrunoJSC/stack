import { neon } from "@neondatabase/serverless";
import { env } from "@stack/env/server";
import { drizzle } from "drizzle-orm/neon-http";

// biome-ignore lint/performance/noNamespaceImport: drizzle needs the full schema namespace
import * as schema from "./schema";

export function createDb() {
	const sql = neon(env.DATABASE_URL);
	return drizzle(sql, { schema });
}

export const db = createDb();
