'use client'
import { useState, useContext } from "react";
import MessagesContext from '../context/MessagesContext';

const EnterMessageForm = () => {

  const [message, setMessage] = useState('');
  const {addMessage} = useContext(MessagesContext);

  const addNewMessage = event => {
    event.preventDefault();
    addMessage(message);
    setMessage('');
  }


  return (
    // <Box sx={{ height: 150, width: 365, m: 2, p: 2, border: '2px solid grey'}}>
    //   <form onSubmit={addNewMessage}>
    //     <FormControl component="fieldset"
    //       sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1em' }}>
    //       <TextField
    //         label="Enter a Message:"
    //         value={message}
    //         onChange={event => setMessage(event.target.value)}
    //       />
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         type="submit" disabled={!message}>Add Message</Button>
    //     </FormControl>
    //   </form>
    // </Box>
    <div className="flex justify-center">
      <form onSubmit={addNewMessage}>
        <fieldset className="fieldset my-5">
          <legend className="fieldset-legend">Enter a Message:</legend>
          <input type="text" className="input mb-3" value={message} onChange={event => setMessage(event.target.value)} />
          <button className="btn btn-primary rounded-full" type="submit" disabled={!message}>Add Message</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EnterMessageForm;