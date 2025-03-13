import { VideoI } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { useState, useEffect } from "react";

interface VideoFeedProps {
  videos: VideoI[];
  title?: string;
}

export default function VideoFeed({ videos, title }: VideoFeedProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [videos]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div 
              key={`skeleton-${index}`} 
              className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm animate-pulse h-64"
            />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div 
              key={video._id?.toString()} 
              className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <svg 
            className="w-16 h-16 text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M7 4v16M17 4v16M3 8h18M3 16h18"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No videos found</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2 text-center">
            Videos you add will appear here
          </p>
        </div>
      )}
    </div>
  );
}