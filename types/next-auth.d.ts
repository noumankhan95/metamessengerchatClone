import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
    } & DefaultSession["user"];
  }
  interface User {
    _id: string;
    email: string;
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
