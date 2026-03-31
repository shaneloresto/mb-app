'use client'
import { use, useState } from 'react';
import messageService from '@/services/messageService';
import MessagesContext from '@/context/MessagesContext';
import { useRouter } from 'next/navigation';
import type { TMessage } from '@/types/shared.types';
import auth from '@/utils/auth';
interface MessagesProviderProps<TMessage> {
  children: React.ReactNode;
  messagesPromise: Promise<TMessage[]>;
}
const MessagesProvider = <TMessage,>({children, messagesPromise}: MessagesProviderProps<TMessage>) => {
  // list of messages 
  const serverMessages = use(messagesPromise);
  const [messages, setMessages] = useState<TMessage[]>(serverMessages);

  const router = useRouter();

  // useEffect(() => {
  //   console.log('useEffect was executed!');
  //   // start of IIFE
  //   (async () => {
  //     try {
  //       const serverMessages = await messageService.getAll();
  //       setMessages(serverMessages);
  //     } catch (error) {
  //       console.log('API Error: ' + error);
  //     }
  //   })();
  //   // end IFFE
  // },[]);

  // this will be called by addNewMessage in the Form
  // inverse data flow - pass data up to App
  const addMessage = async (newMessageText: string) => {
    const bearerAuthHeader = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
    if (messages.some((message: TMessage) => message.text.toLowerCase() === newMessageText.toLowerCase())) {
      alert(`${newMessageText} message is already in list of messages!`);
    } else {

      // POST Request
      try {
        const newMessageObject: TMessage[] =
          await messageService.create({ text: newMessageText, owner: auth.getLoggedInUsername() }, bearerAuthHeader);
        setMessages(messages.concat(newMessageObject));
        router.push('/');
      } catch (error) {
        console.log('API Error: ' + error);
      }
    }
  }

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
      await messageService.update(modifiedMessageId,
        { text: modifiedMessageText }, bearerAuthHeader);
      setMessages(newMessages);
    } catch (error) {
      console.log('API Error: ' + error);
    }
  }


  const deleteMessage = async (messageId: string) => {
    const bearerAuthHeader = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
    try {
      await messageService.deleteOne(messageId, bearerAuthHeader);
      setMessages(messages.filter((message: TMessage) => message.id !== messageId ));
    } catch (error) {
      console.log('API Error: ' + error);
    }
  }


  return (
    <MessagesContext.Provider value={{ messages, editMessage, deleteMessage, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesProvider;