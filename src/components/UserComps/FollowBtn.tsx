"use client"
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FollowBtnProps {
  followerId: string; // Current user ID
  followingId: string; // Profile user ID
  followings?: string[]; // Initial following state (optional)
}

const FollowBtn: React.FC<FollowBtnProps> = ({ followerId, followingId, followings }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

    const router = useRouter()

  const handleFollow = async () => {
      try {
        setLoading(true);
        if(!followerId) {
            router.push('/login');
            return;
        }

      const response = await fetch("/api/user/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId, followingId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Follow/Unfollow failed");
      }

      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   setIsFollowing(followings?.some((id) => id === followerId) || false)
  }, [])
  


  return (
    <Button
      onClick={handleFollow}
      variant="filled"
      color={isFollowing ? "gray" : "cyan"}
      loading={loading}
      disabled={loading}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
