import React from "react";
import Image from "next/image";
type messageProps = {
  user: String;
  message: String;
};
function SingleMessage({ user, message }: messageProps) {
  return (
    <div
      className={`flex items-center text-white ${
        user === "me" ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`}
        height={100}
        width={100}
        alt="user"
        className="h-12 w-20 object-contain"
      />
      <div>
        <h1 className="text-black">{user}</h1>
        <p
          className={`p-2 rounded-lg ${
            user === "me" ? "flex-row-reverse bg-blue-500" : "bg-red-400"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default SingleMessage;
