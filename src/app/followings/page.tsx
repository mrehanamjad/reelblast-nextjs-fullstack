'use client';

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";
import ScreenLoader from "@/components/ScreenLoader";

function FollowingsPage() {
  const [videos, setVideos] = useState<VidI[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowingsVideos = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getFollowingVideos();
        setVideos(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    getFollowingsVideos();
  }, []);

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <main className="container mx-auto">
      <VideoFeed videos={videos} />
    </main>
  );
}

export default FollowingsPage;
