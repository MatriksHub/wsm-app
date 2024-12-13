import { NextAuthConfig, DefaultSession } from "next-auth";
import {JWT } from 'next-auth/jwt'

interface Credentials {
    email: string;
    password: string;
    role: string;
}

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        // role: string;
    }
    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email: string;
        role: string;
    }
}