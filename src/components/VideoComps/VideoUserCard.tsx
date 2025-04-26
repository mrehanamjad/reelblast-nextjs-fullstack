import Link from "next/link";
import React from "react";
import ProfilePic from "../UserComps/ProfilePic";

function VideoUserCard({userName, profilePicUrl, createdAt}: {userName: string, profilePicUrl: string, createdAt?: string}) {
  return (
    <div className="flex items-center gap-2 justify-center mb-2">
      <Link href={`/${userName}`}>
        <ProfilePic
          url={profilePicUrl || "./vercel.svg"}
          name={userName || "Anonymous"}
        />
      </Link>
      <div className="flex flex-col justify-center">
        <Link
          href={`/${userName}`}
          className="font-semibold hover:underline hover:text-cyan-200 text-white text-sm"
        >
          {userName || "username"}
        </Link>
        <p className="text-gray-300 text-xs">
          {createdAt
            ? new Date(createdAt).toLocaleDateString()
            : "Just now"}
        </p>
      </div>
    </div>
  );
}

export default VideoUserCard;
