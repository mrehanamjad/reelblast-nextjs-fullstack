"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";
import { useSession } from "next-auth/react";

export default function Home() {
  const [videos, setVideos] = useState<VidI[]>([]);
  const [userSavedList, setUserSavedList] = useState({});
  const { data: session, status } = useSession();

  const fetchVideos = async () => {
    try {
      const data = await apiClient.getVideos();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchUser = async (username: string) => {
    try {
      console.log("main page :: fetching user...");
      const res = await fetch(`/api/user/${username}`);
      const result = await res.json();
      console.log("Main Page :: fetched user data :: ", result);
      setUserSavedList(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);


  useEffect(() => {
    if (session?.user?.username) {
      fetchUser(session.user.username);
    }
  }, [session?.user?.username]);

  useEffect(() => {
    console.log("All videos data :: ", videos);
    console.log("User data :: ", userSavedList);
  }, [videos, userSavedList]);

  return (
    <main className="container mx-auto">
      <VideoFeed videos={videos} />
    </main>
  );
}
