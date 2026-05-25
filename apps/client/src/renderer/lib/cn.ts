// Conditional className helper. Use everywhere instead of string concat.
//
//   <div className={cn('p-4', isActive && 'bg-accent', other)} />
//
// Why a wrapper around clsx? So we can swap to tailwind-merge later if we
// need dedup (e.g. p-4 + p-8 → p-8). For now clsx is enough.

export { clsx as cn } from 'clsx';
