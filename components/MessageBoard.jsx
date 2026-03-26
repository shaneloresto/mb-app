'use client'
import { useEffect, useState } from 'react';
import FilterMessage from "./FilterMessage";
import DisplayMessages from "./DisplayMessages";
import Link from 'next/link';
import LoginForm from "./LoginForm"
import messageService from '../services/messageService.js';
import auth from '@/utils/auth';

const MessageBoard = () => {
    const [searchMessage, setSearchMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logInUser = async (formData) => {
        try {
            const response = await messageService.login(formData);
            console.log(response);
            auth.setToken(response.token);
            setIsAuthenticated(true);
        } catch (e) {
            console.log(`${e} Login error`);
        }
    };
    useEffect(() => {
        if (auth.tokenExists()) {
            setIsAuthenticated(true);
        }
    }, []);
    return (
        <div className='flex flex-col items-center'>
            {isAuthenticated ? (
                <>
                <FilterMessage 
                    searchMessage={searchMessage} 
                    handleSearchMessageChange={event => setSearchMessage(event.target.value)}
                />
                <div className="flex justify-center items-center mt-5">
                    <Link className="btn btn-primary" href="/addmessage">
                        Add a Message
                    </Link>
                </div>
                <DisplayMessages searchMessage={searchMessage}/>
                </>
            ) : (
                <LoginForm logInUser={logInUser} />
            )}
        </div>
    );
}
export default MessageBoard;