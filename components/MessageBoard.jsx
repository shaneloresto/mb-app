'use client'
import { useState } from 'react';
import FilterMessage from "./FilterMessage";
import DisplayMessages from "./DisplayMessages";
import Link from 'next/link';

const MessageBoard = () => {
    const [searchMessage, setSearchMessage] = useState('');
    return (
        <div className='flex flex-col items-center'>
            <FilterMessage searchMessage={searchMessage} handleSearchMessageChange={event => setSearchMessage(event.target.value)}/>
                {/* <Box sx={{ ml: 2, mt: 2, width: 265, display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/addmessage">Add Message</Link>
                </Box> */}
                <div className="flex justify-center items-center mt-5">
                    <Link className="btn btn-primary" href="/addmessage">
                        Add a Message
                    </Link>
                </div>
            <DisplayMessages searchMessage={searchMessage}/>
        </div>
    );
}
export default MessageBoard;