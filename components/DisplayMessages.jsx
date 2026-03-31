import Message from './Message';
import { useContext } from 'react';
import MessagesContext from '@/context/MessagesContext';


const DisplayMessages = ({ searchMessage }) => {

  const { messages }  = useContext(MessagesContext);

  const messagesToShow = searchMessage
    ? messages.filter((message) => message.text.toLowerCase().includes(searchMessage) )
    : messages
  
  return (
    // <List sx={{ ml: 1 }}>
    <div className='w-78 md:w-1/2'>
      <ul className='list bg-base-100 rounded-box shadow-md my-5'>
        {messagesToShow.map(message =>
          <Message
            key={message.id}
            id={message.id}
            messageText={message.text}
            owner={message.owner}
          />
        )}
      </ul>
    </div>
    // </List>
  );
}

export default DisplayMessages;