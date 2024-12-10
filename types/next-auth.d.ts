import { NextAuthConfig, DefaultSession } from "next-auth";
import {JWT } from 'next-auth/jwt'

interface Credentials {
    email: string;
    password: string;
    role: any;
}

declare module "next-auth" {
    interface User {
        email: string
    }
    interface Session {
        user: User & {
            email: string
            role: any;
        }
        token: {
            email: string
        }
    }
    interface Session {
        user: {
          id: string;
          name: string;
          email: string;
          role: any;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      email: string;
      role: any;
    }
  }