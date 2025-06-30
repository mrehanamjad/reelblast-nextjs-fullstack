// import { IKVideo } from "imagekitio-next";
// import Link from "next/link";
// import { VideoI } from "@/models/Video";

// export default function VideoComponent({ video }: { video: VideoI }) {
//   return (
//     <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
//       <figure className="relative px-4 pt-4">
//         <Link href={`/videos/${video._id}`} className="relative group w-full">
//           <div
//             className="rounded-xl overflow-hidden relative w-full"
//             style={{ aspectRatio: "9/16" }}
//           >
//             <IKVideo
//               path={video.videoUrl}
//               transformation={[
//                 {
//                   height: "1920",
//                   width: "1080",
//                 },
//               ]}
//               controls={video.controls}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Link>
//       </figure>

//       <div className="card-body p-4">
//         <Link
//           href={`/videos/${video._id}`}
//           className="hover:opacity-80 transition-opacity"
//         >
//           <h2 className="card-title text-lg">{video.title}</h2>
//         </Link>

//         <p className="text-sm text-base-content/70 line-clamp-2">
//           {video.description}
//         </p>
//       </div>
//     </div>
//   );
// }

// // Instal ui =================================================================

// "use client"

// import React, { useState } from 'react';
// import { IKVideo } from "imagekitio-next";
// import Link from "next/link";
// import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
// import { VideoI } from "@/models/Video";

// export default function VideoComponent({ video }: { video: VideoI }) {
//   const [liked, setLiked] = useState(false);
//   const [saved, setSaved] = useState(false);

//   return (
//     <div className="mb-6 bg-white rounded-lg shadow max-w-md mx-auto">
//       {/* Header */}
//       <div className="flex items-center p-3">
//         <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
//           <div className="h-full w-full rounded-full overflow-hidden bg-white">
//             <Image
//               src={video.author?.profilePic || "/api/placeholder/32/32"}
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//         <div className="ml-3 flex-grow">
//           <p className="font-semibold text-sm">{video.author?.username || "username"}</p>
//         </div>
//         <button className="text-gray-500">
//           <MoreHorizontal size={20} />
//         </button>
//       </div>

//       {/* Video */}
//       <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
//         <Link href={`/videos/${video._id}`} className="block w-full h-full">
//           <IKVideo
//             path={video.videoUrl}
//             transformation={[
//               {
//                 height: "1920",
//                 width: "1080",
//               },
//             ]}
//             controls={false}
//             autoPlay
//             loop
//             muted
//             className="w-full h-full object-cover"
//           />
//           {/* Play/Pause Overlay */}
//           <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//             <div className="bg-black bg-opacity-50 rounded-full p-2">
//               <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Action Buttons */}
//       <div className="p-3">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setLiked(!liked)}
//               className="focus:outline-none"
//             >
//               <Heart
//                 size={24}
//                 className={liked ? "fill-red-500 text-red-500" : "text-gray-900"}
//               />
//             </button>
//             <button className="focus:outline-none">
//               <MessageCircle size={24} className="text-gray-900" />
//             </button>
//             <button className="focus:outline-none">
//               <Send size={24} className="text-gray-900" />
//             </button>
//           </div>
//           <button
//             onClick={() => setSaved(!saved)}
//             className="focus:outline-none"
//           >
//             <Bookmark
//               size={24}
//               className={saved ? "fill-black text-gray-900" : "text-gray-900"}
//             />
//           </button>
//         </div>

//         {/* Likes */}
//         <p className="font-semibold text-sm mb-1">{video.likes || 0} likes</p>

//         {/* Caption */}
//         <div className="mb-2">
//           <span className="font-semibold text-sm mr-1">{video.author?.username || "username"}</span>
//           <span className="text-sm">{video.title}</span>
//         </div>

//         {/* Description/Caption */}
//         <p className="text-gray-500 text-sm line-clamp-2 mb-1">{video.description}</p>

//         {/* Comments */}
//         <p className="text-gray-500 text-xs mb-1">View all {video.comments?.length || 0} comments</p>

//         {/* Time */}
//         <p className="text-gray-400 text-xs uppercase">{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Just now"}</p>
//       </div>
//     </div>
//   );
// }

// new ui =================================================================
// "use client"

// import React, { useState, useRef } from 'react';
// import { IKVideo } from "imagekitio-next";
// import Link from "next/link";
// import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, Volume2, VolumeX, Music } from "lucide-react";
// import { VideoI } from "@/models/Video";

