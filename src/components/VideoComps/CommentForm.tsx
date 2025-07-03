"use Client";

import { LoaderCircle, Send } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import mongoose from "mongoose";
import { apiClient } from "@/lib/api-client";

function CommentForm({
  userId,
  videoId,
  parentCommentId = null,
}: {
  userId: string | mongoose.Types.ObjectId;
  videoId: string | mongoose.Types.ObjectId;
  parentCommentId?: string | mongoose.Types.ObjectId | null;
}) {
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const addComment = async (e:React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return;

    setLoading(true);

    if (!userId) {
      console.error("User ID is required to add a comment");
      notifications.show({
        title: "Error",
        message: "Please log in to add a comment.",
        color: "red",
      });
      return;
    }

    if (!videoId) {
      console.error("Video ID is required to add a comment");
      notifications.show({
        title: "Error",
        message: "Video not found.",
        color: "red",
      });
      return;
    }

    try {
      await apiClient.createComment(videoId, commentText, parentCommentId);

      notifications.show({
        title: "Success",
        message: "Comment posted successfully",
        color: "green",
      });

      setCommentText("");
      // Optionally, trigger re-fetch or add comment to UI directly
    } catch (error: unknown) {
      let errorMessage = "Failed to post comment";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Failed to post comment:", error);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex items-center space-x-4" onSubmit={addComment}>
        <Input
          type="text"
          placeholder="Add a comment..."
          radius={"lg"}
          // size="md"
          className="flex-1 w-full"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={loading}
        />
        <button
          className={`text-white p-3 pl-2 pb-2 rounded-full transition-all ${
            !commentText.trim() || loading
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 hover:bg-blue-600 bg-blue-500 "
          }`}
          type="submit"
          disabled={!commentText.trim() || loading}
        >
          {!loading ? (
            <Send size={20} />
          ) : (
            <LoaderCircle size={20} className="animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
