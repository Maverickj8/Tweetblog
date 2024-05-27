import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import dbConnect from "@/app/models/Index";
import bcrypt from "bcrypt";

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 50000,
    updateAge: 50000,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  secret: process.env.SECRET,
  jwt: {},
  pages: {
    signIn: "/Login",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        //   username: { label: "Username", type: "text", placeholder: "jsmith" },
        //   password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplies
        const { email, password } = credentials;
        const { Users } = await dbConnect();
        const user = await Users.findOne({ email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const match = await bcrypt.compare(password, user.password);

          if (match) {
            return { id: `${user._id}`, email: user.email, name: user.name };
          } else {
            // throw new Error("Incorrect username or password");
            return null;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          //   throw new Error("Incorrect username or password");
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      async authorized({ request, auth }) {
        const url = request.nextUrl;

        if (request.method === "POST") {
          const { authToken } = (await request.json()) ?? {};
          // If the request has a valid auth token, it is authorized
          const valid = await validateAuthToken(authToken);
          if (valid) return true;
          return NextResponse.json("Invalid auth token", { status: 401 });
        }

        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth.user;
      },
    }),

    GithubProvider({
      profile(profile) {
        console.log("profile Github:", profile);
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),

    GoogleProvider({
      profile(profile) {
        console.log("profile Google:", profile);
        return {
          ...profile,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.token = token.role;
      return session;
    },
  },
};
