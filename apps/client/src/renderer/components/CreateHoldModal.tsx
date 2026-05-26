import { useState } from 'react';
import { useStore } from '../state/store.ts';

interface Props {
  onClose: () => void;
}

export default function CreateHoldModal({ onClose }: Props) {
  const createHold = useStore((s) => s.createHold);
  const joinHoldByInvite = useStore((s) => s.joinHoldByInvite);
  const selectHold = useStore((s) => s.selectHold);

  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  function switchMode(next: 'create' | 'join') {
    setMode(next);
    setValue('');
  }

  async function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const hold = mode === 'create'
        ? await createHold(trimmed)
        : await joinHoldByInvite(trimmed);
      selectHold(hold.id);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  const isCreate = mode === 'create';

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-overlay rounded w-72 p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-primary font-semibold text-sm">
          {isCreate ? 'Create a Hold' : 'Join a Hold'}
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void handleSubmit(); }}
          placeholder={isCreate ? 'Hold name' : 'Invite URL'}
          autoFocus
          className="bg-surface text-primary placeholder:text-muted rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={() => switchMode(isCreate ? 'join' : 'create')}
            className="text-xs text-muted hover:text-secondary transition-colors"
          >
            {isCreate ? 'Have an invite? Join instead' : 'Create a new hold instead'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm text-secondary hover:text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => void handleSubmit()}
              disabled={!value.trim() || loading}
              className="px-3 py-1.5 text-sm bg-accent text-white rounded hover:bg-accent-hover disabled:opacity-40 transition-colors"
            >
              {loading ? (isCreate ? 'Creating…' : 'Joining…') : isCreate ? 'Create' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
