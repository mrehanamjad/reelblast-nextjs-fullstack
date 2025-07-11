"use client";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Heart, LoaderCircle } from "lucide-react";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";

function LikeVideo({
  likes,
  userId,
  videoId,
}: {
  likes: mongoose.Types.ObjectId[];
  userId: string;
  videoId: mongoose.Types.ObjectId;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLiked(likes?.some((id) => id.toString() === userId));
    }
  }, [likes, userId]);

  const handleVideoLike = async () => {
    if (!userId) {
      console.error("User ID is required to Like");
      notifications.show({
        title: "Login Required",
        message: "Please log in to Like the reel.",
        color: "red",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/videos/${videoId}/like`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to  video like");
      const data = await res.json();
      if (data.message.toLowerCase().includes("unlike")) {
        setLikesCount((prev) => (prev -= 1));
        setIsLiked(false);
      } else {
        setLikesCount((prev) => (prev += 1));
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error liking video:", error);
      setIsLiked(isLiked);
    } finally {
      setLoading(false);
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
        variant="subtle"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleVideoLike}
      >
        {loading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <Heart
            size={24}
            className={`transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"
            }`}
            fill={isLiked ? "red" : "none"}
          />
        )}
      </ActionIcon>
      <span className="text-white text-xs ">{formatCount(likesCount)}</span>
    </div>
  );
}

export default LikeVideo;
