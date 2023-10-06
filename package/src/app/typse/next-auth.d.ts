import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { Dozvola } from "../models/dozvola";
import { Prostor } from "../models/prostor";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      refreshToken: string;
      dozvole: Dozvola[];
      username: string;
      password: string;
      tokenExpires: string;
      error: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      token: string;
      refreshToken: string;
      dozvole: Dozvola[];
      username: string;
      password: string;
    };
    tokenExpires: string;
    error: string;
  }
}
