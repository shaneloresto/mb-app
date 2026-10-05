import Message from './Message';
import { useContext } from 'react';
import MessagesContext from '@/context/MessagesContext';

const DisplayMessages = ({ searchMessage }) => {
  const { messages } = useContext(MessagesContext);

  const messagesToShow = searchMessage
    ? messages.filter((message) => message.text.toLowerCase().includes(searchMessage.toLowerCase()))
    : messages;

  if (!messages || messages.length === 0) {
    return (
      <div className="w-full text-center py-12 border border-dashed border-base-300 rounded-xl bg-base-100">
        <p className="text-sm text-base-content/60">No messages yet. Be the first to post!</p>
      </div>
    );
  }

  if (messagesToShow.length === 0) {
    return (
      <div className="w-full text-center py-12 border border-dashed border-base-300 rounded-xl bg-base-100">
        <p className="text-sm text-base-content/60">No messages match &quot;{searchMessage}&quot;.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2.5">
      {messagesToShow.map(message => (
        <Message
          key={message.id}
          id={message.id}
          messageText={message.text}
          owner={message.owner}
        />
      ))}
    </div>
  );
};

export default DisplayMessages;