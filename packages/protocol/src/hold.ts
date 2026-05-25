// Hold protocol — between the host and a connected member, sent over the
// WebRTC DataChannel after the WebRTC connection is established.
//
// This is the protocol that actually carries chat. Signaling is just a
// matchmaker; everything that matters happens here, end-to-end encrypted by
// DTLS at the WebRTC layer.
//
// Authenticity:
//   - The joining client signs the JoinRequest with its identity key.
//   - The host signs MessageCreated broadcasts with the hold key so members
//     can verify the message really came from the hold owner (not a peer
//     forwarding garbage in a future multi-host world).
//   - User-authored messages are signed by the *user's* identity key, so the
//     host can attribute messages even before fully trusting transport.

import type { Signed } from './envelope.js';
import type {
  ChannelId,
  MessageId,
  PubKey,
  Timestamp,
  UserId,
} from './primitives.js';
import type { Channel, HoldSnapshot, Member, Message } from './entities.js';
import type { InviteToken } from './invite.js';

// ─── Member → Host ─────────────────────────────────────────────────────────

/**
 * First message sent by a joining client. Signed by the *user's* identity key
 * so the host can attribute the connection. The invite proves the user is
 * authorized to join.
 */
export interface JoinRequestPayload {
  /** User's identity public key. */
  userPubkey: PubKey;
  /** Display name the user wants to use in this hold. */
  displayName: string;
  /** The invite that authorized this join. */
  invite: InviteToken;
  /** Wall-clock at the joiner — host rejects if skew is too large. */
  ts: Timestamp;
}
export type JoinRequest = { type: 'join'; data: Signed<JoinRequestPayload> };

/** A message the user is sending. Signed by their identity key. */
export interface MessageSendPayload {
  channelId: ChannelId;
  content: string;
  /** Client-generated nonce, helps dedupe if a retry happens. */
  nonce: string;
  /** Wall-clock at the author. Host overwrites with its own clock on persist. */
  ts: Timestamp;
}
export type MessageSend = { type: 'msg-send'; data: Signed<MessageSendPayload> };

/** Keepalive. Host responds with `pong`. */
export interface Ping {
  type: 'ping';
  ts: Timestamp;
}

export type MemberToHost = JoinRequest | MessageSend | Ping;

// ─── Host → Member ─────────────────────────────────────────────────────────

/** Join accepted — here's everything you need to render the hold. */
export interface JoinAccepted {
  type: 'joined';
  snapshot: HoldSnapshot;
}

/** Join rejected — the connection will close after this. */
export interface JoinRejected {
  type: 'rejected';
  reason:
    | 'invalid-signature'
    | 'expired-invite'
    | 'invalid-invite'
    | 'banned'
    | 'clock-skew'
    | 'protocol-mismatch'
    | 'internal';
  message: string;
}

/**
 * A message has been accepted and persisted by the host. Broadcast to every
 * connected member (including the author — they see it confirmed).
 * Signed by the *hold* key.
 */
export interface MessageCreatedPayload {
  message: Message;
  /** Original author signature, re-broadcast verbatim so any member can verify. */
  authorSig: Signed<MessageSendPayload>;
}
export type MessageCreated = {
  type: 'msg';
  data: Signed<MessageCreatedPayload>;
};

/** Historical messages streamed during join. May arrive in multiple chunks. */
export interface BacklogChunk {
  type: 'backlog';
  channelId: ChannelId;
  messages: Message[];
  /** If true, more chunks for this channel are still coming. */
  more: boolean;
}

/** Channel created (reserved for future — MVP has one default channel). */
export interface ChannelCreated {
  type: 'channel-created';
  channel: Channel;
}

/** Another member joined the hold. */
export interface MemberJoined {
  type: 'member-joined';
  member: Member;
}

/** A member's presence changed. */
export interface PresenceUpdate {
  type: 'presence';
  userId: UserId;
  online: boolean;
}

/** Response to a `ping`. */
export interface Pong {
  type: 'pong';
  /** Echoes the ping's ts so the client can measure RTT. */
  ts: Timestamp;
  /** Host's own clock — clients use this to detect skew. */
  hostTs: Timestamp;
}

export type HostToMember =
  | JoinAccepted
  | JoinRejected
  | MessageCreated
  | BacklogChunk
  | ChannelCreated
  | MemberJoined
  | PresenceUpdate
  | Pong;

// ─── Convenience unions ────────────────────────────────────────────────────
/** Anything that can travel over the DataChannel, in either direction. */
export type HoldMessage = MemberToHost | HostToMember;

/** Map of message type → message shape. Useful for handler tables. */
export type HoldMessageMap = {
  [M in HoldMessage as M['type']]: M;
};

/** Discriminator helper — narrows by `type` tag. */
export function isType<T extends HoldMessage['type']>(
  msg: HoldMessage,
  type: T,
): msg is HoldMessageMap[T] {
  return msg.type === type;
}

/** Re-exports of payload shapes used by the message ID generator. */
export type { MessageId };
