'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className=" bg-[#63BBF2] text-white " >
    
        <div className="flex justify-center">

            <Image src="/EB3.png" className="mt-5 h-28 w-auto " alt="logo" height={90} width={110}/>
        </div>

        <div className="flex justify-end ">
            <div className= " bg-white text-[#63BBF2] font-bold py-4 px-6 mr-2 rounded-full">
            Rs-3000/-
        </div>

    <button type="button" className="flex group justify-end py-4 px-6 mr-5 bg-sky-600 hover:bg-[#ffffff] transition-all duration-200 ease-in-out rounded-xl ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-[#000000] transition-all duration-200 ease-in-out">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>

    </button>
</div>

    <ul className="px-28 py-4 flex space-x-11 justify-center">
        <Link href="/" className="hover:text-[#03658C] transition-all duration-200 ease-in-out text-lg font-semibold hover:px-5">Home</Link>
        <Link href="/track" className="hover:text-[#03658C] transition-all duration-200 ease-in-out text-lg font-semibold hover:px-5">Track</Link>
        <Link href="/about" className="hover:text-[#03658C] transition-all duration-200 ease-in-out text-lg font-semibold hover:px-5">About</Link>
        <Link href="/Team" className="hover:text-[#03658C] transition-all duration-200 ease-in-out text-lg font-semibold hover:px-5">Team</Link>
    </ul>


</nav>
  )
}

export default Navbar;