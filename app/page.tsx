import Image from "next/image";
import worspace from "../public/worspace.jpeg";
import Link from "next/link";
import matrikslogo from "../public/matrikslogo.png";


export default function Home() {
  return (
    <div className="w-full h-[100vh] md:flex items-center justify-center justify-items-center ">
      {/* left landing page image */}
      <div className="hidden h-full md:w-1/2 md:flex">
        <Image 
          src={worspace} 
          alt="workspace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* right landing-page-text */}
      <div className="w-full bg-[#ffffff] flex flex-col justify-center items-center gap-10 p-10 md:w-1/2">
        {/* logo */}
        <div className="pb-6">
          <Link href='/' className="cursor-pointer">
            <Image 
                src={matrikslogo}
                alt="MatriksHub Logo"
                className="w-[150px] h-[150px] m-4"
            />
          </Link>
        </div>

        <div className="m-4 flex items-center justify-center">
          <p className="w-full text-3xl md:text-5xl text-center font-bold text-[var(--primary-color)]">
            Work Space just got better with Matrikshub
          </p>
        </div>
        
        <div className="flex m-6 gap-[30px] ">
          <Link href="/login"
            className="h-[48px] w-[100px] flex items-center justify-center border-2 border-[#e16d17]  rounded-[5px] font-semibold"
          >
            Login
          </Link>

          <Link href="/signup"
          className="h-[48px] w-[150px] flex items-center justify-center bg-[#e16d17] rounded-[5px] text-[#ffffff] font-medium"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

