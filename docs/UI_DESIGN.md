# Holdfast — UI Design Reference

A working reference for palette, spacing, and layout decisions. Use this
instead of designing from scratch. All values are defined in
`apps/client/tailwind.config.ts` — reference them by semantic name, not raw
hex.

## Layout

```
┌────┬──────────────┬────────────────────────────────┬──────────────┐
│Rail│ Channel      │ Chat                           │ Members      │
│    │ sidebar      │                                │ sidebar      │
│72px│ 240px        │ flex-1                         │ 240px        │
│    │              │                                │              │
│ ◉  │ # general    │ ─── header (channel name) ───  │ Online (3)   │
│ ◉  │ # random     │                                │  • rin       │
│ ◉  │ # dev        │  Aug · 12:04                   │  • august    │
│ +  │              │  hey, anyone around?           │  • piper     │
│    │              │                                │              │
│    │              │  Rin · 12:05                   │ Offline (2)  │
│    │              │  yeah, what's up?              │  • cass      │
│    │              │                                │  • marlowe   │
│    │              │  [composer]                    │              │
│    │ ─ user panel │                                │              │
└────┴──────────────┴────────────────────────────────┴──────────────┘
```

**Tailwind utilities:**
- Rail: `w-rail` (72px)
- Sidebars: `w-sidebar` (240px)
- Chat: `flex-1 min-w-0` (rest of space; `min-w-0` lets it shrink)

## Palette (semantic)

| Token | Hex | Use |
|---|---|---|
| `bg-base` | `#1a1b1e` | App background (behind rail) |
| `bg-surface` | `#25262b` | Sidebars, panels |
| `bg-elevated` | `#2f3035` | Chat content area, message hover |
| `bg-overlay` | `#3a3b40` | Modals, popovers, dropdown menus |
| `border` | `#3a3b40` | Subtle dividers |
| `text-primary` | `#e3e4e6` | Main text |
| `text-secondary` | `#a8a9ad` | Timestamps, metadata, member status |
| `text-muted` | `#6e6f73` | Placeholders, disabled |
| `accent` | `#6366f1` | Buttons, links, focus rings |
| `accent-hover` | `#818cf8` | Hover/active states |
| `online` | `#22c55e` | Online presence dot |
| `idle` | `#eab308` | Idle presence dot |
| `offline` | `#6e6f73` | Offline presence dot |
| `danger` | `#ef4444` | Destructive actions, errors |
| `success` | `#10b981` | Confirmations |

## Typography

| Size | Use |
|---|---|
| `text-xs` (12px) | Timestamps, member counts, captions |
| `text-sm` (14px) | Channel names, member names, secondary UI |
| `text-base` (15px) | Chat messages (the canonical body size) |
| `text-lg` (18px) | Section headings (e.g. "Online — 3") |
| `text-xl` (20px) | Modal titles |

Weights: `font-normal` (400), `font-medium` (500), `font-semibold` (600). No
italics in chrome; italic in chat is markdown territory.

## Spacing

Use the Tailwind scale (`p-1 = 4px`, `p-2 = 8px`, `p-3 = 12px`, `p-4 = 16px`,
`p-6 = 24px`, `p-8 = 32px`). Stick to multiples of 4.

Common rhythms:
- Message row: `px-4 py-1` (compact)
- Sidebar item: `px-2 py-1.5`
- Modal padding: `p-6`
- Button: `px-4 py-2`

## Components to build

The new dev's task list covers these. They roughly correspond to files in
`components/`:

- `Avatar` — circle with initials, color hashed from user id. Sizes: sm (24),
  md (32), lg (40).
- `PresenceDot` — small filled circle, color-coded by status.
- `IconButton` — square 32px button with hover bg.
- `Button` — primary (accent bg), secondary (surface bg), danger (danger bg).
- `Modal` — overlay + centered card, ESC to close, click-outside to dismiss.
- `Input` — text input matching the dark theme.

Layout components live in `views/`:
- `AppLayout` — the four-column shell
- `HoldRail` — leftmost strip
- `ChannelSidebar` — second column
- `ChatView` — main column with header, list, composer
- `MemberSidebar` — rightmost column
- `UserPanel` — bottom-left of the channel sidebar
- `OnboardingScreen` — first-launch flow
- `CreateHoldModal`, `JoinHoldModal`, `SettingsModal`

## Avatar color hashing

For consistent fake "user colors," hash the user id to a hue:

```ts
function avatarColor(userId: string): string {
  let hash = 0;
  for (const c of userId) hash = (hash * 31 + c.charCodeAt(0)) | 0;
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 65% 50%)`;
}
```

Use as an inline style on the avatar background. Initials should be white
text — the lightness of 50% keeps contrast adequate across the hue range.

## Reference

The product follows familiar real-time chat patterns: a vertical rail for
top-level containers, a channel sidebar, a chat surface, and a member list.
We're not inventing a new chat paradigm — we're delivering one with different
infrastructure underneath. Aim for a clean, distinctive feel; don't pixel-copy
any existing product.
