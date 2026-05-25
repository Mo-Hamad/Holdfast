import { useShallow } from 'zustand/react/shallow';
import { useStore, selectCurrentHold } from '../state/store.ts';

export default function ChannelSidebar() {
  const currentHold = useStore(selectCurrentHold);
  const channels = useStore(useShallow((s) => s.currentHoldId ? (s.channelsByHold[s.currentHoldId] ?? []) : []));
  const currentChannelId = useStore((s) => s.currentChannelId);
  const selectChannel = useStore((s) => s.selectChannel);

  if (!currentHold) {
    return (
      <div className="w-sidebar bg-surface flex-shrink-0 flex items-center justify-center">
        <p className="text-muted text-sm">Select a hold</p>
      </div>
    );
  }

  return (
    <div className="w-sidebar bg-surface flex-shrink-0 flex flex-col">

      {/* Hold name at the top */}
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-primary font-semibold text-sm">{currentHold.name}</h2>
      </div>

      {/* Channel list */}
      <div className="flex flex-col py-2">
        <p className="px-4 py-1 text-muted text-xs uppercase font-semibold tracking-wide">
          Channels
        </p>
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => selectChannel(channel.id)}
            className={`flex items-center gap-1.5 mx-2 px-2 py-1 rounded text-sm transition-colors
              ${currentChannelId === channel.id
                ? 'bg-elevated text-primary'
                : 'text-secondary hover:bg-elevated hover:text-primary'
              }`}
          >
            <span className="text-muted">#</span>
            {channel.name}
          </button>
        ))}
      </div>

    </div>
  );
}
