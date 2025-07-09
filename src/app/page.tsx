"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<VidI[]>([]);


  const fetchVideos = async () => {
    try {
      const data = await apiClient.getVideos();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };


  useEffect(() => {
    fetchVideos();
  }, []);



  if (videos.length > 0) {
    return (
      <main className="container mx-auto">
        <VideoFeed videos={videos} />
      </main>
    );
  }

}
