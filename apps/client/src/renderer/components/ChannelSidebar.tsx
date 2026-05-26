import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore, selectCurrentHold } from '../state/store.ts';
import { ChevronIcon, HashIcon, GearIcon, MicIcon, HeadphonesIcon, PlusIcon } from './icons.tsx';

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}

export default function ChannelSidebar({ collapsed, onToggle, onOpenSettings }: Props) {
  const currentHold = useStore(selectCurrentHold);
  const currentHoldId = useStore((s) => s.currentHoldId);
  const channels = useStore(useShallow((s) =>
    s.currentHoldId ? (s.channelsByHold[s.currentHoldId] ?? []) : []
  ));
  const currentChannelId = useStore((s) => s.currentChannelId);
  const selectChannel = useStore((s) => s.selectChannel);
  const currentUser = useStore((s) => s.currentUser);
  const createChannel = useStore((s) => s.createChannel);

  const [micMuted, setMicMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);
  const [addingChannel, setAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [creating, setCreating] = useState(false);

  async function handleAddChannel(e: React.FormEvent) {
    e.preventDefault();
    const name = newChannelName.trim();
    if (!name || !currentHoldId || creating) return;
    setCreating(true);
    try {
      const channel = await createChannel(currentHoldId, name);
      setNewChannelName('');
      setAddingChannel(false);
      selectChannel(channel.id);
    } finally {
      setCreating(false);
    }
  }

  const initials = (currentUser?.displayName ?? 'U').slice(0, 2).toUpperCase();
  const displayName = currentUser?.displayName ?? 'You';

  if (collapsed) {
    return (
      <div className="w-6 bg-surface flex-shrink-0 flex flex-col items-center pt-3 border-r border-border">
        <button
          onClick={onToggle}
          title="Expand sidebar"
          className="text-muted hover:text-primary transition-colors"
        >
          <ChevronIcon direction="right" size={14} />
        </button>
      </div>
    );
  }

  if (!currentHold) {
    return (
      <div className="w-sidebar bg-surface flex-shrink-0 flex flex-col border-r border-border">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted text-sm">Select a hold</p>
        </div>
        {/* User panel even when no hold selected */}
        <UserPanel
          initials={initials}
          displayName={displayName}
          micMuted={micMuted}
          deafened={deafened}
          onToggleMic={() => setMicMuted((m) => !m)}
          onToggleDeafen={() => setDeafened((d) => !d)}
          onOpenSettings={onOpenSettings}
        />
      </div>
    );
  }

  return (
    <div className="w-sidebar bg-surface flex-shrink-0 flex flex-col border-r border-border">

      {/* Hold name header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
        <h2 className="text-primary font-semibold text-sm truncate flex-1">{currentHold.name}</h2>
        <button
          onClick={onToggle}
          title="Collapse sidebar"
          className="text-muted hover:text-primary transition-colors ml-2"
        >
          <ChevronIcon direction="left" size={14} />
        </button>
      </div>

      {/* Channel list */}
      <div className="flex-1 flex flex-col py-2 overflow-y-auto min-h-0">

        {/* Section header */}
        <div className="flex items-center justify-between px-4 py-1 group">
          <p className="text-muted text-xs uppercase font-semibold tracking-wide">
            Text Channels
          </p>
          <button
            onClick={() => setAddingChannel(true)}
            title="Add channel"
            className="text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        {/* Channel rows */}
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => selectChannel(channel.id)}
            className={`flex items-center gap-2 mx-2 px-2 py-1.5 rounded text-sm transition-colors
              ${currentChannelId === channel.id
                ? 'bg-elevated text-primary'
                : 'text-secondary hover:bg-elevated hover:text-primary'
              }`}
          >
            <HashIcon
              size={14}
              className={currentChannelId === channel.id ? 'text-accent' : 'text-muted'}
            />
            {channel.name}
          </button>
        ))}

        {/* Inline new-channel form */}
        {addingChannel && (
          <form onSubmit={(e) => void handleAddChannel(e)} className="mx-2 mt-1 px-2">
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="new-channel"
              autoFocus
              disabled={creating}
              maxLength={32}
              className="w-full bg-elevated text-primary placeholder:text-muted text-sm px-2 py-1.5 rounded outline-none focus:ring-1 focus:ring-accent border border-border"
              onBlur={() => {
                if (!newChannelName.trim()) setAddingChannel(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setAddingChannel(false);
                  setNewChannelName('');
                }
              }}
            />
            <p className="text-muted text-xs mt-1 px-1 opacity-70">Enter to confirm · Esc to cancel</p>
          </form>
        )}

      </div>

      {/* User panel at bottom */}
      <UserPanel
        initials={initials}
        displayName={displayName}
        micMuted={micMuted}
        deafened={deafened}
        onToggleMic={() => setMicMuted((m) => !m)}
        onToggleDeafen={() => setDeafened((d) => !d)}
        onOpenSettings={onOpenSettings}
      />
    </div>
  );
}

// Reusable user panel at the bottom of the sidebar
function UserPanel({
  initials,
  displayName,
  micMuted,
  deafened,
  onToggleMic,
  onToggleDeafen,
  onOpenSettings,
}: {
  initials: string;
  displayName: string;
  micMuted: boolean;
  deafened: boolean;
  onToggleMic: () => void;
  onToggleDeafen: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="border-t border-border flex items-center px-2 py-2 gap-2 flex-shrink-0 bg-base/40">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        {initials}
      </div>
      {/* Name */}
      <span className="text-primary text-xs font-medium truncate flex-1">{displayName}</span>
      {/* Controls */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onToggleMic}
          title={micMuted ? 'Unmute microphone' : 'Mute microphone'}
          className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
            micMuted ? 'text-danger hover:text-danger/80' : 'text-muted hover:text-primary'
          }`}
        >
          <MicIcon size={14} muted={micMuted} />
        </button>
        <button
          onClick={onToggleDeafen}
          title={deafened ? 'Undeafen' : 'Deafen'}
          className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
            deafened ? 'text-danger hover:text-danger/80' : 'text-muted hover:text-primary'
          }`}
        >
          <HeadphonesIcon size={14} />
        </button>
        <button
          onClick={onOpenSettings}
          title="Steward's Quarters — settings"
          className="w-7 h-7 flex items-center justify-center rounded text-muted hover:text-primary transition-colors"
        >
          <GearIcon size={14} />
        </button>
      </div>
    </div>
  );
}
