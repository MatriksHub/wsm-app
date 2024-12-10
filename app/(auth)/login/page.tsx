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
import { loginSchema } from "@/lib/validations";

  
export default function LoginPage() {
    const router = useRouter();

     // show and hide password
    const [show, setShow] = useState(false);

    // Login Validation
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
        const validationErrors: { [key: string]: string } = {};
        result.error.errors.forEach((err) => {
        validationErrors[err.path[0] as string] = err.message;
        });
        setErrors(validationErrors);
        return;
    }

    try {
        const response = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false, // Do not redirect on success, handle manually
        });
  
        if (response?.error) {
          setErrors({ general: response.error });
        } else {
          toast.success("Login successfull!");
          router.push("/dashboard/overview"); // Redirect to a secure page
        }
      } catch (error) {
        setErrors({ general: "An unexpected error occurred. Please try again." });
        setLoading(false);
      }
    };
  
    //button disabled
    const isButtonDisabled = !formData.email || !formData.password;
    

  return (
    <div className="w-full h-auto md:h-auto md:flex bg-white text-[#201b51]">
        
        {/* left side */} 
        <div className="hidden md:block w-1/2 h-full">
            <Image
                src={cover_image}
                alt="cover-image"
                className="h-[100%] object-cover"
            />
        </div>

        {/* right side */}
        <div className=" w-full h-screen md:w-1/2 md:h-[100%] flex flex-col justify-center items-center gap-4 mb-3 ">
            <div className="flex items-center justify-center ">
                <Link href='/' className=" mb-4 cursor-pointer">
                    <Image 
                        src={logo}
                        alt="logo"
                        className="pt-8 w-[100px]"
                    />
                </Link>
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
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="mail@example.com"
                            className={`box w-full border rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                                ${errors.email ? "border-red-500" : "border-[#201b51]"}`}                            
                        />
                        {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}
                        <FaEnvelope className='absolute top-[56%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type={!show ? "password" : "text"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={`box w-full border  rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                                ${errors.password ? "border-red-500" : "border-[#201b51]"}`}
                        />
                        {errors.password && <p className="text-red-500 text-[12px]">{errors.password}</p>}
                        {show && <FaEye onClick={() => setShow(!show)} className='absolute top-[56%] right-3' />} 
                        {!show && <FaEyeSlash onClick={() => setShow(!show)} className='absolute top-[56%] right-3' />} 
                    </div>

                    <button 
                        type="submit"
                        disabled={isButtonDisabled || loading}
                        className={`w-full border-2 font-bold rounded-lg my-4
                            ${
                                isButtonDisabled || loading
                                  ? "border-[#ffdcc1] cursor-not-allowed text-[#7a76a0]"
                                  : "border-[#e16d17] text-[#201b51]"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className='flex gap-2 items-center justify-center w-full'>
                        <span className='text-[#201b51] text-[14px] font-semibold'>
                            Don&apos;t have an account? 
                        </span>
                        <span className=''>
                            <Link href='/signup' className=' font-extrabold text-[#e16d17] cursor-pointer'>
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


