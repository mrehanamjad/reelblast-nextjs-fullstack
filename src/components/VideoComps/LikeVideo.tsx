"use client";
import { ActionIcon } from "@mantine/core";
import { Heart } from "lucide-react";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";

function LikeVideo({
  likes,
  userId,
  videoId,
}: {
  likes: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    if (userId) {
      setIsLiked(likes?.some((id) => id.toString() === userId.toString()));
    }
  }, [likes, userId]);

  const handleVideoLike = async () => {
    try {
      const res = await fetch(`/api/videos/${videoId}/like`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to  video like");
      const data = await res.json();
      console.log(data);
      if (data.message.toLowerCase().includes("unlike")) {
        setLikesCount((prev) => (prev -= 1));
        setIsLiked(false);
      } else {
        setLikesCount((prev) => (prev += 1));
        setIsLiked(true);
        console.log("Video liked !!!!!!!");
      }
    } catch (error) {
      console.error("Error liking video:", error);
      setIsLiked(isLiked);
    }
  };

  // Format like count
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        size={42}
        variant="default"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleVideoLike}
      >
        <Heart
          size={24}
          className={`transition-all duration-300 ${
            isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"
          }`}
          fill={isLiked ? "red" : "none"}
        />
      </ActionIcon>
      <span className="text-white text-xs ">{formatCount(likesCount)}</span>
    </div>
  );
}

export default LikeVideo;
