// In-memory IHoldClient for UI development.
//
// Seeds two holds with channels, members, and ~50 messages each. Simulates
// realistic latency (50–250ms). A background loop periodically "receives"
// messages from fake users so the UI can be tested against live updates.
//
// This is the only place where ULIDs and fake pubkeys are minted — production
// IDs come from the real crypto module.

import { ulid } from 'ulid';
import type {
  Channel,
  ChannelId,
  Hold,
  HoldId,
  Member,
  Message,
  MessageId,
  UserId,
} from '@holdfast/protocol';
import type {
  ConnectionStatus,
  CurrentUser,
  IHoldClient,
  Unsubscribe,
} from './IHoldClient.ts';

// ─── Tiny helpers ──────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const latency = () => 50 + Math.random() * 200;
/** Fake fingerprint (32-char hex). Real ones come from SHA-256 of the pubkey. */
const fakeId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
const fakePubkey = () => btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));

// ─── Pub/sub primitive ─────────────────────────────────────────────────────

class Emitter<T> {
  private listeners = new Set<(value: T) => void>();
  on(cb: (value: T) => void): Unsubscribe {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
  emit(value: T): void {
    for (const l of this.listeners) l(value);
  }
}

// ─── Mock client ───────────────────────────────────────────────────────────

export class MockHoldClient implements IHoldClient {
  // State
  private me: CurrentUser;
  private holds = new Map<HoldId, Hold>();
  private channels = new Map<HoldId, Channel[]>();
  private members = new Map<HoldId, Member[]>();
  private messages = new Map<ChannelId, Message[]>();

  // Subscriptions
  private msgEmitters = new Map<ChannelId, Emitter<Message>>();
  private presenceEmitters = new Map<HoldId, Emitter<{ uid: UserId; online: boolean }>>();
  private connectionEmitters = new Map<HoldId, Emitter<ConnectionStatus>>();
  private memberEmitters = new Map<HoldId, Emitter<Member>>();

  constructor() {
    this.me = {
      userId: fakeId(),
      displayName: 'You',
      pubkey: fakePubkey(),
    };
    this.seed();
    this.startFakeActivity();
  }

  // ─── Seed data ───────────────────────────────────────────────────────────

  private seed(): void {
    const now = Date.now();

    // Hold 1: "Holdfast HQ"
    const hold1: Hold = {
      id: fakeId(),
      pubkey: fakePubkey(),
      name: 'Holdfast HQ',
      icon: 'HF',
      createdAt: now - 1000 * 60 * 60 * 24 * 7,
    };
    const hold1Channels: Channel[] = [
      this.mkChannel(hold1.id, 'general', 'general'),
      this.mkChannel(hold1.id, 'random', 'random'),
      this.mkChannel(hold1.id, 'dev', 'dev'),
    ];
    const hold1Members = this.mkMembers(hold1.id, [
      ['You', 'owner'],
      ['rin', 'member'],
      ['august', 'member'],
      ['piper', 'member'],
      ['cass', 'member'],
    ]);

    // Hold 2: "weekend crew"
    const hold2: Hold = {
      id: fakeId(),
      pubkey: fakePubkey(),
      name: 'weekend crew',
      icon: 'WC',
      createdAt: now - 1000 * 60 * 60 * 24 * 2,
    };
    const hold2Channels: Channel[] = [
      this.mkChannel(hold2.id, 'general', 'general'),
      this.mkChannel(hold2.id, 'plans', 'plans'),
    ];
    const hold2Members = this.mkMembers(hold2.id, [
      ['You', 'member'],
      ['marlowe', 'owner'],
      ['nori', 'member'],
    ]);

    this.holds.set(hold1.id, hold1);
    this.holds.set(hold2.id, hold2);
    this.channels.set(hold1.id, hold1Channels);
    this.channels.set(hold2.id, hold2Channels);
    this.members.set(hold1.id, hold1Members);
    this.members.set(hold2.id, hold2Members);

    // Seed messages per channel
    for (const ch of [...hold1Channels, ...hold2Channels]) {
      const holdMembers = this.members.get(ch.holdId)!;
      this.messages.set(ch.id, this.mkMessages(ch.id, holdMembers, 30));
    }
  }

