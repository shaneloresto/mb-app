import { useForm } from 'react-hook-form';
import ChatStatus from './ChatStatus';
import { useContext } from 'react';
import { SocketIOContext } from '@/context/SocketIOContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


// Zod Schema for a Chat Message
// matches the one for regular messages
const messageSchema = z.object({
  chatMessageText: z
    .string()
    .trim()
    .min(3, { message: "Your message must be at least 3 characters." })
    .max(30, { message: "Your message must be no more than 30 characters." })
});


const Chat = () => {
  
  const { socket } = useContext(SocketIOContext);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      chatMessageText: ''
    }
  });

  const onSubmit = data => {
    socket.emit('chat message', data.chatMessageText);
    resetField('chatMessageText');
  }
  

  return (
    <div className="md:w-1/2">
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="chat-message" className="block text-sm font-medium mb-2 dark:text-white">Chat:</label>
        <div className="flex">
          <input type="text" {...register("chatMessageText")} id="chat-message" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="type a chat message..." />
          <button type="submit" className="ml-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Send</button>
          <p className="ml-1 mt-2 text-sm text-red-600">{errors.chatMessageText?.message}</p>
        </div>
      </form>
      <ChatStatus />
    </div>
  );
}

export default Chat;