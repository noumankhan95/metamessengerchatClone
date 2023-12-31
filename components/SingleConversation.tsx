"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useContext } from "react";
import { MyContext } from "@/Providers/ContextApi";
type pageProps = {
  user: User;
};
function SingleConversation({ user }: pageProps) {
  const ctx = useContext(MyContext);

  return (
    <div
      className="flex justify-start items-center border-b-2 p-2 cursor-pointer"
      onClick={() => {
        ctx.setRecepient(user._id);
      }}
    >
      <Image
        src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`}
        height={100}
        width={100}
        alt="user"
        className="h-12 w-20 object-contain"
      />
      <div className="flex justify-between  items-center w-full px-3">
        <div>
          <h1 className="text-black text-md font-serif font-bold lowercase">
            {user.name}
          </h1>
          {/* <p>{c.message}</p> */}
        </div>

        <h2 className="text-blue-700 text-sm font-bold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(Date.now())}
        </h2>
      </div>
    </div>
  );
}

export default SingleConversation;
