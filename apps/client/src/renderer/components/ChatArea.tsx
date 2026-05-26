import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore, selectCurrentMessages, selectCurrentMembers, selectCurrentChannel } from '../state/store.ts';
import type { ConnectionStatus } from '../client/IHoldClient.ts';
import Mascot from './Mascot.tsx';

function ConnectionBanner({ status }: { status: ConnectionStatus | null }) {
  if (!status || status.state === 'connected') return null;

  const config = {
    offline:      { text: 'You are offline',         bg: 'bg-muted' },
    connecting:   { text: 'Connecting…',             bg: 'bg-accent-muted' },
    reconnecting: { text: `Reconnecting… (attempt ${(status as Extract<ConnectionStatus, { state: 'reconnecting' }>).attempt})`, bg: 'bg-accent-muted' },
    error:        { text: (status as Extract<ConnectionStatus, { state: 'error' }>).message, bg: 'bg-danger' },
  }[status.state];

  return (
    <div className={`${config.bg} text-white text-xs text-center py-1.5 px-4`}>
      {config.text}
    </div>
  );
}

export default function ChatArea() {
  const channel = useStore(selectCurrentChannel);
  const messages = useStore(useShallow(selectCurrentMessages));
  const members = useStore(useShallow(selectCurrentMembers));
  const sendMessage = useStore((s) => s.sendMessage);
  const connection = useStore((s) =>
    s.currentHoldId ? (s.connectionByHold[s.currentHoldId] ?? null) : null
  );

  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Build a quick-lookup table: userId -> display name
  const nameByUserId = Object.fromEntries(members.map((m) => [m.userId, m.displayName]));

  // Scroll to the bottom whenever the message list changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    void sendMessage(text);
  }

  if (!channel) {
    return (
      <div className="flex-1 bg-elevated flex flex-col items-center justify-center gap-4">
        <Mascot size={140} />
        <div className="flex flex-col items-center gap-1">
          <p className="text-primary font-semibold text-sm">Your Hold Awaits</p>
          <p className="text-muted text-xs">Select a channel to enter the fray</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-elevated flex flex-col">

      {/* Channel header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="text-muted">#</span>
        <h2 className="text-primary font-semibold text-sm">{channel.name}</h2>
      </div>

      <ConnectionBanner status={connection} />

      {/* Message list */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 py-4 gap-1">
        {messages.length === 0 && (
          <p className="text-muted text-sm m-auto">No messages yet. Say something!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="py-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-sm font-semibold">
                {nameByUserId[msg.authorId] ?? 'Unknown'}
              </span>
              <span className="text-muted text-xs">
                {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-secondary text-sm">{msg.content}</p>
          </div>
        ))}
        {/* Invisible element we scroll to when new messages arrive */}
        <div ref={bottomRef} />
      </div>

      {/* Input box */}
      <div className="px-4 py-3 border-t border-border">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder={`Message #${channel.name}`}
          className="w-full bg-overlay text-primary placeholder:text-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

    </div>
  );
}
