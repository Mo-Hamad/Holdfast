import { useEffect, useState } from 'react';
import { useStore } from './state/store.ts';
import Rail from './components/Rail.tsx';
import ChannelSidebar from './components/ChannelSidebar.tsx';
import ChatArea from './components/ChatArea.tsx';
import MemberSidebar from './components/MemberSidebar.tsx';
import CreateHoldModal from './components/CreateHoldModal.tsx';

export default function App() {
  const loadCurrentUser = useStore((s) => s.loadCurrentUser);
  const loadHolds = useStore((s) => s.loadHolds);

  const [showCreateHold, setShowCreateHold] = useState(false);

  useEffect(() => {
    void loadCurrentUser();
    void loadHolds();
  }, [loadCurrentUser, loadHolds]);

  return (
    <div className="h-full flex">

      <Rail onAddHold={() => setShowCreateHold(true)} />

      <ChannelSidebar />

      <ChatArea />

      <MemberSidebar />

      {showCreateHold && (
        <CreateHoldModal onClose={() => setShowCreateHold(false)} />
      )}

    </div>
  );
}
