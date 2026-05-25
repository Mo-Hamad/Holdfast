import { useEffect } from 'react';
import { useStore } from './state/store.ts';

/**
 * Holdfast root component.
 *
 * Right now this is a single welcome screen that proves the scaffold works.
 * The UI developer's job is to replace this with the real four-column layout:
 *
 *     ┌────┬─────────┬───────────────────────┬─────────┐
 *     │Rail│Channels │ Chat                  │ Members │
 *     │72px│ 240px   │ flex-1                │ 240px   │
 *     └────┴─────────┴───────────────────────┴─────────┘
 *
 * See docs/CLIENT_UI_HANDOFF.md for scope and conventions.
 */
export default function App() {
  const loadCurrentUser = useStore((s) => s.loadCurrentUser);
  const loadHolds = useStore((s) => s.loadHolds);
  const currentUser = useStore((s) => s.currentUser);
  const holds = useStore((s) => s.holds);

  useEffect(() => {
    void loadCurrentUser();
    void loadHolds();
  }, [loadCurrentUser, loadHolds]);

  return (
    <div className="h-full grid place-items-center p-8">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">Holdfast</h1>
        <p className="text-secondary">
          UI scaffold is wired up. The mock backend has seeded data ready to render.
        </p>
        <div className="mt-6 p-4 rounded-lg bg-surface text-left text-sm">
          <p className="text-secondary mb-2">Mock backend reports:</p>
          <ul className="space-y-1">
            <li>
              <span className="text-muted">user:</span>{' '}
              {currentUser?.displayName ?? '…'}
            </li>
            <li>
              <span className="text-muted">holds:</span> {holds.length}
            </li>
          </ul>
        </div>
        <p className="text-muted text-xs">
          Start building in <code>src/renderer/views</code> and{' '}
          <code>src/renderer/components</code>.
        </p>
      </div>
    </div>
  );
}
