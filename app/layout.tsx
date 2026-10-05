import type { Metadata } from "next";
import "./globals.css";
import MessagesProvider from "@/providers/MessagesProvider";
import messageService from "@/services/messageService";
import { Suspense } from 'react';
import SocketIOProvider from '@/providers/SocketIOProvider';

export const metadata: Metadata = {
  title: "Message Board",
  description: "Message board application",
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  const messagesPromise = messageService.getAll();
  return (
    <html lang="en">
      <body className="min-h-screen bg-base-100 text-base-content antialiased flex flex-col justify-center items-center">
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>}>
          <MessagesProvider messagesPromise={messagesPromise}>
            <SocketIOProvider>
              <main className="w-full flex flex-col items-center justify-center p-4">
                {children}
              </main>
            </SocketIOProvider>
          </MessagesProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;