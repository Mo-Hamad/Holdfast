import { useStore } from '../state/store.ts';
import { KeyIcon, GateIcon } from './icons.tsx';

interface Props {
  onAddHold: () => void;
  onOpenSettings: () => void;
  onToggleHosting: () => void;
  hosting: boolean;
}

// Fortress-shield shape: 3 battlements at top, V-point at bottom.
const SHIELD = 'M3,12 L3,4 L11,4 L11,12 L16,12 L16,4 L24,4 L24,12 L29,12 L29,4 L37,4 L37,12 L37,30 L20,38 L3,30 Z';

interface ShieldButtonProps {
  label: string;
  title: string;
  active?: boolean;
  onClick: () => void;
}

function ShieldButton({ label, title, active = false, onClick }: ShieldButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="relative w-12 h-12 flex items-center justify-center flex-shrink-0 group"
      style={{ paddingBottom: '4px' }}
    >
      <svg viewBox="0 0 40 40" width="48" height="48" className="absolute inset-0" aria-hidden>
        <path
          d={SHIELD}
          strokeWidth="1"
          strokeLinejoin="miter"
          className={
            active
              ? 'fill-accent stroke-accent-hover'
              : 'fill-surface stroke-border group-hover:fill-accent group-hover:stroke-accent-hover'
          }
        />
      </svg>
      <span
        className={`relative z-10 text-xs font-bold leading-none select-none transition-colors
          ${active ? 'text-white' : 'text-secondary group-hover:text-white'}`}
      >
        {label}
      </span>
    </button>
  );
}

// Rail icon button — used for hosting/settings
function RailButton({
  onClick,
  title,
  active = false,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex items-center justify-center rounded transition-colors flex-shrink-0 ${
        active
          ? 'text-accent bg-accent/10 hover:bg-accent/20'
          : 'text-muted hover:text-primary hover:bg-surface'
      }`}
    >
      {children}
    </button>
  );
}

export default function Rail({ onAddHold, onOpenSettings, onToggleHosting, hosting }: Props) {
  const holds = useStore((s) => s.holds);
  const currentHoldId = useStore((s) => s.currentHoldId);
  const selectHold = useStore((s) => s.selectHold);

  return (
    <div className="h-rail bg-base flex flex-row items-center px-3 gap-2 border-b border-border flex-shrink-0 relative">

      {/* Hold shields */}
      {holds.map((hold) => (
        <ShieldButton
          key={hold.id}
          label={hold.icon ?? hold.name.slice(0, 2).toUpperCase()}
          title={hold.name}
          active={currentHoldId === hold.id}
          onClick={() => selectHold(hold.id)}
        />
      ))}

      {/* Separator between holds and actions */}
      {holds.length > 0 && (
        <div className="w-px h-6 bg-border flex-shrink-0 mx-1" />
      )}

      <div className="flex-1" />

      {/* Right-side action buttons */}
      <div className="flex items-center gap-1 pr-1">
        <RailButton
          onClick={onToggleHosting}
          title={hosting ? 'Managing gates — click to configure' : 'Raise the Banner — start hosting'}
          active={hosting}
        >
          <GateIcon size={18} open={hosting} />
        </RailButton>

        <RailButton onClick={onOpenSettings} title="Steward's Quarters — settings">
          <KeyIcon size={18} />
        </RailButton>
      </div>

      {/* Add-hold pennant banner — hanging from right edge */}
      <div className="flex items-center pl-1">
        <button
          onClick={onAddHold}
          title="Create or join a hold"
          className="flex items-start"
        >
          <svg viewBox="0 0 56 84" width="34" height="52" aria-hidden>
            {/* Banner body */}
            <path
              d="M0,0 L56,0 L56,54 L40,74 L28,54 L16,74 L0,54 Z"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="#c8922a"
              stroke="#e0a83a"
            />
            {/* Inner border */}
            <path
              d="M5,5 L51,5 L51,51 L38,69 L28,51 L18,69 L5,51 Z"
              fill="none"
              strokeWidth="1"
              strokeLinejoin="round"
              stroke="#1c1710"
              opacity="0.4"
            />
            {/* Top stripe ticks */}
            {[10, 18, 26, 34, 42].map((x) => (
              <rect key={x} x={x} y={0} width="6" height="5" fill="#1c1710" opacity="0.35" />
            ))}
            {/* Fort+Plus logo — battlemented wall with a cruciform opening.
                 The cross-shaped cut IS the plus sign, so both marks share one shape. */}
            <path
              fillRule="evenodd"
              d="
                M13,38 L13,12 L20,12 L20,19 L24,19 L24,12
                L32,12 L32,19 L36,19 L36,12 L43,12 L43,38 Z
                M25,21 L31,21 L31,26 L37,26 L37,31
                L31,31 L31,36 L25,36 L25,31 L19,31 L19,26 L25,26 Z
              "
              fill="#1c1710"
              opacity="0.85"
            />
          </svg>
        </button>
      </div>

    </div>
  );
}
