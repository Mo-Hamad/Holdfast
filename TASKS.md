# Holdfast — Task Board

The complete punch list, grouped by track. Pick a task, check it off when
it's merged.

- Tracks run in parallel. UI tasks don't block backend tasks and vice versa.
- Within a track, tasks are roughly ordered. Earlier ones often unblock later ones.
- New work: add it to the appropriate track, keep the format consistent.
- See [docs/CLIENT_UI_HANDOFF.md](./docs/CLIENT_UI_HANDOFF.md) for UI conventions
  and [README.md](./README.md) for project overview.

---

## Done

- [x] **Scaffold monorepo (pnpm workspaces)**
      Set up apps/client, apps/signaling, packages/protocol with TypeScript,
      Prettier, EditorConfig, and shared tsconfig.
- [x] **Define wire protocol types**
      `packages/protocol/` — primitives, Signed envelope, entities (Hold,
      Channel, Message, Member), invite token, signaling protocol, hold
      protocol. Zero deps, pure types.

---

## UI track

A pure web app right now (Vite + React + Tailwind + Zustand) backed by an
in-memory mock. Run with `pnpm dev`, open http://localhost:5173. See
[docs/CLIENT_UI_HANDOFF.md](./docs/CLIENT_UI_HANDOFF.md) before starting.

Components live in `apps/client/src/renderer/components/`, views in
`apps/client/src/renderer/views/`.

- [ ] **Build four-column AppLayout shell**
      Replace `App.tsx` with the real layout: HoldRail (72px) | ChannelSidebar
      (240px) | ChatView (flex-1) | MemberSidebar (240px). Empty containers
      with correct backgrounds.
- [ ] **Build Avatar + PresenceDot components**
      Avatar: initials with color hashed from userId (see UI_DESIGN.md), three
      sizes. PresenceDot: small colored circle (online/idle/offline).
- [ ] **Build HoldRail component**
      List of hold icons, active state via accent strip on the left edge. Plus
      button opens CreateHoldModal. Reads `holds` and `currentHoldId` from
      store; calls `selectHold(id)`.
- [ ] **Build ChannelSidebar + UserPanel**
      Hold name header, scrollable channel list, UserPanel pinned to bottom
      (current user avatar + name, gear icon → SettingsModal stub).
- [ ] **Build ChatView header + empty state**
      Channel name, optional topic, member count on the right. When no
      channel is selected, render "Select a channel to start chatting".
- [ ] **Build MessageList + Message components**
      Scroll list, oldest at top. Auto-scroll on new message unless scrolled
      up (show "Jump to present" pill). Group consecutive messages from same
      author within 5 min.
- [ ] **Build Composer**
      Multi-line textarea, Enter to send, Shift+Enter for newline, auto-grow
      up to ~6 lines. Calls `store.sendMessage(content)`. Disabled when no
      channel selected.
- [ ] **Build MemberSidebar**
      Members grouped by online/offline with section counts. Each row: avatar
      + presence dot + display name + owner badge. Reads `membersByHold` and
      `presenceByUser`.
- [ ] **Build Modal primitive + CreateHoldModal**
      Reusable Modal (overlay, centered card, ESC to close, focus trap).
      CreateHoldModal: name input, calls `store.createHold(name)`, selects
      the new hold on success.
- [ ] **Build JoinHoldModal**
      Paste-invite-URL input, calls `store.joinHoldByInvite(url)`. Mock
      returns the seeded second hold on any input. Show pending state.
- [ ] **Build OnboardingScreen**
      First-launch flow: when `currentUser.displayName === 'You'`, show a
      full-screen prompt to set display name. Calls `store.setDisplayName`.
      Replaces the whole app until completed.
- [ ] **Build ConnectionStatusBanner**
      Thin banner above the chat header when current hold's connection is
      anything other than 'connected'. Reads
      `connectionByHold[currentHoldId]`.
- [ ] **Empty + loading states pass**
      Audit every list/view: no holds (rail prompts to create or join), no
      channel selected, empty channel ("no messages yet — say hi"), members
      list while loading. Add skeletons where things flash.
- [ ] **Polish pass: hover, focus, transitions**
      Hover states everywhere clickable. Visible focus rings. ~150ms
      transitions. Smooth scroll. End-to-end flow check: onboard → create
      hold → send → switch → join via invite.

---

## Backend track

Independent of the UI track. Builds the real implementation that will
eventually replace `MockHoldClient`.

- [ ] **Build signaling server**
      `apps/signaling/`: WebSocket server. In-memory peer registry
      (`holdId → host socket`), brokers WebRTC offer/answer/ICE candidates.
      Rate limit per IP. Health endpoint. Dockerfile for deploy.
- [ ] **Implement crypto module**
      `main/crypto.ts`: Ed25519 keypair generation, sign, verify (libsodium).
      Identity stored as encrypted local file (passphrase-derived key for
      now; OS keychain later).
- [ ] **Set up SQLite layer**
      `main/db.ts`: better-sqlite3 with schema for holds, channels, messages,
      members. Typed query helpers, migrations runner.
- [ ] **Build WebRTC + signaling client**
      `main/webrtc.ts` + `main/signaling.ts`: simple-peer wrapper. Two CLI
      smoke-test scripts that prove host and joining peer can connect via the
      signaling server and exchange a hello-world string over DataChannel.
- [ ] **Implement invite link format**
      Signed invite token containing holdId, holdPubkey, signalingUrl, exp.
      Encode as URL-safe string. Generate on host side, parse + verify on
      join side.
- [ ] **Implement hold host logic**
      `main/hold.ts`: Create hold (generates keypair, writes to DB, registers
      with signaling). Accept join requests (verify signature, add member).
      Receive messages, persist, broadcast to all connected peers.
- [ ] **Implement peer (join) logic**
      `main/peer.ts`: Parse invite link, find peer via signaling, connect via
      WebRTC, verify host identity, send signed join request, receive
      backlog + event stream.

---

## Integration

Lands once the UI and backend tracks have something real to connect.

- [ ] **Set up Electron app shell**
      `apps/client/`: Electron main process bootstrap, single window pointing
      at the existing renderer, IPC bridge (`IpcHoldClient` implementation of
      `IHoldClient` that calls into the main process).
- [ ] **End-to-end smoke test**
      Two Electron windows on one machine, one creates a hold, the other
      joins via invite, exchange messages, verify backlog syncs on join.
      Document the test as the MVP acceptance criteria.

---

## Deferred (post-MVP)

Not on the board yet — design and break down when we're ready.

- Voice channels (WebRTC MediaStream mesh)
- Multiple channels per hold + channel management UI
- Roles, permissions, moderation
- Ownership transfer (live handshake + encrypted export bundle)
- Encryption-at-rest for SQLite
- Reactions, message edits, typing indicators, read receipts
- File sharing
- Auto-reconnect logic
- TURN server fallback for strict NAT

---

## Notes

- Treat `packages/protocol` and `IHoldClient` as contracts: changes go through
  a PR review, not a quiet edit.
- New top-level dependencies need a sanity check — prefer using what's already
  in the workspace.
- When you finish a task, check it off, commit the change to this file in the
  same PR as the work.
