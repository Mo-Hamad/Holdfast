// Zustand store — the single source of truth for the UI.
//
// Components read slices with selectors and call actions to mutate. The store
// talks to the data layer via `getClient()`. Components do NOT call the client
// directly — they go through the store so state stays consistent.
//
// State shape:
//   currentUser              — local identity
//   holds                    — every hold the user belongs to
//   currentHoldId            — which hold is selected
//   currentChannelId         — which channel is selected
//   channelsByHold           — channels grouped by hold id
//   membersByHold            — members grouped by hold id
//   presenceByUser           — online/offline flags
//   messagesByChannel        — message lists, ordered oldest → newest
//   connectionByHold         — per-hold connection state
//   loaded                   — which slices have been hydrated
//
// Subscription lifecycle:
//   When a hold or channel is selected, the store opens subscriptions for
//   live updates. When it changes, the previous subscriptions are torn down.

import { create } from 'zustand';
import type {
  Channel,
  ChannelId,
  Hold,
  HoldId,
  Member,
  Message,
  UserId,
} from '@holdfast/protocol';
import { getClient } from '../client/index.ts';
import type { ConnectionStatus, CurrentUser, Unsubscribe } from '../client/index.ts';

interface State {
  // Identity
  currentUser: CurrentUser | null;

  // Holds
  holds: Hold[];
  currentHoldId: HoldId | null;
  channelsByHold: Record<HoldId, Channel[]>;
  membersByHold: Record<HoldId, Member[]>;
  connectionByHold: Record<HoldId, ConnectionStatus>;
  presenceByUser: Record<UserId, boolean>;

  // Channel selection
  currentChannelId: ChannelId | null;
  messagesByChannel: Record<ChannelId, Message[]>;
}

interface Actions {
  // Loading
  loadCurrentUser(): Promise<void>;
  loadHolds(): Promise<void>;
  loadChannels(holdId: HoldId): Promise<void>;
  loadMembers(holdId: HoldId): Promise<void>;
  loadMessages(channelId: ChannelId): Promise<void>;

  // Selection
  selectHold(id: HoldId | null): void;
  selectChannel(id: ChannelId | null): void;

  // Mutations
  createHold(name: string): Promise<Hold>;
  joinHoldByInvite(url: string): Promise<Hold>;
  sendMessage(content: string): Promise<void>;
  setDisplayName(name: string): Promise<void>;

  // Internal — wired by subscriptions
  _onMessage(m: Message): void;
  _onPresence(uid: UserId, online: boolean): void;
  _onConnection(holdId: HoldId, status: ConnectionStatus): void;
  _onMemberJoined(member: Member): void;
}

// Track active subscriptions so we can tear them down on switch.
let unsubMessages: Unsubscribe | null = null;
let unsubHoldStreams: Unsubscribe[] = [];

