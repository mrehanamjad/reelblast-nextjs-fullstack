"use client";
import { ActionIcon } from "@mantine/core";
import { Bookmark, LoaderCircle } from "lucide-react";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "../UserProfileContext";
import { apiClient } from "@/lib/api-client";
import { notifications } from "@mantine/notifications";

function SaveVideo({ videoId }: { videoId: mongoose.Types.ObjectId }) {
  const { user, addOrRemoveToSavedReels } = useUserProfile();
  const [isSaved, setIsSaved] = useState(
    user?.savedReels.includes(videoId.toString())
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && videoId) {
      setIsSaved(user.savedReels.includes(videoId.toString()));
    }
  }, [user, videoId]);

  const handleVideoSave = async () => {
    if (!user) {
      console.error("User ID is required to Save this reel.");
      notifications.show({
        title: "Error",
        message: "Please log in to Save this reel.",
        color: "red",
      });
      return;
    }

    try {
      setLoading(true);
      const responseJson = await apiClient.saveVideo(videoId);
      console.log(responseJson);
      if (responseJson.message.toLowerCase().includes("remove")) {
        addOrRemoveToSavedReels(videoId.toString());
        setIsSaved(false);
        console.log(responseJson.message);

        notifications.show({
          title: "Success",
          message: "Video removed from your save list",
          color: "green",
        });
      } else {
        addOrRemoveToSavedReels(videoId.toString());
        setIsSaved(true);
        console.log(responseJson.message);
        notifications.show({
          title: "Success",
          message: "Video added to your save list",
          color: "green",
        });
      }
    } catch (error) {
      console.error("Error Saving video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        size={42}
        variant="subtle"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleVideoSave}
        className="bg-transparent"
      >
        {loading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <Bookmark
            size={24}
            className={`transition-all duration-300 ${
              isSaved ? "fill-white text-white scale-110" : "text-white"
            }`}
          />
        )}
      </ActionIcon>
      <span className="text-white text-xs ">Save</span>
    </div>
  );
}

export default SaveVideo;
