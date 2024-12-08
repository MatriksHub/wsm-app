"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import cover_image from '../../../public/worspace.jpeg';
import logo from '../../../public/matrikslogo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

  
const Login = () => {

     // show and hide password
    const [show, setShow] = useState(false);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const signInData = await signIn('credentials', {
            email,
            password,
            redirect: false 
        });

        console.log(signInData)

        if (signInData?.error) {
            console.log(signInData.error);
            toast.error('something went wrong')
        } else {
            toast.success("Successfully signed in")
            router.push('/dashboard/overview')
        }
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

            <h1 className="flex items-center justify-center text-4xl font-bold pt-5 pb-2">
                Login
            </h1>

            <div className="w-[350px] border border-[#201b51] rounded-[5px] shadow-2xl p-8 ">
                
                <form onSubmit={handleLogin} className='w-full flex flex-col gap-3'>
                    <div className="py-1 w-full relative">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="mail@example.com"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className='absolute top-[55%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type={!show ? "password" : "text"}
                            value={password}
                            placeholder="Enter your password"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {show && <FaEye onClick={() => setShow(!show)} className='absolute top-[55%] right-3' />} 
                        {!show && <FaEyeSlash onClick={() => setShow(!show)} className='absolute top-[55%] right-3' />} 
                    </div>

                    <button 
                        type="submit"
                        className="w-full border-2 border-[#e16d17] text-[#201b51] font-bold rounded-lg my-4"
                    >
                        Login
                    </button>

                    <div className='flex gap-2 items-center justify-center w-full'>
                        <span className='text-[#201b51] text-[14px] font-semibold'>
                            Don&apos;t have an account? 
                        </span>
                        <span className=''>
                            <Link href='/auth/signup' className=' font-extrabold text-[#e16d17] cursor-pointer'>
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </form>

            </div>
        </div>

    </div>
  );
}

export default Login;

