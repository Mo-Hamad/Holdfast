// Authenticated message envelope.
//
// Anything that must be attributable to a specific keypair is wrapped in `Signed<T>`.
// The signature is computed over the canonical JSON encoding of `payload`
// (keys sorted lexicographically, no whitespace). See `canonicalize()` in the
// crypto module — implementation lives there, not here.

import type { PubKey, Signature } from './primitives.js';

/**
 * A signed payload. The signer's public key is embedded so the verifier
 * doesn't need to look it up — they only need to check the signature
 * matches and the key is trusted (e.g. matches the expected hold key,
 * or appears in the hold's member list).
 */
export interface Signed<T> {
  /** The signed content. Verifier hashes the canonical form of this object. */
  payload: T;
  /** Public key of the signer. */
  signer: PubKey;
  /** Ed25519 signature over canonicalize(payload). */
  sig: Signature;
}
