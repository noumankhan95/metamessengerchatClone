"use client";
import React from "react";
import { SocketInit } from "@/lib/socketInit";

function ChatInput() {
  const [message, setmessage] = React.useState("");
  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(message, "message log");
    if (!message) return;
    const messageTosend = message;
    setmessage("");
    const socket = SocketInit();
    console.log("input socket", socket.id);
    if (!socket) return console.log("No Socket Connection");
    socket.emit("new Message", { message }, (text: string) => {
      console.log(text);
    });
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
