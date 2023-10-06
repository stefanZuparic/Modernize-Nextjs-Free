import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/app/lib/axios";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(jwt: JWT) {
  console.log("refresh", jwt);
  try {
    const response = await axios.post("/auth/refresh", {
      refreshToken: jwt.refreshToken,
    });

    if (response.status != 200) {
      throw response.statusText;
    }

    return {
      ...jwt,
      token: response.data.token,
      tokenExpires: response.data.tokenExpires,
    };
  } catch (error) {
    console.log(error);

    return {
      ...jwt,
      error: "RefreshAccessTokenError",
    };
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/pub/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("/auth/login", {
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = res.data;
          if (res.status == 200 && user) {
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          console.error(error.response);
          return error.message;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // if (trigger === "update") return { ...token, ...session.user };

      if (user) return { ...token, ...user };

      if (Date.now() < Date.parse(token.tokenExpires)) return token;

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    maxAge: 10 * 60,
  },
};
