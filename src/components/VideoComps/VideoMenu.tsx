"use client";
import { apiClient } from "@/lib/api-client";
import { Menu, ActionIcon, Modal, Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

export default function VideoMenu({
  className,
  videoId,
  videoIdImagekit,
}: {
  className: string;
  videoId: string;
  videoIdImagekit: string;
}) {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDeleteVideo = async () => {
    try {
      if (!session?.user) return;

      const res = await apiClient.deleteVideo(videoId);
      if (res) {
        const response = await apiClient.delFile(videoIdImagekit, "video");
        if (response) {
          notifications.show({
            title: "Success",
            message: "Video deleted successfully",
            color: "green",
          });
        } else {
          notifications.show({
            title: "Error",
            message: "Failed to delete video from ImageKit",
            color: "red",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete video",
        color: "red",
      });
    }
  };

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <Menu shadow="md" width={200} position="bottom-end" closeOnItemClick={false}>
        <Menu.Target>
          <ActionIcon
            size={42}
            variant="default"
            radius="xl"
            aria-label="Menu options"
          >
            <EllipsisVertical size={24} className="text-white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          
            <Menu.Item component={Link} href={`/video/${videoId}/edit`} leftSection={<Pen size={14} />}>
              Edit
            </Menu.Item>


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
        Are you sure you want to delete this Reel? This action cannot be undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button onClick={handleDeleteVideo} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
