"use client";
import SingleMessage from "./SingleMessage";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { MyContext } from "@/Providers/ContextApi";
import MessageFetcher from "@/lib/messageFetcher";
import useSWR from "swr";
import SortIds from "@/lib/sortIds";
// import socketModel from "@/Models/Sockets";
function MessageList() {
  //   let messages = await getMessages();
  const ctx = useContext(MyContext);
  const { data: session } = useSession();
  // useEffect(() => {
  //   const GetrecepSocket = async () => {
  //     try {
  //       const recep: RecepsSocket = await socketModel.findOnebyId({
  //         _id: ctx.recepientId,
  //       });
  //       return recep.userId as string;
  //     } catch (e) {
  //       return "Error";
  //     }
  //   };
  //   GetrecepSocket();
  // }, []);
  const convId = SortIds(ctx.recepientId, session?.user._id);
  const {
    data: messages,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/Conversations", MessageFetcher.bind(null, convId));
  console.log(session);
  if (isLoading) return <div>Loading Messages</div>;
  return (
    <div className="overflow-hidden">
      {messages?.map((m) => (
        <div className="space-y-2" key={m.message.toString()}>
          <SingleMessage {...m} />
        </div>
      ))}
    </div>
  );
}

export default MessageList;
