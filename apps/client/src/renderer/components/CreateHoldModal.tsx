import { useState } from 'react';
import { useStore } from '../state/store.ts';

interface Props {
  onClose: () => void;
}

export default function CreateHoldModal({ onClose }: Props) {
  const createHold = useStore((s) => s.createHold);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    await createHold(trimmed);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-overlay rounded w-72 p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-primary font-semibold text-sm">Create a Hold</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void handleCreate(); }}
          placeholder="Hold name"
          autoFocus
          className="bg-surface text-primary placeholder:text-muted rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-secondary hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => void handleCreate()}
            disabled={!name.trim() || loading}
            className="px-3 py-1.5 text-sm bg-accent text-white rounded hover:bg-accent-hover disabled:opacity-40 transition-colors"
          >
            {loading ? 'Creating…' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
