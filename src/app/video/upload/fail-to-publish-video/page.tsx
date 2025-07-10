"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const FailToPublishVideo = () => {
  useEffect(() => {
    setTimeout(() => {
      redirect("/video/upload")
    }, 300);
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="flex items-start w-[430px] h-28 max-w-full bg-[#2d2d2d] text-white rounded-md shadow-lg p-4 pl-2 ">
        <div className="w-2 h-full bg-red-600 rounded mr-3" ></div>

        {/* Message Content */}
        <div className="flex-1 flex h-full  justify-center flex-col items-start">
          <h2 className=" font-semibold text-white text-xl mb-1">Error</h2>
          <p className="text-lg text-gray-300">Failed to publish video. Please try again.</p>
        </div>

        {/* Close Button */}
        {/* <Link href={"/video/upload"}> */}
        <button
          className="text-gray-400 cursor-pointer h-full flex justify-center items-center hover:text-white transition-colors "
          onClick={()=> redirect("/video/upload")}
        >
          <X size={24} />
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default FailToPublishVideo;
