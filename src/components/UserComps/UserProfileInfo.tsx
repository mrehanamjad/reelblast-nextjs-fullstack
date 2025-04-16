"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { LogOut, Pen, Settings } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ScreenLoader from "../ScreenLoader";
import FollowBtn from "./FollowBtn";
import ProfilePic from "./ProfilePic";
import { apiClient, UserProfileInfoI } from "@/lib/api-client";
import { NavItem } from "../SideNavbar";

export function UserSettingsNav() {
  async function handleSignout() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <div className="w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-gray-200 dark:border-gray-700">
      <Link
        href="/update-profile"
        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Pen size={18} className="mr-2" />
        Edit Profile
      </Link>
      <NavItem
        icon={<LogOut size={18} />}
        label="Logout"
        href=""
        onClick={handleSignout}
      />
    </div>
  );
}
function UserProfileInfo({ username }: { username: string }) {
  const [userData, setUserData] = useState<UserProfileInfoI | null>(null);
  const [expendUserSettings, setExpendUserSettings] = useState(false);
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
          url={userData?.profilePicUrl as string}
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
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followers?.length ?? 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatNumber(userData?.followings?.length ?? 0)}
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
