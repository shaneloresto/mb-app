'use client'
import { useEffect, useState } from 'react';
import messageService from '@/services/messageService';
import MessagesContext from '@/context/MessagesContext';
import { useRouter } from 'next/navigation';

const MessagesProvider = ({children}) => {
  // list of messages 
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    console.log('useEffect was executed!');
    // start of IIFE
    (async () => {
      try {
        const serverMessages = await messageService.getAll();
        setMessages(serverMessages);
      } catch (error) {
        console.log('API Error: ' + error);
      }
    })();
    // end IFFE
  },[]);

  // this will be called by addNewMessage in the Form
  // inverse data flow - pass data up to App
  const addMessage = async newMessageText => {
    
    if (messages.some( message =>
      message.text.toLowerCase() === newMessageText.toLowerCase() )) {
      alert(`${newMessageText} message is already in list of messages!`);
    } else {

      // POST Request
      try {
        const newMessageObject =
          await messageService.create({ text: newMessageText });
        setMessages(messages.concat(newMessageObject));
        router.push('/');
      } catch (error) {
        console.log('API Error: ' + error);
      }
    }
  }

  const editMessage = async (modifiedMessageId, modifiedMessageText) => {
    const newMessages = messages.map( message =>
      message.id === modifiedMessageId
        ? { ...message, text: modifiedMessageText }
        : message
    );

    try {
      await messageService.update(modifiedMessageId,
        { text: modifiedMessageText });
      setMessages(newMessages);
    } catch (error) {
      console.log('API Error: ' + error);
    }
  }


  const deleteMessage = async messageId => {
    try {
      await messageService.deleteOne(messageId);
      setMessages(messages.filter( message => message.id !== messageId ));
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