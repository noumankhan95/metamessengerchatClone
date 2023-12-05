import SingleMessage from "./SingleMessage";

async function MessageList() {
  //   let messages = await getMessages();
  let messages = [
    { user: "me", message: "Hello" },
    { user: "Ali", message: "Hello to You" },
  ];
  return (
    <div className="p-2 overflow-hidden">
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
