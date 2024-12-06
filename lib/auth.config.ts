import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from './prisma'
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";


export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    session: {
        strategy: "jwt",
    },
    providers: [ 
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const userExist = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                });
                
                if (!userExist) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, userExist.password);

                if(!passwordMatch) {
                    return null;
                }
          
                return { 
                    id: `${userExist.id}`, 
                    name: userExist.name, 
                    email: userExist.email, 
                    role: userExist.role 
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user)
          if (user) {
            return {
                ...token,
                email: user.email,
            }
          }
          return token;
        },
        async session({ session, token }) {
            console.log(token, user)
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email
                }
            }
        //   session.user = { 
        //     id: token.id, 
        //     role: token.role, 
        //     email: token.email 
        // };
          return session;
        },
    },
    
}

