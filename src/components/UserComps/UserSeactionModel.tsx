import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import FollowersFollowings from "./FollowersFollowings";

export default function UserSeactionModel({
  children,
  username,
  name,
}: {
  children: React.ReactNode;
  username: string;
  name: "followers" | "followings";
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} variant="black" onClose={close} title={name.charAt(0).toUpperCase() + name.slice(1)}>
        <FollowersFollowings username={username} name={name} />
      </Modal>

      <button className="cursor-pointer" onClick={open}>
        {children}
      </button>
    </>
  );
}