// export default function VideoComponent({ video, onNext }: { video: any, onNext?: () => void }) {
//   const [liked, setLiked] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [expanded, setExpanded] = useState(false);
//   const videoRef = useRef<HTMLDivElement>(null);

//   return (
//     <div className="relative h-screen w-full mx-auto max-w-lg bg-black overflow-hidden snap-center">
//       {/* Full Screen Video */}
//       <div className="absolute inset-0 z-0">
//         <div ref={videoRef} className="w-full h-full">
//           <IKVideo
//             path={video.videoUrl}
//             transformation={[
//               {
//                 height: "1920",
//                 width: "1080",
//               },
//             ]}
//             controls={false}
//             autoPlay
//             loop
//             muted={isMuted}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Video Progress Bar */}
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 bg-opacity-50">
//           <div className="h-full bg-white w-4/5"></div>
//         </div>
//       </div>

//       {/* Content Overlay with Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-50 z-10">
//         {/* Top Bar */}
//         <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
//           <Link href="/reels" className="text-white font-bold text-lg">Reels</Link>
//           <button
//             className="p-2 rounded-full bg-black bg-opacity-20 text-white"
//             onClick={() => setIsMuted(!isMuted)}
//           >
//             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//           </button>
//         </div>

//         {/* Right Side Actions */}
//         <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
//           <button
//             className="flex flex-col items-center"
//             onClick={() => setLiked(!liked)}
//           >
//             <div className="bg-black bg-opacity-20 rounded-full p-3">
//               <Heart
//                 size={28}
//                 className={liked ? "fill-red-500 text-red-500" : "text-white"}
//               />
//             </div>
//             <span className="text-white text-xs mt-1">{((video.likes || 0) + (liked ? 1 : 0)).toLocaleString()}</span>
//           </button>

//           <button
//             className="flex flex-col items-center"
//             onClick={() => setShowComments(!showComments)}
//           >
//             <div className="bg-black bg-opacity-20 rounded-full p-3">
//               <MessageCircle size={28} className="text-white" />
//             </div>
//             <span className="text-white text-xs mt-1">{(video.comments?.length || 0).toLocaleString()}</span>
//           </button>

//           <button
//             className="flex flex-col items-center"
//             onClick={() => setSaved(!saved)}
//           >
//             <div className="bg-black bg-opacity-20 rounded-full p-3">
//               <Bookmark
//                 size={28}
//                 className={saved ? "fill-white text-white" : "text-white"}
//               />
//             </div>
//             <span className="text-white text-xs mt-1">Save</span>
//           </button>

//           <button className="flex flex-col items-center">
//             <div className="bg-black bg-opacity-20 rounded-full p-3">
//               <Share2 size={28} className="text-white" />
//             </div>
//             <span className="text-white text-xs mt-1">Share</span>
//           </button>

//           <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden transform animate-pulse">
//             <Image
//               src={video.author?.profilePic || "/api/placeholder/48/48"}
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Bottom Content */}
//         <div className="absolute bottom-8 left-4 right-16 z-20">
//           {/* Author Info */}
//           <div className="flex items-center mb-3">
//             <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
//               <Image
//                 src={video.author?.profilePic || "/api/placeholder/40/40"}
//                 alt="Profile"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <div className="ml-2 flex-1">
//               <p className="font-semibold text-white text-sm">{video.author?.username || "username"}</p>
//               <p className="text-gray-300 text-xs">{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Just now"}</p>
//             </div>
//             <button className="bg-white bg-opacity-20 text-white text-xs font-bold py-1 px-3 rounded-full">
//               Follow
//             </button>
//           </div>

//           {/* Title and Description */}
//           <h3 className="font-bold text-white mb-1">{video.title}</h3>
//           <p className={`text-gray-200 text-sm ${expanded ? '' : 'line-clamp-1'}`}>
//             {video.description}
//           </p>
//           {video.description && video.description.length > 80 && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="text-gray-300 text-xs"
//             >
//               {expanded ? 'Show less' : 'Read more'}
//             </button>
//           )}

