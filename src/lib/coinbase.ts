import crypto from "node:crypto";

const COINBASE_HOST = "business.coinbase.com";

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

// Build a Coinbase CDP-style Ed25519 JWT for a Business API call.
export function buildCoinbaseJwt(apiKeyId: string, apiSecretBase64: string, method: string, path: string): string {
  const keyBytes = Buffer.from(apiSecretBase64, "base64");
  if (keyBytes.length !== 64) {
    throw new Error(`Coinbase secret key has unexpected length: ${keyBytes.length} bytes (expected 64 for Ed25519)`);
  }
  const seed = keyBytes.subarray(0, 32);
  const publicBytes = keyBytes.subarray(32, 64);

  const privateKey = crypto.createPrivateKey({
    key: {
      kty: "OKP",
      crv: "Ed25519",
      d: seed.toString("base64url"),
      x: publicBytes.toString("base64url"),
    },
    format: "jwk",
  });

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "EdDSA", typ: "JWT", kid: apiKeyId, nonce: crypto.randomBytes(16).toString("hex") };
  const payload = { iss: "cdp", sub: apiKeyId, nbf: now, exp: now + 120, uri: `${method} ${COINBASE_HOST}${path}` };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const signature = crypto.sign(null, Buffer.from(signingInput), privateKey);
  return `${signingInput}.${b64url(signature)}`;
}

/**
 * Authoritatively fetch a Coinbase Business checkout's status (server-side, authenticated).
 * Used to confirm a payment regardless of webhook trust. Returns the status string
 * (e.g. "COMPLETED") or null if unavailable. "COMPLETED" means successfully paid.
 */
export async function getCheckoutStatus(checkoutId: string): Promise<string | null> {
  const apiKeyId = process.env.COINBASE_API_KEY_ID;
  const apiSecret = process.env.COINBASE_PRIVATE_KEY;
  if (!apiKeyId || !apiSecret) return null;
  if (!/^[0-9a-f]{24}$/.test(checkoutId)) return null;

  const path = `/api/v1/checkouts/${checkoutId}`;
  let jwt: string;
  try {
    jwt = buildCoinbaseJwt(apiKeyId, apiSecret, "GET", path);
  } catch {
    return null;
  }
  try {
    const res = await fetch(`https://${COINBASE_HOST}${path}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.status === "string" ? data.status : null;
  } catch {
    return null;
  }
}
