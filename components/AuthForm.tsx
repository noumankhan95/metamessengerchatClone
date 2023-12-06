"use client";
import React, { useCallback, useReducer, useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type AuthreducerState = {
  email: string;
  name: string;
  password: string;
};
type AuthReducerAction = { type: string; payload?: { value: string } };

const initialState: AuthreducerState = {
  email: "",
  name: "",
  password: "",
};
const Authreducer = (state: AuthreducerState, action: AuthReducerAction) => {
  console.log(state);
  switch (action.type) {
    case "email":
    case "name":
    case "password":
      return { ...state, [action.type]: action.payload!.value };
    case "clear":
      return { email: "", name: "", password: "" };
    default:
      return { ...state };
  }
};
function AuthForm() {
  const [state, dispatch] = useReducer(Authreducer, initialState);
  const [signup, setsignup] = useState<boolean>(true);
  const session = useSession();
  const router = useRouter();
  console.log(session, "session");
  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        console.log(state, signup);

        e.preventDefault();
        if (!state.email || !state.password) {
          console.log("none");
          return;
        }

        if (signup) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: "POST",
            body: JSON.stringify(state),
            cache: "no-cache",
          });
          if (!res.ok) throw "error";
          const { status } = await res.json();
          if (status) {
            alert("Done");
          }
        } else {
          const result = await signIn("credentials", {
            ...state,
            callbackUrl: `${process.env.NEXT_PUBLIC_URL}/Home`,
            redirect: false,
          });
          if (result?.ok) {
            router.replace(`${process.env.NEXT_PUBLIC_URL}/Home`);
          } else {
            alert("Error Occured");
          }
        }
      } catch (er) {
        console.log(er);
      }
    },
    [state, signup]
  );
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: e.target.name, payload: { value: e.target.value } });
    },
    []
  );
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col max-w-xl m-auto space-y-2"
    >
      {signup && (
        <>
          <label className="text-xl md:text-2xl text-blue-400">Name</label>
          <input
            type="text"
            onChange={changeHandler}
            name="name"
            value={state.name}
            className="focus:outline-blue-500 border-2 px-1 py-2 border-slate-400 rounded-lg"
          />
        </>
      )}
      <label className="text-xl md:text-2xl text-blue-400">Email</label>
      <input
        type="email"
        onChange={changeHandler}
        name="email"
        value={state.email}
        className="focus:outline-blue-500 border-2 px-1 py-2 border-slate-400 rounded-lg"
      />
      <label className="text-xl md:text-2xl text-blue-400">Password</label>
      <input
        type="password"
        onChange={changeHandler}
        name="password"
        value={state.password}
        className="focus:outline-blue-500 border-2 px-1 py-2 border-slate-400 rounded-lg"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white w-32 rounded-md text-center mx-auto"
      >
        Submit Form
      </button>
      <button
        className=" text-blue-400 "
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          dispatch({ type: "clear" });
          setsignup((p) => !p);
        }}
      >
        {signup ? "Login Instead" : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm;
