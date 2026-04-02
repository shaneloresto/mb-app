import type { Metadata } from "next";
import "./globals.css";
import MessagesProvider from "@/providers/MessagesProvider";
import Header from "../components/Header";
import messageService from "@/services/messageService";
import { Suspense } from 'react';
import SocketIOProvider from '@/providers/SocketIOProvider';
export const metadata: Metadata = {
  title: "ICS 221 Message Board App",
  description: "Front-end App for ICS 221",
};
const RootLayout = ({children}: {children: React.ReactNode}) => {
  const messagesPromise = messageService.getAll();
  return (
    <html>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <MessagesProvider messagesPromise={messagesPromise}>
            <SocketIOProvider>
              <Header />
              {children}
            </SocketIOProvider>
          </MessagesProvider>
        </Suspense>
      </body>
    </html>
  );
}
export default RootLayout;