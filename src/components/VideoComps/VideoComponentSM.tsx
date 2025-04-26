import { VidI } from "@/lib/api-client";
import { IKVideo } from "imagekitio-next";
import { Heart } from "lucide-react";
import React from "react";
import VideoMenu from "./VideoMenu";
import { useSession } from "next-auth/react";
import ProfilePic from "../UserComps/ProfilePic";
import Link from "next/link";
import { VideoSMI } from "./VideoFeedSM";

function VideoComponentSM({
  video,
  onclick,
}: {
  video: VideoSMI;
  onclick?: () => void;
}) {
  const { data: session } = useSession();

  return (
    <div className="relative w-fit group cursor-pointer" onClick={onclick}>
      {session?.user.id === video.userId && (
        <VideoMenu
          videoId={video._id}
          videoIdImagekit={video.videoIdImagekit}
          className="absolute top-2 right-2 z-20"
        />
      )}

      <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
        <Link href={`/${video.userName}`}>
          <ProfilePic url={video.profilePicUrl} name={video.userName} />
        </Link>
        <Link
          href={`/${video.userName}`}
          className="font-semibold hover:underline hover:text-cyan-200 text-white text-sm"
        >
          {video.userName}
        </Link>
      </div>

      {video.likeCount !== undefined && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl hidden group-hover:flex flex-col items-center z-20">
          <Heart size={38} className="fill-white" />
          <span>{video.likeCount}</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2">
        <p className="text-sm font-medium text-white truncate w-full">
          {video.title}
        </p>
        {video.description && (
          <p className="text-xs text-white truncate w-full">
            {video.description}
          </p>
        )}
      </div>

      <IKVideo
        path={video.videoUrl}
        transformation={[{ height: "1920", width: "1080" }]}
        controls={false}
        autoPlay={false}
        loop
        muted={true}
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}

export default VideoComponentSM;
