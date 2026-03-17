#!/usr/bin/env node
/**
 * check-broken-links.mjs
 *
 * Reads src/data/resources.json, checks every URL, and removes entries that
 * are definitively broken (HTTP 404 / 410, or complete connection failure after
 * retrying with both HEAD and GET).
 *
 * Conservative rules — NOT removed:
 *   • 401 / 403  — content may be behind auth
 *   • 429        — rate-limited, server is up
 *   • 5xx        — temporary server error
 *
 * Outputs a JSON report to stdout:
 *   { "broken": [ { id, title, url, status, error } ] }
 *
 * Exit code is always 0; the caller reads the JSON to decide next steps.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESOURCES_FILE = resolve(__dirname, '../../src/data/resources.json');

const CONCURRENCY = 15;    // parallel fetch workers
const TIMEOUT_MS  = 20_000; // 20 s per request

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

/** Status codes that definitively mean the resource no longer exists. */
const BROKEN_CODES = new Set([404, 410]);

// ---------------------------------------------------------------------------
// URL checker
// ---------------------------------------------------------------------------

/**
 * @param {string} url
 * @returns {Promise<{ ok: boolean, status: number, error?: string }>}
 */
async function checkUrl(url) {
  for (const method of ['HEAD', 'GET']) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        method,
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'User-Agent': USER_AGENT },
      });
      clearTimeout(timer);

      if (BROKEN_CODES.has(res.status)) {
        // Confirm a 404/410 with GET before marking broken (HEAD 404 can be a false positive)
        if (method === 'HEAD') continue;
        return { ok: false, status: res.status };
      }

      // Everything else (200, 3xx, 401, 403, 429, 5xx) → not definitively broken
      return { ok: true, status: res.status };

    } catch (err) {
      clearTimeout(timer);
      if (method === 'HEAD') continue; // HEAD may be blocked; retry with GET

      // GET also failed → genuine connection error
      const message = err.name === 'AbortError' ? 'Request timed out' : err.message;
      return { ok: false, status: 0, error: message };
    }
  }

  return { ok: false, status: 0, error: 'Both HEAD and GET failed' };
}

// ---------------------------------------------------------------------------
// Batched concurrency helper
// ---------------------------------------------------------------------------

/**
 * @template T, R
 * @param {T[]} items
 * @param {(item: T) => Promise<R>} fn
 * @param {number} size  batch size
 * @returns {Promise<R[]>}
 */
async function runBatched(items, fn, size) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = await Promise.all(items.slice(i, i + size).map(fn));
    results.push(...batch);
    const done = Math.min(i + size, items.length);
    process.stderr.write(`\r  Progress: ${done} / ${items.length}`);
  }
  process.stderr.write('\n');
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const resources = JSON.parse(readFileSync(RESOURCES_FILE, 'utf-8'));

process.stderr.write(`Loaded ${resources.length} resources.\n`);
process.stderr.write(`Concurrency: ${CONCURRENCY}  |  Timeout: ${TIMEOUT_MS / 1000}s\n`);

const checked = await runBatched(
  resources,
  async (r) => ({ resource: r, ...(await checkUrl(r.url)) }),
  CONCURRENCY,
);

const broken = checked.filter((c) => !c.ok);

if (broken.length > 0) {
  const brokenIds = new Set(broken.map((c) => c.resource.id));
  const cleaned   = resources.filter((r) => !brokenIds.has(r.id));
  writeFileSync(RESOURCES_FILE, JSON.stringify(cleaned, null, 4) + '\n');
  process.stderr.write(
    `Removed ${broken.length} broken link(s). Remaining: ${cleaned.length}\n`,
  );
}

const report = {
  broken: broken.map((c) => ({
    id:     c.resource.id,
    title:  c.resource.title,
    url:    c.resource.url,
    status: c.status,
    error:  c.error ?? null,
  })),
};

process.stdout.write(JSON.stringify(report) + '\n');
