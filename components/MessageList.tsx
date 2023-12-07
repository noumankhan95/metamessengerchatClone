"use client";

//U can Use useSWR or UseEffect and Socket.on('new message')
import SingleMessage from "./SingleMessage";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { MyContext } from "@/Providers/ContextApi";
import MessageFetcher from "@/lib/messageFetcher";
import useSWR from "swr";
import SortIds from "@/lib/sortIds";
import { getSocketInstance as SocketInit } from "@/lib/socketInit";
import { useMemo } from "react";
// import socketModel from "@/Models/Sockets";

function MessageList() {
  const { recepientId } = useContext(MyContext);
  const [messages, setmessages] = useState<Message[]>([]);
  const { data: session } = useSession();
  // console.log(ctx);
  // console.log(session);
  const convId: string = useMemo(
    () => SortIds(recepientId, session?.user._id),
    [recepientId, session?.user._id]
  );
  // const {
  //   data: messages,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useSWR(["api/conversations"], MessageFetcher.bind(null, convId));
  useEffect(() => {
    MessageFetcher(convId)
      .then((messages) => setmessages((p: Message[]) => messages))
      .catch((e) => {
        console.log(e);
      });
  }, [recepientId]);
  useEffect(() => {
    let socketInstance: any;
    const initializeSocket = async () => {
      console.log("calling socket");
      socketInstance = await SocketInit();
      console.log("socket innit resilt", socketInstance.id);
      socketInstance.on("new Message", (data: any) => {
        console.log("new message socket");
        setmessages((prevMessages) => [...prevMessages, { ...data }]);
      });
    };
    initializeSocket();
    return () => {
      if (socketInstance) {
        socketInstance.off("new Message");
      }
    };
  }, []);
  // console.log(convId);
  // console.log(messages, "messages");
  if (!recepientId) return <div>Welcome!</div>;
  // if (isLoading) return <div>Loading Messages</div>;
  // if (error) return <div>{error.message}</div>;
  return (
    <div className="overflow-hidden my-2">
      {messages?.map((m) => (
        <div className="space-y-2" key={m._id.toString()}>
          <SingleMessage {...m} />
        </div>
      ))}
    </div>
  );
}

export default MessageList;
