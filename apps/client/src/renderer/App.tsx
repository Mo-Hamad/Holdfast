import { useEffect, useState } from 'react';
import { useStore } from './state/store.ts';
import Rail from './components/Rail.tsx';
import ChannelSidebar from './components/ChannelSidebar.tsx';
import ChatArea from './components/ChatArea.tsx';
import MemberSidebar from './components/MemberSidebar.tsx';
import CreateHoldModal from './components/CreateHoldModal.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import HostingModal from './components/HostingModal.tsx';

export default function App() {
  const loadCurrentUser = useStore((s) => s.loadCurrentUser);
  const loadHolds = useStore((s) => s.loadHolds);

  const [showCreateHold, setShowCreateHold] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHosting, setShowHosting] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [membersCollapsed, setMembersCollapsed] = useState(false);

  useEffect(() => {
    void loadCurrentUser();
    void loadHolds();
  }, [loadCurrentUser, loadHolds]);

  return (
    <div className="h-full flex flex-col">

      <Rail
        onAddHold={() => setShowCreateHold(true)}
        onOpenSettings={() => setShowSettings(true)}
        onToggleHosting={() => setShowHosting(true)}
        hosting={hosting}
      />

      <div className="flex-1 flex min-h-0">
        <ChannelSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          onOpenSettings={() => setShowSettings(true)}
        />
        <ChatArea />
        <MemberSidebar
          collapsed={membersCollapsed}
          onToggle={() => setMembersCollapsed((c) => !c)}
        />
      </div>

      {showCreateHold && (
        <CreateHoldModal onClose={() => setShowCreateHold(false)} />
      )}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
      {showHosting && (
        <HostingModal
          hosting={hosting}
          onToggle={() => setHosting((h) => !h)}
          onClose={() => setShowHosting(false)}
        />
      )}

    </div>
  );
}
