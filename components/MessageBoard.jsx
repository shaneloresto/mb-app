'use client'
import { useState } from 'react';
import FilterMessage from "./FilterMessage";
import DisplayMessages from "./DisplayMessages";
import Link from 'next/link';

const MessageBoard = () => {
    const [searchMessage, setSearchMessage] = useState('');
    return (
        <>
            <FilterMessage searchMessage={searchMessage} handleSearchMessageChange={event => setSearchMessage(event.target.value)}/>
                {/* <Box sx={{ ml: 2, mt: 2, width: 265, display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/addmessage">Add Message</Link>
                </Box> */}
                <div>
                    <Link href="/addmessage">
                        Add a Message
                    </Link>
                </div>
            <DisplayMessages searchMessage={searchMessage}/>
        </>
    );
}
export default MessageBoard;