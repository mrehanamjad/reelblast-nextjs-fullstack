"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "../UserProfileContext";
import { apiClient } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import { UserCheck, UserPlus } from "lucide-react";

const FollowBtn = ({
  userToFollow,
  size = "md",
  radius = "sm",
  followIcon = false,
}: {
  userToFollow: string;
  size?: string;
  radius?: string;
  followIcon?: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUserProfile();
  const { data: session } = useSession();

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (!user?.userId) {
        router.push("/login");
        return;
      }

      await apiClient.follow({
        followerId: user?.userId ?? "",
        followingId: userToFollow,
      });

      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFollowing(
      user?.followings?.some((id) => id === userToFollow) || false
    );
  }, [session?.user?.username, user,userToFollow]);

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
      {isFollowing ? ( followIcon ? <UserCheck size={35}  /> : "Following" ): (followIcon ? <UserPlus size={35}  /> : "Follow")}
    </Button>
  );
};

export default FollowBtn;
