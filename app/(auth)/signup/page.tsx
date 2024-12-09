"use client"

import React, { useState } from "react";
import { registerSchema } from "@/lib/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import cover_image from "../../../public/worspace.jpeg";
import logo from '../../../public/matrikslogo.png';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Register() {
    const router = useRouter();

    // show and hide password
    const [showP, setShowP] = useState(false);
    const [showCP, setShowCP] = useState(false);

    // SignUp Form Validation 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const validationErrors: { [key: string]: string } = {};
            result.error.errors.forEach((err) => {
                validationErrors[err.path[0] as string] = err.message;
            });
            setErrors(validationErrors);
            return;
        }
    
        setLoading(true);
        try {
            await axios.post("/api/auth/register", result.data);
            toast.success("Registration successfull!");
            router.push("/login");
        } catch (error) {
            console.error("Registration failed");
            setLoading(false);
        }
    };
    
    //button disabled
    const isButtonDisabled =
        !formData.name || !formData.email || !formData.password || !formData.confirmPassword;


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
        <div className=" w-full h-screen md:w-1/2 md:h-[100%] flex flex-col justify-center items-center gap-2 mb-2">
            <div className="flex items-center justify-center ">
                <Link href='/' className=" mb-4 cursor-pointer">
                    <Image 
                        src={logo}
                        alt="logo"
                        className="pt-8 w-[100px]"
                    />
                </Link>
            </div>

            <h1 className="flex items-center justify-center text-4xl font-bold pt-3 pb-2">
                Register
            </h1>

            <div className="border border-[#201b51] rounded-[5px] px-8 py-4">
                
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                    <div className="py-1 w-full relative">
                        <label htmlFor="name" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`block w-full border px-3 py-2 rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                            ${errors.name ? "border-red-500" : "border-[#201b51]"}`}
                        />
                        <div>
                            {errors.name && <p className="text-red-500 text-[12px]">{errors.name}</p>}
                        </div>
                        <FaUser className='absolute top-[56%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@mail.com"
                            className={`box w-full border rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                                ${errors.email ? "border-red-500" : "border-[#201b51]"}`}                            
                        />
                        {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}
                        <FaEnvelope className='absolute top-[56%] right-3' />
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type={!showP ? "password" : "text"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={`box w-full border  rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                                ${errors.password ? "border-red-500" : "border-[#201b51]"}`}
                        />
                        {errors.password && <p className="text-red-500 text-[12px]">{errors.password}</p>}
                        {showP && <FaEye onClick={() => setShowP(!showP)} className='absolute top-[52%] right-3' /> }
                        {!showP && <FaEyeSlash onClick={() => setShowP(!showP)} className='absolute top-[52%] right-3' /> }
                    </div>

                    <div className="py-1 w-full relative">
                        <label htmlFor="confirmPassword" className="font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type={!showCP ? "password" : "text"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-type your password"
                            className={`box w-full border rounded-md outline-[#e16d17] caret-[#201b51] text-[14px]
                                ${errors.confirmPassword ? "border-red-500" : "border-[#201b51]"}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-[12px]">{errors.confirmPassword}</p>}
                        {showCP && <FaEye onClick={() => setShowCP(!showCP)} className='absolute top-[52%] right-3' /> }
                        {!showCP && <FaEyeSlash  onClick={() => setShowCP(!showCP)} className='absolute top-[52%] right-3' /> }
                    </div>

                    <button 
                        type="submit"
                        disabled={isButtonDisabled || loading}
                        className={`w-full font-semibold rounded-lg my-2
                            ${
                                isButtonDisabled || loading
                                  ? "bg-[#ffdcc1] cursor-not-allowed text-[#7a76a0]"
                                  : "bg-[#e16d17] text-white"
                            }`}
                    >
                        {loading ? "Submitting..." : "Create Account"}
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


