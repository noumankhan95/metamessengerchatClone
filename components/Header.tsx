"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Signout from "./signout";
import { useEffect } from "react";
import { getSocketInstance } from "@/lib/socketInit";
import { useSession } from "next-auth/react";
import { MyContext } from "@/Providers/ContextApi";
function Header() {
  const session = useSession();
  const [userSocket, setuserSocket] = useState<string>("");
  const [SocketStatus, setSocketStatus] = useState<boolean>(false);
  useEffect(() => {
    getSocketInstance().then((socket) => {
      console.log("socket id is ", socket!.id);
      setSocketStatus(true);
      setuserSocket(socket!.id);
    });
  }, []);
  useEffect(() => {
    if (userSocket && session.data?.user?._id) {
      console.log("scoket herte");
      fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/socket?id=${session.data.user._id}&socket=${userSocket}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      )
        .then((r) => r.json())
        .then((r) => console.log(r, "user socket setting"))
        .catch((e) => console.log("socket set error"));
    }
  }, [userSocket]);
  if (session.status === "authenticated")
    return (
      <header className="flex flex-col w-full justify-between items-center space-y-4 sticky bg-white p-5 shadow-md top-0 z-50">
        <div className="flex w-full justify-between items-center">
          <div className="flex space-x-2 items-center">
            <Image
              src={`https://links.papareact.com/jne`}
              alt="Logo"
              width={100}
              height={100}
              className="h-8 w-14"
            />
            <h1 className="text-blue-400">
              Signed In as <p className="font-bold text-black">Nouman</p>
            </h1>
          </div>
          <Signout />
        </div>
      </header>
    );
  return (
    <header className="flex flex-col w-full justify-between items-center space-y-4 sticky bg-white p-5 shadow-md top-0 z-50">
      <div className="flex items-center">
        <Image
          src={`https://links.papareact.com/jne`}
          alt="Logo"
          width={100}
          height={100}
          className="h-10 w-20"
        />
        <h1 className="text-blue-500 text-lg">Welcome To Meta Messenger</h1>
      </div>
      <div>
        <Link href={"/auth/signin"} className="bg-blue-500 text-white p-2">
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
