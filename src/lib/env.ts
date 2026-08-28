/**
 * Server-side environment validation with Zod.
 * Import `env` instead of reading `process.env` directly so missing/invalid
 * configuration fails fast with a clear message.
 * Author: Avijit Ghosh
 */
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  LOG_DIR: z.string().default("./logs"),
  MONGODB_URI: z.string().url().optional(),
  MONGODB_DB: z.string().default("ag_appliance"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_BUSINESS_NAME: z.string().default("AG Appliance Services"),
  NEXT_PUBLIC_PHONE: z.string().default("9123667075"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${details}`);
  }
  return result.data;
}

export const env: Env = loadEnv();
