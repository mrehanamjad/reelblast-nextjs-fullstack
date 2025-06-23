"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { Bookmark, Clapperboard } from "lucide-react";
import VideoFeedSM from "../VideoComps/VideoFeedSM";
import { useSession } from "next-auth/react";
import { apiClient, VidI } from "@/lib/api-client";
import { notifications } from "@mantine/notifications";

function UserTabs({ username }: { username?: string }) {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reels, setReels] = useState<VidI[]>([]);
  const [apiName, setApiName] = useState<"user" | "save">("user");

  useEffect(() => {
    const fetchreels = async () => {
      setIsLoading(true);
      try {
        const data =
          apiName === "save"
            ? await apiClient.getSavedVideos()
            : await apiClient.getUserVideos(username!);
        setReels(data);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching ${apiName} reels:`, error);
        setIsLoading(false);
        notifications.show({
          title: "Error",
          message: `Failed to fetch ${apiName} reels`,
          color: "red",
        });
      }
    };

    fetchreels();
  }, [apiName, username]);
  return (
    <Tabs color="cyan" defaultValue="reels">
      <Tabs.List justify="center">
        <Tabs.Tab value="reels" onClick={() => {
          if(apiName !== "user") {
            setApiName("user")
          }
        }} leftSection={<Clapperboard size={20} />}>
          Reels
        </Tabs.Tab>
        {session?.user.username === username && (
          <Tabs.Tab onClick={() => {
            if(apiName !== "save") {
              setApiName("save")
            }
          }} value="saved" leftSection={<Bookmark size={20} />}>
            Saved
          </Tabs.Tab>
        )}
      </Tabs.List>

      <Tabs.Panel value="reels" className="">
        <VideoFeedSM reelsLG={reels} isLoading={isLoading} notFound={{
          icon: <Clapperboard size={64} className="text-gray-300 mb-4" />,
          message: "No videos yet",
          subMessage: "Start uploading to share your creativity",
        }} />
      </Tabs.Panel>

      {session?.user.username === username && (
        <Tabs.Panel value="saved">
          <VideoFeedSM  reelsLG={reels} isLoading={isLoading} notFound={{
            icon: <Bookmark size={64} className="text-gray-300 mb-4" />,
            message: "No saved reels yet",
            subMessage: "Reels you save will appear here",
          }} />
        </Tabs.Panel>
      )}
    </Tabs>
  );
}

export default UserTabs;
