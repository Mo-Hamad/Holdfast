import { useState } from 'react';
import { useStore } from '../state/store.ts';
import { KeyIcon, XIcon } from './icons.tsx';

interface Props {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: Props) {
  const currentUser = useStore((s) => s.currentUser);
  const setDisplayName = useStore((s) => s.setDisplayName);

  const [name, setName] = useState(currentUser?.displayName ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === currentUser?.displayName) return;
    setSaving(true);
    try {
      await setDisplayName(trimmed);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  const initials = (currentUser?.displayName ?? 'U').slice(0, 2).toUpperCase();

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-overlay border border-border rounded-lg w-80 flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <KeyIcon size={18} className="text-accent flex-shrink-0" />
          <h2 className="text-primary font-semibold text-sm flex-1">Steward's Quarters</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary transition-colors"
          >
            <XIcon size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Avatar + profile */}
          <section className="flex flex-col gap-3">
            <p className="text-muted text-xs uppercase font-semibold tracking-wider">Profile</p>

            <div className="flex items-center gap-4">
              {/* Avatar preview */}
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-lg font-bold text-white flex-shrink-0 ring-2 ring-accent/30">
                {initials}
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="text-secondary text-xs">Display name</p>
                <p className="text-muted text-xs truncate font-mono">{currentUser?.userId.slice(0, 16)}…</p>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') void handleSave(); }}
                placeholder="Your name"
                maxLength={32}
                className="flex-1 bg-surface text-primary placeholder:text-muted rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent border border-border"
              />
              <button
                onClick={() => void handleSave()}
                disabled={!name.trim() || name.trim() === currentUser?.displayName || saving}
                className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent-hover disabled:opacity-40 transition-colors flex-shrink-0"
              >
                {saving ? '…' : saved ? '✓' : 'Save'}
              </button>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Identity */}
          <section className="flex flex-col gap-2">
            <p className="text-muted text-xs uppercase font-semibold tracking-wider">Identity Key</p>
            <p className="text-muted text-xs font-mono break-all leading-relaxed">
              {currentUser?.pubkey.slice(0, 48) ?? '—'}…
            </p>
            <p className="text-muted text-xs opacity-60">
              Your key is stored locally and never leaves this device.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-muted text-xs opacity-50">Holdfast — pre-alpha</p>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-secondary hover:text-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
