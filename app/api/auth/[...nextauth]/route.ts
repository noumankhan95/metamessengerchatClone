import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
export const authOptions = {
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log(token, "token");
      console.log(user, "user");

      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      console.log(token, "token");

      session.user._id = user._id;
      return session;
    },
  },
  secret: "4324dasrfsdfsd3DFSDFSD34",
  strategy: "jwt",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "email", type: "email" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          // console.log(credentials, "credes");
          await dbConnect();

          const [u]: User[] = await User.find({ email: credentials!.email });
          // console.log("u", u);

          if (u) {
            if (u.password === credentials!.password) {
              return Promise.resolve(u);
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
