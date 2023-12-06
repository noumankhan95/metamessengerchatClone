"use client";
import React from "react";
import { signOut } from "next-auth/react";

function Signout() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="p-2 text-blue-500"
    >
      Sign out
    </button>
  );
}

export default Signout;
