import { useState } from "react";
import EditMessageForm from './EditMessageForm';
import { useContext } from 'react';
import MessagesContext from '../context/MessagesContext';


const Message = ({ id, messageText }) => {

  const [ isEditable, setIsEditable ] = useState(false);

  const { editMessage, deleteMessage } = useContext(MessagesContext);
  
  const modifyMessage = modifiedText => {
    editMessage(id, modifiedText);
    setIsEditable(false);
  }

  return (
    <li onDoubleClick={ () => setIsEditable(true) }>
      { isEditable
        ? <EditMessageForm
            messageText={messageText}
            modifyMessage={modifyMessage}
          />
        : messageText 
      }
      <button onClick={ () => deleteMessage(id) }>delete</button>
    </li>
  );
}

export default Message;