export const useStore = create<State & Actions>((set, get) => ({
  // ─── Initial state ──────────────────────────────────────────────────────
  currentUser: null,
  holds: [],
  currentHoldId: null,
  currentChannelId: null,
  channelsByHold: {},
  membersByHold: {},
  connectionByHold: {},
  presenceByUser: {},
  messagesByChannel: {},

  // ─── Loaders ────────────────────────────────────────────────────────────
  async loadCurrentUser() {
    const user = await getClient().getCurrentUser();
    set({ currentUser: user });
  },

  async loadHolds() {
    const holds = await getClient().listHolds();
    set({ holds });
  },

  async loadChannels(holdId) {
    const channels = await getClient().listChannels(holdId);
    set((s) => ({ channelsByHold: { ...s.channelsByHold, [holdId]: channels } }));
  },

  async loadMembers(holdId) {
    const members = await getClient().listMembers(holdId);
    set((s) => ({ membersByHold: { ...s.membersByHold, [holdId]: members } }));
  },

  async loadMessages(channelId) {
    const messages = await getClient().getMessages(channelId);
    set((s) => ({ messagesByChannel: { ...s.messagesByChannel, [channelId]: messages } }));
  },

  // ─── Selection ──────────────────────────────────────────────────────────
  selectHold(id) {
    if (get().currentHoldId === id) return;

    // Tear down previous hold's subscriptions
    for (const u of unsubHoldStreams) u();
    unsubHoldStreams = [];

    set({ currentHoldId: id, currentChannelId: null });

    if (!id) return;

    const client = getClient();
    void get().loadChannels(id);
    void get().loadMembers(id);

    unsubHoldStreams.push(
      client.subscribeToPresence(id, (uid, online) => get()._onPresence(uid, online)),
      client.subscribeToConnection(id, (status) => get()._onConnection(id, status)),
      client.subscribeToMembers(id, (m) => get()._onMemberJoined(m)),
    );
  },

  selectChannel(id) {
    if (get().currentChannelId === id) return;

    // Tear down previous channel's message subscription
    unsubMessages?.();
    unsubMessages = null;

    set({ currentChannelId: id });
    if (!id) return;

    void get().loadMessages(id);
    unsubMessages = getClient().subscribeToMessages(id, (m) => get()._onMessage(m));
  },

  // ─── Mutations ──────────────────────────────────────────────────────────
  async createHold(name) {
    const hold = await getClient().createHold(name);
    set((s) => ({ holds: [...s.holds, hold] }));
    return hold;
  },

  async joinHoldByInvite(url) {
    const hold = await getClient().joinHoldByInvite(url);
    set((s) =>
      s.holds.some((h) => h.id === hold.id) ? s : { holds: [...s.holds, hold] },
    );
    return hold;
  },

  async sendMessage(content) {
    const channelId = get().currentChannelId;
    if (!channelId) return;
    await getClient().sendMessage(channelId, content);
    // The mock emits the message back through subscribeToMessages, so we
    // don't need to manually add it here. Real backend will behave the same.
  },

  async setDisplayName(name) {
    const user = await getClient().setDisplayName(name);
    set({ currentUser: user });
  },

  // ─── Event handlers ─────────────────────────────────────────────────────
  _onMessage(m) {
    set((s) => {
      const existing = s.messagesByChannel[m.channelId] ?? [];
      if (existing.some((x) => x.id === m.id)) return s;
      return {
        messagesByChannel: {
          ...s.messagesByChannel,
          [m.channelId]: [...existing, m],
        },
      };
    });
  },

  _onPresence(uid, online) {
    set((s) => ({ presenceByUser: { ...s.presenceByUser, [uid]: online } }));
  },

  _onConnection(holdId, status) {
    set((s) => ({ connectionByHold: { ...s.connectionByHold, [holdId]: status } }));
  },

  _onMemberJoined(member) {
    set((s) => {
      const list = s.membersByHold[member.holdId] ?? [];
      if (list.some((m) => m.userId === member.userId)) return s;
      return {
        membersByHold: { ...s.membersByHold, [member.holdId]: [...list, member] },
      };
    });
  },
}));

// ─── Selectors (re-export for clarity) ────────────────────────────────────
//
// Components should use these whenever they need derived data, so logic
// stays out of components and Zustand's re-render optimization works.

export const selectCurrentHold = (s: State) =>
  s.holds.find((h) => h.id === s.currentHoldId) ?? null;

export const selectCurrentChannel = (s: State) => {
  if (!s.currentHoldId || !s.currentChannelId) return null;
  return s.channelsByHold[s.currentHoldId]?.find((c) => c.id === s.currentChannelId) ?? null;
};

export const selectCurrentMessages = (s: State) =>
  s.currentChannelId ? (s.messagesByChannel[s.currentChannelId] ?? []) : [];

export const selectCurrentMembers = (s: State) =>
  s.currentHoldId ? (s.membersByHold[s.currentHoldId] ?? []) : [];
