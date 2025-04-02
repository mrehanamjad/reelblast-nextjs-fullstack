"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mantine/core";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { Loader, Pen } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ScreenLoader from "./ScreenLoader";
import FollowBtn from "./FollowBtn";

interface UserProfileInfoI {
  userId: string;
  userName: string;
  name: string;
  bio?: string;
  createdAt: string | Date;
  profilePicUrl?: string;
  followers: string[]; // Assuming array of user IDs
  followings: string[]; // Assuming array of user IDs
  savedReels: string[];
  socialLinks?: string[];
}

function UserProfileInfo({ id }: { id: string }) {

  const [userData, setUserData] = useState<UserProfileInfoI | null>(null);
  const { data: session } = useSession();
  const authId = session?.user.id;

  const formatNumber = (num?: number) => {
    if (!num || isNaN(num)) return "0"; // Ensure num is valid
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        const result = await res.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  


  if (!userData) return <ScreenLoader />;

  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      <div className="flex mx-20 flex-col md:flex-row items-center md:items-start mb-8 group">
        {/* Avatar */}
        <div className="mb-4 md:mb-0 md:mr-6 relative flex flex-col items-center gap-3">
          <Avatar
            size={"xl"}
            className="border-2 border-cyan-300 order-2 md:order-1"
            src={userData?.profilePicUrl}
            key={userData?.name}
            name={userData?.name}
            color="initials"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              @{userData?.userName}
            </h1>
            <div className="md:ml-4 mt-2 md:mt-0">
              {authId && authId === userData?.userId ? (
                <Link
                  href={"/update-profile"}
                  className="md:hidden md:group-hover:block order-1 md:order-2"
                >
                  <Button
                    className=""
                    variant="subtle"
                    radius={"lg"}
                    color={"gray"}
                  >
                    <Pen size={20} className="mr-2" /> Edit
                  </Button>
                </Link>
              ) : (
               <FollowBtn followerId={authId as string} followingId={userData.userId} />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followers.length as number)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followings.length as number)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Following
              </div>
            </div>
          </div>

          {/* Bio */}
          <h2 className="text-gray-700 dark:text-gray-300 text-md mb-2 md:text-lg font-bold">
            {userData?.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 md:text-md">
            {userData?.bio}
          </p>
          {/* Social Media */}
          {userData?.socialLinks?.map((link, i) => (
            <div
              key={i}
              className="flex justify-center md:justify-start space-x-6"
            >
              <SocialLinkIcon url={link} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserProfileInfo;
