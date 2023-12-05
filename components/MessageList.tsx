"use client";
import SingleMessage from "./SingleMessage";
import { useState, useEffect } from "react";
import { SocketInit } from "@/lib/socketInit";
function MessageList() {
  //   let messages = await getMessages();
  let [messages, setmessages] = useState([
    {
      user: "me",
      message:
        "Hello. Fullstackmeta-messenger-appmetamessengerchatClone>.Clone>",
    },
    {
      user: "me",
      message:
        "Hello. Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>",
    },
    {
      user: "Ali",
      message:
        "Hello to You .Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>",
    },
    {
      user: "Ali",
      message:
        "Hello Again to You .Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>.Fullstackmeta-messenger-appmetamessengerchatClone>",
    },
  ]);
  useEffect(() => {
    let socket = SocketInit();
    socket.on("new Message", (message) => {
      setmessages((p) => [...p, message]);
    });
    return () => {
      socket.off("new Message");
    };
  }, []);
  return (
    <div className="overflow-hidden">
      {messages.map((m) => (
        <div className="space-y-2" key={m.message.toString()}>
          <SingleMessage {...m} />
        </div>
      ))}
    </div>
  );
}

async function getMessages() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getMessages`);
    if (!res.ok) throw "Couldnt Fetch Messages";
    const { data } = await res.json();
    return data.docs;
  } catch (e) {
    console.log("Error");
  }
}
export default MessageList;
