import { useState } from "react";
import EditMessageForm from './EditMessageForm';
import { Button, ListItem } from '@mui/material';
import { useContext } from 'react';
import MessagesContext from '../MessagesContext';


const Message = ({ id, messageText }) => {

  const [ isEditable, setIsEditable ] = useState(false);

  const { editMessage, deleteMessage } = useContext(MessagesContext);
  
  const modifyMessage = modifiedText => {
    editMessage(id, modifiedText);
    setIsEditable(false);
  }

  return (
    <ListItem onDoubleClick={ () => setIsEditable(true) }>
      { isEditable
        ? <EditMessageForm
            messageText={messageText}
            modifyMessage={modifyMessage}
          />
        : messageText 
      }
      <Button onClick={ () => deleteMessage(id) }>delete</Button>
    </ListItem>
  );
}

export default Message;