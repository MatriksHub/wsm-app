

import Image from "next/image";
 import worspace from "../public/worspace.jpeg";
 import Link from "next/link";
import matrikslogo4 from "../public/matrikslogo 4 (1).png"


export default function Home() {
  return (
    <div className="w-full h-[100vh] md:flex ">
      {/* landing page image */}
      <div className="hidden h-full md:w-1/2 md:flex">
        <Image src={worspace} 
         alt="workspace"
         className="w-full h-full object-cover"
         />
      </div>

      {/* landing-page-text */}
      <div className="w-full h-full bg-[#ffffff] flex flex-col justify-center items-center gap-10 px-16 py-20 md:w-1/2">
      {/* logo */}
      <div className="pb-6">
        <Image src={matrikslogo4}
        alt="matrikshublogo"
        className="w-full h-full"
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="w-full text-[47px] leading-[52px] text-center font-bold text-[var(--primary-color)]">
          Work Spaces just got better with Matrikshub
        </p>
      </div>
      <div className="flex gap-[30px] text-semibold text-center ">
        <Link href="/login"
        className="border border-[#e16d17] border-solid px-10 py-2 text-[15px] rounded-[5px]"
        >Login
        </Link>

        <Link href="/signup"
        className="border bg-[#e16d17] px-8 py-2 rounded-[5px] text-[#ffffff]"
        >Create Account</Link>
      </div>

      </div>

import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div className="h-[100vh]">
      <ToastContainer limit={1} position='top-center' />

    </div>
  );
}
