"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
type messageProps = {
  _id: String;
  message: String;
  sender: String;
};
function SingleMessage({ _id, message, sender }: messageProps) {
  const { data: session } = useSession();
  return (
    <div
      className={`flex items-center text-white ${
        sender === session?.user._id.toString() ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`}
        height={100}
        width={100}
        alt="user"
        className="h-12 w-20 object-contain"
      />
      <div className="max-w-[55%] md:max-w-2xl px-1">
        <h1 className="text-black">{session?.user.name}</h1>
        <p
          className={`p-2 w-full rounded-lg break-words ${
            sender === session?.user._id.toString()
              ? "flex-row-reverse bg-blue-500"
              : "bg-red-400"
          }`}
        >
          {message}
        </p>
        <h2 className="text-blue-700 text-sm">
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

export default SingleMessage;
