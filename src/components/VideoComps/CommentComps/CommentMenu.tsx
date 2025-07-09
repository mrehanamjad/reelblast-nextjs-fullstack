"use client";
import { apiClient } from "@/lib/api-client";
import { Menu, ActionIcon, Modal, Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { EllipsisVertical, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function CommentMenu({
  videoId,
  commentId,
  fetchAgain
}: {
  videoId: string;
  commentId: string;
  fetchAgain: (videoId:string)  => Promise<void>;
}) {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      if (!session?.user) return;

      const res = await apiClient.deleteComment(videoId,commentId);
      if (res) {
          notifications.show({
            title: "Success",
            message: "Comment deleted successfully",
            color: "green",
          });
          close();
          await fetchAgain(videoId)
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete comment",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Menu shadow="md" width={140} position="bottom-end" closeOnItemClick={false}>
        <Menu.Target>
          <ActionIcon
            size={28}
            variant="default"
            radius="xl"
            aria-label="Menu options"
          >
            <EllipsisVertical size={20} className="text-white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          
            {/* <Menu.Item component={Link} href={`/video/${videoId}/edit`} leftSection={<Pen size={14} />}>
              Edit
            </Menu.Item> */}


          <Menu.Item
            color="red"
            leftSection={<Trash size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal opened={opened} onClose={close} title="Delete this Reel?">
        Are you sure you want to delete this Comment? This action cannot be undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button loading={loading} onClick={handleDeleteComment} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
