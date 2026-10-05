'use client';

import { useState } from 'react';
import FilterMessage from "./FilterMessage";
import DisplayMessages from "./DisplayMessages";
import Link from 'next/link';
import LoginForm from "./LoginForm";
import messageService from '../services/messageService.js';
import auth from '@/utils/auth';
import Chat from './chat/Chat';

const MessageBoard = () => {
    const [searchMessage, setSearchMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window !== 'undefined') {
            return auth.tokenExists() && !auth.hasTokenExpired();
        }
        return false;
    });
    const [authError, setAuthError] = useState('');

    const logInUser = async (formData) => {
        try {
            setAuthError('');
            const response = await messageService.login(formData);
            console.log(response);
            auth.setToken(response.token);
            setIsAuthenticated(true);
        } catch (e) {
            console.log(`${e} Login error`);
            setAuthError('Invalid username or password. Please try again.');
        }
    };

    const signUpUser = async (formData) => {
        try {
            setAuthError('');
            await messageService.signup(formData);
            // Automatically log in with username and password after creating account
            const response = await messageService.login({
                username: formData.username,
                password: formData.password,
            });
            auth.setToken(response.token);
            setIsAuthenticated(true);
        } catch (e) {
            console.log(`${e} Sign up error`);
            setAuthError(e?.response?.data?.message || 'Failed to create account. Username or email may already exist.');
        }
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token');
        }
        setIsAuthenticated(false);
    };

    return (
        <div className='w-full max-w-2xl mx-auto py-6 px-4 flex flex-col'>
            {isAuthenticated ? (
                <div className="space-y-6">
                    {/* Top Bar with user info and actions */}
                    <div className="flex items-center justify-between pb-4 border-b border-base-300">
                        <div>
                            <h1 className="text-xl font-semibold text-base-content">Messages</h1>
                            <p className="text-xs text-base-content/60">
                                Logged in as <span className="font-medium text-base-content">{auth.getLoggedInUsername()}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link 
                                href="/addmessage" 
                                className="py-2 px-3.5 rounded-lg bg-neutral text-neutral-content text-sm font-medium hover:bg-neutral-focus active:scale-[0.99] transition-all"
                            >
                                + Add Message
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="py-2 px-3.5 rounded-lg border border-base-300 bg-base-100 text-base-content/70 text-sm font-medium hover:text-base-content hover:bg-base-200 transition-all"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* Filter / Search */}
                    <FilterMessage 
                        searchMessage={searchMessage} 
                        handleSearchMessageChange={event => setSearchMessage(event.target.value)}
                    />

                    {/* Live Chat Box */}
                    <Chat />

                    {/* Messages List */}
                    <div>
                        <h2 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider mb-3">
                            All Messages
                        </h2>
                        <DisplayMessages searchMessage={searchMessage}/>
                    </div>
                </div>
            ) : (
                <LoginForm 
                    logInUser={logInUser} 
                    signUpUser={signUpUser} 
                    serverError={authError} 
                />
            )}
        </div>
    );
};

export default MessageBoard;