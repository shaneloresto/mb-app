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
    <li className="list-row" onDoubleClick={ () => setIsEditable(true) }>
      <span className="flex items-center">
        { isEditable
          ? <EditMessageForm
              messageText={messageText}
              modifyMessage={modifyMessage}
            />
          : messageText 
        }
      </span>
      <div className="flex items-center justify-end">
        <button className="btn btn-square btn-secondary" onClick={ () => deleteMessage(id) }>X</button>
      </div>
    </li>
  );
}

export default Message;