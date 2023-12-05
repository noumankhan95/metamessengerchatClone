import React from "react";
import SingleConversation from "./SingleConversation";

async function Sidebar() {
  //   let Conversations = await getConversations("32121321");
  const Conversations = [
    { name: "Nouman", message: "How Are You" },
    { name: "ShahAfghan", message: "How Are You" },
  ];
  return (
    <div className=" hidden md:inline-block md:w-2/6 border-r-2 py-4 space-y-4">
      {Conversations.map((c: any) => (
        <SingleConversation {...c} />
      ))}
    </div>
  );
}

async function getConversations(userId: string) {
  const res = await fetch(`api/conversations?id=${userId}`, {
    method: "GET",
    next: {
      revalidate: 20,
    },
  });
  const data = await res.json();
  return data.docs;
}

export default Sidebar;
