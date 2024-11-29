"use client"

import { useState } from "react";
// import Router, { useRouter } from "next/router";
import Image from "next/image";
import cover_image from "../../../public/worspace.jpeg";
import logo from '../../../public/matrikslogo.png';
import Link from "next/link";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUnlock, FaUser } from "react-icons/fa";
// import { LuUser } from "react-icons/lu";


function SignUp() {

    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)

    // state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // handle submit
    const handleSignUp = async (e: any) => {
        e.preventDefault();
    
        // password match
        if (password !== confirmPassword) {
            console.log('Password does not match');
            toast.error('Password does not match');
            return;
        }

        try {
            // form submit
            const formSignup = {
                fullName, email, password
            };

            const url = '/api/user/signup';

            await fetch(url, );
            toast.success('Form submitted successfully');
            console.log(formSignup);
    
            // navigate user to Login page
            // navigate('/login')
         } catch (error) {
            console.error('Error Submitting Form');
            toast.error('Failed to submit form');
         }
        
        }


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
                Register
            </h1>

            <div className="border border-[#201b51] rounded-[5px] shadow-2xl p-8 ">
                
                <form onSubmit={handleSignUp}>
                    <div className="py-1 w-full relative">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input
                            type="text"
                            value={fullName}
                            placeholder="Enter name"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="fullname"
                            id="fullName"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <FaUser className='absolute top-[55%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className='absolute top-[55%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type={!showP ? "password" : "text"}
                            value={password}
                            placeholder="Enter password"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {showP && <FaUnlock onClick={() => setShowP(!showP)} className='absolute top-[55%] right-3' /> }
                        {!showP && <FaLock onClick={() => setShowP(!showP)} className='absolute top-[55%] right-3' /> }
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="confirmPassword" className="font-semibold">Confirm Password</label>
                        <input
                            type={!showCP ? "password" : "text"}
                            value={confirmPassword}
                            placeholder="Re-type password"
                            className="box w-full border border-[#201b51] rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {showCP && <FaUnlock onClick={() => setShowCP(!showCP)} className='absolute top-[55%] right-3' /> }
                        {!showCP && <FaLock  onClick={() => setShowCP(!showCP)} className='absolute top-[55%] right-3' /> }
                    </div>

                    <button 
                        type="submit"
                        // onClick={() => Router.push('/login')}
                        className="w-full bg-[#e16d17] text-white font-semibold rounded-lg my-4"
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

