// Custom SVG icon library for Holdfast.
// All icons use currentColor so they inherit from parent text classes.

interface IconProps {
  className?: string;
  size?: number;
}

// Medieval skeleton key — Settings / Steward's Quarters
export function KeyIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <circle cx="7.5" cy="7.5" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
      <path d="M11 11L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 15L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Raised or lowered pennant on a pole — Hosting toggle (legacy)
export function FlagIcon({ className = '', size = 16, raised = false }: IconProps & { raised?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M5 21V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {raised ? (
        <path d="M5 4L19 8L5 13Z" fill="currentColor" />
      ) : (
        <path d="M5 13L19 16L5 20Z" fill="currentColor" opacity="0.45" />
      )}
    </svg>
  );
}

// Wooden castle gate — Hosting toggle. Open when hosting, closed otherwise.
export function GateIcon({ className = '', size = 16, open = false }: IconProps & { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      {/* Stone arch frame */}
      <path
        d="M3 21V10a9 9 0 0118 0v11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ground line */}
      <line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {open ? (
        <>
          {/* Left door — swung outward (trapezoid) */}
          <path
            d="M5 21 L5 13 L8 11.5 L8 21 Z"
            fill="currentColor"
            opacity="0.75"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Right door — swung outward (trapezoid) */}
          <path
            d="M19 21 L19 13 L16 11.5 L16 21 Z"
            fill="currentColor"
            opacity="0.75"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Plank seams */}
          <line x1="6.5" y1="12" x2="6.5" y2="21" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <line x1="17.5" y1="12" x2="17.5" y2="21" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
        </>
      ) : (
        <>
          {/* Closed doors — meeting in middle, filling the archway */}
          <path
            d="M5 21 L5 11 L11.5 11 L11.5 21 Z"
            fill="currentColor"
            opacity="0.75"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <path
            d="M19 21 L19 11 L12.5 11 L12.5 21 Z"
            fill="currentColor"
            opacity="0.75"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Vertical plank seams */}
          <line x1="7.5" y1="11" x2="7.5" y2="21" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="9.5" y1="11" x2="9.5" y2="21" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="14.5" y1="11" x2="14.5" y2="21" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="16.5" y1="11" x2="16.5" y2="21" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          {/* Iron horizontal bands */}
          <line x1="5" y1="14.5" x2="19" y2="14.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.2" />
          {/* Iron studs at center seam */}
          <circle cx="12" cy="14.5" r="0.7" fill="currentColor" />
          <circle cx="12" cy="18" r="0.7" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

// Cog/gear — Settings (mechanical)
export function GearIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Microphone — voice mute toggle
export function MicIcon({ className = '', size = 16, muted = false }: IconProps & { muted?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 10v1a7 7 0 0014 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {muted && (
        <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

// Headphones — deafen toggle
export function HeadphonesIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M3 18v-6a9 9 0 0118 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" fill="currentColor" />
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" fill="currentColor" />
    </svg>
  );
}

// Chain link — Copy invite
export function LinkIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Spyglass / magnifying glass — Search
export function SearchIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Arrow — Send message
export function SendIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" />
    </svg>
  );
}

// Plus — Add channel / add hold
export function PlusIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Chevron — collapse/expand panels
export function ChevronIcon({ className = '', size = 16, direction = 'right' }: IconProps & { direction?: 'left' | 'right' | 'down' | 'up' }) {
  const d = {
    left:  'M15 18L9 12L15 6',
    right: 'M9 18L15 12L9 6',
    down:  'M6 9L12 15L18 9',
    up:    'M18 15L12 9L6 15',
  }[direction];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hash — text channel indicator
export function HashIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="3" x2="8" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="3" x2="14" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// X — close modals
export function XIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Pin — pinned messages
export function PinIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M12 17v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24z"
        fill="currentColor"
      />
    </svg>
  );
}

// Users — member count badge
export function UsersIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Paperclip — attachment placeholder
export function PaperclipIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Crown — owner/commander badge
export function CrownIcon({ className = '', size = 14 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
      <path d="M2 20h20M4 20L2 8l6 4 4-8 4 8 6-4-2 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
