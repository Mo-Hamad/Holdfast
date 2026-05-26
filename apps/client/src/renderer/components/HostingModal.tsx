import { GateIcon, XIcon, LinkIcon } from './icons.tsx';
import { useStore, selectCurrentHold } from '../state/store.ts';
import { useState } from 'react';

interface Props {
  hosting: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// Detailed portcullis gate — iron bars lower into the arch when closed,
// rise above it when hosting (open). Stone walls drawn on top of the
// portcullis group so raised bars hide naturally behind the wall.
function PortcullisGate({ hosting }: { hosting: boolean }) {
  // Shift portcullis up by 93 SVG units when open so bar-bottoms land
  // right at the arch peak and only spike-tips remain visible.
  const pcY = hosting ? -93 : 0;

  const stone   = '#46402e';
  const merlon  = '#4e4838';
  const mortar  = '#1c1610';
  const iron    = '#2e2820';
  const ironEdge = '#4a4030';
  const chainCol = '#7a6850';

  // Six vertical bar x-positions inside the 48–112 opening (64 px wide)
  const bars = [51, 61, 71, 81, 91, 101];
  // Horizontal crossbar y-positions (first one overlaps header slightly)
  const hBars = [60, 73, 86, 99, 112, 125, 138];

  return (
    <svg viewBox="0 0 160 145" width={216} height={196} aria-hidden>

      {/* ── 1. Dark arch interior ── */}
      <path d="M48,145 L48,64 Q80,36 112,64 L112,145 Z" fill="#0d0904" />

      {/* ── 2. Portcullis (rendered under walls so raised bars hide) ── */}
      <g transform={`translate(0,${pcY})`}>
        {/* Top header bar */}
        <rect x="48" y="38" width="64" height="6" fill={iron} stroke={ironEdge} strokeWidth="0.8" />
        {/* Rivets on header */}
        {[55, 65, 75, 85, 95, 105].map((x) => (
          <circle key={x} cx={x} cy="41" r="1.4" fill={ironEdge} />
        ))}
        {/* Vertical bars */}
        {bars.map((x) => (
          <rect key={x} x={x} y="38" width="5" height="107" fill={iron} stroke={ironEdge} strokeWidth="0.5" />
        ))}
        {/* Sheen highlight down each bar */}
        {bars.map((x) => (
          <rect key={x} x={x + 0.5} y="45" width="1.2" height="97" fill={ironEdge} opacity="0.55" />
        ))}
        {/* Horizontal crossbars */}
        {hBars.map((y) => (
          <rect key={y} x="50" y={y} width="60" height="3.5" fill={iron} stroke={ironEdge} strokeWidth="0.5" />
        ))}
        {/* Bottom spikes */}
        {bars.map((x) => (
          <polygon key={x} points={`${x},145 ${x + 5},145 ${x + 2.5},155`} fill={iron} />
        ))}
      </g>

      {/* ── 3. Stone walls — drawn on top so raised portcullis hides ── */}
      <rect x="0"   y="20"  width="48"  height="125" fill={stone} />
      <rect x="112" y="20"  width="48"  height="125" fill={stone} />
      <rect x="0"   y="0"   width="160" height="42"  fill={stone} />

      {/* Mortar lines — left pier */}
      <g stroke={mortar} strokeWidth="0.65" fill="none" opacity="0.72">
        <line x1="0"  y1="34"  x2="48" y2="34"  /> <line x1="0"  y1="48"  x2="48" y2="48"  />
        <line x1="0"  y1="62"  x2="48" y2="62"  /> <line x1="0"  y1="76"  x2="48" y2="76"  />
        <line x1="0"  y1="90"  x2="48" y2="90"  /> <line x1="0"  y1="104" x2="48" y2="104" />
        <line x1="0"  y1="118" x2="48" y2="118" /> <line x1="0"  y1="132" x2="48" y2="132" />
        <line x1="8"  y1="20"  x2="8"  y2="34"  /> <line x1="26" y1="20"  x2="26" y2="34"  />
        <line x1="16" y1="34"  x2="16" y2="48"  /> <line x1="38" y1="34"  x2="38" y2="48"  />
        <line x1="8"  y1="48"  x2="8"  y2="62"  /> <line x1="30" y1="48"  x2="30" y2="62"  />
        <line x1="16" y1="62"  x2="16" y2="76"  /> <line x1="38" y1="62"  x2="38" y2="76"  />
        <line x1="8"  y1="76"  x2="8"  y2="90"  /> <line x1="30" y1="76"  x2="30" y2="90"  />
        <line x1="16" y1="90"  x2="16" y2="104" /> <line x1="40" y1="90"  x2="40" y2="104" />
        <line x1="8"  y1="104" x2="8"  y2="118" /> <line x1="28" y1="104" x2="28" y2="118" />
        <line x1="16" y1="118" x2="16" y2="132" /> <line x1="40" y1="118" x2="40" y2="132" />
        <line x1="8"  y1="132" x2="8"  y2="145" /> <line x1="30" y1="132" x2="30" y2="145" />
      </g>

      {/* Mortar lines — right pier */}
      <g stroke={mortar} strokeWidth="0.65" fill="none" opacity="0.72">
        <line x1="112" y1="34"  x2="160" y2="34"  /> <line x1="112" y1="48"  x2="160" y2="48"  />
        <line x1="112" y1="62"  x2="160" y2="62"  /> <line x1="112" y1="76"  x2="160" y2="76"  />
        <line x1="112" y1="90"  x2="160" y2="90"  /> <line x1="112" y1="104" x2="160" y2="104" />
        <line x1="112" y1="118" x2="160" y2="118" /> <line x1="112" y1="132" x2="160" y2="132" />
        <line x1="120" y1="20"  x2="120" y2="34"  /> <line x1="140" y1="20"  x2="140" y2="34"  />
        <line x1="128" y1="34"  x2="128" y2="48"  /> <line x1="150" y1="34"  x2="150" y2="48"  />
        <line x1="120" y1="48"  x2="120" y2="62"  /> <line x1="144" y1="48"  x2="144" y2="62"  />
        <line x1="128" y1="62"  x2="128" y2="76"  /> <line x1="152" y1="62"  x2="152" y2="76"  />
        <line x1="120" y1="76"  x2="120" y2="90"  /> <line x1="144" y1="76"  x2="144" y2="90"  />
        <line x1="128" y1="90"  x2="128" y2="104" /> <line x1="150" y1="90"  x2="150" y2="104" />
        <line x1="120" y1="104" x2="120" y2="118" /> <line x1="144" y1="104" x2="144" y2="118" />
        <line x1="128" y1="118" x2="128" y2="132" /> <line x1="152" y1="118" x2="152" y2="132" />
        <line x1="120" y1="132" x2="120" y2="145" /> <line x1="144" y1="132" x2="144" y2="145" />
      </g>

      {/* Mortar lines — top wall */}
      <g stroke={mortar} strokeWidth="0.65" fill="none" opacity="0.72">
        <line x1="0" y1="14" x2="160" y2="14" /> <line x1="0" y1="28" x2="160" y2="28" />
        <line x1="10" y1="0"  x2="10"  y2="14" /> <line x1="24" y1="0"  x2="24"  y2="14" />
        <line x1="40" y1="0"  x2="40"  y2="14" /> <line x1="60" y1="0"  x2="60"  y2="14" />
        <line x1="74" y1="0"  x2="74"  y2="14" /> <line x1="88" y1="0"  x2="88"  y2="14" />
        <line x1="100" y1="0" x2="100" y2="14" /> <line x1="118" y1="0" x2="118" y2="14" />
        <line x1="134" y1="0" x2="134" y2="14" /> <line x1="150" y1="0" x2="150" y2="14" />
        <line x1="6"  y1="14" x2="6"   y2="28" /> <line x1="18" y1="14" x2="18"  y2="28" />
        <line x1="32" y1="14" x2="32"  y2="28" /> <line x1="50" y1="14" x2="50"  y2="28" />
        <line x1="68" y1="14" x2="68"  y2="28" /> <line x1="82" y1="14" x2="82"  y2="28" />
        <line x1="96" y1="14" x2="96"  y2="28" /> <line x1="112" y1="14" x2="112" y2="28" />
        <line x1="126" y1="14" x2="126" y2="28" /> <line x1="142" y1="14" x2="142" y2="28" />
        <line x1="156" y1="14" x2="156" y2="28" />
        <line x1="10" y1="28" x2="10"  y2="42" /> <line x1="26" y1="28" x2="26"  y2="42" />
        <line x1="44" y1="28" x2="44"  y2="42" /> <line x1="62" y1="28" x2="62"  y2="42" />
        <line x1="78" y1="28" x2="78"  y2="42" /> <line x1="94" y1="28" x2="94"  y2="42" />
        <line x1="116" y1="28" x2="116" y2="42" /> <line x1="132" y1="28" x2="132" y2="42" />
        <line x1="148" y1="28" x2="148" y2="42" />
      </g>

      {/* Top edge sun-highlight */}
      <line x1="0" y1="0.5" x2="160" y2="0.5" stroke="#9a9080" strokeWidth="1" opacity="0.4" />

      {/* Arch inner-edge shadow */}
      <rect x="44" y="64" width="6" height="81" fill={mortar} opacity="0.4" />
      <rect x="110" y="64" width="6" height="81" fill={mortar} opacity="0.4" />

      {/* ── 4. Arch voussoir stones ── */}
      {/* Thick mortar bed */}
      <path d="M48,64 Q80,36 112,64" fill="none" stroke={mortar} strokeWidth="9" />
      {/* Stone face */}
      <path d="M48,64 Q80,36 112,64" fill="none" stroke={stone} strokeWidth="6.5" />
      {/* Top-lit highlight */}
      <path d="M48,64 Q80,36 112,64" fill="none" stroke="#7a7060" strokeWidth="0.9" opacity="0.55" />
      {/* Inner edge shadow */}
      <path d="M48,64 Q80,36 112,64" fill="none" stroke="#0d0904" strokeWidth="1.8" />
      {/* Keystone centre mark */}
      <path d="M75,44 Q80,39 85,44" fill="none" stroke="#9a9080" strokeWidth="1.2" opacity="0.45" />

      {/* ── 5. Merlons ── */}
      {[2, 16, 30, 114, 128, 142].map((x) => (
        <g key={x}>
          <rect x={x} y={-2} width="12" height="22" rx="1.5" fill={merlon} stroke={mortar} strokeWidth="0.9" />
          <line x1={x + 0.5} y1="0" x2={x + 11.5} y2="0" stroke="#9a9080" strokeWidth="0.8" opacity="0.45" />
          <rect x={x + 9} y="0" width="3" height="22" fill={mortar} opacity="0.2" />
        </g>
      ))}

      {/* ── 6. Chain slots in wall + visible links ── */}
      {/* Slot openings */}
      <rect x="55" y="0"  width="5" height="42" fill="#0d0904" opacity="0.85" />
      <rect x="100" y="0" width="5" height="42" fill="#0d0904" opacity="0.85" />
      {/* Chain links (always visible in slots) */}
      {[2, 10, 18, 26, 34].map((y) => (
        <g key={y}>
          <rect x="55.5" y={y}    width="4" height="6" rx="1.3" fill="none" stroke={chainCol} strokeWidth="1.3" />
          <rect x="100.5" y={y}   width="4" height="6" rx="1.3" fill="none" stroke={chainCol} strokeWidth="1.3" />
        </g>
      ))}

      {/* ── 7. Ambient effects ── */}
      {/* Torchlight glow at base when gates are open */}
      {hosting && (
        <>
          <ellipse cx="80" cy="142" rx="30" ry="4" fill="#c8922a" opacity="0.09" />
          <ellipse cx="80" cy="142" rx="16" ry="2" fill="#c8922a" opacity="0.08" />
        </>
      )}
      {/* Shadow pool at base when closed */}
      {!hosting && (
        <ellipse cx="80" cy="142" rx="26" ry="3" fill="#000" opacity="0.3" />
      )}
    </svg>
  );
}

export default function HostingModal({ hosting, onToggle, onClose }: Props) {
  const currentHold = useStore(selectCurrentHold);
  const generateInvite = useStore((s) => s.generateInvite);
  const currentHoldId = useStore((s) => s.currentHoldId);

  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  async function handleCopyInvite() {
    if (!currentHoldId) return;
    setGenerating(true);
    try {
      const url = await generateInvite(currentHoldId);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } finally {
      setGenerating(false);
    }
  }

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
          <GateIcon size={18} open={hosting} className={hosting ? 'text-accent' : 'text-muted'} />
          <h2 className="text-primary font-semibold text-sm flex-1">Man the Gates</h2>
          <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
            <XIcon size={16} />
          </button>
        </div>

        <div className="px-5 pt-5 pb-4 flex flex-col items-center gap-4">

          {/* Gate visual */}
          <PortcullisGate hosting={hosting} />

          {/* Status */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${hosting ? 'bg-online' : 'bg-offline'}`} />
              <span className={`font-semibold text-sm ${hosting ? 'text-accent' : 'text-muted'}`}>
                {hosting ? 'Gates are open' : 'Gates are closed'}
              </span>
            </div>
            {currentHold && (
              <p className="text-muted text-xs">{currentHold.name}</p>
            )}
          </div>

          {/* Info */}
          <p className="text-muted text-xs text-center leading-relaxed">
            {hosting
              ? 'Your hold is running. Members with an invite can connect directly to you.'
              : 'Raise your banner to open the hold. Members with an invite link can join.'}
          </p>

          {/* Toggle */}
          <button
            onClick={onToggle}
            className={`w-full py-2.5 text-sm font-medium rounded transition-colors ${
              hosting
                ? 'bg-danger/20 text-danger hover:bg-danger/30 border border-danger/30'
                : 'bg-accent text-white hover:bg-accent-hover'
            }`}
          >
            {hosting ? 'Lower the Portcullis' : 'Raise the Portcullis'}
          </button>

          {/* Invite link */}
          {currentHoldId && (
            <button
              onClick={() => void handleCopyInvite()}
              disabled={generating}
              className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors disabled:opacity-50 pb-1"
            >
              <LinkIcon size={14} />
              {copied ? 'Invite copied!' : generating ? 'Forging link…' : 'Copy invite link'}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
