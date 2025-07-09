"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";
import { useSession } from "next-auth/react";

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
      const res = await fetch(`/api/user/${username}`);
      const result = await res.json();
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


  if (videos.length > 0) {
    return (
      <main className="container mx-auto">
        <VideoFeed videos={videos} />
      </main>
    );
  }

}
