import type { Metadata } from "next";
import "./globals.css";
import MessagesProvider from "@/providers/MoviesProvider";
export const metadata: Metadata = {
  title: "ICS 221 Message Board App",
  description: "Front-end App for ICS 221",
};
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <MessagesProvider>{children}</MessagesProvider>
  );
}
export default RootLayout;