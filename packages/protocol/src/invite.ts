// Invite token format.
//
// An invite is a signed payload describing how to find a hold's host and
// what pubkey to expect. It's serialized as base64url and shared as a link:
//
//   holdfast://invite/<base64url(InviteToken)>
//
// On click, the joining client:
//   1. Decodes the token
//   2. Verifies `sig` against `payload.holdPubkey`
//   3. Checks `payload.exp` hasn't passed
//   4. Connects to `payload.signalingUrl` and asks for `payload.holdId`
//   5. Verifies the responding peer's identity matches `payload.holdPubkey`

import type { Signed } from './envelope.js';
import type { HoldId, PubKey, Timestamp } from './primitives.js';

export interface InvitePayload {
  /** Protocol version this invite was issued under. */
  v: number;
  /** Fingerprint of the hold — used as the lookup key on the signaling server. */
  holdId: HoldId;
  /** Full hold public key — used to verify the host's identity end-to-end. */
  holdPubkey: PubKey;
  /** Where to find peers. WebSocket URL of the signaling server. */
  signalingUrl: string;
  /** Display name shown in the join prompt before the user connects. */
  holdName: string;
  /** Unix ms after which this invite is invalid. */
  exp: Timestamp;
  /** Random unique id — lets the host revoke a specific invite later. */
  jti: string;
}

/**
 * An invite token. The signature is produced by the *hold* private key,
 * proving the invite was issued by whoever currently holds ownership.
 */
export type InviteToken = Signed<InvitePayload>;
