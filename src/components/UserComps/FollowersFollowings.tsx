"use client";
import { apiClient, SearchUserI } from "@/lib/api-client";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import UserFeed from "./UserFeed";
import { UserX } from "lucide-react";

function FollowersFollowings({
  username,
  name,
}: {
  username: string;
  name: "followers" | "followings";
}) {
  const [data, setData] = useState<SearchUserI[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowerOrFollowing = async () => {
      try {
        setLoading(true);
        if (name == "followings") {
          const followingData = await apiClient.getFollowings(username);
          if(followingData.length > 0) {
            setData(followingData);
          } else {
            setData([])
          }
        }
        if (name == "followers") {
          const followerData = await apiClient.getFollowers(username);
           if(followerData.length > 0) {
            setData(followerData);
          } else {
            setData([])
          }
        }
      } catch (error) {
        console.log(`Error getting ${name} : ${error}`);
        notifications.show({
          title: "Error",
          message: `Error fetching ${name}`,
        });
      } finally {
        setLoading(false);
      }
    };
    getFollowerOrFollowing();
  }, [name, username]);

  const userNotFound = {
    icon: <UserX size={50} />,
    message: `No ${name} found`,
    subMessage: "",
  };

  return (
    <>
      <UserFeed users={data} isLoading={loading} notFound={userNotFound} />
    </>
  );
}

export default FollowersFollowings;
