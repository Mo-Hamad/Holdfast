import { useStore } from '../state/store.ts';

interface Props {
  onAddHold: () => void;
}

export default function Rail({ onAddHold }: Props) {
  const holds = useStore((s) => s.holds);
  const currentHoldId = useStore((s) => s.currentHoldId);
  const selectHold = useStore((s) => s.selectHold);

  return (
    <div className="w-rail bg-base flex-shrink-0 flex flex-col items-center py-3 gap-2">

      {/* Add hold button — top of the rail */}
      <button
        onClick={onAddHold}
        title="Create or join a hold"
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface text-secondary hover:bg-accent hover:text-white hover:rounded-xl transition-all text-xl"
      >
        +
      </button>

      {holds.map((hold) => (
        <button
          key={hold.id}
          onClick={() => selectHold(hold.id)}
          title={hold.name}
          className={`w-12 h-12 flex items-center justify-center text-sm font-semibold transition-all
            ${currentHoldId === hold.id
              ? 'bg-accent text-white rounded-xl'
              : 'bg-surface text-secondary rounded-2xl hover:bg-accent hover:text-white hover:rounded-xl'
            }`}
        >
          {hold.icon ?? hold.name.slice(0, 2).toUpperCase()}
        </button>
      ))}

    </div>
  );
}
