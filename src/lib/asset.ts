/**
 * Base path the site is served under (for example "/full").
 * Inlined at build time from NEXT_PUBLIC_BASE_PATH, the same value next.config.ts uses for basePath.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a file from /public with the base path. `next/link` adds it on its own; plain <img>, <video>, iframes and fetch do not. */
export function asset(path: string): string {
  if (!BASE_PATH || !path.startsWith("/") || path.startsWith(BASE_PATH + "/")) {
    return path;
  }
  return BASE_PATH + path;
}
