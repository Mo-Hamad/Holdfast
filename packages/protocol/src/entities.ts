// Persisted domain entities — what lives in the host's SQLite database
// and what gets streamed to members during the join handshake.
//
// These are the *shapes* of hold state. Wire-level events (e.g. "new message
// just arrived") live in ./hold.ts.

import type {
  ChannelId,
  HoldId,
  MessageId,
  PubKey,
  Timestamp,
  UserId,
} from './primitives.js';

/** A hold (server) — the top-level container. */
export interface Hold {
  id: HoldId;
  /** Hold's public identity key. The id is its fingerprint. */
  pubkey: PubKey;
  name: string;
  /** Optional emoji or short icon string (no asset hosting in MVP). */
  icon: string | null;
  createdAt: Timestamp;
}

/** A channel within a hold. MVP: text only. */
export interface Channel {
  id: ChannelId;
  holdId: HoldId;
  /** Short identifier within the hold, e.g. "general". */
  slug: string;
  /** Human-readable name. */
  name: string;
  /** Channel type. MVP only supports 'text'. Reserved for voice etc. */
  kind: 'text';
  createdAt: Timestamp;
}

/** A persisted message. */
export interface Message {
  id: MessageId;
  channelId: ChannelId;
  authorId: UserId;
  content: string;
  /** Author's claim of when the message was sent. */
  sentAt: Timestamp;
  /** Host's authoritative receive time — what clients sort by. */
  receivedAt: Timestamp;
}

/** A hold member. */
export interface Member {
  userId: UserId;
  holdId: HoldId;
  /** Member's public identity key. */
  pubkey: PubKey;
  /** Display name chosen by the user. Host stores latest received value. */
  displayName: string;
  joinedAt: Timestamp;
  /** Reserved: 'owner' for the keyholder, 'member' for everyone else. */
  role: 'owner' | 'member';
}

/** Snapshot of hold state sent to a member on join. */
export interface HoldSnapshot {
  hold: Hold;
  channels: Channel[];
  members: Member[];
  /** The receiving member's own record (denormalized for convenience). */
  you: Member;
}
