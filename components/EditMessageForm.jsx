import { useState } from 'react';

const EditMessageForm = ({ messageText, modifyMessage }) => {

  const [ modifiedText, setModifiedText] = useState(messageText);
  
  const handleFormSubmit = event => {
    event.preventDefault();
    modifyMessage(modifiedText);
  }

  return (
    <form onSubmit={handleFormSubmit}>
        <label className='text-xs'>Update Your Message: </label>
        <input type='text' className='input'
          value={modifiedText}
          onChange={event => setModifiedText(event.target.value)}
        />
    </form>
  );
}

export default EditMessageForm;