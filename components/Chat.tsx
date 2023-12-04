"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
interface Message {
  text: string;
}
type socketMessage = {
  message: Message;
  socketId: string;
};
let socket = io("http://localhost:4000");
export default function Home() {
  const [message, setMessage] = useState("");
  const [email, setemail] = useState("");
  const [emailexists, setemailexists] = useState(false);

  const params = useSearchParams();
  let id = params.get("id");
  let recepEmail = params.get("email");

  const [messageHistory, setMessageHistory] = useState<Message[]>([
    {
      text: "hello",
    },
    {
      text: "world",
    },
  ]);

  const newMessageReceived = (e: string): void => {
    console.log("new mess", e);
    setMessageHistory((oldMessageHistory: Message[]) => [
      ...oldMessageHistory,
      { text: e },
    ]);
  };

  useEffect(() => {
    // console.log("socklet id", socket.id, id);  //This runs first , it sets the socketID for the User
    console.log(socket.id, "socket id");
    if (!emailexists) return;
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/user?email=${id}`, {
      method: "GET",
      cache: "no-cache",
    })
      .then((r) => r.json())
      .then((data) => {
        socket.emit(
          "setUserid",
          {
            socketId: socket.id,
            userId: email,
          },
          (ack: string) => {}
        );
      })
      .catch((e) => console.log(e));
  }, [emailexists]);
  useEffect(() => {
    socket.on("chat-message", newMessageReceived);

    return () => {
      console.log(`return from useEffect`);
      socket.off("chat-message", newMessageReceived);
    };
  }, []);
  // useEffect(() => {
  //   // Event listener for when the user is about to leave the page
  //   const handleBeforeUnload = () => {
  //     console.log("User is leaving the page. Closing socket connection...");
  //     socket.emit("disconned Now");
  //     socket.disconnect();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup: remove the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  const sendMessage = async (e: any) => {
    e.preventDefault();
    const newMessage = message;
    console.log(`sendMessage`, newMessage);
    setMessage("");
    socket.emit("chat-message", {
      message: newMessage,
      socketId: socket.id,
      recepId: recepEmail,
    });
    setMessageHistory((oldMessageHistory) => [
      ...oldMessageHistory,
      { text: newMessage },
    ]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">CoolChat 😎</code>
        </p>
      </div>
      <div>
        enter email
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <button
          onClick={(e) => {
            setemailexists(true);
          }}
        >
          Set email
        </button>
      </div>
      <div className="">
        {messageHistory.map((message, i) => {
          return <div key={i}>{message.text}</div>;
        })}
      </div>

      <form
        id="text-input-container"
        className="bg-gray-300 py-4 px-2 w-full flex items-center justify-center"
        onSubmit={sendMessage}
      >
        <div className="text-center bg-white w-full md:w-1/3 px-3 py-2 flex gap-3 rounded-xl drop-shadow-2xl">
          <input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            className="focus:outline-none px-2 flex-1 rounded-xl"
            type="text"
            placeholder="What do you want to say?"
          />
          <button
            type="submit"
            className="rounded-xl px-3 py-2 bg-gray-600 text-gray-100 text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}
