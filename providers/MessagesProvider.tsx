'use client';

import { use, useState } from 'react';
import messageService from '@/services/messageService';
import MessagesContext from '@/context/MessagesContext';
import { useRouter } from 'next/navigation';
import type { TMessage } from '@/types/shared.types';
import auth from '@/utils/auth';

interface MessagesProviderProps {
  children: React.ReactNode;
  messagesPromise: Promise<TMessage[]>;
}

const MessagesProvider = ({ children, messagesPromise }: MessagesProviderProps) => {
  const serverMessages = use(messagesPromise);
  const [messages, setMessages] = useState<TMessage[]>(serverMessages);
  const router = useRouter();

  const addMessage = async (newMessageText: string) => {
    const bearerAuthHeader = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };

    if (messages.some((message: TMessage) => message.text.toLowerCase() === newMessageText.toLowerCase())) {
      alert(`${newMessageText} message is already in list of messages!`);
    } else {
      try {
        const newMessageObject = await messageService.create(
          { text: newMessageText, owner: auth.getLoggedInUsername() },
          bearerAuthHeader
        );
        setMessages(messages.concat(newMessageObject));
        router.push('/');
      } catch (error) {
        console.log('API Error: ' + error);
      }
    }
  };

  const editMessage = async (modifiedMessageId: string, modifiedMessageText: string) => {
    const bearerAuthHeader = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };
    const newMessages: TMessage[] = messages.map((message: TMessage) =>
      message.id === modifiedMessageId
        ? { ...message, text: modifiedMessageText }
        : message
    );

    try {
      await messageService.update(
        modifiedMessageId,
        { text: modifiedMessageText },
        bearerAuthHeader
      );
      setMessages(newMessages);
    } catch (error) {
      console.log('API Error: ' + error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    const bearerAuthHeader = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };
    try {
      await messageService.deleteOne(messageId, bearerAuthHeader);
      setMessages(messages.filter((message: TMessage) => message.id !== messageId));
    } catch (error) {
      console.log('API Error: ' + error);
    }
  };

  return (
    <MessagesContext.Provider value={{ messages, editMessage, deleteMessage, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;