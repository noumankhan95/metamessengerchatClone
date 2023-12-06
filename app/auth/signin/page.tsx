import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Auth from "@/components/Auth";
async function Signin() {
  const Providers = await getProviders();
  return (
    <div>
      <Auth providers={Providers} />
    </div>
  );
}

export default Signin;
