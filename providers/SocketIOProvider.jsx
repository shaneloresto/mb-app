'use client';

import { SocketIOContext } from '@/context/SocketIOContext';
import { useEffect, useState, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import MessagesContext from '@/context/MessagesContext';

const SocketIOProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('waiting');
  const [error, setError] = useState(null);
  const { addMessage } = useContext(MessagesContext);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET || '');
    
    socketInstance.on('connect', () => {
      console.log('connected to socket.io as', socketInstance.id);
      setStatus('connected');
    });

    socketInstance.on('connect_error', (err) => {
      console.error('socket.io connect error:', err);
      setStatus('error');
      setError(err);
    });

    socketInstance.on('disconnect', () => {
      setStatus('disconnected');
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', addMessage);
      return () => {
        socket.off('chat message', addMessage);
      };
    }
  }, [socket, addMessage]);

  return (
    <SocketIOContext.Provider value={{ socket, status, error }}>
      {children}
    </SocketIOContext.Provider>
  );
};

export default SocketIOProvider;