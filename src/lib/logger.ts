/**
 * Minimal file + console logger (server-side only).
 * Author: Avijit Ghosh
 *
 * Writes newline-delimited JSON to `${LOG_DIR}/app.log` (default `./logs/app.log`)
 * and mirrors to the console. Errors additionally go to `${LOG_DIR}/error.log`.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.info("Booking created", { bookingId });
 */
import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

export type LogLevel = "error" | "warn" | "info" | "debug";

const LEVELS: Record<LogLevel, number> = { error: 0, warn: 1, info: 2, debug: 3 };

const LOG_DIR = process.env.LOG_DIR ?? path.join(process.cwd(), "logs");
const LOG_LEVEL = (process.env.LOG_LEVEL as LogLevel | undefined) ?? "info";

interface LogEntry {
  time: string;
  level: LogLevel;
  msg: string;
  meta?: Record<string, unknown>;
}

function ensureDir(): void {
  if (!existsSync(/* turbopackIgnore: true */ LOG_DIR)) {
    mkdirSync(/* turbopackIgnore: true */ LOG_DIR, { recursive: true });
  }
}

function writeFile(file: string, line: string): void {
  try {
    ensureDir();
    const target = path.join(/* turbopackIgnore: true */ LOG_DIR, file);
    appendFileSync(/* turbopackIgnore: true */ target, `${line}\n`, "utf8");
  } catch {
    // Never let logging crash the app (e.g. read-only FS on some hosts)
  }
}

function log(level: LogLevel, msg: string, meta?: Record<string, unknown>): void {
  if (LEVELS[level] > LEVELS[LOG_LEVEL]) {
    return;
  }
  const entry: LogEntry = { time: new Date().toISOString(), level, msg, ...(meta ? { meta } : {}) };
  const line = JSON.stringify(entry);

  writeFile("app.log", line);
  if (level === "error") {
    writeFile("error.log", line);
  }

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    // eslint-disable-next-line no-console
    console.log(line);
  }
}

export const logger = {
  error: (msg: string, meta?: Record<string, unknown>) => log("error", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log("warn", msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => log("info", msg, meta),
  debug: (msg: string, meta?: Record<string, unknown>) => log("debug", msg, meta),
};
