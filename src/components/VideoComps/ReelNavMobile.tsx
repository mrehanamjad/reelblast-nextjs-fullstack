"use client"
import React from 'react'
import { Search } from 'lucide-react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
function ReelNavMobile() {
  const pathname = usePathname();

  return (
    <div className={`w-full absolute flex justify-center items-center z-40 ${pathname == "/" || pathname == "/followings" ? "": "hidden"} sm:hidden`}>
      <div className='flex max-w-sm px-1 pr-4 w-full justify-between items-center'>
      <p className='text-black font-bold flex flex-col justify-center items-center text-xl'><span className='-mb-2'>Reel</span><span className='-mt-2'>Blast</span></p>
      <div  className='text- font-semibold flex gap-2'>
        <Link href={"/"}>
        <button className={`cursor-pointer ${pathname == "/" ? "text-white" : ""}`}>All Reels</button>
        </Link>
        <Link href={"/followings"}>
        <button className={`cursor-pointer ${pathname == "/" ? "" : "text-white"}`}>Following</button></Link>
      </div>
      <button className='p-2'>
      <Search size={24} /></button>
      </div>
    </div>
  )
}

export default ReelNavMobile