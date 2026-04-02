'use client'

import { SocketIOContext } from '@/context/SocketIOContext';
import { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import MessagesContext from '@/context/MessagesContext';

const SocketIOProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('waiting');
  const [error, setError] = useState(null);
  const { messages, addMessage } = useContext(MessagesContext);

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
    useEffect( () => {
        if (socket) {
            socket.on('chat message', addMessage)
            return () => socket.off('chat message', addMessage)
        }
    },[socket, messages]);
    return (
    <SocketIOContext.Provider value={{ socket, status, error }}>
        {children}
    </SocketIOContext.Provider>
    );
}

export default SocketIOProvider;