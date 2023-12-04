import React from "react";
import SingleConversation from "./SingleConversation";
async function Conversations() {
  let users = await getUsers();
  return (
    <div>
      {users.map((u: any) => (
        <SingleConversation u={u} key={u._id} />
      ))}
    </div>
  );
}

async function getUsers() {
  const Users = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, {
    method: "GET",
    cache: "no-cache",
  });
  let r = await Users.json();
  return r.data.docs;
}
export default Conversations;
