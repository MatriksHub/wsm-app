"use client"

import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import Image from "next/image";
import cover_image from "../../../public/worspace.jpeg";
import logo from '../../../public/matrikslogo.png';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
// import axios from "axios";

const FormSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });


const SignUp = () => {

    const router = useRouter();

    // show and hide password
    const [showP, setShowP] = useState(false);
    const [showCP, setShowCP] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
    
      const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
      };



  return (
    <div className="w-full h-auto md:h-auto flex bg-white text-[#201b51]">
        
        {/* left side */} 
        <div className="hidden md:block w-1/2 h-full">
            <Image
                src={cover_image}
                alt="cover-image"
                className="h-[100%] object-cover"
            />
        </div>

        {/* right side */}
        <div className=" w-full md:w-1/2 md:h-[100%] flex flex-col justify-center items-center gap-4 mb-3 ">
            <div className="flex items-center justify-center ">
                <Image 
                    src={logo}
                    alt="logo"
                    className="pt-8 w-[100px]"
                />
            </div>

            <h1 className="flex items-center justify-center text-4xl font-bold pt-3 pb-2">
                Register
            </h1>

            <div className="border border-[#201b51] rounded-[5px] shadow-2xl px-8 py-4">
                
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-3'>
                    <div className="py-1 w-full relative">
                        <label htmlFor="fullName" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            // value={name}
                            placeholder="John Doe"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="name"
                            id="name"
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FaUser className='absolute top-[55%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            // value={email}
                            placeholder="mail@example.com"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="email"
                            id="email"
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className='absolute top-[55%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type={!showP ? "password" : "text"}
                            // value={password}
                            placeholder="Enter your password"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="password"
                            id="password"
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {showP && <FaEye onClick={() => setShowP(!showP)} className='absolute top-[55%] right-3' /> }
                        {!showP && <FaEyeSlash onClick={() => setShowP(!showP)} className='absolute top-[55%] right-3' /> }
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="confirmPassword" className="font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type={!showCP ? "password" : "text"}
                            // value={confirmPassword}
                            placeholder="Re-type your password"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="confirmPassword"
                            id="confirmPassword"
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {showCP && <FaEye onClick={() => setShowCP(!showCP)} className='absolute top-[55%] right-3' /> }
                        {!showCP && <FaEyeSlash  onClick={() => setShowCP(!showCP)} className='absolute top-[55%] right-3' /> }
                    </div>

                    <button 
                        type="submit"
                        // onClick={() => Router.push('/login')}
                        className="w-full bg-[#e16d17] text-white font-semibold rounded-lg my-2"
                    >
                        Create Account
                    </button>

                    <div className='flex gap-2 items-center justify-center w-full'>
                        <span className='text-[#201b51] text-[14px] font-semibold'>
                            Already have an account? 
                        </span>
                        <span className=''>
                            <Link href='/login' className=' font-extrabold text-[#e16d17] cursor-pointer'>
                                Login
                            </Link>
                        </span>
                    </div>
                </form>

            </div>
        </div>

    </div>

  );
}

export default SignUp;

