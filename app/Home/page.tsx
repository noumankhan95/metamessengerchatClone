import React from "react";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
function Home() {
  return (
    <section className="flex flex-row  md:px-2 w-full ">
      <Sidebar />
      <section className="flex flex-col  md:px-16 justify-between min-h-screen w-full md:w-4/6">
        <MessageList />
        <ChatInput />
      </section>
    </section>
  );
}

export default Home;
