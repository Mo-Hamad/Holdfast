# Client UI — Handoff

Welcome. You're building the entire user-facing surface of Holdfast: the
chat client. This doc tells you what's in scope, what's already
done, how to run it, and the conventions to follow.

## What you're building

A real-time chat UI: hold list, channels, chat surface, members, modals.
Pixel-fidelity to any existing product is not the goal — feel and ergonomics
are. See [UI_DESIGN.md](./UI_DESIGN.md) for palette, spacing, and layout
dimensions.

The app is a pure web app right now. It runs in your browser via Vite. Later,
someone else will wrap it in Electron — you won't need to touch that.

## What's already done

| Component | Location | Status |
|---|---|---|
| Workspace scaffold | repo root | done |
| Wire-format types | `packages/protocol/` | done — treat as a contract |
| Vite + React + TS + Tailwind + Zustand | `apps/client/` | done |
| Color palette + spacing | `apps/client/tailwind.config.ts` | done — extend if needed |
| Mock backend | `apps/client/src/renderer/client/MockHoldClient.ts` | done — don't modify, ask if you need new methods |
| Backend interface | `apps/client/src/renderer/client/IHoldClient.ts` | done — read this carefully |
| Zustand store | `apps/client/src/renderer/state/store.ts` | done — extend with new actions as you go |
| Welcome screen | `apps/client/src/renderer/App.tsx` | placeholder — replace with the real layout |

## Running it

From the repo root:

```sh
pnpm install     # one time
pnpm dev         # opens http://localhost:5173 with hot reload
```

If you want to only run the client:

```sh
pnpm --filter @holdfast/client dev
```

Other useful commands:

```sh
pnpm typecheck   # full TS check across all packages
pnpm build       # production build (sanity check before pushing)
```

## How data flows

```
  React component
       │
       │ reads from / dispatches to
       ▼
  Zustand store  (apps/client/src/renderer/state/store.ts)
       │
       │ calls
       ▼
  IHoldClient interface  (client/IHoldClient.ts)
       │
       │ implemented today by
       ▼
  MockHoldClient  ← seeded fake data + simulated latency
```

**Rules:**

1. **Components never call the client directly.** They read from the store
   (`useStore((s) => s.holds)`) and call store actions (`useStore().createHold(name)`).
   This way, when subscriptions or caching logic changes, your components don't.

2. **The store is the single source of truth.** If you find yourself reaching for
   `useState` to hold app data (messages, members, channels), stop — put it in
   the store. `useState` is fine for purely visual state (modal open/closed,
   composer draft text, hover, scroll position).

3. **Use selectors.** When subscribing to the store, narrow to what you need:
   `const messages = useStore(selectCurrentMessages);` not `const state = useStore();`.
   This prevents unnecessary re-renders.

4. **Don't change `IHoldClient` or `@holdfast/protocol` without asking.** They're
   contracts shared with other engineers. If you need new data, request it —
   we'll add the method.

## Where to put new code

```
apps/client/src/renderer/
├── App.tsx               # Top-level layout. You'll replace this first.
├── main.tsx              # Don't touch.
├── index.html / index.css
├── client/               # Backend interface + mock. Don't modify, only read.
├── state/store.ts        # Add new actions here as the UI grows.
├── views/                # Top-level screens / large flows. Onboarding, Settings, etc.
├── components/           # Reusable building blocks. Avatar, MessageRow, Modal, etc.
├── lib/                  # Pure helpers (date formatting, color hashing).
└── styles/               # Design tokens (if you need them outside Tailwind).
```

## Conventions

- **File naming:** PascalCase for components (`ChannelSidebar.tsx`), camelCase
  for helpers (`formatTimestamp.ts`).
- **One component per file.** Co-locate tiny presentational sub-components if
  they're not reused.
- **Tailwind only.** No CSS modules, no styled-components. If a class string
  gets long, extract a `cn(...)` helper or break into smaller components.
- **Semantic color names.** Use `bg-surface`, `text-secondary`, not raw hex.
  See `tailwind.config.ts`.
- **No images for MVP.** Avatars are initials with a color hashed from the user
  id. We'll add image hosting later when the backend supports it.
- **No animations beyond Tailwind transitions.** Save fancy animations (Framer
  Motion etc.) for polish phase.

## When to ask vs decide alone

**Ask** if you're about to:
- Add a method to `IHoldClient`
- Change a field in `@holdfast/protocol`
- Add a new top-level dependency
- Make a UX call that has obvious tradeoffs (e.g. "should joining a hold auto-
  select its first channel?")

**Decide alone** for:
- Component structure and file organization within `views/` and `components/`
- Local visual states (hover, focus, transitions)
- Naming inside your own files
- How to slice the work into PRs

## Done means

- The four-column layout renders with real (mocked) data
- You can switch between holds and channels
- You can type and send a message; it appears live
- You see other (fake) users' messages arriving via the periodic background activity
- You can open the create-hold modal and create a new hold; it appears in the rail
- You can open the join-via-invite modal (it accepts any string and joins the seeded second hold)
- Empty states render gracefully (no holds yet, no channel selected, empty channel)
- A connection status banner shows when a hold is connecting / connected / error

See the task list in your project tracker for the granular breakdown.