  private mkChannel(holdId: HoldId, slug: string, name: string): Channel {
    return {
      id: fakeId(),
      holdId,
      slug,
      name,
      kind: 'text',
      createdAt: Date.now() - 1000 * 60 * 60,
    };
  }

  private mkMembers(holdId: HoldId, list: [string, Member['role']][]): Member[] {
    return list.map(([displayName, role]) => ({
      userId: displayName === 'You' ? this.me.userId : fakeId(),
      holdId,
      pubkey: displayName === 'You' ? this.me.pubkey : fakePubkey(),
      displayName,
      joinedAt: Date.now() - 1000 * 60 * 60 * 24,
      role,
    }));
  }

  private mkMessages(channelId: ChannelId, members: Member[], count: number): Message[] {
    const samples = [
      'hey, anyone around?',
      'just pushed a fix for the rail layout',
      'lol what is happening here',
      'gm',
      'i think we should ship it',
      'PR is up, would love a review',
      'wait, that actually worked?',
      'one sec, brb coffee',
      "ok i'm back",
      'has anyone tried the new build',
      'i swear i tested this',
      'looks great, merging',
      'btw the icons are slightly misaligned on retina',
      "yeah let's hop on a call",
      'ship it',
    ];
    const msgs: Message[] = [];
    const start = Date.now() - 1000 * 60 * 60 * 6;
    for (let i = 0; i < count; i++) {
      const author = members[i % members.length]!;
      const content = samples[i % samples.length]!;
      const ts = start + i * 1000 * 60 * 3;
      msgs.push({
        id: ulid(ts),
        channelId,
        authorId: author.userId,
        content,
        sentAt: ts,
        receivedAt: ts,
      });
    }
    return msgs;
  }

  // ─── Background "live" activity ─────────────────────────────────────────

  private startFakeActivity(): void {
    const tick = () => {
      const allChannels = [...this.channels.values()].flat();
      if (allChannels.length === 0) return;
      const ch = allChannels[Math.floor(Math.random() * allChannels.length)]!;
      const holdMembers = this.members.get(ch.holdId)!;
      const others = holdMembers.filter((m) => m.userId !== this.me.userId);
      if (others.length === 0) return;
      const author = others[Math.floor(Math.random() * others.length)]!;
      const msg: Message = {
        id: ulid(),
        channelId: ch.id,
        authorId: author.userId,
        content: pickPing(),
        sentAt: Date.now(),
        receivedAt: Date.now(),
      };
      this.messages.get(ch.id)!.push(msg);
      this.msgEmitters.get(ch.id)?.emit(msg);
    };
    setInterval(tick, 15_000 + Math.random() * 15_000);
  }

  // ─── Emitter accessors ──────────────────────────────────────────────────

  private msgEmitter(channelId: ChannelId): Emitter<Message> {
    let e = this.msgEmitters.get(channelId);
    if (!e) {
      e = new Emitter();
      this.msgEmitters.set(channelId, e);
    }
    return e;
  }

  // ─── IHoldClient implementation ─────────────────────────────────────────

  async getCurrentUser(): Promise<CurrentUser> {
    await sleep(latency());
    return this.me;
  }

  async setDisplayName(name: string): Promise<CurrentUser> {
    await sleep(latency());
    this.me = { ...this.me, displayName: name };
    return this.me;
  }

  async listHolds(): Promise<Hold[]> {
    await sleep(latency());
    return [...this.holds.values()];
  }

  async createHold(name: string, icon?: string): Promise<Hold> {
    await sleep(latency());
    const hold: Hold = {
      id: fakeId(),
      pubkey: fakePubkey(),
      name,
      icon: icon ?? name.slice(0, 2).toUpperCase(),
      createdAt: Date.now(),
    };
    const channels: Channel[] = [this.mkChannel(hold.id, 'general', 'general')];
    const members: Member[] = [
      {
        userId: this.me.userId,
        holdId: hold.id,
        pubkey: this.me.pubkey,
        displayName: this.me.displayName,
        joinedAt: Date.now(),
        role: 'owner',
      },
    ];
    this.holds.set(hold.id, hold);
    this.channels.set(hold.id, channels);
    this.members.set(hold.id, members);
    this.messages.set(channels[0]!.id, []);
    return hold;
  }

