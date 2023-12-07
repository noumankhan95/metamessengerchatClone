"use client";
import React, { useEffect } from "react";
import { getSocketInstance } from "@/lib/socketInit";
import { MyContext } from "@/Providers/ContextApi";
import socketModel from "@/Models/Sockets";
import { useSession } from "next-auth/react";
import SortIds from "@/lib/sortIds";
import { mutate } from "swr";
function ChatInput() {
  const [message, setmessage] = React.useState("");
  const { recepientId } = React.useContext(MyContext);
  const { data: session } = useSession();
  const convId = SortIds(session?.user._id, recepientId);
  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // console.log(message, "message log");
    if (!message) return;
    const socket = await getSocketInstance();
    if (!socket) return console.log("No Socket Connection");

    console.log("input socket", socket.id);
    socket.emit(
      "new Message",
      {
        message,
        recepientSocket: recepientId,
        convId,
        sender: session?.user._id,
      },
      (text: string) => {
        console.log(text);
      }
    );
    // const mr = await mutate(
    //   ["api/conversations"],
    //   [
    //     {
    //       message,
    //       _id: Math.random() * 10000,
    //       sender: session?.user._id,
    //     },
    //   ]
    // );
    // console.log(",mutate res", mr);
    setmessage("");
  };
  return (
    <div className="flex w-full md:px-0 bg-white justify-center space-x-1 px-1 sticky bottom-0 py-5 z-50">
      <input
        className="border-2 border-slate-300 px-4 py-1 focus:outline-blue-400 rounded-md flex-1 md:w-5/6"
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setmessage(e.target.value)}
      />
      <button
        className="bg-blue-500  rounded-lg px-4 text-white disabled:opacity-50"
        onClick={(e) => submitForm(e)}
        disabled={!message}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
