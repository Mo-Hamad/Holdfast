// Primitive type aliases used across the protocol.
// All "binary" values are encoded as base64 (URL-safe, no padding) for JSON transport.
// All identifiers are hex-encoded fingerprints (lowercase, no separators).

/** Base64url-encoded bytes. */
export type Base64 = string;

/** Lowercase hex string. */
export type Hex = string;

/** Ed25519 public key (32 bytes), base64url-encoded. */
export type PubKey = Base64;

/** Ed25519 signature (64 bytes), base64url-encoded. */
export type Signature = Base64;

/**
 * Short fingerprint derived from a public key:
 *   first 16 bytes of SHA-256(pubkey), hex-encoded → 32 chars.
 * Used as a stable, compact ID in URLs, the signaling server, and the database.
 */
export type Fingerprint = Hex;

/** Fingerprint of a user's identity key. */
export type UserId = Fingerprint;

/**
 * Fingerprint of a hold's identity key.
 * A "hold" is a Holdfast server — the top-level container for channels and members.
 * Named after the project: whoever holds the key owns the hold.
 */
export type HoldId = Fingerprint;

/** Fingerprint of a channel — derived from holdId + channel slug. */
export type ChannelId = Fingerprint;

/** Globally-unique message ID. ULIDs (sortable, 26 chars). */
export type MessageId = string;

/** Unix timestamp in milliseconds. */
export type Timestamp = number;

/** Current protocol version. Bumped on any breaking wire-format change. */
export const PROTOCOL_VERSION = 1;
