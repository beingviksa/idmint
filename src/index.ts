/**
 * URL-safe alphabet (64 chars)
 * Each character = 6 bits of entropy
 */
const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

/**
 * Secure random bytes (Browser + Node 16+)
 */
function getRandomBytes(size: number): Uint8Array {
  if (!globalThis.crypto || !globalThis.crypto.getRandomValues) {
    throw new Error(
      "[idmint] Secure crypto API not available in this environment"
    );
  }

  return globalThis.crypto.getRandomValues(new Uint8Array(size));
}

/**
 * Validate ID size
 */
function validateSize(size: unknown): asserts size is number {
  if (typeof size !== "number") {
    throw new TypeError(
      `[idmint] size must be a number, received ${typeof size}`
    );
  }

  if (!Number.isInteger(size)) {
    throw new RangeError("[idmint] size must be an integer");
  }

  if (size < 4 || size > 64) {
    throw new RangeError("[idmint] size must be between 4 and 64");
  }
}

/**
 * Generate a secure unique ID
 */
export function generateId(size: number = 21): string {
  validateSize(size);

  const bytes = getRandomBytes(size);
  let id = "";

  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i] & 63];
  }

  return id;
}

/**
 * Generate ID with prefix
 */
export function generateIdWithPrefix(
  prefix: string,
  size: number = 21
): string {
  if (typeof prefix !== "string" || prefix.trim() === "") {
    throw new TypeError("[idmint] prefix must be a non-empty string");
  }
  return `${prefix}_${generateId(size)}`;
}

/**
 * Time-based sortable ID
 */
export function timeBasedId(size: number = 21): string {
  validateSize(size);

  const time = Date.now().toString(36);

  if (size <= time.length) {
    throw new RangeError(
      `[idmint] size must be greater than ${time.length} for timeBasedId`
    );
  }

  const randomPart = generateId(size - time.length);
  return time + randomPart;
}

/**
 * Preset generators
 */
export const idmint = {
  short: () => generateId(8),
  medium: () => generateId(21),
  long: () => generateId(32),
};
