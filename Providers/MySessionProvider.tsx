'use client'
import { SessionProvider } from "next-auth/react";
import React from "react";
type sessionProps = {
  children: React.ReactNode;
  session: any;
};
function MySessionProvider({ children, session }: sessionProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default MySessionProvider;
