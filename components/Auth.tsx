import React from "react";
import { getProviders } from "next-auth/react";
import AuthForm from "./AuthForm";
type pageprops = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};
function Auth({ providers }: pageprops) {
  return (
    <div className="my-4 mx-4 md:mx-0">
      <h2 className="text-center text-2xl font-bold text-blue-400">
        Sign In With {Object.keys(providers!)[0]}
      </h2>
      <AuthForm />
    </div>
  );
}

export default Auth;
