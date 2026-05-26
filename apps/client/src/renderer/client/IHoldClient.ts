// The contract between the renderer (UI) and whatever is providing data.
//
// Today: MockHoldClient (in-memory, seeded).
// Tomorrow: IpcHoldClient (talks to Electron main process over IPC).
//
// The UI never imports either implementation directly — it goes through
// `getClient()` in ./index.ts. Add a method here whenever the UI needs
// something new from the backend.

import type {
  Channel,
  ChannelId,
  Hold,
  HoldId,
  Member,
  Message,
  MessageId,
  PubKey,
  UserId,
} from '@holdfast/protocol';

/** Returned by subscribe* methods. Call to stop receiving events. */
export type Unsubscribe = () => void;

/** Identity loaded from the user's local keystore. */
export interface CurrentUser {
  userId: UserId;
  displayName: string;
  pubkey: PubKey;
}

/** State of the WebRTC connection to a hold's host. */
export type ConnectionStatus =
  | { state: 'offline' }
  | { state: 'connecting' }
  | { state: 'connected' }
  | { state: 'reconnecting'; attempt: number }
  | { state: 'error'; message: string };

export interface IHoldClient {
  // ─── Identity ─────────────────────────────────────────────────────────
  /** Returns the locally-stored identity. Creates one on first call. */
  getCurrentUser(): Promise<CurrentUser>;
  /** Updates display name shown to other members. */
  setDisplayName(name: string): Promise<CurrentUser>;

  // ─── Holds ────────────────────────────────────────────────────────────
  /** All holds the user is a member of (hosting or joined). */
  listHolds(): Promise<Hold[]>;
  /** Creates a new hold owned by the current user. */
  createHold(name: string, icon?: string): Promise<Hold>;
  /** Joins an existing hold via an invite URL. */
  joinHoldByInvite(inviteUrl: string): Promise<Hold>;
  /** Leaves a hold (member) or shuts it down (owner). */
  leaveHold(holdId: HoldId): Promise<void>;
  /** Generates a fresh invite URL for sharing. */
  generateInvite(holdId: HoldId): Promise<string>;

  // ─── Channels ─────────────────────────────────────────────────────────
  listChannels(holdId: HoldId): Promise<Channel[]>;
  createChannel(holdId: HoldId, name: string): Promise<Channel>;

  // ─── Members ──────────────────────────────────────────────────────────
  listMembers(holdId: HoldId): Promise<Member[]>;

  // ─── Messages ─────────────────────────────────────────────────────────
  /**
   * Returns historical messages for a channel.
   * Messages are returned in chronological order (oldest first).
   * Pass `before` to paginate backward into older history.
   */
  getMessages(
    channelId: ChannelId,
    opts?: { before?: MessageId; limit?: number },
  ): Promise<Message[]>;

  /** Sends a new message. Resolves with the persisted message. */
  sendMessage(channelId: ChannelId, content: string): Promise<Message>;

  // ─── Live subscriptions ───────────────────────────────────────────────
  /** Fires whenever a new message arrives in `channelId`. */
  subscribeToMessages(channelId: ChannelId, cb: (m: Message) => void): Unsubscribe;
  /** Fires whenever a member's online/offline state changes in `holdId`. */
  subscribeToPresence(
    holdId: HoldId,
    cb: (userId: UserId, online: boolean) => void,
  ): Unsubscribe;
  /** Fires whenever the hold's connection status changes. */
  subscribeToConnection(
    holdId: HoldId,
    cb: (status: ConnectionStatus) => void,
  ): Unsubscribe;
  /** Fires whenever a new member joins the hold. */
  subscribeToMembers(holdId: HoldId, cb: (member: Member) => void): Unsubscribe;
}
