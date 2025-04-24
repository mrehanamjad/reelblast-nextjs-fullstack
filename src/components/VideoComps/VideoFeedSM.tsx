"use client"
import { useState, useEffect } from "react";
import { BookmarkIcon, Clapperboard } from "lucide-react";
import { apiClient, VidI } from "@/lib/api-client";
import VideoComponentSM from "@/components/VideoComps/VideoComponentSM";
import ScreenLoader from "@/components/ScreenLoader";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { notifications } from "@mantine/notifications";

function VideoFeedSM({apiName,username}:{apiName:string,username?:string}) {
    const [reels, setReels] = useState<VidI[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [playOnFeed, setPlayOnFeed] = useState(false);
      const [currentVideoIndex,setCurrentVideoIndex] = useState(0)
    
      useEffect(() => {
        const fetchreels = async () => {
          setIsLoading(true);
          try {
            const data = apiName === "save" ? await apiClient.getSavedVideos() : await apiClient.getUserVideos(username!);
            setReels(data);
            setIsLoading(false);
          } catch (error) {
            console.error(`Error fetching ${apiName} reels:`, error);
            setIsLoading(false);
            notifications.show({
              title: "Error",
              message: `Failed to fetch ${apiName} reels`,
              color: "red",
            });
          }
        };
    
        fetchreels();
      }, []);
    
  return (
       <main className="container mx-auto px-4 py-6 mb-4">
            {isLoading ? (
              <ScreenLoader />
            ) : reels.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                {apiName == 'save' ? <BookmarkIcon size={64} className="text-gray-300 mb-4" />: <Clapperboard size={64} className="text-gray-300 mb-4" /> }
                <h2 className="text-xl font-medium text-gray-600">
                  {apiName == 'save' ? "No saved reels yet" : "No videos yet "}
                </h2>
                <p className="text-gray-500 mt-2">
                {apiName == 'save' ? "Reels you save will appear here" : "Start uploading to share your creativity"}
                </p>
              </div>
            ) : playOnFeed ? (
              <div className="bg-black absolute top-0 h-full w-full">
              <VideoFeed videos={reels} playingVideoIndex={currentVideoIndex} /></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reels.map((reel,idx) => (
                  <VideoComponentSM
                  key={idx}
                  video={reel}
                  onclick={() => {
                    setPlayOnFeed(true);
                    setCurrentVideoIndex(idx);
                  }}
                />
                
                ))}
              </div>
            )}
          </main>
  )
}

export default VideoFeedSM