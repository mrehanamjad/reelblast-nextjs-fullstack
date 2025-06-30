"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
function ReelNavMobile() {
  const pathname = usePathname();

  return (
    <div className={`w-fit absolute left-1/2 top-5 transform -translate-x-1/2 flex justify-center items-center z-40 ${pathname == "/" || pathname == "/followings" ? "": "hidden"} sm:hidden`}>
      <div  className=' font-semibold flex gap-2'>
        <Link href={"/"}>
        <button className={`cursor-pointer ${pathname == "/" ? "text-white" : ""}`}>All Reels</button>
        </Link>
        <Link href={"/followings"}>
        <button className={`cursor-pointer ${pathname == "/" ? "" : "text-white"}`}>Following</button></Link>
      </div>
    </div>
  )
}

export default ReelNavMobile