//           {/* Music Info */}
//           <div className="flex items-center mt-3">
//             <div className="bg-black bg-opacity-30 rounded-full p-1">
//               <Music size={14} className="text-white" />
//             </div>
//             <div className="ml-2 flex items-center">
//               <p className="text-white text-xs">{video.musicInfo || "Original Audio"}</p>
//               <div className="ml-2 animate-spin rounded-full h-3 w-3 border-t-2 border-white"></div>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-2 mt-3">
//             <span className="text-white text-xs">#trending</span>
//             <span className="text-white text-xs">#popular</span>
//             <span className="text-white text-xs">#{video.category || 'reels'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Comments Slide-up Panel */}
//       {showComments && (
//         <div className="absolute inset-0 z-30 bg-black bg-opacity-80">
//           <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl p-4 h-2/3 transition-transform">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-white font-bold">Comments ({video.comments?.length || 0})</h3>
//               <button
//                 onClick={() => setShowComments(false)}
//                 className="text-white"
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="overflow-y-auto h-5/6 space-y-4">
//               {(video.comments || []).map((comment: any, idx: number) => (
//                 <div key={idx} className="flex items-start space-x-3">
//                   <div className="h-8 w-8 rounded-full overflow-hidden">
//                     <Image src={`/api/placeholder/${24 + idx}/${24 + idx}`} alt="User" className="h-full w-full object-cover" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-white">{comment?.user || `user${idx + 1}`}</p>
//                     <p className="text-sm text-gray-300">{comment?.text || "Great video!"}</p>
//                     <div className="flex items-center space-x-4 mt-1">
//                       <span className="text-gray-400 text-xs">1d</span>
//                       <button className="text-gray-400 text-xs">Reply</button>
//                       <button className="text-gray-400 text-xs flex items-center">
//                         <Heart size={12} className="mr-1" /> {Math.floor(Math.random() * 20)}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {(!video.comments || video.comments.length === 0) && (
//                 <div className="bg-gray-800 rounded-lg p-4">
//                   <p className="text-gray-300 text-center">Be the first to comment</p>
//                 </div>
//               )}
//             </div>

//             {/* Comment Input */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
//               <div className="flex items-center space-x-2">
//                 <div className="h-8 w-8 rounded-full overflow-hidden">
//                   <Image src="/api/placeholder/32/32" alt="Your profile" className="h-full w-full object-cover" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm flex-1 focus:outline-none"
//                 />
//                 <button className="text-white">
//                   <Send size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ======================= 2nd Good ===================== =======

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
// import { useUserProfile } from "../UserProfileContext";
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
  const videoRef = useRef<HTMLDivElement>(null);
  const ikVideoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data: session } = useSession();
  const userId = session?.user.id;
  const _userId = new mongoose.Types.ObjectId(userId);
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

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // In a real app, you would submit the comment to your backend
      console.log("Submitting comment:", commentText);
      setCommentText("");
      // Optionally, you could update the local comments list here
    }
  };

  // Format like count
  // const formatCount = (count: number) => {
  //   if (count >= 1000000) {
  //     return (count / 1000000).toFixed(1) + "M";
  //   } else if (count >= 1000) {
  //     return (count / 1000).toFixed(1) + "K";
  //   }
  //   return count.toString();
  // };

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

  return (
    <div className="relative h-[90vh] sm:h-screen  w-full my-auto mx-auto max-w-sm bg-black overflow-hidden snap-center">
      {/* Full Screen Video */}
      <div
        className="absolute inset-0 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
        <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-2">
          {/* <button
            className="flex flex-col items-center"
            onClick={() => setLiked(!liked)}
          >
            <div className="bg-black bg-opacity-20 rounded-full p-3">
              <Heart
                size={28}
                className={`transition-all duration-300 ${
                  liked ? "fill-red-500 text-red-500 scale-110" : "text-white"
                }`}
              />
            </div>
            <span className="text-white text-xs ">
              {formatCount((video.likes?.length || 0) + (liked ? 1 : 0))}
            </span>
          </button> */}
          <LikeVideo
            videoId={video._id!}
            likes={video.likes!}
            userId={_userId}
          />
          <Comment />
          <SaveVideo videoId={video._id!} />
          <ShareVideo />
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
          <span onClick={() => setExpanded(!expanded)} >
          <h3 className="font-bold text-white mb-1">{video.title}</h3>
          <p
            className={`text-gray-200 text-sm ${
              expanded ? "" : "line-clamp-1"
            }`}
          >
            {video.description}
          </p>

          {/* //TODO:  Remove it */}
          {/* {video.description && video.description.length > 80 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-300 text-xs"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )} */}
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
