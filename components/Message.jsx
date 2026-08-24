import { useState } from "react";
import EditMessageForm from './EditMessageForm';
import { useContext } from 'react';
import MessagesContext from '../context/MessagesContext';

const Message = ({ id, messageText, owner }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { editMessage, deleteMessage } = useContext(MessagesContext);

  const modifyMessage = modifiedText => {
    editMessage(id, modifiedText);
    setIsEditable(false);
  };

  return (
    <div 
      className="group bg-base-100 border border-base-300 rounded-xl p-4 transition-all hover:border-base-content/20 flex flex-col gap-2"
      onDoubleClick={() => setIsEditable(true)}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-md bg-base-200 text-base-content/70">
          @{owner || 'anonymous'}
        </span>
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {!isEditable && (
            <button
              onClick={() => setIsEditable(true)}
              className="text-xs text-base-content/50 hover:text-base-content px-2 py-1 rounded transition-colors"
              title="Edit message"
            >
              Edit
            </button>
          )}
          <button
            className="text-xs text-error/70 hover:text-error px-2 py-1 rounded transition-colors"
            onClick={() => deleteMessage(id)}
            title="Delete message"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditable ? (
        <EditMessageForm
          messageText={messageText}
          modifyMessage={modifyMessage}
          onCancel={() => setIsEditable(false)}
        />
      ) : (
        <p className="text-sm text-base-content leading-relaxed select-text">
          {messageText}
        </p>
      )}
    </div>
  );
};

export default Message;