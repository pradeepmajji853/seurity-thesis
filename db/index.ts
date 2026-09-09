import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

async function cloudflareEnv(): Promise<{ DB?: D1Database }> {
  // Keep the Cloudflare-only module out of Vercel's build graph. Vinext loads
  // it at runtime; Next/Vercel can compile the same app without that module.
  const load = new Function("return import('cloudflare:workers')") as () => Promise<{
    env: { DB?: D1Database };
  }>;
  return (await load()).env;
}

export async function getDb() {
  const env = await cloudflareEnv();
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export async function getRawDb(){const env=await cloudflareEnv();if(!env.DB)throw new Error('Interest registration is temporarily unavailable.');return env.DB;}
