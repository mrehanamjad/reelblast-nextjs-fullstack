"use client";
import { useState } from "react";
import { VidI } from "@/lib/api-client";
import VideoComponentSM from "@/components/VideoComps/VideoComponentSM";
import ScreenLoader from "@/components/ScreenLoader";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { useRouter } from "next/navigation";
import NotFound, { NotFoundI } from "../NotFound";


export interface VideoSMI {
    _id: string;
    videoIdImagekit: string;
    videoUrl: string;
    title: string;
    createdAt?: Date;
    likeCount?: number;
    userId: string;
    userName: string;
    profilePicUrl: string;
    description?: string;
  };


function VideoFeedSM({
  reelsLG,
  reelsSM,
  isLoading = false,
  notFound,
}: {
  reelsLG?: VidI[];
  reelsSM?: VideoSMI[];
  isLoading?: boolean;
  notFound: NotFoundI;
}) {
  const [playOnFeed, setPlayOnFeed] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const router = useRouter();

  const reels = reelsLG ?? reelsSM;

  function normalizeVideo(reel: VidI | VideoSMI): VideoSMI {
    if ("userName" in reel) return reel;
  
    return {
      _id: reel._id?.toString() ?? "",
      videoIdImagekit: reel.videoIdImagekit,
      videoUrl: reel.videoUrl,
      title: reel.title,
      createdAt: reel.createdAt as Date,
      likeCount: reel.likes?.length ?? 0,
      userId: reel.userId?.toString() ?? "",
      userName: reel.user?.userName ?? "Unknown",
      profilePicUrl: reel.user?.profilePic?.url ?? "",
    };
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6 mb-4">
        <ScreenLoader />
      </main>
    );
  }

  if (!reels || reels.length === 0) {
    return (
      <NotFound NotFound={notFound}  />
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 mb-4">
      {reelsLG && playOnFeed ? (
        <div className="bg-black absolute top-0 h-full w-full">
          <VideoFeed videos={reelsLG} playingVideoIndex={currentVideoIndex} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reels.map((reel, idx) => {
            const video = normalizeVideo(reel);

            return (
              <VideoComponentSM
                key={video._id}
                video={video}
                onclick={() => {
                  if (reelsLG) {
                    setPlayOnFeed(true);
                    setCurrentVideoIndex(idx);
                  } else {
                    router.push(`/video/${video._id}`);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default VideoFeedSM;