  async joinHoldByInvite(_inviteUrl: string): Promise<Hold> {
    await sleep(latency() * 3);
    // Mock: just return the second seeded hold.
    const hold = [...this.holds.values()][1];
    if (!hold) throw new Error('No mock hold available to join');
    return hold;
  }

  async leaveHold(holdId: HoldId): Promise<void> {
    await sleep(latency());
    this.holds.delete(holdId);
    this.channels.delete(holdId);
    this.members.delete(holdId);
  }

  async generateInvite(holdId: HoldId): Promise<string> {
    await sleep(latency());
    return `holdfast://invite/mock-${holdId}-${ulid()}`;
  }

  async listChannels(holdId: HoldId): Promise<Channel[]> {
    await sleep(latency());
    return this.channels.get(holdId) ?? [];
  }

  async createChannel(holdId: HoldId, name: string): Promise<Channel> {
    await sleep(latency());
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'channel';
    const channel = this.mkChannel(holdId, slug, name);
    const existing = this.channels.get(holdId) ?? [];
    this.channels.set(holdId, [...existing, channel]);
    this.messages.set(channel.id, []);
    return channel;
  }

  async listMembers(holdId: HoldId): Promise<Member[]> {
    await sleep(latency());
    return this.members.get(holdId) ?? [];
  }

  async getMessages(
    channelId: ChannelId,
    opts: { before?: MessageId; limit?: number } = {},
  ): Promise<Message[]> {
    await sleep(latency());
    const all = this.messages.get(channelId) ?? [];
    const limit = opts.limit ?? 50;
    if (!opts.before) return all.slice(-limit);
    const idx = all.findIndex((m) => m.id === opts.before);
    if (idx <= 0) return [];
    return all.slice(Math.max(0, idx - limit), idx);
  }

  async sendMessage(channelId: ChannelId, content: string): Promise<Message> {
    await sleep(latency());
    const msg: Message = {
      id: ulid(),
      channelId,
      authorId: this.me.userId,
      content,
      sentAt: Date.now(),
      receivedAt: Date.now(),
    };
    const list = this.messages.get(channelId) ?? [];
    list.push(msg);
    this.messages.set(channelId, list);
    this.msgEmitter(channelId).emit(msg);
    return msg;
  }

  subscribeToMessages(channelId: ChannelId, cb: (m: Message) => void): Unsubscribe {
    return this.msgEmitter(channelId).on(cb);
  }

  subscribeToPresence(
    holdId: HoldId,
    cb: (userId: UserId, online: boolean) => void,
  ): Unsubscribe {
    let e = this.presenceEmitters.get(holdId);
    if (!e) {
      e = new Emitter();
      this.presenceEmitters.set(holdId, e);
    }
    return e.on(({ uid, online }) => cb(uid, online));
  }

  subscribeToConnection(
    holdId: HoldId,
    cb: (status: ConnectionStatus) => void,
  ): Unsubscribe {
    let e = this.connectionEmitters.get(holdId);
    if (!e) {
      e = new Emitter();
      this.connectionEmitters.set(holdId, e);
    }
    // Fire initial "connected" so UI gets a baseline.
    queueMicrotask(() => cb({ state: 'connected' }));
    return e.on(cb);
  }

  subscribeToMembers(holdId: HoldId, cb: (member: Member) => void): Unsubscribe {
    let e = this.memberEmitters.get(holdId);
    if (!e) {
      e = new Emitter();
      this.memberEmitters.set(holdId, e);
    }
    return e.on(cb);
  }
}

const PINGS = [
  'anyone here?',
  'huh, interesting',
  'ok looking now',
  'pushed it',
  'lol',
  'agreed',
  '👀',
  "let's do it",
  "i'll take a look in a bit",
  'ship',
];
function pickPing(): string {
  return PINGS[Math.floor(Math.random() * PINGS.length)]!;
}
