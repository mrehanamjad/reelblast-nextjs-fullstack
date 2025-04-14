"use client";
import { useState, useEffect } from "react";
import { BookmarkIcon, HeartIcon, ArrowLeftIcon } from "lucide-react";
import { VidI } from "@/lib/api-client";
import VideoComponentSM from "@/components/VideoComps/VideoComponentSM";
import ScreenLoader from "@/components/ScreenLoader";
import VideoFeed from "@/components/VideoComps/VideoFeed";

const SavedReelsPage = () => {
  const [savedReels, setSavedReels] = useState<VidI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playOnFeed, setPlayOnFeed] = useState(false);
  const [currentVideoIndex,setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    const fetchSavedReels = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/videos/bulk/save");
        const data = await res.json();
        setSavedReels(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching saved reels:", error);
        setIsLoading(false);
      }
    };

    fetchSavedReels();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-black/95 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Saved Reels</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <ScreenLoader />
        ) : savedReels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <BookmarkIcon size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">
              No saved reels yet
            </h2>
            <p className="text-gray-500 mt-2">
              Reels you save will appear here
            </p>
          </div>
        ) : playOnFeed ? (
          <VideoFeed videos={savedReels} playingVideoIndex={currentVideoIndex} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedReels.map((reel,idx) => (
              <VideoComponentSM key={idx} video={reel} onclick={()=>{
                setPlayOnFeed(true);
                setCurrentVideoIndex(idx)
            }}  />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedReelsPage;
