import { useShallow } from 'zustand/react/shallow';
import { useStore, selectCurrentMembers } from '../state/store.ts';

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

// Pick a consistent avatar color based on the user's ID.
// Same user always gets the same color across sessions.
function avatarColor(userId: string): string {
  const colors = [
    'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
    'bg-rose-500',   'bg-orange-500', 'bg-teal-500',
  ];
  const sum = [...userId].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[sum % colors.length]!;
}

export default function MemberSidebar({ collapsed, onToggle }: Props) {
  const members = useStore(useShallow(selectCurrentMembers));
  const presenceByUser = useStore((s) => s.presenceByUser);
  const currentHoldId = useStore((s) => s.currentHoldId);

  if (collapsed) {
    return (
      <div className="w-6 bg-surface flex-shrink-0 flex flex-col items-center pt-3">
        <button
          onClick={onToggle}
          title="Expand members"
          className="text-muted hover:text-primary transition-colors text-xs"
        >
          ◀
        </button>
      </div>
    );
  }

  if (!currentHoldId) {
    return (
      <div className="w-sidebar bg-surface flex-shrink-0 flex items-center justify-center">
        <p className="text-muted text-sm">No hold selected</p>
      </div>
    );
  }

  return (
    <div className="w-sidebar bg-surface flex-shrink-0 flex flex-col">

      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-muted text-xs uppercase font-semibold tracking-wide">
          Members — {members.length}
        </h2>
        <button
          onClick={onToggle}
          title="Collapse members"
          className="text-muted hover:text-primary transition-colors text-xs"
        >
          ▶
        </button>
      </div>

      {/* Member list */}
      <div className="flex flex-col py-2 gap-0.5">
        {members.map((member) => {
          const online = presenceByUser[member.userId] ?? false;
          const initials = member.displayName.slice(0, 2).toUpperCase();

          return (
            <div
              key={member.userId}
              className="flex items-center gap-2.5 mx-2 px-2 py-1.5 rounded hover:bg-elevated"
            >
              {/* Avatar with online dot in the corner */}
              <div className="relative flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${avatarColor(member.userId)}`}>
                  {initials}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface ${online ? 'bg-online' : 'bg-offline'}`} />
              </div>

              {/* Name and role */}
              <div className="flex flex-col min-w-0">
                <span className="text-primary text-sm truncate">{member.displayName}</span>
                {member.role === 'owner' && (
                  <span className="text-muted text-xs">owner</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
