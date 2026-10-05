import { useForm } from 'react-hook-form';
import ChatStatus from './ChatStatus';
import { useContext } from 'react';
import { SocketIOContext } from '@/context/SocketIOContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const messageSchema = z.object({
  chatMessageText: z
    .string()
    .trim()
    .min(3, { message: "Message must be at least 3 characters." })
    .max(30, { message: "Message must be at most 30 characters." })
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
    if (socket) {
      socket.emit('chat message', data.chatMessageText);
      resetField('chatMessageText');
    }
  };

  return (
    <div className="w-full bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="chat-message" className="text-sm font-medium text-base-content">
            Broadcast Message (Socket.IO)
          </label>
          <ChatStatus />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            {...register("chatMessageText")}
            id="chat-message"
            className={`input input-bordered flex-1 rounded-lg text-sm ${
              errors.chatMessageText ? 'input-error' : ''
            }`}
            placeholder="Type a real-time message..."
          />
          <button
            type="submit"
            className="py-2.5 px-5 rounded-lg bg-neutral text-neutral-content text-sm font-medium hover:bg-neutral-focus active:scale-[0.99] transition-all"
          >
            Send
          </button>
        </div>
        {errors.chatMessageText && (
          <p className="text-xs text-error mt-1.5">{errors.chatMessageText.message}</p>
        )}
      </form>
    </div>
  );
};

export default Chat;