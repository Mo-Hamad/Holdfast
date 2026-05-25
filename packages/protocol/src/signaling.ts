// Signaling protocol — between clients and the relay server.
//
// The signaling server's job is narrow:
//   - track which holds are currently being hosted (and where)
//   - relay WebRTC offer / answer / ICE candidates between two peers
//   - that's it
//
// It never sees hold content, message text, or member identities beyond
// the hold fingerprint and a transient session id.

import type { HoldId, PubKey } from './primitives.js';

// ─── Session identifier ────────────────────────────────────────────────────
/**
 * Opaque id assigned by the signaling server when a client connects.
 * Used to address a specific peer's WebSocket without exposing IPs.
 */
export type SessionId = string;

// ─── Client → Server ───────────────────────────────────────────────────────

/** A host announces it's available to receive joiners for this hold. */
export interface SigRegister {
  type: 'register';
  holdId: HoldId;
  /** Full pubkey lets the server reject id/key mismatches early. */
  holdPubkey: PubKey;
}

/** A host stops accepting joiners. (App closing, going offline.) */
export interface SigUnregister {
  type: 'unregister';
  holdId: HoldId;
}

/** A client wants to connect to a hold's host. */
export interface SigFindPeer {
  type: 'find-peer';
  holdId: HoldId;
}

/** WebRTC offer/answer/ICE relayed to another session. */
export interface SigRelay {
  type: 'relay';
  /** Target session — discovered via `peer-found` or via an incoming relay. */
  to: SessionId;
  /** Opaque WebRTC payload — server forwards verbatim. */
  data:
    | { kind: 'offer'; sdp: string }
    | { kind: 'answer'; sdp: string }
    | { kind: 'ice'; candidate: string };
}

export type ClientToServer = SigRegister | SigUnregister | SigFindPeer | SigRelay;

// ─── Server → Client ───────────────────────────────────────────────────────

/** Connection established — here's your session id. */
export interface SigWelcome {
  type: 'welcome';
  sessionId: SessionId;
  /** Server-reported protocol version. Client should compare to its own. */
  protocolVersion: number;
}

/** Confirms a host registration. */
export interface SigRegistered {
  type: 'registered';
  holdId: HoldId;
}

/** Result of a find-peer lookup: the host is online at this session. */
export interface SigPeerFound {
  type: 'peer-found';
  holdId: HoldId;
  hostSession: SessionId;
  hostPubkey: PubKey;
}

/** The hold is not currently hosted — host is offline. */
export interface SigPeerNotFound {
  type: 'peer-not-found';
  holdId: HoldId;
}

/** An inbound relay from another peer (offer/answer/ICE). */
export interface SigRelayed {
  type: 'relayed';
  from: SessionId;
  data: SigRelay['data'];
}

/** Generic error response. */
export interface SigError {
  type: 'error';
  code:
    | 'unknown-message'
    | 'invalid-payload'
    | 'rate-limited'
    | 'unauthorized'
    | 'protocol-mismatch'
    | 'internal';
  message: string;
}

export type ServerToClient =
  | SigWelcome
  | SigRegistered
  | SigPeerFound
  | SigPeerNotFound
  | SigRelayed
  | SigError;
