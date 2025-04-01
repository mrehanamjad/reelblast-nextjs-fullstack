"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoFeed"
import { VideoI } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<VideoI[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        console.log("All videos data :: ", data);

        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    console.log("All videos data :: ", videos);
  }, [videos]);


  return (
    <main className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1> */}
      <VideoFeed videos={videos} />
    
    </main>
  );
}
