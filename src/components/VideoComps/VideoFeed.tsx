"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import VideoComponent from "./VideoComponent";
import { VidI } from "@/lib/api-client";
import ReelNavMobile from "./ReelNavMobile";

interface VideoFeedProps {
  videos: VidI[];
  playingVideoIndex?: number;
}

export default function VideoFeed({
  videos,
  playingVideoIndex = 0,
}: VideoFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  // Initial state should reflect the prop
  const [currentVideoIndex, setCurrentVideoIndex] = useState(playingVideoIndex);
  const feedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [videos]);

  // Scroll to the specified initial video once loading is complete
  useEffect(() => {
    if (!isLoading && videos.length > 0) {
      const initialVideo = document.getElementById(`reel-${playingVideoIndex}`);
      if (initialVideo) {
        initialVideo.scrollIntoView({ behavior: "auto", block: "center" });
        setCurrentVideoIndex(playingVideoIndex);
      }
    }
  }, [isLoading, playingVideoIndex, videos]);

  // Set up intersection observer to detect which video is currently visible
  useEffect(() => {
    if (!isLoading && videos.length > 0) {
      console.log("observerRef.current", observerRef.current);
      observerRef.current = new IntersectionObserver(
        (entries) => {
          console.log("entries", entries);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.id.split("-")[1]);
              setCurrentVideoIndex(index);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.7, // Consider video visible when 70% is in view
        }
      );

      console.log("videoRefs.current", videoRefs.current);
      // Observe all video elements
      videoRefs.current.forEach((ref) => {
        if (observerRef.current && ref) {
          observerRef.current.observe(ref);
        }
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [isLoading, videos]);

  // Navigate to next video

const goToNextVideo = useCallback(() => {
  if (currentVideoIndex < videos.length - 1) {
    const nextIndex = currentVideoIndex + 1;
    const nextVideo = document.getElementById(`reel-${nextIndex}`);
    if (nextVideo) {
      nextVideo.scrollIntoView({ behavior: "smooth", block: "center" });
      setCurrentVideoIndex(nextIndex);
    }
  }
}, [currentVideoIndex]);

  // Navigate to previous video
  const goToPrevVideo = useCallback(() => {
  if (currentVideoIndex > 0) {
    const prevIndex = currentVideoIndex - 1;
    const prevVideo = document.getElementById(`reel-${prevIndex}`);
    if (prevVideo) {
      prevVideo.scrollIntoView({ behavior: "smooth", block: "center" });
      setCurrentVideoIndex(prevIndex);
    }
  }
}, [currentVideoIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        goToNextVideo();
      } else if (e.key === "ArrowUp" || e.key === "k") {
        goToPrevVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentVideoIndex,goToNextVideo, goToPrevVideo]); 

  // Handle touch swipe gestures
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // If swipe distance is significant enough
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextVideo(); // Swipe up
      } else {
        goToPrevVideo(); // Swipe down
      }
    }
    touchStartY.current = null;
  };

  return (
    <div
      ref={containerRef}
      className=" bg-black min-h-screen relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* <div className="text w-full absolute justify-center items-center bg-red-500 z-20 text-black pt-5 flex top-0 ">For You | Following</div> */}
      <ReelNavMobile />
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : videos.length > 0 ? (
        <div
          ref={feedRef}
          className="h-screen snap-y snap-mandatory overflow-y-scroll"
        >
          {videos.map((video, index) => (
            <div
              key={video._id?.toString() || index}
              id={`reel-${index}`}
              ref={(el) => {
                if (el) videoRefs.current.set(index, el);
              }}
              className="h-screen snap-start snap-always"
            >
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center text-white p-4">
          <div className="w-20 h-20 rounded-full bg-indigo-900 flex items-center justify-center mb-4">
            <span className="text-3xl">🎬</span>
          </div>
          <p className="text-xl font-medium mb-2">No reels found</p>
          <p className="text-gray-400 text-center">
            Discover trending videos or create your own
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium text-lg">
            Explore Reels
          </button>
        </div>
      )}

      {/* Navigation buttons - fixed to the side */}
      {!isLoading && videos.length > 1 && (
        <>
          <button
            onClick={goToPrevVideo}
            disabled={currentVideoIndex === 0}
            className={`fixed z-40 right-4 top-1/4 transform -translate-y-1/2 bg-black bg-opacity-40 rounded-full p-3 ${
              currentVideoIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-70 hover:opacity-100"
            } transition-opacity duration-300 max-sm:hidden`}
            aria-label="Previous video"
          >
            <ChevronUp size={24} className="text-white" />
          </button>

          <button
            onClick={goToNextVideo}
            disabled={currentVideoIndex === videos.length - 1}
            className={`fixed z-40 right-4 top-3/4 transform -translate-y-1/2 bg-black bg-opacity-40 rounded-full p-3 ${
              currentVideoIndex === videos.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-70 hover:opacity-100"
            } transition-opacity duration-300 max-sm:hidden`}
            aria-label="Next video"
          >
            <ChevronDown size={24} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
}
