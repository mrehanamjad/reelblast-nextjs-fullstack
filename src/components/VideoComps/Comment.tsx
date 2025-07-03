import { apiClient, CommentI } from "@/lib/api-client";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MessageCircleMore } from "lucide-react";
import { Types } from "mongoose";

function Comment({
  videoId,
  showComments,
  setShowComments,
  setComments,
  setCommentsLoading,
}: {
  videoId: string | Types.ObjectId;
  showComments: boolean;
  setShowComments: (arg: boolean) => void;
  setComments: (data: CommentI[]) => void;
  setCommentsLoading: (arg: boolean) => void;
}) {



  const getComments = async () => {
    try {
      setCommentsLoading(true);
      const res = await apiClient.getComments(videoId);
      setComments(res);
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch comment";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Failed to fetch comment:", error);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleClickCommentIcon = async() => {
    setShowComments(!showComments)
    await getComments()
  }



  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        size={42}
        variant="default"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleClickCommentIcon}
      >
        <MessageCircleMore size={24} />
      </ActionIcon>
      <span className="text-white text-xs">Comments</span>
    </div>
  );
}

export default Comment;
