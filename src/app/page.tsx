"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoComps/VideoFeed"
import { apiClient, VidI } from "@/lib/api-client";
import { useSession } from "next-auth/react";



export default function Home() {
  const [videos, setVideos] = useState<VidI[]>([]);
  const [userSavedList, setUserSavedList] = useState({});

  const fetchVideos = async () => {
    try {
      const data = await apiClient.getVideos();

      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const {data:session} = useSession()

  const fetchUserSavedVideos = async (username:string) => {
    try {
      const res = await fetch(`/api/user/${username}`);
      const result = await res.json();
      setUserSavedList(result);
      console.log(result)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {

    fetchVideos();
    if(session?.user.username)  fetchUserSavedVideos(session?.user.username)
  }, []);

  useEffect(() => {
    console.log("All videos data :: ", videos);
    console.log(" user data :: ", userSavedList);
  }, [videos]);


  return (
    <main className="container mx-auto ">
      {/* <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1> */}
      <VideoFeed videos={videos}  />
    
    </main>
  );
}
