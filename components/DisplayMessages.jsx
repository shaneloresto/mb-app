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
    <ul>
      {messagesToShow.map(message =>
        <Message
          key={message.id}
          id={message.id}
          messageText={message.text}
        />
      )}
    </ul>
    // </List>
  );
}

export default DisplayMessages;