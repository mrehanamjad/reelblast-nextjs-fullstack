import { ActionIcon } from "@mantine/core";
import { MessageCircleMore } from "lucide-react";
import { Types } from "mongoose";

function Comment({
  videoId,
  setShowComments,
  getComments,
}: {
  videoId: string | Types.ObjectId;
  setShowComments: (arg: boolean) => void;
  getComments: (videoId:string)  => Promise<void>
}) {


  const handleClickCommentIcon = async() => {
    setShowComments(true)
    await getComments(videoId as string)
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
