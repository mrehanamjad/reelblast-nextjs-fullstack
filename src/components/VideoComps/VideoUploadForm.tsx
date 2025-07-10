"use client"
import { apiClient } from "@/lib/api-client";
import { Button, Textarea, TextInput } from "@mantine/core";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { redirect, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";


interface VideoFormDataI {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  videoIdImagekit: string;
}

function VideoUploadForm({mode = "create", editData}: {mode?: "edit" | "create"; editData?: {title: string; description: string; videoUrl: string; videoIdImagekit: string; videoId: string}}) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter()

  const {data:session} = useSession()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormDataI>({
    defaultValues: {
      title: editData?.title || "",
      description: editData?.description || "",
      videoUrl: editData?.videoUrl || "",
      videoIdImagekit: editData?.videoIdImagekit || "",
      thumbnailUrl: "",
    },
  });


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!session?.user?.id) {
        router.push("/login");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [])
  

  const handleUploadSuccess = (res: IKUploadResponse) => {
    setValue("videoUrl", res.filePath);
    setValue("thumbnailUrl", res.thumbnailUrl || res.filePath);
    setValue("videoIdImagekit", res.fileId);

    setUploadProgress(100);
    setLoading(false);

    notifications.show({
      title: "Success",
      message: "Video uploaded successfully",
      color: "green",
    })

  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleCreateVideo = async (data: VideoFormDataI) => {
    try {
      setLoading(true);
      await apiClient.createVideo({...data, userId: new mongoose.Types.ObjectId(session?.user.id)});
      
      notifications.show({
        title: "Success",
        message: "Video published successfully",
        color: "green",
      });
        
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      router.push('/')
    } catch (error) {
      router.push('/video/upload/fail-to-publish-video')
      await apiClient.delFile(data.videoIdImagekit, "video");
      
      console.log("Error :: Failed to publish video  " + error);
      notifications.show({
        title: "Error",
        message: "Failed to publish video",
        color: "red",
      });

    } finally {
      setLoading(false);
    }
  }

  const handleEditVideo = async (data: VideoFormDataI) => {
    try {
      setLoading(true);
      setUploadProgress(100);

         if (!editData || !editData.videoId) {
      notifications.show({
        title: "Error",
        message: "Video ID is missing. Cannot edit video.",
        color: "red",
      });
      return; 
    }

      const res = await apiClient.editVideo(editData.videoId, {...data});
      console.log(res)
      notifications.show({
        title: "Success",
        message: "Video Edited successfully",
        color: "green",
      });

      router.push('/')
    } catch (error) {
      console.log("Error :: Failed to edit video  " + error);
      notifications.show({
        title: "Error",
        message: "Failed to Edit video",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }


  const onSubmit = async (data: VideoFormDataI) => {
    if(!session || !session.user.id) {
      router.push('/login');
      return;
    }
    if (!data.videoUrl) {
      notifications.show({
        title: "Error",
        message: "Video Not Found",
        color: "red",
      });
      return;
    }

    if (mode === "create") {
      await handleCreateVideo(data);
    } else if (mode === "edit") {
      await handleEditVideo(data);
    }
 
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        withAsterisk={false}
        className="mb-4"
        size="md"
        label="Title"
        type="text"
        required
        error={errors.title && errors.title.message}
        {...register("title", { required: "Title is required" })}
      />
      <Textarea
        withAsterisk={false}
        className="mb-4"
        size="md"
        label="Description"
        required
        autosize
        minRows={2}
        maxRows={6}
        error={errors.description && errors.description.message}
        {...register("description", { required: "Description is required" })}
      />

  { mode === "create" &&   <div className="form-control">
        <label className="font-semibold">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>}
      <Button
        type="submit"
        className="mb-4 mt-6"
        fullWidth
        color="blue"
        disabled={mode==="create" ? loading || !uploadProgress : false}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {mode === "create" ? "Publishing..." : "Editing..."}
          </>
        ) : (
          mode === "create" ? "Publish Video" : "Edit Video"
        )}
      </Button>
      
    </form>
  );
}

export default VideoUploadForm;
