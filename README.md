# Holdfast

A zero-setup, peer-to-peer chat platform. You are the server.

## Concept

Holdfast lets anyone host a chat **hold** from their own machine with no port forwarding,
no infrastructure, no signup. Your app is the server. A lightweight online relay helps
peers find each other and punch through NAT, then steps aside — all content flows directly
between clients over encrypted WebRTC.

Hold identity is a cryptographic keypair. Whoever holds the key is the owner. Keys
(and the encrypted hold state) can be transferred between devices, so ownership moves
with you.

> A **hold** is what we call a Holdfast server — a top-level container for channels and
> members. The name fits the project: whoever holds the key owns the hold.

## Architecture

```
  HOST APP                              MEMBER APP
  ┌──────────────────────┐              ┌──────────────────────┐
  │  React UI            │              │  React UI            │
  │  Main Process        │◄────────────►│  Main Process        │
  │  ├─ Hold Server      │  WebRTC P2P  │  ├─ Peer Client      │
  │  ├─ SQLite store     │  DataChannel │  ├─ Event listener   │
  │  ├─ Keypair vault    │              │  ├─ Keypair vault    │
  │  └─ WebRTC manager   │              │  └─ WebRTC manager   │
  └──────────┬───────────┘              └───────────┬──────────┘
             │                                      │
             └──────────────┬───────────────────────┘
                            │ ICE candidate exchange only
                   ┌────────▼────────┐
                   │ Signaling Server│
                   │  (no content)   │
                   └─────────────────┘
```

## Repo layout

```
holdfast/
├── apps/
│   ├── client/        # Electron + React desktop app (the hold server lives here)
│   └── signaling/     # Tiny WebSocket relay for NAT traversal
└── packages/
    └── protocol/      # Shared wire-format types
```

## MVP scope

- [ ] Generate identity keypair on first launch
- [ ] Create a hold (generates hold keypair, starts hosting)
- [ ] Generate invite link
- [ ] Join a hold via invite (P2P through signaling)
- [ ] One default text channel per hold
- [ ] Send / receive messages in real time
- [ ] Message history sync on join
- [ ] Member presence (online / offline)

Voice, multiple channels, roles, ownership transfer, and encryption-at-rest come after.

## Getting started

```sh
pnpm install
pnpm dev
```

Requires Node 20+ and pnpm 9+.

## Tasks & docs

- **[TASKS.md](./TASKS.md)** — the punch list, grouped by track (UI / backend / integration)
- **[docs/CLIENT_UI_HANDOFF.md](./docs/CLIENT_UI_HANDOFF.md)** — onboarding for UI work
- **[docs/UI_DESIGN.md](./docs/UI_DESIGN.md)** — palette, layout, and component reference
