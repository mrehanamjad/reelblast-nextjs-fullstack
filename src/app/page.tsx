"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import { Film } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<VidI[]>([]);
  const [userSavedList, setUserSavedList] = useState({});
  const { data: session } = useSession();

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

  if (videos.length > 0) {
    return (
      <main className="container mx-auto">
        <VideoFeed videos={videos} />
      </main>
    );
  }

  return (
    <div className="flex items-center justify-center fixed left-0 top-0 bg-black z-50 min-h-screen min-w-screen">
      <div className="flex relative items-center justify-center text-center border-4 border-cyan-500 rounded-full h-60 w-60 bg-gray-800/20 border-b-0  backdrop-blur-md  animate-spin">
      </div>
      <Film size={80} color="cyan" className="absolute " />
    </div>
  );
}
