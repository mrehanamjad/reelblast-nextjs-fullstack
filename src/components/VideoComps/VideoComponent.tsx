"use client";

import React, { useState, useRef, useEffect } from "react";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { Heart, Send, Volume2, VolumeX, X } from "lucide-react";
import FollowBtn from "../UserComps/FollowBtn";
import { VidI } from "@/lib/api-client";
import ProfilePic from "../UserComps/ProfilePic";
import LikeVideo from "./LikeVideo";
import Comment from "./Comment";
import ShareVideo from "./ShareVideo";
import SaveVideo from "./SaveVideo";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import Image from "next/image";

interface VideoComponentProps {
  video: VidI;
  // onNext?: () => void;
  active?: boolean;
}

export default function VideoComponent({
  video,
  // onNext,
  active = true,
}: VideoComponentProps) {
  // const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(active);
  const [commentText, setCommentText] = useState("");
  const [muteOnTap, setMuteOnTap] = useState(false);
  const [showMuteOnTap, setShowMuteOnTap] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const ikVideoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data: session } = useSession();
  const userId = session?.user.id;
  const _userId = new mongoose.Types.ObjectId(userId);
  // const username = session?.user.username

  // const authUser = useUserProfile()

  // Effect to handle active prop changes
  useEffect(() => {
    if (ikVideoRef.current) {
      if (active) {
        ikVideoRef.current
          .play()
          .catch((err) => console.error("Failed to play:", err));
      } else {
        ikVideoRef.current.pause();
      }
    }
  }, [active]);

  // Handle video tap to toggle play/pause
  const togglePlayPause = (e: React.MouseEvent) => {
    // Don't toggle if click was on a button or control
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    if (ikVideoRef.current) {
      if (isPlaying) {
        ikVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        ikVideoRef.current
          .play()
          .catch((err) => console.error("Failed to play:", err));
        setIsPlaying(true);
      }
    }
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // In a real app, you would submit the comment to your backend
      console.log("Submitting comment:", commentText);
      setCommentText("");
      // Optionally, you could update the local comments list here
    }
  };

  // Calculate video progress as percentage (for progress bar)
  const [progress, setProgress] = useState(0);
  const handleTimeUpdate = () => {
    if (ikVideoRef.current) {
      const percentage =
        (ikVideoRef.current.currentTime / ikVideoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  // Double tap to like
  const lastTap = useRef<number>(0);
  const handleDoubleTap = (e: React.MouseEvent) => {
    // Don't trigger if click was on a button or control
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    const currentTime = new Date().getTime();
    const tapDiff = currentTime - lastTap.current;

    if (tapDiff < 300 && tapDiff > 0) {
      // Double tap detected
      // setLiked(true);
      showHeartAnimation(e.clientX, e.clientY);
    }

    lastTap.current = currentTime;
  };

  const handleToggleMuteOnTap = () => {
    setMuteOnTap(!muteOnTap);
    setIsMuted(!isMuted);
    setShowMuteOnTap(true);
    setTimeout(() => {
      setShowMuteOnTap(false);
    }, 1200);
  };
  // Heart animation on double tap
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const heartIdCounter = useRef(0);

  const showHeartAnimation = (x: number, y: number) => {
    const newHeart = {
      id: heartIdCounter.current++,
      x: x,
      y: y,
    };
    setHearts((prev) => [...prev, newHeart]);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, 1000);
  };
  
  // Handle video visibility and playback and mute state
useEffect(() => {
  if (!videoRef.current) return;

  // Find actual video element inside IKVideo
  const innerVideo = videoRef.current.querySelector("video");
  if (innerVideo) {
    ikVideoRef.current = innerVideo;
  }

  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const videoEl = ikVideoRef.current;
        if (!videoEl) return;

        if (entry.isIntersecting) {
          // Video couser hasn’t interacted:mes into view: play and unmute
          setIsPlaying(true);
          setIsMuted(true);
          videoEl.muted = true;
          videoEl
            .play()
            .catch((err) => console.error("Failed to play:", err));
        } else {
          // Video goes out of view: pause and mute
          setIsPlaying(false);
          setIsMuted(true);
          videoEl.muted = true;
          videoEl.pause();
        }
      });
    },
    { threshold: 0.6 }
  );

  observerRef.current.observe(videoRef.current);

  return () => {
    observerRef.current?.disconnect();
  };
}, []);





  return (
    <div
      onClick={() => handleToggleMuteOnTap()}
      className="relative h-screen  w-full my-auto mx-auto max-w-sm bg-black overflow-hidden snap-center"
    >
      {/* Full Screen Video */}
      <div
        className="absolute inset-0 z-0 "
        onClick={togglePlayPause}
        onDoubleClick={handleDoubleTap}
      >
        <div ref={videoRef} className="w-full h-full">
          <IKVideo
            // ref={ikVideoRef as React.RefObject<HTMLVideoElement>}
            path={video.videoUrl}
            transformation={[
              {
                height: "1920",
                width: "1080",
              },
            ]}
            controls={true}
            autoPlay={active}
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
          />
        </div>

        {/* Video Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 bg-opacity-50">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Play/Pause Indicator (Shows briefly when toggled) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-6">
              <span className="text-white text-6xl">▶</span>
            </div>
          </div>
        )}

        {/* Double-tap heart animation */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-heart-pop"
            style={{
              left: heart.x - 40,
              top: heart.y - 40,
            }}
          >
            <Heart size={80} className="text-red-500 fill-red-500" />
          </div>
        ))}
      </div>

      {showMuteOnTap && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          {muteOnTap ? (
            <Volume2
              size={80}
              className="bg-black/50 p-6 border border-white rounded-full"
            />
          ) : (
            <VolumeX
              size={80}
              className="bg-black/50 p-6 border border-white rounded-full "
            />
          )}
        </div>
      )}

      {/* Content Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-50 z-10">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <Link
            href="/reels"
            className="text-white font-bold flex flex-col justify-center items-center text-base leading-tight"
          >
            <span className="-mb-0.5">Reel</span>
            <span className="-mt-0.5">Blast</span>
          </Link>
          <button
            className="p-2 rounded-full bg-black bg-opacity-20 text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-2 bottom-32 flex flex-col items-center space-y-2">
          <LikeVideo
            videoId={video._id!}
            likes={video.likes!}
            userId={_userId}
          />
          <Comment />
          <SaveVideo videoId={video._id!} />
          <ShareVideo ReelsId={video._id!.toString()} />
          {/* <button
            className="flex flex-col items-center"
            onClick={() => setShowComments(!showComments)}
          >
            <div className="bg-black bg-opacity-20 rounded-full p-3">
              <MessageCircle size={28} className="text-white" />
            </div>
            <span className="text-white text-xs "> */}
          {/* {formatCount(video.comments?.length || 0)} */}
          {/* Comments */}
          {/* </span>
          </button> */}
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-16 sm:bottom-8 left-4 right-16 z-20">
          {/* Author Info */}
          <div className="flex items-center gap-2 justify-center mb-2">
            <Link href={`/${video.user?.userName}`}>
              <ProfilePic
                url={video?.user?.profilePic?.url || "./vercel.svg"}
                name={video.user.userName || "Anonymous"}
              />
            </Link>
            <div className="flex flex-col justify-center">
              <Link
                href={`/${video.user?.userName}`}
                className="font-semibold hover:underline hover:text-cyan-200 text-white text-sm"
              >
                {video.user?.userName || "username"}
              </Link>
              <p className="text-gray-300 text-xs">
                {video.createdAt
                  ? new Date(video.createdAt).toLocaleDateString()
                  : "Just now"}
              </p>
            </div>
            <FollowBtn
              size="sm"
              radius="xl"
              userToFollow={video.userId.toString()}
            />
            <div className="flex-1"></div>
          </div>

          {/* Title and Description */}
          <span onClick={() => setExpanded(!expanded)}>
            <h3 className="font-bold text-white mb-1">{video.title}</h3>
            <p
              className={`text-gray-200 text-sm ${
                expanded ? "" : "line-clamp-1"
              }`}
            >
              {video.description}
            </p>
          </span>
        </div>
      </div>

      {/* Comments Slide-up Panel */}
      {showComments && (
        <div className="absolute inset-0 z-30 bg-black bg-opacity-80 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl p-4 h-2/3 transition-transform">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-6rem)] space-y-4 pb-4">
              {[].length > 0 ? (
                [].map(
                  (
                    comment: {
                      user?: string;
                      text?: string;
                      time?: string;
                      likes?: number;
                      profilePic: string;
                    },
                    idx: number // TODO:  Fix comment type
                  ) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={
                            comment.profilePic ||
                            `/api/placeholder/${24 + idx}/${24 + idx}`
                          }
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {comment?.user || `user${idx + 1}`}
                        </p>
                        <p className="text-sm text-gray-300">
                          {comment?.text || "Great video!"}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-gray-400 text-xs">
                            {comment?.time || "1d"}
                          </span>
                          <button className="text-gray-400 text-xs">
                            Reply
                          </button>
                          <button className="text-gray-400 text-xs flex items-center">
                            <Heart size={12} className="mr-1" />{" "}
                            {comment?.likes || Math.floor(Math.random() * 20)}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 text-center">
                    Be the first to comment
                  </p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/api/placeholder/32/32"
                    alt="Your profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm flex-1 focus:outline-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
                />
                <button
                  className={`text-white ${
                    !commentText.trim() ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


