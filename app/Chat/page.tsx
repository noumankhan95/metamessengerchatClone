"use client";
import React from "react";
import Chat from "@/components/Chat";
function ChatScreen({ searchParams }: any) {
  return <Chat recepient={searchParams.id} />;
}

export default ChatScreen;
