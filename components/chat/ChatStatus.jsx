import { SocketIOContext } from '@/context/SocketIOContext';
import { useContext } from 'react';

const ChatStatus = () => {
  const { status, error } = useContext(SocketIOContext);

  return (
    <div className="mt-2 text-sm">
      Socket status: <span className="font-bold">{status}</span>
      { error && <span className="italic">{error.message}</span>}
    </div>
  )
}

export default ChatStatus;