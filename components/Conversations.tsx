import React from "react";
import SingleConversation from "./SingleConversation";
async function Conversations() {
  let users: User[] = await getUsers();
  return (
    <div>
      {users.map((u: User) => (
        <SingleConversation u={u} key={u._id} />
      ))}
    </div>
  );
}

async function getUsers() {
  const Users = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    method: "GET",
    cache: "no-cache",
  });
  let r = await Users.json();
  console.log(r);
  return r.data.docs;
}
export default Conversations;
