"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "../UserProfileContext";

const FollowBtn = ({
  userToFollow,
  size = "md",
  radius = "sm"
}:{userToFollow: string;size?:string;radius?:string}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {user} = useUserProfile()

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (user?.userId) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/user/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: user?.userId, followingId: userToFollow }),
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
      setIsFollowing(user?.followings?.some((id) => id === userToFollow) || false);

  }, []);

  return (
    <Button
      onClick={handleFollow}
      variant="filled"
      color={isFollowing ? "gray" : "cyan"}
      loading={loading}
      disabled={loading}
      size={size}
      radius={radius}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
