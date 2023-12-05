"use client";
import React from "react";

function Signout() {
  return (
    <button
      onClick={() => {
        console.log("hello");
      }}
      className="p-2 text-blue-500"
    >
      Sign out
    </button>
  );
}

export default Signout;
