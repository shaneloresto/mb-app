'use client'

import { SocketIOContext } from '@/context/SocketIOContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketIOProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('waiting');
  const [error, setError] = useState(null);

  useEffect( () => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET);
    setSocket(socket);
    socket.on('connect', () => {
        console.log('connected to socket.io as', socket.id)
        setStatus('connected');
    });
    socket.on('connect_error', (error) => {
        console.error('socket.io connect error:', error);
        setStatus('error'); setError(error);
        })
    socket.on('disconnect', () => setStatus('disconnected'));
    },[]);
    return (
    <SocketIOContext.Provider value={{ socket, status, error }}>
        {children}
    </SocketIOContext.Provider>
    );
}

export default SocketIOProvider;