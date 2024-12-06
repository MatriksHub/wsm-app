import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";
import * as z from 'zod'

// Schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'full name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
  
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password} = userSchema.parse(body);

    const userEmailExist = await prisma.user.findUnique({
      where: {email: email}
    });

    if (userEmailExist) {
      return NextResponse.json({
        user: null,
        message: 'User email exist',
      }, { status: 409})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword 
      },
    });

    // hide password from message
    const { password: newUserPassword, ...rest} = newUser;

    return NextResponse.json(
      { 
        user: rest,
        message: 'User created successfuly',
      }, 
      { status: 201} 
    ); 

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!"}, {status: 500});
  }
}
