"use client";

import React, { useState, useRef, useEffect } from "react";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { Heart,  Volume2, VolumeX} from "lucide-react";
import FollowBtn from "../UserComps/FollowBtn";
import {  apiClient, CommentI, VidI } from "@/lib/api-client";
import ProfilePic from "../UserComps/ProfilePic";
import LikeVideo from "./LikeVideo";
import Comment from "./Comment";
import ShareVideo from "./ShareVideo";
import SaveVideo from "./SaveVideo";
import { useSession } from "next-auth/react";
import CommentSection from "./CommentSection";
import { notifications } from "@mantine/notifications";

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
  const [muteOnTap, setMuteOnTap] = useState(false);
  const [showMuteOnTap, setShowMuteOnTap] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const ikVideoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [comments, setComments] = useState<CommentI[]>([]);
  const [commentsLoading,setCommentsLoading] = useState(false)


  const { data: session } = useSession();
  const userId = session?.user.id;
  // const username = session?.user.username

  // const authUser = useUserProfile()

  // Handle video visibility and playback
  useEffect(() => {
    if (!videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
            if (ikVideoRef.current) {
              ikVideoRef.current
                .play()
                .catch((err) => console.error("Failed to play:", err));
            }
          } else {
            setIsPlaying(false);
            if (ikVideoRef.current) {
              ikVideoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
  
  // Handle video visibility and playback and unmute on visibility change
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


  const getComments = async (videoId:string) => {
    try {
      setCommentsLoading(true);
      const res = await apiClient.getComments(videoId);
      setComments(res);
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch comment";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Failed to fetch comment:", error);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setCommentsLoading(false);
    }
  };




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
        <div onClick={(e) => e.stopPropagation()} className="absolute right-2 bottom-32 flex flex-col items-center space-y-2">
          <LikeVideo
            videoId={video._id!}
            likes={video.likes!}
            userId={userId as string}
          />
          <Comment getComments={getComments} videoId={video._id!} setShowComments={setShowComments}  />
          <SaveVideo videoId={video._id!} />
          <ShareVideo ReelsId={video._id!.toString()} />
        </div>

        {/* Bottom Content */}
        <div onClick={(e) => e.stopPropagation()} className="absolute bottom-16 sm:bottom-8 left-4 right-16 z-20">
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
     <CommentSection getComments={getComments} loading={commentsLoading} comments={comments} userId={userId!} videoId={video._id!} showComments={showComments} setShowComments={setShowComments} />
    </div>
  );
}


