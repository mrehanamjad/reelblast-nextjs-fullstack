import { ActionIcon } from "@mantine/core";
import { MessageCircle } from "lucide-react";

function Comment({
  setShowComments,
}: {
  setShowComments: (arg: boolean) => void;
}) {

  const handleClickCommentIcon = async() => {
    setShowComments(true)
  }

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        size={42}
        variant="subtle"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleClickCommentIcon}
      >
        <MessageCircle size={24} color="white" />
      </ActionIcon>
      <span className="text-white text-xs">Comments</span>
    </div>
  );
}

export default Comment;
