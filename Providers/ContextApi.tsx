"use client";
import SocketModel from "@/Models/Sockets";
import React, { createContext, useState } from "react";

type storeState = {
  recepientId: string;
  setRecepient: (val: string) => void;
  // getrecepientSocket: () => Promise<string>;
};

const gcp: storeState = {
  recepientId: "",
  setRecepient: (val: string) => {},
  // getrecepientSocket: async () => {
  //   return "";
  // },
};
export const MyContext = createContext<storeState>(gcp);
type ctxProps = {
  children: React.ReactNode;
};
export const GlobalConvProvider: React.FC<ctxProps> = ({ children }) => {
  const [recepientId, setrecepientId] = useState<string>("");
  const ChangeRecepient = (val: string) => {
    console.log(val);
    setrecepientId(val);
  };

  const contextValue: storeState = {
    recepientId,
    setRecepient: ChangeRecepient,
    // getrecepientSocket: GetrecepSocket,
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
