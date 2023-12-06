import React from "react";
import SingleConversation from "./SingleConversation";

async function Sidebar() {
  let Conversations: User[] = await getConversations();

  return (
    <div className=" hidden md:inline-block md:w-2/6 border-r-2 py-4 space-y-4">
      {Conversations?.map((c: User) => (
        <SingleConversation user={c} key={c._id.toString()} />
      ))}
    </div>
  );
}

async function getConversations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    method: "GET",
    next: {
      revalidate: 20,
    },
  });
  const { data }: UsersRespose = await res.json();
  return data.docs;
}

export default Sidebar;
