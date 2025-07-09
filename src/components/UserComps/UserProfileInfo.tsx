"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { Settings } from "lucide-react";
import {  useSession } from "next-auth/react";
import ScreenLoader from "../ScreenLoader";
import FollowBtn from "./FollowBtn";
import ProfilePic from "./ProfilePic";
import { apiClient, UserProfileInfoI } from "@/lib/api-client";
import UserSettingsNav from "./UserSettingsNav";
import UserSeactionModel from "./UserSeactionModel";


function UserProfileInfo({ username }: { username: string }) {
  const [userData, setUserData] = useState<UserProfileInfoI | null>(null);
  const [expendUserSettings, setExpendUserSettings] = useState(false);
  const { data: session } = useSession();
  const authId = session?.user.id;

  const formatNumber = (num?: number) => {
    if (!num || isNaN(num)) return "0"; 
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiClient.getUser(username);
        setUserData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) fetchData();
  }, [username]);

  if (!userData) return <ScreenLoader />;

  return (
    <main className="flex-grow container mx-auto px-4 py-6 max-sm:my-7">
      <div className="flex sm:mx-20 flex-col md:flex-row items-center md:items-start mb-8 ">
        {/* Avatar */}
        <ProfilePic
          name={userData?.name}
          size="120px"
          className="md:mr-8 mb-2 md:mb-0 md:mt-2"
          url={userData?.profilePic.url as string}
        />
        {/* Profile Info */}
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              @{userData?.userName}
            </h1>
            <div className="md:ml-4 mt-2 md:mt-0">
              {authId && authId === userData?.userId ? (

                <div className="relative flex flex-col w-full items-start">
                  <Button
                    onClick={() => setExpendUserSettings((prev) => !prev)}
                    variant="subtle"
                    size="icon"
                    className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Settings
                      size={22}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </Button>

                  {expendUserSettings && (
                    <div className="absolute top-12 left-0 z-50">
                      <UserSettingsNav />
                    </div>
                  )}
                </div>
              ) : (
                <FollowBtn userToFollow={userData.userId} />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <UserSeactionModel  username={username} name="followers" >
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followers?.length ?? 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </div>
            </div>
            </UserSeactionModel>
            <UserSeactionModel username={username} name="followings">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followings?.length ?? 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Following
              </div>
            </div>
            </UserSeactionModel>
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
