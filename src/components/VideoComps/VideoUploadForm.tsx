"use client"
import { apiClient } from "@/lib/api-client";
import { Button, Textarea, TextInput } from "@mantine/core";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";


interface VideoFormDataI {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  videoIdImagekit?: string;
}

function VideoUploadForm() {
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
      title: "",
      description: "",
      videoUrl: "",
      videoIdImagekit: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (res: IKUploadResponse) => {
    setValue("videoUrl", res.filePath);
    setValue("thumbnailUrl", res.thumbnailUrl || res.filePath);
    setValue("videoIdImagekit", res.fileId);
    setUploadProgress(100);
    setLoading(false);
    console.log("Video uploaded successfully ");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormDataI) => {
    if (!data.videoUrl) {
      console.log("Please upload a video first");
      return;
    }
    if(!session || !session.user.id) {
      router.push('/login');
      return;
    }
    setLoading(true);
    try {
      await apiClient.createVideo({...data, userId: new mongoose.Types.ObjectId(session?.user.id)});
      console.log("Video published successfully ");
        
      // reset form after upload completes
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      router.push('/')
    } catch (error) {
      console.log("Error :: Failed to publish video  " + error);
    } finally {
      setLoading(false);
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

      <div className="form-control">
        <label className="font-semibold">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-cyan-200 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="mb-4 mt-6"
        fullWidth
        color="cyan"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </Button>
    </form>
  );
}

export default VideoUploadForm;
