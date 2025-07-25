'use client';

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed";
import { apiClient, VidI } from "@/lib/api-client";
import ScreenLoader from "@/components/ScreenLoader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function FollowingsPage() {
  const [videos, setVideos] = useState<VidI[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {

    if(!session?.user.id){
      redirect("/login")
    }

    const getFollowingsVideos = async () => {
      setLoading(true);
      try {
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
