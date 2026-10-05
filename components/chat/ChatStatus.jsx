import { SocketIOContext } from '@/context/SocketIOContext';
import { useContext } from 'react';

const ChatStatus = () => {
  const { status, error } = useContext(SocketIOContext);

  const isConnected = status === 'connected';

  return (
    <div className="flex items-center gap-1.5 text-xs text-base-content/60">
      <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-warning'}`}></span>
      <span>{isConnected ? 'Connected' : status}</span>
      {error && <span className="text-error text-xs">({error.message})</span>}
    </div>
  );
};

export default ChatStatus;