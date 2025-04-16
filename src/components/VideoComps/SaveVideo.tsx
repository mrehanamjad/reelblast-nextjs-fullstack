"use client";
import { ActionIcon } from "@mantine/core";
import { Bookmark } from "lucide-react";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { useUserProfile } from "../UserProfileContext";
import { apiClient } from "@/lib/api-client";


function SaveVideo({ videoId }: { videoId: mongoose.Types.ObjectId}) {

  const {user, addOrRemoveToSavedReels } = useUserProfile()
  const [isSaved, setIsSaved] = useState(user?.savedReels.includes(videoId.toString()));
  
  useEffect(() => {
    if (user && videoId) {
      setIsSaved(user.savedReels.includes(videoId.toString()));
    }
  }, [user, videoId]);


      const handleVideoSave = async () => {
          try {
              const responseJson = await apiClient.saveVideo(videoId)
              console.log(responseJson);
              if(responseJson.message.toLowerCase().includes("remove")){
                addOrRemoveToSavedReels(videoId.toString())
                setIsSaved(false)
                console.log(responseJson.message)
              } else {
                addOrRemoveToSavedReels(videoId.toString())
                setIsSaved(true)
                console.log(responseJson.message)
              }
                
          } catch (error) {
              console.error("Error Saving video:", error);
              
          }
      }
  



  return (
    <div className="flex flex-col items-center">
    <ActionIcon
      size={42}
      variant="default"
      radius={"xl"}
      aria-label="ActionIcon with size as a number"
      onClick={handleVideoSave}
    >
      <Bookmark size={24} className={`transition-all duration-300 ${
                  isSaved ? "fill-white text-white scale-110" : "text-white"
                }`} />
    </ActionIcon>
      <span  className="text-white text-xs ">Save</span>
    </div>
  );
}

export default SaveVideo;
