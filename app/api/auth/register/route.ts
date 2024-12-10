import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import * as z from 'zod';


// Schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'full name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  
export async function POST(req: Request) {
  try {
    // SignUp Form Authentication
    const body = await req.json();
    const { name, email, password} = userSchema.parse(body);

    // check if email already exists 
    const userEmailExist = await prisma.user.findUnique({
      where: {email: email}
    });

    if (userEmailExist) {
      return NextResponse.json({
        user: null,
        message: 'This email is already registered, please login!',
      }, { status: 409})
    }
    
    // hash user password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create new user
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
        message: 'Account created successfully!',
      }, 
      { status: 201} 
    ); 

  } catch (error) {
    return NextResponse.json(
      { 
        message: "Account creation failed, please try again!"
      }, 
      {status: 500}
    );
  };
}
